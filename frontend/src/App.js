import React, { Component } from "react";
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './containers/AppWrapper';
import PageWrapper from './containers/PageWrapper';
import ClientPage from './pages/ClientPage';
import AccommodationPage from './pages/AccommodationPage';
import CalendarPage from "./pages/CalendarPage";
import ObjectPage from './pages/ObjectPage';
import ReservationPage from "./pages/ReservationPage";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import StatisticPage from "./pages/StatisticsPage";

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <NavigationBar/>
        <PageWrapper>
          <Router>
            <Routes>
            <Route exact path='/' element={<HomePage />} />
              <Route exact path='/client' element={<ClientPage />} />
              <Route exact path='/calendar' element={<CalendarPage />} />
              <Route exact path='/object' element={<ObjectPage />} />
              <Route exact path='/accommodation' element={<AccommodationPage />} />
              <Route exact path='/reservation' element={<ReservationPage />} />
              <Route exact path='/statistics' element={<StatisticPage />} />
            </Routes>
          </Router>
        </PageWrapper>
      </AppWrapper>
    );
  }
}

export default App;
