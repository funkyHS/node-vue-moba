const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: { 
        type: String, 
        select: false, // 表示不需要查出来 密码
        set(val) {
            // 10 表示加密的复杂度，越大越耗时，建议10-12. 比md5加盐还要安全
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)



