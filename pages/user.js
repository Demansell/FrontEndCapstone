import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
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
          <b />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
            <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
          </svg>
          <Button variant="outline-warning" style={{ margin: '15px' }}>follow me</Button>
        </Col>
        <Col xs={12} md={8} style={{ marginTop: '70px' }}>
          <h3>My Profiles</h3>
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
