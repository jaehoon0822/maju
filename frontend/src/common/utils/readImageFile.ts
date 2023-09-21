export const readImageFile = (file: File): Promise<string> => {
  return new Promise((reslove) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const result = event.currentTarget as FileReader;
      const image = result.result as string;
      reslove(image);
    };
    fileReader.readAsDataURL(file);
  });
};
