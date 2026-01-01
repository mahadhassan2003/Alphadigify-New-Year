import type { Plugin } from "vite";
import path from "path";
import fs from "fs";

export function metaImagesPlugin(): Plugin {
  return {
    name: "vite-plugin-meta-images",
    apply: "build",
    async writeBundle(options, bundle) {
      const outDir = options.dir || "dist";
      const indexHtmlPath = path.resolve(outDir, "index.html");
      
      if (!fs.existsSync(indexHtmlPath)) return;
      
      let html = fs.readFileSync(indexHtmlPath, "utf-8");
      
      // Look for opengraph.jpg in the bundle
      const ogImage = Object.values(bundle).find(
        (f) => f.type === "asset" && f.fileName.includes("opengraph")
      );
      
      if (ogImage) {
        const ogUrl = `/${ogImage.fileName}`;
        html = html.replace(/content="\/opengraph\.jpg"/g, `content="${ogUrl}"`);
        fs.writeFileSync(indexHtmlPath, html);
      }
    },
  };
}
