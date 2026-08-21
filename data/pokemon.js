const POKEAPI_NAME_MAP = {
  // UNITE → PokéAPI
  'mega-mewtwo-x': 'mewtwo-mega-x',
  'mega-mewtwo-y': 'mewtwo-mega-y',
  'mega-lucario': 'lucario-mega',
  'mega-charizard-x': 'charizard-mega-x',
  'mega-charizard-y': 'charizard-mega-y',
  'mega-gyarados': 'gyarados-mega',
  'alolan-ninetales': 'ninetales-alola',
  'aegislash': 'aegislash-blade',
  'urshifu': 'urshifu-rapid-strike',
  'mimikyu': 'mimikyu-disguised',
  'galarian-rapidash': 'rapidash-galar',
  'alolan-raichu': 'raichu-alola',
  "sirfetch'd": 'sirfetchd',
};

/* Exceptions to default image sources */
const IMAGE_SRC_EXCEPTIONS = {
  "mega-mewtwo-x": {
    roster: "https://unite.pokemon.com/images/pokemon/mewtwo/roster/roster-mewtwo.png",
    stat:   "https://unite.pokemon.com/images/pokemon/mewtwo/stat/stat-mewtwo.png"
  },
  "mega-mewtwo-y": {
    roster: "https://unite.pokemon.com/images/pokemon/mewtwo/roster/roster-mewtwo.png",
    stat:   "https://unite.pokemon.com/images/pokemon/mewtwo/stat/stat-mewtwo.png"
  },
  "mega-lucario": {
    class: "lucario",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Mega-Lucario.png",
    stat:   "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2025/09/29/inline/01.png"
  },
  "mega-charizard-x": {
    class:"charizardx",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Mega-Charizard-X.png",
    stat:   "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2025/10/24/inline/01.png"
  },
  "mega-charizard-y": {
    class: "charizardy",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Mega-Charizard-Y.png",
    stat:   "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2025/12/19/inline/01.png"
  },
  "mega-gyarados": {
    class: "gyarados",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Mega-Gyarados.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Mega-Gyarados.png"
  },
  "meowth": {
    class: "meowth",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Meowth.png",
    stat: "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2026/01/09/inline/01.png"
  },
  "sirfetch'd" : {
    class: "sirfetchd",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Sirfetchd-1.png",
    stat: "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2026/02/06/inline/01.png"
  },
  "zapdos" : {
    class: "zapdos",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Zapdos.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Zapdos.png"
  },
  "moltres" : {
    class: "moltres",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/moltres.png",
    stat:   "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2026/03/13/inline/01.png"
  },
  "articuno" : {
    class: "articuno",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/articuno.png",
    stat:   "https://www.pokemon.com/static-assets/content-assets/cms2/img/video-games/_tiles/pokemon-unite/2026/04/03/inline/01.png"
  },
  "typhlosion" : {
    class: "typhlosion",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Typhlosion.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Typhlosion.png"
  },
  "feraligatr" : {
    class: "feraligatr",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Feraligatr.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Feraligatr.png"
  },  
  "meganium" : {
    class: "meganium",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Meganium.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Meganium.png"
  },  
  "skeledirge" : {
    class: "skeledirge",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Skeledirge.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Skeledirge.png"
  },  
  "quaquaval" : {
    class: "quaquaval",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Quaquaval.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Quaquaval.png"
  },  
  "yveltal" : {
    class: "yveltal",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Yveltal.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Yveltal.png"
  },  
  "palkia" : {
    class: "palkia",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Palkia.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Palkia.png"
  },
  "reshiram" : {
    class: "reshiram",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Reshiram.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Reshiram.png"
  },
  "solgaleo" : {
    class: "solgaleo",
    roster: "https://www.pokemonunite.jp/wp-content/uploads/Solgaleo.png",
    stat:   "https://www.pokemonunite.jp/wp-content/uploads/Solgaleo.png"
  }
};

