/* ================================================================
   作品集网站 — 数据管理 + 渲染 + 编辑器
   ================================================================ */

// ===== 1. Store 数据层 =====
var STORE_KEY = 'portfolio_data';

function getDefaultData() {
  return {
    profile: {
      name: '张三',
      tagline: '用设计连接人与自然 · 创造可持续的美好空间',
      avatar: '',
      bio: '我是一名环境设计专业的大三学生，就读于 XX 大学艺术与设计学院。热爱将自然元素融入空间设计，致力于探索人与环境和谐共生的可能性。在校期间系统学习了景观设计、室内设计、城市规划等核心课程，具备扎实的设计理论基础与实践能力。\n\n熟练使用 AutoCAD、SketchUp、Rhino、Lumion、Adobe 系列等设计工具，能够独立完成从概念构思到方案呈现的全流程设计工作。',
      school: 'XX 大学 · 环境设计专业',
      grade: '大三 · 2023级',
      skills: 'AutoCAD / SketchUp / Rhino / Lumion / PS / AI',
      interests: '景观设计 · 可持续设计 · 城市更新'
    },
    competitions: [
      { id: 'c1', date: '2025.10', title: '全国高校环境设计大赛 — 银奖', tag: '景观设计', desc: '作品《城市绿洲——社区公园改造设计》在全国500余件参赛作品中脱颖而出，以"微更新"理念对老旧社区公共空间进行改造，获得评委一致好评。' },
      { id: 'c2', date: '2025.06', title: '园冶杯大学生国际竞赛 — 荣誉奖', tag: '景观规划', desc: '参赛作品《水岸再生——滨河生态廊道规划设计》，以生态修复为核心，构建了集防洪、休闲、生态教育于一体的滨水公共空间体系。' },
      { id: 'c3', date: '2024.12', title: '学院空间设计竞赛 — 一等奖', tag: '室内设计', desc: '以《流动与共生——教学楼中庭改造方案》获得学院年度设计竞赛第一名，方案被学院采纳作为中庭改造参考方案。' },
      { id: 'c4', date: '2024.05', title: '全国绿色建筑设计竞赛 — 三等奖', tag: '绿色建筑', desc: '团队作品《呼吸之间——低碳校园建筑群设计》聚焦被动式节能策略，通过建筑朝向、自然通风、立体绿化等手段实现建筑节能目标。' }
    ],
    projects: [
      { id: 'p1', title: '城市绿洲', subtitle: '社区公园改造设计', category: 'landscape', desc: '本项目以"微更新"为核心理念，对老旧社区的公共空间进行改造升级。设计保留了场地原有的树木和地形特征，通过引入雨水花园、透水铺装等生态措施，将原本功能单一的绿地转变为集休闲、健身、社交于一体的社区公园。方案注重适老化与儿童友好设计，设置了无障碍通道、老人活动区和儿童游乐区，充分考虑不同年龄段居民的使用需求。植物配置采用本土物种，降低养护成本的同时提升生态效益。', image: '', catLabel: '景观设计', award: '全国高校环境设计大赛 银奖' },
      { id: 'p2', title: '水岸再生', subtitle: '滨河生态廊道规划设计', category: 'landscape', desc: '项目位于城市近郊河道沿岸，场地面临水质污染、岸线硬质化、生态功能退化等问题。设计以生态修复为核心策略，采用"退堤还滩"的方式恢复自然岸线，构建多层级的滨水植被缓冲带。方案结合海绵城市理念，设置雨水湿地、生态浮岛等设施，在提升防洪能力的同时创造丰富的亲水空间。沿河布置了慢行系统、观景平台和环境教育节点，将生态功能与公共休闲有机结合。', image: '', catLabel: '景观设计', award: '园冶杯大学生国际竞赛 荣誉奖' },
      { id: 'p3', title: '流动与共生', subtitle: '教学楼中庭改造方案', category: 'interior', desc: '改造对象为学院教学楼内一处利用率低下的中庭空间。设计以"流动"和"共生"为概念，打破原有方正封闭的格局，通过曲线路径引导人流，创造灵活可变的多功能区域。引入大量绿植墙和天窗采光，模糊室内外界限，营造"在自然中学习"的氛围。设置了可移动家具和模块化展板，使空间可根据展览、评图、交流等不同场景灵活调整。', image: '', catLabel: '室内设计', award: '学院空间设计竞赛 一等奖' },
      { id: 'p4', title: '光之容器', subtitle: '图书馆阅读空间设计', category: 'interior', desc: '以"光"为设计主题的图书馆阅读空间方案。通过分析场地日照条件，精确控制开窗位置与大小，使自然光在不同时段以不同角度进入室内，形成丰富的光影变化。空间分为深度阅读区、休闲阅读区和交流讨论区，各区通过半透明隔断柔化边界。材料上选用木材和暖色调饰面，营造温馨沉静的阅读氛围。顶部设有一系列采光井，被设计成"光的容器"，将日光过滤后均匀洒入中庭。', image: '', catLabel: '室内设计', award: '课程设计作品' },
      { id: 'p5', title: '呼吸之间', subtitle: '低碳校园建筑群设计', category: 'urban', desc: '团队项目，以低碳可持续为目标的校园建筑群方案。设计从建筑朝向、体形系数、自然通风、立体绿化四个方面入手，采用被动式节能策略降低能耗。建筑群呈院落式布局，通过风道设计引导夏季主导风进入室内，冬季则利用阳光房蓄热。屋顶设置光伏板和雨水收集系统，立面采用垂直绿化降低热岛效应。方案预计可实现综合节能率35%以上。', image: '', catLabel: '城市设计', award: '全国绿色建筑设计竞赛 三等奖' },
      { id: 'p6', title: '街巷新生', subtitle: '历史街区微更新设计', category: 'urban', desc: '选取城市老城区一处历史街区为研究对象，在保护原有街巷肌理和建筑风貌的前提下，以"微更新"手法提升公共空间品质。设计策略包括：活化街角消极空间为口袋公园、梳理巷道步行系统、引入社区菜园和共享工坊等新功能。方案注重公众参与，设计了分阶段实施路径，避免大拆大建，力求在保护与发展之间找到平衡点。', image: '', catLabel: '城市设计', award: '课程设计作品' }
    ],
    contact: {
      email: 'zhangsan@example.com',
      phone: '138-xxxx-xxxx',
      address: 'XX 大学艺术与设计学院'
    }
  };
}

