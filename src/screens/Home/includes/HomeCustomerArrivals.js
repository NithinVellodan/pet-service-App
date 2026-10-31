import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {SIZE} from '../../../theme/theme';
//components
import NoBooking from '../../booking/NoBooking';
import TwoItemCarousel from '../../main/includes/TwoItemCarousel';
import {ApiSections} from '../../main/ApiSection';
import TrainerCard from '../../goolgle-map/TrainerCard';

const HomeCustomerArrivals = ({navigation, selectedFilter, isFocused}) => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    ApiSections(
        selectedFilter.page_type,
        'home-page',
        setNewArrivals,
        isFocused,
    );

    const renderItem = ({item}) => (
        <View style={styles.carouselItem}>
            <TwoItemCarousel
                navigation={navigation}
                selected={item}
                is_hide_Arrow={true}
                selectedFilter={selectedFilter}
            />
        </View>
    );

    const renderItemTrainer = ({item, index}) => (
        <View style={{marginHorizontal: SIZE(0)}}>
            <TrainerCard selected={item} selectedFilter={selectedFilter} />
        </View>
    );

    const renderIndicator = ({index}) => (
        <View
            style={[
                styles.indicator,
                index === selectedIndex && styles.activeIndicator,
            ]}
        />
    );

    const handleScroll = event => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const itemWidth = Dimensions.get('window').width * 0.9;
        const index = Math.floor(contentOffsetX / itemWidth);
        setSelectedIndex(index);
    };

    return (
        <View style={styles.carouselContainer}>
            {selectedFilter.id === 1 && (
                <>
                    <FlatList
                        bounces={false}
                        data={newArrivals}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<NoBooking />}
                        onScroll={event => {
                            const contentOffsetX =
                                event.nativeEvent.contentOffset.x;
                            const index = Math.round(contentOffsetX / 200);
                            setSelectedIndex(index);
                        }}
                    />
                    <View style={styles.indicatorContainer}>
                        {newArrivals
                            .slice(0, newArrivals.length - 1)
                            .map((_, index) => (
                                <View
                                    key={index}
                                    style={styles.indicatorWrapper}>
                                    {renderIndicator({index})}
                                </View>
                            ))}
                    </View>
                </>
            )}
            {selectedFilter.id === 2 && (
                <>
                    <FlatList
                        bounces={false}
                        data={newArrivals}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<NoBooking />}
                        onScroll={event => {
                            const contentOffsetX =
                                event.nativeEvent.contentOffset.x;
                            const index = Math.round(contentOffsetX / 200);
                            setSelectedIndex(index);
                        }}
                    />
                    <View style={styles.indicatorContainer}>
                        {newArrivals
                            .slice(0, newArrivals.length - 1)
                            .map((_, index) => (
                                <View
                                    key={index}
                                    style={styles.indicatorWrapper}>
                                    {renderIndicator({index})}
                                </View>
                            ))}
                    </View>
                </>
            )}
            {selectedFilter.id === 3 && (
                <>
                    <FlatList
                        bounces={false}
                        data={newArrivals}
                        renderItem={renderItemTrainer}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={<NoBooking />}
                        onScroll={handleScroll}
                        pagingEnabled={true}
                    />

                    <View style={styles.indicatorContainer}>
                        {newArrivals.map((_, index) => (
                            <View key={index} style={styles.indicatorWrapper}>
                                {renderIndicator({index, selectedIndex})}
                            </View>
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZE(15),
    },
    indicatorWrapper: {
        marginHorizontal: 5,
    },
    indicator: {
        width: SIZE(8),
        height: SIZE(8),
        borderRadius: SIZE(5),
        marginHorizontal: SIZE(5),
        alignSelf: 'center',
        backgroundColor: '#98C1D9',
    },
    activeIndicator: {
        backgroundColor: '#009FD3',
        width: SIZE(10),
        height: SIZE(10),
    },
});

export default HomeCustomerArrivals;
