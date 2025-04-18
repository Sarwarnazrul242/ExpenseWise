import { RevealOnScroll } from "../../RevealOnScroll";

const integrations = [
  {
    name: "Banking",
    services: ["Chase", "Bank of America", "Wells Fargo", "Capital One"],
    icon: "🏦",
  },
  {
    name: "Payment",
    services: ["PayPal", "Venmo", "Square", "Stripe"],
    icon: "💳",
  },
  {
    name: "Investing",
    services: ["Robinhood", "Fidelity", "Vanguard", "Charles Schwab"],
    icon: "📈",
  },
  {
    name: "Accounting",
    services: ["QuickBooks", "Xero", "FreshBooks", "Wave"],
    icon: "📊",
  },
];

export const Integrations = () => {
  return (
    <section id="integrations" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Seamless
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Integrations
            </span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Connect with your favorite financial services and platforms
          </p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((integration, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{integration.name}</h3>
                <ul className="space-y-2">
                  {integration.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <div className="mt-12 text-center">
          <RevealOnScroll>
            <p className="text-gray-300 mb-4">And many more integrations available...</p>
            <button className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              View All Integrations
            </button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}; 