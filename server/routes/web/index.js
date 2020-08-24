module.exports = app => {

    const router = require('express').Router()

    // const Article = require('../../models/Article')
    // 可以代替上面输入路径的引入模块的方式 使用mongoose进行引入
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')


    // 添加新闻列表数据 临时接口
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
         })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles =  ["英雄调整情报丨杨戬/苏烈加强，阿古朵降温，蔡文姬优化", "主播入驻游戏圈，发帖赢大奖！", "《王者荣耀》品牌代言人首登场，欢迎真爱玩家加入战场", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "8月22日体验服停机更新公告", "“iOS14 Beta4”系统启动问题建议处理公告", "8月21日建议更新公告", "8月20日体验服停机更新公告", "8月19日净化游戏环境声明及处罚公告", "恭喜TS夺得世冠总冠军，回馈福利来袭，典韦-蓝屏警告星元上新", "【看世冠对决 赢豪华大礼】活动公告", "应援世冠得好礼，墨子两款皮肤重塑完成即将登场", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售", "8月7日【比赛服】版本更新公告", "7月29日【比赛服】版本更新公告", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉"]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
            return {
                title: title,
                categories: randomCats.slice(0, 2)
            }
        })

        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })






    // 显示新闻列表 接口
    router.get('/news/list', async (req, res) => {

        // 1. 关联查询 这种查询很方便，但是有问题，每条栏目下面要求都是 5条内容，4个分类，查询20条，如果最近添加的不是很均匀，那么查询到的前 20条，有可能是同一个分类的（populate 没有办法控制每个分类展示多少条，只能控制总共展示20条）
        // const parent = await Category.findOne({
        //     name: '新闻分类'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean() // lean表示把 关联 对应的详细信息也展示出来

        // 2. 聚合查询
        // 2.1 找到顶级分类
        const parent = await Category.findOne({
            name: '新闻分类'
        })

        // 2.1 聚合查询（一次查询，可以同时执行多次查询，效率也比一条条查询高）
        const cats = await Category.aggregate([
            // 2.1.1. 过滤数据，相当于条件查询
            { $match: { parent: parent._id } },
            // 2.1.2. 关联数据
            { 
                // lookup 外链接：类似于关系型数据库里的 join
                $lookup: {
                    from: 'articles',  // 关联哪个集合（集合的名字与模型的名字是一一对应的）
                    localField: '_id', // 表示 本地键
                    foreignField: 'categories', // 外地键
                    as: 'newsList' // 命名
                } 
            }, 
            // 2.1.3. 定义newsList只需要 5条数据
            {
                // 修改 newsList
                $addFields: {
                    // 操作符 slice，表示取几个
                    newsList: { $slice: ['$newsList',5] }
                }
            }
        ])

        // 2.3 热门分类的数据
        const subCats = cats.map(v => v._id)
        cats.unshift( {
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats}
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })



    app.use('/web/api',router)
}