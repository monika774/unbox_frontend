import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import "./Speedometer.css";

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [error, setError] = useState(null)

//   const increaseSpeed = () => setSpeed((prev) => (prev < 180 ? prev + 10 : prev));
//   const decreaseSpeed = () => setSpeed((prev) => (prev > 0 ? prev - 10 : prev));
//   const certainSpeed = (speed_val) => setSpeed((prev) => (prev === speed_val ? prev : speed_val));

    // Function to fetch speed data from the backend API
    const fetchSpeed = async () => {
        try {
        console.log("Hello")
        const response = await fetch("http://127.0.0.1:8000/speedlist/",{ mode: "cors"});
        // console.log(response)
        // console.log("hello")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        let new_data = data.reduce((max, obj) => (obj.id > max.id ? obj : max), data[0]);
        new_data = Number(new_data.speed)
        setSpeed(new_data); // Update the speed state with the API response
        } catch (err) {
        setError(err.message); // Handle errors
        }
    };

    // Fetch data at regular intervals (e.g., every second)
    useEffect(() => {
        const interval = setInterval(fetchSpeed, 1000); // Call the API every second
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

  return (
    <div className="speedometer-container">
    {console.log(speed)}
      <h2>Speedometer Application</h2>
      <ReactSpeedometer
        minValue={0}
        maxValue={180}
        value={speed}
        needleColor="red"
        startColor="green"
        endColor="yellow"
        segments={10}
        currentValueText={`Current Speed: ${speed} km/h`}
      />
      {/* <div className="controls">
        <button onClick={increaseSpeed}>Increase Speed</button>
        <button onClick={decreaseSpeed}>Decrease Speed</button>
      </div> */}
    </div>
  );
};

export default Speedometer;
