// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     Platform,
//     PermissionsAndroid,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';

// //packages
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// // theme
// import {SIZE, SIZES} from '../theme/theme';
// import {FONTS} from '../theme/fonts';

// // svg
// import Geolocation from 'react-native-geolocation-service';

// // components

// export default function PlaceDetail({setDetailScreens, setVisible}) {
//     const [currentLocation, setCurrentLocation] = useState();

//     useEffect(() => {
//         getLocation();
//     }, []);

//     const getLocation = async () => {
//         if (Platform.OS === 'ios') {
//             const permissionStatus = await Geolocation.requestAuthorization(
//                 'always',
//             );
//             if (permissionStatus == 'granted') {
//                 Geolocation.getCurrentPosition(
//                     pos => {
//                         const crd = pos.coords;
//                         getExactLocation(crd.latitude, crd.longitude);
//                     },
//                     error => {
//                         console.log(
//                             error.code,
//                             error.message,
//                             'error.code, error.message',
//                         );
//                     },
//                 );
//             }
//         } else {
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                     {
//                         title: 'Location Access Required',
//                         message: 'This App needs to Access your location',
//                     },
//                 );
//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     Geolocation.getCurrentPosition(
//                         pos => {
//                             const crd = pos.coords;
//                             getExactLocation(crd.latitude, crd.longitude);
//                         },
//                         error => {
//                             // See error code charts below.
//                             console.log(error.code, error.message);
//                         },
//                     );
//                 } else {
//                     getLocation();
//                 }
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };

//     const getExactLocation = (myLat, myLon) => {
//         fetch(
//             'https://maps.googleapis.com/maps/api/geocode/json?address=' +
//                 myLat +
//                 ',' +
//                 myLon +
//                 '&key=' +
//                 'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
//         )
//             .then(response => response.json())
//             .then(responseJson => {
//                 setCurrentLocation(responseJson);
//             });
//     };

//     // Animate

//     return (
//         <View style={styles.container}>
//             <KeyboardAvoidingView showsVerticalScrollIndicator={false}>
//                 <View style={{height: 500}}>
//                     <GooglePlacesAutocomplete
//                         // ref={inputRef}
//                         enablePoweredByContainer={false}
//                         query={{
//                             key: 'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
//                             language: 'en',
//                         }}
//                         textInputProps={{
//                             placeholderTextColor: '#242424',
//                         }}
//                         listViewDisplayed={false}
//                         placeholder="Enter Your Location"
//                         minLength={2}
//                         autoFocus={true}
//                         returnKeyType={'done'}
//                         getAddressText={text => {}}
//                         fetchDetails={true}
//                         styles={{
//                             textInputContainer: {
//                                 borderWidth: 1,
//                                 borderRadius: SIZE(8),
//                                 borderColor: '#D3D3D3',
//                             },

//                             textInput: {
//                                 color: '#242424',
//                                 fontSize: SIZE(14),
//                                 fontFamily: FONTS.regular,
//                                 flexDirection: 'row',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                             },
//                             predefinedPlacesDescription: {
//                                 color: '#1faadb',
//                             },
//                             row: {
//                                 backgroundColor: '#fff',
//                                 padding: 13,
//                                 flexDirection: 'row',
//                                 marginBottom: 2,
//                             },
//                             separator: {
//                                 height: 0,
//                                 backgroundColor: '#fff',
//                             },
//                             description: {
//                                 fontFamily: FONTS.regular,
//                                 fontSize: 14,
//                                 color: 'black',
//                             },
//                         }}
//                     />
//                 </View>
//                 <View style={styles.buttonsContainer}>
//                     <TouchableOpacity
//                         onPress={() => {}}
//                         activeOpacity={0.8}
//                         style={styles.skipContainer}>
//                         <Text style={styles.skipText}>Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         activeOpacity={0.8}
//                         onPress={() => {}}
//                         style={styles.nextContainer}>
//                         <Text style={styles.nextText}>Save</Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         paddingHorizontal: SIZE(32),
//         minHeight: '100%',
//     },
//     uploadedContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         marginTop: SIZE(32),
//         borderStyle: 'dashed',
//         padding: SIZE(10),
//         borderWidth: 1,
//         borderRadius: SIZE(8),
//         borderColor: '#003459',
//     },
//     imageMainContainer: {
//         paddingVertical: SIZE(24),
//     },
//     uploadedImageContainer: {
//         width: SIZE(100),
//         height: SIZE(100),
//         marginBottom: 15,
//     },
//     uploadedImage: {
//         width: '100%',
//         height: '100%',
//     },
//     imageContainer: {
//         backgroundColor: '#EAF7FF',
//         borderWidth: 1,
//         borderRadius: SIZE(8),
//         borderColor: '#003459',
//         paddingHorizontal: SIZE(16),
//         paddingVertical: SIZE(32),
//         borderStyle: 'dashed',
//         alignItems: 'center',
//     },
//     imageContent: {
//         backgroundColor: '#fff',
//         width: SIZE(56),
//         height: SIZE(56),
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: SIZE(40),
//     },
//     uploadContainer: {
//         width: SIZE(24),
//         height: SIZE(24),
//         fontFamily: FONTS.bold,
//     },
//     buttonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: SIZE(32),
//     },
//     uploadText: {
//         fontSize: SIZE(14),
//         fontWeight: '400',
//         fontFamily: FONTS.regular,
//         color: '#003459',
//     },
//     skipContainer: {
//         backgroundColor: '#fff',
//         marginTop: SIZE(24),
//         alignItems: 'center',
//         paddingVertical: SIZE(14),
//         borderRadius: SIZE(8),
//         borderWidth: 1,
//         borderColor: '#009FD3',
//         // paddingHorizontal: SIZE(75),
//         width: SIZE(174),
//     },
//     skipText: {
//         color: '#009FD3',
//         fontFamily: FONTS.semiBold,
//         fontSize: SIZE(16),
//         textAlign: 'center',
//     },
//     nextContainer: {
//         marginTop: SIZE(24),
//         alignItems: 'center',
//         paddingVertical: SIZE(14),
//         borderRadius: SIZE(8),
//         width: SIZE(174),
//         paddingHorizontal: SIZE(16),
//         backgroundColor: '#003459',
//         // paddingHorizontal: SIZE(60),
//     },
//     nextText: {
//         color: '#fff',
//         fontFamily: FONTS.semiBold,
//         fontSize: SIZE(16),
//         textAlign: 'center',
//     },
//     errorMessage: {
//         color: 'red',
//         fontFamily: FONTS.regular,
//         fontSize: SIZE(13),
//         marginTop: SIZE(5),
//         textAlign: 'right',
//     },

//     //location styles
//     textInput: {
//         color: '',
//         fontSize: 20,
//         marginLeft: 15,
//         marginRight: 30,
//         paddingTop: 2,
//     },
// });
