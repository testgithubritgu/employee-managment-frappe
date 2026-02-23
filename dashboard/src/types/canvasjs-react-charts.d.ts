declare module "@canvasjs/react-charts" {
  import type { ComponentType } from "react";

  type CanvasDataPoint = {
    label?: string;
    y?: number;
    [key: string]: unknown;
  };

  type CanvasSeries = {
    type?: string;
    dataPoints?: CanvasDataPoint[];
    [key: string]: unknown;
  };

  export type CanvasJSChartOptions = {
    title?: { text?: string; [key: string]: unknown };
    data?: CanvasSeries[];
    [key: string]: unknown;
  };

  export interface CanvasJSChartProps {
    options: CanvasJSChartOptions;
    containerProps?: Record<string, unknown>;
    [key: string]: unknown;
  }

  const CanvasJSReact: {
    CanvasJSChart: ComponentType<CanvasJSChartProps>;
    CanvasJS?: unknown;
  };

  export default CanvasJSReact;
}
