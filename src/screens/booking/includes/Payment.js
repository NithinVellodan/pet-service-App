import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, {useState} from 'react';

//packages
import Modal from 'react-native-modal';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
//images and logos
import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';
import EditOption from '../../../assets/icons/booking-details/edit-2.svg';
import RemoveOption from '../../../assets/icons/booking-details/trash.svg';

//components
import CardModal from '../CardModal';
import RemoveCardModal from '../../Profile-related/includes/RemoveCardModal';
import {usersConfigGeneral} from '../../../../axiosConfig';

const Payment = ({
    navigation,
    screen_is,
    state,
    removeCard,
    handleRemoveItem,
    section,
    setRemoveModal,
    removeModal,
    pk,
    route,
    bookingPage,
    bookingCardApi,
    submitLoadingCard,
    setSelectedCard,
    saveCardSheet,
    saveCardLoader,
}) => {
    //states
    const [selected, setSelected] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [amount, setAmount] = useState(route ? route.params?.amount : '');

    const moneyAdd = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigGeneral.post(
                'wallet-recharge-card/',
                {
                    amount: amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            setSubmitLoading(false);
            if (screen_is !== 'wallet') {
                navigation.navigate('PaymentSuccess', {
                    screen_is: 'wallet',
                    reference: response.data.transaction_id,
                });
            }
        } catch (error) {
            setSubmitLoading(false);
            console.log('error => ', error);
        }
    };

    return (
        <View
            style={{
                borderWidth: SIZE(1),
                borderColor: '#E2E2E2',
                padding: SIZE(13),
                borderRadius: SIZE(8),
                backgroundColor: '#FFFFFF',
            }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? SIZE(1) : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                        marginBottom: !isVisible ? 0 : SIZE(30),
                    },
                ]}>
                <Text style={styles.subContent1}>
                    {screen_is === 'Cards' ? 'Cards' : 'Card Payment'}
                </Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View>
                    {section?.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom:
                                    index === section?.length - 1 ? 0 : 20,
                            }}>
                            <View style={styles.contentBox}>
                                <View style={styles.topConection}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setSelected(item.id);
                                            setSelectedCard &&
                                                setSelectedCard(item.id);
                                        }}
                                        style={[
                                            styles.selectButton,
                                            {
                                                borderColor:
                                                    selected == item.id
                                                        ? !state?.userData
                                                              ?.is_service
                                                            ? '#009FD3'
                                                            : '#003459'
                                                        : '#969696',
                                            },
                                        ]}>
                                        <View
                                            style={[
                                                styles.selection,
                                                {
                                                    backgroundColor:
                                                        selected == item.id
                                                            ? !state?.userData
                                                                  ?.is_service
                                                                ? '#009FD3'
                                                                : '#003459'
                                                            : '#fff',
                                                },
                                            ]}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.name}>
                                        {item.card.brand
                                            .charAt(0)
                                            .toUpperCase() +
                                            item.card.brand.slice(1)}{' '}
                                        {`***********` + item.card.last4}
                                        {/* ****{item.card_number.slice(-4)} */}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setRemoveModal(true);
                                            handleRemoveItem(item.id);
                                        }}
                                        activeOpacity={0.8}
                                        style={{marginLeft: SIZE(10)}}>
                                        <RemoveOption />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{paddingLeft: SIZE(30)}}>
                                <Text
                                    style={[
                                        styles.phone,
                                        {
                                            marginVertical: SIZE(10),
                                            fontFamily: FONTS.semiBold,
                                            fontWeight: '600',
                                        },
                                    ]}>
                                    {item.cardholder_name}
                                </Text>
                                <Text style={styles.phone}>
                                    Expiry : {item.card.exp_month + '/'}
                                    {item.card.exp_year}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        disabled={saveCardLoader}
                        activeOpacity={0.8}
                        onPress={() => {
                            saveCardSheet();
                        }}
                        style={[
                            styles.button,
                            {
                                borderColor: state?.userData?.is_service
                                    ? '#009FD3'
                                    : '#003459',
                            },
                        ]}>
                        {saveCardLoader ? (
                            <ActivityIndicator
                                size={'small'}
                                color={'#003459'}
                            />
                        ) : (
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459',
                                    },
                                ]}>
                                + Add New Card
                            </Text>
                        )}
                    </TouchableOpacity>
                    {section.length !== 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                if (bookingPage) {
                                    bookingCardApi();
                                } else {
                                    if (amount !== null || amount !== '') {
                                        bookingCardApi();
                                    } else {
                                        if (screen_is !== 'wallet') {
                                            navigation.navigate(
                                                'PaymentSuccess',
                                                {
                                                    screen_is: 'wallet',
                                                },
                                            );
                                        }
                                    }
                                }
                            }}
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: !state?.userData
                                        ?.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                    borderWidth: 0,
                                    marginTop: SIZE(15),
                                },
                            ]}>
                            {bookingPage ? (
                                submitLoadingCard ? (
                                    <ActivityIndicator
                                        size={'small'}
                                        color={'#FFFFFF'}
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            {color: '#FFFFFF'},
                                        ]}>
                                        Pay Now
                                    </Text>
                                )
                            ) : submitLoading ? (
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#FFFFFF'}
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.buttonText,
                                        {color: '#FFFFFF'},
                                    ]}>
                                    Pay Now
                                </Text>
                            )}
                        </TouchableOpacity>
                    ) : null}
                </View>
            )}
            <Modal
                isVisible={removeModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={styles.modalContainer}
                onBackdropPress={() => setRemoveModal(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <RemoveCardModal
                    removeCard={() => removeCard(pk)}
                    setRemoveModal={setRemoveModal}
                    state={state}
                    id={pk}
                    section={section}
                />
            </Modal>
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        marginTop: SIZE(10),
        marginBottom: SIZE(6),
    },
    subContent1: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
    },
    phone: {
        color: '#969696',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
        fontWeight: '500',
    },
    name: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        marginLeft: SIZE(10),
    },

    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(15),
        marginBottom: SIZE(20),
    },
    selectButton: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(100),
    },
    selection: {
        width: SIZE(12),
        height: SIZE(12),
        backgroundColor: 'red',
        borderRadius: SIZE(100),
    },
    topConection: {flexDirection: 'row', alignItems: 'center'},
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderWidth: SIZE(1),
        alignItems: 'center',
        justifyContent: 'center',
        height: SIZE(48),
        borderRadius: SIZE(6),
        marginTop: SIZE(30),
        borderColor: '#003459',
    },
    buttonText: {
        textAlign: 'center',
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
        margin: SIZE(0),
    },
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
    },
});