const characters = [
    {
        "name": "solgaleo",
        "type": "all-rounder",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Iron Head",
        "skill2": "Psyshock"
    },
    {
        "name": "reshiram",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Dragon Dance",
        "skill2": "Blue Flare"
    },
    {
        "name": "palkia",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Aura Sphere",
        "skill2": "Dragon Claw"
    },
    {
        "name": "yveltal",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Oblivion Wing",
        "skill2": "Dark Pulse"
    },
    {
        "name": "quaquaval",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Low Sweep",
        "skill2": "Liquidation"
    },
    {
        "name": "skeledirge",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Hyper Voice",
        "skill2": "Snarl"
    },
    {
        "name": "meganium",
        "type": "supporter",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Grass Knot",
        "skill2": "Petal Blizzard"
    },
    {
        "name": "feraligatr",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Crunch",
        "skill2": "Waterfall"
    },
    {
        "name": "typhlosion",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Eruption",
        "skill2": "Flame Wheel"
    },
    {
        "name": "articuno",
        "type": "defender",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Blizzard",
        "skill2": "Ice Beam"
      },
      {
        "name": "moltres",
        "type": "all-rounder",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Sky Attack",
        "skill2": "Heat Wave"
      },
      {
        "name": "zapdos",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Thunderbolt",
        "skill2": "Zap Cannon"
      },
      {
        "name": "sirfetch'd",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Fury Cutter, Leaf Blade",
        "skill2": "Brutal Swing, Detect"
    },
    {
        "name": "meowth",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Pay Day, Fury Swipes",
        "skill2": "Feint Attack, Assurance"
    },
    {
        "name": "mega-charizard-y",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flamethrower",
        "skill2": "Fire Blast"
    },
    {
        "name": "mega-gyarados",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dragon Breath",
        "skill2": "Waterfall"
    },
    {
        "name": "vaporeon",
        "type": "defender",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Hydro Pump, Muddy Water",
        "skill2": "Aqua Ring, Flip Turn"
    },
    {
        "name": "dhelmise",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Power Whip, Whirlpool",
        "skill2": "Anchor Shot, Heavy Slam"
    },
    {
        "name": "mega-charizard-x",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Fire Punch",
        "skill2": "Flare Blitz"
    },
    {
        "name": "mega-lucario",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Power-Up Punch",
        "skill2": "Close Combat"
    },
    {
        "name": "empoleon",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Hydro Cannon, Whirlpool",
        "skill2": "Metal Claw, Aqua Jet"
    },
    {
        "name": "pawmot",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Thunder Punch, Supercell Slam",
        "skill2": "Volt Switch, Mach Punch"
    },
    {
        "name": "latias",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Mist Ball, Dragon Cheer",
        "skill2": "Dragon Pulse, Dragon Breath"
    },
    {
        "name": "latios",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Luster Purge, Telekinesis",
        "skill2": "Dragon Pulse, Draco Meteor"
    },
    {
        "name": "alcremie",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Decorate, Recover",
        "skill2": "Dazzling Gleam, Sweet Scent"
    },
    {
        "name": "alolan-raichu",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Stored Power, Electro Ball",
        "skill2": "Thunderbolt, Psychic"
    },
    {
        "name": "suicune",
        "type": "all-rounder",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Whirlpool, Surf",
        "skill2": "Ice Beam, Icy Wind"
    },
    {
        "name": "galarian-rapidash",
        "type": "speedster",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Dazzling Gleam, Fairy Wind",
        "skill2": "Smart Strike, Agility"
    },
    {
        "name": "tinkaton",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Gigaton Hammer, Smack Down",
        "skill2": "Ice Hammer, Thief"
    },
    {
        "name": "psyduck",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Surf, Bubble Beam",
        "skill2": "Disable, Psychic"
    },
    {
        "name": "darkrai",
        "type": "speedster",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Dark Void, Shadow Claw",
        "skill2": "Nasty Plot, Dark Pulse"
    },
    {
        "name": "armarouge",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Fire Spin, Armor Cannon",
        "skill2": "Flame Charge, Psyshock"
    },
    {
        "name": "ho-oh",
        "type": "defender",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flamethrower, Sky Attack",
        "skill2": "Sacred Fire, Fire Spin"
    },
    {
        "name": "ceruledge",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Bitter Blade, Psycho Cut",
        "skill2": "Phantom Force, Flame Charge"
    },
    {
        "name": "falinks",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Megahorn, Iron Head",
        "skill2": "No Retreat, Beat Up"
    },
    {
        "name": "miraidon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Charge Beam, Electro Drift",
        "skill2": "Thunder, Parabolic Charge"
    },
    {
        "name": "gyarados",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dragon Breath, Aqua Tail",
        "skill2": "Waterfall, Bounce"
    },
    {
        "name": "metagross",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Meteor Mash, Gyro Ball",
        "skill2": "Zen Headbutt, Magnet Rise"
    },
    {
        "name": "meowscarada",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flower Trick, Night Slash",
        "skill2": "Double Team, Trailblaze"
    },
    {
        "name": "mimikyu",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Play Rough, Shadow Claw",
        "skill2": "Shadow Sneak, Trick Room"
    },
    {
        "name": "blaziken",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Fire Punch, Blaze Kick",
        "skill2": "Ember, Focus Blast"
    },
    {
        "name": "mega-mewtwo-y",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Future Sight, Psystrike",
        "skill2": "Recover, Teleport"
    },
    {
        "name": "mega-mewtwo-x",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Future Sight, Psystrike",
        "skill2": "Recover, Teleport"
    },
    {
        "name": "inteleon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Fell Stinger, Acrobatics",
        "skill2": "Snipe Shot, Liquidation"
    },
    {
        "name": "leafeon",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Razor Leaf, Solar Blade",
        "skill2": "Aerial Ace, Leaf Blade"
    },
    {
        "name": "umbreon",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Mean Look, Foul Play",
        "skill2": "Wish, Snarl"
    },
    {
        "name": "chandelure",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Flamethrower, Overheat",
        "skill2": "Poltergeist, Imprison"
    },
    {
        "name": "lapras",
        "type": "defender",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Water Pulse, Perish Song",
        "skill2": "Bubble Beam, Ice Beam"
    },
    {
        "name": "goodra",
        "type": "defender",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Muddy Water, Dragon Pulse",
        "skill2": "Power Whip, Acid Spray"
    },
    {
        "name": "zacian",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Metal Claw, Sacred Sword",
        "skill2": "Agility, Play Rough"
    },
    {
        "name": "comfey",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Floral Healing, Sweet Kiss",
        "skill2": "Magical Leaf, Grass Knot"
    },
    {
        "name": "dragapult",
        "type": "attacker",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dragon Breath, Shadow Ball",
        "skill2": "Dragon Dance, Phantom Force"
    },
    {
        "name": "urshifu",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Wicked Blow, Surging Strikes",
        "skill2": "Throat Chop, Liquidation"
    },
    {
        "name": "sableye",
        "type": "supporter",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Knock Off, Shadow Sneak",
        "skill2": "Feint Attack, Confuse Ray"
    },
    {
        "name": "zoroark",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Shadow Claw, Cut",
        "skill2": "Night Slash, Feint Attack"
    },
    {
        "name": "clefable",
        "type": "supporter",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Moonlight, Draining Kiss",
        "skill2": "Gravity, Follow Me"
    },
    {
        "name": "scizor",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dual Wingbeat, Bullet Punch",
        "skill2": "Double Hit (Scyther), Swords Dance (Scyther)"
    },
    {
        "name": "dodrio",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Tri Attack, Drill Peck",
        "skill2": "Agility, Jump Kick"
    },
    {
        "name": "mew",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Electro Ball, Solar Beam, Surf",
        "skill2": "Coaching, Light Screen, Agility"
    },
    {
        "name": "tyranitar",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dark Pulse, Stone Edge",
        "skill2": "Ancient Power, Sand Tomb"
    },
    {
        "name": "buzzwole",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Lunge, Smack Down",
        "skill2": "Leech Life, Superpower"
    },
    {
        "name": "glaceon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Icicle Spear, Icy Wind",
        "skill2": "Ice Shard, Freeze-Dry"
    },
    {
        "name": "delphox",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Fire Blast, Mystical Fire",
        "skill2": "Fire Spin, Flame Charge"
    },
    {
        "name": "espeon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Psyshock, Stored Power",
        "skill2": "Psybeam, Future Sight"
    },
    {
        "name": "azumarill",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Whirlpool, Aqua Tail",
        "skill2": "Water Pulse, Tackle"
    },
    {
        "name": "duraludon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flash Cannon, Dragon Pulse",
        "skill2": "Dragon Tail, Stealth Rock"
    },
    {
        "name": "hoopa",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Hyperspace Hole, Trick",
        "skill2": "Phantom Force, Shadow Ball"
    },
    {
        "name": "aegislash",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Sacred Sword, Shadow Claw",
        "skill2": "Wide Guard, Iron Head"
    },
    {
        "name": "trevenant",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Wood Hammer, Curse",
        "skill2": "Horn Leech, Pain Split"
    },
    {
        "name": "dragonite",
        "type": "all-rounder",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dragon Dance, Extreme Speed",
        "skill2": "Hyper Beam, Outrage"
    },
    {
        "name": "tsareena",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Triple Axel, Stomp",
        "skill2": "Trop Kick, Grassy Glide"
    },
    {
        "name": "decidueye",
        "type": "attacker",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Razor Leaf, Spirit Shackle",
        "skill2": "Leaf Storm, Shadow Sneak"
    },
    {
        "name": "greedent",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Bullet Seed, Belch",
        "skill2": "Stuff Cheeks, Covet"
    },
    {
        "name": "sylveon",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Mystical Fire, Hyper Voice",
        "skill2": "Draining Kiss, Calm Mind"
    },
    {
        "name": "mamoswine",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Icicle Crash, Ice Fang",
        "skill2": "High Horsepower, Earthquake"
    },
    {
        "name": "blastoise",
        "type": "defender",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Hydro Pump, Water Spout",
        "skill2": "Surf, Rapid Spin"
    },
    {
        "name": "blissey",
        "type": "supporter",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Egg Bomb, Helping Hand",
        "skill2": "Soft-Boiled, Safeguard"
    },
    {
        "name": "gardevoir",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Psychic, Moonblast",
        "skill2": "Psyshock, Future Sight"
    },
    {
        "name": "zeraora",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Volt Switch, Spark",
        "skill2": "Discharge, Wild Charge"
    },
    {
        "name": "pikachu",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Electro Ball, Thunder",
        "skill2": "Volt Tackle, Thunderbolt"
    },
    {
        "name": "charizard",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flamethrower, Fire Punch",
        "skill2": "Fire Blast, Flare Blitz"
    },
    {
        "name": "snorlax",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Heavy Slam, Flail",
        "skill2": "Block, Yawn"
    },
    {
        "name": "crustle",
        "type": "defender",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Rock Tomb, Shell Smash",
        "skill2": "Stealth Rock, X-Scissor"
    },
    {
        "name": "greninja",
        "type": "attacker",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Water Shuriken, Surf",
        "skill2": "Double Team, Smokescreen"
    },
    {
        "name": "eldegoss",
        "type": "supporter",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Pollen Puff, Leaf Tornado",
        "skill2": "Cotton Guard, Cotton Spore"
    },
    {
        "name": "talonflame",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Flame Charge, Aerial Ace",
        "skill2": "Fly, Brave Bird"
    },
    {
        "name": "lucario",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Extreme Speed, Power-Up Punch",
        "skill2": "Bone Rush, Close Combat"
    },
    {
        "name": "venusaur",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Sludge Bomb, Giga Drain",
        "skill2": "Solar Beam, Petal Dance"
    },
    {
        "name": "mr-mime",
        "type": "supporter",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Confusion, Psychic",
        "skill2": "Barrier, Guard Swap"
    },
    {
        "name": "slowbro",
        "type": "defender",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Scald, Surf",
        "skill2": "Amnesia, Telekinesis"
    },
    {
        "name": "absol",
        "type": "speedster",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Night Slash, Pursuit",
        "skill2": "Psycho Cut, Sucker Punch"
    },
    {
        "name": "machamp",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Close Combat, Cross Chop",
        "skill2": "Dynamic Punch, Submission"
    },
    {
        "name": "wigglytuff",
        "type": "supporter",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Double Slap, Dazzling Gleam",
        "skill2": "Rollout, Sing"
    },
    {
        "name": "alolan-ninetales",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Avalanche, Dazzling Gleam",
        "skill2": "Blizzard, Aurora Veil"
    },
    {
        "name": "cramorant",
        "type": "attacker",
        "range": "ranged",
        "attackType": "special",
        "enabled": true,
        "skill1": "Surf, Dive",
        "skill2": "Hurricane, Air Slash"
    },
    {
        "name": "gengar",
        "type": "speedster",
        "range": "melee",
        "attackType": "special",
        "enabled": true,
        "skill1": "Shadow Ball, Sludge Bomb",
        "skill2": "Dream Eater, Hex"
    },
    {
        "name": "garchomp",
        "type": "all-rounder",
        "range": "melee",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Dig, Dragon Rush",
        "skill2": "Earthquake, Dragon Claw"
    },
    {
        "name": "cinderace",
        "type": "attacker",
        "range": "ranged",
        "attackType": "physical",
        "enabled": true,
        "skill1": "Pyro Ball, Blaze Kick",
        "skill2": "Flame Charge, Feint"
    }
]