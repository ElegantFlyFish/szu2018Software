const express = require('express')
const Router = express.Router()
const utility = require('utility')
const model = require('./model')
const User = model.getModel('users')

const filter = { userpwd:0, __v:0 }

function md5String(str){
  const md5str = 'qwedD43~@&*%$213sdc_+='
  return utility.md5(utility.md5(md5str) + str)
}

Router.post('/register',(req, res) => {
  const data = req.body
  User.findOne({username:data.username},(err, doc)=>{
    if(err){
      return res.json({code:1,msg:`服务器错误:${err}`})
    }
    if(doc){
      return res.json({code:1, msg:'用户名已经存在'})
    }
    const usermodel = new User(Object.assign({},data,{userpwd:md5String(data.userpwd)}))
    usermodel.save((err, doc)=>{
      if(err){
        return res.json({ code:1, msg:`服务器错误：${err}`})
      }
      if(doc){
        res.cookie('userid',doc._id)
        return res.json({code:0,msg:'',data:doc})
      }
    })
  })
})

Router.get('/info',(req, res) => {
  const { userid }  = req.cookies
  if(!userid){
    res.json({ code:1, msg:''})
  }
  User.findOne({ _id:userid }, filter, (err,doc) => {
    if(err){
      res.json({ code:1, msg:`服务器错误：${err}` })
    }
    if(doc){
      res.json({ code:0, data:doc })
    }
  })
})

Router.get('/getStus',(req, res) => {
  User.find({role:0},(err, doc)=>{
    if(err){
      res.json({ code:1, msg:`服务器错误：${err}` })
    }
    if(doc){
      res.json({ code:0, data:doc })
    }
  })
})

Router.post('/login',(req, res) => {
  const {username, userpwd} = req.body
  User.findOne({ username, userpwd:md5String(userpwd) },filter,(err,doc) => {
    if(!doc){
      return res.json({code:1,msg:'用户名或密码错误'})
    }
    res.cookie('userid',doc._id);
    return res.json({ code:0, data:doc})
  })

})

module.exports = Router