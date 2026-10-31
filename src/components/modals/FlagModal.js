import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Platform,
} from 'react-native';

// Constants
// import {COLORS, SIZE} from '../../../Constants';

// theme
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// Images and Icons
// import Tick from '../../../assets/icons/fill-tick.svg';

export default function FlagModal({
    setFlagModal,
    selectedCountry,
    setSelectedCountry,
    countries,
    setCountryCode,
    countryCode,
    setWebCode,
    setCountryName,
    countryName,
    searchResults,
    setSearchResults,
    setPhone,
}) {
    const [searchTerm, setSearchTerm] = useState('');

    const searchFilter = text => {
        if (text) {
            const newData = countries.filter(item => {
                const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setSearchResults(newData);
            setSearchTerm(text);
        } else {
            setSearchResults(countries);
            setSearchTerm(text);
        }
    };

    const renderCountries = searchResults.map(
        item =>
            countryCode !== item.country_code && (
                <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    style={styles.flagContainer}
                    onPress={() => {
                        setFlagModal(false);
                        setSelectedCountry(item);
                        setSearchTerm('');
                        setCountryCode(item.country_code);
                        // setWebCode(item.);
                        setPhone('');
                        setCountryName(item.name);
                    }}>
                    <Image
                        style={styles.flagImage}
                        source={{uri: item.flag_url}}
                        resizeMode={'stretch'}
                    />
                    <Text
                        allowFontScaling={false}
                        style={styles.flagText}
                        numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.flagText}
                        numberOfLines={1}>
                        ({item.country_code})
                    </Text>
                </TouchableOpacity>
            ),
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.sliderLine}></View>
            <View style={styles.searchContainer}>
                <TextInput
                    allowFontScaling={false}
                    style={styles.searchInput}
                    placeholder="Select your Country"
                    placeholderTextColor="#B2B2B2"
                    value={searchTerm}
                    onChangeText={text => searchFilter(text)}
                />
            </View>
            <View activeOpacity={0.7} style={styles.selectedCountry}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {!selectedCountry ? (
                        <Image
                            source={require('../../assets/images/uae.png')}
                            style={styles.flagImage}
                            resizeMode={'stretch'}
                        />
                    ) : (
                        <Image
                            source={{uri: selectedCountry.flag_url}}
                            style={styles.flagImage}
                            resizeMode={'stretch'}
                        />
                    )}
                    <Text
                        allowFontScaling={false}
                        style={styles.selectedflagText}
                        numberOfLines={1}>
                        {countryName}
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.selectedflagText}
                        numberOfLines={1}>
                        ({countryCode})
                    </Text>
                </View>
            </View>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.container}>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {renderCountries.length !== 0 ? (
                        renderCountries
                    ) : (
                        <Text
                            allowFontScaling={false}
                            style={styles.noFoundText}>
                            No results found
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: SIZE(80),
        borderTopLeftRadius: SIZE(24),
        borderTopRightRadius: SIZE(24),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SIZE(26),
    },

    searchContainer: {
        width: '90%',
        marginTop: SIZES.hp('3%'),
        marginBottom: SIZES.hp('2%'),
        borderWidth: SIZE(1.2),
        borderRadius: SIZE(11.6),
        borderColor: '#d9d9d9',
        overflow: 'hidden',
        backgroundColor: '#fcfcfc',
        paddingHorizontal: SIZE(12),
        height: SIZE(48),
        justifyContent: 'center',
    },
    sliderLine: {
        width: '15%',
        borderWidth: SIZES.hp('0.3%'),
        borderColor: '#d9d9d9',
        borderRadius: SIZES.hp('100%'),
    },
    searchInput: {
        width: '100%',
        alignItems: 'center',
        fontFamily: 'Gordita',
        fontSize: SIZE(14.8),
    },
    container: {
        width: '90%',
    },
    selectedCountry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#f7f7f7',
        marginBottom: SIZE(8),
        padding: SIZE(14),
        borderRadius: SIZE(11.6),
    },
    flagImage: {
        width: SIZE(36),
        height: SIZE(36),
        borderRadius: SIZES.hp('100%'),
    },
    tickImage: {
        borderRadius: SIZES.hp('100%'),
    },
    flagText: {
        fontSize: SIZE(14.4),
        color: '#1c1c1c',
        ...Platform.select({
            ios: {
                fontFamily: 'Gordita',
                fontWeight: '500',
            },
            android: {
                fontFamily: 'medium',
            },
        }),

        marginLeft: SIZE(16),
    },
    selectedflagText: {
        fontSize: SIZE(14.4),
        color: '#0FA76F',
        ...Platform.select({
            ios: {
                fontFamily: 'Gordita',
                fontWeight: '500',
            },
            android: {
                fontFamily: 'medium',
            },
        }),

        marginLeft: SIZE(16),
    },
    flagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: SIZE(8),
        padding: SIZE(14),
        borderRadius: SIZE(11.6),
    },
    noFoundText: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                fontFamily: 'Gordita',
                fontWeight: '500',
            },
            android: {
                fontFamily: 'medium',
            },
        }),
        fontSize: SIZE(14.4),
        marginTop: SIZES.hp('2%'),
    },
});
