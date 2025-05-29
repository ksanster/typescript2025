import User, { say42 } from './external.js';

const user = new User('Alex');
console.log(user.name);
say42();
