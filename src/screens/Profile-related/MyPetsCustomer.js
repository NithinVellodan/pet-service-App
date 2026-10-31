import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Platform,
    NativeModules,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
//packages
import Modal from 'react-native-modal';
import {useRoute, useFocusEffect} from '@react-navigation/native';
//constants
import {FONTS} from '../../theme/fonts';
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';
//components
import Headers from '../includes/headers/Headers';
import MyPetSingle from './includes/MyPetSingle';
import AddCustomerPetDetails from '../detail/AddCustomerPetDetails';
import {usersConfigCustomer} from '../../../axiosConfig';
import {ApiSectionCustomerMyPet} from '../main/ApiSection';
//images and logos
import SpotLightLogo from '../../assets/icons/emptypet.svg';
import TermsConditions from '../Auth/privacy/TermsConditions';

const MyPetsCustomer = () => {
    const route = useRoute();
    const {state} = useContext(Context);
    const {StatusBarManager} = NativeModules;

    //states
    const [petsAvailable, setPetsAvailable] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [petList, setPetList] = useState([]);
    const [section, setSection] = useState(null);
    const [arrival, setArrival] = useState();
    const [petType, setPetType] = useState([]);
    const [breedType, setBreedType] = useState([]);
    const [ageValue, setAgeValue] = useState(null);
    const [nameAs, setNameAs] = useState('');
    const [vaccination, setVaccination] = useState([]);
    const [insuranceDocuments, setInsuranceDocuments] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTwo, setSelectedDateTwo] = useState(null);
    const [selectedDateThree, setSelectedDateThree] = useState('');
    const [categoryValue, setCategoryValue] = useState(null);
    const [breedValue, setBreedValue] = useState(null);
    const [ckeck, setCheck] = useState(false);
    const [ckeckInsurance, setckeckInsurance] = useState(false);
    const [ckeckTerms, setCkeckTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [upToDateImage, setUpToDateImage] = useState([]);
    const [ageGroup, setAgeGroup] = useState([]);
    const [sexValue, setSexValue] = useState(null);

    // add my pet api
    const addMyPet = async image => {
        setSubmitLoading(true);
        let formattedDateString = '';
        let formattedDateStringVaccination = '';
        let formattedDateStringDOB = '';
        if (selectedDate && selectedDate !== '') {
            formattedDateString = new Date(selectedDate).toLocaleDateString(
                'en-CA',
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                },
            );
        }

        if (selectedDateTwo && selectedDateTwo !== '') {
            formattedDateStringVaccination = new Date(
                selectedDateTwo,
            ).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        if (selectedDateThree && selectedDateThree !== '') {
            formattedDateStringDOB = new Date(
                selectedDateThree,
            ).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
        }

        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('pet_name', nameAs);
        formData.append('pet_type', section);
        formData.append('pet_breed', breedType);
        selectedImages.forEach((image, index) => {
            formData.append(`images`, {
                uri: image.uri,
                type: image.type,
                name: image.name,
            });
        });
        formData.append('date_of_birth', formattedDateStringDOB);
        formData.append('vaccination_expiry', formattedDateStringVaccination);
        formData.append('insurance_expiry', formattedDateString);

        formData.append('is_insured', ckeckInsurance);
        {
            ckeckInsurance &&
                formData.append('insurance_document', {
                    uri: insuranceDocuments[0].uri,
                    type: insuranceDocuments[0].type,
                    name: insuranceDocuments[0].name,
                });
        }
        formData.append('is_vaccinated', ckeck);
        {
            ckeck &&
                formData.append('vaccination_document', {
                    uri: vaccination[0].uri,
                    type: vaccination[0].type,
                    name: vaccination[0].name,
                });
        }
        try {
            await usersConfigCustomer
                .post('create-pet/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    setIsLoading(true);
                    setIsLoading(false);
                    setSubmitLoading(false);
                    clearAll();
                    setEditModalVisible(false);
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error pet try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const clearAll = () => {
        setPetType([]);
        setBreedType([]);
        setAgeValue(null);
        setNameAs('');
        setVaccination([]);
        setInsuranceDocuments([]);
        setSelectedImages([]);
        setSelectedDate(null);
        setSelectedDateTwo(null);
        setCategoryValue(null);
        setBreedValue(null);
        setCheck(false);
        setckeckInsurance(false);
        setCkeckTerms(false);
        setUpToDateImage([]);
        setSelectedDateThree('');
    };

    const myPetData = [];

    ApiSectionCustomerMyPet(setPetList, isLoading, setRefreshing, refreshing);

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(prev => !prev);
            return () => {
                // console.log('Screen is unfocused');
            };
        }, []),
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Headers
                    headText={'My Pets'}
                    petsAvailable={petsAvailable}
                    rightText={'+ Add Pet'}
                    setEditModalVisible={setEditModalVisible}
                    route={route}
                />
                {refreshing ? (
                    <ActivityIndicator
                        style={{
                            height: SIZES.height - SIZE(185),
                        }}
                        size={'large'}
                        color={'#009fd3'}
                    />
                ) : (
                    <FlatList
                        bounces={false}
                        data={petList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <MyPetSingle
                                key={item.id}
                                petData={item}
                                route={route}
                            />
                        )}
                        contentContainerStyle={styles.petsContainer}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        ListEmptyComponent={
                            <View style={styles.spotlightMain}>
                                <View style={styles.spotlight}>
                                    <SpotLightLogo
                                        width={'100%'}
                                        height={'100%'}
                                    />
                                </View>
                                <View style={styles.bottom}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.mainText}>
                                        No Pets have been Added
                                    </Text>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.subText}>
                                        Add your Beloved Pets
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setEditModalVisible(true);
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.button}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.buttonText}>
                                            + Add Pet
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                )}
            </View>
            {state?.userData?.isTermsAndCondition ? (
                <Modal
                    isVisible={editModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    onBackButtonPress={() => {
                        clearAll();
                        setEditModalVisible(false);
                    }}
                    onBackdropPress={() => {
                        clearAll();
                        setEditModalVisible(false);
                    }}
                    style={{
                        margin: 0,
                        screenBackgroundcolor: 'transparent',
                        modalPresentationStyle: 'overCurrentContext',
                        width: '100%',
                        borderTopRightRadius: SIZE(32),
                        borderTopLeftRadius: SIZE(32),
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT + SIZES.height * 0.04
                                : StatusBarManager.HEIGHT + SIZE(20),
                    }}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <AddCustomerPetDetails
                        clearAll={clearAll}
                        fromList={true}
                        addMyPet={addMyPet}
                        upToDateImage={upToDateImage}
                        setUpToDateImage={setUpToDateImage}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedDateTwo={selectedDateTwo}
                        setSelectedDateTwo={setSelectedDateTwo}
                        categoryValue={categoryValue}
                        setCategoryValue={setCategoryValue}
                        breedValue={breedValue}
                        setBreedValue={setBreedValue}
                        ckeck={ckeck}
                        setCheck={setCheck}
                        ckeckInsurance={ckeckInsurance}
                        setckeckInsurance={setckeckInsurance}
                        ckeckTerms={ckeckTerms}
                        setCkeckTerms={setCkeckTerms}
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        insuranceDocuments={insuranceDocuments}
                        setInsuranceDocuments={setInsuranceDocuments}
                        vaccination={vaccination}
                        setVaccination={setVaccination}
                        nameAs={nameAs}
                        setNameAs={setNameAs}
                        ageValue={ageValue}
                        setAgeValue={setAgeValue}
                        setBreedType={setBreedType}
                        petType={petType}
                        setPetType={setPetType}
                        setSection={setSection}
                        setArrival={setArrival}
                        section={section}
                        arrival={arrival}
                        forClose={true}
                        setEditModalVisible={setEditModalVisible}
                        ageGroup={ageGroup}
                        setAgeGroup={setAgeGroup}
                        sexValue={sexValue}
                        setSexValue={setSexValue}
                        selectedDateThree={selectedDateThree}
                        setSelectedDateThree={setSelectedDateThree}
                        submitLoading={submitLoading}
                    />
                </Modal>
            ) : (
                <Modal
                    isVisible={editModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    animationIn={'slideInUp'}
                    backdropOpacity={0.2}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    onBackButtonPress={() => {
                        clearAll();
                        setEditModalVisible(false);
                    }}
                    onBackdropPress={() => {
                        clearAll();
                        setEditModalVisible(false);
                    }}
                    style={{
                        margin: 0,
                        screenBackgroundcolor: 'transparent',
                        modalPresentationStyle: 'overCurrentContext',
                        width: '100%',
                        borderTopRightRadius: SIZE(32),
                        borderTopLeftRadius: SIZE(32),
                        marginTop:
                            Platform.OS === 'ios'
                                ? StatusBarManager.HEIGHT +
                                  SIZES.height * 0.008 +
                                  SIZE(0)
                                : StatusBarManager.HEIGHT - SIZE(20),
                    }}
                    propagateSwipe={true}
                    avoidKeyboard={true}>
                    <TermsConditions
                        close={setEditModalVisible}
                        termsAccept={true}
                    />
                </Modal>
            )}
        </View>
    );
};

export default MyPetsCustomer;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    subContainer: {
        flex: 1,
    },
    petsContainer: {
        paddingVertical: SIZE(24),
        paddingHorizontal: SIZE(16),
        flexDirection: 'column',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
    },
    spotlightMain: {
        flex: 1,
        marginTop: SIZE(80),
        alignItems: 'center',
        justifyContent: 'center',
    },
    spotlight: {
        width: SIZE(300),
        height: SIZE(300),
        marginBottom: SIZE(32),
    },
    bottom: {},
    mainText: {
        color: '#000',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: SIZE(12),
    },
    subText: {
        color: '#686868',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: SIZE(24),
    },
    button: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(6),
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(10),
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        fontWeight: '600',
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        height: '100%',
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});
