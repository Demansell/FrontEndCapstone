import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getProfile } from '../api/profile';
import ProfileTest from '../components/TestNameApiCard';

function Home() {
  // TODO: Set a state for books
  const [profiles, setProfile] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheTeams = () => {
    getProfile(user.uid).then(setProfile);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {/* TODO: map over books here using BookCard component */}
      {profiles.map((profile) => (
        <ProfileTest key={profile.firebaseKey} profileObjTest={profile} onUpdate={getAllTheTeams} />
      ))}
    </div>
  );
}

export default Home;
