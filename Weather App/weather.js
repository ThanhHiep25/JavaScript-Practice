document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const search = document.querySelector(".search-box button");
    const weatherBox = document.querySelector(".weather-box");
    const weatherDetail = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");
  
    search.addEventListener("click", () => {
      const APIKey = "";
      const city = document.querySelector(".search-box input").value;
      // Kiểm tra nếu không có tên thành phố
      if (city.trim() === "") return;
  
      // Fetch dữ liệu thời tiết
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          return response.json();
        })
        .then((json) => {
          if (json.cod === "404") {
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetail.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");
            return;
          }
  
          // Ẩn phần lỗi nếu không tìm thấy lỗi
          error404.style.display = "none";
          error404.classList.remove("fadeIn");
  
          // Lấy thông tin về thời tiết và cập nhật giao diện
          const image = document.querySelector(".weather-box img");
          const temperature = document.querySelector(".weather-box .temperature");
          const description = document.querySelector(".weather-box .description");
          const humidity = document.querySelector(".weather-details .humidity span");
          const wind = document.querySelector(".weather-details .wind span");
  
          // Cập nhật hình ảnh dựa trên tình trạng thời tiết
          switch (json.weather[0].main) {
            case "Clear":
              image.src = "images/clear.png";
              break;
            case "Rain":
              image.src = "images/rain.png";
              break;
            case "Snow":
              image.src = "images/snow.png";
              break;
            case "Clouds":
              image.src = "images/cloud.png";
              break;
            case "Haze":
              image.src = "images/mist.png";
              break;
            default:
              image.src = "";
          }
  
          // Cập nhật dữ liệu thời tiết
          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  
          // Hiển thị các box thời tiết
          weatherBox.style.display = "";
          weatherDetail.style.display = "";
          weatherBox.classList.add("fadeIn");
          weatherDetail.classList.add("fadeIn");
          container.style.height = "600px";
        })
        .catch((error) => {
          // Xử lý lỗi kết nối API
          console.error("Error fetching weather data:", error);
          container.style.height = "400px";
          weatherBox.style.display = "none";
          weatherDetail.style.display = "none";
          error404.style.display = "block";
          error404.classList.add("fadeIn");
        });
    });
  });
  
