// frontend/static/script.js
// Robust UI — translations, navigation, STT/TTS (with fallbacks), camera, crop/soil/irrigation.
// Safe against missing DOM nodes.

const $ = (id) => document.getElementById(id);
const on = (id, ev, fn) => { const e = $(id); if (e) e.addEventListener(ev, fn); };

// ----------------- Translations -----------------
const translations = {
  en: {
    title: "AgriSmart AI",
    navDetect: "Disease Detection",
    navSoil: "Soil Analysis",
    navCrop: "Crop Recommendation",
    navIrrigation: "Irrigation",
    navAssistant: "Assistant",
    heroTitle: "Detect Pomegranate Diseases with AI",
    heroSubtitle: "Upload a photo or use your camera. Get instant diagnosis, treatment & prevention tips and voice guidance.",
    uploadBtn: "Upload Image",
    cameraBtn: "Open Camera",
    detectBtn: "Detect Disease",
    resetBtn: "Upload Different Image",
    resultsCardTitle: "Analysis Results",
    noImage: "No image yet",
    treatment: "Treatment",
    uploadToSee: "Upload an image to get recommendations",
    prevention: "Prevention",
    askBtn: "Ask Assistant",
    playBtn: "Play TTS",
    soilCardTitle: "Soil Health Analysis",
    phLabel: "pH Level",
    phTooltip: "pH < 6 : acidic. 6–7.5 : optimal. > 8 : alkaline.",
    nLabel: "N (ppm)",
    pLabel: "P (ppm)",
    kLabel: "K (ppm)",
    analyzeBtn: "Analyze Soil",
    cropCardTitle: "Crop Recommendation",
    cropCardSubtitle: "Enter environmental data to get a crop recommendation.",
    recommendBtn: "Recommend Crop",
    irrigationTitle: "Irrigation Planner",
    adviceBtn: "Get Advice",
    assistantTitle: "AI Assistant",
    assistantWelcome: "Hi 👋. Detect a disease or ask a question about soil, irrigation, or fertilizers.",
    chatPlaceholder: "Ask about treatment, dosage, or fertilizers...",
    sendBtn: "Send",
    footer: "© AgriSmart AI — Built for farmers"
  },
  hi: {
    title: "एग्रीस्मार्ट एआई",
    navDetect: "रोग पहचान",
    navSoil: "मृदा विश्लेषण",
    navCrop: "फसल सिफारिश",
    navIrrigation: "सिंचाई",
    navAssistant: "सहायक",
    heroTitle: "एआई से अनार के रोगों का पता लगाएं",
    heroSubtitle: "एक तस्वीर अपलोड करें या अपने कैमरे का उपयोग करें। तुरंत निदान, उपचार और रोकथाम के उपाय प्राप्त करें।",
    uploadBtn: "तस्वीर अपलोड करें",
    cameraBtn: "कैमरा खोलें",
    detectBtn: "रोग का पता लगाएं",
    resetBtn: "दूसरी तस्वीर अपलोड करें",
    resultsCardTitle: "विश्लेषण परिणाम",
    noImage: "अभी तक कोई तस्वीर नहीं है",
    treatment: "उपचार",
    uploadToSee: "सिफारिशें प्राप्त करने के लिए एक तस्वीर अपलोड करें",
    prevention: "रोकथाम",
    askBtn: "सहायक से पूछें",
    playBtn: "चलाएं",
    soilCardTitle: "मृदा स्वास्थ्य विश्लेषण",
    phLabel: "pH स्तर",
    phTooltip: "pH < 6: अम्लीय. 6–7.5: इष्टतम. > 8: क्षारीय.",
    nLabel: "N (ppm)",
    pLabel: "P (ppm)",
    kLabel: "K (ppm)",
    analyzeBtn: "मृदा का विश्लेषण करें",
    cropCardTitle: "फसल सिफारिश",
    cropCardSubtitle: "फसल की सिफारिश प्राप्त करने के लिए पर्यावरणीय डेटा दर्ज करें।",
    recommendBtn: "फसल की सिफारिश करें",
    irrigationTitle: "सिंचाई योजनाकार",
    adviceBtn: "सलाह लें",
    assistantTitle: "एआई सहायक",
    assistantWelcome: "नमस्ते 👋. किसी बीमारी का पता लगाएं या मिट्टी, सिंचाई, या उर्वरकों के बारे में प्रश्न पूछें।",
    chatPlaceholder: "उपचार, खुराक, या उर्वरकों के बारे में पूछें...",
    sendBtn: "भेजें",
    footer: "© एग्रीस्मार्ट एआई — किसानों के लिए बनाया गया"
  },
  ta: {
    title: "அக்ரிஸ்மார்ட் AI",
    navDetect: "நோய் கண்டறிதல்",
    navSoil: "மண் பகுப்பாய்வு",
    navCrop: "பயிர் பரிந்துரை",
    navIrrigation: "நீர்ப்பாசனம்",
    navAssistant: "உதவியாளர்",
    heroTitle: "AI மூலம் மாதுளை நோய்களை கண்டறியவும்",
    heroSubtitle: "புகைப்படத்தைப் பதிவேற்றவும் அல்லது உங்கள் கேமராவைப் பயன்படுத்தவும்.",
    uploadBtn: "படத்தை பதிவேற்று",
    cameraBtn: "கேமராவைத் திற",
    detectBtn: "நோயைக் கண்டறி",
    resetBtn: "மறு படம் பதிவேற்று",
    resultsCardTitle: "பகுப்பாய்வு முடிவுகள்",
    noImage: "இன்னும் படம் இல்லை",
    treatment: "சிகிச்சை",
    uploadToSee: "பரிந்துரைகள் பெற படத்தைப் பதிவேற்றவும்",
    prevention: "தடுப்பு",
    askBtn: "உதவியாளரிடம் கேள்",
    playBtn: "இயக்கு",
    soilCardTitle: "மண் சுகாதார பகுப்பாய்வு",
    phLabel: "pH நிலை",
    phTooltip: "pH < 6: அமிலம். 6–7.5: உகந்தது. > 8: காரம்.",
    nLabel: "N (ppm)",
    pLabel: "P (ppm)",
    kLabel: "K (ppm)",
    analyzeBtn: "மண் பகுப்பாய்வு",
    cropCardTitle: "பயிர் பரிந்துரை",
    cropCardSubtitle: "பயிர் பரிந்துரையைப் பெற சுற்றுச்சூழல் தரவை உள்ளிடவும்.",
    recommendBtn: "பயிரைப் பரிந்துரை",
    irrigationTitle: "நீர்ப்பாசன திட்டமிடுபவர்",
    adviceBtn: "ஆலோசனை பெறு",
    assistantTitle: "AI உதவியாளர்",
    assistantWelcome: "வணக்கம் 👋. மண், நீர்ப்பாசனம், அல்லது உரங்கள் பற்றி கேளுங்கள்.",
    chatPlaceholder: "சிகிச்சை, அளவு, அல்லது உரங்கள் பற்றி கேளுங்கள்...",
    sendBtn: "அனுப்பு",
    footer: "© அக்ரிஸ்மார்ட் AI — விவசாயிகளுக்காக உருவாக்கப்பட்டது"
  },
  te: {
    title: "అగ్రిస్మార్ట్ AI",
    navDetect: "వ్యాధి గుర్తింపు",
    navSoil: "మట్టి విశ్లేషణ",
    navCrop: "పంట సిఫార్సు",
    navIrrigation: "నీటిపారుదల",
    navAssistant: "సహాయకుడు",
    heroTitle: "AI తో దానిమ్మ వ్యాధులను గుర్తించండి",
    heroSubtitle: "ఫోటో అప్‌లోడ్ చేయండి లేదా కెమెరా వాడండి. వెంటనే నిర్ధారణ, చికిత్స, నివారణ చిట్కాలు పొందండి.",
    uploadBtn: "ఫోటో అప్‌లోడ్",
    cameraBtn: "కెమెరా తెరవండి",
    detectBtn: "వ్యాధిని గుర్తించు",
    resetBtn: "రీసెట్",
    resultsCardTitle: "విశ్లేషణ ఫలితాలు",
    noImage: "ఇంకా ఫోటో లేదు",
    treatment: "చికిత్స",
    uploadToSee: "సిఫార్సుల కోసం ఫోటో అప్‌లోడ్ చేయండి",
    prevention: "నివారణ",
    askBtn: "సహాయకుడిని అడగండి",
    playBtn: "వినండి",
    soilCardTitle: "మట్టి ఆరోగ్య విశ్లేషణ",
    phLabel: "pH స్థాయి",
    phTooltip: "pH < 6: ఆమ్లం. 6–7.5: సరైనది. > 8: క్షారం.",
    nLabel: "N (ppm)",
    pLabel: "P (ppm)",
    kLabel: "K (ppm)",
    analyzeBtn: "మట్టిని విశ్లేషించండి",
    cropCardTitle: "పంట సిఫార్సు",
    cropCardSubtitle: "సిఫార్సు పొందడానికి పర్యావరణ డేటా నమోదు చేయండి.",
    recommendBtn: "పంటను సిఫార్సు చేయి",
    irrigationTitle: "నీటిపారుదల ప్లానర్",
    adviceBtn: "సలహా పొందండి",
    assistantTitle: "AI సహాయకుడు",
    assistantWelcome: "నమస్కారం 👋. మట్టి, నీటిపారుదల, లేదా ఎరువుల గురించి ప్రశ్న అడగండి.",
    chatPlaceholder: "చికిత్స, మోతాదు, లేదా ఎరువుల గురించి అడగండి...",
    sendBtn: "పంపండి",
    footer: "© అగ్రిస్మార్ట్ AI — రైతుల కోసం తయారు చేయబడింది"
  },
  kn: {
    title: "ಅಗ್ರಿಸ್ಮಾರ್ಟ್ AI",
    navDetect: "ರೋಗ ಪತ್ತೆ",
    navSoil: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ",
    navCrop: "ಬೆಳೆ ಶಿಫಾರಸು",
    navIrrigation: "ನೀರಾವರಿ",
    navAssistant: "ಸಹಾಯಕ",
    heroTitle: "AI ಮೂಲಕ ದಾಳಿಂಬೆ ರೋಗಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ",
    heroSubtitle: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾ ಬಳಸಿ. ತಕ್ಷಣದ ನಿರ್ಣಯ, ಚಿಕಿತ್ಸೆ, ತಡೆ ಸಲಹೆಗಳು ಪಡೆಯಿರಿ.",
    uploadBtn: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
    cameraBtn: "ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ",
    detectBtn: "ರೋಗ ಪತ್ತೆ ಮಾಡಿ",
    resetBtn: "ರೀಸೆಟ್",
    resultsCardTitle: "ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು",
    noImage: "ಇನ್ನೂ ಫೋಟೋ ಇಲ್ಲ",
    treatment: "ಚಿಕಿತ್ಸೆ",
    uploadToSee: "ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಲು ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    prevention: "ತಡೆಗಟ್ಟುವಿಕೆ",
    askBtn: "ಸಹಾಯಕನನ್ನು ಕೇಳಿ",
    playBtn: "ಆಲಿಸಿ",
    soilCardTitle: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ",
    phLabel: "pH ಮಟ್ಟ",
    phTooltip: "pH < 6: ಆಮ್ಲೀಯ. 6–7.5: ಸೂಕ್ತ. > 8: ಕ್ಷಾರೀಯ.",
    nLabel: "N (ppm)",
    pLabel: "P (ppm)",
    kLabel: "K (ppm)",
    analyzeBtn: "ಮಣ್ಣನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    cropCardTitle: "ಬೆಳೆ ಶಿಫಾರಸು",
    cropCardSubtitle: "ಬೆಳೆ ಶಿಫಾರಸು ಪಡೆಯಲು ಪರಿಸರ ಡೇಟಾ ನಮೂದಿಸಿ.",
    recommendBtn: "ಬೆಳೆ ಶಿಫಾರಸು ಮಾಡಿ",
    irrigationTitle: "ನೀರಾವರಿ ಯೋಜಕ",
    adviceBtn: "ಸಲಹೆ ಪಡೆಯಿರಿ",
    assistantTitle: "AI ಸಹಾಯಕ",
    assistantWelcome: "ನಮಸ್ಕಾರ 👋. ಮಣ್ಣು, ನೀರಾವರಿ, ಅಥವಾ ರಸಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ.",
    chatPlaceholder: "ಚಿಕಿತ್ಸೆ, ಡೋಸೇಜ್, ಅಥವಾ ರಸಗೊಬ್ಬರಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    sendBtn: "ಕಳುಹಿಸಿ",
    footer: "© ಅಗ್ರಿಸ್ಮಾರ್ಟ್ AI — ರೈತರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ"
  }
};

