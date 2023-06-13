import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';
import { getProfileExpense } from '../api/profile';
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
  const { user } = useAuth();
  const [userQuestions, setUserQuestions] = useState([]);

  const getUserProfile = () => {
    getProfileExpense(user.uid)
      .then((data) => {
        if (Array.isArray(data)) {
          setUserQuestions(data);
        } else {
          console.error('Invalid response from API: expected an array');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserProfile();
  });

  return (
    <div className="profile-page">
      <Row>
        <Col xs={6} md={4} style={{ marginTop: '70px' }}>
          <h2>User</h2>
          <User user={user} />
          <div style={{ width: '90%', marginBottom: '50px' }}>
            {userQuestions.map((profile) => (
              <ProfileCard key={profile.uid} profileObj={profile} onUpdate={getUserProfile} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
