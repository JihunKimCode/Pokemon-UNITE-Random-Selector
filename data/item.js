const FIXED_FIRST_HELD_ITEM = {
  'zacian': {
    name: 'Rusted Sword',
    src: 'https://archives.bulbagarden.net/media/upload/4/41/UNITE_Rusted_Sword.png'
  },
  'mega-mewtwo-x': {
    name: 'Mewtwonite X',
    src: 'https://archives.bulbagarden.net/media/upload/3/3c/UNITE_Mewtwonite_X.png'
  },
  'mega-mewtwo-y': {
    name: 'Mewtwonite Y',
    src: 'https://archives.bulbagarden.net/media/upload/8/83/UNITE_Mewtwonite_Y.png'
  },
  'mega-lucario': {
    name: 'Lucarionite',
    src: 'https://archives.bulbagarden.net/media/upload/f/fb/UNITE_Lucarionite.png'
  },
  'mega-charizard-x': {
    name: 'Charizardite X',
    src: 'https://archives.bulbagarden.net/media/upload/e/e6/UNITE_Charizardite_X.png'
  },
  'mega-gyarados': {
    name: 'Gyaradosite',
    src: 'https://bulbapedia.bulbagarden.net/wiki/File:UNITE_Gyaradosite.png'
  },
  'mega-charizard-y': {
    name: 'Charizardite Y',
    src: 'https://archives.bulbagarden.net/media/upload/6/60/UNITE_Charizardite_Y.png'
  },
};

const HELD_ITEMS = [
  { name: 'Aeos Cookie', src:'https://archives.bulbagarden.net/media/upload/b/bb/UNITE_Aeos_Cookie.png'},
  { name: 'Attack Weight', src:'https://archives.bulbagarden.net/media/upload/7/74/UNITE_Attack_Weight.png'},
  { name: 'Special Attack Specs', src:'https://archives.bulbagarden.net/media/upload/9/9d/UNITE_Special_Attack_Specs.png'},
  { name: 'Shell Bell', src:'https://archives.bulbagarden.net/media/upload/6/66/UNITE_Shell_Bell.png'},
  { name: 'Float Stone', src:'https://archives.bulbagarden.net/media/upload/3/38/UNITE_Float_Stone.png'},
  { name: 'Muscle Band', src:'https://archives.bulbagarden.net/media/upload/4/43/UNITE_Muscle_Band.png'},
  { name: 'Scope Lens', src:'https://archives.bulbagarden.net/media/upload/c/c3/UNITE_Scope_Lens.png'},
  { name: 'Wise Glasses', src:'https://archives.bulbagarden.net/media/upload/6/61/UNITE_Wise_Glasses.png'},
  { name: 'Leftovers', src:'https://archives.bulbagarden.net/media/upload/2/25/UNITE_Leftovers.png'},
  { name: 'Exp Share', src:'https://archives.bulbagarden.net/media/upload/3/30/UNITE_Exp_Share.png'},
  { name: 'Focus Band', src:'https://archives.bulbagarden.net/media/upload/e/e0/UNITE_Focus_Band.png'},
  { name: 'Energy Amplifier', src:'https://archives.bulbagarden.net/media/upload/5/53/UNITE_Energy_Amplifier.png'},
  { name: 'Buddy Barrier', src:'https://archives.bulbagarden.net/media/upload/2/2d/UNITE_Buddy_Barrier.png'},
  { name: 'Score Shield', src:'https://archives.bulbagarden.net/media/upload/6/6f/UNITE_Score_Shield.png'},
  { name: 'Assault Vest', src:'https://archives.bulbagarden.net/media/upload/f/fa/UNITE_Assault_Vest.png'},
  { name: 'Rocky Helmet', src:'https://archives.bulbagarden.net/media/upload/c/c1/UNITE_Rocky_Helmet.png'},
  { name: 'Razor Claw', src:'https://archives.bulbagarden.net/media/upload/1/1a/UNITE_Razor_Claw.png'},
  { name: 'Choice Specs', src:'https://archives.bulbagarden.net/media/upload/a/a5/UNITE_Choice_Specs.png'},
  { name: 'Weakness Policy', src:'https://archives.bulbagarden.net/media/upload/1/1a/UNITE_Weakness_Policy.png'},
  { name: 'Rapid-Fire Scarf', src:'https://archives.bulbagarden.net/media/upload/0/0d/UNITE_Rapid_Fire_Scarf.png'},
  { name: 'Drain Crown', src:'https://archives.bulbagarden.net/media/upload/3/34/UNITE_Drain_Crown.png'},
  { name: 'Slick Spoon', src:'https://archives.bulbagarden.net/media/upload/2/29/UNITE_Slick_Spoon.png'},
  { name: 'Rescue Hood', src:'https://archives.bulbagarden.net/media/upload/1/1b/UNITE_Rescue_Hood.png'},
  { name: 'Curse Bangle', src:'https://archives.bulbagarden.net/media/upload/f/ff/UNITE_Curse_Bangle.png'},
  { name: 'Curse Incense', src:'https://archives.bulbagarden.net/media/upload/8/83/UNITE_Curse_Incense.png'},
  { name: 'Charging Charm', src:'https://archives.bulbagarden.net/media/upload/0/08/UNITE_Charging_Charm.png'},
  { name: 'Resonant Guard', src:'https://archives.bulbagarden.net/media/upload/d/d5/UNITE_Resonant_Guard.png'},
  { name: 'Drive Lens', src:'https://archives.bulbagarden.net/media/upload/d/de/UNITE_Drive_Lens.png'},
  { name: 'Accel Bracer', src:'https://archives.bulbagarden.net/media/upload/1/1e/UNITE_Accel_Bracer.png'},
  { name: 'Amulet Coin', src:'https://archives.bulbagarden.net/media/upload/3/3b/UNITE_Amulet_Coin.png'},
  { name: 'Choice Scarf', src:'https://archives.bulbagarden.net/media/upload/2/2f/UNITE_Choice_Scarf.png'},
  { name: 'Big Root', src:'https://archives.bulbagarden.net/media/upload/1/15/UNITE_Big_Root.png'},
  { name: 'Tenacity Belt', src:'https://archives.bulbagarden.net/media/upload/b/b9/UNITE_Tenacity_Belt.png'},
]

