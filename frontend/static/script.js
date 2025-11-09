// frontend/static/script.js
// FINAL VERSION: Includes language switcher fixes, weather API, and all translations.

// ----------------- Translations -----------------
const translations = {
  en: {
    title: "AgriSmart AI", navDetect: "Disease Detection", navSoil: "Soil Analysis", navCrop: "Crop Recommendation", navIrrigation: "Irrigation", navAssistant: "Assistant", 
    heroTitle: "Detect Pomegranate Diseases with AI", heroSubtitle: "Upload a photo or use your camera. Get instant diagnosis, treatment & prevention tips and voice guidance.", 
    uploadBtn: "Upload Image", cameraBtn: "Open Camera", detectBtn: "Detect Disease", resetBtn: "Upload Different Image", 
    resultsCardTitle: "Analysis Results", noImage: "No image yet", treatment: "Treatment", uploadToSee: "Upload an image to get recommendations", prevention: "Prevention", 
    askBtn: "Ask Assistant", playBtn: "Play TTS", 
    soilCardTitle: "Soil Health Analysis", phLabel: "pH Level", phTooltip: "pH < 6 : acidic. 6–7.5 : optimal. > 8 : alkaline.", 
    nLabel: "N (ppm)", pLabel: "P (ppm)", kLabel: "K (ppm)", analyzeBtn: "Analyze Soil", 
    cropCardTitle: "Crop Recommendation", cropCardSubtitle: "Enter environmental data to get a crop recommendation.", recommendBtn: "Recommend Crop", 
    irrigationTitle: "Irrigation Planner", irrigationSubtitle: "Get watering advice based on current conditions.",
    moistureLabel: "Soil Moisture (%)", liveWeatherTitle: "Live Weather", fetchWeatherBtn: "Fetch",
    noWeather: "Click 'Fetch'", rainLabelShort: "Forecasted Rain (next 24h in mm)",
    weatherNote: "Click 'Fetch' to get live rain forecast for your location.",
    adviceBtn: "Get Advice", irrigationAdviceTitle: "Irrigation Advice", noAdvice: "No advice yet",
    assistantTitle: "AI Assistant", assistantWelcome: "Hi 👋. Detect a disease or ask a question about soil, irrigation, or fertilizers.", 
    chatPlaceholder: "Ask about treatment, dosage, or fertilizers...", sendBtn: "Send", 
    footer: "© AgriSmart AI — Built for farmers"
  },
  hi: {
    title: "एग्रीस्मार्ट एआई", navDetect: "रोग पहचान", navSoil: "मृदा विश्लेषण", navCrop: "फसल सिफारिश", navIrrigation: "सिंचाई", navAssistant: "सहायक",
    heroTitle: "एआई से अनार के रोगों का पता लगाएं", heroSubtitle: "एक तस्वीर अपलोड करें या अपने कैमरे का उपयोग करें। तुरंत निदान, उपचार और रोकथाम के सुझाव और वॉयस गाइडेंस प्राप्त करें।",
    uploadBtn: "छवि अपलोड करें", cameraBtn: "कैमरा खोलें", detectBtn: "रोग का पता लगाएं", resetBtn: "दूसरी छवि अपलोड करें",
    resultsCardTitle: "विश्लेषण परिणाम", noImage: "अभी तक कोई छवि नहीं है", treatment: "उपचार", uploadToSee: "सिफारिशें पाने के लिए एक छवि अपलोड करें", prevention: "रोकथाम",
    askBtn: "सहायक से पूछें", playBtn: "चलाएँ",
    soilCardTitle: "मृदा स्वास्थ्य विश्लेषण", phLabel: "पीएच स्तर", phTooltip: "पीएच < 6 : अम्लीय। 6–7.5 : इष्टतम। > 8 : क्षारीय।",
    nLabel: "एन (पीपीएम)", pLabel: "पी (पीपीएम)", kLabel: "के (पीपीएम)", analyzeBtn: "मिट्टी का विश्लेषण करें",
    cropCardTitle: "फसल सिफारिश", cropCardSubtitle: "फसल की सिफारिश पाने के लिए पर्यावरणीय डेटा दर्ज करें।", recommendBtn: "सिफारिश करें",
    irrigationTitle: "सिंचाई योजनाकार", irrigationSubtitle: "मौजूदा स्थितियों के आधार पर पानी देने की सलाह लें।",
    moistureLabel: "मिट्टी की नमी (%)", liveWeatherTitle: "लाइव मौसम", fetchWeatherBtn: "लाएँ",
    noWeather: "'लाएँ' पर क्लिक करें", rainLabelShort: "वर्षा का पूर्वानुमान (अगले 24 घंटे मिमी में)",
    weatherNote: "अपने स्थान के लिए लाइव वर्षा पूर्वानुमान प्राप्त करने के लिए 'लाएँ' पर क्लिक करें।",
    adviceBtn: "सलाह लें", irrigationAdviceTitle: "सिंचाई सलाह", noAdvice: "अभी तक कोई सलाह नहीं",
    assistantTitle: "एआई सहायक", assistantWelcome: "नमस्ते 👋। किसी बीमारी का पता लगाएं या मिट्टी, सिंचाई, या उर्वरकों के बारे में कोई प्रश्न पूछें।",
    chatPlaceholder: "उपचार, खुराक, या उर्वरकों के बारे में पूछें...", sendBtn: "भेजें",
    footer: "© एग्रीस्मार्ट एआई — किसानों के लिए बनाया गया"
  },
  ta: {
    title: "அக்ரிஸ்மார்ட் AI", navDetect: "நோய் கண்டறிதல்", navSoil: "மண் பகுப்பாய்வு", navCrop: "பயிர் பரிந்துரை", navIrrigation: "நீர்ப்பாசனம்", navAssistant: "உதவியாளர்",
    heroTitle: "AI மூலம் மாதுளை நோய்களைக் கண்டறியவும்", heroSubtitle: "புகைப்படத்தைப் பதிவேற்றவும் அல்லது உங்கள் கேமராவைப் பயன்படுத்தவும். உடனடி நோயறிதல், சிகிச்சை மற்றும் தடுப்பு குறிப்புகள் மற்றும் குரல் வழிகாட்டலைப் பெறுங்கள்.",
    uploadBtn: "படத்தை பதிவேற்று", cameraBtn: "கேமராவைத் திற", detectBtn: "நோயைக் கண்டறி", resetBtn: "வேறு படத்தைப் பதிவேற்று",
    resultsCardTitle: "பகுப்பாய்வு முடிவுகள்", noImage: "இன்னும் படம் இல்லை", treatment: "சிகிச்சை", uploadToSee: "பரிந்துரைகளைப் பெற ஒரு படத்தைப் பதிவேற்றவும்", prevention: "தடுப்பு",
    askBtn: "உதவியாளரிடம் கேளுங்கள்", playBtn: "இயக்கு",
    soilCardTitle: "மண் சுகாதார பகுப்பாய்வு", phLabel: "pH நிலை", phTooltip: "pH < 6 : அமிலம். 6–7.5 : உகந்தது. > 8 : காரம்.",
    nLabel: "N (ppm)", pLabel: "P (ppm)", kLabel: "K (ppm)", analyzeBtn: "மண்ணை பகுப்பாய்வு செய்",
    cropCardTitle: "பயிர் பரிந்துரை", cropCardSubtitle: "பயிர் பரிந்துரையைப் பெற சுற்றுச்சூழல் தரவை உள்ளிடவும்.", recommendBtn: "பரிந்துரை செய்",
    irrigationTitle: "நீர்ப்பாசன திட்டமிடுபவர்", irrigationSubtitle: "தற்போதைய நிலைமைகளின் அடிப்படையில் நீர்ப்பாசன ஆலோசனையைப் பெறுங்கள்.",
    moistureLabel: "மண்ணின் ஈரம் (%)", liveWeatherTitle: "நேரடி வானிலை", fetchWeatherBtn: "பெறு",
    noWeather: "'பெறு' என்பதைக் கிளிக் செய்க", rainLabelShort: "மழைப்பொழிவு முன்னறிவிப்பு (அடுத்த 24 மணிநேரம் மிமீ)",
    weatherNote: "உங்கள் இருப்பிடத்திற்கான நேரடி மழை முன்னறிவிப்பைப் பெற 'பெறு' என்பதைக் கிளிக் செய்யவும்.",
    adviceBtn: "ஆலோசனை பெறு", irrigationAdviceTitle: "நீர்ப்பாசன ஆலோசனை", noAdvice: "இன்னும் ஆலோசனை இல்லை",
    assistantTitle: "AI உதவியாளர்", assistantWelcome: "வணக்கம் 👋। ஒரு நோயைக் கண்டறியவும் அல்லது மண், நீர்ப்பாசனம் அல்லது உரங்கள் பற்றி ஒரு கேள்வியைக் கேட்கவும்.",
    chatPlaceholder: "சிகிச்சை, அளவு, அல்லது உரங்கள் பற்றி கேளுங்கள்...", sendBtn: "அனுப்பு",
    footer: "© அக்ரிஸ்மார்ட் AI — விவசாயிகளுக்காக உருவாக்கப்பட்டது"
  },
  te: {
    title: "అగ్రిస్మార్ట్ AI", navDetect: "వ్యాధి నిర్ధారణ", navSoil: "నేల విశ్లేషణ", navCrop: "పంట సిఫార్సు", navIrrigation: "నీటిపారుదల", navAssistant: "సహాయకుడు",
    heroTitle: "AIతో దానిమ్మ వ్యాధులను గుర్తించండి", heroSubtitle: "ఫోటోను అప్‌లోడ్ చేయండి లేదా మీ కెమెరాను ఉపయోగించండి. తక్షణ నిర్ధారణ, చికిత్స & నివారణ చిట్కాలు మరియు వాయిస్ గైడెన్స్ పొందండి.",
    uploadBtn: "చిత్రాన్ని అప్‌లోడ్ చేయండి", cameraBtn: "కెమెరా తెరవండి", detectBtn: "వ్యాధిని గుర్తించండి", resetBtn: "వేరే చిత్రాన్ని అప్‌లోడ్ చేయండి",
    resultsCardTitle: "విశ్లేషణ ఫలితాలు", noImage: "ఇంకా చిత్రం లేదు", treatment: "చికిత్స", uploadToSee: "సిఫార్సులను పొందడానికి చిత్రాన్ని అప్‌లోడ్ చేయండి", prevention: "నివారణ",
    askBtn: "సహాయకుడిని అడగండి", playBtn: "ప్లే చేయి",
    soilCardTitle: "నేల ఆరోగ్య విశ్లేషణ", phLabel: "pH స్థాయి", phTooltip: "pH < 6 : ఆమ్ల. 6–7.5 : సరైనది. > 8 : క్షార.",
    nLabel: "N (ppm)", pLabel: "P (ppm)", kLabel: "K (ppm)", analyzeBtn: "నేలను విశ్లేషించండి",
    cropCardTitle: "పంట సిఫార్సు", cropCardSubtitle: "పంట సిఫార్సు పొందడానికి పర్యావరణ డేటాను నమోదు చేయండి.", recommendBtn: "సిఫార్సు చేయండి",
    irrigationTitle: "నీటిపారుదల ప్లానర్", irrigationSubtitle: "ప్రస్తుత పరిస్థితుల ఆధారంగా నీటి సలహా పొందండి.",
    moistureLabel: "నేల తేమ (%)", liveWeatherTitle: "ప్రత్యక్ష వాతావరణం", fetchWeatherBtn: "పొందండి",
    noWeather: "'పొందండి' క్లిక్ చేయండి", rainLabelShort: "వర్షపాతం సూచన (తదుపరి 24 గంటలు మిమీ)",
    weatherNote: "మీ ప్రదేశం కోసం ప్రత్యక్ష వర్షపాతం సూచనను పొందడానికి 'పొందండి' క్లిక్ చేయండి.",
    adviceBtn: "సలహా పొందండి", irrigationAdviceTitle: "నీటిపారుదల సలహా", noAdvice: "ఇంకా సలహా లేదు",
    assistantTitle: "AI సహాయకుడు", assistantWelcome: "హాయ్ 👋। వ్యాధిని గుర్తించండి లేదా నేల, నీటిపారుదల, లేదా ఎరువుల గురించి ప్రశ్న అడగండి.",
    chatPlaceholder: "చికిత్స, మోతాదు, లేదా ఎరువుల గురించి అడగండి...", sendBtn: "పంపండి",
    footer: "© అగ్రిస్మార్ట్ AI — రైతుల కోసం నిర్మించబడింది"
  },
  kn: {
    title: "ಅಗ್ರಿಸ್ಮಾರ್ಟ್ AI", navDetect: "ರೋಗ ಪತ್ತೆ", navSoil: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ", navCrop: "ಬೆಳೆ ಶಿಫಾರಸು", navIrrigation: "ನೀರಾವರಿ", navAssistant: "ಸಹಾಯಕ",
    heroTitle: "AI ನೊಂದಿಗೆ ದಾಳಿಂಬೆ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ", heroSubtitle: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಕ್ಯಾಮರಾ ಬಳಸಿ. ತ್ವರಿತ ರೋಗನಿರ್ಣಯ, ಚಿಕಿತ್ಸೆ ಮತ್ತು ತಡೆಗಟ್ಟುವಿಕೆ ಸಲಹೆಗಳು ಮತ್ತು ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
    uploadBtn: "ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ", cameraBtn: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ", detectBtn: "ರೋಗ ಪತ್ತೆ ಮಾಡಿ", resetBtn: "ಬೇರೆ ಚಿತ್ರ ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    resultsCardTitle: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು", noImage: "ಇನ್ನೂ ಚಿತ್ರವಿಲ್ಲ", treatment: "ಚಿಕಿತ್ಸೆ", uploadToSee: "ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ", prevention: "ತಡೆಗಟ್ಟುವಿಕೆ",
    askBtn: "ಸಹಾಯಕರನ್ನು ಕೇಳಿ", playBtn: "ಪ್ಲೇ ಮಾಡಿ",
    soilCardTitle: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ", phLabel: "pH ಮಟ್ಟ", phTooltip: "pH < 6 : ಆಮ್ಲೀಯ. 6–7.5 : ಸೂಕ್ತ. > 8 : ಕ್ಷಾರೀಯ.",
    nLabel: "N (ppm)", pLabel: "P (ppm)", kLabel: "K (ppm)", analyzeBtn: "ಮಣ್ಣು ವಿಶ್ಲೇಷಿಸಿ",
    cropCardTitle: "ಬೆಳೆ ಶಿಫಾರಸು", cropCardSubtitle: "ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ಪರಿಸರ ಡೇಟಾವನ್ನು ನಮೂದಿಸಿ.", recommendBtn: "ಶಿಫಾರಸು ಮಾಡಿ",
    irrigationTitle: "ನೀರಾವರಿ ಯೋಜಕ", irrigationSubtitle: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ನೀರುಣಿಸುವ ಸಲಹೆ ಪಡೆಯಿರಿ.",
    moistureLabel: "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)", liveWeatherTitle: "ಲೈವ್ ಹವಾಮಾನ", fetchWeatherBtn: "ಪಡೆಯಿರಿ",
    noWeather: "'ಪಡೆಯಿರಿ' ಕ್ಲಿಕ್ ಮಾಡಿ", rainLabelShort: "ಮಳೆ ಮುನ್ಸೂಚನೆ (ಮುಂದಿನ 24 ಗಂಟೆಗಳು ಮಿಮೀ)",
    weatherNote: "ನಿಮ್ಮ ಸ್ಥಳಕ್ಕಾಗಿ ಲೈವ್ ಮಳೆ ಮುನ್ಸೂಚನೆಯನ್ನು ಪಡೆಯಲು 'ಪಡೆಯಿರಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
    adviceBtn: "ಸಲಹೆ ಪಡೆಯಿರಿ", irrigationAdviceTitle: "ನೀರಾವರಿ ಸಲಹೆ", noAdvice: "ಇನ್ನೂ ಸಲಹೆ ಇಲ್ಲ",
    assistantTitle: "AI ಸಹಾಯಕ", assistantWelcome: "ನಮಸ್ಕಾರ 👋। ರೋಗವನ್ನು ಪತ್ತೆ ಮಾಡಿ ಅಥವಾ ಮಣ್ಣು, ನೀರಾವರಿ, ಅಥವಾ ರಸಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ.",
    chatPlaceholder: "ಚಿಕಿತ್ಸೆ, ಡೋಸೇಜ್, ಅಥವಾ ರಸಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಕೇಳಿ...", sendBtn: "ಕಳುಹಿಸಿ",
    footer: "© ಅಗ್ರಿಸ್ಮಾರ್ಟ್ AI — ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ"
  }
};
// END OF TRANSLATIONS