function loadData() {
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // corrupted data — fall through
  }
  var def = getDefaultData();
  saveData(def);
  return def;
}

function saveData(data) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch (e) {
    showToast('保存失败：存储空间不足，请清理旧数据', 'error');
  }
}

function resetData() {
  localStorage.removeItem(STORE_KEY);
  var def = getDefaultData();
  saveData(def);
  return def;
}

function exportData(data) {
  var json = JSON.stringify(data, null, 2);
  var blob = new Blob([json], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio-backup-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importData(jsonStr) {
  var data = JSON.parse(jsonStr);
  // basic validation
  if (!data.profile || !data.competitions || !data.projects || !data.contact) {
    throw new Error('数据格式不正确');
  }
  saveData(data);
  return data;
}

// ===== 2. 全局状态 =====
var store = loadData();
var editMode = false;
var currentFilter = 'all';

// ===== 3. Render 渲染模块 =====

// 生成渐变背景色
function getGradient(i) {
  var gradients = [
    'linear-gradient(135deg, #B7E4C7, #95D5B2)',
    'linear-gradient(135deg, #A8DADC, #74C69D)',
    'linear-gradient(135deg, #D8E2DC, #BECFC2)',
    'linear-gradient(135deg, #E8D5C4, #D4B896)',
    'linear-gradient(135deg, #C5D8D1, #95B8A6)',
    'linear-gradient(135deg, #DDD5C9, #B8A89A)',
    'linear-gradient(135deg, #B8D4E3, #8DB6CE)',
    'linear-gradient(135deg, #E0D5C7, #C4B49F)'
  ];
  return gradients[i % gradients.length];
}

function renderProfile() {
  var p = store.profile;
  document.getElementById('heroName').textContent = p.name;
  document.getElementById('heroTagline').textContent = p.tagline;
  document.getElementById('navLogo').textContent = p.name ? p.name + ' · PORTFOLIO' : 'PORTFOLIO';
  document.title = (p.name || '') + ' - 环境设计作品集';

  var avatarHtml = '';
  if (p.avatar) {
    avatarHtml = '<img src="' + p.avatar + '" alt="个人照片">';
  }
  document.getElementById('aboutContainer').innerHTML =
    '<div class="about-image">' +
      '<div class="about-avatar' + (p.avatar ? ' has-image' : '') + '" id="avatarUpload">' + avatarHtml + '</div>' +
    '</div>' +
    '<div class="about-text">' +
      '<h3>你好，我是' + escHtml(p.name) + '</h3>' +
      '<p>' + escHtml(p.bio).replace(/\n/g, '<br>') + '</p>' +
      '<div class="about-info">' +
        '<div class="info-item"><span class="info-label">学校</span><span>' + escHtml(p.school) + '</span></div>' +
        '<div class="info-item"><span class="info-label">年级</span><span>' + escHtml(p.grade) + '</span></div>' +
        '<div class="info-item"><span class="info-label">技能</span><span>' + escHtml(p.skills) + '</span></div>' +
        '<div class="info-item"><span class="info-label">兴趣方向</span><span>' + escHtml(p.interests) + '</span></div>' +
      '</div>' +
    '</div>';

  if (editMode) {
    var avatarEl = document.getElementById('avatarUpload');
    if (avatarEl) {
      avatarEl.addEventListener('click', function() { openProfileEdit(); });
    }
  }
}

function renderCompetitions() {
  var list = store.competitions;
  var container = document.getElementById('timelineContainer');

  if (list.length === 0) {
    container.innerHTML = '<div class="timeline-empty">暂无竞赛记录，点击上方 + 按钮添加</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    html +=
      '<div class="timeline-item">' +
        '<div class="timeline-dot"></div>' +
        '<div class="timeline-card">' +
          (editMode ?
            '<div class="card-actions">' +
              '<button class="card-edit-btn" data-action="edit-competition" data-id="' + c.id + '" title="编辑">' +
                '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
              '</button>' +
              '<button class="card-del-btn" data-action="del-competition" data-id="' + c.id + '" title="删除">' +
                '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
              '</button>' +
            '</div>'
          : '') +
          '<span class="timeline-date">' + escHtml(c.date) + '</span>' +
          '<h3>' + escHtml(c.title) + '</h3>' +
          '<p>' + escHtml(c.desc) + '</p>' +
          '<span class="timeline-tag">' + escHtml(c.tag) + '</span>' +
        '</div>' +
      '</div>';
  }
  container.innerHTML = html;
}

function renderProjects() {
  var list = store.projects;

  // filters
  var categories = [];
  var seen = {};
  for (var i = 0; i < list.length; i++) {
    var cat = list[i].category;
    if (!seen[cat]) {
      seen[cat] = true;
      categories.push(cat);
    }
  }

  var catLabels = { landscape: '景观设计', interior: '室内设计', urban: '城市设计' };
  var filterHtml = '<button class="filter-btn' + (currentFilter === 'all' ? ' active' : '') + '" data-filter="all">全部</button>';
  for (var j = 0; j < categories.length; j++) {
    var c = categories[j];
    filterHtml += '<button class="filter-btn' + (currentFilter === c ? ' active' : '') + '" data-filter="' + c + '">' + (catLabels[c] || c) + '</button>';
  }
  document.getElementById('filterContainer').innerHTML = filterHtml;

  // grid
  var grid = document.getElementById('worksGrid');
  if (list.length === 0) {
    grid.innerHTML = '<div class="works-empty">暂无作品，点击上方 + 按钮添加</div>';
    return;
  }

  var html = '';
  for (var k = 0; k < list.length; k++) {
    var p = list[k];
    var hidden = (currentFilter !== 'all' && p.category !== currentFilter) ? ' hidden' : '';
    var imgStyle = '';
    if (p.image) {
      imgStyle = 'background-image: url(' + p.image + ');';
    } else {
      imgStyle = 'background: ' + getGradient(k) + ';';
    }

    html +=
      '<div class="work-card' + hidden + '" data-category="' + p.category + '">' +
        (editMode ?
          '<div class="card-actions">' +
            '<button class="card-edit-btn" data-action="edit-project" data-id="' + p.id + '" title="编辑">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
            '</button>' +
            '<button class="card-del-btn" data-action="del-project" data-id="' + p.id + '" title="删除">' +
              '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
            '</button>' +
          '</div>'
        : '') +
        '<div class="work-img"' + (p.image ? ' style="cursor:pointer"' : '') + '>' +
          '<div class="work-img-bg" style="' + imgStyle + '"></div>' +
          '<div class="work-overlay">' +
            '<h3>' + escHtml(p.title) + '</h3>' +
            '<p>' + escHtml(p.subtitle) + '</p>' +
            '<button class="work-view" data-id="' + p.id + '">查看详情</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
  grid.innerHTML = html;
}

function renderContact() {
  var c = store.contact;
  document.getElementById('contactInfo').innerHTML =
    '<p>如果你对我的作品感兴趣，或希望进一步交流合作，欢迎随时联系我。</p>' +
    '<div class="contact-list">' +
      '<div class="contact-item">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
        '<span>' + escHtml(c.email) + '</span>' +
      '</div>' +
      '<div class="contact-item">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
        '<span>' + escHtml(c.phone) + '</span>' +
      '</div>' +
      '<div class="contact-item">' +
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        '<span>' + escHtml(c.address) + '</span>' +
      '</div>' +
    '</div>';

  document.getElementById('footerText').textContent =
    '© ' + new Date().getFullYear() + ' ' + (store.profile.name || '') + ' · 环境设计作品集';
}

function renderAll() {
  renderProfile();
  renderCompetitions();
  renderProjects();
  renderContact();
  bindWorkViewEvents();
  bindFilterEvents();
  if (editMode) {
    bindCardActions();
  }
}

// ===== 4. 辅助函数 =====
function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function genId() {
  return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function showToast(msg, type) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast ' + (type || '');
  // force reflow
  toast.offsetHeight;
  toast.classList.add('show');
  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(function() {
    toast.classList.remove('show');
  }, 2200);
}

// ===== 5. 编辑模式 =====
function setEditMode(on) {
  editMode = on;
  if (on) {
    document.body.classList.add('edit-mode');
    document.getElementById('editBar').classList.add('active');
    document.getElementById('gearBtn').classList.add('active');
  } else {
    document.body.classList.remove('edit-mode');
    document.getElementById('editBar').classList.remove('active');
    document.getElementById('gearBtn').classList.remove('active');
  }
  renderAll();
}

document.getElementById('gearBtn').addEventListener('click', function() {
  setEditMode(!editMode);
});

document.getElementById('btnExitEdit').addEventListener('click', function() {
  setEditMode(false);
});

// ===== 6. 通用编辑弹窗 =====
var editModal = document.getElementById('editModal');
var editForm = document.getElementById('editForm');
var editModalTitle = document.getElementById('editModalTitle');

function openEditModal(title, fields, onSave) {
  editModalTitle.textContent = title;
  var html = '';
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    html += '<div class="edit-form-group">';
    html += '<label>' + f.label + '</label>';
    if (f.type === 'textarea') {
      html += '<textarea name="' + f.name + '" rows="' + (f.rows || 4) + '">' + escHtml(f.value || '') + '</textarea>';
    } else if (f.type === 'select') {
      html += '<select name="' + f.name + '">';
      for (var j = 0; j < f.options.length; j++) {
        var opt = f.options[j];
        html += '<option value="' + opt.value + '"' + (opt.value === f.value ? ' selected' : '') + '>' + opt.label + '</option>';
      }
      html += '</select>';
    } else if (f.type === 'image') {
      html +=
        '<div class="img-upload-area' + (f.value ? ' has-image' : '') + '" id="upload_' + f.name + '">' +
          (f.value ? '<img class="img-upload-preview" src="' + f.value + '" alt="">' : '<div class="img-upload-placeholder"><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>点击上传图片</span></div>') +
          '<button class="img-upload-remove" type="button" id="remove_' + f.name + '">&times;</button>' +
          '<input type="file" accept="image/*" style="display:none" id="file_' + f.name + '">' +
        '</div>';
    } else {
      html += '<input type="' + (f.type || 'text') + '" name="' + f.name + '" value="' + escHtml(f.value || '') + '">';
    }
    html += '</div>';
  }

  html +=
    '<div class="edit-form-actions">' +
      '<button type="button" class="btn-cancel edit-cancel">取消</button>' +
      '<button type="submit" class="btn-primary">保存</button>' +
    '</div>';

  editForm.innerHTML = html;
  editModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // image upload setup
  for (var k = 0; k < fields.length; k++) {
    if (fields[k].type === 'image') {
      setupImageUpload(fields[k].name, fields[k].value);
    }
  }

  // cancel
  editForm.querySelector('.edit-cancel').addEventListener('click', closeEditModal);

  // submit
  editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var values = {};
    var inputs = editForm.querySelectorAll('input, textarea, select');
    for (var m = 0; m < inputs.length; m++) {
      var inp = inputs[m];
      if (inp.type === 'file') continue;
      values[inp.name] = inp.value;
    }
    // pick up image values
    for (var n = 0; n < fields.length; n++) {
      if (fields[n].type === 'image') {
        values[fields[n].name] = currentImageValues[fields[n].name] || '';
      }
    }
    onSave(values);
    closeEditModal();
  });
}

