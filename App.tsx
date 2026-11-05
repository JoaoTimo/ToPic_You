import "./global.css";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Bell, Home as HomeIcon, Map, User } from "lucide-react-native";
import { Home, Login, MapScreen, Notifications, Profile, Go } from "./src/screens";
import { useBusProgress } from "./src/MapView";

type Tab = Parameters<Go>[0];
const TABS: [Tab, string, typeof Map][] = [["home", "Início", HomeIcon], ["map", "Mapa", Map], ["notifications", "Avisos", Bell], ["profile", "Perfil", User]];

export default function App() {
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const progress = useBusProgress();
  return (
    <SafeAreaProvider>
      <StatusBar style={logged && tab !== "map" ? "dark" : "light"} />
      {!logged ? <Login onLogin={() => setLogged(true)} /> : (
        <View className="flex-1">
          <View className="flex-1">
            {tab === "home" && <Home go={setTab} />}
            {tab === "map" && <MapScreen progress={progress} />}
            {tab === "notifications" && <Notifications />}
            {tab === "profile" && <Profile />}
          </View>
          <View className="flex-row bg-white pb-8 pt-3 border-t border-gray-100">
            {TABS.map(([k, label, Icon]) => (
              <Pressable key={k} onPress={() => setTab(k)} className="flex-1 items-center gap-1">
                <Icon size={24} color={tab === k ? "#2563EB" : "#9CA3AF"} />
                <Text className={`text-xs font-semibold ${tab === k ? "text-brand" : "text-gray-400"}`}>{label}</Text>
              </Pressable>))}
          </View>
        </View>)}
    </SafeAreaProvider>
  );
}
