import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';
import {toggleWishlistTrainer} from '../../main/TrainerApiSection';

//images and logos
import StarDot from '../../../assets/icons/map-view/starDot.svg';
import Star from '../../../assets/icons/map-view/star.svg';
import MessageChat from '../../../assets/icons/trainers/message1.svg';
import LocationIcon from '../../../assets/icons/locationblue.svg';
import Like from '../../../assets/icons/map-view/Like.svg';
import LikeFill from '../../../assets/icons/map-view/Likefill.svg';

const TrainerSpotlight = ({spotlight_data, setUserModal, setScreen}) => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();
    const [downloading, setDownloading] = useState(false);

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistTrainer(selected.id, user_tocken);
        if (state.trainerWishList?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'ADD_TO_WISH_TRAINER',
                trainerWishList: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
            };
            dispatch({
                type: 'ADD_TO_WISH_TRAINER',
                trainerWishList: updatedData,
            });
        }
    };

    const handleDownload = async docUrl => {
        setDownloading(true);
        const {
            dirs: {DownloadDir, DocumentDir},
        } = ReactNativeBlobUtil.fs;
        const {config} = ReactNativeBlobUtil;
        const isIOS = Platform.OS == 'ios';
        const aPath = Platform.select({
            ios: DocumentDir,
            android: '/storage/emulated/0/Download',
        });

        const fileNameFromUrl = docUrl
            .split('/')
            .pop()
            .split('?')[0]
            .split('_')
            .pop();
        const fileExtension = fileNameFromUrl.split('.').pop();
        const baseFileName = fileNameFromUrl.replace(`.${fileExtension}`, '');

        const fPath = `${aPath}/${baseFileName}.${fileExtension}`;

        const configOptions = Platform.select({
            ios: {
                fileCache: false,
                path: fPath,
                notification: true,
            },
            android: {
                fileCache: false,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: fPath,
                    description: 'Downloading...',
                },
            },
        });

        try {
            const fileExists = await ReactNativeBlobUtil.fs.exists(fPath);

            if (fileExists && !isIOS) {
                const {action} = await promptUserAction(
                    baseFileName,
                    fileExtension,
                );

                if (action === 'overwrite') {
                    await ReactNativeBlobUtil.fs.unlink(fPath); // Delete existing file
                    const res = await config(configOptions).fetch(
                        'GET',
                        docUrl,
                    );
                    console.log('Downloaded and overwritten: ', res.path());
                    if (isIOS) {
                        setTimeout(() => {
                            ReactNativeBlobUtil.ios.previewDocument(res.path());
                        }, 300);
                    } else {
                        ReactNativeBlobUtil.android.actionViewIntent(
                            res.path(),
                        );
                    }
                } else {
                }
            } else {
                const res = await config(configOptions).fetch('GET', docUrl);
                // console.log('Downloaded to: ', res.path());
                if (isIOS) {
                    setTimeout(() => {
                        ReactNativeBlobUtil.ios.previewDocument(res.path());
                    }, 300);
                } else {
                    ReactNativeBlobUtil.android.actionViewIntent(res.path());
                }
            }
        } catch (error) {
            console.log('Error downloading file: ', error);
        } finally {
            setDownloading(false);
        }
    };

    const promptUserAction = async (baseFileName, fileExtension) => {
        return new Promise(resolve => {
            Alert.alert(
                'File Already Exists',
                `A file named "${baseFileName}.${fileExtension}" already exists in the download directory.`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => resolve({action: 'cancel'}),
                    },
                    {
                        text: 'Overwrite',
                        style: 'destructive',
                        onPress: () => resolve({action: 'overwrite'}),
                    },
                ],
                {cancelable: false},
            );
        });
    };

    return (
        <View style={{alignItems: 'center'}}>
            <View
                style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    paddingTop: SIZE(30),
                    marginBottom: SIZE(10),
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (state.userData.is_login) {
                            handlePress(spotlight_data);
                        } else {
                            setUserModal(true);
                            setScreen('login');
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.commonButtonMain}>
                    {state.trainerWishList?.find(
                        obj => obj?.id === spotlight_data.id,
                    ) ? (
                        <LikeFill width={SIZE(28)} height={SIZE(28)} />
                    ) : (
                        <Like width={SIZE(28)} height={SIZE(28)} />
                    )}
                    <View style={styles.commonTopButtons}></View>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    width: SIZE(100),
                    height: SIZE(100),
                    borderRadius: SIZE(100),
                }}>
                {spotlight_data?.image ? (
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: SIZE(100),
                        }}
                        source={{uri: spotlight_data?.image}}
                    />
                ) : null}
            </View>
            <View style={styles.headingContainer}>
                <Text allowFontScaling={false} style={styles.headingText}>
                    {spotlight_data?.name}
                </Text>
            </View>
            <View style={styles.locationAndStar}>
                <View style={styles.locationSub}>
                    <LocationIcon width={SIZE(20)} height={SIZE(20)} />
                    <View style={styles.locationTextContainer}>
                        <Text
                            numberOfLines={2}
                            allowFontScaling={false}
                            style={styles.locationText}>
                            {spotlight_data?.location}
                        </Text>
                    </View>
                </View>
                <View style={styles.ratingContainer}>
                    {spotlight_data?.rating > 0 ? (
                        <Star width={SIZE(20)} height={SIZE(20)} />
                    ) : (
                        <StarDot width={SIZE(20)} height={SIZE(20)} />
                    )}
                    <Text allowFontScaling={false} style={styles.ratingText}>
                        {spotlight_data?.rating > 0
                            ? spotlight_data?.rating
                            : 'New'}
                    </Text>
                </View>
            </View>
            <View style={styles.flexBox}>
                <View style={styles.highLightButton}>
                    <Text style={styles.content}>
                        Training for {spotlight_data?.experience} Years
                    </Text>
                </View>
                <View style={styles.highLightButton}>
                    <Text style={styles.content}>
                        AED {spotlight_data?.price_per_hour}/hr
                    </Text>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text allowFontScaling={false} style={styles.descriptionText}>
                    {spotlight_data?.description}
                </Text>
            </View>
            <View style={styles.flexBox}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        handleDownload(spotlight_data?.cv);
                    }}
                    style={styles.cvSection}>
                    {downloading ? (
                        <ActivityIndicator
                            // style={{

                            // }}
                            size={'small'}
                            color={'#009fd3'}
                        />
                    ) : (
                        <Text style={styles.contentOption}>View CV </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.cvSection,
                        {
                            backgroundColor: '#009FD3',
                            borderColor: '#009FD3',
                            flexDirection: 'row',
                            alignItems: 'center',
                        },
                    ]}
                    disabled={
                        spotlight_data?.userIdFromEmail === null
                            ? true
                            : false || spotlight_data?.userId === null
                            ? true
                            : false
                    }
                    onPress={() => {
                        if (state.userData.is_login) {
                            const chatType = 'trainer';
                            navigation.navigate('ChatInner', {
                                item: {
                                    otherUser: {
                                        id: spotlight_data?.userIdFromEmail,
                                        name: spotlight_data?.name,
                                    },
                                },
                                userId: spotlight_data?.userId,
                                chatType: chatType,
                                profile: spotlight_data?.image,
                                pk: spotlight_data?.id,
                                productName: spotlight_data?.name,
                                productImage: spotlight_data?.image,
                                productSubTitle: spotlight_data?.description,
                                type: 'Trainer',
                            });
                        } else {
                            setUserModal(true);
                        }
                    }}
                    activeOpacity={0.8}>
                    <Text
                        style={[
                            styles.contentOption,
                            {color: '#fff', marginRight: SIZE(10)},
                        ]}>
                        Chat
                    </Text>
                    <MessageChat />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TrainerSpotlight;

