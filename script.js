const latexContent = [];

function search() {
  const api_key = document.getElementById('api_key').value
  const keywords = document.getElementById('chat-input').value
  const messages = [
{ role: 'system', content: 'You are a LaTeX expert.' },
{ role: 'user', content: keywords + 'change this to LaTeX form. Only print the LaTeX equaiton.' },
]
  const config = {
    headers: {
      Authorization: `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    },
  }
  const data = {
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
    n: 1,
    messages: messages,
  }

  axios
    .post('https://api.openai.com/v1/chat/completions', data, config)
    .then(function (response) {
      let resultDiv = document.getElementById('chat-window')
      resultDiv.innerHTML = ''
      resultDiv.innerHTML += `
        <div class="message-container user-message">
          <p>${keywords}</p>
        </div>
      `
        response.data.choices.forEach(function (choice, index) {
          
          //$와 $ 사이에 있는 값만 latexContent 에 저장
          const regex = /\$([^$]+)\$/g;
          const matches = choice.message.content.match(regex);


          for (let i = 0; i < matches.length; i++) {
            // Extract the value between the dollar symbols
            const value = matches[i].replace(/\$/g, "");
            latexContent.push(value);
          }

          if (latexContent) {
            resultDiv.innerHTML += 
            `<div class="message-container system-message" id="latexresult">
              <p>
              $$${latexContent}$$
              </p>
              <button id="copy-btn" onclick="copyToClipboard()">Copy</button>
            </div>`
          } else {
            resultDiv.innerHTML += 
            `<div class="message-container system-message" id="latexresult">
              We cannot provide LaTeX format for following equation. Please enter again.
            </div>`
          }
          //디버깅용

          // resultDiv.innerHTML += 
          // `<div class="message-container system-message" id="latexresult">
          //   ${choice.message.content.split('\n').join('<br/>')}
          //   <button id="copy-btn" onclick="copyToClipboard()">Copy</button>
          // </div>`
        })
      resultDiv.scrollTop = resultDiv.scrollHeight;
      MathJax.typesetPromise([resultDiv]).then(() => {
        // 처리된 결과를 출력
        document.body.appendChild(resultDiv);
      });
      // 다운로드 버튼 생성
      const downloadButton = document.createElement("button");
      downloadButton.innerText = "Download";
      downloadButton.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        const element = document.getElementById("latexresult");
        html2canvas(element).then((canvas) => {
          const dataURL = canvas.toDataURL("image/png");
          download(dataURL, "latex.png");
        });
      });
      resultDiv.appendChild(downloadButton);
    })
    .catch(function (error) {
      console.error(error)
    })
}

function copyToClipboard() {
  const resultDiv = document.getElementById('latexresult');
  const range = document.createRange();
  range.selectNode(resultDiv);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  
  const message = 'Copied to clipboard!';
  const successMessage = message.replace('copy', '');
  alert(successMessage);
}

function download(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

