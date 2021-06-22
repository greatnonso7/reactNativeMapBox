import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZ3JlYXRub25zbzciLCJhIjoiY2txN3JwZGJ0MDRoejJub2U3ZWFkdXE4eiJ9.sL6xufuNiyuKUXHhAFTqLg',
);

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Here -122.4324 is Longitude.
      // Here 37.78825 is Latitude.
      coordinates: [-122.4324, 37.78825],
    };
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.SubContainer}>
          <MapboxGL.MapView style={styles.Mapbox}>
            <MapboxGL.Camera
              zoomLevel={9}
              centerCoordinate={this.state.coordinates}
            />

            <MapboxGL.PointAnnotation coordinate={this.state.coordinates} />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  SubContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  Mapbox: {
    flex: 1,
  },
});
