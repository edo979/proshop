import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John doe',
    email: 'john@email.com',
    password: await bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Doe',
    email: 'Joe@email.com',
    password: await bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
