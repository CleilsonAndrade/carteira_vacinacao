document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#wrapper").style.visibility = "visible";
  } else {
    document.querySelector("#wrapper").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};