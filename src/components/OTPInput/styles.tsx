import { TextInput } from "react-native";
import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled(TextInput)`
  /* width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
  position: absolute;
  opacity: 0;
  width: 100%;
`;

export const gap = 5;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 100%;
  height: 50px;
  padding-left: ${gap / -2}px;
  padding-right: ${gap / -2}px;
  flex-direction: row;
  justify-content: center;
`;

export const SplitBoxes = styled.View`
  border-color: #e5e5e5;
  background-color: #ffffff89;
  border-width: 2px;
  border-radius: 5px;
  width: 40px;
  height: 40px;
`;

export const SplitBoxesGap = styled.View`
  border-color: transparent;
  border-width: 2px;
  border-radius: 5px;
  width: 20px;
  height: 40px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: black;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: blue;
  background-color: #f0ecff;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;
