
// Arquitetura para desacoplamento, ao mudar por exemplo o mongoose para usar o drive deo mongodb
// seria menos custoso

module.exports = () => {
  router.post('/singup', new SingUpRouter().route)
}

// signup-router

const express = require('express')
const router = express.Router()

class SingUpRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    new SingUpUseCase().signUp(email, password, repeatPassword)
    res.status(400).json({ error: 'password must be equal to repeardPassword' })
  }
}

// signup use-case

class SingUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().signUp(email, password)
    }
  }
}

// add account-repo

const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async signUp (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
