document.addEventListener("DOMContentLoaded", function() {
    const starsBgr = document.querySelector(".stars");

    for (let i = 0; i < 200; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      starsBgr.appendChild(star);
    }
  });