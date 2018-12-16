window.addEventListener("load", function() {
  var content = document.querySelector("#content");
  var div = document.createElement("div");
  div.innerHTML = "hoge";
  div.style.backgroundColor = "#555555";
  div.style.height = "800px";
  content.appendChild(div);
  console.log(window.innerHeight);
});

window.setTimeout(function() {
  var content = document.querySelector("#content");
  alert(content.clientHeight);
}, 1000);