var currentImageValues = {};

function setupImageUpload(fieldName, initialValue) {
  currentImageValues[fieldName] = initialValue || '';

  var area = document.getElementById('upload_' + fieldName);
  var fileInput = document.getElementById('file_' + fieldName);
  var removeBtn = document.getElementById('remove_' + fieldName);

  if (!area || !fileInput) return;

  area.addEventListener('click', function(e) {
    if (e.target === removeBtn) return;
    fileInput.click();
  });

  fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('图片不能超过5MB，请压缩后重试', 'error');
      return;
    }
    var reader = new FileReader();
    reader.onload = function(ev) {
      var base64 = ev.target.result;
      // compress if > 2MB
      if (base64.length > 2 * 1024 * 1024) {
        compressImageToBase64(base64, 800, function(compressed) {
          setImagePreview(fieldName, compressed, area);
        });
      } else {
        setImagePreview(fieldName, base64, area);
      }
    };
    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageValues[fieldName] = '';
    area.classList.remove('has-image');
    area.innerHTML =
      '<div class="img-upload-placeholder"><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>点击上传图片</span></div>' +
      '<button class="img-upload-remove" type="button" id="remove_' + fieldName + '">&times;</button>' +
      '<input type="file" accept="image/*" style="display:none" id="file_' + fieldName + '">';
    // re-bind
    setupImageUpload(fieldName, '');
  });
}

