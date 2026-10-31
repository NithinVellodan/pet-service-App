import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

//packages
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

//constants
import {SIZE} from '../theme/theme';
import {FONTS} from '../theme/fonts';
import {Context} from '../contexts/Store';

//images and logos
import MessageEdit from '../assets/icons/profile-icons/message-edit.svg';
import Devices from '../assets/icons/profile-icons/profile-dark.svg';
import DevicesLight from '../assets/icons/profile-icons/devices-light.svg';
import Contact from '../assets/icons/profile-icons/contact-dark.svg';
import ContactLight from '../assets/icons/user-light.svg';
import ArrowRight from '../assets/icons/profile-icons/arrow-right.svg';
import AvatarImage from '../assets/icons/avatar-new.svg';

const DrawerContent = ({navigation}) => {
    const {state, dispatch} = useContext(Context);
    const handleProvider = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContent}>
                <View style={styles.imageComponent}>
                    {state.userData.is_login && state.userData.photo ? (
                        <View>
                            <Image
                                style={{width: SIZE(50), height: SIZE(50)}}
                                source={{uri: state.userData.photo}}
                            />
                        </View>
                    ) : (
                        <View
                            style={{
                                alignItems: 'center',
                            }}>
                            <AvatarImage width={SIZE(50)} height={SIZE(50)} />
                        </View>
                    )}
                </View>

                <View style={styles.middleContent}>
                    <Text
                        numberOfLines={2}
                        allowFontScaling={false}
                        style={styles.name}>
                        {state.userData.is_login
                            ? state.userData.name
                            : 'Guest'}
                    </Text>
                    <Text allowFontScaling={false} style={styles.subName}>
                        {state.userData.is_service
                            ? 'Service Provider'
                            : 'Customer'}
                    </Text>
                </View>
            </View>
            <DrawerContentScrollView style={styles.drawerScroll}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate('FaqSection');
                    }}
                    style={styles.feedBackButtonContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MessageEdit width={SIZE(25)} height={SIZE(25)} />
                        <DrawerItem
                            style={styles.drawerItemMain}
                            label="Feedback"
                            onPress={() => {
                                navigation.navigate('FaqSection');
                            }}
                            labelStyle={styles.drawerLabelText}
                        />
                    </View>

                    <ArrowRight width={SIZE(20)} height={SIZE(20)} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate('FaqSection');
                    }}
                    style={styles.feedBackButtonContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MessageEdit width={SIZE(25)} height={SIZE(25)} />
                        <DrawerItem
                            style={styles.drawerItemMain}
                            label="FAQ"
                            onPress={() => {
                                navigation.navigate('FaqSection');
                            }}
                            labelStyle={styles.drawerLabelText}
                        />
                    </View>

                    <ArrowRight width={SIZE(20)} height={SIZE(20)} />
                </TouchableOpacity>
            </DrawerContentScrollView>
            {/* Drawer Changer */}
            <View>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.toSwitch}>Switch to</Text>
                </View>
                <View style={styles.drawerChanger}>
                    <TouchableOpacity
                        disabled={!state.userData.is_service && true}
                        onPress={() => {
                            navigation.toggleDrawer();
                            handleProvider({
                                ...state.userData,
                                is_temp: false,
                            });

                            if (!state.userData.is_login) {
                                navigation.navigate('MainHome', {
                                    goto: 'login',
                                });
                            } else if (!state.userData.isPetDetailsAdded) {
                                navigation.navigate('MainHome', {
                                    goto: 'detail',
                                });
                            } else if (
                                state.userData.is_login &&
                                state.userData.isPetDetailsAdded
                            ) {
                                navigation.navigate('MainHome');
                            }
                        }}
                        activeOpacity={0.8}
                        style={{
                            ...styles.drawerCustomer,
                            backgroundColor: !state.userData.is_service
                                ? '#003459'
                                : null,
                            borderColor: state.userData.is_service
                                ? '#98C1D9'
                                : '#9aaebb',
                            borderWidth: 1, // You can adjust the width of the border as needed
                        }}>
                        <View
                            style={{
                                ...styles.drawerCustomerIcon,
                                backgroundColor: state.userData.is_service
                                    ? '#fff'
                                    : '#rgba(234, 247, 255, 0.10)',
                            }}>
                            {!state.userData.is_service ? (
                                <Contact width={SIZE(24)} height={SIZE(24)} />
                            ) : (
                                <ContactLight
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            )}
                        </View>
                        <Text
                            style={[
                                styles.drawerCustomerText,
                                {
                                    color: state.userData.is_service
                                        ? '#003459'
                                        : '#fff',
                                },
                            ]}>
                            Customer
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={state.userData.is_service && true}
                        onPress={() => {
                            navigation.toggleDrawer();
                            if (
                                state.userData.is_login &&
                                state.userData.isPetDetailsAdded
                            ) {
                                handleProvider({
                                    ...state.userData,
                                    is_service: true,
                                });
                            } else {
                                handleProvider({
                                    ...state.userData,
                                    is_temp: false,
                                });

                                if (!state.userData.is_login) {
                                    navigation.navigate('MainHome', {
                                        goto: 'login',
                                    });
                                } else if (!state.userData.isPetDetailsAdded) {
                                    navigation.navigate('MainHome', {
                                        goto: 'detail',
                                    });
                                } else if (
                                    state.userData.is_login &&
                                    state.userData.isPetDetailsAdded
                                ) {
                                    navigation.navigate('MainHome');
                                }
                            }
                        }}
                        activeOpacity={0.8}
                        style={{
                            ...styles.drawerProvide,

                            backgroundColor: state.userData.is_service
                                ? '#009FD3'
                                : '#F7F7F7',
                            borderColor: state.userData.is_service
                                ? '#9aaebb'
                                : '#98C1D9',
                            borderWidth: 1,
                        }}>
                        <View
                            style={{
                                ...styles.drawerProvideIcon,
                                backgroundColor: !state.userData.is_service
                                    ? '#fff'
                                    : 'rgba(234, 247, 255, 0.10)',
                            }}>
                            {!state.userData.is_service ? (
                                <DevicesLight
                                    width={SIZE(24)}
                                    height={SIZE(24)}
                                />
                            ) : (
                                <Devices width={SIZE(24)} height={SIZE(24)} />
                            )}
                        </View>
                        <Text
                            style={[
                                styles.drawerProvideText,
                                {
                                    color: state.userData.is_service
                                        ? '#fff'
                                        : '#003459',
                                },
                            ]}>
                            Service Provider
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F7F7F7',
        flex: 1,
        paddingHorizontal: SIZE(16),
        borderTopRightRadius: SIZE(12),
        borderBottomRightRadius: SIZE(12),
        paddingTop: SIZE(20),
        paddingBottom: SIZE(40),
        width: SIZE(270),
    },
    middleContent: {
        marginLeft: SIZE(20),
        width: SIZE(140),
    },
    topContent: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#98C1D9',
        borderRadius: SIZE(12),
        padding: SIZE(16),
        marginBottom: SIZE(48),
        backgroundColor: '#EAF7FF',
    },
    name: {
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginBottom: SIZE(6),
        color: '#242424',
    },
    subName: {
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        fontWeight: '600',
        color: '#969696',
    },
    drawerScroll: {
        backgroundColor: '#F7F7F7',
    },
    feedBackButtonContainer: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderColor: '#d2d2d2',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SIZE(16),
    },
    drawerItemMain: {
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        width: SIZE(150),
    },
    drawerLabelText: {
        color: '#969696',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    image: {
        width: null,
        height: null,
        flex: 1,
    },
    imageComponent: {
        height: SIZE(50),
        width: SIZE(50),
        borderRadius: SIZE(100),
        overflow: 'hidden',
        borderWidth: SIZE(2),
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toSwitch: {
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(12),
    },
    likeToSwitch: {
        textAlign: 'center',
        marginBottom: SIZE(16),
        lineHeight: SIZE(17),
        color: '#969696',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    drawerChanger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    drawerCustomer: {
        width: SIZE(115),
        marginRight: SIZE(8),
        paddingVertical: SIZE(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZE(8),
    },
    drawerProvide: {
        width: SIZE(115),
        paddingVertical: SIZE(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZE(8),
    },
    drawerCustomerIcon: {
        padding: SIZE(10),
        borderRadius: SIZE(6),
        marginBottom: SIZE(12),
    },
    drawerProvideIcon: {
        padding: SIZE(10),
        borderRadius: SIZE(6),
        marginBottom: SIZE(12),
    },
    drawerCustomerText: {
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
        color: '#003459',
    },
    drawerProvideText: {
        fontSize: SIZE(12),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(15),
    },
});

export default DrawerContent;
