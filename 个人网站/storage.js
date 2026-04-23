(function () {
  const STORAGE_KEY = "personal-site-data-v1";

  const DEFAULT_SITE_DATA = {
    profile: {
      name: "于新雨",
      role: "柔性超声传感与连续血流动力学监测方向研究者",
      tagline: "围绕可穿戴柔性超声阵列、血压波形采集与数据驱动预测开展研究。",
      intro:
        "我目前的工作重点放在柔性超声器件设计、声场仿真、血压波形测试，以及基于波形的智能预测方法，希望把器件、系统和算法连接成一条可落地的研究链路。",
      location: "天津 / 河北工业大学",
      email: "your-email@example.com",
      website: "https://github.com/your-name"
    },
    highlights: [
      { value: "7", label: "建议论文章节" },
      { value: "3+", label: "核心研究主题" },
      { value: "24h", label: "网页可随时维护" }
    ],
    about: {
      summary:
        "这个页面适合展示你的研究方向、项目、论文和联系方式。当前默认风格偏科研展示，但所有内容都能在后台维护页直接修改。",
      points: [
        "聚焦柔性超声换能器阵列与连续血流动力学监测。",
        "兼顾器件设计、系统搭建、实验验证与数据建模。",
        "希望把研究成果整理成清晰、可持续维护的个人品牌页面。"
      ]
    },
    researchAreas: [
      {
        title: "柔性超声器件设计",
        description: "关注柔性阵列结构、封装方式、换能单元参数以及可穿戴贴附稳定性。"
      },
      {
        title: "声场仿真与系统验证",
        description: "结合阵列参数设计、波束偏转与聚焦效果分析，支撑硬件和实验方案迭代。"
      },
      {
        title: "血压波形与智能预测",
        description: "围绕血压波形提取、特征分析和轻量深度学习预测构建完整的数据链路。"
      }
    ],
    projects: [
      {
        title: "柔性超声阵列血压监测系统",
        description: "围绕贴附式超声阵列与连续血压监测需求，进行器件、驱动和数据处理一体化设计。",
        tags: ["柔性超声", "血压监测", "系统集成"],
        link: ""
      },
      {
        title: "ACTS1001 波形处理与实验分析",
        description: "针对超声 RF 数据和血压相关波形构建预处理、分帧、波形可视化与质量分析流程。",
        tags: ["RF 数据", "波形处理", "实验分析"],
        link: ""
      },
      {
        title: "基于波形的深度学习预测探索",
        description: "尝试将血压波形或血管直径波形连接到轻量预测模型，用于后续智能监测研究。",
        tags: ["深度学习", "时间序列", "预测建模"],
        link: ""
      }
    ],
    publications: [
      {
        title: "论文 / 专利 / 竞赛成果 1",
        description: "在这里填写你的论文题目、投稿状态或成果简介。",
        status: "待补充"
      },
      {
        title: "论文 / 专利 / 竞赛成果 2",
        description: "可以写成论文列表，也可以写成阶段性研究成果。",
        status: "待补充"
      }
    ],
    contact: {
      email: "your-email@example.com",
      wechat: "your-wechat",
      location: "天津",
      note: "如果你希望交流柔性超声、血压波形分析或科研合作，可以通过邮箱联系我。"
    }
  };

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function mergeDefaults(base, incoming) {
    if (Array.isArray(base)) {
      return Array.isArray(incoming) ? incoming : clone(base);
    }

    if (isObject(base)) {
      const result = {};
      const source = isObject(incoming) ? incoming : {};
      Object.keys(base).forEach((key) => {
        result[key] = mergeDefaults(base[key], source[key]);
      });
      return result;
    }

    return incoming === undefined || incoming === null ? base : incoming;
  }

  function readStorage() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return clone(DEFAULT_SITE_DATA);
      }
      const parsed = JSON.parse(raw);
      return mergeDefaults(DEFAULT_SITE_DATA, parsed);
    } catch (error) {
      return clone(DEFAULT_SITE_DATA);
    }
  }

  function writeStorage(data) {
    const merged = mergeDefaults(DEFAULT_SITE_DATA, data);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged;
  }

  function resetStorage() {
    window.localStorage.removeItem(STORAGE_KEY);
    return clone(DEFAULT_SITE_DATA);
  }

  window.SiteDataStore = {
    STORAGE_KEY,
    DEFAULT_SITE_DATA,
    clone,
    load: readStorage,
    save: writeStorage,
    reset: resetStorage
  };
})();
