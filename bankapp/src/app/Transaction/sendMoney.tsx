import { ImageIconPack } from "@/assets/images";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { LinearGradient } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../backIcon/backbutton";

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

  const [acountNumber, setAccountNumber] = useState("");
  const [AmountEntered, setAmountEntered] = useState("");

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

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.leftBackgroundDecoration}
        resizeMode="contain"
        source={ImageIconPack.Ellipse_2}
      />
      <Image
        style={styles.rightBackgroundDecoration}
        resizeMode="contain"
        source={ImageIconPack.Ellipse_1}
      />

      {/* Content on top */}
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={styles.contentContainer}
      >
        <View style={styles.headerWrapper}>
          <BackButton style={{ marginBottom: 5 }} />
          <View style={styles.headerTitleWrapper}>
            <Text style={styles.headerTitle}>Send Money</Text>
          </View>
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

        <View style={styles.inputsWrapper}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Send to</Text>
            <TextInput
              style={styles.textInput}
              value={acountNumber}
              onChangeText={setAccountNumber}
              placeholder="Enter recipant account number"
              placeholderTextColor="#999"
              keyboardType="numeric" // ✅ For account numbers
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Enter your amount</Text>
            <TextInput
              style={styles.textInput}
              value={AmountEntered}
              onChangeText={setAmountEntered}
              placeholder="1000"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.submitButtonWrapper}>
          {/* <TransactionHistory /> */}
          <TouchableOpacity
            style={styles.submitButton}
            // disabled={!isFormReady}
            onPress={() => {
              console.log("sent succesfully");
              Alert.alert(
                "Feature Unavailable",
                "Password reset feature is coming soon!",
                [{ text: "Ok", style: "default" }],
              );
            }}
          >
            <Text style={styles.submitButtonText}>Send</Text>
          </TouchableOpacity>
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
  rightBackgroundDecoration: {
    position: "absolute",
    right: -60,
    top: "30%", // Adjust as needed
    height: 361,
    width: 270,
    zIndex: 0,
  },
  leftBackgroundDecoration: {
    position: "absolute",

    left: -60,
    top: "20%", // Adjust as needed
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
    // flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    // alignItems: "flex-end",
    gap: 69,
  },
  headerTitleWrapper: {
    // Empty style for the View wrapper
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "medium",
    color: "#1e1e2d",
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
  inputsWrapper: {
    flex: 0.3,
    gap: 16,
  },
  inputContainer: {
    borderColor: "#b8b8b8",
    borderWidth: 0.5,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    height: 129,
  },
  inputLabel: {
    fontSize: 17,
    color: "#707070",
  },
  textInput: {
    // borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    height: 60,
    // borderw: "100%",
    fontSize: 20,
    color: "#707070",
    // backgroundColor: '#F8F9FA',
  },
  submitButtonWrapper: {
    flex: 0.3,
    justifyContent: "center",
    // backgroundColor: "green",
  },
  submitButton: {
    backgroundColor: "#0066ff",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
  // Keeping unused styles from original
  TransOption_children: {
    backgroundColor: "#f4f4f4",
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  Trans_chidren_Image: {
    width: 12.95,
    height: 16.25,
  },
  image: {
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  headerSub: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  // Transaction history styles (moved from inline)
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
});

export default WalletScreen;
