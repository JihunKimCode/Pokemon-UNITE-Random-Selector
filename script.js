/* Update Year */
const year = new Date().getFullYear();
document.getElementById('current-year').textContent = year;
document.getElementById('current-year2').textContent = year;
document.getElementById('current-year3').textContent = year;

const TYPE_COLOR = {
  attacker: 'var(--attacker)',
  defender: 'var(--defender)',
  speedster: 'var(--speedster)',
  supporter: 'var(--supporter)',
  'all-rounder': 'var(--all-rounder)'
};

let activeTypes = new Set(['attacker','defender','speedster','supporter','all-rounder']);

const grid = document.getElementById('grid');
const spotlight = document.getElementById('spotlight');
const stageImg = document.getElementById('stage-img');
const stageName = document.getElementById('stage-name');
const items = document.getElementById('items');
const heldItemEls = document.querySelectorAll('.held-items');
const battleItemEl = document.querySelector('.battle-items');
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");
const volumeLabel = document.getElementById("volume-label");

/* Preload all images and store in cache */
const imageCache = {};  // { 'charName': { roster: Image, stat: Image, cry: Audio } }

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
};

function getPokeApiName(uniteName) {
  return POKEAPI_NAME_MAP[uniteName] || uniteName;
}

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
    roster: "https://i.namu.wiki/i/GR9v8nme9U5IUWZ4PlN3UoM7DaqqXgXZ6Cc7DwbWhyKQ1LsrwgRsoy0jBH9hYz9JtxKShTBcUI13syjiRYZqOYIeSCKvMOojjkNfMEkRzRfLH-vxCimAiSNn3yAAF18rcaUnwcuJkEagRC3pyJ0otQ.webp",
    stat:   "https://archives.bulbagarden.net/media/upload/thumb/7/76/UNITE_Mega_Lucario.png/367px-UNITE_Mega_Lucario.png"
  },
  "mega-charizard-x": {
    roster: "https://i.namu.wiki/i/nccIKHxnGOmjng1cDhKSJ0TT_Cxcz4EqqX9luRC9Ff34MFHTcXh_3fCAk_xi9zIue_iOvLJx66_FJFfueTtY4Dv0PAWAQQFRkgkwZtVOV5kokUyH9sYi3NCd4D65Jh0SQQfQhgm8Ep94lK8Gdv3e2w.webp",
    stat:   "https://archives.bulbagarden.net/media/upload/2/25/UNITE_Mega_Charizard_X.png"
  },
  "mega-charizard-y": {
    roster: "https://i.namu.wiki/i/07b4JJjioy12TfBCb6Qm8x1rNNTTasz9KuRbHZsgB1qh0Tg7jZWlBLg4RllnYhndiJUcSjxLnW9FpjTZSmsSjpg110ncJocg9fOFtBrq054Zbmx8YXY_SPIcXYrVT7_k3419abN88oxAFV-JApVGXQ.webp",
    stat:   "https://archives.bulbagarden.net/media/upload/9/97/UNITE_Mega_Charizard_Y.png"
  },
  "mega-gyarados": {
    roster: "https://i.namu.wiki/i/Qx5vtOSNVyScOOnkcvVXMBVTVp7V3LJL1xU_492dEkJBPDI6t6oNUBgP8dTI-FLbzLjOrL__CgnkW0sXZB7mc0Emzb7hKbtrA85C9ufSoA-5S6PmXMg4nznmJDABylYDr5zOtwNM7MfCROSTz03DZA.webp",
    stat:   "https://archives.bulbagarden.net/media/upload/0/01/UNITE_Mega_Gyarados.png"
  },
  "meowth": { // Check official webpage later
    roster: "https://archives.bulbagarden.net/media/upload/0/08/UNITE_Meowth.png",  // update this later
    stat: "https://archives.bulbagarden.net/media/upload/0/08/UNITE_Meowth.png"
  }
};

function getImageSrc(pokemonName, type, fallback) {
  return IMAGE_SRC_EXCEPTIONS[pokemonName]?.[type] || fallback;
}

