export const ConvertTimeToSeconds = (time: string) => {
  const a = time?.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  return seconds;
};
