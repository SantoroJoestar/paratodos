import { Button, Text, View } from "native-base";
import React from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../types/routes.type";

type Props = {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any>;
};

export const BottomCart = ({ children, navigation }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: 60 }}>{children}</View>
      <View
        position="absolute"
        bottom={0}
        w="100%"
        bgColor="gray.200"
        style={{ flexDirection: "row", padding: 10 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>Total: R$ 10,00</Text>
          <Text style={{ fontWeight: 500, fontSize: 15 }}>
            3 itens no carrinho
          </Text>
        </View>
        {/* @ts-ignore */}
        <Button onPress={() => navigation.navigate("Cart")}>
          Ver carrinho
        </Button>
      </View>
    </View>
  );
};
