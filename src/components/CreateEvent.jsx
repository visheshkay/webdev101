import React from 'react'
import './CreateEvent.css'
import { useForm } from 'react-hook-form'
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function CreateEvent() {
  const {register,handleSubmit,formState:{errors},} = useForm();
  const onSubmit = async (data)=>{
    try {
      const docRef = await addDoc(collection(db, "events"), {
        eventName: data.name,
        date: data.date,
        time: data.time,
        venue: data.venue,
        createdAt: new Date() 
      });
      console.log("Document written with ID:", docRef.id);
      alert("Event Added")
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }
  return (
    <div className='parent-container'>
    <div className='form-container'>
      <h2>Create Event</h2>
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


        <button type='submit'>Create Event</button>
      </form>
    </div>
    </div>
  )
}

export default CreateEvent