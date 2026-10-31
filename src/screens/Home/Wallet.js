import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    FlatList,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';

//packages
import {useFocusEffect} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import {usersConfigGeneral} from '../../../axiosConfig';

//components
import AddWalletMoney from './includes/AddWalletMony';
import WalletHistory from './includes/WalletHistory';
import WalletInstantWithdraw from './includes/WalletInstantWithdraw';
import ViewAll from '../main/ecommerce/includes/ViewAll';
import HistoryItem from './includes/HistoryItem';
import ModalScreen from '../Profile-related/ModalScreen';
import UserLogin from '../booking/includes/UserLogin';

//images and logos
import WalletIcon from '../../assets/icons/wallet-icon.svg';

const Wallet = ({navigation}) => {
    const {state} = useContext(Context);
    const [selectedItem, setSelectedItem] = useState(1);
    const [walletFilter, setWalletFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [walletFilterList, setWalletFilterList] = useState(1);
    const [walletCoins, setWalletCoins] = useState('');
    const [wlletItem, setWalletItem] = useState([]);
    const [isType, setType] = useState('mail');
    const [userModal, setUserModal] = useState(false);
    const [screen, setScreen] = useState(false);
    const [is_Firbase, setIs_Firbase] = useState({
        is_fireBase: false,
        email: '',
        google_id_token: '',
    });

    const buttonSection = [
        {id: 1, name: 'Recharge'},
        {id: 2, name: state.userData.is_service ? 'Withdraw' : 'History'},
    ];

    const switchRender = () => {
        return (
            <View style={styles.buttonContainer}>
                {buttonSection.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedItem(item.id)}
                        style={[
                            styles.button,
                            {
                                backgroundColor:
                                    selectedItem === item.id
                                        ? !state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459'
                                        : 'transparent',
                            },
                        ]}
                        key={index}>
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    color:
                                        selectedItem === item.id
                                            ? '#FFFFFF'
                                            : '#242424',
                                },
                            ]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

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
            setIsLoading(false);
            console.log('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        if (state.userData.is_login) {
            getWallet();
        }
    }, [selectedItem]);

    useFocusEffect(
        React.useCallback(() => {
            getWallet();
            return () => {};
        }, []),
    );

    const renderTop = () => {
        return (
            <>
                <ImageBackground
                    source={
                        !state?.userData?.is_service
                            ? require('../../assets/images/wallet.png')
                            : require('../../assets/images/wallet2.png')
                    }
                    style={styles.imageBackground}>
                    <View style={styles.flexOption}>
                        <WalletIcon width={SIZE(25)} height={SIZE(25)} />
                        <Text style={styles.walletBalance}>Wallet Balance</Text>
                    </View>
                    <Text style={styles.amount}>AED {walletCoins}</Text>
                </ImageBackground>
                {switchRender()}
            </>
        );
    };

    return (
        <View style={{flex: 1}}>
            {selectedItem === 1 && (
                <ScrollView
                    bounces={false}
                    contentContainerStyle={{
                        paddingBottom: SIZE(30),
                    }}
                    showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            backgroundColor: '#F7F7F7',
                            alignItems: 'center',
                            paddingTop: SIZE(30),
                        }}>
                        {renderTop()}
                        <AddWalletMoney
                            navigation={navigation}
                            state={state}
                            setUserModal={setUserModal}
                            setScreen={setScreen}
                        />
                    </View>
                    {state.userData.is_service ? (
                        <View style={styles.historyMain}>
                            <ViewAll
                                onPress={() =>
                                    navigation.navigate('HistoryPage')
                                }
                                label={'History'}
                                wallet={true}
                            />
                            <View style={styles.divider}></View>
                            {wlletItem.slice(0, 4).map((item, index) => (
                                <View key={index}>
                                    <HistoryItem
                                        item={item}
                                        state={state}
                                        walletMain={true}
                                    />
                                </View>
                            ))}
                        </View>
                    ) : null}
                </ScrollView>
            )}
            {selectedItem === 2 && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#F7F7F7',
                        alignItems: 'center',
                        paddingTop: SIZE(30),
                    }}>
                    {renderTop()}
                    {state?.userData?.is_service ? (
                        <WalletInstantWithdraw
                            walletBalance={walletCoins}
                            state={state}
                        />
                    ) : (
                        <>
                            <WalletHistory
                                wlletItem={wlletItem}
                                setWalletFilter={setWalletFilter}
                                walletFilter={walletFilter}
                                walletFilterList={walletFilterList}
                                isLoading={isLoading}
                            />

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
                        </>
                    )}
                </View>
            )}
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={
                    <UserLogin
                        isType={isType}
                        close={setUserModal}
                        screen={screen}
                        is_Firbase={is_Firbase}
                        setIs_Firbase={setIs_Firbase}
                    />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    imageBackground: {
        width: SIZE(396),
        height: SIZE(126),
        borderRadius: SIZE(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZE(30),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SIZE(396),
        borderWidth: SIZE(1),
        padding: SIZE(3),
        borderRadius: SIZE(6),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: SIZE(190),
        padding: SIZE(10),
        borderRadius: SIZE(6),
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
    },
    walletBalance: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontWeight: '400',
        fontSize: SIZE(14),
        color: '#FFFFFF',
        marginLeft: SIZE(10),
    },
    amount: {
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(25),
        color: '#FFFFFF',
        marginTop: SIZE(5),
    },
    historyMain: {
        padding: SIZE(16),
        backgroundColor: '#F7F7F7',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginHorizontal: SIZE(12),
        marginVertical: SIZE(16),
    },
    divider: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        marginTop: SIZE(13),
        marginBottom: SIZE(13),
    },
    flexOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterMain: {
        padding: SIZE(12),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        width: SIZE(130),
        position: 'absolute',
        right: SIZE(16),
        top: SIZE(310),
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
});

export default Wallet;
