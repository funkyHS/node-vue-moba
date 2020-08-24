const AdminUser = require('../../models/AdminUser')

module.exports = function(app) {

    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')

    const router = express.Router({
        mergeParams: true
    })

    // 创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 修改资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除资源
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 资源列表
    router.get('/' , async (req, res) => {

        // populate 表示关联查询，所需要的不仅仅是parent，而是parent所对应的对象
        const queryOptions = {}
        if(req.Model.modelName === 'Category') { // 特殊处理
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })



    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 资源中间件
    const resourceMiddleware = require('../../middleware/resource')

    // 应用层中间件
    // 在  /admin/api/rest/:resource 路径中为任何类型的 HTTP 请求执行此函数
    app.use('/admin/api/rest/:resource' ,authMiddleware(), resourceMiddleware(), router)


    // 上传图片的接口
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads'})

    // single表示单个文件上传
    app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


    // 登录接口
    app.post('/admin/api/login',async (req, res) => {
        const {username, password} = req.body
        // 1. 根据用户名找用户
        const user = await AdminUser.findOne({ username }).select('+password')
        
        // 可以替代下面判断，抛出错误信息，然后由 路由的最后面的”错误处理函数“，反馈给客户端
        assert(user, 422, '用户不存在') 
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }

        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // if(!isValid) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        
        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('token_secret')) // app.get('token_secret') 获取到密钥，可以检测token是否被篡改过
        res.send({token, username})
        
    })

    // 错误处理函数 
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })


}



