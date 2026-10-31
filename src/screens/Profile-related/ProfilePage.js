import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ImageBackground,
    Alert,
    TextInput,
    ActivityIndicator,
    Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {usersConfig} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

//components
import ProfileSectionList from './ProfileSectionList';
import ColoredButton from '../../components/buttons/ColoredButton';
import ImageTools from './includes/ImageTools';
import ProfileDetails from './includes/ProfileDetails';
import ModalBox from '../Home/includes/ModalBox';
import LogoutSection from './includes/LogoutSection';

// svg
import ArrowLeft from '../../assets/icons/profile-icons/arrow-left.svg';
import EditButton from '../../assets/icons/profile-icons/edit-2.svg';
import EditButtonDark from '../../assets/icons/profile-icons/edit-2dark.svg';
import Pet from '../../assets/icons/profile-icons/pet.svg';
import PetDark from '../../assets/icons/profile-icons/petdark.svg';
import HomeTag from '../../assets/icons/profile-icons/home-hashtag.svg';
import HomeTagDark from '../../assets/icons/profile-icons/home-hashtagdark.svg';
import Star from '../../assets/icons/profile-icons/star.svg';
import StarDark from '../../assets/icons/profile-icons/stardark.svg';
import Card from '../../assets/icons/profile-icons/card.svg';
import LocationDark from '../../assets/icons/profile-icons/locationdark.svg';
import Setting from '../../assets/icons/profile-icons/setting-2.svg';
import SettingDark from '../../assets/icons/profile-icons/setting-2dark.svg';
import InfoCircle from '../../assets/icons/profile-icons/info-circle.svg';
import InfoCircleDark from '../../assets/icons/profile-icons/info-circledark.svg';
import ShieldSecurity from '../../assets/icons/profile-icons/shield-security.svg';
import ShieldSecurityDark from '../../assets/icons/profile-icons/shield-securitydark.svg';
import ShieldTick from '../../assets/icons/profile-icons/shield-tick.svg';
import ShieldTickDark from '../../assets/icons/profile-icons/shield-tickdark.svg';
import Trash from '../../assets/icons/profile-icons/trash.svg';
import TrashDark from '../../assets/icons/profile-icons/trashdark.svg';
import Logout from '../../assets/icons/profile-icons/logout.svg';
import EditOff from '../../assets/icons/profile-icons/editOff.svg';
import EditOffDark from '../../assets/icons/profile-icons/editOffdark.svg';
import AvatarImage from '../../assets/icons/avatar-new.svg';
import BankIcon from '../../../src/assets/icons/wallet-icons/bank.svg';
import BankIconC from '../../../src/assets/icons/bank-IconC.svg';

const boxWidth = SIZES.width - SIZE(32);

