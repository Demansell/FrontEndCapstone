/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../api/profile';
import ProfileCard from '../../components/ProfileCard';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  // TODO: Set a state for books
  const [profiles, setProfile] = useState([]);
  const [filter, setFilter] = useState('');
  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheTeams = () => {
    getProfile(user.uid).then(setProfile);
  };

  function handleFilterChange(event) {
    setFilter(event.target.value.toLowerCase());
  }
  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheTeams();
  }, []);

  return (
    <div style={{ marginTop: '50px' }}>
      <p>Find Profile
      </p>
      <input
        type="text"
        id="myInput"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search for Profile.."
        title="Type in a profile name"
        style={{
          backgroundPosition: '10px 12px',
          backgroundRepeat: 'no-repeat',
          width: '50%',
          fontSize: '16px',
          padding: '12px 20px 12px 40px',
          marginBottom: '12px',
        }}
      />
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {/* TODO: map over books here using BookCard component */}
          {profiles
            .filter((profile) => profile.name.toLowerCase().indexOf(filter) > -1)
            // eslint-disable-next-line no-shadow
            .map((profile, filter) => (
              // eslint-disable-next-line react/no-array-index-key
              <ProfileCard key={filter} profileObj={profile} onUpdate={getAllTheTeams} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
