import * as React from 'react';
import {View, StyleSheet, FlatList,Text} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
export default EventScreen = (props) =>  {
    const [markers, setMarkers] = useState([]);

    const addMarker = (longitude, latitude, name) => {
        const newMarkers = [...markers, {longitude, latitude, name}];
        setMarkers(newMarkers);
    };

    const removeMarker = (index) => {
        console.log("removeMarker", index);
        const newMarkers = [...markers];
        newMarkers.splice(index, 1);
        setMarkers(newMarkers);
    };
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <Mapbox.MapView style={styles.map}
                                onPress={(event) => {
                                    console.log(JSON.stringify(event.geometry))
                                    addMarker(
                                        event.geometry.coordinates[0],
                                        event.geometry.coordinates[1],
                                        'New Place',
                                    )}
                                }

                >
                    <Mapbox.Camera
                        zoomLevel={14}
                        centerCoordinate={[-57.599674720852846,-25.300971658750942]}
                    />
                    {markers.map((marker, index) => (
                        <Mapbox.MarkerView
                            key={`marker-${index}`}
                            coordinate={[ marker.longitude, marker.latitude]}
                            onCalloutPress={() => removeMarker(index)}

                            title={marker.name}
                        >
                            <Icon name={'map-marker'}  size={30} color={'#437ec2'}  onPress={()=>removeMarker(index)}  />
                        </Mapbox.MarkerView>
                    ))}
                </Mapbox.MapView>
                <FlatList
                    data={markers}
                    renderItem={({item}) => <Text onPress={()=>console.log("opress" + item.latitude +"-"+ item.longitude)}>{item.name}</Text>}
                />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1
    },
    container: {
        height: 300,
        width: 300,
    },
});

