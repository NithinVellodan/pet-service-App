import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

//constants
import {FONTS} from '../../../../../theme/fonts';
import {SIZE} from '../../../../../theme/theme';

const TrainerProfileGallery = ({data}) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingText}>Images</Text>
            <View style={styles.galleryMain}>
                {data?.map((item, index) => (
                    <View key={index} style={styles.gallery}>
                        <Image
                            style={styles.galleryImage}
                            source={{uri: item.image}}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default TrainerProfileGallery;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: SIZE(32),
    },
    headingText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(18),
        fontWeight: '600',
        color: '#242424',
        marginBottom: SIZE(16),
    },
    galleryMain: {
        gap: SIZE(16),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gallery: {
        width: SIZE(118),
        height: SIZE(90),
        overflow: 'hidden',
        borderRadius: SIZE(8),
    },
    galleryImage: {
        width: '100%',
        height: '100%',
    },
});
