import { ImageIconPack } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../backIcon/backbutton";

type SignupDetailProp = {
  email: string;
  fullname: string;
  password: string;
  phoneNumber: string;
  setPhoneNumber: (password: string) => void;
  setFullname: (password: string) => void;
  setPassword: (password: string) => void;
  setEmail: (password: string) => void;
  errors: {
    fullname: string;
    password: string;
    email: string;
    phoneNumber: string;
  };
};

const SignUpDetails = ({
  email,
  fullname,
  password,
  setFullname,
  setPassword,
  setEmail,
  errors,
  phoneNumber,
  setPhoneNumber,
}: SignupDetailProp) => {
  const [showPassword, setShowPassword] = useState(false);

  const [showSuccess, setSuccess] = useState(false);

  return (
    <View>
      {/* Full Name */}
      <View style={styles.inputContainer}>
        {errors.fullname ? (
          <Text style={[styles.label, styles.errorText]}>
            {errors.fullname}
          </Text>
        ) : (
          <Text style={styles.label}>Fullname</Text>
        )}
        <View style={styles.inputWrapper}>
          <Image style={styles.inputIcon} source={ImageIconPack.email_mail} />
          <TextInput
            style={styles.textInput}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Tanya Myroniuk"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      </View>
      {/* Phone Number */}
      <View style={styles.inputContainer}>
        {errors.phoneNumber ? (
          <Text style={[styles.label, styles.errorText]}>
            {errors.phoneNumber}
          </Text>
        ) : (
          <Text style={styles.label}>Phone Number</Text>
        )}

        <View style={styles.inputWrapper}>
          <Image style={styles.inputIcon} source={ImageIconPack.phon_call} />
          <TextInput
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="+8801712663389"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>
      </View>
      {/* Email */}
      <View style={styles.inputContainer}>
        {errors.email ? (
          <Text style={[styles.label, styles.errorText]}>{errors.email}</Text>
        ) : (
          <Text style={styles.label}>Email</Text>
        )}

        <View style={styles.inputWrapper}>
          <Image style={styles.inputIcon} source={ImageIconPack.email_mail} />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="your@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      {/* Password */}
      <View style={styles.inputContainer}>
        {errors.password ? (
          <Text style={[styles.label, styles.errorText]}>
            {errors.password}
          </Text>
        ) : (
          <Text style={styles.label}>Password</Text>
        )}
        <View style={styles.passwordContainer}>
          <Image
            style={styles.inputIcon}
            source={ImageIconPack.Lock_Password}
          />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="e.g Password1!"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image style={styles.eyeIcon} source={ImageIconPack.eye_show_up} />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordHint}>
          password must contain at least one special number, an uppercase, a
          Number{" "}
        </Text>
      </View>
    </View>
  );
};

