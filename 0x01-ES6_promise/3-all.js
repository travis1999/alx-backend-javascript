import { uploadPhoto, createUser } from './utils';


export default function handleProfileSignup() {
  Promise.all([uploadPhoto(), createUser()])
    .then(results => {
      console.log(`${results[0].body} ${results[1].firstName} ${results[1].lastName}`);
    })
    .catch(error => {
      console.log("Signup system offline");
    });
}