import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';

// packages
import ToggleSwitch from 'toggle-switch-react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Modal from 'react-native-modal';

import ArrowLeft from '../../assets/icons/arrowleft.svg';
import ShareIcon from '../../assets/icons/share.svg';
import Reviews from './includes/Reviews';

import CloseIcon from '../../assets/icons/close-icon-blue.svg';
import Edit from '../../assets/icons/edit.svg';
import Location from '../../assets/icons/booking/location.svg';
import Info from '../../assets/icons/infocircle.svg';
import Sleep from '../../assets/icons/sleep.svg';
import Groom from '../../assets/icons/groom.svg';
import Feed from '../../assets/icons/feed.svg';
import PlayDark from '../../assets/icons/playdark.svg';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import BookingsSingle from './includes/BookingsSingle';
import EditModal from './includes/EditModal';
import AddBreedModal from './includes/AddBreedModal';

const PlaceToStaySingle = ({navigation, route}) => {
    const [isOn, setIsOn] = useState(false);
    const [bookingID, setBookingID] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShow, setIsShow] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [breedModalVisible, setBreedModalVisible] = useState(false);

    // Demo Items
    const pet_data = [
        {
            id: 1,
            name: 'Dog',
            quantity: 1,
            price: 100,
            info: '3 months dogs can accommodate',
        },
        {
            id: 2,
            name: 'Cat',
            quantity: 2,
            price: 80,
            info: '2 months dogs can accommodate',
        },
        {
            id: 3,
            name: 'Bird',
            quantity: 1,
            price: 70,
            info: '1 months dogs can accommodate',
        },
    ];
    const COMMENTS = [
        {
            id: 1,
            name: 'Carter Geidt',
        },
        {
            id: 2,
            name: 'Miracle Bator',
        },
        {
            id: 3,
            name: 'Charlie Franci',
        },
    ];

    const BOOKING_STATUS = [
        {
            id: 1,
            customer: 'Makenna Philips',
            Breed: 'Rottweiler',
            status: 'Ongoing',
            category: 'Dog',
            age: 1,
            no_days: 6,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
        {
            id: 2,
            customer: 'Roger Stanton',
            Breed: 'Rottweiler',
            status: 'Expired',
            category: 'Dog',
            age: 1,
            no_days: 5,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
        {
            id: 3,
            customer: 'Tatiana Carder',
            Breed: 'Rottweiler',
            status: 'Expired',
            category: 'Dog',
            age: 1,
            no_days: 3,
            place: 'Ras Al‑Khaimah, Dubai',
            Rate: 800,
        },
    ];

    const spotlightData = [
        {
            id: 1,
            image: require('../../assets/images/singlespotlight.png'),
        },
        {
            id: 2,
            image: require('../../assets/images/singlespotlight.png'),
        },
        {
            id: 3,
            image: require('../../assets/images/singlespotlight.png'),
        },
    ];

    const facilitiesData = [
        {
            id: 1,
            name: 'Sleeping Areas',
            icon: <Sleep width={SIZE(20)} height={SIZE(20)} />,
            image: require('../../assets/images/sleeping.png'),
        },
        {
            id: 2,
            name: 'Feeding Stations',
            icon: <Feed width={SIZE(20)} height={SIZE(20)} />,
            image: require('../../assets/images/sleeping.png'),
        },
        {
            id: 3,
            name: 'Play Areas',
            icon: <PlayDark width={SIZE(20)} height={SIZE(20)} />,
            image: require('../../assets/images/sleeping.png'),
        },
        {
            id: 4,
            name: 'Grooming',
            icon: <Groom width={SIZE(20)} height={SIZE(20)} />,
            image: require('../../assets/images/sleeping.png'),
        },
    ];

    const petSingleData = {
        id: 1,
        petSingleTitle: 'Paw and Whiz Petcare',
        petSingleDescription:
            'Eu pretium vitae aliquet lectus enim venenatis nunc. Mi nulla arcu in interdum nisl erat sit tempus. Sapien maecenas arcu iaculis diam etiam molestie purus velit. At sagittis eget sed quis semper at convallis habitant. Sit.',
        petSingleLocation: 'Ras Al‑Khaimah, Dubai',
        petSingleAbout:
            'Penatibus purus semper mattis nulla. Platea cras bibendum dictum fusce nunc rutrum. Massa cursus ut et aliquet. Nulla integer metus euismod lectus sit mi accumsan sed eros. Faucibus imperdiet augue massa quis ac. Vel in aliquam id tempor facilisi netus gravida vitae. Pretium vehicula ullamcorper suspendisse lectus purus faucibus ipsum tristique porttitor. Mi euismod.',
    };

    const [title, setTitle] = useState(
        petSingleData?.petSingleTitle ? petSingleData.petSingleTitle : '',
    );

    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState(
        petSingleData.petSingleDescription
            ? petSingleData.petSingleDescription
            : '',
    );
    const [aboutService, setAboutService] = useState(
        petSingleData.petSingleAbout ? petSingleData.petSingleAbout : '',
    );
    const [geoAddressText, setGeoAddressText] = useState(
        petSingleData.petSingleLocation ? petSingleData.petSingleLocation : '',
    );
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState('');

    const visibleFacilities = showAll
        ? facilitiesData
        : facilitiesData.slice(0, 3);

    const handleViewMore = () => {
        setShowAll(true);
    };
    //openModal function
    const openModal = facility => {
        setSelectedFacility(facility);
        setModalVisible(true);
    };

    const openMapsApp = (latitude, longitude) => {
        const url = Platform.select({
            ios: `maps://app?daddr=${latitude},${longitude}&amp;ll=`,
            android: `geo:${latitude},${longitude}?q=`,
        });

        Linking.openURL(url);
    };

    // Function to handle pressing in and out
    const handlePress = itemId => {
        // Clear existing timeout if any
        clearTimeout(timeoutId);

        // Set isShow to the ID of the pressed item
        setIsShow(itemId);

        // Set a new timeout to reset isShow after 2 seconds
        const newTimeoutId = setTimeout(() => {
            setIsShow(null);
        }, 1000);

        // Save the timeout ID for cleanup
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId]);

    return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.topImageContainer}>
                    <View style={styles.commonButtonContainer}>
                        <View style={styles.topButtonLeft}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <ArrowLeft width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topButtonRight}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.commonButtonMain,
                                    {marginRight: SIZE(16)},
                                ]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setEditModalVisible(true);
                                }}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <Edit width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <SwiperFlatList
                        onChangeIndex={index => setCurrentIndex(index.index)}
                        data={
                            images.length > 0
                                ? images.map(item => ({
                                      image: {uri: item.path},
                                  }))
                                : spotlightData
                        }
                        renderItem={({item}) => (
                            <View style={styles.swiperMain}>
                                <Image
                                    source={item.image}
                                    style={styles.swiperSub}
                                />
                            </View>
                        )}
                    />

                    <View style={styles.swiperNumberMain}>
                        <View style={styles.swiperNumber}>
                            <Text
                                allowFontScaling={false}
                                style={styles.swiperNumberText}>
                                {currentIndex + 1}/
                                {images.length > 0
                                    ? images.length
                                    : spotlightData.length}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.disableContain}>
                        <View style={styles.disableTop}>
                            {route?.params?.type === 'BorrowAPet' ? (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.disableText}>
                                    Disable Pet
                                </Text>
                            ) : (
                                <Text
                                    allowFontScaling={false}
                                    style={styles.disableText}>
                                    Disable Place
                                </Text>
                            )}

                            <TouchableOpacity activeOpacity={0.8}>
                                <ToggleSwitch
                                    isOn={isOn}
                                    onColor="#009FD3"
                                    offColor="#E2E2E2"
                                    size="medium"
                                    animationSpeed={200}
                                    onToggle={() => {
                                        setIsOn(!isOn);
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={styles.disableDescription}>
                            Lectus volutpat at tincidunt aliquet. Elementum at
                            sed vivamus quam. Rhoncus
                        </Text>
                    </View>
                    <View style={styles.petcareContain}>
                        <View style={styles.petcare}>
                            <Text
                                allowFontScaling={false}
                                style={styles.petcareHead}>
                                {title ? title : 'Paw and Whiz Petcare'}
                            </Text>
                            <View style={styles.placeIcon}>
                                <Location width={SIZE(20)} height={SIZE(20)} />
                                <Text
                                    allowFontScaling={false}
                                    style={styles.petcarePlace}>
                                    {geoAddressText
                                        ? geoAddressText
                                        : 'Ras Al‑Khaimah, Dubai'}
                                </Text>
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={styles.petcareDescription}>
                                {description
                                    ? description
                                    : 'Eu pretium vitae aliquet lectus enim venenatis nunc. Mi nulla arcu in interdum nisl erat sit tempus. Sapien maecenas arcu iaculis diam etiam molestie purus velit. At sagittis eget sed quis semper at convallis habitant. Sit.'}
                            </Text>
                        </View>
                    </View>
                    {route?.params?.type === 'BorrowAPet' ? (
                        <>
                            <View style={styles.priceMainContainer}>
                                <View style={styles.priceHeading}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.priceMainText}>
                                        AED 100 x
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.priceSubText}>
                                            {' '}
                                            30/day
                                        </Text>
                                    </Text>
                                </View>
                                <View style={styles.featureMain}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.featureText}>
                                        Features
                                    </Text>
                                </View>
                                <View style={styles.petPriceMainContainer}>
                                    <View
                                        activeOpacity={0.8}
                                        style={[
                                            styles.petPriceSingleContainer,
                                        ]}>
                                        <View
                                            style={[styles.petTitleContainer]}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petTitle}>
                                                Brown
                                            </Text>
                                        </View>
                                        <View style={styles.petPriceContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petPriceText}>
                                                Color
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        activeOpacity={0.8}
                                        style={[
                                            styles.petPriceSingleContainer,
                                        ]}>
                                        <View
                                            style={[styles.petTitleContainer]}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petTitle}>
                                                2 Kg
                                            </Text>
                                        </View>
                                        <View style={styles.petPriceContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petPriceText}>
                                                Weight
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        activeOpacity={0.8}
                                        style={[
                                            styles.petPriceSingleContainer,
                                        ]}>
                                        <View
                                            style={[styles.petTitleContainer]}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petTitle}>
                                                6 Month
                                            </Text>
                                        </View>
                                        <View style={styles.petPriceContainer}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.petPriceText}>
                                                Age
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.petDetailsContainer}>
                                <View style={styles.headingContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.headingText}>
                                        Health
                                    </Text>
                                </View>
                                <View style={styles.subTextContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.detailSubText}>
                                        1. Fully Vaccinated
                                    </Text>
                                    <Text
                                        style={styles.detailSubText}
                                        allowFontScaling={false}>
                                        2. Insurance
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.petDetailsContainer}>
                                <View style={styles.headingContainer}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.headingText}>
                                        Characteristics
                                    </Text>
                                </View>
                                <View style={styles.subTextContainer}>
                                    <Text
                                        style={styles.detailSubText}
                                        allowFontScaling={false}>
                                        1. Good Manner
                                    </Text>
                                    <Text
                                        style={styles.detailSubText}
                                        allowFontScaling={false}>
                                        2. Good with Kids
                                    </Text>
                                    <Text
                                        style={styles.detailSubText}
                                        allowFontScaling={false}>
                                        3. Very Empathetic
                                    </Text>
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.accommodation}>
                                <View style={styles.accommodationHead}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.accommodationText}>
                                        Available Accommodation
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setBreedModalVisible(true);
                                        }}
                                        activeOpacity={0.8}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.breedText}>
                                            + Add Breed
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.accommodationTable}>
                                    <View style={styles.tableHead}>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.tableHeadText,
                                                {width: '20%'},
                                            ]}>
                                            Type
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={[
                                                styles.tableHeadText,
                                                {width: '25%'},
                                            ]}>
                                            No of Pets
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.tableHeadText}>
                                            Price
                                        </Text>
                                    </View>
                                    {pet_data.map((item, index) => (
                                        <View key={index}>
                                            <View
                                                // key={index}
                                                style={[
                                                    styles.accommodationList,
                                                    {
                                                        backgroundColor:
                                                            index % 2 === 0
                                                                ? '#FFF'
                                                                : '#F7F7F7',
                                                    },
                                                ]}>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.listText,
                                                        {width: '20%'},
                                                    ]}>
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.listText,
                                                        {width: '25%'},
                                                    ]}>
                                                    {item.quantity}
                                                </Text>
                                                <Text
                                                    allowFontScaling={false}
                                                    style={[
                                                        styles.listText,
                                                        {width: '40%'},
                                                    ]}>
                                                    AED {item.price}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handlePress(item.id);
                                                    }}
                                                    activeOpacity={0.8}>
                                                    <Info
                                                        width={SIZE(20)}
                                                        height={SIZE(20)}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            {isShow === item.id && (
                                                <View
                                                    style={{
                                                        borderWidth: 0.6,
                                                        borderColor: '#E2E2E2',
                                                        position: 'absolute',
                                                        left: SIZE(80),
                                                        top:
                                                            item.id === 3
                                                                ? SIZE(-40)
                                                                : SIZE(10) &&
                                                                  item.id === 2
                                                                ? SIZE(-20)
                                                                : SIZE(10),
                                                        width: SIZE(250),
                                                        height: SIZE(70),
                                                        zIndex: 100,
                                                        backgroundColor: '#fff',
                                                        borderRadius: SIZE(8),
                                                        padding: SIZE(10),
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: '#242424',
                                                            fontFamily:
                                                                FONTS.semiBold,
                                                            fontSize: SIZE(14),
                                                            fontWeight: '600',
                                                            textAlign: 'left',
                                                            marginBottom:
                                                                SIZE(8),
                                                        }}>
                                                        Remarks
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: '#969696',
                                                            fontFamily:
                                                                FONTS.medium,
                                                            fontSize: SIZE(14),
                                                            fontWeight: '400',
                                                        }}>
                                                        {item.info}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.facilities}>
                                <View style={styles.facilitiesHead}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.facilitiesText}>
                                        Facilities
                                    </Text>
                                </View>
                                {visibleFacilities.map(item => (
                                    <View
                                        key={item.id}
                                        style={styles.facilitiesList}>
                                        <View style={styles.facilitiesListItem}>
                                            <View>{item.icon}</View>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.facilitiesType}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => openModal(item)}
                                            activeOpacity={0.8}>
                                            <Info
                                                width={SIZE(20)}
                                                height={SIZE(20)}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}

                                {!showAll ? (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.facilitiesViewButton}
                                        onPress={handleViewMore}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.TextViewButton}>
                                            View More
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.facilitiesViewButton}
                                        onPress={() => {
                                            setShowAll(false);
                                        }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.TextViewButton}>
                                            View Less
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.aboutServices}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.aboutServicesHead}>
                                    About Services
                                </Text>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.aboutServicesText}>
                                    {aboutService
                                        ? aboutService
                                        : 'Penatibus purus semper mattis nulla. Platea cras bibendum dictum fusce nunc rutrum. Massa cursus ut et aliquet. Nulla integer metus euismod lectus sit mi accumsan sed eros. Faucibus imperdiet augue massa qui s ac. Vel in aliquam id tempor facilisi netus gravida vitae. Pretium vehicula ullamcorper suspendisse lectus purus faucibus ipsum tristique porttitor. Mi euismod.'}
                                </Text>
                            </View>
                        </>
                    )}

                    <View style={styles.locationSection}>
                        <Text
                            allowFontScaling={false}
                            style={styles.locationSectionText}>
                            Location
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => openMapsApp(25.800694, 55.9762)}
                            style={styles.locationView}>
                            <MapView
                                zoomTapEnabled={false}
                                zoomEnabled={false}
                                scrollEnabled={false}
                                provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                region={{
                                    latitude: location.lat
                                        ? location.lat
                                        : 25.800694,
                                    longitude: location.lng
                                        ? location.lng
                                        : 55.9762,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.0121,
                                }}></MapView>
                        </TouchableOpacity>
                    </View>
                    <Reviews />
                    <View style={styles.recentBookingContainer}>
                        <View style={styles.reviewsHead}>
                            <Text
                                allowFontScaling={false}
                                style={styles.reviewsText}>
                                Recent Bookings
                            </Text>
                        </View>
                        {BOOKING_STATUS.map((detail, index) => (
                            <BookingsSingle
                                key={index}
                                detail={detail}
                                index={index}
                                bookingID={bookingID}
                                setBookingID={setBookingID}
                                route={route?.params}
                                onPress={() => {
                                    navigation.navigate('Booking');
                                }}
                            />
                        ))}
                    </View>
                </View>
            </View>
            <Modal
                useNativeDriverForBackdrop={true}
                useNativeDriver={false}
                onBackButtonPress={() => {
                    setModalVisible(false);
                }}
                onBackdropPress={() => {
                    setModalVisible(false);
                }}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                isVisible={modalVisible}
                backdropOpacity={0.4}
                style={styles.AccModalContainer}
                onSwipeComplete={() => {
                    setModalVisible(false);
                }}
                animationInTiming={200}
                animationOutTiming={200}>
                {selectedFacility && (
                    <View style={styles.modalMain}>
                        <View style={styles.modalTop}>
                            <View style={styles.modalTopLeft}>
                                <View style={styles.facilityModalIcon}>
                                    {selectedFacility.icon}
                                </View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.facilityName}>
                                    {selectedFacility.name}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                                activeOpacity={0.8}
                                hitSlop={10}
                                style={styles.closeIcon}>
                                <CloseIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBottom}>
                            <Image
                                style={styles.modalImage}
                                source={selectedFacility.image}
                            />
                        </View>
                    </View>
                )}
            </Modal>
            <Modal
                isVisible={editModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={{margin: 0}}
                onBackdropPress={() => setEditModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <ScrollView
                    keyboardShouldPersistTaps={'handled'}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.modalContainer}>
                    <EditModal
                        petSingleData={petSingleData}
                        setEditModalVisible={setEditModalVisible}
                        setTitle={setTitle}
                        title={title}
                        phone={phone}
                        setPhone={setPhone}
                        description={description}
                        setDescription={setDescription}
                        aboutService={aboutService}
                        setAboutService={setAboutService}
                        geoAddressText={geoAddressText}
                        setGeoAddressText={setGeoAddressText}
                        setImages={setImages}
                        images={images}
                        setLocation={setLocation}
                        location={location}
                    />
                </ScrollView>
            </Modal>
            <Modal
                isVisible={breedModalVisible}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={{margin: 0}}
                onBackdropPress={() => setBreedModalVisible(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={styles.modalContainer}>
                    <AddBreedModal
                        setBreedModalVisible={setBreedModalVisible}
                    />
                </ScrollView>
            </Modal>
        </ScrollView>
    );
};

export default PlaceToStaySingle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: SIZE(16),
    },
    topImageContainer: {
        marginBottom: SIZE(24),
        width: SIZES.width,
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        padding: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        width: SIZE(59),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    mainContainer: {
        paddingHorizontal: SIZE(16),
        flex: 1,
    },
    disableContain: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        padding: SIZE(16),
        marginTop: SIZE(24),
        borderRadius: SIZE(15),
    },
    disableTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZE(8),
    },
    disableText: {
        fontSize: SIZE(18),
        fontWeight: '600',
        lineHeight: SIZE(22),
        fontFamily: FONTS.semiBold,
        color: '#232323',
    },
    disableDescription: {
        fontSize: SIZE(16),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        color: '#757575',
    },
    petcareContain: {
        marginTop: SIZE(24),
    },
    petcare: {},
    petcareHead: {
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(30),
        color: '#242424',
    },
    placeIcon: {
        marginVertical: SIZE(12),
        flexDirection: 'row',
    },
    petcarePlace: {
        fontSize: SIZE(16),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(20),
        marginLeft: SIZE(8),
        color: '#242424',
    },
    petcareDescription: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(16),
        textAlign: 'justify',
        color: '#686868',
    },
    priceMainContainer: {
        marginTop: SIZE(24),
        marginBottom: SIZE(32),
    },
    priceHeading: {
        marginBottom: SIZE(32),
    },
    priceMainText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    priceSubText: {
        color: '#242424',
        fontSize: SIZE(20),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
    petDetailsContainer: {
        padding: SIZE(16),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(32),
    },

    headingContainer: {
        paddingBottom: SIZE(8),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        marginBottom: SIZE(6),
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
    },
    subTextContainer: {},
    detailSubText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '500',
        fontFamily: FONTS.medium,
        // marginBottom: SIZE(10),
        lineHeight: SIZE(40),
    },
    featureMain: {
        marginBottom: SIZE(21),
    },
    featureText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    petPriceMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    petPriceSingleContainer: {
        width: SIZE(119),
        borderRadius: SIZE(8),
        overflow: 'hidden',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    petTitleContainer: {
        padding: SIZE(16),
        backgroundColor: '#EDEDED',
        alignItems: 'center',
    },
    petTitle: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    petPriceContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    petPriceText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    petcareDay: {
        marginTop: SIZE(24),
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(30),
        color: '#242424',
    },
    accommodation: {
        marginVertical: SIZE(36),
    },
    accommodationHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(21),
        alignItems: 'center',
    },
    accommodationText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(24),
    },
    breedText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    accommodationTable: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
    },
    tableHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    tableHeadText: {
        marginRight: SIZE(12),
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontWeight: '600',
    },
    accommodationList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
    },
    listText: {
        justifyContent: 'center',
        marginRight: SIZE(12),
        fontWeight: '400',
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
    },
    facilities: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 10,
        width: '100%',
        padding: SIZE(16),
        backgroundColor: '#FFFFFF',
    },
    facilitiesHead: {
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
        marginBottom: SIZE(16),
    },
    facilitiesText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
    },
    facilitiesList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZE(8),
        paddingVertical: SIZE(8),
    },
    facilitiesListItem: {
        flexDirection: 'row',
    },
    facilitiesType: {
        marginLeft: SIZE(12),
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
        marginBottom: SIZE(12),
    },
    facilitiesViewButton: {
        alignSelf: 'center',
        marginTop: SIZE(28),
        letterSpacing: 0.5,
    },
    TextViewButton: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
    },
    aboutServices: {
        marginVertical: SIZE(24),
    },
    aboutServicesHead: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        marginBottom: SIZE(12),
    },
    aboutServicesText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(18),
    },
    locationSection: {},
    locationView: {
        height: SIZE(140),
        width: '100%',
        borderRadius: SIZE(8),
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    placeBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationSectionText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(22),
        marginBottom: SIZE(12),
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(24),
        alignItems: 'center',
    },
    reviewsText: {
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(24),
    },
    reviewsViewText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(24),
        letterSpacing: 0.5,
    },
    AccModalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
    },
    modalMain: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
    },
    modalTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(16),
    },
    modalTopLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    facilityModalIcon: {
        width: SIZE(32),
        height: SIZE(32),
        marginRight: SIZE(16),
    },
    facilityName: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    closeIcon: {
        width: SIZE(10),
        height: SIZE(10),
    },
    modalBottom: {
        borderRadius: SIZE(8),
        height: SIZE(225),
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        height: '100%',
    },
});
