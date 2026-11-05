import { useState } from "react";
import { ScrollView, Text, TextInput, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapView from "./MapView";
import { Badge, Button, Card } from "./ui";

export type Go = (s: "home" | "map" | "notifications" | "profile") => void;

export function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const input = "bg-soft rounded-2xl px-4 py-4 text-ink";
  return (
    <View className="flex-1 bg-white">
      <LinearGradient colors={["#1E3A8A", "#2563EB"]} className="items-center justify-end pt-20 pb-10 px-8">
        <Text className="text-5xl mb-3">🚌</Text>
        <Text className="text-white text-2xl font-bold">PicYou<Text className="text-blue-300">/</Text>FretYou</Text>
        <Text className="text-blue-200 mt-1">Acompanhe sua viagem em tempo real.</Text>
      </LinearGradient>
      <View className="px-8 pt-8 gap-3">
        <TextInput className={input} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput className={input} placeholder="Senha" secureTextEntry value={pw} onChangeText={setPw} />
        <Button label="Entrar" onPress={onLogin} />
        <Button label="Entrar como responsável" variant="soft" onPress={onLogin} />
        <Text className="text-brand text-center mt-2">Esqueci minha senha</Text>
        <Text className="text-gray-400 text-center">Ainda não tenho uma conta</Text>
      </View>
    </View>
  );
}

export function Home({ go }: { go: Go }) {
  return (
    <ScrollView className="flex-1 bg-soft" contentContainerClassName="p-5 pt-16 gap-4">
      <View><Text className="text-2xl font-bold text-navy">Olá, João!</Text>
        <Text className="text-ink">Veja o status do seu transporte.</Text></View>
      <Card className="gap-3">
        <Text className="text-xs font-semibold text-gray-500">Transporte em andamento</Text>
        <Text className="text-xl font-bold text-navy">🚌 Fretado 102</Text>
        <Badge label="Em viagem" />
        {[["Motorista", "João da Silva"], ["Próxima parada", "Rua XV de Novembro"], ["Previsão de chegada", "18:42"], ["Distância", "2,4 km"]].map(([k, v]) => (
          <View key={k} className="flex-row justify-between"><Text className="text-gray-500">{k}</Text><Text className="font-semibold text-ink">{v}</Text></View>))}
        <Button label="Acompanhar viagem" onPress={() => go("map")} />
      </Card>
      <Text className="font-semibold text-navy text-lg">Próximas viagens</Text>
      {[["Ida para instituição", "07:10"], ["Retorno para casa", "17:30"]].map(([t, h]) => (
        <Card key={t} className="flex-row justify-between"><Text className="text-ink font-medium">{t}</Text><Text className="text-brand font-bold">{h}</Text></Card>))}
    </ScrollView>
  );
}

export function MapScreen({ progress }: { progress: number }) {
  const stops = [["Instituição", "Saída — 17:30", "done"], ["Rua das Flores", "Passou — 18:18", "done"], ["Rua XV de Novembro", "Próxima parada — 18:35", "now"], ["Sua residência", "Previsão — 18:42", "next"]];
  const color = { done: "bg-ok", now: "bg-brand", next: "bg-gray-300" } as const;
  return (
    <View className="flex-1 bg-white">
      <View className="flex-[3]">
        <MapView progress={progress} />
        <View className="absolute top-14 left-4 right-4 bg-white rounded-2xl p-4 shadow-md shadow-black/20">
          <Text className="font-bold text-navy">A caminho da sua casa</Text>
          <Text className="text-ink text-xs">O veículo está seguindo para o seu destino.</Text>
        </View>
      </View>
      <ScrollView className="flex-[2] bg-white -mt-6 rounded-t-3xl px-5 pt-5">
        <View className="flex-row justify-between items-center">
          <View><Text className="text-gray-500 text-xs">Chegada prevista</Text><Text className="text-3xl font-bold text-navy">18:42</Text></View>
          <View className="items-end"><Text className="font-semibold text-ink">8 min · 2,4 km</Text><Badge label="Viagem normal" /></View>
        </View>
        <View className="h-2 bg-soft rounded-full mt-4"><View className="h-2 bg-brand rounded-full" style={{ width: `${progress * 100}%` }} /></View>
        <Text className="font-semibold text-navy mt-5 mb-2">Rota</Text>
        {stops.map(([n, s, st]) => (
          <View key={n} className="flex-row items-center mb-3">
            <View className={`w-4 h-4 rounded-full mr-3 ${color[st as keyof typeof color]}`} />
            <View><Text className={`font-semibold ${st === "now" ? "text-brand" : "text-ink"}`}>{n}</Text><Text className="text-xs text-gray-500">{s}</Text></View>
          </View>))}
      </ScrollView>
    </View>
  );
}

export function Notifications() {
  const items = [["🚌", "Fretado saiu da instituição", "O transporte iniciou o trajeto para as residências.", "bg-blue-50"],
    ["📍", "O fretado está próximo", "O veículo está a aproximadamente 5 minutos do seu destino.", "bg-yellow-50"],
    ["🏠", "Chegada próxima", "O fretado chegará ao seu endereço em aproximadamente 2 minutos.", "bg-green-50"]];
  return (
    <ScrollView className="flex-1 bg-soft" contentContainerClassName="p-5 pt-16 gap-3">
      <Text className="text-2xl font-bold text-navy mb-2">Notificações</Text>
      {items.map(([i, t, d, bg]) => (
        <View key={t} className={`${bg} rounded-3xl p-4 flex-row`}><Text className="text-2xl mr-3">{i}</Text>
          <View className="flex-1"><Text className="font-semibold text-ink">{t}</Text><Text className="text-gray-600 text-sm">{d}</Text></View></View>))}
    </ScrollView>
  );
}

export function Profile() {
  return (
    <ScrollView className="flex-1 bg-soft" contentContainerClassName="p-5 pt-16 gap-3">
      <Text className="text-2xl font-bold text-navy">Meu perfil</Text>
      <Card><Text className="text-xl font-bold text-navy">João Vitor</Text><Text className="text-gray-500">joao@email.com</Text></Card>
      {["Meus dados", "Meus endereços", "Meus transportes", "Responsáveis", "Notificações", "Configurações", "Sair"].map((t) => (
        <Pressable key={t} className="bg-white rounded-2xl p-4 active:opacity-70"><Text className={t === "Sair" ? "text-danger font-semibold" : "text-ink font-medium"}>{t}</Text></Pressable>))}
    </ScrollView>
  );
}
