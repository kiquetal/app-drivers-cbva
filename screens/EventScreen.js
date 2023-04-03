import * as React from 'react';
import {View, StyleSheet, FlatList, Text, Modal, TextInput, Button, AppState} from "react-native";
import Mapbox from "@rnmapbox/maps";
import {useEffect, useRef, useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import {getForegroundPermissionsAsync} from "expo-location";
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
        console.log("identificar marker", item);

        const updatedMarkers = markers.map((marker) => {
            if (marker.name === item.name) {
                if (!marker.hasOwnProperty('color')) {
                marker.color = 'red'; // replace with desired color
                } else {
                    console.log("have color", marker.color)
                    if (marker.color == 'red') {
                        marker.color = '#357eb9'; // replace with desired color
                    } else {
                        console.log("change to red")
                        marker.color = 'red'; // replace with desired color
                    }
                }
            }
            console.log("marker", marker)
            return marker;
        });
        setMarkers(updatedMarkers);




    };

    const [locationStatus, setLocationStatus] = useState();

    const appState = useRef(AppState.currentState);
    const [, setAppStateVisible] = useState(appState.current);

    const handleAppStateChange = async (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            setLocationStatus(await getForegroundPermissionsAsync());
        }

        console.log("appState", appState.current);
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        console.log("gps change")
        const subscription = AppState.addEventListener('change', handleAppStateChange);
     //   return () => {
     //       subscription.remove();
     //   };
    }, []);

    useEffect(() => {
        const getLocation= async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            console.log(await  Location.hasServicesEnabledAsync())
            try {
            //    let statusTwo = await Location.requestForegroundPermissionsAsync();
             //   console.log("location", statusTwo);
                let location = await Location.getCurrentPositionAsync({});
                console.log("obtaining data")

            }
            catch (e) {
                console.log("exception- obtaining location", e);
            }
        }
        getLocation().then(r => console.log("r", r)).catch(e => console.log("exception whey", e));
    },[navigation]);


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
                        centerCoordinate={[ -74.08175, 4.60971]}
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
                <View>
                    <Text style={{marginLeft:20, fontWeight:"bold"}}>Lugares indicados</Text>
                </View>
                <FlatList
                    data={markers}
                    renderItem={({item}) => <Text style={{marginLeft:10}} onPress={()=>changeColorMarker(item)}>{item.name} </Text>}
                />
            </View>
            <Modal visible={modalVisible} animationType="slide">
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Ingrese nombre del punto de interes:</Text>
                    <TextInput
                        style={{fontSize: 20, marginVertical: 20, borderWidth: 1, padding: 10, width: 70}}
                        value={newMarkerName}

                        onChangeText={setNewMarkerName}
                    />
                    <Button title="Guardar" onPress={saveMarker} />
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
        height: 500,
        width: 400,
    },
});

