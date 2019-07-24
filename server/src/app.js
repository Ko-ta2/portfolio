const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const User = require('../models/user')


mongoose.connect('mongodb://localhost:27017/data', {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, '接続エラー'))
db.once('open', function(callback){
  console.log('接続成功')
})

const app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

//ユーザチェック
app.post('/checkUser', (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, data) => {
    res.send(data)
  })
})

//サインアップ
app.post('/signUp', (req, res) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      createdAt: new Date,
      updatedAt: new Date
    })

    newUser.save()
    .then((newUser) => {
      res.send({
        success: true,
        userId: newUser._id
      })
    })
})

//全データ取得
app.get('/users', (req, res) => {
  User.find({}, (error, data) => {
    if(error) {
      console.log(error)
    }
    res.send(data)
  }).sort({updatedAt: -1})
})

//新規登録
app.post('/user', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    createdAt: new Date,
    updatedAt: new Date
  })

  newUser.save(error => {
    if (error) {
      res.send({
        success: false,
        message: error
      })
    }
    res.send({
      success: true,
      message: '登録しました'
    })
  })
})

//更新
app.put('/user/:id', (req, res) => {
  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    updatedAt: new Date
  }

  User.updateOne({
    _id: req.params.id
    }, {
      $set: user
    }, (error, user) => {
      if (error) {
        res.send({
          success: false,
          message: error
        })
      }
      res.send({
        success: true,
        message: '更新しました'
      })
    }
  )
})

//削除
app.delete('/user/:id', (req, res) => {
  User.deleteOne({
    _id: req.params.id
  }, (error, user) => {
    if (error) {
      res.send({
        success: false,
        message: error
      })
    }
    res.send({
      success: true,
      message: '削除しました'
    })
  })
})

//ユーザ取得
app.get('/user/:id', (req, res) => {
  User.findOne({
    _id: req.params.id
  }, {
    password: 0
  }, (err, user) => {
    res.send(user)
  })
})


app.listen(process.env.PORT || 8081)