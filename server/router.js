const express = require('express')
const url = require('url');
const path = require('path')
const router = express.Router();
const nodemailer = require('nodemailer')
const fs = require('fs')
const formidable = require('formidable')
const model = require('./data.js')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const jwt = require('jsonwebtoken')
const util = require('./util')
const CodeExpiredTime = 60 //验证码过期时间
var app = express()
/*
    code:
        501:登录过期,
        301:用户名已经被注册,
*/

var respones = function (type, value, message, code) {
    let obj = {
        success: type,
        value: value,
        message: message,
        code: code ? code : (type ? 200 : 500)
    }
    return obj
}
router.all('*', async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Referer,token,User-Agent');

    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    // res.header('Content-Type', 'application/json;charset=utf-8');
    let url = ['/centerFile', '/comment']
    if (url.includes(req.originalUrl)) {
        let isverify = await verify({ token: req.headers.token, ssk: req.body.email })
        if (isverify) {
            let data = respones(false, {}, 'token过期，请重新登录')
            data.code = 501
            res.send(data)
        } else {
            next();
        }
    } else {
        next();

    }
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //添加这句话就可以正常返回数据了
    next();
})
router.get('*', function (req, res) { // 对所有get请求处理
    var pathname = __dirname + url.parse(req.url).pathname;
    if (path.extname(pathname) == "") {
        pathname += "/";
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";
    }
    var arrayAll = [".html", ".js", ".css", ".gif", ".jpg", ".png", ".mp3", '.txt'];
    var str = '';
    if (req.params[0].indexOf('.') > 0) {
        var n = req.params[0].indexOf('.')
        str = req.params[0].slice(n, req.params[0].length)
    }
    if (arrayAll.includes(str)) { //  解决中文URL乱码问题
        pathname = __dirname + req.params[0];
    }
    fs.exists(pathname, function (exists) {
        if (exists) {
            // 'Content-Disposition': 'attachment'  资源下载表示
            switch (path.extname(pathname)) {
                case ".html":

                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
                case ".js":
                    res.writeHead(200, { "Content-Type": "text/javascript", 'Content-Disposition': 'attachment' });
                    break;
                case ".css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case ".gif":
                    res.writeHead(200, { "Content-Type": "image/gif" });
                    break;
                case ".jpg":
                    res.writeHead(200, { "Content-Type": "image/jpeg", 'Content-Disposition': 'attachment' });
                    break;
                case ".png":
                    res.writeHead(200, { "Content-Type": "image/png" });
                    break;
                case ".mp3":
                    res.writeHead(200, { "Content-Type": "audio/wav" });
                    break;

                default:
                    res.writeHead(200, { "Content-Type": "application/octet-stream" });
            }

            fs.readFile(pathname, function (err, data) {

                res.end(data);
            });
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });
})
router.post('/api/sendEmail', (req, res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    var transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465,
        secureConnection: true,
        // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
        auth: {
            user: '18210029478@163.com',
            pass: 'jack123'
        }
    });
    var response = {}
    var code = ''
    for (var i = 0; i < 5; i++) {
        code += Math.floor(Math.random() * 10).toString()
    }
    var sendHtml = `<h1>您的验证码为</h1> ${code}` //邮箱内容
    var mailOptions = {
        // 发送邮件的地址
        from: '"sunjian" <18210029478@163.com>', // login user must equal to this user
        // 接收邮件的地址
        to: req.body.email, // xrj0830@gmail.com
        // 邮件主题
        subject: "欢迎注册sunjian的博客",
        // 以HTML的格式显示，这样可以显示图片、链接、字体颜色等信息
        html: sendHtml
    };
    let sendEmail = new mongoose.model('sendEmail')
    sendEmail.find({ email: req.body.email }, (err, row) => {
        if (err) return handleError(err);
        if (row.length === 0) {
            let saveEmail = new sendEmail({ time: new Date(), testNum: code, email: req.body.email })
            saveEmail.save((e, doc) => {
                if (e) return handleError(e);
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) { } else {
                        response = respones(true, code, '验证码已发送值邮箱，请查看')
                        res.send(response)
                    }
                });
            })
        } else {
            sendEmail.update({ email: req.body.email }, { time: new Date(), testNum: code }, (err, raw) => {
                if (err) return handleError(err);
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    } else {
                        response = respones(true, code, '验证码已发送值邮箱，请查看')
                        res.send(response)
                    }

                });
            })
        }
    })

})

