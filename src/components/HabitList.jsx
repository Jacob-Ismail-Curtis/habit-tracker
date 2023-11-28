import React, { useState } from 'react';

const HabitList = ({ habits, addHabit }) => {
  const [newHabit, setNewHabit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(newHabit);
    setNewHabit('');
  };

  return (
    <div className="flex">
      <div className="w-20 h-20"> {/* Placeholder for alignment */}
        {/* Empty div to align with the habit name column in MonthView */}
      </div>
      <div className="flex-grow">
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
            className="border p-2 flex-grow"
          />
          <button type="submit" className="p-2 border">Add Habit</button>
        </form>
        <ul>
          {habits.map(habit => <li key={habit.name} className="border-b">{habit.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default HabitList;
