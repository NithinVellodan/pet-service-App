import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Headers from '../../../includes/headers/Headers';
import {SIZE} from '../../../../theme/theme';
import ReviewsEco from '../includes/ReviewsEco';
import {EcoProviderReviews} from '../../EcommerceApiSection';

const ReviwsProviderPage = ({route}) => {
    const reviewId = route?.params?.id;
    const [reviewData, setReviewData] = useState();
    const [loading, setLoading] = useState(false);
    EcoProviderReviews(reviewId, setReviewData);
    return (
        <View style={styles.container}>
            <Headers headText={'My Reviews'} />
            <View
                style={{
                    marginTop: SIZE(25),
                    paddingHorizontal: SIZE(16),
                }}>
                {reviewData?.map((item, index) => (
                    <ReviewsEco
                        key={index}
                        item={item}
                        index={index}
                        loading={setLoading}
                    />
                ))}
            </View>
        </View>
    );
};

export default ReviwsProviderPage;

const styles = StyleSheet.create({
    container: {},
});
