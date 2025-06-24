import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const ResidentRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    flatNumber: "",
    apartmentCode: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5001/api/auth/signup-resident", {
        username: formData.username,
        phoneNumber: formData.phone,
        flatNumber: formData.flatNumber,
        password: formData.password,
        apartmentCode: formData.apartmentCode,
      });

      toast({
        title: "Account created!",
        description: "Login to access dashboard",
      });
      navigate("/login-form");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.response?.data?.error || "Server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Nivasa
            </span>
          </div>
          <CardTitle className="text-2xl">Resident Registration</CardTitle>
          <CardDescription>
            Join your apartment community as a resident
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="flatNumber">Flat Number</Label>
              <Input
                id="flatNumber"
                value={formData.flatNumber}
                onChange={(e) => handleChange("flatNumber", e.target.value)}
                placeholder="e.g., 2A, 15B, 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartmentCode">Apartment Code</Label>
              <Input
                id="apartmentCode"
                value={formData.apartmentCode}
                onChange={(e) => handleChange("apartmentCode", e.target.value)}
                placeholder="Enter code provided by admin"
                required
              />
              <p className="text-xs text-gray-500">
                Get this code from your apartment admin or another resident
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Join Apartment"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need to create a new apartment?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/register-apartment")}
                className="p-0 h-auto text-blue-600 hover:underline font-medium"
              >
                Register new apartment
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidentRegistration;