const langLabel = { en: 'English', hi: 'हिंदी', kn: 'ಕನ್ನಡ', ta: 'தமிழ்', te: 'తెలుగు' };

// !!! ADD YOUR API KEY HERE !!!
const OPENWEATHER_API_KEY = 'YOUR_API_KEY_GOES_HERE';


/**
 * -------------------------------------------------
 * Main Application Module
 * -------------------------------------------------
 */
const App = {
  // --- STATE ---
  state: {
    currentLang: 'en',
    lastBotMessage: translations.en.assistantWelcome,
    lastPredLabel: null,
    isRecording: false,
    mediaRecorder: null,
    audioChunks: [],
    cameraStream: null,
    speechRecognition: null,
    usingWebSpeech: false
  },

  // --- ELEMENTS ---
  el: (id) => document.getElementById(id),

  // --- UTILITIES ---
  util: {
    on: (id, ev, fn) => {
      const e = App.el(id);
      if (e) e.addEventListener(ev, fn);
    },
    showLoading: (btn, text = 'Loading...') => {
      if (!btn) return;
      btn.disabled = true;
      btn.dataset.originalText = btn.innerText;
      btn.innerHTML = `<span class="spinner"></span> ${text}`;
    },
    hideLoading: (btn, defaultText = null) => {
      if (!btn) return;
      btn.disabled = false;
      const original = btn.dataset.originalText;
      const langKey = btn.getAttribute('data-key');
      let text = original || defaultText;
      if (!text && langKey) {
        text = translations[App.state.currentLang][langKey] || 'Submit';
      }
      btn.innerHTML = text || 'Submit';
    },
    syncInputs: (numId, rangeId) => {
      const n = App.el(numId), r = App.el(rangeId);
      if (!n || !r) return;
      n.addEventListener('input', () => r.value = n.value);
      r.addEventListener('input', () => n.value = r.value);
    }
  },

  // --- LANGUAGE (CORRECTED) ---
  lang: {
    save: (lang) => {
      try { localStorage.setItem('agri_lang', lang); } catch(e) {}
    },
    load: () => {
      try { return localStorage.getItem('agri_lang') || 'en'; } catch(e){ return 'en'; }
    },
    set: (lang) => {
      if (!translations[lang]) lang = 'en';
      App.state.currentLang = lang;
      const t = translations[lang];

      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (!key) return;
        const val = t[key];
        if (val === undefined) return;
        if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) {
          el.placeholder = val;
        } else {
          el.innerText = val;
        }
      });

      // --- START OF FIXES ---
      
      // CHANGED ID to match index.html
      const lbl = App.el('currentLangLabel'); 
      if (lbl) lbl.innerText = langLabel[lang] || 'English';

      // ADDED logic to update the 'active' class on the correct button
      document.querySelectorAll('.lang-opt').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      // --- END OF FIXES ---

      App.lang.save(lang);
      App.lang.updateTreatmentPrevention(lang);

      document.body.classList.add('fade-in');
      setTimeout(() => document.body.classList.remove('fade-in'), 220);
    },
    
    updateTreatmentPrevention: async (lang) => {
      if (!App.state.lastPredLabel) return;
      try {
        const label = App.state.lastPredLabel;
        const r = await fetch(`/disease_info?label=${encodeURIComponent(label)}&lang=${encodeURIComponent(lang)}`);
        if (!r.ok) return;
        const j = await r.json();
        const treats = j.treatment || ["—"];
        const prevs = j.prevention || ["—"];
        const tList = App.el('treatmentList');
        const pList = App.el('preventionList');
        if (tList) tList.innerHTML = treats.map(x=>`<li>${x}</li>`).join('');
        if (pList) pList.innerHTML = prevs.map(x=>`<li>${x}</li>`).join('');
      } catch (e) {
        console.error('Failed to update T/P for lang', lang, e);
      }
    }
  },

  // --- NAVIGATION ---
  nav: {
    showPage: (pageId) => {
      document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      
      const sec = App.el(pageId); 
      if (sec) sec.style.display = 'block';
      
      const map = { detect: 'navDetect', soil: 'navSoil', crop: 'navCrop', irrigation: 'navIrrigation', assistant: 'navAssistant' };
      const btn = App.el(map[pageId]); 
      if (btn) btn.classList.add('active');
    }
  },

  // --- MEDIA (Camera, TTS, STT) ---
  media: {
    // --- Camera ---
    stopCameraStream: () => {
      if (!App.state.cameraStream) return;
      App.state.cameraStream.getTracks().forEach(t => t.stop());
      App.state.cameraStream = null;
    },
    restorePreviewArea: () => {
      App.media.stopCameraStream();
      const previewArea = App.el('previewArea');
      if (!previewArea) return;
      previewArea.innerHTML = ''; // Clear video/buttons
      const img = document.createElement('img');
      img.id='previewImg';
      img.src='/static/images/placeholder.png';
      img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
      previewArea.appendChild(img);
    },
    startCamera: async () => {
      const previewArea = App.el('previewArea');
      if (!previewArea) return;
      
      App.media.stopCameraStream();
      previewArea.innerHTML = '';
      
      const video = document.createElement('video');
      video.autoplay = true; video.playsInline = true;
      video.style.width='100%'; video.style.height='100%'; video.style.objectFit='cover';
      
      const captureBtn = document.createElement('button');
      captureBtn.className='btn-primary'; captureBtn.innerText='Capture Photo';
      captureBtn.style.cssText = 'position:absolute; bottom:12px; left:50%; transform:translateX(-50%);';

      const cancelBtn = document.createElement('button');
      cancelBtn.className='btn-link'; cancelBtn.innerText='Cancel';
      cancelBtn.style.cssText = 'position:absolute; top:12px; right:12px;';

      previewArea.appendChild(video);
      previewArea.appendChild(captureBtn);
      previewArea.appendChild(cancelBtn);

      try {
        App.state.cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = App.state.cameraStream;
        cancelBtn.onclick = App.media.restorePreviewArea;
        captureBtn.onclick = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0);
          
          canvas.toBlob(blob => {
            const f = new File([blob], 'capture.jpg', { type:'image/jpeg' });
            const dt = new DataTransfer(); 
            dt.items.add(f);
            
            const input = App.el('imgFile'); if (input) input.files = dt.files;
            App.media.restorePreviewArea(); // Go back to showing the image
            const prev = App.el('previewImg'); if (prev) prev.src = URL.createObjectURL(f);
          }, 'image/jpeg', 0.95);
        };
      } catch(e) {
        console.error('Camera error', e); 
        alert('Camera access failed'); 
        App.media.restorePreviewArea();
      }
    },

    // --- Text-to-Speech (TTS) ---
    speakText: async (text, lang, btn) => {
      if (!text) return;
      if (btn) btn.disabled = true;
      
      try {
        // 1. Try backend TTS
        const r = await fetch('/tts', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ text, lang })
        });
        const j = await r.json();
        if (j && j.audio_url) {
          const a = new Audio(j.audio_url); 
          a.play();
          a.onended = () => { if (btn) btn.disabled = false; };
          return; // Success
        }
      } catch (e) {
        console.warn('Backend TTS failed, trying browser fallback', e);
      }

      // 2. Fallback to browser's SpeechSynthesis
      if ('speechSynthesis' in window) {
        const ut = new SpeechSynthesisUtterance(text);
        const map = { en:'en-US', hi:'hi-IN', ta:'ta-IN', te:'te-IN', kn:'kn-IN' };
        ut.lang = map[lang] || 'en-US';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(ut);
        ut.onend = () => { if (btn) btn.disabled = false; };
      } else {
        if (btn) btn.disabled = false; // No fallback available
      }
    },

    // --- Speech-to-Text (STT) ---
    toggleMic: async () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SR) {
        if (App.state.usingWebSpeech && App.state.speechRecognition) {
          App.state.speechRecognition.stop();
          return;
        }
        App.media.startWebSpeech();
      } else {
        if (App.state.isRecording) {
          App.media.stopMediaRecorder();
        } else {
          App.media.startMediaRecorder();
        }
      }
    },
    startWebSpeech: () => {
      if (!App.state.speechRecognition) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return; 
        App.state.speechRecognition = new SR();
        
        App.state.speechRecognition.onstart = () => {
          App.state.usingWebSpeech = true;
          const micBtn = App.el('micBtn'); if (micBtn) micBtn.innerText = '🛑';
        };
        App.state.speechRecognition.onend = () => {
          App.state.usingWebSpeech = false;
          const micBtn = App.el('micBtn'); if (micBtn) micBtn.innerText = '🎙️';
        };
        App.state.speechRecognition.onerror = (e) => {
          console.warn('Web Speech API error', e);
          App.state.usingWebSpeech = false;
        };
        App.state.speechRecognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          if (transcript) {
            const u = App.el('userQ');
            if (u) { u.value = transcript; App.api.sendChat(); }
          }
        };
      }
      
      const map = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN' };
      App.state.speechRecognition.lang = map[App.state.currentLang] || 'en-IN';
      App.state.speechRecognition.start();
    },
    startMediaRecorder: async () => {
      const micBtn = App.el('micBtn');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        App.state.audioChunks = [];
        App.state.mediaRecorder = new MediaRecorder(stream);
        App.state.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size) App.state.audioChunks.push(e.data);
        };
        App.state.mediaRecorder.onstop = () => {
          const blob = new Blob(App.state.audioChunks, { type: 'audio/webm' });
          App.media.sendAudioToSTT(blob);
          stream.getTracks().forEach(t => t.stop());
        };
        App.state.mediaRecorder.start();
        App.state.isRecording = true;
        if (micBtn) micBtn.innerText = '🛑';
      } catch (e) {
        console.error('Mic (MediaRecorder) error', e);
        alert('Microphone access unavailable or denied.');
      }
    },
    stopMediaRecorder: () => {
      if (App.state.mediaRecorder && App.state.mediaRecorder.state !== 'inactive') {
        App.state.mediaRecorder.stop();
      }
      App.state.isRecording = false;
      const micBtn = App.el('micBtn'); if (micBtn) micBtn.innerText = '🎙️';
    },
    sendAudioToSTT: async (blob) => {
      const fd = new FormData();
      fd.append('file', blob, 'recording.webm');
      try {
        const res = await fetch(`/stt?lang=${encodeURIComponent(App.state.currentLang)}`, {
          method: 'POST',
          body: fd
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const j = await res.json();
        const text = j && (j.text || j.transcript);
        if (text) {
          const u = App.el('userQ');
          if (u) { u.value = text; App.api.sendChat(); }
        } else {
          alert('Speech-to-text could not understand audio.');
        }
      } catch (e) {
        console.error('STT upload error', e);
        alert('Speech-to-text failed.');
      }
    }
  },

  // --- API ---
  api: {
    predictUpload: async () => {
      const input = App.el('imgFile');
      if (!input || !input.files || input.files.length === 0) {
        return alert('Choose an image first');
      }
      const fd = new FormData();
      fd.append('file', input.files[0]);
      
      const btn = App.el('btnUpload');
      App.util.showLoading(btn, 'Detecting...');
      
      try {
        const lang = App.state.currentLang;
        const r = await fetch(`/predict?lang=${encodeURIComponent(lang)}`, {
          method:'POST',
          body: fd
        });
        const j = await r.json();
        App.ui.showResult(j);
      } catch (e) {
        console.error('Predict error', e);
        alert('Prediction failed');
      } finally {
        App.util.hideLoading(btn);
      }
    },

    analyzeSoil: async () => {
      const soil = {
        N: Number(App.el('soil_N')?.value || 0),
        P: Number(App.el('soil_P')?.value || 0),
        K: Number(App.el('soil_K')?.value || 0),
        pH: Number(App.el('soil_pH')?.value || 7)
      };
      const btn = App.el('soilAnalyze');
      App.util.showLoading(btn, 'Analyzing...');
      try {
        const r = await fetch('/soil/recommend', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ soil })
        });
        const j = await r.json();
        const recs = App.el('soilRecs');
        if (recs) recs.innerHTML = (j.recommendations || []).map(x => `<li>${x}</li>`).join('');
        const status = App.el('soilResult')?.querySelector('.status');
        if (status) status.innerText = 'Recommendations';
      } catch (e) {
        console.error('Soil error', e);
        alert('Soil analysis failed');
      } finally {
        App.util.hideLoading(btn);
      }
    },

    recommendCrop: async () => {
      const payload = {
        N: Number(App.el('crop_N')?.value||0), P: Number(App.el('crop_P')?.value||0), K: Number(App.el('crop_K')?.value||0),
        ph: Number(App.el('crop_pH')?.value||7), temp: Number(App.el('crop_temp')?.value||25),
        humidity: Number(App.el('crop_humidity')?.value||50), rainfall: Number(App.el('crop_rainfall')?.value||0)
      };
      const btn = App.el('cropAnalyzeBtn');
      App.util.showLoading(btn, 'Analyzing...');
      try {
        const r = await fetch('/crop/recommend', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        const j = await r.json();
        const name = j.recommendation || 'Unknown';
        const label = App.el('cropResultLabel');
        if (label) label.innerText = name;
        const img = App.el('cropResultImg');
        if (img) img.src = `/static/images/crops/${name.toLowerCase().replace(/\s+/g,'') || 'placeholder'}.png`;
        App.el('cropResult')?.classList.add('has-result');
      } catch (e) {
        console.error('Crop API', e);
        App.el('cropResultLabel').innerText = 'Analysis Failed';
        App.el('cropResult')?.classList.remove('has-result');
      } finally {
        App.util.hideLoading(btn);
      }
    },

    irrigationAdvice: async () => {
      const payload = {
        rainfall_mm: Number(App.el('recentRain')?.value||0),
        soil_moisture_pct: Number(App.el('soilMoisture')?.value||0)
      };
      const btn = App.el('irrigateBtn');
      App.util.showLoading(btn, 'Getting advice...');
      try {
        const r = await fetch('/irrigation/advice', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        const j = await r.json();
        const adviceEl = App.el('irrigationAdvice');
        if (adviceEl) adviceEl.innerText = Array.isArray(j.advice) ? j.advice.join('\n') : (j.advice || 'No advice available');
      } catch (e) {
        console.error('Irrigation error', e);
        if (App.el('irrigationAdvice')) App.el('irrigationAdvice').innerText = 'No advice available';
      } finally {
        App.util.hideLoading(btn);
      }
    },

    // === NEW WEATHER FUNCTION ===
    // === UPDATED WEATHER FUNCTION ===
    fetchWeather: async () => {
      // API key check is no longer needed, as it's handled by the proxy
      
      const btn = App.el('fetchWeatherBtn');
      App.util.showLoading(btn, 'Fetching...');

      try {
        // 1. Get User's Location
        const position = await new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
          }
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lon } = position.coords;

        // 2. Fetch Weather Data (using your new proxy endpoint)
        const r = await fetch(`/weather/forecast?lat=${lat}&lon=${lon}&mode=onecall`);
        if (!r.ok) throw new Error('Weather API proxy error');
        const data = await r.json();

        // 3. Process the "One Call" API Data
        const currentWeather = data.current;
        if (!currentWeather) throw new Error("Invalid weather data received.");

        // Calculate total rain for the next 24 hours from the 'hourly' array
        let totalRain = 0;
        if (data.hourly) {
          // Sum the rain for the next 24 hours (hourly[0] is the current hour)
          for (let i = 0; i < 24 && i < data.hourly.length; i++) {
            if (data.hourly[i].rain && data.hourly[i].rain['1h']) {
              totalRain += data.hourly[i].rain['1h'];
            }
          }
        }
        
        // 4. Update the UI
        const weatherDiv = App.el('weatherDisplay');
        if (weatherDiv) weatherDiv.style.display = 'flex';
        
        // Use 'currentWeather.temp' (One Call format)
        if(App.el('weatherTemp')) App.el('weatherTemp').innerText = `${Math.round(currentWeather.temp)}°C`;
        if(App.el('weatherDesc')) App.el('weatherDesc').innerText = currentWeather.weather[0].description;
        
        // Update icon
        const iconCode = currentWeather.weather[0].icon;
        if(App.el('weatherIcon')) App.el('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        // Update the rain input field!
        if(App.el('recentRain')) App.el('recentRain').value = totalRain.toFixed(1);

      } catch (e) {
        console.error('Weather fetch error', e);
        alert(`Could not fetch weather: ${e.message}`);
      } finally {
        App.util.hideLoading(btn);
      }
    },
    // === END OF UPDATED FUNCTION ===
    // === END OF NEW FUNCTION ===

    sendChat: async () => {
      const qInput = App.el('userQ');
      const q = qInput?.value?.trim();
      if (!q) return;

      App.ui.addChatMessage(q, 'user');
      qInput.value = '';
      
      try {
        const r = await fetch('/chat', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            question: q,
            lang: App.state.currentLang,
            disease: App.el('rLabel')?.innerText || 'Healthy'
          })
        });
        if (!r.ok) throw new Error(`Server error ${r.status}`);
        const j = await r.json();
        App.ui.addChatMessage(j.answer || 'No answer', 'bot');
        App.state.lastBotMessage = j.answer || App.state.lastBotMessage;
      } catch (e) {
        console.error('Chat error', e);
        App.ui.addChatMessage('Sorry, I am having trouble connecting. Please try again.', 'bot', true);
      }
    }
  },

  // --- UI ---
  ui: {
    showResult: (j) => {
      if (!j) return;
      const lang = App.state.currentLang;
      
      const labelEl = App.el('rLabel');
      if (labelEl) labelEl.innerText = j.label || translations[lang].noImage || 'Unknown';
      
      App.state.lastPredLabel = (j.label || '').toString(); // Store for lang updates
      
      const pct = Math.round((j.confidence || 0) * 100);
      const confEl = App.el('rConf');
      if (confEl) confEl.innerText = pct + '%';
      
      const barEl = App.el('confBar');
      if (barEl) barEl.style.width = pct + '%';
      
      const treats = j.treatment || [];
      const prevs = j.prevention || [];
      
      const tList = App.el('treatmentList');
      if (tList) tList.innerHTML = (treats.length ? treats : ['No specific treatment']).map(x => `<li>${x}</li>`).join('');
      
      const pList = App.el('preventionList');
      if (pList) pList.innerHTML = (prevs.length ? prevs : ['—']).map(x => `<li>${x}</li>`).join('');
      
      App.state.lastBotMessage = `Disease: ${j.label || 'Unknown'} (${pct}%)`;
    },
    
    addChatMessage: (text, role, isError = false) => {
      const chatWin = App.el('chatWindow');
      if (!chatWin) return;
      const n = document.createElement('div');
      n.className = `chat-msg ${role} pop`;
      if (isError) n.classList.add('error');
      n.innerText = text;
      chatWin.appendChild(n);
      chatWin.scrollTop = chatWin.scrollHeight;
    },
    
    resetDetect: () => {
      const lang = App.state.currentLang;
      if (App.el('imgFile')) App.el('imgFile').value = '';
      
      const prev = App.el('previewImg');
      if (prev) prev.src = '/static/images/placeholder.png';
      
      if (App.el('rLabel')) App.el('rLabel').innerText = translations[lang].noImage || 'No image yet';
      if (App.el('rConf')) App.el('rConf').innerText = '0%';
      if (App.el('confBar')) App.el('confBar').style.width = '0%';
      
      const uploadText = translations[lang].uploadToSee || 'Upload an image to get recommendations';
      if (App.el('treatmentList')) App.el('treatmentList').innerHTML = `<li>${uploadText}</li>`;
      if (App.el('preventionList')) App.el('preventionList').innerHTML = '<li>—</li>';
      
      App.media.restorePreviewArea();
      App.state.lastPredLabel = null;
    }
  },

  // --- INITIALIZATION (CORRECTED) ---
  init: () => {
    // Set initial language
    const lang = App.lang.load();
    App.lang.set(lang);

    // Set initial page
    App.nav.showPage('detect');

    // --- Wire up all event listeners ---
    const on = App.util.on;

    // Navigation
    on('navDetect', 'click', () => App.nav.showPage('detect'));
    on('navSoil', 'click', () => App.nav.showPage('soil'));
    on('navCrop', 'click', () => App.nav.showPage('crop'));
    on('navIrrigation', 'click', () => App.nav.showPage('irrigation'));
    on('navAssistant', 'click', () => App.nav.showPage('assistant'));

    // --- START OF FIXES for Language Pickers ---
    // CHANGED ID from 'langBtn' to 'langToggle'
    on('langToggle', 'click', (e) => {
        e.stopPropagation();
        // CHANGED logic to toggle 'active' class on the parent, matching style.css
        App.el('langDropdown')?.classList.toggle('active');
    });

    // CHANGED class from '.lang-option' to '.lang-opt'
    document.querySelectorAll('.lang-opt').forEach(el => {
      el.addEventListener('click', () => {
        App.lang.set(el.getAttribute('data-lang'));
        // CHANGED logic to remove 'active' class from parent
        App.el('langDropdown')?.classList.remove('active');
      });
    });

    // UPDATED click-outside logic to work with the new structure
    document.addEventListener('click', (e) => {
        const menu = App.el('langDropdown');
        // If the click is outside the dropdown, close it
        if (menu && !menu.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    // --- END OF FIXES for Language Pickers ---

    // STT/TTS
    on('micBtn', 'click', App.media.toggleMic);
    on('playBtn', 'click', (e) => App.media.speakText(App.state.lastBotMessage, App.state.currentLang, e.currentTarget));
    on('btnSpeak', 'click', (e) => { // This is the "Play" button on the results card
      const label = App.el('rLabel')?.innerText || 'Unknown';
      const conf = App.el('rConf')?.innerText || '0%';
      App.media.speakText(`Disease detected: ${label} with ${conf} confidence.`, App.state.currentLang, e.currentTarget);
    });

    // Detect Page
    on('openCamera', 'click', App.media.startCamera);
    on('btnUpload', 'click', App.api.predictUpload);
    on('btnReset', 'click', App.ui.resetDetect);
    on('btnAsk', 'click', () => { // "Ask Assistant" button
      const disease = App.el('rLabel')?.innerText || '';
      const noImg = translations[App.state.currentLang].noImage || 'No image yet';
      const msg = disease && disease !== noImg
        ? `Tell me more about ${disease}`
        : 'What are the common diseases for pomegranates?';
      
      const u = App.el('userQ'); if (u) u.value = msg;
      App.nav.showPage('assistant');
      App.el('userQ')?.focus();
    });
    
    // File input change
    const imgFile = App.el('imgFile');
    if (imgFile) {
      imgFile.addEventListener('change', e => {
        const f = e.target.files[0]; if (!f) return;
        const prev = App.el('previewImg');
        if (prev) {
            App.media.restorePreviewArea(); // Ensure video is gone
            if(App.el('previewImg')) App.el('previewImg').src = URL.createObjectURL(f);
        }
      });
    }
    // Label-to-file-input trigger
    document.querySelectorAll('label[for="imgFile"]').forEach(n =>
      n.addEventListener('click', () => App.el('imgFile')?.click())
    );

    // Other Pages
    on('soilAnalyze', 'click', App.api.analyzeSoil);
    on('irrigateBtn', 'click', App.api.irrigationAdvice);
    on('cropAnalyzeBtn', 'click', App.api.recommendCrop);
    on('fetchWeatherBtn', 'click', App.api.fetchWeather); // <-- ADDED WEATHER BUTTON

    // Chat
    on('sendQ', 'click', App.api.sendChat);
    on('userQ', 'keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            App.api.sendChat();
        }
    });

    // Slider sync
    const sync = App.util.syncInputs;
    sync('soil_N','slider_N'); sync('soil_P','slider_P'); sync('soil_K','slider_K');
    sync('crop_N','slider_crop_N'); sync('crop_P','slider_crop_P'); sync('crop_K','slider_crop_K');
    sync('crop_pH','slider_crop_pH'); sync('crop_temp','slider_crop_temp');
    sync('crop_humidity','slider_crop_humidity'); sync('crop_rainfall','slider_crop_rainfall');
  }
};

// --- START THE APP ---
document.addEventListener('DOMContentLoaded', App.init);