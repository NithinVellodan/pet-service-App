import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//constants
import {usersConfigGeneral} from '../../../../axiosConfig';
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//components
import Headers from '../../includes/headers/Headers';
import HistoryItem from './HistoryItem';

//images and logos
import ArrowRight from '../../../assets/icons/profile-icons/arrow-right.svg';

const HistoryPage = () => {
    const {state, dispatch} = useContext(Context);

    const [walletFilter, setWalletFilter] = useState(false);
    const [walletFilterList, setWalletFilterList] = useState(1);
    const [walletCoins, setWalletCoins] = useState('');
    const [wlletItem, setWalletItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getWallet = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigGeneral.get('wallet/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setWalletCoins(response.data.data.coins);
            setWalletItem(response.data.data.wallet_history);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching user profile:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (state.userData.is_login) {
            getWallet();
        }
    }, []);

    useEffect(() => {
        updateUserDate();
    }, [state.readSection.un_read]);

    const renderWalletItem = ({item}) => (
        <HistoryItem item={item} state={state} />
    );

    const updateUserDate = () => {
        dispatch({
            type: 'UPDATE_READ_SECTION',
            readSection: {
                ...state.readSection,
                un_read: false,
            },
        });
    };

    return (
        <View>
            <Headers headText="History" />
            <View
                style={{
                    backgroundColor: '#F7F7F7',
                    width: '100%',
                    paddingHorizontal: SIZE(16),
                    // flex: 1,
                }}>
                <View style={styles.reviewsHead}>
                    <Text allowFontScaling={false} style={styles.reviewsText}>
                        Transactions
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setWalletFilter(prev => !prev);
                        }}
                        style={{
                            borderWidth: SIZE(1),
                            borderColor: '#E2E2E2',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: SIZE(8),
                            paddingHorizontal: SIZE(12),
                            borderRadius: SIZE(6),
                            backgroundColor: '#FFFFFF',
                        }}
                        activeOpacity={0.8}>
                        <Text
                            allowFontScaling={false}
                            style={[styles.reviewsText, {fontSize: SIZE(14)}]}>
                            {(walletFilterList === 1 && 'All') ||
                                (walletFilterList === 2 && 'Credited') ||
                                (walletFilterList === 3 && 'Debited')}
                        </Text>
                        <ArrowRight
                            width={SIZE(16)}
                            height={SIZE(16)}
                            style={{
                                marginLeft: SIZE(10),
                                transform: [
                                    {
                                        rotate: walletFilter
                                            ? '270deg'
                                            : '90deg',
                                    },
                                ],
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {isLoading ? (
                    <ActivityIndicator
                        style={{
                            marginTop: SIZES.height * 0.3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        size="large"
                        color={'#007EA7'}
                    />
                ) : (
                    <FlatList
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        data={wlletItem.filter(item => {
                            if (walletFilterList === 1) {
                                return true;
                            } else if (walletFilterList === 2) {
                                return item.transaction_type === 'credit';
                            } else if (walletFilterList === 3) {
                                return item.transaction_type === 'debit';
                            }
                            return false;
                        })}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderWalletItem}
                    />
                )}
            </View>
            {walletFilter && (
                <View style={styles.filterMain}>
                    <TouchableOpacity
                        onPress={() => {
                            setWalletFilterList(1);
                            setWalletFilter(false);
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.buttonContainerTwo,
                            {
                                marginBottom: SIZE(8),
                                backgroundColor:
                                    walletFilterList === 1
                                        ? '#EAF7FF'
                                        : 'transparent',
                            },
                        ]}>
                        <Text
                            allowFontScaling={false}
                            style={styles.buttonTextTwo}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setWalletFilterList(2);
                            setWalletFilter(false);
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.buttonContainerTwo,
                            {
                                marginBottom: SIZE(8),
                                backgroundColor:
                                    walletFilterList === 2
                                        ? '#EAF7FF'
                                        : 'transparent',
                            },
                        ]}>
                        <Text
                            allowFontScaling={false}
                            style={styles.buttonTextTwo}>
                            Credited
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setWalletFilterList(3);
                            setWalletFilter(false);
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.buttonContainerTwo,
                            {
                                backgroundColor:
                                    walletFilterList === 3
                                        ? '#EAF7FF'
                                        : 'transparent',
                            },
                        ]}>
                        <Text
                            allowFontScaling={false}
                            style={styles.buttonTextTwo}>
                            Debited
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default HistoryPage;

const styles = StyleSheet.create({
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(130),
        position: 'absolute',
        right: SIZE(16),
        top: SIZE(150),
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
    buttonContainerTwo: {
        padding: SIZE(8),
        borderRadius: SIZE(6),
    },
    buttonTextTwo: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(12),
        fontWeight: '600',
        color: '#003459',
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: SIZE(25),
        paddingBottom: SIZE(10),
    },
    reviewsText: {
        color: '#242424',
        fontSize: SIZE(17),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(24),
        letterSpacing: SIZE(0.5),
    },
});