const BATTLE_ITEMS = [
  { name: 'Potion', src: 'https://archives.bulbagarden.net/media/upload/d/d4/UNITE_Potion.png' },
  { name: 'X Attack', src: 'https://archives.bulbagarden.net/media/upload/c/c5/UNITE_X_Attack.png'},
  { name: 'X Speed', src: 'https://archives.bulbagarden.net/media/upload/f/f7/UNITE_X_Speed.png'},
  { name: 'Fluffy Tail', src: 'https://archives.bulbagarden.net/media/upload/2/29/UNITE_Fluffy_Tail.png'},
  { name: 'Eject Button', src: 'https://archives.bulbagarden.net/media/upload/0/09/UNITE_Eject_Button.png'},
  { name: 'Slow Smoke', src: 'https://archives.bulbagarden.net/media/upload/e/eb/UNITE_Slow_Smoke.png'},
  { name: 'Full Heal', src: 'https://archives.bulbagarden.net/media/upload/d/d3/UNITE_Full_Heal.png'},
  { name: 'Goal-Getter', src: 'https://archives.bulbagarden.net/media/upload/5/5c/UNITE_Goal-Getter.png'},
  { name: 'Shedinja Doll', src: 'https://archives.bulbagarden.net/media/upload/1/1f/UNITE_Shedinja_Doll.png'},
  { name: 'Goal Hacker', src: 'https://archives.bulbagarden.net/media/upload/3/33/UNITE_Goal_Hacker.png'},
];
