import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
// theme
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// svg
import Location from '../../assets/icons/location.svg';
import PetIcon from '../../assets/icons/pet.svg';
import TrainerIcon from '../../assets/icons/profile-add.svg';
import ProductIcon from '../../assets/icons/product.svg';
import ArrowRight from '../../assets/icons/arrow-right.svg';
// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import BorderButtonBlue from '../../components/buttons/BorderButtonBlue';
import {Context} from '../../contexts/Store';
import AccessDenied from './includes/AccessDenied';
import ModalBox from '../Home/includes/ModalBox';

export default function AddPet({setDetailScreens, setVisible}) {
    const {state, dispatch} = useContext(Context);
    const [selectedButton, setSelectedButton] = useState(0);
    const [termsModal, setTermsModal] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const handleButtonPress = index => {
        setSelectedButton(index);
        switch (index) {
            case 0:
                setSelectedButton(0);
                break;
            case 1:
                setSelectedButton(1);
                break;
            case 2:
                if (!state.userData.store_add) {
                    setSelectedButton(2);
                }
                break;
            case 3:
                if (!state.userData.trainer_add) {
                    setSelectedButton(3);
                }
            default:
                break;
        }
    };

    const handleNextPress = () => {
        switch (selectedButton) {
            case 0:
                setDetailScreens('placeDetails');
                break;
            case 1:
                setDetailScreens('AddYourPetDetails');
                break;
            case 2:
                if (!state.userData.store_add) {
                    setDetailScreens('addStore');
                }
                break;
            case 3:
                if (!state.userData.trainer_add) {
                    setDetailScreens('AddProfile');
                }
                break;
            default:
                break;
        }
    };

    // Animate
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0],
    });
    // Animate

    const handleProvider = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    return (
        <View style={styles.container}>
            <Animated.View style={{transform: [{translateX}]}}>
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={'#007EA7'}
                />
                <DoubleColorHeading
                    firstTitle={'Add'}
                    secondTitle={'Details'}
                    isCenter={true}
                />
                <DescriptionHeading text={'Please Select to Add Details.'} />
                <BorderButtonBlue
                    onPressTwo={() => {
                        setDetailScreens('placeDetails');
                    }}
                    onPress={() => handleButtonPress(0)}
                    label={'Add your Place'}
                    icon={<Location width={'100%'} height={'100%'} />}
                    iconTwo={<ArrowRight width={'100%'} height={'100%'} />}
                    selected={selectedButton === 0}
                />
                <BorderButtonBlue
                    onPressTwo={() => {
                        setDetailScreens('AddYourPetDetails');
                    }}
                    onPress={() => handleButtonPress(1)}
                    label={'Add your Pet'}
                    icon={<PetIcon width={'100%'} height={'100%'} />}
                    iconTwo={<ArrowRight width={'100%'} height={'100%'} />}
                    selected={selectedButton === 1}
                />
                <BorderButtonBlue
                    onPressTwo={() => {
                        if (!state.userData.store_add) {
                            setDetailScreens('addStore');
                        }
                    }}
                    onPress={() => handleButtonPress(2)}
                    label={'Add your Store'}
                    icon={<ProductIcon width={'100%'} height={'100%'} />}
                    iconTwo={<ArrowRight width={'100%'} height={'100%'} />}
                    selected={selectedButton === 2}
                    isStoreAdd={state.userData.store_add}
                />
                <BorderButtonBlue
                    onPressTwo={() => {
                        if (!state.userData.trainer_add) {
                            setDetailScreens('AddProfile');
                        }
                    }}
                    onPress={() => handleButtonPress(3)}
                    label={'Add Trainer Profile'}
                    icon={<TrainerIcon width={'100%'} height={'100%'} />}
                    iconTwo={<ArrowRight width={'100%'} height={'100%'} />}
                    selected={selectedButton === 3}
                    isStoreAdd={state.userData.trainer_add}
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
                            handleProvider({
                                ...state.userData,
                                is_service: true,
                                is_temp: true,
                            });
                        }}
                        activeOpacity={0.8}
                        style={styles.skipContainer}>
                        <Text style={styles.skipText}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleNextPress}
                        style={styles.nextContainer}>
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        height: SIZES.height,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(40),
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        paddingHorizontal: SIZE(32),
        width: '48%',
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        backgroundColor: '#fff',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#003459',
        width: '48%',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
});
