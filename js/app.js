/* ================================================================
   作品集网站 — 全功能版
   localStorage 存储 + 图片压缩
   ================================================================ */

// ------ 媒体存储 (IndexedDB) ------
const DB = "pf_storage", DB_VER = 2;
function openDB() { return new Promise((r, x) => { const q = indexedDB.open(DB, DB_VER); q.onupgradeneeded = () => { if (!q.result.objectStoreNames.contains("videos")) q.result.createObjectStore("videos"); if (!q.result.objectStoreNames.contains("images")) q.result.createObjectStore("images"); }; q.onsuccess = () => r(q.result); q.onerror = () => x(q.error); }); }
async function dbSet(store, key, blob) { const d = await openDB(); return new Promise((r, x) => { const t = d.transaction(store,"readwrite").objectStore(store); t.put(blob, key); t.transaction.oncomplete = () => r(); t.transaction.onerror = () => x(t.transaction.error); }); }
async function dbGet(store, key) { const d = await openDB(); return new Promise((r) => { const t = d.transaction(store,"readonly").objectStore(store).get(key); t.onsuccess = () => r(t.result); t.onerror = () => r(null); }); }
async function dbDel(store, key) { const d = await openDB(); return new Promise((r) => { const t = d.transaction(store,"readwrite").objectStore(store).delete(key); t.transaction.oncomplete = () => r(); }); }
function rndKey(p) { return p + "_" + Date.now() + "_" + Math.random().toString(36).slice(2,8); }

async function imgToDB(base64) {
  if (!base64 || !base64.startsWith("data:")) return base64;
  try { const r = await fetch(base64); const b = await r.blob(); const k = rndKey("img"); await dbSet("images", k, b); return k; } catch(e) { return base64; }
}
async function imgFromDB(key) {
  if (!key) return "";
  if (key.startsWith("data:")) return key;
  if (key.includes("/")) return key;
  try { const b = await dbGet("images", key); if (b) return URL.createObjectURL(b); } catch(e) {}
  return "";
}
function thumbUrl(path) {
  if (!path || !path.includes("/")) return path;
  const parts = path.split("/");
  parts.splice(parts.length-1, 0, "thumb");
  return parts.join("/");
}
// imgToDB 保留用于兼容旧base64数据
async function imgToDB(base64) {
  if (!base64 || !base64.startsWith("data:")) return base64;
  try { const r = await fetch(base64); const b = await r.blob(); const k = rndKey("img"); await dbSet("images", k, b); return k; } catch(e) { return base64; }
}

