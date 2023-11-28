import React from 'react';
import HabitTracker from './components/HabitTracker';
import Intro from './components/Intro';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Intro />
      <HabitTracker />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
