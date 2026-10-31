import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../../theme/theme';
import CloseIcon from '../../../../assets/icons/closedark.svg';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import DescriptionInput from './DescriptionInput';
import DropDown from './DropDown';
import {FONTS} from '../../../../theme/fonts';

const CancelOrder = ({
    close,
    categoryValue,
    setCategoryValue,
    orderDelText,
    setOrderDelText,
    errorMessage,
    setError,
    clearAll,
    cancelOrders,
    buttonLoading,
}) => {
    const [category, setcategory] = useState([
        {id: 1, name: 'Product Damage'},
        {id: 2, name: 'Out of Stock'},
        {id: 3, name: 'Other'},
    ]);
    const [categoryVisible, setCategoryVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    close(false);
                    clearAll();
                }}
                hitSlop={SIZE(5)}
                style={{position: 'absolute', top: SIZE(20), right: SIZE(20)}}>
                <CloseIcon width={SIZE(10)} height={SIZE(10)} />
            </TouchableOpacity>
            <View>
                <DoubleColorHeading
                    secondTitle={'Cancel Order'}
                    isCenter={true}
                />
                <DescriptionHeading
                    text={'Provide the reason behind your cancellation.'}
                    isCenter={true}
                />
                <View style={{marginTop: SIZE(-40)}}>
                    <DropDown
                        choose={'Choose the reason'}
                        data={category}
                        setCategoryValue={setCategoryValue}
                        categoryValue={categoryValue}
                        setError={setError}
                        categoryVisible={categoryVisible}
                        setCategoryVisible={setCategoryVisible}
                    />
                    {errorMessage?.reason_value && (
                        <Text style={styles.errorMessage}>
                            {errorMessage?.reason_value}
                        </Text>
                    )}
                </View>
                {categoryValue.name === 'Other' && (
                    <View>
                        <DescriptionInput
                            placeholder={'Enter reason'}
                            margitop={-20}
                            description={orderDelText}
                            setDescription={setOrderDelText}
                            setError={setError}
                        />
                        {errorMessage?.reason && (
                            <Text style={styles.errorMessage}>
                                {errorMessage?.reason}
                            </Text>
                        )}
                    </View>
                )}

                <TouchableOpacity
                    style={styles.cancelButton}
                    disabled={buttonLoading}
                    activeOpacity={0.8}
                    onPress={() => {
                        if (
                            categoryValue.name === 'Other'
                                ? orderDelText
                                : categoryValue
                        ) {
                            // console.log(categoryValue.name);
                            // close(false);
                            // clearAll();
                            cancelOrders();
                        } else {
                            setError({
                                ...errorMessage,
                                reason_value: categoryValue
                                    ? ''
                                    : 'Please select the reason',
                                reason: orderDelText
                                    ? ''
                                    : 'Please enter your reason',
                            });
                        }
                    }}>
                    {buttonLoading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.rightText}>Cancel Order</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CancelOrder;

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
    cancelButton: {
        marginTop: SIZE(24),
        backgroundColor: '#CF2929',
        paddingVertical: SIZE(10),
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(32),
    },
    rightText: {
        color: '#fff',
        fontFamily: FONTS.bold,
        fontSize: SIZE(14),
        textAlign: 'center',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
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
