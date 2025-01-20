import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { CiCalendarDate } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";

function UpcomingGames() {
  const [upcomingGames, setUpcomingGames] = useState([]);
  const imgURL = "https://img.opencritic.com/";
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://opencritic-api.p.rapidapi.com/game/upcoming";
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
        setUpcomingGames(arrResult);
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1500);
  }, []);

  return (
    <div className="container py-12">
      <div className="flex items-center py-5 justify-between">
        <div className="md:w-1/2 flex">
          <h4 className="mr-8 font-bold text-2xl text-white">Upcoming Games</h4>
        </div>
        <div className="swiper-buttons flex md:w-1/10">
          <button
            ref={prevRef}
            className="swiper-button-prev !static !mt-0 !text-white border-2 text-sm p-1 rounded !h-1/2"
          >
            <FaArrowLeft size={12} />
          </button>
          <button
            ref={nextRef}
            className="swiper-button-next !static !mt-0 !text-white border-2 text-sm p-1 rounded !h-1/2 ml-4"
          >
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
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
        {upcomingGames.map((upcomingGame) => (
          <SwiperSlide key={upcomingGame.id}>
            <div className="border p-2 rounded-xl">
              <img
                src={
                  upcomingGame?.images?.box?.og
                    ? imgURL + upcomingGame["images"]["box"]["og"]
                    : "../public/placeholder.png"
                }
                alt={upcomingGame["name"]}
              />
              <h6 className="text-left mt-2 mb-3 text-white">
                {upcomingGame["name"]}
              </h6>
              <div className="flex justify-between mb-2 text-white">
                <span className="flex">
                  <CiCalendarDate size={24} className="mr-2" />
                  {upcomingGame?.firstReleaseDate?.slice(0, 10) || "TBA"}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default UpcomingGames;
