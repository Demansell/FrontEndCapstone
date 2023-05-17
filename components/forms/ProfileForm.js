import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProfile, updateProfile } from '../../api/profile';

const initialState = {
  name: '',
  monthly_income: '',
  image: '',
};
// this is a comment
function ProfileForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateProfile(formInput)
        .then(() => router.push(`/profile/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProfile(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter monthly income" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter a monthly income"
          name="monthly_income"
          value={formInput.monthly_income}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Profile</Button>
    </Form>
  );
}

ProfileForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    monthly_income: PropTypes.string,
    image: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  obj: initialState,
};

export default ProfileForm;
