import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProfile } from '../api/profile';

function ProfileCard({ profileObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisProfile = () => {
    if (window.confirm(`Delete ${profileObj.name}?`)) {
      deleteSingleProfile(profileObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px', display: 'flex' }}>
      <Card.Img variant="top" src={profileObj.image} alt={profileObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{profileObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS */}
        <Link href={`/profile/${profileObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/profile/edit/${profileObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProfile} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileCard;
