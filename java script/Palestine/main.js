let body = document.querySelector("body");
body.style.overflow = "hidden";
body.style.margin = "0";

let flag = document.createElement("div");
flag.style.width = "100%";
flag.style.height = "100vh";
flag.style.position = "relative";
flag.style.overflow = "hidden";
body.appendChild(flag);

let black = document.createElement("div");
black.style.width = "100%";
black.style.height = "33.3333%"
black.style.backgroundColor = "black";
black.style.position = "absolute";
flag.appendChild(black);

let green = document.createElement("div");
green.style.width = "100%";
green.style.height = "33.3333%"
green.style.backgroundColor = "green";
green.style.position = "absolute";
green.style.bottom = "0"
flag.appendChild(green);

/*let red = document.createElement("div");
red.style.width = "50%";
red.style.height = "100%";
red.style.backgroundColor = "red";
red.style.transform = "rotate(45deg)";
red.style.position = "absolute";
red.style.left = "-555px";
flag.appendChild(red);*/

let red = document.createElement("div");
red.style.borderWidth = "50vh";
red.style.borderStyle = "solid";
red.style.borderColor = "transparent transparent transparent red";
red.style.position = "absolute";
flag.appendChild(red);