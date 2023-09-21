export const toEditContent = (content: string) => {
  const spanTagRegex = /<span([^>]*)>([^<]*)<([^<]*)\/span>/g;
  const replaceContent = content.replace(spanTagRegex, "$2");

  return replaceContent;
};
