// Builds the site into dist/ (Netlify runs this on every deploy):
//  - copies the static site
//  - turns content/posts/*.md (written at /admin) into blog/<slug>.html pages
//  - generates posts-data.js, the blog cards on blog.html + index.html, sitemap.xml and robots.txt
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT = __dirname;
const OUT = path.join(ROOT, "dist");
const POSTS_DIR = path.join(ROOT, "content", "posts");
const SITE_URL = (process.env.URL || "").replace(/\/$/, ""); // set automatically by Netlify
const SKIP = new Set(["dist", "node_modules", "content", "build.js", "package.json", "package-lock.json", "netlify.toml", "README.txt", "BLOG-GUIDE.txt"]);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const toDate = v => { const d = v instanceof Date ? v : new Date(String(v || "")); return isNaN(d) ? new Date() : d; };
const fmtDate = d => `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
const isoDate = d => d.toISOString().slice(0, 10);
const relPath = p => (p ? String(p).replace(/^\/+/, "") : "");
const absUrl = p => (SITE_URL ? `${SITE_URL}/${relPath(p)}` : "");
const jsonLd = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const read = f => fs.readFileSync(f, "utf8");
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };

// 1. Fresh copy of the static site
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT);
for (const name of fs.readdirSync(ROOT)) {
  if (SKIP.has(name) || name.startsWith(".")) continue;
  fs.cpSync(path.join(ROOT, name), path.join(OUT, name), { recursive: true });
}

// 2. Read published posts, newest first
const posts = (fs.existsSync(POSTS_DIR) ? fs.readdirSync(POSTS_DIR) : [])
  .filter(f => f.endsWith(".md"))
  .map(f => {
    const { data, content } = matter(read(path.join(POSTS_DIR, f)));
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      slug: f.replace(/\.md$/, ""),
      title: data.title || "Untitled",
      description: data.description || "",
      cat: data.category || "Blog",
      keyword: data.keyword || "",
      date: toDate(data.date),
      image: relPath(data.image),
      imageAlt: data.image_alt || data.title || "",
      published: data.published !== false,
      time: `${Math.max(1, Math.ceil(words / 200))} min read`,
      // The page already has an <h1> (the title), so demote any h1 written in the article
      html: marked.parse(content).replace(/<(\/?)h1([ >])/g, "<$1h2$2"),
    };
  })
  .filter(p => p.published)
  .sort((a, b) => b.date - a.date);

// Must match postCard() in script.js
const card = p => `<a class="card blog-card" href="blog/${p.slug}.html"><div class="cover${p.image ? " has-img" : ""}">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy">` : esc(p.cat)}</div>${p.image ? `<span class="pill">${esc(p.cat)}</span>` : ""}<h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><small>${fmtDate(p.date)} · ${p.time}</small></a>`;

