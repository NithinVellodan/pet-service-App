import React, {useContext, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';

// packages
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

// svg
import CloseIcon from '../../assets/icons/close-icon-blue.svg';

// theme
import {SIZE, SIZES} from '../../theme/theme';
import {Context} from '../../contexts/Store';

const DetailModal = ({
    setDetailScreens,
    inner,
    isVisible,
    setVisible,
    detailScreens,
    prevModal,
    setOnBack,
    requestType,
}) => {
    const {state, dispatch} = useContext(Context);
    const handleProvider = data => {
        const updatedUserData =
            detailScreens === 'continue' ? {...data, is_service: false} : data;

        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: updatedUserData,
        });
    };

    useEffect(() => {
        handleProvider(state.userData);
    }, [detailScreens]);

    return (
        <Modal
            onBackButtonPress={() => {
                setVisible(false);
            }}
            isVisible={isVisible}
            backdropOpacity={0.4}
            onRequestClose={() => {
                setVisible(true);
                setOnBack(false);

                switch (detailScreens) {
                    case 'confirm':
                        setDetailScreens('breedDetail');
                        break;
                    case 'breedDetail':
                        setDetailScreens('placeDetails');
                        break;
                    case 'placeDetails':
                        setDetailScreens('addPet');
                        break;
                    case 'addPet':
                        setDetailScreens('continue');
                        break;
                    case 'AddYourPetDetails':
                        setDetailScreens('addPet');
                        break;
                    case 'ConfirmationTwo':
                        setDetailScreens('AddYourPetDetails');
                        break;
                    default:
                        // Close the app or handle as needed
                        // For example, you can use a back handler to close the app
                        // or navigate to the home screen.
                        // Handle app exit/close logic here.
                        break;
                }
            }}
            deviceHeight={SIZES.height}
            style={[
                styles.modalContainer,
                {
                    screenBackgroundcolor: 'transparent',
                    modalPresentationStyle: 'overCurrentContext',
                    backgroundColor: '#F7F7F7',
                },
            ]}
            useNativeDriver={false}
            useNativeDriverForBackdrop={true}
            onSwipeComplete={() => {
                setVisible(false);
            }}
            animationInTiming={1500}
            animationOutTiming={200}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {detailScreens !== 'continue' &&
                        detailScreens !== 'addPet' && (
                            <TouchableOpacity
                                style={styles.buttonIcon}
                                onPress={() => {
                                    setVisible(true);
                                    setOnBack(false);
                                    if (detailScreens === 'continue') {
                                        setOnBack(true);
                                    } else if (detailScreens !== prevModal) {
                                        setDetailScreens(prevModal);
                                    }
                                }}>
                                <CloseIcon width={'100%'} height={'100%'} />
                            </TouchableOpacity>
                        )}

                    {inner}
                </View>
            </ScrollView>
        </Modal>
    );
};

export default DetailModal;

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: SIZE(30),
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        overflow: 'hidden',
    },
    container: {
        backgroundColor: '#F7F7F7',
        width: '100%',
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        paddingBottom: SIZE(25),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        alignSelf: 'flex-end',
    },
});