const ProfilePage = ({}) => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);
    const [name, setName] = useState(
        state?.userData?.profileName ? state?.userData?.profileName : '',
    );
    const [phone, setPhone] = useState(
        state?.userData?.profilePhone ? state?.userData?.profilePhone : '',
    );
    const [mail, setMail] = useState(
        state?.userData?.profileMail ? state?.userData?.profileMail : '',
    );
    const [image, setImage] = useState(
        state?.userData?.photo ? state?.userData?.photo : '',
    );
    const [isEdit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [imageTool, setImageTool] = useState(false);
    const [imageToolList, setImageToolList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);

    //handleValidation function
    const handleValidation = () => {
        const isValid = /^[a-zA-Z\s]+$/.test(name);
        if (isValid) {
            editProfile();
            setEdit(false);
            setError('');
        } else {
            setError({name: 'Please enter a valid name'});
        }
    };

    //handleProvider function
    const handleProvider = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    // image picker function
    const openImagePicker = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: false,
                mediaType: 'photo',
            });
            // setSelectedImage(image.path);
            uploadImage(image);
        } catch (error) {
            console.log('Image picker error:', error);
        }
    };

    //get profile function
    const getProfile = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;

        try {
            const response = await usersConfig.get('view-profile/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setName(response.data.data.name);
            setPhone(response.data.data.phone);
            setMail(response.data.data.email);
            setImage(response.data.data.image);
            handleProvider({
                ...state.userData,
                profileName: response.data.data.name,
                profileMail: response.data.data.email,
                profilePhone: response.data.data.phone,
                photo: response.data.data.image,
            });
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching user profile:', error.response.data);
        }
    };

    useEffect(() => {
        if (state.userData.is_login) {
            getProfile();
        }
    }, []);

    //edit profile function
    const editProfile = async () => {
        const token = state.userData.accessToken;
        await firestore().collection('users').doc(userId).update({
            name: name,
        });
        const formData = {
            name: name,
        };
        try {
            await usersConfig.put('update-profile/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleProvider({
                ...state.userData,
                name: name,
            });
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    const uploadFireBaseImage = async image => {
        const imageName = `${userId}_${Date.now()}_${'photo.jpg'}`;
        const uploadUri = image.path;

        try {
            const reference = storage().ref(
                `/files/profile/${userId}/${imageName}`,
            );
            const task = reference.putFile(uploadUri);
            await task;

            const downloadURL = await reference.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.log('Error uploading image:', error);
            throw error;
        }
    };

    const deleteOldFirebaseImage = async () => {
        try {
            const userDoc = await firestore()
                .collection('users')
                .doc(userId)
                .get();
            const userData = userDoc.data();
            const oldImageUrl = userData.profileImageUrl;

            if (!oldImageUrl) {
                return;
            }
            const storageRef = storage().refFromURL(oldImageUrl);
            const oldImageExists = await storageRef
                .getDownloadURL()
                .then(() => true)
                .catch(() => false);
            if (oldImageExists) {
                await storageRef.delete();
            }
        } catch (error) {
            console.log(
                'Error deleting old image from Firebase Storage:',
                error,
            );
            throw error;
        }
    };

    // update profile image function
    const uploadImage = async image => {
        setIsLoading(true);
        const token = state.userData.accessToken;

        const formData = new FormData();

        formData.append('image', {
            uri: image.path,
            type: image.mime,
            name: 'photo.jpg',
        });
        try {
            await deleteOldFirebaseImage();
            const downloadURL = await uploadFireBaseImage(image);
            await firestore().collection('users').doc(userId).update({
                profileImageUrl: downloadURL,
            });

            await usersConfig
                .put('update-profile-image/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    getProfile();
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('error try => ', error);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    //remove profile function
    const removeProfileImage = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        try {
            await deleteOldFirebaseImage();
            await usersConfig
                .delete('remove-profile-image/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    getProfile();
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const _signOutWithGoogle = async () => {
        let webClientId;

        if (Platform.OS === 'android') {
            webClientId =
                '181768224345-8c1a8fb7u5aknndht5gd5d8uno81cjk9.apps.googleusercontent.com';
        } else if (Platform.OS === 'ios') {
            webClientId =
                '181768224345-ad6vejsmfmup6u7joh2hsh9pjokvkr09.apps.googleusercontent.com';
        } else {
            webClientId = 'fallback-client-id';
        }

        try {
            GoogleSignin.configure({
                offlineAccess: false,
                webClientId: webClientId,
                scopes: ['profile', 'email'],
            });

            // Sign out from Google
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            // Sign out from Firebase
            await auth().signOut();
        } catch (error) {
            // console.log('=> Google Sign Out', error);
        }
    };

    const removeFirebaseToken = async () => {
        try {
            const userId = state?.userData?.firebaseUid;
            if (userId) {
                await firestore()
                    .collection('users')
                    .doc(userId)
                    .update({fcmToken: ''});
            }
        } catch (error) {
            console.log('Error saving FCM token to Firestore:', error);
            throw error;
        }
    };

    //handler function
    const logoutSection = async () => {
        try {
            setSubmitLoading(true);
            await _signOutWithGoogle();
            await removeFirebaseToken();
            await AsyncStorage.clear();
            handleProvider({
                // ...state.userData,
                accessToken: '',
                accountStatus: '',
                exactLocation: {},
                geoAddressText: '',
                isPetDetailsAdded: false,
                isTermsAndCondition: false,
                isVerified: false,
                is_Firbase: {
                    email: '',
                    google_id_token: '',
                    is_fireBase: false,
                },
                is_login: false,
                is_service: false,
                is_skip: false,
                is_temp: false,
                locationAdded: false,
                mailId: '',
                name: '',
                phone: '',
                photo: '',
                profileMail: '',
                profileName: '',
                profilePhone: '',
                role: '',
                tempPk: '',
                user: {},
                firebaseName: null,
                firebaseEmail: null,
                firebaseUid: null,
                google_encrypt: null,
                isRegistered: false,
                store_add: null,
                trainer_add: null,
                store_name: '',
                profileAdded: false,
                additionalDataPetWish: [],
                additionalData: [],
                wishList: [],
                cart: [],
                notified: false,
            });
            setSubmitLoading(false);
            setLogoutModal(false);
            navigation.navigate('MainHome', {goto: 'login'});
        } catch (error) {
            setSubmitLoading(false);
            console.log('Error clearing AsyncStorage:', error);
        }
    };

    //handleLogin function
    const handleLogin = async () => {
        try {
            await _signOutWithGoogle();
            // await removeFirebaseToken();
            await AsyncStorage.clear();
            navigation.navigate('MainHome', {goto: 'login'});
            handleProvider({
                accessToken: '',
                accountStatus: '',
                exactLocation: {},
                geoAddressText: '',
                isPetDetailsAdded: false,
                isTermsAndCondition: false,
                isVerified: false,
                is_Firbase: {
                    email: '',
                    google_id_token: '',
                    is_fireBase: false,
                },
                is_login: false,
                is_service: false,
                is_skip: false,
                is_temp: false,
                locationAdded: false,
                mailId: '',
                name: '',
                phone: '',
                photo: '',
                profileMail: '',
                profileName: '',
                profilePhone: '',
                role: '',
                tempPk: '',
                user: {},
                firebaseName: null,
                firebaseEmail: null,
                firebaseUid: null,
                google_encrypt: null,
                isRegistered: false,
                store_add: null,
                trainer_add: null,
                store_name: '',
                profileAdded: false,
                additionalDataPetWish: [],
                additionalData: [],
                wishList: [],
                cart: [],
                notified: false,
            });
        } catch (error) {
            console.log('Error clearing AsyncStorage:', error);
        }
    };

    //data array for buttons
    const data = [
        {
            id: '1',
            icon: !state?.userData?.is_service ? (
                <Pet width={SIZE(24)} height={SIZE(24)} />
            ) : (
                <PetDark width={SIZE(24)} height={SIZE(24)} />
            ),
            title: 'My Pets',
        },
        {
            id: '2',
            icon: <LocationDark width={SIZE(24)} height={SIZE(24)} />,
            title: 'My Places',
            condition: !state?.userData?.is_service,
        },
        {
            id: '3',
            icon: !state?.userData?.is_service ? (
                <HomeTag width={SIZE(24)} height={SIZE(24)} />
            ) : (
                <HomeTagDark width={SIZE(24)} height={SIZE(24)} />
            ),
            title: 'Address',
        },
        {
            id: '4',
            icon: !state?.userData?.is_service ? (
                <BankIconC width={SIZE(24)} height={SIZE(24)} />
            ) : (
                <BankIcon width={SIZE(24)} height={SIZE(24)} />
            ),
            title: 'Bank Account',
        },
        {
            id: '5',
            icon: !state?.userData?.is_service ? (
                <Star width={SIZE(24)} height={SIZE(24)} />
            ) : (
                <StarDark width={SIZE(24)} height={SIZE(24)} />
            ),
            title: 'My Reviews',
        },

        {
            id: '6',
            condition: state.userData.is_service,
            icon: <Card width={SIZE(24)} height={SIZE(24)} />,
            title: 'My Saved Cards',
        },
        {
            id: '7',
            icon: !state?.userData?.is_service ? (
                <Setting width={SIZE(24)} height={SIZE(24)} />
            ) : (
                <SettingDark width={SIZE(24)} height={SIZE(24)} />
            ),
            title: 'Settings',
            section: [
                {
                    id: '2',
                    icon: !state?.userData?.is_service ? (
                        <InfoCircle width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <InfoCircleDark width={SIZE(20)} height={SIZE(20)} />
                    ),
                    title: 'About Us',
                },
                {
                    id: '3',
                    icon: !state?.userData?.is_service ? (
                        <ShieldSecurity width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <ShieldSecurityDark
                            width={SIZE(20)}
                            height={SIZE(20)}
                        />
                    ),
                    title: 'Privacy Policy',
                },
                {
                    id: '4',
                    icon: !state?.userData?.is_service ? (
                        <ShieldTick width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <ShieldTickDark width={SIZE(20)} height={SIZE(20)} />
                    ),
                    title: 'Terms & Condition',
                },
                {
                    id: '5',
                    icon: !state?.userData?.is_service ? (
                        <Trash width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <TrashDark width={SIZE(20)} height={SIZE(20)} />
                    ),
                    title: 'Delete Account',
                },
            ],
        },
    ];

    const [logoutModal, setLogoutModal] = useState(false);

    //filteredData
    const filteredData = data.filter(item => !item.condition);

    const renderItem = ({item}) => (
        <View style={styles.item}>
            <ProfileSectionList
                data={data}
                item={item}
                state={state}
                setImageTool={setImageTool}
            />
        </View>
    );

    // renderFooter function
    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        // handler();
                        setLogoutModal(true);
                    }}
                    style={styles.logoutButton}>
                    <Logout width={SIZE(20)} height={SIZE(20)} />
                    <Text
                        allowFontScaling={false}
                        style={styles.logoutButtonText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const [viewHeight, setViewHeight] = useState(0);
    const onLayout = event => {
        const {height} = event.nativeEvent.layout;
        setViewHeight(height - SIZE(50));
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[StyleSheet.absoluteFill, {backgroundColor: 'transparent'}]}
            onPress={() => setImageTool(false)}>
            <View style={styles.mainContainer}>
                <View
                    style={[
                        styles.topView,
                        {
                            backgroundColor:
                                state?.userData?.is_service && '#009FD3',
                        },
                    ]}>
                    <ImageBackground
                        style={styles.image1}
                        source={
                            state?.userData?.is_service
                                ? require('../../assets/images/backgroundtwo.png')
                                : require('../../assets/images/background.png')
                        }>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={styles.backButton}>
                            <ArrowLeft width={SIZE(20)} height={SIZE(20)} />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View onLayout={onLayout} style={[styles.detailSection, {}]}>
                    <View
                        style={[
                            styles.mainContent,
                            state.userData.is_login
                                ? {justifyContent: 'center'}
                                : null,
                        ]}>
                        <View style={styles.topLeftContent}>
                            <View>
                                <View
                                    style={[
                                        styles.imageComponent,
                                        {
                                            borderWidth: state.userData.is_login
                                                ? 0
                                                : SIZE(2),
                                            width: state.userData.is_login
                                                ? SIZE(72)
                                                : SIZE(56),
                                            height: state.userData.is_login
                                                ? SIZE(72)
                                                : SIZE(56),
                                        },
                                    ]}>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        {state.userData.is_login ? (
                                            isLoading ? (
                                                <ActivityIndicator
                                                    size={'small'}
                                                    color={'#009fd3'}
                                                />
                                            ) : image ? (
                                                <Image
                                                    style={styles.image}
                                                    source={{
                                                        uri: image,
                                                    }}
                                                />
                                            ) : (
                                                <AvatarImage
                                                    width={SIZE(32)}
                                                    height={SIZE(32)}
                                                />
                                            )
                                        ) : (
                                            <AvatarImage
                                                width={SIZE(32)}
                                                height={SIZE(32)}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>

                            {state.userData.is_login && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setImageTool(prev => !prev);
                                        setEdit(false);
                                    }}
                                    activeOpacity={0.8}
                                    style={{
                                        position: 'absolute',
                                        bottom: SIZE(-28),
                                        left: SIZE(28),
                                    }}>
                                    {!state?.userData?.is_service ? (
                                        <EditOff
                                            width={SIZE(80)}
                                            height={SIZE(80)}
                                        />
                                    ) : (
                                        <EditOffDark
                                            width={SIZE(80)}
                                            height={SIZE(80)}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.middleContent}>
                            {!isEdit ? (
                                <Text
                                    numberOfLines={2}
                                    allowFontScaling={false}
                                    style={styles.name}>
                                    {state.userData.is_login
                                        ? name
                                        : 'Hey There'}
                                </Text>
                            ) : (
                                <View>
                                    <TextInput
                                        autoFocus
                                        cursorColor={'#242424'}
                                        allowFontScaling={false}
                                        style={styles.placeHold}
                                        value={name}
                                        onChangeText={text => {
                                            setName(text);
                                            setError('');
                                        }}
                                    />
                                </View>
                            )}
                            {state.userData.is_login && (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subName}>
                                    {state.userData.is_service
                                        ? 'Service Provider'
                                        : 'Customer'}
                                </Text>
                            )}
                            {error && (
                                <Text style={styles.errorMessage}>
                                    {error.name}
                                </Text>
                            )}
                        </View>

                        {state.userData.is_login && (
                            <View style={styles.rightContent}>
                                {!isEdit ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEdit(true);
                                            setImageTool(false);
                                        }}
                                        activeOpacity={0.8}
                                        style={{paddingTop: SIZE(14)}}>
                                        {!state?.userData?.is_service ? (
                                            <EditButton
                                                width={SIZE(20)}
                                                height={SIZE(20)}
                                            />
                                        ) : (
                                            <EditButtonDark
                                                width={SIZE(20)}
                                                height={SIZE(20)}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.saveContainer}
                                        onPress={handleValidation}>
                                        <Text style={styles.saveText}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>

                    {state.userData.is_login && (
                        <ProfileDetails
                            state={state}
                            phone={phone}
                            mail={mail}
                        />
                    )}
                    {!state.userData.is_login && (
                        <View>
                            <ColoredButton
                                loginIcon={true}
                                label={'Login'}
                                onPress={() => {
                                    handleLogin();
                                }}
                            />
                        </View>
                    )}
                </View>
                {imageTool && (
                    <ImageTools
                        setImageToolList={setImageToolList}
                        setImageTool={setImageTool}
                        imageToolList={imageToolList}
                        openImagePicker={openImagePicker}
                        removeProfileImage={removeProfileImage}
                        setEdit={setEdit}
                    />
                )}
                {state.userData.is_login ? (
                    <View style={[styles.container, {marginTop: SIZE(135)}]}>
                        <FlatList
                            bounces={false}
                            data={filteredData}
                            renderItem={renderItem}
                            ListFooterComponent={renderFooter}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false} //
                        />
                    </View>
                ) : (
                    ''
                )}
                <ModalBox
                    isVisible={logoutModal}
                    setVisible={setLogoutModal}
                    inner={
                        <LogoutSection
                            setLogoutModal={setLogoutModal}
                            onPress={() => {
                                logoutSection();
                            }}
                            submitLoading={submitLoading}
                            state={state}
                        />
                    }
                />
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        flex: 1,
        width: '100%',
    },
    topView: {
        backgroundColor: '#024474',
        height: SIZE(170),
        width: SIZES.width,
    },
    backButton: {
        backgroundColor: '#fff',
        height: SIZE(40),
        width: SIZE(40),
        borderRadius: SIZE(61),
        padding: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
        top: SIZE(15),
        left: SIZE(16),
    },
    detailSection: {
        width: SIZES.width - SIZE(32),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
        position: 'absolute',
        top: SIZE(100),
        borderWidth: SIZE(1),
        borderColor: '#d2d2d2',
    },
    mainContent: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        paddingBottom: SIZE(16),
        borderColor: '#E2E2E2',
    },
    image: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: SIZE(100),
        overflow: 'hidden',
        borderWidth: SIZE(2),
        borderColor: '#eee',
    },
    image1: {
        width: null,
        height: null,
        flex: 1,
        marginBottom: SIZE(20),
    },
    imageComponent: {
        height: SIZE(72),
        width: SIZE(72),
        borderRadius: SIZE(100),
        overflow: 'hidden',
        backgroundColor: '#EAF7FF',
        borderWidth: SIZE(5),
        borderColor: '#fff',
        justifyContent: 'center',
        // Apply drop shadow
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 7,
        elevation: 4,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    topLeftContent: {
        backgroundColor: '#fff',
        width: boxWidth * 0.2,
    },
    middleContent: {
        backgroundColor: '#fff',
        width: boxWidth * 0.55,
        justifyContent: 'center',
        marginLeft: SIZE(24),
    },
    rightContent: {
        backgroundColor: '#fff',
        width: boxWidth * 0.1,
        alignItems: 'flex-end',
    },
    saveContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: SIZE(14),
    },
    saveText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        textAlign: 'center',
    },
    name: {
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        fontWeight: '600',
        marginBottom: SIZE(6),
        color: '#242424',
    },
    placeHold: {
        color: '#242424',
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(19.5),
        fontWeight: '600',
        marginBottom: SIZE(6),
        padding: 0,
        marginBottom: SIZE(0.5),
        marginTop: SIZE(-4),
        height: SIZE(50),
    },
    subName: {
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        fontWeight: '600',
        color: '#969696',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
    },
    footer: {
        paddingBottom: SIZE(16),
    },
    logoutButton: {
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(6),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#CF2929',
        fontSize: SIZE(16),
        fontFamily: FONTS.medium,
        marginLeft: SIZE(10),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
    },
});
export default ProfilePage;
