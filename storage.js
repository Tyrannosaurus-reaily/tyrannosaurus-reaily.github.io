(function () {
  const STORAGE_KEY = "personal-site-data-v1";

  const DEFAULT_SITE_DATA = {
    profile: {
      name: "于新雨",
      role: "电子信息 | 柔性超声传感与血流动力学监测",
      tagline: "围绕可穿戴柔性超声阵列、连续血压波形采集与 AI 驱动的血流动力学参数预测开展研究，致力于打通器件-系统-算法全链路。",
      intro:
        "目前就读于河北工业大学，研究方向聚焦电子信息领域的柔性超声传感器设计、声场仿真优化、连续血压波形采集与分析，以及基于深度学习的血流动力学智能预测方法，旨在将柔性器件、硬件系统与 AI 算法连接为完整的研究链路，推动可穿戴健康监测技术的实际应用。",
      location: "天津 / 河北工业大学",
      email: "your-email@example.com",
      website: "https://github.com/your-name"
    },
    highlights: [
      { value: "4", label: "核心研究方向" },
      { value: "3+", label: "在研项目" },
      { value: "∞", label: "探索可能" }
    ],
    about: {
      summary:
        "本人围绕电子信息工程与生物医学交叉领域，重点开展柔性超声传感器、血流动力学监测和 AI 算法三个方向的研究工作，力求在可穿戴健康监测方向形成系统性的研究体系。",
      points: [
        "聚焦柔性超声换能器阵列设计与可穿戴贴附稳定性研究。",
        "围绕连续血压波形采集、血流动力学参数提取与临床验证。",
        "结合轻量深度学习模型，探索血压波形的智能预测与分析方法。",
        "兼顾器件制备、系统搭建、实验验证与数据建模的全链路研究。"
      ]
    },
    researchAreas: [
      {
        title: "柔性超声传感器设计",
        description: "研究柔性超声换能器阵列的结构设计、材料选择、封装工艺与可穿戴贴附方案，关注器件在弯曲表面的声学性能与长期稳定性。"
      },
      {
        title: "声场仿真与系统验证",
        description: "基于有限元方法与声场建模，对阵列参数、波束偏转与聚焦效果进行仿真分析，指导硬件方案迭代与实验验证。"
      },
      {
        title: "连续血流动力学监测",
        description: "围绕超声 RF 信号处理、血压波形提取、血管直径追踪等关键环节，构建从信号采集到血流动力学参数输出的完整流程。"
      },
      {
        title: "AI 驱动的智能预测",
        description: "利用深度学习与时间序列分析方法，对血压波形和血流动力学参数进行建模与预测，探索数据驱动的智能健康监测方案。"
      }
    ],
    projects: [
      {
        title: "柔性超声阵列血压监测系统",
        description: "围绕贴附式超声阵列与连续血压监测需求，进行器件设计、驱动电路与信号处理的一体化方案研究。",
        tags: ["柔性超声", "血压监测", "系统集成"],
        link: ""
      },
      {
        title: "ACTS1001 波形处理与实验分析",
        description: "针对超声 RF 数据和血压相关波形构建预处理、分帧、波形可视化与信号质量分析流程，支撑后续参数提取。",
        tags: ["RF 数据", "波形处理", "实验分析"],
        link: ""
      },
      {
        title: "基于波形的深度学习预测探索",
        description: "将血压波形与血管直径波形作为输入，构建轻量时序预测模型，探索 AI 在连续血流动力学监测中的应用。",
        tags: ["深度学习", "时间序列", "预测建模"],
        link: ""
      }
    ],
    publications: [
      {
        title: "论文 / 专利 / 竞赛成果 1",
        description: "在这里填写你的论文题目、投稿期刊/会议、状态或成果简介。",
        status: "待补充"
      },
      {
        title: "论文 / 专利 / 竞赛成果 2",
        description: "可以列出已发表论文、在审文章、授权专利或竞赛获奖等学术成果。",
        status: "待补充"
      }
    ],
    contact: {
      email: "your-email@example.com",
      wechat: "your-wechat",
      location: "天津",
      note: "如果你对柔性超声传感器、连续血流动力学监测或 AI 驱动的健康监测感兴趣，欢迎通过邮箱与我交流合作。"
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
