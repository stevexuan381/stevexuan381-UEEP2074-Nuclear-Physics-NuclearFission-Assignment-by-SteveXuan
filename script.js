let xp=0;
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

window.addEventListener("load",()=>setTimeout(()=>$("#bootScreen").classList.add("hide"),650));

const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObs.unobserve(e.target)}}),{threshold:.1});
$$(".reveal").forEach(el=>revealObs.observe(el));

$("#menuBtn").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$$("#mainNav a").forEach(a=>a.addEventListener("click",()=>$("#mainNav").classList.remove("open")));

function addXP(n,msg){
  xp+=n; $("#xpTop").textContent=xp;
  if(msg) toast(`${msg}  +${n} XP`);
}
let toastTimer;
function toast(text){
  const t=$("#toast"); t.textContent=text; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),1900);
}

$$(".fact-btn").forEach(b=>b.addEventListener("click",()=>{
  showMeme("🤯","Did you know?",b.dataset.fact,25);
}));

function showMeme(emoji,title,text,award=0){
  $("#memeEmoji").textContent=emoji;
  $("#memeTitle").textContent=title;
  $("#memeText").textContent=text;
  $("#memeXP").textContent=award?`+${award} XP`:"FISSIONQUEST";
  $("#memeModal").classList.add("show");
  $("#memeModal").setAttribute("aria-hidden","false");
  if(award) addXP(award);
}
$("#memeClose").addEventListener("click",()=>$("#memeModal").classList.remove("show"));
$("#memeModal").addEventListener("click",e=>{if(e.target.id==="memeModal")$("#memeModal").classList.remove("show")});

let fissionBusy=false;
$("#fireFission").addEventListener("click",()=>{
  if(fissionBusy)return; fissionBusy=true;
  $("#fissionStage").classList.add("run"); $("#fissionReadout").textContent="STATUS: FISSION IN PROGRESS";
  setTimeout(()=>$("#fissionReadout").textContent="STATUS: ENERGY + NEUTRONS RELEASED",1300);
  setTimeout(()=>{
    $("#fissionStage").classList.remove("run"); $("#fissionReadout").textContent="STATUS: READY"; fissionBusy=false;
    showMeme("💥","Nucleus successfully split","U-235 has left the chat. The neutrons have invited their friends.",50);
  },2750);
});

const comp={
 fuel:["Nuclear fuel","Fuel rods contain fissile material. U-235 can absorb a neutron, fission and release energy plus additional neutrons."],
 moderator:["Moderator","In many thermal reactors, water or graphite slows fast neutrons. Slower neutrons can be more effective at causing U-235 fission."],
 control:["Control rods","Control rods contain neutron-absorbing materials. Inserting them absorbs more neutrons and reduces reactivity."],
 coolant:["Coolant","Coolant carries heat away from the core. In light-water reactors, ordinary water often serves as both coolant and moderator."],
 containment:["Containment","A strong engineered barrier surrounds major reactor systems and forms one layer of defence in depth."]
};
$$("[data-comp]").forEach(b=>b.addEventListener("click",()=>{
  const [h,p]=comp[b.dataset.comp];
  $("#componentInfo").innerHTML=`<span class="eyebrow">REACTOR COMPONENT</span><h3>${h}</h3><p>${p}</p>`;
  addXP(5);
}));

$$(".game-tab").forEach(tab=>tab.addEventListener("click",()=>{
  $$(".game-tab").forEach(x=>x.classList.remove("active")); tab.classList.add("active");
  $$(".game-panel").forEach(x=>x.classList.remove("active")); $("#"+tab.dataset.game).classList.add("active");
}));

// ---------- STAR FIELD ----------
const star=$("#starField"), sctx=star.getContext("2d");
let stars=[];
function resizeStars(){star.width=innerWidth;star.height=innerHeight;stars=Array.from({length:Math.min(130,Math.floor(innerWidth/8))},()=>({x:Math.random()*star.width,y:Math.random()*star.height,r:Math.random()*1.4+.3,v:Math.random()*.18+.03}))}
function drawStars(){sctx.clearRect(0,0,star.width,star.height);for(const s of stars){s.y-=s.v;if(s.y<0)s.y=star.height;sctx.beginPath();sctx.fillStyle=`rgba(88,228,255,${.18+s.r*.15})`;sctx.arc(s.x,s.y,s.r,0,Math.PI*2);sctx.fill()}requestAnimationFrame(drawStars)}
addEventListener("resize",resizeStars); resizeStars();drawStars();

