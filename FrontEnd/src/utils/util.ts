//sec 2 time
export function sec2time(sec: any) {
  sec = Number(sec);
  let m = Math.floor(sec / 60);
  let s = sec % 60;

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
