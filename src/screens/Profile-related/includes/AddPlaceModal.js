// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     Image,
//     StatusBar,
//     Keyboard,
//     Animated,
//     PermissionsAndroid,
//     Platform,
// } from 'react-native';
// import React, {useState, useEffect, useContext} from 'react';
// //packages
// import ImagePicker from 'react-native-image-crop-picker';
// import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import * as Animatable from 'react-native-animatable';
// // theme
// import {SIZE} from '../../../theme/theme';
// import {FONTS} from '../../../theme/fonts';
// // svg
// import GpsIcon from '../../../assets/icons/gps.svg';
// import UploadICon from '../../../assets/icons/upload.svg';
// import CloseIcon from '../../../assets/icons/close-icon-blue.svg';
// // components
// import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
// import DescriptionHeading from '../../../components/headings/DescriptionHeading';
// import NormalForm from '../../../components/forms/NormalForm';
// //getLocationsService
// import Geolocation from 'react-native-geolocation-service';
// import {Context} from '../../../contexts/Store';

// export default function AddPlaceModal({
//     setAddModalVisible,
//     setEditModalVisible,
//     isEdit,
// }) {
//     const {dispatch} = useContext(Context);
//     const [currentLocation, setCurrentLocation] = useState();

//     // Animate
//     const [animation] = useState(new Animated.Value(0));
//     useEffect(() => {
//         Animated.timing(animation, {
//             toValue: 1,
//             duration: 350, // Adjust the duration as needed
//             useNativeDriver: true,
//         }).start();
//     }, []);

//     const [images, setImages] = useState([]);
//     const [errorMessage, setErrorMessage] = useState({});
//     const [title, setTitle] = useState('');
//     const [location, setLocation] = useState('');
//     const [phone, setPhone] = useState('');
//     const [phoneValid, setPhoneValid] = useState(false);
//     const [description, setDescription] = useState('');
//     const [aboutService, setAboutService] = useState('');
//     const [isKeyboardActive, setIsKeyboardActive] = useState(true);
//     const [isInputEmpty, setIsInputEmpty] = useState(true);
//     const [addressText, setAddressText] = useState('');
//     const [geoAddressText, setGeoAddressText] = useState('');

//     useEffect(() => {
//         const keyboardDidShowListener = Keyboard.addListener(
//             'keyboardDidShow',
//             () => {
//                 setIsKeyboardActive(true);
//             },
//         );
//         const keyboardDidHideListener = Keyboard.addListener(
//             'keyboardDidHide',
//             () => {
//                 setIsKeyboardActive(false);
//             },
//         );

//         return () => {
//             keyboardDidShowListener.remove();
//             keyboardDidHideListener.remove();
//         };
//     }, []);

//     useEffect(() => {
//         const phoneRegex = /^\d{4,}$/;
//         setPhoneValid(phoneRegex.test(phone));
//     }, [phone]);

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
//                 setGeoAddressText(
//                     responseJson.results[0].address_components[1].short_name,
//                 );
//             });
//     };

//     const getLocation = async () => {
//         if (Platform.OS === 'ios') {
//             const permissionStatus = await Geolocation.requestAuthorization(
//                 'always',
//             );
//             if (permissionStatus === 'granted') {
//                 Geolocation.getCurrentPosition(
//                     pos => {
//                         const crd = pos.coords;
//                         getExactLocation(crd.latitude, crd.longitude);
//                     },
//                     error => {
//                         console.log(
//                             'iOS Location Error:',
//                             error.code,
//                             error.message,
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
//                             console.log(
//                                 'Android Location Error:',
//                                 error.code,
//                                 error.message,
//                             );
//                         },
//                     );
//                 } else {
//                     getLocation();
//                 }
//             } catch (err) {
//                 console.log('Android Location Error:', err);
//             }
//         }
//     };

//     const openImagePicker = () => {
//         let imageList = [];

//         ImagePicker.openPicker({
//             multiple: true,
//             waitAnimationEnd: false,
//             includeExif: true,
//             forceJpg: true,
//             maxFiles: 10,
//             mediaType: 'photo',
//             includeBase64: true,
//         })
//             .then(response => {
//                 const newImages = response.map(image => ({
//                     filename: image.filename,
//                     path: image.path,
//                     data: image.data,
//                 }));
//                 setImages(prevImages => [...prevImages, ...newImages]);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity
//                 activeOpacity={0.8}
//                 hitSlop={10}
//                 style={styles.buttonIcon}
//                 onPress={() => {
//                     if (setEditModalVisible) {
//                         setEditModalVisible(false);
//                     } else {
//                         setAddModalVisible(false);
//                     }
//                 }}>
//                 <CloseIcon width={'100%'} height={'100%'} />
//             </TouchableOpacity>
//             <KeyboardAvoidingView
//                 style={{paddingHorizontal: SIZE(32)}}
//                 showsVerticalScrollIndicator={false}>
//                 <View>
//                     <DoubleColorHeading
//                         firstTitle={isEdit ? 'Edit Your' : 'Add Your'}
//                         secondTitle={'Place Details'}
//                         isCenter={true}
//                     />
//                     <DescriptionHeading
//                         text={'Please Enter Your Place Details'}
//                     />
//                     <NormalForm
//                         label={'Title'}
//                         type={'Text'}
//                         placeholder={'Enter Title'}
//                         setvalue={setTitle}
//                         dataValue={title}
//                         setError={setErrorMessage}
//                     />
//                     {errorMessage?.title && (
//                         <Text
//                             allowFontScaling={false}
//                             style={styles.errorMessage}>
//                             {errorMessage?.title}
//                         </Text>
//                     )}

