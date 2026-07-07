import { ImageIconPack } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TransOptionImageProps = {
  images: any;
  text: string;
  onpress: () => void;
};
type TransactionHistoryProps = {
  id: number;
  icon: any;
  name: string;
  subName: string;
  amount: number;
};

const WalletScreen = () => {
  const [Balancehidden, SetBalanceHidden] = useState(false);
  const [user, setUser] = useState<any>(null);
  const showBalance = () => {
    SetBalanceHidden(!Balancehidden);
  };

  const TransOptionImage = ({
    images,
    text,
    onpress,
  }: TransOptionImageProps) => {
    return (
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={onpress}>
          <Image style={styles.optionIcon} source={images} />
        </TouchableOpacity>
        <Text style={styles.optionText}>{text}</Text>
      </View>
    );
  };

  const TransactionData: TransactionHistoryProps[] = [
    {
      id: 1,
      icon: ImageIconPack.TransactonSuccessfully,
      name: "Sent to Alice",
      subName: "Today, 2:30 PM",
      amount: -50.0,
    },

    // ... more transactions
  ];

  const TransactionHistory = () => {
    return (
      <View style={styles.transactionContainer}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Transaction</Text>
          <Text style={styles.transactionSeeAll}>See all</Text>
        </View>
        <FlatList
          data={TransactionData}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIconWrapper}>
                  <Image style={styles.transactionIcon} source={item.icon} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionName}>{item.name}</Text>
                  <Text style={styles.transactionSubName}>{item.subName}</Text>
                </View>
              </View>

              <View style={styles.transactionAmountWrapper}>
                <Text style={styles.transactionAmount}>${item.amount}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionList}
        />
      </View>
    );
  };

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");

      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    // await AsyncStorage.removeItem("userData");
    await AsyncStorage.setItem("hasLoggedIn", "false");

    router.replace("/");
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.backgroundDecoration}
        resizeMode="contain"
        source={ImageIconPack.Ellipse_1}
      />

      {/* Content on top */}
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={styles.contentContainer}
      >
        <View style={styles.headerWrapper}>
          <View style={styles.profileImageWrapper}>
            <Image style={styles.profileImage} source={ImageIconPack.people1} />
          </View>
          <View style={styles.userInfoWrapper}>
            <Text style={styles.welcomeText}>Welcome back </Text>
            <Text style={styles.userName}>{user?.fullname || "User"}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Image
              source={ImageIconPack.logOut}
              style={styles.logoutIcon}
              resizeMode="contain"
            />

            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#292a3eee", "#2c3161f1", "#28306aeb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <View style={styles.cardLeftSection}>
            <View style={styles.cardHeaderSection}>
              {/* //@Password1 */}
              <Text style={styles.cardType}>Masterc </Text>
              <Text style={styles.cardNumber}>7373737938</Text>
            </View>
            <View style={styles.cardBalanceSection}>
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceLabel}>Account Balance </Text>
                <TouchableOpacity onPress={showBalance}>
                  <Image
                    style={styles.eyeIcon}
                    source={ImageIconPack.eye_show_up}
                  />
                </TouchableOpacity>
              </View>
              {Balancehidden == false ? (
                <View style={styles.balanceVisibleContainer}>
                  <View style={styles.balanceRow}>
                    <Text style={styles.currencyText}>NGN </Text>
                    <Text style={styles.balanceAmount}>
                      {user?.balance || 0}
                    </Text>
                  </View>
                  <View style={styles.bookBalanceRow}>
                    <Text style={styles.bookBalanceLabel}>Book Balance: </Text>
                    <View style={styles.bookBalanceValueWrapper}>
                      <Text style={styles.bookBalanceValue}>NGN </Text>
                      <Text style={styles.bookBalanceValue}>
                        {user?.balance || 0}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.balanceHiddenContainer}>
                  {/* coming back to this.Modal */}
                  <Text style={styles.hiddenBalanceText}>****</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardRightSection}></View>
        </LinearGradient>

        <View style={styles.optionsWrapper}>
          <TransOptionImage
            text="Send"
            onpress={() => {
              router.navigate("/Transaction/sendMoney");
            }}
            images={ImageIconPack.send}
          />
          <TransOptionImage text="Recieve" images={ImageIconPack.Recieve} />
          <TransOptionImage text="Loan" images={ImageIconPack.send} />
          <TransOptionImage text="Topup" images={ImageIconPack.send} />
        </View>
        <View style={styles.transactionHistoryWrapper}>
          <TransactionHistory />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  backgroundDecoration: {
    position: "absolute",
    right: -60,
    top: "30%", // Adjust as needed
    height: 361,
    width: 270,
    zIndex: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // position: "absolute",
    zIndex: 1,
  },
  headerWrapper: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    // backgroundColor: "green",
  },
  profileImageWrapper: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  profileImage: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  userInfoWrapper: {
    gap: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  welcomeText: {
    color: "#7E848D",
    fontSize: 13,
  },
  userName: {
    fontWeight: "semibold",
    fontSize: 18,
  },
  logoutButton: {
    gap: 8,
    // backgroundColor: "red",
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoutIcon: {
    height: 16,
    width: 16,
  },
  logoutText: {
    fontWeight: "semibold",
    fontSize: 18,
  },
  balanceCard: {
    flex: 0.2,
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 25,
  },
  cardLeftSection: {
    flex: 0.55,
    justifyContent: "space-between",
  },
  cardRightSection: {
    flex: 0.45,
  },
  cardHeaderSection: {
    flex: 0.25,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  cardType: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cardNumber: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBalanceSection: {
    flex: 0.6,
    justifyContent: "space-between",
  },
  balanceHeader: {
    flexDirection: "row",
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "white",
  },
  eyeIcon: {
    height: 22,
    width: 22,
  },
  balanceVisibleContainer: {
    height: 59,
    justifyContent: "space-between",
  },
  balanceRow: {
    flexDirection: "row",
  },
  currencyText: {
    fontWeight: "600",
    color: "white",
    fontSize: 24,
  },
  balanceAmount: {
    fontWeight: "600",
    color: "white",
    fontSize: 24,
  },
  bookBalanceRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bookBalanceLabel: {
    fontWeight: "600",
    color: "white",
  },
  bookBalanceValueWrapper: {
    flexDirection: "row",
  },
  bookBalanceValue: {
    fontWeight: "600",
    color: "white",
  },
  balanceHiddenContainer: {
    height: 59,
  },
  hiddenBalanceText: {
    color: "white",
    fontSize: 30,
  },
  optionsWrapper: {
    // flex: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionContainer: {
    gap: 7,
  },
  optionButton: {
    backgroundColor: "#f4f4f4",
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  optionIcon: {
    width: 12.95,
    height: 16.25,
  },
  optionText: {
    textAlign: "center",
  },
  transactionHistoryWrapper: {
    flex: 0.52,
    // backgroundColor: "green",
  },
  transactionContainer: {
    gap: 40,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  transactionSeeAll: {
    fontSize: 18,
    color: "#0066ff",
    fontWeight: "600",
  },
  transactionList: {
    gap: 30,
  },
  transactionItem: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  transactionLeft: {
    gap: 12,
    flexDirection: "row",
  },
  transactionIconWrapper: {
    width: 42,
    height: 42,
    backgroundColor: "#f4f4f4",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionIcon: {
    width: 16,
    height: 16,
  },
  transactionInfo: {
    gap: 5,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
  },
  transactionSubName: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#a2a2a7",
  },
  transactionAmountWrapper: {
    justifyContent: "center",
  },
  transactionAmount: {
    color: "#0066ff",
    fontSize: 16,
    fontWeight: "600",
  },
  headerSub: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default WalletScreen;
