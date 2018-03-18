const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('users')
const xl = require('excel4node')

function createExcel(data,res){
  const rows = data
  //console.log(rows,'show rows')
  const wb = new xl.Workbook({
      defaultFont: {
          size: 14,
          color: '314659'
      },
      dateFormat: 'yyyy-mm-dd hh:mm:ss'
  });
 
  const ws = wb.addWorksheet('Sheet 1');

  // 1.set the colum length
  // ws.column(1).setWidth(10);
  // 2.set header
  // data field: stunumber realname gender birthdate email cellphone profession workingyears introduction createtime
 
  const headerArr = ['学号', '姓名', '性别', '生日', '邮箱', '手机', '职业', '工作年限', '自我简介', '注册时间']
  for(let i = 0, l =  headerArr.length; i < l; i++){
    ws.column((i+1)).setWidth(20);
    ws.cell(1,(i+1)).string(headerArr[i]);
  }
  
  console.log(rows,'steps rows -> 2')
  // 3.set cell datatype
  for(let i = 0, l = rows.length; i<l; i++){
      const item = rows[i];
      console.log(item,'item index'+i)
      ws.cell((i+2),1).string(item['stunumber']);
      ws.cell((i+2),2).string(item['realname']);
      ws.cell((i+2),3).string(item['gender'] === 0 ? '女':'男');
      ws.cell((i+2),4).string(item['birthdate']  || '');
      ws.cell((i+2),5).string(item['email']);
      ws.cell((i+2),6).string(item['cellphone']);
      ws.cell((i+2),7).string(item['profession'] || '');
      ws.cell((i+2),8).string(item['workingyears']  || '');
      ws.cell((i+2),9).string(item['introduction']  || '');
      ws.cell((i+2),10).date(item['createtime']);
  }
  wb.write('diyname.xlsx', res);
}

Router.get('/exportExcl',(req, res)=>{
  const filter = { role:0, username:0, userpwd:0, __v:0, _id:0 }
  User.find({role:0}, filter, (err, doc) => {
    if(err){
      return res.json({ code:1, msg:`服务器错误：${err}` })
    }
    if(doc){
      createExcel(doc, res)
    }
  })
})

module.exports = Router