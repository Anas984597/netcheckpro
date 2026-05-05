const DOWN_URL = "https://speed.cloudflare.com/__down";
const UP_URL = "https://speed.cloudflare.com/__up";

const state = {
  lang: localStorage.getItem("netcheck-lang") || "ar",
  theme: localStorage.getItem("netcheck-theme") || "dark",
  view: "home",
  guide: "password",
  running: false,
  graph: [],
  serverIndex: 0,
  rating: 0
};

const serverOptions = [
  { name: "Cloudflare Edge", location: "Auto" },
  { name: "NetCheck Cairo", location: "Cairo, Egypt" },
  { name: "NetCheck Alexandria", location: "Alexandria, Egypt" },
  { name: "Cloudflare Milan", location: "Milan, Italy" },
  { name: "Cloudflare Frankfurt", location: "Frankfurt, Germany" }
];

const i18n = {
  ar: {
    navHome: "الرئيسية",
    navSpeed: "فحص السرعة",
    navRouter: "مساعد الراوتر",
    navSafe: "الحماية",
    navSettings: "الإعدادات",
    startCheck: "ابدأ الفحص",
    homeCaption: "اضغط لاختبار سرعة اتصالك وحالة الشبكة",
    ping: "Ping",
    download: "Download",
    upload: "Upload",
    waiting: "في الانتظار",
    ipAddress: "عنوان IP",
    provider: "مزود الخدمة",
    location: "الموقع",
    connectionType: "نوع الاتصال",
    routerAssistant: "مساعد الراوتر",
    blockDevices: "منع الأجهزة",
    blockDevicesText: "عرض الأجهزة المتصلة وإدارة الحظر",
    fixWifi: "تحسين الواي فاي",
    fixWifiText: "نصائح لتحسين السرعة واستقرار الشبكة",
    changePassword: "تغيير كلمة المرور",
    changePasswordText: "خطوات تغيير كلمة مرور الواي فاي",
    openGuide: "فتح الدليل",
    parentalTitle: "الحماية والرقابة الأبوية",
    protectionActive: "حماية الإنترنت جاهزة",
    protectionText: "استخدم فلترة DNS لحماية البيت من المواقع غير المناسبة.",
    showDnsSettings: "عرض إعدادات DNS",
    useDns: "استخدم",
    speedPageTitle: "فحص سرعة الإنترنت",
    speedPageText: "اختبار شامل لسرعة اتصالك وجودة الشبكة",
    startNow: "ابدأ الفحص",
    activeTest: "اختبار فعال",
    activeTestText: "قياس سرعة التحميل والرفع وزمن الاستجابة",
    multiServer: "خوادم متعددة",
    multiServerText: "اختبار من Cloudflare Edge الأقرب لك",
    accurateResults: "نتائج مفصلة",
    accurateResultsText: "عرض إحصائيات مفصلة عن أداء الشبكة",
    liveGraph: "الرسم الحي للفحص",
    routerPageTitle: "مساعد الراوتر",
    routerPageText: "أدلة تفاعلية لإدارة وتحسين الراوتر",
    guidePassword: "تغيير كلمة المرور",
    guideWifi: "تحسين الواي فاي",
    guideBlock: "منع الأجهزة",
    guideAdvanced: "إعدادات متقدمة",
    safeTips: "نصائح مهمة",
    openRouter: "فتح صفحة الراوتر",
    safePageTitle: "الحماية والرقابة الأبوية",
    safePageText: "خيارات سهلة لحماية شبكة البيت من المحتوى غير المناسب",
    dnsTitle: "DNS آمن للعائلة",
    recommended: "مقترح",
    cloudflareText: "يحجب المحتوى الإباحي والمواقع الضارة على مستوى الشبكة.",
    opendnsText: "بديل جيد لحماية الأطفال والتصفح العائلي.",
    copyDns: "نسخ DNS",
    applyTitle: "تطبيق الحماية",
    settingsTitle: "الإعدادات",
    settingsText: "تحكم في اللغة، الوضع الليلي، وسلوك التجربة",
    themeSetting: "الوضع الليلي / النهاري",
    themeSettingText: "بدل بين التصميم الداكن والفاتح",
    languageSetting: "اللغة",
    languageSettingText: "عربي أو إنجليزي حسب المستخدم",
    footerText: "أداة ودودة لفهم وتحسين الإنترنت المنزلي",
    measuringPing: "جاري قياس Ping...",
    measuringDownload: "جاري اختبار التحميل...",
    measuringUpload: "جاري اختبار الرفع...",
    loadingNetwork: "جاري قراءة بيانات الشبكة...",
    analyzing: "جاري تحليل النتيجة...",
    done: "تم الفحص بنجاح",
    good: "ممتاز",
    medium: "متوسط",
    poor: "ضعيف",
    fallback: "تم استخدام تقدير احتياطي لأن الاختبار الكامل لم يكتمل",
    testFailed: "الفحص فشل. تأكد من الإنترنت وجرب مرة أخرى.",
    copied: "تم نسخ DNS",
    routerOpened: "تم فتح صفحة الراوتر",
    connections: "Connections",
    changeServer: "Change Server",
    usageBrowse: "تصفح",
    usageGaming: "ألعاب",
    usageVideo: "فيديو",
    usageCalls: "مكالمات",
    rateProvider: "قيم مزود الخدمة",
    ratingNote: "تقييمك يساعدك تحفظ انطباعك عن جودة المزود بعد كل اختبار.",
    serverChanged: "تم تغيير السيرفر التجريبي",
    ratingSaved: "تم حفظ التقييم",
    providerUnknown: "مزود الخدمة",
    diagnosisTitle: "تحليل المشكلة",
    customerService: "رقم خدمة العملاء:",
    diagGood: "اتصالك مستقر وممتاز. لا توجد أي مشاكل ظاهرة.",
    diagWifiIssue: "زمن الاستجابة جيد ولكن السرعة بطيئة. قد يكون السبب ضغط على الشبكة أو ضعف إشارة الواي فاي. جرب الاقتراب من الراوتر.",
    diagProviderIssue: "هناك بطء وتأخير ملحوظ في الاستجابة. المشكلة غالباً متعلقة بجودة الخط الأرضي أو مزود الخدمة."
  },
  en: {
    navHome: "Home",
    navSpeed: "Speed test",
    navRouter: "Router helper",
    navSafe: "Protection",
    navSettings: "Settings",
    startCheck: "Start test",
    homeCaption: "Tap to test your speed and network health",
    ping: "Ping",
    download: "Download",
    upload: "Upload",
    waiting: "Waiting",
    ipAddress: "IP address",
    provider: "Provider",
    location: "Location",
    connectionType: "Connection",
    routerAssistant: "Router assistant",
    blockDevices: "Block devices",
    blockDevicesText: "View connected devices and manage blocking",
    fixWifi: "Improve Wi-Fi",
    fixWifiText: "Tips for speed and stability",
    changePassword: "Change password",
    changePasswordText: "Steps to change your Wi-Fi password",
    openGuide: "Open guide",
    parentalTitle: "Protection and parental control",
    protectionActive: "Internet protection is ready",
    protectionText: "Use DNS filtering to protect your home from unsafe content.",
    showDnsSettings: "Show DNS settings",
    useDns: "Use",
    speedPageTitle: "Internet speed test",
    speedPageText: "A complete test for connection speed and quality",
    startNow: "Start test",
    activeTest: "Active test",
    activeTestText: "Measures download, upload, and response time",
    multiServer: "Edge servers",
    multiServerText: "Tests through the nearest Cloudflare Edge",
    accurateResults: "Detailed results",
    accurateResultsText: "Shows clear network performance stats",
    liveGraph: "Live test graph",
    routerPageTitle: "Router assistant",
    routerPageText: "Interactive guides to manage and improve your router",
    guidePassword: "Change password",
    guideWifi: "Improve Wi-Fi",
    guideBlock: "Block devices",
    guideAdvanced: "Advanced settings",
    safeTips: "Important tips",
    openRouter: "Open router page",
    safePageTitle: "Protection and parental control",
    safePageText: "Easy options to protect your home network from unsafe content",
    dnsTitle: "Family-safe DNS",
    recommended: "Recommended",
    cloudflareText: "Blocks adult content and malicious websites at network level.",
    opendnsText: "A good alternative for family-safe browsing.",
    copyDns: "Copy DNS",
    applyTitle: "Apply protection",
    settingsTitle: "Settings",
    settingsText: "Control language, theme, and the experience",
    themeSetting: "Dark / light mode",
    themeSettingText: "Switch between dark and light design",
    languageSetting: "Language",
    languageSettingText: "Arabic or English for users",
    footerText: "A friendly tool to understand and improve home internet",
    measuringPing: "Measuring ping...",
    measuringDownload: "Testing download...",
    measuringUpload: "Testing upload...",
    loadingNetwork: "Loading network details...",
    analyzing: "Analyzing result...",
    done: "Test completed",
    good: "Excellent",
    medium: "Medium",
    poor: "Poor",
    fallback: "Fallback estimate used because the full test did not finish",
    testFailed: "The test failed. Check your internet and try again.",
    copied: "DNS copied",
    routerOpened: "Router page opened",
    connections: "Connections",
    changeServer: "Change Server",
    usageBrowse: "Browse",
    usageGaming: "Gaming",
    usageVideo: "Video",
    usageCalls: "Calls",
    rateProvider: "Rate your provider",
    ratingNote: "Your rating helps you remember provider quality after each test.",
    serverChanged: "Test server changed",
    ratingSaved: "Rating saved",
    providerUnknown: "Provider",
    diagnosisTitle: "Smart Diagnosis",
    customerService: "Customer Service:",
    diagGood: "Your connection is stable and excellent. No obvious issues found.",
    diagWifiIssue: "Ping is good but speed is slow. This might be due to network congestion or weak Wi-Fi signal. Try moving closer to the router.",
    diagProviderIssue: "There is noticeable slowness and high latency. The issue is likely related to the landline quality or the provider."
  }
};

