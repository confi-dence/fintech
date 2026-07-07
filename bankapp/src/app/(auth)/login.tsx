import { ImageIconPack } from "@/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

type LoginDetalprops = {
  emailPhoneNumber: string;
  password: string;
  setEmailPhoneNumber: (password: string) => void;
  setPassword: (password: string) => void;
  error: {
    emailPhoneNumber: string;
    password: string;
  };
};

const Logindetail = ({
  emailPhoneNumber,
  password,
  setEmailPhoneNumber,
  setPassword,
  error,
}: LoginDetalprops) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = () => {
    console.log("Forgot password");
    Alert.alert(
      "Feature Unavailable",
      "Password reset feature is coming soon!",
      [{ text: "Got it", style: "default" }],
    );
  };

  return (
    <View>
      {/* EmailPhoneNumber Input */}
      <View style={styles.inputContainer}>
        {error.emailPhoneNumber ? (
          <Text style={[styles.label, styles.errorText]}>
            {error.emailPhoneNumber}
          </Text>
        ) : (
          <Text style={styles.label}>Email Address</Text>
        )}
        <View style={styles.inputWrapper}>
          <Image style={styles.inputIcon} source={ImageIconPack.email_mail} />
          <TextInput
            style={styles.textInput}
            value={emailPhoneNumber}
            onChangeText={setEmailPhoneNumber}
            placeholder="your@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
      {/* Password Input */}
      <View style={styles.inputContainer}>
        {error.password ? (
          <Text style={[styles.label, styles.errorText]}>{error.password}</Text>
        ) : (
          <Text style={styles.label}>Password</Text>
        )}
        <View style={styles.passwordContainer}>
          <Image
            style={styles.inputIcon}
            source={ImageIconPack.Lock_Password}
          />

          <TextInput
            style={[styles.textInput, styles.passwordInput]}
            value={password}
            onChangeText={setPassword}
            autoComplete="off"
            placeholder="@Password1"
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

      {/* Forgot Password Link */}
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login = () => {
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [emailPhoneNumber, setEmailPhoneNumber] = useState("");
  const [showSuccess, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<{
    password: string;
    emailPhoneNumber: string;
  }>({
    password: "",
    emailPhoneNumber: "",
  });

  const isFormReady = emailPhoneNumber.trim() && password.trim();

  const loginUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("userData");

      if (!storedUser) {
        Alert.alert("Error", "No account found");
        return;
      }

      const user = JSON.parse(storedUser);

      if (
        (emailPhoneNumber === user.email ||
          emailPhoneNumber === user.phoneNumber) &&
        password === user.password
      ) {
        await AsyncStorage.setItem("hasLoggedIn", "true");
        router.replace("/(tabs)/Home");
      } else {
        Alert.alert("Login Failed", "Invalid email/phone or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    const newError: any = {};
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    const phoneNumberRegex = /^[\+]?[0-9]{8,15}$/;
    const passwordRegex = {
      length: /^.{8,}$/,
      uppercase: /[A-Z]/,
      number: /[0-9]/,
      special: /[!@#$%^&*(),.?":{}|<>]/,
    };

    if (!emailPhoneNumber.trim()) {
      newError.emailPhoneNumber = "Email/Phone Number is Required";
    } else if (
      !emailRegex.test(emailPhoneNumber) &&
      !phoneNumberRegex.test(emailPhoneNumber)
    ) {
      newError.emailPhoneNumber = "Enter a valid Email Address or Phone Number";
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

    if (Object.keys(newError).length === 0) {
      setSuccess(true);
      setErrors({ password: "", emailPhoneNumber: "" });
    } else {
      setErrors({
        password: newError.password || "",
        emailPhoneNumber: newError.emailPhoneNumber || "",
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
              <Text style={styles.headerTitle}>Sign In</Text>
            </View>
            <View style={styles.formWrapper}>
              <Logindetail
                error={errors}
                setEmailPhoneNumber={setEmailPhoneNumber}
                emailPhoneNumber={emailPhoneNumber}
                setPassword={setPassword}
                password={password}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  { backgroundColor: isFormReady ? "#0066ff" : "#cfcfcf" },
                ]}
                disabled={!isFormReady}
                onPress={() => {
                  handleLogin();
                  if (emailPhoneNumber.trim() && password.trim()) {
                    loginUser();
                  }

                  // router.navigate("/(tabs)/Home");
                }}
              >
                <Text style={styles.signInButtonText}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  router.navigate("/(auth)/signup");
                }}
              >
                <Text style={styles.signUpPrompt}>
                  i'm a new user. <Text style={styles.signUpLink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    flex: 0.9,
  },
  contentContainer: {
    flex: 0.72,
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
    flex: 0.55,
  },
  buttonWrapper: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "space-around",
  },
  signInButton: {
    backgroundColor: "#0066ff",
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
  signUpPrompt: {
    color: "#A2A2A7",
    fontSize: 14,
  },
  signUpLink: {
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
  passwordContainer: {
    position: "relative",
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
  passwordHint: {
    width: "80%",
    marginVertical: 8,
    alignSelf: "flex-start",
    color: "#999",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "red",
  },
});

export default Login;
