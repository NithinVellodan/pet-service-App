import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import TopArrow from '../../../assets/icons/booking-details/arrow-top';
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';
import ArrowLeft from '../../../assets/icons/arrow-left-black.svg';
import {useNavigation} from '@react-navigation/native';
import {PriceDetailsForTrainerSection} from '../../booking/includes/PriceDetails';
import {ApiSectionCustomerTrainerBookingSingle} from '../../main/TrainerApiSection';

const TrainerBookingSingle = ({route, item}) => {
    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();
    const pk = route?.params?.item?.redirect_pk
        ? route?.params?.item?.redirect_pk
        : route?.params?.item?.id;
    const [trainerSingleCustomer, setTrainerSingleCustomer] = useState([]);

    const customerName = trainerSingleCustomer?.customer_name;

    const convertDate = date => {
        const targetDate = new Date(date);
        const options = {day: '2-digit', year: 'numeric', month: 'short'};
        const formattedDate = targetDate
            .toLocaleDateString('en-US', options)
            .replace(',', '');

        return formattedDate;
    };

    const newDate = convertDate(trainerSingleCustomer?.end_date);

    ApiSectionCustomerTrainerBookingSingle(pk, setTrainerSingleCustomer);

    return (
        <FlatList
            bounces={false}
            style={{
                backgroundColor: '#F7F7F7',
            }}
            keyExtractor={item => item.id}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => {
                            if (route?.params?.type === 'notification') {
                                navigation.goBack();
                            } else {
                                navigation.navigate('Bookings', {
                                    selectedFilter: {
                                        id: 3,
                                        type: 'Trainer',
                                        page_type: 'trainer',
                                    },
                                });
                            }
                        }}
                        activeOpacity={0.8}>
                        <ArrowLeft height={SIZE(24)} width={SIZE(24)} />
                    </TouchableOpacity>
                    <View
                        style={{
                            marginLeft: SIZE(20),
                            flexDirection: 'row',
                            alignItems: 'baseline',
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={styles.headerText}>
                            {customerName}
                        </Text>
                    </View>
                    <Text
                        allowFontScaling={false}
                        style={styles.subDateSection}>
                        {newDate}{' '}
                    </Text>
                </View>
            )}
            ListFooterComponent={() => (
                <View>
                    <View style={{padding: SIZE(16)}}>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.dropBox}
                            activeOpacity={0.7}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => [setIsVisible(!isVisible)]}
                                style={[
                                    styles.topBox,
                                    {
                                        borderBottomWidth: isVisible ? 1 : 0,
                                        paddingBottom: !isVisible
                                            ? 0
                                            : SIZE(15),
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.subContent2,
                                        {color: '#00171F'},
                                    ]}>
                                    Services
                                </Text>
                                <View>
                                    {isVisible ? <TopArrow /> : <BottomArrow />}
                                </View>
                            </TouchableOpacity>
                            {isVisible &&
                                trainerSingleCustomer?.services?.map(
                                    (item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                paddingVertical: SIZE(15),
                                                marginBottom: SIZE(10),
                                            }}>
                                            <View style={styles.middleContent}>
                                                <View
                                                    style={{
                                                        width:
                                                            SIZES.width * 0.75,
                                                    }}>
                                                    <Text
                                                        style={styles.subHead}>
                                                        {item?.service_name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.descriptionText
                                                        }>
                                                        Eu pretium vitae aliquet
                                                        lectus enim venenatis
                                                        nunc.{' '}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.highlightBox}>
                                                <Text
                                                    style={
                                                        styles.trainingHours
                                                    }>
                                                    {item?.no_of_hours} hrs
                                                </Text>
                                            </View>
                                        </View>
                                    ),
                                )}
                        </TouchableOpacity>
                        <PriceDetailsForTrainerSection
                            selectedItems={trainerSingleCustomer?.services}
                            price_per_hour={
                                trainerSingleCustomer?.price_per_hour
                            }
                        />
                    </View>
                </View>
            )}
        />
    );
};
const styles = StyleSheet.create({
    header: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(5),
        borderBottomWidth: 1,
        borderBlockColor: '#d2d2d2',
        paddingVertical: SIZE(20),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#F7F7F7',
    },
    headerText: {
        fontSize: SIZE(16),
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(25),
    },
    subDateSection: {
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.regular,
        fontWeight: '600',
        lineHeight: SIZE(25),
    },
    subHead: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    dropBox: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        padding: SIZE(13),
        borderRadius: SIZE(8),
        marginBottom: SIZE(20),
        backgroundColor: '#FFFFFF',
        zIndex: 0,
    },
    middleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightBox: {
        backgroundColor: '#F7F7F7',
        paddingVertical: SIZE(8),
        borderRadius: SIZE(8),
        marginTop: SIZE(15),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        width: SIZES.width * 0.7,
    },
    trainingHours: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        textAlign: 'center',
    },
    topBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#E2E2E2',
    },
    subContent2: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
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
});

export default TrainerBookingSingle;
