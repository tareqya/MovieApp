import { StyleSheet } from "react-native";
import React from "react";
import { Divider } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import {
  Stack,
  TextView,
  EditText,
  Container,
  ButtonView,
} from "../../components";
import { User } from "../../types";
import { fetchUserInfo, login } from "../../utils/DatabaseManager";
import AuthContext from "../../contexts/AuthContext";
import { saveDataToStorage } from "../../utils/LocalStorage";
import { USER_KEY } from "../../utils/Constant";

const LoginScreen = ({ navigation }: NativeStackHeaderProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { setUser } = React.useContext(AuthContext);

  const handleLogin = async () => {
    // function handle login flow
    if (loading) return;
    setLoading(true);
    let user: User = {
      firstName: "",
      lastName: "",
      email: email,
      password: password,
    };
    // login the user
    const results = await login(user);

    // check if login failed
    if (!results) {
      alert("Email or password not correct!");
      setLoading(false);
      return;
    }
    // fetch logedin user info and save it on local device
    const userInfo = await fetchUserInfo(email);
    await saveDataToStorage(USER_KEY, userInfo);
    setLoading(false);
    setUser(userInfo); // update state
  };

  const handleSignupPress = () => {
    // go to create account screen
    navigation.navigate("SignupScreen");
  };

  return (
    <Container>
      <TextView variant="displayLarge" style={styles.title}>
        Sign In
      </TextView>
      <Stack gap={20} style={styles.inputsWrapper}>
        <EditText
          placeholder="test@test.com"
          label={"Email"}
          value={email}
          onChangeText={setEmail}
        />
        <EditText
          placeholder="***********"
          label={"Password"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Stack>

      <Stack gap={20} style={styles.btnWrapper}>
        <ButtonView
          loading={loading}
          buttonType="primary"
          onPress={handleLogin}
        >
          Login
        </ButtonView>
        <Divider />
        <ButtonView buttonType="secondary" onPress={handleSignupPress}>
          Sign Up
        </ButtonView>
      </Stack>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputsWrapper: {
    marginTop: 20,
  },
  title: { fontWeight: "bold" },
  btnWrapper: {
    marginTop: 20,
  },
});
