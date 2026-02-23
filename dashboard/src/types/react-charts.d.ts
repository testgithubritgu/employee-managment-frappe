declare module "react-charts" {
  import type { ComponentType } from "react";

  export interface ChartProps {
    data: unknown;
    axes: unknown;
    tooltip?: unknown;
    primaryCursor?: unknown;
    secondaryCursor?: unknown;
    [key: string]: unknown;
  }

  export const Chart: ComponentType<ChartProps>;
}
