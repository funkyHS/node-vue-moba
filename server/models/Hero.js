const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String},
    avatar: { type: String },
    banner: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number}, // 难度
        skills: { type: Number},    // 技能
        attack: { type: Number},    // 攻击
        survive: { type: Number}    // 生存
    },
    skills: [{
        icon: {type: String},
        name: {type: String},
        delay: {type: String}, // 冷却值
        cost: {type: String},  // 消耗
        description: {type: String},
        tips: {type: String}
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 使用技巧
    usageTips: { type: String },
    // 对抗技巧
    battleTips: { type: String },
    // 团战思路
    teamTips: { type: String },
    // 搭档
    partners: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero' 
        },
        description: {type: String}
    }]
})

// 这里不够智能，集合的名称是 heros，手动填入第三个参数，将集合名称设置为 heroes
// module.exports = mongoose.model('Hero', schema)
module.exports = mongoose.model('Hero', schema, 'heroes')
