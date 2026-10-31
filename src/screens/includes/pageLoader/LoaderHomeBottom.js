import {StyleSheet, View} from 'react-native';
import React from 'react';

// packages
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {SIZE} from '../../../theme/theme';

const LoaderHomeBottom = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <ShimmerPlaceholder
                    shimmerStyle={{borderRadius: 20}}
                    width={SIZE(70)}
                    height={SIZE(10)}
                />
                <ShimmerPlaceholder
                    shimmerStyle={{borderRadius: 20}}
                    width={SIZE(40)}
                    height={SIZE(10)}
                />
            </View>
            <View style={styles.top}>
                <View style={styles.items}>
                    <ShimmerPlaceholder
                        shimmerStyle={{borderRadius: 20}}
                        width={SIZE(40)}
                        height={SIZE(10)}
                    />
                </View>
                <View style={styles.items}>
                    <ShimmerPlaceholder
                        shimmerStyle={{borderRadius: 20}}
                        width={SIZE(40)}
                        height={SIZE(10)}
                    />
                </View>
                <View style={styles.items}>
                    <ShimmerPlaceholder
                        shimmerStyle={{borderRadius: 20}}
                        width={SIZE(40)}
                        height={SIZE(10)}
                    />
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={{alignSelf: 'center'}}>
                    <ShimmerPlaceholder
                        width={SIZE(90)}
                        height={SIZE(90)}
                        style={{borderRadius: SIZE(100)}}
                    />
                </View>
                <View style={{alignSelf: 'center', marginTop: SIZE(15)}}>
                    <ShimmerPlaceholder
                        width={SIZE(90)}
                        height={SIZE(12)}
                        style={{marginTop: SIZE(10)}}
                        shimmerStyle={{borderRadius: 20}}
                    />
                    <ShimmerPlaceholder
                        width={SIZE(154)}
                        height={SIZE(12)}
                        style={{marginTop: SIZE(10)}}
                        shimmerStyle={{borderRadius: 20}}
                    />
                </View>
            </View>
        </View>
    );
};

export default LoaderHomeBottom;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: SIZE(40),
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(20),
    },
    items: {
        backgroundColor: '#FFF',
        padding: SIZE(8),
        borderRadius: SIZE(20),
        width: SIZE(115),
    },
    bottomContainer: {
        backgroundColor: '#fff',
        marginTop: SIZE(20),
        borderRadius: SIZE(8),
        padding: SIZE(20),
    },
});
