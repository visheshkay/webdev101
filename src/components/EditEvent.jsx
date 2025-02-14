import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebaseConfig";
import './EditEvent.css'

function EditEvent() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { register, handleSubmit, setValue ,formState:{errors}} = useForm(); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event with ID:", id); // Debugging log
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const eventData = docSnap.data();
          console.log("Event data:", eventData); // Debugging log
          // Populate form fields with existing data
          setValue("eventName", eventData.eventName);
          setValue("date", eventData.date);
          setValue("time", eventData.time);
          setValue("venue", eventData.venue);
          setEventLoaded(true);
        } else {
          setError("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event");
      }
    };
    fetchEvent();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const docRef = doc(db, "events", id);
      await updateDoc(docRef, data);
      console.log("Event updated successfully");
      navigate("/events"); // Redirect to events page
    } catch (error) {
      console.error("Error updating event:", error);
    }
    setLoading(false);
  };
  return (
    <div className='parent-container'>
    <div className='form-container'>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Event Name:</label>
        <input type="text" name="" id="" {...register("name",{required:'Event name is required'})}/>
        {errors.name && <p className="error">{errors.name.message}</p>}

        <label>Date:</label>
        <input type="date" name="" id="" {...register("date",{required:'Date is required'})}/>
        {errors.date && <p className="error">{errors.date.message}</p>}

        <label>Time:</label>
        <input type="time" name="" id="" {...register("time", { required: "Time is required" })}/>
        {errors.time && <p className="error">{errors.time.message}</p>}        

        <label>Venue</label>
        <input type="text" name="" id="" {...register("venue", { required: "Venue is required" })} />
        {errors.venue && <p className="error">{errors.venue.message}</p>}


        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Event"}</button>
      </form>
    </div>
    </div>
  )
}



export default EditEvent