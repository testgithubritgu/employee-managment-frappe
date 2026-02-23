function createStubCanvasJS() {
  class StubChart {
    constructor() {
      if (!StubChart._warned) {
        StubChart._warned = true;
        // Keep the app running in offline/dev setups where @canvasjs/charts isn't installed.
        console.warn(
          "CanvasJS fallback is active. Install '@canvasjs/charts' for full chart rendering."
        );
      }
    }

    render() {}

    destroy() {}
  }

  return { Chart: StubChart };
}

const CanvasJSFromWindow =
  typeof window !== "undefined" && window.CanvasJS ? window.CanvasJS : null;

export default CanvasJSFromWindow || createStubCanvasJS();
