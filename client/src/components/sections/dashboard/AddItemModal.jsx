import { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, Plus } from 'lucide-react';

const commonBills = [
  { name: 'Rent', category: 'Housing' },
  { name: 'Electricity', category: 'Utilities' },
  { name: 'Water', category: 'Utilities' },
  { name: 'Gas', category: 'Utilities' },
  { name: 'Internet', category: 'Utilities' },
  { name: 'Phone', category: 'Utilities' },
  { name: 'Cable TV', category: 'Entertainment' },
  { name: 'Streaming Services', category: 'Entertainment' },
  { name: 'Car Payment', category: 'Transportation' },
  { name: 'Insurance', category: 'Insurance' },
  { name: 'Other', category: 'Other' }
];

const commonExpenses = [
  { name: 'Groceries', category: 'Food' },
  { name: 'Dining Out', category: 'Food' },
  { name: 'Gas', category: 'Transportation' },
  { name: 'Public Transit', category: 'Transportation' },
  { name: 'Clothing', category: 'Shopping' },
  { name: 'Entertainment', category: 'Entertainment' },
  { name: 'Healthcare', category: 'Healthcare' },
  { name: 'Education', category: 'Education' },
  { name: 'Other', category: 'Other' }
];

const commonSavings = [
  { name: 'Emergency Fund', category: 'Emergency' },
  { name: 'Retirement', category: 'Retirement' },
  { name: 'Vacation', category: 'Travel' },
  { name: 'Car', category: 'Transportation' },
  { name: 'Home', category: 'Housing' },
  { name: 'Education', category: 'Education' },
  { name: 'Investment', category: 'Investment' },
  { name: 'Other', category: 'Other' }
];

const commonDebts = [
  { name: 'Credit Card', category: 'Credit' },
  { name: 'Student Loan', category: 'Education' },
  { name: 'Car Loan', category: 'Transportation' },
  { name: 'Personal Loan', category: 'Personal' },
  { name: 'Medical Debt', category: 'Healthcare' },
  { name: 'Other', category: 'Other' }
];

const commonSubscriptions = [
  { name: 'Netflix', category: 'Entertainment' },
  { name: 'Spotify', category: 'Entertainment' },
  { name: 'Amazon Prime', category: 'Shopping' },
  { name: 'Disney+', category: 'Entertainment' },
  { name: 'HBO Max', category: 'Entertainment' },
  { name: 'YouTube Premium', category: 'Entertainment' },
  { name: 'Apple TV+', category: 'Entertainment' },
  { name: 'Xbox Game Pass', category: 'Gaming' },
  { name: 'PlayStation Plus', category: 'Gaming' },
  { name: 'Adobe Creative Cloud', category: 'Software' },
  { name: 'Microsoft 365', category: 'Software' },
  { name: 'Gym Membership', category: 'Health & Fitness' },
  { name: 'Other', category: 'Other' }
];

const commonIncomes = [
  { name: 'Paycheck', category: 'Employment' },
  { name: 'Salary', category: 'Employment' },
  { name: 'Freelance', category: 'Self-Employment' },
  { name: 'Business', category: 'Self-Employment' },
  { name: 'Investments', category: 'Investments' },
  { name: 'Rental Income', category: 'Real Estate' },
  { name: 'Side Gig', category: 'Part-Time' },
  { name: 'Pension', category: 'Retirement' },
  { name: 'Social Security', category: 'Government' },
  { name: 'Other', category: 'Other' }
];

