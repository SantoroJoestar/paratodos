import React, { useRef, useState, useEffect, useMemo } from "react";
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
  setCode: (code: OTPInputProps["code"]) => void;
  setIsPinReady?: React.Dispatch<React.SetStateAction<boolean>>;
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
    if (!setIsPinReady) return;
    // update pin ready status
    setIsPinReady(code.length === format.length);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  useEffect(() => {
    handleOnPress();
  }, []);

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
    // Remove os traços do input para processamento
    let cleanedInput = inputCode.replace(/-/g, "");

    if (inputCode.length < code.length && code[code.length - 1] === "-")
      cleanedInput = cleanedInput.slice(0, -1);

    // Atualiza o código formatado com base no código limpo
    const formattedCode = formatCode(cleanedInput);
    setCode(formattedCode);
  };

  const boxDigit = (_: string, index: number) => {
    const emptyInput = "";
    let digit = code[index] || emptyInput;

    const isGap = format[index] === "-";

    if (isGap) digit = "-";

    const isCurrentValue = index === code.length;
    const isLastValue = index === format.length - 1;
    const isCodeComplete = code.length === format.length;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    let StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;

    if (isGap) StyledSplitBoxes = SplitBoxesGap;

    return (
      <StyledSplitBoxes style={{ marginHorizontal: gap / 2 }} key={index}>
        <SplitBoxText style={{ fontSize: isGap ? 35 : 20 }}>
          {digit}
        </SplitBoxText>
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
        keyboardType="numeric"
        autoFocus
        onChangeText={handleChangeText}
        ref={inputRef}
        onBlur={handleOnBlur}
        caretHidden={true} // Esconde o cursor
        selectTextOnFocus={false}
      />
    </OTPInputContainer>
  );
};

export default OTPInput;
