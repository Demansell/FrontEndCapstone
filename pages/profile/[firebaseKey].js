/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewProfileDetails } from '../../api/merged';
import ProfileCard from '../../components/ProfileCard';

// inside component use
export default function ViewProfile() {
  const [profileExpense, setProfileMembers] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewProfileDetails(firebaseKey).then(setProfileMembers);
  }, [firebaseKey]);

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
        {profileExpense.expenses?.map((member) => (
          <ProfileCard key={member.firebaseKey} profileObj={member} onUpdate={viewProfileDetails} />
        ))}
      </div>
    </div>
  );
}
