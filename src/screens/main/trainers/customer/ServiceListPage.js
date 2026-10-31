import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';

//packages
import {useIsFocused, useNavigation} from '@react-navigation/native';

//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import {ApiSectionTrainerProviderService} from '../../ApiSectionTrainerProvider';
import {serviceProviderConfig} from '../../../../../axiosConfig';
import {Context} from '../../../../contexts/Store';

//components
import ModalScreen from '../../../Profile-related/ModalScreen';
import AddService from './includes/AddService';
import InternalServerError from '../../../error/InternalServerError';
import PageNotFound from '../../../error/PageNotFound';

//images and logos
import BackIcon from '../../../../assets/icons/profile-icons/arrow-left.svg';
import AddIcon from '../../../../assets/icons/add.svg';
import SendIcon from '../../../../assets/icons/sendangle.svg';

const ServiceListPage = () => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);
    const toastRef = useRef();
    const isFocused = useIsFocused();

    const [errorStatus, setErrorStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrainingModes, setSelectedTrainingModes] = useState([]);
    const [servicesList, setServicesList] = useState([]);
    const [components, setComponents] = useState([]);
    const [submitLoading, setSubmitLoading] = useState(false);

    ApiSectionTrainerProviderService(
        setServicesList,
        setIsLoading,
        refreshing,
        setErrorStatus,
        isFocused,
    );

    const submitService = async () => {
        try {
            setSubmitLoading(true);
            const token = state.userData.accessToken;

            const transformedData = selectedTrainingModes.map(mode => {
                const correspondingComponent = components.find(
                    component => component.trainingMode.id === mode.id,
                );
                return {
                    ...mode,
                    no_of_hours: correspondingComponent.no_of_hours,
                    remarks: correspondingComponent.remarks,
                    selectedPetTypes: correspondingComponent.selectedPetTypes,
                };
            });

            const formData = new FormData();

            formData.append('services_data', JSON.stringify(transformedData));

            const response = await serviceProviderConfig.post(
                'create-trainer-service/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            setSubmitLoading(false);
            setModalVisible(false);
            setRefreshing(!refreshing);
        } catch (error) {
            setSubmitLoading(false);
            if (error.response && error.response.data) {
                // console.log('Response data:', error.response.data);
                toastRef.current.show(error.response.data.message, {
                    type: 'danger',
                });
            } else {
                console.log('No response data:', error);
            }
        }
    };

    const clearAll = () => {
        setComponents([]);
        setSelectedTrainingModes([]);
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
                <View style={styles.mainContainer}>
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
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setModalVisible(true);
                                }}
                                style={[styles.backButton, {marginRight: 0}]}>
                                <AddIcon width={SIZE(24)} height={SIZE(24)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.cardMain}>
                        {servicesList?.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.navigate('ServiceSinglePage', {
                                        item: item,
                                        index: index,
                                        type: 'Services',
                                    });
                                }}
                                style={[
                                    styles.cardContainer,
                                    {opacity: item.is_enabled ? 1 : 0.5},
                                ]}
                                key={index}>
                                <View style={styles.headingContainer}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.headingText}>
                                        {item.title}
                                    </Text>
                                    <SendIcon
                                        width={SIZE(20)}
                                        height={SIZE(20)}
                                    />
                                </View>

                                <Text
                                    numberOfLines={3}
                                    style={styles.descriptionText}>
                                    {item.remarks}
                                </Text>
                                <View style={styles.durationContainer}>
                                    <Text style={styles.durationText}>
                                        {Math.floor(item.no_of_hours)} hr
                                        Training
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <ModalScreen
                        isVisible={modalVisible}
                        setVisible={setModalVisible}
                        toastRef={toastRef}
                        inner={
                            <AddService
                                setModalVisible={setModalVisible}
                                components={components}
                                setComponents={setComponents}
                                setSelectedTrainingModes={
                                    setSelectedTrainingModes
                                }
                                selectedTrainingModes={selectedTrainingModes}
                                addService={true}
                                submitService={submitService}
                                submitLoading={submitLoading}
                                clearAll={clearAll}
                            />
                        }
                    />
                </View>
            )}
        </>
    );
};

export default ServiceListPage;

const styles = StyleSheet.create({
    mainContainer: {},
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

    headDetailRightText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(17),
    },
    cardMain: {
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(24),
        gap: SIZE(16),
        paddingBottom: SIZE(100),
    },
    cardContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        borderRadius: SIZE(12),
        padding: SIZE(16),
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
});
