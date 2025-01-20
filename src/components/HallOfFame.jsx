import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import { GrView } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import { CiStar, CiCalendarDate } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

function HallOfFame() {
  const [hallOfFameGames, setHallOfFameGames] = useState([]);

  const imgURL = "https://img.opencritic.com/";
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://opencritic-api.p.rapidapi.com/game/hall-of-fame/2024";
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
        setHallOfFameGames(arrResult);
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  return (
    <div className="container py-12">
      <div className="flex items-center py-5 justify-between">
        <h4 className="font-bold text-2xl text-white">Hall of Fame 2024</h4>
        <div className="swiper-buttons flex md:w-2/10">
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
        spaceBetween={40}
        slidesPerView={2}
        grid={{
          rows: window.innerWidth > 1024 ? 2 : 1,
          fill: "row",
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
        }}
        modules={[Grid, Navigation]}
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
        {hallOfFameGames?.map((hallOfFameGame) => (
          <SwiperSlide key={hallOfFameGame.id}>
            <div className="border lg:p-2 p-6 rounded-xl flex items-center flex-col lg:flex-row">
              <img
                className="lg:w-1/4 w-1/2"
                src={
                  hallOfFameGame?.images?.box?.og
                    ? imgURL + hallOfFameGame.images.box.og
                    : "../public/placeholder2.jpg"
                }
                alt={hallOfFameGame["name"]}
              />
              <div className="ml-3 lg:w-7/12 w-full">
                <h6 className="text-left mt-2 font-semibold text-white border-b-2 pb-2 text-xl">
                  {hallOfFameGame["name"]}
                </h6>
                <p className="text-left text-gray-400 font-normal break-all text-xs lg:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam delectus ut culpa assumenda sapiente enim aliquid,
                  magni voluptatibus, consectetur laudantium adipisci ex animi
                  quis fuga repudiandae deserunt, obcaecati maiores eligendi
                  impedit sequi Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Sequi ab blanditiis animi alias quo
                  voluptatibus optio perspiciatis consequatur rem repellat
                </p>
                <div className="buttons text-left my-2">
                  <button className="bg-[#3f3f43] text-white rounded-md p-1 mr-2 text-xs lg:text-base">
                    Action
                  </button>
                  <button className="bg-[#3f3f43] text-white rounded-md p-1 mr-2 text-xs lg:text-base">
                    RPG
                  </button>
                  <button className="bg-[#3f3f43] text-white rounded-md p-1 mr-2 text-xs lg:text-base">
                    Shooting
                  </button>
                  <button className="bg-[#3f3f43] text-white rounded-md p-1 mr-2 text-xs lg:text-base">
                    Adventure
                  </button>
                </div>
                <div className="flex justify-between font-bold ml-3">
                  <div className="text-white flex items-center">
                    <SlLike />
                    <span className="ml-3 font lg:text-xl mr-1 text-xs ">
                      {hallOfFameGame["topCriticScore"]}
                    </span>
                    /<span className="text-xs ml-1 mt-0.5 font-thin ">100</span>
                  </div>
                  <div className="flex text-white items-center text-xs lg:text-base">
                    <CiCalendarDate size={32} className="mr-2" />
                    {hallOfFameGame["firstReleaseDate"].slice(0, 10)}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-fit">
                <div className="ml-3 flex lg:flex-col flex-row justify-around items-center">
                  <div className="text-white flex flex-col items-center my-4 lg:mt-0">
                    <GrView size={24} />
                    <p className="mt-2 text-xs lg:text-base">
                      5000{" "}
                      <span className="text-xs lg:text-base text-gray-300">
                        view
                      </span>
                    </p>
                  </div>
                  <div className="text-white flex flex-col items-center my-4 lg:mt-0 text-xs lg:text-base">
                    <GoComment size={32} />
                    <p className="mt-2">
                      100
                      <span className="text-xs lg:text-base text-gray-300">
                        {" "}
                        Comment
                      </span>
                    </p>
                  </div>
                  <div className="text-white flex flex-col items-center my-4 lg:mt-0 text-xs lg:text-base">
                    <CiStar size={36} />
                    <p className="mt-2">
                      8.5{" "}
                      <span className="text-xs lg:text-base text-gray-300">
                        /10
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/games/${hallOfFameGame.id}`}
                  className=" text-white py-2 px-3 rounded-2xl bg-[#FF5733] leading-8 ml-3 text-base lg:text-lg"
                >
                  Full Review
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HallOfFame;
