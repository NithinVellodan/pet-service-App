import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Image,
    View,
    ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Headers from '../../../includes/headers/Headers';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import Message from '../../../../assets/icons/messages.svg';
import ArrowRight from '../../../../assets/icons/arrow_right_button.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {EcommerceServiceProviderdonatedOrderSingle} from '../../EcommerceApiSection';
import moment from 'moment';
import {Context} from '../../../../contexts/Store';
import ModalBox from '../../../Home/includes/ModalBox';
import CancelOrder from '../includes/CancelOrder';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import firestore from '@react-native-firebase/firestore';

const DonateSummary = ({route}) => {
    const donate = route?.params?.donate;
    const {state} = useContext(Context);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);
    const [reason, setReason] = useState('');
    const [orderDelText, setOrderDelText] = useState('');
    const [errorMessage, setErrorMessage] = useState({});

    // clear all function
    const clearAll = () => {
        setReason('');
        setOrderDelText('');
    };
    const navigation = useNavigation();
    const [donateSummary, setDonateSummary] = useState([]);
    const [userId, setUserId] = useState(state?.userData?.firebaseUid);
    const [userIdFromEmail, setUserIdFromEmail] = useState(null);
    const [users, setUsers] = useState([]);

    EcommerceServiceProviderdonatedOrderSingle(
        state,
        setDonateSummary,
        donate,
        setLoading,
        refreshing,
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(prev => !prev);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // accept-order-donated
    const acceptOrder = async () => {
        setButtonLoading(true);
        const token = state.userData.accessToken;
        const pk = donateSummary.id;
        try {
            const response = await ecommerceApiServiceProvider.post(
                `accept-donated/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                console.log('accepted order');
                // Handle success
            } else {
                // Handle failure
                console.log('failure order');
            }
            setRefreshing(prev => !prev);
            setTimeout(() => {
                setRefreshing(false);
            }, 500);
            setButtonLoading(false);
        } catch (error) {
            setButtonLoading(false);
        }
    };

    // cancel-order-donated
    const cancelOrders = async () => {
        setButtonLoading(true);
        const token = state.userData.accessToken;
        const pk = donateSummary.id;
        const formData = new FormData();
        if (reason.name === 'Other') {
            formData.append('cancelled_reason', orderDelText);
        } else {
            formData.append('cancelled_reason', reason.name);
        }
        try {
            const response = await ecommerceApiServiceProvider.post(
                `cancel-donated/${pk}/`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // Handle success
                setCancelModal(false);
                clearAll();
            } else {
                // Handle failure
            }
            navigation.goBack();
            setCancelModal(false);
            setButtonLoading(false);
        } catch (error) {
            setButtonLoading(false);
        }
    };

    //firebase user get function
    useEffect(() => {
        getUserData()
            .then(res => setUsers(res))
            .catch(error => console.log('error', error));
    }, []);

    const getUserData = async () => {
        const userRef = await firestore().collection('users').get();
        const userListData = Promise.all(
            userRef.docs
                .filter(item => {
                    return item.id != userId;
                })
                .map(async item => {
                    const id = item.id;
                    const name = item.data().name;
                    const mail = item.data().mail;
                    return {
                        id,
                        name,
                        mail,
                    };
                }),
        );

        return userListData;
    };

    //firebase filter id
    useEffect(() => {
        if (
            donateSummary &&
            donateSummary.customer_details &&
            donateSummary.customer_details.email
        ) {
            const emailToFind = donateSummary.customer_details.email;
            const matchedUser = users.find(user => user.mail === emailToFind);
            if (matchedUser) {
                setUserIdFromEmail(matchedUser.id);
            } else {
                setUserIdFromEmail(null);
            }
        }
    }, [donateSummary, users]);

    return (
        <View style={{flex: 1}}>
            <Headers headText={'Order Summary'} />
            {loading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#007EA7'}
                />
            ) : (
                <ScrollView
                    bounces={false}
                    refreshControl={
                        <RefreshControl
                            colors={['#003459']}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.mainContainer}>
                    <View style={{flex: 1}}>
                        <View style={styles.container}>
                            <View style={styles.head}>
                                <Text style={styles.name}>
                                    {donateSummary?.customer_details?.name}
                                </Text>
                                <Text style={styles.date}>
                                    {moment(donateSummary?.date_added).format(
                                        'DD MMM YYYY',
                                    )}
                                </Text>
                            </View>
                            <View style={styles.bottom}>
                                <View>
                                    {donateSummary?.product_image ? (
                                        <Image
                                            style={styles.leftImage}
                                            source={{
                                                uri: donateSummary?.product_image,
                                            }}
                                        />
                                    ) : (
                                        <View style={styles.leftImage}></View>
                                    )}
                                </View>
                                <View style={styles.rightBox}>
                                    <Text style={styles.types}>
                                        {donateSummary?.product_name}
                                    </Text>
                                    <Text
                                        numberOfLines={2}
                                        style={styles.discription}>
                                        {donateSummary?.description}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    const chatType = 'donate';
                                    navigation.navigate('EcommerceChatInner', {
                                        item: {
                                            otherUser: {
                                                id: userIdFromEmail,
                                                name: donateSummary
                                                    ?.customer_details?.name,
                                            },
                                        },
                                        userId: userId,
                                        chatType: chatType,
                                        profile:
                                            donateSummary?.customer_details
                                                ?.image,
                                    });
                                }}
                                style={styles.chatcontain}>
                                <View style={styles.chatcontainleft}>
                                    <Message width={32} height={32} />
                                    <Text style={styles.chatname}>
                                        Chat With{' '}
                                        {donateSummary?.customer_details?.name}
                                    </Text>
                                </View>
                                <ArrowRight width={22} height={22} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomButtton}>
                            {donateSummary?.order_status ===
                                'Product Requested' && (
                                <>
                                    <TouchableOpacity
                                        disabled={buttonLoading}
                                        activeOpacity={0.8}
                                        style={styles.accept}
                                        onPress={() => {
                                            acceptOrder();
                                        }}>
                                        {buttonLoading ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#FFF"
                                            />
                                        ) : (
                                            <Text style={styles.acceptText}>
                                                Accept
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.cancel}
                                        onPress={() => {
                                            setCancelModal(true);
                                        }}>
                                        <Text style={styles.cancelText}>
                                            Cancel Order
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
            <ModalBox
                isVisible={cancelModal}
                setVisible={setCancelModal}
                inner={
                    <CancelOrder
                        orderDelText={orderDelText}
                        setOrderDelText={setOrderDelText}
                        close={setCancelModal}
                        errorMessage={errorMessage}
                        setError={setErrorMessage}
                        categoryValue={reason}
                        setCategoryValue={setReason}
                        clearAll={clearAll}
                        cancelOrders={cancelOrders}
                        buttonLoading={buttonLoading}
                    />
                }
            />
        </View>
    );
};

export default DonateSummary;

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
        flex: 1,
    },
    container: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(16),
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    name: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    date: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
    },
    bottom: {
        marginTop: SIZE(16),
        flexDirection: 'row',
    },
    leftImage: {
        height: SIZE(100),
        width: SIZE(100),
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    rightBox: {
        marginLeft: SIZE(16),
        flex: 1,
        justifyContent: 'center',
    },
    types: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        marginBottom: SIZE(12),
    },
    discription: {
        color: '#686868',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
    },
    chatcontain: {
        backgroundColor: '#EAF7FF',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        borderRadius: SIZE(8),
        marginTop: SIZE(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatcontainleft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatname: {
        marginLeft: SIZE(16),
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17.5),
    },
    bottomButtton: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    accept: {
        backgroundColor: '#003459',
        alignItems: 'center',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
    },
    acceptText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    cancel: {
        marginTop: SIZE(8),
        alignItems: 'center',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
    },
    cancelText: {
        color: '#CF2929',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