// pretty label map (optional button label)
const langLabel = { en: 'English', hi: 'हिंदी', kn: 'ಕನ್ನಡ', ta: 'தமிழ்', te: 'తెలుగు' };

function saveLang(lang) { try { localStorage.setItem('agri_lang', lang); } catch(e) {} }
function loadLang() { try { return localStorage.getItem('agri_lang') || 'en'; } catch(e){ return 'en'; } }

// ----------------- Language setter -----------------
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  const t = translations[lang];

  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key'); if (!key) return;
    const val = t[key]; if (val === undefined) return;
    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) el.placeholder = val;
    else el.innerText = val;
  });

  const g = $('globalLangSelect'); if (g) g.value = lang;
  const s = $('langSelect'); if (s) s.value = lang;

  // Optional creative dropdown
  const labelMap = { en: 'English', hi: 'Hindi', te: 'Telugu', kn: 'Kannada', ta: 'Tamil' };
  const currentLangLabel = $('currentLangLabel'); if (currentLangLabel) currentLangLabel.innerText = labelMap[lang] || 'English';
  document.querySelectorAll('.lang-opt').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  const dd = $('langDropdown'); if (dd) dd.classList.remove('active');

  // Optional pretty button
  const lbl = $('langBtnLabel'); if (lbl) lbl.innerText = langLabel[lang] || 'English';
  const menu = $('langMenu'); if (menu) menu.classList.remove('open');

  saveLang(lang);
  document.body.classList.add('fade-in');
  setTimeout(() => document.body.classList.remove('fade-in'), 220);
}

