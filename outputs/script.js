const filters = Array.from(document.querySelectorAll(".filter"));
const searchInput = document.querySelector("#post-search");
const postGrid = document.querySelector("#post-grid");
const notesGrid = document.querySelector("#notes-grid");
const bookshelf = document.querySelector(".bookshelf");
const letterForm = document.querySelector(".letter-form");
const formNote = document.querySelector(".form-note");
const languageButtons = Array.from(document.querySelectorAll(".language-button"));
const criticForm = document.querySelector("#critic-form");
const criticList = document.querySelector("#critic-list");
const criticQuote = document.querySelector("#critic-quote");
const criticSource = document.querySelector("#critic-source");
const criticFormNote = document.querySelector(".critic-form-note");
const contactForm = document.querySelector("#contact-form");
const contactFormNote = document.querySelector(".contact-form-note");
const articlePage = document.querySelector("#article-page");
const aboutTitle = document.querySelector("#about-title");
const aboutBody = document.querySelector("#about-body");
const appearancesList = document.querySelector("#appearances-list");
const heroQuote = document.querySelector(".hero-content p");
const heroImage = document.querySelector(".hero img");
const instagramLinks = Array.from(document.querySelectorAll(".instagram-link"));
const contactEmailLinks = Array.from(document.querySelectorAll("[data-contact-email]"));

let activeFilter = "all";
let currentLanguage = "en";
let writingItems = [];
let bookItems = [];
let criticItems = [];
let aboutContent = null;

const writingSources = [
  { file: "content/blog-posts.json", type: "Blog Posts", typeFa: "وبلاگ" },
  { file: "content/notes.json", type: "Notes", typeFa: "یادداشت‌ها" },
  { file: "content/essays.json", type: "Essays", typeFa: "مقاله‌ها" },
  { file: "content/translations.json", type: "Translations", typeFa: "ترجمه‌ها" }
];

const fallbackContent = {
  writing: [
    {
      type: "Blog Posts",
      typeFa: "وبلاگ",
      title_en: "On Keeping a Notebook Open",
      title_fa: "درباره باز نگه داشتن دفترچه",
      date: "2026-06-12",
      excerpt_en: "A meditation on attention, unfinished sentences, and why the best pages often begin as a refusal to explain too quickly.",
      excerpt_fa: "تأملی درباره توجه، جمله‌های ناتمام، و اینکه چرا بهترین صفحه‌ها اغلب با شتاب نکردن در توضیح آغاز می‌شوند.",
      body_en: "A notebook is less a place for certainty than a room where a sentence can hesitate without being corrected too soon.",
      body_fa: "دفترچه کمتر جای یقین است و بیشتر اتاقی است که جمله می‌تواند بی‌آنکه زود اصلاح شود، تردید کند.",
      featured: true
    }
  ],
  books: [
    {
      title_en: "The Orchard Under Snow",
      title_fa: "باغ زیر برف",
      meta_en: "Memoir · Forthcoming",
      meta_fa: "خاطره‌نگاری · در دست انتشار",
      description_en: "A daughter returns to a farm abandoned for twenty years and finds a ledger of debts written in her mother's hand.",
      description_fa: "دختری به مزرعه‌ای بازمی‌گردد که بیست سال رها شده و دفتر بدهی‌هایی را می‌یابد که با دست‌خط مادرش نوشته شده است.",
      link_label_en: "Request updates",
      link_label_fa: "دریافت خبر",
      link_url: "#letter",
      cover_style: "cover-one"
    }
  ],
  critics: [],
  about: {
    hero_image: "assets/narges-darweshi.png",
    instagram_url: "https://www.instagram.com/narges_darweshi?igsh=MTA2YWJrYWxqYmZ5MA%3D%3D&utm_source=qr",
    contact_email: "darwishi.narges@gmail.com",
    english_body_font: "Modern Sans",
    persian_body_font: "Vazir",
    heading_font: "Classic Serif",
    hero_quote_font: "Classic Serif",
    hero_quote_en: "“My writing is hesitation; perhaps meaning is born in your reading.”",
    hero_quote_fa: "«نوشتن من تردید است؛ معنی شاید در خواندن تو متولد شود.»",
    title_en: "Writing at the edge of memory and place.",
    title_fa: "نوشتن در مرز حافظه و مکان.",
    paragraphs_en: [
      "Narges Darweshi writes books and short stories about private histories, houses that remember their inhabitants, and the geographies that shape a life. Her work has appeared in literary journals, anthologies, and independent bookstores with excellent windows.",
      "This weblog is her open desk: part archive, part correspondence, part map of what she is reading and noticing while new books take shape."
    ],
    paragraphs_fa: [
      "نرگس درویشی کتاب و داستان کوتاه‌هایی درباره تاریخ‌های خصوصی، خانه‌هایی که ساکنان خود را به یاد می‌آورند و جغرافیاهایی که زندگی را شکل می‌دهند می‌نویسد. آثار او در مجلات ادبی، مجموعه‌ها و کتابفروشی‌های مستقل منتشر شده است.",
      "این وبلاگ میز کار باز اوست: بخشی آرشیو، بخشی مکاتبه و بخشی نقشه چیزهایی که هنگام شکل گرفتن کتاب‌های تازه می‌خواند و می‌بیند."
    ],
    appearances: [
      { date: "Sep 18", title_en: "Chicago Book Room reading", title_fa: "خوانش در شیکاگو" },
      { date: "Oct 04", title_en: "Online craft seminar", title_fa: "کارگاه آنلاین نوشتن" },
      { date: "Nov 11", title_en: "Lakeside Library conversation", title_fa: "گفت‌وگو در کتابخانه لیک‌ساید" }
    ]
  }
};

