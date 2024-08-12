window.addEventListener("load", function () {
  const rtabs = $(".rtabs"),
    ptabs = $(".ptabs"),
    ptab = $(".price-tab"),
    rtab = $(".resume-tab"),
    navlink1 = $(".navlink-1"),
    navlink2 = $(".navlink-2"),
    sections = $("section");
  const observer = new IntersectionObserver(function (entries) {
    $.map(entries, function (entry, idx) {
      if (entry.isIntersecting) {
        $(entry.target).removeClass("hidden");
        $(entry.target).addClass("show");
        const activeNav = new Array(...Object(navlink1));
        activeNav.filter((val) => {
          val.href.split("#")[1] === entry.target.id
            ? $(val).addClass("intersecting")
            : $(val).removeClass("intersecting");
        });
      } else {
        $(entry.target).removeClass("show");
        $(entry.target).addClass("hidden");
      }
    });
  });
  $.each(sections, (idx, section) => {
    observer.observe(section);
  });

  $(".nav-menu-bar").click(function (e) {
    $(".menu-nav-outer").toggleClass("modal-nav");
  });
  $(".menu-nav-outer").click(function (e) {
    if (e.offsetX > 300) $(".menu-nav-outer").toggleClass("modal-nav");
  });
  $("#close-modal").click(function (e) {
    $(".menu-nav-outer").toggleClass("modal-nav");
  });

  $("#go-up").click(function () {
    window.scrollTo(0, 0);
  });
  this.window.addEventListener("scroll", function () {
    if (this.scrollY > 150) {
      $("#go-up").css("visibility", "visible");
      $("header").attr(
        "style",
        "position: sticky; top: 0; backdrop-filter: blur(4px); transition: top, ease 1s"
      );
    } else {
      $("#go-up").css("visibility", "hidden");
      $("header").attr(
        "style",
        "background:initial; position: none; box-shadow: none"
      );
    }
  });

  // Navlink active color
  function activeLink(links1, links2) {
    $.each(links1, function (idx, navlink) {
      $(navlink).click(function () {
        $(links1).removeClass("nav-focused");
        $(links1).removeClass("nav-focused");
        $(links2).removeClass("intersecting");
        $(links2).removeClass("intersecting");
        $(navlink).addClass("nav-focused");
        $(links2[idx]).addClass("nav-focused");
      });
    });
  }

  activeLink(navlink1, navlink2);
  activeLink(navlink2, navlink1);

  function tabHandler(tabs, tabDiv, progress = true) {
    $.each(tabs, function (idx, tab) {
      $(tab).click(function () {
        const activeTab = $(tabDiv[idx]);
        $(tabDiv).attr("hidden", "hidden");
        activeTab.removeAttr("hidden");
        activeTab.addClass("show");
        $(tabs).removeClass("tab-active");
        $(tab).addClass("tab-active");
        if (progress && idx === 1) {
          const progressBars = $(".progress-bar");
          progressBars.animate(
            { width: "100%" },
            { duration: 700, fill: "forwards" }
          );
        }
      });
    });
  }

  // Resume tabs
  tabHandler(rtab, rtabs);
  // Price tabs
  tabHandler(ptab, ptabs, (progress = false));

  // Development Skill Progress bard
  $.each($(".progress-bar"), function (idx, bar) {
    $(bar).css(
      "background",
      `linear-gradient(
        145deg,
        var(--color-primary-gradient-from) 10%,
        var(--color-primary-gradient-to) ${$(bar).data("value")}%,
    var(--color-lighter) 10%
        )`
    );

    $(bar).data("value") === 100
      ? $($(".progress-percentage")[idx]).css(
          "left",
          `${$(bar).data("value") - 7}%`
        )
      : $($(".progress-percentage")[idx]).css(
          "left",
          `${$(bar).data("value")}%`
        );
  });

  let testimonialSize = 0;
  const ovals = $(".oval"),
    testimonialDivs = $(".testimonial-div");
  $(".testimonial-div").on("mousedown", function (e) {
    if (testimonialSize <= 2) {
      document.querySelector("#mouse-clicked-audio").play();
      testimonialDivs.css("cursor", "pointer");
      if (window.innerWidth / 2 > e.clientX && testimonialSize > 0) {
        testimonialDivs.removeClass("display-testimonial-div");
        ovals.removeClass("slide-dot-color");
        testimonialSize--;
        $(testimonialDivs[testimonialSize]).addClass("display-testimonial-div");
        $(ovals[testimonialSize]).addClass("slide-dot-color");
      }
      if (window.innerWidth / 2 < e.clientX && testimonialSize <= 1) {
        testimonialDivs.removeClass("display-testimonial-div");
        ovals.removeClass("slide-dot-color");
        testimonialSize++;
        $(testimonialDivs[testimonialSize]).addClass("display-testimonial-div");
        $(ovals[testimonialSize]).addClass("slide-dot-color");
      }
    }
  });

  $.each(ovals, (idx, oval) => {
    $(oval).click(() => {
      testimonialDivs.removeClass("display-testimonial-div");
      ovals.removeClass("slide-dot-color");
      testimonialSize = idx;
      $(testimonialDivs[idx]).addClass("display-testimonial-div");
      $(ovals[idx]).addClass("slide-dot-color");
    });
  });

  $("#send-msg-btn").click(() => {
    $("#loading-div").removeClass("hide");
  });

  // Play mouse-clicked audio
  $("a, button, i, .oval, .order-now").click(() => {
    document.querySelector("#mouse-clicked-audio").play();
  });

  $("#i-volume").click(function () {
    let vol = document.querySelector("#mouse-clicked-audio");
    vol.volume === 1 ? (vol.volume = 0) : (vol.volume = 1);
    $("#i-volume").toggleClass("fa-volume-off");
  });

  // Manipulate element Selector
  function S(el) {
    if (el.startsWith(".")) {
      return document.querySelectorAll(el);
    }
    return document.querySelector(el);
  }
  function M(el, cssFrom, cssTo) {
    if (el.length) {
      const arr = new Array(...el);
      arr.map((val) => {
        val.style.setProperty(cssFrom, cssTo);
      });
    } else el.style.setProperty(cssFrom, cssTo);
  }



  $("#theme-icon").click(function () {
    if ($("#theme-icon").hasClass("fa-moon")) {
      $("#theme-icon").removeClass("fa-moon");
      $("#theme-icon").addClass("fa-sun");
      M(S("*"), "--shadow-manipulate", "var(--shadow-white-3)");
      M(S("*"), "--bg-manipulate-1", "var(--bg-white)");
      M(S("*"), "--color-darker-m1", "var(--bg-white)");
      M(S("*"), "--hover-bg", "var(--gradient-red-hover)");
      M(S(".education-div"), "--color-darker-m1", "var(--color-lighter)");
      M(S(".portfolio-card"), "--hover-bg", "var(--bg-white)");
  
    } else {
      $("#theme-icon").addClass("fa-moon");
      M(S("*"), "--shadow-manipulate", "var(--shadow-1)");
      M(S("*"), "--bg-manipulate-1", "var(--background-color-1)");
      M(S("*"), "--color-darker-m1", "var(--color-darker)");
      M(S("*"), "--hover-bg", "var(--background-color-1)");
      M(S(".education-div"), "--color-darker-m1", "var(--color-darker)");
      M(S(".portfolio-card"), "--hover-bg", "var(--background-color-1)");
    }
    $("body").toggleClass("light-mode");
    $('section').toggleClass('light-border-line')
    $(".light-mode-shadow, header, #theme-icon").toggleClass("toggle-shadow");
  });
});