// ----------------- Navigation -----------------
function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = $(pageId); if (sec) sec.style.display = 'block';
  const map = { detect: 'navDetect', soil: 'navSoil', crop: 'navCrop', irrigation: 'navIrrigation', assistant: 'navAssistant' };
  const btn = $(map[pageId]); if (btn) btn.classList.add('active');
}

// ----------------- STT / TTS (with fallbacks) -----------------
let mediaRecorder, isRecording = false, audioChunks = [], lastBotMessage = translations.en.assistantWelcome;

// choose best-supported MediaRecorder MIME
function pickAudioMime() {
  if (!window.MediaRecorder) return null;
  const types = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',            // Safari (newer)
    'audio/ogg;codecs=opus'
  ];
  for (const t of types) {
    try { if (MediaRecorder.isTypeSupported(t)) return t; } catch(_) {}
  }
  return ''; // let browser pick default if MR exists
}

async function speakText(text, lang='en', btn=null) {
  if (!text) return;
  if (btn) btn.disabled = true;
  try {
    const r = await fetch('/tts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text, lang }) });
    const j = await r.json();
    if (j && j.audio_url) {
      const a = new Audio(j.audio_url); a.play();
      a.onended = () => { if (btn) btn.disabled = false; };
    } else if (btn) btn.disabled = false;
  } catch (e) { console.error('TTS error', e); if (btn) btn.disabled = false; }
}

/** -------- WAV fallback (for iOS/Safari without MediaRecorder) -------- **/
let wavCtx, wavSource, wavProc, wavStream;
let wavBuffers = [], wavSampleRate = 48000;

function startWavFallback(stream) {
  wavCtx = new (window.AudioContext || window.webkitAudioContext)();
  wavSampleRate = wavCtx.sampleRate;
  wavSource = wavCtx.createMediaStreamSource(stream);
  wavProc = wavCtx.createScriptProcessor(4096, 1, 1);
  wavProc.onaudioprocess = (e) => {
    const ch = e.inputBuffer.getChannelData(0);
    wavBuffers.push(new Float32Array(ch));
  };
  wavSource.connect(wavProc);
  wavProc.connect(wavCtx.destination);
  wavStream = stream;
}

function stopWavFallback() {
  if (!wavCtx) return null;
  let length = 0; wavBuffers.forEach(b => length += b.length);
  const pcm = new Float32Array(length);
  let offset = 0; for (const b of wavBuffers) { pcm.set(b, offset); offset += b.length; }

  const wavBuffer = encodeWav(pcm, wavSampleRate);
  try { wavProc && wavProc.disconnect(); } catch{}
  try { wavSource && wavSource.disconnect(); } catch{}
  try { wavCtx && wavCtx.close(); } catch{}
  if (wavStream) wavStream.getTracks().forEach(t => t.stop());
  wavCtx = wavSource = wavProc = wavStream = null;
  wavBuffers = [];
  return new Blob([wavBuffer], { type: 'audio/wav' });
}

function encodeWav(float32Array, sampleRate) {
  const numChannels = 1, bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataLength = float32Array.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);

  writeStr(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeStr(view, 8, 'WAVE');
  writeStr(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  let idx = 44;
  for (let i = 0; i < float32Array.length; i++, idx += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(idx, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;

  function writeStr(dv, offset, str) {
    for (let i=0;i<str.length;i++) dv.setUint8(offset+i, str.charCodeAt(i));
  }
}
/** -------------------- end WAV fallback -------------------- **/

// Robust STT uploader with retry + auto-send to chat
async function sendAudioToSTT(blob, lang, mime, filename) {
  if (!blob) { alert('No audio captured.'); return; }

  async function tryUpload(fieldName) {
    const fd = new FormData();
    fd.append(fieldName, new File([blob], filename, { type: mime }));
    const res = await fetch(`/stt?lang=${encodeURIComponent(lang)}`, { method:'POST', body: fd });
    return res;
  }

  try {
    let res = await tryUpload('audio'); // common field name
    if (!res.ok && (res.status === 400 || res.status === 404 || res.status === 415)) {
      res = await tryUpload('file');    // some servers use "file"
    }
    if (!res.ok) {
      const msg = await res.text().catch(()=> '');
      console.error('STT HTTP error:', res.status, msg);
      alert('Speech-to-text failed on server.');
      return;
    }

    const j = await res.json();
    const text = j && (j.text || j.transcript || j.result);
    if (text) {
      const u = $('userQ');
      if (u) { u.value = text; sendChat(); } // auto-send to chatbot
    } else {
      alert('No transcript returned by STT.');
    }
  } catch (e) {
    console.error('STT error', e);
    alert('Speech-to-text failed (network or server error).');
  }
}

async function toggleMicRecording() {
  const micBtn = $('micBtn');
  const lang = loadLang();

  // Secure context check: allow https, localhost, 127.0.0.1, ::1
  const isSecure =
    location.protocol === 'https:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.hostname === '::1';

  if (!isSecure) {
    alert('Microphone requires HTTPS (use https, localhost, 127.0.0.1, or ::1).');
    return;
  }

  if (isRecording) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop(); // onstop will send to STT
    } else {
      const wavBlob = stopWavFallback();
      await sendAudioToSTT(wavBlob, lang, 'audio/wav', 'recording.wav');
    }
    isRecording = false;
    if (micBtn) micBtn.innerText = '🎙️';
    return;
  }

  try {
    try {
      const perm = await navigator.permissions?.query?.({ name: 'microphone' });
      if (perm && perm.state === 'denied') {
        alert('Microphone permission denied. Enable it in your browser settings.');
        return;
      }
    } catch {}

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const supportedType = pickAudioMime();

    audioChunks = [];
    if (window.MediaRecorder) {
      mediaRecorder = new MediaRecorder(stream, supportedType ? { mimeType: supportedType } : undefined);
      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size) audioChunks.push(e.data); };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunks, { type: supportedType || 'audio/webm' });
        const isMp4 = (supportedType || '').includes('mp4');
        await sendAudioToSTT(
          blob,
          lang,
          isMp4 ? 'audio/mp4' : 'audio/webm',
          isMp4 ? 'recording.m4a' : 'recording.webm'
        );
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.start();
    } else {
      startWavFallback(stream);
    }

    isRecording = true;
    if (micBtn) micBtn.innerText = '🛑';
  } catch (e) {
    console.error('Mic error', e);
    if (String(e).toLowerCase().includes('denied')) alert('Microphone permission was denied. Please allow access.');
    else alert('Microphone access unavailable.');
  }
}

