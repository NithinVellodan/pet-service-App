import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';

//packages
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useToast} from 'react-native-toast-notifications';

//coṇstant
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {usersConfigGeneral} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';

//components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';

//svg
import CloseIcon from '../../assets/icons/close-icon-blue.svg';

const AddBankAccount = ({
    setModalFilter,
    setBankAdd,
    edit,
    bankDetails,
    reload,
}) => {
    const {state, dispatch} = useContext(Context);
    const toast = useToast();

    const [errorMessage, setErrorMessage] = useState({});
    const [name, setName] = useState(edit ? bankDetails.account_holder : '');
    const [account, setAccount] = useState(
        edit ? bankDetails.account_number : '',
    );
    const [number, setNumber] = useState(edit ? bankDetails.iban_number : '');
    const [bankName, setBankName] = useState(edit ? bankDetails.bank_name : '');
    const [submitLoading, setSubmitLoading] = useState(false);

    const AddBankAccount = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('account_holder', name);
        formData.append('account_number', account);
        formData.append('iban_number', number);
        formData.append('bank_name', bankName);

        try {
            await usersConfigGeneral
                .post('add-bank-account/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    if (response.data.StatusCode === 6000) {
                        setSubmitLoading(false);
                        setModalFilter(false);
                        setBankAdd(true);
                        reload && reload();
                        toast.show(response.data.message, {
                            type: 'success',
                        });
                    }
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };
    const UpdateBankAccount = async () => {
        setSubmitLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        const pk = bankDetails.id;
        formData.append('account_holder', name);
        formData.append('account_number', account);
        formData.append('iban_number', number);
        formData.append('bank_name', bankName);
        try {
            await usersConfigGeneral
                .patch(`update-bank-account/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    if (response.data.StatusCode === 6000) {
                        setSubmitLoading(false);
                        setModalFilter(false);
                        setBankAdd(true);
                        reload && reload();
                        toast.show(response.data.message, {
                            type: 'success',
                        });
                    }
                })
                .catch(error => {
                    setSubmitLoading(false);
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: '#F7F7F7', width: SIZES.width}}>
            <View style={{height: SIZE(60)}}>
                <TouchableOpacity
                    onPress={() => {
                        setModalFilter(false);
                    }}
                    hitSlop={SIZE(5)}
                    style={{
                        position: 'absolute',
                        top: SIZE(20),
                        right: SIZE(20),
                    }}>
                    <CloseIcon width={SIZE(15)} height={SIZE(15)} />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                extraScrollHeight={SIZE(100)}
                bounces={false}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}>
                <View>
                    <DoubleColorHeading
                        firstTitle={edit ? 'Edit' : 'Add'}
                        secondTitle={'Bank Account'}
                        isCenter={true}
                    />
                    <DescriptionHeading
                        text={'Please Enter Your Bank Details'}
                    />
                </View>
                <View>
                    <View>
                        <NormalForm
                            label={'Account Holder Name'}
                            placeholder={'Enter your Name'}
                            name={name}
                            setName={setName}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.account_holder && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.account_holder}
                            </Text>
                        )}
                    </View>
                    <View>
                        <NormalForm
                            type={'numeric'}
                            maxlength={16}
                            label={'Account Number'}
                            placeholder={'Enter your Account Name'}
                            name={account}
                            marginTop={24}
                            setName={setAccount}
                            setError={setErrorMessage}
                        />
                        {errorMessage?.account_number ? (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.account_number}
                            </Text>
                        ) : (
                            errorMessage?.account_valid && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.account_valid}
                                </Text>
                            )
                        )}
                    </View>
                    <View>
                        <NormalForm
                            type={'numeric'}
                            maxlength={23}
                            label={'IBAN Number'}
                            placeholder={'Enter IBAN Number'}
                            name={number}
                            setName={setNumber}
                            setError={setErrorMessage}
                            marginTop={24}
                        />
                        {errorMessage?.iban_number ? (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.iban_number}
                            </Text>
                        ) : (
                            errorMessage?.iban_valid && (
                                <Text style={styles.errorMessage}>
                                    {errorMessage?.iban_valid}
                                </Text>
                            )
                        )}
                    </View>
                    <View>
                        <NormalForm
                            label={'Bank Name'}
                            placeholder={'Enter Bank Name'}
                            name={bankName}
                            setName={setBankName}
                            setError={setErrorMessage}
                            marginTop={24}
                        />
                        {errorMessage?.bank_name && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.bank_name}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalFilter(false);
                        }}
                        activeOpacity={0.8}
                        style={styles.skipContainer}>
                        <Text allowFontScaling={false} style={styles.skipText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (
                                name &&
                                account &&
                                account.length === 16 &&
                                number
                            ) {
                                if (edit) {
                                    UpdateBankAccount();
                                    console.log('edit');
                                } else {
                                    AddBankAccount();
                                    console.log('add');
                                }
                            } else {
                                setErrorMessage({
                                    ...errorMessage,
                                    account_holder: name
                                        ? ''
                                        : 'Enter Account holder Name',
                                    account_number: account
                                        ? ''
                                        : 'Enter Account Number',
                                    account_valid:
                                        account.length === 16
                                            ? ''
                                            : 'Enter a valid  account number',
                                    iban_number: account
                                        ? ''
                                        : 'Enter IBAN Number',
                                    iban_valid:
                                        account.length === 23
                                            ? ''
                                            : 'Enter a valid  IBAN number',
                                    bank_name: bankName
                                        ? ''
                                        : 'Enter Bank  Name',
                                });
                            }
                        }}
                        style={styles.nextContainer}>
                        {submitLoading ? (
                            <ActivityIndicator
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                size="small"
                                color={'#fff'}
                            />
                        ) : (
                            <Text
                                allowFontScaling={false}
                                style={styles.nextText}>
                                Save
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};
export default AddBankAccount;
const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingHorizontal: SIZE(32),
        paddingBottom: SIZE(34),
    },

    mainHeadingContainer: {
        borderBottomWidth: SIZE(2),
        paddingBottom: SIZE(16),
        borderBottomColor: '#E2E2E2',
    },
    mainHeading: {
        fontSize: SIZE(24),
        color: '#242424',
        fontFamily: FONTS.semiBold,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    skipContainer: {
        backgroundColor: '#F7F7F7',
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        width: SIZE(174),
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        marginTop: SIZE(24),
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        paddingHorizontal: SIZE(16),
        backgroundColor: '#003459',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
