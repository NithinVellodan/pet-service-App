import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {SIZE, SIZES} from '../../../theme/theme';
import LostAndFoundHeaderComponent from './includes/LostAndFoundHeaderComponent';
import LostAndFoundContainer from './includes/LostAndFoundContainer';
import AddDetailsLostPet from './includes/AddDetailsLostPet';
import FiterSectionLostAndFound from './includes/FiterSectionLostAndFound';
import {ApiSectionsLostPets} from './includes/ApiSection';
import CustomToast from '../../../components/toast/CustomToast';
import Toast from 'react-native-toast-notifications';
import AppReviewModal from '../../common/includes/AppReviewModal';
import ModalScreen from '../../Profile-related/ModalScreen';

const LostAndFoundListPage = () => {
    const navigation = useNavigation();
    const toastRef = useRef();

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisibleFilter, setModalVisibleFilter] = useState(false);
    const [lostPets, setLostPets] = useState([]);
    const [reaLoad, setReaload] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [selectedPet, setSelectedPet] = useState('');

    ApiSectionsLostPets(
        setLostPets,
        reaLoad,
        selectedPet,
        selectedDateRange,
        setIsLoading,
    );

    return (
        <View style={{}}>
            <LostAndFoundHeaderComponent
                setModalVisible={setModalVisible}
                navigation={navigation}
                setModalVisibleFilter={setModalVisibleFilter}
            />
            {isLoading ? (
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
                    showsVerticalScrollIndicator={false}
                    data={lostPets}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => (
                        <LostAndFoundContainer
                            item={item}
                            navigation={navigation}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZE(16),
                        paddingVertical: SIZE(8),
                    }}
                    contentContainerStyle={{
                        paddingBottom: SIZES.height * 0.13,
                        paddingTop: SIZE(12),
                    }}
                />
            )}

            {/* <FlatList
                data={lostPets}
                renderItem={({item}) => (
                    <LostAndFoundContainer
                        item={item}
                        navigation={navigation}
                    />
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                columnWrapperStyle={styles.columnWrapper}
            /> */}
            <ModalScreen
                isVisible={modalVisible}
                setVisible={setModalVisible}
                toastRef={toastRef}
                inner={
                    <AddDetailsLostPet
                        reaLoad={reaLoad}
                        setReaload={setReaload}
                        setModalVisible={setModalVisible}
                        toastRef={toastRef}
                    />
                }
            />
            <ModalScreen
                isVisible={modalVisibleFilter}
                setVisible={setModalVisibleFilter}
                toastRef={toastRef}
                inner={
                    <FiterSectionLostAndFound
                        reaLoad={reaLoad}
                        setReaload={setReaload}
                        setModalVisibleFilter={setModalVisibleFilter}
                        selectedDateRange={selectedDateRange}
                        setSelectedDateRange={setSelectedDateRange}
                        selectedPet={selectedPet}
                        setSelectedPet={setSelectedPet}
                        toastRef={toastRef}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        margin: 8,
    },
    modalContainer: {
        backgroundColor: '#F7F7F7',
        // bottom: 0,
        // position: 'absolute',
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
    flatListContainer: {
        paddingBottom: SIZE(16),
    },
});

export default LostAndFoundListPage;
