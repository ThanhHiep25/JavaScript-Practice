<h2>Convert text to speech</h2>
        <h3>Demo project: https://text-to-speech-linezz.netlify.app</h3>
        <h3>Mô tả</h3>
        <p>Input : <i>lưu ý nhập và chọn ngôn ngữ để Convert to speech</i></p>
        <img src= "https://github.com/user-attachments/assets/a0666ede-d86c-4cc8-89e9-c86136c59edc"/> 
        <br>
        <br>    
        <p>Kết quả trả về </p>
        <img src="https://github.com/user-attachments/assets/a86bc012-5966-4f31-9d75-43c82b266c9c"/>
        <br>
        <br>
        

 <p>Lấy thông tin text, voice , button</p>

         const textarea = document.querySelector("textarea"),
         voiceList = document.querySelector("select"),
         speechBtn = document.querySelector("button");

          let synth = speechSynthesis,
            isSpeaking = true;
        
<p>Thực hiện button</p>

        speechBtn.addEventListener("click", (e) => {
            e.preventDefault();
        
            if (textarea.value !== "") {
              //Check if not
              if (!synth.speaking) {
                textToSpeech(textarea.value);
              }
        
              if (textarea.value.length > 80) {
                setInterval(() => {
                  if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                  } else {
                  }
                }, 500);
        
                if (isSpeaking) {
                  synth.resume();
                  isSpeaking = true;
                  speechBtn.innerText = "Pause Speech ...";
                } else {
                  synth.pause();
                  isSpeaking = true;
                  speechBtn.innerText = "Resume Speech";
                }
              } else {
                speechBtn.innerText = "Convert To Speech";
              }
            }
          });


