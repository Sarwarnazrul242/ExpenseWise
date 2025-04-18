import { RevealOnScroll } from "../../RevealOnScroll";

const benefits = [
  {
    title: "100% Free Forever",
    description: "Unlike other budgeting tools that charge fees, ExpenseWise is completely free for individuals. No hidden costs or premium features locked behind paywalls.",
    icon: "💰",
    stats: "Save money on subscription fees",
  },
  {
    title: "Easy to Get Started",
    description: "Simple signup process - just create an account and start tracking your finances immediately. No credit card required.",
    icon: "🚀",
    stats: "Get started in under 2 minutes",
  },
  {
    title: "Smart Savings Insights",
    description: "Get AI-powered insights to help you save more money. Track your spending patterns and receive personalized recommendations.",
    icon: "📊",
    stats: "Average 15% increase in savings",
  },
  {
    title: "Peace of Mind",
    description: "Stay on top of your finances with real-time tracking and alerts. Know exactly how much you're saving each month.",
    icon: "🛡️",
    stats: "24/7 financial monitoring",
  },
];

export const Benefits = () => {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Why Choose
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              ExpenseWise
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            The only budgeting tool that's completely free for individuals, with all the features you need to manage your finances effectively
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 mb-4">{benefit.description}</p>
                <div className="text-blue-400 font-semibold">{benefit.stats}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 