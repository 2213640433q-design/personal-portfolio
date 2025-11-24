
import { ExperienceItem, ProjectItem, SkillCategory, AwardItem, ValueProp } from './types';
import { Layout, Cpu, TrendingUp, Users } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "LIU XINLIN",
  chineseName: "刘昕林",
  title: "AI Product Manager",
  tagline: "专注AI应用落地，具备0-1产品构建与多场景实战经验",
  email: "2213640433@qq.com",
  phone: "18273350561",
  location: "北京、上海、杭州、深圳",
  education: [
    {
      school: "格拉斯哥大学 University of Glasgow",
      degree: "计算机科学 理学硕士 MSc Computer Science",
      period: "2024.9 - 2025.11"
    },
    {
      school: "重庆理工大学 Chongqing University of Technology",
      degree: "计算机科学与技术 工学学士 BEng Computer Science & Technology",
      period: "2019.9 - 2023.7"
    }
  ]
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "meituan",
    company: "Meituan (美团)",
    role: "AI平台产品经理",
    period: "2025.09 - 11",
    highlights: [
      "Friday平台0-1建设",
      "覆盖12条业务线",
      "节省3.6万人时/年"
    ]
  },
  {
    id: "li-auto",
    company: "Li Auto (理想汽车)",
    role: "AI产品经理",
    period: "2025.08 - 2025.09",
    highlights: [
      "RAG系统50+库",
      "召回率80%+",
      "处理时间30min→1min"
    ]
  },
  {
    id: "honor",
    company: "Honor (荣耀)",
    role: "AIGC产品工程师",
    period: "2024.02 - 2024.07",
    highlights: [
      "Dify生文>90%",
      "效率提升45%",
      "月均降本7.5万"
    ]
  },
  {
    id: "alibaba",
    company: "Alibaba Cloud (阿里云)",
    role: "政务大模型SA",
    period: "2023.05 - 2023.11",
    highlights: [
      "12个政务部门调研",
      "RAG知识库设计"
    ]
  }
];

export interface ExtendedProjectItem extends ProjectItem {
  fullDescription: string;
  details?: string[];
  imageUrl: string;
}

