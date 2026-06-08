// ═══════════════════════════════════════════════
//  《蒼蠅王》Game Engine
// ═══════════════════════════════════════════════

const Game = (() => {

  // ── State ──────────────────────────────────
  let state = {
    stats: { luck:0, combat:0, knowledge:0, social:0, resources:0, status:0 },
    points: 10,
    chapterIndex: 0,
    sceneIndex: 0,
    choicesLog: [],
    pendingInputOption: null,
    processingInput: false
  };

  // ── Helpers ────────────────────────────────
  function show(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function showError(msg) {
    const old = document.querySelector('.error-toast');
    if (old) old.remove();
    const el = document.createElement('div');
    el.className = 'error-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }

  function clamp(v, min = 0, max = 10) {
    return Math.max(min, Math.min(max, v));
  }

  // ── Music ──────────────────────────────────
  function startMusic() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('music-btn');
    bgm.volume = 0.35;
    return bgm.play()
      .then(() => btn.classList.remove('muted'))
      .catch(() => btn.classList.add('muted'));
  }

  function toggleMusic() {
    const bgm = document.getElementById('bgm');
    const btn = document.getElementById('music-btn');
    if (bgm.paused) {
      startMusic();
    } else {
      bgm.pause();
      btn.classList.add('muted');
    }
  }

  // ── Screen 1: Welcome ─────────────────────
  function startGame() {
    startMusic();
    initCreation();
    show('screen-creation');
  }

  // ── Screen 2: Character Creation ──────────
  function initCreation() {
    state.stats = { luck:0, combat:0, knowledge:0, social:0, resources:0, status:0 };
    state.points = 10;
    renderCreationGrid();
    updatePointsDisplay();
  }

  function renderCreationGrid() {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = '';
    const colors = {
      luck: 'var(--stat-luck)', combat: 'var(--stat-combat)',
      knowledge: 'var(--stat-knowledge)', social: 'var(--stat-social)',
      resources: 'var(--stat-resources)', status: 'var(--stat-status)'
    };
    STAT_KEYS.forEach(key => {
      const info = STAT_INFO[key];
      const val = state.stats[key];
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.id = `creation-card-${key}`;
      card.innerHTML = `
        <div class="stat-card-top">
          <span class="stat-icon">${info.icon}</span>
          <span class="stat-name">${info.name}</span>
        </div>
        <div class="stat-desc">${info.desc}</div>
        <div class="stat-control">
          <button class="stat-btn" id="btn-minus-${key}" onclick="Game.adjustStat('${key}',-1)">−</button>
          <div class="stat-value" id="stat-val-${key}">${val}</div>
          <button class="stat-btn" id="btn-plus-${key}" onclick="Game.adjustStat('${key}',1)">＋</button>
        </div>
        <div class="stat-bar-bg">
          <div class="stat-bar-fill" id="bar-${key}"
               style="width:${val*10}%;background:${colors[key]}"></div>
        </div>`;
      grid.appendChild(card);
    });
  }

  function adjustStat(key, delta) {
    const val = state.stats[key];
    const newVal = val + delta;
    if (newVal < 1 || newVal > 5) return;
    if (delta > 0 && state.points <= 0) return;
    state.stats[key] = newVal;
    state.points -= delta;
    document.getElementById(`stat-val-${key}`).textContent = newVal;
    const barEl = document.getElementById(`bar-${key}`);
    if (barEl) barEl.style.width = `${newVal * 10}%`;
    updatePointsDisplay();
    updateCreationButtons();
  }

  function updatePointsDisplay() {
    document.getElementById('points-left').textContent = state.points;
  }

  function updateCreationButtons() {
    STAT_KEYS.forEach(key => {
      const v = state.stats[key];
      const minusBtn = document.getElementById(`btn-minus-${key}`);
      const plusBtn  = document.getElementById(`btn-plus-${key}`);
      if (minusBtn) minusBtn.disabled = v <= 0;
      if (plusBtn)  plusBtn.disabled  = v >= 5 || state.points <= 0;
    });
    document.getElementById('creation-confirm').disabled = state.points !== 0;
  }

  function confirmCreation() {
    if (state.points !== 0) return;
    state.chapterIndex = 0;
    state.choicesLog = [];
    show('screen-game');
    buildHUD();
    renderChapter();
  }

  // ── HUD ────────────────────────────────────
  function buildHUD() {
    const hud = document.getElementById('stats-hud');
    const chapterEl = document.getElementById('hud-chapter');
    hud.innerHTML = '';
    STAT_KEYS.forEach(key => {
      const info = STAT_INFO[key];
      const div = document.createElement('div');
      div.className = 'hud-stat';
      div.id = `hud-${key}`;
      div.innerHTML = `
        <span class="hud-stat-icon">${info.icon}</span>
        <span class="hud-stat-name">${info.name}</span>
        <span class="hud-stat-value" id="hud-val-${key}">${state.stats[key]}</span>`;
      hud.appendChild(div);
    });
    hud.appendChild(chapterEl);
    updateHUD();
  }

  function updateHUD() {
    STAT_KEYS.forEach(key => {
      const el = document.getElementById(`hud-val-${key}`);
      if (el) el.textContent = state.stats[key];
    });
    const idx = state.chapterIndex;
    const total = CHAPTERS.length;
    document.getElementById('hud-chapter').textContent =
      `第 ${idx + 1} / ${total} 章`;
  }

  // ── Chapter Rendering ──────────────────────
  function renderChapter() {
    const ch = CHAPTERS[state.chapterIndex];
    if (!ch) { endGame(); return; }

    // Reset UI
    document.getElementById('result-box').classList.remove('show');
    document.getElementById('input-area').classList.remove('open');
    document.getElementById('player-input').value = '';
    document.getElementById('check-banner').innerHTML = '';
    document.getElementById('options-grid').innerHTML = '';
    document.getElementById('choice-point').textContent = '';
    state.pendingInputOption = null;
    state.sceneIndex = 0;

    // VN background
    const bgEl = document.getElementById('vn-bg');
    if (bgEl) bgEl.src = ch.image || '';

    // Chapter label
    const nums = ['一','二','三','四','五','六','七','八'];
    const labelEl = document.getElementById('vn-chapter-label');
    if (labelEl) labelEl.textContent = `第${nums[ch.id-1]}章 · ${ch.title}`;
    document.getElementById('hud-chapter').textContent = `第 ${ch.id} / ${CHAPTERS.length} 章`;

    // Scroll panel to top
    const panel = document.querySelector('.vn-panel');
    if (panel) panel.scrollTop = 0;

    // Use scene-based VN mode if available, otherwise fallback
    if (ch.scenes && ch.scenes.length) {
      renderScene();
    } else {
      const charEl = document.getElementById('vn-char-center');
      if (charEl) charEl.style.display = 'none';
      const narBox = document.getElementById('narrative-box');
      narBox.innerHTML = '';
      narBox.classList.remove('can-advance');
      const spEl = document.getElementById('vn-speaker');
      if (spEl) spEl.style.display = 'none';
      typewrite(narBox, ch.narrative || '', 18, () => {
        document.getElementById('choice-point').textContent = ch.choicePoint;
        renderOptions(ch);
      });
    }
  }

  // ── Scene-based VN rendering ───────────────
  function renderScene() {
    const ch = CHAPTERS[state.chapterIndex];
    const scenes = ch.scenes || [];

    // Always hide these during scene display
    document.getElementById('input-area').style.display = 'none';
    document.getElementById('result-box').classList.remove('show');
    document.getElementById('choice-point').style.display = 'none';

    if (state.sceneIndex >= scenes.length) {
      showChoices(ch);
      return;
    }

    const scene = scenes[state.sceneIndex];

    // Per-scene background change
    if (scene.bg !== undefined) {
      const bgEl = document.getElementById('vn-bg');
      if (bgEl) bgEl.src = scene.bg;
    }

    // Single centered character — show the speaking side, hide for narration
    const charEl = document.getElementById('vn-char-center');
    if (charEl) {
      const vnc = scene.vn_chars || {};
      let charSrc = null;
      if (scene.activeSide === 'left')  charSrc = vnc.left  || null;
      if (scene.activeSide === 'right') charSrc = vnc.right || null;
      if (charSrc) {
        if (charEl.src !== charSrc) {
          charEl.style.opacity = '0';
          charEl.src = charSrc;
          charEl.style.display = 'block';
          requestAnimationFrame(() => { charEl.style.opacity = '1'; });
        } else {
          charEl.style.display = 'block';
          charEl.style.opacity = '1';
        }
      } else {
        charEl.style.display = 'none';
      }
    }

    // Speaker name
    const spEl = document.getElementById('vn-speaker');
    if (spEl) {
      if (scene.type === 'dialogue' && scene.speaker) {
        spEl.textContent = scene.speaker;
        spEl.style.display = 'block';
      } else {
        spEl.style.display = 'none';
      }
    }

    // Typewrite scene text
    const narBox = document.getElementById('narrative-box');
    narBox.classList.remove('can-advance');
    narBox.onclick = null;
    narBox.innerHTML = '';

    const displayText = scene.type === 'dialogue'
      ? scene.text.replace(/\n+/g, ' ').trim()
      : scene.text.replace(/\n\n+/g, '\n');
    typewrite(narBox, displayText, 20, () => {
      narBox.classList.add('can-advance');
      narBox.onclick = () => {
        narBox.onclick = null;
        narBox.classList.remove('can-advance');
        state.sceneIndex++;
        renderScene();
      };
    });
  }

  function showChoices(ch) {
    // Hide character and speaker for choice screen
    const charEl = document.getElementById('vn-char-center');
    if (charEl) charEl.style.display = 'none';
    const spEl = document.getElementById('vn-speaker');
    if (spEl) spEl.style.display = 'none';
    const narBox = document.getElementById('narrative-box');
    narBox.classList.remove('can-advance');
    narBox.onclick = null;
    narBox.innerHTML = '';
    const cpEl = document.getElementById('choice-point');
    cpEl.textContent = ch.choicePoint;
    cpEl.style.display = '';
    renderOptions(ch);
  }

  function typewrite(el, text, speed, onDone) {
    let i = 0;
    el.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);

    // Click to skip
    const skip = () => {
      clearInterval(timer);
      el.textContent = text;
      onDone && onDone();
      el.removeEventListener('click', skip);
    };
    el.addEventListener('click', skip);

    const timer = setInterval(() => {
      if (i >= text.length) {
        clearInterval(timer);
        el.removeEventListener('click', skip);
        el.textContent = text;
        onDone && onDone();
        return;
      }
      // Remove cursor, add char, re-add cursor
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      el.textContent = text.slice(0, i + 1);
      el.appendChild(cursor);
      i++;
    }, speed);
  }

  function renderOptions(ch) {
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';

    ch.options.forEach(opt => {
      const typeClass = { civilized:'civ', savage:'sav', special:'spe', input:'inp' }[opt.type] || 'civ';
      const tagText   = { civilized:'文明選擇', savage:'野蠻選擇', special:'特殊選擇', input:'自由選擇' }[opt.type] || '';

      const block = document.createElement('div');
      block.className = `option-block ${typeClass}`;
      block.id = `opt-${opt.id}`;
      block.innerHTML = `
        <div class="option-tag">${tagText}</div>
        <div class="option-short">${opt.shortLabel}</div>
        <div class="option-label">${opt.label}</div>`;

      if (opt.type === 'input') {
        block.addEventListener('click', () => openInputArea(opt));
      } else {
        block.addEventListener('click', () => handleChoice(opt));
      }
      grid.appendChild(block);
    });
  }

  // ── Choice handling ────────────────────────
  function handleChoice(opt) {
    if (state.processingInput) return;

    // Disable all options visually
    document.querySelectorAll('.option-block').forEach(b => b.classList.add('selected'));

    const ch = CHAPTERS[state.chapterIndex];

    if (opt.hasCheck) {
      // Perform hidden stat check
      const pass = opt.checkCondition(state.stats);
      const outcome = pass ? opt.success : opt.failure;
      applyStatChanges(outcome.statChanges);
      showResult(
        outcome.result,
        outcome.statChanges,
        pass ? { type: 'success', label: outcome.checkLabel } : { type: 'failure', label: outcome.checkLabel }
      );
      logChoice(ch, opt.shortLabel + (pass ? '（成功）' : '（失敗）'));
    } else {
      applyStatChanges(opt.statChanges);
      showResult(opt.result, opt.statChanges, null);
      logChoice(ch, opt.shortLabel);
    }
  }

  function openInputArea(opt) {
    if (state.processingInput) return;
    state.pendingInputOption = opt;
    const ia = document.getElementById('input-area');
    ia.style.display = 'block';
    ia.classList.add('open');
    document.getElementById('player-input').focus();
    document.querySelectorAll('.option-block').forEach(b => {
      if (b.id !== `opt-${opt.id}`) b.style.opacity = '0.4';
    });
  }

  function cancelInput() {
    const ia = document.getElementById('input-area');
    ia.style.display = 'none';
    ia.classList.remove('open');
    document.getElementById('player-input').value = '';
    state.pendingInputOption = null;
    document.querySelectorAll('.option-block').forEach(b => { b.style.opacity = ''; });
  }

  function submitCustomInput() {
    const inputEl = document.getElementById('player-input');
    const text = inputEl.value.trim();
    if (!text) { showError('請輸入你的選擇'); return; }
    if (state.processingInput) return;

    state.processingInput = true;

    const ch = CHAPTERS[state.chapterIndex];
    const opt = state.pendingInputOption;

    const { changes, result } = localJudge(text);

    const ia = document.getElementById('input-area');
    ia.style.display = 'none';
    ia.classList.remove('open');
    inputEl.value = '';

    document.querySelectorAll('.option-block').forEach(b => b.classList.add('selected'));
    applyStatChanges(changes);
    showResult(result, changes, null);
    logChoice(ch, `自由輸入：「${text.slice(0, 30)}${text.length > 30 ? '…' : ''}」`);
    state.processingInput = false;
  }

  function localJudge(text) {
    const t = text;

    if (/攻擊|打過去|衝過去|搶|威脅|殺|暴力|砸|踢|推倒|奪取|壓制|拳頭|punch|attack|fight|kill|grab|smash/.test(t))
      return { changes: { combat: 1, social: -1 },
               result: '你以武力貫徹了自己的意志。周圍的人沉默讓開，眼神裡多了一絲戒備。荒島的秩序又往黑暗傾斜了一分。' };

    if (/合作|幫忙|說服|安慰|談判|溝通|一起|協助|商量|分享|解釋|呼籲|邀請|加油|守護|保護|cooperate|help|talk|share/.test(t))
      return { changes: { social: 1, status: 1 },
               result: '你用語言搭起了橋樑。有人猶豫，有人點頭。在這座島上，信任比食物更稀缺，而你剛剛播下了一顆種子。' };

    if (/分析|思考|計劃|研究|觀察|記錄|想辦法|判斷|推理|整理|評估|想清楚|冷靜|think|plan|analyze|observe|reason/.test(t))
      return { changes: { knowledge: 1, status: 1 },
               result: '你退後一步，用理智審視局面。清醒的頭腦是荒島上最稀缺的資源，而你此刻正緊緊握住它。' };

    if (/收集|搜索|採集|囤積|建造|製作|找食|儲存|修理|整理|生火|取水|打獵|搭|蓋|gather|collect|build|store|craft|hunt/.test(t))
      return { changes: { resources: 1, luck: 1 },
               result: '你將注意力放在實際的生存需求上。雙手沾滿泥土與汗水，但背包裡多了幾樣足以撐過明天的東西。' };

    if (/領導|宣布|組織|號召|演講|指揮|帶頭|站出來|主動|振臂|鼓舞|lead|declare|organize|command|motivate/.test(t))
      return { changes: { status: 2, social: -1 },
               result: '你踏出一步，讓自己成為眾人目光的焦點。有些人願意跟隨，有些人只是在等待你犯下第一個錯誤。' };

    if (/逃|躲|隱藏|等待|觀望|避開|保持距離|悄悄|不動|假裝|遠離|撤退|hide|run|wait|avoid|escape|retreat/.test(t))
      return { changes: { luck: 1, status: -1 },
               result: '你選擇了沉默與距離。沒有人注意到你——這是你的保護，也是你的孤立。荒島的夜晚因此格外漫長。' };

    if (/欺騙|謊言|假裝|偽裝|騙|算計|出賣|背叛|利用|操控|lie|deceive|betray|manipulate/.test(t))
      return { changes: { resources: 1, social: -1, luck: -1 },
               result: '你在真相與謊言之間選擇了後者。短期的利益悄悄入袋，但有些眼睛，已經看穿了你。' };

    if (/祈禱|神|信仰|相信|靈魂|儀式|pray|god|believe|spirit/.test(t))
      return { changes: { luck: 2, knowledge: -1 },
               result: '你將命運交付給某種更大的力量。島上的風聲彷彿給了你回應，但那究竟是啟示，還是幻覺？' };

    // 偵測有實質行動動詞但不符合以上分類
    if (/去|做|試|想|要|決定|選擇|站|走|說|問|看|聽|跑|拿|給|開始/.test(t) && t.length >= 4)
      return { changes: { luck: 1, knowledge: -1 },
               result: '你採取了行動，儘管荒島並不總是照著計畫走。結果尚未明朗，但至少你沒有選擇袖手旁觀。' };

    return { changes: { luck: -1 },
             result: '你的行動在荒島留下了一道模糊的痕跡。沒有人能確定這究竟是勇氣還是魯莽，但結果已無法更改。' };
  }

  // ── Stat manipulation ──────────────────────
  function applyStatChanges(changes) {
    if (!changes) return;
    STAT_KEYS.forEach(key => {
      if (!(key in changes)) return;
      if (changes[key] === 'zero') {
        state.stats[key] = 0;
      } else {
        state.stats[key] = clamp(state.stats[key] + changes[key]);
      }
    });
    updateHUD();
  }

  function showResult(text, changes, checkResult) {
    const resultBox = document.getElementById('result-box');
    document.getElementById('result-text').textContent = text;

    // Check banner
    const banner = document.getElementById('check-banner');
    if (checkResult) {
      banner.innerHTML = `
        <div class="check-banner ${checkResult.type}">
          <span class="check-banner-icon">${checkResult.type === 'success' ? '◎' : '✕'}</span>
          <span>${checkResult.label}</span>
        </div>`;
    } else {
      banner.innerHTML = '';
    }

    // Stat change tags
    const tagsEl = document.getElementById('stat-changes');
    tagsEl.innerHTML = '';
    if (changes) {
      STAT_KEYS.forEach(key => {
        if (!(key in changes)) return;
        const val = changes[key];
        const info = STAT_INFO[key];
        const tag = document.createElement('span');

        if (val === 'zero') {
          tag.className = 'stat-change-tag zero';
          tag.textContent = `${info.name} → 歸零`;
        } else if (val > 0) {
          tag.className = 'stat-change-tag plus';
          tag.textContent = `${info.name} +${val}`;
        } else {
          tag.className = 'stat-change-tag minus';
          tag.textContent = `${info.name} ${val}`;
        }
        tagsEl.appendChild(tag);
      });
    }

    resultBox.classList.add('show');
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const panel = document.querySelector('.vn-panel');
    if (panel) setTimeout(() => panel.scrollTop = panel.scrollHeight, 50);

    // Update last chapter continue label
    if (state.chapterIndex >= CHAPTERS.length - 1) {
      document.getElementById('continue-btn').textContent = '前往最終分析 →';
    }
  }

  function nextChapter() {
    state.chapterIndex++;
    if (state.chapterIndex >= CHAPTERS.length) {
      endGame();
    } else {
      const panel = document.querySelector('.vn-panel');
      if (panel) panel.scrollTop = 0;
      setTimeout(renderChapter, 300);
    }
  }

  // ── Logging ────────────────────────────────
  function logChoice(ch, choiceText) {
    state.choicesLog.push({
      chapter: ch.id,
      chapterTitle: ch.title,
      choice: choiceText
    });
  }

  function buildStatsDisplay() {
    const result = {};
    STAT_KEYS.forEach(key => {
      result[STAT_INFO[key].name] = state.stats[key];
    });
    return result;
  }

  // ── Archetype Determination ────────────────
  function determineArchetype() {
    const s = state.stats;
    const spread = Math.max(...STAT_KEYS.map(key => s[key])) - Math.min(...STAT_KEYS.map(key => s[key]));
    const scores = {
      martyr:      s.knowledge * 2.2 - s.combat * 1.4 - s.luck * 0.8,
      chaos:       s.combat * 2.5 - s.knowledge * 1.1 - s.social * 1.1,
      shaman:      s.social * 1.4 + s.status * 1.5 + s.luck * 0.4 - s.knowledge * 1.0,
      hoarder:     s.resources * 2.0 + s.luck * 0.4 - s.status * 0.9 - s.social * 0.9,
      observer:    s.knowledge * 1.5 + s.luck * 1.3 - s.status * 0.9,
      guardian:    s.knowledge * 1.5 + s.status * 1.5 + s.social * 0.5 - s.combat * 1.0,
      predator:    s.combat * 1.4 + s.resources * 1.8 - s.knowledge * 1.0,
      machiavelli: s.social * 1.5 + s.status * 1.5 + s.resources * 0.4 - s.luck * 0.3,
      follower:    8 - spread + Math.min(s.social, s.status, s.knowledge) * 0.3
    };

    return ARCHETYPES.reduce((best, archetype) => {
      const bestScore = scores[best.id] ?? -Infinity;
      const score = scores[archetype.id] ?? -Infinity;
      return score > bestScore ? archetype : best;
    }, ARCHETYPES[ARCHETYPES.length - 1]);
  }

  // ── End Game ───────────────────────────────
  function endGame() {
    show('screen-analysis');

    document.getElementById('analysis-loading').style.display = 'none';
    document.getElementById('analysis-result').classList.add('show');

    const archetype = determineArchetype();

    // 原型 banner
    document.getElementById('archetype-name').textContent = archetype.name;
    document.getElementById('archetype-en').textContent   = archetype.en;
    document.getElementById('archetype-symbol').textContent = archetype.symbol;
    document.getElementById('archetype-banner').style.borderColor = archetype.color + '55';
    const archetypeImg = document.getElementById('archetype-img');
    if (archetype.image) {
      archetypeImg.src = archetype.image;
      archetypeImg.style.display = 'block';
      document.getElementById('archetype-symbol').style.display = 'none';
    } else {
      archetypeImg.style.display = 'none';
      document.getElementById('archetype-symbol').style.display = '';
    }

    // 最終數值
    const grid = document.getElementById('final-stats-grid');
    grid.innerHTML = '';
    const colors = {
      luck: 'var(--stat-luck)', combat: 'var(--stat-combat)',
      knowledge: 'var(--stat-knowledge)', social: 'var(--stat-social)',
      resources: 'var(--stat-resources)', status: 'var(--stat-status)'
    };
    STAT_KEYS.forEach(key => {
      const info = STAT_INFO[key];
      const val = state.stats[key];
      const card = document.createElement('div');
      card.className = 'final-stat-card';
      card.innerHTML = `
        <div class="final-stat-name">${info.name}</div>
        <div class="final-stat-val">${val}</div>
        <div class="final-stat-bar" style="background:${colors[key]};width:${val*10}%"></div>`;
      grid.appendChild(card);
    });

    // 預寫分析文字，直接顯示
    document.getElementById('analysis-markdown').innerHTML = archetype.analysis || '';
  }

  // ── Markdown parser ────────────────────────
  function markdownToHtml(md) {
    // 正規化換行
    let text = md.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

    // 確保 ### 前後有空行
    text = text.replace(/([^\n])\n(#{1,3}\s)/g, '$1\n\n$2');
    text = text.replace(/(#{1,3}[^\n]+)\n([^\n])/g, '$1\n\n$2');

    // 按雙換行切成段落塊
    const blocks = text.split(/\n{2,}/);

    const html = blocks.map(block => {
      block = block.trim();
      if (!block) return '';

      // # 或 ## 標題 → h2（CSS 裡隱藏）
      if (/^#{1,2}\s/.test(block))
        return `<h2>${block.replace(/^#+\s*/, '')}</h2>`;

      // ### 標題（過濾掉分析文字中的原型行）
      if (/^###\s/.test(block)) {
        const heading = block.replace(/^#+\s*/, '');
        if (heading.includes('你的生存原型') || heading.includes('荒島生存報告')) return '';
        return `<h3>${heading}</h3>`;
      }

      // **單獨一行粗體** → 當成小標題 h3（同樣過濾原型行）
      if (/^\*\*[^*]+\*\*$/.test(block)) {
        const heading = block.replace(/\*\*/g, '');
        if (heading.includes('你的生存原型') || heading.includes('荒島生存報告')) return '';
        return `<h3>${heading}</h3>`;
      }

      // 一般段落：內部單換行 → <br>，處理粗體/斜體
      const inner = block
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
      return `<p>${inner}</p>`;
    }).filter(Boolean).join('');

    return html;
  }

  // ── Restart ───────────────────────────────
  function restart() {
    state = {
      stats: { luck:0, combat:0, knowledge:0, social:0, resources:0, status:0 },
      points: 10,
      chapterIndex: 0,
      sceneIndex: 0,
      choicesLog: [],
      pendingInputOption: null,
      processingInput: false
    };
    show('screen-welcome');
  }

  // ── Public API ─────────────────────────────
  return {
    startGame,
    adjustStat,
    confirmCreation,
    cancelInput,
    submitCustomInput,
    nextChapter,
    restart,
    toggleMusic
  };

})();

// Show welcome screen on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('screen-welcome').classList.add('active');
});

// Spacebar advances dialogue
document.addEventListener('keydown', e => {
  if (e.code !== 'Space') return;
  // Don't fire when typing in textarea or input
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT') return;
  e.preventDefault();
  const narBox = document.getElementById('narrative-box');
  if (narBox) narBox.click();
});
