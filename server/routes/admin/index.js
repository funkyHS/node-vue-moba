
module.exports = function(app) {

    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })

    // 创建分类的接口
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 修改分类名称接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除分类接口
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 分类list的接口
    router.get('/', async (req, res) => {

        // populate 表示关联查询，所需要的不仅仅是parent，而是parent所对应的对象

        const queryOptions = {}
        if(req.Model.modelName === 'Category') { // 特殊处理
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 获取分类详情的接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })


    // 应用层中间件
    // 在  /admin/api/rest/:resource 路径中为任何类型的 HTTP 请求执行此函数
    app.use('/admin/api/rest/:resource', async (req, res, next) => {

        // inflection 组件用来转换(复数转成单数，首字母大写) 将 categories -> Category
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)

        next() // 使用 next() 才会执行后面的 中间件

    },router)



    // 上传图片的接口
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads'})

    // single表示单个文件上传
    app.post('/admin/api/upload',upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })



}
