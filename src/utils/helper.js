export const filterData = (search, listOfRestaurants) => {
  const filteredData = listOfRestaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(search.toLowerCase())
  );
  return filteredData;
};
