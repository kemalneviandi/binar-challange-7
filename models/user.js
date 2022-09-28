'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      // define association here
    }
    static #encrypt = (password) => bcrypt.hashSync(password, 10)
    
    static register = ({ username,password,role }) => {
      const encryptedPassword = this.#encrypt (password)
      return this.create ({ username,password : encryptedPassword, role})
    }
    checkPassword = password => bcrypt.compareSync(password, this.password)
  generateToken = () => {
    const payload = {
      id: this.id,
      username: this.username
    }
    const rahasia = 'ini rahasia'
    const token = jwt.sign(payload,rahasia)
    return token
  }
  static authenticateUser
    checkPassword = password => bcrypt.compareSync(password, this.password)
    static authenticateUser = async({username,password})=>{
      try {const user = await this.findOne({where: { username}})
      if (!user) return Promise.reject("User Not Found!")
      const isPasswordValid = user.checkPassword(password)
      if (!isPasswordValid) return Promise.reject("Wrong Password")
      return Promise.resolve(user)
    }
    catch(err) {
      return Promise.reject(err)
    }
  }
  
}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('player', 'admin')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};