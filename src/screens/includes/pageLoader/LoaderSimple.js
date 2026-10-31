import {StyleSheet, Text, Animated, View} from 'react-native';
import React from 'react';

// packages
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const LoaderSimple = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    return (
        <View style={{alignSelf: 'center'}}>
            <ShimmerPlaceholder shimmerStyle={{borderRadius: 10}} />
        </View>
    );
};

export default LoaderSimple;

const styles = StyleSheet.create({});
