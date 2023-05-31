import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createExpense, updateExpense } from '../../api/expense';
import { getProfile } from '../../api/profile';

const initialState = {
  title: '',
  definition: '',
  monthly_total: '',
  need: false,
};

function ExpenseForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [profiles, setExpenses] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getProfile(user.uid).then(setExpenses);

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
      updateExpense(formInput)
        .then(() => router.push(`/expense/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createExpense(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateExpense(patchPayload).then(() => {
          router.push('/expense/expenses');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Expense</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Title?" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title?"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="definition" className="mb-3">
        <Form.Control
          type="text"
          placeholder="definition"
          name="definition"
          value={formInput.definition}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter monthly Total" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter a monthly total"
          name="monthly_total"
          value={formInput.monthly_total}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Profile">
        <Form.Select
          aria-label="profile"
          name="profile_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.profile_id} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Team</option>
          {
            profiles.map((profile) => (
              <option
                key={profile.firebaseKey}
                value={profile.firebaseKey}
              >
                {profile.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="need"
        name="need"
        label="Need?"
        checked={formInput.need}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            need: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Expense</Button>
    </Form>
  );
}

ExpenseForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    monthly_total: PropTypes.string,
    definition: PropTypes.string,
    profile_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    need: PropTypes.bool,
  }),
};

ExpenseForm.defaultProps = {
  obj: initialState,
};

export default ExpenseForm;
