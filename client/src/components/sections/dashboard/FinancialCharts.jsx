import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const FinancialCharts = ({ 
  totalMonthlyIncome, 
  totalExpenses, 
  bills, 
  expenses, 
  savings, 
  debts, 
  subscriptions 
}) => {
  // Bar chart data for income vs expenses
  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [totalMonthlyIncome, totalExpenses],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)', // green for income
          'rgba(239, 68, 68, 0.7)', // red for expenses
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  // Doughnut chart data for expense breakdown
  const expenseBreakdown = {
    bills: bills.reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0),
    expenses: expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0),
    savings: savings.reduce((sum, saving) => sum + parseFloat(saving.amount || 0), 0),
    debts: debts.reduce((sum, debt) => sum + parseFloat(debt.minimumPayment || 0), 0),
    subscriptions: subscriptions.reduce((sum, sub) => sum + parseFloat(sub.amount || 0), 0),
  };

  const doughnutChartData = {
    labels: ['Bills', 'Expenses', 'Savings', 'Debts', 'Subscriptions'],
    datasets: [
      {
        data: [
          expenseBreakdown.bills,
          expenseBreakdown.expenses,
          expenseBreakdown.savings,
          expenseBreakdown.debts,
          expenseBreakdown.subscriptions,
        ],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)', // indigo
          'rgba(239, 68, 68, 0.7)',  // red
          'rgba(34, 197, 94, 0.7)',  // green
          'rgba(234, 179, 8, 0.7)',  // yellow
          'rgba(236, 72, 153, 0.7)', // pink
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(239, 68, 68)',
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(236, 72, 153)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleColor: 'rgb(229, 231, 235)',
        bodyColor: 'rgb(229, 231, 235)',
        borderColor: 'rgba(75, 85, 99, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
  };

  const barChartOptions = {
    ...commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          callback: function(value) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(value);
          }
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
        },
      },
    },
  };

  const doughnutChartOptions = {
    ...commonOptions,
    cutout: '70%',
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Income vs Expenses</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Income</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-400">Expenses</span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Expense Breakdown</h3>
          <div className="text-sm text-gray-400">
            Total: {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(totalExpenses)}
          </div>
        </div>
        <div className="h-[300px]">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
    </div>
  );
}; 