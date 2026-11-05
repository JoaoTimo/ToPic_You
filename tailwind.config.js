module.exports = {
  content: ["./App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: { extend: { colors: {
    brand: "#2563EB", navy: "#1E3A8A", ok: "#22C55E", warn: "#FACC15", danger: "#EF4444",
    soft: "#F3F4F6", ink: "#374151" } } },
};
