import { RevealOnScroll } from "../../RevealOnScroll";
import { PlusCircle, Target, LineChart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up for free in seconds - no credit card required. Just enter your email to get started.",
    icon: <PlusCircle className="w-8 h-8" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    number: "02",
    title: "Set Your Budget",
    description: "Define your monthly budget and create custom categories that match your spending habits.",
    icon: <Target className="w-8 h-8" />,
    color: "from-purple-500 to-purple-600"
  },
  {
    number: "03",
    title: "Track Expenses",
    description: "Log your daily expenses easily and see how they align with your budget in real-time.",
    icon: <LineChart className="w-8 h-8" />,
    color: "from-green-500 to-green-600"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-900/50 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-gray-700/50">
              <span className="animate-pulse mr-2">✨</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-medium">
                Simple Process, Powerful Results
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Start Managing Your Money
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 block mt-2">
                In Three Easy Steps
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started with ExpenseWise is quick and easy
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 blur-sm"></div>
          </div>

          {steps.map((step, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className={`flex flex-col lg:flex-row items-center gap-12 mb-24 ${
                index % 2 === 0 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                  <div className="relative group">
                    {/* Floating number with 3D effect */}
                    <span className={`text-[120px] font-black absolute -top-16 ${
                      index % 2 === 0 ? 'lg:-left-8' : 'lg:-right-8'
                    } text-gray-800/10 select-none transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      {step.number}
                    </span>
                    
                    {/* Content with hover effects */}
                    <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className={`h-1 w-24 mb-6 bg-gradient-to-r ${step.color} rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-125 ${
                        index % 2 === 0 ? 'ml-auto' : ''
                      }`}></div>
                      <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Icon with enhanced effects */}
                <div className="lg:flex-none group perspective-1000">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${step.color} p-0.5 relative transform transition-all duration-500 group-hover:rotate-y-180 preserve-3d`}>
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gray-900/90 backdrop-blur-xl flex items-center justify-center transform preserve-3d backface-hidden">
                      <div className="text-white transform transition-transform duration-500 group-hover:scale-110">
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gray-900/90 backdrop-blur-xl flex items-center justify-center transform rotate-y-180 preserve-3d backface-hidden">
                      <span className="text-2xl">{step.number}</span>
                    </div>
                    
                    {/* Glowing effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-${step.accent}-500/20 blur-xl transition-opacity duration-500 opacity-0 group-hover:opacity-100`}></div>
                    
                    {/* Connector with animation */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex absolute top-full left-1/2 transform -translate-x-1/2 mt-8">
                        <ArrowRight className={`w-8 h-8 text-${step.accent}-500 animate-bounce`} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 