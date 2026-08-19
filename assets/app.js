(()=>{
  const html=document.documentElement,body=document.body;
  const qs=(s,e=document)=>e.querySelector(s), qsa=(s,e=document)=>[...e.querySelectorAll(s)];
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const reduced=matchMedia("(prefers-reduced-motion:reduce)").matches;
  const fine=matchMedia("(pointer:fine)").matches;

  let theme=localStorage.getItem("alqanas-theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
  let lang=localStorage.getItem("alqanas-lang")||"en";
  function applyTheme(v){theme=v;html.dataset.theme=v;localStorage.setItem("alqanas-theme",v);const m=qs('meta[name="theme-color"]');if(m)m.content=v==="dark"?"#0A0908":"#EAE0D5"}
  function applyLang(v){lang=v;html.lang=v;html.dir=v==="ar"?"rtl":"ltr";qsa("[data-en][data-ar]").forEach(el=>el.textContent=el.dataset[v]);const b=qs("#langBtn");if(b)b.textContent=v==="ar"?"EN":"AR";localStorage.setItem("alqanas-lang",v)}
  applyTheme(theme);applyLang(lang);

  const loader=qs("#loader"), loaderWord=qs("#loaderWord"),loaderBar=qs("#loaderBar"),loaderPct=qs("#loaderPct");
  if(loader){
    body.classList.add("locked");
    const words=lang==="ar"?["تركيز","حكاية","ذاكرة","القنّاص"]:["FOCUS","STORY","MEMORY","AL QANAS"];
    let idx=0,start=performance.now(),dur=reduced?20:1150,lastSwap=0;
    function frame(now){
      const p=clamp((now-start)/dur,0,1),e=1-Math.pow(1-p,3);
      if(loaderBar)loaderBar.style.transform=`scaleX(${e})`;
      if(loaderPct)loaderPct.textContent=String(Math.round(e*100)).padStart(2,"0");
      const next=Math.min(words.length-1,Math.floor(p*words.length));
      if(next!==idx&&now-lastSwap>120){idx=next;lastSwap=now;loaderWord?.classList.add("swap");setTimeout(()=>{if(loaderWord)loaderWord.textContent=words[idx]},105);setTimeout(()=>loaderWord?.classList.remove("swap"),240)}
      if(p<1)requestAnimationFrame(frame);
      else setTimeout(()=>{loader.classList.add("done");body.classList.remove("locked")},100)
    }
    if(loaderWord)loaderWord.textContent=words[0];
    requestAnimationFrame(frame);
  }

  let ctx=null,soundOn=localStorage.getItem("alqanas-sound")!=="off",hoverStamp=0;
  const soundBtn=qs("#soundBtn");
  function audio(){if(!soundOn)return null;if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;ctx=new AC()}if(ctx.state==="suspended")ctx.resume().catch(()=>{});return ctx}
  function tone(f=420,d=.05,v=.03,type="sine",end=null){const c=audio();if(!c)return;const t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(end)o.frequency.exponentialRampToValueAtTime(end,t+d);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.02)}
  const clickS=()=>{tone(255,.06,.035,"triangle",410);setTimeout(()=>tone(650,.04,.018,"sine",760),28)};
  const hoverS=()=>{if(!ctx)return;const n=performance.now();if(n-hoverStamp<70)return;hoverStamp=n;tone(520,.028,.009,"sine",610)};
  addEventListener("pointerdown",()=>audio(),{once:true,capture:true});
  qsa("a,button").forEach(el=>{el.addEventListener("mouseenter",hoverS);el.addEventListener("click",()=>{if(!el.matches("#soundBtn"))clickS()})});
  if(soundBtn){soundBtn.classList.toggle("muted-sound",!soundOn);soundBtn.addEventListener("click",()=>{if(soundOn){clickS();setTimeout(()=>{soundOn=false;localStorage.setItem("alqanas-sound","off");soundBtn.classList.add("muted-sound")},60)}else{soundOn=true;localStorage.setItem("alqanas-sound","on");soundBtn.classList.remove("muted-sound");audio();setTimeout(()=>{tone(340,.08,.03,"sine",530);tone(660,.1,.02,"sine",880)},30)}})}

  qs("#themeBtn")?.addEventListener("click",()=>{applyTheme(theme==="dark"?"light":"dark");tone(330,.08,.025,"sine",650)});
  qs("#langBtn")?.addEventListener("click",()=>{applyLang(lang==="en"?"ar":"en");tone(430,.055,.022,"sine",560)});
  const navMenu=qs("#navMenu");qs("#navHamb")?.addEventListener("click",()=>navMenu?.classList.toggle("open"));

  if(fine&&!reduced){
    const ring=qs(".cursor-ring"),dot=qs(".cursor-dot");
    if(ring&&dot){
      let mx=-100,my=-100,rx=-100,ry=-100;
      addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;body.classList.add("cursor-ready");document.body.style.setProperty("--mx",`${mx/innerWidth*100}%`);document.body.style.setProperty("--my",`${my/innerHeight*100}%`)},{passive:true});
      addEventListener("mouseout",e=>{if(!e.relatedTarget){ring.style.opacity="0";dot.style.opacity="0"}});
      addEventListener("mouseover",()=>{if(body.classList.contains("cursor-ready")){ring.style.opacity="1";dot.style.opacity="1"}});
      function cursorFrame(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;dot.style.transform=`translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;requestAnimationFrame(cursorFrame)}cursorFrame();
      qsa("a,button,.tilt").forEach(el=>{el.addEventListener("mouseenter",()=>ring.classList.add("hot"));el.addEventListener("mouseleave",()=>ring.classList.remove("hot"))});
    }
  }

  const canvas=qs("#flickerGrid"),g=canvas?.getContext("2d",{alpha:true});let W=0,H=0,dpr=1,cols=0,rows=0,cells=null,last=0;
  const size=3,gap=9,step=size+gap;
  function resizeGrid(){if(!g)return;dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+"px";canvas.style.height=H+"px";g.setTransform(dpr,0,0,dpr,0,0);cols=Math.ceil(W/step)+1;rows=Math.ceil(H/step)+1;cells=new Float32Array(cols*rows);for(let i=0;i<cells.length;i++)cells[i]=Math.random()*.08}
  function drawGrid(now){if(!g)return;if(now-last>88){last=now;g.clearRect(0,0,W,H);const c=theme==="dark"?[138,166,196]:[49,93,140];for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let i=y*cols+x;if(Math.random()<.055)cells[i]=.03+Math.random()*.17;else cells[i]*=.92;if(cells[i]<.01)continue;g.fillStyle=`rgba(${c[0]},${c[1]},${c[2]},${cells[i]})`;g.fillRect(x*step,y*step,size,size)}}if(!reduced)requestAnimationFrame(drawGrid)}
  resizeGrid();requestAnimationFrame(drawGrid);addEventListener("resize",resizeGrid,{passive:true});

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -4% 0px"});
  qsa(".reveal,.reveal-left,.image-reveal").forEach(el=>io.observe(el));

  if(fine&&!reduced){
    qsa(".tilt").forEach(el=>{
      el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,px=x/r.width-.5,py=y/r.height-.5;el.style.transform=`perspective(1200px) rotateX(${-py*4.5}deg) rotateY(${px*5.5}deg) translateY(-3px)`});
      el.addEventListener("mouseleave",()=>el.style.transform="")
    });
    const orbs=qsa(".depth-orb");addEventListener("mousemove",e=>orbs.forEach(o=>{const r=o.parentElement.getBoundingClientRect(),x=(e.clientX-r.left)/Math.max(r.width,1)-.5,y=(e.clientY-r.top)/Math.max(r.height,1)-.5;o.style.transform=`translate3d(${x*18}px,${y*14}px,0) rotateX(${-y*15}deg) rotateY(${x*18}deg)`}),{passive:true})
  }

  const wipe=qs("#pageWipe");
  qsa('a[data-page-link]').forEach(a=>a.addEventListener("click",e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();const href=a.href;tone(150,.16,.025,"sine",520);wipe?.classList.add("go");setTimeout(()=>location.href=href,reduced?0:610)}));

  const galleryItems=qsa(".gitem"),filterBtns=qsa(".filter-btn");
  filterBtns.forEach(b=>b.addEventListener("click",()=>{filterBtns.forEach(x=>x.classList.remove("active"));b.classList.add("active");const f=b.dataset.filter;galleryItems.forEach(item=>item.classList.toggle("hide",f!=="all"&&item.dataset.cat!==f));tone(430,.05,.02,"sine",560)}));
  const lightbox=qs("#lightbox"),lbImg=qs("#lbImg"),lbTitle=qs("#lbTitle"),lbCount=qs("#lbCount");let li=0;
  function show(i){if(!galleryItems.length)return;li=(i+galleryItems.length)%galleryItems.length;const item=galleryItems[li],im=qs("img",item);lbImg.src=im.src;lbTitle.textContent=qs("b",item)?.textContent||"Gallery";lbCount.textContent=`${String(li+1).padStart(2,"0")} / ${String(galleryItems.length).padStart(2,"0")}`}
  function openLb(i){if(!lightbox)return;show(i);lightbox.classList.add("open");body.classList.add("locked");tone(280,.07,.027,"triangle",480)}
  function closeLb(){if(!lightbox)return;lightbox.classList.remove("open");body.classList.remove("locked");tone(500,.06,.02,"sine",310)}
  galleryItems.forEach((it,i)=>it.addEventListener("click",()=>openLb(i)));qs("#lbClose")?.addEventListener("click",closeLb);qs("#lbPrev")?.addEventListener("click",()=>show(li-1));qs("#lbNext")?.addEventListener("click",()=>show(li+1));qs(".lightbox-bg")?.addEventListener("click",closeLb);
  addEventListener("keydown",e=>{if(e.key==="Escape")closeLb();if(lightbox?.classList.contains("open")){if(e.key==="ArrowLeft")show(li-1);if(e.key==="ArrowRight")show(li+1)}});

  const yr=qs("#year");if(yr)yr.textContent=new Date().getFullYear();
})();