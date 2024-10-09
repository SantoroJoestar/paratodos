import { Routes } from "./providers/Routes";
import { NativeBaseProvider } from "native-base";

import { CartProvider } from "./providers/CartContext";

import { AuthProvider } from "./providers/AuthContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <CartProvider>
          <Routes />
        </CartProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
