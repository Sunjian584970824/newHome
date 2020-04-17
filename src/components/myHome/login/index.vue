<template>
<div id="login">
    <div class='isSmallScreen' v-if="isSmallScreen">
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
    <div v-else class='bigScrenn'>
        <div class="fle1"></div>
        <div class="centerBoxs">
            <div class="box1"></div>
            <div class="flex1">
                <div class='loginCenterBox'>
                    <div class='fat'>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position='right' class="demo-form-inline">
                            <el-form-item label="">
                                <div class='titleBox'>{{isSingIn?'登录':'注册'}}</div>
                            </el-form-item>
                            <el-form-item label="用户名" prop="userName" v-if='!isSingIn'>
                                <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码" v-if='!isSingIn' prop="code">
                                <el-input v-model="ruleForm.code" placeholder="请输入验证码">
                                    <el-button slot="append" :disabled="disabledBtn" @click.native="getRuleCode">{{timeString}}</el-button>

                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="ruleForm.password" :type='passwordText' placeholder="请输入密码">
                                    <img class='rightIconLg myIcon ' slot="suffix" @click="seePwd('passwordText')" :src="passwordText==='text'?require('../../../assets/image/pwd_on.svg'):require('../../../assets/image/pwd_off.svg')" />
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="passwordAgin">
                                <el-input v-model="ruleForm.passwordAgin" :type='passwordAginText' placeholder="请确认密码">
                                    <img class='rightIconLg myIcon ' slot="suffix" @click="seePwd('passwordAginText')" :src="passwordAginText==='text'?require('../../../assets/image/pwd_on.svg'):require('../../../assets/image/pwd_off.svg')" />
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class='loginMethodsLarge' @click="loginMethod">{{isSingIn?'登录':'注册'}}</el-button>
                            </el-form-item>

                            <div class='singIn' v-if='!isSingIn' @click="changeLogin(true)">
                                <div style="display:flex">
                                    <div @click='isEmai=true'>邮箱登录</div>
                                    <div @click='isEmai=false'>密码登陆</div>
                                </div>

                            </div>
                            <div style="text-align:left;width:100%" @click="changeLogin(false)">没有账号？快去注册吧</div>
                        </el-form>
                    </div>

                </div>
            </div>
        </div>
        <div class="fle1"></div>
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
        var userNameRule = async function (rule, value, callback) {
          
            if (!(value.toString())) {
                  console.log(value.toString())
                return callback(new Error('请输入用户名'));
            } else {
               await _this.queryUserName()
               
                if( _this.queryUserNameValue.code===301){
                      return callback(new Error('用户名已被使用'));
                }else{
                return callback();

                }
            }
        }
        return {
            queryUserNameValue:{},
            passwordAginText: 'password',
            passwordText: 'password',
            timeString: '获取验证码',
            isSingIn: true, //判断是否登录
            isEmail: true, //邮箱或者用户名登陆
            disabledBtn: false, //验证码按钮禁点
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
                    trigger: ['blur', 'change']
                },
                userName: {
                    required: true,
                    trigger: ['blur', 'change'],
                    validator: userNameRule,
                },
                passwordAgin: [{
                    validator: passwordAgin,
                    required: true,
                    trigger: 'blur'
                }],
                email: [{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: ['blur', 'change']
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
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
         queryUserName() {
             this.$axios({
                url: 'api/core/queryUserName',
                data: {
                    userName: this.ruleForm.userName
                }
            }).then(res => {
                this.queryUserNameValue= res.data.data
            })
        },
        loginMethod() {
            console.log(this.$refs.ruleForm)
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
            if(methods==='singIn'){
                obj.code=this.ruleForm.code
            }
            this.$axios({
                url: 'api/core/' + methods,
                data: obj
            }).then(res => {
                if (res.data.value) {
                    let user = {
                        email: this.ruleForm.email,
                        token: res.data.value.token
                    }
                    localStorage.setItem('token', res.data.value.token)
                    localStorage.setItem('user', JSON.stringify(user))
                    localStorage.setItem("youke", false);
                    if (this.isSingIn && this.$route.query.redirect) {
                        this.$router.replace({
                            path: this.$route.query.redirect
                        })
                    }else{
                          this.$router.replace({
                            path: '/'
                        })
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
            for (var key in this.ruleForm) {
                this.$set(this.ruleForm, key, '')
            }
        },
        sendEmail() {
            this.$axios({
                url: 'api/core/sendEmail',
                data: {
                    email: this.ruleForm.email
                }
            })
        },
        getRuleCode() {
            this.disabledBtn = true
            var timer = setInterval(() => {
                if (this.time === 0) {
                    clearInterval(timer)
                    this.timeString = '重新获取验证码'
                    this.time = 60
                    this.disabledBtn = false
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
    height: 100%;
    width: 100%;

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

    .bigScrenn {
        width: 100%;
        height: 100%;
        display: flex;

        .fle1 {
            flex: 1;
            height: 100%;

        }

        .centerBoxs {
            width: 80%;
            // width: 1000px;
            background: #fff;
            height: calc(100% - 30px);
            margin-top: 70px;
            border-radius: 30px;
            box-shadow: 10px 10px 10px rgba(26, 26, 26, 0.1);
            // height:100%;
            // height:600px;
            overflow: hidden;
            display: flex;

            .box1 {
                width: 30%;
                background: #333;
                height: 100%
            }

            .flex1 {
                height: 100%;
                flex: 1;

                .loginCenterBox {
                    width: 500px;
                    height: 100%;
                    margin: auto;
                    display: flex;
                    align-items: center;

                    .fat {
                        position: relative;
                        top: -60px;
                        width: 100%;
                    }

                    // .fromInputLg{
                    // position: relative;
                    .titleBox {
                        text-align: center;
                        line-height: 130px;
                    }

                    .rightIconLg {
                        position: relative;
                        top: 5px;
                        right: 0;
                    }

                    // }
                    .el-form.demo-form-inline {
                        flex: 1;
                        text-align: center;
                    }

                    .loginMethodsLarge {
                        // margin: auto;
                        width: 70%;
                        background: #eee;
                    }

                    .leftIcon {
                        position: unset;
                        top: 0;
                        left: 0;
                    }
                }
            }

        }
    }
}
</style><style scoped>
.centerBox {
    overflow: unset !important;
}
</style>
