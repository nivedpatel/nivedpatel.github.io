import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const userInfo = useSelector((state) => state.auth);

  const [username, setUsername] = useState(userInfo.username || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords doesn't match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated succesfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[4rem]">
      <div className="flex justify-center align-center md:flex md-space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Update Profile
          </h2>
          <form onSubmit={submitHandler} className="text-white">
            <div className="mt-4">
              <label htmlFor="name" className="block  m-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-2 w-full border rounded-sm bg-neutral-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block  m-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-2 w-full border rounded-sm bg-neutral-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block  m-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input p-2 w-full border rounded-sm bg-neutral-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword" className="block  m-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-type password"
                className="form-input p-2 w-full border rounded-sm bg-neutral-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600 mt-5"
              >
                Update
              </button>
              <Link
                to="/users-orders"
                className="bg-pink-600 mt-5 px-4 py-2 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>

        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
