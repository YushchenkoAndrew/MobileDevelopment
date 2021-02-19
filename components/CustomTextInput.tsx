import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Animated, Dimensions, KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";

const { width } = Dimensions.get("screen");

interface CustomTextInputProps {
  name: string;
  keyboardType?: KeyboardTypeOptions;
  style?: object;
  callback?: Function;
  error?: boolean;
}

export default class CustomTextInput extends React.PureComponent<CustomTextInputProps> {
  state = { value: "", focus: false };
  animatedFocus = new Animated.Value(0);

  componentDidUpdate() {
    Animated.timing(this.animatedFocus, { toValue: this.state.focus ? 1 : 0, duration: 150, useNativeDriver: false }).start();
  }

  onChangeText(value: string) {
    this.setState({ ...this.state, value });
    if (this.props.callback) this.props.callback(value);
  }

  render() {
    const animatedStyle = {
      top: this.animatedFocus.interpolate({ inputRange: [0, 1], outputRange: [19, 0] }),
      left: this.animatedFocus.interpolate({ inputRange: [0, 1], outputRange: [23, 25] }),
      color: this.animatedFocus.interpolate({ inputRange: [0, 1], outputRange: ["#aaa", "#000"] }),
    };

    return (
      <View style={{ paddingBottom: 6 }}>
        <Animated.Text style={{ ...styles.text, ...animatedStyle }}>{this.props.name}</Animated.Text>
        <TextInput
          style={{
            ...styles.textInput,
            ...(this.state.focus ? styles.focusedStyle : {}),
            ...(this.props.style ?? {}),
            ...(this.props.error ? { borderColor: "#fc9626" } : {}),
          }}
          onFocus={() => this.setState({ ...this.state, focus: true })}
          onBlur={() => this.setState({ ...this.state, focus: !!this.state.value })}
          keyboardType={this.props.keyboardType ?? undefined}
          value={this.state.value}
          onChangeText={this.onChangeText.bind(this)}
        />
        {this.props.error ? (
          <View style={{ position: "absolute" }}>
            <Ionicons name="alert-circle" size={28} color="#fc9626" style={styles.errorIcon} />
            <Text style={styles.errorText}>Invalid {this.props.name}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    backgroundColor: "#fff",
    zIndex: 10,

    top: 0,
    left: 30,

    paddingLeft: 2,
    paddingRight: 3,

    fontSize: 15,
  },

  textInput: {
    justifyContent: "flex-end",
    width: width - 80,

    borderBottomWidth: 2,

    // borderWidth: 2,
    // borderColor: "#818181",
    borderColor: "#ccc",

    // borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // border

    margin: 10,
    fontSize: 15,
  },

  focusedStyle: {
    borderWidth: 2,
    borderRadius: 5,
  },

  errorIcon: {
    position: "absolute",
    zIndex: 10,

    top: 15,
    left: width - 110,
  },

  errorText: {
    position: "absolute",

    top: 52,
    left: 10,

    color: "#fc9626",
    fontSize: 10,
  },
});
