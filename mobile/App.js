import React from 'react';
import { StatusBar, YellowBox, StyleSheet } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Routes from './src/routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'Possible Unhandled Promise Rejection',
      'Each child',
      'Can',
      'Unhandled promise',
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
        <Routes style={styles.app} />
      </>
    );
  }
}


const styles = StyleSheet.create({
  addButton: {
      zIndex: 1,
  }
});