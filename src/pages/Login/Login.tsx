import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/features/authThunks";
import { Eye, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm<LoginForm>();
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/cards");
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      // Navigation will be handled by the useEffect hook
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl border-[1.5px] px-6 py-10"
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-8">
              Welcome Back
            </p>
            {/* Email */}
            <div className="flex items-center border-2 border-gray-300 focus-within:border-black mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                id="email"
                className="pl-2 w-full outline-none border-none"
                type="email"
                placeholder="Email Address"
                {...register("email")}
              />
            </div>

            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl focus-within:border-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 w-full outline-none border-none"
                type={show ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              {!show ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <EyeOffIcon
                  className="cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
