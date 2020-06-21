const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  validatePassword(loginPw) {
    console.log('loginPW', loginPw);
    console.log('hashedPW', this.password);
    console.log(bcrypt.compare(loginPw, this.password));
    // return bcrypt.compare(loginPw, this.password);
    return new Promise((resolve, reject) => {
      bcrypt.compare(loginPw, this.password)
      .then((res) => {
        console.log('Comparison was ' + res)
        console.log(res);
        // let response = res;
        // return response;
        resolve(res);
        // return res;
      })
      // resolve(res);
    })   
  }

  // return new Promise((resolve, reject) => {
  //   return connection.query(sql, (err, row) => {
  //     if (err) {
  //       console.log(`Error: ${err}`);
  //       return reject(err);
  //     }
  //     const roleArr = [];
  //     row.forEach(role => {
  //       roleArr.push(role.title);
  //     });
  //     resolve(roleArr);
  //   });
  // })
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    },
    dark_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      async beforeUpdate(existingUser) {
        existingUser.password = await bcrypt.hash(existingUser.password, 10);
        return existingUser;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;