import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      title: "User Registration",
      description: "Register as admin, resident, or apartment owner with simple forms.",
    },
    {
      title: "Apartment Management",
      description: "Add and manage apartment details and resident information.",
    },
    {
      title: "Maintenance Tickets",
      description: "Create and track maintenance requests and complaints.",
    },
    {
      title: "Payment Tracking",
      description: "Track maintenance payments and view payment history.",
    },
  ];

  if (showLogin) {
    return (
      <LoginForm
        onBack={() => setShowLogin(false)}
        onSwitchToSignup={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  Nivasa
                </span>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simplify Your
            <span className="text-blue-600 block mt-2">Apartment Management</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Streamline maintenance requests, manage tenants, and keep your
            property running smoothly with our comprehensive apartment
            administration platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-3 h-auto">
              <Link to="/register-apartment">
                Register New Apartment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-3 h-auto"
            >
              <Link to="/resident-registration">Join as Resident</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowLogin(true)}
              className="text-lg px-8 py-3 h-auto"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-90">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Platform
              <span className="text-black-600 block mt-1">Offers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential features for managing apartment complexes efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:shadow-black/5 transition-all duration-300 rounded-lg"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 flex-shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">Nivasa</span>
          </div>
          <p className="text-center text-sm text-gray-400">
            © 2025 Nivasa. All rights reserved. Simplifying apartment
            management one property at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