// ----------------- Camera -----------------
let cameraStream = null;
function stopCameraStream() {
  if (!cameraStream) return;
  cameraStream.getTracks().forEach(t => t.stop());
  cameraStream = null;
}
function restorePreviewArea() {
  stopCameraStream();
  const previewArea = $('previewArea');
  if (!previewArea) return;
  previewArea.innerHTML = '';
  const img = document.createElement('img');
  img.id='previewImg';
  img.src='/static/images/placeholder.png';
  img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
  previewArea.appendChild(img);
}
async function startCamera() {
  const previewArea = $('previewArea'); if (!previewArea) return;
  stopCameraStream(); previewArea.innerHTML = '';
  const video = document.createElement('video');
  video.autoplay = true; video.playsInline = true;
  video.style.width='100%'; video.style.height='100%'; video.style.objectFit='cover';
  const captureBtn = document.createElement('button');
  captureBtn.className='btn-primary'; captureBtn.innerText='Capture Photo';
  captureBtn.style.position='absolute'; captureBtn.style.bottom='12px'; captureBtn.style.left='50%'; captureBtn.style.transform='translateX(-50%)';
  const cancelBtn = document.createElement('button');
  cancelBtn.className='btn-link'; cancelBtn.innerText='Cancel';
  cancelBtn.style.position='absolute'; cancelBtn.style.top='12px'; cancelBtn.style.right='12px';
  previewArea.appendChild(video); previewArea.appendChild(captureBtn); previewArea.appendChild(cancelBtn);
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:'environment' }});
    video.srcObject = cameraStream;
    cancelBtn.onclick = restorePreviewArea;
    captureBtn.onclick = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth; canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d'); ctx.drawImage(video,0,0);
      canvas.toBlob(blob => {
        const f = new File([blob], 'capture.jpg', { type:'image/jpeg' });
        const dt = new DataTransfer(); dt.items.add(f);
        const input = $('imgFile'); if (input) input.files = dt.files;
        restorePreviewArea();
        const prev = $('previewImg'); if (prev) prev.src = URL.createObjectURL(f);
      }, 'image/jpeg', 0.95);
    };
  } catch(e) {
    console.error('Camera error', e); alert('Camera access failed'); restorePreviewArea();
  }
}