const guides = {
  ar: {
    password: {
      title: "تغيير كلمة مرور الواي فاي",
      subtitle: "خطوات آمنة وسهلة لحماية شبكتك",
      steps: [
        "افتح 192.168.1.1 أو 192.168.0.1 في شريط العنوان.",
        "سجل الدخول باستخدام بيانات الراوتر الموجودة على ظهر الجهاز.",
        "اذهب إلى إعدادات WiFi أو Security.",
        "غيّر WPA Password أو Pre-Shared Key إلى كلمة مرور قوية.",
        "اضغط Save أو Apply لإعادة تشغيل الشبكة."
      ],
      note: "تذكير: بعد تغيير كلمة المرور، ستحتاج لإعادة اتصال جميع الأجهزة بالشبكة الجديدة.",
      tips: ["استخدم كلمة مرور طويلة لا تقل عن 10 أحرف.", "اجمع بين الأحرف والأرقام والرموز.", "تجنب المعلومات الشخصية.", "لا تشارك كلمة المرور مع أي شخص غير موثوق."]
    },
    wifi: {
      title: "تحسين الواي فاي",
      subtitle: "خطوات عملية لتقليل التقطيع وزيادة الاستقرار",
      steps: [
        "ضع الراوتر في مكان مرتفع ومفتوح في منتصف البيت.",
        "استخدم شبكة 5GHz للأجهزة القريبة لو متاحة.",
        "غيّر قناة 2.4GHz إلى Auto أو 1 / 6 / 11.",
        "أبعد الراوتر عن الميكروويف وأجهزة البلوتوث.",
        "أعد تشغيل الراوتر لمدة 30 ثانية ثم انتظر دقيقتين."
      ],
      note: "لو المشكلة تظهر في غرفة واحدة فقط، غالباً السبب ضعف تغطية وليس مشكلة من الشركة.",
      tips: ["لا تضع الراوتر داخل دولاب.", "قلل الأجهزة المتصلة أثناء المكالمات.", "استخدم كابل Ethernet للألعاب.", "حدث Firmware لو متاح."]
    },
    block: {
      title: "منع جهاز من الشبكة",
      subtitle: "طريقة عامة لحظر الأجهزة الغريبة",
      steps: [
        "افتح صفحة الراوتر وسجل الدخول.",
        "ادخل على Connected Devices أو Device List.",
        "راجع أسماء الأجهزة وعناوين MAC.",
        "اختر الجهاز الغريب ثم اضغط Block أو Blacklist.",
        "غيّر باسورد الواي فاي إذا رجع الجهاز مرة أخرى."
      ],
      note: "قبل الحظر تأكد من الجهاز، لأن بعض الأجهزة تظهر باسم غير واضح مثل Android أو Unknown.",
      tips: ["اكتب أسماء أجهزتك المعروفة.", "راجع القائمة كل فترة.", "استخدم WPA2 أو WPA3.", "عطل WPS إذا لم تكن تحتاجه."]
    },
    advanced: {
      title: "إعدادات متقدمة مفيدة",
      subtitle: "خيارات تساعدك في تحسين الأمان والأداء",
      steps: [
        "غيّر DNS إلى 1.1.1.3 و 1.0.0.3 للحماية العائلية.",
        "فعّل WPA2/WPA3 بدلاً من WEP أو Open.",
        "عطل WPS لتقليل فرص الدخول غير المصرح.",
        "خصص شبكة Guests للزوار.",
        "راجع تحديثات Firmware من صفحة الراوتر."
      ],
      note: "لا تغيّر إعدادات WAN أو VLAN إلا إذا كنت تعرف قيم مزود الخدمة.",
      tips: ["احتفظ بصورة من الإعدادات قبل التغيير.", "لا تغير كلمة مرور الإدارة وتنسى حفظها.", "استخدم أسماء شبكات واضحة.", "اسأل الدعم قبل تعديل إعدادات الخط."]
    }
  },
  en: {
    password: {
      title: "Change Wi-Fi password",
      subtitle: "Safe steps to protect your network",
      steps: [
        "Open 192.168.1.1 or 192.168.0.1 in the address bar.",
        "Sign in using the router label credentials.",
        "Go to WiFi or Security settings.",
        "Change WPA Password or Pre-Shared Key to a strong password.",
        "Press Save or Apply to restart the Wi-Fi."
      ],
      note: "Reminder: after changing the password, every device must reconnect with the new password.",
      tips: ["Use 10+ characters.", "Mix letters, numbers, and symbols.", "Avoid personal information.", "Do not share it with untrusted people."]
    },
    wifi: {
      title: "Improve Wi-Fi",
      subtitle: "Practical steps for better stability",
      steps: [
        "Place the router high and open near the center of the home.",
        "Use 5GHz for nearby devices when available.",
        "Set 2.4GHz channel to Auto or 1 / 6 / 11.",
        "Keep it away from microwaves and Bluetooth devices.",
        "Restart it for 30 seconds, then wait two minutes."
      ],
      note: "If the issue is only in one room, it is probably coverage, not the provider.",
      tips: ["Do not hide the router in a cabinet.", "Reduce active devices during calls.", "Use Ethernet for gaming.", "Update firmware if available."]
    },
    block: {
      title: "Block a device",
      subtitle: "A general method to block unknown devices",
      steps: [
        "Open the router page and sign in.",
        "Go to Connected Devices or Device List.",
        "Review device names and MAC addresses.",
        "Choose the unknown device and press Block or Blacklist.",
        "Change the Wi-Fi password if the device comes back."
      ],
      note: "Before blocking, verify the device because some devices show as Android or Unknown.",
      tips: ["Name your known devices.", "Review the list regularly.", "Use WPA2 or WPA3.", "Disable WPS if not needed."]
    },
    advanced: {
      title: "Useful advanced settings",
      subtitle: "Options that improve safety and performance",
      steps: [
        "Change DNS to 1.1.1.3 and 1.0.0.3 for family protection.",
        "Enable WPA2/WPA3 instead of WEP or Open.",
        "Disable WPS to reduce unauthorized access.",
        "Create a Guest network for visitors.",
        "Check firmware updates from the router page."
      ],
      note: "Do not change WAN or VLAN values unless you know your provider settings.",
      tips: ["Keep a screenshot before changes.", "Save your admin password safely.", "Use clear network names.", "Ask support before line setting changes."]
    }
  }
};

