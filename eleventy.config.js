// Eleventy build for both Aipan art sites.
// Pages live in each site folder; shared markup is in _includes/, product data in _data/.
// Output goes to _site/<site-folder>/, which is the folder to deploy.

const { icon } = require("./lib/icons.js");

const SITES = ["devbhoomi-aipan-art", "kumaon-aipan-art"];

module.exports = function (eleventyConfig) {
    // {% icon "phone" %} -> inline SVG line icon
    eleventyConfig.addShortcode("icon", icon);

    // {{ products | localize(lang) }}: an object's "hi" fields replace its English ones on Hindi
    // pages; the language sub-objects are dropped either way. Works on objects and arrays.
    const LANGS = ["hi"];
    const localizeOne = (value, lang) => {
        if (!value || typeof value !== "object" || Array.isArray(value)) return value;
        const base = { ...value };
        for (const l of LANGS) delete base[l];
        return LANGS.includes(lang) && value[lang] ? { ...base, ...value[lang] } : base;
    };
    eleventyConfig.addFilter("localize", (value, lang) =>
        Array.isArray(value) ? value.map((v) => localizeOne(v, lang)) : localizeOne(value, lang)
    );

    // Static files are copied as-is
    for (const site of SITES) {
        for (const dir of ["css", "js", "assets"]) {
            eleventyConfig.addPassthroughCopy(`${site}/${dir}`);
        }
    }

    return {
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
        // Pages stay as .html files but can use Nunjucks tags ({% include %}, {% for %})
        templateFormats: ["html", "njk"],
        htmlTemplateEngine: "njk",
    };
};
