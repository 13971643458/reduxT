/**
 * Created by liuwenxiang on 16/12/21.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起

import  * as  actonter from '../actions/login'
import {Home} from  '../container/login'

class Login extends Component {


    constructor(props) {
        super(props);
        this.nameValue = null;
        this.passValue = null;
        this.login = this.login.bind(this);

    }


    //该方法首次不会执行，如果返回false，则reduer不会执行，，
    shouldComponentUpdate(nextProps,nextState){
        const {isLoggedIn,navigator}=nextProps;
        if(isLoggedIn){
            navigator.push({
                name:'Home',
                component:'Home'


            });
        }
        return true;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.marginTopview}/>
                <View style={styles.inputview}>
                    <TextInput underlineColorAndroid='transparent'
                               ref='input_name'
                               style={styles.textinput}
                               placeholder='用户名'
                               onChangeText={(text)=>this.nameValue = text}
                    />
                    <View style={styles.dividerview}>
                        <Text style={styles.divider}></Text>
                    </View>
                    <TextInput underlineColorAndroid='transparent'
                               ref="input_pass"
                               style={styles.textinput}
                               placeholder='密码'
                               onChangeText={(text)=>this.passValue = text}
                               secureTextEntry={true}/>
                </View>
                <TouchableOpacity style={styles.bottomview}
                                  onPress={this.login.bind(this)}>
                    <View style={styles.buttonview}>
                        <Text style={styles.logintext}>登 录</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }




    login() {


        if (this.nameValue == null || this.passValue == null) {
            alert('用户名或密码不能为空！');
        } else {
            let opt = {
                'phone': this.nameValue,
                'password': this.passValue,
            };
            // this.refs.modal.open();//loading 状态
            // this.props.actions.login({'phone':this.state.phone,'password':this.state.password});//dispath 登陆
            this.props.actions.login(opt);

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        height: 50,
        backgroundColor: '#12B7F5',
        justifyContent: 'center',
    },
    headtitle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#ffffff',
    },
    avatarview: {
        height: 150,
        backgroundColor: '#ECEDF1',
        justifyContent: 'center',
    },
    avatarimage: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    marginTopview: {
        height: 60,
        backgroundColor: '#F7F7F9'
    },
    inputview: {
        height: 100,
    },
    textinput: {
        flex: 1,
        fontSize: 16,
    },
    dividerview: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ECEDF1'
    },
    bottomview: {
        backgroundColor: '#ECEDF1',
        flex: 1,
    },
    buttonview: {
        backgroundColor: '#1DBAF1',
        margin: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logintext: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    emptyview: {
        flex: 1,
    },
    bottombtnsview: {
        flexDirection: 'row',
    },
    bottomleftbtnview: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    bottomrightbtnview: {
        flex: 1,
        height: 50,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    bottombtn: {
        fontSize: 15,
        color: '#1DBAF1',
    }
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给Login）
function mapStateToProps(state) {
    return {
        isLoggedIn: state.default.isLoggedIn,
        status: state.default.status,
    };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actonter, dispatch)
    };
}

//链接起来
module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);

