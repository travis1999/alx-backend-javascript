import signUpUser from "./4-user-promise";
import uploadPhoto from "./5-photo-reject";


export default function handleProfileSignup(firstName, lastName, fileName)
{
  Promise.all([signUpUser(firstName, lastName), uploadPhoto(fileName)])
    .catch(error => {
      console.log(error);
    })
    .then(results => {
      console.log(results);
    });
    
}