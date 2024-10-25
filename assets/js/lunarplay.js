/***********************/

/* IMPORTS DES MODULES */

/***********************/
import * as THREE from '/../../modules/three.module.js';
import { OrbitControls } from '/../../modules/OrbitControls.js';
import { descriptions } from '/assets/js/translations.js';


/***********************/

/* VARIABLES GLOBALES */

/***********************/
let scene, camera, renderer, controls, texture;
let solaris,
  ignisfera,
  aetheria,
  elythium,
  cloud,
  lunara,
  rhodaria,
  goliathor,
  ringuara,
  aqualis,
  nereidia,
  cryos;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let isPaused = false;
const storedLanguage = sessionStorage.getItem('lang') || initialLanguage;
const planetStories = descriptions[storedLanguage];

/*************************/

/* CHARGEMENT DE LA PAGE */

/*************************/
const containerProgressBar = document.querySelector('.container-progress-bar');
const progressBarValue = document.getElementById('progress-bar-value');
const progressBar = document.getElementById('progress-bar');

// Mise en place de la barre de progression
THREE.DefaultLoadingManager.onProgress = function (
  url,
  itemsLoaded,
  itemsTotal
) {
  progressBar.value = (itemsLoaded / itemsTotal) * 100;
  progressBarValue.textContent = Math.floor(progressBar.value) + '%';
};
// Fin du chargement
THREE.DefaultLoadingManager.onLoad = function () {
  containerProgressBar.style.display = 'none';
};
// Erreur de chargement
THREE.DefaultLoadingManager.onError = function (url) {
  console.log('There was an error loading ' + url);
};


/**********************************/

/* INITIALISATION DE LA SCÈNE 3D */

/**********************************/
const init = () => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    8000
  );
  // Créaton de l'objet OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  // Activation de l'amortissement de la rotation + réglage la vitesse
  controls.enableDamping = true;
  controls.dampingFactor = 0.5;

  // Définition des paramètres de l'objet OrbitControls
  controls.autoRotate = true;
  controls.autoRotateSpeed = -0.069; // 30
  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 0.5;
  controls.minPolarAngle = 0.8;
  controls.maxPolarAngle = 2.4;
  controls.minDistance = 120;
  controls.maxDistance = 500;
  controls.enablePan = false;

  // Position de la caméra
  camera.position.set(90, 25, 110);

  // Ajout de la lumière ambiante
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85, 10);
  scene.add(ambientLight);

  // Création de la texture de fond
  const textureLoader = new THREE.TextureLoader();

  // Chargement de la texture de fond
  texture = textureLoader.load('/../assets/img/space-stars.jpg');
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  scene.background = texture;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  // Création de la sphère de fond
  const geometry = new THREE.SphereGeometry(7500, 32, 32);
  const mesh = new THREE.Mesh(geometry, material);
  // Inversion des faces du maillage pour qu'elles soient visibles de l'intérieur
  mesh.scale.x = -1;

  scene.add(mesh);
};


/*************************/

/* PLANÈTES ET ANIMATION */

/*************************/
// Fonction pour générer une position aléatoire autour de Solaris
const randPosition = (position) => {
  let randAngle = Math.random() * Math.PI * 2;
  let positionX = Math.cos(randAngle) * position;
  let positionY = Math.sin(randAngle) * position;

  return { x: positionX, z: positionY };
};

// Fonction pour créer une planète
const createPlanete = (size, namePlanet, texture, position, ring = false, isSolaris = false) => {
  let mat = {};
  let ringMesh = {};
  const textureLoader = new THREE.TextureLoader();
  // Création de la géométrie de la planète
  const geo = new THREE.SphereGeometry(size, 36, 36);
  if (isSolaris) {
    mat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(texture),
    });
  } else {
    mat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(texture),
    });
  }
  // Création de l'objet 3D
  const obj = new THREE.Object3D();
  const mesh = new THREE.Mesh(geo, mat);
  const coord = randPosition(position);
  mesh.position.x = coord.x;
  mesh.position.z = coord.z;
  mesh.name = namePlanet;
  obj.add(mesh);
  // Si la planète a un anneau
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      50
    );
    const ringMat = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
      color: 0xffffff,
      transparent: true,
    });
    ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = coord.x;
    ringMesh.position.z = coord.z;
    ringMesh.rotation.x = -Math.PI * 0.5;
  }

  scene.add(obj);

  return { mesh, obj, ringMesh };
};