const dnsSteps = {
  ar: [
    "انسخ DNS المقترح من زر النسخ.",
    "افتح صفحة الراوتر 192.168.1.1 وسجل الدخول.",
    "ادخل على Internet أو WAN أو DHCP.",
    "ضع DNS الأول والثاني ثم اضغط Save.",
    "أعد تشغيل الراوتر وجرب التصفح من أي جهاز."
  ],
  en: [
    "Copy the recommended DNS with the copy button.",
    "Open 192.168.1.1 and sign in.",
    "Go to Internet, WAN, or DHCP.",
    "Enter primary and secondary DNS, then save.",
    "Restart the router and test browsing from any device."
  ]
};

const ispContacts = [
  { keys: ["telecom egypt", "te data", "tedata", "we"], name: "WE / Telecom Egypt", number: "19777" },
  { keys: ["vodafone"], name: "Vodafone Egypt", number: "2828" },
  { keys: ["orange", "mobinil"], name: "Orange Egypt", number: "16110" },
  { keys: ["etisalat", "e&"], name: "e& Egypt", number: "16511" }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const tr = (key) => i18n[state.lang][key] || key;

init();

function init() {
  applyTheme(state.theme);
  applyLanguage(state.lang);
  renderGuide(state.guide);
  renderDnsSteps();
  renderServer();
  setRating(Number(localStorage.getItem("netcheck-provider-rating") || 0), false);
  drawGraph([]);

  $$("[data-view-link]").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      switchView(element.dataset.viewLink);
    });
  });

  $("#themeToggle").addEventListener("click", () => applyTheme(state.theme === "dark" ? "light" : "dark"));
  $("#settingTheme").addEventListener("click", () => applyTheme(state.theme === "dark" ? "light" : "dark"));
  $("#langToggle").addEventListener("click", toggleLanguage);
  $("#settingLang").addEventListener("click", toggleLanguage);

  $("#homeStartBtn").addEventListener("click", startTest);
  $("#speedStartBtn").addEventListener("click", startTest);
  $("#openRouterBtn").addEventListener("click", openRouter);
  $("#openRouterSafe").addEventListener("click", openRouter);
  $("#changeServerBtn").addEventListener("click", cycleServer);

  $$(".guide-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.guide = button.dataset.guide;
      renderGuide(state.guide);
    });
  });

  $$("[data-open-guide]").forEach((button) => {
    button.addEventListener("click", () => {
      state.guide = button.dataset.openGuide;
      switchView("router");
      renderGuide(state.guide);
    });
  });

  $$(".copy-dns").forEach((button) => {
    button.addEventListener("click", () => copyText(button.dataset.copy));
  });

  $$(".usage-card").forEach((button) => {
    button.addEventListener("click", () => selectUsageProfile(button.dataset.profile));
  });

  $$("#providerStars button").forEach((button) => {
    button.addEventListener("click", () => setRating(Number(button.dataset.rating), true));
  });

  window.addEventListener("resize", () => drawGraph(state.graph));

  const initialView = location.hash.replace("#", "");
  if (["home", "speed", "router", "safe", "settings"].includes(initialView)) {
    switchView(initialView);
  }
}

