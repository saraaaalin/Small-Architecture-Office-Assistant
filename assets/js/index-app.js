const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "accentColor": "#286ea4",
  "headingFont": "dmsans",
  "spacing": "regular",
  "cardStyle": "shadow"
}/*EDITMODE-END*/;

function useTweaks() {
  const [t, setT] = useState(() => {
    try { const s = localStorage.getItem('saoa2'); return s ? {...TWEAK_DEFAULS, ...JSON.parse(s)} : TWEAK_DEFAULS; } catch { return TWEAK_DEFAULS; }
  });
  const update = (k, v) => setT(prev => { const n={...prev,[k]:v}; localStorage.setItem('saoa2',JSON.stringify(n)); window.parent.postMessage({type:'__edit_mode_set_keys',edits:{[k]:v}},'*'); return n; });
  return [t, update];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} }), {threshold:0.01,rootMargin:'0px 0px -30px 0px'});
    els.forEach(el => { if(el.getBoundingClientRect().top < window.innerHeight*1.1) el.classList.add('in'); else io.observe(el); });
    return ()=>io.disconnect();
  });
}

/* ─── helpers ─── */
const sp = (s) => ({compact:'60px 5vw',regular:'88px 5vw',airy:'120px 5vw'}[s]);
const cardStyle = (t, active) => ({
  background: 'white',
  border: t.cardStyle==='border' ? `1px solid var(--rule)` : t.cardStyle==='flat' ? '1px solid oklch(0.92 0.01 250)' : 'none',
  boxShadow: t.cardStyle==='shadow' ? (active ? `0 6px 32px ${t.accentColor}22` : 'var(--shadow-sm)') : 'none',
  borderRadius: t.cardStyle==='flat' ? 4 : 12,
});
const headingFont = (t) => t.headingFont==='cormorant' ? 'Cormorant Garamond, serif' : 'DM Sans, sans-serif';
const headingW = (t) => t.headingFont==='cormorant' ? 300 : 300;

/* ─── Nav ─── */
function Nav({t}) {
  const [sc, setSc] = useState(false);
  useEffect(()=>{ const h=()=>setSc(window.scrollY>32); window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h); },[]);
  return (
    <nav className="sa-nav-inner" style={{position:'fixed',top:0,left:0,right:0,zIndex:200,minHeight:58,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5vw',background:sc?'oklch(0.985 0.005 245/0.94)':'transparent',backdropFilter:sc?'blur(14px)':'none',borderBottom:sc?'1px solid var(--rule)':'1px solid transparent',transition:'all 0.3s'}}>
      <div style={{display:'flex',alignItems:'center',gap:9}}>
        <LogoMark c={t.accentColor}/>
        <span style={{fontFamily:headingFont(t),fontWeight:600,fontSize:15,letterSpacing:'-.01em',color:'var(--text)'}}>SAOA</span>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'var(--t3)',marginLeft:4,letterSpacing:'.04em'}}>v1.0</span>
      </div>
      <div className="sa-nav-links" style={{display:'flex',gap:24,alignItems:'center'}}>
        {[['Problem','#problem'],['Platform','#platform'],['Modules','#modules'],['Collaborate','#workflow']].map(([l,h])=>(
          <a key={l} href={h} style={{fontSize:13,fontWeight:500,color:'var(--t2)',textDecoration:'none',letterSpacing:'.01em',transition:'color .2s'}}
             onMouseEnter={e=>e.target.style.color=t.accentColor} onMouseLeave={e=>e.target.style.color='var(--t2)'}>{l}</a>
        ))}
        <a href="structure-assistant.html" style={{background:t.accentColor,color:'white',padding:'7px 16px',borderRadius:7,fontSize:13,fontWeight:500,textDecoration:'none',letterSpacing:'.01em',transition:'opacity .2s'}}
           onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
          Structure Assistant →
        </a>
      </div>
    </nav>
  );
}

