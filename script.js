const searchInput = document.getElementById("searchInput");
const boxes = document.querySelectorAll("details");

/* Arabic -> English brand mapping */
const brandMap = {
 ستارسات: "starsat",
 "ستار سات": "starsat",
 ستارسـات: "starsat",

 تايجر: "tiger",
 تيجر: "tiger",

 كيوماكس: "qmax",
 "كيو ماكس": "qmax",

 ترومان: "truman",
 فورتك: "fortec",
 هيرشمان: "hershman",
 سكاي: "sky",
 ديسكفري: "discovery",
 افاتار: "avatar",
 افيتار: "avatar",
 استرا: "astra",
 كامكس: "camex",
 ريدبوكس: "redbox",
 نيوماكس: "newmax",
 تارجت: "target",
 جاكوار: "jaguar",
 جاغوار: "jaguar",
};

/* Normalize Arabic & English */
function normalize(str) {
 return str.toLowerCase().replace(/\s+/g, "").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي");
}

searchInput.addEventListener("input", function () {
 const raw = this.value.trim();
 if (!raw) {
  boxes.forEach((b) => (b.style.display = "block"));
  return;
 }

 let searchValue = normalize(raw);

 /* If Arabic brand detected, add English equivalent */
 let englishEquivalent = "";
 for (let key in brandMap) {
  if (searchValue.includes(normalize(key))) {
   englishEquivalent = brandMap[key];
   break;
  }
 }

 boxes.forEach((box) => {
  let text = normalize(box.innerText);

  if (text.includes(searchValue) || (englishEquivalent && text.includes(englishEquivalent))) {
   box.style.display = "block";
  } else {
   box.style.display = "none";
  }
 });
});

//
const openBtn = document.getElementById("openForm");
const closeBtn = document.getElementById("closeForm");
const form = document.getElementById("deviceForm");
const sendBtn = document.getElementById("sendBtn");

openBtn.onclick = () => (form.style.display = "flex");
closeBtn.onclick = () => (form.style.display = "none");

sendBtn.onclick = () => {
 const model = document.getElementById("model").value;
 const software = document.getElementById("software").value;
 const notes = document.getElementById("notes").value;

 const text = "Device: " + model + "%0A" + "Software type: " + software + "%0A" + "Notes: " + notes;

 window.open("https://wa.me/201210913547?text=" + text, "_blank");
};

//copy steps
document.querySelectorAll("details .steps ol").forEach((ol) => {
 const btn = document.createElement("button");
 btn.className = "copy-all";
 btn.innerHTML = "<span>📋</span> نسخ الخطوات";

 btn.onclick = () => {
  let text = "";
  ol.querySelectorAll("li").forEach((li, i) => {
   text += i + 1 + "- " + li.innerText.trim() + "\n";
  });

  navigator.clipboard.writeText(text);

  btn.innerHTML = "✅ تم النسخ";
  setTimeout(() => {
   btn.innerHTML = "<span>📋</span> نسخ الخطوات";
  }, 1500);
 };

 ol.after(btn);
});