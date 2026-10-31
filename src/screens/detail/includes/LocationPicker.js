import {StyleSheet} from 'react-native';
import React from 'react';

//package
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// theme
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

export default function LocationPicker({
    addressText,
    geoAddressText,
    setAddressText,
    setGeoAddressText,
    setLocation,
}) {
    return (
        <GooglePlacesAutocomplete
            autoFocus={false}
            editable={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
                if (details) {
                    const {location, formatted_address} = details.geometry;

                    setLocation(location);
                    setAddressText(formatted_address);
                } else {
                    setAddressText(data.description);
                    setLocation(null);
                }
            }}
            query={{
                key: 'AIzaSyBqJ4ZZH7Ieb7hiQCQpEg3I2zDFi_f7c-A',
                language: 'en',
            }}
            textInputProps={{
                placeholderTextColor: '#8E8E8E',
                value: addressText || geoAddressText,
                maxLength: 37,
                numberOfLines: 2,
                onChangeText: text => {
                    setAddressText(text);
                    if (geoAddressText && addressText !== '') {
                        setGeoAddressText('');
                    }
                },
            }}
            listViewDisplayed={false}
            placeholder="Enter Your Location"
            returnKeyType={'done'}
            getAddressText={text => {}}
            fetchDetails={true}
            styles={{
                textInputContainer: {
                    borderWidth: 1,
                    borderRadius: SIZE(8),
                    borderColor: '#D3D3D3',
                },

                textInput: {
                    color: '#242424',
                    fontSize: SIZE(14),
                    fontFamily: FONTS.regular,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F7F7F7',
                    justifyContent: 'space-between',
                },
                predefinedPlacesDescription: {
                    color: '#1faadb',
                },
                row: {
                    backgroundColor: '#fff',
                    padding: SIZE(13),
                    flexDirection: 'row',
                    marginBottom: SIZE(2),
                },
                separator: {
                    height: 0,
                    backgroundColor: '#fff',
                },
                description: {
                    fontFamily: FONTS.regular,
                    fontSize: SIZE(14),
                    color: 'black',
                },
            }}
        />
    );
}

const styles = StyleSheet.create({});
