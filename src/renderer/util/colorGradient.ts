export function colorGradient(
  fade: number,
  hexColor1: string,
  hexColor2: string,
  hexColor3?: string
) {
  let color1 = toRGB(hexColor1);
  let color2 = toRGB(hexColor2);

  if (hexColor3) {
    fade = fade * 2;

    if (fade >= 1) {
      fade -= 1;
      color1 = toRGB(hexColor2);
      color2 = toRGB(hexColor3);
    }
  }

  const diffR = color2.red - color1.red;
  const diffG = color2.green - color1.green;
  const diffB = color2.blue - color1.blue;

  const gradient = {
    red: parseInt(String(Math.floor(color1.red + diffR * fade)), 10),
    green: parseInt(String(Math.floor(color1.green + diffG * fade)), 10),
    blue: parseInt(String(Math.floor(color1.blue + diffB * fade)), 10),
  };

  return `rgb(${gradient.red}, ${gradient.green}, ${gradient.blue})`;
}

export function toRGB(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : { red: 255, green: 255, blue: 255 };
}
