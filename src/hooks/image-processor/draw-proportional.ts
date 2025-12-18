import { progressiveProps } from "../type";
import { createSmoothCanvas } from "./create-smooth-canvas";
import { progressiveDownscale } from "./progressive-down-scale";

export const drawProportional = ({
  img,
  size,
}: progressiveProps): HTMLCanvasElement => {
  const maxSide = Math.max(img.width, img.height);

  if (maxSide <= size) {
    const { canvas, ctx } = createSmoothCanvas({
      width: img.width,
      height: img.height,
    });

    ctx.drawImage(img, 0, 0);
    return canvas;
  }

  const scale = size / maxSide;

  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const source = progressiveDownscale({ img, size }) as any;

  const { canvas, ctx } = createSmoothCanvas({ width, height });

  ctx.drawImage(source, 0, 0, width, height);

  return canvas;
};
