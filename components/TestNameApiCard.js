import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ProfileTest({ profileObjTest }) {
  return (
    <Card style={{ width: '18rem', margin: '10px', display: 'flex' }}>
      <Card.Body>
        <Card.Title>{profileObjTest.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

ProfileTest.propTypes = {
  profileObjTest: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default ProfileTest;
