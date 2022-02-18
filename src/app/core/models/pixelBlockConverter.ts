type WindowResizeListener = (this: Window, ev: UIEvent) => any;

export class PixelBlockConverter {
  width: number = 0;
  blockCount: number;
  element: HTMLElement | null = null;
  listener: WindowResizeListener | null = null;

  constructor(blockCount: number = 1, element: HTMLElement | null = null) {
    this.blockCount = blockCount;

    if (element) this.setElement(element);
  }

  get block() {
    return this.width / this.blockCount;
  }

  setElement(element: HTMLElement) {
    this.element = element;

    if (this.listener) window.removeEventListener('resize', this.listener);

    const listener = () => {
      this.width = element.clientWidth - 1;
    };
    listener();

    this.listener = listener;
    window.addEventListener('resize', this.listener);
  }

  blockToPixel(blocks: number) {
    return blocks * this.block;
  }

  pixelToBlock(pixels: number) {
    return pixels / this.block;
  }

  pixelToPerfectBlock(pixels: number) {
    return Math.floor(this.pixelToBlock(pixels));
  }
}
