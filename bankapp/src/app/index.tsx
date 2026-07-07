import { ImageIconPack } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

type SlidesProps = {
  id: number;
  image: any;
  title: string;
  subtitle: string;
};
const { height, width } = Dimensions.get("window");

const Slides: SlidesProps[] = [
  {
    id: 1,
    image: ImageIconPack.onboarding_1,
    title: " Fastest Payment in the world",
    subtitle:
      "integrate mutiple payment methods to help you up the process quickly ",
  },
  {
    id: 2,
    image: ImageIconPack.onboarding_2,
    title: "The most Secure Platform for Customer",
    subtitle:
      "Built-in Fingerprint, face recognition and more, keeping you completely safe",
  },
  {
    id: 3,
    image: ImageIconPack.onboarding_3,
    title: " Paying for Everything is Easy and Convenient",
    subtitle:
      "Built-in Fingerprint, face recognition and more, keeping you completely safe",
  },
];

const Footer = ({ currentSlide, setCurrentSlide }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.indicatorWrapper}>
        {Slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlide == index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = React.useRef(null);
  const updateCurrentSlideIndexn = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlide(currentIndex);
    if (currentIndex == 3) {
      router.navigate("/(auth)/signup");
    }
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlide + 1;
    const offset = nextSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlide(nextSlideIndex);
    if (currentSlide == 2) {
      router.navigate("/(auth)/login");
    }
  };

  const checkLoginStatus = async () => {
    try {
      const hasLoggedIn = await AsyncStorage.getItem("hasLoggedIn");

      if (hasLoggedIn === "true") {
        setTimeout(() => {
          router.navigate("/(auth)/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.slidesWrapper}>
        <FlatList
          data={Slides}
          ref={ref}
          pagingEnabled
          onMomentumScrollEnd={updateCurrentSlideIndexn}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.slideScreen}>
              <View style={styles.imageWrapper}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={styles.slideImage}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.footerWrapper}>
        <Footer currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={goNextSlide}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slidesWrapper: {
    flex: 1,
  },
  flatListContent: {
    alignItems: "flex-end",
    // backgroundColor: "yellow",
    height: "92%",
  },
  slideScreen: {
    height: "80%",
    // gap: 30,
    alignItems: "center",
    justifyContent: "space-around",
    // backgroundColor: "red",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: width,
    height: 249,
  },
  textContainer: {
    width: 282,
    gap: 17,
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "semibold",
  },
  subtitle: {
    textAlign: "center",
    color: "#7e848d",
    fontSize: 14,
  },
  footerWrapper: {
    flex: 0.05,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  indicatorWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
  },
  indicator: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "#707070",
    marginHorizontal: 3,
  },
  indicatorActive: {
    width: 19,
    backgroundColor: "#0066ff",
  },
  buttonWrapper: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    backgroundColor: "#0066ff",
    width: 335,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
});
