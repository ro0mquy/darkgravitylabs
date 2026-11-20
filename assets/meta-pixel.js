// Meta pixel "Dark Gravity Labs" (dataset 3786194821530905, business portfolio "Yannik Zimmermann",
// connected to ad account act_1567299535202899) for retargeting visitors of darkgravitylabs.com and
// work.darkgravitylabs.com (Yannik 2026-11-20, https://ampcode.com/threads/T-01a1f8e8-39db-703e-84e9-9f6069376a05).
// Part of the brand kit: every page of both sites loads /assets/meta-pixel.js. ASK is off (Yannik 2026-11-20,
// "1b, drop the banner", same thread): Meta loads on every visit. With ASK on, Meta loads only after the
// visitor says yes in a small banner; the answer is kept in localStorage. Any element with data-pixel-choice
// (the privacy page's opt-out link) turns the pixel off for this browser, or with ASK on asks again.
(function () {
  var ID = "3786194821530905";
  var ASK = false;
  var KEY = "dgl-meta-pixel";

  function load() {
    if (window.fbq) return;
    var n = window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    window.fbq("init", ID);
    window.fbq("track", "PageView");
  }

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {} }

  function ask() {
    if (document.getElementById("dgl-pixel-ask")) return;
    var de = (document.documentElement.lang || "").slice(0, 2) === "de";
    var t = de
      ? { q: "Darf ich Metas Pixel nutzen, damit du meine Anzeigen später auf Instagram und Facebook siehst?",
          yes: "Ja", no: "Nein", more: "Datenschutz" }
      : { q: "May I use Meta's pixel, so you see my ads later on Instagram and Facebook?",
          yes: "Yes", no: "No", more: "Privacy" };
    var box = document.createElement("div");
    box.id = "dgl-pixel-ask";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", t.more);
    box.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483647;margin:0 auto;" +
      "max-width:520px;box-sizing:border-box;padding:14px 16px;border-radius:14px;background:#16161a;color:#f4f1ec;" +
      "font:15px/1.45 Outfit,system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 14px 34px -12px rgba(0,0,0,.5);" +
      "display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px";
    var p = document.createElement("p");
    p.style.cssText = "margin:0;flex:1 1 240px";
    p.appendChild(document.createTextNode(t.q + " "));
    var a = document.createElement("a");
    a.href = "https://darkgravitylabs.com/privacy/";
    a.textContent = t.more;
    a.style.cssText = "color:#f0a878";
    p.appendChild(a);
    box.appendChild(p);
    var row = document.createElement("span");
    row.style.cssText = "display:flex;gap:8px";
    [[t.no, "no"], [t.yes, "yes"]].forEach(function (b) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = b[0];
      btn.style.cssText = "font:inherit;font-weight:600;cursor:pointer;border-radius:999px;padding:7px 18px;" +
        "border:1px solid #f0a878;background:" + (b[1] === "yes" ? "#f0a878;color:#140b05" : "transparent;color:#f4f1ec");
      btn.addEventListener("click", function () {
        set(b[1]);
        box.remove();
        if (b[1] === "yes") load();
        else if (window.fbq) window.fbq("consent", "revoke");
      });
      row.appendChild(btn);
    });
    box.appendChild(row);
    document.body.appendChild(box);
  }

  function start() {
    var choice = get();
    if (choice === "no") {}
    else if (!ASK || choice === "yes") load();
    else ask();
    document.querySelectorAll("[data-pixel-choice]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        if (ASK) { set(null); ask(); return; }
        set("no");
        if (window.fbq) window.fbq("consent", "revoke");
        el.textContent = el.getAttribute("data-pixel-choice") || "off";
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
