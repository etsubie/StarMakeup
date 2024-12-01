import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["swiper/react", "swiper"], // Ensure Vite optimizes Swiper
  },
});
