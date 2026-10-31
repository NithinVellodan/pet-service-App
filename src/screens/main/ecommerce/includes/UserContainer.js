import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {FONTS} from '../../../../theme/fonts';
import {SIZE} from '../../../../theme/theme';
export default function UserContainer({donatedCustomer, provider_details}) {
    return (
        <>
            {donatedCustomer ? (
                <View style={styles.mainContainer}>
                    <View style={styles.subContainer}>
                        <View
                            style={{
                                paddingBottom: SIZE(12),
                                borderBottomWidth: SIZE(1),
                                marginBottom: SIZE(12),
                                borderColor: '#E2E2E2',
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONTS.semiBold,
                                    fontSize: SIZE(16),
                                    color: '#242424',
                                }}>
                                Donated by
                            </Text>
                        </View>
                        <View style={styles.vectorContainer}>
                            <View style={styles.deviceContainer}>
                                <Image
                                    source={{
                                        uri: provider_details?.image,
                                    }}
                                    style={styles.reviewImage}
                                />
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.vectorName}>
                                        {provider_details?.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.vectorDescription}>
                                        {/* {provider_details?.description} */}
                                        Egestas egestas quis eu adipiscing
                                        euismod
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.mainContainer2}>
                    <View style={styles.subContainer}>
                        <View style={styles.vectorContainer}>
                            <View style={styles.deviceContainer}>
                                <Image
                                    source={{
                                        uri: provider_details?.image,
                                    }}
                                    style={styles.reviewImage}
                                />
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.vectorName}>
                                        {provider_details?.name}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.vectorDescription}>
                                        Egestas egestas quis eu adipiscing
                                        euismod
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer2: {
        paddingHorizontal: SIZE(16),
    },

    subContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    deviceContainer: {
        width: SIZE(60),
        height: SIZE(60),
        marginRight: SIZE(8),
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: SIZE(100),
        overflow: 'hidden',
    },
    vectorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vectorName: {
        fontSize: SIZE(16),
        color: '#242424',
        fontFamily: FONTS.bold,
    },
    vectorDescription: {
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.regular,
    },
    reviewImage: {
        width: '100%',
        height: '100%',
    },
});
