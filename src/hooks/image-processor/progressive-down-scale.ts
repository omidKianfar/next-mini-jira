import { createSmoothCanvas } from "./create-smooth-canvas";

// type
import { progressiveProps } from "../type";

export const progressiveDownscale = ({
  img,
  size,
}: progressiveProps): CanvasImageSource => {
  let current: CanvasImageSource = img;

  let width = img.width;
  let height = img.height;

  while (Math.max(width, height) * 0.5 > size) {
    width = Math.round(width * 0.5);
    height = Math.round(height * 0.5);

    const { canvas, ctx } = createSmoothCanvas({ width, height });

    ctx.drawImage(current, 0, 0, width, height);

    current = canvas;
  }

  return current;
};
