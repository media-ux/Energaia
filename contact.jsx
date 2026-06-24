/* global React, Icon, Reveal, ChapterMark */
// contact.jsx — Contact section with working validated form + Footer.

function Contact({ t }) {
  const [vals, setVals] = React.useState({ name: "", company: "", email: "", message: "", topic: 0 });
  const [errors, setErrors] = React.useState({});
  const [state, setState] = React.useState("idle"); // idle | sending | ok
  const topics = t("fm_topic_opts");

  const setV = (k, v) => setVals(s => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!vals.name.trim()) e.name = t("fm_err_required");
    if (!vals.email.trim()) e.email = t("fm_err_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = t("fm_err_email");
    if (!vals.message.trim()) e.message = t("fm_err_required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("sending");
    setTimeout(() => setState("ok"), 1100);
  };

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <Reveal><ChapterMark num="08" label={t("ct_chapter")} /></Reveal>
        <div className="contact-layout">
          <div>
            <Reveal>
              <h2>{t("ct_title_a")} <em className="yk">{t("ct_title_b")}</em></h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{t("ct_lede")}</p>
            </Reveal>
            <Reveal delay={180}>
              <dl className="channels">
                <div className="channel">
                  <dt>/ {t("ct_email")}</dt>
                  <dd><a href="mailto:info@energaia-institut.com">info@energaia-institut.com</a></dd>
                  <span className="out"><Icon name="arrowUpRight" size={14} /></span>
                </div>
                <div className="channel">
                  <dt>/ {t("ct_phone")}</dt>
                  <dd><a href="tel:+49341928813040">+49 341 92881304</a></dd>
                  <span className="out"><Icon name="arrowUpRight" size={14} /></span>
                </div>
                <div className="channel">
                  <dt>/ {t("ct_linkedin")}</dt>
                  <dd><a href="https://www.linkedin.com/company/energaia-institute" target="_blank" rel="noopener">energaia-institute</a></dd>
                  <span className="out"><Icon name="arrowUpRight" size={14} /></span>
                </div>
                <div className="channel">
                  <dt>/ {t("ct_meet")}</dt>
                  <dd>{t("ct_meet_v")}</dd>
                  <span className="out"><Icon name="pin" size={14} /></span>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <form className="contact-form" onSubmit={submit} noValidate>
              <h3>{t("fm_h")}</h3>
              <div className="sub">{t("fm_sub")}</div>

              {state === "ok" && (
                <div className="form-success">
                  <Icon name="check" size={18} />
                  <div>
                    <b style={{ display: "block", marginBottom: 4 }}>{t("fm_ok_h")}</b>
                    {t("fm_ok_p")}
                  </div>
                </div>
              )}

              {state !== "ok" && (
                <>
                  <div className="field-row">
                    <div className="field">
                      <label>{t("fm_name")}</label>
                      <input
                        className={errors.name ? "err" : ""}
                        type="text"
                        value={vals.name}
                        onChange={e => setV("name", e.target.value)}
                      />
                      {errors.name && <div className="err-msg">{errors.name}</div>}
                    </div>
                    <div className="field">
                      <label>{t("fm_company")}</label>
                      <input
                        type="text"
                        value={vals.company}
                        onChange={e => setV("company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>{t("fm_email")}</label>
                    <input
                      className={errors.email ? "err" : ""}
                      type="email"
                      value={vals.email}
                      onChange={e => setV("email", e.target.value)}
                    />
                    {errors.email && <div className="err-msg">{errors.email}</div>}
                  </div>

                  <div className="field">
                    <label>{t("fm_topic")}</label>
                    <div className="chip-group">
                      {topics.map((opt, i) => (
                        <button
                          type="button"
                          key={opt}
                          className={`chip ${vals.topic === i ? "active" : ""}`}
                          onClick={() => setV("topic", i)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <label>{t("fm_msg")}</label>
                    <textarea
                      className={errors.message ? "err" : ""}
                      placeholder={t("fm_msg_ph")}
                      value={vals.message}
                      onChange={e => setV("message", e.target.value)}
                    />
                    {errors.message && <div className="err-msg">{errors.message}</div>}
                  </div>

                  <div className="form-submit">
                    <div className="note">{t("fm_note")}</div>
                    <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
                      {state === "sending" ? t("fm_sending") : t("fm_submit")}
                      <Icon name="arrowRight" size={16} />
                    </button>
                  </div>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ t, lang }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="top">
          <div className="brand-block">
            <img src={window.__ENERGAIA_LOGO__} alt="Energaia Institut" />
            <p>{t("fo_about")}</p>
          </div>

          <div>
            <h5>/ {t("fo_svc")}</h5>
            <ul>
              <li><a href="#services">{t("sv_1_h")}</a></li>
              <li><a href="#services">{t("sv_2_h")}</a></li>
              <li><a href="#services">{t("sv_3_h")}</a></li>
              <li><a href="#services">{t("sv_4_h")}</a></li>
              <li><a href="#services">{t("sv_5_h")}</a></li>
              <li><a href="#services">{t("sv_6_h")}</a></li>
            </ul>
          </div>

          <div>
            <h5>/ {t("fo_co")}</h5>
            <ul>
              <li><a href="#approach">{t("nav_approach")}</a></li>
              <li><a href="#sectors">{t("nav_sectors")}</a></li>
              <li><a href="#markets">{t("mk_chapter")}</a></li>
              <li><a href="#process">{t("pr_chapter")}</a></li>
            </ul>
          </div>

          <div>
            <h5>/ {t("fo_contact")}</h5>
            <ul>
              <li><a href="mailto:info@energaia-institut.com">{t("ct_email")}</a></li>
              <li><a href="tel:+49341928813040">{t("ct_phone")}</a></li>
              <li><a href="https://www.linkedin.com/company/energaia-institute" target="_blank" rel="noopener">{t("ct_linkedin")}</a></li>
              <li><a href="#contact">{lang === "de" ? "Anfrage" : "Briefing"}</a></li>
            </ul>
          </div>
        </div>

        <div className="bottom">
          <span><b>Energaia Labs GmbH</b> · {lang === "de" ? "Energaia Institut" : "trading as Energaia Institut"} · Blütenstraße 15 · 80799 München</span>
          <span>HRB 309678 · © 2026</span>
        </div>
      </div>
    </footer>
  );
}

window.Contact = Contact;
window.Footer = Footer;
