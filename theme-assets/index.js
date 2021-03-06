$(document).ready(function(e) {
    var t, a = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    function n(t) {
        t < 1199 ? e(".js-header .js-nav, .js-header .js-btns").appendTo(".js-mobile-nav-inner") : (e(".js-mobile-nav .js-nav, .js-mobile-nav .js-btns").insertBefore(".js-mobile-nav-trigger"), e(".js-has-submenu").on("mouseover", function(t) {
            t.preventDefault(), e(this).find(".js-submenu").removeClass("invisible opacity-0 pointer-events-none")
        }), e(".js-has-submenu").on("mouseleave", function(t) {
            t.preventDefault(), e(this).find(".js-submenu").addClass("invisible opacity-0 pointer-events-none")
        }))
    }

    function i(t) {
        t < 768 ? (e(".js-footer .js-collapse").attr("aria-expanded", "false").addClass("js-collapsed"), e(".js-footer .js-collapse").addClass("hidden collapsed"), e(".js-footer .js-collapse-trigger").addClass("collapsed")) : (e(".js-footer .js-collapse").attr("aria-expanded", "true").removeClass("js-collapsed"), e(".js-footer .js-collapse").removeClass("hidden collapsed"))
    }
    n(a), i(a), e(window).on("resize", function(s) {
        n(a = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)), i(a), e(".js-using-snt").length && (a > 767 ? null == t && (t = e(".js-items").masonry({
            itemSelector: ".js-item"
        })).masonry("layout") : null != t && (t.masonry("destroy"), t = null))
    }), e(".js-language-selector").on("mouseover", function(t) {
        t.preventDefault(), e(".js-language-selector-list").removeClass("invisible opacity-0 pointer-events-none scale-95 mb-12"), e(".js-language-selector-trigger").addClass("bg-black text-white")
    }), e(".js-language-selector").on("mouseleave", function(t) {
        t.preventDefault(), e(".js-language-selector-list").addClass("invisible opacity-0 pointer-events-none scale-95 mb-12"), e(".js-language-selector-trigger").removeClass("bg-black text-white")
    }), e(".js-using-snt").imagesLoaded(function() {
        a > 767 && (t = e(".js-items").masonry({
            itemSelector: ".js-item"
        })).masonry("layout")
    }), e(".js-box-remember").wrap("<div class='bg-gray-100 flex my-12 shadow-lg'></div>"), e(".js-box-remember").before("<div class='bg-primary-base py-12 flex flex-shrink-0 w-32 items-center justify-center'><img src='/img/box-remember.svg' width='64')'></div>"), e(".js-mobile-nav-trigger").on("click", function(t) {
        t.preventDefault(), e(".js-mobile-nav").removeClass("invisible opacity-0 pointer-events-none scale-95 mt-8"), e(".js-backdrop").removeClass("invisible opacity-0 pointer-events-none")
    }), e(".js-backdrop, .js-mobile-nav-trigger-close").on("click", function(t) {
        t.preventDefault(), e(".js-mobile-nav").addClass("invisible opacity-0 pointer-events-none scale-95 mt-8"), e(".js-backdrop").addClass("invisible opacity-0 pointer-events-none"), e(".js-sidebar-inner").addClass("invisible opacity-0 pointer-events-none scale-95 mt-8")
    }), e(".js-community-nav-trigger-close, .js-backdrop-community-nav, .js-community-nav-trigger").on("click", function(t) {
        t.preventDefault(), e(".js-community-nav").toggleClass("invisible opacity-0 pointer-events-none scale-95 mt-8"), e(".js-backdrop-community-nav").toggleClass("invisible opacity-0 pointer-events-none scale-95")
    });
    try {
        s()
    } catch (e) {
        setTimeout(function() {
            s()
        }, 2500)
    }

    function s() {
        e(".js-editor-content pre code").each(function(e, t) {
            hljs.highlightBlock(t)
        })
    }
    if (e(".recently-updated").length) {
        var o = "";
        void 0 !== Cookies.get("recently-updated") ? e(".recently-updated").append(Cookies.get("recently-updated")) : fetch("https://api.github.com/users/status-im/repos?sort=updated&per_page=3").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                t.forEach(function(e) {
                    o += '<li><a href="' + e.html_url + '">' + e.full_name + "</a></li>"
                }), Cookies.set("recently-updated", o, {
                    expires: 1
                }), e(".recently-updated").append(o)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        })
    }
    if (e("#advocacy-programs").length) {
        e.ajax({
            type: "get",
            url: "https://statusphere.status.im/api/v1/boards/public/?is_featured=true&org=375",
            success: function(t) {
                e.each(t, function(t, a) {
                    var n = a.description.substr(0, 200) + "...";
                    e("#advocacy-programs").prepend('<div class="inner">                 <a href="https://statusphere.status.im/b/' + a.uuid + '/view" class="card-inner">                   ' + a.title + '                </a>                 <p class="details">' + n + "</p>               </div>")
                })
            }
        })
    }
    if (e(".js-sidebar").stick_in_parent({
            offset_top: 30
        }), e('input[name="userSearch"]').length && (window.addEventListener("click", function(t) {
            document.getElementById("search-form").contains(t.target) ? e("#search-form").removeClass("inactive") : e("#search-form").addClass("inactive")
        }), e('input[name="userSearch"]').on("keyup", function() {
            var t = e(this).val();
            e("#search-results").empty(), e.ajax({
                url: "https://search.infra.status.im/status.im/_search?size=10&_source=title,url&&q=" + t
            }).done(function(t) {
                e.each(t.hits.hits, function(t, a) {
                    e('<a class="border-t border-gray-100 py-4 text-gray-900 block first:border-t-0 hover:text-primary-base" href="' + a._source.url + '">' + a._source.title + "</a>").appendTo("#search-results")
                })
            })
        })), e(".js-scrollto").on("click", function(t) {
            t.preventDefault();
            var a = e(this).attr("href");
            e("html, body").animate({
                scrollTop: e(a).offset().top
            }, 300)
        }), 2 === window.location.href.split("jobs.html?").length && e("#jobs-description").css("display", "none"), e(".js-announcement").length) {
        e.ajax({
            url: "https://our.status.im/ghost/api/v2/content/posts/?key=10e7f8c1f793d2945ea1177076&limit=1&fields=title,url"
        }).done(function(t) {
            e(".js-announcement b").text(t.posts[0].title), e(".js-announcement").attr("href", t.posts[0].url).removeClass("inactive")
        }).fail(function() {
            e.ajax({
                url: "https://our.status.im/ghost/api/v0.1/posts/?include=tags&formats=plaintext&client_id=ghost-frontend&client_secret=2b055fcd57ba&limit=1"
            }).done(function(t) {
                e(".js-announcement b").text(t.posts[0].title), e(".js-announcement").attr("href", "https://our.status.im" + t.posts[0].url).removeClass("inactive")
            })
        })
    }
    if (e(".js-sidebar-mobile-trigger").on("click", function(t) {
            t.preventDefault(), e(".js-sidebar-inner").removeClass("invisible opacity-0 pointer-events-none scale-95 mt-8"), e(".js-backdrop").removeClass("invisible opacity-0 pointer-events-none")
        }), e(".js-mobile-sidebar-trigger-close").on("click", function(t) {
            t.preventDefault(), e(".js-sidebar-inner").addClass("invisible opacity-0 pointer-events-none scale-95 mt-8"), e(".js-backdrop").addClass("invisible opacity-0 pointer-events-none")
        }), e(".js-quick-nav").length) {
        var r = e(".js-quick-nav").offset().top;
        e(window).on("resize", function() {
            r = e(".js-quick-nav").offset().top
        }), e(window).on("scroll", function() {
            e(window).scrollTop() > r ? (e(".js-quick-nav, .js-quick-nav-sub").addClass("fixed"), e(".js-quick-nav, .js-quick-nav-sub").removeClass("absolute")) : (e(".js-quick-nav, .js-quick-nav-sub").removeClass("fixed"), e(".js-quick-nav, .js-quick-nav-sub").addClass("absolute"))
        }), e(".js-quick-nav-sub ul li a").on("click", function(t) {
            t.preventDefault();
            var a = e(this).attr("href");
            e("html, body").animate({
                scrollTop: e(a).offset().top - 100
            }, 300)
        })
    }
    if (e(".open-issues").length) {
        var l = "";
        void 0 !== Cookies.get("open-issues-react") ? e(".open-issues-react").append(localStorage.getItem("open-issues-react")) : fetch("https://api.github.com/repos/status-im/status-react/issues?sort=created&per_page=30").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                var a = 0;
                t.forEach(function(e) {
                    if (void 0 === e.pull_request && a < 4) {
                        var t = new Date,
                            n = '<div class="tags">';
                        e.labels.forEach(function(e) {
                            n += '<div class="tag">' + e.name + "</div>"
                        }), n += "</div>", l += '<li>                         <div class="number">#' + e.number + '</div>                         <div class="details">                           <b><a href="' + e.html_url + '" target="_blank">' + e.title + "</a></b>                             " + n + '                           <div class="opened">                             Opened: <time>' + m(t, new Date(e.created_at)) + '</time>                           </div>                           <div class="activity">                             Last activity: <time>' + m(t, new Date(e.updated_at)) + "</time>                           </div>                         </div>                       </li>", a++
                    }
                }), localStorage.removeItem("open-issues-react"), localStorage.setItem("open-issues-react", l), Cookies.set("open-issues-react", !0, {
                    expires: 1
                }), e(".open-issues-react").append(l)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        });
        var c = "";
        void 0 !== Cookies.get("open-issues-go") ? e(".open-issues-go").append(localStorage.getItem("open-issues-go")) : fetch("https://api.github.com/repos/status-im/status-go/issues?sort=created&per_page=30").then(function(t) {
            200 === t.status ? t.json().then(function(t) {
                var a = 0;
                t.forEach(function(e) {
                    if (void 0 === e.pull_request && a < 4) {
                        var t = new Date,
                            n = '<div class="tags">';
                        e.labels.forEach(function(e) {
                            n += '<div class="tag">' + e.name + "</div>"
                        }), n += "</div>", c += '<li>                         <div class="number">#' + e.number + '</div>                         <div class="details">                           <b><a href="' + e.html_url + '" target="_blank">' + e.title + "</a></b>                             " + n + '                           <div class="opened">                             Opened: <time>' + m(t, new Date(e.created_at)) + '</time>                           </div>                           <div class="activity">                             Last activity: <time>' + m(t, new Date(e.updated_at)) + "</time>                           </div>                         </div>                       </li>", a++
                    }
                }), localStorage.removeItem("open-issues-go"), localStorage.setItem("open-issues-go", c), Cookies.set("open-issues-go", !0, {
                    expires: 1
                }), e(".open-issues-go").append(c)
            }) : console.log("Looks like there was a problem. Status Code: " + t.status)
        }).catch(function(e) {
            console.log("Fetch Error :-S", e)
        })
    }
    if (e(window).scroll(function() {
            const t = e("#header");
            e(window).scrollTop() ? t.css({
                position: "sticky",
                width: "100%",
                top: "0",
                background: "#FFFFFF",
                boxShadow: "0px 3px 40px rgba(0, 0, 0, 0.04)"
            }) : t.css({
                position: "",
                width: "%",
                top: "",
                background: "",
                boxShadow: ""
            })
        }), "Status - Partner Campaign Template" === document.title || "Status - criptomaniacos" === document.title) {
        let t = a;
        const n = {
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)"
            },
            i = {
                position: "",
                left: "",
                transform: ""
            },
            s = {
                width: "65%",
                "padding-left": "45px",
                "padding-bottom": "50px",
                height: ""
            },
            o = {
                height: "400px",
                width: "",
                "padding-left": "",
                "padding-bottom": ""
            },
            r = {
                margin: "100px auto 0 auto",
                height: "400px"
            },
            l = {
                "margin-top": "30px",
                width: "300px",
                height: "350px"
            };
        e("footer").css("display", "none"), e(".splide__arrow").css("display", "none"), e(".splide__pagination").css("bottom", "-3rem"), e(".splide__pagination__page.is-active").css("background", "#ccc"), e(".partner-phone img").css(r), e(".partner-phone-mobile img").css(l), a < 768 ? (e(".logo img").css(n), e("header").css("margin-top", "5px"), e(".partner-hero-image img").css(o), e(".image-slider").show(), e(".desktop-tiles").hide(), e(".partner-cta-mobile").show(), e(".desktop-features").hide()) : (e(".logo img").css(i), e(".partner-hero-image img").css(s), e(".image-slider").hide(), e(".desktop-tiles").show(), e(".partner-cta-mobile").hide(), e(".desktop-features").show()), window.addEventListener("resize", function(a) {
            (t = document.body.clientWidth) < 768 ? (e(".logo img").css(n), e(".partner-hero-image img").css(o), e("header").css("margin-top", "5px"), e(".image-slider").show(), e(".desktop-tiles").hide(), e(".partner-cta-mobile").show(), e(".desktop-features").hide()) : (e(".logo img").css(i), e(".partner-hero-image img").css(s), e(".image-slider").hide(), e(".desktop-tiles").show(), e(".partner-cta-mobile").hide(), e(".desktop-features").show())
        })
    }
    e(".js-right-sub-navigation").length && (e(".js-editor-content h1, .js-editor-content h2, .js-editor-content h3").each(function(t, a) {
        var n = e(this).attr("id"),
            i = e(this).text();
        if ("Jobs at Status" === i) return e(".js-right-sub-navigation").css("display", "none"), !1;
        e(".js-right-sub-navigation ul").append('<li class="mt-8 hover:text-primary-base transition-all duration-200 linear text-lg li-' + e(this)[0].nodeName.toLowerCase() + '"><a href="#' + n + '" class="text-gray-500 antialiased">' + i + "</a></li>")
    }), e(".js-right-sub-navigation").stick_in_parent({
        offset_top: 30
    }), e(".js-right-sub-navigation a").on("click", function() {
        var t = e(this).attr("href");
        return e("html, body").animate({
            scrollTop: e(t).offset().top - 50
        }, 500), !1
    })), ScrollReveal().reveal(".keycard-animate-1", {
        opacity: 1,
        duration: 0,
        viewFactor: .5,
        afterReveal: function() {
            anime({
                targets: ".keycard-animate-1 .card",
                scale: [.7, 1],
                rotateX: [-10, 0],
                rotateY: [10, 0],
                rotateZ: [15, 0],
                duration: 750,
                easing: "easeInOutQuad",
                delay: 100
            }), anime({
                targets: ".keycard-animate-1 .phone",
                scale: [.95, 1],
                translateX: [-30, 0],
                duration: 750,
                easing: "easeInOutQuad",
                delay: 100
            }), anime({
                targets: ".keycard-animate-1 .circles",
                scale: [.9, 1],
                duration: 750,
                easing: "easeInOutQuad",
                delay: 100
            })
        }
    }), ScrollReveal().reveal(".keycard-animate-2", {
        opacity: 1,
        duration: 0,
        viewFactor: .5,
        afterReveal: function() {
            anime({
                targets: ".keycard-animate-2 .front-1",
                translateX: [-50, 0],
                scale: [.7, 1],
                rotateX: [-10, 0],
                rotateY: [0, 0],
                rotateZ: [-10, 0],
                duration: 750,
                easing: "easeInOutQuad"
            }), anime({
                targets: ".keycard-animate-2 .front-2",
                scale: [.7, 1],
                rotateX: [-10, 0],
                rotateY: [0, 0],
                rotateZ: [-10, 0],
                duration: 750,
                easing: "easeInOutQuad",
                delay: 100
            }), anime({
                targets: ".keycard-animate-2 .front-3",
                translateX: [50, 0],
                scale: [.7, 1],
                rotateX: [0, 0],
                rotateY: [0, 0],
                rotateZ: [-10, 0],
                duration: 750,
                easing: "easeInOutQuad",
                delay: 200
            })
        }
    });
    var d = 1;

    function u(t, n, i) {
        t.text().length < n.length ? (t.text(t.text() + n.charAt(i)), i++, setTimeout(function() {
            u(e(".keycard-animate-3 .amount span"), "15", i)
        }, 200)) : anime({
            targets: ".keycard-animate-3 .morph",
            left: 0,
            width: "100%",
            bottom: 0,
            duration: 500,
            delay: 300,
            height: "160px",
            zIndex: "4",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: "22px",
            borderBottomLeftRadius: "22px",
            easing: "easeInOutQuad",
            changeBegin: function(t) {
                e(".keycard-animate-3").attr("data-step", 2)
            },
            complete: function(t) {
                anime({
                    targets: ".keycard-animate-3 .morph .step-2 .circles",
                    duration: 3e3,
                    keyframes: [{
                        opacity: .6,
                        scale: .6
                    }, {
                        opacity: .3,
                        scale: 1
                    }, {
                        opacity: .6,
                        scale: .6
                    }, {
                        opacity: .3,
                        scale: 1
                    }, {
                        opacity: .6,
                        scale: .6
                    }, {
                        opacity: .3,
                        scale: 1
                    }],
                    easing: "easeInOutQuad"
                });
                anime({
                    targets: ".keycard-animate-3 .front-4",
                    duration: 2e3,
                    keyframes: [{
                        translateX: 0,
                        opacity: 1
                    }, {
                        translateX: 70,
                        delay: 1200
                    }],
                    easing: "easeInOutQuad",
                    complete: function(t) {
                        var n = "calc(100% + 140px)",
                            i = "-70px",
                            s = "102px";
                        a < 1200 && (n = "calc(100% + 100px)", i = "-50px", s = "82px"), anime({
                            targets: ".keycard-animate-3 .morph",
                            left: i,
                            width: n,
                            bottom: "20px",
                            duration: 500,
                            height: s,
                            backgroundColor: "#4EBC60",
                            borderTopLeftRadius: "12px",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            easing: "easeInOutQuad",
                            begin: function(t) {
                                e(".keycard-animate-3").attr("data-step", 3)
                            }
                        }), anime({
                            targets: ".keycard-animate-3 .front-4",
                            opacity: 0,
                            delay: 1e3,
                            duration: 500,
                            easing: "linear"
                        })
                    }
                })
            }
        })
    }
    a < 1200 && (d = .8), ScrollReveal().reveal(".keycard-animate-3", {
        opacity: 1,
        duration: 0,
        viewFactor: d,
        afterReveal: function() {
            anime({
                targets: ".keycard-animate-3 .morph",
                opacity: [0, 1],
                translateY: [20, 0],
                scale: [.8, 1],
                duration: 500,
                easing: "easeInOutQuad",
                complete: function(t) {
                    setTimeout(function() {
                        ! function t(a, n) {
                            var i = a.text();
                            i.length > 0 ? (a.text(i.substring(0, i.length - 1)), setTimeout(function() {
                                t(a, n)
                            }, 200)) : (e(".keycard-animate-3 .amount span").addClass("active"), u(e(".keycard-animate-3 .amount span"), "15", 0))
                        }(e(".keycard-animate-3 .amount span"), u)
                    }, 300)
                }
            })
        }
    });
    var p = 1;

    function m(e, t) {
        var a = e - t;
        return a < 6e4 ? Math.round(a / 1e3) + " seconds ago" : a < 36e5 ? Math.round(a / 6e4) + " minutes ago" : a < 864e5 ? Math.round(a / 36e5) + " hours ago" : a < 2592e6 ? Math.round(a / 864e5) + " days ago" : a < 31536e6 ? Math.round(a / 2592e6) + " months ago" : Math.round(a / 31536e6) + " years ago"
    }
    a < 1200 && (p = .8), ScrollReveal().reveal(".keycard-animate-4", {
            opacity: 1,
            duration: 0,
            viewFactor: p,
            afterReveal: function() {
                for (var t = [2, 7, 6, 0, 1, 5], n = 0; n < t.length; n++) anime({
                    targets: ".keycard-animate-4 .numbers .nr-" + t[n],
                    delay: 500 * n,
                    backgroundColor: "#536DE1",
                    color: "#fff",
                    duration: 200,
                    easing: "easeInOutQuad",
                    direction: "alternate"
                }), anime({
                    targets: ".keycard-animate-4 .dots .dot-" + n,
                    delay: 500 * n,
                    backgroundColor: "#536DE1",
                    duration: 200,
                    easing: "easeInOutQuad"
                });
                setTimeout(function() {
                    anime({
                        targets: ".keycard-animate-4 .morph",
                        duration: 500,
                        delay: 300,
                        translateY: ["100%", 0],
                        easing: "easeInOutQuad",
                        changeBegin: function(t) {
                            e(".keycard-animate-4").attr("data-step", 2)
                        },
                        complete: function(t) {
                            anime({
                                targets: ".keycard-animate-4 .morph .step-2 .circles",
                                duration: 3e3,
                                keyframes: [{
                                    opacity: .6,
                                    scale: .6
                                }, {
                                    opacity: .3,
                                    scale: 1
                                }, {
                                    opacity: .6,
                                    scale: .6
                                }, {
                                    opacity: .3,
                                    scale: 1
                                }, {
                                    opacity: .6,
                                    scale: .6
                                }, {
                                    opacity: .3,
                                    scale: 1
                                }],
                                easing: "easeInOutQuad"
                            });
                            anime({
                                targets: ".keycard-animate-4 .front-4",
                                duration: 2e3,
                                keyframes: [{
                                    translateX: 0,
                                    opacity: 1
                                }, {
                                    translateX: 70,
                                    delay: 1200
                                }],
                                easing: "easeInOutQuad",
                                complete: function(t) {
                                    var n = "360px",
                                        i = "-70px",
                                        s = "102px";
                                    a < 1200 && (n = "281px", i = "-50px", s = "82px"), anime({
                                        targets: ".keycard-animate-4 .morph",
                                        left: i,
                                        width: n,
                                        bottom: "20px",
                                        duration: 500,
                                        height: s,
                                        backgroundColor: "#4EBC60",
                                        borderTopLeftRadius: "12px",
                                        borderTopRightRadius: "12px",
                                        borderBottomRightRadius: "12px",
                                        borderBottomLeftRadius: "12px",
                                        easing: "easeInOutQuad",
                                        begin: function(t) {
                                            e(".keycard-animate-4").attr("data-step", 3)
                                        }
                                    }), anime({
                                        targets: ".keycard-animate-4 .front-4",
                                        opacity: 0,
                                        delay: 1e3,
                                        duration: 500,
                                        easing: "linear"
                                    })
                                }
                            })
                        }
                    })
                }, 3e3)
            }
        }), ScrollReveal().reveal(".private-and-secure", {
            opacity: 1,
            duration: 0,
            viewFactor: 1,
            afterReveal: function() {
                ! function e() {
                    anime({
                        targets: ".private-and-secure .avatar",
                        keyframes: [{
                            scale: 1
                        }, {
                            scale: .7
                        }, {
                            scale: 1
                        }],
                        duration: 1e3,
                        easing: "easeInOutQuad"
                    });
                    anime({
                        targets: ".private-and-secure .key",
                        opacity: 1,
                        duration: 300,
                        translateX: 72,
                        translateY: -100,
                        scale: [0, 1],
                        delay: 800,
                        easing: "linear",
                        complete: function(t) {
                            anime({
                                targets: ".private-and-secure .key",
                                rotate: 90,
                                duration: 400,
                                easing: "linear",
                                delay: 300,
                                complete: function(t) {
                                    anime({
                                        targets: ".private-and-secure .lock .absolute",
                                        translateY: -3,
                                        easing: "linear",
                                        duration: 300,
                                        delay: 200,
                                        complete: function(t) {
                                            anime({
                                                targets: ".private-and-secure .overlay",
                                                opacity: [1, 0],
                                                duration: 300,
                                                easing: "linear",
                                                delay: 200,
                                                complete: function(t) {
                                                    anime({
                                                        targets: ".private-and-secure .lock .absolute",
                                                        translateY: 0,
                                                        duration: 300,
                                                        easing: "linear",
                                                        delay: 1e3
                                                    }), anime({
                                                        targets: ".private-and-secure .overlay",
                                                        opacity: [0, 1],
                                                        duration: 300,
                                                        easing: "linear",
                                                        delay: 1e3
                                                    }), anime({
                                                        targets: ".private-and-secure .key",
                                                        rotate: 0,
                                                        translateX: 0,
                                                        translateY: 0,
                                                        scale: [1, 0],
                                                        duration: 300,
                                                        easing: "linear",
                                                        delay: 1e3,
                                                        complete: function(t) {
                                                            setTimeout(function() {
                                                                e()
                                                            }, 500)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }()
            }
        }), ScrollReveal().reveal(".home-all", {
            opacity: 1,
            delay: 500,
            duration: 0,
            viewFactor: .5,
            afterReveal: function() {
                ! function e() {
                    anime({
                        targets: ".home-all .img-1",
                        translateX: [-160, 0],
                        duration: 1e3,
                        easing: "linear"
                    });
                    anime({
                        targets: ".home-all .img-3",
                        translateX: [160, 0],
                        duration: 1e3,
                        easing: "linear",
                        complete: function(t) {
                            anime({
                                targets: ".home-all .overlay",
                                opacity: [0, 1],
                                duration: 500,
                                easing: "linear",
                                complete: function(t) {
                                    anime({
                                        targets: ".home-all .circles-container",
                                        scale: [0, 1],
                                        opacity: [0, 1],
                                        duration: 1500,
                                        easing: "linear",
                                        complete: function(t) {
                                            anime({
                                                targets: ".home-all .circles-container",
                                                scale: [1, 0],
                                                opacity: [1, 0],
                                                duration: 1500,
                                                delay: 500,
                                                easing: "linear",
                                                complete: function(t) {
                                                    anime({
                                                        targets: ".home-all .overlay",
                                                        opacity: [1, 0],
                                                        duration: 500,
                                                        easing: "linear",
                                                        complete: function(t) {
                                                            anime({
                                                                targets: ".home-all .img-1",
                                                                translateX: [0, -160],
                                                                duration: 1e3,
                                                                easing: "linear"
                                                            }), anime({
                                                                targets: ".home-all .img-3",
                                                                translateX: [0, 160],
                                                                duration: 1e3,
                                                                easing: "linear",
                                                                complete: function(t) {
                                                                    setTimeout(function() {
                                                                        e()
                                                                    }, 1500)
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }()
            }
        }),
        function e() {
            anime({
                targets: ".privacy-first-step-1 .lock .absolute",
                translateY: -3,
                easing: "linear",
                duration: 300,
                delay: 500,
                complete: function(t) {
                    anime({
                        targets: ".privacy-first-step-1",
                        opacity: [1, 0],
                        easing: "linear",
                        duration: 300,
                        delay: 300
                    }), anime({
                        targets: ".privacy-first-step-2",
                        opacity: [0, 1],
                        easing: "linear",
                        duration: 300,
                        delay: 500,
                        complete: function(t) {
                            anime({
                                targets: ".privacy-first-step-1",
                                opacity: [0, 1],
                                easing: "linear",
                                duration: 300,
                                delay: 2e3
                            }), anime({
                                targets: ".privacy-first-step-2",
                                opacity: [1, 0],
                                easing: "linear",
                                duration: 300,
                                delay: 2e3,
                                complete: function(t) {
                                    anime({
                                        targets: ".privacy-first-step-1 .lock .absolute",
                                        translateY: 0,
                                        easing: "linear",
                                        duration: 300,
                                        delay: 500,
                                        complete: function(t) {
                                            setTimeout(function() {
                                                e()
                                            }, 1500)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }()
});