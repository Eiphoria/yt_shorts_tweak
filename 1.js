  // "content_scripts": [
  //   {
  //       "matches": [
  //           "*://*.youtube.com/shorts*"
  //         ],
  //       "js": ["shorts.js"],
  //       "run_at": "document_idle"
  //   }
  // ] ,
//   "background": {
//     "scripts": [
//       "background.js"
//     ]
//   },

/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function() {
    chrome.runtime.onInstalled.addListener(function(b) {
        "install" === b.reason ? (chrome.runtime.openOptionsPage(), chrome.tabs.create({
                url: "https://www.mrfdev.com/event?n=install&b=firefox&e=enhancer-for-youtube&v=" + chrome.runtime.getManifest().version,
                active: !0
            }), chrome.storage.local.set({
                date: Date.now()
            })) : "update" === b.reason && /2\.0\.11[0-5]/.test(b.previousVersion) ? chrome.storage.local.set({
                reload: !0,
                update: Date.now(),
                whatsnew: !0
            }) : "update" === b.reason && /2\.0\.103/.test(b.previousVersion) ?
            chrome.storage.local.get({
                theme: "default-light"
            }, function(a) {
                "default-light" === a.theme ? a.theme = "default-dark" : a.darktheme = !0;
                a.controlbar = {
                    active: !1,
                    autohide: !1,
                    centered: !0,
                    position: "absolute"
                };
                a.update = Date.now();
                a.reload = !0;
                chrome.storage.local.set(a)
            }) : "update" === b.reason && /2\.0\.(9|10[0-1])/.test(b.previousVersion) && chrome.storage.local.get({
                autopausevideos: !0,
                customtheme: "",
                disablepreloading: !1,
                enablefilters: !1,
                pinnedplayer: !0,
                pinnedplayerposition: "_top-left",
                pinnedplayersize: "_400x225",
                quality1: "hd1080",
                quality2: "hd720",
                removeads: !1,
                removeannotations: !1,
                slideeffect: !1,
                theme: "default",
                toolbarbuttons: "clean,cinema,resize,detach,boost,loop,slowdown,speed,speedup,filters,script",
                script: ""
            }, function(a) {
                a.customcolors = {
                    "--main-color": "#00adee",
                    "--main-background": "#111111",
                    "--second-background": "#181818",
                    "--hover-background": "#232323",
                    "--main-text": "#eff0f1",
                    "--dimmer-text": "#cccccc",
                    "--shadow": "#000000"
                };
                a.customcssrules = a.customtheme;
                a.customtheme = "custom" === a.theme ? !0 : !1;
                "default" === a.theme || "custom" ===
                    a.theme ? (a.themevariant = "youtube-deep-dark.css", a.theme = "default-dark") : (a.themevariant = a.theme, a.theme = "youtube-deep-dark", a.darktheme = !0);
                a.controlbar = {
                    active: !0,
                    autohide: a.slideeffect,
                    centered: !0,
                    position: "fixed"
                };
                delete a.slideeffect;
                a.controls = [];
                a.controls.push("loop");
                a.controls.push("reverse-playlist");
                0 <= a.toolbarbuttons.indexOf("boost") && a.controls.push("volume-booster");
                a.controls.push("whitelist");
                a.controls.push("not-interested");
                a.controls.push("cards-end-screens");
                0 <= a.toolbarbuttons.indexOf("cinema") &&
                    a.controls.push("cinema-mode");
                0 <= a.toolbarbuttons.indexOf("resize") && a.controls.push("size");
                a.controls.push("pop-up-player");
                0 <= a.toolbarbuttons.indexOf("slowdown") && a.controls.push("speed-minus");
                a.controls.push("speed");
                0 <= a.toolbarbuttons.indexOf("speedup") && a.controls.push("speed-plus");
                a.controls.push("video-filters");
                a.controls.push("screenshot");
                a.controls.push("keyboard-shortcuts");
                0 <= a.toolbarbuttons.indexOf("script") && a.controls.push("custom-script");
                0 <= a.toolbarbuttons.indexOf("options") &&
                    a.controls.push("options");
                delete a.toolbarbuttons;
                a.applyvideofilters = a.enablefilters;
                delete a.enablefilters;
                a.blockads = a.removeads;
                delete a.removeads;
                a.blockautoplay = a.autopausevideos;
                delete a.autopausevideos;
                a.customscript = a.script;
                delete a.script;
                a.hidecardsendscreens = a.removeannotations;
                delete a.removeannotations;
                a.miniplayer = a.pinnedplayer;
                delete a.pinnedplayer;
                a.miniplayerposition = a.pinnedplayerposition;
                delete a.pinnedplayerposition;
                a.miniplayersize = a.pinnedplayersize;
                delete a.pinnedplayersize;
                a.qualityembeds = a.quality2;
                a.qualityembedsfullscreen = a.quality1;
                a.qualityplaylists = a.quality1;
                a.qualityplaylistsfullscreen = a.quality1;
                a.qualityvideos = a.quality1;
                a.qualityvideosfullscreen = a.quality1;
                delete a.quality1;
                delete a.quality2;
                a.stopvideos = a.disablepreloading;
                delete a.disablepreloading;
                a.update = Date.now();
                a.reload = !0;
                chrome.storage.local.set(a);
                chrome.storage.local.remove("autofocusevents autopausevideos disablepreloading enablefilters permissions pinnedplayer pinnedplayerposition pinnedplayersize quality1 quality2 quality3 quality4 removeads removeannotations script slideeffect toolbarbackgroundcolor toolbarbordercolor toolbarbuttons toolbarcolor toolbarcoloractive toolbaropacity toolbartooltips transparency visitor_info1_live".split(" "))
            })
    });
    chrome.runtime.setUninstallURL("https://www.mrfdev.com/event?n=uninstall&b=firefox&e=enhancer-for-youtube&v=" + chrome.runtime.getManifest().version);
    chrome.runtime.onMessage.addListener(function(b, a, c) {
        c = b.request;
        if ("get-messages" === c) {
            var e = chrome.i18n.getMessage("locale_code"),
                g = "add_to_whitelist boost_volume brightness cinema_mode color_inversion contrast custom_script expand flip_horizontally flip_vertically gaussian_blur grayscale hue_rotation keyboard_shortcuts loop loop_end loop_start message options pop_up_player remove_ads remove_from_whitelist reset reverse_playlist saturation screenshot sepia shrink skip_ads speed stop toggle_visibility video_filters".split(" ");
            chrome.storage.local.get({
                localecode: e,
                whatsnew: !1
            }, function(d) {
                var f = {};
                if (e === d.localecode) {
                    for (var h = g.length - 1; 0 <= h; h--) f[g[h]] = chrome.i18n.getMessage(g[h]);
                    chrome.tabs.sendMessage(a.tab.id, {
                        message: "set-messages",
                        messages: f
                    }, function(k) {
                        chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                    })
                } else fetch(`_locales/${d.localecode}/messages.json`).then(function(k) {
                    return k.json()
                }).then(function(k) {
                    for (var l = g.length - 1; 0 <= l; l--) f[g[l]] = k[g[l]].message;
                    chrome.tabs.sendMessage(a.tab.id, {
                        message: "set-messages",
                        messages: f
                    }, function(m) {
                        chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                    })
                });
                d.whatsnew && (chrome.storage.local.remove("whatsnew"), chrome.tabs.create({
                    url: "whats-new.html",
                    active: !0
                }), chrome.tabs.query({
                    url: "*://www.youtube.com/*"
                }, function(k) {
                    k.forEach(function(l) {
                        chrome.tabs.sendMessage(l.id, {
                            message: "pause-video"
                        }, function(m) {
                            chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                        })
                    })
                }))
            })
        } else "pause-videos" === c ? chrome.tabs.query({
                url: "*://www.youtube.com/*"
            },
            function(d) {
                d.forEach(function(f) {
                    chrome.tabs.sendMessage(f.id, {
                        message: "pause-video"
                    }, function(h) {
                        chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                    })
                })
            }) : "set-cookie" === c ? chrome.cookies.set({
            url: b.url,
            name: b.name,
            value: b.value,
            domain: ".youtube.com",
            path: "/",
            expirationDate: Math.floor(Date.now() / 1E3) + 31556926
        }) : "convert-short" === c ? chrome.tabs.update(a.tab.id, {
            url: a.tab.url.replace("shorts/", "watch?v=")
        }) : "pop-up-player" === c ? chrome.windows.create(b.options, function(d) {
            chrome.windows.update(d.id, {
                drawAttention: !0
            })
        }) : "keyboard-shortcuts" === c ? chrome.tabs.create({
            url: "https://www.mrfdev.com/youtube-keyboard-shortcuts",
            active: !0
        }) : "always-on-top" === c ? chrome.tabs.create({
            url: "https://www.mrfdev.com/always-on-top",
            active: !0
        }) : "custom-script" === c ? chrome.storage.local.get({
            customscript: ""
        }, function(d) {
            chrome.tabs.sendMessage(a.tab.id, {
                message: "custom-script",
                customscript: d.customscript
            }, function(f) {
                chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
            })
        }) : "whitelist" === c ? chrome.storage.local.get({
                whitelist: ""
            },
            function(d) {
                d = "" !== d.whitelist ? d.whitelist.split(",") : [];
                var f = b.channel.replace(/,/g, "").trim();
                if ("add" === b.action && 0 > d.indexOf(f)) {
                    d.push(f);
                    try {
                        d.sort(function(h, k) {
                            return h.localeCompare(k)
                        })
                    } catch (h) {
                        d.sort()
                    }
                } else "remove" === b.action && (f = d.indexOf(f), -1 !== f && d.splice(f, 1));
                chrome.storage.local.set({
                    whitelist: d.toString()
                })
            }) : "dark-theme-off" === c ? chrome.storage.local.get({
            darktheme: !1
        }, function(d) {
            d.darktheme && chrome.storage.local.set({
                darktheme: !1
            })
        }) : "options-page" === c && chrome.runtime.openOptionsPage()
    });
    chrome.storage.onChanged.addListener(function(b, a) {
        for (const c in b) "undefined" !== typeof b[c].newValue && ("customscript" !== c && "popuplayersize" !== c && chrome.tabs.query({
            url: "*://www.youtube.com/*"
        }, function(e) {
            e.forEach(function(g) {
                chrome.tabs.sendMessage(g.id, {
                    message: "preference-changed",
                    name: c,
                    value: b[c].newValue
                }, function(d) {
                    chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                })
            })
        }), "disableautoplay" === c && chrome.cookies.get({
            url: "https://www.youtube.com",
            name: "PREF"
        }, function(e) {
            e = e ?
                e.value.split("&") : [];
            var g = e.findIndex(function(d) {
                return /f5=[\w\d]+/.test(d)
            }); - 1 === g && (g = e.length);
            e[g] = !0 === b[c].newValue ? "f5=30000" : "f5=20000";
            chrome.cookies.set({
                url: "https://www.youtube.com",
                name: "PREF",
                value: e.join("&"),
                domain: ".youtube.com",
                path: "/",
                expirationDate: Math.floor(Date.now() / 1E3) + 31556926
            })
        }))
    });
    chrome.commands.onCommand.addListener(function(b) {
        var a = {
            "c070-toggle-loop": "loop",
            "c080-stop-video": "stop",
            "c090-reverse-playlist": "reverse-playlist",
            "c100-toggle-volume-booster": "volume-booster",
            "c110-whitelist": "whitelist",
            "c120-clear-ads": "not-interested",
            "c130-toggle-annotations": "cards-end-screens",
            "c140-toggle-cinema-mode": "cinema-mode",
            "c150-toggle-player-size": "size",
            "c160-center-video-player": "size",
            "c170-pop-up-player": "pop-up-player",
            "c180-decrease-speed": "speed-minus",
            "c190-increase-speed": "speed-plus",
            "c200-default-speed": "speed",
            "c210-normal-speed": "speed",
            "c220-toggle-video-filters": "video-filters",
            "c230-flip-horizontally": "flip-horizontally",
            "c240-flip-vertically": "flip-vertically",
            "c250-take-screenshot": "screenshot",
            "c260-keyboard-shortcuts": "keyboard-shortcuts",
            "c270-custom-script": "custom-script"
        };
        switch (b) {
            case "c000-options-page":
                chrome.runtime.openOptionsPage();
                break;
            case "c020-theme-youtube-dark":
                chrome.storage.local.set({
                    darktheme: !0,
                    theme: "default-dark"
                });
                break;
            case "c030-theme-youtube-deep-dark":
                chrome.storage.local.set({
                    darktheme: !0,
                    theme: "youtube-deep-dark"
                });
                break;
            case "c040-theme-youtube-deep-dark-custom":
                chrome.storage.local.set({
                    darktheme: !0,
                    theme: "youtube-deep-dark-custom"
                });
                break;
            case "c050-theme-custom-theme":
                chrome.storage.local.get({
                    customtheme: !1
                }, function(c) {
                    chrome.storage.local.set({
                        customtheme: !c.customtheme
                    })
                });
                break;
            default:
                chrome.tabs.query({
                    lastFocusedWindow: !0,
                    active: !0
                }, function(c) {
                    chrome.tabs.sendMessage(c[0].id, {
                        message: "command",
                        command: b,
                        control: a[b] ? a[b] : ""
                    }, function(e) {
                        chrome.runtime.lastError && (document.documentElement.dataset.e = 1)
                    })
                })
        }
    });
    chrome.browserAction.onClicked.addListener(function(b) {
        chrome.runtime.openOptionsPage()
    });
    chrome.storage.local.get({
        disableautoplay: !1,
        theatermode: !1
    }, function(b) {
        b.disableautoplay && chrome.cookies.get({
            url: "https://www.youtube.com",
            name: "PREF"
        }, function(a) {
            a = a ? a.value.split("&") : [];
            var c = a.findIndex(function(e) {
                return /f5=[\w\d]+/.test(e)
            }); - 1 === c && (c = a.length);
            a[c] = "f5=30000";
            chrome.cookies.set({
                url: "https://www.youtube.com",
                name: "PREF",
                value: a.join("&"),
                domain: ".youtube.com",
                path: "/",
                expirationDate: Math.floor(Date.now() / 1E3) + 31556926
            })
        });
        b.theatermode && chrome.cookies.set({
            url: "https://www.youtube.com",
            name: "wide",
            value: "1",
            domain: ".youtube.com",
            path: "/",
            expirationDate: Math.floor(Date.now() / 1E3) + 31556926
        })
    })
})();