// ---------- ORIGINAL WEB AUDIO MUSIC ----------
let audioCtx=null,musicOn=false,musicNodes=[];
function startMusic(){
  audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
  const master=audioCtx.createGain(); master.gain.value=.04; master.connect(audioCtx.destination);
  const notes=[110,164.81,220];
  notes.forEach((f,i)=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type=i===0?"sine":"triangle";o.frequency.value=f;g.gain.value=i===0?.55:.2;
    o.connect(g);g.connect(master);o.start();musicNodes.push(o,g);
  });
  const lfo=audioCtx.createOscillator(),lfoG=audioCtx.createGain();lfo.frequency.value=.09;lfoG.gain.value=.012;lfo.connect(lfoG);lfoG.connect(master.gain);lfo.start();musicNodes.push(lfo,lfoG,master);
}
function stopMusic(){musicNodes.forEach(n=>{try{if(n.stop)n.stop()}catch{}});musicNodes=[]}
$("#musicBtn").addEventListener("click",()=>{
  musicOn=!musicOn;if(musicOn){startMusic();$("#musicBtn").textContent="♫ Music: On"}else{stopMusic();$("#musicBtn").textContent="♫ Music: Off"}
});

// ---------- GAME 1: NEUTRON DASH ----------
const dc=$("#dashCanvas"), dctx=dc.getContext("2d");
let dash={running:false,x:450,score:0,items:[],keys:{},lastSpawn:0};
function drawDashBackground(){
  const grd=dctx.createLinearGradient(0,0,0,dc.height);grd.addColorStop(0,"#071923");grd.addColorStop(1,"#040a0e");dctx.fillStyle=grd;dctx.fillRect(0,0,dc.width,dc.height);
  dctx.strokeStyle="rgba(88,228,255,.07)";for(let x=0;x<dc.width;x+=50){dctx.beginPath();dctx.moveTo(x,0);dctx.lineTo(x,dc.height);dctx.stroke()}for(let y=0;y<dc.height;y+=50){dctx.beginPath();dctx.moveTo(0,y);dctx.lineTo(dc.width,y);dctx.stroke()}
}
function drawNucleus(x,y,type){
  if(type==="u"){dctx.fillStyle="#cf5858";dctx.shadowColor="#ff6363";dctx.shadowBlur=18}else{dctx.fillStyle="#65757e";dctx.shadowColor="#fff";dctx.shadowBlur=4}
  dctx.beginPath();dctx.arc(x,y,type==="u"?22:18,0,Math.PI*2);dctx.fill();dctx.shadowBlur=0;dctx.fillStyle="#fff";dctx.font="bold 12px sans-serif";dctx.textAlign="center";dctx.fillText(type==="u"?"U-235":"ABS",x,y+4)
}
function dashLoop(ts){
  drawDashBackground();
  if(dash.running){
    if(dash.keys.ArrowLeft||dash.keys.a)dash.x-=6;if(dash.keys.ArrowRight||dash.keys.d)dash.x+=6;dash.x=Math.max(25,Math.min(dc.width-25,dash.x));
    if(ts-dash.lastSpawn>680){dash.lastSpawn=ts;dash.items.push({x:35+Math.random()*(dc.width-70),y:-25,type:Math.random()<.72?"u":"a",v:2.8+Math.random()*1.8})}
    dash.items.forEach(it=>it.y+=it.v);
    dash.items=dash.items.filter(it=>{
      const hit=Math.hypot(it.x-dash.x,it.y-(dc.height-42))<38;
      if(hit){
        if(it.type==="u"){dash.score++;$("#dashScore").textContent=dash.score;if(dash.score>=8){dash.running=false;showMeme("😎","Chain-reaction gamer moment","You found 8 U-235 targets without getting absorbed. Neutron skills: certified.",150)}}
        else{dash.score=Math.max(0,dash.score-1);$("#dashScore").textContent=dash.score;toast("Absorber captured your neutron! -1")}
        return false
      }
      return it.y<dc.height+30
    })
  }
  dash.items.forEach(it=>drawNucleus(it.x,it.y,it.type==="u"?"u":"a"));
  dctx.fillStyle="#58e4ff";dctx.shadowColor="#58e4ff";dctx.shadowBlur=18;dctx.beginPath();dctx.arc(dash.x,dc.height-42,16,0,Math.PI*2);dctx.fill();dctx.shadowBlur=0;dctx.fillStyle="#041016";dctx.font="bold 12px sans-serif";dctx.fillText("n",dash.x,dc.height-38);
  requestAnimationFrame(dashLoop)
}
requestAnimationFrame(dashLoop);
function startDash(){dash.running=true;dash.score=0;dash.items=[];dash.x=dc.width/2;$("#dashScore").textContent="0";toast("Neutron Dash started")}
$("#dashStart").addEventListener("click",startDash);
addEventListener("keydown",e=>{dash.keys[e.key]=true});addEventListener("keyup",e=>{dash.keys[e.key]=false});
let holdL=false,holdR=false;
$("#dashLeft").onpointerdown=()=>dash.keys.ArrowLeft=true;$("#dashLeft").onpointerup=()=>dash.keys.ArrowLeft=false;$("#dashLeft").onpointerleave=()=>dash.keys.ArrowLeft=false;
$("#dashRight").onpointerdown=()=>dash.keys.ArrowRight=true;$("#dashRight").onpointerup=()=>dash.keys.ArrowRight=false;$("#dashRight").onpointerleave=()=>dash.keys.ArrowRight=false;

