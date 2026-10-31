import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//
import {FONTS} from '../../../../theme/fonts';
import {SIZE} from '../../../../theme/theme';

export default function Description({description}) {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.mainHeading}>Description</Text>
                </View>
                <View style={{marginTop: SIZE(16)}}>
                    {description ? (
                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                    ) : (
                        <Text style={styles.descriptionText}>
                            All cats products a complete and balanced food for
                            adults cats.
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(32),
    },

    subContainer: {
        padding: SIZE(16),
        backgroundColor: '#fff',
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
    },
    headingContainer: {
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    mainHeading: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
    },
    descriptionText: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
    },
});