const DEFAULT_DATA = {
  "siteName": "PORTFOLIO",
  "hero": {
    "greeting": "Hello, 我是",
    "name": "杨贵东",
    "tagline": "视觉设计师 / AIGC设计师",
    "bgGradient": "linear-gradient(135deg, #0f172a, #334155)"
  },
  "about": {
    "avatar": "img_1780227557724_l4k90z",
    "name": "杨贵东",
    "tagline": "",
    "bio": "",
    "philosophy": "设计理念",
    "philosophyText": "设计不仅仅是美学的表达，更是解决问题的方法。我相信好的设计应该简洁、有力，能够触动人心。",
    "info": {
      "年龄": "24",
      "所在地": "杭州",
      "电话": "15559716426",
      "邮箱": "947480662@qq.com",
      "学历": "本科",
      "专长": "AIGC设计、漫剧制作、视觉美术",
      "工作经历": "2024年7月-2025年1月：昆明安屿设计公司，主要负责平面设计，视觉素材的创建\n2025年3-2026年1月：杭州印迹空间科技，主要负责AI漫剧制作，拆脚本，拆分镜，美术资产（人物角色、空间场景、道具）等的制作\n2026年3月-2026年5月：厦门玛豆传媒有限公司，主要负责短句视频制作，美术资源等制作\n",
      "科研经历": "",
      "获奖": ""
    }
  },
  "categories": [
    "环境设计作品",
    "平面设计作品",
    "AIGC设计作品",
    "AI漫剧作品",
    "其他"
  ],
  "works": [
    {
      "title": "城海之上",
      "category": "环境设计作品",
      "type": "image",
      "images": [
        "images/img110.jpg",
        "images/img112.jpg",
        "images/img114.jpg",
        "images/img116.jpg",
        "images/img118.jpg",
        "images/img120.jpg",
        "images/img122.jpg",
        "images/img124.jpg",
        "images/img126.jpg",
        "images/img128.jpg",
        "images/img130.jpg",
        "images/img132.jpg"
      ],
      "videos": []
    },
    {
      "title": "宿晓",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780298885771_ozr43s",
          "name": "videos/v_1780298885771_ozr43s.mp4"
        }
      ]
    },
    {
      "title": "我和道士 有个约定",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780299002982_txxzjd",
          "name": "videos/v_1780299002982_txxzjd.mp4"
        }
      ]
    },
    {
      "title": "灵牌镇世",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780299016199_9xjzia",
          "name": "videos/v_1780299016199_9xjzia.mp4"
        }
      ]
    },
    {
      "title": "天妇罗",
      "category": "平面设计作品",
      "type": "image",
      "images": [
        "images/img113.jpg",
        "images/img115.jpg",
        "images/img117.jpg",
        "images/img119.jpg",
        "images/img121.jpg",
        "images/img123.jpg",
        "images/img125.jpg",
        "images/img127.jpg",
        "images/img129.jpg"
      ],
      "videos": []
    },
    {
      "title": "AI角色设计",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img131.jpg",
        "images/img133.jpg",
        "images/img135.jpg",
        "images/img137.jpg",
        "images/img139.jpg",
        "images/img141.jpg",
        "images/img143.jpg",
        "images/img145.jpg",
        "images/img147.jpg"
      ],
      "videos": []
    },
    {
      "title": "茶祖AI品牌",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img149.jpg",
        "images/img151.jpg",
        "images/img153.jpg",
        "images/img155.jpg",
        "images/img157.jpg",
        "images/img159.jpg",
        "images/img161.jpg",
        "images/img163.jpg"
      ],
      "videos": []
    },
    {
      "title": "鳄鱼阿力",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img134.jpg",
        "images/img136.jpg",
        "images/img138.jpg",
        "images/img140.jpg",
        "images/img142.jpg"
      ],
      "videos": []
    },
    {
      "title": "鲸智生活",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img144.jpg",
        "images/img146.jpg",
        "images/img148.jpg",
        "images/img150.jpg"
      ],
      "videos": []
    },
    {
      "title": "古墟新生",
      "category": "环境设计作品",
      "type": "image",
      "images": [
        "images/img152.jpg",
        "images/img154.jpg",
        "images/img156.jpg",
        "images/img158.jpg",
        "images/img160.jpg",
        "images/img162.jpg",
        "images/img164.jpg",
        "images/img166.jpg"
      ],
      "videos": []
    },
    {
      "title": "冰雪之乡",
      "category": "环境设计作品",
      "type": "image",
      "images": [
        "images/img168.jpg",
        "images/img170.jpg",
        "images/img172.jpg",
        "images/img174.jpg",
        "images/img176.jpg",
        "images/img178.jpg",
        "images/img180.jpg",
        "images/img182.jpg",
        "images/img184.jpg"
      ],
      "videos": []
    },
    {
      "title": "火车站",
      "category": "环境设计作品",
      "type": "image",
      "images": [
        "images/img186.jpg",
        "images/img188.jpg",
        "images/img190.jpg",
        "images/img192.jpg",
        "images/img194.jpg",
        "images/img196.jpg"
      ],
      "videos": []
    },
    {
      "title": "齐烎烎",
      "category": "平面设计作品",
      "type": "image",
      "images": [
        "images/img198.jpg",
        "images/img200.jpg",
        "images/img202.jpg",
        "images/img204.jpg",
        "images/img206.jpg",
        "images/img208.jpg",
        "images/img210.jpg",
        "images/img212.jpg",
        "images/img214.jpg"
      ],
      "videos": []
    },
    {
      "title": "国风武侠",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780299051958_3uxdk1",
          "name": "videos/v_1780299051958_3uxdk1.mp4"
        }
      ]
    },
    {
      "title": "斩龙少年传奇",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780301766346_gzrbjs",
          "name": "videos/v_1780301766346_gzrbjs.mp4"
        }
      ]
    },
    {
      "title": "侠客行",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780303488378_nnl3iu",
          "name": "videos/v_1780303488378_nnl3iu.mp4"
        }
      ]
    },
    {
      "title": "异次元",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780303530434_qmzuoy",
          "name": "videos/v_1780303530434_qmzuoy.mp4"
        }
      ]
    },
    {
      "title": "韩熙熙品牌设计",
      "category": "平面设计作品",
      "type": "image",
      "images": [
        "images/img216.jpg",
        "images/img218.jpg",
        "images/img220.jpg",
        "images/img222.jpg",
        "images/img224.jpg",
        "images/img226.jpg",
        "images/img228.jpg",
        "images/img230.jpg",
        "images/img232.jpg"
      ],
      "videos": []
    },
    {
      "title": "德州女孩tk",
      "category": "AI漫剧作品",
      "type": "video",
      "images": [],
      "videos": [
        {
          "key": "v_1780306023306_8f4vxx",
          "name": "videos/v_1780306023306_8f4vxx.mp4"
        }
      ]
    },
    {
      "title": "人物角色设计",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img234.jpg",
        "images/img236.jpg",
        "images/img238.jpg",
        "images/img240.jpg"
      ],
      "videos": []
    },
    {
      "title": "游戏道具",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img242.jpg",
        "images/img244.jpg",
        "images/img246.jpg",
        "images/img248.jpg",
        "images/img250.jpg",
        "images/img252.jpg"
      ],
      "videos": []
    },
    {
      "title": "小怪兽",
      "category": "AIGC设计作品",
      "type": "image",
      "images": [
        "images/img254.jpg",
        "images/img256.jpg",
        "images/img258.jpg",
        "images/img260.jpg"
      ],
      "videos": []
    }
  ]
};
// ====== 数据加载 ======
let DATA = JSON.parse(JSON.stringify(DEFAULT_DATA));
try {
  const saved = localStorage.getItem("portfolio_data");
  if (saved) { const d = JSON.parse(saved); if (d && d.hero && d.works) { DATA = d; } }
} catch(e) {}

function saveData() {
  try { localStorage.setItem("portfolio_data", JSON.stringify(DATA)); } catch(e) {}
  return true;
}

// ====== 从云端加载 ======
async function loadFromCloud() {
  // 优先本地data.json（服务器模式），其次GitHub raw
  for (const url of ["/data.json", `https://raw.githubusercontent.com/yangguidong/expert-waddle/main/data.json?t=${Date.now()}`]) {
    try {
      const r = await fetch(url);
      if (r.ok) {
        const cloudData = await r.json();
        if (cloudData && cloudData.hero && cloudData.works && cloudData.works.length > 2) {
          DATA = cloudData;
          return true;
        }
      }
    } catch(e) {}
  }
  return false;
}

