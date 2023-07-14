import bcrypt from 'bcrypt';

// Sample data
const users = [
  {
    firstName: 'Niklas',
    surname: 'Backman',
    email: 'niklas@email.com',
    password: bcrypt.hashSync('123456', 10),
    // address: {
    //   street: 'Niklasvägen 12',
    //   zipCode: 12455,
    //   city: 'Stockholm',
    // }
  },
  {
    firstName: 'Adam',
    surname: 'Lindholm',
    email: 'adam@email.com',
    password: bcrypt.hashSync('123456', 10),
    // address: {
    //   street: 'Adamvägen 12',
    //   zipCode: 111111,
    //   city: 'Stockholm',
    // }
  }
];

export default users;