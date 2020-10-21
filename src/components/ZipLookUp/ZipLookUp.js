import React, { useState } from "react";
import axios from "axios";

const API = "https://sevenseasdb.herokuapp.com/api/";

export default function ZipLookUp() {
  const [userZip, setUserZip] = useState();
  const [userZone, setUserZone] = useState();
  const [zoneSchedule, setZoneSchedule] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user zip: ", userZip);
    getZone();
    getSchedule();
  };

  function getZone() {
    axios
      .get(`${API}zips/${userZip}`)
      .then(function (res) {
        console.log("zone for user zip: ", res.data.zone);
        setUserZone(res.data.zone);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getSchedule() {
    if (userZone != null) {
      axios
        .get(`${API}${userZone}`)
        .then(function (res) {
          let resp = res.data[0];
          // console.log("schedule data for user zone: ", resp);
          setZoneSchedule(resp);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("No zone to speak of");
    }
  }

  return (
    <div>
      Enter a Zipcode to see delivery zone:
      <form onSubmit={handleSubmit}>
        <label>Enter Zipcode: </label>
        <input
          type="text"
          value={userZip}
          onChange={(e) => setUserZip(e.target.value)}
          placeholder="Enter Delivery Zipcode..."
        />
        <button type="submit">Submit Zipcode</button>
      </form>
      <p>{getSchedule()}</p>
      <p style={{ textTransform: "capitalize" }}>Zone: {userZone}</p>
      <p>Schedule: </p>
      <ul>
        <p>Week 1:</p>
        <li>{zoneSchedule.day1 || "Enter Zip"}</li>
        <li>{zoneSchedule.day2 || "Enter Zip"}</li>
        <li>{zoneSchedule.day3 || "Enter Zip"}</li>
      </ul>
      <ul>
        <p>Week 2:</p>
        <li>{zoneSchedule.day4 || "Enter Zip"}</li>
        <li>{zoneSchedule.day5 || "Enter Zip"}</li>
        <li>{zoneSchedule.day6 || "Enter Zip"}</li>
      </ul>
    </div>
  );
}