export const AddItemModal = ({ isOpen, onClose, type, item, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    category: '',
    interest: '',
    minimumPayment: '',
    goal: '',
    progress: 0,
    frequency: 'monthly',
    nextPayDate: new Date().toISOString().split('T')[0]
  });
  const [showCustomName, setShowCustomName] = useState(false);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [commonItems, setCommonItems] = useState([]);
  const [selectedCommonItem, setSelectedCommonItem] = useState('');
  const [weeklyAmounts, setWeeklyAmounts] = useState([]);
  const [isPaycheck, setIsPaycheck] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        amount: item.amount || '',
        dueDate: item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: item.category || '',
        interest: item.interest || '',
        minimumPayment: item.minimumPayment || '',
        goal: item.goal || '',
        progress: item.progress || 0,
        frequency: item.frequency || 'monthly',
        nextPayDate: item.nextPayDate ? new Date(item.nextPayDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      setIsPaycheck(item.name === 'Paycheck');
      setWeeklyAmounts(item.weeklyAmounts || []);
      setShowCustomName(true);
      setShowCustomCategory(true);
    } else {
      setFormData({
        name: '',
        amount: '',
        dueDate: new Date().toISOString().split('T')[0],
        category: '',
        interest: '',
        minimumPayment: '',
        goal: '',
        progress: 0,
        frequency: 'monthly',
        nextPayDate: new Date().toISOString().split('T')[0]
      });
      setIsPaycheck(false);
      setWeeklyAmounts([]);
      setShowCustomName(false);
      setShowCustomCategory(false);
    }
  }, [item, type]);

  useEffect(() => {
    switch (type) {
      case 'bills':
        setCommonItems(commonBills);
        break;
      case 'expenses':
        setCommonItems(commonExpenses);
        break;
      case 'savings':
        setCommonItems(commonSavings);
        break;
      case 'debts':
        setCommonItems(commonDebts);
        break;
      case 'subscriptions':
        setCommonItems(commonSubscriptions);
        break;
      case 'incomes':
        setCommonItems(commonIncomes);
        break;
      default:
        setCommonItems([]);
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFrequencyChange = (e) => {
    const newFrequency = e.target.value;
    setFormData(prev => ({ ...prev, frequency: newFrequency }));
    
    if (isPaycheck) {
      let numInputs;
      switch (newFrequency) {
        case 'weekly':
          numInputs = 4;
          break;
        case 'bi-weekly':
          numInputs = 2;
          break;
        case 'monthly':
          numInputs = 1;
          break;
        default:
          numInputs = 1;
      }
      setWeeklyAmounts(new Array(numInputs).fill(''));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      amount: isPaycheck ? weeklyAmounts.reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0) : parseFloat(formData.amount) || 0,
      weeklyAmounts: isPaycheck ? weeklyAmounts.map(amount => parseFloat(amount) || 0) : undefined,
      date: formData.dueDate ? new Date(formData.dueDate).toISOString() : new Date().toISOString(),
      interest: formData.interest ? parseFloat(formData.interest) : 0,
      minimumPayment: formData.minimumPayment ? parseFloat(formData.minimumPayment) : 0,
      goal: formData.goal ? parseFloat(formData.goal) : 0,
      progress: formData.progress ? parseFloat(formData.progress) : 0
    };
    onAdd(newItem);
    onClose();
  };

  const handleCommonItemSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedCommonItem(selectedValue);
    
    if (selectedValue === '') {
      setShowCustomName(false);
      setShowCustomCategory(false);
      setFormData(prev => ({ ...prev, name: '', category: '' }));
      setIsPaycheck(false);
      return;
    }

    const selectedItem = commonItems.find(item => item.name === selectedValue);
    if (!selectedItem) return;

    const isPaycheckSelected = selectedItem.name === 'Paycheck';
    setIsPaycheck(isPaycheckSelected);

    if (isPaycheckSelected) {
      let numInputs;
      switch (formData.frequency) {
        case 'weekly':
          numInputs = 4;
          break;
        case 'bi-weekly':
          numInputs = 2;
          break;
        case 'monthly':
        default:
          numInputs = 1;
      }
      setWeeklyAmounts(new Array(numInputs).fill(''));
    }

    if (selectedItem.name === 'Other') {
      setShowCustomName(true);
      setFormData(prev => ({ ...prev, name: '' }));
    } else {
      setShowCustomName(false);
      setFormData(prev => ({ ...prev, name: selectedItem.name }));
    }

    if (selectedItem.category === 'Other') {
      setShowCustomCategory(true);
      setFormData(prev => ({ ...prev, category: '' }));
    } else {
      setShowCustomCategory(false);
      setFormData(prev => ({ ...prev, category: selectedItem.category }));
    }
  };

  const handleWeeklyAmountChange = (index, value) => {
    const newAmounts = [...weeklyAmounts];
    newAmounts[index] = value;
    setWeeklyAmounts(newAmounts);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 w-full max-w-md border border-gray-700/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {item ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Items Dropdown */}
          {!item && (
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Select Common {type.charAt(0).toUpperCase() + type.slice(1)}</label>
              <select
                value={selectedCommonItem}
                onChange={handleCommonItemSelect}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a common {type.slice(0, -1)}</option>
                {commonItems.map((item, index) => (
                  <option key={index} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Name Input */}
          {(showCustomName || item) && (
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Name</label>
              <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
                  required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
            </div>
          )}

          {/* Amount Input */}
          {type === 'incomes' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Payment Frequency</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleFrequencyChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {isPaycheck ? (
                <div className="space-y-4">
                  <label className="block text-sm text-gray-400">
                    {formData.frequency === 'weekly' ? 'Weekly Amounts' :
                     formData.frequency === 'bi-weekly' ? 'Bi-Weekly Amounts' :
                     'Monthly Amount'}
                  </label>
                  {weeklyAmounts.map((amount, index) => (
                    <div key={index} className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => handleWeeklyAmountChange(index, e.target.value)}
                        placeholder={`Amount for ${formData.frequency === 'weekly' ? `Week ${index + 1}` : 
                                    formData.frequency === 'bi-weekly' ? `Period ${index + 1}` : 
                                    'Month'}`}
                        required
                        min="0"
                        step="0.01"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  ))}
                  <div className="text-sm text-gray-400">
                    Total: ${weeklyAmounts.reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-sm text-gray-400">Amount</label>
            <div className="relative">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Next Payment Date</label>
                <div className="relative">
              <input
                type="date"
                    name="nextPayDate"
                    value={formData.nextPayDate}
                onChange={handleChange}
                    required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </>
          )}

          {/* Category Input */}
          {(showCustomCategory || item) && (
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Category</label>
              <div className="relative">
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          {/* Due Date Input */}
          {(type === 'bills' || type === 'expenses') && (
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Date</label>
              <div className="relative">
              <input
                type="date"
                  name="dueDate"
                  value={formData.dueDate}
                onChange={handleChange}
                  required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          {/* Goal Input for Savings */}
          {type === 'savings' && (
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Goal Amount</label>
              <div className="relative">
              <input
                  type="number"
                  name="goal"
                  value={formData.goal}
                onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
                <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}

          {/* Interest and Minimum Payment for Debts */}
          {type === 'debts' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Interest Rate (%)</label>
                <div className="relative">
                <input
                  type="number"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-400">Minimum Payment</label>
                <div className="relative">
                  <input
                    type="number"
                    name="minimumPayment"
                    value={formData.minimumPayment}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {item ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 