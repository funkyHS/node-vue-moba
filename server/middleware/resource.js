module.exports = optional => {

    return async (req, res, next) => {

        // inflection 组件用来转换(复数转成单数，首字母大写) 将 categories -> Category
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        
        next() // 使用 next() 才会执行后面的 中间件
    }
}