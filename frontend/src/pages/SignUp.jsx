import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { validateEmail, validatePassword } from "../utils/validation";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../redux/usersApiSlice";
import InputField from "../components/InputField";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
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

    if (!inputs.username.trim()) newErrors.username = "Username is required";

    if (!inputs.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(inputs.email))
      newErrors.email = "Invalid email address";

    if (!inputs.password.trim()) newErrors.password = "Password is required";
    else if (!validatePassword(inputs.password))
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await register(inputs).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Create New Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <InputField
            label="Username"
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            placeholder="john2025"
            error={errors.username}
          />

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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Role
            </label>
            <select
              name="role"
              value={inputs.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {isLoading && <Loader />}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-800 font-bold text-white rounded-md hover:bg-gray-700 cursor-pointer p-2 w-full"
          >
            {isLoading ? "Registering..." : "Signup"}
          </button>
          <div className="flex items-center flex-col gap-4 justify-between">
            <Link
              to="/login"
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Already registered? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
