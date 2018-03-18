const mongoose = require('mongoose')

const connectOption = {
  user:'zdgf',
  pass:'zdgf'
}
const DB_URL = 'mongodb://zdgf:zdgf@127.0.0.1:27017/studentSystem';
mongoose.connect(DB_URL,connectOption);

const models = {
  users:{
    'role':{ type:Number, require: true, default:0 },
    'username':{ type:String, require: true },
    'userpwd':{ type:String, require: true },
    'stunumber':{ type:String, require: true },
    'realname':{ type:String, require: true },
    'cellphone':{ type:String, require: true },
    'email':{ type:String, require: true },
    'gender':{ type:Number, default:0 },
    'birthdate':{ type:String, default:''},
    'profession':{ type:String, default:''},
    'workingyears':{type:String, default:''},
    'introduction':{ type:String, default:''},
    'createtime':{ type:Date, default:new Date() }
  }
}

for(let key in models){
  mongoose.model(key,new mongoose.Schema(models[key]))
}

mongoose.connection.on('connected',function(){
  console.log('mongo connected alreday!');
})

module.exports = {
  getModel:function(modelName){
    return mongoose.model(modelName)
  }
}