// Initialisation des planètes
const initScene = () => {
  solaris = createPlanete(16, 'solaris', '/../assets/img/solaris.jpg', 0, false, true);
  ignisfera = createPlanete(2.6, 'ignisfera', '/../assets/img/ignisfera.jpg', 28);
  aetheria = createPlanete(5.3, 'aetheria', '/../assets/img/aetheria.jpg', 44);
  elythium = createPlanete(6, 'elythium', '/../assets/img/elythium.jpg', 78);
  // Création des nuages autour d'Elythium
  const textureLoader = new THREE.TextureLoader();
  cloud = new THREE.Mesh(
    new THREE.SphereGeometry(6.1, 32, 32),
    new THREE.MeshPhongMaterial({
      map: textureLoader.load('/../assets/img/clouds.png'),
      transparent: true,
    })
  );
  elythium.mesh.add(cloud);

  lunara = createPlanete(1.2, 'lunara', '/../assets/img/lunara.jpg', 11);
  elythium.mesh.add(lunara.mesh);
  rhodaria = createPlanete(3.2, 'rhodaria', '/../assets/img/rhodaria.jpg', 118);
  goliathor = createPlanete(11, 'goliathor', '/../assets/img/goliathor.jpg', 150);
  ringuara = createPlanete(9, 'ringuara', '/../assets/img/ringuara.jpg', 198, {
    innerRadius: 12.2,
    outerRadius: 21,
    texture: '/../assets/img/ringuara-ring.png',
  });
  aqualis = createPlanete(8, 'aqualis', '/../assets/img/aqualis.jpg', 262, {
    innerRadius: 9.5,
    outerRadius: 12,
    texture: '/../assets/img/aqualis-ring.png',
  });
  nereidia = createPlanete(7, 'nereidia', '/../assets/img/nereidia.jpg', 280);
  cryos = createPlanete(3, 'cryos', '/../assets/img/cryos.jpg', 290);

  // Ajout de la lumière ponctuelle
  const pointLight = new THREE.PointLight(0xffffff, 1.4, 600);
  scene.add(pointLight);
};

// Initialisation de la scène
init();
initScene();


/*************************/

/* ANIMATION DE LA SCÈNE */

/*************************/
function animate() {
  if (!isPaused) {
    // Rotation des planètes sur elles-mêmes
    solaris.mesh.rotateY(0.002);
    ignisfera.mesh.rotateY(0.006);
    aetheria.mesh.rotateY(0.006);
    elythium.mesh.rotateY(0.01);
    cloud.rotateY(0.014);
    rhodaria.mesh.rotateY(0.009);
    goliathor.mesh.rotateY(0.02);
    ringuara.mesh.rotateY(0.019);
    aqualis.mesh.rotateY(0.015);
    nereidia.mesh.rotateY(0.016);
    cryos.mesh.rotateY(0.004);

    // Rotation des planètes autour de Solaris
    ignisfera.obj.rotateY(0.01);
    aetheria.obj.rotateY(0.0038);
    elythium.obj.rotateY(0.0025);
    rhodaria.obj.rotateY(0.002);
    goliathor.obj.rotateY(0.00045);
    ringuara.obj.rotateY(0.00022);
    aqualis.obj.rotateY(0.00021);
    nereidia.obj.rotateY(0.00018);
    cryos.obj.rotateY(0.00014);

    // Rotation des anneaux des planètes
    ringuara.ringMesh.rotateZ(0.42);
    aqualis.ringMesh.rotateZ(0.41);

    // Mise à jour des contrôles
    controls.update();
  }
  // Rendu de la scène
  renderer.render(scene, camera);
}
// Lancement de l'animation
renderer.setAnimationLoop(animate) 


/********************/

/* INTERACTIONS 3D */

/*******************/
// Fonction pour afficher les infos de la planète
const showPlanetInfo = (planetName) => {
  const infoBox = document.getElementById('planet-info');
  const playBtn = document.getElementById('play-game-button');

  // Si aucune planète n'est sélectionnée
  if (!planetName) {
    infoBox.classList.add('hidden');
    isPaused = false;
    return;

  } else {
    // Mettre à jour les informations de la planète
    document.getElementById('planet-name').textContent = planetName;
    document.getElementById('planet-story-1').textContent = planetStories[planetName]['intro'] || 'Histoire non disponible.';
    document.getElementById('planet-story-2').textContent = planetStories[planetName]['desc'] || 'Histoire non disponible.';

    playBtn.href = `/${storedLanguage}/${planetName}/`;

    // Afficher les informations
    infoBox.classList.remove('hidden');
    isPaused = true;
  }
};

// Fonction pour récupérer la planète sélectionnée
const getPlaneteSelected = () => {
  let planetSelected; 
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // Vérifier si la planète est sélectionnée
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name?.length > 0) {
      planetSelected = intersects[i].object.name;

      showPlanetInfo(planetSelected);

      return;

    } else {
      showPlanetInfo(null);
    }
  }
};

// Fonction pour afficher le nom de la planète survolée
const showPlanetName = () => {
  let planetSelected;
  let planetHovered = false;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // Vérifier si la planète est survolée
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.name?.length > 0) {
      planetHovered = true;
      document.body.style.cursor = 'url("/assets/img/cur1051.cur"), pointer';
      planetSelected = intersects[i].object.name;
      document.getElementById('planet-name-hover').textContent = planetSelected;
      return;
    }
  }
  if (!planetHovered) {
    document.getElementById('planet-name-hover').textContent = '';
    document.body.style.cursor = 'url("/assets/img/cur1054.cur"), default';
  }
};

// Fonction pour récupérer la position du clic de la souris
const onPointerClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  getPlaneteSelected();
};

// Écouter les clics de la souris
window.addEventListener('click', onPointerClick, false);

// Fonction pour gérer le survol de la souris
const onPointerMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  showPlanetName();
};

// Écouter les mouvements de la souris
window.addEventListener('mousemove', onPointerMove, false);

// Fonction pour gérer le redimensionnement de la fenêtre
const handleResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
};

// Écouter les événements de redimensionnement
window.addEventListener('orientationchange', handleResize);
window.addEventListener('resize', handleResize);

