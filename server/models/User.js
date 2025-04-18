const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const billSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  category: { type: String, required: true }
});

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true }
});

const savingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  amount: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }
});

const debtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  interest: { type: Number, required: true },
  minimumPayment: { type: Number, required: true }
});

const paycheckConfigSchema = new mongoose.Schema({
  frequency: { type: String, enum: ['weekly', 'bi-weekly', 'monthly'], default: 'monthly' },
  lastPaycheckDate: { type: Date, default: Date.now },
  weeklyIncome: [{ type: Number }],
  totalMonthlyIncome: { type: Number, default: 0 }
});

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  category: { type: String, required: true },
  billingCycle: {
    type: String,
    enum: ['monthly', 'yearly', 'quarterly'],
    default: 'monthly',
    required: true
  }
});

// Update the income schema to include weekly amounts
const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { 
    type: String, 
    enum: ['weekly', 'bi-weekly', 'monthly', 'yearly'],
    required: true 
  },
  category: { type: String, required: true },
  nextPayDate: { type: Date, required: true },
  weeklyAmounts: [{ type: Number }], // Array to store weekly/bi-weekly amounts for paychecks
  isPaycheck: { type: Boolean, default: false } // Flag to identify if this is a paycheck
});

// Update the dashboard schema to use the income schema
const dashboardSchema = new mongoose.Schema({
  bills: { type: [billSchema], default: [] },
  expenses: { type: [expenseSchema], default: [] },
  savings: { type: [savingsSchema], default: [] },
  debts: { type: [debtSchema], default: [] },
  subscriptions: { type: [subscriptionSchema], default: [] },
  incomes: { type: [incomeSchema], default: [] },
  paycheckConfig: {
    type: paycheckConfigSchema,
    default: () => ({
      frequency: 'monthly',
      lastPaycheckDate: new Date(),
      weeklyIncome: [],
      totalMonthlyIncome: 0
    })
  }
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  dashboard: { type: dashboardSchema, default: () => ({}) }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 