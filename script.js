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

/* Preload all images and store in cache */
const imageCache = {};  // { 'charName': { roster: Image, stat: Image, cry: Audio } }

const POKEAPI_NAME_MAP = {
  // UNITE → PokéAPI
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

/*  FAST PARALLEL PRELOAD  */
async function preloadImages() {
  const cryPromises = [];

  for (const c of characters) {
    // Image cache 
    const rosterImg = new Image();
    rosterImg.src = `https://unite.pokemon.com/images/pokemon/${c.name}/roster/roster-${c.name}.png`;

    const statImg = new Image();
    statImg.src = `https://unite.pokemon.com/images/pokemon/${c.name}/stat/stat-${c.name}.png`;

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

/*  RENDER GRID  */
function renderGrid() {
  grid.innerHTML = '';

  characters.forEach(c => {
    if (!activeTypes.has(c.type)) return;

    const div = document.createElement('div');
    div.className = `character ${c.type}` + (c.enabled ? '' : ' disabled');
    div.style.background = "#19072d";

    // Safe roster access
    const rosterSrc = imageCache[c.name]?.roster?.src || '';

    div.innerHTML = `
      <div class="character-image">
          <img src="${rosterSrc}" alt="${c.name}">
      </div>
      <div class="character-name">${c.name.toUpperCase()}</div>
    `;

    div.onclick = () => {
      c.enabled = !c.enabled;
      renderGrid();
    };

    grid.appendChild(div);
  });
}

/*  RANDOM PICK SLOT MACHINE  */
function randomPickSlotMachine() {
  const pool = characters.filter(c => c.enabled && activeTypes.has(c.type));
  if (!pool.length) return alert('No characters available');

  let iterations = 20;
  let delay = 50;
  let current = 0;
  let finalPick = null;

  function roll() {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    finalPick = pick;

    stageImg.src = imageCache[pick.name]?.stat?.src || '';
    stageName.textContent = pick.name.toUpperCase();
    spotlight.style.background = TYPE_COLOR[pick.type];

    stageImg.style.transition = '';
    stageImg.style.transform = 'scale(1)';

    current++;
    delay *= 1.1;

    if (current < iterations) {
      setTimeout(roll, delay);
    } else {
      // Select Effect
      stageImg.style.transition = 'transform 0.2s';
      stageImg.style.transform = 'scale(1.1)';
      setTimeout(() => stageImg.style.transform = 'scale(1)', 300);

      // Play cry
      const cry = imageCache[finalPick.name]?.cry;
      if (cry) {
        cry.currentTime = 0;
        cry.volume = 1;
        cry.play().catch(() => {});
      }
    }
  }

  roll();
}

/*  SORT & FILTER  */
const originalCharacters = [...characters]; // keep original order
let sortedAZ = false;

document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = () => {
    const type = btn.dataset.type;

    if (type === 'enable') {
      // Enable All Characters
      characters.forEach(c => c.enabled = true);
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable','disable','sort'].includes(b.dataset.type)) b.classList.add('active');
      });
    } else if (type === 'disable') {
      // Disable All Characters
      characters.forEach(c => c.enabled = false);
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable','disable','sort'].includes(b.dataset.type)) b.classList.remove('active');
      });
    } else if (type === 'sort') {
      // Sort Characters
      if (!sortedAZ) {
        characters.sort((a,b) => a.name.localeCompare(b.name));
        btn.textContent = 'Sort by Release';
      } else {
        characters.splice(0, characters.length, ...originalCharacters);
        btn.textContent = 'Sort A-Z';
      }
      sortedAZ = !sortedAZ;
    } else {
      // Type buttons toggle
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