// ----------------- Helpers -----------------
function syncInputs(numId, rangeId) {
  const n = $(numId), r = $(rangeId); if (!n || !r) return;
  n.addEventListener('input', () => r.value = n.value);
  r.addEventListener('input', () => n.value = r.value);
}

// ----------------- UI updaters -----------------
function showResult(j) {
  if (!j) return;
  if ($('rLabel')) $('rLabel').innerText = j.label || translations[loadLang()].noImage || 'Unknown';
  const pct = Math.round((j.confidence || 0) * 100);
  if ($('rConf')) $('rConf').innerText = pct + '%';
  if ($('confBar')) $('confBar').style.width = pct + '%';
  const treats = j.treatment || j.treat || [];
  const prevs = j.prevention || [];
  if ($('treatmentList')) $('treatmentList').innerHTML = (treats.length ? treats : ['No specific treatment']).map(x => `<li>${x}</li>`).join('');
  if ($('preventionList')) $('preventionList').innerHTML = (prevs.length ? prevs : ['—']).map(x => `<li>${x}</li>`).join('');
  lastBotMessage = `Disease: ${j.label || 'Unknown'} (${pct}%)`;
}

// ----------------- API handlers -----------------
async function predictUpload() {
  const input = $('imgFile'); if (!input || !input.files || input.files.length === 0) return alert('Choose an image first');
  const fd = new FormData(); fd.append('file', input.files[0]);
  const btn = $('btnUpload'); if (btn){ btn.disabled=true; btn.innerText='Detecting...'; }
  try {
    const r = await fetch('/predict', { method:'POST', body: fd });
    const j = await r.json(); showResult(j);
  } catch (e) { console.error('Predict error', e); alert('Prediction failed'); }
  finally { if (btn) { btn.disabled=false; btn.innerText = translations[loadLang()].detectBtn || 'Detect Disease'; } }
}

