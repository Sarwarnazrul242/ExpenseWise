import { RevealOnScroll } from "../../RevealOnScroll";
import { 
  LineChart, 
  Wallet, 
  Target,
  PlusCircle
} from "lucide-react";

const features = [
  {
    title: "Expense Tracking",
    description: "Easily record and categorize your daily expenses to understand your spending habits.",
    icon: <LineChart className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    gradient: "group-hover:from-blue-400 group-hover:to-blue-600"
  },
  {
    title: "Budget Planning",
    description: "Create and manage monthly budgets to keep your spending in check.",
    icon: <Target className="w-6 h-6" />,
    color: "from-purple-500 to-purple-600",
    gradient: "group-hover:from-purple-400 group-hover:to-purple-600"
  },
  {
    title: "Easy Data Entry",
    description: "Quick and simple expense entry with custom categories and descriptions.",
    icon: <PlusCircle className="w-6 h-6" />,
    color: "from-green-500 to-green-600",
    gradient: "group-hover:from-green-400 group-hover:to-green-600"
  },
  {
    title: "Balance Overview",
    description: "Keep track of your current balance and see how your spending affects your budget.",
    icon: <Wallet className="w-6 h-6" />,
    color: "from-pink-500 to-pink-600",
    gradient: "group-hover:from-pink-400 group-hover:to-pink-600"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Essential Features for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                {" "}Better Budgeting
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple yet powerful tools to help you track and manage your expenses effectively.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${feature.gradient}`}></div>
                
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 