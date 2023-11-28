import React, { useState } from 'react';

const NewHabitModal = ({ addHabit, closeModal }) => {
  const [newHabit, setNewHabit] = useState('');
  const [habitColor, setHabitColor] = useState('#ff0000'); // Default color set to red for visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    addHabit(newHabit, habitColor);
    setNewHabit('');
    setHabitColor('#ff0000'); // Reset to default color
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New Habit"
            className="border p-2 mb-2 w-full"
          />
          <div className="flex items-center mb-2">
            <input
              type="color"
              value={habitColor}
              onChange={(e) => setHabitColor(e.target.value)}
              className="p-2 h-10 w-10"
            />
          </div>
          <button type="submit" className="p-2 border bg-blue-500 text-white w-full">Add Habit</button>
        </form>
        <button onClick={closeModal} className="p-2 border mt-2 w-full">Close</button>
      </div>
    </div>
  );
};

export default NewHabitModal