const fontChoices = {
  "Modern Sans": 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  "Clean Sans": 'Arial, Helvetica, sans-serif',
  "Classic Serif": 'Didot, "Bodoni 72", "Bodoni 72 Smallcaps", "Bodoni MT", "Cormorant Garamond", Georgia, "Times New Roman", serif',
  "Book Serif": 'Georgia, "Times New Roman", serif',
  "Vazir": '"Vazirmatn", "Vazir", "Vaziri", "Tahoma", Arial, sans-serif',
  "Tahoma": 'Tahoma, Arial, sans-serif',
  "Noto Naskh": '"Noto Naskh Arabic", "Times New Roman", serif',
  "Serif": 'Georgia, "Times New Roman", serif',
  "Persian Vazir": '"Vazirmatn", "Vazir", "Vaziri", "Tahoma", Arial, sans-serif'
};

function resolveFont(choice, fallback) {
  return fontChoices[choice] || fontChoices[fallback] || fontChoices["Modern Sans"];
}

function getLocalized(item, field) {
  return item[`${field}_${currentLanguage}`] || item[`${field}_en`] || "";
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const locale = currentLanguage === "fa" ? "fa-IR" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textToParagraphs(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json();
}

async function loadContent() {
  try {
    const writingGroups = await Promise.all(
      writingSources.map(async (source) => {
        const data = await fetchJson(source.file);
        return (data.items || []).map((item) => ({ ...item, type: source.type, typeFa: source.typeFa }));
      })
    );
    const books = await fetchJson("content/books.json");
    const critics = await fetchJson("content/critics.json");
    const about = await fetchJson("content/about.json");

    writingItems = writingGroups.flat();
    bookItems = books.items || [];
    criticItems = critics.items || [];
    aboutContent = about || fallbackContent.about;
  } catch {
    writingItems = fallbackContent.writing;
    bookItems = fallbackContent.books;
    criticItems = fallbackContent.critics;
    aboutContent = fallbackContent.about;
  }

  writingItems = writingItems
    .map((item) => ({ ...item, slug: slugify(item.slug || item.title_en || item.title_fa) }))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function applyStaticLanguage() {
  document.documentElement.lang = currentLanguage === "fa" ? "fa" : "en";
  document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-fa]").forEach((item) => {
    item.textContent = item.dataset[currentLanguage];
  });

  document.querySelectorAll("[data-placeholder-en][data-placeholder-fa]").forEach((item) => {
    item.placeholder = item.dataset[`placeholder${currentLanguage === "fa" ? "Fa" : "En"}`];
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === currentLanguage);
  });
}

