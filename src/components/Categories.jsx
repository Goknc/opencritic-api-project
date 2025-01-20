import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://opencritic-api.p.rapidapi.com/genre";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          "x-rapidapi-host": "opencritic-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const arrResult = JSON.parse(result);
        setCategories(arrResult);
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };
    setTimeout(() => {
      fetchData();
    }, 2500);
  }, []);
  return (
    <div className="container mx-auto py-12">
      <div className="flex">
        <h4 className="font-bold text-2xl text-white py-5">Categories</h4>
      </div>
      <div className="cards grid lg:grid-rows-6 grid-flow-col gap-4 grid-rows-12">
        {categories.map((category) => (
          <div key={category.id} className="card border-2 border-white">
            <h6 className="text-white font-bold text-lg">{category.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
