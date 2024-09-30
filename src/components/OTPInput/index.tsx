import React, { useRef, useEffect } from "react";
import {
  OTPInputContainer,
  SplitOTPBoxesContainer,
  TextInputHidden,
  SplitBoxes,
  SplitBoxText,
  SplitBoxesFocused,
  SplitBoxesGap,
  gap,
} from "./styles";
import { TextInput } from "react-native";

type OTPInputProps = {
  code: string;
  format: string;
};

const OTPInput = ({ code, format }: OTPInputProps) => {
  const boxArray = new Array(format.length).fill(0);

  const boxDigit = (_: string, index: number) => {
    const emptyInput = "";
    let digit = code[index] || emptyInput;

    const isGap = format[index] === "-";

    if (isGap) digit = "-";

    const isCurrentValue = index === code.length;
    const isLastValue = index === format.length - 1;
    const isCodeComplete = code.length === format.length;

    const isValueFocused =
      isCurrentValue ||
      (isLastValue && isCodeComplete) ||
      (code.length === format.slice(0, index - 1).length &&
        format[index - 1] === "-");

    let StyledSplitBoxes = isValueFocused ? SplitBoxesFocused : SplitBoxes;

    if (isGap) StyledSplitBoxes = SplitBoxesGap;

    return (
      <StyledSplitBoxes style={{ marginHorizontal: gap / 2 }} key={index}>
        <SplitBoxText style={{ fontSize: isGap ? 23 : 25 }}>
          {digit}
        </SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
    </OTPInputContainer>
  );
};

export default OTPInput;
