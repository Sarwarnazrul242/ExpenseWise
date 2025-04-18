import { RevealOnScroll } from "../../RevealOnScroll";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    avatar: "👩‍💻",
    quote: "ExpenseWise has completely transformed how I manage my finances. The insights are incredibly helpful!",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "👨‍💻",
    quote: "Finally, a budgeting app that actually helps me save money. The smart suggestions are spot on!",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "👩‍💼",
    quote: "As a business owner, keeping track of expenses was always a challenge. ExpenseWise made it simple and effective.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              Users
            </span>
            {" "}Say
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-6xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}; 