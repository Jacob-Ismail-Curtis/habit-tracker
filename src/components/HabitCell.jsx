import React from 'react';

const HabitCell = ({ date, habit, toggleHabit, currentDate, color }) => {
  const dateKey = date.toISOString().split('T')[0];
  const isComplete = habit.dates[dateKey];

  // Compare dates without the time component
  const cellDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  // Check if the date is in the future relative to the current date
  const isFutureDate = cellDate.getTime() > today.getTime();

  const handleCellClick = () => {
    if (!isFutureDate) {
      toggleHabit(habit.name, dateKey);
    }
  };

  return (
    <div
      className={`flex-grow border cursor-pointer flex items-center justify-center ${isComplete ? 'bg-green-200' : 'hover:bg-gray-100'} ${isFutureDate ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={handleCellClick}
      style={{ minHeight: '75px',  backgroundColor: isComplete ? color : 'transparent',}}
    >
    </div>
  );
};

export default HabitCell;
