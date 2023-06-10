/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../api/profile';
import { useAuth } from '../../utils/context/authContext';
import ExpenseReportCard from '../../components/ExpenseReport';

function ExepenseReport() {
  // TODO: Set a state for books
  const [expenseReports, setExpenseReport] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheExpenseReportCards = () => {
    getProfile(user.uid).then(setExpenseReport);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheExpenseReportCards();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {expenseReports.map((profile) => (
          <ExpenseReportCard key={profile.firebaseKey} expenseReportObj={profile} onUpdate={getAllTheExpenseReportCards} />
        ))}
      </div>

    </div>
  );
}

export default ExepenseReport;
