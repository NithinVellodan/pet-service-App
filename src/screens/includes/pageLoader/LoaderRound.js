import {StyleSheet, View} from 'react-native';
import React from 'react';

// packages
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SIZE} from '../../../theme/theme';

const LoaderRound = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

    return (
        <View>
            <ShimmerPlaceholder
                width={SIZE(44)}
                height={SIZE(44)}
                style={{borderRadius: SIZE(100)}}
            />
        </View>
    );
};

export default LoaderRound;

const styles = StyleSheet.create({});
