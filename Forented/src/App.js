import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Components/Users/Register";
import Login from "./Components/Users/Login";
import Dashboard from "./Components/Users/Dashboard";
import PrivateNavbar from "./Components/Navbar/PrivateNavbar";
import PublicNavbar from "./Components/Navbar/PublicNavbar";
import Home from "./Components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import BlogPostAIAssistant from "./Components/ContentGeneration/ContentGeneration";
import Plans from "./Components/Plans/Plan";
import FreePlanSignup from "./Components/StripePayment/FreePlanSignup";
import CheckoutForm from "./Components/StripePayment/CheckoutForm";
import PaymentSuccess from "./Components/StripePayment/PaymentSuccess";
import ContentGenerationHistory from "./Components/ContentGeneration/ContentHistory";
import AboutUs from "./Components/About/About";
import AppFeatures from "./Components/Features/Features";

const App = () => {
  // custom auth hooks
  const { isAuthenticated } = useAuth();
  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/generate-content"
            element={
              <AuthRoute>
                <BlogPostAIAssistant />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <ContentGenerationHistory />
              </AuthRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route
            path="/free-plan"
            element={
              <AuthRoute>
                <FreePlanSignup />
              </AuthRoute>
            }
          />
          <Route path="/checkout/:plan" element={<CheckoutForm />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<AppFeatures />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