function LogoMark({c}) {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="1.5" y="1.5" width="19" height="19" rx="4" stroke={c} strokeWidth="1.4"/><path d="M6 16L11 6l5 10" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.8 12.5h6.4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

/* ─── Hero ─── */
function Hero({t}) {
  return (
    <section style={{position:'relative',minHeight:'94vh',display:'flex',flexDirection:'column',justifyContent:'center',padding:sp(t.spacing),paddingTop:`calc(${sp(t.spacing).split(' ')[0]} + 58px)`,overflow:'hidden'}}>
      <GridBg/>
      <div style={{position:'relative',maxWidth:820,zIndex:1}}>
        <div className="reveal" style={{display:'inline-flex',alignItems:'center',gap:8,background:`oklch(0.94 0.05 248/0.7)`,border:`1px solid oklch(0.82 0.08 248)`,borderRadius:20,padding:'4px 12px',marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:t.accentColor,display:'inline-block',flexShrink:0}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:11,fontWeight:500,color:t.accentColor,letterSpacing:'.05em'}}>Capstone Project · Columbia GSAPP · 2026</span>
        </div>
        <h1 className="reveal d1" style={{fontFamily:headingFont(t),fontWeight:headingW(t),fontSize:'clamp(40px,6.5vw,82px)',lineHeight:1.06,letterSpacing:'-.025em',marginBottom:10}}>
          Small Architecture<br/>
          <span style={{color:t.accentColor}}>Office Assistant</span>
        </h1>
        <p className="reveal d2" style={{fontSize:'clamp(16px,1.8vw,20px)',color:'var(--t2)',maxWidth:560,marginTop:22,marginBottom:12,lineHeight:1.55,fontWeight:300}}>
          A multi-tool platform for small architecture practices — specialized assistants that support faster early-stage decisions without a full consultant team at the very beginning.
        </p>
        <p className="reveal d3" style={{fontSize:14,color:'var(--t3)',maxWidth:520,marginBottom:44,lineHeight:1.7}}>
          Structure, sustainability, zoning, and building code — connected to Rhino and Grasshopper so guidance stays inside the model, not in a separate inbox.
        </p>
        <div className="reveal d4" style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
          <a href="structure-assistant.html" style={{background:t.accentColor,color:'white',padding:'13px 26px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',letterSpacing:'.01em',boxShadow:`0 4px 18px ${t.accentColor}44`,transition:'all .2s'}}
             onMouseEnter={e=>{e.currentTarget.style.opacity='.88';e.currentTarget.style.transform='translateY(-1px)'}} onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='none'}}>
            Explore Structure Assistant
          </a>
          <a href="#platform" style={{color:'var(--t2)',padding:'13px 24px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',border:'1px solid var(--rule)',background:'white',transition:'all .2s'}}
             onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accentColor;e.currentTarget.style.color=t.accentColor}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--rule)';e.currentTarget.style.color='var(--t2)'}}>
            View platform ↓
          </a>
        </div>
        <div className="reveal d5" style={{display:'flex',gap:20,marginTop:48,paddingTop:32,borderTop:'1px solid var(--rule)',flexWrap:'wrap'}}>
          {[['4','Specialized assistants'],['1','Shipping today (Structure)'],['Rhino','Primary integration target']].map(([v,l])=>(
            <div key={l} style={{display:'flex',flexDirection:'column',gap:2}}>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:22,fontWeight:500,color:t.accentColor,letterSpacing:'-.02em'}}>{v}</span>
              <span style={{fontSize:12,color:'var(--t3)',fontWeight:500}}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="reveal d5 sa-hero-diagram" style={{position:'absolute',right:'4vw',top:'50%',transform:'translateY(-50%)',pointerEvents:'none',opacity:.65}}>
        <StructuralDiagram c={t.accentColor}/>
      </div>
    </section>
  );
}

function GridBg() {
  return <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(oklch(0.85 0.02 250/0.25) 1px,transparent 1px),linear-gradient(90deg,oklch(0.85 0.02 250/0.25) 1px,transparent 1px)',backgroundSize:'48px 48px',pointerEvents:'none',zIndex:0}}/>;
}

function StructuralDiagram({c}) {
  return (
    <svg width="380" height="360" viewBox="0 0 380 360" fill="none">
      {/* outer dashed boundary */}
      <rect x="30" y="30" width="320" height="300" rx="3" stroke={c} strokeWidth=".8" strokeDasharray="5 4" opacity=".2"/>
      {/* columns */}
      {[80,180,300].map(x=>(
        <g key={x}>
          <line x1={x} y1="80" x2={x} y2="260" stroke={c} strokeWidth="2.5" opacity=".5"/>
          {/* column base plate */}
          <rect x={x-8} y="255" width="16" height="6" rx="1" fill={c} opacity=".3"/>
          {/* column cap plate */}
          <rect x={x-8} y="79" width="16" height="6" rx="1" fill={c} opacity=".3"/>
        </g>
      ))}
      {/* primary beam */}
      <rect x="76" y="79" width="228" height="8" rx="1.5" fill={c} opacity=".45"/>
      {/* secondary beams */}
      <rect x="76" y="167" width="228" height="5" rx="1" fill={c} opacity=".25"/>
      {/* I-beam cross section hint at mid */}
      <g transform="translate(220, 168)" opacity=".55">
        <line x1="0" y1="-12" x2="0" y2="12" stroke={c} strokeWidth="1.5"/>
        <line x1="-7" y1="-12" x2="7" y2="-12" stroke={c} strokeWidth="1.5"/>
        <line x1="-7" y1="12" x2="7" y2="12" stroke={c} strokeWidth="1.5"/>
      </g>
      {/* load arrows */}
      {[110,180,250].map(x=>(
        <g key={x} opacity=".4">
          <line x1={x} y1="50" x2={x} y2="75" stroke={c} strokeWidth="1.2" strokeDasharray="3 2"/>
          <path d={`M${x-5} 70 L${x} 78 L${x+5} 70`} stroke={c} strokeWidth="1.2" fill="none" strokeLinejoin="round"/>
        </g>
      ))}
      {/* span dimension */}
      <line x1="80" y1="285" x2="300" y2="285" stroke={c} strokeWidth=".7" opacity=".35"/>
      <line x1="80" y1="281" x2="80" y2="289" stroke={c} strokeWidth=".9" opacity=".4"/>
      <line x1="300" y1="281" x2="300" y2="289" stroke={c} strokeWidth=".9" opacity=".4"/>
      <text x="190" y="299" textAnchor="middle" fontSize="9" fill={c} opacity=".4" fontFamily="DM Mono,monospace">8400</text>
      {/* height dimension */}
      <line x1="320" y1="83" x2="320" y2="261" stroke={c} strokeWidth=".7" opacity=".3"/>
      <line x1="316" y1="83" x2="324" y2="83" stroke={c} strokeWidth=".9" opacity=".35"/>
      <line x1="316" y1="261" x2="324" y2="261" stroke={c} strokeWidth=".9" opacity=".35"/>
      <text x="334" y="177" textAnchor="middle" fontSize="9" fill={c} opacity=".35" fontFamily="DM Mono,monospace" transform="rotate(90,334,177)">3600</text>
      {/* node circles */}
      {[[80,83],[180,83],[300,83],[80,172],[180,172],[300,172],[80,261],[180,261],[300,261]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={c} opacity=".55"/>
      ))}
      {/* label ghost lines */}
      <rect x="92" y="116" width="52" height="5" rx="1" fill={c} opacity=".10"/>
      <rect x="92" y="126" width="36" height="3.5" rx="1" fill={c} opacity=".07"/>
      {/* compass */}
      <circle cx="348" cy="56" r="14" stroke={c} strokeWidth=".7" opacity=".25"/>
      <text x="348" y="46" textAnchor="middle" fontSize="8" fill={c} opacity=".45" fontFamily="DM Mono,monospace">N</text>
      <line x1="348" y1="48" x2="348" y2="52" stroke={c} strokeWidth="1.2" opacity=".45"/>
    </svg>
  );
}