function setImagePreview(fieldName, base64, area) {
  currentImageValues[fieldName] = base64;
  area.classList.add('has-image');
  area.innerHTML =
    '<img class="img-upload-preview" src="' + base64 + '" alt="">' +
    '<button class="img-upload-remove" type="button" id="remove_' + fieldName + '">&times;</button>' +
    '<input type="file" accept="image/*" style="display:none" id="file_' + fieldName + '">';
  setupImageUpload(fieldName, base64);
}

function compressImageToBase64(dataUrl, maxSize, callback) {
  var img = new Image();
  img.onload = function() {
    var canvas = document.createElement('canvas');
    var w = img.width;
    var h = img.height;
    if (w > maxSize || h > maxSize) {
      if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
      else { w = Math.round(w * maxSize / h); h = maxSize; }
    }
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    callback(canvas.toDataURL('image/jpeg', 0.8));
  };
  img.src = dataUrl;
}

function closeEditModal() {
  editModal.classList.remove('open');
  document.body.style.overflow = '';
  currentImageValues = {};
}

// ===== 7. 个人信息编辑 =====
function openProfileEdit() {
  var p = store.profile;
  openEditModal('编辑个人信息', [
    { name: 'name', label: '姓名', value: p.name },
    { name: 'tagline', label: '个人标语', value: p.tagline },
    { name: 'bio', label: '个人简介', type: 'textarea', rows: 5, value: p.bio },
    { name: 'school', label: '学校/专业', value: p.school },
    { name: 'grade', label: '年级', value: p.grade },
    { name: 'skills', label: '技能', value: p.skills },
    { name: 'interests', label: '兴趣方向', value: p.interests },
    { name: 'avatar', label: '个人照片', type: 'image', value: p.avatar }
  ], function(values) {
    store.profile.name = values.name;
    store.profile.tagline = values.tagline;
    store.profile.bio = values.bio;
    store.profile.school = values.school;
    store.profile.grade = values.grade;
    store.profile.skills = values.skills;
    store.profile.interests = values.interests;
    store.profile.avatar = values.avatar;
    saveData(store);
    renderAll();
    showToast('个人信息已更新', 'success');
  });
}

