const child_process = require("child_process");
const killzoom = () => {
  child_process.execSync("powershell.exe -c 'taskkill /f /im Zoom.exe'");
};
const clock = () => {
  let today = new Date();

  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  let seconds = today.getSeconds(); // 초
  const dateData = {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
  return dateData;
};
const scanDate = () => {
  const data = clock();

  if (data.hours < 8 || data.hours > 16) {
    console.log("아직 때가 아닙니다");
    process.exit(1);
  } else if (data.hours >= 8 && data.hours < 13) {
    if (data.minutes >= 52 && data.minutes < 55) {
      killzoom();
      process.exit(1);
    }
  } else if (data.hours >= 13 && data.hours <= 16) {
    if (data.minutes >= 43 && data.minutes < 45) {
      killzoom();
      process.exit(1);
    }
  }
};
scanDate();
setInterval(scanDate, 10000);
