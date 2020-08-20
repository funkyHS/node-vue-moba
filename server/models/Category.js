const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId, // 表示是数据库里面的 ObjectId
        ref: 'Category'  // 表明关联的是什么 模型
    }
})

module.exports = mongoose.model('Category', schema)
