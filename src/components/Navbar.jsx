import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      const url = `https://opencritic-api.p.rapidapi.com/game/search?criteria=${query}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
          "x-rapidapi-host": "opencritic-api.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setGames(result);
      } catch (error) {
        console.error("An error occurred during the API call:", error);
        alert(
          "An error occurred while fetching the data. Usage limit has been exceeded. Please try again tomorrow."
        );
      }
    };

    if (query) {
      const debounceTimeout = setTimeout(() => {
        fetchGames();
      }, 500);

      return () => clearTimeout(debounceTimeout);
    }
  }, [query]);

  return (
    <nav className="bg-[#FF5733] ">
      <ul className="flex container justify-between items-center py-8">
        <Link to="/">
          <img src="../public/logo-light.png" alt="Logo" />
        </Link>
        <div
          className="relative"
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsDropdownOpen(false);
            }, 100);
          }}
        >
          <input
            className="py-2 pl-4 text-black font-sm"
            type="text"
            placeholder="Search for a game"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isDropdownOpen && (
            <div
              className="absolute bg-white w-full z-10"
              onClick={() => setIsDropdownOpen(true)}
            >
              <ul>
                {games.map((game) => (
                  <li
                    key={game.id}
                    className="border-b-2 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    <Link to={`/games/${game.id}`}>{game.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
