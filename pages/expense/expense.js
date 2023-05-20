import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getExpenses } from '../../api/expense';
import ExpenseCard from '../../components/ExpenseCard';

function ListExpense() {
  const [expenses, setExpense] = useState([{}]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllExpenses = () => {
    getExpenses(user.uid).then(setExpense);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllExpenses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex-wrap">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.firebaseKey} expenseObj={expense} onUpdate={getAllExpenses} />
      ))}
    </div>
  );
}

export default ListExpense;
