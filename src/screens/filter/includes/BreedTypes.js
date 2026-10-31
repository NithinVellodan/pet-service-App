import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ArrowUpIcon from '../../../assets/icons/arrowupblack.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
const BreedTypes = ({breedData}) => {
    const [breedVisible, setBreedVisible] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState('');

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    setBreedVisible(prev => !prev);
                }}
                style={[
                    styles.itemTop,
                    {
                        paddingBottom: breedVisible ? SIZE(12) : 0,
                        borderBottomWidth: breedVisible ? SIZE(1) : 0,
                    },
                ]}>
                <View style={styles.itemHeading}>
                    <Text
                        allowFontScaling={false}
                        style={styles.itemHeadingText}>
                        Breed
                    </Text>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowUpIcon
                        style={{
                            transform: [
                                {
                                    rotate: !breedVisible ? '180deg' : '0deg',
                                },
                            ],
                        }}
                        width={'100%'}
                        height={'100%'}
                    />
                </View>
            </TouchableOpacity>
            {breedVisible && (
                <View style={styles.itemBottom}>
                    {breedData.map(item => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedBreed(item.id);
                                }}
                                activeOpacity={0.8}
                                key={item.id}
                                style={[
                                    styles.itemSub,
                                    {
                                        borderColor:
                                            selectedBreed === item.id
                                                ? '#98C1D9'
                                                : '#E2E2E2',
                                        backgroundColor:
                                            selectedBreed === item.id
                                                ? '#EAF7FF'
                                                : '#FFF',
                                    },
                                ]}>
                                <Text
                                    allowFontScaling={false}
                                    style={[
                                        styles.itemSubText,
                                        {
                                            color:
                                                selectedBreed === item.id
                                                    ? '#009FD3'
                                                    : '#242424',
                                        },
                                    ]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
};

export default BreedTypes;

const styles = StyleSheet.create({
    itemContainer: {
        padding: SIZE(15),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    itemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(12),
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
    },
    itemHeading: {},
    itemHeadingText: {
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    arrowContainer: {
        width: SIZE(16),
        height: SIZE(16),
    },
    itemBottom: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemSub: {
        marginTop: SIZE(16),
        borderRadius: SIZE(6),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(8),
        marginRight: SIZE(16),
    },
    itemSubText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
});
