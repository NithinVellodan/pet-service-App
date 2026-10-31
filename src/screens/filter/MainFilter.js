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

// constants
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// components
import PetTypes from './includes/PetTypes';
import DateSelection from './includes/DateSelection';

// svg
import RangeSelection from './includes/RangeSelection';
import {ApiGeneral} from '../common/ApiGeneral';
import CalendarFilter from '../includes/calendar/CalendarFilter';

const MainFilter = ({
    filterPage,
    onlyModal,
    toastRef,
    bottomSheetRef,
    setShowSectionList,
    setFilterData,
}) => {
    //states

    const [low, setLow] = useState(null);
    const [high, setHigh] = useState(null);
    const [calModalVisible, setCalModalVisible] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    const [values, setValues] = useState([100, 250]);
    const [petType, setPetType] = useState([]);

    const handleDateRangeSelected = (startDate, endDate) => {
        setSelectedDateRange({startDate, endDate});
    };

    ApiGeneral(setPetType);

    return (
        <>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: SIZE(100)}}
                style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.subContainer}>
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
                    <RangeSelection values={values} setValues={setValues} />
                    <DateSelection
                        setCalModalVisible={setCalModalVisible}
                        selectedDateRange={selectedDateRange}
                        selectedPet={selectedPet}
                        toastRef={toastRef}
                    />
                </TouchableOpacity>
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
                        <CalendarFilter
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
                        filterPage();
                    }}
                    activeOpacity={0.8}
                    style={styles.leftButton}>
                    <Text style={styles.leftText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (onlyModal) {
                            filterPage();
                        } else {
                            setFilterData({
                                pet_type: selectedPet,
                                min_price: values[0],
                                max_price: values[1],
                                start_date:
                                    selectedDateRange &&
                                    `${selectedDateRange.startDate.getFullYear()}-${
                                        selectedDateRange.startDate.getMonth() +
                                        1
                                    }-${selectedDateRange.startDate.getDate()}`,
                                end_date:
                                    selectedDateRange &&
                                    `${selectedDateRange.endDate.getFullYear()}-${
                                        selectedDateRange.endDate.getMonth() + 1
                                    }-${selectedDateRange.endDate.getDate()}`,
                            });
                            bottomSheetRef.current.snapToIndex(2);
                            filterPage();
                        }
                    }}
                    activeOpacity={0.8}
                    style={styles.rightButton}>
                    <Text style={styles.rightText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default MainFilter;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(28),
        backgroundColor: '#F7F7F7',
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
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(24),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        width: SIZES.width * 0.4,
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
        width: SIZES.width * 0.4,
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
});
