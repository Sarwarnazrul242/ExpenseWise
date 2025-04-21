const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get dashboard data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return dashboard data or initialize if not exists
    res.json(user.dashboard || {
      bills: [],
      expenses: [],
      savings: [],
      debts: [],
      paycheckConfig: {
        frequency: 'monthly',
        lastPaycheckDate: new Date(),
        weeklyIncome: [],
        totalMonthlyIncome: 0
      }
    });
  } catch (err) {
    console.error('Dashboard route error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Update dashboard data
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize dashboard if it doesn't exist
    if (!user.dashboard) {
      user.dashboard = {
        bills: [],
        expenses: [],
        savings: [],
        debts: [],
        paycheckConfig: {
          frequency: 'monthly',
          lastPaycheckDate: new Date(),
          weeklyIncome: [],
          totalMonthlyIncome: 0
        }
      };
    }

    // Handle paycheck config update
    if (req.body.paycheckConfig) {
      // Ensure weeklyIncome is an array of numbers
      const weeklyIncome = Array.isArray(req.body.paycheckConfig.weeklyIncome) 
        ? req.body.paycheckConfig.weeklyIncome.map(Number)
        : [];

      // Ensure totalMonthlyIncome is a number
      const totalMonthlyIncome = Number(req.body.paycheckConfig.totalMonthlyIncome) || 0;

      user.dashboard.paycheckConfig = {
        frequency: req.body.paycheckConfig.frequency || 'monthly',
        lastPaycheckDate: new Date(req.body.paycheckConfig.lastPaycheckDate),
        weeklyIncome,
        totalMonthlyIncome
      };
    }

    // Handle other updates
    if (req.body.bills) user.dashboard.bills = req.body.bills;
    if (req.body.expenses) user.dashboard.expenses = req.body.expenses;
    if (req.body.savings) user.dashboard.savings = req.body.savings;
    if (req.body.debts) user.dashboard.debts = req.body.debts;

    await user.save();
    res.json(user.dashboard);
  } catch (err) {
    console.error('Error in dashboard update:', err);
    res.status(500).send('Server Error');
  }
});

// Add new item
router.post('/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const item = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize dashboard if it doesn't exist
    if (!user.dashboard) {
      user.dashboard = {
        bills: [],
        expenses: [],
        savings: [],
        debts: [],
        incomes: [],
        paycheckConfig: {
          frequency: 'monthly',
          lastPaycheckDate: new Date(),
          weeklyIncome: [],
          totalMonthlyIncome: 0
        }
      };
    }

    // Validate and process the item based on type
    if (['bills', 'expenses', 'savings', 'debts', 'incomes'].includes(type)) {
      if (!user.dashboard[type]) {
        user.dashboard[type] = [];
      }

      // Convert string numbers to actual numbers and handle dates
      if (type === 'expenses') {
        item.amount = parseFloat(item.amount);
        if (item.date) {
          const date = new Date(item.date);
          if (isNaN(date.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
          }
          item.date = date;
        } else {
          item.date = new Date();
        }
      } else if (type === 'incomes') {
        // Handle income-specific fields
        item.amount = parseFloat(item.amount);
        if (item.nextPayDate) {
          const nextPayDate = new Date(item.nextPayDate);
          if (isNaN(nextPayDate.getTime())) {
            return res.status(400).json({ message: 'Invalid next payment date format' });
          }
          item.nextPayDate = nextPayDate;
        } else {
          item.nextPayDate = new Date();
        }
        // Convert weekly amounts to numbers if they exist
        if (item.weeklyAmounts) {
          item.weeklyAmounts = item.weeklyAmounts.map(Number);
        }
      } else if (type === 'bills') {
        item.amount = parseFloat(item.amount);
        if (item.dueDate) {
          const dueDate = new Date(item.dueDate);
          if (isNaN(dueDate.getTime())) {
            return res.status(400).json({ message: 'Invalid due date format' });
          }
          item.dueDate = dueDate;
        } else {
          item.dueDate = new Date();
        }
      } else if (type === 'savings') {
        item.amount = parseFloat(item.amount || 0);
        item.goal = parseFloat(item.goal);
        item.progress = parseFloat(item.progress || 0);
      } else if (type === 'debts') {
        item.amount = parseFloat(item.amount);
        item.interest = parseFloat(item.interest);
        item.minimumPayment = parseFloat(item.minimumPayment);
      }

      // Add the new item
      user.dashboard[type].push(item);
      
      // Save the changes
      await user.save();
      
      // Return the updated array
      res.json(user.dashboard[type]);
    } else {
      res.status(400).json({ message: 'Invalid item type' });
    }
  } catch (error) {
    console.error('Error in POST /:type:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      stack: error.stack
    });
  }
});

// Delete item from dashboard
router.delete('/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove item from the appropriate array
    if (['bills', 'expenses', 'savings', 'debts', 'incomes', 'subscriptions'].includes(type)) {
      if (!user.dashboard[type]) {
        return res.status(404).json({ message: `${type} array not found` });
      }

      // Find the item before deletion to verify it exists
      const itemToDelete = user.dashboard[type].find(item => item._id.toString() === id);
      if (!itemToDelete) {
        return res.status(404).json({ message: 'Item not found' });
      }

      user.dashboard[type] = user.dashboard[type].filter(item => item._id.toString() !== id);

      await user.save();
      res.json(user.dashboard[type]);
    } else {
      res.status(400).json({ message: 'Invalid item type' });
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit item in dashboard
router.put('/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const updatedItem = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update item in the appropriate array
    if (['bills', 'expenses', 'savings', 'debts', 'incomes', 'subscriptions'].includes(type)) {
      if (!user.dashboard[type]) {
        return res.status(404).json({ message: `${type} array not found` });
      }
      
      const itemIndex = user.dashboard[type].findIndex(item => item._id.toString() === id);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
      }
      
      // Handle specific type conversions
      if (type === 'incomes') {
        updatedItem.amount = parseFloat(updatedItem.amount) || 0;
        if (updatedItem.nextPayDate) {
          const nextPayDate = new Date(updatedItem.nextPayDate);
          if (isNaN(nextPayDate.getTime())) {
            return res.status(400).json({ message: 'Invalid next payment date format' });
          }
          updatedItem.nextPayDate = nextPayDate;
        }
      }
      
      user.dashboard[type][itemIndex] = {
        ...user.dashboard[type][itemIndex].toObject(),
        ...updatedItem
      };
      
      await user.save();
      res.json(user.dashboard[type]);
    } else {
      res.status(400).json({ message: 'Invalid item type' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 