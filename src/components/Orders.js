import { useSelector, useDispatch } from "react-redux";
import { getOrderList } from "../utils/orderSlice";
import { useEffect } from "react";
import Error from "./Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EMPTY_ORDERS } from "../utils/constants";

const Orders = () => {
  const orderItems = useSelector((store) => store.order.items);
  const userId = useSelector((store) => store.auth.userId);
  const a = userId?.replace("@", "");
  const newEmailId = a?.replace(".", "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getOrderList(newEmailId));
  }, [userId]);

  return userId ? (
    <div className="bg-gray-100 w-[100vw] overflow-scroll h-[51rem]">
      {orderItems?.length > 0 ? (
        <div>
          {orderItems?.map((item) => (
            <div key={item?.id} className="mt-5">
              <h1 className="text-3xl m-auto font-bold bg-gray-800 text-center p-2 text-white w-[70%]">
                {item?.item[0]?.hotel}
              </h1>
              {item?.item?.map((dish) => (
                <div
                  className="w-[70%] m-auto p-4 bg-white flex justify-between"
                  key={dish?.id}
                >
                  <p className="w-1/3 text-2xl text-gray-600">{dish?.name}</p>
                  <div>
                    <p className="font-bold text-2xl text-green-700">
                      x{dish?.quantity}
                    </p>
                  </div>
                  <p className="text-gray-600 text-2xl w-1/12">
                    ₹{dish?.totalPrice / 100}
                  </p>
                </div>
              ))}
              <div className="w-[70%] m-auto p-4 border-t-2 border-green-400 bg-white flex justify-between">
                <p className="font-bold text-2xl">PAID</p>
                <p className="font-bold text-2xl w-1/12">₹{item.amount}</p>
              </div>
            </div>
          ))}
          <ToastContainer />
        </div>
      ) : (
        <div className="w-full justify-center m-auto mt-32">
          <img
            className="justify-center m-auto"
            alt="empty-orders"
            src={EMPTY_ORDERS}
          />
          <div className="w-[30%] text-center m-auto">
            <h1 className="mt-4 font-bold text-2xl">No Orders</h1>
            <p>
              Go ahead and find some awesome restaurants near you...
            </p>
            <button className="bg-red-500 rounded-lg mt-10 text-white font-bold p-3">
              SEE RESTAURANTS NEAR YOU
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Error />
  );
};

export default Orders;
