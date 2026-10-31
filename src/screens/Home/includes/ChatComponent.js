import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import ReactNativeBlobUtil from 'react-native-blob-util';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//images and logos
import AvatarImage from '../../../assets/icons/avatar-new.svg';
import PlayIcon from '../../../assets/icons/chat/play.svg';
import PauseIcon from '../../../assets/icons/chat/pause.svg';
import ThumbDark from '../../../assets/icons/chat/seekdark.png';
import ThumbLight from '../../../assets/icons/chat/seeklight.png';
import DocIcon from '../../../assets/icons/document-text.svg';

const recorderPlayer = new AudioRecorderPlayer();

const ChatComponent = props => {
    const {
        item,
        state,
        chatId,
        userId,
        time,
        images,
        documents,
        audio,
        location,
        profileImage,
        prevAudio,
        setPrevAudio,
    } = props;

    const {dispatch} = useContext(Context);

    const [downloading, setDownloading] = useState(false);
    const [currentPositionPlay, setCurrentPositionPlay] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [currentUri, setCurrentUri] = useState(null);

    const handleDownload = async (docUrl, fileExt, fileName) => {
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
                console.log('Downloaded to: ', res.path());
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

    const openMapsApp = (latitude, longitude) => {
        const url = Platform.select({
            ios: `http://maps.apple.com/?daddr=${latitude},${longitude}&ll=`,
            android: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, // Use latitude and longitude directly
        });

        Linking.openURL(url);
    };
    useEffect(() => {
        return () => {
            handlePlayStop();
            recorderPlayer.removePlayBackListener();
        };
    }, []);

    const handlePlaybackCompletion = async () => {
        try {
            await recorderPlayer.stopPlayer();
            setPlaying(false);
            recorderPlayer.removePlayBackListener();
            setCurrentPositionPlay(0);
        } catch (err) {
            console.log('Error stopping player after completion:', err);
        }
    };

    const handleSeek = async value => {
        if (playing) {
            try {
                await recorderPlayer.seekToPlayer(value);
            } catch (err) {
                console.log('Error seeking player:', err);
            }
        } else {
            console.log('Cannot seek: Player is not playing');
        }
    };

    const handlePlayStop = async () => {
        try {
            await recorderPlayer.stopPlayer();
            setPlaying(false);
            recorderPlayer.removePlayBackListener();
            setCurrentPositionPlay(0);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePauseAudio = async () => {
        try {
            await recorderPlayer.pausePlayer();

            setPlaying(false);
        } catch (err) {
            console.log('Error pausing player:', err);
        }
    };

    const handlePlayPause = async uri => {
        if (playing) {
            if (prevAudio !== uri) {
                await handlePlayStop();
            } else {
                await handlePauseAudio();
            }
            setPlaying(false);
        } else {
            if (prevAudio !== uri) {
                await handlePlayStop();
            }
            setCurrentUri(uri);
            // Stop the current player if the URIs are different or not playing
            if (playing || currentUri !== uri) {
                await handlePlayStop();
                setPlaying(false);
                handlePlaybackCompletion();
            }

            // Start the player with the new URI
            try {
                await recorderPlayer.startPlayer(uri);
                setPrevAudio(uri);
                setPlaying(true);
                recorderPlayer.addPlayBackListener(e => {
                    setCurrentPositionPlay(e.currentPosition);
                    setDuration(e.duration);
                    if (e.currentPosition >= e.duration) {
                        handlePlaybackCompletion();
                    }
                });
            } catch (err) {
                console.log('Error starting player:', err);
            }
        }
        // }
    };

    //////////////////////////////////////////

    return (
        <View
            style={{
                alignSelf: item.sender === userId ? 'flex-end' : 'flex-start',
            }}>
            <View style={{flexDirection: 'row'}}>
                {item.sender === userId ? (
                    ''
                ) : (
                    <View style={styles.imageContainer}>
                        {profileImage ? (
                            <Image
                                style={[
                                    styles.profileImage,
                                    {borderRadius: SIZE(32)},
                                ]}
                                source={{uri: profileImage}}
                            />
                        ) : (
                            <AvatarImage width={'100%'} height={'100%'} />
                        )}
                    </View>
                )}
                <View
                    style={[
                        styles.outgoingMessage,
                        {
                            backgroundColor:
                                item.sender != userId
                                    ? '#D5EFFF'
                                    : !state?.userData?.is_service
                                    ? '#007EA7'
                                    : '#003459',

                            borderTopRightRadius:
                                item.sender != userId ? SIZE(8) : 0,
                            borderTopLeftRadius:
                                item.sender === userId ? SIZE(8) : 0,
                            paddingTop: images ? 0 : SIZE(8),
                        },
                    ]}>
                    {item?.productName ? null : (
                        <Text
                            style={[
                                styles.messageText,
                                {
                                    color:
                                        item.sender != userId
                                            ? '#242424'
                                            : '#FFFFFF',
                                },
                            ]}>
                            {item.body}
                        </Text>
                    )}

                    {images && images.length > 0 && (
                        <View style={styles.imagesContainer}>
                            {images.map((imageUrl, index) => (
                                <TouchableOpacity
                                    disabled={downloading}
                                    key={index}
                                    activeOpacity={0.8}
                                    onPress={() => handleDownload(imageUrl)}>
                                    {downloading === true ? (
                                        <ActivityIndicator
                                            style={[
                                                styles.sendRight,
                                                {
                                                    backgroundColor:
                                                        'transparent',
                                                },
                                            ]}
                                            size="large"
                                            color="#FFFFFF"
                                        />
                                    ) : (
                                        ''
                                    )}

                                    <Image
                                        source={{uri: imageUrl}}
                                        style={[
                                            styles.image,
                                            {opacity: downloading ? 0.3 : 1},
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    <View style={styles.docContainer}>
                        {documents && documents.length > 0
                            ? documents.map((docUrl, index) => {
                                  const fileNameFromUrl = docUrl
                                      .split('/')
                                      .pop()
                                      .split('?')[0]
                                      .split('_')
                                      .pop();
                                  const fileExtension = fileNameFromUrl
                                      .split('.')
                                      .pop();
                                  const baseFileName = fileNameFromUrl.replace(
                                      `.${fileExtension}`,
                                      '',
                                  );
                                  return (
                                      <TouchableOpacity
                                          style={{
                                              alignItems: 'center',
                                              width: SIZE(180),
                                              flexDirection: 'row',
                                          }}
                                          key={index}
                                          onPress={() => handleDownload(docUrl)}
                                          disabled={downloading}>
                                          <DocIcon
                                              fill={'#fff'}
                                              style={{marginRight: SIZE(10)}}
                                              height={SIZE(30)}
                                              width={SIZE(30)}
                                          />
                                          <Text
                                              numberOfLines={2}
                                              allowFontScaling={false}
                                              style={[
                                                  styles.docLink,
                                                  {
                                                      color:
                                                          item.sender != userId
                                                              ? '#242424'
                                                              : '#FFFFFF',
                                                  },
                                              ]}>
                                              {baseFileName}.{fileExtension}
                                          </Text>
                                          {downloading && (
                                              <ActivityIndicator
                                                  style={[
                                                      styles.sendLeft,
                                                      {
                                                          backgroundColor:
                                                              'transparent',
                                                      },
                                                  ]}
                                                  size="large"
                                                  color={
                                                      item.sender != userId
                                                          ? '#242424'
                                                          : '#FFFFFF'
                                                  }
                                              />
                                          )}
                                      </TouchableOpacity>
                                  );
                              })
                            : null}
                    </View>

                    <View style={styles.audioContainer}>
                        {audio && audio.length > 0 ? (
                            <View style={styles.audioSub}>
                                <View style={styles.audioTop}>
                                    <View style={styles.audioLeft}>
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            onPress={() => {
                                                handlePlayPause(audio);
                                            }}>
                                            {playing ? (
                                                <PauseIcon
                                                    fill={
                                                        item.sender == userId
                                                            ? '#D5EFFF'
                                                            : state?.userData
                                                                  ?.is_service
                                                            ? '#007EA7'
                                                            : '#003459'
                                                    }
                                                    width={SIZE(30)}
                                                    height={SIZE(30)}
                                                />
                                            ) : (
                                                <PlayIcon
                                                    fill={
                                                        item.sender == userId
                                                            ? '#D5EFFF'
                                                            : state?.userData
                                                                  ?.is_service
                                                            ? '#007EA7'
                                                            : '#003459'
                                                    }
                                                    width={SIZE(30)}
                                                    height={SIZE(30)}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.audioRight}>
                                        <Slider
                                            style={{width: SIZE(150)}}
                                            value={currentPositionPlay}
                                            minimumValue={0}
                                            maximumValue={duration}
                                            onValueChange={handleSeek}
                                            minimumTrackTintColor={
                                                item.sender == userId
                                                    ? '#D5EFFF'
                                                    : state?.userData
                                                          ?.is_service
                                                    ? '#007EA7'
                                                    : '#003459'
                                            }
                                            maximumTrackTintColor="#000000"
                                            thumbTintColor={
                                                item.sender == userId
                                                    ? '#D5EFFF'
                                                    : state?.userData
                                                          ?.is_service
                                                    ? '#007EA7'
                                                    : '#003459'
                                            }
                                            thumbImage={
                                                item.sender == userId
                                                    ? ThumbLight
                                                    : state?.userData
                                                          ?.is_service
                                                    ? ThumbLight
                                                    : ThumbDark
                                            }
                                        />
                                    </View>
                                </View>
                                <View style={styles.audioBottom}></View>
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.locationContainer}>
                        {location ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() =>
                                    openMapsApp(
                                        location?.latitude,
                                        location?.longitude,
                                    )
                                }
                                style={styles.mapSection}>
                                <MapView
                                    zoomTapEnabled={false}
                                    zoomEnabled={false}
                                    scrollEnabled={false}
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.map}
                                    region={{
                                        latitude: location?.latitude
                                            ? location.latitude
                                            : 0,
                                        longitude: location?.longitude
                                            ? location.longitude
                                            : 0,
                                        latitudeDelta: 0,
                                        longitudeDelta: 0.5,
                                    }}></MapView>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    {item.productName && (
                        <>
                            <TouchableOpacity
                                disabled
                                style={styles.productMain}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // if (item.sender != userId) {
                                    //     updateUserData({
                                    //         ...state.userData,
                                    //         is_service: true,
                                    //     });
                                    //     navigation.navigate('DonateSummary', {
                                    //         donate: item.productPk,
                                    //     });
                                    // } else {
                                    //     console.log('otheruser item');
                                    // }
                                }}>
                                <View style={[styles.productImageContainer]}>
                                    {item?.productImage?.length > 0 ? (
                                        <Image
                                            source={{
                                                uri: item?.productImage,
                                            }}
                                            style={[styles.productImage]}
                                        />
                                    ) : null}
                                </View>
                                <View>
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={2}
                                        style={[
                                            styles.messageText,
                                            {
                                                color:
                                                    item.sender != userId
                                                        ? '#242424'
                                                        : '#FFFFFF',

                                                fontSize: SIZE(14),
                                                fontFamily: FONTS.bold,
                                                fontWeight: '600',
                                                width: SIZE(170),
                                            },
                                        ]}>
                                        {item.productName}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        allowFontScaling={false}
                                        style={[
                                            styles.messageText,
                                            {
                                                color:
                                                    item.sender != userId
                                                        ? '#242424'
                                                        : '#FFFFFF',
                                                fontFamily: FONTS.regular,
                                                fontWeight: '400',
                                            },
                                        ]}>
                                        {item.productSubTitle}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={[
                                    styles.divider,
                                    {
                                        backgroundColor:
                                            item.sender == userId
                                                ? '#f7f7f7'
                                                : state?.userData?.is_service
                                                ? '#000'
                                                : '#f7f7f7',
                                    },
                                ]}></View>
                            <Text
                                style={[
                                    styles.messageText,
                                    {
                                        color:
                                            item.sender != userId
                                                ? '#242424'
                                                : '#FFFFFF',
                                    },
                                ]}>
                                {item?.body}
                            </Text>
                        </>
                    )}
                    <Text
                        style={[
                            styles.messageText,
                            {
                                color:
                                    item.sender != userId
                                        ? '#686868'
                                        : '#FFFFFF',
                                textAlign: 'right',
                            },
                        ]}>
                        {time}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ChatComponent;

const styles = StyleSheet.create({
    imageContainer: {
        width: SIZE(32),
        height: SIZE(32),
        marginTop: SIZE(16),
        marginRight: SIZE(16),
    },
    profileImage: {
        height: '100%',
        width: '100%',
    },
    outgoingMessage: {
        maxWidth: SIZE(271),
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        backgroundColor: '#003459',
        borderBottomLeftRadius: SIZE(8),
        borderBottomRightRadius: SIZE(8),
        borderTopLeftRadius: SIZE(8),
        alignSelf: 'flex-end',
        marginVertical: SIZE(16),
    },
    messageText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        fontWeight: '500',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        width: SIZE(200),
        height: SIZE(200),
        borderRadius: SIZE(10),
        marginTop: SIZE(5),
    },
    docLink: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '500',
        color: '#686868',
        width: SIZE(120),
    },
    sendRight: {
        position: 'absolute',
        zIndex: 1000,
        top: SIZE(85),
        left: SIZE(80),
    },
    sendLeft: {
        position: 'absolute',
        zIndex: 1000,
        left: SIZE(70),
        top: SIZE(-5),
    },
    mapSection: {
        height: SIZE(100),
        width: SIZE(220),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    audioSub: {},
    audioTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    audioLeft: {marginRight: SIZE(10)},
    audioBottom: {},
    customThumb: {
        height: SIZE(10),
        width: SIZE(10),
        backgroundColor: 'red',
    },
    productMain: {
        flexDirection: 'row',
        marginTop: SIZE(10),
    },
    productImageContainer: {
        width: SIZE(64),
        height: SIZE(64),
        borderRadius: SIZE(4),
        overflow: 'hidden',
        marginRight: SIZE(12),
        marginBottom: SIZE(5),
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    divider: {
        height: SIZE(1),
        width: '100%',
        backgroundColor: '#F7F7F7',
        marginTop: SIZE(10),
        marginBottom: SIZE(10),
        opacity: 0.2,
    },
});
