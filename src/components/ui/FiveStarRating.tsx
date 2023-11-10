import React, {Dispatch} from 'react';

import {View, TouchableOpacity, ViewStyle} from 'react-native';

import {Star} from 'lucide-react-native';

import {Colors} from '../../styles/custom';

interface FiveStarProps {
  value: number | string | undefined;
  selectable?: boolean;
  setRating?: Dispatch<number | string>;
  style?: ViewStyle;
  size?: number;
}

const StarRating = ({
  value = 0,
  selectable,
  setRating,
  style,
  size,
}: FiveStarProps) => {
  const handleStarPress = (rating: string | number) => {
    if (selectable && setRating) {
      setRating(rating);
    }
  };

  const renderStar = (index: any) => {
    const isFilled = index < value;
    const StarIcon = isFilled ? (
      <Star color="#fdc137" fill="#fdc137" size={size} />
    ) : (
      <Star color={Colors.GrayV2} size={size} />
    );
    return (
      <TouchableOpacity
        activeOpacity={selectable ? 0.4 : 1}
        key={index}
        onPress={() => handleStarPress(index + 1)}>
        {StarIcon}
      </TouchableOpacity>
    );
  };

  const stars = Array.from({length: 5}, (_, index) => renderStar(index));

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 2,
        },
        {...style},
      ]}>
      {stars}
    </View>
  );
};

export default StarRating;
