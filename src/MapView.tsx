import { useEffect, useState } from "react";
import Svg, { Rect, Path, Circle, G, Text as T } from "react-native-svg";

const R = [[60,430],[60,320],[100,280],[180,280],[260,260],[260,180],[300,130],[315,80]];
const at = (t: number) => {
  const s = Math.min(Math.floor(t * (R.length - 1)), R.length - 2), l = t * (R.length - 1) - s;
  return [R[s][0] + (R[s+1][0] - R[s][0]) * l, R[s][1] + (R[s+1][1] - R[s][1]) * l];
};

export function useBusProgress(start = 0.45) {
  const [p, setP] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setP((v) => (v >= 0.98 ? start : v + 0.004)), 120);
    return () => clearInterval(id);
  }, []);
  return p;
}

export default function MapView({ progress }: { progress: number }) {
  const [bx, by] = at(progress);
  const line = R.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const done = `M${R[0][0]} ${R[0][1]} ` + R.slice(1, Math.ceil(progress * (R.length - 1)) + 1).map((p) => `L${p[0]} ${p[1]}`).join(" ") + ` L${bx} ${by}`;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 375 500" preserveAspectRatio="xMidYMid slice">
      <Rect width="375" height="500" fill="#E8EADF" />
      {[10, 105, 165, 200, 295, 380, 455].map((y) => <Rect key={y} x="0" y={y} width="375" height="12" fill="#fff" />)}
      {[0, 90, 150, 240, 345].map((x) => <Rect key={x} x={x} y="0" width="12" height="500" fill="#fff" />)}
      <T x="120" y="203" fontSize="8" fill="#9CA3AF">Rua XV de Novembro</T>
      <Path d={line} stroke="#CBD5E1" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d={done} stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[R[0], R[1], R[2], R[5]].map((p, i) => <Circle key={i} cx={p[0]} cy={p[1]} r="6" fill={i < 2 ? "#22C55E" : "#fff"} stroke="#2563EB" strokeWidth="2" />)}
      <Circle cx={R[7][0]} cy={R[7][1]} r="9" fill="#EF4444" stroke="#fff" strokeWidth="3" />
      <G>
        <Circle cx={bx} cy={by} r="22" fill="#22C55E" opacity="0.2" />
        <Circle cx={bx} cy={by} r="14" fill="#2563EB" stroke="#fff" strokeWidth="3" />
        <T x={bx} y={by + 5} fontSize="14" textAnchor="middle">🚌</T>
      </G>
    </Svg>
  );
}
