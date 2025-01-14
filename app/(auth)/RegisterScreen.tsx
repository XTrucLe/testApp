import {
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import FieldInput from "@/components/items/fieldInput";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhone,
} from "@/constants/Validation";
import { useAuth } from "../../hooks/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export type RegisterProps = {
  fullname: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const RegisterScreen = ({ navigation }: any) => {
  const [information, setInformation] = React.useState<RegisterProps>({
    fullname: null,
    username: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  });
  const { onLogin, onRegister } = useAuth();

  const handleRegister = () => {
    for (const [key, value] of Object.entries(information)) {
      if (!value) {
        console.log(`Please enter ${key}`);
        return;
      }
    }
    if (information.password !== information.confirmPassword) {
     Toast.show({
       type: 'error',
       text1: 'Lỗi',
       text2: 'Mật khẩu nhập lại không khớp',
     });
      return;
    }
    register();

    console.log("Register", information);
  };

  const register = async () => {
    const result = await onRegister!(information);
    if (result.error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: result.message,
        });
      return;
    }
    login();
  };

  const login = async () => {
    const result = await onLogin!(
      information.email ?? "",
      information.password ?? ""
    );
    if (result.error) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: result.message,
        });
      return;
    }
  };

  const handleNavigate = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 4 }}>
      <KeyboardAvoidingView
        enabled={false}
        style={{ flex: 1, paddingTop: 32 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.headerText}>Đăng ký tài khoản</Text>
          <View style={{ flexGrow: 1, padding: 16 }}>
            <FieldInput
              fieldName="Tên đầy đủ"
              placeholder="Nhập tên đầy đủ"
              value={information.fullname ?? ""}
              onChangeText={(value) => {
                setInformation({ ...information, fullname: value });
              }}
              onBlur={() => validateFullName(information.fullname ?? "")}
            />
            <FieldInput
              fieldName="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              value={information.username ?? ""}
              onChangeText={(value) => {
                setInformation({ ...information, username: value });
              }}
            />
            <FieldInput
              fieldName="Email"
              placeholder="Nhập email"
              value={information.email ?? ""}
              onChangeText={(value) => {
                setInformation({ ...information, email: value });
              }}
              onBlur={() => validateEmail(information.email ?? "")}
            />
            <FieldInput
              fieldName="Số điện thoại"
              placeholder="Nhập số điện thoại"
              value={information.phone ?? ""}
              onChangeText={(value) => {
                setInformation({ ...information, phone: value });
              }}
              onBlur={() => validatePhone(information.phone ?? "")}
            />
            <FieldInput
              fieldName="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={information.password ?? ""}
              onChangeText={(value) => {
                setInformation({ ...information, password: value });
              }}
              onBlur={() => validatePassword(information.password ?? "")}
            />
            <FieldInput
              fieldName="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              value={information.confirmPassword ?? ""}
              onChangeText={(value) => {
                setInformation({...information, confirmPassword: value })
              }}
            />
          </View>
          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Đăng ký</Text>
          </Pressable>
          <Text style={styles.footer}>
            Bạn đã có tài khoản.{" "}
            <Pressable onPress={handleNavigate}>
              <Text style={styles.signinText}>Đăng nhập</Text>
            </Pressable>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  registerButton: {
    marginHorizontal: "45%",
    width: "50%",
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  signinText: {
    color: "blue", // Thay đổi màu sắc tùy theo thiết kế
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