//                     <View style={{marginTop: SIZE(24)}}>
//                         <View style={{marginBottom: SIZE(8)}}>
//                             <Text
//                                 allowFontScaling={false}
//                                 style={{
//                                     fontFamily: FONTS.medium,
//                                     fontSize: SIZE(16),
//                                     color: '#686868',
//                                 }}>
//                                 Location
//                             </Text>
//                         </View>

//                         <View
//                             style={{
//                                 position: 'absolute',
//                                 top: 12,
//                                 left: 10,
//                             }}></View>
//                         <GooglePlacesAutocomplete
//                             disableScroll
//                             autoFocus={false}
//                             editable={true}
//                             enablePoweredByContainer={false}
//                             onPress={(data, details = null) => {
//                                 if (details) {
//                                     const {location, formatted_address} =
//                                         details.geometry;

//                                     setLocation(location);
//                                     setAddressText(formatted_address);
//                                 } else {
//                                     setAddressText(data.description);
//                                     setLocation(null);
//                                 }
//                             }}
//                             query={{
//                                 key: 'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
//                                 language: 'en',
//                             }}
//                             textInputProps={{
//                                 placeholderTextColor: '#8E8E8E',
//                                 value: addressText || geoAddressText,
//                                 maxLength: 37,
//                                 numberOfLines: 2,
//                                 onChangeText: text => {
//                                     setAddressText(text);
//                                     if (geoAddressText && addressText !== '') {
//                                         setGeoAddressText('');
//                                     }
//                                 },
//                             }}
//                             listViewDisplayed={false}
//                             placeholder="Enter Your Location"
//                             returnKeyType={'done'}
//                             getAddressText={text => {}}
//                             fetchDetails={true}
//                             styles={{
//                                 textInputContainer: {
//                                     borderWidth: 1,
//                                     borderRadius: SIZE(8),
//                                     borderColor: '#D3D3D3',
//                                 },

//                                 textInput: {
//                                     color: '#242424',
//                                     fontSize: SIZE(14),
//                                     fontFamily: FONTS.regular,
//                                     flexDirection: 'row',
//                                     alignItems: 'center',
//                                     backgroundColor: '#F7F7F7',
//                                     justifyContent: 'space-between',
//                                 },
//                                 predefinedPlacesDescription: {
//                                     color: '#1faadb',
//                                 },
//                                 row: {
//                                     backgroundColor: '#fff',
//                                     padding: 13,
//                                     flexDirection: 'row',
//                                     marginBottom: 2,
//                                 },
//                                 separator: {
//                                     height: 0,
//                                     backgroundColor: '#fff',
//                                 },
//                                 description: {
//                                     fontFamily: FONTS.regular,
//                                     fontSize: 14,
//                                     color: 'black',
//                                 },
//                             }}
//                         />

//                         {isInputEmpty && (
//                             <Animatable.View
//                                 animation={'bounceIn'}
//                                 style={{
//                                     position: 'absolute',
//                                     bottom: SIZE(16),

