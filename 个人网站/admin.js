(function () {
  const store = window.SiteDataStore;
  const state = store.clone(store.load());

  const listConfigs = {
    "about-points": {
      title: "条目",
      target: () => state.about.points,
      create: () => "请输入你的个人亮点",
      renderFields(item, index) {
        return `
          <div class="admin-item-grid">
            <label class="span-all">
              内容
              <textarea data-list="about-points" data-index="${index}" data-field="value" rows="3">${item}</textarea>
            </label>
          </div>
        `;
      }
    },
    highlights: {
      title: "数字卡片",
      target: () => state.highlights,
      create: () => ({ value: "1", label: "新的卡片" }),
      renderFields(item, index) {
        return `
          <div class="admin-item-grid">
            <label>
              数值
              <input data-list="highlights" data-index="${index}" data-field="value" type="text" value="${item.value || ""}" />
            </label>
            <label>
              标签
              <input data-list="highlights" data-index="${index}" data-field="label" type="text" value="${item.label || ""}" />
            </label>
          </div>
        `;
      }
    },
    researchAreas: {
      title: "研究方向",
      target: () => state.researchAreas,
      create: () => ({ title: "新的研究方向", description: "请补充说明" }),
      renderFields(item, index) {
        return `
          <div class="admin-item-grid">
            <label class="span-all">
              标题
              <input data-list="researchAreas" data-index="${index}" data-field="title" type="text" value="${item.title || ""}" />
            </label>
            <label class="span-all">
              描述
              <textarea data-list="researchAreas" data-index="${index}" data-field="description" rows="4">${item.description || ""}</textarea>
            </label>
          </div>
        `;
      }
    },
    projects: {
      title: "项目",
      target: () => state.projects,
      create: () => ({ title: "新的项目", description: "请补充项目简介", tags: [], link: "" }),
      renderFields(item, index) {
        return `
          <div class="admin-item-grid">
            <label class="span-all">
              项目标题
              <input data-list="projects" data-index="${index}" data-field="title" type="text" value="${item.title || ""}" />
            </label>
            <label class="span-all">
              项目描述
              <textarea data-list="projects" data-index="${index}" data-field="description" rows="4">${item.description || ""}</textarea>
            </label>
            <label>
              标签（逗号分隔）
              <input data-list="projects" data-index="${index}" data-field="tags" type="text" value="${(item.tags || []).join(", ")}" />
            </label>
            <label>
              链接
              <input data-list="projects" data-index="${index}" data-field="link" type="text" value="${item.link || ""}" />
            </label>
          </div>
        `;
      }
    },
    publications: {
      title: "成果",
      target: () => state.publications,
      create: () => ({ title: "新的成果", description: "请补充成果说明", status: "待补充" }),
      renderFields(item, index) {
        return `
          <div class="admin-item-grid">
            <label class="span-all">
              标题
              <input data-list="publications" data-index="${index}" data-field="title" type="text" value="${item.title || ""}" />
            </label>
            <label class="span-all">
              描述
              <textarea data-list="publications" data-index="${index}" data-field="description" rows="4">${item.description || ""}</textarea>
            </label>
            <label class="span-all">
              状态
              <input data-list="publications" data-index="${index}" data-field="status" type="text" value="${item.status || ""}" />
            </label>
          </div>
        `;
      }
    }
  };

  const editorMap = {
    "about-points": document.getElementById("about-points-editor"),
    highlights: document.getElementById("highlights-editor"),
    researchAreas: document.getElementById("research-editor"),
    projects: document.getElementById("projects-editor"),
    publications: document.getElementById("publications-editor")
  };

  const fieldMap = {
    "profile-name": ["profile", "name"],
    "profile-role": ["profile", "role"],
    "profile-tagline": ["profile", "tagline"],
    "profile-intro": ["profile", "intro"],
    "profile-location": ["profile", "location"],
    "profile-email": ["profile", "email"],
    "profile-website": ["profile", "website"],
    "about-summary": ["about", "summary"],
    "contact-email": ["contact", "email"],
    "contact-wechat": ["contact", "wechat"],
    "contact-location": ["contact", "location"],
    "contact-note": ["contact", "note"]
  };

  function setStatus(text) {
    document.getElementById("save-status").textContent = text;
  }

  function assignByPath(root, path, value) {
    let pointer = root;
    for (let index = 0; index < path.length - 1; index += 1) {
      pointer = pointer[path[index]];
    }
    pointer[path[path.length - 1]] = value;
  }

  function renderList(name) {
    const config = listConfigs[name];
    const container = editorMap[name];
    const items = config.target();

    container.innerHTML = "";

    items.forEach((item, index) => {
      const wrapper = document.createElement("article");
      wrapper.className = "admin-item";
      wrapper.innerHTML = `
        <h4>${config.title} ${index + 1}</h4>
        ${config.renderFields(item, index)}
        <div class="inline-actions">
          <button class="button button-danger small" data-remove-list="${name}" data-index="${index}" type="button">删除</button>
        </div>
      `;
      container.appendChild(wrapper);
    });
  }

  function renderAllLists() {
    Object.keys(listConfigs).forEach(renderList);
  }

  function populateFields() {
    Object.entries(fieldMap).forEach(([id, path]) => {
      const input = document.getElementById(id);
      let value = state;
      path.forEach((key) => {
        value = value[key];
      });
      input.value = value || "";
    });
    renderAllLists();
  }

  function collectTopLevelFields() {
    Object.entries(fieldMap).forEach(([id, path]) => {
      const input = document.getElementById(id);
      assignByPath(state, path, input.value.trim());
    });
  }

  function save() {
    collectTopLevelFields();
    store.save(state);
    setStatus("当前状态：修改已保存到浏览器本地。打开主页即可查看最新内容。");
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "personal-site-data.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("当前状态：已导出 JSON 备份。");
  }

  function importJson(file) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const parsed = JSON.parse(reader.result);
        const merged = store.save(parsed);
        Object.assign(state, store.clone(merged));
        populateFields();
        setStatus("当前状态：已导入 JSON 并写入本地。");
      } catch (error) {
        setStatus("当前状态：导入失败，请确认 JSON 格式正确。");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  document.querySelectorAll("[data-add-list]").forEach((button) => {
    button.addEventListener("click", () => {
      const listName = button.getAttribute("data-add-list");
      listConfigs[listName].target().push(listConfigs[listName].create());
      renderList(listName);
      setStatus("当前状态：已新增条目，记得点击“保存修改”。");
    });
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!target.matches("[data-list]")) {
      return;
    }

    const listName = target.getAttribute("data-list");
    const index = Number(target.getAttribute("data-index"));
    const field = target.getAttribute("data-field");
    const item = listConfigs[listName].target()[index];
    const value = target.value;

    if (listName === "about-points") {
      listConfigs[listName].target()[index] = value.trim();
      return;
    }

    if (field === "tags") {
      item.tags = value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
      return;
    }

    item[field] = value.trim();
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches("[data-remove-list]")) {
      return;
    }

    const listName = target.getAttribute("data-remove-list");
    const index = Number(target.getAttribute("data-index"));
    listConfigs[listName].target().splice(index, 1);
    renderList(listName);
    setStatus("当前状态：已删除条目，记得点击“保存修改”。");
  });

  document.getElementById("save-data").addEventListener("click", save);
  document.getElementById("export-data").addEventListener("click", exportJson);
  document.getElementById("preview-site").addEventListener("click", () => {
    save();
    window.open("index.html", "_blank");
  });
  document.getElementById("import-data").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) {
      importJson(file);
    }
  });
  document.getElementById("reset-data").addEventListener("click", () => {
    const fresh = store.reset();
    Object.assign(state, store.clone(fresh));
    populateFields();
    setStatus("当前状态：已恢复默认内容。记得重新保存。");
  });

  populateFields();
})();
