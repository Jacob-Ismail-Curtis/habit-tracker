import React, { useState, useEffect } from 'react';
import MonthView from './MonthView';
import NewHabitModal from './NewHabitModal';
import { collection, getDocs, query, doc, setDoc, updateDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        fetchHabits(user.uid);
      } else {
        setHabits([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchHabits = async (userId) => {
    try {
      const q = query(collection(db, 'users', userId, 'habits'));
      const querySnapshot = await getDocs(q);
      const fetchedHabits = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHabits(fetchedHabits);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const addHabit = async (habitName, color) => {
    if (!auth.currentUser) return;
    try {
      const userId = auth.currentUser.uid;
      const newHabitRef = doc(collection(db, 'users', userId, 'habits'));
      await setDoc(newHabitRef, { name: habitName, color: color, dates: {} });
      fetchHabits(userId); // Re-fetch habits to include the new one
    } catch (error) {
      console.error('Error adding habit:', error);
    }
    setIsModalOpen(false);
  };

  const toggleHabit = async (habitName, dateKey) => {
    if (!auth.currentUser) return;
    try {
      const userId = auth.currentUser.uid;
      const q = query(collection(db, 'users', userId, 'habits'), where('name', '==', habitName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("Habit not found:", habitName);
        return;
      }

      const habitDoc = querySnapshot.docs[0];
      const newDates = { ...habitDoc.data().dates, [dateKey]: !habitDoc.data().dates[dateKey] };
      await updateDoc(habitDoc.ref, { dates: newDates });
      fetchHabits(userId); // Re-fetch habits to reflect the changes
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
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
          viewDate={viewDate} 
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
