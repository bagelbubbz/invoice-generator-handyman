export interface PresetJob {
  description: string;
  chinese: string;
  qty: string;
  price: number;
}

export interface PresetCategory {
  name: string;
  chinese: string;
  emoji: string;
  jobs: PresetJob[];
}

export const PRESET_CATEGORIES: PresetCategory[] = [
  {
    name: 'Plumbing',
    chinese: '水管维修',
    emoji: '🔧',
    jobs: [
      { description: 'Replace hot/cold water sink tap', chinese: '更换冷热水水龙头', qty: '1 Lot', price: 50 },
      { description: 'Supply & install tap head adaptor for washing machine water tap', chinese: '供应及安装洗衣机水龙头转接头', qty: '1 Lot', price: 30 },
      { description: 'Replace toilet flush valve / mechanism', chinese: '更换马桶冲水阀', qty: '1 Lot', price: 60 },
      { description: 'Replace shower head', chinese: '更换花洒头', qty: '1 Lot', price: 40 },
      { description: 'Replace toilet seat', chinese: '更换马桶座', qty: '1 Lot', price: 50 },
      { description: 'Repair leaking pipe / joint', chinese: '修理漏水管/接头', qty: '1 Lot', price: 80 },
      { description: 'Install storage water heater', chinese: '安装储水式热水器', qty: '1 Lot', price: 120 },
      { description: 'Install instant water heater', chinese: '安装即热式热水器', qty: '1 Lot', price: 100 },
      { description: 'Clear choked floor trap / drain', chinese: '疏通地漏/排水管', qty: '1 Lot', price: 60 },
      { description: 'Replace kitchen mixer tap', chinese: '更换厨房混合水龙头', qty: '1 Lot', price: 70 },
      { description: 'Replace basin tap', chinese: '更换洗脸盆水龙头', qty: '1 Lot', price: 50 },
      { description: 'Supply & install angle valve', chinese: '供应及安装角阀', qty: '1 Lot', price: 35 },
      { description: 'Silicon sealing (sink / basin)', chinese: '硅胶密封（水槽/洗脸盆）', qty: '1 Lot', price: 40 },
      { description: 'Supply & install bidet / bidet spray', chinese: '供应及安装洁身器/妇洗器', qty: '1 Lot', price: 60 },
      { description: 'Install bidet seat (electronic)', chinese: '安装电子洁身马桶盖', qty: '1 Lot', price: 80 },
    ],
  },
  {
    name: 'Carpentry & Fixtures',
    chinese: '木工及装置',
    emoji: '🪵',
    jobs: [
      { description: 'Supply & install clothes rod in toilet wall', chinese: '供应及安装浴室晾衣杆', qty: '1 Lot', price: 40 },
      { description: 'Supply & install curtain rod', chinese: '供应及安装窗帘杆', qty: '1 Lot', price: 50 },
      { description: 'Supply & install wooden shelf', chinese: '供应及安装木架', qty: '1 Lot', price: 60 },
      { description: 'Install towel bar / rack', chinese: '安装毛巾架', qty: '1 Lot', price: 30 },
      { description: 'Install toilet roll holder', chinese: '安装卷纸架', qty: '1 Lot', price: 25 },
      { description: 'Install door stopper', chinese: '安装门挡', qty: '1 Lot', price: 20 },
      { description: 'Repair / adjust cabinet hinge', chinese: '修理/调整橱柜铰链', qty: '1 Lot', price: 30 },
      { description: 'Replace door handle / knob', chinese: '更换门把手/门锁旋钮', qty: '1 Lot', price: 40 },
      { description: 'Replace door lock (mortise)', chinese: '更换门锁（锁芯）', qty: '1 Lot', price: 80 },
      { description: 'Replace gate lock', chinese: '更换铁门锁', qty: '1 Lot', price: 70 },
      { description: 'Install mirror', chinese: '安装镜子', qty: '1 Lot', price: 50 },
      { description: 'Assemble flat-pack furniture', chinese: '组装平板家具', qty: '1 Lot', price: 80 },
      { description: 'Repair wooden door (swollen / misaligned)', chinese: '修理木门（膨胀/错位）', qty: '1 Lot', price: 60 },
    ],
  },
  {
    name: 'Dismantling & Furniture',
    chinese: '拆除及家具',
    emoji: '🪚',
    jobs: [
      { description: 'Dismantle wardrobe', chinese: '拆除衣柜', qty: '1 Lot', price: 80 },
      { description: 'Dismantle cupboard / cabinet', chinese: '拆除橱柜', qty: '1 Lot', price: 60 },
      { description: 'Dismantle bed frame', chinese: '拆除床架', qty: '1 Lot', price: 60 },
      { description: 'Dismantle study / office desk', chinese: '拆除书桌/办公桌', qty: '1 Lot', price: 50 },
      { description: 'Dismantle shoe rack', chinese: '拆除鞋架', qty: '1 Lot', price: 40 },
      { description: 'Dismantle TV console', chinese: '拆除电视柜', qty: '1 Lot', price: 50 },
      { description: 'Repair / fix drawer (misaligned / stuck)', chinese: '修理/调整抽屉（错位/卡住）', qty: '1 Lot', price: 40 },
      { description: 'Replace drawer slides / runners', chinese: '更换抽屉滑轨', qty: '1 Lot', price: 50 },
      { description: 'Repair wardrobe door (misaligned / off track)', chinese: '修理衣柜门（错位/脱轨）', qty: '1 Lot', price: 50 },
      { description: 'Reassemble / relocate furniture', chinese: '重新组装/搬移家具', qty: '1 Lot', price: 80 },
      { description: 'Install wardrobe accessories (hooks / rails / shelves)', chinese: '安装衣柜配件（挂钩/横杆/层板）', qty: '1 Lot', price: 40 },
    ],
  },
  {
    name: 'Electrical — Basic',
    chinese: '基本电气维修',
    emoji: '💡',
    jobs: [
      { description: 'Replace ceiling light fixture', chinese: '更换天花板灯具', qty: '1 Lot', price: 60 },
      { description: 'Install ceiling fan', chinese: '安装吊扇', qty: '1 Lot', price: 80 },
      { description: 'Replace wall switch', chinese: '更换墙壁开关', qty: '1 Lot', price: 30 },
      { description: 'Replace power socket', chinese: '更换电源插座', qty: '1 Lot', price: 35 },
      { description: 'Replace doorbell', chinese: '更换门铃', qty: '1 Lot', price: 40 },
      { description: 'Install LED downlight', chinese: '安装LED筒灯', qty: '1 Lot', price: 50 },
      { description: 'Replace exhaust fan (toilet)', chinese: '更换浴室排气扇', qty: '1 Lot', price: 70 },
    ],
  },
  {
    name: 'General Repair & Finishing',
    chinese: '一般维修及装修',
    emoji: '🖌️',
    jobs: [
      { description: 'Wall patching (small hole)', chinese: '墙壁修补（小洞）', qty: '1 Lot', price: 40 },
      { description: 'Wall patching (large area)', chinese: '墙壁修补（大面积）', qty: '1 Lot', price: 80 },
      { description: 'Touch-up painting (per wall)', chinese: '局部补漆（每面墙）', qty: '1 Lot', price: 60 },
      { description: 'Silicon sealing (window / door frame)', chinese: '硅胶密封（窗框/门框）', qty: '1 Lot', price: 50 },
      { description: 'Grout repair (tiles)', chinese: '修补瓷砖填缝', qty: '1 Lot', price: 60 },
      { description: 'Re-stick loose floor tile', chinese: '重新粘贴松动地砖', qty: '1 Lot', price: 50 },
      { description: 'Adjust / repair sliding door track', chinese: '调整/修理推拉门轨道', qty: '1 Lot', price: 50 },
      { description: 'Adjust / repair window latch', chinese: '调整/修理窗户插销', qty: '1 Lot', price: 30 },
    ],
  },
  {
    name: 'Installation',
    chinese: '安装服务',
    emoji: '📺',
    jobs: [
      { description: 'TV wall mount installation (up to 55")', chinese: '电视壁挂安装（55寸以下）', qty: '1 Lot', price: 80 },
      { description: 'TV wall mount installation (56" and above)', chinese: '电视壁挂安装（56寸及以上）', qty: '1 Lot', price: 100 },
      { description: 'Install CCTV camera', chinese: '安装闭路电视摄像头', qty: '1 Unit', price: 60 },
      { description: 'Install gate / door access card reader', chinese: '安装门禁读卡器', qty: '1 Lot', price: 80 },
      { description: 'Install grab bar (elderly / bathroom)', chinese: '安装扶手杆（老人/浴室用）', qty: '1 Lot', price: 60 },
      { description: 'Install shower screen', chinese: '安装淋浴屏风', qty: '1 Lot', price: 120 },
      { description: 'Install water filter / purifier', chinese: '安装滤水器/净水器', qty: '1 Lot', price: 80 },
    ],
  },
  {
    name: 'Charges',
    chinese: '附加费用',
    emoji: '💰',
    jobs: [
      { description: 'Transportation charge', chinese: '交通费', qty: '1 Trip', price: 30 },
      { description: 'Labour charge', chinese: '人工费', qty: '1 Hour', price: 50 },
      { description: 'Supply of materials', chinese: '材料供应费', qty: '1 Lot', price: 0 },
      { description: 'Call-out / attendance fee', chinese: '上门服务费', qty: '1 Lot', price: 50 },
      { description: 'Weekend / public holiday surcharge', chinese: '周末/公共假日附加费', qty: '1 Lot', price: 30 },
      { description: 'Waiting time charge', chinese: '等候时间费', qty: '1 Hour', price: 30 },
    ],
  },
];
