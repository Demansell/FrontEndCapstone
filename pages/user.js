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
  }, [user.uid]);

  return (
    <div className="profile-page">
      <Row>
        <Col xs={6} md={4} style={{ marginTop: '70px' }}>
          <h2>User</h2>
          <User user={user} />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-at" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
            <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
          </svg>
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
