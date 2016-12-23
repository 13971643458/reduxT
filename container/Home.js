/**
 * Created by liuwenxiang on 16/12/21.
 */
import React, {Component} from 'react'
import  {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';

import {logout} from '../actions/login';

class Home extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let {user} = this.props;
        return (
            <View >
                {this._renderNavBar()}
                <View >

                    <Text>name: {user.phone}</Text>
                    <Text>age: {user.password}</Text>

                    <TouchableOpacity onPress={this.btnLogout.bind(this)}>
                        <Text>退出</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === false) {
            this.toLogin();
            return false;
        }
        return true;
    }

    toLogin() {
        let {router} = this.props;
        router.resetToLogin();
    }

    btnLogout() {
        this.props.navigator.pop();
    }

    _renderNavBar() {
        let {user, dispatch} = this.props;
        var leftButtonConfig = {
            title: 'Logout',
            handler: ()=> {
                // dispatch(logout());
                this.props.navigator.pop();
            }
        };

        var titleConfig = {
            title: user.phone || '',
        };
        return <NavigatorBar title={titleConfig}
                             leftButton={leftButtonConfig}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

function select(store) {
    return {
        isLoggedIn: store.default.isLoggedIn,
        user: store.default.user,
    }
}

export default connect(select)(Home);

