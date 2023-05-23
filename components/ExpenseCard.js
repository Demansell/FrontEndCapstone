import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteExpense } from '../api/expense';

function ExpenseCard({ expenseObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisExpense = () => {
    if (window.confirm(`Delete ${expenseObj.title}?`)) {
      deleteExpense(expenseObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{expenseObj.title}</Card.Title>
        <p className="card-text bold">{expenseObj.need && <span>Need?<br /></span> } ${expenseObj.monthly_total}</p>
        <p className="card-text bold"> {expenseObj.profile_id} </p>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/expense/${expenseObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/expense/edit/${expenseObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisExpense} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ExpenseCard.propTypes = {
  expenseObj: PropTypes.shape({
    need: PropTypes.bool,
    title: PropTypes.string,
    monthly_total: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
    profile_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ExpenseCard;
