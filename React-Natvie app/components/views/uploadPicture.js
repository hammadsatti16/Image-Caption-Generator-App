import React, {Fragment, Component} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../button';
import Tts from 'react-native-tts';

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      fileType: '',
      fileName: '',
      caption: '',
    };
  }

  mySpeak = text => {
    Tts.speak(text);
  };

  launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.assets[0].data,
          fileUri: response.assets[0].uri,
          fileType: response.assets[0].type,
          fileName: response.assets[0].fileName,
        });
      }
    });
    const data = new FormData();
    data.append('file', {
      uri:
        Platform.OS === 'android'
          ? this.state.fileUri
          : this.state.fileUri.replace('file://', ''),
      type: this.state.fileType,
      name: this.state.fileName,
    });
    await fetch('http://192.168.18.189:5000/api/File', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('image uploaded');
        console.log(response);
        this.setState({caption: `"${response.Caption}"`});
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  launchImageLibrary = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.assets[0].data,
          fileUri: response.assets[0].uri,
          fileType: response.assets[0].type,
          fileName: response.assets[0].fileName,
        });
      }
    });
    const data = new FormData();
    data.append('file', {
      uri:
        Platform.OS === 'android'
          ? this.state.fileUri
          : this.state.fileUri.replace('file://', ''),
      type: this.state.fileType,
      name: this.state.fileName,
    });
    await fetch('http://192.168.18.189:5000/api/File', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        console.log('image uploaded');
        console.log(response);
        this.setState({caption: `"${response.Caption}"`});
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    } else {
      return (
        <Image
          source={require('../../assets/notepad.png')}
          style={styles.images}
        />
      );
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.ImageSections}>
              <View>{this.renderFileUri()}</View>
              {this.state.caption != '' && (
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Below is the generated caption:
                </Text>
              )}
              <Text
                onPress={() => this.mySpeak(this.state.caption)}
                style={{color: 'black', fontSize: 20, textAlign: 'center', fontFamily: 'Roboto'}}>
                {this.state.caption}
              </Text>
            </View>
            <View style={styles.btnParentSection}>
              <Button text="Take a Photo" onPress={this.launchCamera} />
              <Button text="Upload a Photo" onPress={this.launchImageLibrary} />
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height / 1.2,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'transparent',
    borderWidth: 1,
    marginHorizontal: 3,
    marginBottom: 20,
  },
  btnParentSection: {
    alignItems: 'center',
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
