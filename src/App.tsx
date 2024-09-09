import { Routes } from "./providers/Routes";
import { NativeBaseProvider } from "native-base";

import { CartProvider } from "./providers/CartContext";

export default function App() {
  return (
    <NativeBaseProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </NativeBaseProvider>
  );
}
