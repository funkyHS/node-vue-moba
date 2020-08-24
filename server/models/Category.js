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

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})


schema.virtual('newsList', { 
    localField: '_id',
    foreignField: 'categories', // 表示Article中对应的是哪个字段
    justOne: false,
    ref: 'Article'
})



module.exports = mongoose.model('Category', schema)
