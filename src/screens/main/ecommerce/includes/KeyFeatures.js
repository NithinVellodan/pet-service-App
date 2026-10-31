import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';

const KeyFeatures = ({selectedFood, quantity, variantItem}) => {
    return (
        <View style={{paddingHorizontal: SIZE(16), marginBottom: SIZE(32)}}>
            <View
                style={{
                    padding: SIZE(16),
                    backgroundColor: '#fff',
                    borderRadius: SIZE(8),
                }}>
                <View
                    style={{
                        borderBottomWidth: SIZE(1),
                        borderColor: '#E2E2E2',
                        paddingBottom: SIZE(12),
                        marginBottom: SIZE(8),
                    }}>
                    <Text style={styles.heading}>Key Features</Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>For Cat</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>Quantity</Text>
                    </View>
                    <View style={{marginRight: SIZE(2)}}>
                        <Text style={styles.dot}>:</Text>
                    </View>

                    <View>
                        <Text style={styles.detailName}>{quantity}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>Size</Text>
                    </View>
                    <View style={{marginRight: SIZE(2)}}>
                        <Text style={styles.dot}>:</Text>
                    </View>

                    <View>
                        <Text style={styles.detailName}>
                            {variantItem?.kilogram}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>Food Type</Text>
                    </View>
                    <View style={{marginRight: SIZE(2)}}>
                        <Text style={styles.dot}>:</Text>
                    </View>

                    <View>
                        <Text style={styles.detailName}>Dry</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>Flavour</Text>
                    </View>
                    <View style={{marginRight: SIZE(2)}}>
                        <Text style={styles.dot}>:</Text>
                    </View>

                    <View>
                        <Text style={styles.detailName}>
                            {selectedFood.title ?? 'Ocean Fish'}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <View style={styles.detailContainer}></View>
                    <View style={styles.detailHeadingContainer}>
                        <Text style={styles.detailHeading}>Shelf Life</Text>
                    </View>
                    <View style={{marginRight: SIZE(2)}}>
                        <Text style={styles.dot}>:</Text>
                    </View>

                    <View>
                        <Text style={styles.detailName}> 14 Months</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default KeyFeatures;

const styles = StyleSheet.create({
    heading: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
    },
    detailContainer: {
        width: SIZE(5),
        height: SIZE(5),
        borderRadius: SIZE(50),
        backgroundColor: '#686868',
        marginRight: SIZE(12),
    },

    detailHeadingContainer: {marginRight: SIZE(8)},

    detailHeading: {
        fontSize: SIZE(14),
        color: '#686868',
        fontFamily: FONTS.regular,
    },
    dot: {
        fontSize: SIZE(14),
        color: '#686868',
        fontFamily: FONTS.bold,
    },
    detailName: {
        fontSize: SIZE(14),
        color: '#686868',
        fontFamily: FONTS.regular,
    },
});
