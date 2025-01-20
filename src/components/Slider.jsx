import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SlLike } from "react-icons/sl";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";

function Slider() {
  const [topGames, setTopGames] = useState([]);
  const [title, setTitle] = useState();
  const [score, setScore] = useState(0);
  const [date, setDate] = useState("");
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [gameId, setGameId] = useState("");
  const [reviews, setReviews] = useState(0);

  const imgURL = "https://img.opencritic.com/";
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://opencritic-api.p.rapidapi.com/game?platforms=all&sort=percent-recommended&order=desc&skip=20";
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
        setTopGames(arrResult);
        setTitle(arrResult[0]?.name || "No Title");
        setScore(
          arrResult[0]?.topCriticScore?.toString()?.slice(0, 2) || "N/A"
        );
        setDate(arrResult[0]?.firstReleaseDate?.slice(0, 10) || "Unknown Date");
        setGenres(arrResult[0]?.Genres?.map((genre) => genre.name) || []);
        setPlatforms(
          arrResult[0]?.Platforms?.map((platform) => platform.name) || []
        );
        setGameId(arrResult[0]?.id || "#");
        setReviews(arrResult[0]?.numReviews || "N/A");
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  return (
    <div className="container flex items-center lg:mt-24 my-12 relative justify-around flex-col-reverse lg:flex-row">
      <div className="py-5 absolute lg:w-full w-11/12">
        <div className="swiper-buttons flex w-full justify-between">
          <button
            ref={prevRef}
            className="swiper-button-prev !static !text-white "
          >
            <FaArrowLeft size={12} />
          </button>
          <button
            ref={nextRef}
            className="swiper-button-next !static !text-white "
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
      <div className="lg:w-1/3 w-3/4">
        <h2 className="text-3xl lg:text-5xl text-white font-bold mt-5 text-center lg:text-left">
          {title}
        </h2>
        <div className="flex text-white items-center my-10">
          <div className="flex items-center">
            <SlLike size={22} className=" w-[32px] lg:w-[52px] " />
            <span className="ml-3 text-xs lg:text-xl mr-10">
              {score} / 100 ({reviews} Revies)
            </span>
          </div>
          <div className="flex items-center">
            <CiCalendarDate size={32} className="mr-2 w-[36px] lg:w-[52px] " />
            <span className="font text-xs lg:text-xl">{date}</span>
          </div>
        </div>
        <div className="flex text-white mt-4 justify-center lg:justify-normal">
          <div>
            <h6 className="lg:text-xl text-base font-bold underline mb-1 text-left">
              Available For:
            </h6>
            {platforms.map((platform) => (
              <p
                key={platform}
                className="text-gray-400 lg:text-base text-xs text-left"
              >
                {platform}
              </p>
            ))}
          </div>
          <div className="ml-10">
            <h6 className="lg:text-xl text-base font-bold underline mb-1 text-left">
              Genres:
            </h6>
            {genres.map((genre) => (
              <p
                key={genre}
                className="text-gray-400 lg:text-base text-xs text-left"
              >
                {genre}
              </p>
            ))}
          </div>
        </div>
        <div className="flex mt-8 justify-center lg:justify-normal">
          <Link
            to={`/games/${gameId}`}
            className="bg-[#FF5733] rounded-3xl lg:text-xl text-base font-semibold text-white px-14 py-3"
          >
            Game Review
          </Link>
        </div>
      </div>
      <div className="lg:w-1/3 w-3/4">
        <Swiper
          onSlideChange={(swiper) => {
            const activeIndex = swiper.activeIndex;
            const activeSlideName = topGames[activeIndex]?.name;
            const activeScore = topGames[activeIndex]?.topCriticScore
              .toString()
              .slice(0, 2);
            setScore(activeScore);
            setTitle(activeSlideName);
            setDate(topGames[activeIndex]?.firstReleaseDate.slice(0, 10));
            setGenres(
              topGames[activeIndex]?.Genres?.map((genre) => genre.name) || []
            );
            setPlatforms(
              topGames[activeIndex]?.Platforms?.map(
                (platform) => platform.name
              ) || []
            );
            setGameId(topGames[activeIndex].id);
            setReviews(topGames[activeIndex].numReviews);
          }}
          spaceBetween={40}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {topGames.map((topGame) => (
            <SwiperSlide key={topGame.id}>
              <div>
                <img
                  className="rounded-2xl"
                  src={
                    topGame?.images?.box?.og
                      ? imgURL + topGame.images.box.og
                      : "../public/placeholder.png"
                  }
                  alt={topGame["name"]}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
