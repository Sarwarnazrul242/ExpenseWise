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
  Edit2
} from "lucide-react";
import { TextHoverEffect } from "../../ui/TextHoverEffect";
import { AddItemModal } from "./AddItemModal";

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [paycheckFrequency, setPaycheckFrequency] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklyIncome, setWeeklyIncome] = useState({});
  const [totalMonthlyIncome, setTotalMonthlyIncome] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [bills, setBills] = useState([
    { id: 1, name: "Rent", amount: "1200", dueDate: "2024-03-01", category: "Housing" },
    { id: 2, name: "Electricity", amount: "150", dueDate: "2024-03-15", category: "Utilities" },
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Grocery Shopping", amount: "125.50", date: "2024-03-01", category: "Food" },
    { id: 2, name: "Dining Out", amount: "45.00", date: "2024-03-02", category: "Food" },
  ]);
  const [savings, setSavings] = useState([
    { id: 1, name: "Emergency Fund", amount: "2000", goal: "5000", progress: "40" },
    { id: 2, name: "Vacation Fund", amount: "1500", goal: "3000", progress: "50" },
  ]);
  const [debts, setDebts] = useState([
    { id: 1, name: "Credit Card", amount: "1200", interest: "18", minimumPayment: "50" },
    { id: 2, name: "Student Loan", amount: "15000", interest: "5", minimumPayment: "200" },
  ]);

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
        currentDate = new Date(firstDay);
        let weekCount = 0;

        while (currentDate <= lastDay) {
          currentBiWeek.push(new Date(currentDate));
          if (weekCount === 1 || currentDate.getTime() === lastDay.getTime()) {
            biWeeks.push([...currentBiWeek]);
            currentBiWeek = [];
            weekCount = 0;
          } else {
            weekCount++;
          }
          currentDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
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

  const summaryData = [
    {
      title: "Total Balance",
      amount: "$12,450.00",
      change: "+12.5%",
      icon: <Wallet className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Income",
      amount: "$8,250.00",
      change: "+8.2%",
      icon: <ArrowUpRight className="h-6 w-6" />,
      trend: "up",
    },
    {
      title: "Expenses",
      amount: "$4,200.00",
      change: "-3.1%",
      icon: <ArrowDownRight className="h-6 w-6" />,
      trend: "down",
    },
    {
      title: "Savings",
      amount: "$3,500.00",
      change: "+15.3%",
      icon: <TrendingUp className="h-6 w-6" />,
      trend: "up",
    },
  ];

  const handleAddItem = (data) => {
    const newItem = {
      id: Date.now(),
      ...data
    };

    switch (modalType) {
      case 'bill':
        setBills(prev => [...prev, newItem]);
        break;
      case 'expense':
        setExpenses(prev => [...prev, newItem]);
        break;
      case 'savings':
        setSavings(prev => [...prev, newItem]);
        break;
      case 'debt':
        setDebts(prev => [...prev, newItem]);
        break;
      default:
        break;
    }
  };

  const handleDeleteItem = (type, id) => {
    switch (type) {
      case 'bill':
        setBills(prev => prev.filter(item => item.id !== id));
        break;
      case 'expense':
        setExpenses(prev => prev.filter(item => item.id !== id));
        break;
      case 'savings':
        setSavings(prev => prev.filter(item => item.id !== id));
        break;
      case 'debt':
        setDebts(prev => prev.filter(item => item.id !== id));
        break;
      default:
        break;
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Text Hover Effect Background */}
      <div className="absolute inset-0 opacity-20">
        <TextHoverEffect text="ExpenseWise" duration={0.1} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700/50 transition-colors">
                <Calendar className="h-5 w-5" />
                <span>{selectedPeriod}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="p-2 bg-gray-800/50 rounded-lg text-white hover:bg-gray-700/50 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Paycheck Configuration */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-6">
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
              onClick={calculateTotalIncome}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Update Income
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
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
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm ${
                    item.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-gray-400 text-sm ml-2">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bills Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Bills</h2>
              <button 
                onClick={() => openModal('bill')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Bill</span>
              </button>
            </div>
            <div className="space-y-4">
              {bills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
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
                    <button 
                      onClick={() => handleDeleteItem('bill', bill.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Expenses</h2>
              <button 
                onClick={() => openModal('expense')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Expense</span>
              </button>
            </div>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
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
                    <button 
                      onClick={() => handleDeleteItem('expense', expense.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
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
              {savings.map((saving) => (
                <div key={saving.id} className="p-4 bg-gray-700/30 rounded-lg">
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
                    <button 
                      onClick={() => handleDeleteItem('savings', saving.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
              ))}
            </div>
          </div>

          {/* Debt Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Debts</h2>
              <button 
                onClick={() => openModal('debt')}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                <span>Add Debt</span>
              </button>
            </div>
            <div className="space-y-4">
              {debts.map((debt) => (
                <div key={debt.id} className="p-4 bg-gray-700/30 rounded-lg">
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
                      <button 
                        onClick={() => handleDeleteItem('debt', debt.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Minimum Payment: ${debt.minimumPayment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddItemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        onAdd={handleAddItem}
      />
    </div>
  );
}; 