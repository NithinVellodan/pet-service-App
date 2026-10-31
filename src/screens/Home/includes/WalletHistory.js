import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useEffect, useContext} from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//components
import HistoryItem from './HistoryItem';

//images and logos
import ArrowRight from '../../../assets/icons/profile-icons/arrow-right.svg';

const WalletHistory = ({
    setWalletFilter,
    walletFilter,
    walletFilterList,
    wlletItem,
    isLoading,
}) => {
    const {state, dispatch} = useContext(Context);

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
        <>
            {isLoading ? (
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
                <View
                    style={{
                        backgroundColor: '#F7F7F7',
                        width: '100%',
                        paddingHorizontal: SIZE(16),
                        flex: 1,
                    }}>
                    <View style={styles.reviewsHead}>
                        <Text
                            allowFontScaling={false}
                            style={styles.reviewsText}>
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
                                style={[
                                    styles.reviewsText,
                                    {fontSize: SIZE(14)},
                                ]}>
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
                </View>
            )}
        </>
    );
};
const styles = StyleSheet.create({
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
    },
    buttonIndex: {
        borderWidth: SIZE(1),
        borderColor: '#003459',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
    },
    bottomButtonText: {
        fontFamily: FONTS.semiBold,
        color: '#003459',
        fontSize: SIZE(15),
    },
    headercontainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderColor: '#0000001A',
        alignItems: 'center',
        marginBottom: SIZE(30),
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(100),
        backgroundColor: '#fff',
        marginRight: SIZE(20),
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

export default WalletHistory;
