import { RevealOnScroll } from "../../RevealOnScroll";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";

const features = [
  {
    name: "Expense Tracking",
    description: "Track all your expenses with custom categories"
  },
  {
    name: "Budget Management",
    description: "Create and manage monthly budgets easily"
  },
  {
    name: "Income Monitoring",
    description: "Track multiple income streams in one place"
  },
  {
    name: "Visual Analytics",
    description: "See your spending patterns with clear charts"
  },
  {
    name: "Balance Overview",
    description: "Monitor your savings and current balance"
  },
  {
    name: "Custom Categories",
    description: "Create categories that match your needs"
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-gray-700/50">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-pulse" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
                100% Free Forever
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Simple Pricing for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block mt-2">
                Everyone
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unlike other tools that charge fees, ExpenseWise is completely free for individuals.
              No hidden costs, no premium features locked away.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 overflow-hidden group">
              {/* Floating badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
              
              {/* Content */}
              <div className="text-center mb-8 relative">
                <h3 className="text-2xl font-bold mb-4">Free Individual Plan</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    $0
                  </span>
                  <span className="text-2xl text-gray-400 ml-2">/forever</span>
                </div>
                <p className="text-gray-300">
                  Everything you need to manage your personal finances
                </p>
              </div>

              {/* Features grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-800/30 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{feature.name}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg group"
                >
                  Get Started Free
                  <svg 
                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-4 text-gray-400 text-sm">
                  No credit card required • Set up in minutes
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 