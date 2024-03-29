import * as React from 'react';
import {View, StyleSheet, FlatList, Text, Modal, TextInput, Button, AppState} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {useEffect, useRef, useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import {getForegroundPermissionsAsync} from "expo-location";
import {Overlay} from "@rneui/themed";
export default EventScreen = (props) =>  {
    const { navigation } = props;

    const [markers, setMarkers] = useState([]);
    const [newMarkerName, setNewMarkerName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLocation, setCurrentLocation] = useState([]);
    const [homeLocation, setHomeLocation] = useState([]);
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
        const updatedMarkers = markers.map((marker) => {
            if (marker.name === item.name) {
                if (!marker.hasOwnProperty('color')) {
                marker.color = 'red'; // replace with desired color
                } else {
                    if (marker.color == 'red') {
                        marker.color = '#357eb9'; // replace with desired color
                    } else {
                        marker.color = 'red'; // replace with desired color
                    }
                }
            }
            return marker;
        });
        setMarkers(updatedMarkers);

    };

    const obtainHomeLocation = async () => {
        try {

            const subscription = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, timeInterval: 2500, distanceInterval: 10 },
                location => {
                    console.log("find location",location);
                    setHomeLocation([location.coords.longitude, location.coords.latitude])
                }
            );


        }
        catch (e) {
            console.log("exception- obtaining location", e);
        }

    }




    useEffect(() => {
        setHomeLocation([2.1700, 41.3900])
        const getLocation= async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            try {
                let statusTwo = await Location.requestForegroundPermissionsAsync();

            }
            catch (e) {
                console.log("exception- obtaining location", e);
            }
        }
          getLocation();
    },[navigation]);

    const  toggleModalVisisble = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.page}>
            <View style={styles.container}>

                <Button title={'Localizar posición'} onPress={()=>obtainHomeLocation()}/>
                <Mapbox.MapView style={styles.map}
                                onPress={(event) => {
                                    addMarker(
                                        event.geometry.coordinates[0],
                                        event.geometry.coordinates[1],
                                        'New Place',
                                    )}
                                }

                >
                    <Mapbox.Camera
                        zoomLevel={14}
                        centerCoordinate={[homeLocation[0], homeLocation[1]]}
                    />
                    {markers.map((marker, index) => (
                        <Mapbox.MarkerView
                            key={`marker-${index}`}
                            coordinate={[ marker.longitude, marker.latitude]}
                            title={marker.name}
                        >
                            <Icon name={'map-marker'}  style={{shadowColor:'black'}}  iconColor='red' size={30} color={ marker.color ? marker.color: '#357eb9'}  onPress={()=>removeMarker(index)}  />
                        </Mapbox.MarkerView>
                    ))}
                </Mapbox.MapView>
                <View>
                    <Text style={{marginLeft:20, fontWeight:"bold"}}>Lugares indicados</Text>
                </View>
                <FlatList
                    data={markers}
                    renderItem={({item}) => <Text style={{marginLeft:10}} onPress={()=>changeColorMarker(item)}>{item.name} </Text>}
                />
            </View>
            <Overlay visible={modalVisible} overlayStyle={{backgroundColor:'white',
            height: 300}} animationType="slide" onBackdropPress={toggleModalVisisble}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Ingrese nombre del punto de interes:</Text>
                    <TextInput
                        style={{fontSize: 20, marginVertical: 20, borderWidth: 1, padding: 10, width: 70}}
                        value={newMarkerName}
                        onChangeText={setNewMarkerName}
                    />
                    <Button title="Guardar" onPress={saveMarker} />
                </View>
            </Overlay>
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
        height: 500,
        width: 400,
    },
});

