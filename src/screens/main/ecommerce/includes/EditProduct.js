import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View,
} from 'react-native';
import React, {useState} from 'react';
import {SIZE, SIZES} from '../../../../theme/theme';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import CloseButton from '../../../../assets/icons/close-circle.svg';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import {FONTS} from '../../../../theme/fonts';
import PetCategoryInput from '../../../detail/includes/PetCategoryInput';

const EditProduct = ({close, fromList}) => {
    const [errorMessage, setErrorMessage] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isSelectedCategories, setIsSelectedCategories] = useState([]);
    const [boxVisible, setBoxVisible] = useState(false);
    const [categoryData, setPetCategory] = useState([
        {id: 1, name: 'Dog'},
        {id: 2, name: 'Cat'},
        {id: 3, name: 'Bird'},
    ]);
    const clearAll = () => {
        setSelectedCategories([]);
    };

    const CustomDropDown = () => {
        const actions = item => {
            const isSelected = selectedCategories.some(
                val => val.id === item.id,
            );
            setErrorMessage({
                ...errorMessage,
                petCategory: '',
            });
            if (isSelected) {
                const updatedSelection = selectedCategories.filter(
                    val => val.id !== item.id,
                );
                setSelectedCategories(updatedSelection);
            } else {
                const newData = {
                    ...item,
                    no_of_pets: 1,
                    id: item.id,
                    name: item.name,
                };
                setSelectedCategories([...selectedCategories, newData]);
            }
        };

        const formatSelectedCategories = () => {
            const categoriesString = selectedCategories.map(category => {
                const filteredCategory = isSelectedCategories?.filter(
                    item => item.id === category.id,
                );
                return (
                    <View style={styles.chooseMainContainer} key={category.id}>
                        <View
                            style={[
                                styles.chooseCategory,
                                {
                                    opacity:
                                        filteredCategory &&
                                        filteredCategory[0]?.id
                                            ? 0.2
                                            : 1,
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: SIZE(14),
                                    fontFamily: FONTS.medium,
                                    color: '#003459',
                                }}
                                allowFontScaling={false}>
                                {category.name}
                            </Text>
                            <TouchableOpacity
                                disabled={
                                    filteredCategory && filteredCategory[0]?.id
                                        ? true
                                        : false
                                }
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (fromList === true) {
                                        clearAll(category.id);
                                    }
                                    actions(category);
                                }}
                                hitSlop={0.7}
                                style={{
                                    width: SIZE(20),
                                    height: SIZE(20),
                                    marginLeft: SIZE(8),
                                }}>
                                <CloseButton width="100%" height="100%" />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            });

            return (
                <View style={styles.chooseContainer}>{categoriesString}</View>
            );
        };
        const isFormatSelectedCategoriesActive = selectedCategories.length > 0;

        return (
            <View style={{flex: 1}}>
                <PetCategoryInput
                    isSelectedCategories={isSelectedCategories}
                    isFormatSelectedCategoriesActive={
                        isFormatSelectedCategoriesActive
                    }
                    selectedCategories={selectedCategories}
                    boxVisible={boxVisible}
                    setBoxVisible={setBoxVisible}
                    formatSelectedCategories={formatSelectedCategories}
                    categoryData={categoryData}
                    actions={actions}
                />
                <>
                    {errorMessage?.petCategory && (
                        <View>
                            <Text style={styles.errorMessage}>
                                {errorMessage?.petCategory}
                            </Text>
                        </View>
                    )}
                </>
            </View>
        );
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    close(false);
                }}
                hitSlop={SIZE(5)}
                style={{position: 'absolute', top: SIZE(20), right: SIZE(20)}}>
                <CloseIcon width={SIZE(15)} height={SIZE(15)} />
            </TouchableOpacity>
            <View style={styles.mainContainer}>
                <View>
                    <DoubleColorHeading
                        firstTitle={'Edit '}
                        secondTitle={'Product Details'}
                        isCenter={true}
                    />
                </View>
                <View>
                    <DescriptionHeading
                        text={'Please Enter Your Store Details'}
                        isCenter={true}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text allowFontScaling={false} style={styles.labelText}>
                        Select Category
                    </Text>
                    {CustomDropDown()}
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        width: SIZES.width,
        paddingTop: SIZE(60),
        paddingBottom: SIZE(30),
    },
    mainContainer: {
        paddingHorizontal: SIZE(32),
    },
    inputBox: {
        marginTop: SIZE(40),
    },
    labelText: {
        color: '#686868',
        fontWeight: '500',
        fontFamily: FONTS.medium,
        marginBottom: SIZE(10),
        marginTop: SIZE(24),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
    ChooseBoxTwo: {
        textAlign: 'center',
        color: '#242424',
        fontFamily: FONTS.regular,
        fontSize: SIZE(14),
        fontWeight: '500',
    },

    chooseContainer: {
        flexDirection: 'row',
    },
    chooseCategory: {
        borderWidth: SIZE(1),
        borderColor: '#98C1D9',
        paddingHorizontal: SIZE(8),
        paddingVertical: SIZE(4),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(6),
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZE(8),
    },
});
