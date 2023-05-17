import { deleteExpense, getSingleExpense } from './expense';
import { deleteSingleProfile, getProfileExpense, getSingleProfile } from './profile';

const viewExpenseDetails = (expenseFirebaseKey) => new Promise((resolve, reject) => {
  getSingleExpense(expenseFirebaseKey)
    .then((expenseObject) => {
      getSingleProfile(expenseObject.profile_id)
        .then((profileObject) => {
          resolve({ profileObject, ...expenseObject });
        });
    }).catch((error) => reject(error));
});

const viewProfileDetails = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfileExpense(profileFirebaseKey)])
    .then(([profileObject, profileExpenseArray]) => {
      resolve({ ...profileObject, expense: profileExpenseArray });
    }).catch((error) => reject(error));
});

const deleteProfileExpense = (profileId) => new Promise((resolve, reject) => {
  getProfileExpense(profileId).then((expenseArray) => {
    console.warn(expenseArray, 'Teamss Members');
    const deleteExpensePromises = expenseArray.map((expenses) => deleteExpense(expenses.firebaseKey));

    Promise.all(deleteExpensePromises).then(() => {
      deleteSingleProfile(profileId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewExpenseDetails, viewProfileDetails, deleteProfileExpense };
