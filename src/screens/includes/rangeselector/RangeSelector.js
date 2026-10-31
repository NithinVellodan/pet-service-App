import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

//packages
import MultiSlider from '@ptomasroos/react-native-multi-slider';

//components
import CustomMarker from './CustomMarker';
import CustomLabel from './CustomLabel';

//constants
import {SIZE, SIZES} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

export default function RangeSelector() {
    const [multiSliderValue, setMultiSliderValue] = React.useState([150, 300]);
    // React.useState([110, 150]);

    multiSliderValuesChange = values => setMultiSliderValue(values);

    return (
        <View style={styles.container}>
            <MultiSlider
                values={[multiSliderValue[0], multiSliderValue[1]]}
                sliderLength={SIZE(320)}
                onValuesChange={multiSliderValuesChange}
                min={100}
                max={350}
                step={10}
                allowOverlap
                snapped
                customLabel={CustomLabel}
                // customMarker={CustomMarker}
            />
            <View style={styles.sliderOne}>
                <View style={styles.priceContainer}>
                    <View style={styles.priceLeft}>
                        <View style={styles.headingTextContainer}>
                            <Text style={styles.headingText}>Start</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text allowFontScaling={false} style={styles.text}>
                                AED {multiSliderValue[0]}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.priceRight}>
                        <View style={styles.headingTextContainer}>
                            <Text style={styles.headingText}>End</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text allowFontScaling={false} style={styles.text}>
                                AED {multiSliderValue[1]}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderOne: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
    },
    priceContainer: {
        flexDirection: 'row',
    },
    priceLeft: {
        marginRight: SIZE(170),
    },
    priceRight: {},
    headingTextContainer: {
        marginBottom: SIZE(6),
    },

    headingText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    textContainer: {
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderColor: '#e2e2e2',
        borderRadius: SIZE(6),
        // paddingHorizontal: SIZE(8),
        width: SIZE(74),
        paddingVertical: SIZE(6),
        alignItems: 'center',
    },
    text: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '500',
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
});