// ---------- GAME 2: CONTROL RODS ----------
let control={running:false,k:1,drift:0,end:0,stable:0,timer:null};
function updateRodVisual(){
  const rod=+$("#rodSlider").value;$("#rodPercent").textContent=rod+"%";$("#rodGraphic").style.top=`${-70+rod*1.1}px`;
  if(!control.running){control.k=1+(50-rod)*.004;renderK()}
}
function renderK(){
  const k=control.k;$("#kDisplay").textContent=k.toFixed(3);
  const pct=Math.max(0,Math.min(100,50+(k-1)*140));$("#meterNeedle").style.left=`calc(${pct}% - 2px)`;
}
$("#rodSlider").addEventListener("input",updateRodVisual);updateRodVisual();
$("#controlStart").addEventListener("click",()=>{
  if(control.running)return;control.running=true;control.k=1;control.drift=0;control.end=performance.now()+20000;control.stable=0;
  $("#controlStart").textContent="CONTROL ACTIVE";
  control.timer=setInterval(()=>{
    const now=performance.now(),rod=+$("#rodSlider").value;
    control.drift+=((Math.random()-.5)*.018);control.drift*=.92;
    const rodEffect=(50-rod)*.0017;
    control.k+=control.drift+rodEffect-control.k*.001+0.001;
    control.k=Math.max(.72,Math.min(1.28,control.k));renderK();
    const left=Math.max(0,(control.end-now)/1000);$("#controlTime").textContent=left.toFixed(1);
    if(Math.abs(control.k-1)<=.035)control.stable+=.1;
    if(left<=0){
      clearInterval(control.timer);control.running=false;$("#controlStart").textContent="START 20s CHALLENGE";
      if(control.stable>=12)showMeme("🧠","Critical and emotionally stable","You kept the reactor near k = 1 long enough. Control rods understood.",180);
      else showMeme("😅","The reactor has notes","Try moving the rods earlier and in smaller steps. Aim for k ≈ 1.","");
    }
  },100)
});

// ---------- GAME 3: DRAG / DROP ----------
let buildScore=0;
$$(".draggable-part").forEach(p=>p.addEventListener("dragstart",e=>e.dataTransfer.setData("text/plain",p.dataset.part)));
$$(".drop-zone").forEach(z=>{
  z.addEventListener("dragover",e=>{e.preventDefault();z.classList.add("over")});
  z.addEventListener("dragleave",()=>z.classList.remove("over"));
  z.addEventListener("drop",e=>{
    e.preventDefault();z.classList.remove("over");const part=e.dataTransfer.getData("text/plain");
    if(z.classList.contains("correct"))return;
    if(part===z.dataset.accept){
      z.classList.add("correct");z.querySelector("span").textContent=`✓ ${part.toUpperCase()}`;
      $(`.draggable-part[data-part="${part}"]`).classList.add("placed");buildScore++;$("#buildScore").textContent=buildScore;
      $("#buildFeedback").textContent=comp[part]?.[1]||"Correct placement.";
      addXP(25);
      if(buildScore===5)showMeme("🏗️","Reactor assembled!","Your engineering team did not put the control rods in the parking lot. Excellent.",175);
    }else{$("#buildFeedback").textContent="Not there. Think about what this component must physically do.";toast("Wrong zone — try again")}
  })
});

