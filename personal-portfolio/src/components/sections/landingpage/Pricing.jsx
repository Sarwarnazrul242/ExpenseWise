import { RevealOnScroll } from "../../RevealOnScroll";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free Forever",
    price: "Free",
    description: "Perfect for individuals who want to track their finances without any cost",
    features: [
      "Unlimited expense tracking",
      "Monthly budget creation",
      "Smart spending insights",
      "Visual reports & analytics",
      "Email support",
      "Unlimited connected accounts",
      "Custom categories",
      "Export reports",
    ],
    color: "from-blue-500 to-purple-600",
    popular: true,
  },
  {
    name: "Business",
    price: "$24.99",
    period: "/month",
    description: "For teams and growing businesses",
    features: [
      "All Free features",
      "Team collaboration",
      "Advanced reporting",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Training sessions",
    ],
    color: "from-pink-500 to-pink-600",
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Completely
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Free
            </span>
            {" "}for Individuals
          </h2>
          <p className="text-xl text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Unlike other budgeting tools that charge fees, ExpenseWise is completely free for individuals. 
            No hidden costs, no premium features locked behind paywalls.
          </p>
          <p className="text-lg text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Simple signup process - just create an account and start tracking your finances immediately.
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className={`relative bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm border ${
                plan.popular ? "border-blue-500" : "border-gray-700"
              } transition-all duration-300 transform hover:-translate-y-2`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r text-transparent bg-clip-text">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 ml-1">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/login"
                  className={`w-full py-3 px-4 rounded-lg font-semibold ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } transition-colors`}
                >
                  {plan.popular ? "Start Free Now" : "Contact Sales"}
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 