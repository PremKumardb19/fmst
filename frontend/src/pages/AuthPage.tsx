import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore"; // Import Zustand store

const AuthPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore(); // Access Zustand store
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isRegister ? "http://localhost:5000/auth/register" : "http://localhost:5000/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        if (isRegister) {
          setIsRegister(false);
          setFormData({ name: "", email: "", password: "" });
          alert("Registration successful! Please login.");
        } else {
          setUser({ id: data.user.id, email: data.user.email,name:data.user.name });
          localStorage.setItem("token", data.token);

          navigate("/home");
        }
      } else {
        alert(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
                <UserCircle className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-white">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-blue-100 text-center mt-2">
              {isRegister 
                ? "Sign up to get started with your account" 
                : "Sign in to continue your journey"}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isRegister && (
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ textTransform: "uppercase" }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span className="font-medium">{isRegister ? "Create Account" : "Sign In"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isRegister ? "Already have an account?" : "Don't have an account?"}
                <button
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-blue-500 hover:text-blue-600 font-medium ml-2 transition-colors duration-200"
                >
                  {isRegister ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