// ---------- GAME 4: QUIZ ----------
const quiz=[
 ["What does 'critical' mean for a steady reactor chain reaction?",["The core is exploding","On average, one fission leads to one further fission","The coolant is boiling","The reactor is shut down"],1,"Criticality is a balance condition: the chain reaction sustains itself at a steady rate."],
 ["Why is a moderator useful in many U-235 thermal reactors?",["It slows neutrons","It creates uranium","It generates electricity","It stores waste"],0,"Moderators reduce neutron kinetic energy. Thermal neutrons are effective at causing U-235 fission."],
 ["Which reactor boils water directly inside the reactor vessel?",["PWR","BWR","Both always","Neither"],1,"A BWR makes steam directly in the vessel; a PWR transfers heat to a separate secondary loop."],
 ["After a reactor shuts down, why is cooling still required?",["Electrons keep spinning","Decay heat continues from radioactive fission products","The turbine creates new fission","Gravity makes heat"],1,"Fission power collapses after shutdown, but radioactive decay continues to generate residual heat."],
 ["What feedback contributed strongly to the Chernobyl power excursion?",["Positive void-reactivity feedback","Solar heating","Negative gravity feedback","Magnetic fusion"],0,"Under accident conditions, more steam voids could increase reactivity, driving still more power and boiling."],
 ["What is the central difference between fission and fusion?",["Fission splits heavy nuclei; fusion joins light nuclei","Fission uses electrons; fusion uses sound","They are identical","Fusion splits uranium"],0,"Fission and fusion both change nuclei, but in opposite directions."],
 ["What do control rods mainly do?",["Absorb neutrons","Slow turbines","Create steam","Cool the condenser"],0,"Neutron absorbers change reactivity and therefore the fission rate."],
 ["Where does most reactor electricity ultimately come from?",["Direct electric charge from uranium","A steam-driven turbine-generator cycle","Solar panels on containment","Magnets around fuel"],1,"Fission provides heat; the plant then uses a conventional thermal power cycle."],
 ["Why can fission release energy?",["Products can be more tightly bound and have lower total mass-energy","Protons disappear","Neutrons become photons only","Energy comes from water"],0,"The products sit in a more favourable binding-energy region; mass-energy differences emerge as released energy."],
 ["Which statement about fusion is correct?",["It powers the Sun","It is the commercial power source in today's fission reactors","It requires no high temperatures","It is chemical combustion"],0,"Fusion powers stars. Controlled fusion on Earth requires extreme plasma conditions and remains an active research field."]
];
let qi=0,qs=0;
function loadQuiz(){
  const q=quiz[qi];$("#quizNo").textContent=qi+1;$("#quizQuestion").textContent=q[0];$("#quizChoices").innerHTML="";
  q[1].forEach((c,i)=>{const b=document.createElement("button");b.textContent=c;b.onclick=()=>answerQuiz(i,b);$("#quizChoices").appendChild(b)});
  $("#quizExplanation").textContent="";
}
function answerQuiz(i,b){
  const q=quiz[qi];$$("#quizChoices button").forEach(x=>x.disabled=true);
  if(i===q[2]){b.style.borderColor="var(--green)";b.style.color="var(--green)";qs++;addXP(35);$("#quizExplanation").textContent="✓ Correct. "+q[3]}
  else{b.style.borderColor="var(--red)";b.style.color="var(--red)";$("#quizExplanation").textContent="Not quite. "+q[3]}
  setTimeout(()=>{qi++;if(qi<quiz.length)loadQuiz();else{showMeme(qs>=8?"🏆":"🧪",qs>=8?"Nuclear brain activated":"Mission complete",`You scored ${qs}/10. ${qs>=8?"The nucleus fears your knowledge.":"Review the case files and try again."}`,qs>=8?250:100);qi=0;qs=0;loadQuiz()}},1500)
}
loadQuiz();

