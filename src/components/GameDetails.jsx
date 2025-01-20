import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameDetails() {
  const { id } = useParams();
  const imgURL = "https://img.opencritic.com/";

  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://opencritic-api.p.rapidapi.com/game/${id}`;
      const urlForReviews = `https://opencritic-api.p.rapidapi.com/reviews/game/${id}?skip=20&sort=popularity`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          "x-rapidapi-host": "opencritic-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const responseForReviews = await fetch(urlForReviews, options);

        const result = await response.text();
        const resultForReviews = await responseForReviews.text();

        const arrResult = JSON.parse(result);
        const arrResultForReviews = JSON.parse(resultForReviews);

        setGameDetails(arrResult);
        setReviews(arrResultForReviews);
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [id]);

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container min-h-screen">
      <div className="py-16 flex justify-between items-center flex-col lg:flex-row">
        <img
          className="w-[750px]"
          src={imgURL + gameDetails.images.masthead.lg}
          alt={gameDetails.name}
        />
        <div className="w-full lg:w-1/2">
          <h1 className="text-white text-3xl lg:text-6xl font-bold text-left">
            {gameDetails.name}
          </h1>
          <p className="text-white mt-5 lg:text-xl text-left text-sm">
            {gameDetails.description}
          </p>
          <div className="flex items-start lg:items-center mt-4 flex-col lg:flex-row">
            <p className="text-white text-xl text-left font-bold">Genres:</p>
            <div>
              {gameDetails.Genres.map((genre, index) => (
                <span
                  key={genre.name}
                  className="ml-0 lg:ml-1 text-white text-sm lg:text-lg"
                >
                  {genre.name}
                  {index !== gameDetails.Genres.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start lg:items-center mt-4 flex-col lg:flex-row">
            <p className="text-white text-xl text-left font-bold">Creators:</p>
            <div>
              {gameDetails.Companies.map((company, index) => (
                <span
                  key={index}
                  className="ml-0 lg:ml-1 text-white text-sm lg:text-lg"
                >
                  {company.name}({company.type})
                  {index !== gameDetails.Companies.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start lg:items-center mt-4 flex-col lg:flex-row">
            <p className="text-white text-xl text-left font-bold">
              Release Date:
            </p>
            <span className="ml-0 lg:ml-1 text-white text-sm lg:text-lg">
              {gameDetails.firstReleaseDate.slice(0, 10)}
            </span>
          </div>
          <div className="flex items-start lg:items-center mt-4 flex-col lg:flex-row">
            <p className="text-white text-xl text-left font-bold">
              Available on:
            </p>
            <div>
              {gameDetails.Platforms.map((platform, index) => (
                <span
                  key={platform.name}
                  className="ml-0 lg:ml-1 text-white text-sm lg:text-lg"
                >
                  {platform.name}
                  {index !== gameDetails.Platforms.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start lg:items-center mt-4 flex-col lg:flex-row">
            <p className="text-white text-xl text-left font-bold">
              Critic Score:
            </p>
            <span className="ml-0 lg:ml-1 text-white text-sm lg:text-lg">
              {gameDetails.topCriticScore.toString().slice(0, 2)} / 100
            </span>{" "}
          </div>
        </div>
      </div>
      <div className="py-16">
        <h2 className="font-bold text-2xl lg:text-5xl text-white pb-12 ">
          Critic Reviews
        </h2>
        <ul className="grid lg:grid-cols-3 grid-cols-1 grid-flow-row gap-4 text-white font-lg text-lg text-left">
          {reviews.length > 0 ? (
            reviews.map(
              (review) =>
                review.score && (
                  <li className="bg-white p-6" key={review.Outlet.name}>
                    <div className="flex items-center text-black">
                      <img
                        className="w-[48px]"
                        src={imgURL + review.Outlet.imageSrc.og}
                        alt={review.Outlet.name}
                      />
                      <span className="text-[#FF5733] text-xl font-bold mr-2 ml-4">
                        {review.Outlet.name}:
                      </span>
                      {review.score} / 100
                    </div>

                    <p className="mt-4 text-black">{review.snippet}</p>
                  </li>
                )
            )
          ) : (
            <h3 className="text-center text-white text-3xl col-start-2">
              No critic review found for this game!
            </h3>
          )}
        </ul>
      </div>
    </div>
  );
}

export default GameDetails;
