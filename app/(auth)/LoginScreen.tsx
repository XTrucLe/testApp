import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CurvedBackground from "@/components/CurvedBackground";
import FieldInput from "@/components/items/fieldInput";
import {
  validateEmail,
  validatePasswordForLogin,
} from "@/constants/Validation";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/AuthContext";
import Toast from "react-native-toast-message";

const LoginScreen = ({ navigation }: any) => {
  const { onLogin } = useAuth();
  const [loginInfo, setLoginInfo] = useState<{
    usernameOrEmail: string | null;
    password: string | null;
  }>({
    usernameOrEmail: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Kiểm tra lỗi email và mật khẩu
    const passwordError = validatePasswordForLogin(loginInfo.password ?? "");

    if ( passwordError) {
      Toast.show({
        type: "error",
        text1: "Thông tin không hợp lệ",
        text2: "Vui lòng kiểm tra email và mật khẩu của bạn.",
      });
      return;
    }

    // Gọi API đăng nhập
    const result = await onLogin!(
      loginInfo.usernameOrEmail ?? "",
      loginInfo.password ?? ""
    );

    if (result.error) {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: "Vui lòng kiểm tra lại thông tin đăng nhập của bạn.",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
        text2: "Chào mừng bạn quay lại!",
      });
    }

  };

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const handleForgetPass = () => {
    navigation.navigate("ForgetPass");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 60}
      style={{ flex: 1 }}
      enabled

    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <CurvedBackground>
          <Text style={styles.title}>Đăng nhập</Text>
        </CurvedBackground>
        <View style={styles.inputContainer} >
          <FieldInput
            fieldName="Email"
            placeholder="Nhập email"
            value={loginInfo.usernameOrEmail ?? ""}
            onChangeText={(value) =>
              setLoginInfo({ ...loginInfo, usernameOrEmail: value })
            }
            // onBlur={() => validateEmail(loginInfo.email ?? "")}
          />
          <FieldInput
            fieldName="Mật khẩu"
            value={loginInfo.password ?? ""}
            placeholder="Nhập mật khẩu"
            onChangeText={(value) =>
              setLoginInfo({ ...loginInfo, password: value })
            }
            onBlur={() => validatePasswordForLogin(loginInfo.password ?? "")}
            sercurity={true}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Đăng nhập" onPress={handleLogin}  />
          )}
        </View>
      </ScrollView>
          <Text style={{ textAlign: "center", color: "blue", textDecorationLine: "underline" }} onPress={handleForgetPass}>Quên mật khẩu?</Text>
      <View style={styles.footer}>
        <Text>
          Bạn chưa có tài khoản?{" "}
          <Pressable onPress={handleSignup}>
            <Text style={styles.signupText}>Đăng ký tài khoản</Text>
          </Pressable>
        </Text>
        <Text style={{ margin: 4, textDecorationLine: "underline" }}>
          Hay đăng nhập bằng
        </Text>

        <View style={styles.anotherLogin}>
          <TouchableOpacity style={styles.iconLogin}>
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLogin}>
            <Ionicons name="logo-facebook" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconLogin}>
            <Ionicons name="logo-instagram" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Toast />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontWeight:"900"
  },
  inputContainer: { 
    flexGrow: 1,
    maxHeight: 250,
    padding: 16,
    marginTop: 20,
    paddingVertical: 16,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  anotherLogin: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  iconLogin: {
    padding: 8,
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
  },
});
export default LoginScreen;
