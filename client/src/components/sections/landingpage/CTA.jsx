import { RevealOnScroll } from "../../RevealOnScroll";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <RevealOnScroll>
          <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-gray-700/50">
            <span className="animate-pulse mr-2">🚀</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
              Get Started in Minutes
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Start managing your money like a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}pro
            </span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-xl text-gray-300 mb-12">
            Take control of your finances today with our simple and powerful expense tracking tools.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <Link 
            to="/login"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg group"
          >
            Get Started Now
            <svg 
              className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="mt-6 text-gray-400 text-sm">
            No credit card required • Free forever for individuals
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 