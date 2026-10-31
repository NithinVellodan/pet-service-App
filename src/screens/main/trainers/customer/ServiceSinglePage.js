import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

//components
import DisableOption from '../../../homeScreens/includes/DisableOption';
import ServiceEditModal from './includes/ServiceEditModal';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {ApiSectionTrainerProviderServiceSingle} from '../../ApiSectionTrainerProvider';
import {ApiGeneral} from '../../../common/ApiGeneral';
import {Context} from '../../../../contexts/Store';
import {serviceProviderConfig} from '../../../../../axiosConfig';

//images and logos
import BackIcon from '../../../../assets/icons/profile-icons/arrow-left.svg';
import EditIcon from '../../../../assets/icons/edit.svg';

const ServiceSinglePage = ({route}) => {
    const navigation = useNavigation();
    const [isOn, setIsOn] = useState(true);
    const {state, dispatch} = useContext(Context);

    const [errorStatus, setErrorStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [serviceData, setServiceData] = useState([]);
    const [hours, setHours] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedPetTypes, setSelectedPetTypes] = useState([]);
    const [petTypes, setPetTypes] = useState([]);

    const handlePetTypeSelect = petType => {
        setSelectedPetTypes(prevSelected => {
            if (prevSelected.some(pt => pt.id === petType.id)) {
                return prevSelected.filter(pt => pt.id !== petType.id);
            } else {
                return [...prevSelected, petType];
            }
        });
    };
    useEffect(() => {
        if (serviceData) {
            setHours(serviceData.no_of_hours?.toString() || '');
            setRemarks(serviceData.remarks || '');
            setSelectedPetTypes(serviceData.pet_types || []);
            setIsOn(serviceData.is_enabled ? true : false);
        }
    }, [serviceData]);

    const item = route?.params?.item;
    const index = route?.params?.index;
    const pk = route?.params?.item?.id;

    ApiSectionTrainerProviderServiceSingle(
        setServiceData,
        pk,
        setIsLoading,
        refreshing,
        setErrorStatus,
    );
    ApiGeneral(setPetTypes);

    //toggle enable or disable service
    const toggleService = async () => {
        const token = state.userData.accessToken;
        try {
            const response = await serviceProviderConfig.put(
                `enable-disable-service/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // setRefreshing(!refreshing);
            } else {
                // Handle failure
            }
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    const editService = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;

        const formData = new FormData();
        formData.append('no_of_hours', hours);
        formData.append('remarks', remarks);
        formData.append('pet_types', JSON.stringify(selectedPetTypes));

        serviceProviderConfig
            .put(`edit-trainer-service/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setSubmitLoading(false);
                setEditModal(false);
                setRefreshing(!refreshing);
            })
            .catch(error => {
                setSubmitLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    return (
        <>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : errorStatus === 500 ? (
                <InternalServerError />
            ) : errorStatus === 404 ? (
                <PageNotFound />
            ) : (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={styles.backButton}>
                            <BackIcon width={SIZE(24)} height={SIZE(24)} />
                        </TouchableOpacity>
                        <View style={styles.headerRight}>
                            <Text style={styles.borrowPetText}>Services</Text>
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <View style={styles.cardContainer} key={index}>
                            <View style={styles.headingContainer}>
                                <Text style={styles.headingText}>
                                    {serviceData.title}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setEditModal(true);
                                    }}
                                    activeOpacity={0.8}>
                                    <EditIcon
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.descriptionText}>
                                {serviceData.remarks}
                            </Text>
                            <View style={styles.durationContainer}>
                                <Text style={styles.durationText}>
                                    {Math.floor(serviceData.no_of_hours)} hr
                                    Training
                                </Text>
                            </View>
                        </View>
                        <DisableOption
                            togglePlace={() => {
                                toggleService();
                            }}
                            setIsOn={setIsOn}
                            isOn={isOn}
                            route={route}
                        />
                    </View>
                    <Modal
                        isVisible={editModal}
                        animationInTiming={400}
                        animationOutTiming={400}
                        animationIn={'slideInUp'}
                        backdropOpacity={0.2}
                        useNativeDriver={false}
                        useNativeDriverForBackdrop={true}
                        style={styles.modalContainer}
                        propagateSwipe={true}
                        avoidKeyboard={true}
                        onBackdropPress={() => setEditModal(false)}>
                        <View style={styles.modalSubContainer}>
                            <ServiceEditModal
                                selectedPetTypes={selectedPetTypes}
                                petTypes={petTypes}
                                handlePetTypeSelect={handlePetTypeSelect}
                                setRemarks={setRemarks}
                                remarks={remarks}
                                setHours={setHours}
                                hours={hours}
                                setEditModal={setEditModal}
                                editService={editService}
                                submitLoading={submitLoading}
                            />
                        </View>
                    </Modal>
                </ScrollView>
            )}
        </>
    );
};

export default ServiceSinglePage;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F7F7F7',
    },
    headerContainer: {
        paddingVertical: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#0000001A',
    },
    backButton: {
        width: SIZE(40),
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginRight: SIZE(20),
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    borrowPetText: {
        fontSize: SIZE(20),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(25),
        color: '#00171F',
    },
    bottomSection: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(24),
    },
    cardContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        padding: SIZE(16),
        marginBottom: SIZE(24),
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        marginBottom: SIZE(8),
    },
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        marginBottom: SIZE(16),
    },
    durationContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(31),
        height: SIZE(31),
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.medium,
        fontWeight: '500',
        textAlign: 'center',
    },
    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
        margin: SIZE(0),
    },
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
        padding: SIZE(32),
    },
});
