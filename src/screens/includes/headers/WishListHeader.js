import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

// package
import {useNavigation, useRoute} from '@react-navigation/native';
import {Context} from '../../../contexts/Store';

// thems
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

// Icons
import ArrowLeft from '../../../assets/icons/arrow-left-black.svg';
import SearchClose from '../../../assets/icons/close-button.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import Search from '../../homeScreens/includes/Search';

const WishListHeader = ({
    headText,
    isSearch,
    setIsSearch,
    setWishListSearchQuery,
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isSearch ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setIsSearch(false);
                            setWishListSearchQuery('');
                        }}>
                        <SearchClose height={SIZE(40)} width={SIZE(40)} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => {
                            if (isSearch) {
                                setIsSearch(false);
                            } else {
                                navigation.goBack();
                            }
                        }}
                        activeOpacity={0.8}>
                        <ArrowLeft height={SIZE(24)} width={SIZE(24)} />
                    </TouchableOpacity>
                )}
                {isSearch ? (
                    <Search setSearchQuery={setWishListSearchQuery} />
                ) : (
                    <View style={{marginLeft: SIZE(20)}}>
                        <Text
                            allowFontScaling={false}
                            style={styles.headerText}>
                            {headText}
                        </Text>
                    </View>
                )}
            </View>

            {!isSearch && (
                <>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            setIsSearch(!isSearch);
                        }}
                        style={styles.rightDotContainer}>
                        <SearchIcon height={SIZE(24)} width={SIZE(24)} />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default WishListHeader;

const styles = StyleSheet.create({
    container: {
        borderColor: '#0000001A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SIZE(68),
        backgroundColor: '#f7f7f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(16),
    },
    back: {
        backgroundColor: '#fff',
        height: SIZE(40),
        width: SIZE(40),
        borderRadius: SIZE(61),
        alignItems: 'center',
        padding: SIZE(5),
        justifyContent: 'center',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headerText: {
        fontSize: SIZE(20),
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(25),
    },
    rightTextContainer: {
        marginRight: SIZE(16),
    },
    rightDotContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(40),
        backgroundColor: '#FFFFFF',
        height: SIZE(40),
        width: SIZE(40),
    },
    rightText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
