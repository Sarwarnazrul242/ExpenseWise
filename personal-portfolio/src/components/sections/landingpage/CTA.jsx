import { RevealOnScroll } from "../../RevealOnScroll";

export const CTA = () => {
  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <RevealOnScroll>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start managing your money like a
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              {" "}
              pro
            </span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already taking control of their finances with ExpenseWise.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity text-lg">
            Join ExpenseWise Now
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
}; 