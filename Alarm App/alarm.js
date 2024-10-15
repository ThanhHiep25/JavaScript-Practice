document.addEventListener("DOMContentLoaded", () => {
  const timeRef = document.querySelector(".current-time");
  const hourInput = document.getElementById("hour-input");
  const minuteInput = document.getElementById("minute-input");
  const activeAlarm = document.querySelector(".alarms-list");
  const setAlarm = document.getElementById("set");
  const clearAlarm = document.querySelector(".clear");
  const alarmSound = new Audio("./images/estonia-eas-alarm-1984-249124.mp3");

  let alarmIndex = 0;
  let alarmArray = [];
  let initiaHour = 0;
  let initiaMinute = 0;

  const appendZero = (value) => (value < 10 ? "0" + value : value);
  //Chức năng hiển thị thời gian và kích hoạt báo động
  const displayTimer = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
    timeRef.textContent = currentTime
    //Check thoi gian
    alarmArray.forEach((alarm) => {
      if (alarm.isActive && alarm.time === currentTime.slice(0, 5)) {
        alarmSound.play();
      }
    });
  };

  // Hàm tạo báo thức mới

  const createAlarm = (hour, minute) => {
    alarmIndex += 1;

    //Tạo thông báo mới

    const alarmObj = {
      id: `${alarmIndex}_${hour}_${minute}`,
      time: `${appendZero(hour)}:${appendZero(minute)}`,
      isActive: false,
    };

    //Push alarm object moi
    alarmArray.push(alarmObj);

    const alarmDiv = document.createElement("div");
    alarmDiv.className = "alarm";
    alarmDiv.dataset.id = alarmObj.id;
    alarmDiv.innerHTML = `<span>${alarmObj.time}</span>`;

    // Tạo checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => toggleAlarm(alarmObj));
    alarmDiv.appendChild(checkbox);

    // Tạo xóa button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.className = "deleteButton";
    deleteButton.addEventListener("click", () => deleteAlarm(alarmObj));
    alarmDiv.appendChild(deleteButton);

    activeAlarm.appendChild(alarmDiv);
  };

  const toggleAlarm = (alarm) => {
    alarm.isActive = !alarm.isActive;
    if (alarm.isActive) {
      const currentTime = new Date()
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5);
      if (alarm.time === currentTime) {
        alarmSound.play();
      }
    } else {
      alarmSound.pause();
    }
  };

  const deleteAlarm = (alarm) => {
    const index = alarmArray.indexOf(alarm);
    if (index > -1) {
      alarmArray.splice(index, 1);
      document.querySelector(`[data-id="${alarm.id}]`).remove();
    }
  };

  clearAlarm.addEventListener("click", () => {
    alarmArray = [];
    activeAlarm.innerHTML = "";
  });

  setAlarm.addEventListener("click", () => {
    let hour = parseInt(hourInput.value) || 0;
    let minute = parseInt(minuteInput.value) || 0;

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      alert(
        "Giờ hoặc phút không hợp lệ. Vui lòng nhập các giá trị trong phạm vi hợp lệ!"
      );
      return;
    }

    if (
      !alarmArray.some(
        (alarm) => alarm.time === `${appendZero(hour)}: ${appendZero(minute)}`
      )
    ) {
      createAlarm(hour, minute);
    }
    [hourInput.value, minuteInput.value] = ["", ""];
  });

  window.onload = () => {
    setInterval(displayTimer, 1000)[(hourInput.value, minuteInput.value)] = [
      "",
      "",
    ];
  };
});
