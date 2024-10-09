import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, IconButton } from "native-base";
import { useEffect } from "react";
import { View, Text } from "react-native";

import Icons from "react-native-vector-icons/AntDesign";

const saveLastRoute = async (routeName: string) => {
  try {
    await AsyncStorage.setItem("@last_route", routeName);
  } catch (e) {
    console.error("Erro ao salvar a rota:", e);
  }
};

// Função para obter a última rota salva
const getLastRoute = async () => {
  try {
    const lastRoute = await AsyncStorage.getItem("@last_route");
    return lastRoute;
  } catch (e) {
    console.error("Erro ao obter a rota:", e);
    return null;
  }
};

export const TitleBack = ({
  title,
  route,
  navigation,
  params,
}: {
  title: string;
  route: any;
  navigation: any;
  params?: any;
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
      }}
    >
      <IconButton
        icon={<Icons name="arrowleft" size={30} />}
        onPress={async () => {
          const lastRoute = await getLastRoute();
          if (lastRoute) {
            saveLastRoute(title);
            if (params) navigation.replace(lastRoute, params);
            else navigation.replace(lastRoute);
          }
        }}
      />
      <Text style={{ fontSize: 25, fontWeight: "700", marginLeft: 10 }}>
        {title}
      </Text>
    </View>
  );
};
