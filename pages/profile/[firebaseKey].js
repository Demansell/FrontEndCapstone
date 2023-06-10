/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewProfileDetails } from '../../api/merged';
import { getProfileExpense } from '../../api/profile';
import ExpenseCard from '../../components/ExpenseCard';

// inside component use
export default function ViewProfile() {
  const [profileExpense, setProfileMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProfileDetails(firebaseKey).then(setProfileMembers);
  }, [firebaseKey]);

  useEffect(() => {
    getProfileExpense(firebaseKey).then(setExpenses);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleAnswerSubmit = (answer) => {
  //   createExpense(firebaseKey, answer)
  //     .then((data) => {
  //       setExpenses([...expenses, data]);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={profileExpense.image} alt={profileExpense.name} style={{ width: '300px' }} />
      </div>
      <div className="text-blue ms-5 details">
        <h5>
          By: {profileExpense.name}
        </h5>
        <h5>
          Monthly income: ${profileExpense.monthly_income}
        </h5>
        <h5 style={{ marginTop: '80px' }}>Expenses: {expenses.length} </h5>
      </div>
      <div className="d-flex flex-wrap">
        {profileExpense.expense?.map((expense) => (
          <ExpenseCard key={expense.firebaseKey} obj={expense} onUpdate={viewProfileDetails} />
        ))}
      </div>
    </div>
  );
}
