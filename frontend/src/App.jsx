import './App.css'

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventList from './components/EventList';
import EventForm from './pages/EventForm';
import EventDetail from './pages/EventDetail';

export default props =>
  <div className="app">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/create-event" element={<EventForm />} />
      <Route path="/events/:id" element={<EventDetail />} />
    </Routes>

  </div> 