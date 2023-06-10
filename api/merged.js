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

const viewExpenseReport = () => new Promise((resolve, reject) => {
  Promise.all([getSingleProfile(profileFirebaseKey), getProfileExpense(profileFirebaseKey)])
    .then(([expenseObject, profileExpenseArray]) => {
      // need to map over expense array and add all the erxpenses together and add to total expenses
      const totalExpenseArray = [expenseObject.monthly_total.firebaseKey];
      function add(nums) {
        let sum = 0;

        for ( const num of nums) {
          sum = sum + num;
        }
        return sum;
      }
      // create a new var where you minus total expenses from monthly income
      const leftOverExpense = ([profileExpenseArray.firebaseKey - monthly_income]);
      // then create a new object in with the left over data
      resolve({  });
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
