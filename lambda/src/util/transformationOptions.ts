export type TransformationOption = {
  name: "w40" | "w80" | "w112" | "w348" | "w576" | "w960";
  width: 40 | 80 | 112 | 140 | 348 | 576 | 960;
};

export type TransformationOptions = TransformationOption[];

export const postTransformationOptions: TransformationOptions = [
  { name: "w348", width: 348 },
  { name: "w576", width: 576 },
  { name: "w960", width: 960 },
];

export const avatarTransformationOptions: TransformationOptions = [
  { name: "w40", width: 40 },
  { name: "w80", width: 80 },
  { name: "w112", width: 112 },
];

export const coverImageTransformationOptions: TransformationOptions = [
  { name: "w348", width: 348 },
  { name: "w576", width: 576 },
  { name: "w960", width: 960 },
];
