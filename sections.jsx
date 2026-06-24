/* global React, Icon */
// sections.jsx — All page sections as plain components consuming `t`.

const Reveal = ({ children, delay = 0, as: As = "div", className = "", ...rest }) => {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { setSeen(true); io.unobserve(el); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `reveal ${seen ? "in" : ""} ${className}`.trim();
  return <As ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>{children}</As>;
};

const ChapterMark = ({ num, label }) => (
  <div className="chapter-mark">
    <span className="num">{num}</span>
    <span className="dash" />
    <span>{label}</span>
  </div>
);

/* ============ HERO ============ */
function Hero({ t, onPrimary, onSecondary }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="container">
        <div className="chapter-mark" style={{ marginBottom: 40 }}>
          <span className="dash" />
          <span className="num">01</span>
          <span>{t("hero_eyebrow").split("/ ")[1] || "Index"}</span>
        </div>
        <h1>
          <span className="word">{t("hero_w1")}</span>{" "}
          <span className="word">{t("hero_w2")}</span>{" "}
          <span className="word">{t("hero_w3")}</span>
        </h1>
        <p className="lede">{t("hero_lede")}</p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onPrimary}>
            {t("hero_primary")} <Icon name="arrowRight" size={16} />
          </button>
          <button className="btn btn-ghost-dark" onClick={onSecondary}>
            {t("hero_secondary")}
          </button>
        </div>
        <dl className="hero-meta">
          <div>
            <dt>/ {t("hero_meta_loc")}</dt>
            <dd>{t("hero_meta_loc_v")}<span className="sub">{t("hero_meta_loc_sub")}</span></dd>
          </div>
          <div>
            <dt>/ {t("hero_meta_svc")}</dt>
            <dd>{t("hero_meta_svc_v")}<span className="sub">{t("hero_meta_svc_sub")}</span></dd>
          </div>
          <div>
            <dt>/ {t("hero_meta_geo")}</dt>
            <dd>{t("hero_meta_geo_v")}<span className="sub">{t("hero_meta_geo_sub")}</span></dd>
          </div>
          <div>
            <dt>/ {t("hero_meta_lang")}</dt>
            <dd>{t("hero_meta_lang_v")}<span className="sub">{t("hero_meta_lang_sub")}</span></dd>
          </div>
        </dl>
      </div>

      <div className="hero-stat">
        <div className="v">{t("hero_stat_v")}</div>
        <div className="l">{t("hero_stat_l")}</div>
      </div>
    </section>
  );
}

