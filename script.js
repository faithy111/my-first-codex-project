const topicInput = document.querySelector("#topicInput");
const generateButton = document.querySelector("#generateButton");
const imagePrompt = document.querySelector("#imagePrompt");
const bodyCopy = document.querySelector("#bodyCopy");
const tagList = document.querySelector("#tagList");
const pinnedComment = document.querySelector("#pinnedComment");

const bodyOpenings = [
  "厨房百科局今天值班，来把「{topic}」这件事说清楚。",
  "很多人做「{topic}」时会凭感觉，但厨房里最怕的就是小细节被忽略。",
  "把「{topic}」拆开看，其实关键不复杂：先搞懂原理，再调整手法。"
];

const bodyTips = [
  "先看食材状态，再决定火候和时间；干、湿、老、嫩都会影响最后的口感。",
  "调味不要一次下满，先留一点余地，出锅前再补味会更稳。",
  "如果出现味道寡、口感散或卖相暗，通常不是手艺差，而是水分、温度和等待时间没配合好。",
  "新手可以先照着固定比例做一次，第二次再按自己口味微调。"
];

const commentTemplates = [
  "置顶补充：你做「{topic}」最常遇到的问题是什么？我在评论区继续帮大家拆解。",
  "局长小提醒：如果你要复刻「{topic}」，先别急着加料，留言说说你的工具和食材状态，更容易判断。",
  "评论区征集：大家做「{topic}」有什么家传小技巧？靠谱的方法我会整理进下一篇百科局。"
];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function cleanTopic(topic) {
  return topic.replace(/[，。！？,.!?]/g, " ").replace(/\s+/g, " ").trim();
}

function createImagePrompt(topic) {
  return [
    `主题：${topic}`,
    "画面：浅米色厨房台面，深棕色木质砧板，橙红色珐琅锅或小碟作为视觉重点，食材摆放干净有秩序。",
    "风格：温暖生活感、美食百科插图、自然窗光、柔和阴影、高清细节、竖版 3:4。",
    "避免：杂乱背景、过度滤镜、文字水印、塑料感食物。"
  ].join("\n");
}

function createBodyCopy(topic) {
  return `${pickRandom(bodyOpenings).replace("{topic}", topic)}\n\n核心记住三点：第一，${pickRandom(bodyTips)} 第二，观察颜色和香气比死记时间更可靠；第三，出锅后给食物一点“回味时间”，味道会更融合。\n\n如果你是第一次尝试，可以先用小份量练手。厨房不是考试，更像一间小实验室：记录一次变化，下次就会更接近自己的理想味道。`;
}

function createTags(topic) {
  const normalizedTopic = cleanTopic(topic).replace(/\s/g, "") || "厨房主题";
  return [
    "#厨房百科局",
    `#${normalizedTopic}`,
    "#下厨小知识",
    "#厨房新手友好",
    "#美食科普",
    "#今天吃什么",
    "#做饭技巧"
  ];
}

function createPinnedComment(topic) {
  return pickRandom(commentTemplates).replace("{topic}", topic);
}

function renderTags(tags) {
  tagList.innerHTML = "";
  tags.forEach((tag) => {
    const tagItem = document.createElement("span");
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });
}

function renderKitchenContent(topic) {
  imagePrompt.textContent = createImagePrompt(topic);
  bodyCopy.textContent = createBodyCopy(topic);
  renderTags(createTags(topic));
  pinnedComment.textContent = createPinnedComment(topic);
}

function generateContent() {
  const topic = topicInput.value.trim();

  if (!topic) {
    imagePrompt.textContent = "请先输入一个厨房主题，例如：西瓜怎么挑。";
    bodyCopy.textContent = "输入主题后，这里会生成一段浅显、可信、有生活感的百科局正文。";
    renderTags(["#厨房百科局", "#下厨小知识", "#今天吃什么"]);
    pinnedComment.textContent = "先写一个主题，局长才能帮你生成适合置顶的互动评论。";
    topicInput.focus();
    return;
  }

  renderKitchenContent(topic);
}

generateButton.addEventListener("click", generateContent);

topicInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateContent();
  }
});
