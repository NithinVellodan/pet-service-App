import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';

import SearchIcon from '../../../assets/icons/search.svg';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

const Search = ({setSearchQuery}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={[
                styles.headerRight,
                {
                    borderColor: isFocused ? '#009FD3' : '#E2E2E2',
                    backgroundColor: isFocused ? '#FFF' : '#EDEDED',
                },
            ]}>
            <View style={styles.searchIconContainer}>
                <SearchIcon width={'100%'} height={'100%'} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    autoFocus
                    onChangeText={text => {
                        setSearchQuery(text);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    allowFontScaling={false}
                    style={styles.inputStyle}
                    placeholder="Search..."
                    placeholderTextColor={'#AAA'}
                />
            </View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    headerRight: {
        marginLeft: SIZE(20),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZE(8),
        paddingLeft: SIZE(16),
        paddingRight: SIZE(8),
        backgroundColor: '#EDEDED',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        flex: 1,
    },
    searchIconContainer: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(12),
    },
    inputContainer: {
        flex: 1,
    },
    inputStyle: {
        paddingVertical: SIZE(0),
        color: '#242424',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
});
