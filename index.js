<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<title>Signal AFK</title>
<style>
  :root{--bg:#0d0f14;--card:#161a22;--card2:#1d222c;--card3:#232936;--txt:#e7eaf0;--dim:#8b93a3;--on:#37d67a;--off:#e05555;--warn:#e0a337;--conn:#4a9de0;--accent:#8b5cf6;--slot:#0f131a;}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
  body{margin:0;background:var(--bg);color:var(--txt);font:15px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;-webkit-text-size-adjust:100%}
  header{position:sticky;top:0;z-index:5;background:linear-gradient(180deg,#0d0f14,#0d0f14ee);padding:14px 16px 10px;border-bottom:1px solid #ffffff10;backdrop-filter:blur(6px);display:flex;align-items:center;gap:10px}
  h1{margin:0;font-size:17px;letter-spacing:.5px}
  .sub{color:var(--dim);font-size:12px}
  .wrap{padding:12px;display:grid;gap:12px;grid-template-columns:1fr;max-width:760px;margin:0 auto}
  .card{background:var(--card);border:1px solid #ffffff0d;border-radius:14px;overflow:hidden}
  .head{display:flex;align-items:center;gap:10px;padding:13px 14px;cursor:pointer}
  .dot{width:11px;height:11px;border-radius:50%;flex:0 0 auto;box-shadow:0 0 8px currentColor}
  .name{font-weight:650;font-size:16px}
  .host{color:var(--dim);font-size:11px}
  .st{margin-left:auto;font-size:11px;text-transform:uppercase;letter-spacing:.6px;font-weight:700}
  .body{display:none;padding:0 14px 14px;border-top:1px solid #ffffff0d}
  .card.open .body{display:block}
  .bars{display:flex;gap:8px;margin:12px 0}
  .bar{flex:1;height:7px;border-radius:6px;background:#ffffff12;overflow:hidden}
  .bar > i{display:block;height:100%;border-radius:6px;transition:width .3s}
  .hp>i{background:var(--off)} .fd>i{background:var(--warn)}
  .meta{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:12px;color:var(--dim);margin-bottom:10px}
  .meta b{color:var(--txt);font-weight:600}
  .tabs{display:flex;gap:6px;margin:6px 0 10px}
  .tab{flex:1;text-align:center;padding:8px 4px;background:var(--card2);border-radius:8px;font-size:12px;font-weight:600;color:var(--dim)}
  .tab.on{background:var(--accent);color:#fff}
  .pane{display:none}.pane.on{display:block}
  button{background:var(--card2);color:var(--txt);border:1px solid #ffffff12;border-radius:9px;padding:9px;font-size:13px;font-weight:600}
  button:active{transform:scale(.96)}
  button.p{background:var(--accent);border:none;color:#fff}
  button.stop{color:var(--off)} button.warn{color:var(--warn)}
  .btns{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
  .btns button{flex:1;min-width:84px}
  /* movement pad */
  .pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:240px;margin:6px auto}
  .pad button{padding:16px 0;font-size:16px}
  .pad .sp{visibility:hidden}
  .move-extra{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:240px;margin:8px auto 0}
  .toggle{display:flex;align-items:center;gap:8px;justify-content:center;margin-top:10px;font-size:13px;color:var(--dim)}
  /* chat */
  .log{background:var(--slot);border-radius:9px;height:150px;overflow-y:auto;padding:8px 10px;font-size:12px;line-height:1.5;color:var(--dim);word-break:break-word}
  .log div{margin-bottom:2px}
  .chatrow{display:flex;gap:8px;margin-top:8px}
  .chatrow input{flex:1;background:var(--slot);border:1px solid #ffffff14;color:var(--txt);border-radius:9px;padding:10px 12px;font-size:14px}
  .quick{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .quick button{flex:0 0 auto;padding:6px 10px;font-size:12px}
  /* inventory */
  .invsec{font-size:11px;color:var(--dim);margin:10px 0 4px;text-transform:uppercase;letter-spacing:.5px}
  .invgrid{display:grid;grid-template-columns:repeat(9,1fr);gap:4px}
  .slot{position:relative;aspect-ratio:1;background:var(--slot);border:1px solid #ffffff0d;border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .slot.sel{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent)}
  .slot img{width:100%;height:100%;image-rendering:pixelated}
  .slot .ab{position:absolute;font-size:8px;color:#bfc7d5;letter-spacing:-.5px;text-align:center;padding:1px;line-height:1.05}
  .slot .ct{position:absolute;right:1px;bottom:0;font-size:11px;font-weight:700;color:#fff;text-shadow:0 1px 2px #000,0 0 2px #000}
  .invact{display:flex;gap:8px;margin-top:10px;align-items:center}
  .invact .selname{flex:1;font-size:12px;color:var(--dim)}
  /* map */
  .mapwrap{position:relative;background:var(--slot);border-radius:10px;overflow:hidden;margin-top:6px}
  canvas{display:block;width:100%;image-rendering:pixelated}
  .maprow{display:flex;gap:8px;align-items:center;margin-top:8px;font-size:12px;color:var(--dim)}
  .maprow button{flex:0 0 auto;padding:7px 12px}
  /* server + danger */
  .srvrow{display:grid;grid-template-columns:2fr 1fr;gap:8px;margin-top:8px}
  .srvrow input{background:var(--slot);border:1px solid #ffffff14;color:var(--txt);border-radius:8px;padding:9px 10px;font-size:13px;min-width:0}
  input,select{font-family:inherit}
  .gate{position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;padding:24px;z-index:20}
  .gate input{background:var(--card);border:1px solid #ffffff18;color:var(--txt);border-radius:10px;padding:12px 14px;font-size:16px;width:min(320px,90vw)}
  .gate button{width:min(320px,90vw);background:var(--accent);border:none;padding:12px}
  .add{background:var(--card);border:1px dashed #ffffff20;border-radius:14px;padding:14px}
  .add input{width:100%;background:var(--slot);border:1px solid #ffffff14;color:var(--txt);border-radius:8px;padding:10px 12px;font-size:14px;margin-bottom:8px}
  .iconbtn{background:none;border:none;font-size:20px;padding:4px 8px;color:var(--dim)}
</style>
</head>
<body>
<div class="gate" id="gate">
  <h1>Signal AFK</h1>
  <input id="pw" type="password" placeholder="Dashboard password" autocomplete="current-password">
  <button onclick="connect()">Connect</button>
  <div id="gateErr" class="sub" style="color:var(--off)"></div>
</div>

<header>
  <div><h1>Signal AFK</h1><div class="sub" id="summary">connecting…</div></div>
  <button class="iconbtn" style="margin-left:auto" onclick="refreshAll()" title="refresh">⟳</button>
</header>
<div class="wrap" id="wrap"></div>
<div class="wrap">
  <div class="add">
    <div class="invsec" style="margin-top:0">Add account</div>
    <input id="a_user" placeholder="Microsoft email / username" autocapitalize="off" autocomplete="off">
    <input id="a_label" placeholder="Label (IGN, optional)" autocapitalize="off" autocomplete="off">
    <div class="srvrow" style="margin-top:0">
      <input id="a_host" placeholder="Server host (blank = default)" autocapitalize="off">
      <input id="a_port" placeholder="Port" inputmode="numeric">
    </div>
    <button class="p" style="width:100%;margin-top:8px" onclick="addAccount()">+ Add account</button>
    <div class="sub" id="addErr" style="color:var(--off);margin-top:6px"></div>
    <div class="sub" style="margin-top:6px">First run for a new account prints a device-code link in the VPS logs (<code>pm2 logs</code>) — approve it once at microsoft.com/link.</div>
  </div>
</div>

<script src="/socket.io/socket.io.js"></script>
<script>
let socket, ICONS={};
const S={}, INV={}, LOGS={}, UI={};   // states, inventories, chat logs, per-card ui state
const $=(id)=>document.getElementById(id);
const esc=(s)=>String(s==null?'':s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const sc=(s)=>({online:'var(--on)',connecting:'var(--conn)',offline:'var(--off)',kicked:'var(--warn)',error:'var(--off)',disconnected:'#c084fc',stopped:'var(--dim)'}[s]||'var(--dim)');
const upt=(s)=>{if(!s)return'—';const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?`${h}h ${m}m`:`${m}m`;};

fetch('/icons.json').then(r=>r.json()).then(j=>{ICONS=j;}).catch(()=>{});

function connect(){
  const password=$('pw').value||localStorage.getItem('afkpw')||'';
  socket=io({auth:{password}});
  socket.on('connect',()=>{localStorage.setItem('afkpw',password);$('gate').style.display='none';});
  socket.on('connect_error',(e)=>{$('gateErr').textContent=/unauth/i.test(e.message)?'Wrong password':e.message;localStorage.removeItem('afkpw');$('gate').style.display='flex';});
  socket.on('states',(all)=>{Object.values(all).forEach(s=>{S[s.username]=s;render(s.username);});summary();});
  socket.on('state',(s)=>{S[s.username]=s;render(s.username);summary();});
  socket.on('inventories',(all)=>{Object.assign(INV,all);Object.keys(all).forEach(u=>drawInv(u));});
  socket.on('inventory',(inv)=>{INV[inv.username]=inv;drawInv(inv.username);});
  socket.on('removed',(u)=>{const c=$('card_'+cid(u));if(c)c.remove();delete S[u];summary();});
}

const cid=(u)=>u.replace(/[^a-z0-9]/gi,'_');
function ensureCard(u){
  let el=$('card_'+cid(u));
  if(el)return el;
  UI[u]=UI[u]||{open:false,tab:'ctrl',sel:null};
  el=document.createElement('div');el.className='card';el.id='card_'+cid(u);
  $('wrap').appendChild(el);
  return el;
}

function render(u){
  const s=S[u];if(!s)return;
  const el=ensureCard(u);const ui=UI[u];
  const cc=(s.controls||{});
  el.className='card'+(ui.open?' open':'');
  el.innerHTML=`
   <div class="head" onclick="toggle('${u}')">
     <span class="dot" style="color:${sc(s.status)}"></span>
     <div><div class="name">${esc(s.label||u)}</div><div class="host">${esc(s.host||'')}${s.pos?' · '+s.pos.x+', '+s.pos.y+', '+s.pos.z:''}</div></div>
     <span class="st" style="color:${sc(s.status)}">${s.status}</span>
   </div>
   <div class="body">
     <div class="bars"><div class="bar hp"><i style="width:${(s.health||0)/20*100}%"></i></div><div class="bar fd"><i style="width:${(s.food||0)/20*100}%"></i></div></div>
     <div class="meta">
       <span>Uptime <b>${upt(s.uptime)}</b></span>
       <span>Reconnects <b>${s.reconnects||0}</b></span>
       ${s.health!=null?`<span>HP <b>${s.health}</b></span>`:''}
       ${s.food!=null?`<span>Food <b>${s.food}</b></span>`:''}
     </div>
     ${s.error?`<div class="sub" style="color:var(--off);margin-bottom:8px">⚠ ${esc(s.error)}</div>`:''}

     <div class="tabs">
       <div class="tab ${ui.tab==='ctrl'?'on':''}" onclick="setTab('${u}','ctrl')">Move</div>
       <div class="tab ${ui.tab==='chat'?'on':''}" onclick="setTab('${u}','chat')">Chat</div>
       <div class="tab ${ui.tab==='inv'?'on':''}" onclick="setTab('${u}','inv')">Items</div>
       <div class="tab ${ui.tab==='map'?'on':''}" onclick="setTab('${u}','map')">Map</div>
     </div>

     <div class="pane ${ui.tab==='ctrl'?'on':''}">
       <div class="pad">
         <button class="sp"></button>${hold(u,'forward','▲')}<button class="sp"></button>
         ${hold(u,'left','◀')}${hold(u,'jump','⤒')}${hold(u,'right','▶')}
         <button class="sp"></button>${hold(u,'back','▼')}<button class="sp"></button>
       </div>
       <div class="move-extra">
         <button onpointerdown="turn('${u}',-0.6)">↺ Turn L</button>
         <button onpointerdown="turn('${u}',0.6)">Turn R ↻</button>
         ${hold(u,'sneak','Sneak')}
         <button class="${cc.sprint?'p':''}" onclick="sprint('${u}',${!cc.sprint})">Sprint ${cc.sprint?'ON':'OFF'}</button>
       </div>
       <button style="width:100%;margin-top:10px" class="warn" onclick="socket.emit('clearControls','${u}')">■ Stop moving</button>
       <div class="toggle"><label><input type="checkbox" ${s.antiAfk?'checked':''} onchange="socket.emit('setAntiAfk',{u:'${u}',on:this.checked})"> Anti-AFK jiggle</label></div>
     </div>

     <div class="pane ${ui.tab==='chat'?'on':''}">
       <div class="log" id="log_${cid(u)}"></div>
       <div class="quick">
         <button onclick="send('${u}','/afk')">/afk</button>
         <button onclick="send('${u}','/spawn')">/spawn</button>
         <button onclick="send('${u}','/warp')">/warp</button>
         <button onclick="send('${u}','/home')">/home</button>
       </div>
       <div class="chatrow">
         <input id="in_${cid(u)}" placeholder="type message or /command" autocapitalize="off" autocomplete="off"
                onkeydown="if(event.key==='Enter'){send('${u}',this.value);this.value='';}">
         <button class="p" onclick="const i=$('in_${cid(u)}');send('${u}',i.value);i.value='';">Send</button>
       </div>
     </div>

     <div class="pane ${ui.tab==='inv'?'on':''}" id="invpane_${cid(u)}"></div>

     <div class="pane ${ui.tab==='map'?'on':''}">
       <div class="mapwrap"><canvas id="map_${cid(u)}" width="320" height="320"></canvas></div>
       <div class="maprow"><button onclick="scanMap('${u}')">⟳ Scan</button><span id="mapinfo_${cid(u)}">tap Scan to see where you are</span></div>
     </div>

     <div class="srvrow">
       <input id="sv_${cid(u)}" placeholder="switch server host" value="${esc(s.host||'')}" autocapitalize="off">
       <button onclick="swapServer('${u}')">Swap</button>
     </div>
     <div class="btns">
       ${s.status==='disconnected'||s.status==='stopped'
         ? `<button class="p" onclick="socket.emit('reconnectBot','${u}')">Reconnect</button>`
         : `<button class="warn" onclick="socket.emit('disconnectBot','${u}')">Disconnect (free acct)</button>`}
       <button onclick="socket.emit('reconnectBot','${u}')">Rejoin</button>
       <button class="stop" onclick="if(confirm('Remove ${esc(s.label||u)} from the dashboard?'))socket.emit('removeAccount','${u}')">Remove</button>
     </div>
   </div>`;
  if(ui.tab==='inv')drawInv(u);
  if(ui.tab==='chat')paintLog(u);
}

function hold(u,ctrl,label){
  return `<button ontouchstart="hold('${u}','${ctrl}',1,event)" ontouchend="hold('${u}','${ctrl}',0,event)"
    onmousedown="hold('${u}','${ctrl}',1,event)" onmouseup="hold('${u}','${ctrl}',0,event)" onmouseleave="hold('${u}','${ctrl}',0)">${label}</button>`;
}
window.hold=(u,ctrl,on,ev)=>{if(ev)ev.preventDefault();socket.emit('control',{u,control:ctrl,active:!!on});};
window.turn=(u,dy)=>socket.emit('turn',{u,dyaw:dy});
window.sprint=(u,on)=>{socket.emit('control',{u,control:'sprint',active:on});};
window.send=(u,msg)=>{if(msg&&msg.trim())socket.emit('chat',{u,msg:msg.trim()});};
window.toggle=(u)=>{UI[u].open=!UI[u].open;render(u);if(UI[u].open&&UI[u].tab==='map')scanMap(u);};
window.setTab=(u,t)=>{UI[u].tab=t;render(u);if(t==='map')scanMap(u);};

function summary(){const v=Object.values(S);const on=v.filter(s=>s.status==='online').length;$('summary').textContent=`${on}/${v.length} online`;}

// ---- chat log ----
function paintLog(u){
  const el=$('log_'+cid(u));if(!el)return;
  el.innerHTML=(LOGS[u]||[]).map(m=>`<div>${esc(m)}</div>`).join('');
  el.scrollTop=el.scrollHeight;
}
// capture chat into per-account logs from state.lastChat
const _render=render;
function pushLog(u,line){LOGS[u]=LOGS[u]||[];if(LOGS[u][LOGS[u].length-1]===line)return;LOGS[u].push(line);if(LOGS[u].length>120)LOGS[u].shift();if(UI[u]&&UI[u].open&&UI[u].tab==='chat')paintLog(u);}

// ---- inventory ----
function icon(name){return ICONS[name]||null;}
function drawInv(u){
  const pane=$('invpane_'+cid(u));if(!pane)return;
  const inv=(INV[u]&&INV[u].slots)||[];
  const bySlot={};inv.forEach(it=>bySlot[it.slot]=it);
  const ui=UI[u];
  const cell=(slot)=>{
    const it=bySlot[slot];
    const selCls=ui.sel===slot?' sel':'';
    if(!it)return `<div class="slot${selCls}" onclick="pickSlot('${u}',${slot})"></div>`;
    const img=icon(it.name);
    const inner=img?`<img src="${img}" alt="">`:`<span class="ab">${esc(it.name.replace(/_/g,' ')).slice(0,10)}</span>`;
    return `<div class="slot${selCls}" onclick="pickSlot('${u}',${slot})" title="${esc(it.displayName||it.name)}">${inner}${it.count>1?`<span class="ct">${it.count}</span>`:''}</div>`;
  };
  const range=(a,b)=>{let h='';for(let i=a;i<=b;i++)h+=cell(i);return h;};
  const sel=ui.sel!=null?bySlot[ui.sel]:null;
  pane.innerHTML=`
    <div class="invsec">Hotbar</div><div class="invgrid">${range(36,44)}</div>
    <div class="invsec">Inventory</div><div class="invgrid">${range(9,35)}</div>
    <div class="invsec">Armor / offhand</div><div class="invgrid" style="grid-template-columns:repeat(9,1fr)">${range(5,8)}${cell(45)}</div>
    <div class="invact">
      <span class="selname">${sel?esc(sel.displayName||sel.name)+' ×'+sel.count:(ui.sel!=null?'empty slot':'tap an item')}</span>
      <button ${sel?'':'disabled'} class="warn" onclick="dropSel('${u}',false)">Drop 1</button>
      <button ${sel?'':'disabled'} class="stop" onclick="dropSel('${u}',true)">Drop all</button>
    </div>
    <div class="sub" style="margin-top:6px">Tap an item, then tap an empty slot to move it. Or use Drop.</div>`;
}
window.pickSlot=(u,slot)=>{
  const ui=UI[u];const inv=(INV[u]&&INV[u].slots)||[];const bySlot={};inv.forEach(it=>bySlot[it.slot]=it);
  if(ui.sel==null){ if(bySlot[slot]) ui.sel=slot; }         // select an item
  else if(ui.sel===slot){ ui.sel=null; }                    // deselect
  else { socket.emit('moveSlot',{u,from:ui.sel,to:slot}); ui.sel=null; }  // move to target
  drawInv(u);
};
window.dropSel=(u,all)=>{const ui=UI[u];if(ui.sel==null)return;socket.emit('dropSlot',{u,slot:ui.sel,all});ui.sel=null;setTimeout(()=>socket.emit('getInventory',u),300);};

// ---- minimap ----
const BCOL={grass_block:'#5b8a3a',dirt:'#6b4c33',stone:'#7d7d7d',cobblestone:'#6f6f6f',sand:'#d8cc8f',water:'#3a6ea5',oak_log:'#6e5230',oak_leaves:'#3f6f2f',oak_planks:'#9c7a4d',bedrock:'#333',netherrack:'#5a2727',gravel:'#7a7570',deepslate:'#3b3b42',spawner:'#1b6f6f'};
function bcol(n){if(!n)return'#0f131a';if(BCOL[n])return BCOL[n];if(/leaves/.test(n))return'#3f6f2f';if(/log|wood|planks/.test(n))return'#7a5c38';if(/water/.test(n))return'#3a6ea5';if(/sand/.test(n))return'#d8cc8f';if(/stone|deepslate|ore|cobble/.test(n))return'#6f7075';if(/dirt|grass|moss|farm/.test(n))return'#5b8a3a';if(/wool|concrete|terracotta/.test(n))return'#a06a9c';return'#4a4f5a';}
window.scanMap=(u)=>{
  if(!socket)return;
  socket.emit('scanMap',{u,radius:22},(m)=>{
    const cv=$('map_'+cid(u));if(!cv||!m)return;
    const ctx=cv.getContext('2d');const n=m.r*2+1;const px=cv.width/n;
    ctx.clearRect(0,0,cv.width,cv.height);
    m.cols.forEach(c=>{ctx.fillStyle=bcol(c.n);ctx.fillRect((c.x+m.r)*px,(c.z+m.r)*px,Math.ceil(px),Math.ceil(px));});
    // player marker (center) with facing
    const cx=cv.width/2,cy=cv.height/2;
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,px*0.7,0,7);ctx.fill();
    ctx.strokeStyle='#8b5cf6';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);
    const yaw=m.yaw||0;ctx.lineTo(cx-Math.sin(yaw)*px*2.2,cy+Math.cos(yaw)*px*2.2);ctx.stroke();
    $('mapinfo_'+cid(u)).textContent=`center ${m.center.x}, ${m.center.y}, ${m.center.z} · ${n}×${n} blocks`;
  });
};

// ---- server / accounts ----
window.swapServer=(u)=>{const h=$('sv_'+cid(u)).value.trim();if(!h)return;socket.emit('setServer',{u,host:h});};
window.addAccount=()=>{
  const username=$('a_user').value.trim();if(!username){$('addErr').textContent='email/username required';return;}
  const label=$('a_label').value.trim(),host=$('a_host').value.trim(),port=$('a_port').value.trim();
  socket.emit('addAccount',{username,label,host:host||undefined,port:port||undefined},(r)=>{
    if(r&&r.ok){$('a_user').value=$('a_label').value=$('a_host').value=$('a_port').value='';$('addErr').textContent='';}
    else $('addErr').textContent=(r&&r.error)||'failed';
  });
};
window.refreshAll=()=>{Object.keys(S).forEach(u=>{socket.emit('getInventory',u);if(UI[u]&&UI[u].open&&UI[u].tab==='map')scanMap(u);});};

// feed chat log from incoming states
const origOn={};
socketOnReady();
function socketOnReady(){
  // hook state to capture lastChat into logs
  const iv=setInterval(()=>{
    if(!socket)return;clearInterval(iv);
    socket.on('state',(s)=>{if(s.lastChat)pushLog(s.username,s.lastChat);});
  },200);
}

if(localStorage.getItem('afkpw')){$('pw').value=localStorage.getItem('afkpw');connect();}
</script>
</body>
</html>
