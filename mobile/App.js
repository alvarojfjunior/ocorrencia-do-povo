import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Main from './pages/Main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'Possible Unhandled Promise Rejection',
      'Each child',
      'Can'
    ]);

    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
        <Main />
      </>
    );
  }
}