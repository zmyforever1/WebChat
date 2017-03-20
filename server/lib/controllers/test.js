const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webchat')

const User = require('./user');

class Test {
  constructor(obj) {
    this.user = new User(obj);
  }

  async hashPassword() {
    const hash = await this.user.hashPassword();
    console.log(hash)
  }

  async findUserByName() {
    const user = await this.user.findUserByName();
    console.log(user)
  }

  async save() {
    const newUser = await this.user.save();
    console.log(newUser);
  }

  async findByUserOrCreate() {
    const newUser = await this.user.findByUserOrCreate();
    console.log(newUser);
  }

  async authenticate() {
    const hashPass = await this.user.authenticate();
    console.log(hashPass);
  }
}

const test = new Test({
  email: '921255@z',
  password: 'zzz'
})

// test.hashPassword();
// test.save();
// test.authenticate();
// test.findUserByName();
// test.findByUserOrCreate();

async function aa() {
  let a = await User.search('921255');
  console.log(a);
}
aa();