/*  FAST PARALLEL PRELOAD  */
async function preloadImages() {
  const cryPromises = [];

  for (const c of characters) {
    // Image cache 
    const name = c.name.toLowerCase();

    const defaultRoster = `https://unite.pokemon.com/images/pokemon/${name}/roster/roster-${name}.png`;
    const defaultStat   = `https://unite.pokemon.com/images/pokemon/${name}/stat/stat-${name}.png`;

    const rosterImg = new Image();
    rosterImg.src = getImageSrc(c.name, "roster", defaultRoster);

    const statImg = new Image();
    statImg.src = getImageSrc(c.name, "stat", defaultStat);

    imageCache[c.name] = {
      roster: rosterImg,
      stat: statImg,
      cry: null
    };

    // --- Fetch cry in parallel ---
    const apiName = getPokeApiName(c.name);
    const cryPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data.cries?.latest) {
          const audio = new Audio(data.cries.latest);
          audio.preload = 'auto';
          imageCache[c.name].cry = audio;
        }
      })
      .catch(() => {
        // Silent fail if no cry found
      });

    cryPromises.push(cryPromise);
  }

  // Wait for all cries without blocking images
  await Promise.allSettled(cryPromises);
}

/*  SYNC ROLE BUTTONS  */
function syncTypeButtons() {
  const buttons = document.querySelectorAll('.filters button');

  buttons.forEach(btn => {
    const type = btn.dataset.type;
    if (!TYPE_COLOR[type]) return; // Skip non-role buttons

    const typeChars = characters.filter(c => c.type === type);
    if (!typeChars.length) return;

    const hasEnabled = typeChars.some(c => c.enabled);

    btn.classList.toggle('active', hasEnabled);
  });
}

/*  RENDER GRID  */
function renderGrid() {
  grid.innerHTML = '';

  characters.forEach(c => {
    // ---------- TYPE FILTER ----------
    // if (!activeTypes.has(c.type)) return;

    // ---------- RANGE FILTER ----------
    if (activeRange !== 'all' && c.range !== activeRange) return;

    // ---------- DAMAGE TYPE FILTER ----------
    if (activeAttackType !== 'all' && c.attackType !== activeAttackType) return;

    const div = document.createElement('div');
    div.className = `character ${c.type}` + (c.enabled ? '' : ' disabled');
    div.style.background = "#19072d";

    const rosterSrc = imageCache[c.name]?.roster?.src || '';

    div.innerHTML = `
      <div class="character-image">
          <img src="${rosterSrc}" alt="${c.name}">
      </div>
      <div class="character-name">${c.name.toUpperCase().replace(/-/g, ' ')}</div>
    `;

    div.onclick = () => {
      c.enabled = !c.enabled;
      renderGrid();
    };

    grid.appendChild(div);
  });

  syncTypeButtons();
}