function setLanguage(language) {
  currentLanguage = language;
  applyStaticLanguage();
  renderAll();
}

function updatePosts() {
  const query = (searchInput?.value || "").trim().toLowerCase();

  document.querySelectorAll(".post-card").forEach((post) => {
    const categoryMatches = activeFilter === "all" || post.dataset.category === activeFilter;
    const textMatches = post.textContent.toLowerCase().includes(query);
    post.hidden = !(categoryMatches && textMatches);
  });
}

function renderAbout() {
  if (!aboutContent) {
    return;
  }

  document.documentElement.style.setProperty(
    "--font-body",
    resolveFont(aboutContent.english_body_font, "Modern Sans")
  );
  document.documentElement.style.setProperty(
    "--font-persian",
    resolveFont(aboutContent.persian_body_font, "Vazir")
  );
  document.documentElement.style.setProperty(
    "--font-heading",
    resolveFont(aboutContent.heading_font, "Classic Serif")
  );
  document.documentElement.style.setProperty(
    "--font-hero-quote",
    resolveFont(aboutContent.hero_quote_font, "Classic Serif")
  );

  if (aboutContent.instagram_url) {
    instagramLinks.forEach((link) => {
      link.href = aboutContent.instagram_url;
    });
  }

  if (aboutContent.contact_email) {
    contactEmailLinks.forEach((link) => {
      link.href = `mailto:${aboutContent.contact_email}`;
      const emailText = link.querySelector("[data-contact-email-text]");
      if (emailText) {
        emailText.textContent = aboutContent.contact_email;
      }
    });
  }

  if (!aboutTitle || !aboutBody) {
    return;
  }

  if (heroQuote) {
    heroQuote.textContent =
      aboutContent[`hero_quote_${currentLanguage}`] ||
      aboutContent.hero_quote_en ||
      heroQuote.textContent;
  }

  if (heroImage && aboutContent.hero_image) {
    heroImage.src = aboutContent.hero_image.replace(/^\/+/, "");
  }

  const title = aboutContent[`title_${currentLanguage}`] || aboutContent.title_en || "";
  const paragraphs =
    aboutContent[`paragraphs_${currentLanguage}`] ||
    aboutContent.paragraphs_en ||
    [];

  aboutTitle.textContent = title;
  aboutBody.innerHTML = paragraphs
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  if (appearancesList) {
    const appearances = aboutContent.appearances || [];
    appearancesList.innerHTML = appearances
      .map((appearance) => {
        const itemTitle = appearance[`title_${currentLanguage}`] || appearance.title_en || "";
        return `<li><span>${escapeHtml(appearance.date || "")}</span> <span>${escapeHtml(itemTitle)}</span></li>`;
      })
      .join("");
  }
}

function renderWriting() {
  if (!postGrid) {
    return;
  }

  if (!writingItems.length) {
    postGrid.innerHTML = `<p class="empty-state">${currentLanguage === "fa" ? "هنوز نوشته‌ای افزوده نشده است." : "No writings have been added yet."}</p>`;
    return;
  }

  postGrid.innerHTML = writingItems
    .map((item) => {
      const title = getLocalized(item, "title");
      const category = currentLanguage === "fa" ? item.typeFa : item.type;
      const href = `article.html?slug=${encodeURIComponent(item.slug)}`;
      const classes = item.featured ? "post-card featured" : "post-card";

      return `
        <article class="${classes}" data-category="${escapeHtml(item.type)}">
          <div>
            <p class="post-meta">${escapeHtml(category)} · ${escapeHtml(formatDate(item.date))}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(getLocalized(item, "excerpt"))}</p>
          </div>
          <a href="${href}" aria-label="${escapeHtml(title)}">${currentLanguage === "fa" ? "خواندن" : "Read"}</a>
        </article>
      `;
    })
    .join("");

  updatePosts();
}

