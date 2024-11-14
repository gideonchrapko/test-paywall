import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from '@/tw';

const subscriptionOptions = {
  premium: [
    { icon: 'hide-image', text: 'Censor images color fill', check: true },
    { icon: 'filter-alt', text: 'Filter inappropriate results', check: false },
    { icon: 'photo-filter', text: 'AI smart image detect', check: false },
    { icon: 'movie-filter', text: 'AI censor video profanity', check: true },
  ],
  regular: [
    { icon: 'hide-image', text: 'Censor images color fill', check: true },
    { icon: 'filter-alt', text: 'Filter inappropriate results', check: true },
    { icon: 'photo-filter', text: 'AI smart image detect', check: true },
    { icon: 'movie-filter', text: 'AI censor video profanity', check: true },
  ],
};

const SubButton = ({
  price,
  index,
  setToggleSub,
  isSelected,
}: {
  price: number;
  index: number;
  setToggleSub: React.Dispatch<React.SetStateAction<number>>;
  isSelected?: boolean;
}) => {
  const handleToggle = useCallback(
    () => setToggleSub(index),
    [index, setToggleSub]
  );

  return (
    <TouchableOpacity
      style={tw`bg-sky-300 rounded-3xl p-2 mb-3 flex-[0.7] px-6 mr-2 ${
        isSelected ? '' : 'opacity-50'
      }`}
      onPress={handleToggle}
    >
      <Text style={tw`text-black font-bold text-lg text-center`}>
        ${price}.00
        <Text style={tw`text-black font-light text-sm`}>/month</Text>
      </Text>
    </TouchableOpacity>
  );
};

const AnimatedScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [toggleSub, setToggleSub] = useState(1);
  const subscription = toggleSub
    ? subscriptionOptions.regular
    : subscriptionOptions.premium;

  const toggleScreenVisibility = (visible: boolean) => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(visible));
  };

  const screenStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <TouchableOpacity
        style={tw`bg-blue-500 py-2 px-4 rounded`}
        onPress={() => toggleScreenVisibility(true)}
      >
        <Text style={tw`text-white font-bold`}>Show Screen</Text>
      </TouchableOpacity>

      {isVisible && (
        <Animated.View style={[tw`absolute inset-0 bg-sky-950`, screenStyle]}>
          <View style={tw`flex-1 mx-4 mt-10`}>
            <TouchableOpacity
              style={tw`self-start my-12`}
              onPress={() => toggleScreenVisibility(false)}
            >
              <Text style={tw`text-white font-bold`}>← Back</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`mx-8 mb-4`}>
            <Text style={tw`text-4xl font-regular text-white`}>
              Upgrade for a better experience
            </Text>
          </View>

          <View style={tw`flex-row justify-left mx-4`}>
            <SubButton
              price={20}
              index={0}
              setToggleSub={setToggleSub}
              isSelected={toggleSub === 0}
            />
            <SubButton
              price={50}
              index={1}
              setToggleSub={setToggleSub}
              isSelected={toggleSub === 1}
            />
          </View>

          <View style={tw`mx-4 mb-3 bg-sky-900 rounded-3xl`}>
            {subscription.map((item: any, i: number) => (
              <View key={i} style={tw`flex-row items-center p-5`}>
                <View
                  style={tw`border border-sky-600 w-10 h-10 rounded-full flex items-center justify-center`}
                >
                  <MaterialIcons name={item.icon} size={24} color="white" />
                </View>
                <Text style={tw`text-white text-xl pl-2`}>{item.text}</Text>
                <MaterialIcons
                  name={item.check ? 'check-circle' : 'close'}
                  size={24}
                  color={item.check ? '#94ff97' : '#ff9494'}
                  style={tw`ml-auto`}
                />
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={tw`bg-sky-500 rounded-3xl py-4 px-8 mx-4 mb-25 items-center`}
            onPress={() => console.log('Subscribe pressed')}
          >
            <Text style={tw`text-white font-normal text-lg`}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedScreen;
