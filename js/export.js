// 完整导出 - 包含IDB图片
window.doExport = async function() {
  const btn = document.getElementById("syncBtn");
  if (!btn || btn.dataset.busy === "1") return;
  btn.dataset.busy = "1";
  btn.textContent = "⏳ 准备...";
  btn.disabled = true;

  try {
    const d = localStorage.getItem("portfolio_data");
    if (!d) { btn.textContent = "❌ 无数据"; btn.dataset.busy = "0"; return; }
    const data = JSON.parse(d);
    btn.textContent = "⏳ 扫描数据库...";

    // 打开IDB
    const db = await new Promise((ok, fail) => {
      const names = ["pf_storage", "pf_videos", "portfolio_videos"];
      let idx = 0;
      function tryNext() {
        if (idx >= names.length) { fail(new Error("no db found")); return; }
        const r = indexedDB.open(names[idx], 2);
        r.onsuccess = () => ok(r.result);
        r.onerror = () => { idx++; tryNext(); };
        r.onblocked = () => { idx++; tryNext(); };
        setTimeout(() => { idx++; tryNext(); }, 2000);
      }
      tryNext();
    });

    if (db.objectStoreNames.contains("images")) {
      btn.textContent = "⏳ 导出图片...";
      let total = 0, done = 0;
      for (const w of data.works || []) {
        for (const img of (w.images || [])) {
          if (img && typeof img === "string" && img.startsWith("img_") && !img.includes("/")) total++;
        }
      }
      for (const w of data.works || []) {
        for (let i = 0; i < (w.images || []).length; i++) {
          const key = w.images[i];
          if (!key || typeof key !== "string" || key.includes("/") || key.startsWith("data:")) continue;
          try {
            const t = db.transaction("images", "readonly").objectStore("images");
            const blob = await new Promise(r => { const req = t.get(key); req.onsuccess = () => r(req.result); req.onerror = () => r(null); });
            if (blob) {
              w.images[i] = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(blob); });
            }
            done++;
            if (total > 0) btn.textContent = `⏳ 导出图片 ${done}/${total}...`;
          } catch(e) { btn.textContent = `跳过错误: ${e.message}`; }
        }
      }
    }
    db.close();

    btn.textContent = "📥 下载中...";
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "full_sync.json";
    a.click();
    btn.textContent = "✅ 完成！文件已下载";
    setTimeout(() => btn.remove(), 3000);
  } catch(e) {
    btn.textContent = "❌ 失败: " + e.message;
    btn.dataset.busy = "0";
    btn.disabled = false;
  }
};

// 显示导出按钮
setTimeout(() => {
  const d = localStorage.getItem("portfolio_data");
  if (d && d.length > 500) {
    const btn = document.getElementById("syncBtn");
    if (btn) btn.style.display = "block";
  }
}, 1000);