// 直接存原始文件到IDB
// 图片压缩后存localStorage
function storeFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        let w = img.width, h = img.height;
        if (w > 1200) { h = h * 1200 / w; w = 1200; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(c.toDataURL("image/jpeg", 0.75));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ====== 视频缩略图 ======
function captureVideoThumb(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    const url = URL.createObjectURL(file);
    video.src = url;
    video.onloadeddata = () => {
      video.currentTime = 1; // 跳到1秒处
    };
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      const w = 400, h = Math.round(video.videoHeight / video.videoWidth * 400) || 300;
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(video, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    video.onerror = () => { URL.revokeObjectURL(url); resolve(""); };
    // 超时回退
    setTimeout(() => { if (url) { URL.revokeObjectURL(url); resolve(""); } }, 5000);
  });
}

// ====== 初始化 ======
document.addEventListener("DOMContentLoaded", () => { initTheme(); initNav(); initEditUI(); renderAll(); });
function renderAll() { renderHero(); renderWorks(); renderAbout(); initScrollReveal(); }

// ------ 主题 ------
function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
  document.getElementById("themeBtn").addEventListener("click", () => {
    const html = document.documentElement; html.classList.add("theme-trans");
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next); localStorage.setItem("theme", next);
    setTimeout(() => html.classList.remove("theme-trans"), 400);
  });
}

