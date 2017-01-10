! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    function e(e) {
        return t.isFunction(e) || "object" == typeof e ? e : {
            top: e,
            left: e
        }
    }
    var o = t.scrollTo = function(e, o, i) {
        return t(window).scrollTo(e, o, i)
    };
    return o.defaults = {
        axis: "xy",
        duration: parseFloat(t.fn.jquery) >= 1.3 ? 0 : 1,
        limit: !0
    }, o.window = function(e) {
        return t(window)._scrollable()
    }, t.fn._scrollable = function() {
        return this.map(function() {
            var e = this,
                o = !e.nodeName || t.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
            if (!o) return e;
            var i = (e.contentWindow || e).document || e.ownerDocument || e;
            return /webkit/i.test(navigator.userAgent) || "BackCompat" == i.compatMode ? i.body : i.documentElement
        })
    }, t.fn.scrollTo = function(i, n, s) {
        return "object" == typeof n && (s = n, n = 0), "function" == typeof s && (s = {
            onAfter: s
        }), "max" == i && (i = 9e9), s = t.extend({}, o.defaults, s), n = n || s.duration, s.queue = s.queue && s.axis.length > 1, s.queue && (n /= 2), s.offset = e(s.offset), s.over = e(s.over), this._scrollable().each(function() {
            function a(t) {
                p.animate(d, n, s.easing, t && function() {
                    t.call(this, c, s)
                })
            }
            if (null != i) {
                var r, l = this,
                    p = t(l),
                    c = i,
                    d = {},
                    h = p.is("html,body");
                switch (typeof c) {
                    case "number":
                    case "string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(c)) {
                            c = e(c);
                            break
                        }
                        if (c = t(c, this), !c.length) return;
                    case "object":
                        (c.is || c.style) && (r = (c = t(c)).offset())
                }
                var u = t.isFunction(s.offset) && s.offset(l, c) || s.offset;
                t.each(s.axis.split(""), function(t, e) {
                    var i = "x" == e ? "Left" : "Top",
                        n = i.toLowerCase(),
                        m = "scroll" + i,
                        f = l[m],
                        g = o.max(l, e);
                    if (r) d[m] = r[n] + (h ? 0 : f - p.offset()[n]), s.margin && (d[m] -= parseInt(c.css("margin" + i)) || 0, d[m] -= parseInt(c.css("border" + i + "Width")) || 0), d[m] += u[n] || 0, s.over[n] && (d[m] += c["x" == e ? "width" : "height"]() * s.over[n]);
                    else {
                        var v = c[n];
                        d[m] = v.slice && "%" == v.slice(-1) ? parseFloat(v) / 100 * g : v
                    }
                    s.limit && /^\d+$/.test(d[m]) && (d[m] = d[m] <= 0 ? 0 : Math.min(d[m], g)), !t && s.queue && (f != d[m] && a(s.onAfterFirst), delete d[m])
                }), a(s.onAfter)
            }
        }).end()
    }, o.max = function(e, o) {
        var i = "x" == o ? "Width" : "Height",
            n = "scroll" + i;
        if (!t(e).is("html,body")) return e[n] - t(e)[i.toLowerCase()]();
        var s = "client" + i,
            a = e.ownerDocument.documentElement,
            r = e.ownerDocument.body;
        return Math.max(a[n], r[n]) - Math.min(a[s], r[s])
    }, o
}), ! function(t, e, o, i) {
    var n = function(i, n) {
        this.elem = i, this.$elem = t(i), this.options = n, this.metadata = this.$elem.data("plugin-options"), this.$nav = this.$elem.find("a"), this.$win = t(e), this.sections = {}, this.didScroll = !1, this.$doc = t(o), this.docHeight = this.$doc.height()
    };
    n.prototype = {
        defaults: {
            currentClass: "current",
            changeHash: !1,
            easing: "swing",
            filter: "",
            scrollSpeed: 750,
            scrollOffset: 0,
            scrollThreshold: .5,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function() {
            var e = this;
            return e.config = t.extend({}, e.defaults, e.options, e.metadata), "" !== e.config.filter && (e.$nav = e.$nav.filter(e.config.filter)), e.$nav.on("click.onePageNav", t.proxy(e.handleClick, e)), e.getPositions(), e.bindInterval(), e.$win.on("resize.onePageNav", t.proxy(e.getPositions, e)), this
        },
        adjustNav: function(t, e) {
            t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), e.addClass(t.config.currentClass)
        },
        bindInterval: function() {
            var t, e = this;
            e.$win.on("scroll.onePageNav", function() {
                e.didScroll = !0
            }), e.t = setInterval(function() {
                t = e.$doc.height(), e.didScroll && (e.didScroll = !1, e.scrollChange()), t !== e.docHeight && (e.docHeight = t, e.getPositions())
            }, 250)
        },
        getHash: function(t) {
            return t.attr("href").split("#")[1]
        },
        getPositions: function() {
            var e, o, i, n = this;
            n.$nav.each(function() {
                e = n.getHash(t(this)), i = t("#" + e), i.length && (o = i.offset().top, n.sections[e] = Math.round(o) - n.config.scrollOffset)
            })
        },
        getSection: function(t) {
            var e = null,
                o = Math.round(this.$win.height() * this.config.scrollThreshold);
            for (var i in this.sections) this.sections[i] - o < t && (e = i);
            return e
        },
        handleClick: function(o) {
            var i = this,
                n = t(o.currentTarget),
                s = n.parent(),
                a = "#" + i.getHash(n);
            s.hasClass(i.config.currentClass) || (i.config.begin && i.config.begin(), i.adjustNav(i, s), i.unbindInterval(), t.scrollTo(a, i.config.scrollSpeed, {
                axis: "y",
                easing: i.config.easing,
                offset: {
                    top: -i.config.scrollOffset
                },
                onAfter: function() {
                    i.config.changeHash && (e.location.hash = a), i.bindInterval(), i.config.end && i.config.end()
                }
            })), o.preventDefault()
        },
        scrollChange: function() {
            var t, e = this.$win.scrollTop(),
                o = this.getSection(e);
            null !== o && (t = this.$elem.find('a[href$="#' + o + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
        },
        unbindInterval: function() {
            clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
        }
    }, n.defaults = n.prototype.defaults, t.fn.onePageNav = function(t) {
        return this.each(function() {
            new n(this, t).init()
        })
    }
}(jQuery, window, document), "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    function(t, e, o) {
        var i = {
            init: function(e, o) {
                var i = this;
                i.$elem = t(o), i.options = t.extend({}, t.fn.owlCarousel.options, i.$elem.data(), e), i.userOptions = e, i.loadContent()
            },
            loadContent: function() {
                function e(t) {
                    var e, o = "";
                    if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (e in t.owl) t.owl.hasOwnProperty(e) && (o += t.owl[e].item);
                        i.$elem.html(o)
                    }
                    i.logIn()
                }
                var o, i = this;
                "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (o = i.options.jsonPath, t.getJSON(o, e)) : i.logIn()
            },
            logIn: function() {
                var t = this;
                t.$elem.data({
                    "owl-originalStyles": t.$elem.attr("style"),
                    "owl-originalClasses": t.$elem.attr("class")
                }), t.$elem.css({
                    opacity: 0
                }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
            },
            setVars: function() {
                var t = this;
                return 0 !== t.$elem.children().length && (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
            },
            onStartup: function() {
                var t = this;
                t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
            },
            eachMoveUpdate: function() {
                var t = this;
                t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
            },
            updateVars: function() {
                var t = this;
                "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
            },
            reload: function() {
                var t = this;
                e.setTimeout(function() {
                    t.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var t = this;
                return t.$elem.is(":visible") === !1 && (t.$elem.css({
                    opacity: 0
                }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() {
                    t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                        opacity: 1
                    }, 200), e.clearInterval(t.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                var t = this;
                t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
            },
            baseClass: function() {
                var t = this,
                    e = t.$elem.hasClass(t.options.baseClass),
                    o = t.$elem.hasClass(t.options.theme);
                e || t.$elem.addClass(t.options.baseClass), o || t.$elem.addClass(t.options.theme)
            },
            updateItems: function() {
                var e, o, i = this;
                if (i.options.responsive === !1) return !1;
                if (i.options.singleItem === !0) return i.options.items = i.orignalItems = 1, i.options.itemsCustom = !1, i.options.itemsDesktop = !1, i.options.itemsDesktopSmall = !1, i.options.itemsTablet = !1, i.options.itemsTabletSmall = !1, i.options.itemsMobile = !1, !1;
                if (e = t(i.options.responsiveBaseWidth).width(), e > (i.options.itemsDesktop[0] || i.orignalItems) && (i.options.items = i.orignalItems), i.options.itemsCustom !== !1)
                    for (i.options.itemsCustom.sort(function(t, e) {
                            return t[0] - e[0]
                        }), o = 0; o < i.options.itemsCustom.length; o += 1) i.options.itemsCustom[o][0] <= e && (i.options.items = i.options.itemsCustom[o][1]);
                else e <= i.options.itemsDesktop[0] && i.options.itemsDesktop !== !1 && (i.options.items = i.options.itemsDesktop[1]), e <= i.options.itemsDesktopSmall[0] && i.options.itemsDesktopSmall !== !1 && (i.options.items = i.options.itemsDesktopSmall[1]), e <= i.options.itemsTablet[0] && i.options.itemsTablet !== !1 && (i.options.items = i.options.itemsTablet[1]), e <= i.options.itemsTabletSmall[0] && i.options.itemsTabletSmall !== !1 && (i.options.items = i.options.itemsTabletSmall[1]), e <= i.options.itemsMobile[0] && i.options.itemsMobile !== !1 && (i.options.items = i.options.itemsMobile[1]);
                i.options.items > i.itemsAmount && i.options.itemsScaleUp === !0 && (i.options.items = i.itemsAmount)
            },
            response: function() {
                var o, i, n = this;
                return n.options.responsive === !0 && (i = t(e).width(), n.resizer = function() {
                    t(e).width() !== i && (n.options.autoPlay !== !1 && e.clearInterval(n.autoPlayInterval), e.clearTimeout(o), o = e.setTimeout(function() {
                        i = t(e).width(), n.updateVars()
                    }, n.options.responsiveRefreshRate))
                }, void t(e).resize(n.resizer))
            },
            updatePosition: function() {
                var t = this;
                t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
            },
            appendItemsSizes: function() {
                var e = this,
                    o = 0,
                    i = e.itemsAmount - e.options.items;
                e.$owlItems.each(function(n) {
                    var s = t(this);
                    s.css({
                        width: e.itemWidth
                    }).data("owl-item", Number(n)), (n % e.options.items === 0 || n === i) && (n > i || (o += 1)), s.data("owl-roundPages", o)
                })
            },
            appendWrapperSizes: function() {
                var t = this,
                    e = t.$owlItems.length * t.itemWidth;
                t.$owlWrapper.css({
                    width: 2 * e,
                    left: 0
                }), t.appendItemsSizes()
            },
            calculateAll: function() {
                var t = this;
                t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
            },
            calculateWidth: function() {
                var t = this;
                t.itemWidth = Math.round(t.$elem.width() / t.options.items)
            },
            max: function() {
                var t = this,
                    e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
                return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e, o, i, n = this,
                    s = 0,
                    a = 0;
                for (n.positionsInArray = [0], n.pagesInArray = [], e = 0; e < n.itemsAmount; e += 1) a += n.itemWidth, n.positionsInArray.push(-a), n.options.scrollPerPage === !0 && (o = t(n.$owlItems[e]), i = o.data("owl-roundPages"), i !== s && (n.pagesInArray[s] = n.positionsInArray[e], s = i))
            },
            buildControls: function() {
                var e = this;
                (e.options.navigation === !0 || e.options.pagination === !0) && (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
            },
            buildButtons: function() {
                var e = this,
                    o = t('<div class="owl-buttons"/>');
                e.owlControls.append(o), e.buttonPrev = t("<div/>", {
                    class: "owl-prev",
                    html: e.options.navigationText[0] || ""
                }), e.buttonNext = t("<div/>", {
                    class: "owl-next",
                    html: e.options.navigationText[1] || ""
                }), o.append(e.buttonPrev).append(e.buttonNext), o.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
                    t.preventDefault()
                }), o.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(o) {
                    o.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
                })
            },
            buildPagination: function() {
                var e = this;
                e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(o) {
                    o.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var e, o, i, n, s, a, r = this;
                if (r.options.pagination === !1) return !1;
                for (r.paginationWrapper.html(""), e = 0, o = r.itemsAmount - r.itemsAmount % r.options.items, n = 0; n < r.itemsAmount; n += 1) n % r.options.items === 0 && (e += 1, o === n && (i = r.itemsAmount - r.options.items), s = t("<div/>", {
                    class: "owl-page"
                }), a = t("<span></span>", {
                    text: r.options.paginationNumbers === !0 ? e : "",
                    class: r.options.paginationNumbers === !0 ? "owl-numbers" : ""
                }), s.append(a), s.data("owl-page", o === n ? i : n), s.data("owl-roundPages", e), r.paginationWrapper.append(s));
                r.checkPagination()
            },
            checkPagination: function() {
                var e = this;
                return e.options.pagination !== !1 && void e.paginationWrapper.find(".owl-page").each(function() {
                    t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var t = this;
                return t.options.navigation !== !1 && void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var t = this;
                t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
            },
            destroyControls: function() {
                var t = this;
                t.owlControls && t.owlControls.remove()
            },
            next: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                    if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
                    e.currentItem = 0, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            prev: function(t) {
                var e = this;
                if (e.isTransition) return !1;
                if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                    if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
                    e.currentItem = e.maximumItem, t = "rewind"
                }
                e.goTo(e.currentItem, t)
            },
            goTo: function(t, o, i) {
                var n, s = this;
                return !s.isTransition && ("function" == typeof s.options.beforeMove && s.options.beforeMove.apply(this, [s.$elem]), t >= s.maximumItem ? t = s.maximumItem : 0 >= t && (t = 0), s.currentItem = s.owl.currentItem = t, s.options.transitionStyle !== !1 && "drag" !== i && 1 === s.options.items && s.browser.support3d === !0 ? (s.swapSpeed(0), s.browser.support3d === !0 ? s.transition3d(s.positionsInArray[t]) : s.css2slide(s.positionsInArray[t], 1), s.afterGo(), s.singleItemTransition(), !1) : (n = s.positionsInArray[t], s.browser.support3d === !0 ? (s.isCss3Finish = !1, o === !0 ? (s.swapSpeed("paginationSpeed"), e.setTimeout(function() {
                    s.isCss3Finish = !0
                }, s.options.paginationSpeed)) : "rewind" === o ? (s.swapSpeed(s.options.rewindSpeed), e.setTimeout(function() {
                    s.isCss3Finish = !0
                }, s.options.rewindSpeed)) : (s.swapSpeed("slideSpeed"), e.setTimeout(function() {
                    s.isCss3Finish = !0
                }, s.options.slideSpeed)), s.transition3d(n)) : o === !0 ? s.css2slide(n, s.options.paginationSpeed) : "rewind" === o ? s.css2slide(n, s.options.rewindSpeed) : s.css2slide(n, s.options.slideSpeed), void s.afterGo()))
            },
            jumpTo: function(t) {
                var e = this;
                "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo()
            },
            afterGo: function() {
                var t = this;
                t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
            },
            stop: function() {
                var t = this;
                t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
            },
            checkAp: function() {
                var t = this;
                "stop" !== t.apStatus && t.play()
            },
            play: function() {
                var t = this;
                return t.apStatus = "play", t.options.autoPlay !== !1 && (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() {
                    t.next(!0)
                }, t.options.autoPlay)))
            },
            swapSpeed: function(t) {
                var e = this;
                "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t))
            },
            addCssSpeed: function(t) {
                return {
                    "-webkit-transition": "all " + t + "ms ease",
                    "-moz-transition": "all " + t + "ms ease",
                    "-o-transition": "all " + t + "ms ease",
                    transition: "all " + t + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(t) {
                return {
                    "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                    transform: "translate3d(" + t + "px, 0px,0px)"
                }
            },
            transition3d: function(t) {
                var e = this;
                e.$owlWrapper.css(e.doTranslate(t))
            },
            css2move: function(t) {
                var e = this;
                e.$owlWrapper.css({
                    left: t
                })
            },
            css2slide: function(t, e) {
                var o = this;
                o.isCssFinish = !1, o.$owlWrapper.stop(!0, !0).animate({
                    left: t
                }, {
                    duration: e || o.options.slideSpeed,
                    complete: function() {
                        o.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var t, i, n, s, a = this,
                    r = "translate3d(0px, 0px, 0px)",
                    l = o.createElement("div");
                l.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, t = /translate3d\(0px, 0px, 0px\)/g, i = l.style.cssText.match(t), n = null !== i && 1 === i.length, s = "ontouchstart" in e || e.navigator.msMaxTouchPoints, a.browser = {
                    support3d: n,
                    isTouch: s
                }
            },
            moveEvents: function() {
                var t = this;
                (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
            },
            eventTypes: function() {
                var t = this,
                    e = ["s", "e", "x"];
                t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
            },
            disabledEvents: function() {
                var e = this;
                e.$elem.on("dragstart.owl", function(t) {
                    t.preventDefault()
                }), e.$elem.on("mousedown.disableTextSelect", function(e) {
                    return t(e.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function i(t) {
                    if (void 0 !== t.touches) return {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    };
                    if (void 0 === t.touches) {
                        if (void 0 !== t.pageX) return {
                            x: t.pageX,
                            y: t.pageY
                        };
                        if (void 0 === t.pageX) return {
                            x: t.clientX,
                            y: t.clientY
                        }
                    }
                }

                function n(e) {
                    "on" === e ? (t(o).on(l.ev_types.move, a), t(o).on(l.ev_types.end, r)) : "off" === e && (t(o).off(l.ev_types.move), t(o).off(l.ev_types.end))
                }

                function s(o) {
                    var s, a = o.originalEvent || o || e.event;
                    if (3 === a.which) return !1;
                    if (!(l.itemsAmount <= l.options.items)) {
                        if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        l.options.autoPlay !== !1 && e.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, t(this).css(l.removeTransition()), s = t(this).position(), p.relativePos = s.left, p.offsetX = i(a).x - s.left, p.offsetY = i(a).y - s.top, n("on"), p.sliding = !1, p.targetElement = a.target || a.srcElement
                    }
                }

                function a(n) {
                    var s, a, r = n.originalEvent || n || e.event;
                    l.newPosX = i(r).x - p.offsetX, l.newPosY = i(r).y - p.offsetY, l.newRelativeX = l.newPosX - p.relativePos, "function" == typeof l.options.startDragging && p.dragging !== !0 && 0 !== l.newRelativeX && (p.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, p.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && p.sliding === !1 && t(o).off("touchmove.owl"), s = function() {
                        return l.newRelativeX / 5
                    }, a = function() {
                        return l.maximumPixels + l.newRelativeX / 5
                    }, l.newPosX = Math.max(Math.min(l.newPosX, s()), a()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
                }

                function r(o) {
                    var i, s, a, r = o.originalEvent || o || e.event;
                    r.target = r.target || r.srcElement, p.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.newRelativeX < 0 ? l.dragDirection = l.owl.dragDirection = "left" : l.dragDirection = l.owl.dragDirection = "right", 0 !== l.newRelativeX && (i = l.getNewPosition(), l.goTo(i, !1, "drag"), p.targetElement === r.target && l.browser.isTouch !== !0 && (t(r.target).on("click.disable", function(e) {
                        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                    }), s = t._data(r.target, "events").click, a = s.pop(), s.splice(0, 0, a))), n("off")
                }
                var l = this,
                    p = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", s)
            },
            getNewPosition: function() {
                var t = this,
                    e = t.closestItem();
                return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
            },
            closestItem: function() {
                var e = this,
                    o = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
                    i = e.newPosX,
                    n = null;
                return t.each(o, function(s, a) {
                    i - e.itemWidth / 20 > o[s + 1] && i - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (n = a, e.options.scrollPerPage === !0 ? e.currentItem = t.inArray(n, e.positionsInArray) : e.currentItem = s) : i + e.itemWidth / 20 < a && i + e.itemWidth / 20 > (o[s + 1] || o[s] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (n = o[s + 1] || o[o.length - 1], e.currentItem = t.inArray(n, e.positionsInArray)) : (n = o[s + 1], e.currentItem = s + 1))
                }), e.currentItem
            },
            moveDirection: function() {
                var t, e = this;
                return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
            },
            customEvents: function() {
                var t = this;
                t.$elem.on("owl.next", function() {
                    t.next()
                }), t.$elem.on("owl.prev", function() {
                    t.prev()
                }), t.$elem.on("owl.play", function(e, o) {
                    t.options.autoPlay = o, t.play(), t.hoverStatus = "play"
                }), t.$elem.on("owl.stop", function() {
                    t.stop(), t.hoverStatus = "stop"
                }), t.$elem.on("owl.goTo", function(e, o) {
                    t.goTo(o)
                }), t.$elem.on("owl.jumpTo", function(e, o) {
                    t.jumpTo(o)
                })
            },
            stopOnHover: function() {
                var t = this;
                t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() {
                    t.stop()
                }), t.$elem.on("mouseout", function() {
                    "stop" !== t.hoverStatus && t.play()
                }))
            },
            lazyLoad: function() {
                var e, o, i, n, s, a = this;
                if (a.options.lazyLoad === !1) return !1;
                for (e = 0; e < a.itemsAmount; e += 1) o = t(a.$owlItems[e]), "loaded" !== o.data("owl-loaded") && (i = o.data("owl-item"), n = o.find(".lazyOwl"), "string" == typeof n.data("src") ? (void 0 === o.data("owl-loaded") && (n.hide(), o.addClass("loading").data("owl-loaded", "checked")), s = a.options.lazyFollow !== !0 || i >= a.currentItem, s && i < a.currentItem + a.options.items && n.length && n.each(function() {
                    a.lazyPreload(o, t(this))
                })) : o.data("owl-loaded", "loaded"))
            },
            lazyPreload: function(t, o) {
                function i() {
                    t.data("owl-loaded", "loaded").removeClass("loading"), o.removeAttr("data-src"), "fade" === a.options.lazyEffect ? o.fadeIn(400) : o.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
                }

                function n() {
                    r += 1, a.completeImg(o.get(0)) || s === !0 ? i() : 100 >= r ? e.setTimeout(n, 100) : i()
                }
                var s, a = this,
                    r = 0;
                "DIV" === o.prop("tagName") ? (o.css("background-image", "url(" + o.data("src") + ")"), s = !0) : o[0].src = o.data("src"), n()
            },
            autoHeight: function() {
                function o() {
                    var o = t(s.$owlItems[s.currentItem]).height();
                    s.wrapperOuter.css("height", o + "px"), s.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function() {
                        s.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function i() {
                    n += 1, s.completeImg(a.get(0)) ? o() : 100 >= n ? e.setTimeout(i, 100) : s.wrapperOuter.css("height", "")
                }
                var n, s = this,
                    a = t(s.$owlItems[s.currentItem]).find("img");
                void 0 !== a.get(0) ? (n = 0, i()) : o()
            },
            completeImg: function(t) {
                var e;
                return !!t.complete && (e = typeof t.naturalWidth, "undefined" === e || 0 !== t.naturalWidth)
            },
            onVisibleItems: function() {
                var e, o = this;
                for (o.options.addClassActive === !0 && o.$owlItems.removeClass("active"), o.visibleItems = [], e = o.currentItem; e < o.currentItem + o.options.items; e += 1) o.visibleItems.push(e), o.options.addClassActive === !0 && t(o.$owlItems[e]).addClass("active");
                o.owl.visibleItems = o.visibleItems
            },
            transitionTypes: function(t) {
                var e = this;
                e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
            },
            singleItemTransition: function() {
                function t(t) {
                    return {
                        position: "relative",
                        left: t + "px"
                    }
                }
                var e = this,
                    o = e.outClass,
                    i = e.inClass,
                    n = e.$owlItems.eq(e.currentItem),
                    s = e.$owlItems.eq(e.prevItem),
                    a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                    r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                    l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": r + "px",
                    "-moz-perspective-origin": r + "px",
                    "perspective-origin": r + "px"
                }), s.css(t(a, 10)).addClass(o).on(l, function() {
                    e.endPrev = !0, s.off(l), e.clearTransStyle(s, o)
                }), n.addClass(i).on(l, function() {
                    e.endCurrent = !0, n.off(l), e.clearTransStyle(n, i)
                })
            },
            clearTransStyle: function(t, e) {
                var o = this;
                t.css({
                    position: "",
                    left: ""
                }).removeClass(e), o.endPrev && o.endCurrent && (o.$owlWrapper.removeClass("owl-origin"), o.endPrev = !1, o.endCurrent = !1, o.isTransition = !1)
            },
            owlStatus: function() {
                var t = this;
                t.owl = {
                    userOptions: t.userOptions,
                    baseElement: t.$elem,
                    userItems: t.$userItems,
                    owlItems: t.$owlItems,
                    currentItem: t.currentItem,
                    prevItem: t.prevItem,
                    visibleItems: t.visibleItems,
                    isTouch: t.browser.isTouch,
                    browser: t.browser,
                    dragDirection: t.dragDirection
                }
            },
            clearEvents: function() {
                var i = this;
                i.$elem.off(".owl owl mousedown.disableTextSelect"), t(o).off(".owl owl"), t(e).off("resize", i.resizer)
            },
            unWrap: function() {
                var t = this;
                0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr({
                    style: t.$elem.data("owl-originalStyles") || "",
                    class: t.$elem.data("owl-originalClasses")
                })
            },
            destroy: function() {
                var t = this;
                t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
            },
            reinit: function(e) {
                var o = this,
                    i = t.extend({}, o.userOptions, e);
                o.unWrap(), o.init(i, o.$elem)
            },
            addItem: function(t, e) {
                var o, i = this;
                return !!t && (0 === i.$elem.children().length ? (i.$elem.append(t), i.setVars(), !1) : (i.unWrap(), o = void 0 === e || -1 === e ? -1 : e, o >= i.$userItems.length || -1 === o ? i.$userItems.eq(-1).after(t) : i.$userItems.eq(o).before(t), void i.setVars()))
            },
            removeItem: function(t) {
                var e, o = this;
                return 0 !== o.$elem.children().length && (e = void 0 === t || -1 === t ? -1 : t, o.unWrap(), o.$userItems.eq(e).remove(), void o.setVars())
            }
        };
        t.fn.owlCarousel = function(e) {
            return this.each(function() {
                if (t(this).data("owl-init") === !0) return !1;
                t(this).data("owl-init", !0);
                var o = Object.create(i);
                o.init(e, this), t.data(this, "owlCarousel", o)
            })
        }, t.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: e,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document), ! function(t) {
        t.fn.countdown = function(e) {
            function o() {
                var t = new Date,
                    e = l - t;
                e = Math.floor(e / 1e3), 1 > e && (e = 0), p || 0 == e && (p = !0, c.onComplete());
                var o = Math.floor(e / 86400);
                c.show_day && (i.find(".counter").text(o), e %= 86400);
                var d = Math.floor(e / 3600);
                c.show_hour && (n.find(".counter").text(d), e %= 3600);
                var h = Math.floor(e / 60);
                c.show_minute && (s.find(".counter").text(h), e %= 60);
                var u = Math.floor(e);
                if (c.show_second && a.find(".counter").text(u), 0 != c.progress) {
                    var m = Math.round(l - r),
                        f = Math.round(t - r),
                        g = f / m * 100;
                    g > 100 && (g = 100), c.update_progress(g, c.progress)
                }
            }
            var i, n, s, a, r, l, p = !1,
                c = t.extend({
                    start_time: null,
                    end_time: null,
                    show_day: !0,
                    show_hour: !0,
                    show_minute: !0,
                    show_second: !0,
                    update_int: 1,
                    progress: !1,
                    onComplete: function() {},
                    wrapper: function(e) {
                        var o = t('<div class="' + e.toLowerCase() + '_wrapper" />');
                        return o.append('<span class="counter" />'), o.append('<span class="title ">' + e + "</span>"), o
                    },
                    update_progress: function(t, e) {
                        e.attr("aria-valuenow", Math.floor(t)), e.css("width", Math.floor(t) + "%"), e.text(Math.floor(t) + "%")
                    }
                }, e);
            r = null == c.start_time ? new Date : new Date(c.start_time), l = null == c.end_time ? new Date(new Date + 9e7) : new Date(c.end_time), c.show_day && (i = c.wrapper("Days")), c.show_hour && (n = c.wrapper("Hours")), c.show_minute && (s = c.wrapper("Minutes")), c.show_second && (a = c.wrapper("Seconds")), o(), setInterval(o, 1e3 * c.update_int), this.prepend(a), this.prepend(s), this.prepend(n), this.prepend(i)
        }
    }(jQuery), ! function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? module.exports = e() : e()
    }(this, function() {
        function t(t) {
            if (null === f) {
                for (var e = t.length, o = 0, i = document.getElementById(s), n = "<ul>"; e > o;) n += "<li>" + t[o] + "</li>", o++;
                n += "</ul>", i.innerHTML = n
            } else f(t)
        }

        function e(t) {
            return t.replace(/<b[^>]*>(.*?)<\/b>/gi, function(t, e) {
                return e
            }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
        }

        function o(t) {
            for (var e = t.getElementsByTagName("a"), o = e.length - 1; o >= 0; o--) e[o].setAttribute("target", "_blank")
        }

        function i(t, e) {
            for (var o = [], i = new RegExp("(^| )" + e + "( |$)"), n = t.getElementsByTagName("*"), s = 0, a = n.length; a > s; s++) i.test(n[s].className) && o.push(n[s]);
            return o
        }

        function n(t) {
            if (void 0 !== t && t.innerHTML.indexOf("data-srcset") >= 0) {
                var e = t.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
                return decodeURIComponent(e).split('"')[1]
            }
        }
        var s = "",
            a = 20,
            r = !0,
            l = [],
            p = !1,
            c = !0,
            d = !0,
            h = null,
            u = !0,
            m = !0,
            f = null,
            g = !0,
            v = !1,
            w = !0,
            y = "en",
            _ = !0,
            b = !1,
            I = null,
            C = {
                fetch: function(t) {
                    if (void 0 === t.maxTweets && (t.maxTweets = 20), void 0 === t.enableLinks && (t.enableLinks = !0), void 0 === t.showUser && (t.showUser = !0), void 0 === t.showTime && (t.showTime = !0), void 0 === t.dateFunction && (t.dateFunction = "default"), void 0 === t.showRetweet && (t.showRetweet = !0), void 0 === t.customCallback && (t.customCallback = null), void 0 === t.showInteraction && (t.showInteraction = !0), void 0 === t.showImages && (t.showImages = !1), void 0 === t.linksInNewWindow && (t.linksInNewWindow = !0), void 0 === t.showPermalinks && (t.showPermalinks = !0), void 0 === t.dataOnly && (t.dataOnly = !1), p) l.push(t);
                    else {
                        p = !0, s = t.domId, a = t.maxTweets, r = t.enableLinks, d = t.showUser, c = t.showTime, m = t.showRetweet, h = t.dateFunction, f = t.customCallback, g = t.showInteraction, v = t.showImages, w = t.linksInNewWindow, _ = t.showPermalinks, b = t.dataOnly;
                        var e = document.getElementsByTagName("head")[0];
                        null !== I && e.removeChild(I), I = document.createElement("script"), I.type = "text/javascript", void 0 !== t.list ? I.src = "https://syndication.twitter.com/timeline/list?callback=twitterFetcher.callback&dnt=false&list_slug=" + t.list.listSlug + "&screen_name=" + t.list.screenName + "&suppress_response_codes=true&lang=" + (t.lang || y) + "&rnd=" + Math.random() : void 0 !== t.profile ? I.src = "https://syndication.twitter.com/timeline/profile?callback=twitterFetcher.callback&dnt=false&screen_name=" + t.profile.screenName + "&suppress_response_codes=true&lang=" + (t.lang || y) + "&rnd=" + Math.random() : void 0 !== t.likes ? I.src = "https://syndication.twitter.com/timeline/likes?callback=twitterFetcher.callback&dnt=false&screen_name=" + t.likes.screenName + "&suppress_response_codes=true&lang=" + (t.lang || y) + "&rnd=" + Math.random() : I.src = "https://cdn.syndication.twimg.com/widgets/timelines/" + t.id + "?&lang=" + (t.lang || y) + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(), e.appendChild(I)
                    }
                },
                callback: function(s) {
                    function f(t) {
                        var e = t.getElementsByTagName("img")[0];
                        return e.src = e.getAttribute("data-src-2x"), t
                    }
                    s.body = s.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, ""),
                        v || (s.body = s.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, "")), d || (s.body = s.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, ""));
                    var y = document.createElement("div");
                    y.innerHTML = s.body, "undefined" == typeof y.getElementsByClassName && (u = !1);
                    var I = [],
                        x = [],
                        P = [],
                        k = [],
                        T = [],
                        M = [],
                        $ = [],
                        S = 0;
                    if (u)
                        for (var A = y.getElementsByClassName("timeline-Tweet"); S < A.length;) A[S].getElementsByClassName("timeline-Tweet-retweetCredit").length > 0 ? T.push(!0) : T.push(!1), (!T[S] || T[S] && m) && (I.push(A[S].getElementsByClassName("timeline-Tweet-text")[0]), M.push(A[S].getAttribute("data-tweet-id")), d && x.push(f(A[S].getElementsByClassName("timeline-Tweet-author")[0])), P.push(A[S].getElementsByClassName("dt-updated")[0]), $.push(A[S].getElementsByClassName("timeline-Tweet-timestamp")[0]), void 0 !== A[S].getElementsByClassName("timeline-Tweet-media")[0] ? k.push(A[S].getElementsByClassName("timeline-Tweet-media")[0]) : k.push(void 0)), S++;
                    else
                        for (var A = i(y, "timeline-Tweet"); S < A.length;) i(A[S], "timeline-Tweet-retweetCredit").length > 0 ? T.push(!0) : T.push(!1), (!T[S] || T[S] && m) && (I.push(i(A[S], "timeline-Tweet-text")[0]), M.push(A[S].getAttribute("data-tweet-id")), d && x.push(f(i(A[S], "timeline-Tweet-author")[0])), P.push(i(A[S], "dt-updated")[0]), $.push(i(A[S], "timeline-Tweet-timestamp")[0]), void 0 !== i(A[S], "timeline-Tweet-media")[0] ? k.push(i(A[S], "timeline-Tweet-media")[0]) : k.push(void 0)), S++;
                    I.length > a && (I.splice(a, I.length - a), x.splice(a, x.length - a), P.splice(a, P.length - a), T.splice(a, T.length - a), k.splice(a, k.length - a), $.splice(a, $.length - a));
                    var D = [],
                        S = I.length,
                        L = 0;
                    if (b)
                        for (; S > L;) D.push({
                            tweet: I[L].innerHTML,
                            author: x[L].innerHTML,
                            time: P[L].textContent,
                            image: n(k[L]),
                            rt: T[L],
                            tid: M[L],
                            permalinkURL: void 0 === $[L] ? "" : $[L].href
                        }), L++;
                    else
                        for (; S > L;) {
                            if ("string" != typeof h) {
                                var W = P[L].getAttribute("datetime"),
                                    j = new Date(P[L].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                                    E = h(j, W);
                                if (P[L].setAttribute("aria-label", E), I[L].textContent)
                                    if (u) P[L].textContent = E;
                                    else {
                                        var O = document.createElement("p"),
                                            N = document.createTextNode(E);
                                        O.appendChild(N), O.setAttribute("aria-label", E), P[L] = O
                                    } else P[L].textContent = E
                            }
                            var z = "";
                            r ? (w && (o(I[L]), d && o(x[L])), d && (z += '<div class="user">' + e(x[L].innerHTML) + "</div>"), z += '<p class="tweet">' + e(I[L].innerHTML) + "</p>", c && (z += _ ? '<p class="timePosted"><a href="' + $[L] + '">' + P[L].getAttribute("aria-label") + "</a></p>" : '<p class="timePosted">' + P[L].getAttribute("aria-label") + "</p>")) : I[L].textContent ? (d && (z += '<p class="user">' + x[L].textContent + "</p>"), z += '<p class="tweet">' + I[L].textContent + "</p>", c && (z += '<p class="timePosted">' + P[L].textContent + "</p>")) : (d && (z += '<p class="user">' + x[L].textContent + "</p>"), z += '<p class="tweet">' + I[L].textContent + "</p>", c && (z += '<p class="timePosted">' + P[L].textContent + "</p>")), g && (z += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + M[L] + '" class="twitter_reply_icon"' + (w ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + M[L] + '" class="twitter_retweet_icon"' + (w ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + M[L] + '" class="twitter_fav_icon"' + (w ? ' target="_blank">' : ">") + "Favorite</a></p>"), v && void 0 !== k[L] && void 0 !== n(k[L]) && (z += '<div class="media"><img src="' + n(k[L]) + '" alt="Image from tweet" /></div>'), v ? D.push(z) : !v && I[L].textContent.length && D.push(z), L++
                        }
                    t(D), p = !1, l.length > 0 && (C.fetch(l[0]), l.splice(0, 1))
                }
            };
        return window.twitterFetcher = C, C
    }),
    function(t) {
        "use strict";
        t.ajaxChimp = {
            responses: {
                "We have sent you a confirmation email": 0,
                "Please enter a value": 1,
                "An email address must contain a single @": 2,
                "The domain portion of the email address is invalid (the portion after the @: )": 3,
                "The username portion of the email address is invalid (the portion before the @: )": 4,
                "This email address looks fake or invalid. Please enter a real email address": 5
            },
            translations: {
                en: null
            },
            init: function(e, o) {
                t(e).ajaxChimp(o)
            }
        }, t.fn.ajaxChimp = function(e) {
            return t(this).each(function(o, i) {
                var n = t(i),
                    s = n.find("input[type=email]"),
                    a = n.find("label[for=" + s.attr("id") + "]"),
                    r = t.extend({
                        url: n.attr("action"),
                        language: "en"
                    }, e),
                    l = r.url.replace("/post?", "/post-json?").concat("&c=?");
                n.attr("novalidate", "true"), s.attr("name", "EMAIL"), n.submit(function() {
                    function e(e) {
                        if ("success" === e.result) o = "We have sent you a confirmation email", a.removeClass("error").addClass("valid"), s.removeClass("error").addClass("valid");
                        else {
                            s.removeClass("valid").addClass("error"), a.removeClass("valid").addClass("error");
                            var i = -1;
                            try {
                                var n = e.msg.split(" - ", 2);
                                if (void 0 === n[1]) o = e.msg;
                                else {
                                    var l = parseInt(n[0], 10);
                                    l.toString() === n[0] ? (i = n[0], o = n[1]) : (i = -1, o = e.msg)
                                }
                            } catch (t) {
                                i = -1, o = e.msg
                            }
                        }
                        "en" !== r.language && void 0 !== t.ajaxChimp.responses[o] && t.ajaxChimp.translations && t.ajaxChimp.translations[r.language] && t.ajaxChimp.translations[r.language][t.ajaxChimp.responses[o]] && (o = t.ajaxChimp.translations[r.language][t.ajaxChimp.responses[o]]), a.html(o), a.show(2e3), r.callback && r.callback(e)
                    }
                    var o, i = {},
                        p = n.serializeArray();
                    t.each(p, function(t, e) {
                        i[e.name] = e.value
                    }), t.ajax({
                        url: l,
                        data: i,
                        success: e,
                        dataType: "jsonp",
                        error: function(t, e) {
                            console.log("mailchimp ajax submit error: " + e)
                        }
                    });
                    var c = "Submitting...";
                    return "en" !== r.language && t.ajaxChimp.translations && t.ajaxChimp.translations[r.language] && t.ajaxChimp.translations[r.language].submit && (c = t.ajaxChimp.translations[r.language].submit), a.html(c).show(2e3), !1
                })
            }), this
        }
    }(jQuery),
    function(t, e, o, i) {
        var n, s, a;
        n = {
            activateCurrent: function(t) {
                this.html_element.find("select").val(t)
            },
            getHtml: function() {
                var e, o = this,
                    i = "";
                if (1 < this.ln) {
                    for (i += '<select class="dropdown controls ' + this.o.controls_cssclass + '">', this.ShowOnMenu(this.view_all_key) && (i += '<option value="' + this.view_all_key + '">' + this.o.view_all_text + "</option>"), e = 0; e < this.ln; e += 1) this.ShowOnMenu(e) && (i += '<option value="' + (e + 1) + '">' + (this.o.locations[e].title || "#" + (e + 1)) + "</option>");
                    i = t(i + "</select>").bind("change", function() {
                        o.ViewOnMap(this.value)
                    })
                }
                return (e = this.o.controls_title) && (e = t('<div class="controls_title"></div>').css(this.o.controls_applycss ? {
                    fontWeight: "bold",
                    fontSize: this.o.controls_on_map ? "12px" : "inherit",
                    padding: "3px 10px 5px 0"
                } : {}).append(this.o.controls_title)), this.html_element = t('<div class="wrap_controls"></div>').append(e).append(i)
            }
        }, s = {
            html_a: function(e, o, i) {
                var n = this;
                return o = o || e + 1, i = i || this.o.locations[e].title, e = t('<a data-load="' + o + '" id="ullist_a_' + o + '" href="#' + o + '" title="' + i + '"><span>' + (i || "#" + (e + 1)) + "</span></a>"), e.css(this.o.controls_applycss ? {
                    color: "#666",
                    display: "block",
                    padding: "5px",
                    fontSize: this.o.controls_on_map ? "12px" : "inherit",
                    textDecoration: "none"
                } : {}), e.on("click", function(e) {
                    e.preventDefault(), e = t(this).attr("data-load"), n.ViewOnMap(e)
                }), e
            },
            activateCurrent: function(t) {
                this.html_element.find("li").removeClass("active"), this.html_element.find("#ullist_a_" + t).parent().addClass("active")
            },
            getHtml: function() {
                var e, o = t("<ul class='ullist controls " + this.o.controls_cssclass + "'></ul>").css(this.o.controls_applycss ? {
                    margin: 0,
                    padding: 0,
                    listStyleType: "none"
                } : {});
                for (this.ShowOnMenu(this.view_all_key) && o.append(t("<li></li>").append(s.html_a.call(this, !1, this.view_all_key, this.o.view_all_text))), e = 0; e < this.ln; e++) this.ShowOnMenu(e) && o.append(t("<li></li>").append(s.html_a.call(this, e)));
                return (e = this.o.controls_title) && (e = t('<div class="controls_title"></div>').css(this.o.controls_applycss ? {
                    fontWeight: "bold",
                    padding: "3px 10px 5px 0",
                    fontSize: this.o.controls_on_map ? "12px" : "inherit"
                } : {}).append(this.o.controls_title)), this.html_element = t('<div class="wrap_controls"></div>').append(e).append(o)
            }
        }, a = function() {
            function e(e) {
                this.VERSION = "0.1.33", this.loaded = !1, this.markers = [], this.circles = [], this.oMap = !1, this.view_all_key = "all", this.infowindow = null, this.ln = this.maxZIndex = 0, this.oMap = !1, this.directionsDisplay = this.directionsService = this.Fusion = this.Polygon = this.Polyline = this.current_index = this.current_control = this.controls_wrapper = this.canvas_map = this.map_div = this.oBounds = null, this.o = {
                    debug: !1,
                    map_div: "#gmap",
                    controls_div: "#controls",
                    generate_controls: !0,
                    controls_type: "dropdown",
                    controls_cssclass: "",
                    controls_title: "",
                    controls_on_map: !0,
                    controls_applycss: !0,
                    controls_position: o.maps.ControlPosition.RIGHT_TOP,
                    type: "marker",
                    view_all: !0,
                    view_all_text: "View All",
                    pan_on_click: !0,
                    start: 0,
                    locations: [],
                    shared: {},
                    map_options: {
                        mapTypeId: o.maps.MapTypeId.ROADMAP
                    },
                    stroke_options: {
                        strokeColor: "#0000FF",
                        strokeOpacity: .8,
                        strokeWeight: 2,
                        fillColor: "#0000FF",
                        fillOpacity: .4
                    },
                    directions_options: {
                        travelMode: o.maps.TravelMode.DRIVING,
                        unitSystem: o.maps.UnitSystem.METRIC,
                        optimizeWaypoints: !1,
                        provideRouteAlternatives: !1,
                        avoidHighways: !1,
                        avoidTolls: !1
                    },
                    circle_options: {
                        radius: 100,
                        visible: !0
                    },
                    styles: {},
                    fusion_options: {},
                    directions_panel: null,
                    draggable: !1,
                    editable: !1,
                    show_infowindows: !0,
                    show_markers: !0,
                    infowindow_type: "bubble",
                    listeners: {},
                    beforeViewAll: function() {},
                    afterViewAll: function() {},
                    beforeShow: function(t, e, o) {},
                    afterShow: function(t, e, o) {},
                    afterCreateMarker: function(t, e, o) {},
                    beforeCloseInfowindow: function(t, e) {},
                    afterCloseInfowindow: function(t, e) {},
                    beforeOpenInfowindow: function(t, e, o) {},
                    afterOpenInfowindow: function(t, e, o) {},
                    afterRoute: function(t, e, o) {},
                    onPolylineClick: function(t) {},
                    onPolygonClick: function(t) {},
                    circleRadiusChanged: function(t, e, o) {},
                    circleCenterChanged: function(t, e, o) {},
                    drag: function(t, e, o) {},
                    dragEnd: function(t, e, o) {},
                    dragStart: function(t, e, o) {}
                }, this.AddControl("dropdown", n), this.AddControl("list", s), e && "directions" === e.type && (!e.show_markers && (e.show_markers = !1), !e.show_infowindows && (e.show_infowindows = !1)), t.extend(!0, this.o, e)
            }
            return e.prototype.controls = {}, e.prototype.create_objMap = function() {
                var e, i = 0;
                for (e in this.o.styles) this.o.styles.hasOwnProperty(e) && (0 === i && (this.o.map_options.mapTypeControlOptions = {
                    mapTypeIds: [o.maps.MapTypeId.ROADMAP]
                }), i++, this.o.map_options.mapTypeControlOptions.mapTypeIds.push("map_style_" + i));
                if (this.loaded) this.oMap.setOptions(this.o.map_options);
                else try {
                    this.map_div.css({
                        position: "relative",
                        overflow: "hidden"
                    }), this.canvas_map = t("<div>").addClass("canvas_map").css({
                        width: "100%",
                        height: "100%"
                    }).appendTo(this.map_div), this.oMap = new o.maps.Map(this.canvas_map.get(0), this.o.map_options)
                } catch (t) {
                    this.debug("create_objMap::" + this.map_div.selector, t.toString())
                }
                i = 0;
                for (e in this.o.styles) this.o.styles.hasOwnProperty(e) && (i++, this.oMap.mapTypes.set("map_style_" + i, new o.maps.StyledMapType(this.o.styles[e], {
                    name: e
                })), this.oMap.setMapTypeId("map_style_" + i))
            }, e.prototype.add_markers_to_objMap = function() {
                var t, e;
                switch (t = this.o.type || "marker") {
                    case "marker":
                        for (t = 0; t < this.ln; t++) e = this.create_objPoint(t), this.create.marker.call(this, t, e);
                        break;
                    default:
                        this.create[t].apply(this)
                }
            }, e.prototype.create_objPoint = function(e) {
                e = t.extend({}, this.o.locations[e]);
                var n = e.visible === i ? i : e.visible;
                return !e.type && (e.type = this.o.type), e.map = this.oMap, e.position = new o.maps.LatLng(e.lat, e.lon), e.zIndex = e.zIndex === i ? 1e4 : e.zIndex + 100, e.visible = n === i ? this.o.show_markers : n, this.o.maxZIndex = e.zIndex > this.maxZIndex ? e.zIndex : this.maxZIndex, e.image && (e.icon = new o.maps.MarkerImage(e.image, new o.maps.Size(e.image_w || 32, e.image_h || 32), new o.maps.Point(0, 0), new o.maps.Point((e.image_w || 32) / 2, (e.image_h || 32) / 2))), e
            }, e.prototype.create_objCircle = function(e) {
                var o, i, n;
                return n = t.extend({}, e), o = t.extend({}, this.o.stroke_options), i = t.extend({}, this.o.circle_options), t.extend(o, e.stroke_options || {}), t.extend(n, o), t.extend(i, e.circle_options || {}), t.extend(n, i), n.center = e.position, n.draggable = !1, n.zIndex = 0 < e.zIndex ? e.zIndex - 10 : 1, n
            }, e.prototype.add_markerEv = function(t, e, i) {
                var n = this;
                o.maps.event.addListener(i, "click", function(o) {
                    n.o.beforeShow(t, e, i), n.o.show_infowindows && !1 !== e.show_infowindow && n.open_infowindow(t, i, o), n.o.pan_on_click && !1 !== e.pan_on_click && (n.oMap.panTo(e.position), e.zoom && n.oMap.setZoom(e.zoom)), n.current_control && n.o.generate_controls && n.current_control.activateCurrent && n.current_control.activateCurrent.call(n, t + 1), n.current_index = t, n.o.afterShow(t, e, i)
                }), e.draggable && this.add_dragEv(t, e, i)
            }, e.prototype.add_circleEv = function(t, e, i) {
                var n = this;
                o.maps.event.addListener(i, "click", function() {
                    n.ViewOnMap(t + 1)
                }), o.maps.event.addListener(i, "center_changed", function() {
                    n.o.circleCenterChanged(t, e, i)
                }), o.maps.event.addListener(i, "radius_changed", function() {
                    n.o.circleRadiusChanged(t, e, i)
                }), e.draggable && this.add_dragEv(t, e, i)
            }, e.prototype.add_dragEv = function(t, e, i) {
                var n = this;
                o.maps.event.addListener(i, "drag", function(s) {
                    var a;
                    if (i.getPosition) s = i.getPosition();
                    else {
                        if (!i.getCenter) return;
                        s = i.getCenter()
                    }
                    if (n.circles[t] && n.circles[t].setCenter(s), n.Polyline ? a = "Polyline" : n.Polygon && (a = "Polygon"), a) {
                        for (var r = n[a].getPath().getArray(), l = [], p = 0; p < r.length; ++p) l[p] = t === p ? new o.maps.LatLng(s.lat(), s.lng()) : new o.maps.LatLng(r[p].lat(), r[p].lng());
                        n[a].setPath(new o.maps.MVCArray(l)), n.add_polyEv(a)
                    }
                    n.o.drag(t, e, i)
                }), o.maps.event.addListener(i, "dragend", function() {
                    n.o.dragEnd(t, e, i)
                }), o.maps.event.addListener(i, "dragstart", function() {
                    n.o.dragStart(t, e, i)
                }), o.maps.event.addListener(i, "center_changed", function() {
                    n.markers[t] && i.getCenter && n.markers[t].setPosition(i.getCenter()), n.o.drag(t, e, i)
                })
            }, e.prototype.add_polyEv = function(t) {
                var e = this;
                o.maps.event.addListener(this[t].getPath(), "set_at", function(i, n) {
                    var s = e[t].getPath().getAt(i),
                        s = new o.maps.LatLng(s.lat(), s.lng());
                    e.markers[i] && e.markers[i].setPosition(s), e.circles[i] && e.circles[i].setCenter(s), e.o["on" + t + "Changed"](i, n, e[t].getPath().getArray())
                })
            }, e.prototype.create = {
                marker: function(t, e, i) {
                    var n;
                    return "circle" != e.type || i || (n = this.create_objCircle(e), e.visible || (n.draggable = e.draggable), i = new o.maps.Circle(n), this.add_circleEv(t, n, i), this.circles[t] = i), e.type = "marker", i = new o.maps.Marker(e), this.add_markerEv(t, e, i), this.oBounds.extend(e.position), this.markers[t] = i, this.o.afterCreateMarker(t, e, i), i
                },
                circle: function() {
                    var t, e, i, n;
                    for (t = 0; t < this.ln; t++) e = this.create_objPoint(t), "circle" == e.type && (i = this.create_objCircle(e), e.visible || (i.draggable = e.draggable), n = new o.maps.Circle(i), this.add_circleEv(t, i, n), this.circles[t] = n), e.type = "marker", this.create.marker.call(this, t, e, n)
                },
                polyline: function() {
                    var e, i, n = t.extend({}, this.o.stroke_options);
                    for (n.path = [], n.draggable = this.o.draggable, n.editable = this.o.editable, n.map = this.oMap, n.zIndex = this.o.maxZIndex + 100, e = 0; e < this.ln; e++) i = this.create_objPoint(e), this.create.marker.call(this, e, i), n.path.push(i.position);
                    this.Polyline ? this.Polyline.setOptions(n) : this.Polyline = new o.maps.Polyline(n), this.add_polyEv("Polyline")
                },
                polygon: function() {
                    var e, i, n = this,
                        s = t.extend({}, this.o.stroke_options);
                    for (s.path = [], s.draggable = this.o.draggable, s.editable = this.o.editable, s.map = this.oMap, s.zIndex = this.o.maxZIndex + 100, e = 0; e < this.ln; e++) i = this.create_objPoint(e), this.create.marker.call(this, e, i), s.path.push(i.position);
                    this.Polygon ? this.Polygon.setOptions(s) : this.Polygon = new o.maps.Polygon(s), o.maps.event.addListener(this.Polygon, "click", function(t) {
                        n.o.onPolygonClick(t)
                    }), this.add_polyEv("Polygon")
                },
                fusion: function() {
                    this.o.fusion_options.styles = [this.o.stroke_options], this.o.fusion_options.map = this.oMap, this.Fusion ? this.Fusion.setOptions(this.o.fusion_options) : this.Fusion = new o.maps.FusionTablesLayer(this.o.fusion_options)
                },
                directions: function() {
                    var e, i, n, s, a, r = this,
                        l = [],
                        p = 0;
                    for (e = 0; e < this.ln; e++) i = this.create_objPoint(e), 0 === e ? s = i.position : e === this.ln - 1 ? a = i.position : (n = !0 === this.o.locations[e].stopover, l.push({
                        location: i.position,
                        stopover: n
                    })), this.create.marker.call(this, e, i);
                    this.o.directions_options.origin = s, this.o.directions_options.destination = a, this.o.directions_options.waypoints = l, this.directionsService || (this.directionsService = new o.maps.DirectionsService), this.directionsDisplay ? this.directionsDisplay.setOptions({
                        draggable: this.o.draggable
                    }) : this.directionsDisplay = new o.maps.DirectionsRenderer({
                        draggable: this.o.draggable
                    }), this.directionsDisplay.setMap(this.oMap), this.o.directions_panel && (this.o.directions_panel = t(this.o.directions_panel), this.directionsDisplay.setPanel(this.o.directions_panel.get(0))), this.o.draggable && o.maps.event.addListener(this.directionsDisplay, "directions_changed", function() {
                        p = r.compute_distance(r.directionsDisplay.directions), r.o.afterRoute(p)
                    }), this.directionsService.route(this.o.directions_options, function(t, e) {
                        e === o.maps.DirectionsStatus.OK && (p = r.compute_distance(t), r.directionsDisplay.setDirections(t)), r.o.afterRoute(p, e, t)
                    })
                }
            }, e.prototype.compute_distance = function(t) {
                var e = 0,
                    o = t.routes[0],
                    i = o.legs.length;
                for (t = 0; t < i; t++) e += o.legs[t].distance.value;
                return e
            }, e.prototype.type_to_open = {
                bubble: function(t) {
                    this.infowindow = new o.maps.InfoWindow({
                        content: t.html || ""
                    })
                }
            }, e.prototype.open_infowindow = function(t, e, o) {
                this.CloseInfoWindow(), o = this.o.locations[t];
                var i = this.o.infowindow_type;
                o.html && this.type_to_open[i] && (this.o.beforeOpenInfowindow(t, o, e), this.type_to_open[i].call(this, o), this.infowindow.open(this.oMap, e), this.o.afterOpenInfowindow(t, o, e))
            }, e.prototype.get_html_controls = function() {
                return this.controls[this.o.controls_type] && this.controls[this.o.controls_type].getHtml ? (this.current_control = this.controls[this.o.controls_type], this.current_control.getHtml.apply(this)) : ""
            }, e.prototype.generate_controls = function() {
                if (this.o.controls_on_map) {
                    var e = t('<div class="on_gmap ' + this.o.controls_type + ' gmap_controls"></div>').css(this.o.controls_applycss ? {
                            margin: "5px"
                        } : {}),
                        o = t(this.get_html_controls()).css(this.o.controls_applycss ? {
                            background: "#fff",
                            padding: "5px",
                            border: "1px solid rgb(113,123,135)",
                            boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px",
                            maxHeight: this.map_div.find(".canvas_map").outerHeight() - 80,
                            minWidth: 100,
                            overflowY: "auto",
                            overflowX: "hidden"
                        } : {});
                    e.append(o), this.oMap.controls[this.o.controls_position].push(e.get(0))
                } else this.controls_wrapper.empty(), this.controls_wrapper.append(this.get_html_controls())
            }, e.prototype.init_map = function() {
                var t = this;
                this.Polyline && this.Polyline.setMap(null), this.Polygon && this.Polygon.setMap(null), this.Fusion && this.Fusion.setMap(null), this.directionsDisplay && this.directionsDisplay.setMap(null);
                for (var e = this.markers.length - 1; 0 <= e; --e) try {
                    this.markers[e] && this.markers[e].setMap(null)
                } catch (e) {
                    t.debug("init_map::markers::setMap", e.stack)
                }
                for (this.markers.length = 0, this.markers = [], e = this.circles.length - 1; 0 <= e; --e) try {
                    this.circles[e] && this.circles[e].setMap(null)
                } catch (e) {
                    t.debug("init_map::circles::setMap", e.stack)
                }
                this.circles.length = 0, this.circles = [], this.o.controls_on_map && this.oMap.controls && this.oMap.controls[this.o.controls_position].forEach(function(e, o) {
                    try {
                        t.oMap.controls[this.o.controls_position].removeAt(o)
                    } catch (e) {
                        t.debug("init_map::removeAt", e.stack)
                    }
                }), this.oBounds = new o.maps.LatLngBounds
            }, e.prototype.perform_load = function() {
                1 === this.ln ? (this.o.map_options.set_center ? this.oMap.setCenter(new o.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1])) : (this.oMap.fitBounds(this.oBounds), this.ViewOnMap(1)), this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom)) : 0 === this.ln ? (this.o.map_options.set_center ? this.oMap.setCenter(new o.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1])) : this.oMap.fitBounds(this.oBounds), this.oMap.setZoom(this.o.map_options.zoom || 1)) : (this.oMap.fitBounds(this.oBounds), "number" == typeof(this.o.start - 0) && 0 < this.o.start && this.o.start <= this.ln ? this.ViewOnMap(this.o.start) : this.o.map_options.set_center ? this.oMap.setCenter(new o.maps.LatLng(this.o.map_options.set_center[0], this.o.map_options.set_center[1])) : this.ViewOnMap(this.view_all_key), this.o.map_options.zoom && this.oMap.setZoom(this.o.map_options.zoom))
            }, e.prototype.debug = function(t, e) {
                return this.o.debug && console.log(t, e), this
            }, e.prototype.AddControl = function(t, e) {
                return t && e ? (this.controls[t] = e, this) : (self.debug("AddControl", 'Missing "name" and "func" callback.'), !1)
            }, e.prototype.CloseInfoWindow = function() {
                return this.infowindow && (this.current_index || 0 === this.current_index) && (this.o.beforeCloseInfowindow(this.current_index, this.o.locations[this.current_index]), this.infowindow.close(), this.infowindow = null, this.o.afterCloseInfowindow(this.current_index, this.o.locations[this.current_index])), this
            }, e.prototype.ShowOnMenu = function(t) {
                return !!(t === this.view_all_key && this.o.view_all && 1 < this.ln) || (t = parseInt(t, 10), "number" == typeof(t - 0) && 0 <= t && t < this.ln && !1 !== this.o.locations[t].on_menu)
            }, e.prototype.ViewOnMap = function(t) {
                if (t === this.view_all_key) this.o.beforeViewAll(), this.current_index = t, 0 < this.o.locations.length && this.o.generate_controls && this.current_control && this.current_control.activateCurrent && this.current_control.activateCurrent.apply(this, [t]), this.oMap.fitBounds(this.oBounds), this.CloseInfoWindow(), this.o.afterViewAll();
                else if (t = parseInt(t, 10), "number" == typeof(t - 0) && 0 < t && t <= this.ln) try {
                    o.maps.event.trigger(this.markers[t - 1], "click")
                } catch (t) {
                    this.debug("ViewOnMap::trigger", t.stack)
                }
                return this
            }, e.prototype.SetLocations = function(t, e) {
                return this.o.locations = t, e && this.Load(), this
            }, e.prototype.AddLocations = function(e, o) {
                var i = this;
                return t.isArray(e) && t.each(e, function(t, e) {
                    i.o.locations.push(e)
                }), t.isPlainObject(e) && this.o.locations.push(e), o && this.Load(), this
            }, e.prototype.AddLocation = function(e, o, i) {
                return t.isPlainObject(e) && this.o.locations.splice(o, 0, e), i && this.Load(), this
            }, e.prototype.RemoveLocations = function(e, o) {
                var i = this,
                    n = 0;
                return t.isArray(e) ? t.each(e, function(t, e) {
                    e - n < i.ln && i.o.locations.splice(e - n, 1), n++
                }) : e < this.ln && this.o.locations.splice(e, 1), o && this.Load(), this
            }, e.prototype.Loaded = function() {
                return this.loaded
            }, e.prototype._init = function() {
                this.ln = this.o.locations.length;
                for (var e = 0; e < this.ln; e++) {
                    var o = t.extend({}, this.o.shared);
                    this.o.locations[e] = t.extend(o, this.o.locations[e]), this.o.locations[e].html && (this.o.locations[e].html = this.o.locations[e].html.replace("%index", e + 1), this.o.locations[e].html = this.o.locations[e].html.replace("%title", this.o.locations[e].title || ""))
                }
                return this.map_div = t(this.o.map_div), this.controls_wrapper = t(this.o.controls_div), this
            }, e.prototype.Load = function(e) {
                t.extend(!0, this.o, e), e && e.locations && (this.o.locations = e.locations), this._init(), !1 === this.o.visualRefresh ? o.maps.visualRefresh = !1 : o.maps.visualRefresh = !0, this.init_map(), this.create_objMap(), this.add_markers_to_objMap(), 1 < this.ln && this.o.generate_controls || this.o.force_generate_controls ? (this.o.generate_controls = !0, this.generate_controls()) : this.o.generate_controls = !1;
                var i = this;
                if (this.loaded) this.perform_load();
                else {
                    o.maps.event.addListenerOnce(this.oMap, "idle", function() {
                        i.perform_load()
                    }), o.maps.event.addListener(this.oMap, "resize", function() {
                        i.canvas_map.css({
                            width: i.map_div.width(),
                            height: i.map_div.height()
                        })
                    });
                    for (var n in this.o.listeners) {
                        var s = this.oMap,
                            a = this.o.listeners[n];
                        this.o.listeners.hasOwnProperty(n) && o.maps.event.addListener(this.oMap, n, function(t) {
                            a(s, t)
                        })
                    }
                }
                return this.loaded = !0, this
            }, e
        }(), "function" == typeof define && define.amd ? define(function() {
            return a
        }) : e.Maplace = a
    }(jQuery, this, google);
