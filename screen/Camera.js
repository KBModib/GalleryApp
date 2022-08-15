import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

let apiKey = 'AIzaSyBTotrDeDOWm5q129tJt-y_JKS8nrQEP-s';

export default function App() {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  const Back = () => {
    (async () => {
      

      // console.log();
    })();
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    }
    let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      Location.setGoogleApiKey(apiKey);

      console.log(status);

      let { coords } = await Location.getCurrentPositionAsync();

      setLocation(coords);

      console.log(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log(regionName, '');
      };
    

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
      alert('Photo saved to camera roll');
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.location}>
          <Text style={styles.textlocation}>
          {!location
          ? 'Waiting'
          : `Lat: ${location.latitude} \nLong: ${
              location.longitude
            } \n${JSON.stringify(address?.['subregion'])}`}
          </Text>
        </View>
          <View style={styles.buttonscontainer}>
          <TouchableOpacity title="Re-take" onPress={() => setPhoto(undefined)}>
            <MaterialCommunityIcons styles={styles.icons} name="camera-retake" size={30} color="#rgb(233, 137, 128)" />
            <Text style={styles.text}>Re-take</Text>
          </TouchableOpacity>
          
          {hasMediaLibraryPermission ? 
          <TouchableOpacity title="Save" onPress={savePhoto}>
            <MaterialIcons styles={styles.icons} name="check" size={30} color="rgb(233, 137, 128)"/>
            <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
          : undefined}
          
          <TouchableOpacity title="Share" onPress={sharePic}>
            < MaterialIcons styles={styles.icons} name="share" size={30} color="rgb(233, 137, 128)" />
            <Text style={styles.text}>Share</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.cameraContainer}>
      <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
            <Entypo name="retweet" size={40} color= 'rgb(233, 137, 128)' />
            </TouchableOpacity>

            <TouchableOpacity title="Take a picture" onPress={takePic}>
              <MaterialIcons name="camera" size={40} color= 'rgb(233, 137, 128)' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
            >
            <Entypo name="flash" size={40} color={flash === Camera.Constants.FlashMode.off ? 'rgb(233, 137, 128)' : '#821D30'} />
            </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableOpacityContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end'
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  cameraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    width: '100%',
    height: '90%',
    marginBottom: 150,
},
buttonscontainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  height: '10%',
  backgroundColor: '#EED6D3',
},
text: {
  fontSize: 16,
  color: '#D48C70',
  fontStyle: 'italic',
  textAlign: 'center',
},
icons: {
  width: '100%',
  height: '100%',
  color: 'rgb(233, 137, 128)',
  justifyContent: 'center',
  alignContent: 'center',
},
textlocation: {
  fontSize: 16,
  color: '#D48C70',
  fontStyle: 'italic',
  textAlign: 'center',
  marginBottom: 10,
},
location: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  height: '10%', 
  backgroundColor: '#EED6D3',
},
});