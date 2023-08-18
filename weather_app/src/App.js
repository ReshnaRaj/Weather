import { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
const Api_key = "8518ded00a0d918d123c9ffffefd0a03";
function App() {
  const inputRef = useRef(null);
  const [apidata, setApidata] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];
  console.log(showWeather,"iiii")
  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);

    try {
      const response = await axios.get(URL);
      console.log(response,"666666")
      const data = response.data;
      // console.log(data,"88888")
      setApidata(null);
      
      
      setShowWeather(
        WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
      );
      console.log(data);
      setApidata(data);
      setLoading(false);

      console.log(data, "data-----");
      

      // Handle the data as needed
    } catch (error) {
      console.log(error);
      
      setLoading(false);

      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
        setShowWeather([
          {
            type: "Not Found",
            img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
          },
        ])
      }
    }
  };
  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter your location"
            className="text-xl border-b p-1 border-gray-200 font-semibold uppercase flex"
          />
          <button onClick={fetchWeather} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <div  className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}>
          {
            loading ? ( <div className="grid place-items-center h-full"> <img  src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png" alt="..." className="w-14 mx-auto mb-2 animate-spin"/></div>  ) : (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {apidata && (
                    <p className="text-xl font-semibold">
                      {apidata?.name + "," + apidata?.sys?.country}
                    </p>
                  )}
    
                  <img
                    src={showWeather[0]?.img}
                    alt="..."
                    className="w-52 mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-zinc-800">
                    {showWeather[0]?.type}
                  </h3>
                  {apidata && (
                    <>
                      <div className="flex justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                          alt=""
                          className="h-9 mt-1"
                        />
                        <h2 className="text-4xl font-extrabold">
                          {apidata?.main?.temp}&#176;C
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
