import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProfile } from '../../../api/profile';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EditProfile() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleProfile(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<ProfileForm obj={editItem} />);
}
