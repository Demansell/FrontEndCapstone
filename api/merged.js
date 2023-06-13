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

const viewExpenseReport = (profileFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfileExpense(profileFirebaseKey)])
    .then(([profileObject, profileExpenseArray]) => {
      // need to map over expense array and add all the erxpenses together and add to total expenses
      let totalExpenseNumber;
      if (profileExpenseArray.length > 1) {
        totalExpenseNumber = profileExpenseArray.reduce((total, currentObject) => total + Number(currentObject.monthly_total), 0);
      } else {
        totalExpenseNumber = profileExpenseArray[0]?.monthly_total ? Number(profileExpenseArray[0].monthly_total) : 0;
      }
      const leftOverAmount = Number(profileObject.monthly_income) - totalExpenseNumber;
      resolve({ monthlyIncome: profileObject.monthly_income, totalExpense: totalExpenseNumber, leftOverAmount });
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

export {
  viewExpenseDetails, viewProfileDetails, deleteProfileExpense, viewExpenseReport,
};
