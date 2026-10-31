import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
//packages
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
//constants
import {FONTS} from '../../theme/fonts';
import {SIZE} from '../../theme/theme';
//components
import Headers from '../includes/headers/Headers';
import MyPetSingle from './includes/MyPetSingle';
import AddYourPetDetails from '../detail/AddYourPetDetails';
//images and logos
import SpotLightLogo from '../../assets/icons/emptypet.svg';

const MyPets = () => {
    const route = useRoute();
    //states
    const [petsAvailable, setPetsAvailable] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const myPetData = [
        {
            id: 1,
            name: 'Retriever',
            category: 'Dog',
            image: require('../../assets/images/mypets/pet1.png'),
        },
        {
            id: 2,
            name: 'Birman',
            category: 'Cat',
            image: require('../../assets/images/mypets/pet2.png'),
        },
        {
            id: 3,
            name: 'Scottish fold',
            category: 'Cat',
            image: require('../../assets/images/mypets/pet3.png'),
        },
        {
            id: 4,
            name: 'Poodle',
            category: 'Dog',
            image: require('../../assets/images/mypets/pet4.png'),
        },
        {
            id: 5,
            name: 'Bulldog',
            category: 'Dog',
            image: require('../../assets/images/mypets/pet5.png'),
        },
        {
            id: 6,
            name: 'Siberian Husky',
            category: 'Dog',
            image: require('../../assets/images/mypets/pet6.png'),
        },
    ];

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
                {petsAvailable ? (
                    <FlatList
                        bounces={false}
                        data={myPetData}
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
                    />
                ) : (
                    <View style={styles.spotlightMain}>
                        <View style={styles.spotlight}>
                            <SpotLightLogo width={'100%'} height={'100%'} />
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
                )}
            </View>
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
                <AddYourPetDetails
                    forClose={true}
                    setEditModalVisible={setEditModalVisible}
                />
            </Modal>
        </View>
    );
};

export default MyPets;

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
    },
    spotlightMain: {
        flex: 1,

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
        backgroundColor: '#003459',
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
});
