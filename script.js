/* ---------------- Icons ---------------- */
const icons = {
  email:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>',
  loc:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  git:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
  sun:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
  code:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 18-6-6 6-6M16 6l6 6-6 6"/></svg>',
  award:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 14 7 22l5-3 5 3-2-8"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4a2 2 0 0 0 2 4M17 5h3a2 2 0 0 1-2 4"/></svg>'
};
document.getElementById('iconEmail').innerHTML = icons.email;
document.getElementById('iconLoc').innerHTML = icons.loc;
document.getElementById('iconGit').innerHTML = icons.git;
document.getElementById('iconGit2').innerHTML = icons.git;
document.getElementById('iconEmail2').innerHTML = icons.email;

/* ---------------- Theme toggle ---------------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
function applyTheme(t){
  root.setAttribute('data-theme', t);
  themeBtn.innerHTML = t === 'dark' ? icons.sun : icons.moon;
  try{ localStorage.setItem('ap-theme', t); }catch(e){}
}
let savedTheme = 'dark';
try{ savedTheme = localStorage.getItem('ap-theme') || 'dark'; }catch(e){}
applyTheme(savedTheme);
themeBtn.addEventListener('click', ()=>{
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------------- Loader ---------------- */
window.addEventListener('load', ()=>{
  setTimeout(()=> document.getElementById('loader').classList.add('hide'), 400);
});

/* ---------------- Typing effect ---------------- */
const roles = [
  "Aspiring Software Engineer",
  "CS Undergrad @ GITM Lucknow",
  "Building with AI & the Web",
  "Hackathon Enthusiast"
];
const typedEl = document.getElementById('typedText');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ri=0, ci=0, deleting=false;
function typeLoop(){
  if(reduceMotion){ typedEl.textContent = roles[0]; return; }
  const word = roles[ri];
  typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 40 : 70;
  if(!deleting && ci === word.length + 1){ delay = 1400; deleting = true; }
  if(deleting && ci < 0){ deleting = false; ri = (ri+1) % roles.length; ci = 0; delay = 300; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ---------------- Scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.add('visible');
      if(en.target.querySelectorAll){
        en.target.querySelectorAll('.bar-fill').forEach(bar=>{
          bar.style.width = bar.dataset.w + '%';
        });
      }
      io.unobserve(en.target);
    }
  });
}, { threshold:0.15 });
revealEls.forEach(el=> io.observe(el));

/* ---------------- Back to top ---------------- */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  toTop.classList.toggle('show', window.scrollY > 500);
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior: reduceMotion ? 'auto':'smooth'}));

/* ---------------- Contact form (mailto fallback) ---------------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('fName').value;
  const email = document.getElementById('fEmail').value;
  const subject = document.getElementById('fSubject').value;
  const message = document.getElementById('fMessage').value;
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  window.location.href = `mailto:anshbhai2700@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});

/* ---------------- Placeholder content builders ---------------- */
function placeholderCard(iconSvg, title, text){
  return `<div class="card placeholder-card reveal">
    <div class="placeholder-icon">${iconSvg}</div>
    <h3 style="font-size:16px;margin-bottom:8px;">${title}</h3>
    <p style="font-size:13.5px;color:var(--muted);margin:0;">${text}</p>
    <span class="badge-soon mono">Coming soon</span>
  </div>`;
}
function projectCard(iconSvg, title, text, tags, url){
  return `<div class="card project-card reveal">
    <div class="placeholder-icon">${iconSvg}</div>
    <h3>${title}</h3>
    <p>${text}</p>
    <div class="project-tags">${tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
    <a class="project-link" href="${url}" target="_blank" rel="noopener">
      View Prototype
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
    </a>
  </div>`;
}
document.getElementById('projectsGrid').innerHTML =
  projectCard(
    icons.code,
    "Smart Tourist Safety System",
    "A Figma prototype for an app concept focused on tourist safety — designed around clear, context-aware navigation so users can quickly find emergency features when it matters.",
    ["UI/UX Design", "Figma Prototype"],
    "https://shed-nap-77519657.figma.site/"
  ) +
  projectCard(
    icons.code,
    "InternX — Internship Management System",
    "A Figma prototype for a platform to manage internship applications and workflows, designed for students, companies, and administrators.",
    ["UI/UX Design", "Figma Prototype"],
    "https://lint-buck-81187337.figma.site/"
  ) +
  placeholderCard(icons.code, "Next Project", "More projects are on the way — check back soon.");

