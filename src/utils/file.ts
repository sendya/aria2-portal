export type SizeUnits = [number, string];

export const sizeUnits = (bytes?: number): SizeUnits => {
  const val: SizeUnits = [0, 'B'];
  if (!bytes) {
    return val;
  }
  val[0] = bytes;
  if (bytes >= 1073741824) {
    val[0] = Number((bytes / 1073741824).toFixed(2));
    val[1] = 'GB';
  } else if (bytes >= 1048576) {
    val[0] = Number((bytes / 1048576).toFixed(2));
    val[1] = 'MB';
  } else if (bytes >= 1024) {
    val[0] = Number((bytes / 1024).toFixed(2));
    val[1] = 'KB';
  } else if (bytes > 1) {
    val[0] = Number((bytes / 1024).toFixed(2));
  } else {
    val[0] = 0;
  }
  return val;
};

export const formatSizeUnits = (bytes?: number): string => {
  const val = sizeUnits(bytes);
  return `${val[0]} ${val[1]}`;
};

export const bytesToSzie = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};
