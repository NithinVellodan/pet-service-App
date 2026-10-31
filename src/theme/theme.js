import {Dimensions} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('window');

export const SIZES = {
    width: width,
    height: height,
    hp: hp,
};

export const SIZE = value => {
    return wp(value / 4.2);
};