const certPlatforms = ["Coursera","Udemy","Google","Microsoft","Cisco","NPTEL"];
document.getElementById('certGrid').innerHTML = certPlatforms.map(p=>
  placeholderCard(icons.award, p, `Certifications from ${p} will be listed here soon.`)
).join('');

const codingProfiles = ["LeetCode", "HackerRank", "CodeChef", "Codeforces"];
document.getElementById('profilesGrid').innerHTML = codingProfiles.map(p=>`
  <div class="card profile-card reveal">
    <div class="profile-head">
      <div class="pi">${icons.code}</div>
      <div><strong>${p}</strong><div class="mono" style="font-size:12px;color:var(--muted);">Profile linked soon</div></div>
    </div>
  </div>
`).join('');

const achievementCats = [
  {t:"Academic Achievements", d:"Notable academic milestones will be listed here."},
  {t:"Hackathons", d:"Hackathon participations and wins will appear here."},
  {t:"Clubs", d:"Club memberships and contributions will appear here."},
  {t:"Leadership Roles", d:"Leadership positions held will be listed here."},
  {t:"Workshops", d:"Workshops attended or conducted will be listed here."}
];
document.getElementById('achievementsGrid').innerHTML = achievementCats.map(a=>
  placeholderCard(icons.trophy, a.t, a.d)
).join('');

/* Resume button: point this at your resume file once it's alongside this page, e.g.
   <a href="Ansh_Pandey_Resume.pdf" download> — currently scrolls to Contact instead. */
document.getElementById('resumeBtn').addEventListener('click', function(e){
  if(this.getAttribute('href') === '#'){
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({behavior: reduceMotion ? 'auto':'smooth'});
  }
});

/* ---------------- Three.js hero scene ---------------- */
(function(){
  const canvas = document.getElementById('heroCanvas');
  if(!window.THREE || !canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  const accent1 = new THREE.Color(0x818CF8);
  const accent2 = new THREE.Color(0xD896FF);

  const group = new THREE.Group();
  scene.add(group);

  // Wireframe icosahedron
  const ico = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 0),
    new THREE.MeshBasicMaterial({ color: accent1, wireframe:true })
  );
  ico.position.set(-1.6, 0.6, 0);
  group.add(ico);

  // Floating cube
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.1,1.1,1.1),
    new THREE.MeshBasicMaterial({ color: accent2, wireframe:true })
  );
  cube.position.set(1.8, -0.8, -1);
  group.add(cube);

  // Torus (network node loop)
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.08, 12, 60),
    new THREE.MeshBasicMaterial({ color: accent1, wireframe:true })
  );
  torus.position.set(1.4, 1.3, -1.5);
  group.add(torus);

  // Small floating nodes (points)
  const nodeGeo = new THREE.BufferGeometry();
  const count = 60;
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    positions[i*3] = (Math.random()-0.5)*8;
    positions[i*3+1] = (Math.random()-0.5)*6;
    positions[i*3+2] = (Math.random()-0.5)*6 - 2;
  }
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const nodeMat = new THREE.PointsMaterial({ color: accent2, size:0.05 });
  const points = new THREE.Points(nodeGeo, nodeMat);
  scene.add(points);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', e=>{
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  resize();
  function animate(){
    requestAnimationFrame(animate);
    if(!reduceMotion){
      ico.rotation.x += 0.003; ico.rotation.y += 0.004;
      cube.rotation.x += 0.005; cube.rotation.y += 0.003;
      torus.rotation.x += 0.004; torus.rotation.z += 0.003;
      points.rotation.y += 0.0006;
      group.position.x += (mouseX*0.6 - group.position.x) * 0.03;
      group.position.y += (-mouseY*0.4 - group.position.y) * 0.03;
    }
    renderer.render(scene, camera);
  }
  animate();
})();
