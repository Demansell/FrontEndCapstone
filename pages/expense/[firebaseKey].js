/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewExpenseDetails } from '../../api/merged';

export default function ViewExpense() {
  const [expenseDetails, setExpenseDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewExpenseDetails(firebaseKey).then(setExpenseDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={expenseDetails?.image} alt="" style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          title: {expenseDetails?.title}
        </h5>
        <h5>
          monthly total: {expenseDetails?.monthly_total}
        </h5>
        <h5>
          Definition: {expenseDetails?.definition}
        </h5>
        <h5>
          Name: {expenseDetails?.profileObject?.name}
        </h5>
      </div>
    </div>
  );
}
