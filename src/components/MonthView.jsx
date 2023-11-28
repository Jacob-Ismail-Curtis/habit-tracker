import React from 'react';
import HabitCell from './HabitCell';

const MonthView = ({ habits, toggleHabit, viewMonth, currentDate, changeMonth }) => {
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, viewMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(year, viewMonth, i + 1));

  const formatTopBarDate = (date) => {
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options).split(', ');
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const cellWidth = 20; // width of each date cell in rem
  const containerWidth = dates.length * cellWidth;

  
  return (
    <div>
      <div className="flex items-center justify-between border-b">
        <button onClick={() => changeMonth(-1)} className="w-[75px] p-2 border text-xl">&#8678;</button> {/* Left arrow */}

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(75px,_1fr))] flex-grow">
          {dates.map(date => {
            const [weekday, month, day] = formatTopBarDate(date);
            const highlightToday = isToday(date) ? 'bg-gray-200' : '';
            return (
              <div key={date} className={`p-2 border text-center flex flex-col justify-center ${highlightToday}`}>
                <div>{month}</div>
                <div>{day}</div>
                <div>{weekday}</div>
              </div>
            );
          })}
        </div>

        <button onClick={() => changeMonth(1)} className="w-[75px] p-2 border text-xl">&#8680;</button> {/* Right arrow */}
      </div>
      <div>
        {habits.map(habit => (
          <div key={habit.name} className="grid grid-cols-[repeat(auto-fill,_minmax(75px,_1fr))]">
            <div className="text-center border-r flex items-center justify-center">{habit.name}</div>
            {dates.map(date => (
                <HabitCell
                  key={`${habit.name}-${date}`}
                  date={date}
                  habit={habit}
                  toggleHabit={toggleHabit}
                  currentDate={currentDate}
                />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;