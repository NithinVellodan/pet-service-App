import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

import {useRoute} from '@react-navigation/native';
import {ApiSections} from '../main/ApiSection';
import {ArrivalItem} from '../main/includes/TwoItemCarousel';

import {useIsFocused} from '@react-navigation/native';
import TrainerCard from '../goolgle-map/TrainerCard';
import NoBookingMain from '../booking/NoBookingMain';
import Headers from '../includes/headers/Headers';
import FilterCommon from '../main/includes/FilterCommon';

const NewArrival = ({navigation}) => {
    const {state, dispatch} = useContext(Context);
    const isFocused = useIsFocused();
    const route = useRoute();
    const {params} = route;
    const [selectedValue, setSelectedValue] = useState(1);
    const [newArrivals, setNewArrivals] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(
        params?.selectedFilter,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilterData] = useState([]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        setFilterData(
            newArrivals.filter(
                item =>
                    item?.title?.toLowerCase().includes(lowerCaseQuery) ||
                    item?.pet_breed?.toLowerCase().includes(lowerCaseQuery) ||
                    item?.name?.toLowerCase().includes(lowerCaseQuery),
            ),
        );
    }, [newArrivals, searchQuery]);

    const handleFilterClick = index => {
        setSelectedFilter(index === selectedFilter ? null : index);
    };

    ApiSections(
        selectedFilter?.page_type,
        '',
        setNewArrivals,
        isFocused,
        setIsLoading,
    );

    useEffect(() => {
        if (isFocused) {
            setSelectedFilter(
                params?.selectedFilter
                    ? params?.selectedFilter
                    : {
                          id: 1,
                          type: 'Place to Stay',
                          page_type: 'place-to-stay',
                      },
            );
        }
    }, [isFocused, state.readSection.un_read_booking]);

    const FilterItem = [
        {
            id: 1,
            type: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            type: 'Trainer',
            page_type: 'trainer',
        },
    ];

    const renderCardItem = ({item}) => (
        <View style={{marginBottom: 20}}>
            <ArrivalItem
                navigation={navigation}
                selected={item}
                selectedFilter={selectedFilter}
            />
        </View>
    );

    const renderItemTrainer = ({item, index}) => (
        <View style={{alignItems: 'center', marginBottom: SIZE(10)}}>
            <TrainerCard selected={item} selectedFilter={selectedFilter} />
        </View>
    );

    return (
        <View style={{borderWidth: 0}} activeOpacity={0.7}>
            <View>
                <Headers
                    navigation={navigation}
                    headText={'New Arrivals'}
                    locationHide={true}
                    filter={false}
                    search={true}
                    icon={true}
                    isSearch={isSearch}
                    setIsSearch={setIsSearch}
                    setSearchQueryCustomer={setSearchQuery}
                />
            </View>
            <View style={styles.chatMain}>
                <FilterCommon
                    FilterItem={FilterItem}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    state={state}
                    handleFilterClick={handleFilterClick}
                    setSelectedValue={setSelectedValue}
                />
            </View>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(300),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={filteredData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={
                        selectedFilter?.page_type == 'trainer'
                            ? renderItemTrainer
                            : renderCardItem
                    }
                    ListEmptyComponent={<NoBookingMain page={'newArrivals'} />}
                    numColumns={1}
                    contentContainerStyle={{
                        paddingBottom: SIZE(175),
                    }}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: SIZE(12),
        borderTopRightRadius: SIZE(12),
    },
    barContainer: {
        backgroundColor: '#009FD3',
        width: SIZE(70),
        height: SIZE(4),
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: SIZE(16),
        marginBottom: SIZE(22),
    },
    filterContainer: {
        flexDirection: 'row',
        height: SIZE(40),
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterItem: {
        marginRight: SIZE(12),
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
    selectedFilterItem: {
        marginRight: SIZE(12),
        borderWidth: 0.5,
        borderRadius: 20,
        borderColor: '#003459',
        backgroundColor: '#EAF7FF',
    },
    filterItemText: {
        fontSize: SIZE(14),
        color: '#242424',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    selectedFilterItemText: {
        fontSize: SIZE(14),
        color: '#003459',
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
    },
    chatMain: {
        paddingHorizontal: SIZE(16),
    },
});

export default NewArrival;
