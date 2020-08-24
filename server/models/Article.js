const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    title: { type: String },
    body: { type: String }
}, {
    // 在录入数据的时候，自动就有了两个属性 updatetime，createtime
    timestamps: true
})

module.exports = mongoose.model('Article', schema)

// 上面的写法省略了 第三个参数，表示的是数据库中的集合的名字，如果不写 默认是类名Article的小写的复数形式articles
// module.exports = mongoose.model('Article', schema, 'articles')
