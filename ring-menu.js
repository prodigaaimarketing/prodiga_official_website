/* Prodiga 3D Ring Menu — self-contained, drop into any page with <script src="ring-menu.js"></script> */
(function(){
  if (window.__prodigaRing) return; window.__prodigaRing = true;

  var MENU = [
    { label:'Home',         href:'index.html',        icon:'🏠', desc:'Back to the Prodiga homepage.' },
    { label:'About',        href:'about.html',        icon:'✨', desc:'Who we are and why we build.' },
    { label:'Services',     href:'services.html',     icon:'🛠️', desc:'AI marketing, software & learning.' },
    { label:'Industries',   href:'industries.html',   icon:'🏢', desc:'Real estate, healthcare, coaches, startups.' },
    { label:'Course',       href:'course.html',       icon:'🎓', desc:'Silver, Gold & Diamond memberships.' },
    { label:'AI Agent',     href:'chatbot-demo.html', icon:'🤖', desc:'Chatbot, voice & WhatsApp demos.' },
    { label:'Case Studies', href:'case-studies.html', icon:'📈', desc:'Real results from real clients.' },
    { label:'Contact',      href:'contact.html',      icon:'📞', desc:'Book a strategy call today.' }
  ];
  var N = MENU.length, STEP = 360 / N, RADIUS = 300;

  function el(tag, css, html){ var e=document.createElement(tag); if(css)e.style.cssText=css; if(html!=null)e.innerHTML=html; return e; }

  // ---- Floating button ----
  var btn = el('button',
    'position:fixed;left:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:9px;'+
    'padding:12px 18px;border:none;border-radius:40px;cursor:pointer;font-family:Manrope,system-ui,sans-serif;'+
    'font-weight:800;font-size:13px;color:#071833;background:linear-gradient(120deg,#FFC928,#F28C00);'+
    'box-shadow:0 10px 28px rgba(242,140,0,.45)',
    '<span style="display:inline-flex;flex-direction:column;gap:3px">'+
      '<span style="width:15px;height:2px;background:#071833;display:block"></span>'+
      '<span style="width:15px;height:2px;background:#071833;display:block"></span>'+
      '<span style="width:15px;height:2px;background:#071833;display:block"></span>'+
    '</span> 3D Menu');
  document.body.appendChild(btn);

  // ---- Overlay ----
  var ov = el('div','position:fixed;inset:0;z-index:9999;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;'+
    'background:#071833;padding:64px 18px 24px;overflow:auto;-webkit-overflow-scrolling:touch');

  var close = el('button','position:absolute;top:18px;right:18px;width:44px;height:44px;border-radius:50%;cursor:pointer;'+
    'border:1px solid rgba(255,201,40,.4);background:rgba(10,31,68,.9);color:#FFC928;font-size:22px;display:flex;align-items:center;justify-content:center','✕');
  ov.appendChild(close);

  var stage = el('div','position:relative;width:100%;max-width:760px;height:440px;perspective:1500px;perspective-origin:50% 46%;cursor:grab;touch-action:pan-y');
  var ring = el('div','position:absolute;left:50%;top:46%;width:0;height:0;transform-style:preserve-3d');
  stage.appendChild(ring);

  var items = [];
  MENU.forEach(function(m,i){
    var it = el('div','position:absolute;width:158px;height:158px;margin:-79px 0 0 -79px;transform:rotateY('+(i*STEP)+'deg) translateZ('+RADIUS+'px)');
    it.dataset.i = i;
    var card = el('div','width:100%;height:100%;border-radius:18px;background:rgba(10,31,68,.72);border:1px solid rgba(255,201,40,.3);'+
      'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;cursor:pointer;'+
      'transition:opacity .12s,box-shadow .2s,border-color .2s;font-family:Fraunces,serif',
      '<span style="font-size:34px;font-family:system-ui">'+m.icon+'</span>'+
      '<span style="font-size:16px;color:#FFFDF8;font-family:Fraunces,Georgia,serif">'+m.label+'</span>');
    it.appendChild(card);
    ring.appendChild(it);
    items.push(it);
  });

  var base = el('div','position:absolute;left:50%;bottom:28px;width:300px;height:60px;margin-left:-150px;'+
    'border-radius:50%;background:radial-gradient(ellipse at center,rgba(255,201,40,.35),rgba(255,201,40,0) 70%);filter:blur(4px);pointer-events:none');
  stage.appendChild(base);
  ov.appendChild(stage);

  var panel = el('div','margin-top:8px;text-align:center;background:rgba(10,31,68,.55);border:1px solid rgba(255,201,40,.16);'+
    'border-radius:14px;padding:16px 20px;max-width:440px;width:100%;font-family:Manrope,system-ui,sans-serif');
  panel.innerHTML =
    '<div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#F28C00;font-weight:800;margin-bottom:5px">Selected</div>'+
    '<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap">'+
      '<h3 id="prg-label" style="margin:0;font-family:Fraunces,Georgia,serif;font-weight:600;font-size:22px;color:#FFC928">Home</h3>'+
      '<a id="prg-link" href="index.html" style="font-size:13px;font-weight:800;color:#071833;background:linear-gradient(120deg,#FFC928,#F28C00);padding:8px 16px;border-radius:8px;text-decoration:none">Open →</a>'+
    '</div>'+
    '<p id="prg-desc" style="font-size:13.5px;color:rgba(255,253,248,.68);margin:6px 0 0">Back to the Prodiga homepage.</p>'+
    '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px">'+
      '<button id="prg-prev" style="cursor:pointer;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,201,40,.3);background:rgba(255,201,40,.06);color:#FFC928;font-size:16px">‹</button>'+
      '<button id="prg-play" style="cursor:pointer;padding:8px 16px;border-radius:20px;border:1px solid rgba(255,201,40,.3);background:rgba(255,201,40,.06);color:#FFFDF8;font-size:12px;font-weight:700">⏸ Pause spin</button>'+
      '<button id="prg-next" style="cursor:pointer;width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,201,40,.3);background:rgba(255,201,40,.06);color:#FFC928;font-size:16px">›</button>'+
    '</div>';
  ov.appendChild(panel);
  document.body.appendChild(ov);

  var lbl=panel.querySelector('#prg-label'), dsc=panel.querySelector('#prg-desc'), lnk=panel.querySelector('#prg-link'),
      playBtn=panel.querySelector('#prg-play');

  // ---- State + loop ----
  var angle=0, target=null, dragging=false, playing=true, front=-1, moved=false, startX=0, startAngle=0, last=performance.now(), raf=null;

  function apply(){
    ring.style.transform='rotateY('+angle+'deg)';
    for(var i=0;i<items.length;i++){
      var eff=((i*STEP+angle)%360+540)%360-180;
      var near=Math.max(0,1-Math.abs(eff)/92);
      var card=items[i].firstChild;
      card.style.opacity=(0.32+0.68*near).toFixed(3);
      card.style.transform='scale('+(0.82+0.28*near).toFixed(3)+')';
      if(near>0.82){ card.style.boxShadow='0 0 44px rgba(255,201,40,.55),0 18px 40px rgba(0,0,0,.5)'; card.style.borderColor='#FFC928'; }
      else { card.style.boxShadow='none'; card.style.borderColor='rgba(255,201,40,0.3)'; }
    }
    var f=((Math.round(-angle/STEP))%N+N)%N;
    if(f!==front){ front=f; var m=MENU[f]; lbl.textContent=m.label; dsc.textContent=m.desc; lnk.setAttribute('href',m.href); }
  }
  function loop(t){
    var dt=Math.min(64,t-last); last=t;
    if(dragging){}
    else if(target!=null){ angle+=(target-angle)*0.12; if(Math.abs(target-angle)<0.15){angle=target;target=null;} }
    else if(playing){ angle-=0.012*dt; }
    apply();
    raf=requestAnimationFrame(loop);
  }

  function open(){ ov.style.display='flex'; document.body.style.overflow='hidden'; playing=true; target=null; syncPlay(); if(!raf){ last=performance.now(); raf=requestAnimationFrame(loop);} }
  function shut(){ ov.style.display='none'; document.body.style.overflow=''; if(raf){cancelAnimationFrame(raf);raf=null;} }
  function syncPlay(){ playBtn.textContent=playing?'⏸ Pause spin':'▶ Resume spin'; }

  btn.addEventListener('click',open);
  close.addEventListener('click',shut);
  ov.addEventListener('click',function(e){ if(e.target===ov) shut(); });

  stage.addEventListener('pointerdown',function(e){ dragging=true; moved=false; startX=e.clientX; startAngle=angle; stage.style.cursor='grabbing'; });
  window.addEventListener('pointermove',function(e){ if(!dragging)return; var dx=e.clientX-startX; if(Math.abs(dx)>4)moved=true; angle=startAngle+dx*0.45; target=null; });
  window.addEventListener('pointerup',function(){ if(!dragging)return; dragging=false; stage.style.cursor='grab'; target=Math.round(angle/STEP)*STEP; playing=false; syncPlay(); });

  items.forEach(function(it){
    it.firstChild.addEventListener('click',function(){
      if(moved)return;
      var i=+it.dataset.i;
      if(i===front){ window.location.href=MENU[i].href; return; }
      var k=Math.round((angle+i*STEP)/360); target=360*k-i*STEP; playing=false; syncPlay();
    });
  });
  panel.querySelector('#prg-prev').addEventListener('click',function(){ var b=target!=null?target:Math.round(angle/STEP)*STEP; target=b+STEP; playing=false; syncPlay(); });
  panel.querySelector('#prg-next').addEventListener('click',function(){ var b=target!=null?target:Math.round(angle/STEP)*STEP; target=b-STEP; playing=false; syncPlay(); });
  playBtn.addEventListener('click',function(){ playing=!playing; if(playing)target=null; syncPlay(); });

  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&ov.style.display==='flex') shut(); });
})();