const styles = StyleSheet.create({
    aboutServices: {
        paddingVertical: SIZE(20),
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZE(22),
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(22),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    locationAndStar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZE(10),
    },
    locationSub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    locationTextContainer: {
        width: SIZES.width * 0.5,
        marginLeft: SIZE(10),
    },
    locationText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    ratingContainer: {
        borderWidth: SIZE(1),
        borderColor: '#EDEDED',
        borderRadius: SIZE(100),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(15),
        paddingVertical: SIZE(4),
        backgroundColor: '#FFFFFF',
    },
    highLightButton: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(100),
        paddingHorizontal: SIZE(10),
        paddingVertical: SIZE(10),
        backgroundColor: '#FFFFFF',
        width: SIZES.width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#EDEDED',
    },
    starIcon: {
        width: SIZE(16),
        height: SIZE(16),
        marginRight: SIZE(6),
    },
    ratingTextContainer: {},
    ratingText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginLeft: SIZE(10),
    },
    descriptionContainer: {width: SIZES.width * 0.8},
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        textAlign: 'center',
    },
    flexBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SIZES.width * 0.85,
        marginVertical: SIZE(15),
    },
    content: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    cvSection: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(10),
        paddingVertical: SIZE(13),
        backgroundColor: '#FFFFFF',
        width: SIZES.width * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#003459',
        marginTop: SIZE(25),
    },
    contentOption: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
});
