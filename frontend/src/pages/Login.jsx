import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";
import { validateEmail, validatePassword } from "../utils/validation";
import { toast } from "react-hot-toast";
import Heading from "../components/Heading";
import InputField from "../components/InputField";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!inputs.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(inputs.email)) newErrors.email = "Invalid email address";

    if (!inputs.password.trim()) newErrors.password = "Password is required";
    else if (!validatePassword(inputs.password))
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const res = await login(inputs).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100  dark:bg-gray-900 px-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <Heading title="Login" />

        <form onSubmit={submitHandler} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
          />
          <div className="relative">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="********"
            error={errors.password}
          /> 
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-10 text-gray-600 dark:text-gray-300 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-800 font-bold text-white rounded-md hover:bg-gray-700 cursor-pointer p-2 w-full"
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
          <div className="flex items-center flex-col gap-4 justify-between">
            <Link
              to="/signup"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Don't have an account? Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
