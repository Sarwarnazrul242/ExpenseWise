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
import { Account } from "./Account";
import { useAuth } from "../../../context/AuthContext";
import { getDashboardData, updateDashboardData, addItem, deleteItem, editItem } from '../../../services/dashboardAPI';

// DeleteConfirmationModal Component
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    bills: [],
    expenses: [],
    savings: [],
    debts: [],
    subscriptions: [],
    incomes: []
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
        const data = await getDashboardData();
        setDashboardData(data);
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

  const calculateTotalMonthlyIncome = (incomes) => {
    return incomes.reduce((total, income) => {
      let monthlyAmount = parseFloat(income.amount) || 0;
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

  const totalMonthlyIncome = calculateTotalMonthlyIncome(dashboardData.incomes);

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
      breakdown: (dashboardData.incomes || []).map(income => ({
        label: income.name,
        amount: parseFloat(income.amount) || 0
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
  const handleAddItem = async (newItem) => {
    try {
      setIsSubmitting(true);
      
      if (editingItem) {
        // If we're editing, update the existing item
        const updatedItem = await editItem(modalType, editingItem._id, {
          ...newItem,
          _id: editingItem._id // Ensure we pass the ID
        });

        // Update the UI with the complete updated item data
        setDashboardData(prev => ({
          ...prev,
          [modalType]: prev[modalType].map(item => 
            item._id === editingItem._id ? updatedItem : item
          )
        }));
      } else {
        // Make the API call to add the new item
        const addedItem = await addItem(modalType, newItem);
        
        // Update the UI with the server response by appending the new item
        setDashboardData(prev => {
          // Ensure the array exists
          const currentArray = prev[modalType] || [];
          return {
            ...prev,
            [modalType]: [...currentArray, addedItem]
          };
        });
      }
      
      setShowModal(false);
      setError(null);
    } catch (err) {
      console.error('Error handling item:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      setEditingItem(null);
    }
  };

  // Handle editing items
  const handleEditItem = async (editedItem) => {
    try {
      const updatedData = await editItem(editedItem.type, editedItem._id, editedItem);
      setDashboardData(prev => ({
        ...prev,
        [editedItem.type]: prev[editedItem.type].map(item => 
          item._id === editedItem._id ? updatedData : item
        )
      }));
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error('Error editing item:', err);
      setError(err.message);
    }
  };

  // Handle deleting items
  const handleDeleteItem = async () => {
    try {
      await deleteItem(deleteModal.type, deleteModal.id);
      setDashboardData(prev => ({
        ...prev,
        [deleteModal.type]: prev[deleteModal.type].filter(item => item._id !== deleteModal.id)
      }));
      setDeleteModal({ isOpen: false, type: null, id: null, name: null });
    } catch (err) {
      console.error('Error deleting item:', err);
      setError(err.message);
    }
  };

  // Handle updating any section
  const handleUpdateSection = async (section, data) => {
    try {
      const updatedData = await updateDashboardData({ [section]: data });
      setDashboardData(prev => ({
        ...prev,
        [section]: updatedData[section]
      }));
    } catch (err) {
      console.error('Error updating section:', err);
      setError(err.message);
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

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {user?.name}!
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

            {/* Income Management Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Income Sources</h2>
                  <p className="text-sm text-gray-400">Manage your income streams</p>
                </div>
                <button 
                  onClick={() => openModal('incomes')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Income</span>
                </button>
              </div>
              
              {/* Income List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.incomes.map((income, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{income.name}</h3>
                        <p className="text-sm text-gray-400">
                          {(income.frequency || 'monthly').charAt(0).toUpperCase() + (income.frequency || 'monthly').slice(1)} Income
                        </p>
                        {income.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                            {income.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('incomes', income)}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'incomes',
                            id: income._id,
                            name: income.name
                          })}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-green-400 font-medium text-lg">
                        ${(parseFloat(income.amount) || 0).toFixed(2)}
                      </span>
                      {income.nextPayDate && (
                        <span className="text-sm text-gray-400">
                          Next: {new Date(income.nextPayDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
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

            {/* Bills Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Bills</h2>
                  <p className="text-sm text-gray-400">Manage your recurring bills</p>
                </div>
                <button
                  onClick={() => openModal('bills')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Bill</span>
                </button>
              </div>

              {/* Bills List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.bills.map((bill, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{bill.name}</h3>
                        <p className="text-sm text-gray-400">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                        {bill.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                            {bill.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('bills', bill)}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'bills',
                            id: bill._id,
                            name: bill.name
                          })}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-white font-medium text-lg">
                        ${parseFloat(bill.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Bills</span>
                  <span className="text-xl font-semibold">
                    ${dashboardData.bills.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Expenses</h2>
                  <p className="text-sm text-gray-400">Track your daily expenses</p>
                </div>
                <button
                  onClick={() => openModal('expenses')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Expense</span>
                </button>
              </div>

              {/* Expenses List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{expense.name}</h3>
                        <p className="text-sm text-gray-400">
                          Date: {new Date(expense.dueDate).toLocaleDateString()}
                        </p>
                        {expense.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded-full">
                            {expense.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('expenses', expense)}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'expenses',
                            id: expense._id,
                            name: expense.name
                          })}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-white font-medium text-lg">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Expenses</span>
                  <span className="text-xl font-semibold">
                    ${dashboardData.expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Savings Goals</h2>
                  <p className="text-sm text-gray-400">Track your financial goals and progress</p>
                </div>
                <button
                  onClick={() => openModal('savings')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Goal</span>
                </button>
              </div>

              {/* Savings List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.savings.map((saving, index) => {
                  const progressPercentage = Math.min((saving.progress / saving.goal) * 100, 100);
                  return (
                    <div
                      key={index}
                      className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                            {saving.name}
                          </h3>
                          <p className="text-sm text-gray-400">Monthly Contribution: ${parseFloat(saving.amount).toFixed(2)}</p>
                          {saving.category && (
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                              {saving.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal('savings', saving)}
                            className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4 text-gray-400" />
                          </button>
                          <button
                            onClick={() => setDeleteModal({
                              isOpen: true,
                              type: 'savings',
                              id: saving._id,
                              name: saving.name
                            })}
                            className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">Progress</div>
                          <div className="text-sm font-medium text-emerald-400">
                            {progressPercentage.toFixed(1)}%
                          </div>
                        </div>
                        <div className="w-full bg-gray-600/50 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${progressPercentage}%`
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                            <div className="text-xs text-gray-400">Current</div>
                            <div className="text-sm font-medium text-emerald-400">
                              ${parseFloat(saving.progress || 0).toFixed(2)}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs text-gray-400">Target</div>
                            <div className="text-sm font-medium text-white">
                              ${parseFloat(saving.goal || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-white">Total Savings Progress</span>
                    <p className="text-sm text-gray-400">Across all your goals</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-semibold text-emerald-400">
                      ${dashboardData.savings.reduce((sum, saving) => sum + parseFloat(saving.progress || 0), 0).toFixed(2)}
                    </span>
                    <p className="text-sm text-gray-400">
                      of ${dashboardData.savings.reduce((sum, saving) => sum + parseFloat(saving.goal || 0), 0).toFixed(2)} total goal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Debts Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Debts</h2>
                  <p className="text-sm text-gray-400">Manage your outstanding debts</p>
                </div>
                <button
                  onClick={() => openModal('debts')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Debt</span>
                </button>
              </div>

              {/* Debts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.debts.map((debt, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{debt.name}</h3>
                        <p className="text-sm text-gray-400">
                          Interest Rate: {parseFloat(debt.interest).toFixed(2)}%
                        </p>
                        {debt.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                            {debt.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('debts', debt)}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'debts',
                            id: debt._id,
                            name: debt.name
                          })}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Total Amount: ${parseFloat(debt.amount).toFixed(2)}</span>
                        <span>Minimum Payment: ${parseFloat(debt.minimumPayment).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Debt</span>
                  <span className="text-xl font-semibold text-red-400">
                    ${dashboardData.debts.reduce((sum, debt) => sum + parseFloat(debt.amount || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscriptions Section */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white">Subscriptions</h2>
                  <p className="text-sm text-gray-400">Manage your recurring subscriptions</p>
                </div>
                <button
                  onClick={() => openModal('subscriptions')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Subscription</span>
                </button>
              </div>

              {/* Subscriptions List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.subscriptions.map((subscription, index) => (
                  <div
                    key={index}
                    className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{subscription.name}</h3>
                        <p className="text-sm text-gray-400">{subscription.category}</p>
                        {subscription.category && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs bg-pink-500/20 text-pink-400 rounded-full">
                            {subscription.category}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal('subscriptions', subscription)}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setDeleteModal({
                            isOpen: true,
                            type: 'subscriptions',
                            id: subscription._id,
                            name: subscription.name
                          })}
                          className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-white font-medium text-lg">
                        ${parseFloat(subscription.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Subscriptions</span>
                  <span className="text-xl font-semibold">
                    ${dashboardData.subscriptions.reduce((sum, sub) => sum + parseFloat(sub.amount || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Account user={user} />
        )}
      </div>

      {showModal && (
        <AddItemModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type={modalType}
          item={editingItem}
          onAdd={handleAddItem}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Add the DeleteConfirmationModal component */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: null, id: null, name: null })}
        onConfirm={handleDeleteItem}
        itemName={deleteModal.name}
      />
    </div>
  );
}; 