// 3. One page per post, using blog.html as the layout (header, footer, theme)
const layout = read(path.join(ROOT, "blog.html"));
for (const p of posts) {
  const url = SITE_URL ? `${SITE_URL}/blog/${p.slug}.html` : "";
  const related = posts.filter(o => o !== p).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 3);
  const head = [
    url && `<link rel="canonical" href="${url}">`,
    p.keyword && `<meta name="keywords" content="${esc(p.keyword)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="Aveeke Purkait">`,
    `<meta property="og:title" content="${esc(p.title)}">`,
    `<meta property="og:description" content="${esc(p.description)}">`,
    url && `<meta property="og:url" content="${url}">`,
    p.image && SITE_URL && `<meta property="og:image" content="${absUrl(p.image)}">`,
    `<meta property="article:published_time" content="${isoDate(p.date)}">`,
    `<meta name="twitter:card" content="${p.image ? "summary_large_image" : "summary"}">`,
    jsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: isoDate(p.date),
      dateModified: isoDate(p.date),
      author: { "@type": "Person", name: "Aveeke Purkait", url: SITE_URL ? `${SITE_URL}/about.html` : undefined },
      image: p.image && SITE_URL ? absUrl(p.image) : undefined,
      mainEntityOfPage: url || undefined,
      keywords: p.keyword || undefined,
      articleSection: p.cat,
    }),
  ].filter(Boolean).join("\n");

  const main = `<article class="section page-section post"><div class="container post-wrap">
  <p class="crumbs"><a href="index.html">Home</a> / <a href="blog.html">Blog</a> / ${esc(p.title)}</p>
  <header class="post-head"><p class="eyebrow">${esc(p.cat.toUpperCase())}</p><h1>${esc(p.title)}</h1>
  <p class="post-meta">By <a href="about.html">Aveeke Purkait</a> · <time datetime="${isoDate(p.date)}">${fmtDate(p.date)}</time> · ${p.time}</p></header>
  ${p.image ? `<img class="post-cover" src="${esc(p.image)}" alt="${esc(p.imageAlt)}">` : ""}
  <div class="post-body">
${p.html}
  </div>
</div></article>
${related.length ? `<section class="section prose-section alt-section"><div class="container"><div class="sub-head"><p class="eyebrow">KEEP READING</p><h2>More articles.</h2></div><div class="blog-grid">${related.map(card).join("")}</div></div></section>` : ""}
<section class="container cta-band post-cta reveal">
  <div><p class="eyebrow">NEED HELP WITH ${esc(p.cat.toUpperCase())}?</p><h2>Let's grow your business together.</h2></div>
  <div class="cta-actions"><a class="btn primary" href="contact.html">Let's Talk →</a><a class="btn ghost" href="blog.html">All Articles</a></div>
</section>`;

  // Function replacements so "$" characters in posts are never treated as regex patterns
  const html = layout
    .replace('<meta charset="utf-8">', () => '<meta charset="utf-8">\n<base href="../">')
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(p.title)} | Aveeke Purkait</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${esc(p.description)}">`)
    .replace(/<meta (property="og:|name="twitter:)[^>]*>\n?/g, "")
    .replace("</title>", () => `</title>\n${head}`)
    .replace(/<main>[\s\S]*<\/main>/, () => `<main>\n${main}\n</main>`)
    .replace(/<script src="posts-data.js"><\/script>\n?/, "");
  write(path.join(OUT, "blog", `${p.slug}.html`), html);
}

// 4. Data for script.js (search + filters) and static cards for search engines
const data = posts.map(p => ({ slug: p.slug, title: p.title, description: p.description, cat: p.cat, date: fmtDate(p.date), time: p.time, image: p.image, imageAlt: p.imageAlt }));
write(path.join(OUT, "posts-data.js"), `window.BLOG_POSTS=${JSON.stringify(data, null, 1)};\n`);
const injectCards = (file, list) => {
  const f = path.join(OUT, file);
  write(f, read(f).replace(/<!--POSTS-->[\s\S]*?<!--\/POSTS-->/, () => `<!--POSTS-->${list.map(card).join("")}<!--/POSTS-->`));
};
injectCards("blog.html", posts);
injectCards("index.html", posts.slice(0, 3));

// 5. Canonical URLs, absolute share images, sitemap and robots.txt (need the live site URL)
const pages = fs.readdirSync(OUT).filter(f => f.endsWith(".html"));
if (SITE_URL) {
  for (const f of pages) {
    const file = path.join(OUT, f);
    const pageUrl = f === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${f}`;
    write(file, read(file)
      .replace("</title>", () => `</title>\n<link rel="canonical" href="${pageUrl}">\n<meta property="og:url" content="${pageUrl}">`)
      .replace(/<meta property="og:image" content="(?!https?:)([^"]*)">/, (_, img) => `<meta property="og:image" content="${absUrl(img)}">`)
      .replace(/"image":"images\//, () => `"image":"${SITE_URL}/images/`));
  }
  const urls = [
    ...pages.map(f => ({ loc: f === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${f}` })),
    ...posts.map(p => ({ loc: `${SITE_URL}/blog/${p.slug}.html`, lastmod: isoDate(p.date) })),
  ];
  write(path.join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`);
}
write(path.join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /admin/\n${SITE_URL ? `Sitemap: ${SITE_URL}/sitemap.xml\n` : ""}`);

console.log(`Built ${posts.length} blog post(s) into dist/${SITE_URL ? ` for ${SITE_URL}` : ""}`);
