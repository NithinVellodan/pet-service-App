import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';
import {FONTS} from '../../../../../theme/fonts';

//images and logos
import LocationIcon from '../../../../../assets/icons/locationdark.svg';

const TrainerProfileSection = ({profileData}) => {
    return (
        <View style={styles.profileMain}>
            <View style={styles.profilePhoto}>
                {profileData?.image ? (
                    <Image
                        style={styles.profImage}
                        source={{uri: profileData?.image}}
                    />
                ) : null}
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.nameText}>{profileData?.name}</Text>
                <View style={styles.locationTop}>
                    <LocationIcon width={SIZE(20)} height={SIZE(20)} />
                    <Text style={styles.locationText}>
                        {profileData?.location_name}
                    </Text>
                </View>
                <Text style={styles.descriptionText}>
                    {profileData?.about_trainer}
                </Text>
            </View>
            <View style={styles.profileMiddle}>
                <View style={styles.subProfileDetails}>
                    <Text style={styles.subProfileText}>
                        Training for{' '}
                        {profileData?.experience === '10'
                            ? '0 - 1 years'
                            : profileData?.experience === '20'
                            ? '1 - 3 years'
                            : profileData?.experience === '30'
                            ? '3 - 5 years'
                            : profileData?.experience === '40'
                            ? '5 - 10 years'
                            : profileData?.experience === '50'
                            ? '10+ years'
                            : null}
                    </Text>
                </View>
                <View style={styles.subProfileDetails}>
                    <Text style={styles.subProfileText}>
                        AED {profileData?.price_per_hour}/hr
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TrainerProfileSection;

const styles = StyleSheet.create({
    profileMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZE(56),
    },
    profilePhoto: {
        width: SIZE(100),
        height: SIZE(100),
        borderRadius: SIZE(100),
        overflow: 'hidden',
    },
    profImage: {
        width: '100%',
        height: '100%',
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: SIZE(32),
    },
    nameText: {
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(24),
        color: '#242424',
        textAlign: 'center',
    },
    locationTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SIZE(12),
    },
    locationText: {
        fontWeight: '400',
        fontFamily: FONTS.regular,
        fontSize: SIZE(16),
        color: '#242424',
        marginLeft: SIZE(8),
        textAlign: 'center',
    },
    descriptionText: {
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        color: '#686868',
        marginBottom: SIZE(24),
    },
    profileMiddle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    subProfileDetails: {
        backgroundColor: '#fff',
        borderColor: '#ededed',
        borderWidth: SIZE(1),
        height: SIZE(42),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(73),
        width: SIZE(190),
    },
    subProfileText: {
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(14),
        color: '#003459',
    },
});