/* ─── Problem ─── */
function Problem({t}) {
  const items = [
    { icon: <IcoConsultant/>, title:'External consultant dependency', desc:'Small firms lean on outside structural, sustainability, zoning, and code expertise. Every technical question waits on calendars — while design keeps moving.'},
    { icon: <IcoClock/>, title:'Feedback arrives too late', desc:'Consultant input reaches the team after decisions have already calcified. Redesign at DD stage is expensive and disruptive to the project timeline.'},
    { icon: <IcoFragment/>, title:'No shared design context', desc:'Consultants receive snapshots, not live context. Coordination happens through PDFs and emails — not inside the environment where design actually happens.'},
  ];
  const cs = cardStyle(t, false);
  return (
    <section id="problem" style={{padding:sp(t.spacing),borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="01" title="Why this system exists" t={t}/>
        <p className="reveal" style={{fontSize:15,color:'var(--t2)',maxWidth:500,marginBottom:44,lineHeight:1.65}}>
          The workflow between small firms and their consultants is fragmented, slow, and reactive. This system is designed to change that.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18}}>
          {items.map((p,i)=>(
            <div key={i} className={`reveal d${i+1}`} style={{...cs,padding:'28px 26px',transition:'transform .2s,box-shadow .2s'}}
                 onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`var(--shadow-md)`;}}
                 onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=cs.boxShadow;}}>
              <div style={{color:t.accentColor,marginBottom:16,opacity:.9}}>{p.icon}</div>
              <h3 style={{fontFamily:headingFont(t),fontSize:17,fontWeight:600,marginBottom:10,lineHeight:1.3,letterSpacing:'-.01em'}}>{p.title}</h3>
              <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.7}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Platform Vision ─── */