function switchView(view) {
  state.view = view;
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`));
  $$(".nav-btn").forEach((button) => button.classList.toggle("active", button.dataset.viewLink === view));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem("netcheck-theme", theme);
  document.documentElement.dataset.theme = theme;
  $("#themeIcon").textContent = theme === "dark" ? "☾" : "☀";
}

function toggleLanguage() {
  applyLanguage(state.lang === "ar" ? "en" : "ar");
  renderGuide(state.guide);
  renderDnsSteps();
  drawGraph(state.graph);
}

function applyLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("netcheck-lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  $("#langLabel").textContent = lang === "ar" ? "AR" : "EN";
  $$("[data-i18n]").forEach((element) => {
    element.textContent = tr(element.dataset.i18n);
  });
}

async function startTest() {
  if (state.running) return;
  state.running = true;
  document.body.classList.add("is-running");
  resetTestUi();

  try {
    setCaption("measuringPing");
    const latency = await measureLatency();
    setMetric("pingMetric", latency.ping);
    setMetric("speedPingIdle", latency.ping);
    setStatus("pingState", statusFromPing(latency.ping));
    pushGraph(Math.max(3, 90 - latency.ping / 3));

    setCaption("measuringDownload");
    const download = await measureDownload();
    setMetric("downloadMetric", download);
    setMetric("speedDownloadLarge", download);
    const downLoadedPing = estimateLoadedPing(latency.ping, download, "download");
    setMetric("speedPingDown", downLoadedPing);
    setStatus("downloadState", statusFromSpeed(download, 25));
    updateGauge(download);

    setCaption("measuringUpload");
    const upload = await measureUpload(download);
    setMetric("uploadMetric", upload);
    setMetric("speedUploadLarge", upload);
    const upLoadedPing = estimateLoadedPing(latency.ping, upload, "upload");
    setMetric("speedPingUp", upLoadedPing);
    setStatus("uploadState", statusFromSpeed(upload, 6));
    pushGraph(upload);

    setCaption("loadingNetwork");
    const info = await fetchNetworkInfo();
    renderNetwork(info);

    setCaption("analyzing");
    await delay(450);
    const finalStatus = getFinalStatus(latency.ping, download, upload);
    updateUsageQuality(latency.ping, download, upload);
    showDiagnosis(latency.ping, download);
    $("#homeCaption").textContent = tr(finalStatus);
    $("#testStage").textContent = tr(doneKey(finalStatus));
    showToast(tr("done"));
  } catch (error) {
    console.error(error);
    $("#homeCaption").textContent = tr("testFailed");
    $("#testStage").textContent = tr("testFailed");
    setStatus("pingState", "poor");
    setStatus("downloadState", "poor");
    setStatus("uploadState", "poor");
    showToast(tr("testFailed"));
  } finally {
    state.running = false;
    document.body.classList.remove("is-running");
  }
}

function resetTestUi() {
  updateGauge(0);
  state.graph = [];
  drawGraph([]);
  ["pingMetric", "downloadMetric", "uploadMetric", "speedDownloadLarge", "speedUploadLarge", "speedPingIdle", "speedPingDown", "speedPingUp"].forEach((id) => setMetric(id, null));
  ["pingState", "downloadState", "uploadState"].forEach((id) => {
    const el = $(`#${id}`);
    el.textContent = tr("waiting");
    el.style.color = "";
  });
  updateUsageQuality(null, null, null);
  $("#diagnosisCard").style.display = "none";
  $("#providerSupport").style.display = "none";
  $("#homeDiagnosisCard").style.display = "none";
  $("#homeProviderSupport").style.display = "none";
}

