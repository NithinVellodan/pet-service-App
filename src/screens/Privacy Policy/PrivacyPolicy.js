import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Headers from '../includes/headers/Headers';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import React from 'react';

export default function PrivacyPolicy() {
    return (
        <View>
            <Headers headText={'Privacy Policy'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.container}>
                <View style={{paddingBottom: SIZE(60)}}>
                    <View style={{marginBottom: SIZE(12)}}>
                        <Text style={styles.lastUpdate}>
                            Last Updated On 08 Jan 2023
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>
                            Enim posuere tincidunt pellentesque dignissim turpis
                            et diam.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.paragraph}>
                            Pharetra magna sed molestie sit fermentum pulvinar
                            sagittis quisque. Euismod sit et fermentum elementum
                            quis. Eget sed risus venenatis eget viverra cursus
                            nisi porttitor egestas. Ornare eu turpis suspendisse
                            tincidunt ultrices etiam mauris. Quis nibh senectus
                            libero at orci tellus. Tristique ultrices
                            sollicitudin leo volutpat enim viverra. Consequat eu
                            et leo hac ut ac amet in. Ut scelerisque facilisi eu
                            ornare egestas. Ac sed pretium neque amet. Mauris
                            fermentum massa pretium proin scelerisque maecenas
                            in amet sit. Purus lectus auctor nullam ac tellus
                            et. Senectus ut neque massa tincidunt vitae vitae ut
                            enim.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>
                            Enim posuere tincidunt pellentesque dignissim turpis
                            et diam.
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.paragraph}>
                            Lacus pretium nec cras ac consectetur dictum. A
                            viverra sapien rutrum blandit. Euismod sit sed
                            adipiscing aliquam eu. Felis tempor gravida molestie
                            in placerat. Tellus gravida massa sed lectus
                            venenatis ut porttitor. Fames aliquet nec diam quam
                            ornare posuere. Ultricies egestas scelerisque
                            pellentesque eu tortor faucibus feugiat turpis. Urna
                            ac sapien volutpat iaculis cursus cursus ultrices.
                            At at eu quis molestie sollicitudin. Cum dignissim
                            cursus eros ut eget a facilisi. Felis odio mattis
                            purus vitae dignissim iaculis pulvinar lorem
                            eleifend. Pulvinar nec suspendisse morbi urna in
                            pharetra netus. Ultrices aenean tellus pulvinar
                            maecenas massa dolor. Massa aliquet pulvinar enim
                            scelerisque quis. Aliquet convallis lectus cursus
                            mauris sit. Morbi in eget urna vestibulum dui
                            faucibus aliquet arcu. Ipsum ultricies odio
                            ultricies aliquet. Ut mattis vitae adipiscing
                            facilisi. Consectetur diam urna et fermentum id
                            neque facilisi aliquam.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZE(20),
        paddingHorizontal: SIZE(20),
    },
    lastUpdate: {
        fontSize: SIZE(14),
        fontFamily: FONTS.medium,
        color: '#757575',
    },
    subHeading: {
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        color: '#242424',
        marginBottom: SIZE(16),
    },
    paragraph: {
        fontSize: SIZE(14),
        color: '#757575',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(24),
    },
});
