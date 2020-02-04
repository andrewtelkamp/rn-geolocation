import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export class App extends Component {
  count = 0;

  getUserLocation = () => {
    Geolocation.getCurrentPosition(
      success => console.log('getSuccess', success),
      error => console.log('1 error:', error),
      {enableHighAccuracy: true},
    );
  };

  watchUserLocation = () => {
    Geolocation.watchPosition(
      success => {
        this.count++;
        console.log('watchSuccess', success);
        // console.log('count', this.count);
      },
      error => console.log('2 error', error),
      {
        enableHighAccuracy: true,
        // 21 times in 60s, 93 times in 5 minutes
        distanceFilter: 10, // min distance from the previous location to trigger cb
        // 3 times in 60s, 10 times in 5 minutes
        // useSignificantChanges: true, // uses battery efficient native significant changes APIs to return locations
      },
    );
  };

  componentDidMount() {
    this.getUserLocation();
    this.watchUserLocation();
  }

  componentWillUnmount() {
    Geolocation.stopObserving();
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <View style={styles.screen}>
          <Text>Hello</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});