/* ============ THESIS ============ */
function Thesis({ t }) {
  return (
    <section className="thesis section-pad" id="approach">
      <div className="container">
        <Reveal><ChapterMark num="02" label={t("th_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("th_title_a")} <em className="yk">{t("th_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("th_desc")}</p>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="thesis-grid">
            {[1, 2, 3].map(i => (
              <div className="thesis-cell" key={i}>
                <div className="tag">{t(`th_${i}_tag`)}</div>
                <h3>{t(`th_${i}_h`)}</h3>
                <p>{t(`th_${i}_p`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
function Services({ t }) {
  const svcs = [
    { icon: "fileText", k: 1 },
    { icon: "coins",    k: 2 },
    { icon: "wrench",   k: 3 },
    { icon: "cpu",      k: 4 },
    { icon: "layers",   k: 5 },
    { icon: "route",    k: 6 },
  ];
  return (
    <section className="services section-pad" id="services">
      <div className="container">
        <Reveal><ChapterMark num="03" label={t("sv_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("sv_title_a")} <em className="yk">{t("sv_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("sv_desc")}</p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="services-grid">
            {svcs.map((s, i) => (
              <article className="service-card" key={s.k}>
                <div className="num">— 0{s.k} —</div>
                <div className="icon-wrap"><Icon name={s.icon} size={20} /></div>
                <div className="kicker">{t(`sv_${s.k}_k`)}</div>
                <h3>{t(`sv_${s.k}_h`)}</h3>
                <p>{t(`sv_${s.k}_p`)}</p>
                <div className="arrow">
                  <span className="l" />
                  {t("sv_arrow")}
                </div>
                <div className="underline-rule" />
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PROCESS ============ */
function Process({ t }) {
  return (
    <section className="process section-pad" id="process">
      <div className="container">
        <Reveal><ChapterMark num="06" label={t("pr_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("pr_title_a")} <em className="yk">{t("pr_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("pr_desc")}</p>
          </Reveal>
        </div>

        <div className="process-layout">
          <div>
            {[1, 2, 3, 4].map(i => (
              <Reveal delay={i * 60} key={i}>
                <div className="process-step">
                  <div className="step-num">— 0{i}</div>
                  <div>
                    <h4>{t(`pr_${i}_h`)}</h4>
                    <p>{t(`pr_${i}_p`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <aside className="why-card">
              <h4>{t("why_h")}</h4>
              <ul className="why-list">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <li key={i}>
                    <span className="ix">0{i}</span>
                    <span><b>{t(`why_${i}_h`)}</b>{t(`why_${i}_p`)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ SECTORS ============ */
function Sectors({ t }) {
  const list = [
    { k: 1, icon: "zap" },
    { k: 2, icon: "settings" },
    { k: 3, icon: "brain" },
    { k: 4, icon: "leaf" },
  ];
  return (
    <section className="sectors section-pad" id="sectors">
      <div className="container">
        <Reveal><ChapterMark num="07" label={t("se_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("se_title_a")} <em className="yk">{t("se_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("se_desc")}</p>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="sectors-grid">
            {list.map(s => {
              const tags = t(`se_${s.k}_tags`);
              return (
                <article className="sector-card" key={s.k}>
                  <div className="num">/ 0{s.k}</div>
                  <div className="sector-icon"><Icon name={s.icon} size={22} /></div>
                  <h3>{t(`se_${s.k}_h`)}</h3>
                  <p>{t(`se_${s.k}_p`)}</p>
                  {Array.isArray(tags) && (
                    <div className="tag-list">
                      {tags.map(tg => <span key={tg}>{tg}</span>)}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ MARKETS BAND ============ */
function Markets({ t }) {
  return (
    <section className="markets" id="markets">
      <div className="container">
        <Reveal><ChapterMark num="08" label={t("mk_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2 style={{ color: "#fff" }}>{t("mk_title_a")} <em className="yk">{t("mk_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("hero_meta_geo_sub")} — three offices, one operating model. Capital, regulation and engineering coordinated across jurisdictions.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="row">
            {["de", "es", "ie", "id", "au", "eu"].map((k, i) => {
              const status = t(`mk_${k}_s`);
              const hasStatus = status && status !== `mk_${k}_s`;
              return (
                <div className={`market ${hasStatus ? "is-pending" : ""}`} key={k}>
                  <div className="code">{`/ ${String(i + 1).padStart(2, "0")}`}</div>
                  <div className="place">
                    {t(`mk_${k}`)}
                    {hasStatus && <span className="market-status">{status}</span>}
                  </div>
                  <div className="det">
                    {t(`mk_${k}_d`)}
                    <span className="coord">{t(`mk_${k}_c`)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Reveal = Reveal;
window.ChapterMark = ChapterMark;
window.Hero = Hero;
window.Thesis = Thesis;
window.Services = Services;
window.Process = Process;
window.Sectors = Sectors;
window.Markets = Markets;

/* ============ NETWORK — global research network ============ */
const NETWORK_GROUPS = [
  {
    code: "DE",
    labelKey: "nw_de_h",
    items: [
      { n: "Fraunhofer IKTS", loc: "Dresden", focus: "Ceramic technologies · thermochemical conversion · high-temp materials" },
      { n: "Fraunhofer UMSICHT", loc: "Oberhausen / Sulzbach-Rosenberg", focus: "Biorefinery · waste-to-value · plastics recycling" },
      { n: "Helmholtz Association", loc: "HZDR Dresden-Rossendorf · HZB Berlin", focus: "Resource technology · catalysis · solar fuels" },
      { n: "TU Dresden", loc: "Dresden — TU9", focus: "Gasification · thermal separation · energy & process engineering" },
      { n: "TU Munich (TUM)", loc: "Munich", focus: "AI/ML for process engineering · catalysis · bioprocess engineering" },
      { n: "RWTH Aachen", loc: "Aachen — AVT", focus: "Process & chemical engineering · fuel science · mechanical engineering" },
      { n: "FAU Erlangen-Nürnberg", loc: "Erlangen", focus: "Energy process engineering · reaction engineering · materials" },
      { n: "KIT Karlsruhe", loc: "Karlsruhe — Exzellenzuniversität", focus: "Energy systems · electrochemical conversion · process intensification" },
      { n: "Hochschule Zittau/Görlitz", loc: "Zittau / Görlitz", focus: "Power plant engineering · bioenergy · Lusatian energy transition" },
      { n: "DBFZ", loc: "Leipzig", focus: "Central biomass research · gasification · biorefinery concepts" },
      { n: "IUTA", loc: "Duisburg", focus: "Aerosol & filtration · gas cleaning for gasification & CCS" },
      { n: "DLR", loc: "Multi-site — Future Fuels", focus: "Thermochemical conversion · solar fuels · energy system modelling" },
      { n: "Robert Boyle Institute (RBI)", loc: "Jena, Thuringia", focus: "Biorefinery · green oil · waste-to-hydrogen · gas purification" },
      { n: "TH Nürnberg", loc: "Nuremberg", focus: "Audio AI · speech processing · embedded machine learning" },
      { n: "Universität Regensburg", loc: "Regensburg", focus: "Computer vision · image analysis · ML for engineering" },
      { n: "BTU Cottbus-Senftenberg", loc: "Cottbus", focus: "Applied mathematics · image processing · numerical methods" },
      { n: "Universität Passau", loc: "Passau", focus: "Visual computing · industrial NDT · X-ray computed tomography" },
    ],
  },
  {
    code: "US",
    labelKey: "nw_us_h",
    items: [
      { n: "Lawrence Berkeley National Lab", loc: "Berkeley, CA — DOE / UC Berkeley", focus: "Advanced energy systems · catalysis · Molecular Foundry" },
      { n: "Rutgers University", loc: "New Brunswick, NJ", focus: "Heterogeneous catalysis · process intensification · energy storage" },
      { n: "Georgia Southern University", loc: "Statesboro, GA", focus: "Biomass conversion · gasification · bioenergy systems" },
      { n: "GTI Energy", loc: "Des Plaines, IL", focus: "Gas technology · hydrogen · low-carbon fuels research" },
    ],
  },
  {
    code: "ES",
    labelKey: "nw_es_h",
    items: [
      { n: "ICB-CSIC", loc: "Zaragoza — Inst. Carboquímica", focus: "Carbon materials · gas processing · catalysis for energy" },
      { n: "Universidad de Zaragoza", loc: "Zaragoza", focus: "Chemical & energy engineering · biomass · process modelling" },
      { n: "INCAR-CSIC", loc: "Oviedo — Inst. Nacional del Carbón", focus: "Coal & carbon chemistry · CO₂ capture · clean fuels" },
    ],
  },
  {
    code: "GB",
    labelKey: "nw_gb_h",
    items: [
      { n: "University of York", loc: "York — GCCE", focus: "Green chemistry · biorenewables · heterogeneous catalysis · clean synthesis" },
      { n: "University of Glasgow", loc: "Glasgow", focus: "Chemical engineering · catalysis · sustainable process design" },
    ],
  },
  {
    code: "MY",
    labelKey: "nw_my_h",
    items: [
      { n: "Universiti Teknologi PETRONAS", loc: "Seri Iskandar, Perak", focus: "Gasification · CO₂ utilisation · oil-and-gas transition" },
      { n: "Universiti Teknologi Malaysia", loc: "Johor Bahru", focus: "Biomass conversion · chemical & energy engineering · environmental tech" },
    ],
  },
  {
    code: "SG",
    labelKey: "nw_sg_h",
    items: [
      { n: "NTU Singapore", loc: "Singapore — NEWRI", focus: "Carbon capture & utilisation · catalysis · process systems engineering" },
    ],
  },
  {
    code: "AU",
    labelKey: "nw_au_h",
    items: [
      { n: "Monash University", loc: "Melbourne — Energy Institute", focus: "Carbon capture · energy materials · green chemistry · membrane tech" },
    ],
  },
  {
    code: "TW",
    labelKey: "nw_tw_h",
    items: [
      { n: "National Cheng Kung University", loc: "Tainan", focus: "Energy & environmental engineering · biomass conversion · CO₂ utilisation" },
    ],
  },
  {
    code: "BE",
    labelKey: "nw_be_h",
    items: [
      { n: "Universiteit Antwerpen", loc: "Antwerp", focus: "Plasma chemistry · CO₂ conversion · catalytic process chemistry" },
    ],
  },
  {
    code: "PT",
    labelKey: "nw_pt_h",
    items: [
      { n: "Instituto Politécnico de Portalegre", loc: "Portalegre", focus: "Biomass · gasification · renewable energy systems" },
    ],
  },
  {
    code: "CA",
    labelKey: "nw_ca_h",
    items: [
      { n: "Ontario Tech University", loc: "Oshawa, ON", focus: "Energy systems · hydrogen safety · nuclear & clean energy" },
    ],
  },
  {
    code: "NO",
    labelKey: "nw_no_h",
    items: [
      { n: "Vow ASA / ETIA", loc: "Oslo / Compiègne", focus: "Pyrolysis · waste-to-value · carbon recovery technology" },
    ],
  },
  {
    code: "ID",
    labelKey: "nw_id_h",
    items: [
      { n: "Udayana University", loc: "Denpasar, Bali", focus: "Renewable energy · environmental engineering · sustainability research" },
    ],
  },
  {
    code: "ET",
    labelKey: "nw_et_h",
    items: [
      { n: "Addis Ababa University", loc: "Addis Ababa", focus: "Energy & environmental engineering · sustainable development research" },
    ],
  },
  {
    code: "NG",
    labelKey: "nw_ng_h",
    items: [
      { n: "University of Lagos", loc: "Lagos", focus: "Chemical engineering · energy systems · sustainable industrial development" },
    ],
  },
];

function Network({ t }) {
  const [activeGroup, setActiveGroup] = React.useState("DE");
  const lang = document.documentElement.lang || "en";
  const countWord = (n) => n === 1 ? t("nw_count_one") : t("nw_count_many");

  return (
    <section className="network section-pad" id="network">
      <div className="container">
        <Reveal><ChapterMark num="09" label={t("nw_chapter")} /></Reveal>

        <div className="section-head">
          <Reveal>
            <div>
              <div className="nw-eyebrow">{t("nw_eyebrow")}</div>
              <h2>{t("nw_title_a")} <em className="yk">{t("nw_title_b")}</em></h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="desc">{t("nw_lede")}</p>
              <p className="desc" style={{ marginTop: 16, opacity: 0.78 }}>{t("nw_lede_2")}</p>
            </div>
          </Reveal>
        </div>

        <div className="nw-featured">
          <Reveal delay={140}>
            <div className="nw-rudolph">
              <div className="nw-rudolph-head">
                <div className="nw-rudolph-eyebrow">{t("nw_rudolph_tag")}</div>
                <div className="nw-rudolph-status" aria-live="polite">
                  <span className="dot" />
                  <span>{t("nw_rudolph_status")}</span>
                </div>
              </div>
              <div className="nw-rudolph-name">
                <h3>{t("nw_rudolph_h")}</h3>
                <div className="nw-rudolph-glyph" aria-hidden="true">
                  <svg viewBox="0 0 64 64" width="64" height="64">
                    <defs>
                      <radialGradient id="rud-pulse" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#F8B729" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#F8B729" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="32" cy="32" r="28" fill="url(#rud-pulse)" />
                    <circle cx="32" cy="32" r="16" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                    <circle cx="32" cy="32" r="10" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                    <circle cx="32" cy="32" r="4" fill="#F8B729" />
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                      const rad = (deg * Math.PI) / 180;
                      const x = 32 + Math.cos(rad) * 22;
                      const y = 32 + Math.sin(rad) * 22;
                      return <circle key={i} cx={x} cy={y} r="1.6" fill="rgba(255,255,255,0.55)" />;
                    })}
                  </svg>
                </div>
              </div>
              <p className="nw-rudolph-p">{t("nw_rudolph_p")}</p>
              <ol className="nw-rudolph-flow">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <span className="ix">0{i}</span>
                    <div>
                      <div className="h">{t(`nw_rudolph_${i}_h`)}</div>
                      <div className="p">{t(`nw_rudolph_${i}_p`)}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="nw-stats">
              {[
                ["inst", "nw_stat_inst_v", "nw_stat_inst_l"],
                ["country", "nw_stat_country_v", "nw_stat_country_l"],
                ["continent", "nw_stat_continent_v", "nw_stat_continent_l"],
                ["agent", "nw_stat_agent_v", "nw_stat_agent_l"],
              ].map(([k, vk, lk]) => (
                <div className="nw-stat" key={k}>
                  <div className="nw-stat-v">{t(vk)}</div>
                  <div className="nw-stat-l">{t(lk)}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="nw-roster">
            <div className="nw-roster-rail" role="tablist" aria-label="Country filter">
              {NETWORK_GROUPS.map((g) => (
                <button
                  key={g.code}
                  role="tab"
                  aria-selected={activeGroup === g.code}
                  className={`nw-tab ${activeGroup === g.code ? "active" : ""}`}
                  onClick={() => setActiveGroup(g.code)}
                >
                  <span className="cc">{g.code}</span>
                  <span className="lbl">{t(g.labelKey)}</span>
                  <span className="ct">{g.items.length}</span>
                </button>
              ))}
            </div>

            {NETWORK_GROUPS.filter(g => g.code === activeGroup).map((g) => (
              <div className="nw-group" key={g.code}>
                <div className="nw-group-head">
                  <div className="nw-group-meta">
                    <span className="cc">/ {g.code}</span>
                    <h4>{t(g.labelKey)}</h4>
                  </div>
                  <div className="nw-group-count">
                    <span className="num">{g.items.length}</span>
                    <span className="lbl">{countWord(g.items.length)}</span>
                  </div>
                </div>
                <div className="nw-items">
                  {g.items.map((it, i) => (
                    <article className="nw-item" key={i}>
                      <div className="nw-item-ix">{String(i + 1).padStart(2, "0")}</div>
                      <div className="nw-item-body">
                        <div className="nw-item-name">{it.n}</div>
                        <div className="nw-item-loc">{it.loc}</div>
                        <div className="nw-item-focus">{it.focus}</div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Network = Network;

/* ============ BLOG — field notes ============ */
function BlogArt({ variant }) {
  if (variant === "rw") {
    // Distributed power nodes over topographic contours
    const nodes = [
      [80, 80], [160, 60], [240, 100], [320, 70], [400, 110],
      [120, 150], [220, 170], [300, 160], [380, 180],
      [180, 220], [280, 230], [360, 240],
    ];
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" className="blog-art-svg">
        <rect width="480" height="280" fill="#1F2428" />
        {/* topographic arcs */}
        <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <path key={i} d={`M -20 ${30 + i * 32} Q 240 ${10 + i * 30} 500 ${50 + i * 34}`} />
          ))}
        </g>
        {/* node connections */}
        <g stroke="rgba(248,183,41,0.32)" strokeWidth="0.8" strokeDasharray="2 3" fill="none">
          <path d="M80 80 L160 60 L240 100 L320 70 L400 110" />
          <path d="M160 60 L220 170 L280 230" />
          <path d="M240 100 L300 160 L360 240" />
          <path d="M120 150 L180 220" />
          <path d="M320 70 L380 180" />
        </g>
        {/* nodes */}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.5" fill="#F8B729" />
            <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(248,183,41,0.25)" strokeWidth="1" />
          </g>
        ))}
        {/* coordinate label */}
        <g fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.5)" fontSize="9" letterSpacing="0.16em">
          <text x="22" y="34">/ RW</text>
          <text x="22" y="258">01°56′ S · 30°03′ E</text>
        </g>
        <line x1="22" y1="40" x2="60" y2="40" stroke="#F8B729" strokeWidth="1" />
      </svg>
    );
  }
  if (variant === "sl") {
    // Vision target / pixel grid / focus
    return (
      <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" className="blog-art-svg">
        <rect width="480" height="280" fill="#1F2428" />
        {/* pixel grid */}
        <g fill="rgba(255,255,255,0.12)">
          {Array.from({ length: 20 }).map((_, c) =>
            Array.from({ length: 12 }).map((_, r) => {
              const x = 20 + c * 22;
              const y = 16 + r * 22;
              const dx = x - 240, dy = y - 140;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const opacity = Math.max(0, 1 - dist / 220);
              return <rect key={`${c}-${r}`} x={x} y={y} width="2" height="2" fillOpacity={0.4 * opacity + 0.06} />;
            })
          )}
        </g>
        {/* concentric rings */}
        <g fill="none" stroke="rgba(248,183,41,0.55)" strokeWidth="1">
          <circle cx="240" cy="140" r="20" />
          <circle cx="240" cy="140" r="44" strokeOpacity="0.35" />
          <circle cx="240" cy="140" r="72" strokeOpacity="0.22" />
          <circle cx="240" cy="140" r="104" strokeOpacity="0.12" />
        </g>
        {/* center dot */}
        <circle cx="240" cy="140" r="5" fill="#F8B729" />
        {/* crosshair */}
        <g stroke="rgba(248,183,41,0.45)" strokeWidth="1">
          <line x1="240" y1="100" x2="240" y2="120" />
          <line x1="240" y1="160" x2="240" y2="180" />
          <line x1="200" y1="140" x2="220" y2="140" />
          <line x1="260" y1="140" x2="280" y2="140" />
        </g>
        {/* data stream */}
        <g fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.35)" fontSize="9" letterSpacing="0.12em">
          <text x="22" y="34">/ AI · VISION</text>
          <text x="22" y="258">0101 1100 0111 0010 0001</text>
        </g>
        <line x1="22" y1="40" x2="80" y2="40" stroke="#F8B729" strokeWidth="1" />
      </svg>
    );
  }
  // au — process flow / biochar
  return (
    <svg viewBox="0 0 480 280" preserveAspectRatio="xMidYMid slice" className="blog-art-svg">
      <rect width="480" height="280" fill="#1F2428" />
      {/* hex molecular pattern */}
      <defs>
        <pattern id="bl-hex" width="28" height="32" patternUnits="userSpaceOnUse">
          <path d="M14 4 L24 10 L24 22 L14 28 L4 22 L4 10 Z" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="480" height="280" fill="url(#bl-hex)" />
      {/* process flow */}
      <g>
        {[
          { x: 40, label: "BIOMASS" },
          { x: 150, label: "GASIFIER" },
          { x: 260, label: "REFORMER" },
          { x: 370, label: "BIOCHAR" },
        ].map((s, i) => (
          <g key={i}>
            <rect
              x={s.x}
              y={120}
              width="80"
              height="40"
              fill={i === 2 ? "rgba(248,183,41,0.16)" : "rgba(255,255,255,0.04)"}
              stroke={i === 2 ? "rgba(248,183,41,0.55)" : "rgba(255,255,255,0.18)"}
              strokeWidth="1"
            />
            <text
              x={s.x + 40}
              y={144}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              letterSpacing="0.12em"
              fill={i === 2 ? "#F8B729" : "rgba(255,255,255,0.6)"}
            >
              {s.label}
            </text>
            {i < 3 && (
              <g stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none">
                <line x1={s.x + 80} y1="140" x2={s.x + 110} y2="140" />
                <path d={`M ${s.x + 106} 136 L ${s.x + 110} 140 L ${s.x + 106} 144`} />
              </g>
            )}
          </g>
        ))}
      </g>
      {/* output spread */}
      <g stroke="rgba(248,183,41,0.45)" strokeWidth="1" fill="none">
        <path d="M 415 160 L 430 200" />
        <path d="M 425 160 L 450 220" />
        <path d="M 435 160 L 410 230" />
      </g>
      {/* labels */}
      <g fontFamily="var(--font-mono)" fill="rgba(255,255,255,0.5)" fontSize="9" letterSpacing="0.16em">
        <text x="22" y="34">/ AU · MELBOURNE</text>
        <text x="22" y="258">CATALYTIC TAR REFORMING</text>
      </g>
      <line x1="22" y1="40" x2="100" y2="40" stroke="#F8B729" strokeWidth="1" />
    </svg>
  );
}

function Blog({ t, onCta }) {
  const posts = ["1", "2", "3"].map(n => ({
    id: n,
    art: n === "1" ? "rw" : n === "2" ? "sl" : "au",
  }));
  return (
    <section className="blog section-pad" id="insights">
      <div className="container">
        <Reveal><ChapterMark num="11" label={t("bl_chapter")} /></Reveal>
        <div className="blog-head">
          <Reveal>
            <div>
              <div className="bl-eyebrow">{t("bl_eyebrow")}</div>
              <h2>{t("bl_title_a")} <em className="yk">{t("bl_title_b")}</em></h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="blog-head-right">
              <p className="desc">{t("bl_desc")}</p>
              <button className="bl-cta" onClick={onCta}>
                {t("bl_cta")} <Icon name="arrowRight" size={14} />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="blog-grid">
          {posts.map((p, i) => (
            <Reveal delay={140 + i * 80} key={p.id}>
              <article className="bl-card">
                <div className="bl-art">
                  <BlogArt variant={p.art} />
                </div>
                <div className="bl-body">
                  <div className="bl-meta">
                    <span className="bl-tag">{t(`bl_${p.id}_tag`)}</span>
                    <span className="bl-dot">·</span>
                    <span className="bl-loc">{t(`bl_${p.id}_loc`)}</span>
                    <span className="bl-dot">·</span>
                    <span className="bl-date">{t(`bl_${p.id}_date`)}</span>
                  </div>
                  <h3>{t(`bl_${p.id}_h`)}</h3>
                  <p>{t(`bl_${p.id}_p`)}</p>
                  <div className="bl-read">
                    {t("bl_read")} <Icon name="arrowRight" size={12} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Blog = Blog;

/* ============ SYNKERO.DT — R&D FOCUS ============ */
function SynKero({ t }) {
  return (
    <section className="synkero section-pad" id="focus">
      <div className="container">
        <Reveal><ChapterMark num="04" label={t("sk_chapter")} /></Reveal>

        <div className="sk-head">
          <Reveal>
            <div className="sk-tag">{t("sk_eyebrow")}</div>
            <h2>
              {t("sk_title_a")}{" "}
              <em className="yk">{t("sk_title_b")}</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="sk-lede">{t("sk_lede")}</p>
          </Reveal>
          <Reveal delay={180}>
            <p className="sk-note" role="note">
              <span className="sk-note-tag">/ Note</span>
              <span className="sk-note-body">{t("sk_note")}</span>
            </p>
          </Reveal>
        </div>

        <div className="sk-grid">
          <Reveal delay={140}>
            <div className="sk-body">
              <h4>{t("sk_scope_h")}</h4>
              <ol className="sk-scope">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <span className="ix">0{i}</span>
                    <span>{t(`sk_scope_${i}`)}</span>
                  </li>
                ))}
              </ol>

            </div>
          </Reveal>

          <Reveal delay={220}>
            <aside className="sk-facts">
              <h4>{t("sk_facts_h")}</h4>
              <dl>
                {["eng", "modelling", "econ", "sustain", "partners", "governance"].map((k) => (
                  <div className="sk-fact" key={k}>
                    <dt>{t(`sk_fact_${k}_k`)}</dt>
                    <dd>{t(`sk_fact_${k}_v`)}</dd>
                  </div>
                ))}
              </dl>

              <div className="sk-diagram" aria-hidden="true">
                <svg viewBox="0 0 320 180" width="100%" height="auto">
                  <defs>
                    <pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.12)" />
                    </pattern>
                  </defs>
                  <rect width="320" height="180" fill="url(#dots)" />

                  {/* WASTE → SYNGAS → FT → SAF nodes */}
                  <g fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.16em" fill="rgba(255,255,255,0.7)">
                    <text x="14" y="22">WASTE FEEDSTOCK</text>
                    <text x="14" y="62">SYNGAS</text>
                    <text x="14" y="102">FISCHER-TROPSCH</text>
                    <text x="14" y="142">SAF-LIKE OUTPUT</text>
                  </g>

                  {/* dotted flow lines */}
                  <g stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="2 4" fill="none">
                    <path d="M14 30 L260 30 L260 50 L14 50" />
                    <path d="M14 70 L260 70 L260 90 L14 90" />
                    <path d="M14 110 L260 110 L260 130 L14 130" />
                  </g>

                  {/* digital-twin annotation right */}
                  <g>
                    <line x1="270" y1="14" x2="270" y2="166" stroke="#F8B729" strokeWidth="1.2" />
                    <text x="278" y="22" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.16em" fill="#F8B729">DT</text>
                    <text x="278" y="36" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">PROCESS</text>
                    <text x="278" y="48" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">MODEL</text>

                    <text x="278" y="80" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">TECHNO-</text>
                    <text x="278" y="92" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">ECON.</text>

                    <text x="278" y="124" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">LCA</text>
                    <text x="278" y="136" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.08em" fill="rgba(255,255,255,0.6)">RISK</text>
                  </g>

                  {/* nodes */}
                  <g>
                    {[30, 70, 110, 150].map((y, i) => (
                      <g key={i}>
                        <rect x="10" y={y - 8} width="240" height="16" fill="rgba(248,183,41,0.06)" stroke="rgba(248,183,41,0.35)" />
                      </g>
                    ))}
                  </g>
                </svg>
                <div className="sk-diagram-cap">
                  Feasibility view — feedstock to SAF-relevant intermediates, modelled before commitment.
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.SynKero = SynKero;

/* ============ RESEARCH CLUSTERS ============ */
function Clusters({ t }) {
  const ids = ["mfuel", "cluster-2", "cluster-3", "cluster-4", "cluster-5"];
  const clusters = [1, 2, 3, 4, 5].map((n, i) => {
    const partnersKey = `cl_${n}_partners`;
    const partnersVal = t(partnersKey);
    const industryKey = `cl_${n}_industry`;
    const industryVal = t(industryKey);
    const leadKey = `cl_${n}_lead_note`;
    const leadVal = t(leadKey);
    return {
      n,
      anchor: ids[i],
      code: t(`cl_${n}_code`),
      name: t(`cl_${n}_name`),
      tag: t(`cl_${n}_tag`),
      desc: t(`cl_${n}_desc`),
      focus: t(`cl_${n}_focus`),
      manager: t(`cl_${n}_manager`),
      partners: Array.isArray(partnersVal) ? partnersVal : null,
      industry: Array.isArray(industryVal) ? industryVal : null,
      leadNote: typeof leadVal === "string" && leadVal !== leadKey ? leadVal : null,
    };
  });
  return (
    <section className="clusters section-pad" id="clusters">
      <div className="container">
        <Reveal><ChapterMark num="05" label={t("cl_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("cl_title_a")} <em className="yk">{t("cl_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("cl_desc")}</p>
          </Reveal>
        </div>

        <div className="clusters-grid">
          {clusters.map((c, i) => {
            const isPending = c.manager === "—";
            return (
              <Reveal delay={140 + i * 80} key={c.anchor}>
                <article
                  className={`cluster-card ${isPending ? "pending" : ""}`}
                  id={`cluster-${c.anchor}`}
                >
                  <header className="cluster-head">
                    <div className="cluster-code">— {c.code} —</div>
                    <div className="cluster-tag">{c.tag}</div>
                  </header>
                  <h3 className="cluster-name">{c.name}</h3>
                  <p className="cluster-desc">{c.desc}</p>

                  <div className="cluster-meta">
                    <div className="cluster-focus">
                      <div className="cluster-label">{t("cl_focus_label")}</div>
                      <ul>
                        {(Array.isArray(c.focus) ? c.focus : [c.focus]).map((f, j) => (
                          <li key={j}><span className="ix">{String(j + 1).padStart(2, "0")}</span>{f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cluster-mgr">
                      <div className="cluster-label">{t("cl_manager_label")}</div>
                      <div className="cluster-mgr-name">{c.manager}</div>
                    </div>
                    {c.partners && (
                      <div className="cluster-partners">
                        <div className="cluster-label">{t("cl_partners_label")}</div>
                        <ul>
                          {c.partners.map(([name, affil], j) => (
                            <li key={j}>
                              <div className="cp-name">{name}</div>
                              <div className="cp-affil">{affil}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.industry && (
                      <div className="cluster-partners cluster-industry">
                        <div className="cluster-label">{t("cl_industry_label")}</div>
                        <ul>
                          {c.industry.map((name, j) => (
                            <li key={j}>
                              <div className="cp-name">{name}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {c.leadNote && (
                      <div className="cluster-lead-note">
                        <div className="cluster-label">{t("cl_lead_note_label")}</div>
                        <blockquote>
                          <p>{c.leadNote}</p>
                          <footer>— {c.manager}</footer>
                        </blockquote>
                      </div>
                    )}
                  </div>
                  <div className="underline-rule" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.Clusters = Clusters;

/* ============ TEAM ============ */
function Team({ t }) {
  const people = Array.from({ length: 11 }, (_, i) => {
    const n = i + 1;
    const name = t(`tm_${n}_n`);
    const initials = name
      .split(/[\s\.]+/)
      .filter(Boolean)
      .map((w) => w[0])
      .filter((c) => /[A-ZÄÖÜ]/i.test(c))
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return {
      n,
      code: String(n).padStart(2, "0"),
      name,
      role: t(`tm_${n}_r`),
      affil: t(`tm_${n}_a`),
      initials,
    };
  });

  return (
    <section className="team section-pad" id="team">
      <div className="container">
        <Reveal><ChapterMark num="10" label={t("tm_chapter")} /></Reveal>
        <div className="section-head">
          <Reveal>
            <h2>{t("tm_title_a")} <em className="yk">{t("tm_title_b")}</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="desc">{t("tm_desc")}</p>
          </Reveal>
        </div>

        <div className="team-grid">
          {people.map((p, i) => (
            <Reveal delay={120 + i * 50} key={p.n}>
              <article className="team-card">
                <div className="team-code">{p.code}</div>
                <div className="team-avatar" aria-hidden="true">{p.initials}</div>
                <h3 className="team-name">{p.name}</h3>
                <div className="team-role">{p.role}</div>
                {p.affil && <div className="team-affil">{p.affil}</div>}
                <div className="underline-rule" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Team = Team;