const signup = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState<{
    fullname: string;
    password: string;
    email: string;
    phoneNumber: string;
  }>({ fullname: "", password: "", email: "", phoneNumber: "" });
  const isFormReady = fullname.trim() && email.trim() && password.trim();

  const saveUser = async () => {
    try {
      const existingUser = await AsyncStorage.getItem("userData");

      if (existingUser) {
        const user = JSON.parse(existingUser);

        if (
          user.phoneNumber.replace(/\s/g, "") ===
            phoneNumber.replace(/\s/g, "") ||
          user.email.toLowerCase() === email.toLowerCase()
        ) {
          alert("Account already exists");
          return;
        }
      }
      const userData = {
        fullname,
        email,
        phoneNumber,
        password,
        balance: 716.27,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      console.log("User Saved");
      router.navigate("/(tabs)/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleregister = async () => {
    await AsyncStorage.setItem("hasLoggedIn", "true");
    const newError: any = {};
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    const phoneNumberRegex = /^[\+]?[0-9]{8,15}$/;
    const cleanPhone = phoneNumber.replace(/\s/g, "");
    const passwordRegex = {
      length: /^.{8,}$/,
      uppercase: /[A-Z]/,
      number: /[0-9]/,
      special: /[!@#$%^&*(),.?":{}|<>]/,
    };
    if (!fullname.trim()) {
      newError.fullname = "Full Name is Required";
    } else if (fullname.trim().length < 2) {
      newError.fullname = "Name must be at least 2 Characters";
    } else if (fullname.trim().length > 50) {
      newError.fullname = "Name Cannot Exceed 50 Characters";
    } else if (!/^[A-Za-z\s\-']+$/.test(fullname.trim())) {
      newError.fullname =
        "Only letters, spaces, hyphens, and apostrophes allowed";
    } else if (fullname.trim().split(/\s+/).length < 2) {
      newError.fullname = "Please enter both First and Last Name";
    }

    if (!email.trim()) {
      newError.email = "Email is Required";
    } else if (!emailRegex.test(email)) {
      newError.email = "Enter a valid Email Address";
    }

    if (!password.trim()) {
      newError.password = "Password is Required";
    } else if (!passwordRegex.length.test(password)) {
      newError.password = "Enter at least 8 Character";
    } else if (!passwordRegex.number.test(password)) {
      newError.password = "Must include a Number";
    } else if (!passwordRegex.special.test(password)) {
      newError.password = "Enter include a Special number";
    } else if (!passwordRegex.uppercase.test(password)) {
      newError.password = "Enter include an Uppercase character";
    }

    if (!phoneNumber.trim()) {
      newError.phoneNumber = "Phone Number is Required";
    } else if (!phoneNumberRegex.test(cleanPhone)) {
      newError.phoneNumber = "Enter a Valid Phone Number Address";
    }

    if (Object.keys(newError).length === 0) {
      // setSuccess(true);
      saveUser();
      setErrors({ fullname: "", password: "", email: "", phoneNumber: "" });
    } else {
      setErrors({
        fullname: newError.fullname || "",
        password: newError.password || "",
        email: newError.email || "",
        phoneNumber: newError.phoneNumber || "",
      });
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <BackButton />
        <View style={styles.contentWrapper}>
          <View style={styles.contentContainer}>
            <View style={styles.headerWrapper}>
              <Text style={styles.headerTitle}>Sign Up</Text>
            </View>
            <View style={styles.formWrapper}>
              <SignUpDetails
                email={email}
                password={password}
                setFullname={setFullname}
                setPassword={setPassword}
                setEmail={setEmail}
                fullname={fullname}
                errors={errors}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  styles.signUpButton,
                  { backgroundColor: isFormReady ? "#0066ff" : "#cfcfcf" },
                ]}
                disabled={!isFormReady}
                onPress={() => {
                  // console.log("successfully");
                  handleregister();
                }}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.navigate("/(auth)/login");
                }}
              >
                <Text style={styles.loginPrompt}>
                  Already have an account.{" "}
                  <Text style={styles.loginLink}>Sign in</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 16,
  },
  keyboardContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 16,
  },
  contentWrapper: {
    flex: 0.92,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerWrapper: {
    flex: 0.1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "medium",
    color: "#1e1e2d",
  },
  formWrapper: {
    flex: 0.62,
  },
  buttonWrapper: {
    flex: 0.23,
    alignItems: "center",
    justifyContent: "space-around",
  },
  signUpButton: {
    backgroundColor: "#0066ff",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  signUpButtonDisabled: {
    backgroundColor: "#cfcfcf",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
  loginPrompt: {
    color: "#A2A2A7",
    fontSize: 14,
  },
  loginLink: {
    color: "#0066ff",
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    height: 22,
    width: 22,
    position: "absolute",
    top: 14,
    zIndex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 27,
    paddingVertical: 14,
    fontSize: 16,
    color: "#707070",
    // backgroundColor: '#F8F9FA',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  eyeIcon: {
    height: 22,
    width: 22,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordHint: {
    width: "80%",
    alignSelf: "flex-start",
    color: "#999",
    marginVertical: 8,
  },
  errorText: {
    color: "red",
  },
});
