import {StyleSheet, Text, View, Animated} from 'react-native';
import React from 'react';

// packages
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SIZE} from '../../../theme/theme';

const LoaderCardHome = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    return (
        <View
            style={{
                marginBottom: SIZE(20),
                backgroundColor: '#fff',
                borderRadius: SIZE(12),
                overflow: 'hidden',
            }}>
            <ShimmerPlaceholder width={SIZE(180)} height={SIZE(90)} />
            <View
                style={{
                    paddingHorizontal: SIZE(12),
                    paddingVertical: SIZE(16),
                }}>
                <ShimmerPlaceholder
                    width={SIZE(90)}
                    style={{marginTop: SIZE(10)}}
                    shimmerStyle={{borderRadius: 20}}
                />
                <ShimmerPlaceholder
                    width={SIZE(112)}
                    style={{marginTop: SIZE(10)}}
                    shimmerStyle={{borderRadius: 17}}
                    height={SIZE(12)}
                />
                <ShimmerPlaceholder
                    width={SIZE(153)}
                    style={{marginTop: SIZE(5)}}
                    shimmerStyle={{borderRadius: 17}}
                    height={SIZE(12)}
                />
            </View>
        </View>
    );
};

export default LoaderCardHome;

const styles = StyleSheet.create({});
