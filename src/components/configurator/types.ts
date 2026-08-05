export interface ProductType {
  id: string;
  name: string;
  category: "sliding" | "casement" | "partition" | "specialty";
  basePricePerSqFt: number;
  description: string;
  defaultSightlineMm: number;
  features: string[];
}

export interface FrameColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  border: string;
  textureType: "solid" | "anodized" | "brushed" | "bronze" | "wood";
  priceMultiplier: number;
}

export interface GlassSpec {
  id: string;
  name: string;
  shortDesc: string;
  multiplier: number;
  fill: string;
  stroke: string;
  pattern?: "none" | "frosted" | "reeded" | "mirror" | "smart";
  edgeTint: string;
  reflectionOpacity: number;
  doubleEdge?: boolean;
}

export interface HandleFinish {
  id: string;
  name: string;
  hex: string;
  priceAdd: number;
}
