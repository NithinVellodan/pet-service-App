import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
//components
import LoaderRound from '../../includes/pageLoader/LoaderRound';
//constants
import {SIZE} from '../../../theme/theme';
//images and logos
import MenuIcon from '../../../assets/icons/menu.svg';
import SearchIcon from '../../../assets/icons/search-normal.svg';
import BellIcon from '../../../assets/icons/notification-bing.svg';
import AvatarImage from '../../../assets/icons/avatar-new.svg';

const MainHomeHeader = ({navigation, state, pageLoader}) => {
    return (
        <View
            style={[
                styles.headerContainer,
                {
                    backgroundColor: !state.userData.is_service
                        ? '#003459'
                        : '#009FD3',
                },
            ]}>
            <View style={styles.headerLeft}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                    activeOpacity={0.8}
                    style={styles.menuButton}>
                    <MenuIcon width={'100%'} height={'100%'} />
                </TouchableOpacity>
            </View>
            {pageLoader ? (
                <View style={styles.headerRight}>
                    <LoaderRound />
                    <LoaderRound />
                    <LoaderRound />
                </View>
            ) : (
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SearchPage');
                        }}
                        activeOpacity={0.8}
                        style={styles.searchContainer}>
                        <SearchIcon width={'100%'} height={'100%'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.bellContainer}
                        onPress={() => {
                            navigation.navigate('NotificationsPage');
                        }}>
                        <BellIcon
                            activeOpacity={0.8}
                            width={'100%'}
                            height={'100%'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ProfilePage');
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.profileContainer,
                            {
                                borderWidth: state.userData.is_login
                                    ? 0
                                    : SIZE(2),
                            },
                        ]}>
                        {state.userData.is_login && state.userData.photo ? (
                            <View style={{width: SIZE(44), height: SIZE(44)}}>
                                <Image
                                    style={{width: SIZE(44), height: SIZE(44)}}
                                    source={{uri: state.userData.photo}}
                                />
                            </View>
                        ) : (
                            <View
                                style={{
                                    alignItems: 'center',
                                }}>
                                <AvatarImage
                                    width={SIZE(30)}
                                    height={SIZE(30)}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default MainHomeHeader;

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(12),
        backgroundColor: '#009FD3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {},
    menuButton: {
        width: SIZE(32),
        height: SIZE(32),
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZE(164),
    },
    searchContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: SIZE(44),
        height: SIZE(44),
        padding: SIZE(10),
        borderRadius: SIZE(22),
    },
    bellContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: SIZE(44),
        height: SIZE(44),
        padding: SIZE(10),
        borderRadius: SIZE(22),
    },
    profileContainer: {
        width: SIZE(44),
        height: SIZE(44),
        borderColor: '#fff',
        borderRadius: SIZE(100),
        overflow: 'hidden',
        backgroundColor: '#EAF7FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