//                                     right: SIZE(16),
//                                 }}>
//                                 <TouchableOpacity
//                                     activeOpacity={0.7}
//                                     onPress={() => {
//                                         getLocation();
//                                     }}>
//                                     {isInputEmpty && (
//                                         <GpsIcon width={21} height={21} />
//                                     )}
//                                 </TouchableOpacity>
//                             </Animatable.View>
//                         )}
//                     </View>
//                     {errorMessage?.location && (
//                         <Text
//                             allowFontScaling={false}
//                             style={styles.errorMessage}>
//                             {errorMessage?.location}
//                         </Text>
//                     )}
//                     <NormalForm
//                         label={'Phone Number'}
//                         type={'phone'}
//                         placeholder={'Enter Your Phone Number'}
//                         setvalue={setPhone}
//                         dataValue={phone}
//                         setError={setErrorMessage}
//                     />
//                     {errorMessage?.phone
//                         ? errorMessage?.phone && (
//                               <Text
//                                   allowFontScaling={false}
//                                   style={styles.errorMessage}>
//                                   {errorMessage?.phone}
//                               </Text>
//                           )
//                         : errorMessage?.phoneValid && (
//                               <Text
//                                   allowFontScaling={false}
//                                   style={styles.errorMessage}>
//                                   {errorMessage?.phoneValid}
//                               </Text>
//                           )}
//                     {images?.length > 0 ? (
//                         <View style={styles.uploadedContainer}>
//                             {images.map((image, index) => (
//                                 <View
//                                     key={index}
//                                     style={styles.uploadedImageContainer}>
//                                     <Image
//                                         key={index}
//                                         style={styles.uploadedImage}
//                                         source={{uri: image.path}}
//                                     />
//                                 </View>
//                             ))}
//                         </View>
//                     ) : (
//                         <View></View>
//                     )}
//                     <TouchableOpacity
//                         onPress={() => {
//                             openImagePicker();
//                         }}
//                         activeOpacity={0.8}
//                         style={styles.imageMainContainer}>
//                         <View style={styles.imageContainer}>
//                             <View style={styles.imageContent}>
//                                 <View style={styles.uploadContainer}>
//                                     <UploadICon
//                                         width={'100%'}
//                                         height={'100%'}
//                                     />
//                                 </View>
//                             </View>
//                             <View
//                                 style={{
//                                     alignItems: 'center',
//                                     marginTop: SIZE(16),
//                                 }}>
//                                 <View>
//                                     <Text
//                                         allowFontScaling={false}
//                                         style={styles.uploadText}>
//                                         Upload images
//                                     </Text>
//                                 </View>
//                                 <View style={styles.imageUploadContainer}>
//                                     <Text
//                                         allowFontScaling={false}
//                                         style={{
//                                             fontWeight: '700',
//                                             fontSize: SIZE(12),
//                                             color: '#003459',
//                                         }}>
//                                         {' '}
//                                         +Upload
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                     <NormalForm
//                         label={'Description'}
//                         type={'Text'}
//                         placeholder={'Enter Description'}
//                         descriptionForm={true}
//                         setvalue={setDescription}
//                         dataValue={description}
//                         setError={setErrorMessage}
//                     />
//                     {errorMessage?.description && (
//                         <Text
//                             allowFontScaling={false}
//                             style={styles.errorMessage}>
//                             {errorMessage?.description}
//                         </Text>
//                     )}
//                     <NormalForm
//                         label={'About Services'}
//                         type={'Text'}
//                         placeholder={'Enter Services'}
//                         descriptionForm={true}
//                         setvalue={setAboutService}
//                         dataValue={aboutService}
//                         setError={setErrorMessage} // Corrected here
//                     />
//                 </View>
//                 <View style={styles.buttonsContainer}>
//                     <TouchableOpacity
//                         onPress={() => {
//                             if (setEditModalVisible) {
//                                 setEditModalVisible(false);
//                             } else {
//                                 setAddModalVisible(false);
//                             }
//                         }}
//                         activeOpacity={0.8}
//                         style={styles.skipContainer}>
//                         <Text allowFontScaling={false} style={styles.skipText}>
//                             Cancel
//                         </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         activeOpacity={0.8}
//                         onPress={() => {
//                             if (title && phone && description && phoneValid) {
//                                 if (setEditModalVisible) {
//                                     setEditModalVisible(false);
//                                 } else {
//                                     setAddModalVisible(false);
//                                 }
//                             } else {
//                                 setErrorMessage({
//                                     title:
//                                         title.length == 0 && 'Title required',
//                                     phone:
//                                         phone.length == 0 && 'Phone required',
//                                     description:
//                                         description.length == 0 &&
//                                         'Description required',
//                                     phoneValid:
//                                         phoneValid == false &&
//                                         'Please enter a valid phone number',
//                                 });
//                             }
//                         }}
//                         style={styles.nextContainer}>
//                         <Text allowFontScaling={false} style={styles.nextText}>
//                             Save
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </KeyboardAvoidingView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7',
//         borderTopRightRadius: SIZE(32),
//         borderTopLeftRadius: SIZE(32),
//     },
//     buttonIcon: {
//         width: SIZE(15),
//         height: SIZE(15),
//         marginTop: SIZE(20),
//         marginRight: SIZE(20),
//         alignSelf: 'flex-end',
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
//         backgroundColor: '#F7F7F7',
//         marginTop: SIZE(24),
//         alignItems: 'center',
//         paddingVertical: SIZE(14),
//         borderRadius: SIZE(8),
//         borderWidth: 1,
//         borderColor: '#009FD3',
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
//     textInput: {
//         fontSize: SIZE(20),
//         marginLeft: SIZE(15),
//         marginRight: SIZE(30),
//         paddingTop: SIZE(2),
//     },
// });
