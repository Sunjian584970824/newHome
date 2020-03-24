const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/Object', { useUnifiedTopology: true, useNewUrlParser: true });
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const user = mongoose.Schema({
    isDelete: { //是否删除
        type: Boolean,
        default: false
    },
    userName: { //权限集合
        type: String,
        default: 0
    }, //用户名
    password: String, //密码
    createTime: Date, //创建时间
    sessionToken: String, //token
    phoneNumber: { //手机号码
        type: Number,
        default: 0
    }, //手机号
    email: String, //email
    authority: { //权限集合
        type: Array,
        default: []
    },
    address: { //位置信息
        type: String,
        default: ''
    }
});
const sendEmail = mongoose.Schema({
    email: String,
    testNum: String,
    time: Date
});
const centerFile = mongoose.Schema({
    title: String, //标题
    createTime: Date, //创建时间
    changeTime: Date, //修改时间
    content: String, //内容
    email: String,
    titleImage: String,

});
const comment = mongoose.Schema({
        id: String,
        email: String,
        time: Date,
        comment: '', //内容
        child: [{
            fromUser: String,
            toUser: String,
            message: String,
            startTime: Date,
        }]
    })
    /************** 定义模型Model **************/
const Models = {
    user: mongoose.model('user', user),
    user: mongoose.model('comment', comment),
    sendEmail: mongoose.model('sendEmail', sendEmail),
    centerFile: mongoose.model('centerFile', centerFile)
}
module.exports = Models;