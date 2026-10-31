import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    PermissionsAndroid,
    NativeModules,
    Keyboard,
} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';

//packages
import {useFocusEffect, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AudioRecorderPlayer, {
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    AVModeIOSOption,
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-blob-util';
import Modal from 'react-native-modal';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Toast, {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';
import {useChatContext} from '../../contexts/ChatContext';

//components
import Headers from '../includes/headers/Headers';
import ChatTools from './includes/ChatTools';
import ChatComponent from './includes/ChatComponent';

//images and logos
import SendIcon from '../../assets/icons/chat/send-2.svg';
import RecordIcon from '../../assets/icons/chat/microphone-2.svg';
import AttachmentIcon from '../../assets/icons/chat/Attachment.svg';
import CloseIcon from '../../assets/icons/close-circle.svg';
import DocIcon from '../../assets/icons/document-text.svg';
import NoData from '../../assets/icons/nodataarrivals.svg';
import InfoCircle from '../../assets/icons/info-circle-blue.svg';

const recorderPlayer = new AudioRecorderPlayer();

const ChatInner = () => {
    const {state, dispatch} = useContext(Context);
    const {StatusBarManager} = NativeModules;
    const navigation = useNavigation();
    const {setCurrentChatId} = useChatContext();
    const toast = useToast();

    const route = useRoute();
    const _map = useRef(null);
    const scrollViewRef = useRef(null);
    const {userId} = route?.params;
    const {id} = route?.params?.item?.otherUser;
    const {chatType} = route?.params;
    const profileImage = route?.params?.profile;
    const name = state?.userData?.name;
    const pk = route?.params?.pk;
    const productSubTitle = route?.params?.productSubTitle;
    const productType = route?.params?.type;
    const provider = route?.params?.provider;

    //states
    const [region, setRegion] = useState({});
    const [productImage, setProductImage] = useState(
        route?.params?.productImage,
    );
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [toolsVisible, setToolsVisible] = useState(false);
    const [chatMenu, setChatMenu] = useState(false);
    const [chatMenuList, setChatMenuList] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [document, setDocument] = useState([]);
    const [mapModalVisible, setMapModalVisible] = useState(false);
    const [isLoading, setIsLoading] = React.useState([]);
    const [productName, setProductName] = useState(route?.params?.productName);
    const [message, setMessage] = useState(
        productName ? `Can I talk to you about ${productName}` : '',
    );
    const [messages, setMessages] = useState([]);
    const [sendEnable, setSendEnable] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordUri, setRecordUri] = useState('');
    const [currentPosition, setCurrentPosition] = useState(0);
    const [enableChat, setEnableChat] = useState(false);
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [olderRefresh, setOlderRefresh] = useState(false);
    const [chatClear, setChatClear] = useState(false);
    const [prevAudio, setPrevAudio] = useState('');
    const [otherUserData, setOtherUserData] = useState([]);

    const LATITUDE_DELTA = 1;
    const LONGITUDE_DELTA = 1;

    const [filterOptions] = useState([
        {label: 'Search', value: 1},
        {label: 'Links & Docs', value: 2},
        {label: 'Clear Chat', value: 3},
    ]);

    //default location pre setting
    useEffect(() => {
        if (state.userData.exactLocation) {
            setRegion({
                latitude: state.userData.exactLocation.latitude,
                longitude: state.userData.exactLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
        }
    }, [state.userData.exactLocation]);

    //location marking
    const handleMapPress = event => {
        const {coordinate} = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    //share location
    const handleShareLocation = async () => {
        if (selectedLocation) {
            chatRef.update({
                [`unreadCount.${id}`]: firestore.FieldValue.increment(1),
            });
            await chatRef.collection('messages').add({
                body: '',
                name: name,
                sender: userId,
                recipient: id,
                channel: chatId,
                section: chatType,
                profileImage: state?.userData?.photo,
                location: selectedLocation,
                timestamp: firestore.FieldValue.serverTimestamp(),
                type: 'Location',
            });
        } else {
            console.log('No location selected');
        }
    };

    //scroll to bottom and top functions
    const scrollToBottom = () => {
        scrollViewRef?.current?.scrollToEnd({animated: true});
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            scrollToBottom,
        );
        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    //message validation
    const msgValid = text => {
        if (text && text.replace(/\s/g, '').length) {
            if (/\d{9}/.test(text)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };

    //////////////////////////////////////////////////////////////////////////////////

    //chat room creation functions
    const generateChatId = chatType => {
        const sortedUserIds = [userId, id].sort();
        const chatId = `${chatType}_${sortedUserIds.join('_')}`;
        return chatId;
    };
    const chatId = generateChatId(chatType);
    const chatRef = firestore().collection('chats').doc(chatId);
    const userRef = firestore().collection('users').doc(userId);
    const contactUserRef = firestore().collection('users').doc(id);
    const createChatRoom = async chatType => {
        const chatSnapShot = await chatRef.get();

        if (!chatSnapShot.exists) {
            const participants = [userRef, contactUserRef];
            await chatRef.set({participants, type: chatType});
        }
    };
    createChatRoom(chatType);

    useEffect(() => {
        setCurrentChatId(chatId);
        return () => {
            setCurrentChatId(null);
        };
    }, [chatId]);
    //////////////////////////////////////////////////////////////////////////////////

    const fetchMessages = async () => {
        setRefresh(true);
        try {
            const unsubscribeMessages = await chatRef
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .limit(10)
                .onSnapshot(async messageSnapshot => {
                    const allMessages = messageSnapshot.docs.map(snap => {
                        return snap.data();
                    });
                    setMessages(allMessages.reverse());
                    setRefresh(false);
                    scrollToBottom();
                });
        } catch (error) {
            console.log('Error fetching messages: ', error);
        }
    };

    //disable and enable sending
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const unsubscribeMessages = await chatRef
                    .collection('messages')
                    .orderBy('timestamp', 'desc')
                    .onSnapshot(async messageSnapshot => {
                        const allMessages = messageSnapshot.docs.map(snap => {
                            return snap.data();
                        });
                        if (allMessages && allMessages.length > 0) {
                            const isReceiver = allMessages.some(
                                message =>
                                    message.sender !== userId ||
                                    message.provider,
                            );
                            if (isReceiver) {
                                setEnableChat(true);
                            } else if (
                                state?.userData?.is_service &&
                                isReceiver
                            ) {
                                setEnableChat(true);
                            } else {
                                setEnableChat(false);
                            }
                        } else if (state?.userData?.is_service) {
                            setEnableChat(true);
                        } else {
                            setEnableChat(false);
                        }
                    });
            } catch (error) {
                console.log('Error fetching messages: ', error);
            }
        };

        fetchMessages();
    }, [chatId]);

    // load older messages function
    const loadOlderMessages = async () => {
        setOlderRefresh(true);
        try {
            const oldestMessage = messages.reverse()[messages.length - 1];
            const querySnapshot = await chatRef
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .startAfter(oldestMessage.timestamp)
                .limit(10)
                .get();
            const olderMessages = querySnapshot.docs.map(snap => snap.data());
            setMessages(prevMessages =>
                [...prevMessages, ...olderMessages].reverse(),
            );
            setOlderRefresh(false);
        } catch (error) {
            console.log('Error loading older messages: ', error);
        }
    };

    //upload attachments functions
    const uploadImage = async image => {
        const imageName = `${userId}_${Date.now()}_${image.name}`;
        const uploadUri = image.uri;

        try {
            const reference = storage().ref(`/files/${userId}/${imageName}`);
            const task = reference.putFile(uploadUri);
            await task;

            const downloadURL = await reference.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.log('Error uploading image:', error);
            throw error;
        }
    };

    const uploadDocument = async document => {
        const documentName = `${userId}_${Date.now()}_${document.name}`;
        const uploadUri = document.fileCopyUri;

        try {
            const reference = storage().ref(`/files/${userId}/${documentName}`);
            const task = reference.putFile(uploadUri);
            await task;

            const downloadURL = await reference.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.log('Error uploading document:', error);
            throw error;
        }
    };
    const uploadAudio = async audio => {
        const parts = audio.split('/');
        const fileNameWithExtension = parts.pop();

        const audioName = `${userId}_${Date.now()}_${fileNameWithExtension}`;
        const uploadUri = audio;
        try {
            const reference = storage().ref(`/files/${userId}/${audioName}`);
            const task = reference.putFile(uploadUri);
            await task;
            const downloadURL = await reference.getDownloadURL();
            return downloadURL;
        } catch (error) {
            console.log('Error uploading audio:', error);
            throw error;
        }
    };

    //remove attachments functions
    const removeSelectedImage = index => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };
    const removeSelectedDocument = index => {
        const updatedDocuments = [...document];
        updatedDocuments.splice(index, 1);
        setDocument(updatedDocuments);
    };

    //preview rendering functions
    const renderImagePreview = ({item, index}) => (
        <View
            style={{
                marginHorizontal: SIZE(8),
            }}>
            <Image source={{uri: item.uri}} style={styles.imagePreviewStyle} />
            <TouchableOpacity
                style={[styles.removeButton]}
                onPress={() => removeSelectedImage(index)}>
                <CloseIcon height={SIZE(24)} width={SIZE(24)} />
            </TouchableOpacity>
        </View>
    );
    const renderDocumentPreview = ({item, index}) => (
        <View style={styles.docPreviewStyle}>
            <DocIcon height={SIZE(30)} width={SIZE(30)} />
            <Text
                numberOfLines={2}
                allowFontScaling={false}
                style={styles.docNameStyle}>
                {item.name}
            </Text>
            <TouchableOpacity
                style={[styles.removeButton]}
                onPress={() => removeSelectedDocument(index)}>
                <CloseIcon height={SIZE(24)} width={SIZE(24)} />
            </TouchableOpacity>
        </View>
    );

    // voice recording functionality
    const requestAudioRecordingPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Audio Recording Permission',
                        message:
                            'App needs access to your microphone to record audio.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Audio recording permission granted');
                    return true;
                } else {
                    console.log('Audio recording permission denied');
                    return false;
                }
            } catch (err) {
                console.log(err);
                return false;
            }
        } else if (Platform.OS === 'ios') {
            // iOS does not require explicit permission for audio recording
            return true;
        }
    };
    const handleRecordStart = async () => {
        const hasPermission = await requestAudioRecordingPermission();
        if (!hasPermission) {
            console.log('Microphone permission denied');
            return;
        }

        try {
            const path = Platform.select({
                ios: `file://${RNFetchBlob.fs.dirs.DocumentDir}/sound.m4a`,
                android: `${RNFetchBlob.fs.dirs.CacheDir}/sound.mp4`,
            });

            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVModeIOS: AVModeIOSOption.measurement,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            const meteringEnabled = false;
            const uri = await recorderPlayer.startRecorder(
                path,
                audioSet,
                meteringEnabled,
            );
            setRecordUri(uri);
            setRecording(true);
            recorderPlayer.addRecordBackListener(e => {
                setCurrentPosition(e.currentPosition);
            });
        } catch (err) {
            console.log(err);
        }
    };
    const handleRecordStop = async () => {
        try {
            const uri = await recorderPlayer.stopRecorder();
            setRecording(false);
            recorderPlayer.removeRecordBackListener();
        } catch (err) {
            console.log(err);
        }
    };
    const formatTime = milliseconds => {
        const seconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec
            .toString()
            .padStart(2, '0')}`;
    };

    // Function to fetch other user data
    useEffect(() => {
        const fetchOtherUserData = async () => {
            try {
                const userDoc = await firestore()
                    .collection('users')
                    .doc(id)
                    .get();

                if (userDoc.exists) {
                    setOtherUserData(userDoc.data());
                } else {
                    console.log('User document does not exist');
                }
            } catch (error) {
                console.log('Error fetching other user data: ', error);
            }
        };

        if (userId) {
            fetchOtherUserData();
        }
    }, [userId]);

    const sendInterest = async () => {
        setIsLoading(true);
        try {
            await chatRef.update({
                [`unreadCount.${id}`]: firestore.FieldValue.increment(1),
            });
            chatRef.collection('messages').add({
                body: `Can I talk to you about ${productName}`,
                name: name,
                sender: userId,
                recipient: id,
                channel: chatId,
                section: chatType,
                profileImage: state?.userData?.photo,
                timestamp: firestore.FieldValue.serverTimestamp(),
                type: productType,
                productName: productName,
                productImage: productImage,
                productSubTitle: productSubTitle,
                productPk: pk,
            });
            setMessage('');
            setProductImage('');
            setSendEnable(false);
            scrollToBottom();
            setProductName('');
        } catch (error) {
            console.log('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // send message function
    const onSend = async () => {
        if (
            !msgValid(message) &&
            selectedImages.length === 0 &&
            document.length === 0 &&
            recordUri.length === 0
        ) {
            return;
        }
        if (messages.length === 0) {
            toast.show('Chat Initiated Successfully', {
                type: 'success',
            });
        }

        setIsLoading(true);

        try {
            if (selectedImages.length > 0) {
                const imageUrls = await Promise.all(
                    selectedImages.map(uploadImage),
                );

                const imageMessages = imageUrls.map((imageUrl, index) => ({
                    body: index === 0 ? message : '',
                    name: name,
                    sender: userId,
                    recipient: id,
                    channel: chatId,
                    section: chatType,
                    profileImage: state?.userData?.photo,
                    images: [imageUrl], // Store as array
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    type: 'Image',
                    provider: provider ? true : false,
                }));

                imageMessages.forEach(async messageData => {
                    chatRef.update({
                        [`unreadCount.${id}`]:
                            firestore.FieldValue.increment(1),
                    });
                    await chatRef.collection('messages').add(messageData);
                });
            } else if (document.length > 0) {
                const documentUrls = await Promise.all(
                    document.map(uploadDocument),
                );

                const documentMessages = documentUrls.map((docUrl, index) => ({
                    body: index === 0 ? message : '',
                    name: name,
                    sender: userId,
                    recipient: id,
                    channel: chatId,
                    section: chatType,
                    profileImage: state?.userData?.photo,
                    documents: [docUrl], // Store as array
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    type: 'Document',
                    provider: provider ? true : false,
                }));

                documentMessages.forEach(async messageData => {
                    chatRef.update({
                        [`unreadCount.${id}`]:
                            firestore.FieldValue.increment(1),
                    });
                    await chatRef.collection('messages').add(messageData);
                });
            } else if (recordUri && recordUri.length > 0) {
                const audioUrl = await uploadAudio(recordUri);
                // await uploadAudio(recordUri);
                chatRef.update({
                    [`unreadCount.${id}`]: firestore.FieldValue.increment(1),
                });
                await chatRef.collection('messages').add({
                    body: '',
                    name: name,
                    sender: userId,
                    recipient: id,
                    channel: chatId,
                    section: chatType,
                    profileImage: state?.userData?.photo,
                    audio: audioUrl,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    type: 'Audio',
                    provider: provider ? true : false,
                });
            } else {
                chatRef.update({
                    [`unreadCount.${id}`]: firestore.FieldValue.increment(1),
                });
                await chatRef.collection('messages').add({
                    body: message,
                    name: name,
                    sender: userId,
                    recipient: id,
                    channel: chatId,
                    section: chatType,
                    profileImage: state?.userData?.photo,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    type: containsLinkOrEmail(message) ? 'Link' : 'Text',
                    provider: provider ? true : false,
                });
            }

            setMessage('');
            setSelectedImages([]);
            setDocument([]);
            setSendEnable(false);
            scrollToBottom();
            setCurrentPosition(0);
            setRecordUri('');
        } catch (error) {
            console.log('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const containsLinkOrEmail = text => {
        const linkRegex =
            /(?:https?|ftp):\/\/[\n\S]+|www\.[\n\S]+|[\n\S]+\.[A-Za-z]{2,}/gi;
        const emailRegex =
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi;

        return linkRegex.test(text) || emailRegex.test(text);
    };

    //inner chats rendering component
    const renderItem = ({item, index}) => {
        const messageDate = item.timestamp?.toDate();
        const currentDate = new Date();
        const today = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
        );
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        let messageDay;

        if (messageDate?.toDateString() === today.toDateString()) {
            messageDay = 'Today';
        } else if (messageDate?.toDateString() === yesterday.toDateString()) {
            messageDay = 'Yesterday';
        } else {
            messageDay = messageDate?.toLocaleDateString();
        }

        let dateIndicator = null;
        if (
            index === 0 ||
            messageDate?.toDateString() !==
                messages[index - 1].timestamp?.toDate()?.toDateString()
        ) {
            dateIndicator = (
                <View style={styles.dayContainer}>
                    <Text style={styles.dayText}>{messageDay}</Text>
                </View>
            );
        }

        return (
            <>
                {dateIndicator}
                <ChatComponent
                    profileImage={profileImage}
                    location={item.location}
                    images={item.images}
                    documents={item.documents}
                    audio={item.audio}
                    prevAudio={prevAudio}
                    setPrevAudio={setPrevAudio}
                    item={item}
                    massage={item.body}
                    state={state}
                    chatId={chatId}
                    userId={userId}
                    id={id}
                    time={item.timestamp?.toDate().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                    })}
                />
            </>
        );
    };

    //reset count functions
    const resetUnreadCount = async () => {
        try {
            chatRef.update({
                [`unreadCount.${userId}`]: 0,
            });
        } catch (error) {
            console.log('Error resetting unread count:', error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            resetUnreadCount();
            return () => {
                resetUnreadCount();
            };
        }, []),
    );

    const searchResult = async text => {
        try {
            const querySnapshot = await chatRef
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .get();
            const searchMessages = querySnapshot.docs.map(snap => snap.data());
            const filteredMessages = searchMessages.filter(message =>
                message.body.includes(text),
            );
            setMessages(filteredMessages);
            scrollToBottom();
        } catch (error) {
            console.log('Error loading older messages: ', error);
        }
    };

    useEffect(() => {
        const handleSortButtonClick = async () => {
            try {
                const querySnapshot = await chatRef
                    .collection('messages')
                    .orderBy('timestamp', 'desc')
                    .get();
                const searchMessages = querySnapshot.docs.map(snap =>
                    snap.data(),
                );

                const filteredMessages = searchMessages.filter(
                    message =>
                        message.type === 'Link' || message.type === 'Document',
                );

                setMessages(filteredMessages);
                scrollToBottom();
            } catch (error) {
                console.log('Error sorting and filtering messages: ', error);
            }
        };

        if (chatMenuList === 2) {
            handleSortButtonClick();
        } else {
            fetchMessages();
        }
    }, [chatMenuList]);

    const clearChat = async () => {
        setRefresh(true);
        try {
            const querySnapshot = await chatRef.collection('messages').get();
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
            await chatRef.update({
                [`unreadCount.${id}`]: 0,
            });
            setChatClear(true);
            setRefresh(false);
            navigation.goBack();
        } catch (error) {
            setRefresh(false);
            console.log('Error deleting collection: ', error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 1000);
    }, []);

    const stopPlay = async () => {
        try {
            await recorderPlayer.stopPlayer();
            recorderPlayer.removePlayBackListener();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Headers
                    chat={true}
                    headText={route?.params?.item?.otherUser?.name}
                    setChatMenu={setChatMenu}
                    chatMenuList={chatMenuList}
                    searchResult={searchResult}
                    setSearch={setSearch}
                    fetchMessages={fetchMessages}
                    setChatMenuList={setChatMenuList}
                    search={search}
                    stopPlay={stopPlay}
                    filterOptions={filterOptions}
                    clearChat={clearChat}
                />
                {chatMenu && (
                    <View style={styles.filterMain}>
                        <TouchableOpacity
                            onPress={() => {
                                setChatMenuList(1);
                                setChatMenu(false);
                            }}
                            activeOpacity={0.8}
                            style={[
                                styles.buttonContainer,
                                {
                                    marginBottom: SIZE(8),
                                    backgroundColor:
                                        chatMenuList === 1
                                            ? '#EAF7FF'
                                            : 'transparent',
                                },
                            ]}>
                            <Text
                                allowFontScaling={false}
                                style={styles.buttonText}>
                                Search
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setChatMenuList(2);
                                setChatMenu(false);
                            }}
                            activeOpacity={0.8}
                            style={[
                                styles.buttonContainer,
                                {
                                    marginBottom: SIZE(8),
                                    backgroundColor:
                                        chatMenuList === 2
                                            ? '#EAF7FF'
                                            : 'transparent',
                                },
                            ]}>
                            <Text
                                allowFontScaling={false}
                                style={styles.buttonText}>
                                Links & Docs
                            </Text>
                        </TouchableOpacity>
                        {messages.length === 0 ? null : (
                            <TouchableOpacity
                                onPress={() => {
                                    clearChat();
                                    setChatMenuList(null);
                                    setChatMenu(false);
                                }}
                                activeOpacity={0.8}
                                style={[
                                    styles.buttonContainer,
                                    {
                                        backgroundColor:
                                            chatMenuList === 3
                                                ? '#EAF7FF'
                                                : 'transparent',
                                    },
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.buttonText}>
                                    Clear Chat
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {chatMenuList === 1 ||
                chatMenuList === 2 ? null : messages.length > 9 ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.dayContainer]}
                        onPress={loadOlderMessages}>
                        {olderRefresh ? (
                            <ActivityIndicator
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                size="small"
                                color={
                                    !state?.userData?.is_service
                                        ? '#007EA7'
                                        : '#003459'
                                }
                            />
                        ) : (
                            <Text style={styles.dayText}>
                                Load Older Messages
                            </Text>
                        )}
                    </TouchableOpacity>
                ) : null}
                {refresh ? (
                    <ActivityIndicator
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        size="large"
                        color={
                            !state?.userData?.is_service ? '#007EA7' : '#003459'
                        }
                    />
                ) : (
                    <>
                        <FlatList
                            bounces={false}
                            ref={scrollViewRef}
                            contentContainerStyle={[styles.scroll]}
                            data={messages}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <View style={styles.spotlightMain}>
                                    <View style={styles.spotlight}>
                                        <NoData
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </View>
                                    <View style={styles.bottom}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.mainText}>
                                            No Chat Found
                                        </Text>
                                    </View>
                                </View>
                            }
                        />
                    </>
                )}
                {selectedImages.length > 0 && (
                    <View
                        style={
                            ([styles.previewMap],
                            {
                                borderWidth: SIZE(1),
                                borderStyle: 'dashed',
                                height: SIZE(90),
                                borderRadius: SIZE(8),
                                borderColor: !state?.userData?.is_service
                                    ? '#007EA7'
                                    : '#003459',
                                backgroundColor: '#fff',
                            })
                        }>
                        <FlatList
                            bounces={false}
                            contentContainerStyle={{
                                alignItems: 'center',
                            }}
                            data={selectedImages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderImagePreview}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}
                {document.length > 0 && (
                    <View
                        style={
                            ([styles.previewMap],
                            {
                                borderWidth: SIZE(1),
                                borderStyle: 'dashed',
                                borderRadius: SIZE(8),
                                height: SIZE(120),
                                borderColor: !state?.userData?.is_service
                                    ? '#007EA7'
                                    : '#003459',
                                backgroundColor: '#fff',
                            })
                        }>
                        <FlatList
                            bounces={false}
                            contentContainerStyle={{
                                alignItems: 'center',
                                padding: SIZE(8),
                                gap: SIZE(8),
                            }}
                            data={document}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderDocumentPreview}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={
                        Platform.OS === 'ios'
                            ? StatusBarManager.HEIGHT + SIZES.height * 0.001
                            : null
                    }>
                    {!enableChat && messages.length !== 0 && (
                        <View style={styles.waitMain}>
                            <InfoCircle width={20} height={20} />
                            <Text style={styles.waitText}>
                                Please wait until provider replies.
                            </Text>
                        </View>
                    )}
                    <View style={styles.bottomMain}>
                        <View style={[styles.bottomInputMain]}>
                            <View style={styles.inputLeft}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    {productImage ? (
                                        <View
                                            style={
                                                styles.productImageContainer
                                            }>
                                            <Image
                                                source={{uri: productImage}}
                                                style={styles.productImage}
                                            />
                                        </View>
                                    ) : null}
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            numberOfLines={2}
                                            multiline={true}
                                            allowFontScaling={false}
                                            style={[
                                                styles.textInput,
                                                {
                                                    height: productName
                                                        ? SIZE(55)
                                                        : SIZE(50),
                                                },
                                            ]}
                                            placeholder={
                                                recording
                                                    ? `Recording: ${formatTime(
                                                          currentPosition,
                                                      )}`
                                                    : 'Write your Message...'
                                            }
                                            placeholderTextColor={
                                                recording ? 'red' : '#242424'
                                            }
                                            onChangeText={text => {
                                                setMessage(text);
                                            }}
                                            value={message}
                                            editable={
                                                recording
                                                    ? false
                                                    : productName?.length > 0
                                                    ? false
                                                    : enableChat
                                            }
                                        />
                                    </View>
                                </View>
                                {recording ? (
                                    <TouchableOpacity
                                        style={{}}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            handleRecordStop();
                                            setCurrentPosition(0);
                                            setRecordUri('');
                                        }}>
                                        <CloseIcon
                                            width={SIZE(30)}
                                            height={SIZE(30)}
                                        />
                                    </TouchableOpacity>
                                ) : productImage ? null : (
                                    <TouchableOpacity
                                        disabled={
                                            productName?.length > 0 ||
                                            !enableChat
                                        }
                                        onPress={() => {
                                            setToolsVisible(prev => !prev);
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.attachment}>
                                        <AttachmentIcon
                                            width={'100%'}
                                            height={'100%'}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>

                            {isLoading === true ? (
                                <ActivityIndicator
                                    style={[
                                        styles.sendRight,
                                        {
                                            backgroundColor: !state?.userData
                                                ?.is_service
                                                ? '#007EA7'
                                                : '#003459',
                                        },
                                    ]}
                                    size="small"
                                    color="#FFFFFF"
                                />
                            ) : messages.length === 0 &&
                              !state?.userData?.is_service ? (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (productName) {
                                            sendInterest();
                                        } else {
                                            onSend();
                                        }
                                    }}
                                    style={[
                                        styles.sendRight,
                                        {
                                            backgroundColor: !state?.userData
                                                ?.is_service
                                                ? '#007EA7'
                                                : '#003459',
                                        },
                                    ]}>
                                    <SendIcon
                                        width={SIZE(24)}
                                        height={SIZE(24)}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    disabled={!enableChat}
                                    onPress={() => {
                                        if (recording) {
                                            if (recordUri.length !== 0) {
                                                handleRecordStop();
                                                onSend();
                                            } else {
                                                handleRecordStop();
                                            }
                                        } else if (
                                            message.trim() === '' &&
                                            selectedImages.length === 0 &&
                                            document.length === 0
                                        ) {
                                            handleRecordStart();
                                            setMessage('');
                                        } else {
                                            if (productName) {
                                                sendInterest();
                                            } else {
                                                onSend();
                                            }
                                            // onSend();
                                        }
                                    }}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.sendRight,
                                        {
                                            backgroundColor: !state?.userData
                                                ?.is_service
                                                ? '#007EA7'
                                                : '#003459',
                                        },
                                    ]}>
                                    {recording ? (
                                        <SendIcon
                                            width={SIZE(24)}
                                            height={SIZE(24)}
                                        />
                                    ) : (
                                        <>
                                            {message.trim() === '' &&
                                            selectedImages.length === 0 &&
                                            document.length === 0 ? (
                                                <RecordIcon
                                                    width={SIZE(24)}
                                                    height={SIZE(24)}
                                                />
                                            ) : (
                                                <SendIcon
                                                    width={SIZE(24)}
                                                    height={SIZE(24)}
                                                />
                                            )}
                                        </>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                        {toolsVisible && (
                            <ChatTools
                                state={state}
                                setSelectedImages={setSelectedImages}
                                setDocument={setDocument}
                                setToolsVisible={setToolsVisible}
                                setMapModalVisible={setMapModalVisible}
                                setSelectedLocation={setSelectedLocation}
                            />
                        )}
                    </View>
                </KeyboardAvoidingView>
            </View>
            <Modal
                isVisible={mapModalVisible}
                onBackButtonPress={() => {
                    setMapModalVisible(false);
                }}
                onBackdropPress={() => {
                    setMapModalVisible(false);
                }}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                deviceHeight={SIZES.height}
                onSwipeComplete={() => {
                    setMapModalVisible(false);
                }}
                style={[
                    styles.modalContainer,
                    {
                        screenBackgroundcolor: 'transparent',
                        modalPresentationStyle: 'overCurrentContext',
                        backgroundColor: '#F7F7F7',
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT + SIZES.height * 0.04
                                : StatusBarManager.HEIGHT,
                    },
                ]}>
                <View>
                    <MapView
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.container}
                        showsUserLocation={true}
                        showsMyLocationButton
                        followsUserLocation={true}
                        onPress={handleMapPress}
                        region={
                            region && region.latitude && region.longitude
                                ? region
                                : {
                                      latitude: 11.2587531,
                                      longitude: 75.78041,
                                      latitudeDelta: 1.5,
                                      longitudeDelta: 1.2,
                                  }
                        }>
                        {selectedLocation && (
                            <Marker coordinate={selectedLocation} />
                        )}
                    </MapView>
                    <TouchableOpacity
                        disabled={!selectedLocation}
                        onPress={() => {
                            handleShareLocation();
                            setMapModalVisible(false);
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.selectMap,
                            {opacity: selectedLocation ? 1 : 0.4},
                        ]}>
                        <Text allowFontScaling={false} style={styles.mapText}>
                            Share Location
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default ChatInner;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    subContainer: {
        flex: 1,
    },
    scroll: {
        paddingHorizontal: SIZE(16),
    },
    dayContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(8),
        backgroundColor: '#D5EFFF',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: SIZE(16),
    },
    incomingMain: {
        flexDirection: 'row',
    },
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

    dayText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontFamily: FONTS.medium,
        fontWeight: '500',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    waitMain: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        height: SIZE(50),
        borderRadius: SIZE(8),
        backgroundColor: '#EAF7FF',
        marginBottom: SIZE(16),
        borderWidth: SIZE(1),
        borderColor: '#98C1D9',
    },
    waitText: {
        color: '#009FD3',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        fontSize: SIZE(15),
        textAlign: 'center',
        marginLeft: SIZE(8),
    },
    bottomMain: {
        backgroundColor: '#fff',
        width: '100%',
    },
    bottomInputMain: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        width: SIZE(330),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        marginVertical: SIZE(8),
        // height: SIZE(50),
    },
    textInput: {
        fontSize: SIZE(14),
        color: '#00171F',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        width: SIZE(250),
    },
    emoji: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(8),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachment: {
        width: SIZE(20),
        height: SIZE(20),
    },
    sendRight: {
        width: SIZE(50),
        height: SIZE(50),
        backgroundColor: '#003459',
        borderRadius: SIZE(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(149),
        position: 'absolute',
        right: SIZE(16),
        top: SIZE(65),
        zIndex: 1000,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowOffset: {width: 0, height: SIZE(3)},
                shadowOpacity: 0.3,
                shadowRadius: SIZE(12),
            },
            android: {
                elevation: SIZE(3),
            },
        }),
    },
    buttonContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    buttonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
    removeButton: {
        position: 'absolute',
        top: SIZE(-15),
        right: SIZE(-10),
        zIndex: 1000,
    },
    removeButtonText: {
        color: 'white',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
    },
    imagePreviewStyle: {
        width: SIZE(50),
        height: SIZE(50),
        borderRadius: SIZE(8),
    },
    docPreviewStyle: {
        padding: SIZE(8),
        width: SIZE(100),
        borderWidth: SIZE(1),
        borderStyle: 'dashed',
        borderRadius: SIZE(8),
        minHeight: SIZE(80),
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    docNameStyle: {
        fontSize: SIZE(12),
        color: '#242424',
        fontFamily: FONTS.medium,
        fontWeight: '500',
    },

    modalContainer: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
    },
    container: {
        backgroundColor: '#fff',
        height: SIZES.height,
    },
    selectMap: {
        position: 'absolute',
        bottom: SIZE(40),
        left: SIZES.width / 4.9,
        backgroundColor: '#009FD3',
        borderRadius: SIZE(40),
        height: SIZE(50),
        width: SIZE(250),
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapText: {
        color: '#fff',
        marginRight: SIZE(12),
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    spotlightMain: {
        flex: 1,
        marginTop: SIZE(180),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(40),
    },
    productImageContainer: {
        height: SIZE(45),
        width: SIZE(45),
        borderRadius: SIZE(8),
        overflow: 'hidden',
        marginRight: SIZE(14),
        borderWidth: SIZE(1),
        padding: SIZE(1),
    },
    productImage: {
        height: '100%',
        width: '100%',
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
});
