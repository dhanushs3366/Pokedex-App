/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/src/**/*.{html,js,ts,tsx,css}", "./frontend/*.html","./frontend/src/*.{html,js,ts,tsx,css}"],
  theme: {
    extend: {
      spacing:{
        "10px":"2px",
        "200px":"200px",
        "poke-guess":"200px",
        "poke-guess-header":"300px",
        "poke-viewer":"250px",
        "poke-viewer-offset":"50px",//poke-viewer-poke-guess-10
        "poke-guess-frame":"250px"
      },
      scale: {
        104: "1.04",
      },
      width: {
        inherit: "inherit", // Inherit width from parent
      },
      height: {
        inherit: "inherit", // Inherit height from parent
      },
      backgroundImage: {
        // 'main-bg': 'linear-gradient(to bottom right, #22223b, #4a4e69)',
        "main": "linear-gradient(to bottom right, #ED4264, #FFEDBC)",
        "artistic-radial": "radial-gradient(circle, #22223b, #4a4e69, #9a8c98)",
        "custom-gradient":
          "linear-gradient(135deg, #22223b, #4a4e69, #9a8c98, #c9ada7, #f2e9e4)",
        "artistic-linear":
          "linear-gradient(135deg, #22223b, #4a4e69 25%, #9a8c98 50%, #c9ada7 75%, #f2e9e4)",
        "artistic-conic":
          "conic-gradient(from 180deg, #22223b, #4a4e69, #9a8c98, #c9ada7, #f2e9e4)",
        "custom":
          "radial-gradient(18% 28% at 24% 50%, #CEFAFFFF 7%, #073AFF00 100%),radial-gradient(18% 28% at 18% 71%, #FFFFFF59 6%, #073AFF00 100%),radial-gradient(70% 53% at 36% 76%, #73F2FFFF 0%, #073AFF00 100%),radial-gradient(42% 53% at 15% 94%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(42% 53% at 34% 72%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(18% 28% at 35% 87%, #FFFFFFFF 7%, #073AFF00 100%),radial-gradient(31% 43% at 7% 98%, #FFFFFFFF 24%, #073AFF00 100%),radial-gradient(21% 37% at 72% 23%, #D3FF6D9C 24%, #073AFF00 100%),radial-gradient(35% 56% at 91% 74%, #8A4FFFF5 9%, #073AFF00 100%),radial-gradient(74% 86% at 67% 38%, #6DFFAEF5 24%, #073AFF00 100%),linear-gradient(125deg, #4EB5FFFF 1%, #4C00FCFF 100%);",
      },
      screen: {
        "rpi-wd": "1024px",
      },
      fontFamily: {
        "8bit-bold":["8bit-bold","ui-sans-serif"]
      },
    },
  },
  plugins: [],
};
