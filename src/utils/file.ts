export const formatSizeUnits = (bytes: number) => {
  let text: string = bytes.toString();
  if (bytes >= 1073741824) {
    text = `${(bytes / 1073741824).toFixed(2)} GB`;
  } else if (bytes >= 1048576) {
    text = `${(bytes / 1048576).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    text = `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes > 1) {
    text += ' bytes';
  } else if (bytes === 1) {
    text += ' byte';
  } else {
    text = '0 bytes';
  }
  return text;
};

export const bytesToSzie = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};