function openContactEdit() {
  var c = store.contact;
  openEditModal('编辑联系方式', [
    { name: 'email', label: '邮箱', type: 'email', value: c.email },
    { name: 'phone', label: '电话', value: c.phone },
    { name: 'address', label: '地址', value: c.address }
  ], function(values) {
    store.contact.email = values.email;
    store.contact.phone = values.phone;
    store.contact.address = values.address;
    saveData(store);
    renderAll();
    showToast('联系方式已更新', 'success');
  });
}

// ===== 8. 竞赛编辑 =====
function openCompetitionEdit(compId) {
  var comp = null;
  var titleText = '添加竞赛';
  if (compId) {
    for (var i = 0; i < store.competitions.length; i++) {
      if (store.competitions[i].id === compId) { comp = store.competitions[i]; break; }
    }
    titleText = '编辑竞赛';
  }

  openEditModal(titleText, [
    { name: 'date', label: '日期（如 2025.10）', value: comp ? comp.date : '' },
    { name: 'title', label: '标题', value: comp ? comp.title : '' },
    { name: 'tag', label: '标签（如 景观设计）', value: comp ? comp.tag : '' },
    { name: 'desc', label: '描述', type: 'textarea', rows: 4, value: comp ? comp.desc : '' }
  ], function(values) {
    if (compId) {
      for (var j = 0; j < store.competitions.length; j++) {
        if (store.competitions[j].id === compId) {
          store.competitions[j].date = values.date;
          store.competitions[j].title = values.title;
          store.competitions[j].tag = values.tag;
          store.competitions[j].desc = values.desc;
          break;
        }
      }
    } else {
      store.competitions.push({
        id: genId(),
        date: values.date,
        title: values.title,
        tag: values.tag,
        desc: values.desc
      });
    }
    saveData(store);
    renderAll();
    showToast(compId ? '竞赛已更新' : '竞赛已添加', 'success');
  });
}

