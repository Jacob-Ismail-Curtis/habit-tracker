// EditHabitModal.jsx
import React, { useState } from 'react';

const EditHabitModal = ({ habit, onClose, onSave, onDelete }) => {
  const [name, setName] = useState(habit.name);
  const [color, setColor] = useState(habit.color);

  const handleSave = () => {
    onSave(habit.id, { name, color });
    onClose();
  };

  const handleDelete = () => {
    onDelete(habit.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Edit Habit</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Habit Name"
          className="border p-2 mb-2 w-full"
        />
        <div className="flex items-center mb-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-2 h-10 w-10"
          />
        </div>
        <button onClick={handleSave} className="p-2 border bg-blue-500 text-white w-full mb-2">
          Save Changes
        </button>
        <button onClick={handleDelete} className="p-2 border bg-red-500 text-white w-full mb-2">
          Delete Habit
        </button>
        <button onClick={onClose} className="p-2 border mt-2 w-full">Close</button>
      </div>
    </div>
  );
};

export default EditHabitModal;
