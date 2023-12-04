import React, { useState, useEffect } from 'react';
import MonthView from './MonthView';
import NewHabitModal from './NewHabitModal';
import EditHabitModal from './EditHabitModal';
import { collection, getDocs, query, doc, setDoc, updateDoc, where, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { db } from '../../firebaseConfig';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [viewDate, setViewDate] = useState(new Date()); // Represents the date being viewed
  const [currentDate] = useState(new Date()); // Represents today's date

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchHabits();
      } else {
        setHabits([]); // Clear habits if logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const fetchHabits = async () => {
    const userId = auth.currentUser.uid; // Assuming the user is already logged in
    const q = query(collection(db, 'users', userId, 'habits'));
    const querySnapshot = await getDocs(q);
    const fetchedHabits = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHabits(fetchedHabits);
  };

  const addHabit = async (habitName, color) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const newHabitRef = doc(collection(db, 'users', userId, 'habits'));
    await setDoc(newHabitRef, { name: habitName, color: color, dates: {} });
    setHabits([...habits, { name: habitName, color: color, dates: {} }]);
    setIsModalOpen(false);
  };


  const toggleHabit = async (habitName, dateKey) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    
    // Query to find the habit document with the matching name
    const q = query(collection(db, 'users', userId, 'habits'), where('name', '==', habitName));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      console.error("Habit not found:", habitName);
      return;
    }
  
    // Assuming habit names are unique, there should only be one document
    const habitDoc = querySnapshot.docs[0];
    const habitDocRef = habitDoc.ref;
    const habitData = habitDoc.data();
  
    // Update the dates in the habit document
    const newDates = { ...habitData.dates, [dateKey]: !habitData.dates[dateKey] };
    await updateDoc(habitDocRef, { dates: newDates });
  
    // Update the local state
    setHabits(habits.map(habit => {
      if (habit.name === habitName) {
        return { ...habit, dates: newDates };
      }
      return habit;
    }));
  };

  const openEditModal = (habit) => {
    setCurrentHabit(habit);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentHabit(null);
  };

  const saveHabitChanges = async (habitId, updatedData) => {
    const userId = auth.currentUser.uid;
    const habitDocRef = doc(db, 'users', userId, 'habits', habitId);
    await updateDoc(habitDocRef, updatedData);
    fetchHabits(userId);
  };

  const deleteHabit = async (habitId) => {
    const userId = auth.currentUser.uid;
    const habitDocRef = doc(db, 'users', userId, 'habits', habitId);
    await deleteDoc(habitDocRef);
    fetchHabits(userId);
  };
  

  const changeMonth = (direction) => {
    setViewDate(prev => {
      let newYear = prev.getFullYear();
      let newMonth = prev.getMonth() + direction;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      return new Date(newYear, newMonth, 1);
    });
  };

  return (
    <div className="p-4">
      <div className="">
        <MonthView 
          habits={habits} 
          toggleHabit={toggleHabit} 
          viewDate={viewDate} // Pass viewDate instead of viewMonth
          currentDate={currentDate}
          changeMonth={changeMonth} 
          onHabitClick={openEditModal}
        />
        <div className="flex justify-start mt-4">
          <button onClick={() => setIsModalOpen(true)} className="p-2 border rounded">+ Habit</button>
        </div>
        {isModalOpen && <NewHabitModal addHabit={addHabit} closeModal={() => setIsModalOpen(false)} />}
        {isEditModalOpen && currentHabit && (
        <EditHabitModal
          habit={currentHabit}
          onClose={closeEditModal}
          onSave={saveHabitChanges}
          onDelete={deleteHabit}
        />
      )}
      </div>
    </div>
  );
};

export default HabitTracker;
