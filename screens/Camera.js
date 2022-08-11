import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Gallery() {
    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasPermission(cameraStatus.status === 'granted');
        })();
    },[]);

    const takePicture = async () => {
        if (cameraRef) {
          try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
          } catch (error) {
            console.log(error);
          }
        }
      };
    
      const savePicture = async () => {
        if (image) {
          try {
            const asset = await MediaLibrary.createAssetAsync(image);
            alert('Picture saved! 🎉');
            setImage(null);
            console.log('saved successfully');
          } catch (error) {
            console.log(error);
          }
        }
      };
    
    if (hasPermission === false) {
        console.log('Access to camera denied');

        return <Text>No access to camera</Text>   
    }

  return (
    <View style={styles.container}>
    {!image ? (
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
          <View
            style={styles.cameraContainer}
          >
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
            <Entypo name="retweet" size={30} color="white" />
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
            <Entypo name="flash" size={40} color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'} />
            </TouchableOpacity>
          </View>
      </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View style={styles.controls}>
      {image ? (
        <View style={styles.buttonscontainer}>
            <TouchableOpacity
                title="Re-take"
                onPress={() => setImage(null)}
            >
            <MaterialCommunityIcons styles={styles.icons} name="camera-retake" size={50} color="#E98980" />
            <Text style={styles.text}>Re-take</Text>
            </TouchableOpacity>

            <TouchableOpacity title="Save" onPress={savePicture} >
            <MaterialIcons styles={styles.icons} name="check" size={50} color="E98980"/>
            <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
        </View>
        ) : (
          <TouchableOpacity title="Take a picture" onPress={takePicture}>
            <MaterialIcons name="camera" size={30} color="E98980" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#EED6D3',
    },
    camera: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    cameraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    controls: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    buttonscontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
    },
    icons: {
        width: '100%',
        height: '100%',
        padding: 20,
        color: 'E98980',
    },
    text: {
        fontSize: 20,
        color: '#D48C70',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});