// ===== 9. 作品编辑 =====
function openProjectEdit(projId) {
  var proj = null;
  var titleText = '添加作品';
  if (projId) {
    for (var i = 0; i < store.projects.length; i++) {
      if (store.projects[i].id === projId) { proj = store.projects[i]; break; }
    }
    titleText = '编辑作品';
  }

  openEditModal(titleText, [
    { name: 'title', label: '作品名称', value: proj ? proj.title : '' },
    { name: 'subtitle', label: '副标题', value: proj ? proj.subtitle : '' },
    { name: 'image', label: '封面图片', type: 'image', value: proj ? proj.image : '' },
    { name: 'category', label: '分类', type: 'select', value: proj ? proj.category : 'landscape',
      options: [
        { value: 'landscape', label: '景观设计' },
        { value: 'interior', label: '室内设计' },
        { value: 'urban', label: '城市设计' }
      ]
    },
    { name: 'catLabel', label: '分类显示名', value: proj ? proj.catLabel : '' },
    { name: 'award', label: '获奖/类型', value: proj ? proj.award : '' },
    { name: 'desc', label: '详细描述', type: 'textarea', rows: 5, value: proj ? proj.desc : '' }
  ], function(values) {
    if (projId) {
      for (var k = 0; k < store.projects.length; k++) {
        if (store.projects[k].id === projId) {
          store.projects[k].title = values.title;
          store.projects[k].subtitle = values.subtitle;
          store.projects[k].image = values.image;
          store.projects[k].category = values.category;
          store.projects[k].catLabel = values.catLabel;
          store.projects[k].award = values.award;
          store.projects[k].desc = values.desc;
          break;
        }
      }
    } else {
      store.projects.push({
        id: genId(),
        title: values.title,
        subtitle: values.subtitle,
        image: values.image,
        category: values.category,
        catLabel: values.catLabel,
        award: values.award,
        desc: values.desc
      });
    }
    saveData(store);
    renderAll();
    showToast(projId ? '作品已更新' : '作品已添加', 'success');
  });
}