function Platform({t}) {
  return (
    <section id="platform" style={{padding:sp(t.spacing),background:t.accentColor}}>
      <div className="sa-platform-grid" style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center'}}>
        <div>
          <div className="reveal" style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:28}}>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:11,fontWeight:500,color:'rgba(255,255,255,.5)',letterSpacing:'.08em'}}>02</span>
            <h2 style={{fontFamily:headingFont(t),fontSize:'clamp(26px,3.2vw,44px)',fontWeight:headingW(t),color:'white',letterSpacing:'-.02em',lineHeight:1.1}}>
              A new model of support<br/>for small firms
            </h2>
          </div>
          <p className="reveal d1" style={{fontSize:16,color:'rgba(255,255,255,.82)',lineHeight:1.75,marginBottom:18,maxWidth:440}}>
            The platform brings early-stage technical guidance into the architect's design environment — without replacing the professional consultant relationship.
          </p>
          <p className="reveal d2" style={{fontSize:13.5,color:'rgba(255,255,255,.58)',lineHeight:1.75,maxWidth:420}}>
            Architects work more productively, arrive at consultations better prepared, and make fewer costly errors between meetings. Consultants spend less time explaining fundamentals and more time on complex decisions.
          </p>
        </div>
        <div className="reveal d2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[
            {l:'Early-stage guidance',d:'At SD and DD, not just after'},
            {l:'Consultant-ready output',d:'Arrive at meetings prepared'},
            {l:'Fewer redesign cycles',d:'Catch structural issues early'},
            {l:'Rhino-native workflow',d:'Guidance inside your tool'},
          ].map((x,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.11)',border:'1px solid rgba(255,255,255,.16)',borderRadius:10,padding:'18px 16px'}}>
              <div style={{fontSize:13,fontWeight:600,color:'white',marginBottom:5,lineHeight:1.3}}>{x.l}</div>
              <div style={{fontSize:12,color:'rgba(255,255,255,.55)'}}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Modules ─── */
const MODULES = [
  { name:'Structure Assistant', consultant:'Structural Engineer', phases:['SD','DD'], status:'live', desc:'Early-stage structural layout suggestions in Rhino + Grasshopper: slab picking, materials, and suggested framing — before the SE joins the conversation.' },
  { name:'Sustainability Assistant', consultant:'Sustainability Consultant', phases:['SD','DD'], status:'soon', desc:'Energy, daylighting, and embodied carbon cues tied to early massing and envelope decisions.' },
  { name:'Zoning Assistant', consultant:'Zoning / Planning', phases:['Pre-Design','SD'], status:'soon', desc:'FAR, setbacks, height, and envelope checks against local controls while the scheme is still flexible.' },
  { name:'Code Assistant', consultant:'Code Consultant', phases:['SD','DD','CD'], status:'soon', desc:'Occupancy, egress, accessibility, and construction-type prompts aligned to early plans and Revit/Rhino context.' },
];

function Modules({t}) {
  const liveModule = MODULES[0];
  const futureModules = MODULES.slice(1);
  const cs = cardStyle(t, false);
  return (
    <section id="modules" style={{padding:sp(t.spacing),background:'var(--bg2)',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="03" title="Assistant modules" t={t}/>
        <p className="reveal" style={{fontSize:15,color:'var(--t2)',maxWidth:560,marginBottom:44,lineHeight:1.65}}>
          Four specialist assistants mirror the consultants small offices lean on first — structure, sustainability, zoning, and code — so you can stress-test ideas early instead of reserving every question for a billable hour.
        </p>

        {/* Featured live module */}
        <div className="reveal" style={{...cardStyle(t,true),border:`1.5px solid ${t.accentColor}`,padding:'32px 36px',marginBottom:16,position:'relative',display:'grid',gridTemplateColumns:'1fr auto',gap:32,alignItems:'center'}}>
          <div style={{position:'absolute',top:20,right:20}}>
            <span className="chip chip-live"><span style={{width:5,height:5,borderRadius:'50%',background:'oklch(0.45 0.18 145)',display:'inline-block'}}/>Live now</span>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <div style={{width:40,height:40,borderRadius:10,background:`oklch(0.92 0.06 248/.7)`,border:`1.5px solid oklch(0.78 0.10 248)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ModIco name="Structure Assistant" c={t.accentColor} sz={20}/>
              </div>
              <div>
                <div style={{fontFamily:headingFont(t),fontSize:20,fontWeight:600,letterSpacing:'-.01em',color:t.accentColor}}>{liveModule.name}</div>
                <div style={{fontSize:12,color:'var(--t3)',marginTop:1,fontFamily:'DM Mono,monospace',letterSpacing:'.03em'}}>Rhino Plugin · {liveModule.consultant}</div>
              </div>
            </div>
            <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.65,maxWidth:540,marginBottom:20}}>{liveModule.desc}</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              {liveModule.phases.map(ph=>(
                <span key={ph} className="chip chip-accent" style={{color:t.accentColor,borderColor:`${t.accentColor}66`}}>{ph}</span>
              ))}
              <span style={{fontSize:12,color:'var(--t3)',marginLeft:4}}>Schematic Design through Design Development</span>
            </div>
          </div>
          <a href="structure-assistant.html" style={{background:t.accentColor,color:'white',padding:'11px 22px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',whiteSpace:'nowrap',flexShrink:0,transition:'all .2s',boxShadow:`0 4px 16px ${t.accentColor}44`}}
             onMouseEnter={e=>{e.currentTarget.style.opacity='.88';e.currentTarget.style.transform='translateY(-1px)'}} onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='none'}}>
            View module →
          </a>
        </div>

        {/* Future modules */}
        <div className="sa-modules-future" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
          {futureModules.map((m,i)=>(
            <div key={i} className={`reveal d${i+1}`} style={{...cs,padding:'20px 18px',opacity:.72,filter:'saturate(0.6)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                <div style={{width:32,height:32,borderRadius:8,background:'oklch(0.93 0.01 250)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <ModIco name={m.name} c="oklch(0.62 0.02 250)" sz={16}/>
                </div>
                <span className="chip chip-soon">Soon</span>
              </div>
              <div style={{fontFamily:headingFont(t),fontSize:14,fontWeight:600,marginBottom:5,letterSpacing:'-.01em',lineHeight:1.3}}>{m.name}</div>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:10.5,color:'var(--t3)',marginBottom:8,letterSpacing:'.02em'}}>{m.consultant}</div>
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {m.phases.map(ph=><span key={ph} style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'var(--t3)',background:'oklch(0.93 0.01 250)',padding:'2px 7px',borderRadius:4}}>{ph}</span>)}
              </div>
            </div>
          ))}
        </div>
        <p style={{fontSize:12,color:'var(--t3)',marginTop:16,fontStyle:'italic',textAlign:'center'}}>Future modules will share a common data model and Rhino integration layer.</p>
      </div>
    </section>
  );
}

/* ─── Structure Assistant Featured ─── */
function StructureModule({t}) {
  const cs = cardStyle(t, true);
  return (
    <section id="structure" style={{padding:sp(t.spacing),borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="04" title={<>First implemented module: <span style={{color:t.accentColor}}>Structure Assistant</span></>} t={t}/>
        <div className="sa-structure-grid" style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',gap:48,alignItems:'start'}}>
          {/* Plugin UI mock */}
          <div className="reveal">
            <RhinoPanelMock t={t}/>
          </div>
          {/* Description */}
          <div className="reveal d1">
            <p style={{fontSize:15.5,color:'var(--t2)',lineHeight:1.75,marginBottom:28}}>
              A Rhino + Grasshopper assistant for early structural layouts: pick ceiling and floor slabs, choose a material system, and review suggested framing plus visualization — without leaving the modeling environment.
            </p>
            {/* Features */}
            <div style={{display:'flex',flexDirection:'column',gap:0,marginBottom:32}}>
              {[
                ['Span & member sizing','Beam depth, width, and section selection guidance for given spans and loads'],
                ['Load classification','Residential, commercial, and roof load categories with contextual guidance'],
                ['Material comparison','Timber, steel, and concrete options with trade-off summary'],
                ['Disclaimer framing','Every response is clearly positioned as pre-consultation guidance only'],
              ].map(([title, desc],i)=>(
                <div key={i} style={{display:'flex',gap:14,padding:'14px 0',borderBottom:'1px solid var(--rule)'}}>
                  <div style={{width:20,height:20,borderRadius:'50%',background:`oklch(0.92 0.06 248/.7)`,border:`1px solid oklch(0.78 0.10 248)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke={t.accentColor} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:13.5,fontWeight:600,color:'var(--text)',marginBottom:3}}>{title}</div>
                    <div style={{fontSize:12.5,color:'var(--t3)',lineHeight:1.5}}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <a href="structure-assistant.html" style={{background:t.accentColor,color:'white',padding:'12px 24px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',boxShadow:`0 4px 18px ${t.accentColor}33`,display:'inline-flex',alignItems:'center',gap:7,transition:'all .2s'}}
                 onMouseEnter={e=>{e.currentTarget.style.opacity='.88';e.currentTarget.style.transform='translateY(-1px)'}} onMouseLeave={e=>{e.currentTarget.style.opacity='1';e.currentTarget.style.transform='none'}}>
                View Product Page
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <div style={{display:'flex',alignItems:'center',gap:6,padding:'12px 16px',border:'1px solid var(--rule)',borderRadius:8,background:'white'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--t3)',letterSpacing:'.04em'}}>Rhino 7 / 8</span>
                <span style={{width:1,height:14,background:'var(--rule)',display:'inline-block'}}/>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'var(--t3)',letterSpacing:'.04em'}}>Grasshopper</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RhinoPanelMock({t}) {
  return (
    <div style={{border:'1px solid #ccd8e8',borderRadius:10,overflow:'hidden',boxShadow:`0 8px 40px ${t.accentColor}18`,fontFamily:'DM Sans,sans-serif'}}>
      {/* Title bar — light, Rhino panel style */}
      <div style={{background:'#f5f8fc',borderBottom:'1px solid #ccd8e8',padding:'9px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:9}}>
          <div style={{width:26,height:26,borderRadius:5,background:t.accentColor,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <svg width="13" height="13" viewBox="0 0 22 22" fill="none"><rect x="1.5" y="1.5" width="19" height="19" rx="4" stroke="white" strokeWidth="1.4"/><path d="M6 16L11 6l5 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.8 12.5h6.4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:12,color:'#0f2340',letterSpacing:'.03em',fontWeight:600}}>Structure Assistant</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'#7a92aa',marginLeft:1}}>1.0.0</span>
        </div>
        <div style={{display:'flex',gap:5}}>
          {['#f87171','#fbbf24','#34d399'].map((bg,i)=>(
            <div key={i} style={{width:10,height:10,borderRadius:'50%',background:bg,opacity:.7}}/>
          ))}
        </div>
      </div>
      {/* Layer/context bar */}
      <div style={{background:'#eef2f7',borderBottom:'1px solid #ccd8e8',padding:'5px 14px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'#7a92aa',letterSpacing:'.04em'}}>Layer: Structural_Frame</span>
          <span style={{width:1,height:10,background:'#ccd8e8',display:'inline-block'}}/>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'#7a92aa',letterSpacing:'.04em'}}>Selected: Curve_08</span>
        </div>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:t.accentColor,letterSpacing:'.03em',fontWeight:600}}>● Active</span>
      </div>
      {/* Body */}
      <div style={{background:'white',padding:'16px 16px 14px'}}>
        {/* Inputs */}
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7a92aa',marginBottom:8,fontFamily:'DM Mono,monospace'}}>Design Inputs</div>
          {[
            {label:'Span',     value:'8 400 mm', note:'from selected curve'},
            {label:'Load type',value:'Residential floor (2.0 kPa)'},
            {label:'Material', value:'Glulam timber GL28h'},
            {label:'Spacing',  value:'1 200 mm o/c'},
          ].map((row,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'6px 0',borderBottom:'1px solid #eef2f7'}}>
              <span style={{fontSize:12,color:'#4a6080',fontWeight:400,paddingTop:1}}>{row.label}</span>
              <div style={{textAlign:'right'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:11.5,color:'#0f2340',background:'#f5f8fc',padding:'2px 9px',borderRadius:4,border:'1px solid #ccd8e8'}}>{row.value}</span>
                {row.note&&<div style={{fontSize:9.5,color:'#7a92aa',marginTop:2,fontStyle:'italic',fontFamily:'DM Mono,monospace'}}>{row.note}</div>}
              </div>
            </div>
          ))}
        </div>
        {/* Guidance output */}
        <div style={{background:'#eff6ff',border:`1px solid #bfdbfe`,borderRadius:7,padding:'12px 13px',marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7}}>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,fontWeight:700,letterSpacing:'.08em',color:t.accentColor,textTransform:'uppercase'}}>Guidance Output</span>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:9,color:'#7a92aa'}}>GL28h · L/300</span>
          </div>
          <p style={{fontSize:12,color:'#0f2340',lineHeight:1.65}}>
            For an 8.4m residential span at 1200mm o/c, consider a <strong style={{color:t.accentColor}}>215 × 495mm GL28h</strong> section. Estimated mid-span deflection ≈ 22mm under full service load. Verify against L/300 serviceability limit with your structural engineer.
          </p>
        </div>
        {/* Sections mini table */}
        <div style={{background:'#f5f8fc',border:'1px solid #ccd8e8',borderRadius:6,padding:'9px 11px',marginBottom:10}}>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'#7a92aa',marginBottom:6,letterSpacing:'.04em'}}>Alternative sections</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:1}}>
            {[
              ['Section','Depth','Weight','Grade'],
              ['165×405','405mm','21 kg/m','GL24h'],
              ['215×495','495mm','32 kg/m','GL28h ✓'],
              ['265×585','585mm','45 kg/m','GL32h'],
            ].map((row,i)=>(
              row.map((cell,j)=>(
                <span key={j} style={{fontFamily:'DM Mono,monospace',fontSize:10,color:i===0?'#7a92aa':i===2?t.accentColor:'#0f2340',padding:'3px 4px',background:i===2?`${t.accentColor}14`:'transparent',borderRadius:3,fontWeight:i===2&&j===3?700:400}}>{cell}</span>
              ))
            ))}
          </div>
        </div>
        {/* Disclaimer */}
        <div style={{display:'flex',gap:6,alignItems:'flex-start'}}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginTop:1,flexShrink:0}}><circle cx="6" cy="6" r="5" stroke="#b45309" strokeWidth="1"/><line x1="6" y1="5" x2="6" y2="8" stroke="#b45309" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6" cy="3.5" r=".6" fill="#b45309"/></svg>
          <p style={{fontSize:10.5,color:'#7a92aa',lineHeight:1.55,fontStyle:'italic'}}>Pre-consultation guidance only. Not a substitute for professional structural engineering review.</p>
        </div>
      </div>
      {/* Status bar */}
      <div style={{background:'#f5f8fc',borderTop:'1px solid #ccd8e8',padding:'4px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'#7a92aa'}}>Ready</span>
        <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'#7a92aa'}}>x: 12450   y: 8200   z: 0</span>
      </div>
    </div>
  );
}

