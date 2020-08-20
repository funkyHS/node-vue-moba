const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String},
    avatar: { type: String },
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

module.exports = mongoose.model('Hero', schema)
