import { Routes } from "./providers/Routes";
import { NativeBaseProvider } from "native-base";

import { CartProvider } from "./providers/CartContext";
import { SettingsProvider } from "./providers/SettingsContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <SettingsProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </SettingsProvider>
    </NativeBaseProvider>
  );
}
