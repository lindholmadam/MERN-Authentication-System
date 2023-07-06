import bcrypt from 'bcrypt';

// Sample data
const users = [
  {
    firstName: 'Niklas',
    surname: 'Backman',
    email: 'niklas@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Adam',
    surname: 'Lindholm',
    email: 'adam@email.com',
    password: bcrypt.hashSync('123456', 10),
  }
];

export default users;