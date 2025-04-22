import { RevealOnScroll } from "../../RevealOnScroll";
import { Star, TrendingUp, PieChart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    title: "Easy to Use",
    description: "Simple and intuitive interface for tracking your daily expenses",
    icon: <Star className="w-6 h-6" />,
    stat: "2 Minutes",
    statLabel: "Setup Time",
    color: "from-yellow-500 to-orange-600"
  },
  {
    title: "Smart Analytics",
    description: "Visual insights into your spending patterns and budget allocation",
    icon: <TrendingUp className="w-6 h-6" />,
    stat: "Real-time",
    statLabel: "Updates",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Budget Control",
    description: "Set and track budgets to keep your spending in check",
    icon: <PieChart className="w-6 h-6" />,
    stat: "Full",
    statLabel: "Control",
    color: "from-green-500 to-emerald-600"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-gray-700/50">
              <Wallet className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
                Why Choose ExpenseWise
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Designed for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block mt-2">
                Your Success
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple, powerful, and completely free tools to help you achieve your financial goals
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${highlight.color} mb-6 group-hover:scale-110 transform transition-transform duration-300`}>
                    {highlight.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6">
                    {highlight.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${highlight.color}`}>
                      {highlight.stat}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {highlight.statLabel}
                    </span>
                  </div>

                  {/* Bottom gradient line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${highlight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.4}>
          <div className="mt-16 text-center">
            <Link 
              to="/login"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              Start Your Journey
              <svg 
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 