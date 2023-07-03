import bcrypt from 'bcrypt';

// Sample data
const users = [
  {
    name: 'Roland',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Niklas Backman',
    email: 'niklas@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Adam Lindholm',
    email: 'adam@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Frida Lindholm',
    email: 'frida@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;