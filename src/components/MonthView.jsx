import React from 'react';
import HabitCell from './HabitCell';

const MonthView = ({ habits, toggleHabit, viewDate, currentDate, changeMonth }) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

  const formatTopBarDate = (date) => {
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options).split(', ');
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

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
                  color={habit.color}
                />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