// ---------- TUTOR ----------
const tutorRules=[
 {keys:["what is nuclear fission","fission"],answer:"Nuclear fission is the splitting of a heavy atomic nucleus into smaller nuclei. In a common reactor example, U-235 absorbs a neutron, becomes excited and may split, releasing fission fragments, radiation, energy and usually a few neutrons. Those neutrons can cause further fissions."},
 {keys:["fusion","fission vs fusion","difference"],answer:"Fission splits heavy nuclei, while fusion joins light nuclei. Fission is used in today's nuclear power reactors. Fusion powers the Sun and stars; on Earth it requires extremely hot plasma and sufficient confinement to make nuclei collide often enough."},
 {keys:["moderator","slow neutron"],answer:"A moderator reduces neutron kinetic energy through collisions. In thermal reactors, slow neutrons are especially effective at causing U-235 fission. Ordinary water serves as moderator in PWRs and BWRs."},
 {keys:["control rod","control rods"],answer:"Control rods contain neutron-absorbing materials. Pushing them farther into the core removes more neutrons from the chain reaction, which reduces reactivity and power."},
 {keys:["critical","criticality","k"],answer:"The multiplication factor k describes how the neutron population changes. k < 1 is subcritical, k ≈ 1 is a steady self-sustaining critical chain reaction, and k > 1 is supercritical."},
 {keys:["chernobyl","void"],answer:"From a physics perspective, an important Chernobyl factor was positive void reactivity under the accident conditions. As water turned to steam, neutron behaviour changed in a way that could increase reactivity. More reactivity raised power, which caused more boiling — a positive feedback loop. Reactor design and operating conditions both mattered."},
 {keys:["fukushima","decay heat","tsunami"],answer:"At Fukushima Daiichi, the reactors shut down after the earthquake, but shutdown does not remove decay heat. The tsunami caused severe loss of electrical power and cooling capability, making continued heat removal difficult. This is why backup power and diverse emergency cooling paths matter."},
 {keys:["pwr"],answer:"A Pressurized Water Reactor keeps primary coolant at high pressure so it does not boil in the core. It transfers heat through a steam generator to a separate secondary loop."},
 {keys:["bwr"],answer:"A Boiling Water Reactor allows water to boil directly inside the reactor vessel. The steam goes to the turbine, then is condensed and recirculated."},
 {keys:["waste","spent fuel"],answer:"Used nuclear fuel remains radioactive and produces decay heat. It is first cooled and shielded, commonly in spent-fuel pools, and may later be moved to dry storage or managed according to national recycling/disposal policies."},
 {keys:["binding energy","e=mc","mass defect"],answer:"Binding energy is the energy associated with holding a nucleus together. Fission products can lie in a more tightly bound region than a very heavy nucleus such as uranium, so the final total mass-energy can be lower. The difference appears as released energy, consistent with E = mc²."}
];
function tutorAnswer(text){
  const t=text.toLowerCase();
  let best=null,bestScore=0;
  for(const r of tutorRules){let score=0;for(const k of r.keys)if(t.includes(k))score+=k.split(" ").length;if(score>bestScore){best=r;bestScore=score}}
  if(best)return best.answer;
  return "I’m the offline version of Nucleus Tutor, so my knowledge is curated rather than fully generative. Try asking about fission, fusion, U-235, moderators, control rods, criticality, PWR/BWR, Chernobyl, Fukushima, binding energy or nuclear waste.";
}
function addChat(role,text){
  const d=document.createElement("div");d.className="msg "+role;d.innerHTML=`<b>${role==="bot"?"Nucleus Tutor":"You"}</b><p></p>`;d.querySelector("p").textContent=text;$("#chatLog").appendChild(d);$("#chatLog").scrollTop=$("#chatLog").scrollHeight
}
$("#chatForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#chatInput").value.trim();if(!v)return;addChat("user",v);$("#chatInput").value="";setTimeout(()=>addChat("bot",tutorAnswer(v)),250)});
$$(".suggestion").forEach(b=>b.addEventListener("click",()=>{addChat("user",b.textContent);setTimeout(()=>addChat("bot",tutorAnswer(b.textContent)),220)}));