async function analyzeSoil() {
  const soil = {
    N: Number($('soil_N')?.value||0),
    P: Number($('soil_P')?.value||0),
    K: Number($('soil_K')?.value||0),
    pH: Number($('soil_pH')?.value||7)
  };
  try {
    const r = await fetch('/soil/recommend', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ soil }) });
    const j = await r.json();
    if ($('soilRecs')) $('soilRecs').innerHTML = (j.recommendations || []).map(x => `<li>${x}</li>`).join('');
    if ($('soilResult')) { const s = $('soilResult').querySelector('.status'); if (s) s.innerText = 'Recommendations'; }
  } catch (e) { console.error('Soil error', e); alert('Soil analysis failed'); }
}

async function recommendCrop() {
  const payload = {
    N: Number($('crop_N')?.value||0), P: Number($('crop_P')?.value||0), K: Number($('crop_K')?.value||0),
    ph: Number($('crop_pH')?.value||7), temp: Number($('crop_temp')?.value||25),
    humidity: Number($('crop_humidity')?.value||50), rainfall: Number($('crop_rainfall')?.value||0)
  };
  const btn = $('cropAnalyzeBtn'); if (btn) { btn.disabled = true; btn.innerText = 'Analyzing...'; }
  try {
    const r = await fetch('/crop/recommend', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const j = await r.json();
    const name = j.recommendation || 'Unknown';
    if ($('cropResultLabel')) $('cropResultLabel').innerText = name;
    const imgName = name.toLowerCase().replace(/\s+/g,'') || 'placeholder';
    if ($('cropResultImg')) $('cropResultImg').src = `/static/images/crops/${imgName}.png`;
    if ($('cropResult')) $('cropResult').classList.add('has-result');
  } catch (e) {
    console.error('Crop API', e);
    if ($('cropResultLabel')) $('cropResultLabel').innerText = 'Analysis Failed';
    if ($('cropResult')) $('cropResult').classList.remove('has-result');
  } finally {
    if (btn) { btn.disabled=false; btn.innerText = translations[loadLang()].recommendBtn || 'Recommend Crop'; }
  }
}

async function irrigationAdvice() {
  const payload = {
    rainfall_mm: Number($('recentRain')?.value||0),
    soil_moisture_pct: Number($('soilMoisture')?.value||0)
  };
  try {
    const r = await fetch('/irrigation/advice', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    const j = await r.json();
    if ($('irrigationAdvice')) $('irrigationAdvice').innerText = Array.isArray(j.advice) ? j.advice.join('\n') : (j.advice || 'No advice available');
  } catch (e) {
    console.error('Irrigation error', e);
    if ($('irrigationAdvice')) $('irrigationAdvice').innerText = 'No advice available';
  }
}

async function sendChat() {
  const q = $('userQ')?.value?.trim(); if (!q) return;
  const lang = loadLang();
  const chatWin = $('chatWindow');
  if (chatWin) {
    const n = document.createElement('div'); n.className='chat-msg user pop'; n.innerText = q;
    chatWin.appendChild(n); chatWin.scrollTop = chatWin.scrollHeight;
  }
  if ($('userQ')) $('userQ').value = '';
  try {
    const r = await fetch('/chat', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ question: q, lang, disease: $('rLabel')?.innerText || 'Healthy' })
    });
    const j = await r.json();
    if (chatWin) {
      const b = document.createElement('div'); b.className='chat-msg bot pop'; b.innerText = j.answer || 'No answer';
      chatWin.appendChild(b); chatWin.scrollTop = chatWin.scrollHeight;
    }
    lastBotMessage = j.answer || lastBotMessage;
  } catch (e) { console.error('Chat error', e); alert('Chat failed'); }
}

