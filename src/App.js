import React, { useEffect, useState } from "react";
import axios from "axios";
import hot from "./assets/hot.jpg";
import cold from "./assets/cold.jpg";
import normal from "./assets/sunset.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [bgImage, setBgImage] = useState(normal);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  // const changeBackground = (color) => {
  //   setBgImage(color);
  // };

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  let tempInCelcius = Math.floor((data?.main?.temp - 32) * 0.56);
  const conditionBackground = () => {
    if (tempInCelcius < 10) {
      setBgImage(cold);
      console.log("cold");
    } else if (tempInCelcius > 30) {
      setBgImage(hot);

      console.log("hot");
    } else {
      setBgImage(normal);

      console.log("normal");
    }
  };

  useEffect(() => {
    conditionBackground();

    return () => {};
  }, [tempInCelcius]);

  const convertToCelcius = (data) => {
    let tempInCelcius = Math.floor((data.main.temp - 32) * 0.56);

    console.log(tempInCelcius);
    return tempInCelcius;
  };

  const bgStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100%",
  };
  console.log("bbbb", bgImage);
  return (
    <div className="app" style={bgStyle}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{convertToCelcius(data)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {/* 
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default App;
