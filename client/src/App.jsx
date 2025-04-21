import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Hero } from "./components/sections/landingpage/Hero";
import { Features } from "./components/sections/landingpage/Features";
import { Benefits } from "./components/sections/landingpage/Benefits";
import { Pricing } from "./components/sections/landingpage/Pricing";
import { BackgroundAnimation } from "./components/BackgroundAnimation";
import { LoadingScreen } from "./components/LoadingScreen";
import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { HowItWorks } from "./components/sections/landingpage/HowItWorks";
import { Integrations } from "./components/sections/landingpage/Integrations";
import { Testimonials } from "./components/sections/landingpage/Testimonials";
import { CTA } from "./components/sections/landingpage/CTA";
import { Footer } from "./components/Footer";
import "./index.css";
import { GradientBackground } from "./components/GradientBackground";
import { Login } from "./components/sections/loginpage/Login";
import { Signup } from "./components/sections/loginpage/Signup";
import { VerifyEmail } from "./components/sections/loginpage/VerifyEmail";
import { ForgotPassword } from "./components/sections/loginpage/ForgotPassword";
import { Dashboard } from "./components/sections/dashboard/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Redirect if authenticated component
const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

// AppContent component that uses auth context
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-black">
      <div className="fixed inset-0">
        <BackgroundAnimation />
        <GradientBackground />
      </div>

      {/* Loading screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div
        className={`relative min-h-screen transition-opacity duration-700 ${
          !isLoading ? "opacity-100" : "opacity-0"
        } text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        
        <Routes>
          <Route path="/" element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <>
                <Hero />
                <Features />
                <Benefits />
                <HowItWorks />
                <Integrations />
                <Testimonials />
                <Pricing />
                <CTA />
                <Footer />
              </>
            )
          } />
          <Route path="/login" element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          } />
          <Route path="/signup" element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          } />
          <Route path="/verify-email" element={
            <RedirectIfAuthenticated>
              <VerifyEmail />
            </RedirectIfAuthenticated>
          } />
          <Route path="/forgot-password" element={
            <RedirectIfAuthenticated>
              <ForgotPassword />
            </RedirectIfAuthenticated>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
