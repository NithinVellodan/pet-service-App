import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//images and logos
import BottomArrow from '../../../assets/icons/booking-details/bottom-arrow';
import TopArrow from '../../../assets/icons/booking-details/arrow-top';

const DropDownItem = ({item}) => {
    const {state, dispatch} = useContext(Context);
    const [section, setSection] = useState([1, 2, 34]);
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View
            style={[
                styles.contentBoxTop,
                {borderColor: isVisible ? '#009FD3' : '#E2E2E2'},
            ]}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => [setIsVisible(!isVisible)]}
                style={[
                    styles.topBox,
                    {
                        borderBottomWidth: isVisible ? 1 : 0,
                        paddingBottom: !isVisible ? 0 : SIZE(15),
                        marginBottom: !isVisible ? 0 : SIZE(10),
                    },
                ]}>
                <Text style={styles.subContent1}>{item?.Header}</Text>
                <View>{isVisible ? <TopArrow /> : <BottomArrow />}</View>
            </TouchableOpacity>
            {isVisible && (
                <View style={styles.contentBox}>
                    <View style={styles.topConection}>
                        <Text style={styles.answer}>{item.answers}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DropDownItem;

const styles = StyleSheet.create({
    subContent: {
        color: '#969696',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        marginTop: SIZE(10),
        marginBottom: SIZE(6),
    },
    contentBoxTop: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        padding: SIZE(18),
        borderRadius: SIZE(8),
        backgroundColor: '#FFFFFF',
        marginBottom: SIZE(20),
    },
    subContent1: {
        color: '#00171F',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
        marginRight: SIZE(10),
        width: '93%',
    },
    phone: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(15),
        fontWeight: '500',
    },
    name: {
        color: '#242424',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        marginLeft: SIZE(10),
    },
    answer: {
        color: '#969696',
        fontWeight: '400',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },

    topBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: SIZE(1),
        borderBlockColor: '#E2E2E2',
        paddingBottom: SIZE(15),
    },
    selectButton: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(100),
    },
    selection: {
        width: SIZE(12),
        height: SIZE(12),
        backgroundColor: 'red',
        borderRadius: SIZE(100),
    },
    topConection: {flexDirection: 'row', alignItems: 'center'},
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalContainer: {
        borderTopLeftRadius: SIZE(32),
        borderTopRightRadius: SIZE(32),
        flex: 1,
        margin: 0,
    },
});
