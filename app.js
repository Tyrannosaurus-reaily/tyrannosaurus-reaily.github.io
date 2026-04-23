(function () {
  const store = window.SiteDataStore;
  const data = store.load();

  function setText(id, value, fallback) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value || fallback || "";
    }
  }

  function clearChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function createTag(label) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = label;
    return tag;
  }

  function renderHighlights(items) {
    const container = document.getElementById("stats");
    clearChildren(container);

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card stat-card reveal";

      const value = document.createElement("strong");
      value.textContent = item.value || "0";

      const label = document.createElement("span");
      label.textContent = item.label || "";

      card.append(value, label);
      container.appendChild(card);
    });
  }

  function renderAboutPoints(points) {
    const container = document.getElementById("about-points");
    clearChildren(container);

    points.forEach((text) => {
      const card = document.createElement("article");
      card.className = "bullet-card";
      const p = document.createElement("p");
      p.textContent = text;
      card.appendChild(p);
      container.appendChild(card);
    });
  }

  function renderResearch(items) {
    const container = document.getElementById("research-list");
    clearChildren(container);

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "stack-item";

      const title = document.createElement("h4");
      title.textContent = item.title || "";

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      article.append(title, desc);
      container.appendChild(article);
    });
  }

  function renderProjects(items) {
    const container = document.getElementById("project-list");
    clearChildren(container);

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "project-card";

      const title = document.createElement("h4");
      title.textContent = item.title || "";

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      const tags = document.createElement("div");
      tags.className = "tag-list";
      (item.tags || []).forEach((tag) => {
        if (tag) {
          tags.appendChild(createTag(tag));
        }
      });

      article.append(title, desc, tags);

      if (item.link) {
        const link = document.createElement("a");
        link.className = "project-link";
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = "打开链接";
        article.appendChild(link);
      }

      container.appendChild(article);
    });
  }

  function renderPublications(items) {
    const container = document.getElementById("publication-list");
    clearChildren(container);

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "stack-item";

      const title = document.createElement("h4");
      title.textContent = item.title || "";

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      article.append(title, desc);

      if (item.status) {
        const status = document.createElement("div");
        status.className = "tag-list";
        status.appendChild(createTag(item.status));
        article.appendChild(status);
      }

      container.appendChild(article);
    });
  }

  document.title = data.profile.name + " | 个人网站";
  setText("nav-name", data.profile.name);
  setText("hero-name", data.profile.name);
  setText("hero-role", data.profile.role);
  setText("hero-tagline", data.profile.tagline);
  setText("hero-intro", data.profile.intro);
  setText("meta-location", data.profile.location);
  setText("meta-email", data.profile.email);
  setText("meta-website", data.profile.website || "待补充");
  setText("about-summary", data.about.summary);
  setText("contact-email", data.contact.email);
  setText("contact-wechat", data.contact.wechat);
  setText("contact-location", data.contact.location);
  setText("contact-note", data.contact.note);

  renderHighlights(data.highlights);
  renderAboutPoints(data.about.points || []);
  renderResearch(data.researchAreas || []);
  renderProjects(data.projects || []);
  renderPublications(data.publications || []);
})();
