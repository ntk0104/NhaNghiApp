import ImagePicker from 'react-native-image-picker'
// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Photo',
    // customButtons: [
    //     { name: 'fb', title: 'Choose Photo from Facebook' },
    // ],
    quality: 1,
    allowsEditing: true,
    storageOptions: {
        skipBackup: false,
        path: 'images',

    }
};

export const pickerImage = (result) => {
    ImagePicker.showImagePicker(options, (response) => {
            let source = { uri: response.uri };
            result(source, response.data);
    });
}

export const camera = (result) => {
    ImagePicker.launchCamera(options, (response) => {
            let source = { uri: response.uri };
            result(source, response.uri);
    });
}

export const photo = (result) => {
    ImagePicker.launchImageLibrary(options, (response) => {
            let source = { uri: response.uri };
            result(source, response.data);
    });
}
