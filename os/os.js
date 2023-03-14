import "./style.css";

import macplus from "pcejs-macplus";

macplus({
  arguments: ["-c", "pce-config.cfg", "-r"],
  autoloadFiles: [
    "macplus-pcex.rom",
    "mac-plus-3.rom",
    "hd1.qed",
    "hd2.img",
    "pce-config.cfg",
  ],
  print: console.log.bind(console),
  printErr: console.warn.bind(console),
  canvas: document.querySelector(".pcejs-canvas"),
});
