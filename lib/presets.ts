export interface PresetJob {
  description: string;
  qty: string;
  price: number;
}

export interface PresetCategory {
  name: string;
  emoji: string;
  jobs: PresetJob[];
}

export const PRESET_CATEGORIES: PresetCategory[] = [
  {
    name: 'Plumbing',
    emoji: '🔧',
    jobs: [
      { description: 'Replace hot/cold water sink tap', qty: '1 Lot', price: 50 },
      { description: 'Supply & install tap head adaptor for washing machine water tap', qty: '1 Lot', price: 30 },
      { description: 'Replace toilet flush valve / mechanism', qty: '1 Lot', price: 60 },
      { description: 'Replace shower head', qty: '1 Lot', price: 40 },
      { description: 'Replace toilet seat', qty: '1 Lot', price: 50 },
      { description: 'Repair leaking pipe / joint', qty: '1 Lot', price: 80 },
      { description: 'Install storage water heater', qty: '1 Lot', price: 120 },
      { description: 'Install instant water heater', qty: '1 Lot', price: 100 },
      { description: 'Clear choked floor trap / drain', qty: '1 Lot', price: 60 },
      { description: 'Replace kitchen mixer tap', qty: '1 Lot', price: 70 },
      { description: 'Replace basin tap', qty: '1 Lot', price: 50 },
      { description: 'Supply & install angle valve', qty: '1 Lot', price: 35 },
      { description: 'Silicon sealing (sink / basin)', qty: '1 Lot', price: 40 },
    ],
  },
  {
    name: 'Carpentry & Fixtures',
    emoji: '🪵',
    jobs: [
      { description: 'Supply & install clothes rod in toilet wall', qty: '1 Lot', price: 40 },
      { description: 'Supply & install curtain rod', qty: '1 Lot', price: 50 },
      { description: 'Supply & install wooden shelf', qty: '1 Lot', price: 60 },
      { description: 'Install towel bar / rack', qty: '1 Lot', price: 30 },
      { description: 'Install toilet roll holder', qty: '1 Lot', price: 25 },
      { description: 'Install door stopper', qty: '1 Lot', price: 20 },
      { description: 'Repair / adjust cabinet hinge', qty: '1 Lot', price: 30 },
      { description: 'Replace door handle / knob', qty: '1 Lot', price: 40 },
      { description: 'Replace door lock (mortise)', qty: '1 Lot', price: 80 },
      { description: 'Replace gate lock', qty: '1 Lot', price: 70 },
      { description: 'Install mirror', qty: '1 Lot', price: 50 },
      { description: 'Assemble flat-pack furniture', qty: '1 Lot', price: 80 },
      { description: 'Repair wooden door (swollen / misaligned)', qty: '1 Lot', price: 60 },
    ],
  },
  {
    name: 'Electrical — Basic',
    emoji: '💡',
    jobs: [
      { description: 'Replace ceiling light fixture', qty: '1 Lot', price: 60 },
      { description: 'Install ceiling fan', qty: '1 Lot', price: 80 },
      { description: 'Replace wall switch', qty: '1 Lot', price: 30 },
      { description: 'Replace power socket', qty: '1 Lot', price: 35 },
      { description: 'Replace doorbell', qty: '1 Lot', price: 40 },
      { description: 'Install LED downlight', qty: '1 Lot', price: 50 },
      { description: 'Replace exhaust fan (toilet)', qty: '1 Lot', price: 70 },
    ],
  },
  {
    name: 'General Repair & Finishing',
    emoji: '🖌️',
    jobs: [
      { description: 'Wall patching (small hole)', qty: '1 Lot', price: 40 },
      { description: 'Wall patching (large area)', qty: '1 Lot', price: 80 },
      { description: 'Touch-up painting (per wall)', qty: '1 Lot', price: 60 },
      { description: 'Silicon sealing (window / door frame)', qty: '1 Lot', price: 50 },
      { description: 'Grout repair (tiles)', qty: '1 Lot', price: 60 },
      { description: 'Re-stick loose floor tile', qty: '1 Lot', price: 50 },
      { description: 'Adjust / repair sliding door track', qty: '1 Lot', price: 50 },
      { description: 'Adjust / repair window latch', qty: '1 Lot', price: 30 },
    ],
  },
  {
    name: 'Installation',
    emoji: '📺',
    jobs: [
      { description: 'TV wall mount installation (up to 55")', qty: '1 Lot', price: 80 },
      { description: 'TV wall mount installation (56" and above)', qty: '1 Lot', price: 100 },
      { description: 'Install CCTV camera', qty: '1 Unit', price: 60 },
      { description: 'Install gate / door access card reader', qty: '1 Lot', price: 80 },
      { description: 'Install grab bar (elderly / bathroom)', qty: '1 Lot', price: 60 },
      { description: 'Install shower screen', qty: '1 Lot', price: 120 },
      { description: 'Install water filter / purifier', qty: '1 Lot', price: 80 },
    ],
  },
  {
    name: 'Charges',
    emoji: '💰',
    jobs: [
      { description: 'Transportation charge', qty: '1 Trip', price: 30 },
      { description: 'Labour charge', qty: '1 Hour', price: 50 },
      { description: 'Supply of materials', qty: '1 Lot', price: 0 },
      { description: 'Call-out / attendance fee', qty: '1 Lot', price: 50 },
      { description: 'Weekend / public holiday surcharge', qty: '1 Lot', price: 30 },
      { description: 'Waiting time charge', qty: '1 Hour', price: 30 },
    ],
  },
];
