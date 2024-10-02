import { Button, Text, View } from "native-base";
import React from "react";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useCart } from "../providers/CartContext";
import { calculateAmountGame } from "../utils/calculateAmountGame";
import { formatterBRL } from "../utils/formatCurrency";

type Props = {
  children: React.ReactNode;
  navigation: NativeStackNavigationProp<any>;
};

export const BottomCart = ({ children, navigation }: Props) => {
  const { cart } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingBottom: cart.games.length > 0 ? 60 : 0 }}>
        {children}
      </View>
      {cart.games.length > 0 && (
        <View
          position="absolute"
          bottom={0}
          w="100%"
          bgColor="gray.200"
          style={{ flexDirection: "row", padding: 10 }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 700, fontSize: 18 }}>
              Total: {formatterBRL(calculateAmountGame(cart.games))}
            </Text>
            <Text style={{ fontWeight: 500, fontSize: 15 }}>
              {cart.games.length} itens no carrinho
            </Text>
          </View>
          {/* @ts-ignore */}
          <Button bg={"yellow.600"} onPress={() => navigation.navigate("Cart")}>
            Ver carrinho
          </Button>
        </View>
      )}
    </View>
  );
};