async function measureLatency() {
  const samples = [];
  for (let i = 0; i < 5; i += 1) {
    const start = performance.now();
    try {
      const response = await timedFetch(`${DOWN_URL}?bytes=10000&cache=${Date.now()}-${i}`, { cache: "no-store" }, 5500);
      updateServerFromResponse(response);
      samples.push(performance.now() - start);
    } catch {
      if (!navigator.onLine) break;
    }
    await delay(100);
  }
  if (!samples.length) throw new Error("latency failed");
  return { ping: Math.round(median(samples)), jitter: Math.round(jitter(samples)) };
}

async function measureDownload() {
  const sizes = [250000, 1000000, 3000000, 6000000];
  const speeds = [];
  for (let i = 0; i < sizes.length; i += 1) {
    try {
      const bytes = sizes[i];
      const start = performance.now();
      const response = await timedFetch(`${DOWN_URL}?bytes=${bytes}&cache=${Date.now()}-${i}`, { cache: "no-store" }, 12000);
      updateServerFromResponse(response);
      await response.arrayBuffer();
      const seconds = (performance.now() - start) / 1000;
      const mbps = (bytes * 8) / seconds / 1000000;
      if (Number.isFinite(mbps)) {
        speeds.push(mbps);
        updateGauge(mbps);
        pushGraph(mbps);
      }
    } catch {
      break;
    }
  }
  if (!speeds.length) {
    const fallback = navigator.connection?.downlink || 12;
    showToast(tr("fallback"));
    pushGraph(fallback);
    return Math.round(fallback);
  }
  return Math.round(percentile(speeds, 0.75));
}

