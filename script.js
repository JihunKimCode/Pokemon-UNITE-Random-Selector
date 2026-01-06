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
const imageCache = {};  // { 'charName': { roster: Image, stat: Image } }

function preloadImages() {
  characters.forEach(c => {
    // Roster image for grid
    const rosterImg = new Image();
    rosterImg.src = `https://unite.pokemon.com/images/pokemon/${c.name}/roster/roster-${c.name}.png`;

    // Stat image for stage
    const statImg = new Image();
    statImg.src = `https://unite.pokemon.com/images/pokemon/${c.name}/stat/stat-${c.name}.png`;

    imageCache[c.name] = { roster: rosterImg, stat: statImg };
  });
}

/* Render grid of characters */
function renderGrid() {
  grid.innerHTML = '';

  characters.forEach(c => {
    if (!activeTypes.has(c.type)) return;

    const div = document.createElement('div');
    div.className = `character ${c.type}` + (c.enabled ? '' : ' disabled');
    div.style.background = "#19072d";

    div.innerHTML = `
      <div class="character-image">
          <img src="${imageCache[c.name].roster.src}" alt="${c.name}">
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

/* Random Pick with Slot Machine Effect using cached images */
function randomPickSlotMachine() {
  const pool = characters.filter(c => c.enabled && activeTypes.has(c.type));
  if (!pool.length) return alert('No characters available');

  let iterations = 20;   // total number of image "rolls"
  let delay = 50;        // starting delay between rolls
  let current = 0;

  function roll() {
    const pick = pool[Math.floor(Math.random() * pool.length)];

    // Update stage using cached stat image
    stageImg.src = imageCache[pick.name].stat.src;
    stageName.textContent = pick.name.toUpperCase();
    spotlight.style.background = TYPE_COLOR[pick.type];

    // Reset scale during rolling
    stageImg.style.transition = '';
    stageImg.style.transform = 'scale(1)';

    current++;
    delay *= 1.1; // gradually slow down

    if (current < iterations) {
      setTimeout(roll, delay);
    } else {
      // Final "pop" effect
      stageImg.style.transition = 'transform 0.2s';
      stageImg.style.transform = 'scale(1.1)';
      // Reset after a moment
      setTimeout(() => stageImg.style.transform = 'scale(1)', 300);
    }
  }

  roll();
}

const originalCharacters = [...characters]; // keep original order
let sortedAZ = false; // track sort state

/* Filters: change enabled state by type */
document.querySelectorAll('.filters button').forEach(btn => {
  btn.onclick = () => {
    const type = btn.dataset.type;

    if (type === 'enable') {
      // Enable all characters
      characters.forEach(c => c.enabled = true);

      // Set all type buttons to active
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable', 'disable', 'sort'].includes(b.dataset.type)) {
          b.classList.add('active');
        }
      });

    } else if (type === 'disable') {
      // Disable all characters
      characters.forEach(c => c.enabled = false);

      // Remove active from all type buttons
      document.querySelectorAll('.filters button').forEach(b => {
        if (!['enable', 'disable', 'sort'].includes(b.dataset.type)) {
          b.classList.remove('active');
        }
      });

    } else if (type === 'sort') {
      // Toggle sort
      if (!sortedAZ) {
        characters.sort((a, b) => a.name.localeCompare(b.name));
        btn.textContent = 'Sort by Release';
      } else {
        // Restore original order in-place
        characters.splice(0, characters.length, ...originalCharacters);
        btn.textContent = 'Sort A-Z';
      }
      sortedAZ = !sortedAZ;

    } else {
      // Type buttons toggle
      const isActive = btn.classList.contains('active');

      characters.forEach(c => {
        if (c.type === type) {
          c.enabled = !isActive; // disable if active, enable if not active
        }
      });

      btn.classList.toggle('active');
    }

    renderGrid();
  };
});

/* Random button click event */
document.getElementById('random-btn').onclick = randomPickSlotMachine;

/* Initialize */
preloadImages();
renderGrid();