function pickUniqueItems(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function pickRandomSkills(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function attachTooltip(el, text) {
  el.onmouseenter = () => showTooltip(el, text);
}

// Randomly selected items + skills
function revealItemsAndSkills(finalPokemonName) {
  if (getComputedStyle(items).display === "none") {
    items.style.display = "flex";
  }

  const pokemonKey = finalPokemonName.toLowerCase().replace(/ /g, '-');

  /* ===== HELD ITEMS ===== */
  const fixedItem = FIXED_FIRST_HELD_ITEM[pokemonKey];

  let pool = HELD_ITEMS;
  if (fixedItem) pool = HELD_ITEMS.filter(i => i.name !== fixedItem.name);

  const picked = pickUniqueItems(pool, fixedItem ? 2 : 3);
  const finalHeld = fixedItem ? [fixedItem, ...picked] : picked;

  heldItemEls.forEach((el, i) => {
    el.src = finalHeld[i].src;
    el.alt = finalHeld[i].name;

    attachTooltip(el, finalHeld[i].name);
  });

  const finalBattle = BATTLE_ITEMS[Math.floor(Math.random() * BATTLE_ITEMS.length)];
  battleItemEl.src = finalBattle.src;
  battleItemEl.alt = finalBattle.name;

  attachTooltip(battleItemEl, finalBattle.name);

  /* ===== SKILLS ===== */
  const pokemon = skills.find(
    p => p.name.toLowerCase() === finalPokemonName.toLowerCase()
  );
  if (!pokemon) return;

  const skill1Pool = pokemon.skill1.split(',').map(s => s.trim());
  const skill2Pool = pokemon.skill2.split(',').map(s => s.trim());

  const pickedSkill1 = pickRandomSkills(skill1Pool);
  const pickedSkill2 = pickRandomSkills(skill2Pool);

  const skill1El = document.querySelector('.skill1');
  const skill2El = document.querySelector('.skill2');

  const pokemonNameKey = pokemon.name.toLowerCase().replace(/[- ]/g, '');
  const skill1Key = pickedSkill1.toLowerCase().replace(/[- ]/g, '');
  const skill2Key = pickedSkill2.toLowerCase().replace(/[- ]/g, '');

  skill1El.src = `https://www.serebii.net/pokemonunite/moves/${pokemonNameKey}${skill1Key}.png`;
  skill1El.alt = pickedSkill1;
  attachTooltip(skill1El, pickedSkill1);

  skill2El.src = `https://www.serebii.net/pokemonunite/moves/${pokemonNameKey}${skill2Key}.png`;
  skill2El.alt = pickedSkill2;
  attachTooltip(skill2El, pickedSkill2);
}

// Randomly selected pokemons
function randomPickSlotMachine() {
  const pool = characters.filter(c => 
    c.enabled &&
    activeTypes.has(c.type) &&
    (activeRange === 'all' || c.range === activeRange) &&
    (activeAttackType === 'all' || c.attackType === activeAttackType)
  );

  if (!pool.length) return alert('No characters available');

  let iterations = 20;
  let delay = 50;
  let current = 0;
  let finalPick = null;

  function roll() {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    finalPick = pick;

    stageImg.src = imageCache[pick.name]?.stat?.src || '';
    stageName.textContent = pick.name.toUpperCase().replace(/-/g, ' ');
    spotlight.style.background = TYPE_COLOR[pick.type];

    stageImg.style.transition = '';
    stageImg.style.transform = 'scale(1)';

    current++;
    delay *= 1.1;

    if (current < iterations) {
      setTimeout(roll, delay);
    } else {
      // Final Effect
      stageImg.style.transition = 'transform 0.2s';
      stageImg.style.transform = 'scale(1.1)';
      setTimeout(() => stageImg.style.transform = 'scale(1)', 300);

      // Cry with current slider volume
      const cry = imageCache[finalPick.name]?.cry;
      if (cry) {
        cry.currentTime = 0;
        cry.volume = volumeSlider.value;
        cry.play().catch(() => {});
      }

      // Randomly pick items AFTER Pokémon select
      revealItemsAndSkills(finalPick.name);
    }
  }

  roll();
}

let cryLastVolume = 1;

// Update icon based on volume
function updateCryVolumeIcon(volume) {
  volumeIcon.classList.remove(
    'fa-volume-high',
    'fa-volume-low',
    'fa-volume-off',
    'fa-volume-xmark'
  );

  if (volume === 0) {
    volumeIcon.classList.add('fa-volume-xmark');
  } else if (volume <= 0.3) {
    volumeIcon.classList.add('fa-volume-off');
  } else if (volume <= 0.8) {
    volumeIcon.classList.add('fa-volume-low');
  } else {
    volumeIcon.classList.add('fa-volume-high');
  }
}

// Adjust volume of a single cry
function setCryVolume(cry, volume) {
  if (cry) cry.volume = volume;
}

// Slider input event
volumeSlider.oninput = () => {
  const vol = parseFloat(volumeSlider.value); // 0 to 1
  cryLastVolume = vol;
  volumeLabel.textContent = `${Math.round(vol * 100)}%`;

  // Update icon
  updateCryVolumeIcon(vol);
};

// Click icon to mute/unmute
volumeIcon.style.cursor = 'pointer';
volumeIcon.addEventListener('click', () => {
  if (volumeSlider.value > 0) {
    cryLastVolume = volumeSlider.value;
    // Mute all cries
    for (const key in imageCache) {
      setCryVolume(imageCache[key]?.cry, 0);
    }
    volumeSlider.value = 0;
    volumeLabel.textContent = '0%';
  } else {
    // Restore previous volume
    for (const key in imageCache) {
      setCryVolume(imageCache[key]?.cry, 0.5); // default 50%
    }
    volumeSlider.value = cryLastVolume;
    volumeLabel.textContent = cryLastVolume*100+'%';
  }
  updateCryVolumeIcon(volumeSlider.value);
});

/* Tooltip for save/load state */
function showTooltip(btn, text) {
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.textContent = text;

  document.body.appendChild(tip);

  const rect = btn.getBoundingClientRect();
  tip.style.left = rect.left + rect.width / 2 + 'px';
  tip.style.top = rect.top + window.scrollY - 8 + 'px';

  requestAnimationFrame(() => tip.classList.add('show'));

  setTimeout(() => {
    tip.classList.remove('show');
    setTimeout(() => tip.remove(), 150);
  }, 1200);
}

/* SORT & FILTER */
const rangeOptions = ['all', 'melee', 'ranged'];
const attackOptions = ['all', 'physical', 'special'];

let activeRange = 'all';
let activeAttackType = 'all';

const rangeBtn = document.getElementById('range-btn');
const attackBtn = document.getElementById('attack-btn');

const originalCharacters = [...characters]; // keep original order
let sortedAZ = false;

const STORAGE_KEY = 'pokemon_enabled_state';

document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = () => {
    const type = btn.dataset.type;

    // TOGGLE RANGE
    if (btn.id === 'range-btn') {
      const currentIndex = rangeOptions.indexOf(activeRange);
      activeRange = rangeOptions[(currentIndex + 1) % rangeOptions.length];
      btn.dataset.range = activeRange;
      btn.textContent = `Range: ${activeRange.charAt(0).toUpperCase() + activeRange.slice(1)}`;
      renderGrid();
      return;
    }

    // TOGGLE ATTACK TYPE
    if (btn.id === 'attack-btn') {
      const currentIndex = attackOptions.indexOf(activeAttackType);
      activeAttackType = attackOptions[(currentIndex + 1) % attackOptions.length];
      btn.dataset.attack = activeAttackType;
      btn.textContent = `Type: ${activeAttackType.charAt(0).toUpperCase() + activeAttackType.slice(1)}`;
      renderGrid();
      return;
    }

    /* SAVE STATE */
    if (type === 'save') {
      const state = {};
      characters.forEach(c => state[c.name] = c.enabled);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showTooltip(btn, 'State Saved');
      return;
    }

    /* LOAD STATE */
    if (type === 'load') {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        showTooltip(btn, 'No Saved State');
        return;
      }

      try {
        const state = JSON.parse(raw);
        characters.forEach(c => {
          if (state.hasOwnProperty(c.name)) c.enabled = state[c.name];
        });
        renderGrid();
        syncTypeButtons();
        showTooltip(btn, 'State Loaded');
      } catch {
        showTooltip(btn, 'Load Failed');
      }
      return;
    }

    /* ENABLE ALL */
    if (type === 'enable') {
      characters.forEach(c => c.enabled = true);
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable','disable','sort','save','load'].includes(b.dataset.type) && !['range-btn','attack-btn'].includes(b.id)) {
          b.classList.add('active');
        }
      });
    }

    /* DISABLE ALL */
    else if (type === 'disable') {
      characters.forEach(c => c.enabled = false);
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable','disable','sort','save','load'].includes(b.dataset.type) && !['range-btn','attack-btn'].includes(b.id)) {
          b.classList.remove('active');
        }
      });
    }

    /* SORT */
    else if (type === 'sort') {
      if (!sortedAZ) {
        characters.sort((a, b) => a.name.localeCompare(b.name));
        btn.textContent = 'Sort by Release';
      } else {
        characters.splice(0, characters.length, ...originalCharacters);
        btn.textContent = 'Sort A-Z';
      }
      sortedAZ = !sortedAZ;
    }

    /* TYPE FILTERS (attacker/defender/etc) */
    else if (['attacker','defender','speedster','supporter','all-rounder'].includes(type)) {
      const isActive = btn.classList.contains('active');
      characters.forEach(c => {
        if (c.type === type) c.enabled = !isActive;
      });
      btn.classList.toggle('active');
    }

    renderGrid();
  };
});

/*  RANDOM BUTTON  */
document.getElementById('random-btn').onclick = randomPickSlotMachine;

/*  INITIALIZE  */
preloadImages().then(() => renderGrid());
renderGrid(); // render immediately while cries load