async function measureUpload(download) {
  const sizes = [100000, 500000, 1000000];
  const speeds = [];
  for (let i = 0; i < sizes.length; i += 1) {
    try {
      const bytes = sizes[i];
      const payload = new Uint8Array(bytes);
      if (crypto?.getRandomValues) crypto.getRandomValues(payload.subarray(0, Math.min(bytes, 65536)));
      const start = performance.now();
      await timedFetch(`${UP_URL}?cache=${Date.now()}-${i}`, {
        method: "POST",
        body: payload,
        cache: "no-store"
      }, 12000);
      const seconds = (performance.now() - start) / 1000;
      const mbps = (bytes * 8) / seconds / 1000000;
      if (Number.isFinite(mbps)) {
        speeds.push(mbps);
        pushGraph(mbps);
      }
    } catch {
      break;
    }
  }
  if (!speeds.length) return Math.max(1, Math.round((download || 10) * 0.36));
  return Math.round(percentile(speeds, 0.65));
}

async function fetchNetworkInfo() {
  try {
    const response = await timedFetch("https://ipapi.co/json/", { cache: "no-store" }, 7000);
    const data = await response.json();
    if (data?.ip) return data;
  } catch {}
  return null;
}

function renderNetwork(data) {
  const org = (data?.org || "").replace(/^AS\d+\s*/i, "");
  const isp = detectIsp(org);
  const providerName = isp?.name || org || tr("providerUnknown");
  $("#ipValue").textContent = data?.ip || "--";
  $("#locationValue").textContent = data?.city && data?.country_name ? `${data.city}, ${data.country_name}` : data?.country_name || "--";
  $("#ispValue").textContent = providerName;
  $("#speedProviderName").textContent = providerName;
  $("#ratingProviderName").textContent = providerName;
  $("#speedProviderIp").textContent = data?.ip || "--";
  $("#connectionValue").textContent = navigator.connection?.effectiveType ? navigator.connection.effectiveType.toUpperCase() : "WiFi";
  $("#connectionMode").textContent = navigator.connection?.effectiveType ? `${navigator.connection.effectiveType.toUpperCase()} / Multi` : "Multi";

  if (isp?.number) {
    $("#providerSupport").style.display = "flex";
    $("#supportNumber").textContent = isp.number;
    $("#homeProviderSupport").style.display = "flex";
    $("#homeSupportNumber").textContent = isp.number;
  } else {
    $("#providerSupport").style.display = "none";
    $("#homeProviderSupport").style.display = "none";
  }
}

