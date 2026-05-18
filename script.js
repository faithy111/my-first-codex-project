const topicInput = document.querySelector("#topicInput");
const generateButton = document.querySelector("#generateButton");
const titleList = document.querySelector("#titleList");

const templates = [
  "新手必看！{topic}的 5 个实用技巧",
  "别再踩坑了，{topic}其实可以这么简单",
  "我试了 7 次，终于搞懂{topic}的关键",
  "收藏这篇：{topic}小白也能马上学会",
  "关于{topic}，90% 的人都忽略了这一点",
  "原来{topic}还有这种方法，真的太省心了",
  "一篇讲清楚{topic}，看完少走弯路",
  "普通人也能用的{topic}攻略，简单又好懂"
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function renderTitles(topic) {
  const selectedTemplates = shuffle(templates).slice(0, 5);
  titleList.innerHTML = "";

  selectedTemplates.forEach((template) => {
    const listItem = document.createElement("li");
    listItem.textContent = template.replace("{topic}", topic);
    titleList.appendChild(listItem);
  });
}

function generateTitles() {
  const topic = topicInput.value.trim();

  if (!topic) {
    titleList.innerHTML = "<li>请先输入一个选题，例如：西瓜怎么挑。</li>";
    topicInput.focus();
    return;
  }

  renderTitles(topic);
}

generateButton.addEventListener("click", generateTitles);

topicInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateTitles();
  }
});
