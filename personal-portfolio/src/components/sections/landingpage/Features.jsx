import { RevealOnScroll } from "../../RevealOnScroll";

const features = [
  {
    title: "Real-time Expense Tracking",
    description: "Monitor your spending in real-time with instant categorization and smart notifications.",
    icon: "📱",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Smart Budgeting",
    description: "AI-powered budget recommendations based on your spending patterns and financial goals.",
    icon: "🧠",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Monthly Summaries",
    description: "Get comprehensive monthly reports with visual breakdowns of your income and expenses.",
    icon: "📊",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Visual Reports",
    description: "Beautiful charts and graphs to help you understand your financial patterns at a glance.",
    icon: "📈",
    color: "from-pink-500 to-pink-600",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Powerful Features to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Manage Your Money
            </span>
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="group bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} text-transparent bg-clip-text`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 