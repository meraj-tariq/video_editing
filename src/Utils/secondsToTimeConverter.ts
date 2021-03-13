export function convertSecondsToTime(time: number) {
  const sec_num = typeof time !== "number" ? 0 : time;
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
  const hr = hours < 10 ? "0" + hours : hours;
  const min = minutes < 10 ? "0" + minutes : minutes;
  const sec = seconds < 10 ? "0" + seconds : seconds;

  return hr + ":" + min + ":" + sec;
}
