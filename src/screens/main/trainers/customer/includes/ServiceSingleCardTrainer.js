import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

const ServiceSingleCardTrainer = ({data}) => {
    return (
        <View style={styles.servicesContainer}>
            <Text style={styles.headingText}>Services</Text>
            <View style={styles.underLine}></View>
            {data?.map((item, index) => (
                <View key={index}>
                    <View style={styles.detailContainer}>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={styles.trainingHeading}>
                            {item.service_name}
                        </Text>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={2}
                            style={styles.trainingDescription}>
                            Eu pretium vitae aliquet lectus enim venenatis nunc.
                        </Text>
                    </View>
                    <View style={styles.durationContainer}>
                        <Text style={styles.durationText}>
                            {item.no_of_hours} hr training
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default ServiceSingleCardTrainer;

const styles = StyleSheet.create({
    servicesContainer: {
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#e2e2e2',
        backgroundColor: '#fff',
        padding: SIZE(16),
    },
    headingText: {},
    underLine: {
        height: SIZE(1),
        backgroundColor: '#E2E2E2',
        marginTop: SIZE(12),
        marginBottom: SIZE(16),
    },
    detailContainer: {
        marginBottom: SIZE(16),
    },
    trainingHeading: {
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(20),
        marginBottom: SIZE(8),
    },
    trainingDescription: {
        color: '#686868',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    durationContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(31),
        height: SIZE(31),
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.medium,
        fontWeight: '500',
        textAlign: 'center',
    },
});
