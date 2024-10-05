import { useState } from "react";

import { StyleSheet, Vibration } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { BarCodeReadEvent } from "react-native-camera";
import { Alert, Box, Slide, Text, useToast } from "native-base";

const TIME_REACTIVATE = 3000;

export default () => {
  const [reactivate, setReactivate] = useState(true);

  const toast = useToast();

  const onSuccess = (e: BarCodeReadEvent) => {
    Vibration.vibrate(500);
    const checkAuth = async () => {
      setReactivate(false);

      try {
        toast.show({
          duration: TIME_REACTIVATE,
          render: () => {
            return (
              <Box bg="blue.500" px="4" py="2" rounded="sm" mb={5}>
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Carregando Pule, aguarde...
                </Text>
              </Box>
            );
          },
        });

        await new Promise((resolve) => setTimeout(resolve, TIME_REACTIVATE));
      } catch {
        toast.show({
          duration: TIME_REACTIVATE,
          render: () => {
            return (
              <Box bg="red.500" px="4" py="2" rounded="sm" mb={5}>
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Erro ao carregar pule!
                </Text>
              </Box>
            );
          },
        });
      }

      setReactivate(true);
    };

    checkAuth();
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={reactivate}
      reactivateTimeout={TIME_REACTIVATE + 500}
      showMarker
      markerStyle={{ borderRadius: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
});
