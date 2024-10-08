import './App.css'

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventList from './components/EventList';
import EventForm from './pages/EventForm';
import EventDetail from './pages/EventDetail';
import FechamentoConta from './pages/FechamentoConta';
import ParticipantList from './pages/ParticipantDetail'



export default props =>
  <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/create-event" element={<EventForm />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/fechamento-conta/:id" element={<FechamentoConta />} />
      <Route path="/participants" element={<ParticipantList />} />
      


    </Routes>

  </div> 