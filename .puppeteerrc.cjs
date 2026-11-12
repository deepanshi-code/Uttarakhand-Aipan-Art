// The accessibility check (pa11y) drives an installed Chrome instead of
// downloading its own copy (saves ~170 MB). See scripts/check-a11y.mjs.
module.exports = {
    skipDownload: true,
};
