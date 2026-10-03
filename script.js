(function () {

  "use strict";

  // Footer year
  document.getElementById("yr").textContent = new Date().getFullYear();


  // Mobile menu
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );
  }

  burger.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      setMenu(false);
    }
  });


  // Highlight current section in the nav
  var links = {};

  nav.querySelectorAll("a").forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window) {

    var io = new IntersectionObserver(function (entries) {

      entries.forEach(function (en) {

        if (en.isIntersecting && links[en.target.id]) {

          Object.keys(links).forEach(function (k) {
            links[k].classList.remove("on");
          });

          links[en.target.id].classList.add("on");
        }

      });

    }, {
      rootMargin: "-45% 0px -50% 0px"
    });

    Object.keys(links).forEach(function (id) {

      var el = document.getElementById(id);

      if (el) {
        io.observe(el);
      }

    });

  }


  // Pipeline animation
  // Small packets travel from "PDF in" to "Analyst report"

  var track = document.getElementById("track");

  var reduce = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (track && !reduce && track.animate) {

    var timer;

    var spawn = function () {

      var d = document.createElement("span");

      d.className = "dot";

      track.appendChild(d);

      var end = track.clientWidth - 14;

      d.animate(
        [
          {
            transform: "translateX(0)"
          },
          {
            transform: "translateX(" + end + "px)"
          }
        ],
        {
          duration: 4200,
          easing: "cubic-bezier(.45,.05,.55,.95)"
        }
      ).onfinish = function () {
        d.remove();
      };

    };

    var start = function () {

      spawn();

      timer = setInterval(spawn, 1100);

    };

    start();

    document.addEventListener("visibilitychange", function () {

      clearInterval(timer);

      if (!document.hidden) {
        start();
      }

    });

  }


  // Contact form
  // Opens the visitor's default email application

  var form = document.getElementById("form");
  var status = document.getElementById("status");

  if (form) {

    form.addEventListener("submit", function (e) {

      e.preventDefault();

      // Check required fields and email format
      if (!form.checkValidity()) {

        status.textContent =
          "Please fill in your name, a valid email and a message.";

        return;
      }

      var f = new FormData(form);

      var name = f.get("name").trim();
      var email = f.get("email").trim();
      var message = f.get("message").trim();

      // Receiver email
      var receiverEmail = "shivampradeep15493@gmail.com";

      // Email subject
      var subject =
        "Portfolio enquiry from " + name;

      // Email body
      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message;

      // Open visitor's email application
      window.location.href =
        "mailto:" + receiverEmail +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.textContent =
        "Your email app should open with the message ready to send.";

    });

  }

})();