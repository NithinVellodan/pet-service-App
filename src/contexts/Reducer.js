import AsyncStorage from '@react-native-async-storage/async-storage';

const sameId = (item, target) => Boolean(item && target && item.id === target.id);

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            // const userData = {...state.userData, ...action.userData};
            // AsyncStorage.setItem('userData', JSON.stringify(userData));
            // return {
            //     ...state,
            //     userData: userData,
            // };
            const updatedUserData = {...state.userData, ...action.userData};
            try {
                const jsonValue = JSON.stringify(updatedUserData);
                AsyncStorage.mergeItem('userData', jsonValue);
            } catch (e) {
                // Handle error
            }
            return {
                ...state,
                userData: updatedUserData,
            };
        case 'UPDATE_ADDITIONAL_DATA':
            if (!action.additionalData) {
                return state;
            }
            const itemIndex = state.additionalData.findIndex(item =>
                sameId(item, action.additionalData),
            );

            if (itemIndex !== -1) {
                // If the item already exists, remove it
                const updatedAdditionalData = [...state.additionalData];
                updatedAdditionalData.splice(itemIndex, 1);

                return {
                    ...state,
                    additionalData: updatedAdditionalData,
                };
            } else {
                // If the item does not exist, add it
                const additionalData = [
                    ...state.additionalData,
                    action.additionalData,
                ];
                return {
                    ...state,
                    additionalData: additionalData,
                };
            }

        case 'UPDATE_ADDITIONAL_DATA_PET_WISH':
            if (!action.additionalDataPetWish) {
                return state;
            }
            const itemIndexPet = state.additionalDataPetWish.findIndex(item =>
                sameId(item, action.additionalDataPetWish),
            );

            if (itemIndexPet !== -1) {
                const updatedAdditionalDataPetWish = [
                    ...state.additionalDataPetWish,
                ];
                updatedAdditionalDataPetWish.splice(itemIndexPet, 1);

                return {
                    ...state,
                    additionalDataPetWish: updatedAdditionalDataPetWish,
                };
            } else {
                const additionalDataPetWish = [
                    ...state.additionalDataPetWish,
                    action.additionalDataPetWish,
                ];
                return {
                    ...state,
                    additionalDataPetWish: additionalDataPetWish,
                };
            }

        case 'ADD_TO_WISH':
            if (!action.wishList) {
                return state;
            }
            const itemIndexPet1 = state.wishList.findIndex(item =>
                sameId(item, action.wishList),
            );

            if (itemIndexPet1 !== -1) {
                const updatedAdditionalDataPetWish = [...state.wishList];
                updatedAdditionalDataPetWish.splice(itemIndexPet1, 1);
                return {
                    ...state,
                    wishList: updatedAdditionalDataPetWish,
                };
            } else {
                const additionalDataPetWish = [
                    ...state.wishList,
                    action.wishList,
                ];
                return {
                    ...state,
                    wishList: additionalDataPetWish,
                };
            }

        case 'ADD_TO_WISH_TRAINER':
            if (!action.trainerWishList) {
                return state;
            }
            const itemIndexPetTrainer = state.trainerWishList.findIndex(item =>
                sameId(item, action.trainerWishList),
            );
            if (itemIndexPetTrainer !== -1) {
                const updatedAdditionalDataPetWish = [...state.trainerWishList];
                updatedAdditionalDataPetWish.splice(itemIndexPetTrainer, 1);
                return {
                    ...state,
                    trainerWishList: updatedAdditionalDataPetWish,
                };
            } else {
                const additionalDataPetWish = [
                    ...state.trainerWishList,
                    action.trainerWishList,
                ];
                return {
                    ...state,
                    trainerWishList: additionalDataPetWish,
                };
            }

        case 'UPDATE_WISH_ITEM_FIELD':
            const itemIndexToUpdate = state.wishList.findIndex(
                item => item && item.id === action.itemId,
            );

            if (itemIndexToUpdate !== -1) {
                const updatedWishList = [...state.wishList];
                updatedWishList[itemIndexToUpdate] = {
                    ...updatedWishList[itemIndexToUpdate],
                    ...action.updatedItem,
                };
                return {
                    ...state,
                    wishList: updatedWishList,
                };
            } else {
                return state;
            }

        case 'REMOVE_FROM_WISH':
            const updatedWishList = state.wishList.filter(
                item => item && item.id !== action.itemId,
            );

            return {
                ...state,
                wishList: updatedWishList,
            };

        // case 'ADD_TO_CART':
        //     const itemIndexPet2 = state.cart.findIndex(
        //         item => item.id === action.cart.id,
        //     );

        //     const cart = {...state.cart, ...action.cart};
        //     AsyncStorage.setItem('cart', JSON.stringify(cart));

        //     if (itemIndexPet2 !== -1) {
        //         // If the item already exists, remove it
        //         const updatedAdditionalDataPetWish = [...state.cart];
        //         updatedAdditionalDataPetWish.splice(itemIndexPet2, 1);

        //         return {
        //             ...state,
        //             cart: updatedAdditionalDataPetWish,
        //         };
        //     } else {
        //         // If the item does not exist, add it
        //         const additionalDataPetWish = [...state.cart, action.cart];
        //         return {
        //             ...state,
        //             cart: additionalDataPetWish,
        //         };
        //     }

        // case 'ADD_TO_CART':
        //     const itemIndexPetCart = state.cart.findIndex(
        //         item => item.id === action.cart.id,
        //     );

        //     if (itemIndexPetCart !== -1) {
        //         const updatedAdditionalDataPetCart = [...state.cart];
        //         updatedAdditionalDataPetCart.splice(itemIndexPetCart, 1);
        //         return {
        //             ...state,
        //             cart: updatedAdditionalDataPetCart,
        //         };
        //     } else {
        //         const additionalDataPetCart = [...state.cart, action.cart];
        //         return {
        //             ...state,
        //             cart: additionalDataPetCart,
        //         };
        //     }

        case 'ADD_TO_CART':
            if (!action.cart) {
                return state;
            }
            const itemIndexPetCart = state.cart.findIndex(item =>
                sameId(item, action.cart),
            );

            if (itemIndexPetCart !== -1) {
                const updatedAdditionalDataPetCart = [...state.cart];
                updatedAdditionalDataPetCart.splice(itemIndexPetCart, 1);
                return {
                    ...state,
                    cart: updatedAdditionalDataPetCart,
                };
            } else {
                const additionalDataPetCart = [...state.cart, action.cart];
                return {
                    ...state,
                    cart: additionalDataPetCart,
                };
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };

        case 'REMOVE_FROM_CART':
            const updatedCart = state.wishList.filter(
                item => item && item.id !== action.itemId,
            );

            return {
                ...state,
                wishList: updatedCart,
            };

        case 'UPDATE_READ_SECTION':
            const readSection = {...state.readSection, ...action.readSection};
            AsyncStorage.setItem('readSection', JSON.stringify(readSection));
            return {
                ...state,
                readSection: readSection,
            };
        case 'UPDATE_MODAL_SECTION':
            const commonModal = {...state.commonModal, ...action.commonModal};
            AsyncStorage.setItem('commonModal', JSON.stringify(commonModal));
            return {
                ...state,
                commonModal: commonModal,
            };
        case 'LOGOUT':
            // Clear user data and readSection from AsyncStorage and reset the state
            AsyncStorage.removeItem('userData');
            AsyncStorage.removeItem('readSection');
            return initialState; // Reset to initial state
        default:
            return state;
    }
};

export default Reducer;
