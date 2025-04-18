import { RevealOnScroll } from "../../RevealOnScroll";

const steps = [
  {
    number: "01",
    title: "Add your income & expenses",
    description: "Easily record your daily transactions and income sources in one place.",
    icon: "📝",
  },
  {
    number: "02",
    title: "Set your monthly budget goals",
    description: "Create personalized budgets for different categories and set spending limits.",
    icon: "🎯",
  },
  {
    number: "03",
    title: "Get smart insights & suggestions",
    description: "Receive personalized recommendations based on your spending patterns.",
    icon: "💡",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            How
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              ExpenseWise
            </span>
            {" "}Works
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="group relative">
                <div className="absolute -top-4 -left-4 text-6xl font-bold text-gray-700 group-hover:text-blue-500 transition-colors">
                  {step.number}
                </div>
                <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 group-hover:border-blue-500 transition-all duration-300 transform group-hover:-translate-y-2">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 