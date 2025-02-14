import React from "react";
import './ViewEvents.css'
import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import EventCard from "./EventCard";
import "./ViewEvents.css";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (event)=>{
    const confirm = window.confirm("Are you sure you want to delete this event");
    if(confirm){
      try {
        await deleteDoc(doc(db, "events", event.id));
        setEvents(events.filter(e => e.id !== event.id)); 
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  }

  const handleEdit = async (event)=>{
      navigate(`/update-event/${event.id}`)
  }

  return (
    <div className="view-events">
      <h2>Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} onEdit={handleEdit}/>
          ))}
        </div>
      ) : (
        <p className="no-events">No events available</p>
      )}
    </div>
  );
};

export default ViewEvents;
