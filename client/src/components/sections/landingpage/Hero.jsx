import { RevealOnScroll } from "../../RevealOnScroll";
import { Link as ScrollLink } from "react-scroll";
import { TextHoverEffect } from "../../ui/TextHoverEffect";
import { Link as RouterLink } from "react-router-dom";

export const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Text Hover Effect Background */}
      <div className="absolute inset-0 opacity-20">
        <TextHoverEffect text="ExpenseWise" duration={0.1} />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <RevealOnScroll>
          <div className="inline-block bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🎉 100% Free Forever for Individuals
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            The Only Budgeting Tool That's
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block">
              Completely Free
            </span>
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlike other tools that charge fees, ExpenseWise gives you everything you need to manage your money - 
            <span className="text-white font-semibold"> completely free</span>. No hidden costs, no premium features locked behind paywalls.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
            >
              Get Started for Free
            </RouterLink>
            <ScrollLink
              to="features"
              smooth={true}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </ScrollLink>
          </div>
          <p className="mt-6 text-gray-400 text-sm">
            No credit card required • Simple signup • Get started in 2 minutes
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 