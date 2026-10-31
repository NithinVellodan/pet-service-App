import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';

//packages
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

//constants
import {Context} from '../../contexts/Store';
import {FONTS} from '../../theme/fonts';
import {SIZE, SIZES} from '../../theme/theme';
import CloseButton from '../../assets/icons/close-button.svg';
import {
    ApiSectionCustomerBorrowList,
    ApiSectionCustomerList,
} from '../main/ApiSection';
//components
import {TrainerApisection} from '../main/TrainerApiSection';
import TrainerCard from './TrainerCard';
import {standardStyle} from './MarkerIcon';
import MapViewCards from './MapViwCards';

//images and logos
import Star from '../../assets/icons/map-view/star.svg';
import StarDot from '../../assets/icons/map-view/starDot.svg';

const {width, height} = Dimensions.get('window');

const GoogleMap = ({params, setRegionList}) => {
    const {state} = useContext(Context);
    const [navigate, setNavigate] = useState(params ? params : '');
    const [isVisible, setIsVisible] = useState(true);
    const [placeToStayLIst, setPlaceToStayLIst] = useState(false);
    const [trainerList, setTrainerList] = useState([]);

    const [region, setRegion] = useState({});

    const [defaultRegion, setDefaultRegion] = useState({
        latitude: 24.4539,
        longitude: 54.3773,
        latitudeDelta: 1,
        longitudeDelta: 1,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [selectedMarkerCoordinate, setSelectedMarkerCoordinate] =
        useState(null);

    if (params?.direction_of === 'Place_to_stay') {
        ApiSectionCustomerList(
            refreshing,
            '',
            setPlaceToStayLIst,
            region.latitude,
            region.longitude,
        );
    } else if (params?.direction_of === 'Borrow') {
        ApiSectionCustomerBorrowList(
            refreshing,
            '',
            setPlaceToStayLIst,
            region.latitude,
            region.longitude,
        );
    } else if (params?.direction_of === 'Trainers') {
        TrainerApisection(
            refreshing,
            '',
            setPlaceToStayLIst,
            region.latitude,
            region.longitude,
        );
    }

    const LATITUDE_DELTA = 1;
    const LONGITUDE_DELTA = 1;
    useEffect(() => {
        if (state.userData.exactLocation) {
            setRegion({
                latitude: state.userData.exactLocation.latitude,
                longitude: state.userData.exactLocation.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
        } else {
            setRegion(defaultRegion);
        }
    }, [state.userData.exactLocation]);

    const _map = React.useRef(null);
    const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
    const [selected, setSelected] = useState();

    const onMarkerPress = mapEventData => {
        const {latitude, longitude} = mapEventData.nativeEvent.coordinate;
        const markerID = mapEventData._targetInst.return.key;
        const index = parseInt(markerID);

        setSelected(placeToStayLIst[index]);
        setSelectedMarkerIndex(index);
        setIsVisible(true);
        setSelectedMarkerCoordinate({latitude, longitude});

        const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA / 4,
            longitudeDelta: LONGITUDE_DELTA / 4,
        };
        _map.current.animateToRegion(region, 500);
    };

    const buttonClose = () => {
        setIsVisible(false);
        setSelectedMarkerIndex(null);
    };

    useEffect(() => {
        setRefreshing(!refreshing);
    }, [state.userData.is_login]);

    const handleRegionChangeComplete = newRegion => {
        setRegion(newRegion);
        setRegionList(newRegion);
    };

    const calculateOffset = (latitudeDelta, index) => {
        const baseOffset = 0.0005;
        const dynamicOffset = baseOffset * (latitudeDelta / 0.1);
        const minOffset = 0.00005;
        const offset = dynamicOffset > minOffset ? dynamicOffset : minOffset;
        return offset * index;
    };

    return (
        <View style={styles.container}>
            {(region.latitude || defaultRegion.latitude) && (
                <TouchableWithoutFeedback onPress={buttonClose}>
                    <MapView
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        style={[styles.container]}
                        moveOnMarkerPress={false}
                        showsMyLocationButton
                        followsUserLocation={true}
                        customMapStyle={standardStyle}
                        region={region.latitude ? region : defaultRegion}
                        onRegionChangeComplete={(region, gesture) => {
                            if (gesture.isGesture) {
                                handleRegionChangeComplete(region);
                            }
                        }}>
                        {placeToStayLIst &&
                            placeToStayLIst.map((marker, index) => {
                                const {latitude, longitude} = marker.coordinate;
                                const latitudeOffset = calculateOffset(
                                    region.latitudeDelta,
                                    index,
                                );
                                const longitudeOffset = calculateOffset(
                                    region.latitudeDelta,
                                    index,
                                );

                                return (
                                    <Marker
                                        tracksViewChanges={
                                            Platform.OS === 'ios' ? true : false
                                        }
                                        key={index}
                                        coordinate={{
                                            latitude: latitude + latitudeOffset,
                                            longitude:
                                                longitude + longitudeOffset,
                                        }}
                                        zIndex={
                                            index === selectedMarkerIndex
                                                ? 1
                                                : 0
                                        }
                                        onPress={e => onMarkerPress(e)}>
                                        <View
                                            style={[
                                                styles.markerWrap,
                                                {
                                                    backgroundColor:
                                                        index ===
                                                        selectedMarkerIndex
                                                            ? '#009FD3'
                                                            : '#fff',
                                                },
                                            ]}>
                                            <View style={styles.marker}>
                                                {marker.average_rating > 0 ? (
                                                    <Star
                                                        width={SIZE(18)}
                                                        height={SIZE(18)}
                                                    />
                                                ) : (
                                                    <StarDot
                                                        width={SIZE(18)}
                                                        height={SIZE(18)}
                                                    />
                                                )}
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            FONTS.regular,
                                                        fontSize: SIZE(13),
                                                        color:
                                                            index ===
                                                            selectedMarkerIndex
                                                                ? '#fff'
                                                                : '#000',
                                                    }}>
                                                    {marker.average_rating > 0
                                                        ? marker.average_rating
                                                        : 'New'}
                                                </Text>
                                            </View>
                                        </View>
                                    </Marker>
                                );
                            })}
                    </MapView>
                </TouchableWithoutFeedback>
            )}
            {selectedMarkerIndex !== null && (
                <View style={styles.scrollView}>
                    {isVisible && (
                        <>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    marginBottom: SIZE(5),
                                }}
                                onPress={buttonClose}>
                                <CloseButton
                                    width={SIZE(25)}
                                    height={SIZE(25)}
                                />
                            </TouchableOpacity>

                            {params?.direction_of === 'Trainers' ? (
                                <TrainerCard
                                    params={navigate}
                                    selected={selected}
                                    {...placeToStayLIst[selectedMarkerIndex]}
                                />
                            ) : (
                                <MapViewCards
                                    selectedFilter={
                                        params?.direction_of === 'Place_to_stay'
                                            ? 'place_to_stay'
                                            : 'borrow'
                                    }
                                    closeButton={true}
                                    selected={selected}
                                    params={navigate}
                                    {...placeToStayLIst[selectedMarkerIndex]}
                                />
                            )}
                        </>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: SIZES.height - 280,
    },
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(80),
        height: SIZE(30),
        borderRadius: SIZE(30),
        borderWidth: SIZE(1),
        borderColor: '#eee',
    },
    marker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SIZE(50),
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    scrollView: {
        position: 'absolute',
        bottom: height * 0.15,
        left: 0,
        right: 0,
        paddingHorizontal: SIZE(16),
    },
    endPadding: {},
});

export default GoogleMap;