// ===== 10. 删除确认 =====
function deleteCompetition(compId) {
  if (!confirm('确定要删除这条竞赛记录吗？')) return;
  store.competitions = store.competitions.filter(function(c) { return c.id !== compId; });
  saveData(store);
  renderAll();
  showToast('竞赛记录已删除', 'success');
}

function deleteProject(projId) {
  if (!confirm('确定要删除这个作品吗？')) return;
  store.projects = store.projects.filter(function(p) { return p.id !== projId; });
  saveData(store);
  renderAll();
  showToast('作品已删除', 'success');
}

// ===== 11. 事件委托 =====
function bindCardActions() {
  // Using event listeners on the containers
}

document.addEventListener('click', function(e) {
  if (!editMode) return;
  var target = e.target;
  var btn = target.closest('[data-action]');
  if (!btn) return;
  var action = btn.getAttribute('data-action');
  var id = btn.getAttribute('data-id');

  if (action === 'edit-competition') {
    openCompetitionEdit(id);
  } else if (action === 'del-competition') {
    deleteCompetition(id);
  } else if (action === 'edit-project') {
    openProjectEdit(id);
  } else if (action === 'del-project') {
    deleteProject(id);
  }
});

// Edit trigger buttons
document.addEventListener('click', function(e) {
  var trigger = e.target.closest('.edit-trigger');
  if (!trigger) return;
  var target = trigger.getAttribute('data-target');
  if (target === 'profile') {
    openProfileEdit();
  } else if (target === 'contact') {
    openContactEdit();
  } else if (target === 'competition-add') {
    openCompetitionEdit(null);
  } else if (target === 'project-add') {
    openProjectEdit(null);
  }
});

// Close edit modal via X button
document.querySelector('#editModal .edit-modal-close').addEventListener('click', closeEditModal);
document.querySelector('#editModal .modal-backdrop').addEventListener('click', closeEditModal);

