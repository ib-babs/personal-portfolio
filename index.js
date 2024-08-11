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

  this.window.addEventListener("scroll", function () {
    if (this.scrollY > 150)
      $("header").attr(
        "style",
        "background: #1e2024ee; position: sticky; top: 0; backdrop-filter: blur(4px); box-shadow: var(--shadow-1); transition: top, ease 1s"
      );
    else {
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
  tabHandler(rtab, rtabs)
  // Price tabs
  tabHandler(ptab, ptabs, progress=false)

  // Development Skill Progress bard
  $.each($(".progress-bar"), function (idx, bar) {
    $(bar).css(
      "background",
      `linear-gradient(
        145deg,
        var(--color-primary-gradient-from) 10%,
        var(--color-primary-gradient-to) ${$(bar).data("value")}%,
        var(--color-darker) 10%
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

  $('#send-msg-btn').click(()=>{
    $('#loading-div').removeClass('hide')
  })
});
