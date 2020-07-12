
<template>
  <div class="container">
    <div id="terminal-container"></div>
  </div>
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { exceCMD } from "./father";
// const fork  = require("child_process").fork;
import symbol from "log-symbols";
import chalk from "chalk";

// import * as fit from "xterm/lib/addons/fit/fit";
// Terminal.applyAddon(fit); // Apply the `fit` addon
export default {
  data() {
    return {
      copy: ""
    };
  },
  mounted() {
    this.$performanceMonitor();

    let terminalContainer = document.getElementById("terminal-container");
    let term = new Terminal({
      // 光标闪烁
      rendererType: "canvas", //渲染类型

      height: document.body.clientHeight,
      cursorBlink: true,
      cols: parseInt(document.body.clientWidth / 16),
      rows: parseInt(document.body.clientHeight / 16),
      convertEol: true,
      cursorBlink: true, // 光标闪烁
      cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
      scrollback: 800, //回滚
      tabStopWidth: 8, //制表宽度
      screenKeys: true, //
       theme: {
          foreground: 'yellow', //字体
          background: '#060101', //背景色
          cursor: 'help',//设置光标
        }
    });
    term.open(terminalContainer, true);
    term.write(chalk.yellow("react模板还在路上，莫急莫急~\n\n"));
    for (let i = 0; i < 1000; i++) {
      term.write(chalk.yellow("react模板还在路上，莫急莫急~"));
    }
  }
};
</script>