// ------ 导航 ------
function initNav() {
  const nav = document.getElementById("navbar"), toggle = document.getElementById("navToggle"), links = document.getElementById("navLinks");
  window.addEventListener("scroll", () => { nav.classList.toggle("scrolled", scrollY > 50); updateActiveNav(); });
  toggle.addEventListener("click", () => { toggle.classList.toggle("open"); links.classList.toggle("open"); });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { toggle.classList.remove("open"); links.classList.remove("open"); }));
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => { const t = document.querySelector(a.getAttribute("href")); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); } }));
}
function updateActiveNav() {
  let cur = "home";
  ["home", "about", "works"].forEach(id => { if (document.getElementById(id)?.getBoundingClientRect().top <= 200) cur = id; });
  document.querySelectorAll(".nav-links a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
}

// ------ Hero ------
function renderHero() {
  const h = DATA.hero;
  document.getElementById("heroGreet").textContent = h.greeting;
  document.getElementById("heroName").textContent = h.name;
  document.getElementById("heroTagline").textContent = h.tagline;
  document.querySelector(".hero").style.background = h.bgGradient;
}

// ------ 作品 ------
function renderWorks() {
  const allCats = [...new Set([...DATA.categories, ...DATA.works.map(w => w.category)])];
  document.getElementById("filterBar").innerHTML = ["全部", ...allCats].map((c, i) => `<button class="filter-btn ${i === 0 ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
  renderWorkCards("全部");
  document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => { document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active")); btn.classList.add("active"); renderWorkCards(btn.dataset.cat); }));
  document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("dblclick", () => {
    if (!document.body.classList.contains("editing")) return;
    const oldName = btn.dataset.cat; if (oldName === "全部") return;
    const newName = prompt("修改分类名称：", oldName);
    if (newName && newName.trim() && newName.trim() !== oldName) {
      const nn = newName.trim(), idx = DATA.categories.indexOf(oldName);
      if (idx >= 0) DATA.categories[idx] = nn;
      DATA.works.forEach(w => { if (w.category === oldName) w.category = nn; });
      saveData(); renderWorks();
    }
  }));
}

function renderWorkCards(category) {
  if (!DATA.works || !DATA.works.length) { document.getElementById("worksGrid").innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--text3);padding:64px">暂无作品</p>'; return; }
  const filtered = category === "全部" ? DATA.works : DATA.works.filter(w => w && w.category === category);
  const grid = document.getElementById("worksGrid");
  if (!filtered.length) { grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--text3);padding:64px">该分类暂无作品</p>'; return; }
  const editing = document.body.classList.contains("editing");
  const phImg = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%231a1a24" width="400" height="300"/><text x="200" y="156" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23444">暂无图片</text></svg>');
  grid.innerHTML = filtered.map(w => {
    const idx = DATA.works.indexOf(w);
    const isVideo = (w.type === "video" || (w.videos && w.videos.length));
    const vidThumb = isVideo && w.videos?.[0]?.thumb;
    let cardThumb;
    if (isVideo && vidThumb) {
      cardThumb = vidThumb; // 视频截图
    } else if (isVideo) {
      cardThumb = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="%23111" width="400" height="300"/><text x="200" y="140" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23a78bfa">▶</text><text x="200" y="180" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23666">视频</text></svg>');
    } else if (w.images?.[0]) {
      cardThumb = w.images[0].startsWith("images/") ? thumbUrl(w.images[0]) : w.images[0];
    } else {
      cardThumb = phImg;
    }
    return `<div class="work-card" data-index="${idx}" data-reveal>
      ${isVideo ? '<div class="work-card-badge">▶ 视频</div>' : ""}
      ${editing ? `<div class="work-card-actions"><button class="edit" data-action="edit-work" data-idx="${idx}">✎</button><button class="del" data-action="del-work" data-idx="${idx}">×</button></div>` : ""}
      <div class="work-card-img-wrap"><img class="work-card-img" src="${cardThumb}" alt="${escHtml(w.title)}" loading="lazy"></div>
      <div class="work-card-body"><span class="work-card-cat">${escHtml(w.category)}</span><h3 class="work-card-title">${escHtml(w.title)}</h3></div>
    </div>`;
  }).join("");
  grid.querySelectorAll(".work-card").forEach(c => c.addEventListener("click", e => { if (!e.target.closest("[data-action]")) openDetail(parseInt(c.dataset.index)); }));
  grid.querySelectorAll("[data-action='edit-work']").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); openWorkEditor(parseInt(b.dataset.idx)); }));
  grid.querySelectorAll("[data-action='del-work']").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); const i = parseInt(b.dataset.idx); if (confirm(`确定删除「${DATA.works[i].title}」？`)) { const w = DATA.works[i]; if (w.videos) w.videos.forEach(v => dbDel("videos",v.key)); DATA.works.splice(i, 1); saveData(); renderWorks(); } }));
  // 异步加载IDB图片/视频缩略图到卡片
  grid.querySelectorAll(".work-card-img").forEach(img => {
    const src = img.getAttribute("src");
    if (src && (src.startsWith("img_") || src.startsWith("data:"))) {
      if (src.startsWith("img_")) imgFromDB(src).then(url => { if (url) img.src = url; });
    }
  });
  initScrollReveal();
}

// ------ 作品编辑器 ------
function openWorkEditor(idx) {
  const w = idx >= 0 ? DATA.works[idx] : { title: "", category: DATA.categories[0] || "其他", type: "image", images: [], videos: [] };
  const isNew = idx < 0;
  const overlay = document.createElement("div"); overlay.className = "edit-modal";
  const catOpts = DATA.categories.map(c => `<option value="${c}" ${w.category === c ? "selected" : ""}>${c}</option>`).join("");
  const defaultType = w.type || "image";

  function buildForm(type) {
    return type === "image"
      ? `<div class="form-group"><label>图片（可多选）</label><div class="img-upload" id="ewImagesUpload">${imagesData.length ? `${imagesData.length} 张` : "点击上传图片"}</div><div id="ewImagesPreview" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"></div><input type="file" accept="image/*" id="ewImagesInput" multiple style="display:none"></div>`
      : `<div class="form-group"><label>视频（可多选）</label><div class="img-upload" id="ewVideosUpload">${videosData.length ? `${videosData.length} 个视频` : "点击上传视频"}</div><div id="ewVideosPreview" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"></div><input type="file" accept="video/*" id="ewVideosInput" multiple style="display:none"></div>
    <div style="font-size:.75rem;color:var(--text3);margin-top:4px">💡 视频存储在浏览器数据库，不占网站空间</div>`;
  }

  let imagesData = [...(w.images || [])], videosData = [...(w.videos || [])], currentType = defaultType;
  overlay.innerHTML = `<div class="edit-modal-content"><h3>${isNew ? "添加作品" : "编辑作品"}</h3>
    <div class="form-group"><label>作品标题 *</label><input id="ewTitle" value="${escAttr(w.title)}" placeholder="输入作品名称"></div>
    <div class="form-group"><label>所属分类</label><select id="ewCategory">${catOpts}</select></div>
    <div class="form-group"><label>作品类型</label><div style="display:flex;gap:10px">
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:8px 16px;border:1px solid ${currentType==='image'?'var(--accent)':'var(--border)'};border-radius:20px;font-size:.85rem"><input type="radio" name="ewType" value="image" ${currentType==='image'?'checked':''} style="display:none">🖼️ 图片</label>
      <label style="display:flex;align-items:center;gap:6px;cursor:pointer;padding:8px 16px;border:1px solid ${currentType==='video'?'var(--accent)':'var(--border)'};border-radius:20px;font-size:.85rem"><input type="radio" name="ewType" value="video" ${currentType==='video'?'checked':''} style="display:none">🎬 视频</label>
    </div></div>
    <div id="ewMediaArea">${buildForm(currentType)}</div>
    <div class="edit-modal-actions"><button class="btn-cancel" id="ewCancel">取消</button><button class="btn-save" id="ewSave">保存</button></div>
  </div>`;
  document.body.appendChild(overlay);

  function refreshImages() { if (currentType !== "image") return; const p = document.getElementById("ewImagesPreview"); if (!p) return; p.innerHTML = imagesData.map((key, i) => `<div style="position:relative;width:70px;height:55px;background:#1a1a24;border-radius:4px"><img data-idx="${i}" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:none"><span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:.7rem;color:#555">🖼️</span><button data-del-img="${i}" style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#dc2626;color:#fff;border:none;font-size:10px;cursor:pointer;z-index:1">×</button></div>`).join(""); document.getElementById("ewImagesUpload").textContent = imagesData.length ? `${imagesData.length} 张` : "点击上传图片"; p.querySelectorAll("[data-del-img]").forEach(b => b.addEventListener("click", () => { const i = parseInt(b.dataset.delImg); dbDel("images", imagesData[i]); imagesData.splice(i, 1); refreshImages(); })); imagesData.forEach((key, i) => { imgFromDB(key).then(url => { if (url) { const img = p.querySelector(`img[data-idx="${i}"]`); if (img) { img.src = url; img.style.display = ""; img.parentElement.querySelector("span").style.display = "none"; } } }); }); }
  function refreshVideos() { if (currentType !== "video") return; const p = document.getElementById("ewVideosPreview"); if (!p) return; p.innerHTML = videosData.map((v, i) => `<div style="position:relative;width:100px;height:60px;background:#000;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:1.5rem">▶<button data-del-vid="${i}" style="position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#dc2626;color:#fff;border:none;font-size:10px;cursor:pointer">×</button></div>`).join(""); document.getElementById("ewVideosUpload").textContent = videosData.length ? `${videosData.length} 个视频` : "点击上传视频"; p.querySelectorAll("[data-del-vid]").forEach(b => b.addEventListener("click", () => { videosData.splice(parseInt(b.dataset.delVid), 1); refreshVideos(); })); }

  function bindMediaEvents() {
    if (currentType === "image") { refreshImages(); const iu = document.getElementById("ewImagesUpload"), ii = document.getElementById("ewImagesInput"); if (iu) iu.onclick = () => ii.click(); if (ii) ii.onchange = async e => { for (const f of e.target.files) { const key = await storeFile(f); imagesData.push(key); refreshImages(); } }; }
    else { refreshVideos(); const vu = document.getElementById("ewVideosUpload"), vi = document.getElementById("ewVideosInput"); if (vu) vu.onclick = () => vi.click(); if (vi) vi.onchange = async e => { for (const f of e.target.files) { const key = "v_" + Date.now() + "_" + Math.random().toString(36).slice(2,8); const thumb = await captureVideoThumb(f); await dbSet("videos",key, f); videosData.push({ key, name: f.name, thumb }); refreshVideos(); } }; }
  }
  bindMediaEvents();

  overlay.querySelectorAll("input[name='ewType']").forEach(r => r.addEventListener("change", () => { currentType = r.value; document.getElementById("ewMediaArea").innerHTML = buildForm(currentType); bindMediaEvents(); }));

  let saved = false;
  document.getElementById("ewSave").addEventListener("click", async () => {
    if (saved) return; saved = true;
    document.getElementById("ewSave").disabled = true; document.getElementById("ewSave").textContent = "保存中...";
    const cat = document.getElementById("ewCategory").value;
    // 清理旧媒体(从IDB删除)
    if (!isNew && w.videos) { for (const v of w.videos) { if (!videosData.find(vd => vd.key === v.key)) await dbDel("videos",v.key); } }
    
    const wData = { title: document.getElementById("ewTitle").value.trim() || "未命名", category: cat, type: currentType, images: currentType === "image" ? imagesData : [], videos: currentType === "video" ? videosData : [] };
    if (isNew) DATA.works.push(wData); else DATA.works[idx] = wData;
    if (cat && !DATA.categories.includes(cat)) DATA.categories.push(cat);
    if (saveData()) { overlay.remove(); renderWorks(); document.getElementById("works").scrollIntoView({ behavior: "smooth" }); toast(isNew ? "作品已添加！" : "已保存", "success"); }
    else { saved = false; document.getElementById("ewSave").disabled = false; document.getElementById("ewSave").textContent = "保存"; }
  });
  document.getElementById("ewCancel").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
}

// ------ 作品详情 ------
async function openDetail(index) {
  const w = DATA.works[index], overlay = document.getElementById("modalOverlay"), modal = document.getElementById("modal");
  const isVideo = w.type === "video" || (w.videos && w.videos.length);
  const allImgs = [...(w.images || [])].filter(Boolean);
  const imgUrls = await Promise.all(allImgs.map(k => imgFromDB(k)));
  const imgHtml = imgUrls.filter(Boolean).map(url => `<img src="${url}" alt="">`).join("");
  // 从IDB加载视频
  let vidHtml = "";
  if (isVideo && w.videos?.length) {
    const vids = [];
    for (const v of w.videos) {
      if (v.key) {
        const blob = await dbGet("videos", v.key);
        if (blob) { vids.push(`<video controls playsinline style="max-width:75vw;border-radius:var(--radius);box-shadow:0 8px 48px rgba(0,0,0,.5)"><source src="${URL.createObjectURL(blob)}" type="video/mp4"></video>`); continue; }
      }
      if (v.name && v.name.includes("/")) {
        vids.push(`<video controls playsinline style="max-width:75vw;border-radius:var(--radius);box-shadow:0 8px 48px rgba(0,0,0,.5)"><source src="${v.name}" type="video/mp4"></video>`);
      }
    }
    vidHtml = vids.join("");
  }

  modal.innerHTML = `<button class="modal-close">&times;</button>
    <div class="modal-scroll" id="modalScroll">
      ${vidHtml}${imgHtml}
      ${!vidHtml && !imgHtml ? '<div style="padding:100px 40px;text-align:center;color:var(--text2)"><div style="font-size:3rem;margin-bottom:16px;opacity:.3">📭</div>暂无内容</div>' : ""}
    </div>
    <div class="modal-body"><h2>${escHtml(w.title)}</h2><div class="meta"><span>${isVideo ? "🎬 视频" : "🖼️ 图片"}</span><span>🏷️ ${escHtml(w.category)}</span></div></div>`;
  modal.querySelector(".modal-close").addEventListener("click", close);
  // 双击图片放大
  modal.querySelectorAll("img").forEach(img => { img.style.cursor = "zoom-in"; img.addEventListener("click", e => { e.stopPropagation(); showZoom(img.src); }); });
  const kh = e => { if (e.key === "Escape") close(); };
  document.addEventListener("keydown", kh); modal._kh = kh;
  overlay.classList.add("open"); document.body.style.overflow = "hidden";
  function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; if (modal._kh) document.removeEventListener("keydown", modal._kh); modal.innerHTML = ""; }
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
}

// ------ 滚轮缩放查看器 ------
function showZoom(src) {
  const zb = document.createElement("div");
  zb.style.cssText = "position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.96);overflow:hidden;animation:fadeIn .2s ease";

  const img = document.createElement("img");
  img.src = src;
  img.style.cssText = "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);max-width:none;cursor:grab;user-select:none;-webkit-user-drag:none";
  img.draggable = false;

  let scale = 1, tx = 0, ty = 0, isDragging = false, startX, startY, startTX, startTY;

  function update() {
    img.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(${scale})`;
  }

  // Fit to screen initially
  img.onload = () => {
    const fitW = window.innerWidth * 0.9, fitH = window.innerHeight * 0.9;
    scale = Math.min(fitW / img.naturalWidth, fitH / img.naturalHeight, 1);
    update();
  };
  // If already loaded (cached)
  if (img.complete) { const fitW = window.innerWidth * 0.9, fitH = window.innerHeight * 0.9; scale = Math.min(fitW / (img.naturalWidth || 1000), fitH / (img.naturalHeight || 800), 1); update(); }

  // 滚轮缩放
  zb.addEventListener("wheel", e => {
    e.preventDefault();
    const rect = img.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width/2;
    const my = e.clientY - rect.top - rect.height/2;
    const oldScale = scale;
    scale *= e.deltaY < 0 ? 1.15 : 1 / 1.15;
    scale = Math.max(0.1, Math.min(10, scale));
    tx = tx * scale / oldScale + mx * (1 - scale / oldScale);
    ty = ty * scale / oldScale + my * (1 - scale / oldScale);
    img.style.cursor = scale > 1.01 ? (scale > 3 ? "zoom-out" : "grab") : "zoom-in";
    update();
  }, { passive: false });

  // 拖拽平移
  zb.addEventListener("mousedown", e => { if (e.target !== img) return; isDragging = true; startX = e.clientX; startY = e.clientY; startTX = tx; startTY = ty; img.style.cursor = "grabbing"; e.preventDefault(); });
  window.addEventListener("mousemove", e => { if (!isDragging) return; tx = startTX + (e.clientX - startX); ty = startTY + (e.clientY - startY); update(); });
  window.addEventListener("mouseup", () => { isDragging = false; img.style.cursor = scale > 1.01 ? "grab" : "zoom-in"; });

  // 双击切换 1:1 / fit
  img.addEventListener("dblclick", e => {
    e.stopPropagation();
    if (Math.abs(scale - 1) < 0.1) { scale = 0.3; tx = 0; ty = 0; } else { scale = 1; tx = 0; ty = 0; }
    img.style.cursor = scale > 1.01 ? "grab" : "zoom-in";
    update();
  });

  // 关闭
  zb.addEventListener("click", e => { if (e.target === zb) zb.remove(); });
  document.addEventListener("keydown", function escZ(e) { if (e.key === "Escape") { zb.remove(); document.removeEventListener("keydown", escZ); } });

  zb.appendChild(img);
  document.body.appendChild(zb);
}

// ------ 关于 ------
function renderAbout() {
  const a = DATA.about;
  const avSrc = a.avatar || "";
  const avEl = document.getElementById("aboutAvatar");
  avEl.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23e5e5e5" width="200" height="200" rx="16"/><text x="100" y="110" text-anchor="middle" font-family="sans-serif" font-size="48">👤</text></svg>');
  if (avSrc) imgFromDB(avSrc).then(url => { if (url) avEl.src = url; });
  document.getElementById("aboutName").textContent = a.name;
  document.getElementById("aboutTagline").textContent = a.tagline;
  document.getElementById("aboutBio").textContent = a.bio || "";
  // 信息卡片
  const phil = document.getElementById("aboutPhilosophy");
  const info = a.info || {};
  const entries = Object.entries(info).filter(([_, v]) => v);
  if (entries.length) {
    phil.innerHTML = `<div class="info-cards">${entries.map(([k, v]) => `<div class="info-card"><span class="info-card-label">${escHtml(k)}</span><span class="info-card-text">${escHtml(v).replace(/\n/g, "<br>")}</span></div>`).join("")}</div>`;
    phil.style.display = "";
  } else {
    phil.style.display = "none";
  }
}

// ====== 编辑UI ======
function initEditUI() {
  const indicator = document.createElement("div"); indicator.className = "edit-indicator"; indicator.textContent = "编辑模式 — 点文字修改 · 双击分类改名 · 工具栏管理 · Esc退出"; document.body.appendChild(indicator);
  const toolbar = document.createElement("div"); toolbar.className = "edit-toolbar";
  toolbar.innerHTML = `<span style="font-size:.8rem;font-weight:600;color:var(--accent);margin-right:6px">✏️</span>
    <button id="ebAddWork" class="et-primary">＋ 作品</button><span class="et-divider"></span>
    <button id="ebEditCat">📂 分类</button><span class="et-divider"></span>
    <button id="ebEditHero">🖼️ 首页</button><button id="ebEditAbout">👤 关于</button><span class="et-divider"></span>
    <button id="ebExport">📥 导出</button><button id="ebImport">📤 导入</button><button id="ebReset" class="et-danger">🔄 重置</button><span class="et-divider"></span>
    <button id="ebExitEdit" class="et-danger">✕ 退出</button><input type="file" id="ebImportFile" accept=".json" style="display:none">`;
  document.body.appendChild(toolbar);
  const entry = document.createElement("button"); entry.id = "editEntry"; entry.className = "edit-entry"; entry.innerHTML = '<span class="icon">✎</span> 编辑网站'; document.body.appendChild(entry);

  function enter() {
    document.body.classList.add("editing"); entry.innerHTML = '<span class="icon">✕</span> 退出编辑';
    addSectionBtns(); renderWorks(); renderAbout();
    setTimeout(() => {
      ["heroGreet", "heroName", "heroTagline", "navLogo", "aboutName", "aboutTagline", "aboutBio"].forEach(id => { const el = document.getElementById(id); if (el) { el.contentEditable = true; el.setAttribute("contenteditable","true"); el.title = "直接修改，回车换行，失焦保存"; el.onblur = saveInline;
        // 强制Enter换行
        el.addEventListener("keydown", function(e) {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            document.execCommand("insertLineBreak");
          }
        });
      } });
    }, 100);
  }
  function exit() {
    document.body.classList.remove("editing"); entry.innerHTML = '<span class="icon">✎</span> 编辑网站'; saveInline();
    document.querySelectorAll("[contenteditable]").forEach(el => { el.removeAttribute("contenteditable"); el.contentEditable = false; });
    removeSectionBtns(); renderWorks(); renderAbout();
  }
  entry.addEventListener("click", () => { document.body.classList.contains("editing") ? exit() : enter(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("editing") && !document.querySelector(".edit-modal")) exit(); });

  document.getElementById("ebAddWork").addEventListener("click", () => openWorkEditor(-1));
  document.getElementById("ebEditCat").addEventListener("click", editCategories);
  document.getElementById("ebEditHero").addEventListener("click", editHero);
  document.getElementById("ebEditAbout").addEventListener("click", editAbout);
  document.getElementById("ebExitEdit").addEventListener("click", exit);
  document.getElementById("ebExport").addEventListener("click", exportData);
  document.getElementById("ebImport").addEventListener("click", () => document.getElementById("ebImportFile").click());
  document.getElementById("ebImportFile").addEventListener("change", importData);
  document.getElementById("ebReset").addEventListener("click", () => { if (confirm("重置所有数据？不可撤销。")) { localStorage.removeItem("portfolio_data"); location.reload(); } });
}

function addSectionBtns() {
  [{ sel: "#home", label: "编辑首页", fn: editHero }, { sel: "#about", label: "编辑关于", fn: editAbout }].forEach(({ sel, label, fn }) => {
    const s = document.querySelector(sel); if (!s) return; s.style.position = "relative";
    const b = document.createElement("button"); b.className = "section-edit-btn"; b.textContent = "✎ " + label; b.addEventListener("click", fn); b.dataset.editSection = "1"; s.appendChild(b);
  });
}
function removeSectionBtns() { document.querySelectorAll("[data-edit-section]").forEach(b => b.remove()); }
function getText(el) {
  if (!el) return "";
  let html = el.innerHTML;
  html = html.replace(/<br\s*\/?>/gi, "\n");
  html = html.replace(/<div>/gi, "\n").replace(/<\/div>/gi, "");
  html = html.replace(/<\/p>/gi, "\n").replace(/<p[^>]*>/gi, "");
  html = html.replace(/<[^>]+>/g, "");
  html = html.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value.replace(/\n+$/, ""); // 去掉末尾多余空行
}
function saveInline() {
  const g = document.getElementById("heroGreet"), n = document.getElementById("heroName"), t = document.getElementById("heroTagline"), l = document.getElementById("navLogo");
  if (g) DATA.hero.greeting = getText(g); if (n) DATA.hero.name = getText(n); if (t) DATA.hero.tagline = getText(t); if (l) DATA.siteName = getText(l);
  const an = document.getElementById("aboutName"), at = document.getElementById("aboutTagline"), ab = document.getElementById("aboutBio");
  if (an) DATA.about.name = getText(an); if (at) DATA.about.tagline = getText(at); if (ab) DATA.about.bio = getText(ab);
  saveData();
  renderAbout();
}

// ------ 分类管理 ------
function editCategories() {
  const cats = [...DATA.categories];
  function renderCats() {
    const list = document.getElementById("catList"); if (!list) return;
    list.innerHTML = cats.map((c, i) => `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-weight:500">${escHtml(c)}</span><span style="font-size:.75rem;color:var(--text3)">${DATA.works.filter(w => w.category === c).length} 个</span>
      <input class="cat-rename" value="${escAttr(c)}" style="width:120px;padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:.8rem;display:none">
      <button class="cat-edit" data-idx="${i}" style="padding:4px 10px;border:1px solid var(--border);border-radius:4px;background:transparent;cursor:pointer;font-size:.75rem;color:var(--text2)">改名</button>
      <button class="cat-del" data-idx="${i}" style="padding:4px 10px;border:1px solid rgba(248,113,113,.4);border-radius:4px;background:transparent;color:#f87171;cursor:pointer;font-size:.75rem">删除</button>
    </div>`).join("");
    list.querySelectorAll(".cat-edit").forEach(b => { b.onclick = () => { const row = b.parentElement, input = row.querySelector(".cat-rename"), span = row.querySelector("span"), i = parseInt(b.dataset.idx); if (input.style.display !== "none") { const nn = input.value.trim(); if (nn && nn !== cats[i]) { const old = cats[i]; cats[i] = nn; DATA.works.forEach(w => { if (w.category === old) w.category = nn; }); } input.style.display = "none"; span.style.display = ""; b.textContent = "改名"; } else { input.style.display = ""; span.style.display = "none"; b.textContent = "确认"; input.focus(); } }; });
    list.querySelectorAll(".cat-del").forEach(b => { b.onclick = () => { const i = parseInt(b.dataset.idx), name = cats[i]; if (DATA.works.some(w => w.category === name) && !confirm(`分类「${name}」下有作品，删除后将归入"其他"。确定？`)) return; DATA.works.forEach(w => { if (w.category === name) w.category = "其他"; }); cats.splice(i, 1); saveCats(); renderCats(); }; });
  }
  function saveCats() { DATA.categories = cats.filter(Boolean); if (!DATA.categories.includes("其他")) DATA.categories.push("其他"); saveData(); renderWorks(); }
  showModal("分类管理", `<div style="margin-bottom:12px;display:flex;gap:8px"><input id="newCatInput" placeholder="新分类名称" style="flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:.85rem;background:var(--bg2);color:var(--text)"><button id="catAddBtn" style="padding:8px 16px;background:var(--accent);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.85rem;white-space:nowrap">＋ 添加</button></div><div id="catList" style="max-height:350px;overflow-y:auto"></div>`, saveCats);
  renderCats();
  document.getElementById("catAddBtn").onclick = () => { const name = document.getElementById("newCatInput").value.trim(); if (!name) return; if (cats.includes(name)) { toast("已存在", "error"); return; } cats.push(name); document.getElementById("newCatInput").value = ""; saveCats(); renderCats(); renderWorks(); };
}

// ------ 编辑弹窗 ------
function editHero() {
  const h = DATA.hero;
  showModal("编辑首页", `<div class="form-group"><label>问候语</label><input id="edGreet" value="${escAttr(h.greeting)}"></div><div class="form-group"><label>姓名</label><input id="edName" value="${escAttr(h.name)}"></div><div class="form-group"><label>标语</label><input id="edTagline" value="${escAttr(h.tagline)}"></div><div class="form-group"><label>背景渐变</label><input id="edBg" value="${escAttr(h.bgGradient)}"></div>`, () => {
    DATA.hero.greeting = document.getElementById("edGreet").value.trim();
    DATA.hero.name = document.getElementById("edName").value.trim();
    DATA.hero.tagline = document.getElementById("edTagline").value.trim();
    DATA.hero.bgGradient = document.getElementById("edBg").value.trim() || DATA.hero.bgGradient;
    saveData(); renderHero();
  });
}
function editAbout() {
  const a = DATA.about;
  const info = a.info || {};
  const fields = ["年龄", "所在地", "电话", "邮箱", "学历", "专长", "工作经历", "科研经历", "获奖"];
  const multiLine = ["工作经历","科研经历","获奖"];
  const infoHtml = fields.map(k => {
    if (multiLine.includes(k)) {
      return `<div class="form-group" style="margin-bottom:8px"><label>${k}</label><textarea id="edInfo_${k}" rows="3" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:6px;font-family:var(--font);font-size:.9rem;background:var(--bg2);color:var(--text);resize:vertical">${escHtml(info[k] || "")}</textarea></div>`;
    }
    return `<div class="form-group" style="margin-bottom:8px"><label>${k}</label><input id="edInfo_${k}" value="${escAttr(info[k] || "")}" style="width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:6px;font-family:var(--font);font-size:.9rem;background:var(--bg2);color:var(--text)}"></div>`;
  }).join("");
  showModal("编辑关于", `<div class="form-group"><label>头像</label><input id="edAvatar" value="${escAttr(a.avatar || "")}" placeholder="留空用默认"><div class="img-upload" id="edAvatarUp" style="margin-top:8px">点击上传头像</div><input type="file" accept="image/*" id="edAvatarIn" style="display:none"></div><div class="form-group"><label>姓名</label><input id="edName" value="${escAttr(a.name)}"></div><div class="form-group"><label>标语</label><input id="edTagline" value="${escAttr(a.tagline)}"></div><div class="form-group"><label>简介</label><textarea id="edBio" rows="2">${escHtml(a.bio)}</textarea></div><div style="border-top:1px solid var(--border);padding-top:12px;margin-top:4px;font-size:.8rem;font-weight:600;color:var(--text3);margin-bottom:12px">📋 详细信息</div>${infoHtml}`, () => {
    DATA.about.name = document.getElementById("edName").value.trim();
    DATA.about.tagline = document.getElementById("edTagline").value.trim();
    DATA.about.bio = document.getElementById("edBio").value.trim();
    DATA.about.info = DATA.about.info || {};
    fields.forEach(k => { DATA.about.info[k] = document.getElementById("edInfo_" + k).value; });
    saveData(); renderAbout();
  });
  document.getElementById("edAvatarUp").onclick = () => document.getElementById("edAvatarIn").click();
  document.getElementById("edAvatarIn").onchange = async e => { const f = e.target.files[0]; if (!f) return; DATA.about.avatar = await storeFile(f); saveData(); renderAbout(); document.getElementById("edAvatarUp").textContent = "✓ 已选择"; };
}
function showModal(title, body, onSave) {
  const overlay = document.createElement("div"); overlay.className = "edit-modal";
  overlay.innerHTML = `<div class="edit-modal-content"><h3>${title}</h3>${body}<div class="edit-modal-actions"><button class="btn-cancel" id="emCancel">取消</button><button class="btn-save" id="emSave">保存</button></div></div>`;
  document.body.appendChild(overlay);
  document.getElementById("emCancel").onclick = () => overlay.remove();
  document.getElementById("emSave").onclick = () => { onSave(); overlay.remove(); };
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
}

// ------ 导入导出 ------
function exportData() { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(DATA)], { type: "application/json" })); a.download = "portfolio-" + new Date().toISOString().slice(0, 10) + ".json"; a.click(); toast("已导出", "success"); }
function importData(e) { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { const d = JSON.parse(r.result); if (!d.hero || !d.works) throw Error("bad"); DATA = d; saveData(); location.reload(); } catch(e) { toast("格式不正确", "error"); } }; r.readAsText(f); e.target.value = ""; }

// ------ 工具 ------
function escHtml(s) { if (!s) return ""; const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return escHtml(s).replace(/"/g, "&quot;"); }
function toast(msg, type, dur = 3000) { const el = document.createElement("div"); el.className = `toast ${type}`; el.textContent = msg; document.getElementById("toastContainer").appendChild(el); setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateX(50px)"; el.style.transition = ".3s"; setTimeout(() => el.remove(), 400); }, dur); }
function initScrollReveal() { const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } }); }, { threshold: 0.15 }); document.querySelectorAll("[data-reveal]").forEach(el => obs.observe(el)); }
