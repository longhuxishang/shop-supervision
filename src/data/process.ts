import type { ProcessStep } from "@/types/site";

export const process: ProcessStep[] = [
  {
    id: 1,
    title: "发现取证",
    status: "done",
    desc: "业主现场实拍，对照规划图纸与售楼处公示楼盘表，整理违建范围与面积。",
  },
  {
    id: 2,
    title: "楼栋通报",
    status: "done",
    desc: "形成《商铺违规加建情况通报》，转发各楼栋群。",
  },
  {
    id: 3,
    title: "与社区沟通",
    status: "done",
    desc: "9 月 20 日与社区沟通。物业称商家钻空子，在尚未交付、不归物业管时浇筑楼顶；社区表示将调查取证。",
  },
  {
    id: 4,
    title: "质询物业",
    status: "active",
    desc: "要求物业书面说明何时知情、当时做了什么、为什么没有提前告知业主。",
  },
  {
    id: 5,
    title: "部门反映",
    status: "active",
    desc: "通过 12345、城管、住建、消防、规划等渠道依法反映。",
  },
  {
    id: 6,
    title: "停工查处",
    status: "pending",
    desc: "请主管部门依法核查；处理结果向业主公开。",
  },
  {
    id: 7,
    title: "恢复原状",
    status: "pending",
    desc: "拆掉加建部分，封堵私自开设的窗洞，还原外墙、屋面与装饰条。",
  },
  {
    id: 8,
    title: "持续监督",
    status: "active",
    desc: "邻居拍照、整改公示整理在册，在本站公布。",
  },
];
