const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("수업 종료 뒤에 몇 분 후에 줌을 Kill하시겠습니까?? ", (minutes) => {
  const settingMinutes = minutes;
  console.log(`수업 시간 종료 후 줌 Kill : ${minutes}분 후`);

  setInterval(() => {
    scanDate(settingMinutes);
  }, 10000);
});

const child_process = require("child_process");
const killzoom = () => {
  child_process.execSync("powershell.exe -c 'taskkill /f /im Zoom.exe'");
};
const clock = () => {
  let today = new Date();

  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  const dateData = {
    hours: hours,
    minutes: minutes,
  };
  return dateData;
};

const scanDate = (settingMinutes) => {
  const data = clock();

  if (data.hours < 8 || data.hours > 20) {
    console.log("아직 수업시간이 아닙니다.");
    process.exit(1);
  } else if (data.hours >= 8 && data.hours < 13) {
    if (data.minutes >= 50 + settingMinutes && data.minutes < 55) {
      try {
        killzoom();
      } catch (err) {
        console.log("zoom이 이미 꺼졌습니다");
      }
    }
  } else if (data.hours >= 13 && data.hours <= 19) {
    if (data.minutes >= 0 + settingMinutes && data.minutes < 45) {
      try {
        killzoom();
      } catch (err) {
        console.log("zoom이 이미 꺼졌습니다");
      }
    }
  }
};
