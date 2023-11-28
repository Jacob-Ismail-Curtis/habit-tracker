import React, { useState } from 'react';
import MonthView from './MonthView';
import NewHabitModal from './NewHabitModal';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());

  const addHabit = (habitName) => {
    setHabits([...habits, { name: habitName, dates: {} }]);
    setIsModalOpen(false);
  };

  const toggleHabit = (habitName, date) => {
    setHabits(habits.map(habit => {
      if (habit.name === habitName) {
        const newDates = { ...habit.dates, [date]: !habit.dates[date] };
        return { ...habit, dates: newDates };
      }
      return habit;
    }));
  };

  const changeMonth = (direction) => {
    setViewMonth(prev => {
      const newDate = new Date(currentDate.getFullYear(), prev + direction, 1);
      setCurrentDate(newDate);
      return newDate.getMonth();
    });
  };

  return (
   <div className="p-4">
      <div className="">
      <MonthView 
         habits={habits} 
         toggleHabit={toggleHabit} 
         viewMonth={viewMonth} 
         currentDate={currentDate}
         changeMonth={changeMonth} 
      />
      <div className="flex justify-start mt-4">
         <button onClick={() => setIsModalOpen(true)} className="p-2 border rounded">+ Habit</button>
      </div>
      {isModalOpen && <NewHabitModal addHabit={addHabit} closeModal={() => setIsModalOpen(false)} />}
      </div>
   </div>
 );
};

export default HabitTracker;