export const PROJECTS: ExtendedProjectItem[] = [
  {
    id: "ima",
    title: "期末备考复习知识库",
    subtitle: "RAG 智能学习助手",
    meta: {
      tech: "RAG",
      industry: "教育",
      platform: "Ima"
    },
    description: "基于RAG构建个性化学习系统，整合课程讲义、真题。智能检索提供复习建议。",
    fullDescription: "基于检索增强生成技术构建个性化学习系统，整合课程讲义、历年真题、学习笔记等多源知识库。通过智能检索提供针对性的复习建议与知识点讲解，提升学习效率。",
    tags: ["RAG", "Education", "Personalization"],
    imagePlaceholderType: "abstract",
    link: "https://xiaohongshu.com",
    // Theme: Exam/Study - High end library/books
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop",
    details: [
      "小红书爆款项目：3天搞定期末复习",
      "数据源：课程PDF、真题、笔记",
      "交互：基于语义检索的问答系统"
    ]
  },
  {
    id: "dify",
    title: "合同对抗法庭预演",
    subtitle: "多Agent模拟",
    meta: {
      tech: "CoT",
      industry: "法律",
      platform: "Dify"
    },
    description: "融合思维链推理与检索增强生成技术，构建多角色Agent系统模拟法庭环境。",
    fullDescription: "融合思维链推理与检索增强生成技术，使用Dify构建多角色Agent系统模拟法庭环境，实现合同条款的多维度分析与风险评估。通过Agent间的协作与辩论，提升合同审查的准确性与全面性。",
    tags: ["Agent", "RAG", "CoT", "Dify"],
    imagePlaceholderType: "tech",
    // Theme: Legal - Court Session / Classic Hall vibe
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
    details: [
      "技术栈：Dify, LLM, RAG, Chain of Thought",
      "核心功能：多角色模拟、自动化辩论、风险评估报告",
      "成果：模拟法庭环境，提升合同审查全面性"
    ]
  },
  {
    id: "coze",
    title: "金融投资决策助手",
    subtitle: "智能投资Agent",
    meta: {
      tech: "Agent",
      industry: "金融",
      platform: "Coze"
    },
    description: "集成实时市场数据与决策模型。多轮对话提供数据驱动的投资建议。",
    fullDescription: "利用Coze平台构建金融领域专家Agent，集成实时市场数据、财务分析工具与决策模型。通过多轮对话与深度分析，为用户提供数据驱动的投资建议与风险评估，展现AI在金融决策中的应用潜力。",
    tags: ["FinTech", "Coze", "Agent"],
    imagePlaceholderType: "tech",
    // Theme: Financial Investment - Trading Screen / Data
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
    details: [
      "集成工具：实时股市API、财报分析插件",
      "输出：动态图表、投资研报",
      "平台：Coze / ByteDance"
    ]
  },
  {
    id: "midjourney",
    title: "商业级Logo快速迭代",
    subtitle: "AI创意设计",
    meta: {
      tech: "AIGC",
      industry: "设计",
      platform: "Midjourney"
    },
    description: "AI辅助设计流程，快速创意迭代。应用于品牌识别系统、产品包装等商业场景。",
    fullDescription: "融合Midjourney的AI生成能力与专业设计工具，实现快速创意迭代与精细化调整，打造兼具创意与商业价值的品牌标识。应用于品牌识别系统、市场营销物料、产品包装设计等多个场景。",
    tags: ["Midjourney", "Design", "Branding"],
    imagePlaceholderType: "abstract",
    // Theme: Design Sketches / Wireframes - Hand drawing lines
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    details: [
      "工具链：Midjourney v6 + Vectorizer + Figma",
      "应用：VI系统、包装设计",
      "优势：快速迭代多风格方案"
    ]
  },
  {
    id: "readdy",
    title: "摄影器材租赁平台Readdy",
    subtitle: "全栈开发",
    meta: {
      tech: "Vibe Coding",
      industry: "编程",
      platform: "Cursor"
    },
    description: "从零设计摄影器械租赁平台。Axure原型，Cursor AI辅助前后端开发。",
    fullDescription: "Readdy AI原型设计 + Cursor Vibe Coding前后端开发。从零开始设计并开发摄影器械租赁平台，使用Axure进行产品原型设计，通过Cursor AI辅助快速完成前后端开发。实现用户租赁流程、支付集成、库存管理等核心功能。",
    tags: ["Full Stack", "Cursor AI", "Axure", "Mini Program"],
    imagePlaceholderType: "people",
    // Theme: Photography Equipment - Camera Lens
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    details: [
      "设计工具：Axure RP (原型)",
      "开发工具：Cursor AI (Vibe Coding)",
      "核心模块：租赁流程、支付、库存管理"
    ]
  },
  {
    id: "n8n",
    title: "AI技术日报聚合与商业化",
    subtitle: "自动化工作流",
    meta: {
      tech: "Workflow",
      industry: "新闻",
      platform: "n8n"
    },
    description: "利用n8n构建AI技术日报生成系统，自动聚合资讯。已上架小红书并商业化。",
    fullDescription: "利用n8n自动化平台构建AI技术日报生成系统，自动聚合最新的AI行业资讯、技术突破和产品动态。通过工作流自动化提升内容生产效率，已成功上架小红书店铺并实现商业化，售出17份，验证了市场需求和商业价值。",
    tags: ["Automation", "n8n", "Commercialization"],
    imagePlaceholderType: "abstract",
    // Theme: Digital Newspaper/News - Digital Abstract or Paper
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop",
    details: [
      "商业成果：售出17份，验证MVP",
      "技术原理：RSS聚合 -> LLM总结 -> 自动排版",
      "平台：n8n, 小红书"
    ]
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "产品设计 (Product Design)",
    skills: ["Axure RP", "墨刀", "Figma", "Visio", "Xmind"]
  },
  {
    category: "AI工具 (AI Tools)",
    skills: ["Cursor", "Dify", "Midjourney", "Coze", "n8n"]
  },
  {
    category: "技术框架 (Tech Frameworks)",
    skills: ["RAG", "Workflow", "Agent", "Memory"]
  },
  {
    category: "数据分析 (Data Analysis)",
    skills: ["Python", "Tableau"]
  }
];

