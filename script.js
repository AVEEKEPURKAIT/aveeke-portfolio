const skills=[
  ["SEO & Organic Growth","🔍","Technical SEO, On-page SEO, Off-page SEO, Local SEO, keyword research and content strategy","SEO",["Technical SEO","Keyword Research","On-Page","Off-Page"]],
  ["Google Ads","🎯","Search, Display and YouTube advertising with lead generation, conversion tracking and optimization","Paid Ads",["Search","Display","YouTube","Lead Gen"]],
  ["Meta Ads","📣","Facebook and Instagram advertising with audience targeting, remarketing and creative testing","Paid Ads",["Facebook","Instagram","Remarketing","Testing"]],
  ["LinkedIn Ads","in","B2B advertising, professional audience targeting and lead-generation campaigns","Paid Ads",["B2B","Lead Gen","Targeting","Analytics"]],
  ["WhatsApp Ads","◉","Click-to-WhatsApp advertising and campaigns designed to start customer conversations","Paid Ads",["WhatsApp","Lead Gen","Messages","Retargeting"]],
  ["Snapchat Ads","👻","Snapchat advertising for awareness, traffic, engagement and performance campaigns","Paid Ads",["Awareness","Traffic","Creative","Targeting"]],
  ["Quora Ads","Q","Question-based audience targeting, promoted content and lead-generation campaigns","Paid Ads",["Content","B2B","Targeting","Lead Gen"]],
  ["Pinterest Ads","P","Visual discovery advertising, promoted pins and product/content promotion","Paid Ads",["Discovery","Visual","Traffic","Content"]],
  ["TikTok Ads","♪","Short-form video advertising, creative testing and social performance campaigns","Paid Ads",["Video","Creative","Traffic","Testing"]],
  ["Reddit Ads","R","Community-oriented advertising with interest, conversation and audience targeting","Paid Ads",["Community","Interest","Targeting","Testing"]],
  ["Threads Ads","T","Emerging social advertising experiments and audience engagement campaigns","Paid Ads",["Social","Awareness","Testing","Engagement"]],
  ["X / Twitter Ads","X","Paid social campaigns, audience targeting, awareness and traffic optimization","Paid Ads",["Social","Traffic","Targeting","Testing"]],
  ["ChatGPT Ads","AI","AI-platform advertising and emerging paid-media experimentation","Paid Ads",["AI","Awareness","Testing","Performance"]],
  ["Social Media Handling","📱","Content calendars, posting, community management, platform strategy and performance reporting","Social",["Strategy","Content Calendar","Publishing","Analytics"]],
  ["Email Marketing","✉️","Email campaigns, newsletters, lead nurturing, automation and prospect research using Brevo and Apollo.io","Messaging",["Email","Brevo","Apollo.io","Nurturing"]],
  ["WhatsApp Marketing","◉","Broadcasts, follow-up, customer communication and WhatsApp campaign workflows","Messaging",["Broadcast","Follow-up","Automation","CRM"]],
  ["Analytics & Tracking","📊","GA4, Search Console, GTM, Looker Studio, conversion tracking and UTM measurement","Analytics",["GA4","GSC","GTM","Looker Studio"]],
  ["AI Creative Production","✨","AI image generation, AI video generation, storytelling and marketing creative workflows","AI",["AI Images","AI Video","Storytelling","Ads"]],
  ["Video Editing & Content","🎬","Short-form videos, reels, ad videos and promotional content using Canva, Clipchamp and Filmora","Creative",["Canva","Clipchamp","Filmora","Reels"]]
];
const cats=["All","SEO","Paid Ads","Social","Messaging","Analytics","AI","Creative"];
const skillCard=s=>`<article class="card capability-card"><div><div class="cap-top"><div class="cap-icon">${s[1]}</div><h3>${s[0]}</h3></div><p>${s[2]}</p></div><div class="cap-tags">${s[4].map(t=>`<span>${t}</span>`).join("")}</div></article>`;
const sf=document.getElementById("skillFilters"),sg=document.getElementById("skillGrid");
function renderSkills(cat="All"){
  sg.innerHTML=skills.filter(s=>cat==="All"||s[3]===cat).map(skillCard).join("");
}
if(sf&&sg){
  cats.forEach((c,i)=>{let b=document.createElement("button");b.textContent=c;b.className=i===0?"active":"";b.onclick=()=>{document.querySelectorAll("#skillFilters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderSkills(c)};sf.appendChild(b)});
  renderSkills();
}
// Homepage: core skills summary
const homeSkills=document.getElementById("homeSkills");
if(homeSkills){
  const pick=["SEO & Organic Growth","Google Ads","Meta Ads","Social Media Handling","Analytics & Tracking","AI Creative Production"];
  homeSkills.innerHTML=skills.filter(s=>pick.includes(s[0])).map(skillCard).join("");
}

const tools=[
  ["Google Ads","Paid Ads","googleads","GA"],["Meta Ads","Paid Ads","meta","META"],["LinkedIn Ads","Paid Ads","linkedin","in"],["WhatsApp Ads","Paid Ads","whatsapp","WA"],["Snapchat Ads","Paid Ads","snapchat","SC"],["Quora Ads","Paid Ads","quora","Q"],["Pinterest Ads","Paid Ads","pinterest","P"],["TikTok Ads","Paid Ads","tiktok","TT"],["Reddit Ads","Paid Ads","reddit","R"],["X / Twitter Ads","Paid Ads","x","X"],["Threads Ads","Paid Ads","threads","TH"],["ChatGPT Ads","Paid Ads","openai","AI"],
  ["Google Search Console","SEO","googlesearchconsole","GSC"],["Google Analytics","Analytics","googleanalytics","GA4"],["Google Tag Manager","Analytics","googletagmanager","GTM"],["Looker Studio","Analytics","looker","LS"],["Semrush","SEO","semrush","S"],["Ubersuggest","SEO","ubersuggest","U"],["Google Keyword Planner","SEO","googleads","KP"],
  ["Brevo","Messaging","brevo","B"],["Apollo.io","Messaging","apollo","A"],["WhatsApp Marketing","Messaging","whatsapp","WA"],
  ["Google Flow","AI","google","FLOW"],["Google Vids","AI","google","VIDS"],["Grok","AI","x","GROK"],["Kling","AI","klingai","K"],["ChatGPT","AI","openai","AI"],["Gemini","AI","googlegemini","G"],["Google AI Studio","AI","google","AI"],["Claude","AI","claude","C"],
  ["Canva","Creative","canva","C"],["Clipchamp","Creative","microsoft","CLIP"],["Filmora","Creative","wondershare","F"],["Shopify SEO","SEO","shopify","S"]
];
const toolCats=["All","Paid Ads","SEO","Analytics","Messaging","AI","Creative"];
const toolCard=t=>{const icon=`https://cdn.simpleicons.org/${t[2]}`;return `<div class="tool-card"><div class="tool-icon"><img src="${icon}" alt="${t[0]} icon" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="fallback" style="display:none">${t[3]}</span></div><strong>${t[0]}</strong><small>${t[1]}</small></div>`};
const tf=document.getElementById("toolFilters"),tg=document.getElementById("toolGrid");
function renderTools(cat="All"){
 tg.innerHTML=tools.filter(t=>cat==="All"||t[1]===cat).map(toolCard).join("");
}
if(tf&&tg){
  toolCats.forEach((c,i)=>{let b=document.createElement("button");b.textContent=c;b.className=i===0?"active":"";b.onclick=()=>{document.querySelectorAll("#toolFilters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTools(c)};tf.appendChild(b)});
  renderTools();
}
// Homepage: toolkit summary
const homeTools=document.getElementById("homeTools");
if(homeTools){
  const pick=["Google Ads","Meta Ads","LinkedIn Ads","Google Search Console","Google Analytics","Google Tag Manager","Looker Studio","Semrush","Brevo","ChatGPT","Gemini","Canva"];
  homeTools.innerHTML=tools.filter(t=>pick.includes(t[0])).map(toolCard).join("");
}

// Theme toggle
const themeBtn=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("aveeke-theme");
if(savedTheme==="light") document.body.classList.add("light-theme");
function updateThemeButton(){if(themeBtn) themeBtn.textContent=document.body.classList.contains("light-theme")?"☀ Light":"☾ Dark";}
updateThemeButton();
if(themeBtn) themeBtn.onclick=()=>{document.body.classList.toggle("light-theme");localStorage.setItem("aveeke-theme",document.body.classList.contains("light-theme")?"light":"dark");updateThemeButton();};

const projects=[
{tag:"META + GOOGLE ADS",title:"Lead Generation Campaign",body:"A demo structure for documenting audience research, campaign architecture, creative testing, tracking and optimization.",points:["Objective: Generate qualified enquiries","Channels: Google Ads + Meta Ads","Tracking: conversion events + UTM","Add verified results and screenshots here."]},
{tag:"SEO",title:"Organic Growth Campaign",body:"A case-study format for technical audit, keyword mapping, on-page optimization, content and off-page strategy.",points:["Objective: Improve organic visibility","Research: competitor + keyword analysis","Execution: technical + content + links","Add verified ranking/traffic data here."]},
{tag:"AI CREATIVE",title:"AI Content Production",body:"An AI-assisted production workflow for social creatives, advertising concepts, image generation and short-form videos.",points:["Images: ChatGPT, Gemini, AI Studio, Flow","Video: Flow, Vids, Grok, Kling","Editing: Canva, Clipchamp, Filmora","Add real examples to make this a portfolio case study."]}
];
const pg=document.getElementById("projectGrid");
if(pg) pg.innerHTML=projects.map((p,i)=>`<article class="card project"><div><span class="pill">${p.tag}</span><h3>${p.title}</h3><p>${p.body}</p><ul>${p.points.map(x=>`<li>${x}</li>`).join("")}</ul></div><button class="btn ghost case-btn" data-i="${i}">View Case Study →</button></article>`).join("");
// Homepage: compact project cards linking to the projects page
const homeProjects=document.getElementById("homeProjects");
if(homeProjects) homeProjects.innerHTML=projects.map(p=>`<article class="card project project-compact"><div><span class="pill">${p.tag}</span><h3>${p.title}</h3><p>${p.body}</p></div><a class="btn ghost" href="projects.html">Read Case Study →</a></article>`).join("");
const modal=document.getElementById("modal");
if(modal){
  document.addEventListener("click",e=>{let b=e.target.closest(".case-btn");if(!b)return;let p=projects[b.dataset.i];document.getElementById("modalTag").textContent=p.tag;document.getElementById("modalTitle").textContent=p.title;document.getElementById("modalBody").textContent=p.body;document.getElementById("modalPoints").innerHTML=`<ul>${p.points.map(x=>`<li>${x}</li>`).join("")}</ul>`;modal.classList.add("show")});
  document.getElementById("modalClose").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
}

// Blog posts come from posts-data.js, which build.js generates from content/posts/*.md
// (write and publish posts at /admin — see BLOG-GUIDE.txt). Card markup must match card() in build.js.
const posts=window.BLOG_POSTS||[];
const escHtml=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const postCard=p=>`<a class="card blog-card" href="blog/${p.slug}.html"><div class="cover${p.image?" has-img":""}">${p.image?`<img src="${escHtml(p.image)}" alt="${escHtml(p.imageAlt)}" loading="lazy">`:escHtml(p.cat)}</div>${p.image?`<span class="pill">${escHtml(p.cat)}</span>`:""}<h3>${escHtml(p.title)}</h3><p>${escHtml(p.description)}</p><small>${p.date} · ${p.time}</small></a>`;
const bf=document.getElementById("blogFilters"),bg=document.getElementById("blogGrid"),bs=document.getElementById("blogSearch");
function renderPosts(cat="All",q=""){bg.innerHTML=posts.filter(p=>(cat==="All"||p.cat===cat)&&`${p.title} ${p.description}`.toLowerCase().includes(q.toLowerCase())).map(postCard).join("")||`<div class="card">${posts.length?"No posts found.":"New articles are coming soon."}</div>`}
if(bf&&bg&&bs){
  ["All",...new Set(posts.map(p=>p.cat))].forEach((c,i)=>{let b=document.createElement("button");b.textContent=c;b.className=i===0?"active":"";b.onclick=()=>{document.querySelectorAll("#blogFilters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderPosts(c,bs.value)};bf.appendChild(b)});
  bs.oninput=()=>{let active=document.querySelector("#blogFilters .active")?.textContent||"All";renderPosts(active,bs.value)};
  renderPosts();
}
// Homepage: latest 3 posts
const homePosts=document.getElementById("homePosts");
if(homePosts){
  if(posts.length) homePosts.innerHTML=posts.slice(0,3).map(postCard).join("");
  else homePosts.closest("section").style.display="none";
}

document.getElementById("menuBtn").onclick=()=>document.getElementById("navLinks").classList.toggle("open");
document.querySelectorAll("#navLinks a").forEach(a=>a.onclick=()=>document.getElementById("navLinks").classList.remove("open"));
// Highlight the current page in the nav and footer
const currentPage=location.pathname.includes("/blog/")?"blog.html":(location.pathname.split("/").pop()||"index.html");
document.querySelectorAll("#navLinks a, .footer-links a").forEach(a=>{if(a.getAttribute("href")===currentPage){a.classList.add("active");a.setAttribute("aria-current","page")}});
document.getElementById("year").textContent=new Date().getFullYear();
const topBtn=document.getElementById("topBtn");window.addEventListener("scroll",()=>topBtn.classList.toggle("show",scrollY>500));topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));

const contactForm=document.getElementById("contactForm");
if(contactForm) contactForm.addEventListener("submit",e=>{
 e.preventDefault();const d=new FormData(e.target);
 const subject=encodeURIComponent(`Portfolio enquiry from ${d.get("name")}`);
 const body=encodeURIComponent(`Name: ${d.get("name")}\nEmail: ${d.get("email")}\nCompany: ${d.get("company")}\nService: ${d.get("service")}\n\n${d.get("message")}`);
 window.location.href=`mailto:purkaitaveeke@gmail.com?subject=${subject}&body=${body}`;
 document.getElementById("formStatus").textContent="Opening your email app with the enquiry...";
});


/* ---------- Two-line Typewriter Animation ---------- */
(function(){
  const introEl = document.getElementById("typewriterIntro");
  const nameEl = document.getElementById("typewriterName");
  const roleEl = document.getElementById("typewriterRole");
  if(!introEl || !nameEl || !roleEl) return;

  const introText = "Hi, I'm";
  const nameText = "Aveeke Purkait";
  const roleText = "Digital Marketer & Performance Marketing Specialist";

  introEl.textContent = "";
  nameEl.textContent = "";
  roleEl.textContent = "";

  let i=0, n=0, r=0;

  function typeIntro(){
    if(i < introText.length){
      introEl.textContent += introText.charAt(i++);
      setTimeout(typeIntro,70);
    } else {
      setTimeout(typeName,250);
    }
  }

  function addNameChar(ch,index){
    const aveekeStart = nameText.indexOf("Aveeke");
    const purkaitStart = nameText.indexOf("Purkait");
    if(index >= aveekeStart && index < purkaitStart){
      const s=document.createElement("span");
      s.className="name-aveeke";
      s.textContent=ch;
      nameEl.appendChild(s);
    } else if(index >= purkaitStart){
      const s=document.createElement("span");
      s.className="name-purkait";
      s.textContent=ch;
      nameEl.appendChild(s);
    } else {
      nameEl.appendChild(document.createTextNode(ch));
    }
  }

  function typeName(){
    if(n < nameText.length){
      addNameChar(nameText.charAt(n),n++);
      setTimeout(typeName,75);
    } else {
      setTimeout(typeRole,300);
    }
  }

  function typeRole(){
    if(r < roleText.length){
      roleEl.textContent += roleText.charAt(r++);
      setTimeout(typeRole,42);
    }
  }

  setTimeout(typeIntro,400);
})();

/* ---------- Dark / Light mode ---------- */
(function(){
  const btn = document.getElementById("themeToggle");
  if(!btn) return;

  const saved = localStorage.getItem("aveeke-theme");
  if(saved === "light") document.body.classList.add("light");

  function update(){
    const light = document.body.classList.contains("light");
    btn.innerHTML = light ? "☀ <span>Light</span>" : "☾ <span>Dark</span>";
    btn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    btn.title = light ? "Switch to dark mode" : "Switch to light mode";
  }
  update();
  btn.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    localStorage.setItem("aveeke-theme", document.body.classList.contains("light") ? "light" : "dark");
    update();
  });
})();
