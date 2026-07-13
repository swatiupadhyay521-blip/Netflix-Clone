// Login

function login() {
  let name = document.getElementById("username").value;

  if (name == "") {
    alert("Enter your name");
    return;
  }

  localStorage.setItem("username", name);

  window.location = "dashboard.html";
}

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

function save() {
  localStorage.setItem("ideas", JSON.stringify(ideas));
}

function generateIdea() {
  let input = document.getElementById("idea").value;

  let platform = document.getElementById("platform").value;

  if (input == "") {
    alert("Enter a topic");
    return;
  }

  let hooks = [
    "5 Mistakes You Should Avoid",
    "Top 7 Tips About",
    "Things Nobody Tells You About",
    "Before You Buy",
    "Ultimate Guide to",
  ];

  let randomHook = hooks[Math.floor(Math.random() * hooks.length)];

  ideas.push({
    title: randomHook + " " + input,

    platform: platform,

    date: new Date().toLocaleDateString(),
  });

  save();

  displayIdeas();

  document.getElementById("idea").value = "";
}

function displayIdeas() {
  let data = "";

  ideas.forEach((idea, index) => {
    data += `

<div class="card">

<h3>${idea.title}</h3>

<p>Platform : ${idea.platform}</p>

<p>${idea.date}</p>

<button onclick="deleteIdea(${index})">Delete</button>

</div>

`;
  });

  document.getElementById("ideas").innerHTML = data;
}

function deleteIdea(index) {
  ideas.splice(index, 1);

  save();

  displayIdeas();
}

function searchIdeas() {
  let search = document.getElementById("search").value.toLowerCase();

  let cards = document.querySelectorAll(".card");

  ideas.forEach((idea, index) => {
    cards[index].style.display = idea.title.toLowerCase().includes(search)
      ? "block"
      : "none";
  });
}

displayIdeas();
