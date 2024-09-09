import React, { useRef, useState, useEffect } from "react";
import {
  OTPInputContainer,
  SplitOTPBoxesContainer,
  TextInputHidden,
  SplitBoxes,
  SplitBoxText,
  SplitBoxesFocused,
} from "./styles";
import { TextInput } from "react-native";

type OTPInputProps = {
  code: string;
  format: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setIsPinReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const OTPInput = ({ code, format, setCode, setIsPinReady }: OTPInputProps) => {
  const boxArray = new Array(format.length).fill(0);
  const inputRef = useRef<TextInput>(null);

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === format.length);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const formatCode = (inputCode: string) => {
    let formattedCode = "";
    let inputIndex = 0;

    for (let i = 0; i < format.length; i++) {
      if (format[i] === "0") {
        if (inputCode[inputIndex]) {
          formattedCode += inputCode[inputIndex];
          inputIndex++;
        } else {
          break;
        }
      } else if (format[i] === "-") {
        formattedCode += "-";
      }
    }
    return formattedCode;
  };

  const handleChangeText = (inputCode: string) => {
    const cleanedInput = inputCode.replace(/-/g, ""); // Remove os traços do input
    const formattedCode = formatCode(cleanedInput); // Formata o código com os traços
    setCode(formattedCode);
  };

  const boxDigit = (_: string, index: number) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === format.length - 1;
    const isCodeComplete = code.length === format.length;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;

    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </SplitOTPBoxesContainer>
      <TextInputHidden
        value={code}
        onChangeText={handleChangeText}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </OTPInputContainer>
  );
};

export default OTPInput;
