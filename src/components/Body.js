import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import BodyShimmer from "./BodyShimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { CARD_1, CARD_2, CARD_3, CARD_4, FETCH_DATA } from "../utils/constants";
import Footer from "./Footer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    const data = filterData(search, listOfRestaurants);
    setFilteredRestaurants(data);
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    const data = await fetch(FETCH_DATA);
    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[6]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants ||
        json?.data?.cards[6]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
  };

  const isOnline = useOnline();
  if (!isOnline) {
    return (
      <h1 className="text-2xl font-bold w-[30%] m-auto">
        Offline, Please Check Your Internet Connection
      </h1>
    );
  }

  if (listOfRestaurants < 1) return <BodyShimmer />;

  return (
    <div className="bg-white w-full h-[50rem] border-box">
      <div>
        <div>
          <div className="w-[100%] bg-black">
            <div className="flex w-[80%] m-auto justify-between">
              {
                <div className="max-w-full">
                  <img
                    className="w-64 h-[100%]  cursor-pointer object-contain border-box md:object-scale-down"
                    alt="card-image-1"
                    src={CARD_1}
                  />
                </div>
              }
              {
                <div className="max-w-full">
                  <img
                    className="w-64 h-[90%] mt-3 cursor-pointer object-contain border-box md:object-scale-down"
                    alt="card-image-2"
                    src={CARD_2}
                  />
                </div>
              }
              {
                <div className="max-w-full">
                  <img
                    className="h-[100%] w-64 cursor-pointer object-contain border-box md:object-scale-down"
                    alt="card-image-3"
                    src={CARD_3}
                  />
                </div>
              }
              {
                <div className="max-w-full">
                  <img
                    className="h-[100%] w-64 cursor-pointer object-contain border-box md:object-scale-down"
                    src={CARD_4}
                  />
                </div>
              }
            </div>
          </div>
          <input
            className="border border-black p-2 rounded-lg mt-5 ml-[35%]"
            name="search"
            type="text"
            placeholder=""
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            className="p-2 ml-2 rounded-lg text-white bg-purple-500 hover:bg-purple-400 font-bold"
            onClick={searchHandler}
          >
            Search
          </button>
          <button
            className="ml-10 p-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-md"
            onClick={() => {
              const filteredItems = listOfRestaurants?.filter(
                (res) => res?.info?.avgRating > 3.5
              );
              setFilteredRestaurants(filteredItems);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="self-center grid gap-x-8 gap-y-4 grid-cols-4">
          {filteredRestaurants?.map((restaurant) => (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
