import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';

//packages
import AsyncStorage from '@react-native-async-storage/async-storage';

//constants
import {Context} from '../../../contexts/Store';

// components
import DescriptionHeading from '../../../components/headings/DescriptionHeading';

// theme
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//svg
import VerifiedTick from '../../../assets/icons/tick-circledark.svg';
import VerifiedTickLight from '../../../assets/icons/tick-circle.svg';

const SuccessDel = ({
    successLabel,
    label,
    isSmall,
    setOpen,
    isOpen,
    setDeleteModalMain,
    setDeleteModal,
    darkTin,
}) => {
    const {state, dispatch} = useContext(Context);
    const handleProvider = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    const handleDelete = async () => {
        try {
            await AsyncStorage.clear();
            handleProvider({
                ...state.userData,
                isVerified: false,
                isTermsAndCondition: false,
                isPetDetailsAdded: false,
                phone: '',
                is_login: false,
                is_skip: false,
                mailId: '',
                name: '',
                accessToken: '',
                role: '',
                photo: '',
                tempPk: '',
                accountStatus: '',
                is_service: false,
                is_temp: false,
            });
        } catch (error) {
            console.log('Error clearing AsyncStorage:', error);
        }
    };
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setOpen(false);
                setDeleteModalMain(false);
                setDeleteModal('delete-account');
                handleDelete();
            }, 2000);
        }
    }, [isOpen]);
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {darkTin === 'dark' ? (
                    <VerifiedTick width={'100%'} height={'100%'} />
                ) : (
                    <VerifiedTickLight width={'100%'} height={'100%'} />
                )}
            </View>
            <Text
                style={[
                    styles.successLabel,
                    {color: darkTin === 'dark' ? '#003459' : '#009FD3'},
                ]}>
                {successLabel}
            </Text>

            <DescriptionHeading
                isCenter={true}
                text={label}
                isSmall={isSmall}
            />
        </View>
    );
};

export default SuccessDel;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
        alignItems: 'center',
    },
    iconContainer: {
        width: SIZE(120),
        height: SIZE(120),
    },
    successLabel: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(25),
        fontWeight: '600',
        paddingTop: SIZE(32),
    },
});