export const RADAR_DATA = [
  { subject: 'RAG', A: 4.8, fullMark: 5 },
  { subject: 'CoT', A: 4.4, fullMark: 5 },
  { subject: 'Agent', A: 4.5, fullMark: 5 },
  { subject: 'AIGC', A: 4.5, fullMark: 5 },
  { subject: 'Vibe Coding', A: 4.9, fullMark: 5 },
  { subject: 'Workflow', A: 4.8, fullMark: 5 },
];

export const TOOL_LOGOS = [
  { name: "Cursor", url: "https://logo.clearbit.com/cursor.sh" },
  { name: "Dify", url: "https://logo.clearbit.com/dify.ai" },
  { name: "Midjourney", url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Midjourney_Emblem.png" },
  { name: "Coze", url: "https://logo.clearbit.com/coze.com" },
  { name: "n8n", url: "https://logo.clearbit.com/n8n.io" },
  { name: "Figma", url: "https://logo.clearbit.com/figma.com" },
  { name: "Axure", url: "https://logo.clearbit.com/axure.com" },
  { name: "Python", url: "https://logo.clearbit.com/python.org" },
  { name: "Tableau", url: "https://logo.clearbit.com/tableau.com" }
];

export const AWARDS: AwardItem[] = [
  { title: "美国大学生数学建模大赛 H奖 (队长)" },
  { title: "“互联网+”大赛校二等奖" },
  { title: "校三好学生 (2020-2023)" },
  { title: "行业影响力：小红书AI知识博主 (阅读量1.5w+)" }
];

export const WHY_ME: ValueProp[] = [
  {
    title: "全面的AI产品能力",
    description: "具备从需求分析、架构设计到上线的0-1全流程经验。主导过美团Friday平台、理想RAG系统等多场景AI落地。",
    icon: Layout
  },
  {
    title: "技术与产品的完美结合",
    description: "CS硕士背景，精通Prompt与LLM应用开发。能用Cursor/Dify快速构建MVP，消除产研沟通壁垒。",
    icon: Cpu
  },
  {
    title: "商业化与ROI思维",
    description: "不仅关注功能，更重视业务价值。通过AI提效节省3.6万人时/年，个人项目实现商业化变现。",
    icon: TrendingUp
  },
  {
    title: "持续的行业影响力",
    description: "活跃的AI知识博主，快速捕捉前沿技术（CoT, Multi-Agent）并转化为实际产品生产力。",
    icon: Users
  }
];

export const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Liu Xinlin's (刘昕林) portfolio. You are helpful, professional, and knowledgeable about Liu's background.
Reply in the language the user asks in (mostly Chinese).

Name: Liu Xinlin (刘昕林)
Role: AI Product Manager (AI产品经理)
Education: MSc Computer Science (Glasgow), BEng (Chongqing Univ of Tech).
Experience:
1. Meituan (AI Platform PM): Built Friday platform 0-1, served 12 biz lines.
2. Li Auto (AI PM): Managed RAG system 50+ libs, improved recall to 80%+.
3. Honor (AIGC Engineer): Dify optimization, >90% generation accuracy.
4. Alibaba Cloud (Gov Model SA): RAG design for gov sectors.

Projects:
1. Ima Knowledge Base (RAG/Education)
2. Legal Simulator (CoT/Legal/Dify)
3. Financial Agent (Agent/Finance/Coze)
4. Logo Design (AIGC/Design/Midjourney)
5. Readdy Rental (Vibe Coding/Cursor)
6. Tech Daily News (Workflow/n8n)

Skills: RAG, Agents, Dify, Coze, Cursor, Python, Tableau, Figma.

Tone: Professional, enthusiastic about AI technology, and concise.
If asked about contact info, provide: 2213640433@qq.com.
`;