// ===== 12. 作品详情弹窗 =====
function bindWorkViewEvents() {
  var buttons = document.querySelectorAll('.work-view');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
      e.stopPropagation();
      var id = this.getAttribute('data-id');
      var proj = null;
      for (var j = 0; j < store.projects.length; j++) {
        if (store.projects[j].id === id) { proj = store.projects[j]; break; }
      }
      if (!proj) return;

      var modal = document.getElementById('workModal');
      document.getElementById('modalTitle').textContent = proj.title + '——' + proj.subtitle;
      document.getElementById('modalCategory').textContent = (proj.catLabel || '') + ' · ' + (proj.award || '');
      document.getElementById('modalDesc').textContent = proj.desc;

      var modalImg = document.getElementById('modalImage');
      if (proj.image) {
        modalImg.style.backgroundImage = 'url(' + proj.image + ')';
        modalImg.style.backgroundSize = 'cover';
        modalImg.style.backgroundPosition = 'center';
      } else {
        modalImg.style.backgroundImage = '';
        modalImg.style.background = 'linear-gradient(135deg, var(--green-pale), var(--green-light))';
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
}

document.getElementById('modalClose').addEventListener('click', function() {
  document.getElementById('workModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelector('#workModal .modal-backdrop').addEventListener('click', function() {
  document.getElementById('workModal').classList.remove('open');
  document.body.style.overflow = '';
});

// ===== 13. 筛选 =====
function bindFilterEvents() {
  var buttons = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      currentFilter = this.getAttribute('data-filter');
      renderProjects();
      bindWorkViewEvents();
      if (editMode) bindCardActions();
    });
  }
}

// ===== 14. 数据管理弹窗 =====
var manageModal = document.getElementById('manageModal');

document.getElementById('btnManage').addEventListener('click', function() {
  manageModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.querySelector('#manageModal .manage-modal-close').addEventListener('click', function() {
  manageModal.classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelector('#manageModal .modal-backdrop').addEventListener('click', function() {
  manageModal.classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('btnExport').addEventListener('click', function() {
  exportData(store);
  showToast('数据已导出', 'success');
});

document.getElementById('btnImport').addEventListener('click', function() {
  document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', function() {
  var file = this.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    try {
      var data = importData(ev.target.result);
      store = data;
      renderAll();
      manageModal.classList.remove('open');
      document.body.style.overflow = '';
      showToast('数据已导入并恢复', 'success');
    } catch (e) {
      showToast('导入失败：文件格式不正确', 'error');
    }
  };
  reader.readAsText(file);
  this.value = '';
});

document.getElementById('btnReset').addEventListener('click', function() {
  if (!confirm('确定要重置所有内容吗？此操作不可撤销！\n\n建议先导出备份。')) return;
  store = resetData();
  renderAll();
  manageModal.classList.remove('open');
  document.body.style.overflow = '';
  showToast('已重置为默认内容', 'success');
});

// ===== 15. 导航栏 =====
var navbar = document.getElementById('navbar');
var navToggle = document.getElementById('navToggle');
var navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

navToggle.addEventListener('click', function() {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

var navLinks = document.querySelectorAll('.nav-link');
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}

function updateActiveNav() {
  var sections = document.querySelectorAll('.section, .hero');
  var current = '';
  for (var i = 0; i < sections.length; i++) {
    var top = sections[i].offsetTop - 120;
    var height = sections[i].offsetHeight;
    var id = sections[i].getAttribute('id');
    if (window.pageYOffset >= top && window.pageYOffset < top + height) {
      current = id;
    }
  }
  for (var j = 0; j < navLinks.length; j++) {
    navLinks[j].classList.remove('active');
    if (navLinks[j].getAttribute('href') === '#' + current) {
      navLinks[j].classList.add('active');
    }
  }
}

// ===== 16. 表单提交 =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var btn = this.querySelector('button');
  var orig = btn.textContent;
  btn.textContent = '发送中...';
  btn.disabled = true;
  setTimeout(function() {
    btn.textContent = '已发送!';
    btn.style.background = '#2D6A4F';
    btn.style.color = '#fff';
    document.getElementById('contactForm').reset();
    setTimeout(function() {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }, 800);
});

// ===== 17. 键盘关闭弹窗 =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('workModal').classList.remove('open');
    document.getElementById('editModal').classList.remove('open');
    document.getElementById('manageModal').classList.remove('open');
    document.body.style.overflow = '';
    currentImageValues = {};
  }
});

// ===== 18. 初始化 =====
renderAll();
