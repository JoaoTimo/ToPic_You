import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <View className={`bg-white rounded-3xl p-5 shadow-sm shadow-black/10 ${className}`}>{children}</View>
);

export const Button = ({ label, onPress, variant = "primary" }: { label: string; onPress: () => void; variant?: "primary" | "soft" }) => (
  <Pressable onPress={onPress} className={`rounded-2xl py-4 items-center active:opacity-80 ${variant === "primary" ? "bg-brand" : "bg-blue-50"}`}>
    <Text className={`font-semibold text-base ${variant === "primary" ? "text-white" : "text-brand"}`}>{label}</Text>
  </Pressable>
);

export const Badge = ({ label, color = "bg-ok" }: { label: string; color?: string }) => (
  <View className="flex-row items-center bg-green-50 self-start rounded-full px-3 py-1">
    <View className={`w-2 h-2 rounded-full mr-2 ${color}`} /><Text className="text-xs font-semibold text-ink">{label}</Text>
  </View>
);
