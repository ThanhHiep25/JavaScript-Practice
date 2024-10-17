<h2>Alarm</h2>
        <h3>Demo project: https://alarm-app-linezz.netlify.app</h3>
        <h3>Mô tả</h3>
        <p><i>Nhập giờ và phút để thực hiện đặt thông báo sau khi hoàn thành chờ đợi đến thời gian mà bạn đã đặt để tận hưởng thành quả</i></p>
        <img src= "https://github.com/user-attachments/assets/a4951d85-f3eb-44c4-9562-d945e15e7e9e"/> 
        <br>
        <br>    
        <p>Kết quả trả về </p>
        <img src="https://github.com/user-attachments/assets/7dc33c4a-4585-4443-a3fb-20e0ea910a95"/>
        <br>
        <br>
        <p>Sửa lại APIKey cá nhân :</p>

 <h4>Các hàm hỗ trợ</h4>
 <p>Hàm appendZero(value): <i>Chức năng: Thêm số "0" vào trước các giá trị giờ hoặc phút nhỏ hơn 10 (để định dạng thời gian chuẩn).</i></p>

      const appendZero = (value) => (value < 10 ? "0" + value : value);

<p>Hàm displayTimer():</p>
<i>Chức năng: Cập nhật thời gian hiện tại lên giao diện và kiểm tra xem có báo thức nào được kích hoạt vào thời điểm hiện tại hay không.</i>
<i>Mỗi giây, hàm sẽ lấy thời gian hiện tại và so sánh với danh sách các báo thức.</i>
<i>Nếu thời gian hiện tại trùng với bất kỳ báo thức nào và báo thức đang hoạt động (isActive), phát âm thanh báo động.</i>

            const displayTimer = () => {
              const date = new Date();
              const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
              timeRef.textContent = currentTime;
              alarmArray.forEach((alarm) => {
                if (alarm.isActive && alarm.time === currentTime.slice(0, 5)) {
                  alarmSound.play();
                }
              });
            };



<h4>Tạo báo thức (createAlarm())</h4>
<i>Tạo đối tượng báo thức mới và thêm vào danh sách alarmArray.</i>
<i>Hiển thị báo thức mới trên giao diện và thêm các nút như checkbox để kích hoạt/tắt báo thức và nút xóa để xóa báo thức.</i>

          const createAlarm = (hour, minute) => {
            alarmIndex += 1;
            const alarmObj = {
              id: `${alarmIndex}_${hour}_${minute}`,
              time: `${appendZero(hour)}:${appendZero(minute)}`,
              isActive: false,
            };
            alarmArray.push(alarmObj);

            const alarmDiv = document.createElement("div");
            alarmDiv.className = "alarm";
            alarmDiv.dataset.id = alarmObj.id;
            alarmDiv.innerHTML = `<span>${alarmObj.time}</span>`;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", () => toggleAlarm(alarmObj));
            alarmDiv.appendChild(checkbox);

            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            deleteButton.className = "deleteButton";
            deleteButton.addEventListener("click", () => deleteAlarm(alarmObj));
            alarmDiv.appendChild(deleteButton);

            activeAlarm.appendChild(alarmDiv);
          };

<h4>Kích hoạt hoặc tắt báo thức (toggleAlarm())</h4>
<i>Bật hoặc tắt trạng thái hoạt động của báo thức.</i>
<i>Nếu báo thức được bật và thời gian trùng với thời gian hiện tại, âm báo sẽ phát ra</i>

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


<h4>Xóa báo thức (deleteAlarm())</h4>
<i>Xóa báo thức khỏi alarmArray và gỡ bỏ nó khỏi giao diện</i>

          const deleteAlarm = (alarm) => {
            const index = alarmArray.indexOf(alarm);
            if (index > -1) {
              alarmArray.splice(index, 1);
              document.querySelector(`[data-id="${alarm.id}"]`).remove();
            }
          };


<h4>Sự kiện click nút clearAlarm</h4>
<i>Khi nhấn nút Xóa tất cả báo thức, tất cả báo thức trong mảng alarmArray sẽ bị xóa và danh sách báo thức trên giao diện sẽ trống.</i>


          clearAlarm.addEventListener("click", () => {
            alarmArray = [];
            activeAlarm.innerHTML = "";
          });


<h4>Đặt báo thức (setAlarm())</h4>
<i>Khi nhấn nút Đặt báo thức, hàm sẽ lấy giá trị giờ và phút từ các ô nhập liệu và kiểm tra xem chúng có hợp lệ hay không (giờ từ 0-23, phút từ 0-59).</i>
<i>Nếu hợp lệ, tạo một báo thức mới bằng cách gọi hàm createAlarm()</i>


          setAlarm.addEventListener("click", () => {
            let hour = parseInt(hourInput.value) || 0;
            let minute = parseInt(minuteInput.value) || 0;

            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
              alert("Giờ hoặc phút không hợp lệ. Vui lòng nhập các giá trị trong phạm vi hợp lệ!");
              return;
            }

            if (!alarmArray.some((alarm) => alarm.time === `${appendZero(hour)}:${appendZero(minute)}`)) {
              createAlarm(hour, minute);
            }
            [hourInput.value, minuteInput.value] = ["", ""];
          });

<h1>Thanks!!!</h1>
<p>Nguồn tham khảo <i>AsmrProg-YT</i></p>

