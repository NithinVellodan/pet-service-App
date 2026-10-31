import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,
    Linking,
    ActivityIndicator,
    Share,
} from 'react-native';

//packages
import {useNavigation} from '@react-navigation/native';

// constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {ApiSectionsLostPetsSinglePage} from './includes/ApiSection';

//components
import SpotlightLostAndFound from './includes/SpotlightLostAndFound';
import PetDetailsContainer from './includes/PetDetailsContainer';
import AddFoundPetDetails from './includes/AddFoundPetDetails';
import ModalScreen from '../../Profile-related/ModalScreen';
import InternalServerError from '../../error/InternalServerError';
import PageNotFound from '../../error/PageNotFound';

//images and logos
import ShareIcon from '../../../assets/icons/share.svg';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';

const LostAndFoundSinglePage = ({route}) => {
    const [scrollY] = useState(new Animated.Value(0));
    const toastRef = useRef();

    const navigation = useNavigation();
    const [petDetails, setPetDetails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState();

    const data = [
        {
            id: '1',
        },
    ];

    ApiSectionsLostPetsSinglePage(
        route?.params?.id,
        setPetDetails,
        setIsLoading,
        setErrorStatus,
    );
    const phoneNumber = petDetails?.phone;
    const makeCall = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const ShareUrl = () => {
        Share.share({
            message: 'test share link',
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };

    const renderItem = () => {
        return (
            <View>
                <SpotlightLostAndFound
                    description={petDetails?.description}
                    pet_type={petDetails?.pet_type}
                    gender={petDetails?.gender}
                    name={petDetails?.pet_name}
                    images={petDetails?.gallery}
                />
                <View
                    style={{paddingHorizontal: SIZE(16), marginTop: SIZE(20)}}>
                    <PetDetailsContainer
                        location={petDetails?.location}
                        phone={petDetails?.phone}
                        lost_date={petDetails?.lost_date}
                    />
                </View>
                <View
                    style={{paddingHorizontal: SIZE(16), marginTop: SIZE(30)}}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(true);
                        }}
                        style={styles.facilityViewMore}
                        activeOpacity={0.8}>
                        <Text
                            style={[
                                styles.facilityViewMoreText,
                                {color: '#fff', marginLeft: SIZE(10)},
                            ]}
                            allowFontScaling={false}>
                            Found this Pet? Tell Us
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.mainContainer}>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(50),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <>
                    <Animated.View
                        style={[
                            styles.commonButtonContainer,
                            {
                                backgroundColor: scrollY.interpolate({
                                    inputRange: [
                                        0,
                                        Dimensions.get('window').height * 0.35,
                                    ],
                                    outputRange: ['transparent', '#F7F7F7'],
                                    extrapolate: 'clamp',
                                }),
                                borderBottomWidth: scrollY.interpolate({
                                    inputRange: [
                                        0,
                                        Dimensions.get('window').height * 0.35,
                                    ],
                                    outputRange: [0, SIZE(1)],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ]}>
                        <View style={styles.topButtonLeft}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                activeOpacity={0.8}
                                style={styles.commonButtonMain}>
                                <View style={styles.commonTopButtons}>
                                    <ArrowLeft width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.topButtonRight}>
                            <TouchableOpacity
                                onPress={ShareUrl}
                                activeOpacity={0.8}
                                style={[styles.commonButtonMain]}>
                                <View style={styles.commonTopButtons}>
                                    <ShareIcon width={'100%'} height={'100%'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    <Animated.FlatList
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.flatListContainer}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: scrollY}}}],
                            {useNativeDriver: false},
                        )}
                    />
                    <ModalScreen
                        isVisible={modalVisible}
                        setVisible={setModalVisible}
                        toastRef={toastRef}
                        inner={
                            <AddFoundPetDetails
                                setModalVisible={setModalVisible}
                                toastRef={toastRef}
                                petId={petDetails.id}
                            />
                        }
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    facilityViewMoreText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
    },
    facilityViewMore: {
        alignItems: 'center',
        borderColor: '#003459',
        paddingVertical: SIZE(12),
        borderRadius: SIZE(6),
        backgroundColor: '#009FD3',
        marginBottom: SIZE(15),
    },
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(21),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
        borderColor: '#E2E2E2',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
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
        alignSelf: 'center',
        marginVertical: 10,
        height: 5,
        width: 40,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },
});

export default LostAndFoundSinglePage;
