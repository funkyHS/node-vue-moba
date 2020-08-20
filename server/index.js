
const express = require('express')
const app = express()

app.set('token_secret', 'fsalkdfjs;alkj') // 保存token的密钥，可以检测到token是否被篡改过

app.use(require('cors')()) // 跨域模块
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads')) // 表示uploads路径下都是静态文件，可以直接通过upload直接访问


require('./plugins/db')(app)
require('./routes/admin')(app)


app.listen(3000, function() {
    console.log('http://localhost:3000');
})