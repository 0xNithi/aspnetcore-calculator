// init theme
function initTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // toggle theme
  document.getElementById("btn-theme").onclick = () => {
    if (localStorage.theme == "dark") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
  };
}

function initCalculator() {
  let context = "";

  for (const [, button] of Object.entries(
    document.getElementsByTagName("table")[0].getElementsByTagName("button")
  )) {
    button.onclick = (ev) => {
      let value = ev.currentTarget.value;

      if (value === "C") {
        context = "";
      } else if (value === "backspace") {
        if (context.length) {
          context = context.slice(0, -1);
        }
      } else if (value === "=") {
        if (context.length) {
          const xhttp = new XMLHttpRequest();
          xhttp.onload = function () {
            if (this.status === 200) {
              document.getElementById("problem").innerHTML = context;
              document.getElementById("answer").innerHTML = this.responseText;

              context = this.responseText;
            } else {
              document.getElementById("problem").innerHTML = "ERROR";
            }
          };
          xhttp.open("POST", "/api/calculate");
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(
            JSON.stringify({
              context: context
                .replace("×", "*")
                .replace("÷", "/")
                .replace("−", "-"),
            })
          );
        } else {
          document.getElementById("problem").innerHTML = "ERROR";
        }
      } else {
        context += value;
      }

      document.getElementById("answer").innerHTML = context;
    };
  }
}

initTheme();
initCalculator();
