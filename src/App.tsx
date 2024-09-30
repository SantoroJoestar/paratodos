import { Routes } from "./providers/Routes";
import { NativeBaseProvider } from "native-base";

import { CartProvider } from "./providers/CartContext";
import { SettingsProvider } from "./providers/SettingsContext";
import { AuthProvider } from "./providers/AuthContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <SettingsProvider>
          <CartProvider>
            <Routes />
          </CartProvider>
        </SettingsProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
