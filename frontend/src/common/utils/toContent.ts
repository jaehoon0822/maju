const toContent = (content: string, hashtags: string[]) => {
  let changeContent = content;

  hashtags.forEach((hashtag) => {
    changeContent = changeContent.replace(
      hashtag,
      `<span style="color:#3b83f6">${hashtag}</span>`
    );
  });
  return changeContent;
};

export default toContent;
