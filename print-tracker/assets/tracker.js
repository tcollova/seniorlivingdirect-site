/* CP Senior Living Print Ad Order Tracker — Senior Living Direct
   Shared form engine. Each page supplies window.SLD_PAGE with its own data. */

(function () {
  "use strict";

  /* =====================================================================
     1. SETTINGS — the only line you normally need to change.
        Paste your Google Apps Script Web App URL between the quotes.
     ===================================================================== */
  var ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

  var AGENCY_EMAIL = "tcollova@seniorlivingdirect.com";
  var CAMPAIGN = "August 2026";

  /* ===================================================================== */

  var PAGE = window.SLD_PAGE || {};
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var uid = 0;
  function nextId() { return "f" + (++uid); }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function money(n) {
    return "$" + (isFinite(n) ? n : 0).toLocaleString("en-US", {
      minimumFractionDigits: 2, maximumFractionDigits: 2
    });
  }
  function num(v) { var n = parseFloat(v); return isFinite(n) ? n : 0; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function prettyDate(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return p[1].replace(/^0/, "") + "/" + p[2].replace(/^0/, "") + "/" + p[0];
  }

  /* ---------------- Field builders ---------------- */

  function field(labelText, inputEl, opts) {
    opts = opts || {};
    var lab = el("label", "field");
    var span = el("span", "lbl");
    span.innerHTML = esc(labelText) + (opts.required ? ' <span class="req">*</span>' : "");
    lab.appendChild(span);
    if (opts.money) {
      var w = el("div", "money-wrap");
      w.appendChild(inputEl);
      lab.appendChild(w);
    } else {
      lab.appendChild(inputEl);
    }
    if (opts.hint) lab.appendChild(el("span", "hint", esc(opts.hint)));
    return lab;
  }

  function input(type, opts) {
    opts = opts || {};
    var i = document.createElement("input");
    i.type = type;
    i.id = nextId();
    if (opts.placeholder) i.placeholder = opts.placeholder;
    if (opts.step) i.step = opts.step;
    if (opts.min !== undefined) i.min = opts.min;
    if (opts.required) i.dataset.required = "1";
    if (opts.label) i.dataset.label = opts.label;
    if (opts.name) i.dataset.name = opts.name;
    if (opts.inputmode) i.inputMode = opts.inputmode;
    i.addEventListener("input", recalc);
    i.addEventListener("change", recalc);
    return i;
  }

  function select(options, opts) {
    opts = opts || {};
    var s = document.createElement("select");
    s.id = nextId();
    if (opts.required) s.dataset.required = "1";
    if (opts.label) s.dataset.label = opts.label;
    options.forEach(function (o) {
      var op = document.createElement("option");
      op.value = o.value; op.textContent = o.text;
      s.appendChild(op);
    });
    s.addEventListener("change", recalc);
    return s;
  }

  /* ---------------- Run-date repeater ---------------- */

  function addDateRow(list, focus) {
    var row = el("div", "daterow");
    var n = el("span", "n");
    var d = input("date", { label: "Run date", required: true });
    d.classList.add("rundate");
    var x = el("button", "btn-x", "&times;");
    x.type = "button";
    x.title = "Remove this run date";
    x.setAttribute("aria-label", "Remove this run date");
    x.addEventListener("click", function () {
      if (list.querySelectorAll(".daterow").length > 1) { row.remove(); renumberDates(list); recalc(); }
    });
    row.appendChild(n); row.appendChild(d); row.appendChild(x);
    list.appendChild(row);
    renumberDates(list);
    if (focus) d.focus();
    recalc();
  }

  function renumberDates(list) {
    var rows = list.querySelectorAll(".daterow");
    rows.forEach(function (r, i) {
      r.querySelector(".n").textContent = "Insert " + (i + 1);
      r.querySelector(".btn-x").style.visibility = rows.length > 1 ? "visible" : "hidden";
    });
  }

  /* ---------------- Ad placement ---------------- */

  function buildPlacement(container) {
    var wrap = el("div", "placement");

    var head = el("div", "ph");
    head.appendChild(el("h3", null, "Ad placement"));
    var rm = el("button", "btn-remove", "Remove placement");
    rm.type = "button";
    rm.addEventListener("click", function () {
      if (container.querySelectorAll(".placement").length > 1) {
        wrap.remove(); renumberPlacements(container); recalc();
      }
    });
    head.appendChild(rm);
    wrap.appendChild(head);

    var body = el("div", "pb");

    /* --- Run dates --- */
    body.appendChild(el("div", "subhead", "Run dates"));
    body.appendChild(el("p", "section-note",
      "Add every date this same ad runs. Dates listed here all share the size and cost entered below."));
    var dates = el("div", "datelist");
    body.appendChild(dates);
    var addDate = el("button", "btn-add", "+ Add another run date");
    addDate.type = "button";
    addDate.addEventListener("click", function () { addDateRow(dates, true); });
    body.appendChild(addDate);

    /* --- Ordered size --- */
    body.appendChild(el("div", "subhead", "Ordered size"));
    var g1 = el("div", "grid grid-3");
    var dw = input("number", { step: "0.5", min: 0, label: "Display width", required: true, placeholder: "e.g. 6", inputmode: "decimal" });
    dw.classList.add("dispw");
    var dd = input("number", { step: "0.25", min: 0, label: "Display depth", required: true, placeholder: "e.g. 10", inputmode: "decimal" });
    dd.classList.add("dispd");
    g1.appendChild(field("Display width (columns)", dw, { required: true }));
    g1.appendChild(field("Display depth (inches)", dd, { required: true }));
    var ciBox = el("div", "field");
    var ciLabel = el("span", "lbl", "Total column inches");
    ciBox.appendChild(ciLabel);
    ciBox.appendChild(el("div", "calc colin", "<strong>—</strong>"));
    g1.appendChild(ciBox);
    body.appendChild(g1);

    /* --- Mechanical specs --- */
    body.appendChild(el("div", "subhead", "Mechanical specs"));
    body.appendChild(el("p", "section-note",
      "These are the specs we build the file to. Please give the actual image area in inches."));
    var g2 = el("div", "grid grid-3");
    var color = select([
      { value: "", text: "Select…" },
      { value: "Full Color", text: "Full Color" },
      { value: "Grayscale", text: "Grayscale" }
    ], { label: "Color", required: true });
    color.classList.add("color");
    var mw = input("number", { step: "0.001", min: 0, label: "Mechanical width", required: true, placeholder: "e.g. 9.889", inputmode: "decimal" });
    mw.classList.add("mechw");
    var md = input("number", { step: "0.125", min: 0, label: "Mechanical depth", required: true, placeholder: "e.g. 10", inputmode: "decimal" });
    md.classList.add("mechd");
    g2.appendChild(field("Color", color, { required: true }));
    g2.appendChild(field("Width (inches)", mw, { required: true, hint: "Actual width of the ad space" }));
    g2.appendChild(field("Depth (inches)", md, { required: true, hint: "Actual depth of the ad space" }));
    body.appendChild(g2);

    /* --- Cost --- */
    body.appendChild(el("div", "subhead", "Cost for this placement"));
    body.appendChild(el("p", "section-note",
      "Net cost to Senior Living Direct — the amount you will invoice us, covering every run date listed above."));
    var g3 = el("div", "grid");
    var cost = input("number", { step: "0.01", min: 0, label: "Ad cost", required: true, placeholder: "0.00", inputmode: "decimal" });
    cost.classList.add("cost");
    var ccf = input("number", { step: "0.01", min: 0, label: "Credit card fee", placeholder: "0.00", inputmode: "decimal" });
    ccf.classList.add("ccfee");
    g3.appendChild(field("Ad cost", cost, { required: true, money: true, hint: "Net, all insertions above" }));
    g3.appendChild(field("Credit card processing fee", ccf, { money: true, hint: "Leave blank if none" }));
    body.appendChild(g3);

    var g4 = el("div", "grid");
    var ofd = input("text", { label: "Other fee description", placeholder: "e.g. Premium position, tearsheet" });
    ofd.classList.add("otherdesc");
    var ofa = input("number", { step: "0.01", min: 0, label: "Other fee amount", placeholder: "0.00", inputmode: "decimal" });
    ofa.classList.add("otheramt");
    g4.appendChild(field("Other fees — description", ofd));
    g4.appendChild(field("Other fees — amount", ofa, { money: true }));
    body.appendChild(g4);

    var ptot = el("div", "calc ptotal");
    ptot.style.marginTop = "16px";
    ptot.innerHTML = "Placement total <strong>$0.00</strong>";
    body.appendChild(ptot);

    wrap.appendChild(body);
    container.appendChild(wrap);
    addDateRow(dates, false);
    renumberPlacements(container);
    return wrap;
  }

  function renumberPlacements(container) {
    var ps = container.querySelectorAll(".placement");
    ps.forEach(function (p, i) {
      p.querySelector(".ph h3").textContent = "Ad placement " + (i + 1);
      p.querySelector(".btn-remove").style.display = ps.length > 1 ? "" : "none";
    });
  }

  /* ---------------- Division block ---------------- */

  function buildDivision(camp, idx) {
    var card = el("section", "card division");
    card.dataset.division = camp.division;
    card.dataset.market = camp.market;
    card.dataset.budget = camp.budget;

    var head = el("header", "is-division");
    head.appendChild(el("h2", null, esc(camp.division)));
    head.appendChild(el("div", "sub",
      esc(camp.market) + " &nbsp;·&nbsp; Budget " + money(camp.budget) + " net"));
    card.appendChild(head);

    var body = el("div", "body");

    if (camp.components && camp.components.length) {
      var comp = el("div", "components");
      comp.appendChild(el("div", "lbl", "One ad, covering"));
      var ul = el("ul");
      camp.components.forEach(function (c) {
        ul.appendChild(el("li", null,
          "<strong>" + esc(c.division) + "</strong> — " + esc(c.market) +
          " <span>" + money(c.budget) + "</span>"));
      });
      comp.appendChild(ul);
      comp.appendChild(el("p", null,
        "These run together as a single ad. Enter one set of specs and one cost for the whole thing."));
      body.appendChild(comp);
      card.dataset.components = camp.components.map(function (c) {
        return c.division + " (" + c.market + ", " + money(c.budget) + ")";
      }).join("; ");
    }

    var holder = el("div", "placements");
    body.appendChild(holder);

    var addP = el("button", "btn-add wide", "+ Add another ad placement (different size or cost)");
    addP.type = "button";
    addP.addEventListener("click", function () {
      var p = buildPlacement(holder);
      recalc();
      p.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    body.appendChild(addP);

    var tot = el("div", "totals divtotals");
    tot.innerHTML =
      '<div class="trow"><span>Ad cost</span><span class="amt t-ad">$0.00</span></div>' +
      '<div class="trow"><span>Credit card processing fees</span><span class="amt t-cc">$0.00</span></div>' +
      '<div class="trow"><span>Other fees</span><span class="amt t-of">$0.00</span></div>' +
      '<div class="trow grand"><span>' + esc(camp.division) + ' total</span><span class="amt t-div">$0.00</span></div>' +
      '<div class="trow"><span>Budget ' + money(camp.budget) + '</span><span class="t-flag"><span class="pill idle">Not started</span></span></div>';
    body.appendChild(tot);

    card.appendChild(body);
    buildPlacement(holder);
    return card;
  }

  /* ---------------- Calculation ---------------- */

  var state = { grand: 0 };

  function recalc() {
    var grand = 0;

    document.querySelectorAll(".division").forEach(function (div) {
      var budget = num(div.dataset.budget);
      var ad = 0, cc = 0, of_ = 0;

      div.querySelectorAll(".placement").forEach(function (p) {
        var w = num(p.querySelector(".dispw").value);
        var d = num(p.querySelector(".dispd").value);
        var inserts = p.querySelectorAll(".rundate").length;
        var per = w * d;
        var box = p.querySelector(".colin");
        if (w > 0 && d > 0) {
          box.innerHTML = "<strong>" + per.toFixed(2) + "</strong> col. in. each" +
            (inserts > 1 ? " &nbsp;·&nbsp; <strong>" + (per * inserts).toFixed(2) + "</strong> total (&times;" + inserts + ")" : "");
        } else {
          box.innerHTML = "<strong>—</strong>";
        }

        var c = num(p.querySelector(".cost").value);
        var f = num(p.querySelector(".ccfee").value);
        var o = num(p.querySelector(".otheramt").value);
        ad += c; cc += f; of_ += o;
        p.querySelector(".ptotal").innerHTML = "Placement total <strong>" + money(c + f + o) + "</strong>";
      });

      var dtot = ad + cc + of_;
      grand += dtot;

      div.querySelector(".t-ad").textContent = money(ad);
      div.querySelector(".t-cc").textContent = money(cc);
      div.querySelector(".t-of").textContent = money(of_);
      div.querySelector(".t-div").textContent = money(dtot);

      var flag = div.querySelector(".t-flag");
      var diff = dtot - budget;
      if (dtot === 0) {
        flag.innerHTML = '<span class="pill idle">Not started</span>';
      } else if (Math.abs(diff) < 0.005) {
        flag.innerHTML = '<span class="pill ok">On budget</span>';
      } else if (diff > 0) {
        flag.innerHTML = '<span class="pill over">Over by ' + money(diff) + '</span>';
      } else {
        flag.innerHTML = '<span class="pill under">Under by ' + money(-diff) + '</span>';
      }
    });

    state.grand = grand;
    var budgetTotal = num(PAGE.budgetTotal);
    document.getElementById("bar-entered").textContent = money(grand);
    var barFlag = document.getElementById("bar-flag");
    var d2 = grand - budgetTotal;
    if (grand === 0) barFlag.innerHTML = '<span class="pill idle">Not started</span>';
    else if (Math.abs(d2) < 0.005) barFlag.innerHTML = '<span class="pill ok">Matches budget</span>';
    else if (d2 > 0) barFlag.innerHTML = '<span class="pill over">Over by ' + money(d2) + '</span>';
    else barFlag.innerHTML = '<span class="pill under">Under by ' + money(-d2) + '</span>';

    var ot = document.getElementById("order-total");
    if (ot) ot.textContent = money(grand);
  }

  /* ---------------- Collect + validate ---------------- */

  function collect() {
    var errors = [];
    document.querySelectorAll(".invalid").forEach(function (n) { n.classList.remove("invalid"); });

    function need(node, label) {
      var v = (node.value || "").trim();
      if (!v) { node.classList.add("invalid"); errors.push(label); return ""; }
      return v;
    }

    var rep = {
      name: need(document.getElementById("repName"), "Rep name"),
      phone: need(document.getElementById("repPhone"), "Phone number"),
      email: need(document.getElementById("repEmail"), "Email address")
    };
    if (rep.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(rep.email)) {
      document.getElementById("repEmail").classList.add("invalid");
      errors.push("A valid email address");
    }

    var days = [];
    document.querySelectorAll(".dayck:checked").forEach(function (c) { days.push(c.value); });
    var otherDays = document.getElementById("daysOther").value.trim();
    if (otherDays) days.push(otherDays);
    if (!days.length) { document.getElementById("daysOther").classList.add("invalid"); errors.push("Days published"); }

    var paper = {
      circulation: need(document.getElementById("circulation"), "Circulation"),
      marketsServed: need(document.getElementById("marketsServed"), "Markets served"),
      daysPublished: days.join(", ")
    };
    var notes = document.getElementById("repNotes").value.trim();

    var divisions = [];
    document.querySelectorAll(".division").forEach(function (div) {
      var placements = [];
      div.querySelectorAll(".placement").forEach(function (p, pi) {
        var dates = [];
        p.querySelectorAll(".rundate").forEach(function (d) {
          var v = need(d, "Run date (" + div.dataset.division + ", placement " + (pi + 1) + ")");
          if (v) dates.push(v);
        });
        var w = num(need(p.querySelector(".dispw"), "Display width (" + div.dataset.division + ")"));
        var dp = num(need(p.querySelector(".dispd"), "Display depth (" + div.dataset.division + ")"));
        var color = need(p.querySelector(".color"), "Color (" + div.dataset.division + ")");
        var mw = num(need(p.querySelector(".mechw"), "Mechanical width (" + div.dataset.division + ")"));
        var md = num(need(p.querySelector(".mechd"), "Mechanical depth (" + div.dataset.division + ")"));
        var cost = num(need(p.querySelector(".cost"), "Ad cost (" + div.dataset.division + ")"));
        var cc = num(p.querySelector(".ccfee").value);
        var od = p.querySelector(".otherdesc").value.trim();
        var oa = num(p.querySelector(".otheramt").value);

        placements.push({
          index: pi + 1,
          runDates: dates,
          runDatesPretty: dates.map(prettyDate).join(", "),
          insertions: dates.length,
          displayWidthCols: w,
          displayDepthIn: dp,
          colInchesPerInsertion: +(w * dp).toFixed(2),
          totalColInches: +(w * dp * dates.length).toFixed(2),
          color: color,
          mechWidthIn: mw,
          mechDepthIn: md,
          adCost: cost,
          ccFee: cc,
          otherFeeDesc: od,
          otherFeeAmt: oa,
          placementTotal: +(cost + cc + oa).toFixed(2)
        });
      });

      var dTot = placements.reduce(function (s, p) { return s + p.placementTotal; }, 0);
      divisions.push({
        division: div.dataset.division,
        market: div.dataset.market,
        components: div.dataset.components || "",
        budgetNet: num(div.dataset.budget),
        placements: placements,
        divisionTotal: +dTot.toFixed(2),
        variance: +(dTot - num(div.dataset.budget)).toFixed(2)
      });
    });

    return {
      errors: errors,
      payload: {
        campaign: CAMPAIGN,
        submittedAt: new Date().toISOString(),
        publication: PAGE.publication,
        pageSlug: PAGE.slug,
        budgetTotalNet: num(PAGE.budgetTotal),
        rep: rep,
        newspaper: paper,
        notes: notes,
        divisions: divisions,
        orderTotal: +state.grand.toFixed(2),
        variance: +(state.grand - num(PAGE.budgetTotal)).toFixed(2),
        agencyEmail: AGENCY_EMAIL
      }
    };
  }

  /* ---------------- Submit ---------------- */

  function submit() {
    var res = collect();
    var box = document.getElementById("errbox");
    box.innerHTML = "";

    if (res.errors.length) {
      var uniq = res.errors.filter(function (v, i, a) { return a.indexOf(v) === i; });
      box.innerHTML = '<div class="msg err"><strong>A few fields still need filling in:</strong><ul>' +
        uniq.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul></div>";
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      var first = document.querySelector(".invalid");
      if (first) first.focus();
      return;
    }

    var btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.textContent = "Sending…";

    if (ENDPOINT.indexOf("PASTE_YOUR") === 0) {
      box.innerHTML = '<div class="msg err">This form is not connected yet. Add your Apps Script URL to <strong>assets/tracker.js</strong> (the ENDPOINT setting at the top).</div>';
      console.log("Payload that would be sent:", res.payload);
      btn.disabled = false;
      btn.textContent = "Submit order";
      return;
    }

    fetch(ENDPOINT, {
      method: "POST",
      // text/plain avoids a CORS preflight that Apps Script cannot answer
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(res.payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (out) {
        if (out && out.ok) showDone(res.payload);
        else throw new Error((out && out.error) || "Unknown error");
      })
      .catch(function (err) {
        box.innerHTML = '<div class="msg err"><strong>That didn\'t go through.</strong> ' +
          esc(err.message) + ' Please try again, or email your order to ' +
          '<a href="mailto:' + AGENCY_EMAIL + '">' + AGENCY_EMAIL + '</a>.</div>';
        box.scrollIntoView({ behavior: "smooth", block: "center" });
        btn.disabled = false;
        btn.textContent = "Submit order";
      });
  }

  function showDone(p) {
    document.querySelector("main").innerHTML =
      '<div class="done"><h2>Order received — thank you.</h2>' +
      '<p>A confirmation copy is on its way to <strong>' + esc(p.rep.email) + '</strong> and to Tim Collova at Senior Living Direct.</p>' +
      '<p>Order total logged: <strong>' + money(p.orderTotal) + '</strong> for ' + esc(p.publication) + '.</p>' +
      '<p>We will send your high-resolution CMYK PDFs ahead of the first run date. Questions in the meantime: ' +
      '<a href="mailto:' + AGENCY_EMAIL + '">' + AGENCY_EMAIL + '</a>.</p></div>';
    var bar = document.querySelector(".stickybar");
    if (bar) bar.remove();
    document.body.style.paddingBottom = "0";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------------- Page assembly ---------------- */

  function boot() {
    // Hero
    document.getElementById("heroPub").innerHTML =
      "<strong>" + esc(PAGE.publication) + "</strong> &nbsp;·&nbsp; " + esc(CAMPAIGN) + " print schedule";
    document.getElementById("heroBudget").textContent = money(PAGE.budgetTotal);
    document.getElementById("heroCount").textContent =
      PAGE.campaigns.length + (PAGE.campaigns.length === 1 ? " community" : " communities");
    document.getElementById("bar-budget").textContent = money(PAGE.budgetTotal);

    // Days-of-week checkboxes
    var checks = document.getElementById("dayChecks");
    DAYS.forEach(function (d) {
      var lab = el("label");
      var c = document.createElement("input");
      c.type = "checkbox"; c.value = d; c.className = "dayck";
      lab.appendChild(c);
      lab.appendChild(document.createTextNode(d));
      checks.appendChild(lab);
    });

    // Division cards
    var host = document.getElementById("divisions");
    PAGE.campaigns.forEach(function (c, i) { host.appendChild(buildDivision(c, i)); });

    document.getElementById("submitBtn").addEventListener("click", submit);
    recalc();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
