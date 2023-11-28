import React from 'react';

const HabitCell = ({ date, habit, toggleHabit, currentDate }) => {
  const dateKey = date.toISOString().split('T')[0];
  const isComplete = habit.dates[dateKey];
  const isFutureDate = date > currentDate;

  const handleCellClick = () => {
    if (!isFutureDate) {
      toggleHabit(habit.name, dateKey);
    }
  };

  return (
    <div
      className={`flex-grow border cursor-pointer flex items-center justify-center ${isComplete ? 'bg-green-200' : 'hover:bg-gray-100'} ${isFutureDate ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={handleCellClick}
      style={{ minHeight: '75px' }} // Adjust the height as needed
    >
      {/* Additional content (if any) */}
    </div>
  );
};

export default HabitCell;
