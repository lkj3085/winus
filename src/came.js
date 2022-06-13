import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

const Came = () => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      setIsCameraReady(false);
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    onHandlePermission();
  }, []);
  useEffect(() => {
    onSnap();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  // const switchCamera = () => {
  //   if (isPreview) {
  //     return;
  //   }
  //   setCameraType((prevCameraType) =>
  //     prevCameraType === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back
  //   );
  // };
  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;

      if (source) {
        // await cameraRef.current.pausePreview();
        // setIsPreview(true);
        // let base64Img = `data:image/jpg;base64,${source}`;
        // let data = {
        //   file: base64Img,
        //   upload_preset: MediaLibrary.createAssetAsync(),
        // };
        // Remember, here item is a file uri which looks like this. file://..
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          try {
            const options = {
              quality: 0.5,
              base64: true,
              skipProcessing: true,
            };
            const { uri } = await cameraRef.current.takePictureAsync(options);
            const asset = await MediaLibrary.createAssetAsync(data.uri);
            MediaLibrary.createAlbumAsync("Images", asset, false)
              .then(() => {
                console.log("File Saved Successfully!");
              })
              .catch(() => {
                console.log("Error In Saving File!");
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Need Storage permission to save file");
        }
      }
    }
  };
  const SaveToPhone = async () => {
    // Remember, here item is a file uri which looks like this. file://..
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const { uri } = await cameraRef.current.takePictureAsync(options);
        const asset = await MediaLibrary.createAssetAsync(data.uri);
        MediaLibrary.createAlbumAsync("Images", asset, false)
          .then(() => {
            Alert.alert("File Saved Successfully!");
          })
          .catch(() => {
            console.log("Error In Saving File!");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Need Storage permission to save file");
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>카메라 허용 안함</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        onCameraReady={onCameraReady}
      />
      <View style={styles.container}>
        {isPreview && (
          <Button
            style={styles.capture}
            title="Submit"
            onPress={() => SaveToPhone(Image)}
            color="#19AC52"
          />
        )}
        {!isPreview && (
          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={styles.capture}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: "#fff",
  },
  bottomButtonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 28,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#5A45FF",
    borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A45FF",
    opacity: 0.7,
  },
});
export default Came;
