console.log("%c Proudly Crafted with ZiOn.", "background: #222; color: #bada55"),
    function(e) {
        "use strict";

        function t(t) {
            var a = 0;
            return "height" == t && (a = window.innerHeight ? window.innerHeight : e(window).height()), "width" == t && (a = window.innerWidth ? window.innerWidth : e(window).width()), a
        }

        function a(e) {
            var t = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            return t.test(e)
        }

        function i() {
            t("width") < 768 ? e("body").removeClass("desktop").removeClass("tablet").addClass("mobile") : t("width") < 992 ? e("body").removeClass("mobile").removeClass("desktop").addClass("tablet") : e("body").removeClass("mobile").removeClass("tablet").addClass("desktop")
        }

        function n(e) {
            var t = document.getElementById("tweet-js"),
                a = (e[0], '<h4 class="title"><i class="fa fa-twitter"></i></h4>' + e[0]);
            t.innerHTML = a
        }
        var s = function(a, i, n) {
            var s = e(a),
                o = s.find(i),
                l = (t("width"), t("height")),
                r = o.height();
            l >= r + 2 * n ? (s.css({
                height: l + "px",
                position: "relative"
            }), o.css({
                "padding-top": (l - r) / 2 + "px",
                "padding-bottom": (l - r) / 2 + "px"
            }), console.log(l, r, (l - r) / 2)) : (s.css({
                height: "Initial",
                position: "relative"
            }), o.css({
                "padding-top": n + "px",
                "padding-bottom": n + "px"
            }))
        };
        e(window).resize(function() {
            i(), s(".full-screen-js", ".inner-wrapper", 135)
        }), e(document).ready(function() {
            function o(t) {
                "success" === t.result ? (e(".subscription-success").html('<i class="icon icon-icon-check-alt2"></i>&nbsp;' + t.msg).delay(500).fadeIn(1e3), e(".subscription-failed").fadeOut(500)) : "error" === t.result && (e(".subscription-failed").html('<i class="icon icon-icon-close-alt2"></i>&nbsp;' + t.msg).delay(500).fadeIn(1e3), e(".subscription-success").fadeOut(500)), e("#mailchimp-subscribe, #mailchimp-subscribe-2").find("button").text("Submit")
            }

            function l(e) {
                var t = this.currentItem;
                h.find(".owl-item").removeClass("synced").eq(t).addClass("synced")
            }
            i(), s(".full-screen-js", ".inner-wrapper", 135), e(".dropdowns").hover(function() {
                e(this).addClass("sub-menue-hover").children(".sub-menu").stop().slideDown(200)
            }, function() {
                e(this).removeClass("sub-menue-hover").children(".sub-menu").stop().slideUp(200)
            });
            var r = ".quick-search-form";
            e(r).find(".btn-quick-button").on("click", function(t) {
                var a = e(this).closest(r),
                    i = a.find(".search-form"),
                    n = "quick-search-close";
                t.preventDefault(), a.hasClass(n) ? (a.removeClass(n), setTimeout(function() {
                    i.fadeOut(100)
                }, 100)) : (i.fadeIn(100), setTimeout(function() {
                    a.addClass(n)
                }, 100))
            }), e(document).on("scroll", function() {
                var a = "navbar-home",
                    i = ".main-navbar-top",
                    n = e(this).scrollTop();
                n > e(".header-section-1, .header-section-2").height() ? e(i).addClass(a) : e(i).removeClass(a), t("width") >= 768 ? n >= e(".navbar-top-outer").height() ? e(".navbar-fixed-top").css({
                    "margin-top": -e(".navbar-top-outer").height() + "px",
                    position: "fixed"
                }) : e(".navbar-fixed-top").css({
                    "margin-top": "0px",
                    position: "absolute"
                }) : e(".navbar-fixed-top").css({
                    "margin-top": "0px",
                    position: "fixed"
                })
            }), e(".btn-scroll a, a.btn-scroll").on("click", function(t) {
                t.preventDefault();
                var a = this.hash,
                    i = Math.abs(e(TopOffsetId).outerHeight()),
                    n = (e(a).offset() || {
                        top: NaN
                    }).top;
                e("html, body").stop().animate({
                    scrollTop: n - i
                }, 900, "swing", function() {
                    window.location.hash = a
                })
            }), e(".popup-video").magnificPopup({
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !0,
                fixedContentPos: !0
            }), e(".count-down").countdown({
                end_time: "2017/12/13 14:27:28 +0600",
                wrapper: function(t) {
                    var a = e("<div></div>").addClass(t.toLowerCase() + "_wrapper").addClass("each-item"),
                        i = e("<div></div>").addClass("inner").appendTo(a),
                        n = e("<div></div>").addClass("group").appendTo(i);
                    return e('<h1 class="counter number"></h1>').appendTo(n), e('<hr class="lines"></hr>').appendTo(n), e('<h6 class="title">' + t + "</h6>").appendTo(n), a
                }
            });
            var c = e(".contact-us-model"),
                d = c.find(".dropdown-menu li").eq(1).find("img").attr("src"),
                u = c.find(".dropdown-toggle").find("img");
            u.attr("src", d), c.find(".dropdown-menu").find("a").on("click", function(t) {
                    t.preventDefault(), d = e(this).find("img").attr("src"), u.attr("src", d), console.log("sflkjsfkljdsflsjfljsl")
                }), e("#contact-form").on("submit", function(t) {
                    t.preventDefault();
                    var a = e(this).find(".email-success"),
                        i = e(this).find(".email-failed"),
                        n = (e(this).find(".email-loading"), e(this).find("button")),
                        s = e(this).attr("action"),
                        o = {
                            name: e(this).find(".contact-name").val(),
                            plan: e(this).find(".contact-plan").val(),
                            message: e(this).find(".contact-message").val()
                        };
                    return o.plan.length > 1 && o.message.length > 1 && o.name.length > 1 ? e.ajax({
                        type: "POST",
                        url: s,
                        data: o,
                        beforeSend: function() {
                            n.text("Sending..."), a.fadeOut(), i.fadeOut()
                        },
                        success: function(e) {
                            i.fadeOut(400), a.delay(400).fadeIn(400)
                        },
                        error: function(e) {
                            a.fadeOut(400), i.delay(400).fadeIn(200)
                        },
                        complete: function() {
                            n.text("Send Now")
                        }
                    }) : (a.fadeOut(400), i.delay(400).fadeIn(400)), !1
                }), e("#contact-form-2").on("submit", function(t) {
                    t.preventDefault();
                    var i = e(this).find(".email-success"),
                        n = e(this).find(".email-failed"),
                        s = (e(this).find(".email-loading"), e(this).find("button")),
                        o = e(this).attr("action"),
                        l = {
                            name: e(this).find(".contact-name").val(),
                            email: e(this).find(".contact-email").val(),
                            message: e(this).find(".contact-message").val()
                        };
                    return a(email) && l.message.length > 1 && l.name.length > 1 ? e.ajax({
                        type: "POST",
                        url: o,
                        data: l,
                        beforeSend: function() {
                            s.text("Sending..."), i.fadeOut(), n.fadeOut()
                        },
                        success: function(e) {
                            n.fadeOut(400), i.delay(400).fadeIn(400)
                        },
                        error: function(e) {
                            i.fadeOut(400), n.delay(400).fadeIn(200)
                        },
                        complete: function() {
                            s.text("Proceed")
                        }
                    }) : (i.fadeOut(400), n.delay(400).fadeIn(400)), !1
                }), e("#mailchimp-subscribe, #mailchimp-subscribe-2").find("button").on("click", function() {
                    e(this).text("loading...")
                }), e("#mailchimp-subscribe, #mailchimp-subscribe-2").ajaxChimp({
                    callback: o,
                    url: "http://technextit.us3.list-manage.com/subscribe/post?u=9e945cce9a6497869d2d3cd79&amp;id=a3aff233b6"
                }), e("#local-subscribe").on("submit", function(t) {
                    t.preventDefault();
                    var i = {
                            email: e(this).find(".subscriber-email").val()
                        },
                        n = e(this).attr("action");
                    return a(i.email) ? e.ajax({
                        type: "POST",
                        url: n,
                        data: i,
                        success: function() {
                            e(".subscription-success").fadeIn(1e3), e(".subscription-failed").fadeOut(500)
                        }
                    }) : (e(".subscription-failed").fadeIn(1e3), e(".subscription-success").fadeOut(500)), e("#mailchimp-subscribe, #mailchimp-subscribe-2").find("button").text("Submit"), !1
                }), e(".btn-map").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this).closest(".contact-address-area");
                    e(this).find(".fa");
                    a.hasClass("showMap") ? a.removeClass("showMap").addClass("hideMap") : a.removeClass("hideMap").addClass("showMap")
                }),
                function() {
                    if (e("#funfacts").html()) {
                        new Waypoint.Inview({
                            element: e("#funfacts")[0],
                            enter: function(t) {
                                e(".count.number").each(function() {
                                    e(this).prop("Counter", 0).animate({
                                        Counter: e(this).text()
                                    }, {
                                        duration: 3e3,
                                        easing: "swing",
                                        step: function(t) {
                                            e(this).text(Math.ceil(t))
                                        }
                                    })
                                }), this.destroy()
                            }
                        })
                    }
                }();
            var f = e(".carousel-wrapper");
            f.owlCarousel({
                margin: 30,
                autoPlay: 3e3,
                stopOnHover: !0,
                pagination: !0,
                singleItem: !0
            });
            var h = e(".carousel-home-slider .carousel-home-wrapper");
            if (h.owlCarousel({
                    margin: 30,
                    autoPlay: 3e3,
                    stopOnHover: !0,
                    singleItem: !0,
                    pagination: !1,
                    slideSpeed: 900,
                    responsiveRefreshRate: 100,
                    afterInit: function(e) {
                        e.find(".owl-item").eq(0).addClass("synced")
                    },
                    transitionStyle: "fade",
                    afterAction: l,
                    navigation: !0,
                    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    dragBeforeAnimFinish: !1,
                    mouseDrag: !1,
                    touchDrag: !1
                }), e("#tweet-js").length) {
                var m = {
                    id: "345170787868762112",
                    maxTweets: 1,
                    enableLinks: !0,
                    showUser: !1,
                    showTime: !1,
                    showRetweet: !1,
                    showInteraction: !1,
                    customCallback: n
                };
                twitterFetcher.fetch(m)
            }
            var p = ".mapCall";
            if (e(p).length) {
                var b, g = [{
                    lat: 45.9,
                    lon: 10.85,
                    title: "Title A1",
                    html: "<h3>Content A1</h3>",
                    icon: "assets/images/map-location.png",
                    animation: google.maps.Animation.DROP
                }];
                b = !(t("width") < 768), new Maplace({
                    locations: g,
                    map_div: p,
                    start: 4,
                    view_all_text: "",
                    mapTypeControl: !0,
                    draggable: b,
                    scaleControl: !1,
                    scrollwheel: !1,
                    navigationControl: !0,
                    streetViewControl: !0,
                    shared: {
                        zoom: 14,
                        html: "%index"
                    }
                }).Load()
            }
        })
    }(jQuery);
