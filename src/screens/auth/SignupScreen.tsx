import { StyleSheet, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import {
  ButtonView,
  Container,
  EditText,
  Stack,
  TextView,
} from "../../components";
import { COLORS } from "../../../assets/styles";
import {
  checkEmail,
  checkNameFormat,
  checkPassword,
} from "../../utils/UtilsFunctions";
import { createAccount } from "../../utils/DatabaseManager";
import { User } from "../../types";

const SignupScreen = ({ navigation }: NativeStackHeaderProps) => {
  const [isOver18, setIsOver18] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEamil] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleCreateAccount = async () => {
    // check user inputs before create account
    if (!isOver18) {
      alert("You should be over 18 years old to create account!");
      return;
    }
    if (!checkNameFormat(firstName) || !checkNameFormat(lastName)) {
      alert("First Name and Last Name fields requireds!");
      return;
    }

    if (!checkEmail(email)) {
      alert("Email format not correct!");
      return;
    }

    if (!checkPassword(password)) {
      alert("Password should be at least 6 characters!");
      return;
    }

    if (loading) return;
    setLoading(true);
    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    // create new user account
    const result = await createAccount(user);

    setLoading(false);
    // check if create account success
    if (!result) {
      alert("Faield to create account!");

      return;
    }
    navigation.goBack();
  };

  return (
    <Container goBack={() => navigation.goBack()}>
      <TextView variant="displayLarge" style={styles.title}>
        Signup
      </TextView>

      <View style={styles.inputsWrapper}>
        <Stack direction="Horizontal" gap={10}>
          <EditText
            placeholder="First Name"
            label="First Name"
            style={{ flex: 1 }}
            value={firstName}
            onChangeText={setFirstName}
          />
          <EditText
            placeholder="Last Name"
            label="Last Name"
            style={{ flex: 1 }}
            value={lastName}
            onChangeText={setLastName}
          />
        </Stack>

        <Stack
          direction="Vertical"
          style={{ width: "100%", marginTop: 10 }}
          gap={10}
        >
          <EditText
            placeholder="Email"
            label={"Email"}
            value={email}
            onChangeText={setEamil}
          />
          <EditText
            placeholder="Password"
            secureTextEntry
            label={"Password"}
            value={password}
            onChangeText={setPassword}
          />
        </Stack>

        <Stack direction="Horizontal" style={styles.checkboxWrapper}>
          <Checkbox
            style={styles.checkbox}
            value={isOver18}
            color={COLORS.tomato}
            onValueChange={setIsOver18}
          />
          <TextView variant="bodyLarge">Im over 18 years old</TextView>
        </Stack>
      </View>

      <ButtonView loading={loading} onPress={handleCreateAccount}>
        Signup
      </ButtonView>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  inputsWrapper: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  checkboxWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 10,
  },
});
