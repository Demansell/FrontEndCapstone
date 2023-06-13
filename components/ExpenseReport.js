import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSingleProfile } from '../api/profile';
import { viewExpenseReport } from '../api/merged';

function ExpenseReportCard({ expenseReportObj, onUpdate }) {
  const [expenseObj, setExpensesObj] = useState([]);

  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  useEffect(() => {
    viewExpenseReport(expenseReportObj.firebaseKey).then(setExpensesObj);
  }, []);
  const deleteThisProfile = () => {
    if (window.confirm(`Delete ${expenseReportObj.name}?`)) {
      deleteSingleProfile(expenseReportObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px', display: 'flex' }}>
      <Card.Img variant="top" src={expenseReportObj.image} alt={expenseReportObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{expenseReportObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS */}
        <p> Monthly Income: ${expenseReportObj.monthly_income} </p>
        <p> Monthly Expenses: ${expenseObj.totalExpense}</p>
        <p> Left Over Monthly Income: ${expenseObj.leftOverAmount}</p>
        <Button variant="danger" onClick={deleteThisProfile} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ExpenseReportCard.propTypes = {
  expenseReportObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    monthly_income: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ExpenseReportCard;
