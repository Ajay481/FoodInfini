import ItemList from "./ItemList";

const RestaurantCategory = ({ data, title, showItems, ShowIndex }) => {
  return (
    <div className="w-[100%] min-w-[60rem] bg-white my-4 shadow-lg rounded-lg">
      <div
        className="flex justify-between cursor-pointer p-3"
        onClick={ShowIndex}
      >
        <span className="text-lg font-bold">
          {data?.title} ({data?.itemCards?.length})
        </span>
        <span>{showItems ? "⌃" : "⌄"}</span>
      </div>
      {showItems && <ItemList items={data?.itemCards} hotel={title} />}
    </div>
  );
};

export default RestaurantCategory;
