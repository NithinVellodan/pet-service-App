import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

//images and logos
import ArrowRight from '../../assets/icons/profile-icons/arrow-right.svg';
import ArrowDown from '../../assets/icons/profile-icons/arrow-down.svg';
import DeleteAccount from './DeleteAccount';
import ModalScreen from './ModalScreen';
import AddBankAccount from './AddBankAccount';
import {Context} from '../../contexts/Store';
import {usersConfigGeneral} from '../../../axiosConfig';

const boxWidth = SIZES.width - SIZE(32);
const ProfileSectionList = ({item, state, setImageTool, data}) => {
    const navigation = useNavigation();

    const [deleteModal, setDeleteModal] = useState('delete-account');
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const [bankAdd, setBankAdd] = useState(false);
    const [bankDetails, setBankDetails] = useState({});

    const bankAccount = async () => {
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigGeneral.get(
                'view-bank-account/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setBankDetails(response.data.data);
        } catch (error) {
            console.log('Error fetching user profile:', error.response.data);
        }
    };

    useEffect(() => {
        bankAccount();
    }, [reload]);

    const reload = () => {
        bankAccount();
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                setImageTool(false);
                if (item.id === '5') {
                    setDeleteModalShow(true);
                } else if (item.id === '3') {
                    navigation.navigate('Privacy Policy');
                } else if (item.id === '4') {
                    navigation.navigate('Terms & Condition');
                } else if (item.id === '2') {
                    navigation.navigate('AboutUs');
                }
            }}
            key={item.id}
            style={[
                styles.mainContent,
                {
                    borderWidth: SIZE(1),
                    marginBottom: SIZE(15),
                    width: boxWidth - SIZE(30),
                    borderRadius: SIZE(6),
                    backgroundColor: '#F7F7F7',
                    paddingVertical: SIZE(10),
                },
            ]}>
            <View style={styles.topLeftContent}>
                {item.icon}
                <Text allowFontScaling={false} style={styles.name1}>
                    {item.title}
                </Text>
            </View>
            <View>
                <ArrowRight width={SIZE(20)} height={SIZE(20)} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                borderWidth: SIZE(1),
                borderColor: '#E2E2E2',
                borderRadius: SIZE(6),
                width: boxWidth,
                marginBottom: SIZE(10),
                backgroundColor: '#fff',
            }}>
            <View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        setImageTool(false);
                        setVisible(!visible);
                        if (item.title === 'My Saved Cards') {
                            navigation.navigate('SavedCards');
                        } else if (
                            item.title === 'My Reviews' &&
                            state?.userData?.is_service
                        ) {
                            navigation.navigate('MyReviews');
                        } else if (
                            item.title === 'My Pets' &&
                            state?.userData?.is_service
                        ) {
                            navigation.navigate('PlaceToStay', {
                                type: 'BorrowAPet',
                                type2: 'MyPet',
                            });
                        } else if (
                            item.title === 'My Pets' &&
                            !state?.userData?.is_service
                        ) {
                            navigation.navigate('MyPetsCustomer');
                        } else if (
                            item.title === 'My Places' &&
                            state?.userData?.is_service
                        ) {
                            navigation.navigate('MyPlaces');
                        } else if (
                            item.title === 'My Reviews' &&
                            !state.userData.is_service
                        ) {
                            navigation.navigate('CustomerReviews');
                        } else if (item.title === 'Address') {
                            navigation.navigate('CustomerAddresses');
                        } else if (item.title === 'Bank Account') {
                            if (!bankDetails) {
                                setModalFilter(true);
                            }
                        }
                    }}
                    style={styles.mainContent}>
                    <View style={styles.topLeftContent}>
                        {item.icon}
                        <Text allowFontScaling={false} style={styles.name}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={{}}>
                        {item.title === 'Bank Account' && !bankDetails ? (
                            <Text
                                style={[
                                    styles.bankAccount,
                                    {
                                        color: !state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459',
                                    },
                                ]}>
                                Add Account
                            </Text>
                        ) : (
                            <>
                                {item.title === 'My Saved Cards' ||
                                item.title === 'My Reviews' ||
                                item.title === 'My Pets' ||
                                item.title === 'Address' ||
                                item.title === 'My Places' ? (
                                    <ArrowRight
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                ) : visible ? (
                                    <ArrowDown
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                ) : (
                                    <ArrowRight
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                )}
                            </>
                        )}
                    </View>
                </TouchableOpacity>
                {bankDetails && item.title === 'Bank Account' && visible && (
                    <View style={styles.bankDetailContainer}>
                        <View>
                            <View>
                                <Text style={styles.bankName}>
                                    {bankDetails?.bank_name ?? '--'}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.bankAccountNumber}>
                                    {bankDetails?.account_number
                                        ? 'X'.repeat(
                                              bankDetails.account_number
                                                  .length - 4,
                                          ) +
                                          bankDetails.account_number.slice(-4)
                                        : ''}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalFilter(true);
                            }}>
                            <Text
                                style={[
                                    styles.bankName2,
                                    {
                                        color: !state?.userData?.is_service
                                            ? '#009FD3'
                                            : '#003459',
                                    },
                                ]}>
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {visible && (
                <FlatList
                    bounces={false}
                    data={item.section}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{alignItems: 'center', backgroundColor: '#FFFFFF'}}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <ModalScreen
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                isVisible={deleteModalShow}
                setVisible={setDeleteModalShow}
                inner={
                    <DeleteAccount
                        close={setDeleteModalShow}
                        setDeleteModal={setDeleteModal}
                        deleteModal={deleteModal}
                    />
                }
            />
            <ModalScreen
                isVisible={modalFilter}
                setVisible={setModalFilter}
                inner={
                    <AddBankAccount
                        setModalFilter={setModalFilter}
                        setBankAdd={setBankAdd}
                        edit={bankDetails ? true : false}
                        reload={reload}
                        bankDetails={bankDetails}
                    />
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    mainContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE(20),
        paddingVertical: SIZE(12),
        borderColor: '#E2E2E2',
    },
    topLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        fontSize: SIZE(16),
        marginLeft: SIZE(16),
        color: '#242424',
    },
    name1: {
        fontFamily: FONTS.regular,
        fontWeight: '600',
        fontSize: SIZE(15),
        marginLeft: SIZE(16),
        color: '#242424',
    },
    bankAccount: {
        color: '#003459',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
    },
    bankDetailContainer: {
        flexDirection: 'row',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        backgroundColor: '#F7F7F7',
        marginHorizontal: SIZE(16),
        marginBottom: SIZE(16),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: SIZE(6),
    },
    bankName: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
    },
    bankAccountNumber: {
        color: '#969696',
        fontSize: SIZE(14),
        fontFamily: FONTS.semiBold,
    },
    bankName2: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
    },
});

export default ProfileSectionList;
