import React from 'react';
import HabitTracker from './components/HabitTracker';
import Header from './components/Header';
import Footer from './components/Footer';
import { auth } from '../firebaseConfig';

function App() {
  return (
    <div className="App">
      <Header />
      <HabitTracker />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
