import React, { useState, Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const App = (props) => {

    const { width, height } = Dimensions.get('window');
    const [mapRegion, setmapRegion] = useState({
        latitude: 36.8002068,
        longitude: 10.1857757,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const onChangeValue = (mapRegion) => {
        ToastAndroid.show(JSON.stringify(mapRegion), ToastAndroid.SHORT)
        setmapRegion({mapRegion})
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    style={{ alignSelf: 'stretch', height: '100%' }}
                    //region={mapRegion}
                    onRegionChangeComplete={(region) => {onChangeValue}}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: mapRegion.latitude,
                        longitude: mapRegion.longitude,
                        latitudeDelta: mapRegion.latitudeDelta,
                        longitudeDelta: mapRegion.longitudeDelta,
                    }}
                />
                <View style={{ top: '50%', left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute' }}>
                    <Image style={{ height: 48, width: 48 }} source={require('./assets/marque.png')} />
                </View>
            </View>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});