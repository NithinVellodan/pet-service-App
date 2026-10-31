import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Cone from '../../../assets/icons/cone.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const CustomMarker = ({pressed, currentValue, setMarginTop}) => {
    const [markerStyle, setMarkerStyle] = useState(styles.customMarker);

    useEffect(() => {
        if (pressed) {
            setMarkerStyle(styles.pressedMarker);
            // setMarginTop(SIZE(50));
        } else {
            setMarkerStyle(styles.customMarker);
            setMarginTop(SIZE(10));
        }
    }, [pressed]);

    return (
        <View style={styles.container}>
            <View style={markerStyle}></View>
            {pressed && (
                <View style={styles.additionalView}>
                    <View style={{top: SIZE(22)}}>
                        <View style={styles.coneIcon}>
                            <Cone width={'100%'} height={'100%'} />
                        </View>
                    </View>
                    <Text
                        style={{
                            position: 'absolute',
                            fontFamily: FONTS.bold,
                            fontWeight: '600',
                            fontSize: SIZE(13),
                            color: '#242424',
                        }}>
                        AED {currentValue}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingHorizontal: SIZE(10),
    },
    customMarker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009FD3',
        borderRadius: SIZE(30),
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(5),
        borderWidth: SIZE(1),
        borderColor: '#fff',
    },
    pressedMarker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009FD3',
        borderRadius: SIZE(30),
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(5),
        borderWidth: SIZE(1),
        borderColor: '#fff',
    },
    customMarkerText: {
        color: 'white',
    },
    additionalView: {
        position: 'absolute',
        top: SIZE(-40),
        left: SIZE(-50),
        right: 0,
        backgroundColor: '#EAF7FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#98C1D9',
        borderRadius: SIZE(6),
        width: SIZE(130),
        height: SIZE(34),
    },
    coneIcon: {
        width: SIZE(20),
        height: SIZE(20),
    },
});

export default CustomMarker;
