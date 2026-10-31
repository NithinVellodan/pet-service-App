import {StyleSheet, View, Animated} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

// theme
import {SIZE, SIZES} from '../../../theme/theme';

// components
import DoubleColorHeading from '../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../components/headings/DescriptionHeading';
import BorderButton from '../../../components/buttons/BorderButton';
import ColoredButton from '../../../components/buttons/ColoredButton';
import {usersConfig} from '../../../../axiosConfig';

//images and icons
import LogoImage from '../../../assets/icons/login-new.svg';
// store
import {Context} from '../../../contexts/Store';

const TermsConditions = ({
    setModalScreens,
    bookingPage,
    termsAccept,
    close,
}) => {
    const {state, dispatch} = useContext(Context);
    const [animation] = useState(new Animated.Value(0));

    // Animate
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350, // Adjust the duration as needed
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0], // Adjust the starting and ending positions
    });
    // Animate

    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const agreeTerms = () => {
        const token = state.userData.accessToken;
        usersConfig
            .post(
                'agree-terms/',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(response => {
                if (response.data?.StatusCode === 6000) {
                    updateUserDate({
                        ...state.userData,
                        isTermsAndCondition: true,
                    });
                    if (bookingPage) {
                        updateUserDate({
                            ...state.userData,
                            is_login: true,
                            isTermsAndCondition: true,
                        });
                        close(false);
                    } else if (termsAccept) {
                        close(false);
                    } else {
                        setModalScreens('SuccessfulPage');
                    }
                } else {
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.log(error, 'catch error--===---==');
            });
    };

    return (
        <View style={[styles.container]}>
            <View>
                <View style={{width: SIZE(50), height: SIZE(50)}}>
                    <LogoImage width={'100%'} height={'100%'} />
                </View>
                <DoubleColorHeading firstTitle={'Pet to Place'} />
                <View style={{marginTop: SIZE(30)}}>
                    <DoubleColorHeading
                        firstTitle={'Terms &'}
                        secondTitle={'Conditions'}
                    />
                </View>
                <DescriptionHeading
                    text={
                        'Velit proin nec augue nibh enim. Nam eges tasp haretra diam dignissim sit nulla.'
                    }
                />
                <DescriptionHeading
                    text={
                        'Posuere eget egestas mattis nec libero scelerisq ue in. Tempus commodo elit eu pharetra. Susp endisse nibh et ipsum amet cras odio. Volutpat euismod amet auctor cursus sed in sem tortor vel. Sit cursus arcu sollicitudin mus. Erat adipiscing etiam urna tellus quam mi egestas massa. Sed magna.'
                    }
                />
            </View>

            <View>
                <View style={styles.coloredButton}>
                    <ColoredButton
                        onPress={() => {
                            agreeTerms();
                        }}
                        label={'Agree & Continue'}
                    />
                </View>
                <BorderButton
                    onPress={() => {
                        if (termsAccept) {
                            close(false);
                        } else {
                            updateUserDate({
                                ...state.userData,
                                isTermsAndCondition: false,
                                name: '',
                                accessToken: '',
                                is_login: false,
                                tempPk: '',
                                is_skip: true,
                            });
                            setModalScreens('detail');
                            if (bookingPage) {
                                close(false);
                            }
                        }
                    }}
                    label={'Decline'}
                />
            </View>
        </View>
    );
};
export default TermsConditions;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: SIZE(32),
        paddingTop: SIZE(32),
        paddingBottom: SIZE(50),
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
        height: SIZES.height,
        justifyContent: 'space-between',
    },
    coloredButton: {
        // marginTop: 'auto',
    },
});
