import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import LoginPage from './container/login';
import Home from './container/Home';
const store = configureStore();

class reduxT extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Navigator
                    initialRoute={this.initialRoute()}
                    renderScene={this.renderScene}/>
            </Provider>
        );

    }

    initialRoute() {
        return {name: 'LoginPage', component: 'LoginPage'};
    }

    renderScene(route, navigator) {

        if (route.name == 'LoginPage') {
            return <LoginPage navigator={navigator} {...route.passProps}/>
        } else if (route.name == 'Home') {
            return <Home navigator={navigator} {...route.passProps} />
        }
    }
}
AppRegistry.registerComponent('reduxT', () => reduxT);
