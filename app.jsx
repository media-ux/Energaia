/* global React, Icon, Hero, Thesis, Services, SynKero, Clusters, Process, Sectors, Markets, Network, Team, Blog, Contact, Footer,
   TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor */
// app.jsx — Boot, header, ticker, language switcher, mobile menu, tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "graphite",
  "accent": "#F8B729",
  "density": "comfortable",
  "showTicker": true
}/*EDITMODE-END*/;

function App() {
  const [lang, setLang] = React.useState(() => localStorage.getItem("ena-lang") || "en");
  const t = React.useCallback((k) => {
    const v = window.i18n[lang][k];
    return v ?? window.i18n.en[k] ?? k;
  }, [lang]);

  React.useEffect(() => {
    localStorage.setItem("ena-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // header & scroll progress
  const [solid, setSolid] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setSolid(h.scrollTop > 60);
      setProgress(h.scrollTop / (h.scrollHeight - h.clientHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile drawer
  const [drawer, setDrawer] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  // smooth scroll anchor with header offset
  const goTo = (id) => {
    setDrawer(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // brief highlight when a cluster card is opened from the nav
  const goToCluster = (anchor) => {
    goTo(`cluster-${anchor}`);
    requestAnimationFrame(() => {
      const el = document.getElementById(`cluster-${anchor}`);
      if (!el) return;
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
    });
  };

  // tweaks
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    document.body.classList.toggle("theme-paper", tweaks.theme === "paper");
    document.body.classList.toggle("density-dense", tweaks.density === "dense");
    document.documentElement.style.setProperty("--yellow", tweaks.accent);
  }, [tweaks]);

  const ticker = tweaks.showTicker;

  const clusterSubs = [
    { anchor: "mfuel",     codeKey: "cl_1_code", nameKey: "cl_1_name", tagKey: "cl_1_tag" },
    { anchor: "cluster-2", codeKey: "cl_2_code", nameKey: "cl_2_name", tagKey: "cl_2_tag" },
    { anchor: "cluster-3", codeKey: "cl_3_code", nameKey: "cl_3_name", tagKey: "cl_3_tag" },
    { anchor: "cluster-4", codeKey: "cl_4_code", nameKey: "cl_4_name", tagKey: "cl_4_tag" },
    { anchor: "cluster-5", codeKey: "cl_5_code", nameKey: "cl_5_name", tagKey: "cl_5_tag" },
  ];

  const workSubs = [
    { id: "services", labelKey: "nav_services" },
    { id: "focus",    labelKey: "nav_focus" },
    { id: "sectors",  labelKey: "nav_sectors" },
  ];
  const aboutSubs = [
    { id: "approach", labelKey: "nav_approach" },
    { id: "team",     labelKey: "nav_team" },
    { id: "network",  labelKey: "nav_network" },
    { id: "insights", labelKey: "nav_blog" },
  ];

  const navItems = [
    {
      kind: "simple-dropdown",
      id: "work",
      key: "nav_work",
      subKey: "nav_work_sub",
      subs: workSubs,
    },
    {
      kind: "dropdown",
      id: "clusters",
      key: "nav_clusters",
      subKey: "nav_clusters_sub",
      subs: clusterSubs,
    },
    {
      kind: "simple-dropdown",
      id: "about",
      key: "nav_about",
      subKey: "nav_about_sub",
      subs: aboutSubs,
    },
    { kind: "link", id: "contact",  key: "nav_contact" },
  ];

  return (
    <>
      {ticker && (
        <div className="ticker" aria-hidden="true" style={{ top: 0 }}>
          <div className="ticker-track">
            <span><span className="dot">●</span> ENERGAIA INSTITUT</span>
            <span>{t("ticker_strap").toUpperCase()}</span>
            <span>48.1659° N · 11.5754° E</span>
            <span>MÜNCHEN — DE</span>
            <span>LAS PALMAS — ES</span>
            <span>DUBLIN — IE</span>
            <span>HRB 309678</span>
            <span>EST. 2024</span>
            <span><span className="dot">●</span> {t("ticker_status").toUpperCase()}</span>
            <span>ENERGAIA INSTITUT</span>
            <span>{t("ticker_strap").toUpperCase()}</span>
            <span>48.1659° N · 11.5754° E</span>
            <span>MÜNCHEN — DE</span>
            <span>LAS PALMAS — ES</span>
            <span>DUBLIN — IE</span>
          </div>
          <div className="ticker-track" aria-hidden="true">
            <span><span className="dot">●</span> ENERGAIA INSTITUT</span>
            <span>{t("ticker_strap").toUpperCase()}</span>
            <span>48.1659° N · 11.5754° E</span>
            <span>MÜNCHEN — DE</span>
            <span>LAS PALMAS — ES</span>
            <span>DUBLIN — IE</span>
            <span>HRB 309678</span>
            <span>EST. 2024</span>
            <span><span className="dot">●</span> {t("ticker_status").toUpperCase()}</span>
            <span>ENERGAIA INSTITUT</span>
            <span>{t("ticker_strap").toUpperCase()}</span>
            <span>48.1659° N · 11.5754° E</span>
            <span>MÜNCHEN — DE</span>
            <span>LAS PALMAS — ES</span>
            <span>DUBLIN — IE</span>
          </div>
        </div>
      )}

      <div className="scroll-progress" style={{ width: `${progress * 100}%`, top: ticker ? 28 : 0 }} />

      <header className={`site-header ${solid ? "solid" : ""}`} style={{ top: ticker ? 28 : 0 }}>
        <div className="container">
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); goTo("top"); }}>
            <img src={window.__ENERGAIA_LOGO__} alt="Energaia Institut" style={{ height: 44, display: "block" }} />
          </a>

          <nav className="nav">
            {navItems.map((item) => {
              if (item.kind === "dropdown") {
                return (
                  <NavDropdown
                    key={item.id}
                    label={t(item.key)}
                    sub={t(item.subKey)}
                    items={item.subs}
                    t={t}
                    onPick={(anchor) => goToCluster(anchor)}
                    onHeader={() => goTo(item.id)}
                  />
                );
              }
              if (item.kind === "simple-dropdown") {
                return (
                  <NavDropdownSimple
                    key={item.id}
                    label={t(item.key)}
                    sub={t(item.subKey)}
                    items={item.subs}
                    t={t}
                    onPick={(id) => goTo(id)}
                  />
                );
              }
              return (
                <button key={item.id} className="nav-link" onClick={() => goTo(item.id)}>{t(item.key)}</button>
              );
            })}

            <div className="lang-switch" role="group" aria-label="Language">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
              <button className={lang === "de" ? "active" : ""} onClick={() => setLang("de")}>DE</button>
            </div>

            <button className="nav-cta" onClick={() => goTo("contact")}>
              {t("nav_cta")} <Icon name="arrowRight" size={14} />
            </button>

            <button className="mobile-trigger" aria-label="Menu" onClick={() => setDrawer(d => !d)}>
              <Icon name={drawer ? "close" : "menu"} size={20} />
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-drawer ${drawer ? "open" : ""}`} style={{ top: ticker ? 108 : 80 }}>
        {navItems.map((item) => {
          if (item.kind === "dropdown") {
            return (
              <React.Fragment key={item.id}>
                <button className="mobile-group" onClick={() => goTo(item.id)}>{t(item.key)}</button>
                <div className="mobile-subs">
                  {item.subs.map((s) => (
                    <button key={s.anchor} className="mobile-sub" onClick={() => goToCluster(s.anchor)}>
                      <span className="ix">{t(s.codeKey)}</span> {t(s.nameKey)}
                    </button>
                  ))}
                </div>
              </React.Fragment>
            );
          }
          if (item.kind === "simple-dropdown") {
            return (
              <React.Fragment key={item.id}>
                <div className="mobile-group-label">{t(item.key)}</div>
                <div className="mobile-subs">
                  {item.subs.map((s) => (
                    <button key={s.id} className="mobile-sub" onClick={() => goTo(s.id)}>{t(s.labelKey)}</button>
                  ))}
                </div>
              </React.Fragment>
            );
          }
          return (
            <button key={item.id} onClick={() => goTo(item.id)}>{t(item.key)}</button>
          );
        })}
        <div className="cta-row">
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => goTo("contact")}>
            {t("nav_cta")} <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </div>

      <main style={{ paddingTop: ticker ? 108 : 80 }}>
        <Hero
          t={t}
          onPrimary={() => goTo("contact")}
          onSecondary={() => goTo("clusters")}
        />
        <Thesis t={t} />
        <Services t={t} />
        <SynKero t={t} />
        <Clusters t={t} />
        <Process t={t} />
        <Sectors t={t} />
        <Markets t={t} />
        <Network t={t} />
        <Team t={t} />
        <Blog t={t} onCta={() => goTo("insights")} />
        <Contact t={t} />
      </main>

      <Footer t={t} lang={lang} />

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={["comfortable", "dense"]}
          />
        </TweakSection>
        <TweakSection label="Accent">
          <TweakColor
            label="Accent colour"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={["#F8B729", "#2F5D50", "#D97757", "#355769"]}
          />
        </TweakSection>
        <TweakSection label="Chrome">
          <TweakRadio
            label="Ticker"
            value={tweaks.showTicker ? "on" : "off"}
            onChange={(v) => setTweak("showTicker", v === "on")}
            options={["on", "off"]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function NavDropdown({ label, sub, items, t, onPick, onHeader }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeTimer = React.useRef(null);

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    clearTimeout(closeTimer.current);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      className={`nav-dd ${open ? "open" : ""}`}
      ref={ref}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="nav-link nav-dd-trigger"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => { cancelClose(); setOpen(true); }}
      >
        {label}
        <span className="nav-dd-caret" aria-hidden="true">▾</span>
      </button>

      <div
        className="nav-dd-panel"
        role="menu"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="nav-dd-head">
          <span className="nav-dd-eyebrow">{sub}</span>
          <button
            type="button"
            className="nav-dd-allbtn"
            onClick={() => { setOpen(false); onHeader && onHeader(); }}
          >
            View all →
          </button>
        </div>
        <div className="nav-dd-grid">
          {items.map((s) => (
            <button
              key={s.anchor}
              type="button"
              role="menuitem"
              className="nav-dd-item"
              onClick={() => { setOpen(false); onPick(s.anchor); }}
            >
              <div className="nav-dd-code">{t(s.codeKey)}</div>
              <div className="nav-dd-body">
                <div className="nav-dd-name">{t(s.nameKey)}</div>
                <div className="nav-dd-tag">{t(s.tagKey)}</div>
              </div>
              <span className="nav-dd-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavDropdownSimple({ label, sub, items, t, onPick }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeTimer = React.useRef(null);

  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => { clearTimeout(closeTimer.current); };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      className={`nav-dd nav-dd-mini ${open ? "open" : ""}`}
      ref={ref}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="nav-link nav-dd-trigger"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => { cancelClose(); setOpen(true); }}
      >
        {label}
        <span className="nav-dd-caret" aria-hidden="true">▾</span>
      </button>
      <div
        className="nav-dd-panel nav-dd-panel-mini"
        role="menu"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {sub && <div className="nav-dd-mini-eyebrow">{sub}</div>}
        <div className="nav-dd-mini-list">
          {items.map((s) => (
            <button
              key={s.id}
              type="button"
              role="menuitem"
              className="nav-dd-mini-item"
              onClick={() => { setOpen(false); onPick(s.id); }}
            >
              {t(s.labelKey)}
              <span className="nav-dd-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
