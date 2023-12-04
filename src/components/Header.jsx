import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LoginForm from './LoginForm'; // Import the LoginForm component

function Header() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      setShowDropdown(false); // Hide dropdown after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center justify-between flex-col text-center pt-10">
      <div className="flex justify-between items-center w-full px-10">
        <div>
          <h1 className="text-4xl md:text-7xl mb-1 md:mb-3 font-bold">Habit Tracker</h1>
          <p className="text-base md:text-2xl mb-1 font-medium">Visualize and keep track of your habits.</p>
        </div>
        {user ? (
          <div className="relative">
            <div onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer flex items-center">
              {user.email} <span className="ml-2">&#x25BC;</span> {/* Downward arrow */}
            </div>
            {showDropdown && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                <button onClick={handleSignOut} className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLoginForm(true)} className="p-2 border rounded">
            Login / Sign Up
          </button>
        )}
      </div>
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  );
  
}


export default Header;