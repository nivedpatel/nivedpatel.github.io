import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2 hover:font-bold"
          >
            <AiOutlineHome className="ml-2 mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">HOME</span>
            {""}
          </Link>
          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2 hover:font-bold"
          >
            <AiOutlineShopping className="ml-2 mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2 hover:font-bold"
          >
            <AiOutlineShoppingCart className="ml-2 mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">CART</span>
          </Link>
          <Link
            to="/favourite"
            className="flex items-center transition-transform transform hover:translate-x-2 hover:font-bold"
          >
            <FaHeart className="ml-2 mr-2 mt-[3rem]" size={26} />
            <span className="hidden nav-item-name mt-[3rem]">FAVOURITES</span>
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-grey-8000 focus-outline-none ml-2"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xlmns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>
          <div className="bg-gray-600">
            {dropdownOpen && userInfo && (
              <ul
                className={`absolute right-0 mt-2 mr-14 space-y-2 bg-gray-600 text-gray-600 ${
                  !userInfo.isAdmin ? "-top-20" : "-top-80"
                }`}
              >
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-500  text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-500  text-white"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-500  text-white"
                      >
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-500  text-white"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-500  text-white"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-500   text-white"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    onClick={logoutHandler}
                    className="block w-full px-4 py-2 text-left  hover:bg-gray-500 text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-centertransition-transform transform hover:translate-x-2 hover:font-bold"
              >
                <AiOutlineLogin className="ml-2 mr-2 mt-[3rem]" size={26} />
                <span className="hidden nav-item-name mt-[3rem]">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-centertransition-transform transform hover:translate-x-2 hover:font-bold"
              >
                <AiOutlineUserAdd
                  className="ml-2 mr-2 mt-[3rem] mb-2"
                  size={26}
                />
                <span className="hidden nav-item-name mt-[3rem]">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navigation;
