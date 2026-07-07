// components/TabBar.tsx
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const icon = {
    Home: (props: any) => <Feather name="home" size={19} {...props} />,
    Cards: (props: any) => (
      <MaterialCommunityIcons name="wallet-outline" size={19} {...props} />
    ),
    statistics: (props: any) => (
      <Feather name="pie-chart" size={19} {...props} />
    ),
    settings: (props: any) => <Feather name="settings" size={19} {...props} />,
  };
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            {icon[route.name]({
              color: isFocused ? "#0066ff" : "#8b8b94",
            })}
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    alignItems: "center",
    height: 86,
    justifyContent: "space-between",
    marginHorizontal: 16,
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 14,
    color: "#999",
  },
  activeTabLabel: {
    color: "#0066ff",
    fontWeight: "600",
  },
});

export default TabBar;
