/* eslint-disable prettier/prettier */
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

console.log("Registering component with name:", appName);
AppRegistry.registerComponent(appName, () => App);
