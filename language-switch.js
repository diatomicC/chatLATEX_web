 // 언어별 JSON 파일 (간략화)
 const lang = {
    ko: {
        comment: "ChatGPT를 통해 원하는 공식을 LATEX와 수식이미지로 변환하는 사이트입니다. \n 바꾸기를 원하는 공식을 수식입력창에 넣어주세요. \n 공식은 일반 수식 또는 한국어로 입력이 가능합니다.\n EX) 근의 공식, 라플라스 변환 \n\n 개인이 소유하고 있는 ChatGPT API 키가 있어야 하는 서비스입니다.\n API 키를 발급 받으시려면 'API 발급 받기'로 버튼을 눌러주세요.(회원가입 필요)",
        api_how: "API 키를 받는 법을 모르신다면 클릭!",
        api_key_button: "API 발급 받기",
        api_key: "API 키: ",
        equation:"수식입력:"
    },
    en: {
        comment: "This is a site that converts desired formulas into LATEX and formula images through ChatGPT. \n Enter the formula you want to replace in the formula bar. \n Formulas can be entered in general formulas or in English.\n EX) Root formula, Laplace transform \n\n This service requires a ChatGPT API key owned by an individual.\n To obtain an API key, click 'API Please click the button 'Get an API Key'. (Membership registration required)",
        api_how: "Not sure how to get API key? Click!",
        api_key_button: "Get an API Key",
        api_key: "API Key: ",
        equation:"Enter a formula:"
    }
  }
  
  // ** 현재 브라우저의 언어 가져오기 **
  function getLanguage() {
    return navigator.language || navigator.userLanguage;
  }
  
  // 언어별 적용
  function init(localeStr) {
    document.getElementById("locale").textContent = localeStr
  }
  
  // 초기 작업
  const currentLang = getLanguage()
  init(currentLang)
  render(currentLang.substr(0, 2))
  
  // 언어별 렌더링
  function render(locale) {
    const $lang = document.querySelectorAll("[data-lang]")
    $lang.forEach(el => {
        const code = el.dataset.lang
        el.textContent = lang[locale][code]
    })
  }
  
  // 버튼 이벤트
  document.getElementById("btn-en").addEventListener("click", e => {
    render("en")
  })
  document.getElementById("btn-ko").addEventListener("click", e => {
    render("ko")
  })