import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const submitHandler = async(e) => {
   e.preventDefault();

   if(password !== confirmPassword){
      toast.error("Passwords doesn't match");
   } else {
    try {
       const res = await register({username, email, password}).unwrap();
       dispatch(setCredentials({...res}));
       navigate(redirect);
       toast.success("User registered succesfuly");

    } catch (error) {
       console.log(error);
       toast.error(error?.data?.message) || error.message;
    }
   }
     
  }



  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>
        <form onSubmit={submitHandler} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full bg-neutral-600 text-white"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full bg-neutral-600 text-white"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full bg-neutral-600 text-white"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full bg-neutral-600 text-white"
              placeholder="re-type password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-500 px-4 py-2 text-white rounded my-[1rem]"
          >
            {isLoading ? "Registering" : "Register"}
          </button>

        {isLoading && <Loader/>}

        </form>

        <div>
         <p className="text-white">
          Already have an account ? {" "}
         <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-pink-500 hover:underline">Login
         </Link>
         </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
