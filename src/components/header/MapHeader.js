import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useState} from 'react';
//packages
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
// components
import MainFilter from '../../screens/filter/MainFilter';
//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import CloseIcon from '../../assets/icons/close-icon-blue.svg';
//images and logos
import LeftArrowIcon from '../../assets/icons/arrow-left.svg';
import FilterIcon from '../../assets/icons/filter.svg';
import SearchIcon from '../../assets/icons/searchblack.svg';
import DotIcon from '../../assets/icons/chat/threedot.svg';

const MapHeader = ({
    isChat,
    isNewArrival,
    is_payment,
    title,
    setChatFilter,
}) => {
    const navigation = useNavigation();
    const [isFilterVisible, setFilterVisible] = useState(false);

    return (
        <>
            <View
                style={[
                    styles.headerContainer,
                    {
                        borderBottomWidth: SIZE(1),
                        borderBottomColor: '#E2E2E2',
                    },
                ]}>
                <View
                    style={[
                        styles.headerLeft,
                        {
                            alignItems:
                                isNewArrival === true || isChat === true
                                    ? 'center'
                                    : '',
                        },
                    ]}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (is_payment === true) {
                                    navigation.navigate('MainHome');
                                } else {
                                    navigation.goBack();
                                }
                            }}
                            activeOpacity={0.8}
                            style={styles.leftArrowContainer}>
                            <LeftArrowIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerMiddleContainer}>
                        <View style={styles.headingOneContainer}>
                            {isNewArrival ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingOne}>
                                    New Arrivals
                                </Text>
                            ) : isChat ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingOne}>
                                    Chat
                                </Text>
                            ) : title === 'Place_to_stay' ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingOne}>
                                    Place to Stay
                                </Text>
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.headingOne}>
                                    Borrow A Pet
                                </Text>
                            )}
                        </View>

                        {isNewArrival || isChat ? (
                            ''
                        ) : (
                            <View style={styles.locationContainer}>
                                <View style={styles.headingTwoContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.headingTwo}>
                                        Ras Al‑Khaimah, Dubai
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.backContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('SearchPage');
                            }}
                            activeOpacity={0.8}
                            style={styles.leftArrowContainer}>
                            <SearchIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[styles.backContainer, {marginRight: SIZE(0)}]}>
                        {isChat ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setChatFilter(prev => !prev);
                                }}
                                activeOpacity={0.8}
                                style={styles.rightDotContainer}>
                                <DotIcon height={SIZE(24)} width={SIZE(24)} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.leftArrowContainer}>
                                <FilterIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
            <Modal
                onBackButtonPress={() => {
                    setFilterVisible(false);
                }}
                onBackdropPress={() => {
                    setFilterVisible(false);
                }}
                isVisible={isFilterVisible}
                backdropOpacity={0.4}
                onRequestClose={() => {
                    setFilterVisible(true);
                }}
                style={[styles.modalContainer]}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                onSwipeComplete={() => {
                    setFilterVisible(false);
                }}
                animationInTiming={500}
                animationOutTiming={500}>
                <ScrollView
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.modalSubContainer}>
                        <TouchableOpacity
                            style={styles.buttonIcon}
                            onPress={() => {
                                setFilterVisible(false);
                            }}>
                            <CloseIcon width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                        <MainFilter setFilterVisible={setFilterVisible} />
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
};

export default MapHeader;

const styles = StyleSheet.create({
    headerContainer: {
        padding: SIZE(16),
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTop: {},
    headerLeft: {
        flexDirection: 'row',
    },
    backContainer: {
        padding: SIZE(8),
        borderRadius: SIZE(24),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        marginRight: SIZE(20),
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    leftArrowContainer: {
        width: SIZE(24),
        height: SIZE(24),
    },
    headerMiddleContainer: {},
    headingOneContainer: {
        marginBottom: SIZE(8),
    },
    headingOne: {
        color: '#00171F',
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        height: SIZE(16),
        width: SIZE(16),
        marginRight: SIZE(8),
    },
    headingTwoContainer: {},
    headingTwo: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    headerRight: {
        flexDirection: 'row',
    },
    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        margin: 0,
        backgroundColor: '#F7F7F7',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
    },
    modalSubContainer: {
        backgroundColor: '#F7F7F7',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        paddingBottom: SIZE(25),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});