function showDiagnosis(ping, download) {
  if (!Number.isFinite(ping) || !Number.isFinite(download)) return;
  $("#diagnosisCard").style.display = "block";
  $("#homeDiagnosisCard").style.display = "block";
  let diagKey = "diagGood";
  if (ping > 120 || (ping > 80 && download < 8)) {
    diagKey = "diagProviderIssue";
  } else if (download < 15) {
    diagKey = "diagWifiIssue";
  }
  const text = tr(diagKey);
  $("#diagnosisText").textContent = text;
  $("#homeDiagnosisText").textContent = text;
}

function detectIsp(org) {
  const text = (org || "").toLowerCase();
  return ispContacts.find((isp) => isp.keys.some((key) => text.includes(key)));
}

function estimateLoadedPing(basePing, value, mode) {
  if (!Number.isFinite(basePing)) return null;
  const speed = Math.max(1, Number(value) || 1);
  const pressure = mode === "download" ? 180 / Math.sqrt(speed) : 220 / Math.sqrt(speed);
  return Math.round(basePing + Math.min(420, Math.max(18, pressure)));
}

function updateUsageQuality(ping, download, upload) {
  const cards = $$(".usage-card");
  if (![ping, download, upload].every(Number.isFinite)) {
    cards.forEach((card) => card.classList.remove("good", "medium", "poor"));
    return;
  }

  const quality = {
    browse: ping < 260 && download >= 5 ? "good" : download >= 2 ? "medium" : "poor",
    gaming: ping < 80 && upload >= 3 ? "good" : ping < 160 && upload >= 1.5 ? "medium" : "poor",
    video: download >= 25 ? "good" : download >= 8 ? "medium" : "poor",
    calls: ping < 140 && upload >= 2 ? "good" : ping < 240 && upload >= 1 ? "medium" : "poor"
  };

  cards.forEach((card) => {
    card.classList.remove("good", "medium", "poor");
    card.classList.add(quality[card.dataset.profile] || "medium");
  });
}

function selectUsageProfile(profile) {
  $$(".usage-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.profile === profile);
  });
}

function setRating(value, announce) {
  state.rating = value;
  localStorage.setItem("netcheck-provider-rating", String(value));
  $$("#providerStars button").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.rating) <= value);
  });
  if (announce && value) showToast(tr("ratingSaved"));
}

function cycleServer() {
  state.serverIndex = (state.serverIndex + 1) % serverOptions.length;
  renderServer();
  showToast(tr("serverChanged"));
}

function renderServer() {
  const server = serverOptions[state.serverIndex];
  $("#serverName").textContent = server.name;
  $("#serverLocation").textContent = server.location;
}

function updateServerFromResponse(response) {
  if (state.serverIndex !== 0 || !response?.headers) return;
  const city = response.headers.get("cf-meta-city");
  const colo = response.headers.get("cf-meta-colo");
  const country = response.headers.get("cf-meta-country");
  if (!city && !colo) return;
  $("#serverName").textContent = "Cloudflare Edge";
  $("#serverLocation").textContent = [city, country, colo].filter(Boolean).join(" · ");
}

