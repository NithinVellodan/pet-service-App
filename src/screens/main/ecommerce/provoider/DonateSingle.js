import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SIZE, SIZES} from '../../../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../../../../assets/icons/arrow-left.svg';
import Edit from '../../../../assets/icons/edit.svg';
import Trash from '../../../../assets/icons/trashblack.svg';
import {FONTS} from '../../../../theme/fonts';
import Description from '../includes/Description';
import StarOfferCard from '../includes/StarOfferCard';
import ModalBox from '../../../Home/includes/ModalBox';
import DeleteItem from '../includes/DeleteItem';
import {EcommerceServiceProviderdonatedProductSingle} from '../../EcommerceApiSection';
import Disable from '../includes/Disable';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import ModalScreen from '../../../Profile-related/ModalScreen';
import AddDonateDetails from './AddDonateDetails';

const DonateSingle = ({route}) => {
    const {state} = useContext(Context);
    const [delModal, setDelModal] = useState(false);
    const navigation = useNavigation();
    const [editDonateModal, setEditDonateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [PageLoading, setPageLoading] = useState(false);
    const donatePk = route?.params?.item?.id;
    const [donateSingle, setDonateSingle] = useState([]);
    const [isBackground, setIsBackground] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // add donate
    const [nameDonate, setNameDonate] = useState();
    const [subtitleDonate, setSubtitleDonate] = useState();
    const [categoryDonate, setCategoryDonate] = useState();
    const [categoryImageDonate, setCategoryImageDonate] = useState();
    const [donateDescription, setDonateDescription] = useState();
    const [errorMessageDonate, setErrorMessageDonate] = useState({});

    // Deleted product
    const DeleteDonate = async () => {
        const token = state.userData.accessToken;
        const pk = donateSingle?.id;

        try {
            const response = await ecommerceApiServiceProvider.delete(
                `delete-donated-product/${pk}/`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // Handle success
            } else {
                // Handle failure
            }
            navigation.goBack();
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    // enable or disable donate
    const toggleProduct = async () => {
        const token = state.userData.accessToken;
        const pk = donateSingle?.id;

        try {
            const response = await ecommerceApiServiceProvider.put(
                `enable-disable-donated-product/${pk}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            let {StatusCode, data} = response.data;
            if (StatusCode === 6000) {
                // Handle success
            } else {
                // Handle failure
            }
        } catch (error) {
            console.log('error toggle => ', error.response.data);
        }
    };

    useEffect(() => {
        if (donateSingle) {
            setCategoryImageDonate([
                {
                    path: donateSingle.image,
                },
            ]);
            setNameDonate(donateSingle.product_name);
            setSubtitleDonate(donateSingle.sub_title);
            setCategoryDonate({
                id: donateSingle.product_category,
                name: donateSingle.category_name,
            });
            setDonateDescription(donateSingle.description);
            setIsOn(donateSingle.is_enabled);
        }
    }, [donateSingle]);

    // Edit donate-product
    const editDonateProduct = async () => {
        setIsLoading(true);
        const token = state.userData.accessToken;
        const pk = donateSingle?.id;
        const formData = new FormData();
        formData.append('product_name', nameDonate);
        formData.append('sub_title', subtitleDonate);
        formData.append('product_category', categoryDonate.id);
        if (categoryImageDonate[0].name) {
            categoryImageDonate.forEach((image, index) => {
                formData.append('image', {
                    uri: image.path,
                    type: image.mime,
                    name: image.name,
                });
            });
        }
        formData.append('description', donateDescription);
        ecommerceApiServiceProvider
            .put(`edit-donated-product/${pk}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                setEditDonateModal(false);
                setLoading(prev => !prev);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error try => ', error.response.data);
            });
    };

    const HeaderSticky = 270;
    const handleScroll = event => {
        const scrollY = event.nativeEvent.contentOffset.y;
        if (scrollY >= HeaderSticky) {
            setIsBackground(true);
        } else {
            setIsBackground(false);
        }
    };

    const productCard = [
        {
            id: 1,
            title: nameDonate,
            description: subtitleDonate,
        },
    ];

    EcommerceServiceProviderdonatedProductSingle(
        state,
        setDonateSingle,
        donatePk,
        loading,
        setPageLoading,
    );

    return (
        <>
            <View
                style={[
                    styles.commonButtonContainer,
                    isBackground && {
                        backgroundColor: '#F7F7F7',
                        borderBottomWidth: SIZE(1),
                        borderColor: '#E2E2E2',
                    },
                ]}>
                <View style={styles.topButtonLeft}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        activeOpacity={0.8}
                        style={styles.commonButtonMain}>
                        <View style={styles.commonTopButtons}>
                            <ArrowLeft width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.topButtonRight}>
                    <TouchableOpacity
                        onPress={() => {
                            setEditDonateModal(true);
                            console.log('edit domn');
                        }}
                        activeOpacity={0.8}
                        style={[
                            styles.commonButtonMain,
                            {marginRight: SIZE(16)},
                        ]}>
                        <View style={styles.commonTopButtons}>
                            <Edit width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setDelModal(true);
                        }}
                        activeOpacity={0.8}
                        style={styles.commonButtonMain}>
                        <View style={styles.commonTopButtons}>
                            <Trash width={'100%'} height={'100%'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {PageLoading ? (
                <ActivityIndicator
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#007EA7'}
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onScroll={handleScroll} // Add the onScroll event handler
                    scrollEventThrottle={16} // Adjust this value as needed
                >
                    <View>
                        <View style={{height: SIZE(316)}}>
                            <View style={styles.swiperMain}>
                                {categoryImageDonate && (
                                    <Image
                                        source={{
                                            uri: categoryImageDonate[0].path,
                                        }}
                                        style={styles.swiperSub}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.continer}>
                        <View style={{paddingHorizontal: SIZE(16)}}>
                            <Disable
                                DisableText={'Disable Product'}
                                isOn={isOn}
                                setIsOn={setIsOn}
                                toggleProduct={toggleProduct}
                            />
                        </View>
                        <View style={{marginTop: SIZE(30)}}>
                            <StarOfferCard
                                productCard={productCard}
                                donate={true}
                            />
                        </View>
                        <View>
                            <Description description={donateDescription} />
                        </View>
                    </View>
                    <ModalBox
                        isVisible={delModal}
                        setVisible={setDelModal}
                        inner={
                            <DeleteItem
                                close={setDelModal}
                                deleted={DeleteDonate}
                            />
                        }
                    />
                    <ModalScreen
                        isVisible={editDonateModal}
                        setVisible={setEditDonateModal}
                        inner={
                            <AddDonateDetails
                                is_edit={true}
                                close={setEditDonateModal}
                                name={nameDonate}
                                setName={setNameDonate}
                                subtitle={subtitleDonate}
                                setSubtitle={setSubtitleDonate}
                                categoryValue={categoryDonate}
                                setCategoryValue={setCategoryDonate}
                                categoryImage={categoryImageDonate}
                                setCategoryImage={setCategoryImageDonate}
                                donateDescription={donateDescription}
                                setDonateDescription={setDonateDescription}
                                errorMessage={errorMessageDonate}
                                setErrorMessage={setErrorMessageDonate}
                                editDonateProduct={editDonateProduct}
                                isLoading={isLoading}
                            />
                        }
                    />
                </ScrollView>
            )}
        </>
    );
};

export default DonateSingle;

const styles = StyleSheet.create({
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 999,
        padding: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    swiperMain: {
        flex: 1,
        overflow: 'hidden',
        width: SIZES.width,
        height: SIZE(316),
    },
    swiperSub: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    swiperNumberMain: {
        padding: SIZE(16),
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
    },
    swiperNumber: {
        backgroundColor: '#fff',
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(6),
        borderRadius: SIZE(61),
        width: SIZE(68),
        alignItems: 'center',
    },
    swiperNumberText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
    },
    continer: {
        paddingVertical: SIZE(24),
    },
    productDetail: {
        marginTop: SIZE(16),
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
    },
    sizeText: {
        color: '#00171F',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    sizeTextAns: {
        color: '#009FD3',
        fontSize: SIZE(16),
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
});
