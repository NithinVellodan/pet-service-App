import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

//images and logos
import DocumentIcon from '../../../assets/icons/document-text.svg';

const CustomerDocument = ({docData}) => {
    return (
        <>
            {docData.map((item, index) => (
                <View style={styles.mainContainer} key={index}>
                    <View style={styles.documentIcon}>
                        <DocumentIcon height={SIZE(24)} width={SIZE(24)} />
                    </View>
                    <View style={styles.documentDetails}>
                        <Text
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={styles.documentText}>
                            {item.name}
                        </Text>
                        <Text allowFontScaling={false} style={styles.sizeText}>
                            {item.size} MB
                        </Text>
                    </View>
                </View>
            ))}
        </>
    );
};

export default CustomerDocument;

const styles = StyleSheet.create({
    mainContainer: {
        padding: SIZE(12),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#EDEDED',
        marginBottom: SIZE(10),
        flexDirection: 'row',
    },
    documentIcon: {
        height: SIZE(56),
        width: SIZE(56),
        backgroundColor: '#F7F7F7',
        borderRadius: SIZE(6),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SIZE(16),
    },
    documentDetails: {
        justifyContent: 'center',
    },
    documentText: {
        color: '#000',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(8),
        width: SIZE(250),
    },
    sizeText: {
        color: '#969696',
        fontSize: SIZE(12),
        fontWeight: '500',
        fontFamily: FONTS.medium,
    },
});
