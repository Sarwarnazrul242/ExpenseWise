import { RevealOnScroll } from "../../RevealOnScroll";
import { LineChart, PieChart, Wallet, TrendingUp } from "lucide-react";
import dashboard from "../../../assets/dashboard.png";

const features = [
  {
    name: "Expense Analytics",
    description: "Get clear insights into your spending patterns with beautiful charts and breakdowns.",
    icon: <LineChart className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Budget Overview",
    description: "See your budget allocation and track your progress in real-time.",
    icon: <PieChart className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Income Tracking",
    description: "Monitor multiple income streams and manage your earnings effectively.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-green-500 to-green-600"
  },
  {
    name: "Balance Management",
    description: "Keep track of your savings and maintain a healthy financial balance.",
    icon: <Wallet className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600"
  }
];

export const Integrations = () => {
  return (
    <section id="dashboard-preview" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-gray-700/50">
              <span className="animate-pulse mr-2">💡</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
                Powerful Yet Simple
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Beautiful Dashboard
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block mt-2">
                For Your Finances
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to manage your money, all in one place
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Dashboard Preview */}
          <RevealOnScroll>
            <div className="relative group">
              {/* Image Container with Effects */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/90 via-gray-900/50 to-transparent opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
                
                {/* Dashboard Image */}
                <img 
                  src={dashboard} 
                  alt="ExpenseWise Dashboard" 
                  className="w-full rounded-2xl transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white text-sm px-3">Live Preview</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <div className="group relative">
                  {/* Card */}
                  <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
                    {/* Gradient line */}
                    <div className={`h-1 w-12 rounded-full mb-4 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-300 group-hover:scale-x-150`}></div>
                    
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                      {feature.icon}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600">
                      {feature.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll>
          <div className="text-center">
            <a href="/login" className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg group">
              Get Started Now
              <svg 
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 