/** @type {import('tailwindcss').Config} */
const px_to_rem = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i / 16}rem`) };
};

const num = (x) => {
  return { ...Array.from(Array(x + 1)).map((_, i) => `${i}`) };
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      borderWidth: px_to_rem(100),
      borderRadius: px_to_rem(100),
      fontSize: px_to_rem(100),
      lineHeight: px_to_rem(100),
      width: px_to_rem(1000),
      height: px_to_rem(1000),
      margin: px_to_rem(100),
      padding: px_to_rem(100),
      minWidth: px_to_rem(1000),
      minHeight: px_to_rem(1000),
      spacing: px_to_rem(300),
      zIndex: num(300),
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        white: "#ffffff",
        black2: "rgba(0,0,0,0.7)",
        darkblue: "rgba(0, 21, 134, 0.54)",
        darkblue2: "rgba(0, 18, 110, 0.4)",
        dblue: "rgba(0, 21, 134, 1)",
        cardTop: "#F4DFA2",
        cardBottom: "#EFF6EE",
        red2: "rgba(207,62,149,1)",
        darkgray: "rgba(80,80,80,1)",
        unselect:"rgba(0,28,44,1)",
        blue2:"#2f81f7",
        comment:
          "linear-gradient(89.7deg, rgb(0, 0, 0) -10.7%, rgb(53, 92, 125) 88.8%)",
      },
      fontFamily: {
        nemo: ["nemo030"],
        neo: ["neo"],
        neob: ["neob"],
        gothic: ["gothic"],
      },
      boxShadow: {
        neon: "0 0 20px 10px rgba(0,21,134,0.7), inset 0 0 20px 20px rgba(70,140,190,0.3)",
        neon2: "0 0 20px 10px rgba(0,21,134,0.7)",
        neon3:
          "0 0 20px 10px rgba(0,21,134,0.7), inset 0 0 20px 10px rgba(70,140,190,0.35)",
        neon4:
          "0 0 20px 10px rgba(0,21,134,0.7), inset 0 0 20px 10px rgba(110,181,233,0.5)",
        neon5:
          "0 0 10px 10px rgba(0,50,180,0.8), inset 0 0 20px 10px rgba(110,181,233,0.5)",
        neon6: "0 0 10px 7px rgba(0,21,134,0.4)",
        selected: "0 0 10px 3px rgba(255,255,255,1)",
        blackcard:
          " 20px 20px 0 0 rgba(0,0,0,0.7), inset 20px 20px 0 0 rgba(0,0,0,0.7), inset",
      },
      keyframes: {
        wave: {
          "0%, 50%, 100%": {
            transform: "translate(0%, -10%)",
          },
          "25%, 75%": {
            transform: "translate(2%, 10%)",
          },
        },
        blob: {
          "0%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
          "25%": {
            "border-radius": "89% 54% 62% 42% / 83% 45% 75% 63%",
          },
          "50%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
          "75%": {
            "border-radius": "46% 54% 50% 50% / 35% 61% 39% 65%",
          },
          "100%": {
            "border-radius": "65% 60% 35% 50% / 65% 38% 75% 36%",
          },
        },
        typing: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        shine: {
          "0%": { filter: "brightness(0)" },
          "50%": { filter: "brightness(2)" },
          "100%": { filter: "brightness(1)" },
        },
        dropdownSlideIn: {
          "0%": {
            transform: "translateY(-100%)",
            height: "0",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        dropdownSlideOut: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-100%)",
            height: "0",
          },
        },
        shooting:{
          "0%": {
            transform: "translateY(-200px) rotate(-90deg)",
            opacity:1
          },
          "100%": {
            transform: "translateY(600px) rotate(-90deg)",
            opacity:0
          },
        }
      },
      animation: {
        wave: "wave 5s ease-in-out infinite",
        blob: "blob 15s ease-in-out infinite",
        typing: "typing 3s steps(25) infinite",
        wiggle: "wiggle 1.2s ease-in-out",
        shine: "shine 3s ease-in-out",
        dropdownSlideIn: "dropdownSlideIn 1s ease-in-out",
        dropdownSlideOut: "dropdownSlideOut 1s ease-in-out",
        spinOnce: "spin 0.5s ease-in-out",
        shooting: "shooting 2s linear infinite"
      },
    },
  },
  plugins: [
    require("@kamona/tailwindcss-perspective"),
    require("tailwind-scrollbar"),
    require("tailwindcss-scoped-groups")({
      groups: ["one", "two"],
    }),
  ],
};
