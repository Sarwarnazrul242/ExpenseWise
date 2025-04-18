import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  MoreVertical,
  Plus,
  Calendar,
  Filter,
  DollarSign,
  Receipt,
  PiggyBank,
  CreditCard as DebtIcon,
  Settings,
  ChevronDown,
  CalendarDays,
  Trash2,
  Edit2,
  LogOut,
  User,
  LayoutDashboard,
  KeyRound,
  AlertTriangle,
  Calculator
} from "lucide-react";
import { TextHoverEffect } from "../../ui/TextHoverEffect";
import { AddItemModal } from "./AddItemModal";
import { useAuth } from "../../../context/AuthContext";
import { getDashboardData, updateDashboardData, addItem, deleteItem, editItem } from '../../../services/dashboardAPI';

// Account Component
const Account = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Here you would typically make an API call to update the user's information
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        setSuccess('Account information updated successfully!');
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err.message || 'An error occurred while updating your account');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add this new component at the top level of the file
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 w-full max-w-md border border-gray-700/50">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-red-500/20 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Delete Confirmation</h2>
          <p className="text-gray-400">
            Are you sure you want to delete <span className="text-white font-medium">{itemName}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-4 w-full mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700/50 text-white rounded-lg hover:bg-gray-600/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export const Dashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [paycheckFrequency, setPaycheckFrequency] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyIncome, setWeeklyIncome] = useState({});
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [bills, setBills] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [debts, setDebts] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    bills: [],
    expenses: [],
    savings: [],
    debts: [],
    subscriptions: [],
    incomes: [],
    paycheckConfig: {
      frequency: 'monthly',
      lastPaycheckDate: new Date(),
      weeklyIncome: [],
      totalMonthlyIncome: 0
    }
  });
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: null,
    id: null,
    name: null
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardData(token);
        setDashboardData(data);
        
        // Calculate total monthly income from all sources
        const totalMonthly = calculateTotalMonthlyIncome(data.incomes || []);
        setTotalMonthlyIncome(totalMonthly);

        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Update total income whenever weekly income changes
  useEffect(() => {
    const total = Object.values(weeklyIncome).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0);
    setTotalMonthlyIncome(total);
  }, [weeklyIncome]);

  // Generate input slots based on frequency
  const getInputSlots = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    switch (paycheckFrequency) {
      case 'weekly':
        const weeks = [];
        let currentWeek = [];
        let currentDate = new Date(firstDay);

        while (currentDate <= lastDay) {
          currentWeek.push(new Date(currentDate));
          if (currentDate.getDay() === 6 || currentDate.getTime() === lastDay.getTime()) {
            weeks.push([...currentWeek]);
            currentWeek = [];
          }
          currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
        return weeks;

      case 'bi-weekly':
        const biWeeks = [];
        let currentBiWeek = [];
        let biWeekDate = new Date(firstDay);
        let weekCount = 0;

        while (biWeekDate <= lastDay) {
          currentBiWeek.push(new Date(biWeekDate));
          if (weekCount === 1 || biWeekDate.getTime() === lastDay.getTime()) {
            biWeeks.push([...currentBiWeek]);
            currentBiWeek = [];
            weekCount = 0;
          } else {
            weekCount++;
          }
          biWeekDate = new Date(biWeekDate.setDate(biWeekDate.getDate() + 7));
        }
        return biWeeks;

      case 'monthly':
        return [[firstDay, lastDay]];

      default:
        return [];
    }
  };

  const inputSlots = getInputSlots();

  const handleIncomeChange = (weekIndex, amount) => {
    setWeeklyIncome(prev => ({
      ...prev,
      [weekIndex]: parseFloat(amount) || 0
    }));
  };

  const calculateTotalIncome = () => {
    const total = Object.values(weeklyIncome).reduce((sum, amount) => sum + amount, 0);
    setTotalMonthlyIncome(total);
  };

  useEffect(() => {
    calculateTotalIncome();
  }, [weeklyIncome]);

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const calculateTotalExpenses = () => {
    const billsTotal = dashboardData?.bills?.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0);
    const expensesTotal = dashboardData?.expenses?.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    const savingsTotal = dashboardData?.savings?.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0);
    const debtsTotal = dashboardData?.debts?.reduce((sum, debt) => sum + parseFloat(debt.minimumPayment || 0), 0);
    const subscriptionsTotal = dashboardData?.subscriptions?.reduce((sum, sub) => sum + parseFloat(sub.amount || 0), 0);
    
    return billsTotal + expensesTotal + savingsTotal + debtsTotal + subscriptionsTotal;
  };

  const totalExpenses = calculateTotalExpenses();
  const leftToBudget = totalMonthlyIncome - totalExpenses;

  const calculateTotalMonthlyIncome = (incomes) => {
    return incomes.reduce((total, income) => {
      let monthlyAmount = income.amount;
      switch (income.frequency) {
        case 'weekly':
          monthlyAmount *= 4;
          break;
        case 'bi-weekly':
          monthlyAmount *= 2;
          break;
        case 'yearly':
          monthlyAmount /= 12;
          break;
        // monthly stays as is
      }
      return total + monthlyAmount;
    }, 0);
  };

  const summaryData = [
    {
      title: "Total Balance",
      amount: `$${totalMonthlyIncome.toFixed(2)}`,
      change: "+0%",
      icon: <Wallet className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Income",
      amount: `$${totalMonthlyIncome.toFixed(2)}`,
      change: "+0%",
      icon: <ArrowUpRight className="h-6 w-6" />,
      trend: "up",
      breakdown: dashboardData.incomes.map(income => ({
        label: income.name,
        amount: income.amount,
        frequency: income.frequency
      }))
    },
    {
      title: "Total Monthly Expenses",
      amount: `$${totalExpenses.toFixed(2)}`,
      change: "0%",
      icon: <ArrowDownRight className="h-6 w-6" />,
      trend: "neutral",
      breakdown: [
        { label: "Bills", amount: dashboardData?.bills?.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0) },
        { label: "Expenses", amount: dashboardData?.expenses?.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0) },
        { label: "Savings", amount: dashboardData?.savings?.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0) },
        { label: "Debt Payments", amount: dashboardData?.debts?.reduce((sum, debt) => sum + parseFloat(debt.minimumPayment || 0), 0) },
        { label: "Subscriptions", amount: dashboardData?.subscriptions?.reduce((sum, sub) => sum + parseFloat(sub.amount || 0), 0) }
      ]
    },
    {
      title: "Left to Budget",
      amount: `$${leftToBudget.toFixed(2)}`,
      change: "0%",
      icon: <Calculator className="h-6 w-6" />,
      trend: leftToBudget >= 0 ? "up" : "down",
    },
    {
      title: "Savings",
      amount: `$${dashboardData.savings.reduce((sum, saving) => sum + parseFloat(saving.progress || 0), 0).toFixed(2)}`,
      change: "0%",
      icon: <TrendingUp className="h-6 w-6" />,
      trend: "neutral",
    },
  ];

  // Handle adding new items
  const handleAddItem = async (type, item) => {
    try {
      setLoading(true);
      const updatedItems = await addItem(type, item, token);
      setDashboardData(prev => ({
        ...prev,
        [type]: updatedItems
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting items
  const handleDeleteItem = async (type, id, name) => {
    try {
      setLoading(true);
      console.log('Deleting item:', type, id);
      const updatedItems = await deleteItem(type, id, token);
      console.log('Received updated items:', updatedItems);
      
      setDashboardData(prev => ({
        ...prev,
        [type]: updatedItems
      }));
      setError(null);
      setDeleteModal({ isOpen: false, type: null, id: null, name: null });
    } catch (err) {
      console.error('Error deleting item:', err);
      setError(err.message || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing items
  const handleEditItem = async (type, id, updatedItem) => {
    try {
      setLoading(true);
      const updatedItems = await editItem(type, id, updatedItem, token);
      setDashboardData(prev => ({
        ...prev,
        [type]: updatedItems
      }));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle updating paycheck configuration
  const handleUpdatePaycheckConfig = async (config) => {
    try {
      setLoading(true);
      console.log('Sending paycheck config:', config);
      const updatedData = await updateDashboardData({
        paycheckConfig: {
          frequency: config.frequency,
          lastPaycheckDate: config.lastPaycheckDate,
          weeklyIncome: Array.isArray(config.weeklyIncome) ? config.weeklyIncome : Object.values(config.weeklyIncome),
          totalMonthlyIncome: parseFloat(config.totalMonthlyIncome)
        }
      }, token);
      console.log('Received updated data:', updatedData);
      
      setDashboardData(prev => ({
        ...prev,
        paycheckConfig: updatedData.paycheckConfig
      }));
      setError(null);
    } catch (err) {
      console.error('Error updating paycheck config:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle updating any section
  const handleUpdateSection = async (section, data) => {
    try {
      setLoading(true);
      console.log('Updating section:', section, 'with data:', data);
      const updatedData = await updateDashboardData({
        [section]: data
      }, token);
      console.log('Received updated section data:', updatedData);
      setDashboardData(prev => ({
        ...prev,
        [section]: updatedData[section]
      }));
      setError(null);
    } catch (err) {
      console.error('Error updating section:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-900 p-6 pt-24 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 pt-24 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 pt-24">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Text Hover Effect Background */}
      <div className="absolute inset-0 opacity-20">
        <TextHoverEffect text="ExpenseWise" duration={0.1} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {greeting}, {user?.name}!
            </h1>
            <p className="text-gray-400">Welcome to your dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700/50 transition-colors">
                <Calendar className="h-5 w-5" />
                <span>{selectedPeriod}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'account'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Account</span>
              </button>
            </div>

        {/* Content based on active tab */}
        {activeTab === 'dashboard' ? (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {summaryData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm">{item.title}</p>
                      <h3 className="text-2xl font-bold text-white mt-2">
                        {item.amount}
                      </h3>
          </div>
                    <div className="p-3 bg-gray-700/50 rounded-lg">
                      {item.icon}
                    </div>
                  </div>
                  {item.breakdown && (
                    <div className="mt-4 space-y-2 border-t border-gray-700/50 pt-4">
                      {item.breakdown.map((detail, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-400">{detail.label}</span>
                          <span className="text-gray-300">${detail.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center">
                    <span
                      className={`text-sm ${
                        item.trend === "up" ? "text-green-400" : 
                        item.trend === "down" ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      {item.change}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">vs last month</span>
                  </div>
                </div>
              ))}
        </div>

            {/* Paycheck Configuration */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Paycheck Configuration</h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <CalendarDays className="h-5 w-5" />
                <span>View Calendar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Paycheck Frequency</label>
                <select
                  value={paycheckFrequency}
                  onChange={(e) => setPaycheckFrequency(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Paycheck Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Monthly Income Summary</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Income:</span>
                <span className="text-2xl font-bold text-green-400">${totalMonthlyIncome.toFixed(2)}</span>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Based on {paycheckFrequency} paychecks
              </div>
            </div>
          </div>

          {/* Income Input Slots */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {paycheckFrequency === 'weekly' && 'Weekly Income for '}
              {paycheckFrequency === 'bi-weekly' && 'Bi-Weekly Income for '}
              {paycheckFrequency === 'monthly' && 'Monthly Income for '}
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inputSlots.map((slot, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">
                      {paycheckFrequency === 'weekly' && `Week ${index + 1}`}
                      {paycheckFrequency === 'bi-weekly' && `Period ${index + 1}`}
                      {paycheckFrequency === 'monthly' && 'Monthly'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {slot[0].toLocaleDateString('default', { day: 'numeric' })} - 
                      {slot[slot.length - 1].toLocaleDateString('default', { day: 'numeric' })}th
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={weeklyIncome[index] || ''}
                      onChange={(e) => handleIncomeChange(index, e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
                  onClick={() => handleUpdatePaycheckConfig({
                    frequency: paycheckFrequency,
                    lastPaycheckDate: selectedDate,
                    weeklyIncome: Object.values(weeklyIncome),
                    totalMonthlyIncome
                  })}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Income
            </button>
          </div>
        </div>

            {/* Income Management Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Income Sources</h2>
                <button 
                  onClick={() => openModal('incomes')}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Income</span>
                </button>
              </div>
              <div className="space-y-4">
                {dashboardData.incomes?.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No income sources added yet. Click "Add Income" to get started.
                  </div>
                ) : (
                  dashboardData.incomes.map((income) => (
                    <div key={income._id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-600/50 rounded-lg">
                          <DollarSign className="h-5 w-5 text-green-400" />
                        </div>
                <div>
                          <h4 className="text-white font-medium">{income.name}</h4>
                          <p className="text-gray-400 text-sm">
                            Next payment: {new Date(income.nextPayDate).toLocaleDateString()}
                          </p>
                </div>
                </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-green-400 font-medium">
                            ${income.amount.toFixed(2)}
                            <span className="text-gray-400 text-sm ml-1">
                              /{income.frequency}
                            </span>
                          </p>
                          <p className="text-gray-400 text-sm">{income.category}</p>
              </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openModal('incomes', income)}
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setDeleteModal({ 
                              isOpen: true, 
                              type: 'incomes', 
                              id: income._id, 
                              name: income.name 
                            })}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Monthly Income</span>
                  <span className="text-xl font-semibold text-green-400">
                    ${totalMonthlyIncome.toFixed(2)}
                </span>
              </div>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bills Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Bills</h2>
              <button 
                    onClick={() => openModal('bills')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Bill</span>
              </button>
            </div>
            <div className="space-y-4">
                  {dashboardData.bills.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No bills added yet. Click "Add Bill" to get started.
                    </div>
                  ) : (
                    dashboardData.bills.map((bill) => (
                      <div key={bill._id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-600/50 rounded-lg">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{bill.name}</h4>
                      <p className="text-gray-400 text-sm">Due {new Date(bill.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">${bill.amount}</p>
                      <p className="text-gray-400 text-sm">{bill.category}</p>
                    </div>
                          <div className="flex items-center gap-2">
                    <button 
                              onClick={() => openModal('bills', bill)}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteModal({ 
                                isOpen: true, 
                                type: 'bills', 
                                id: bill._id, 
                                name: bill.name 
                              })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total Bills</span>
                    <span className="text-xl font-semibold">
                      ${dashboardData?.bills?.reduce((sum, bill) => sum + (bill.amount || 0), 0).toFixed(2)}
                    </span>
                  </div>
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Expenses</h2>
              <button 
                    onClick={() => openModal('expenses')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </button>
            </div>
            <div className="space-y-4">
                  {dashboardData.expenses.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No expenses added yet. Click "Add Expense" to get started.
                    </div>
                  ) : (
                    dashboardData.expenses.map((expense) => (
                      <div key={expense._id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-600/50 rounded-lg">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{expense.name}</h4>
                      <p className="text-gray-400 text-sm">{new Date(expense.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-red-400 font-medium">${expense.amount}</p>
                      <p className="text-gray-400 text-sm">{expense.category}</p>
                    </div>
                          <div className="flex items-center gap-2">
                    <button 
                              onClick={() => openModal('expenses', expense)}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteModal({ 
                                isOpen: true, 
                                type: 'expenses', 
                                id: expense._id, 
                                name: expense.name 
                              })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total Expenses</span>
                    <span className="text-xl font-semibold">
                      ${dashboardData?.expenses?.reduce((sum, expense) => sum + (expense.amount || 0), 0).toFixed(2)}
                    </span>
                  </div>
            </div>
          </div>

          {/* Savings Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Savings Goals</h2>
              <button 
                onClick={() => openModal('savings')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Goal</span>
              </button>
            </div>
            <div className="space-y-4">
                  {dashboardData.savings.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No savings goals added yet. Click "Add Goal" to get started.
                    </div>
                  ) : (
                    dashboardData.savings.map((saving) => (
                      <div key={saving._id} className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-600/50 rounded-lg">
                        <PiggyBank className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{saving.name}</h4>
                        <p className="text-gray-400 text-sm">${saving.amount} / ${saving.goal}</p>
                      </div>
                    </div>
                          <div className="flex items-center gap-2">
                    <button 
                              onClick={() => openModal('savings', saving)}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteModal({ 
                                isOpen: true, 
                                type: 'savings', 
                                id: saving._id, 
                                name: saving.name 
                              })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                          </div>
                  </div>
                  <div className="w-full bg-gray-600/50 rounded-full h-2 mb-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${saving.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-400">{saving.progress}%</span>
                  </div>
                </div>
                    ))
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total Savings</span>
                    <span className="text-xl font-semibold">
                      ${dashboardData?.savings?.reduce((sum, saving) => sum + (saving.progress || 0), 0).toFixed(2)}
                    </span>
                  </div>
            </div>
          </div>

          {/* Debt Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Debts</h2>
              <button 
                    onClick={() => openModal('debts')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Debt</span>
              </button>
            </div>
            <div className="space-y-4">
                  {dashboardData.debts.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No debts added yet. Click "Add Debt" to get started.
                    </div>
                  ) : (
                    dashboardData.debts.map((debt) => (
                      <div key={debt._id} className="p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-600/50 rounded-lg">
                        <DebtIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{debt.name}</h4>
                        <p className="text-gray-400 text-sm">{debt.interest}% interest</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-red-400 font-medium">${debt.amount}</span>
                            <div className="flex items-center gap-2">
                      <button 
                                onClick={() => openModal('debts', debt)}
                                className="text-gray-400 hover:text-blue-400 transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => setDeleteModal({ 
                                  isOpen: true, 
                                  type: 'debts', 
                                  id: debt._id, 
                                  name: debt.name 
                                })}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                            </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Minimum Payment: ${debt.minimumPayment}
                  </div>
                </div>
                    ))
                  )}
            </div>
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total Debt</span>
                    <span className="text-xl font-semibold">
                      ${dashboardData?.debts?.reduce((sum, debt) => sum + (debt.amount || 0), 0).toFixed(2)}
                    </span>
          </div>
        </div>
              </div>

              {/* Add Subscriptions Section before or after the Bills section */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Subscriptions</h2>
                  <button 
                    onClick={() => openModal('subscriptions')}
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Subscription</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {dashboardData.subscriptions?.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No subscriptions added yet. Click "Add Subscription" to get started.
                    </div>
                  ) : (
                    dashboardData.subscriptions.map((subscription) => (
                      <div key={subscription._id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-600/50 rounded-lg">
                            <Receipt className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{subscription.name}</h4>
                            <p className="text-gray-400 text-sm">Due {new Date(subscription.dueDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-white font-medium">${subscription.amount}</p>
                            <p className="text-gray-400 text-sm">{subscription.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openModal('subscriptions', subscription)}
                              className="text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteModal({ 
                                isOpen: true, 
                                type: 'subscriptions', 
                                id: subscription._id, 
                                name: subscription.name 
                              })}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700/50">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total Subscriptions</span>
                    <span className="text-xl font-semibold">
                      ${dashboardData?.subscriptions?.reduce((sum, sub) => sum + (sub.amount || 0), 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Account user={user} />
        )}
      </div>

      <AddItemModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setModalType(null);
          setEditingItem(null);
        }}
        type={modalType}
        item={editingItem}
        onAdd={(data) => {
          if (editingItem) {
            handleEditItem(modalType, editingItem.id, data);
          } else {
            handleAddItem(modalType, data);
          }
        }}
      />

      {/* Add the DeleteConfirmationModal component */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: null })}
        onConfirm={() => handleDeleteItem(deleteModal.type, deleteModal.id, deleteModal.name)}
        itemName={deleteModal.name}
      />
    </div>
  );
}; 