// ----------------- Event wiring -----------------
document.addEventListener('DOMContentLoaded', () => {
  const lang = loadLang();
  setLanguage(lang);

  // Optional creative dropdown (ids: langToggle, langDropdown; items: .lang-opt[data-lang])
  on('langToggle', 'click', (e) => { e.stopPropagation(); const dd = $('langDropdown'); if (dd) dd.classList.toggle('active'); });
  document.addEventListener('click', (e) => { const dd = $('langDropdown'); if (dd && !dd.contains(e.target)) dd.classList.remove('active'); });
  const creativeLangOpts = document.querySelectorAll('.lang-opt');
  if (creativeLangOpts && creativeLangOpts.length) {
    creativeLangOpts.forEach(btn => {
      btn.addEventListener('click', () => { setLanguage(btn.dataset.lang); const dd = $('langDropdown'); if (dd) dd.classList.remove('active'); });
    });
  }

  // Optional pretty language button (ids: langBtn, langMenu; items: .lang-option[data-lang])
  const langBtn = $('langBtn');
  const langMenu = $('langMenu');
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => { e.stopPropagation(); langMenu.classList.toggle('open'); });
    langMenu.querySelectorAll('.lang-option').forEach(el => {
      el.addEventListener('click', () => { setLanguage(el.getAttribute('data-lang')); langMenu.classList.remove('open'); });
    });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') langMenu.classList.remove('open'); });
    const lbl = $('langBtnLabel'); if (lbl) lbl.innerText = langLabel[lang] || 'English';
  }

  // Also listen to any selects if present
  on('globalLangSelect', 'change', (e) => setLanguage(e.target.value));
  on('langSelect', 'change', (e) => setLanguage(e.target.value));

  // Navigation
  on('navDetect','click', () => showPage('detect'));
  on('navSoil','click', () => showPage('soil'));
  on('navCrop','click', () => showPage('crop'));
  on('navIrrigation','click', () => showPage('irrigation'));
  on('navAssistant','click', () => showPage('assistant'));
  showPage('detect');

  // STT/TTS
  on('micBtn','click', toggleMicRecording);
  on('playBtn','click', (e) => speakText(lastBotMessage, loadLang(), e.currentTarget));
  on('btnSpeak','click', (e) => {
    const label = $('rLabel')?.innerText || 'Unknown';
    const conf = $('rConf')?.innerText || '0%';
    speakText(`Disease detected: ${label} with ${conf} confidence.`, loadLang(), e.currentTarget);
  });

  // Detect tab
  on('openCamera','click', startCamera);
  on('btnAsk','click', () => {
    const disease = $('rLabel')?.innerText || '';
    const msg = disease && disease !== (translations[loadLang()].noImage || 'No image yet')
      ? `Tell me more about ${disease}`
      : 'What are the common diseases for pomegranates?';
    const u = $('userQ'); if (u) u.value = msg;
    showPage('assistant'); $('userQ')?.focus();
  });

  const imgFile = $('imgFile');
  if (imgFile) {
    imgFile.addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const prev = $('previewImg'); if (prev) prev.src = URL.createObjectURL(f);
    });
  }
  on('btnUpload','click', predictUpload);

  on('btnReset','click', () => {
    if ($('imgFile')) $('imgFile').value = '';
    const prev = $('previewImg'); if (prev) prev.src = '/static/images/placeholder.png';
    if ($('rLabel')) $('rLabel').innerText = translations[loadLang()].noImage || 'No image yet';
    if ($('rConf')) $('rConf').innerText = '0%';
    if ($('treatmentList')) $('treatmentList').innerHTML =
      `<li>${translations[loadLang()].uploadToSee || 'Upload an image to get recommendations'}</li>`;
    if ($('preventionList')) $('preventionList').innerHTML = '<li>—</li>';
    restorePreviewArea();
  });

  // Soil / Irrigation / Crop
  on('soilAnalyze','click', analyzeSoil);
  on('irrigateBtn','click', irrigationAdvice);
  on('cropAnalyzeBtn','click', recommendCrop);

  // Chat
  on('sendQ','click', sendChat);

  // Slider sync
  syncInputs('soil_N','slider_N');
  syncInputs('soil_P','slider_P');
  syncInputs('soil_K','slider_K');
  syncInputs('crop_N','slider_crop_N');
  syncInputs('crop_P','slider_crop_P');
  syncInputs('crop_K','slider_crop_K');
  syncInputs('crop_pH','slider_crop_pH');
  syncInputs('crop_temp','slider_crop_temp');
  syncInputs('crop_humidity','slider_crop_humidity');
  syncInputs('crop_rainfall','slider_crop_rainfall');

  // Label->file trigger
  document.querySelectorAll('label[for="imgFile"]').forEach(n =>
    n.addEventListener('click', () => $('imgFile') && $('imgFile').click())
  );
});
