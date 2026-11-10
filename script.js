/* ============================================================
   script.js —— 冯奥个人主页的交互脚本
   目前只做一件事：联系方式页的留言表单前端校验
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#message-form");

  // 如果当前页面没有这个表单（比如首页），直接跳过，避免报错
  if (!form) return;

  const emailInput = document.querySelector("#email");
  const contentInput = document.querySelector("#content");
  const msgBox = document.querySelector("#form-msg");

  // 显示提示信息的统一函数
  function showMessage(text, isError) {
    msgBox.textContent = text;
    msgBox.classList.add("show");
    // 成功用绿色，失败用红色
    msgBox.style.color = isError ? "#dc2626" : "#15803d";
  }

  form.addEventListener("submit", function (event) {
    // 阻止表单默认的刷新页面行为
    event.preventDefault();

    const email = emailInput.value.trim();
    const content = contentInput.value.trim();

    // 校验 1：不能为空
    if (email === "" || content === "") {
      showMessage("邮箱和留言内容都不能为空，请检查一下。", true);
      return;
    }

    // 校验 2：邮箱基本格式（有 @，且 @ 前后都有字符，后面有 .）
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage("邮箱格式看起来不太对，检查一下？", true);
      return;
    }

    // 校验 3：留言别太短
    if (content.length < 5) {
      showMessage("留言太短了，再多写几个字吧。", true);
      return;
    }

    // 全部通过
    showMessage("已收到，谢谢你的留言！", false);
    form.reset();
  });
});
