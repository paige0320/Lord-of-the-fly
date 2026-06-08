// ═══════════════════════════════════════════════
//  《蒼蠅王：微光與荒島之獸》 故事資料
// ═══════════════════════════════════════════════

const STAT_INFO = {
  luck:      { name: '機運', icon: '⚄', desc: '影響突發事件的命運走向' },
  combat:    { name: '武力', icon: '⚔', desc: '狩獵、自保與威懾的能力' },
  knowledge: { name: '學識', icon: '◎', desc: '判斷局勢、維持理性的能力' },
  social:    { name: '人際', icon: '♦', desc: '在群體中的好感度與說服力' },
  resources: { name: '物資', icon: '⊕', desc: '掌握食物、武器、工具的程度' },
  status:    { name: '地位', icon: '▲', desc: '在群體中的話語權與領導力' }
};

const STAT_KEYS = ['luck', 'combat', 'knowledge', 'social', 'resources', 'status'];

const ARCHETYPES = [
  {
    id: 'martyr',
    name: '悲劇的殉道者',
    en: 'The Tragic Martyr',
    check: s => s.knowledge >= 7 && s.combat <= 3 && s.luck <= 3,
    color: '#6b8fa3', symbol: '✦',
    image: 'media/人格原型圖/archetype-martyr.png',
    analysis: `<h3>核心人格分析</h3><p>你的靈魂完全屬於小豬與西蒙的陣營。你試圖用真理、常識和科學來對抗逐漸失控的群體狂歡，但因為缺乏保護自己的武力，且運氣極差，你最終成為了暴力的犧牲品。你守護了人類最珍貴的理性，但同時也揭示了「手無寸鐵的真理在野蠻面前有多麼脆弱」。在你墜落之後，荒島上最後一盞理性的燈也熄滅了。</p><h3>人性之問</h3><p>你的遭遇回應了《蒼蠅王》最殘酷的命題：善意而無力，是否只是另一種形式的失敗？你沒有放棄文明，文明卻放棄了你。</p>`
  },
  {
    id: 'chaos',
    name: '純粹的混亂推手',
    en: 'The Chaos Instigator',
    check: s => s.combat >= 7 && s.knowledge <= 3 && s.social <= 3,
    color: '#8b1a1a', symbol: '✖',
    image: 'media/人格原型圖/archetype-chaos.png',
    analysis: `<h3>核心人格分析</h3><p>原著中的「羅傑（Roger）」就是你的縮影。你加入傑克陣營並非為了生存或食物，而是因為這裡「沒有大人、沒有法律」。你享受剝奪他人權力與生命的過程。當外在的社會制約消失時，你內在的陰暗面得到了完全的釋放——你不是被荒島改變的，荒島只是讓真實的你終於現形。</p><h3>人性之問</h3><p>你的存在是對人性本善論最直接的反駁。《蒼蠅王》告訴我們：文明是一層薄薄的面具，而你，從來就沒有真正戴上它。</p>`
  },
  {
    id: 'shaman',
    name: '狂熱的造神者',
    en: 'The Fanatic Shaman',
    check: s => s.social >= 7 && s.status >= 7 && s.knowledge <= 3,
    color: '#7a4f1a', symbol: '☽',
    image: 'media/人格原型圖/archetype-shaman.png',
    analysis: `<h3>核心人格分析</h3><p>你是恐懼的具象化推手。當面對未知的「野獸」時，你沒有選擇理性分析，而是選擇將其神格化。你或許不親自參與血腥狩獵，但你透過編造圖騰崇拜與祭祀儀式，在部落中獲得了極高的精神領袖地位。這反映了人類在面對極端焦慮時，容易遁入迷信與群體狂熱的心理——你將他人的恐懼變成了自己手中的權柄。</p><h3>人性之問</h3><p>宗教與迷信之間，只差一個理性的距離。你選擇了後者，並讓整座島嶼都為你的信仰起舞——這是智慧，還是墮落？</p>`
  },
  {
    id: 'hoarder',
    name: '荒島囤積狂',
    en: 'The Hoarder',
    check: s => s.resources >= 7 && s.status <= 3 && s.social <= 3,
    color: '#4a6b2a', symbol: '◈',
    image: 'media/人格原型圖/archetype-hoarder.png',
    analysis: `<h3>核心人格分析</h3><p>你對拉爾夫的「文明」或傑克的「野蠻」都不感興趣，你的眼中只有「生存」本身。在遊戲過程中，你避開了所有衝突，把大部分的精力用來藏匿水果、偷取豬肉或私藏生火工具。你活了下來，但完全喪失了與社群的連結——你的孤獨是你為生存所付出的代價。</p><h3>人性之問</h3><p>當一個人放棄了所有公共責任，退回到純粹利己的狀態，他還算是「人」嗎？你的生存是勝利，也是一種無聲的失敗。</p>`
  },
  {
    id: 'observer',
    name: '冷眼旁觀的先知',
    en: 'The Silent Observer',
    check: s => s.knowledge >= 7 && s.luck >= 7 && s.status <= 3,
    color: '#3a6b7a', symbol: '◉',
    image: 'media/人格原型圖/archetype-observer.png',
    analysis: `<h3>核心人格分析</h3><p>你像西蒙（Simon）一樣，擁有洞察事物本質的能力，你可能一早就看透了「野獸其實存在於我們心裡」。然而，你充滿了存在主義式的疏離感，選擇將自己與群體的瘋狂隔離開來。你的心理矛盾在於：你擁有看透真相的清醒，卻缺乏將真理傳遞給大眾的勇氣與政治手腕；你的明哲保身，本質上是對群體墮落的默許。</p><h3>人性之問</h3><p>知道真相而沉默，是智慧還是共謀？西蒙選擇了說出真相，用生命換來了沒有人願意聆聽的啟示。而你，選擇了活著。</p>`
  },
  {
    id: 'guardian',
    name: '守光者',
    en: 'The Unyielding Light',
    check: s => s.knowledge >= 7 && s.status >= 7 && s.combat <= 3,
    color: '#5a8a6a', symbol: '◎',
    image: 'media/人格原型圖/archetype-guardian.png',
    analysis: `<h3>核心人格分析</h3><p>你是荒島上文明最後的防線。即使面對飢餓與恐懼，你依然堅持守護象徵秩序的「海螺」與象徵希望的「火堆」。你的行為高度契合了康德式的「定言命令（Categorical Imperative）」——你認為道德準則不應因為環境的極端而妥協。你拒絕了野性，但也可能因此在殘酷的權力鬥爭中顯得迂腐且遍體鱗傷。</p><h3>人性之問</h3><p>《蒼蠅王》給守光者的答案是殘酷的：文明需要有人守護，但守護文明的人往往是第一個被文明的崩塌所傷害的。你的堅持，是偉大，也是悲劇。</p>`
  },
  {
    id: 'predator',
    name: '頂級掠食者',
    en: 'The Apex Predator',
    check: s => s.combat >= 7 && s.resources >= 7 && s.knowledge <= 3,
    color: '#7a2a2a', symbol: '▼',
    image: 'media/人格原型圖/archetype-predator.png',
    analysis: `<h3>核心人格分析</h3><p>你完美地適應了社會達爾文主義（Social Darwinism）與叢林法則。當飛機墜落的那一刻，你身上的文明枷鎖就徹底解除了。對你而言，道德與規則只是承平時期的奢侈品——你的生存效率極高，將內在的恐懼成功轉化為對外的暴力與支配。你活了下來，但你已經不再是原本那個擁有社會性的「人」了。</p><h3>人性之問</h3><p>荒島是你的天堂，還是照出你本來面目的一面鏡子？叢林法則讓你勝利，但「勝利」在失去了人性之後，究竟還剩下什麼意義？</p>`
  },
  {
    id: 'machiavelli',
    name: '馬基維利生存家',
    en: 'The Pragmatic Survivor',
    check: s => s.social >= 7 && s.status >= 7,
    color: '#5a4a7a', symbol: '◆',
    image: 'media/人格原型圖/archetype-machiavelli.png',
    analysis: `<h3>核心人格分析</h3><p>你是天生的政治家。你不像拉爾夫那樣死守規則，也不像傑克那樣沉迷血腥；對你而言，「文明」與「野蠻」都只是你用來生存的工具。你懂得利用拉爾夫的「合法性」來維持自己的體面，也懂得利用傑克的「武力」來分一杯羹。你的行為屬於馬基維利主義（Machiavellianism）——沒有絕對的道德底線，只有利益最大化的計算。</p><h3>人性之問</h3><p>在荒島的廢墟上，你是最清醒的人，也是最孤獨的人。當所有人都在為信念燃燒時，只有你知道：真正的權力從來不需要宣言，只需要算計。</p>`
  },
  {
    id: 'follower',
    name: '隨波逐流的盲從者',
    en: 'The Blind Follower',
    check: () => true,
    color: '#4a4a5a', symbol: '～',
    image: 'media/人格原型圖/archetype-follower.png',
    analysis: `<h3>核心人格分析</h3><p>你代表了島上大多數沒有名字的「小傢伙（Littluns）」。你沒有堅定的立場，哪邊有肉吃、哪邊看起來更強大，你就往哪邊靠攏。在每一次關鍵的分歧點上，你都選擇了最安全的「旁觀」或「附和」。</p><h3>人性之問</h3><p>「平庸之惡（Banality of Evil）」正是由無數個像你這樣放棄思考、將道德責任外包給強者的普通人所構成的。你沒有主動作惡，卻也從未阻止惡——而在《蒼蠅王》的世界裡，沉默就是共謀。</p>`
  }
];

