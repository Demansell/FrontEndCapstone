/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { createExpense } from '../../api/expense';
import { viewProfileDetails } from '../../api/merged';
import { getProfileExpense } from '../../api/profile';
import ExpenseCard from '../../components/ExpenseCard';
import ExpenseForm from '../../components/forms/ExpenseForm';

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

  const handleAnswerSubmit = (answer) => {
    createExpense(firebaseKey, answer)
      .then((data) => {
        setExpenses([...expenses, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
          Monthly income: {profileExpense.monthly_income}
        </h5>
      </div>
      <div className="d-flex flex-wrap">
        {profileExpense.expense?.map((member) => (
          <ExpenseCard key={member.firebaseKey} expenseObj={member} onUpdate={viewProfileDetails} />
        ))}
      </div>
      <div className="mt-5">
        <h5>Your Answer</h5>
        <ExpenseForm obj={{}} profile_Id={firebaseKey} onSubmit={handleAnswerSubmit} />
      </div>
    </div>
  );
}