function renderNotes() {
  if (!notesGrid) {
    return;
  }

  const notes = writingItems.filter((item) => item.type === "Notes");

  if (!notes.length) {
    notesGrid.innerHTML = `<p class="empty-state">${currentLanguage === "fa" ? "هنوز یادداشتی افزوده نشده است." : "No notes have been added yet."}</p>`;
    return;
  }

  notesGrid.innerHTML = notes
    .map((item) => {
      const title = getLocalized(item, "title");
      const href = `article.html?slug=${encodeURIComponent(item.slug)}`;

      return `
        <article class="${item.featured ? "post-card featured" : "post-card"}" data-category="Notes">
          <div>
            <p class="post-meta">${currentLanguage === "fa" ? "یادداشت" : "Note"} · ${escapeHtml(formatDate(item.date))}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(getLocalized(item, "excerpt"))}</p>
          </div>
          <a href="${href}" aria-label="${escapeHtml(title)}">${currentLanguage === "fa" ? "خواندن" : "Read"}</a>
        </article>
      `;
    })
    .join("");
}

function coverTitle(title) {
  const words = String(title || "").split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return `${escapeHtml(words.slice(0, midpoint).join(" "))}<br />${escapeHtml(words.slice(midpoint).join(" "))}`;
}

function renderBooks() {
  if (!bookshelf) {
    return;
  }

  if (!bookItems.length) {
    bookshelf.innerHTML = `<p class="empty-state">${currentLanguage === "fa" ? "هنوز کتابی افزوده نشده است." : "No books have been added yet."}</p>`;
    return;
  }

  bookshelf.innerHTML = bookItems
    .map((book) => {
      const title = getLocalized(book, "title");
      const cover = book.cover_image
        ? `<img src="${escapeHtml(book.cover_image)}" alt="${escapeHtml(title)}" />`
        : `<span>${coverTitle(title)}</span>`;

      return `
        <article class="book">
          <div class="book-cover ${escapeHtml(book.cover_style || "cover-one")}">
            ${cover}
          </div>
          <div class="book-copy">
            <p class="post-meta">${escapeHtml(getLocalized(book, "meta"))}</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(getLocalized(book, "description"))}</p>
            <a class="text-link" href="${escapeHtml(book.link_url || "#letter")}">${escapeHtml(getLocalized(book, "link_label") || (currentLanguage === "fa" ? "بیشتر" : "More"))}</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCritics() {
  if (!criticList) {
    return;
  }

  if (!criticItems.length) {
    criticList.innerHTML =
      currentLanguage === "fa"
        ? `
          <div class="empty-state critic-empty">
            <h3>مقاله‌های انتقادی و پژوهشی</h3>
            <p>برای نقدهای بلند، مقاله‌های ادبی، پژوهش‌ها و فایل‌های PDF.</p>
          </div>
        `
        : `
          <div class="empty-state critic-empty">
            <h3>Critical Essays & Research</h3>
            <p>For longer criticism, literary essays, research papers, and PDF uploads.</p>
          </div>
        `;
    return;
  }

  criticList.innerHTML = criticItems
    .map((item) => {
      const title = getLocalized(item, "title") || getLocalized(item, "quote");
      const type = getLocalized(item, "type") || (currentLanguage === "fa" ? "نقد" : "Review");
      const summary = getLocalized(item, "summary");
      const quote = getLocalized(item, "quote");
      const source = item.critic_name || getLocalized(item, "source");
      const date = formatDate(item.date);
      const link = item.document || item.link_url;
      const linkText = currentLanguage === "fa" ? "خواندن متن کامل" : "Read full text";

      return `
        <article class="critic-card">
          <p class="critic-type">${escapeHtml(type)}${date ? ` · ${escapeHtml(date)}` : ""}</p>
          <h3>${escapeHtml(title)}</h3>
          ${source ? `<p class="critic-source">${escapeHtml(source)}</p>` : ""}
          ${summary ? `<p class="critic-summary">${escapeHtml(summary)}</p>` : ""}
          ${quote ? `<blockquote>${escapeHtml(quote)}</blockquote>` : ""}
          ${link ? `<a class="text-link" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${linkText}</a>` : ""}
        </article>
      `;
    })
    .join("");
}

function renderArticlePage() {
  if (!articlePage) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const article = writingItems.find((item) => item.slug === slug) || writingItems[0];

  if (!article) {
    articlePage.innerHTML = `<p class="empty-state">${currentLanguage === "fa" ? "نوشته‌ای پیدا نشد." : "Article not found."}</p>`;
    return;
  }

  const category = currentLanguage === "fa" ? article.typeFa : article.type;
  const backHref = article.type === "Notes" ? "index.html#notes" : "index.html#books";
  articlePage.innerHTML = `
    <article class="article-reader">
      <a class="text-link" href="${backHref}">${currentLanguage === "fa" ? "بازگشت به صفحه اصلی" : "Back to home"}</a>
      <p class="post-meta">${escapeHtml(category)} · ${escapeHtml(formatDate(article.date))}</p>
      <h1>${escapeHtml(getLocalized(article, "title"))}</h1>
      <div class="article-body">${textToParagraphs(getLocalized(article, "body"))}</div>
    </article>
  `;
}

function renderAll() {
  renderAbout();
  renderWriting();
  renderNotes();
  renderBooks();
  renderCritics();
  renderArticlePage();
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    updatePosts();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", updatePosts);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

if (criticForm) {
  criticForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const quote = criticQuote.value.trim();
    const source = criticSource.value.trim();

    if (!quote || !source) {
      return;
    }

    if (window.location.protocol !== "file:") {
      const formData = new FormData(criticForm);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });
    }

    criticForm.reset();
    criticFormNote.textContent =
      currentLanguage === "fa"
        ? "سپاسگزاریم. یادداشت شما برای بررسی ارسال شد."
        : "Thank you. Your note has been submitted for review.";
  });
}

if (letterForm) {
  letterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let confirmationSent = false;
    if (window.location.protocol !== "file:") {
      const formData = new FormData(letterForm);
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      const subscriberEmail = formData.get("Email");
      const confirmationResponse = await fetch("/.netlify/functions/newsletter-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subscriberEmail,
          language: currentLanguage
        })
      });
      confirmationSent = confirmationResponse.ok;
    }
    formNote.textContent =
      currentLanguage === "fa"
        ? confirmationSent
          ? "سپاسگزاریم. عضویت شما ثبت شد و ایمیل تایید فرستاده شد."
          : "سپاسگزاریم. عضویت شما ثبت شد."
        : confirmationSent
          ? "Thank you. Your subscription has been saved and a confirmation email has been sent."
          : "Thank you. Your subscription has been saved.";
    letterForm.reset();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (window.location.protocol !== "file:") {
    const formData = new FormData(contactForm);
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    });
  }
  contactFormNote.textContent =
    currentLanguage === "fa"
      ? "سپاسگزاریم. پیام شما ارسال شد."
      : "Thank you. Your message has been sent.";
  contactForm.reset();
  });
}

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user && window.location.hash === "#invite_token") {
      window.netlifyIdentity.open();
    }
  });

  window.netlifyIdentity.on("login", () => {
    document.location.href = "/admin/";
  });
}

loadContent().then(() => {
  applyStaticLanguage();
  renderAll();
});
