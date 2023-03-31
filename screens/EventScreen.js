import * as React from 'react';
import {View, StyleSheet, FlatList, Text, Modal, TextInput, Button} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
export default EventScreen = (props) =>  {
    const [markers, setMarkers] = useState([]);
    const [newMarkerName, setNewMarkerName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState([]);
    const addMarker = (longitude, latitude, name) => {
        setModalVisible(true);
        setCurrentLocation([longitude, latitude]);

    };

    const removeMarker = (index) => {
        console.log("removeMarker", index);
        const newMarkers = [...markers];
        newMarkers.splice(index, 1);
        setMarkers(newMarkers);
    };

    function saveMarker() {

        const newMarkers = [...markers, {longitude: currentLocation[0], latitude: currentLocation[1], name: newMarkerName}];
        console.log("markers", newMarkers);
        setMarkers(newMarkers);

        setNewMarkerName('');
        setModalVisible(false);
    }

    const changeColorMarker = (item) => {
        console.log("identificar marker", item);

        const updatedMarkers = markers.map((marker) => {
            if (marker.name === item.name) {
                if (!marker.hasOwnProperty('color')) {
                marker.color = 'purple'; // replace with desired color
                } else {
                    console.log("have color", marker.color)
                    if (marker.color == 'purple') {
                        marker.color = 'blue'; // replace with desired color
                    } else {
                        console.log("change to red")
                        marker.color = 'purple'; // replace with desired color
                    }
                }
            }
            console.log("marker", marker)
            return marker;
        });
        setMarkers(updatedMarkers);




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

                            title={marker.name}
                        >
                            <Icon name={'map-marker'}  iconColor='red' size={30} color={ marker.color ? marker.color: '#357eb9'}  onPress={()=>removeMarker(index)}  />
                        </Mapbox.MarkerView>
                    ))}
                </Mapbox.MapView>
                <FlatList
                    data={markers}
                    renderItem={({item}) => <Text onPress={()=>changeColorMarker(item)}>{item.name} </Text>}
                />
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Enter marker name:</Text>
                    <TextInput
                        style={{fontSize: 20, marginVertical: 20, borderWidth: 1, padding: 10}}
                        value={newMarkerName}

                        onChangeText={setNewMarkerName}
                    />
                    <Button title="Save" onPress={saveMarker} />
                </View>
            </Modal>
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