var verify = async function (data) {
    let res
    await jwt.verify(data.token, data.ssk, function (err, decoded) {
        res = err ? true : false
    });
    return res
}
router.post('/api/queryIndexList', async (req, res) => {
    let centerFile = new mongoose.model('centerFile')
    //0查询返回自定字段，1不返回改字段
    centerFile.find({isDelete:false}, { title: 1, createTime: 1, titleImage: 1, content: 1, }, (ress, doc) => {
        let data = respones(true, { doc }, '')
        res.send(data)
    })
})
router.post('/api/updateText', (req, res) => {
    let centerFile = new mongoose.model('centerFile')
    centerFile.update({ id: req.body.id }, { content: req.body.content, title: req.body.title }, (err, raw) => {

        if (err) return handleError(err);
        let data = respones(true, { raw }, '成功')
        res.send(data)
    })
})
router.post('/api/queryUserName', async (req, res) => {
    let queryListName = []
    let responesObj = {}
    let body = req.body
    let userModel = mongoose.model('user');
    queryListName = await util.find({ model: userModel, data: { userName: body.userName }, })
    if (queryListName.length > 0) {
        responesObj = respones(true, '', '该用户名已被使用', 301)
    } else {
        responesObj = respones(true, '', '')

    }
    res.send(responesObj)
})
router.post('/api/singIn', async (req, res) => {
    let body = req.body
    let responesObj = {}
    let sendEmail = mongoose.model('sendEmail');
    let emailObj = []
    emailObj = await util.find({ model: sendEmail, data: { email: body.email, testNum: body.code }, })
    if (emailObj.length === 0 || emailObj[0].email !== body.email) {
        responesObj = respones(false, emailObj, '验证码错误')
        res.send(responesObj)
        return
    }
    let userModel = mongoose.model('user');
    let queryList = [],
        queryListName = []
    queryList = await util.find({ model: userModel, data: { email: body.email }, })
    queryListName = await util.find({ model: userModel, data: { userName: body.userName }, })
    if (queryList.length > 0) {
        responesObj = respones(true, '', '该邮箱已注册')
    } else if (queryListName.length > 0) {
        responesObj = respones(true, '', '该用户名已被使用')

    } else {
        let ssk = body.email
        // let ssk=fs.readFileSync('./privkey.pem')
        var token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60), }, ssk);
        let user = new userModel({
            password: body.password, //密码
            createTime: new Date(), //创建时间
            sessionToken: token, //token
            email: body.email, //email
            userName: body.userName, //email
        })
        let saveErr = await user.save()

        responesObj.type = true,
            responesObj.message = '注册成功'
    }
    res.send(responesObj)

})
router.post('/api/login', async (req, res) => {
    let body = req.body
    let data
    let user = new mongoose.model('user')

    let params = { email: body.email, password: body.password }
    let userObj = await util.find({ model: user, data: params })
    if (userObj.length === 0) {
        data = respones(false, '', '邮箱或密码错误')
        res.send(data)

    } else if (userObj[0].isDelete) {
        data = respones(false, '', '该账户已经注销')
        res.send(data)

    } else {
        let ssk = body.email
        let emailObj = await util.find({ model: user, data: { email: body.email }, })
        emailObj = emailObj.length > 0 ? emailObj[0] : {}
        var token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + (60 * 60), }, ssk);
        await user.update({ params, sessionToken: token }, (err, state) => {
            if (err) return handleError(err)
            else {

                data = respones(true, { token: token, userName: emailObj.userName }, '登录成功')
                res.send(data)

            }
        })
    }
})

router.post('/api/centerFile', async (req, res) => {
    let body = req.body;
    let data
    let obj = {
        title: body.title, //标题
        createTime: new Date(), //创建时间
        content: body.content, //内容
        email: body.email,
        titleImage: body.titleImage,
    }
    // let isverify = verify({ token: req.headers.token, ssk: body.email })
    // data = respones(false, {}, 'token过期，请重新登录')
    // if (isverify) {
    //     res.send(data)
    //     return
    // }

    let centerFile = new mongoose.model('centerFile')
    let saveCenterFile = new centerFile(obj)
    saveCenterFile.save((err, doc) => {
        if (err) return handleError(e);

        data = respones(true, {}, '保存成功')
        res.send(data)
    })
})
router.post('/api/img', (req, res) => {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/img");
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    // form.uploadDir = "./uploads";
    form.parse(req, function (err, frelds, files) {
        var filename = files.image.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + 'time_' + time + '.' + type;
        var newPath = form.uploadDir + "\\" + avatarName;
        fs.renameSync(files.image.path, newPath); //重命名
        res.send({ data: "/img/" + avatarName, success: true })
    })
})
router.post('/api/queryDetail', async (req, res) => {
    let centerFile = new mongoose.model('centerFile')
    centerFile.findById(req.body.id, (err, doc) => {
        if (err) return handleError(err);
        let data = respones(true, { doc }, '')
        res.send(data)
    })
})
router.post('/api/comment', async (req, res) => {
    let centerFile = new mongoose.model('comment')
    let obj = {
        time: new Date()
    }
    obj = Object.assign(obj, req.body)
    let save = new centerFile(obj)
    save.save((err) => {
        if (err) return handleError(err);
        let data = respones(true, {}, '成功')
        res.send(data)
    })
})
router.post('/api/queryComment', (req, res) => {
    let centerFile = new mongoose.model('comment')
    centerFile.find({ id: req.body.id }, (err, doc) => {
        if (err) return handleError(err);
        let data = respones(true, { doc }, '成功')
        res.send(data)
    })
})
router.post('/api/music', (req, res) => {
    fs.readdir(__dirname + '/music', (err, files) => {
        let responses = {}
        if (err) {
            responses = respones(false, '', '')
        } else {
            responses = respones(true, files, '')
        }
        res.send(responses)
    })
})
router.post('/api/myText', (req, res) => {
    let centerFile = new mongoose.model('centerFile')
    centerFile.find({ email: req.body.email ,isDelete:false}, (err, doc) => {
        if (err) return handleError(err);
        let data = respones(true, { doc }, '成功')
        res.send(data)
    })
})
router.post('/api/delete', (req, res) => {
    let centerFile = new mongoose.model('centerFile')
    console.log(req.body)
    centerFile.findByIdAndUpdate(req.body.id, { isDelete:true }, (err, raw) => {
        if (err) return handleError(err);
        let data = respones(true, { raw }, '成功')
        res.send(data)
    })
})
module.exports = router;