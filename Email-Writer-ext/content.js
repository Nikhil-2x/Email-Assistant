console.log("Email extension loaded");

const findComposeToolbar = () => {
  const selectors = [
    ".btC",
    ".aDh",
    '[role="dialog"]',
    ".gU.Up",
    '[role="dialog"] .aDh',
    '[role="dialog"] .btC',
  ];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null;
};

const createAIButton = () => {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginLeft = "8px";
  button.style.marginRight = "8px";
  button.style.borderRadius = "8px";
  button.innerText = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
};

const getEmailContent = () => {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const emailBody = document.querySelector(selector);
    if (emailBody) {
      return emailBody.innerText.trim();
    }
  }

  const subjectBox = document.querySelector('input[name="subjectbox"]');
  if (subjectBox && subjectBox.value.trim() !== "") {
    return `Subject: ${subjectBox.value.trim()}`;
  }

  return "";
};

const showToast = (msg, type = "success") => {
  const toast = document.createElement("div");
  toast.innerText = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.color = "white";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "6px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "99999";
  toast.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  if (type === "success") toast.style.background = "#34d399";
  else if (type === "error") toast.style.background = "#ef4444";

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

const injectButton = () => {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolbar();

  if (!toolbar) {
    console.log("Toolbar not found");
    return;
  }
  console.log("Toolbar found:", toolbar);

  const button = createAIButton();
  button.classList.add("ai-reply-button");

  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;
      const emailContent = getEmailContent();

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "Professional",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const generatedReply = await response.text();

      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedReply);
      }

      showToast("AI reply generated!", "success");
    } catch (error) {
      console.log("Error generating AI reply:", error);
      showToast("Failed to generate reply", "error");
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
};

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
    );

    if (hasComposeElements) {
      console.log("ELement deetected");
      setTimeout(injectButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
