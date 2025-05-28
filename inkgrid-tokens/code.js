figma.showUI(__html__);

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "import-colors") {
    try {
      const data = JSON.parse(msg.text);
      for (const group in data) {
        for (const name in data[group]) {
          const color = data[group][name];
          const style = figma.createPaintStyle();
          style.name = `${group}/${name}`;
          style.paints = [
            {
              type: "SOLID",
              color: hexToRgb(color),
            },
          ];
        }
      }
      figma.closePlugin("🎨 Color styles created successfully.");
    } catch (err) {
      figma.closePlugin("❌ Failed to process JSON data.");
    }
  }
};
