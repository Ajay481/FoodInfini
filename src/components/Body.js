import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import BodyShimmer from "./BodyShimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { CARD_1, CARD_2, CARD_3, CARD_4, FETCH_DATA } from "../utils/constants";

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
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ||
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
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
    <div className="bg-white m-2 w-full h-[50rem] overflow-scroll">
      <div>
        <div>
          <div className="flex w-[100%] h-[21rem] p-5 justify-evenly bg-black">
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-1"
                src={CARD_1}
              />
            }
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-2"
                src={CARD_2}
              />
            }
            {
              <img
                className="w-72 h-72 cursor-pointer"
                alt="card-image-3"
                src={CARD_3}
              />
            }
            {<img className="w-72 h-72 cursor-pointer" src={CARD_4} />}
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
                (res) => res?.info?.avgRating > 3
              );
              setFilteredRestaurants(filteredItems);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex flex-wrap">
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
    </div>
  );
};

export default Body;
