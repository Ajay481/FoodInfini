import { CDN_URL, STAR } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, costForTwo, avgRating } =
    resData?.info;

  return (
    <div className="m-5 p-5 hover:border-2 border-gray-300">
      <img
        className="h-48 w-[100%] cursor-pointer object-cover"
        src={CDN_URL + cloudinaryImageId}
        alt="foodlogo"
      />
      <h3 className="font-bold mt-3 text-gray-700">{name}</h3>
      <h4 className="text-gray-500 text-sm">{cuisines?.join(",")}</h4>
      <div className="flex w-full justify-between text-gray-500 text-sm mt-4 flex-wrap">
        <h4 className="bg-white text-green-500 font-bold p-[2px] flex">
          {avgRating === undefined ? 4.1 : avgRating}
          <img className="h-4 ml-1 mt-[1px]" alt="star" src={STAR} />
        </h4>
        <h4>{resData?.info?.sla?.deliveryTime} MINS</h4>
        <h4>{costForTwo}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
