import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	// publicDir: "src",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
	},
	optimizeDeps: {
		exclude: ["lucide-react"],
	},
});
