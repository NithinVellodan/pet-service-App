import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
//packages
import Modal from 'react-native-modal';
import {useToast} from 'react-native-toast-notifications';
import {useStripe, confirmPayment} from '@stripe/stripe-react-native';
//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
//components
import CardSingle from './CardSingle';
import Headers from '../includes/headers/Headers';
//images and logos
import ArrowRightIcon from '../../assets/icons/arrow-right-blue.svg';
import AddIcon from '../../assets/icons/add-circle.svg';
import ArrowRightDarkIcon from '../../assets/icons/arrow-right-dark.svg';
import AddDarkIcon from '../../assets/icons/add-circle-dark.svg';
import SpotLightLogo from '../../assets/icons/emptycard.svg';
import CardModal from '../booking/CardModal';
import {usersConfigCustomer} from '../../../axiosConfig';
import {getCardList} from '../main/ApiSection';

const SavedCards = () => {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const {state} = useContext(Context);
    const [selected, setSelected] = useState();
    const [pk, setPk] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [section, setSection] = useState([]);
    const [existError, setExistError] = useState();
    const toast = useToast();
    const [saveCardLoader, setSaveCardLoader] = useState(false);
    const [loadingList, setLoadingList] = useState(false);

    const handleRemoveItem = id => {
        setPk(id);
    };

    const saveNewCard = async () => {
        setSaveCardLoader(true);
        const access_token = state?.userData?.accessToken;
        usersConfigCustomer
            .post(`cards-adding/`, null, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSaveCardLoader(false);
                initializePaymentSheet(response.data);
            })
            .catch(error => {
                setSaveCardLoader(false);
                console.log('Error:', error.response.data);
            });
    };

    const initializePaymentSheet = async data => {
        const {error} = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            customerId: data.customer,
            customerEphemeralKeySecret: data.ephemeralKey,
            setupIntentClientSecret: data.setup_intent,
            allowsDelayedPaymentMethods: true,
            returnURL: usersConfigCustomer,
        });

        if (!error) {
            setSaveCardLoader(true);

            const {error} = await presentPaymentSheet();
            if (!error) {
                setSaveCardLoader(false);
                setRefreshing(prev => !prev);
                toast.show('Card Added', {
                    type: 'success',
                });
            } else {
                setSaveCardLoader(false);
                setRefreshing(prev => !prev);
            }
        }
    };

    const removeCard = async pk => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;

        try {
            await usersConfigCustomer
                .post(`delete-saved-card/${pk}/`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    setSubmitLoading(false);
                    setRefreshing(prev => !prev);
                    setSection([]);
                    setPk('');
                    toast.show('Card Removed', {
                        type: 'success',
                    });
                })
                .catch(error => {
                    setSubmitLoading(false);
                    setRefreshing(prev => !prev);
                    console.log('error try => ', error.response.data);
                    setPk('');
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    getCardList(setSection, refreshing, setLoadingList);

    return (
        <>
            <Headers headText={'My Saved Cards'} />
            {loadingList ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#003459'}
                />
            ) : (
                <View style={styles.mainContainer}>
                    {section.length === 0 ? (
                        <View style={styles.spotlightMain}>
                            <View style={styles.spotlight}>
                                <SpotLightLogo width={'100%'} height={'100%'} />
                            </View>
                            <View style={styles.bottom}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.mainText}>
                                    No Saved Cards
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.subText}>
                                    Your Saved Card is empty now!
                                </Text>
                                <TouchableOpacity
                                    disabled={saveCardLoader}
                                    onPress={() => {
                                        saveNewCard();
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.button}>
                                    {saveCardLoader ? (
                                        <ActivityIndicator
                                            size={'small'}
                                            color={'#fff'}
                                        />
                                    ) : (
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.buttonText}>
                                            + Add New Card
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View
                            showsVerticalScrollIndicator={false}
                            style={styles.subContainer}>
                            <TouchableOpacity
                                disabled={saveCardLoader}
                                onPress={() => {
                                    saveNewCard();
                                }}
                                activeOpacity={0.8}
                                style={[
                                    styles.addCardButton,
                                    {
                                        borderColor: !state?.userData
                                            ?.is_service
                                            ? '#003459'
                                            : '#009FD3',
                                    },
                                ]}>
                                <View style={styles.addIcon}>
                                    {!state?.userData?.is_service ? (
                                        <AddDarkIcon
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    ) : (
                                        <AddIcon
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
                                </View>
                                <View style={styles.addCardContainer}>
                                    {saveCardLoader ? (
                                        <ActivityIndicator
                                            size={'small'}
                                            color={'#003459'}
                                        />
                                    ) : (
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.addCardText,
                                                {
                                                    color: !state?.userData
                                                        ?.is_service
                                                        ? '#003459'
                                                        : '#009FD3',
                                                },
                                            ]}>
                                            Add New Card
                                        </Text>
                                    )}
                                </View>
                                <View style={styles.arrowIcon}>
                                    {!state?.userData?.is_service ? (
                                        <ArrowRightDarkIcon
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    ) : (
                                        <ArrowRightIcon
                                            height={'100%'}
                                            width={'100%'}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <View style={{height: SIZES.height - SIZE(200)}}>
                                <FlatList
                                    bounces={false}
                                    keyboardShouldPersistTaps={'handled'}
                                    showsVerticalScrollIndicator={false}
                                    data={section}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item, index}) => (
                                        <CardSingle
                                            item={item}
                                            selected={selected}
                                            setSelected={setSelected}
                                            section={section}
                                            setSection={setSection}
                                            id={item.id}
                                            state={state}
                                            removeCard={removeCard}
                                            handleRemoveItem={handleRemoveItem}
                                            pk={pk}
                                            existError={existError}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

export default SavedCards;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F7F7F7',
        flex: 1,
    },
    subContainer: {
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
    },
    addCardButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        borderRadius: SIZE(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(24),
        height: SIZE(50),
    },
    addIcon: {
        width: SIZE(20),
        height: SIZE(20),
    },
    addCardContainer: {},
    addCardText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    arrowIcon: {
        width: SIZE(20),
        height: SIZE(20),
    },
    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
        margin: SIZE(0),
    },
    spotlightMain: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
    button: {
        backgroundColor: '#003459',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
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
