import "./App.css";
import { Routes, Route } from "react-router-dom";

import HallOfFame from "./components/HallOfFame";
import UpcomingGames from "./components/UpcomingGames";
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import GameDetails from "./components/GameDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <UpcomingGames />
              <HallOfFame />
              <Categories />
            </>
          }
        />
        <Route path="/games/:id" element={<GameDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
