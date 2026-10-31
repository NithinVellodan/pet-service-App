import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

// packages
import Modal from 'react-native-modal';
import PetTypes from '../../../filter/includes/PetTypes';
import DateSelection from '../../../filter/includes/DateSelection';
import {ApiGeneral} from '../../../common/ApiGeneral';
import CalendarFilter from '../../../includes/calendar/CalendarFilter';

import {FONTS} from '../../../../theme/fonts';
import {SIZE, SIZES} from '../../../../theme/theme';
import CalenderForLostAndFound from '../../../includes/calendar/CalenderForLostAndFound';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';

const FiterSectionLostAndFound = ({
    setModalVisibleFilter,
    selectedDateRange,
    setSelectedDateRange,
    selectedPet,
    setSelectedPet,
    toastRef,
}) => {
    const [calModalVisible, setCalModalVisible] = useState(false);
    // const [selectedDateRange, setSelectedDateRange] = useState('');
    // const [selectedPet, setSelectedPet] = useState('');
    const [petType, setPetType] = useState([]);

    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
    };
    console.log(selectedDateRange, 'selectedDateRangeselectedDateRange');

    ApiGeneral(setPetType);

    return (
        <>
            <TouchableOpacity
                // disabled={submitLoading}
                activeOpacity={0.8}
                hitSlop={10}
                style={styles.buttonIcon}
                onPress={() => {
                    setModalVisibleFilter(false);
                }}>
                <CloseIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: SIZE(100)}}
                style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <View style={styles.headingContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.filterText}>
                            Filters
                        </Text>
                    </View>
                    <PetTypes
                        setSelectedPet={setSelectedPet}
                        selectedPet={selectedPet}
                        petData={petType}
                        name={'Pet Type'}
                    />
                    <DateSelection
                        setCalModalVisible={setCalModalVisible}
                        selectedDateRange={selectedDateRange}
                        selectedPet={selectedPet}
                        toastRef={toastRef}
                    />
                </View>
                <Modal
                    isVisible={calModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    swipeDirection={['down']}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    onSwipeComplete={() => setCalModalVisible(false)}
                    style={{margin: 0}}
                    onBackdropPress={() => setCalModalVisible(false)}
                    onBackButtonPress={() => setCalModalVisible(false)}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.barContainer}></View>
                        <CalenderForLostAndFound
                            onDateRangeSelected={handleDateRangeSelected}
                            setCalModalVisible={setCalModalVisible}
                            defaultDateRange={selectedDateRange}
                        />
                    </View>
                </Modal>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setModalVisibleFilter(false);
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text style={styles.leftText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.8}
                    style={styles.rightButton}>
                    <Text style={styles.rightText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default FiterSectionLostAndFound;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: SIZE(28),
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(16),
        width: SIZES.width,
    },
    subContainer: {},
    headingContainer: {
        paddingBottom: SIZE(13),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        marginBottom: SIZE(24),
    },
    filterText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    itemContainer: {
        padding: SIZE(15),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    itemHeading: {},
    itemHeadingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(16),
        height: SIZE(16),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        width: SIZES.width * 0.43,
    },
    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        width: SIZES.width * 0.43,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(40),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});
