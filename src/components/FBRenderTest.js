import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import db from "./firebase";

function FBRenderTest() {
  const [userZone, setUserZone] = useState();
  // const [zoneSched, setZoneSched] = useState([]);
  const [user, setUser] = useState("none");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const [userZip, setUserZip] = useState();

  db.collection("SevSeasData")
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log("whole data:", data); // array of cities objects
    });

  function fetchUserZipData() {
    db.collection("SevSeasData")
      .doc(`${userZip}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data([]);
          setUserZone(data.zip);
          console.log("inside function for user zip: ", data);
          console.log(
            "inside function for user zip, but lists zone: ",
            userZone
          );
        } else {
          console.log("Zipcode is invalid!!!");
        }
      })
      .catch(function (error) {
        console.log("Error getting data: ", error);
        console.log(user);
      });
  }

  let zoneDb = db.collection("SevSeasData").doc(`${userZone}`);

  function getZoneData() {
    zoneDb.get().then((doc) => {
      if (doc.exists) {
        var data = doc.data([]);
        for (var key in data) {
          var schedule = Object.values(data);
          console.log("schedule: ", schedule);
        }
        // setZoneSched(schedule);
        console.log("after state is declared: ", schedule);
      }
    });
  }

  useEffect(() => {
    getZoneData();
    // setZoneSched({ schedule });
    // console.log("zone sched: ", zoneSched);
  }, []);

  return (
    <div className="db_stuff">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Enter Zip:
          <input
            name="userZipcode"
            type="number"
            placeholder="enter delivery zip"
            value={userZip}
            ref={register}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <button type="submit" onClick={(e) => setUserZip(e.target.value)}>
          Submit
        </button>
      </form>
      <div>
        User's Delivery Zipcode: {fetchUserZipData(userZip)}
        {userZip}
      </div>
      <div>Schedule: {getZoneData()}</div>
    </div>
  );
}

export default FBRenderTest;
