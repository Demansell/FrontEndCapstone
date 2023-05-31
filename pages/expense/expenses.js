import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getExpenses } from '../../api/expense';
import ExpenseCard from '../../components/ExpenseCard';

function ListExpense() {
  const [expenses, setExpense] = useState([]);
  const [filter, setFilter] = useState('');

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllExpenses = () => {
    getExpenses(user.uid).then(setExpense);
  };

  function handleFilterChange(event) {
    setFilter(event.target.value.toLowerCase());
  }
  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ marginTop: '50px' }}>
      <h1>Find Expense</h1>
      <input
        type="text"
        id="myInput"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search for expense.."
        title="Type in a expense"
        style={{
          backgroundPosition: '10px 12px',
          backgroundRepeat: 'no-repeat',
          width: '50%',
          fontSize: '16px',
          padding: '12px 20px 12px 40px',
          marginBottom: '12px',
        }}
      />
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {expenses
            .filter((expense) => expense.title.toLowerCase().indexOf(filter) > -1)
            // eslint-disable-next-line no-shadow
            .map((expense, filter) => (
              // eslint-disable-next-line react/no-array-index-key
              <ExpenseCard key={filter} obj={expense} onUpdate={getAllExpenses} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ListExpense;
