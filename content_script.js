console.log("hello world");

class Panel {
  constructor() {
    this.createPanel();
    this.bind();
  }
  createPanel() {
    var container = document.createElement("div");
    container.id = "translate-panel";
    let html = `<header>
                  <h1></h1><span class="close">X</span>
                </header>
                <main></main>`;
    container.innerHTML = html;
    document.body.appendChild(container);
    this.container = container;
    this.source = container.querySelector("h1");
    this.close = container.querySelector(".close");
    this.target = container.querySelector("main");
  }
  bind() {
    this.close.onclick = () => {
      this.hide();
    };
  }
  moveTo(posX, posY) {
    this.container.style.left = posX + "px";
    this.container.style.top = posY + "px";
  }
  translate(rawStr) {
    this.source.innerText = rawStr;
    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${rawStr}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.target.innerText = result[0][0][0];
      });
  }
  show() {
    this.container.style.display = "block";
  }
  hide() {
    this.container.style.display = "none";
  }
  isShow() {
    return window.getComputedStyle(this.container).display === "block";
  }
}

let panel = new Panel();

document.onmouseup = function (e) {
  let str = window.getSelection().toString().trim();
  if (str === "") return;

  panel.translate(str);
  panel.moveTo(e.pageX, e.pageY);
  panel.show();
  // console.log(str)
  // console.log(e.pageX, e.pageY)
  // window.ee = e
};
