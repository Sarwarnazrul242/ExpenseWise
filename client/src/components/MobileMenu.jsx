import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm" />
      <div className="relative h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold text-xl hover:opacity-90 transition-opacity"
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-2xl text-gray-300 hover:text-white cursor-pointer"
              >
                Home
              </Link>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-xl hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