// ═══════════════════════════════════════════════
//  八大章節
// ═══════════════════════════════════════════════
const CHAPTERS = [

  // ── 第一章 ──────────────────────────────────────────
  {
    id: 1,
    title: '墜落與海螺的呼喚',
    subtitle: 'The Crash',
    bgMood: 'dawn',
    image: 'media/背景/第一章/ch1.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第一章/plane_crash.png',
        text: '轟——！\n刺耳的爆炸聲撕裂天空。\n當你再次睜開眼時，世界只剩下海浪聲。\n濕熱的海風吹過臉頰。\n遠處的叢林裡，一道焦黑的墜機痕跡橫貫整座島嶼。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第一章/ch1.png',
        text: '這裡是……哪裡？\n其他人呢？',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「嘿！你還好嗎？」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「太好了……至少還有其他人活著……」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第一章/conch.png',
        text: '小豬忽然蹲下身。\n沙灘上，一枚巨大的乳白色海螺靜靜躺在陽光下。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「這東西……我以前見過。如果吹響它，說不定能把其他人找來！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '拉爾夫接過海螺，深吸一口氣。\n\n嗚———！！！',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第一章/Jack_team_appear.png',
        text: '樹林深處傳來腳步聲。一群穿著黑色制服的少年走出叢林。\n而走在最前面的那個人——正用審視獵物般的眼神看著所有人。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「原來還有這麼多人活著。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「我們得先想辦法活下去。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「活下去？那當然。但總得有人來指揮。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '兩人的目光在空氣中碰撞。周圍的孩子們不安地交換眼神。\n沒有人說話。\n最後——所有人都看向了你。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '眾人驚魂未定，傑克和拉爾夫正為了「誰是領袖」隱隱產生對立。所有人的目光落到你身上——你決定怎麼做？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '支持拉爾夫',
        label: '「我們需要規則。誰拿到海螺，誰才能發言。」',
        result: '拉爾夫向你投來感激的目光，立刻舉起海螺覆議。小豬也連忙點頭。儘管傑克發出不屑的嘖嘖聲，但秩序的雛形在孩子們心中建立了起來。',
        statChanges: { knowledge: 1, status: 1 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '支持傑克',
        label: '「我覺得傑克更有領袖氣質。至少他看起來知道該怎麼保護大家。」',
        result: '傑克嘴角揚起一抹傲慢的笑，拍了拍你的肩膀：「算你識相，加入我們，島上沒人敢欺負你。」拉爾夫眼神一暗，顯得有些孤立。',
        statChanges: { combat: 1, social: 1 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由選擇',
        label: '寫下你自己的想法……',
        context: '飛機剛失事，你和一群男孩被困在荒島上。拉爾夫和傑克正在爭奪領袖地位，海螺剛被吹響，大家都在海灘上聚集。'
      }
    ]
  },

  // ── 第二章 ──────────────────────────────────────────
  {
    id: 2,
    title: '山頂的初火',
    subtitle: 'The First Fire',
    bgMood: 'fire',
    image: 'media/背景/第二章/ch2.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第二章/beach_morning.png',
        text: '海風吹拂著海岸。\n昨晚的集會結束後，所有人都意識到一件事——\n如果沒有人來救援，他們可能永遠回不了家。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫突然站了起來，眼裡閃爍著希望。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「我想到辦法了！我們可以生火！只要煙夠大，海上的船就能看到我們！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '孩子們頓時騷動起來。\n「真的嗎？那我們是不是很快就能回家了？」',
        vn_chars: { left: 'media/角色/拉爾夫陣營夥伴/Ralph_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「沒錯！大家一起來幫忙！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第二章/pile_of_branches.png',
        text: '男孩們興奮地衝向山丘。枯枝、樹葉、木頭，大量材料被堆成一座小山。\n然而——',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「等等……可是我們要怎麼點火？」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '現場突然安靜下來。所有人面面相覷。\n傑克忽然走向小豬，臉上帶著不耐煩。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「把眼鏡借我。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「什、什麼？等一下——」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '傑克一把奪過眼鏡。陽光穿過鏡片，一縷白煙緩緩升起。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「成功了。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '下一秒——火焰猛然竄起。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第二章/forest_fire.png',
        text: '轟——！\n原本細小的火苗瞬間變成熊熊烈焰，狂風掠過山頭，火勢失控了。\n「火太大了！」「快跑！」「樹林燒起來了！」',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '濃煙遮蔽天空。尖叫聲此起彼落。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「等等……那個臉上有胎記的小男孩呢？他剛剛明明還在這裡！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '周圍突然安靜下來。沒有人回答。\n我的心猛地沉了下去——難道，有人沒逃出來？',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第二章/ch2.png',
        text: '火焰映紅所有人的臉。有人驚恐，有人興奮，有人甚至開始大笑。\n島上的第一場災難，就這樣誕生了。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '現場一片混亂。你決定怎麼做？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '維持秩序',
        label: '「大家都冷靜下來！看看你們幹了什麼好事！拉爾夫，我們必須立刻編制輪班表，嚴格看守營火，不能再失控了！」',
        result: '你強硬的聲音在火光中迴盪，拉爾夫重整旗鼓開始指派任務。但連續驚嚇的孩子們覺得你太過嚴厲，背地裡開始對你產生反感。',
        statChanges: { status: 2, social: -1 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '沉醉火焰',
        label: '「這太壯觀了！看看這股力量！大家一起歡呼吧！」',
        result: '傑克和幾個大孩子興奮地圍著火光高呼，你加入了他們的行列。熱浪讓你熱血沸騰，但也許是離火太近，你的手臂被火星燙傷了一大塊，痛苦與興奮交織。',
        statChanges: { social: 1, combat: 1, luck: -1 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '山頂的第一堆火失控，引發了森林大火，一個臉上有胎記的小男孩疑似在火中失蹤。拉爾夫試圖重建秩序，傑克卻在興奮地觀賞火勢。'
      }
    ]
  },

  // ── 第三章 ──────────────────────────────────────────
  {
    id: 3,
    title: '海灘庇護所 vs. 叢林獵殺',
    subtitle: 'Huts vs. Hunting',
    bgMood: 'jungle',
    image: 'media/ch3.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第三章/beach_shelter.png',
        text: '幾個星期過去了。\n烈日炙烤著沙灘，遠方的海浪依舊規律地拍打岸邊。\n但島上的氣氛已經和剛來時不同了。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫擦去額頭上的汗水，肩上還扛著一大捆棕櫚葉。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「再撐一下。這間庇護所快完成了。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '你將棕櫚葉遞給拉爾夫，雙手早已磨出水泡。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「謝謝。至少還有人願意幫忙。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第三章/empty_beach.png',
        text: '其餘孩子散落在沙灘各處。有人躺著睡覺，有人摘水果吃，有人在海邊嬉戲。\n真正參與建設的人寥寥無幾。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「如果暴風雨來了怎麼辦？難道他們都不明白嗎……」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '突然，遠處的樹林傳來劇烈晃動聲。\n沙——沙沙沙——',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '幾個身影從叢林中鑽了出來。他們滿身泥土，神情興奮而狂熱。\n最前方的人正是傑克——赤裸著上身，臉上塗滿泥巴，手裡緊握削尖的木矛，雙眼閃爍著異樣的光芒。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「差一點。我差一點就抓到牠了。我已經聞到牠的味道了，下次我一定能殺掉牠。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「你帶走所有人！結果房子還是只有我和他在蓋！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「房子？你整天只會想著房子。肉才是最重要的！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '海風吹過。空氣瞬間變得緊繃。所有人都停下動作，默默看著兩人。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「庇護所能保護大家，營火能讓船發現我們，這些才是最重要的事！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「你根本不懂！當我追蹤牠的時候……我能感覺到牠就在前面，我只差一點點就能刺穿牠的喉嚨！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '周圍的孩子們忍不住興奮起來。\n「傑克一定做得到！」「等抓到豬我們就有肉吃了！」',
        vn_chars: { left: 'media/角色/傑克陣營夥伴/Jack_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '「可是暴風雨快來了……」',
        vn_chars: { left: 'media/角色/拉爾夫陣營夥伴/Ralph_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '兩種聲音在耳邊拉扯。一邊是生存與秩序，另一邊是力量與本能。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第三章/shelter_and_forest.png',
        text: '拉爾夫站在未完成的庇護所旁。傑克站在幽暗的叢林入口。\n彷彿整座島嶼正在等待你的選擇。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '你決定支持誰？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '留在海灘',
        label: '「傑克，肉不是最重要的。庇護所才能保護我們渡過暴風雨。我留下來幫拉爾夫。」',
        result: '頂著烈日，你們終於搭起了簡陋的屋頂。你學會了實用的野外建築技巧，但也因為長時間勞動，身體疲憊不堪，沒有餘力去鍛鍊戰鬥技巧。',
        statChanges: { knowledge: 2, resources: 1, combat: -1 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '進入叢林',
        label: '接過傑克遞來的木矛。「空著肚子可蓋不了房子。帶我一起去狩獵吧。」',
        result: '你跟著傑克踩在潮濕的泥土上，學會了如何隱蔽氣息、追蹤足跡。當你們在黑暗的林中聽見豬叫時，你內心的某種禁忌被喚醒了，力量在體內湧動。',
        statChanges: { combat: 2, status: 1, knowledge: -1 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '拉爾夫與傑克因建設庇護所與狩獵獵物的優先順序而爆發激烈爭吵。你可以選擇支持任何一方，或做一些完全不同的事。'
      }
    ]
  },

  // ── 第四章 ──────────────────────────────────────────
  {
    id: 4,
    title: '錯失的微光',
    subtitle: 'The Missed Ship',
    bgMood: 'dusk',
    image: 'media/背景/第四章/ch4.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第三章/empty_beach.png',
        text: '陽光灑落海面。和平的景象下，卻隱藏著某種不安。\n自從上次爭吵後，拉爾夫與傑克幾乎不再說話。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '最近的氣氛越來越奇怪了……大家好像正在慢慢分成兩個陣營。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫站在海邊，習慣性地望向遠方海平線。\n突然——他的瞳孔猛地一縮。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「等等！那是什麼？！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/ship_at_sea.png',
        text: '遙遠的海面上，一道黑煙正緩緩升起——\n一艘船正在航行。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「是船！有人來了！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '「真的嗎？！我們可以回家了！」\n所有人立刻衝向山頂。希望像火焰般在胸口燃燒。',
        vn_chars: { left: 'media/角色/拉爾夫陣營夥伴/Ralph_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/extinct_campfire.png',
        text: '然而，當你們抵達營火處時——所有人都停住了腳步。\n\n營火熄滅了。\n\n只剩下冰冷的灰燼。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '怎麼會……',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫怔怔地看著灰燼，雙拳慢慢握緊。他猛地轉頭，看向遠方海面——\n船正在離開。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/ship_at_sea.png',
        text: '煙霧逐漸消失在天際線。\n沒有停下。也沒有回頭。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「有船經過！我們本來可以回家的！！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/extinct_campfire.png',
        text: '歡呼聲從森林傳來——\n傑克帶著獵人們從叢林走出，肩上扛著獵物，所有人都興奮地大喊：「我們成功了！今晚有肉吃了！哈哈哈！」',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '直到他們發現氣氛不對。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「營火為什麼熄了？！船來過了！我們本來可以回家！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「我們在打獵。至少我們抓到豬了！大家需要食物！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「那也不能讓營火熄掉啊！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_normal.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '第一次，我看見傑克露出心虛的表情。但那份愧疚只持續了一瞬間。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/broken_glasses.png',
        text: '啪——！\n一聲突如其來的巨響劃破空氣，傑克猛地揮出拳頭。\n小豬根本來不及反應，整個人踉蹌著跌倒在地。\n眼鏡從臉上飛了出去。\n喀嚓——\n一側鏡片碎裂。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「我的眼鏡……！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_broken glasses.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '周圍忽然安靜下來。沒有人敢說話。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第四章/barbecue_and_campfire.png',
        text: '一邊是香氣四溢的烤肉。\n一邊是熄滅的營火。\n彷彿象徵著兩種完全不同的道路。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「吃吧。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle1.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '拉爾夫沉默地看著你。\n\n我知道——這不只是選擇一塊肉而已。\n這是在選擇，未來要相信什麼。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      }
    ],
    choicePoint: '你決定怎麼做？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '拒絕烤肉',
        label: '推開傑克的手。「我不吃。你用回家的機會換來這塊肉。我們現在就把營火重新升起來。」',
        result: '你的道德堅守讓拉爾夫感到欣慰，小豬感激地拉住你。但代價是殘酷的——夜晚繁星滿天，你只能抱著空空如也的肚子，在寒風中看守那微弱的火苗。',
        statChanges: { status: 2, knowledge: 1, resources: -2 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '接受烤肉',
        label: '接過烤肉，沉默地咬下一口。「船已經走了。不吃東西也改變不了事實。」',
        result: '豬肉的美味讓你忘卻了回家的渴望。傑克哈哈大笑，給了你更大一塊肉。你向食物妥協了，理性的思考被飽足感淹沒。',
        statChanges: { resources: 2, combat: 1, knowledge: -2 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '因為傑克帶走了看火的人去獵豬，導致山頂的求救火堆熄滅，一艘過路船就這樣錯過了。傑克帶著戰利品凱旋，拉爾夫憤怒絕望，小豬的眼鏡剛被打破，鮮美的烤肉就在眼前。'
      }
    ]
  },

  // ── 第五章 ──────────────────────────────────────────
  {
    id: 5,
    title: '黑暗中的恐懼',
    subtitle: 'The Beast',
    bgMood: 'night',
    image: 'media/ch5.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第五章/night_beach.png',
        text: '夜幕降臨。\n海浪聲在黑暗中顯得格外清晰。\n營火旁聚集著一群孩子，但沒有人說笑。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '最近越來越多人睡不好。\n每當夜晚來臨，總有人聲稱看見了什麼。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '「我看見了……那東西就在樹林裡……」\n「牠有爪子……」\n「不對！牠是從海裡爬出來的！」\n恐懼像瘟疫般在人群中蔓延。',
        vn_chars: { left: 'media/角色/拉爾夫陣營夥伴/Ralph_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「這太荒謬了！根本沒有什麼野獸！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_broken glasses.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '孩子們紛紛搖頭。顯然沒有人相信。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第五章/night_sky.png',
        text: '同一時間，暴風雨正逐漸接近島嶼。\n遠方天空傳來戰機轟鳴。\n沒有人知道，就在那個夜晚，一名墜落的飛行員正緩緩降落。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第五章/parachute.png',
        text: '破損的降落傘掛在山頂岩石上，被風不停拉扯。\n在黑暗中，彷彿一頭巨大生物正在呼吸。\n呼——呼——呼——',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '兩名巡邏的孩子剛好看見這一幕，轉身狂奔：\n「野獸！野獸真的存在！」',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第五章/meeting.png',
        text: '隔天，所有人聚集在海灘。氣氛前所未有地緊張。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「大家冷靜。我們不能因為害怕就失去理智，一定有合理的解釋。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '現場卻越來越騷動。\n「可是他們親眼看見了！」「牠就在山頂！」「牠會吃掉我們！」',
        vn_chars: { left: 'media/角色/拉爾夫陣營夥伴/Ralph_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '我第一次感覺到——大家害怕的或許已經不是野獸，而是彼此。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '傑克忽然站了起來，全場瞬間安靜。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「就算真的有野獸，我的獵人也能殺死牠。所以——你們要繼續躲在拉爾夫後面？還是跟著我？」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '獵人們發出歡呼。「沒錯！我們不怕牠！」',
        vn_chars: { left: 'media/角色/傑克陣營夥伴/Jack_partner_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「恐懼不能解決問題。我們需要的是理智。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「理智？理智可殺不死野獸。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '所有人的目光再次落到我身上。\n這一次，我必須決定——究竟相信理性，還是相信恐懼。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '你決定怎麼發言？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '理性之聲',
        label: '奪過海螺。「世界上沒有野獸！如果有，那也是我們內心的恐懼！」',
        result: '你的話語充滿哲理，但處於極度恐懼中的孩子們根本聽不進去。他們覺得你瘋了、在詛咒大家，紛紛遠離你，你變得無比孤立。',
        statChanges: { knowledge: 2, social: -2, status: -1 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '恐懼的擁護者',
        label: '站到傑克身旁。「傑克說得對！野獸是真實存在的！我們必須先下手為強！」',
        result: '你成功煽動了恐懼。孩子們像找到救星一樣圍在你們身邊，傑克對你的配合非常滿意。透過操弄群眾的陰暗面，你獲得了極大的權力。',
        statChanges: { status: 2, combat: 1, knowledge: -1 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '夜晚集會上，孩子們對「野獸」的恐懼已近歇斯底里。一個死去的飛行員屍體在山頂被誤認為野獸。拉爾夫試圖維持理性，傑克趁機煽動恐懼爭奪控制權。'
      }
    ]
  },

  // ── 第六章 ──────────────────────────────────────────
  {
    id: 6,
    title: '城堡岩的分裂',
    subtitle: 'Castle Rock',
    bgMood: 'split',
    image: 'media/ch6.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第六章/end_of_island.png',
        text: '沿著崎嶇的海岸線前進，隊伍終於抵達島嶼另一端。\n巨大的粉紅色岩石矗立在海浪之上，海風吹過峭壁，發出低沉的嗚咽聲。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '這裡……感覺和海灘完全不同。\n天然形成的石橋連接著一座巨大岩堡，兩側是數十公尺高的懸崖，洶湧海浪拍打著岩壁，彷彿天然的要塞。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '傑克望著眼前景象，雙眼逐漸亮了起來。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「太完美了……看看這裡！如果有敵人來，只要把石頭推下去就行了。這裡根本是一座城堡！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第六章/jack_on_top.png',
        text: '傑克站在最高的岩石上，俯瞰整片海域。\n獵人們在下方興奮地歡呼：「真的耶！沒有人能攻進來！」\n他們看起來像發現了新的王國。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫卻皺起眉頭，仔細觀察周圍環境。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「等等。這裡沒有淡水，也沒有適合居住的地方，更沒有木材能維持營火。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「又是營火。你除了營火還會說什麼？」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「因為那是我們唯一能回家的希望！」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「回家？我現在根本不在乎那些。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '全場陷入沉默。\n我第一次聽見傑克說出這種話——彷彿他已經不再想離開這座島。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第六章/two_team.png',
        text: '孩子們逐漸分成兩邊。一邊站在拉爾夫身後，另一邊則圍繞著傑克。\n「我們該怎麼辦……大家好像真的要分開了……」',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「我要回海灘，守著營火。願意跟我的人就跟我走。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_middle.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '傑克站上高岩，彷彿一位正在加冕的王。\n獵人們發出興奮的歡呼：「傑克萬歲！這裡才是強者的地方！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「而我要留在這裡。在城堡岩建立新的部落。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_middle2.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第六章/two_side.png',
        text: '拉爾夫站在通往海灘的方向。傑克站在城堡岩頂端。\n夕陽將兩人的影子拉得很長，彷彿再也無法重疊。\n文明與野性，希望與力量，兩條道路終於徹底分開。\n所有人的目光再次落向你。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '你決定去哪裡？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '回到海灘',
        label: '走向拉爾夫。「我要守著營火。那是我們唯一能回家的希望。」',
        result: '你回到了漸漸冷清的海灘庇護所。這裡充滿了秩序的尊嚴，但隨著大部分人都搬去城堡岩，你們失去了主要的食物來源，面臨嚴重的資源匱乏。',
        statChanges: { knowledge: 1, status: 1, resources: -2 }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '加入部落',
        label: '走向傑克。「海灘太無聊了。我要留在城堡岩。」',
        result: '你住進了城堡岩。傑克的手下為你分發了標槍和烤肉。你成為了暴力野蠻集團的核心成員，體力充沛，但與過去的理性朋友徹底決裂。',
        statChanges: { combat: 2, resources: 2, social: -1 }
      },
      {
        id: 'C', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '孩子們正式分裂成兩個陣營：拉爾夫的海灘文明陣營和傑克的城堡岩野蠻部落。你必須決定自己的立場。'
      }
    ]
  },

  // ── 第七章 ──────────────────────────────────────────
  {
    id: 7,
    title: '蠅王與狂歡之舞',
    subtitle: 'The Dance',
    bgMood: 'storm',
    image: 'media/背景/第七章/ch7.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第七章/rocks_in_the_storm.png',
        text: '烏雲籠罩整座島嶼。海浪不斷拍打著懸崖，狂風呼嘯，暴風雨即將降臨。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '最近的夜晚越來越可怕。\n沒有人再談論回家。\n所有人都只談論一件事——野獸。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第七章/tribal_bonfire.png',
        text: '城堡岩中央燃起巨大的篝火，火光映照著每個人的臉，忽明忽暗。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '傑克站在火光中央，臉上的面紋在火焰中顯得格外猙獰。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「今晚，我們要驅逐野獸。」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '部落發出歡呼：「驅逐野獸！消滅野獸！」',
        vn_chars: { left: 'media/角色/傑克陣營夥伴/Jack_partner_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第七章/ch7.png',
        text: '鼓聲響起，眾人圍著篝火跳舞，腳步越來越快，聲音越來越大。\n咚！咚！咚！\n起初只是遊戲，但不知道從什麼時候開始，所有人都認真了。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '羅傑被推到中央，扮演野豬。所有人圍成圓圈，舉起長矛。\n「殺了野獸！殺了牠！把牠趕出去！」\n火光映照著一張張瘋狂的臉。\n\n這已經不是舞蹈了。這是一場集體催眠。',
        vn_chars: { left: 'media/角色/羅傑 Roger/Roger_early.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第七章/ the_other_side _of_the_mountain.png',
        text: '同一時間，西蒙正從山頂跌跌撞撞跑下來。\n他的衣服被樹枝劃破，臉色蒼白，氣喘吁吁。',
        vn_chars: { left: 'media/角色/西蒙 Simon/Simon_find the truth.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '西蒙',
        text: '「不是……根本不是野獸……那只是……」',
        vn_chars: { left: 'media/角色/西蒙 Simon/Simon_find the truth.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '他跌跌撞撞地衝向火光。',
        vn_chars: { left: 'media/角色/西蒙 Simon/Simon_find the truth.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第七章/carnival_ceremony.png',
        text: '閃電劃破夜空。\n轟隆——！\n暴雨落下。\n就在此時，一個黑影衝進人群。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '「野獸！野獸來了！快殺了牠！」\n恐懼瞬間吞噬所有理智。\n暴雨、火光、尖叫、狂歡、恐懼——全部混雜在一起。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '西蒙',
        text: '「等一下……你們聽我說……」',
        vn_chars: { left: 'media/角色/西蒙 Simon/Simon_find the truth.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '但沒有人願意聽。\n\n我認出來了。\n那不是野獸。那是西蒙。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第七章/long_spears_raised.png',
        text: '無數身影衝向西蒙。長矛在閃電下反射出冰冷的光。\n所有人都瘋了。\n包括我嗎？',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '此刻，你會怎麼做？',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '挺身而出',
        label: '衝進人群。「住手！那是西蒙！不是野獸！」',
        hasCheck: true,
        checkCondition: s => s.combat >= 6 || s.status >= 7,
        success: {
          result: '你驚人的威懾力讓瘋狂的男孩們猛然一震，長矛在空中硬生生停住。你成功喝止了這場暴行，保住了西蒙的性命！',
          statChanges: { status: 3, social: 2 },
          checkLabel: '你成功喝止了瘋狂的野蠻儀式，保住了西蒙'
        },
        failure: {
          result: '在集體瘋狂面前，你弱小的力量根本無濟於事。雨水與血水混在一起，你被打斷了肋骨。你只能眼睜睜看著西蒙在亂矛中死去，屍體被海浪捲走。',
          statChanges: { luck: -3, combat: -2 },
          checkLabel: '你被狂暴的孩童們打成重傷，西蒙依舊死亡'
        }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '加入狂歡',
        label: '舉起武器，跟著眾人高喊。「殺了野獸！」',
        result: '鮮血濺在你的臉上，暴雨洗刷了罪行。當你清醒過來時，西蒙已經不動了。你跨越了人類道德的底線，靈魂深處的理性燈火徹底熄滅。',
        statChanges: { combat: 3, knowledge: 'zero', status: 1 }
      },
      {
        id: 'C', type: 'special',
        shortLabel: '退到外圍',
        label: '後退一步，閉上眼睛，假裝什麼都沒看見。',
        result: '你保住了性命，沒有受傷。但那無辜的慘叫聲將成為你永生難忘的噩夢。你的懦弱讓你失去了話語權，內心留下了深深的陰影。',
        statChanges: { luck: 2, status: -2, social: -1 }
      },
      {
        id: 'D', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '暴風雨之夜的篝火邊，傑克部落正在進行瘋狂的獵豬舞。西蒙從叢林中跌出，試圖告知真相，卻被誤認為野獸而遭到圍攻。你就在現場。'
      }
    ]
  },

  // ── 第八章 ──────────────────────────────────────────
  {
    id: 8,
    title: '海螺的粉碎與終局',
    subtitle: 'The End',
    bgMood: 'inferno',
    image: 'media/背景/第八章/ch8.png',
    scenes: [
      {
        type: 'narration',
        bg: 'media/背景/第八章/beach_wreckage.png',
        text: '海風吹過空蕩蕩的海灘。\n曾經熱鬧的營地如今只剩殘破的庇護所，營火微弱得幾乎快要熄滅。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '西蒙死後，一切都變了。\n沒有人再提起規則。沒有人再提起回家。\n如今，拉爾夫身邊只剩下寥寥數人。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「他們把眼鏡搶走了……現在連火都快保不住了……」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_without glasses.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「我們不能放棄。至少還要把海螺帶回去。」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '那枚海螺——如今已是最後的象徵。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第六章/end_of_island.png',
        text: '你們踏上通往城堡岩的石橋。海浪拍打著懸崖，狂風呼嘯。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第八章/overlooking.png',
        text: '傑克與部落成員站在高處，俯視著你們。',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「你們還敢回來？」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '小豬',
        text: '「把眼鏡還給我！那不是你的東西！」',
        vn_chars: { left: 'media/角色/小豬 Piggy/Piggy_without glasses.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '高處，羅傑默默站在巨石旁。\n他的手搭上槓桿。\n\n不知道為什麼，我的心突然沉了下去。',
        vn_chars: { left: 'media/角色/羅傑 Roger/Roger_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第八章/boulder_falling.png',
        text: '轟——！\n巨大的岩石呼嘯而下。\n所有人驚恐地抬起頭。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第八章/crush_conch.png',
        text: '啪——！\n海螺碎裂，乳白色碎片四散飛舞。\n時間彷彿停止。\n\n文明……碎掉了。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第八章/piggy_falling.png',
        text: '小豬被衝擊波掀飛出去。\n身體失去平衡，朝著懸崖邊緣踉蹌了幾步。\n下一秒——\n他的身影消失在岩壁之外。\n現場陷入死寂。\n沒有人開口，甚至連海風都彷彿停止了吹拂。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '拉爾夫',
        text: '「小豬……？」',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「看見了嗎？海螺沒了！現在我是唯一的酋長！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '部落爆發歡呼。夜幕降臨，火把點亮整座島嶼。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'dialogue',
        speaker: '傑克',
        text: '「找到拉爾夫！把他抓出來！」',
        vn_chars: { left: 'media/角色/傑克 Jack/Jack_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '最後的獵殺開始了。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        bg: 'media/背景/第八章/ch8.png',
        text: '火焰吞噬森林。濃煙遮蔽天空。\n整座島嶼化作火海。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '拉爾夫狼狽地奔跑，傷痕累累，氣喘吁吁。\n我知道——這是最後的選擇。',
        vn_chars: { left: 'media/角色/拉爾夫 Ralph/Ralph_late.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        bg: 'media/背景/第二章/beach_morning.png',
        text: '就在一切即將結束時，拉爾夫衝出樹林，跌倒在沙灘上。\n追獵隊緊隨其後。\n然而，所有人忽然停下腳步。',
        vn_chars: { left: null, right: null }
      },
      {
        type: 'narration',
        text: '一雙擦得發亮的黑色皮鞋出現在視線中。\n潔白的制服。金色徽章。高大的身影。',
        vn_chars: { left: 'media/角色/英國海軍軍官 Naval Officer/Naval Officer.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'dialogue',
        speaker: '軍官',
        text: '「這裡發生了什麼事？」',
        vn_chars: { left: 'media/角色/英國海軍軍官 Naval Officer/Naval Officer.png', right: null },
        activeSide: 'left'
      },
      {
        type: 'narration',
        text: '全場陷入沉默。\n\n直到這一刻，我才想起來——\n我們原本只是孩子。',
        vn_chars: { left: null, right: null }
      }
    ],
    choicePoint: '文明徹底崩塌，整座島都在燃燒——最後的審判來臨。',
    options: [
      {
        id: 'A', type: 'civilized',
        shortLabel: '守護文明',
        label: '站到拉爾夫身前。「快逃！我來擋住他們！」',
        result: '巨石將你吞噬。你用極致的犧牲守護了人類最後的尊嚴。當英國軍艦因為島上的大火而靠岸，海軍軍官看著這群滿身泥巴的孩子，一切都結束了。',
        statChanges: { status: 3, luck: 'zero' }
      },
      {
        id: 'B', type: 'savage',
        shortLabel: '成為獵人',
        label: '接過火把，加入傑克的追獵隊伍。「絕不能讓他逃走！」',
        result: '你揮舞著火把，瘋狂地在火海中搜捕拉爾夫。就在標槍即將刺穿拉爾夫的胸膛時，一名身穿白色制服的英國海軍軍官突然出現在海灘上。你活下來了，但你已經變成了野獸。',
        statChanges: { combat: 2, resources: 1, knowledge: -2 }
      },
      {
        id: 'C', type: 'special',
        shortLabel: '智取求生',
        label: '利用一路累積的知識與物資，設置陷阱，試圖拖延部落追擊。',
        hasCheck: true,
        checkCondition: s => s.knowledge >= 6 && s.resources >= 5,
        success: {
          result: '你巧妙的陷阱成功阻滯了野蠻部落的腳步，為拉爾夫爭取了時間。你們成功撐到了海軍軍官登島的那一刻，奇蹟般地存活了下來。',
          statChanges: { luck: 3, status: 2 },
          checkLabel: '以智取勝，絕地反擊'
        },
        failure: {
          result: '你的小聰明被殘忍的羅傑看穿。你被當場活捉，綁在柱子上。傑克冷笑著看著你，在海軍到來前，你體驗到了最屈辱、最痛苦的折磨。',
          statChanges: { luck: -3, status: -3 },
          checkLabel: '詭計被識破，被傑克活捉'
        }
      },
      {
        id: 'D', type: 'input',
        shortLabel: '自由輸入',
        label: '寫下你自己的想法……',
        context: '海螺已碎，小豬已死，傑克下令全島獵殺拉爾夫，整座島都在燃燒。這是最後的章節，你的選擇將決定你在荒島上的最終命運。'
      }
    ]
  }
];
