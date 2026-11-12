// Interface text for the current page's site and language, available to page content
// and templates alike: {{ t.cta }} (site-specific) and {{ ts.nav.index }} (shared).
// Pages in a site folder get i18nKey from their directory data; lang defaults to English.
module.exports = {
    t: (data) => (data.i18nKey ? data.i18n[data.i18nKey][data.lang || "en"] : undefined),
    ts: (data) => data.i18n.shared[data.lang || "en"],
};
