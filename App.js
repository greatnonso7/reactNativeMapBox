import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

const accessToken =
  'pk.eyJ1IjoiZ3JlYXRub25zbzciLCJhIjoiY2txN3JwZGJ0MDRoejJub2U3ZWFkdXE4eiJ9.sL6xufuNiyuKUXHhAFTqLg';
MapboxGL.setAccessToken(accessToken);

const directionsClient = MapboxDirectionsFactory({accessToken});

const destinationPoint = [3.3750014, 6.5367877];
const startingPoint = [4.33624, 6.57901];

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Here -122.4324 is Longitude.
      // Here 37.78825 is Latitude.
      coordinates: [7.5244, 6.3792],
      routes: null,
    };
  }

  componentDidMount() {
    this.fetchRoute();
  }

  fetchRoute = async () => {
    const reqOptions = {
      waypoints: [
        {coordinates: startingPoint},
        {coordinates: destinationPoint},
      ],
      profile: 'driving-traffic',
      geometries: 'geojson',
    };
    const res = await directionsClient.getDirections(reqOptions).send();
    console.log(res.body.routes[0].geometry.coordinates);
    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    this.setState({routes: newRoute});
  };

  render() {
    const renderAnnotations = () => {
      return (
        <>
          <MapboxGL.PointAnnotation
            key="startPointAnnotation"
            id="startPointAnnotation"
            coordinate={startingPoint}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: '#00cccc',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
              }}
            />
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            key="destinationPointAnnotation"
            id="destinationPointAnnotation"
            coordinate={destinationPoint}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: '#00cccc',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
              }}
            />
          </MapboxGL.PointAnnotation>
        </>
      );
    };

    console.log(this.state.routes);

    return (
      <View style={styles.MainContainer}>
        <View style={styles.SubContainer}>
          <MapboxGL.MapView
            style={styles.Mapbox}
            styleURL={MapboxGL.StyleURL.Street}
            zoomLevel={16}
            centerCoordinate={startingPoint}>
            <MapboxGL.Camera
              zoomLevel={9}
              centerCoordinate={startingPoint}
              animationMode={'easeTo'}
              animationDuration={2000}
            />
            {renderAnnotations()}
            {this.state.routes && (
              <MapboxGL.ShapeSource id="shapeSource" shape={this.state.routes}>
                <MapboxGL.LineLayer
                  id="lineLayer"
                  style={{
                    lineWidth: 5,
                    lineJoin: 'bevel',
                    lineColor: '#ff0000',
                  }}
                />
              </MapboxGL.ShapeSource>
            )}
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
