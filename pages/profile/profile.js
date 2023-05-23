/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getProfile } from '../../api/profile';
import ProfileCard from '../../components/ProfileCard';
import { useAuth } from '../../utils/context/authContext';

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
    <div className="text-center my-4">
      <Link href="/profile/new" passHref>
        <Button>Add A Profile</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {profiles.map((profile) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profile} onUpdate={getAllTheTeams} />
        ))}
      </div>

    </div>
  );
}

export default Home;
