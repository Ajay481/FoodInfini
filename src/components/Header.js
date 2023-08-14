import {
  HELP,
  HOME_ICON,
  USER_ICON,
  LOGO_URL,
  ORDERS,
} from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartList, toggleMenu } from "../utils/cartSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const cartQuantity = useSelector((store) => store.cart.quantity);
  const token = useSelector((store) => store.auth.token);
  const userId = useSelector((store) => store.auth.userId);
  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");

  const toggleHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    if (userId) dispatch(getCartList(newEmailId));
  }, [userId]);

  useEffect(() => {
    localStorage.getItem("token")
      ? setUserLoggedIn(true)
      : setUserLoggedIn(false);
  }, [token, userId]);

  return (
    <div className="flex bg-white sticky top-0 w-full justify-evenly">
      <div className="w-[50%]" onClick={() => navigate("/")}>
        <img className="h-20 p-2 cursor-pointer mx-auto" src={LOGO_URL} />
      </div>
      <div className="flex w-[50%]">
        <ul className="flex m-7 justify-end w-full">
          <Link to="/">
            <li className="hover:text-orange-400 flex font-bold mr-6">
              <img className="h-5 mr-1" alt="home" src={HOME_ICON} />
              Home
            </li>
          </Link>

          <Link to="/help">
            <li className="hover:text-orange-400 flex font-bold mr-6">
              <img className="h-5 mr-1 mt-[2px]" alt="help" src={HELP} />
              Help
            </li>
          </Link>
          {userLoggedIn ? (
            <Link to="/cart">
              <li className="font-bold hover:text-orange-400 mr-6">
                {cartQuantity === 0 ? (
                  <button className="font-bold bg-white text-black border border-black px-1 mr-1">
                    {cartQuantity}
                  </button>
                ) : (
                  <button className="font-bold bg-green-500 text-white px-1 mr-1">
                    {cartQuantity}
                  </button>
                )}
                Cart
              </li>
            </Link>
          ) : null}
          {userLoggedIn ? (
            <Link to="/orders">
              <li className="hover:text-orange-400 flex font-bold mr-6">
                <img className="h-5 mr-1 mt-[2px]" alt="orders" src={ORDERS} />
                Orders
              </li>
            </Link>
          ) : null}
          <button onClick={toggleHandler}>
            <li className="hover:text-orange-400 flex font-bold mr-6">
              <img className="h-5 mr-1 mt-[2px]" alt="user" src={USER_ICON} />
              {userLoggedIn ? "User" : "Sign In"}
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
