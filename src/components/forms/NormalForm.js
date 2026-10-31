import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// modal country
import Modal from 'react-native-modal';
import FlagModal from '../modals/FlagModal';
import {usersConfig} from '../../../axiosConfig';

// theme
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// svg
import GpsIcon from '../../assets/icons/gps.svg';
import EyeSlashIcon from '../../assets/icons/eye-slash-icon.svg';
import EyeSlashIconOpen from '../../assets/icons/eye-open.svg';
import GreenTickIcon from '../../assets/icons/tick-green.svg';
import ArrowDown from '../../assets/icons/arrow-down.svg';
import InfoCircle from '../../assets/icons/info-circle.svg';

const NormalForm = ({
    label,
    placeholder,
    type,
    marginTop,
    verifyButton,
    country,
    trust,
    onPress,
    buttonLoader,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    name,
    setName,
    phoneNo,
    setPhoneNo,
    emailId,
    setEmailId,
    addPassword,
    setAddPassword,
    addRePassword,
    setAddRePassword,
    valueData,
    selectedCountry,
    setSelectedCountry,
    emailF,
    setEmailF,
    resetPassword,
    setResetPassword,
    reResetPassword,
    setReResetPassword,
    loginError,
    setError,
    descriptionForm,
    showWarnings,
    setvalue,
    dataValue,
    pricePerDay,
    setPricePerDay,
    description,
    setDescription,
    maxlength,
    setVisible,
}) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordShow, setPasswordShow] = useState(true);
    const [flagModal, setFlagModal] = useState(false);
    const [countryCode, setCountryCode] = useState('+971');
    const [searchResults, setSearchResults] = useState([]);
    const [countries, setCountries] = useState([]);
    const [webCode, setWebCode] = useState('AE');
    const [countryName, setCountryName] = useState('United Arab Emirates');

    const getCountries = async () => {
        usersConfig
            .get('get-countries/')
            .then(response => {
                const {StatusCode, data} = response.data;

                if (StatusCode === 6000) {
                    setCountries(data);
                    setSearchResults(data);
                }
            })
            .catch(error => {});
    };
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        getCountries();
        if (name?.length > 0) {
            setError('');
        } else if (email?.length > 0) {
            setError('');
        } else if (phone?.length > 0) {
            setError('');
        } else if (password?.length > 0) {
            setError('');
        } else if (emailF?.length > 0) {
            setError('');
        } else if (resetPassword?.length > 0) {
            setError('');
        } else if (reResetPassword?.length > 0) {
            setError('');
        } else if (addPassword?.length > 0) {
            setError('');
        } else if (addRePassword?.length > 0) {
            setError('');
        } else if (dataValue?.length > 0) {
            setError('');
        } else if (phoneNo?.length > 0) {
            setError('');
        } else if (emailId?.length > 0) {
            setError('');
        }
    }, [
        name,
        password,
        email,
        phone,
        emailF,
        resetPassword,
        reResetPassword,
        addPassword,
        addRePassword,
        dataValue,
        phoneNo,
        emailId,
    ]);

    const toggleShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <View
            style={{
                marginTop: marginTop ? SIZE(marginTop) : SIZE(40),
                zIndex: 1,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    zIndex: 1,
                }}>
                <View>
                    <Text style={styles.labelText}>{label}</Text>
                </View>
                {showWarnings === true && (
                    <View style={{width: SIZE(20), height: SIZE(20)}}>
                        <InfoCircle width="100%" height="100%" />
                    </View>
                )}
            </View>
            <View
                style={{
                    ...styles.inputBox,
                    borderColor:
                        (loginError && type === 'email') ||
                        (loginError && type === 'phone') ||
                        (loginError && type === 'password')
                            ? 'red'
                            : isFocused
                            ? '#009FD3'
                            : styles.inputBox.borderColor,

                    height: descriptionForm && SIZE(93),
                    flexDirection: !descriptionForm ? 'row' : 'column',
                    justifyContent: !descriptionForm ? 'space-between' : null,
                    alignItems: !descriptionForm ? 'center' : 'flex-start',
                }}>
                <Modal
                    onBackButtonPress={() => {
                        setFlagModal(false);
                    }}
                    onBackdropPress={() => {
                        setFlagModal(false);
                    }}
                    isVisible={flagModal}
                    backdropOpacity={0.4}
                    style={{
                        margin: 0,
                        screenBackgroundColor: 'transparent',
                        modalPresentationStyle: 'overCurrentContext',
                    }}
                    propagateSwipe={true}
                    useNativeDriver={false}
                    useNativeDriverForBackdrop={true}
                    onSwipeComplete={() => setFlagModal(false)}
                    swipeDirection={['down']}
                    animationType={'fade'}
                    animationIn={'slideInUp'}
                    animationInTiming={500}
                    animationOutTiming={1500}>
                    <FlagModal
                        setFlagModal={setFlagModal}
                        selectedCountry={selectedCountry}
                        setSelectedCountry={setSelectedCountry}
                        countries={countries}
                        setCountryCode={setCountryCode}
                        countryCode={countryCode}
                        setWebCode={setWebCode}
                        countryName={countryName}
                        setCountryName={setCountryName}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        setPhone={setPhone || setPhoneNo}
                    />
                </Modal>
                {type === 'phone' && country === true && (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (!trust && !valueData) {
                                    setFlagModal(true);
                                } else {
                                    setFlagModal(false);
                                }
                            }}
                            style={{
                                width: '20%',
                                backgroundColor: '#f7f7f7',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <View>
                                <Image
                                    style={styles.imageStyle}
                                    source={
                                        selectedCountry
                                            ? {uri: selectedCountry?.flag_url}
                                            : require('../../assets/images/uae.png')
                                    }
                                />
                            </View>
                            <Text
                                style={{
                                    marginLeft: SIZE(10),
                                    fontFamily: FONTS.regular,
                                    fontSize: SIZE(14),
                                    color: '#242424',
                                }}>
                                {selectedCountry.country_code}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                <TextInput
                    editable={trust ? false : true && valueData ? false : true}
                    multiline={descriptionForm}
                    paddingVertical={Platform.OS === 'ios' ? SIZE(15) : null}
                    value={
                        email ||
                        phone ||
                        password ||
                        name ||
                        phoneNo ||
                        emailId ||
                        addPassword ||
                        addRePassword ||
                        valueData ||
                        emailF ||
                        resetPassword ||
                        reResetPassword ||
                        dataValue ||
                        pricePerDay ||
                        description
                    }
                    onFocus={() => {
                        setIsFocused(true);
                        setVisible && setVisible(false);
                    }}
                    onBlur={() => setIsFocused(false)}
                    maxLength={
                        type == 'phone'
                            ? selectedCountry
                                ? selectedCountry.phone_number_length
                                : 9
                            : maxlength
                            ? maxlength
                            : 1000
                    }
                    onChangeText={
                        setEmail ||
                        setPhone ||
                        setPassword ||
                        setName ||
                        setPhoneNo ||
                        setEmailId ||
                        setAddPassword ||
                        setAddRePassword ||
                        setEmailF ||
                        setResetPassword ||
                        setReResetPassword ||
                        setvalue ||
                        setPricePerDay ||
                        setDescription
                    }
                    style={[
                        styles.textInputStyle,
                        {
                            height: '100%',
                            width: verifyButton
                                ? SIZE(280)
                                : type === 'password' ||
                                  type === 'gps' ||
                                  'downArrow'
                                ? !descriptionForm
                                    ? SIZE(300)
                                    : '100%'
                                : '100%',
                            textAlignVertical: descriptionForm
                                ? 'top'
                                : 'center',
                        },
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(36, 36, 36, 0.5)'}
                    keyboardType={
                        type === 'phone'
                            ? 'numeric'
                            : type == 'email'
                            ? 'email-address'
                            : type === 'price'
                            ? 'numeric'
                            : type === 'numeric'
                            ? 'numeric'
                            : 'default'
                    }
                    secureTextEntry={
                        type === 'password' && !passwordVisible
                            ? true
                            : type === 'password' && !passwordShow
                            ? false
                            : false
                    }
                />
                {type === 'password' && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={toggleShowPassword}>
                        {passwordVisible ? (
                            <EyeSlashIconOpen width={'100%'} height={'100%'} />
                        ) : (
                            <EyeSlashIcon width={'100%'} height={'100%'} />
                        )}
                    </TouchableOpacity>
                )}
                {type === 'gps' && (
                    <TouchableOpacity
                        style={{
                            width: SIZE(24),
                            height: SIZE(24),
                        }}>
                        <GpsIcon width={'100%'} height={'100%'} />
                    </TouchableOpacity>
                )}
                {type === 'downArrow' && (
                    <TouchableOpacity
                        style={{
                            width: SIZE(24),
                            height: SIZE(24),
                        }}>
                        <ArrowDown width={'100%'} height={'100%'} />
                    </TouchableOpacity>
                )}
                {verifyButton && (
                    <TouchableOpacity
                        style={styles.verifyButton}
                        disabled={buttonLoader === true || trust ? true : false}
                        onPress={() => {
                            onPress && onPress();
                        }}>
                        {trust ? (
                            <View style={styles.iconContainer}>
                                <GreenTickIcon width={'100%'} height={'100%'} />
                            </View>
                        ) : (
                            <View>
                                {buttonLoader ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#009FD3"
                                    />
                                ) : (
                                    <Text style={styles.verifyButtonText}>
                                        Verify
                                    </Text>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default NormalForm;

const styles = StyleSheet.create({
    imageStyle: {
        width: SIZE(20),
        height: SIZE(15),
    },
    labelText: {
        fontFamily: FONTS.medium,
        fontSize: SIZE(16),
        color: '#686868',
        marginBottom: SIZE(8),
    },
    inputBox: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#D3D3D3',
        paddingHorizontal: SIZE(10),
        backgroundColor: '#f7f7f7',
    },
    textInputStyle: {
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#242424',
    },
    iconContainer: {
        width: SIZE(24),
        height: SIZE(24),
    },
    verifyButton: {
        width: SIZE(55),
        marginLeft: SIZE(8),
        position: 'absolute',
        right: SIZE(10),
        alignItems: 'flex-end',
    },
    verifyButtonText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#009FD3',
    },
});
