import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect } from "react";
import { View, Text } from "react-native";

const saveLastRoute = async (routeName: string) => {
  try {
    await AsyncStorage.setItem("@last_route", routeName);
  } catch (e) {
    console.error("Erro ao salvar a rota:", e);
  }
};

export const Title = ({
  title,
  route,
}: {
  title: string;
  route: any;
  navigation: any;
}) => {
  useEffect(() => {
    // Salva a rota atual ao montar o componente
    return () => {
      saveLastRoute(route.name);
    };
  }, []);

  return (
    <View
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "700", marginLeft: 10 }}>
        {title}
      </Text>
    </View>
  );
};