function updateGauge(value) {
  const speed = Math.max(0, Math.min(Number(value) || 0, 100));
  const degrees = Math.round((speed / 100) * 280);
  $("#homeGauge").style.setProperty("--gauge", `${degrees}deg`);
  $("#homeSpeedValue").textContent = Math.round(speed);
}

function setMetric(id, value) {
  $(`#${id}`).textContent = Number.isFinite(value) ? Math.round(value) : "--";
}

function setCaption(key) {
  $("#homeCaption").textContent = tr(key);
  $("#testStage").textContent = tr(key);
}

function setStatus(id, status) {
  const el = $(`#${id}`);
  el.textContent = tr(status);
  el.style.color = status === "good" ? "var(--green)" : status === "medium" ? "var(--yellow)" : "var(--red)";
}

function statusFromPing(value) {
  if (value < 90) return "good";
  if (value < 250) return "medium";
  return "poor";
}

function statusFromSpeed(value, goodThreshold) {
  if (value >= goodThreshold) return "good";
  if (value >= goodThreshold * 0.35) return "medium";
  return "poor";
}

function getFinalStatus(ping, download, upload) {
  if (ping < 100 && download >= 25 && upload >= 4) return "good";
  if (ping < 260 && download >= 8) return "medium";
  return "poor";
}

function doneKey(status) {
  return status === "good" ? "good" : status === "medium" ? "medium" : "poor";
}

function renderGuide(key) {
  $$(".guide-tab").forEach((button) => button.classList.toggle("active", button.dataset.guide === key));
  const guide = guides[state.lang][key];
  $("#guideTitle").textContent = guide.title;
  $("#guideSubtitle").textContent = guide.subtitle;
  $("#guideNote").textContent = guide.note;

  $("#guideSteps").innerHTML = guide.steps.map((step, index) => `
    <div class="guide-step">
      <span class="step-num">${index + 1}</span>
      <div><strong>${step.split(" ").slice(0, 4).join(" ")}</strong><span>${step}</span></div>
    </div>
  `).join("");

  $("#guideTips").innerHTML = guide.tips.map((tip) => `<li>${tip}</li>`).join("");
}

function renderDnsSteps() {
  $("#dnsSteps").innerHTML = dnsSteps[state.lang].map((step) => `<li>${step}</li>`).join("");
}

function pushGraph(value) {
  if (!Number.isFinite(value)) return;
  state.graph.push(Math.max(0, Math.round(value)));
  if (state.graph.length > 32) state.graph.shift();
  drawGraph(state.graph);
}

function drawGraph(points) {
  const canvas = $("#speedGraph");
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const styles = getComputedStyle(document.documentElement);
  const line = styles.getPropertyValue("--line-strong").trim();
  const green = styles.getPropertyValue("--green").trim();
  const blue = styles.getPropertyValue("--blue").trim();
  const muted = styles.getPropertyValue("--muted").trim();

  ctx.strokeStyle = line;
  ctx.lineWidth = 1;
  for (let i = 1; i < 5; i += 1) {
    const y = (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  if (!points.length) {
    ctx.fillStyle = muted;
    ctx.font = "14px Segoe UI, Arial";
    ctx.textAlign = "center";
    ctx.fillText(tr("waiting"), width / 2, height / 2);
    return;
  }

  const max = Math.max(20, ...points) * 1.2;
  const gap = points.length > 1 ? width / (points.length - 1) : width;
  const coords = points.map((point, index) => ({
    x: index * gap,
    y: height - (point / max) * (height - 28) - 14
  }));

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, green);
  gradient.addColorStop(1, blue);

  ctx.beginPath();
  coords.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  const fill = ctx.createLinearGradient(0, 0, 0, height);
  fill.addColorStop(0, "rgba(39, 226, 131, 0.22)");
  fill.addColorStop(1, "rgba(39, 226, 131, 0)");
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();

  const last = coords[coords.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = green;
  ctx.fill();
}

function openRouter() {
  window.open("http://192.168.1.1", "_blank", "noopener");
  showToast(tr("routerOpened"));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  showToast(tr("copied"));
}

function timedFetch(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

function median(values) {
  return percentile(values, 0.5);
}

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
  return sorted[index];
}

function jitter(samples) {
  if (samples.length < 2) return 0;
  const diffs = [];
  for (let i = 1; i < samples.length; i += 1) {
    diffs.push(Math.abs(samples[i] - samples[i - 1]));
  }
  return median(diffs);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