/* ─── Collaboration / Workflow ─── */
function Workflow({t}) {
  return (
    <section id="workflow" style={{padding:sp(t.spacing),background:'var(--bg2)',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="05" title={<>Designed to work <em style={{fontStyle:'normal',color:t.accentColor}}>with</em> consultants,<br/>not replace them</>} t={t}/>
        <p className="reveal" style={{fontSize:15,color:'var(--t2)',maxWidth:560,marginBottom:52,lineHeight:1.65}}>
          The assistant tools occupy a specific moment in the design process: between design iterations and formal consultant reviews.
          They are not a substitute for professional expertise — they are a preparation layer.
        </p>

        {/* Design process timeline */}
        <div className="reveal reveal-delay-1 sa-workflow-timeline" style={{marginBottom:40}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 36px 1fr 36px 1fr 36px 1fr',alignItems:'center',gap:0}}>
            {/* Architect */}
            <WorkflowNode icon={<IcoArchitect c={t.accentColor}/>} title="Architect" sub="Active design in Rhino" highlight={false} t={t}/>
            <WorkflowArrow c={t.accentColor}/>
            {/* Assistant */}
            <WorkflowNode icon={<LogoMark c="white"/>} title="Structure Assistant" sub="Early-stage guidance layer" highlight={true} t={t}/>
            <WorkflowArrow c={t.accentColor}/>
            {/* Feedback loop */}
            <WorkflowNode icon={<IcoLoop c={t.accentColor}/>} title="Refined design" sub="Informed iteration" highlight={false} t={t}/>
            <WorkflowArrow c={t.accentColor}/>
            {/* Consultant */}
            <WorkflowNode icon={<IcoConsultantSm c={t.accentColor}/>} title="Structural Engineer" sub="Professional review & sign-off" highlight={false} t={t}/>
          </div>
          {/* Timeline labels */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 36px 1fr 36px 1fr 36px 1fr',gap:0,marginTop:14}}>
            {['Schematic Design','','↕  Assistant active','','Design Development','','Consultant meeting'].map((l,i)=>(
              <div key={i} style={{textAlign:'center',fontFamily:'DM Mono,monospace',fontSize:10,color:i===2?t.accentColor:'var(--t3)',letterSpacing:'.04em',fontWeight:i===2?600:400}}>{l}</div>
            ))}
          </div>
        </div>

        {/* What the tool enables */}
        <div className="reveal d2 sa-workflow-cols" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {[
            {phase:'Before consultation',icon:'→',items:['Explore structural options with technical context','Identify likely problem areas early','Prepare specific, focused questions for the SE']},
            {phase:'Between iterations',icon:'⟳',items:['Check revised geometry against prior guidance','Understand impact of design changes','Avoid structural problems compounding']},
            {phase:'After consultant feedback',icon:'✓',items:['Verify changes address consultant notes','Understand the reasoning behind revisions','Return to modeling with clearer intent']},
          ].map((col,i)=>(
            <div key={i} style={{background:'white',border:'1px solid var(--rule)',borderRadius:10,padding:'22px 20px',boxShadow:'var(--shadow-sm)'}}>
              <div style={{fontFamily:'DM Mono,monospace',fontSize:10,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:t.accentColor,marginBottom:14}}>{col.phase}</div>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:9}}>
                {col.items.map((item,j)=>(
                  <li key={j} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                    <span style={{width:4,height:4,borderRadius:'50%',background:t.accentColor,display:'inline-block',marginTop:6,flexShrink:0,opacity:.7}}/>
                    <span style={{fontSize:12.5,color:'var(--t2)',lineHeight:1.6}}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emphasis callout */}
        <div className="reveal d3" style={{marginTop:28,padding:'20px 24px',background:`oklch(0.94 0.05 248/.4)`,border:`1px solid oklch(0.82 0.09 248)`,borderRadius:10,display:'flex',gap:14,alignItems:'center'}}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}><circle cx="10" cy="10" r="8.5" stroke={t.accentColor} strokeWidth="1.3"/><path d="M7 10l2 2 4-4" stroke={t.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.6}}>
            <strong style={{color:'var(--text)'}}>The consultant relationship is preserved.</strong> Structure Assistant does not produce stamped drawings, certifications, or liability-bearing output. It supports architects in making better use of the consultation time they already have.
          </p>
        </div>
      </div>
    </section>
  );
}

function WorkflowNode({icon, title, sub, highlight, t}) {
  return (
    <div style={{background:highlight?t.accentColor:'white',border:highlight?`1.5px solid ${t.accentColor}`:'1px solid var(--rule)',borderRadius:12,padding:'22px 18px',textAlign:'center',boxShadow:highlight?`0 6px 28px ${t.accentColor}28`:'var(--shadow-sm)',transition:'transform .2s'}}
         onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
      <div style={{display:'flex',justifyContent:'center',marginBottom:10,color:highlight?'white':t.accentColor}}>{icon}</div>
      <div style={{fontSize:13,fontWeight:700,color:highlight?'white':'var(--text)',marginBottom:4}}>{title}</div>
      <div style={{fontSize:11,color:highlight?'rgba(255,255,255,.7)':'var(--t3)',lineHeight:1.4}}>{sub}</div>
    </div>
  );
}
function WorkflowArrow({c}) {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
        <path d="M2 9h20M17 4l7 5-7 5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─── Future Vision ─── */
function FutureVision({t}) {
  return (
    <section id="future" style={{padding:sp(t.spacing),background:'var(--dark)'}}>
      <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
        <div className="reveal" style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.13)',borderRadius:20,padding:'4px 14px',marginBottom:28}}>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'rgba(255,255,255,.5)',letterSpacing:'.06em'}}>06 · Future vision</span>
        </div>
        <h2 className="reveal d1" style={{fontFamily:headingFont(t),fontSize:'clamp(28px,4vw,52px)',fontWeight:headingW(t),color:'white',letterSpacing:'-.02em',lineHeight:1.08,marginBottom:22}}>
          Building a broader<br/><span style={{color:'oklch(0.70 0.11 248)'}}>assistant ecosystem</span>
        </h2>
        <p className="reveal d2" style={{fontSize:15,color:'rgba(255,255,255,.62)',lineHeight:1.8,maxWidth:620,margin:'0 auto 16px'}}>
          Structure Assistant is the first implementation. The roadmap is a coordinated family of four assistants — structure, sustainability, zoning, and code — sharing one technical guidance layer inside the architect's design environment.
        </p>
        <p className="reveal d3" style={{fontSize:13,color:'rgba(255,255,255,.38)',lineHeight:1.7,maxWidth:500,margin:'0 auto 44px'}}>
          Shared data model. Cross-discipline context. Consistent Rhino-native interface. Each module will feed into a common project knowledge layer, enabling coordination between structural, environmental, and regulatory guidance.
        </p>
        <div className="reveal d4" style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          {MODULES.map((m,i)=>(
            <div key={i} style={{padding:'8px 14px',borderRadius:8,border:m.status==='live'?`1px solid oklch(0.68 0.11 248)`:'1px solid rgba(255,255,255,.10)',background:m.status==='live'?'rgba(255,255,255,.08)':'transparent',display:'flex',flexDirection:'column',gap:3,alignItems:'flex-start'}}>
              <span style={{fontSize:12,fontWeight:500,color:m.status==='live'?'oklch(0.80 0.11 248)':'rgba(255,255,255,.32)',letterSpacing:'.01em'}}>{m.name}{m.status==='live'?' ✓':''}</span>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:9.5,color:'rgba(255,255,255,.22)',letterSpacing:'.03em'}}>{m.consultant}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer({t}) {
  return (
    <footer style={{background:'oklch(0.09 0.03 252)',borderTop:'1px solid rgba(255,255,255,.05)',padding:'36px 5vw'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
            <LogoMark c={t.accentColor}/>
            <span style={{fontFamily:headingFont(t),fontWeight:600,fontSize:15,color:'white'}}>Small Architecture Office Assistant</span>
          </div>
          <p style={{fontSize:11.5,color:'rgba(255,255,255,.28)',lineHeight:1.65}}>
            Capstone project · Columbia University GSAPP<br/>
            Supporting architects before and between consultations.
          </p>
        </div>
        <div style={{display:'flex',gap:28,flexWrap:'wrap'}}>
          {[
            ['Platform','#platform'],
            ['Modules','#modules'],
            ['Structure Assistant','structure-assistant.html'],
          ].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:13,color:'rgba(255,255,255,.35)',textDecoration:'none',fontWeight:500,transition:'color .2s'}}
               onMouseEnter={e=>e.target.style.color='white'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.35)'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Shared UI ─── */
function SectionLabel({n, title, t}) {
  return (
    <div className="reveal" style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:16}}>
      <span style={{fontFamily:'DM Mono,monospace',fontSize:11,fontWeight:500,color:'var(--t3)',letterSpacing:'.08em',flexShrink:0}}>{n}</span>
      <h2 style={{fontFamily:headingFont(t),fontSize:'clamp(26px,3.2vw,44px)',fontWeight:headingW(t),letterSpacing:'-.02em',lineHeight:1.1}}>{title}</h2>
    </div>
  );
}

/* ─── Icons ─── */
function IcoConsultant() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 19c0-3.314 3.134-6 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="17" cy="15" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M17 13v2l1.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IcoClock() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 3.5L5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M17 3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>; }
function IcoFragment() { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6.5h1M13 6.5h1M6.5 10v1M17.5 10v1M6.5 13v1M17.5 13v1M10 17.5h1M13 17.5h1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 1.5"/></svg>; }
function IcoArchitect({c}) { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="14" width="14" height="4" rx="1" stroke={c} strokeWidth="1.4"/><path d="M8 14V8l3-3 3 3v6" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="11" y1="5" x2="11" y2="3" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function IcoLoop({c}) { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 11a7 7 0 0 1 7-7 7 7 0 0 1 6.5 4.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><path d="M18 11a7 7 0 0 1-7 7 7 7 0 0 1-6.5-4.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><path d="M15.5 5.5l2.5 3 2-3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 16.5L4 13.5l-2 3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function IcoConsultantSm({c}) { return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7" r="3.5" stroke={c} strokeWidth="1.4"/><path d="M4 19c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><path d="M14.5 12l1.5 1.5" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><circle cx="17" cy="15" r="2.5" stroke={c} strokeWidth="1.2"/></svg>; }
function ModIco({name, c, sz=18}) {
  const s = sz; const hw = s/2;
  const icons = {
    'Structure Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 16L10 4l6 12" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 11.5h7" stroke={c} strokeWidth="1.3" strokeLinecap="round"/><line x1="10" y1="4" x2="10" y2="2" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>,
    'MEP Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M3 10h3a3 3 0 0 0 0-6 3 3 0 0 0 0 6h8a3 3 0 0 0 0 6 3 3 0 0 0 0-6h3" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>,
    'Envelope Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="11" rx="1.5" stroke={c} strokeWidth="1.4"/><path d="M3 7l7 5.5 7-5.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    'Sustainability Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={c} strokeWidth="1.3"/><path d="M7 14c0-3.5 3-7 7-6-3 0-4 2-4 6Z" stroke={c} strokeWidth="1.3" fill="none" strokeLinejoin="round"/></svg>,
    'Zoning Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="5" height="9" stroke={c} strokeWidth="1.3" rx="1"/><rect x="12" y="8" width="5" height="8" stroke={c} strokeWidth="1.3" rx="1"/><line x1="3" y1="16" x2="17" y2="16" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>,
    'Code Assistant': <svg width={s} height={s} viewBox="0 0 20 20" fill="none"><path d="M4 6h12M4 10h12M4 14h8" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><rect x="3" y="4" width="14" height="12" rx="2" stroke={c} strokeWidth="1.3" fill="none"/></svg>,
  };
  return icons[name] || null;
}

/* ─── App ─── */
function App() {
  const [t, upd] = useTweaks();
  useReveal();
  useEffect(()=>{ document.documentElement.style.setProperty('--accent',t.accentColor); },[t]);
  useEffect(()=>{
    const panel = document.getElementById('tweaks-panel');
    const ac = document.getElementById('tw-accent');
    const fn = document.getElementById('tw-font');
    const sp = document.getElementById('tw-spacing');
    const cs = document.getElementById('tw-cards');
    if(ac){ac.value=t.accentColor;ac.oninput=e=>upd('accentColor',e.target.value);}
    if(fn){fn.value=t.headingFont;fn.onchange=e=>upd('headingFont',e.target.value);}
    if(sp){sp.value=t.spacing;sp.onchange=e=>upd('spacing',e.target.value);}
    if(cs){cs.value=t.cardStyle;cs.onchange=e=>upd('cardStyle',e.target.value);}
    window.addEventListener('message',e=>{
      if(e.data?.type==='__activate_edit_mode') panel.classList.add('visible');
      if(e.data?.type==='__deactivate_edit_mode') panel.classList.remove('visible');
    });
    window.parent.postMessage({type:'__edit_mode_available'},'*');
  },[]);
  return <>
    <Nav t={t}/>
    <Hero t={t}/>
    <Problem t={t}/>
    <Platform t={t}/>
    <Modules t={t}/>
    <StructureModule t={t}/>
    <Workflow t={t}/>
    <FutureVision t={t}/>
    <Footer t={t}/>
  </>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);