module.exports = options => {

    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async (req, res, next) => {

        // 抛出错误信息，然后由 路由的最后面的”错误处理函数“，反馈给客户端
        // assert(token, 401, '请先登录')

        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')

        const { id } = jwt.verify(token, req.app.get('token_secret'))
        assert(id, 401, '请先登录')

        req.user = await AdminUser.findById(id)
        assert(req.user, 402, '请先登录') 
        
        await next()
    }
}