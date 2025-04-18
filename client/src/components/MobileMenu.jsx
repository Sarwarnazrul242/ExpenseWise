import { Link } from "react-scroll";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" />
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="features"
            smooth={true}
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="how-it-works"
            smooth={true}
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-300 hover:text-white cursor-pointer"
          >
            How It Works
          </Link>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-xl hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
