<template>
<div id="login">
    <div class='isSmallScreen' v-if="!isSmallScreen">
        <div class="header ">
            <i class="el-icon-arrow-left" @click="$goback"></i>
            <div class='titleBox'>{{isSingIn?'登录':'注册'}}</div>
        </div>
        <div class="user">
            <div class="box"></div>

        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <div class='from'>
                <div class='loginBox'>

                    <el-form-item prop="email" v-if="isEmail">
                        <el-input class='fromInput' v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                        <i class='leftIcon el-icon-message'></i>
                    </el-form-item>
                    <el-form-item prop="userName" v-else>
                        <el-input class='fromInput' v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                        <i class='leftIcon el-icon-message'></i>
                    </el-form-item>
                    <el-form-item v-if='!isSingIn' prop="code" class='marginBottom'>
                        <img class='leftIcon myIcon ' src='../../../assets/image/message.svg' />
                        <el-input placeholder="请输入验证码" v-model="ruleForm.code">
                            <el-button slot="append" :disabled="disabledBtn" @click.native="getRuleCode">{{timeString}}</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" :type='passwordText'></el-input>
                        <!-- <i class='leftIcon el-icon-mobile-phone'></i> -->
                        <i class='leftIcon el-icon-edit-outline' style="z-index:22"></i>
                        <img class='rightIcon myIcon ' @click="seePwd('passwordText')" :src="passwordText==='text'?require('../../../assets/image/pwd_on.svg'):require('../../../assets/image/pwd_off.svg')" />

                    </el-form-item>
                    <el-form-item prop="passwordAgin" v-if='!isSingIn'>
                        <el-input class='fromInput' v-model="ruleForm.passwordAgin" :type='passwordAginText' placeholder="请再次输入密码"></el-input>
                        <!-- <i class='leftIcon el-icon-mobile-phone'></i> -->
                        <i class='leftIcon el-icon-edit-outline' style="z-index:22"></i>
                        <img ref='image' class='rightIcon myIcon ' @click="seePwd('passwordAginText')" :src="passwordAginText==='text'?require('../../../assets/image/pwd_on.svg'):require('../../../assets/image/pwd_off.svg')" />

                    </el-form-item>
                </div>
                <div class='inputF'>
                    <el-button type="success" @click='loginMethod' style="line-height:20px;width:100%">{{isSingIn?'登录':'注册'}}</el-button>
                </div>
            </div>
        </el-form>
        <div class='waring'>
            <div class='singIn' v-if='!isSingIn' @click="changeLogin(true)">
                <div style="display:flex">
                    <div @click='isEmai=true'>邮箱登录</div>
                    <div @click='isEmai=false'>密码登陆</div>
                </div>

            </div>
            <div v-else @click="changeLogin(false)">没有账号？快去注册吧</div>
            <div style='flex:1'></div>
        </div>
    </div>
</div>
</template>

<script>
import md5 from 'md5'
var _this
export default {
    computed: {
        isSmallScreen() { //判断屏幕大小
            return this.$store.state.isSmallScreen
        }
    },
    data() {
        var passwordAgin = function (rule, value, callback) {
            if (!value) {
                return callback(new Error('请输入密码'));
            } else if (_this.ruleForm.password != _this.ruleForm.passwordAgin) {
                return callback(new Error('两次输入密码不一致'));
            } else {
                return callback();

            }
        }
        return {
            passwordAginText: 'password',
            passwordText: 'password',
            timeString: '获取验证码',
            isSingIn: true, //判断是否登录
            isEmail: true, //邮箱或者用户名登陆
            disabledBtn:false,//验证码按钮禁点
            ruleForm: {
                email: '584970824@qq.com',
                code: '', //验证码
                password: '123456', //密码
                passwordAgin: '', //密码确认
                userName: ''
            },
            time: 60, //验证码倒计时
            rules: {
                password: {
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                },
                code: {
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur,change'
                },
                userName: {
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur,change'
                },
                passwordAgin: [{
                    validator: passwordAgin,
                    trigger: 'blur'
                }],
                email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur,change'
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur,change'
                    }
                ],
            }
        }
    },
    mounted() {
        _this = this
        // if(this.$route.query.redirect){
        //   this.$message.error('您未登录，请登录');
        // }
    },

    methods: {
        loginMethod() {
            this.$refs.ruleForm.validate(validate => {
                if (validate) {
                    this.userSingin()
                }
            })

        },
        userSingin() {
            var obj = {
                password: md5(this.ruleForm.password), //密码
                email: this.ruleForm.email, //email
            }
            let methods = this.isSingIn ? 'login' : 'singIn'
            this.$axios({
                url: 'api/'+methods,
                data: obj
            }).then(res => {
                if(res.data.value){
                    let user={
                        email:this.ruleForm.email,
                        token:res.data.value.token
                    }
                localStorage.setItem('token',res.data.value.token)
                localStorage.setItem('user',JSON.stringify(user))
                   localStorage.setItem("youke", false);
                  if(this.isSingIn &&this.$route.query.redirect){
                        this.$router.replace({path:this.$route.query.redirect})
                    }
                }
            })
        },
       
        seePwd(data) {
            this[data] = this[data] === 'text' ? 'password' : 'text'
        },
        changeLogin(type) {
            this.isSingIn = type
            this.$refs.ruleForm.resetFields()
            // this.$axios({
            //     url: '/login'
            // })
        },
        sendEmail() {
            this.$axios({
                url: 'api/sendEmail',
                data: {
                    email: this.ruleForm.email
                }
            })
        },
        getRuleCode() {
                 this.disabledBtn=true
                var timer = setInterval(() => {
                    if (this.time === 0) {
                        clearInterval(timer)
                        this.timeString = '重新获取验证码'
                        this.time = 60
                         this.disabledBtn=false
                    } else {
                        this.time--
                        this.timeString = this.time
                    }
                }, 1000);
                this.sendEmail()

        }
    }
}
</script>

<style lang="less">
#login {
    .el-form-item__content {
        justify-content: center;
        align-content: center;
        display: flex
    }

    .marginBottom {
        margin-bottom: 20px;
    }

    .from {
        padding: 0 30px;
        box-sizing: border-box;

        .leftIcon,
        .rightIcon {
            top: 50%;
            transform: translate(0, -25%)
        }

        .el-input__inner {
            padding: 0 60px;
        }

        .is-error {
            .leftIcon {
                color: red !important;
            }
        }
    }
}
</style><style lang="less" scoped>
#login {
    .waring {
        padding-left: 30px;
        box-sizing: border-box;
        line-height: 60px;
        text-align: left;
        display: flex;

        .singIn {
            padding-right: 30px;
            box-sizing: border-box;
        }
    }

    .header {
        height: 70px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;

        i {
            font-size: 30px;
        }

        .titleBox {
            flex: 1;
            text-align: center
        }
    }

    .el-form {
        i {
            font-size: 30px;

        }

        .leftIcon {
            position: absolute;
            left: 20px;
            top: 15px;
            color: #ddd
        }

        .rightIcon {
            position: absolute;
            right: 20px;
            top: 15px;
            color: #ddd
        }

        .ruleCode.ruleCode {
            color: black;
            font-size: 20px;
        }
    }

    .user {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        .box {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #DDD;
        }
    }
}
</style>
