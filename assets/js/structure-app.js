const {useState,useEffect,useRef} = React;
const A = '#286ea4';

/* PUBLISH: set GitHub URL; add optional standalone sample at assets/downloads/sample-model.3dm */
const SA_DOWNLOAD_ZIP = 'assets/downloads/structure-assistant-package.zip';
const SA_SAMPLE_3DM = 'assets/downloads/sample-model.3dm';
const SA_GITHUB_URL = '#';

function useReveal(){
  useEffect(()=>{
    const els=document.querySelectorAll('.reveal');
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:0.01,rootMargin:'0px 0px -30px 0px'});
    els.forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*1.1)el.classList.add('in');else io.observe(el);});
    return()=>io.disconnect();
  });
}

/* ─── shared ─── */
function LogoMark({c=A,sz=22}){
  return <svg width={sz} height={sz} viewBox="0 0 22 22" fill="none"><rect x="1.5" y="1.5" width="19" height="19" rx="4" stroke={c} strokeWidth="1.4"/><path d="M6 16L11 6l5 10" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.8 12.5h6.4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function GridBg(){
  return <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(oklch(0.85 0.02 250/0.2) 1px,transparent 1px),linear-gradient(90deg,oklch(0.85 0.02 250/0.2) 1px,transparent 1px)',backgroundSize:'48px 48px',pointerEvents:'none',zIndex:0}}/>;
}
function Btn({href,primary,children,style={},...rest}){
  const [hov,setHov]=useState(false);
  return <a href={href||'#'} {...rest} style={{display:'inline-flex',alignItems:'center',gap:7,padding:'13px 26px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',letterSpacing:'.01em',transition:'all .2s',background:primary?(hov?`${A}dd`:A):'white',color:primary?'white':(hov?A:'var(--t2)'),border:primary?'none':'1px solid var(--rule)',boxShadow:primary?`0 4px 18px ${A}33`:'var(--shadow-sm)',transform:hov?'translateY(-1px)':'none',...style}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{children}</a>;
}
function SectionLabel({n,title,sub,light}){
  const tc=light?'rgba(255,255,255,.45)':'var(--t3)';
  const hc=light?'white':'var(--text)';
  return (
    <div className="reveal" style={{marginBottom:sub?14:20}}>
      <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:sub?6:0}}>
        <span className="mono" style={{fontSize:11,color:tc,letterSpacing:'.08em',flexShrink:0}}>{n}</span>
        <h2 style={{fontSize:'clamp(24px,3vw,44px)',fontWeight:300,letterSpacing:'-.025em',lineHeight:1.1,color:hc}}>{title}</h2>
      </div>
      {sub&&<p style={{fontSize:15,color:light?'rgba(255,255,255,.62)':'var(--t2)',maxWidth:560,lineHeight:1.65,marginLeft:32}}>{sub}</p>}
    </div>
  );
}

/* ─── Nav ─── */
function Nav(){
  const [sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>32);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  return (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:58,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 5vw',background:sc?'oklch(0.985 0.005 245/0.94)':'transparent',backdropFilter:sc?'blur(14px)':'none',borderBottom:sc?'1px solid var(--rule)':'1px solid transparent',transition:'all .3s'}}>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <a href="index.html" style={{display:'flex',alignItems:'center',gap:8,textDecoration:'none',color:'var(--text)'}}>
          <LogoMark/><span style={{fontWeight:600,fontSize:15,letterSpacing:'-.01em'}}>SAOA</span>
        </a>
        <span style={{color:'var(--rule)',fontSize:18}}>›</span>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:14,fontWeight:600,color:A}}>Structure Assistant</span>
          <span className="chip chip-live"><span style={{width:5,height:5,borderRadius:'50%',background:'oklch(0.45 0.18 145)',display:'inline-block'}}/>Live</span>
        </div>
      </div>
      <div className="sa-nav-links" style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
        {[['Why','#problem'],['Workflow','#how'],['Architecture','#architecture'],['Demo','#demo'],['Install','#download']].map(([l,h])=>(
          <a key={l} href={h} style={{fontSize:13,fontWeight:500,color:'var(--t2)',textDecoration:'none',transition:'color .2s'}}
             onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color='var(--t2)'}>{l}</a>
        ))}
        <Btn href="#download" primary style={{padding:'7px 16px',fontSize:13}}>Download ZIP</Btn>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero(){
  return (
    <section style={{position:'relative',minHeight:'96vh',display:'flex',alignItems:'center',padding:'80px 5vw',paddingTop:'calc(80px + 58px)',overflow:'hidden'}}>
      <GridBg/>
      <div className="sa-hero-two-col" style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:56,alignItems:'center',maxWidth:1400,width:'100%',margin:'0 auto'}}>
        <div>
          <div className="reveal" style={{display:'flex',alignItems:'center',gap:8,marginBottom:24}}>
            <a href="index.html" className="mono" style={{fontSize:11,color:'var(--t3)',textDecoration:'none',letterSpacing:'.05em',transition:'color .2s'}}
               onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color='var(--t3)'}>Small Architecture Office Assistant</a>
            <span style={{color:'var(--rule)'}}>›</span>
            <span className="mono" style={{fontSize:11,color:A,letterSpacing:'.05em',fontWeight:600}}>Module 01 / 04</span>
          </div>
          <div className="reveal d1" style={{display:'flex',alignItems:'center',gap:10,marginBottom:18}}>
            <div style={{width:48,height:48,borderRadius:12,background:`oklch(0.92 0.06 248/.7)`,border:`1.5px solid oklch(0.78 0.10 248)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none"><path d="M4 16L10 4l6 12" stroke={A} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.5 11.5h7" stroke={A} strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <div style={{display:'flex',gap:6}}>
              <span className="chip chip-live"><span style={{width:5,height:5,borderRadius:'50%',background:'oklch(0.45 0.18 145)',display:'inline-block'}}/>Available now</span>
              <span className="chip chip-phase">Rhino 7 / 8</span>
              <span className="chip chip-phase">Grasshopper</span>
            </div>
          </div>
          <h1 className="reveal d2" style={{fontSize:'clamp(46px,6.5vw,84px)',fontWeight:300,lineHeight:1.04,letterSpacing:'-.03em',marginBottom:18}}>
            Structure<br/><span style={{color:A}}>Assistant</span>
          </h1>
          <p className="reveal d3" style={{fontSize:'clamp(17px,1.8vw,21px)',color:'var(--t2)',maxWidth:520,lineHeight:1.55,fontWeight:300,marginBottom:10}}>
            Rhino + Grasshopper assistant for early structural layouts — web UI panel, object picking, parametric backend, and on-model readouts.
          </p>
          <p className="reveal d3" style={{fontSize:14.5,color:'var(--t3)',maxWidth:460,lineHeight:1.72,marginBottom:38}}>
            Built from direct experience in a small architecture office — where structural consultants are external, feedback is slow, and design decisions can't always wait.
          </p>
          <div className="reveal d4" style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <Btn href="#download" primary>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download ZIP
            </Btn>
            <Btn href="#demo">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={A} strokeWidth="1.3"/><path d="M5.5 5l4 2-4 2V5Z" stroke={A} strokeWidth="1.2" strokeLinejoin="round"/></svg>
              Watch Demo
            </Btn>
          </div>
          <div className="reveal d5" style={{display:'flex',gap:24,marginTop:44,paddingTop:28,borderTop:'1px solid var(--rule)'}}>
            {[['Free','License'],['Rhino 7+','Platform'],['SD · DD','Design phases'],['Open source','Repository']].map(([v,l])=>(
              <div key={l}><div className="mono" style={{fontSize:15,fontWeight:500,color:A,letterSpacing:'-.01em'}}>{v}</div><div style={{fontSize:11,color:'var(--t3)',marginTop:2}}>{l}</div></div>
            ))}
          </div>
        </div>
        {/* Hero: real Rhino + Structure Assistant screenshot (assets/images/final-interface.png) */}
        <div className="reveal d3 sa-hero-screenshot-cell">
          <HeroRhinoScreenshot/>
        </div>
      </div>
    </section>
  );
}

function HeroRhinoScreenshot(){
  const imgSrc = 'Full Interface.gif';
  return (
    <figure className="sa-hero-screenshot" style={{margin:0,width:'100%',maxWidth:1020}}>
      <div
        className="rhino-panel-chrome sa-hero-screenshot__frame"
        style={{
          width:'100%',
          borderRadius:14,
          overflow:'hidden',
          boxShadow:`0 24px 64px oklch(0.17 0.04 250 / 0.2), 0 0 0 1px oklch(0.88 0.02 248)`,
        }}
      >
        <div
          className="rhino-panel-chrome__titlebar"
          style={{
            background:'oklch(0.97 0.008 248)',
            borderBottom:'1px solid var(--rule)',
            padding:'10px 14px',
            display:'flex',
            alignItems:'center',
            gap:10,
            flexWrap:'wrap',
          }}
        >
          <div className="rhino-panel-chrome__dots" aria-hidden="true" style={{display:'flex',gap:6}}>
            {['oklch(0.65 0.18 25)','oklch(0.75 0.15 80)','oklch(0.55 0.16 145)'].map((c,i)=>(
              <span key={i} style={{width:10,height:10,borderRadius:'50%',background:c,display:'block'}} />
            ))}
          </div>
          <span className="mono" style={{fontSize:10,color:'var(--t3)',letterSpacing:'.06em',flex:1,minWidth:0}}>
            Rhino 8 · Structure Assistant · working session
          </span>
        </div>
        <div
          className="sa-hero-screenshot__imgwrap"
          style={{
            background:'oklch(0.14 0.03 250)',
            lineHeight:0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          <img
            className="sa-hero-screenshot__img"
            src={imgSrc}
            alt="Rhino 8 interface showing the Structure Assistant plugin panel beside structural model viewports"
            decoding="async"
            fetchPriority="high"
            style={{
              width:'100%',
              height:'auto',
              objectFit:'contain',
              objectPosition:'center top',
              display:'block',
            }}
          />
        </div>
      </div>
      <figcaption
        className="mono"
        style={{
          marginTop:12,
          fontSize:10,
          color:'var(--t3)',
          letterSpacing:'.04em',
          textAlign:'center',
          lineHeight:1.5,
        }}
      >
        Live Rhino 8 session — Structure Assistant docked with model viewports.
      </figcaption>
    </figure>
  );
}

/* ─── Problem ─── */
function Problem(){
  const items = [
    {icon:<IcoTime/>,title:'Structural feedback arrives late',desc:'In a small office, the SE is external. By the time a response comes back, the design has moved on — and undoing decisions is expensive.'},
    {icon:<IcoLoop/>,title:'Avoidable redesign cycles',desc:'Basic structural problems — spans too long, members too light — get caught late. The fix is rework that could have been avoided with earlier context.'},
    {icon:<IcoBuilding/>,title:'No in-house technical baseline',desc:'Most small firms have no structural knowledge on staff. Every question, even a simple one, requires scheduling a consultant. That friction adds up across a project.'},
  ];
  return (
    <section id="problem" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="01" title="Why this tool exists"/>
        <div className="reveal" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'start',marginBottom:44}}>
          <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8,marginLeft:32}}>This tool came out of working in a small architecture office — two or three people, no in-house engineers, all consultants external. Structural feedback arrived late. By the time the SE responded, the design had already moved on. Fixing it meant rework and lost time on a project with little margin for either.</p>
          <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.8}}>That experience is common. Most architecture firms are small — the majority in the US have fewer than five people, and almost none have in-house structural expertise. Structure Assistant is built for that reality: not as a workaround for consulting, but as a way to make the time between consultations more productive.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:44}}>
          {items.map((p,i)=>(
            <div key={i} className={`reveal d${i+1}`} style={{background:'white',border:'1px solid var(--rule)',borderRadius:14,padding:'28px 24px',boxShadow:'var(--shadow-sm)',transition:'transform .2s,box-shadow .2s'}}
                 onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='var(--shadow-md)';}}
                 onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='var(--shadow-sm)';}}>
              <div style={{color:A,marginBottom:16}}>{p.icon}</div>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:10,lineHeight:1.25,letterSpacing:'-.01em'}}>{p.title}</h3>
              <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.7}}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Collaboration ─── */
function Collaboration(){
  return (
    <section style={{padding:'88px 5vw',background:A}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div className="reveal" style={{marginBottom:48}}>
          <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:8}}>
            <span className="mono" style={{fontSize:11,color:'rgba(255,255,255,.45)',letterSpacing:'.08em'}}>02</span>
            <h2 style={{fontSize:'clamp(24px,3vw,44px)',fontWeight:300,letterSpacing:'-.025em',lineHeight:1.1,color:'white'}}>Designed to work with consultants,<br/>not replace them</h2>
          </div>
          <p style={{fontSize:15,color:'rgba(255,255,255,.68)',maxWidth:540,lineHeight:1.65,marginLeft:32}}>In a small office, you don't replace the structural engineer — you just don't have one available when a question comes up mid-session. Structure Assistant fills that gap. It keeps design moving, and it makes the consultation more focused when it finally happens.</p>
        </div>
        {/* Three-node diagram */}
        <div className="reveal d1" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:0,alignItems:'stretch',maxWidth:860,margin:'0 auto 32px'}}>
          {/* Architect */}
          <CollabNode
            icon={<IcoArchNode/>}
            title="Architect"
            sub="Active design process in Rhino"
            items={['Works through design options','Encounters structural questions','Needs technical context to continue']}
            side="left"
          />
          {/* Connector */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:0,padding:'0 8px'}}>
            <CollabArrow label="structural questions"/>
            <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.18)',border:'1.5px solid rgba(255,255,255,.35)',borderRadius:14,padding:'28px 16px',textAlign:'center',boxShadow:`0 8px 28px rgba(0,0,0,.15)`,margin:'0 0',width:'100%'}}>
              <LogoMark c="white" sz={28}/>
              <div style={{fontWeight:700,fontSize:15,color:'white',marginTop:10,marginBottom:4}}>Structure Assistant</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.7)',lineHeight:1.5,marginBottom:12}}>Early-stage guidance layer</div>
              <div style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)',borderRadius:8,padding:'10px 10px',fontSize:12,color:'rgba(255,255,255,.85)',lineHeight:1.5}}>
                Translates design intent into structural context — without replacing engineering judgment
              </div>
            </div>
            <CollabArrow label="informed design" flip/>
          </div>
          {/* SE */}
          <CollabNode
            icon={<IcoBuildingNode/>}
            title="Structural Engineer"
            sub="Professional expertise & sign-off"
            items={['Reviews informed, well-prepared designs','Spends time on complex decisions','Maintains full liability and authority']}
            side="right"
          />
        </div>
        <div className="reveal d2" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,maxWidth:860,margin:'0 auto'}}>
          {[
            {label:'Mid-session',desc:'A structural question comes up. Get context immediately — keep designing.'},
            {label:'Between meetings',desc:'The SE isn\'t available yet. Use the tool to continue developing the design rather than stalling.'},
            {label:'Before the consultation',desc:'Review what the tool flagged. Arrive with a specific question, not a list of basic problems.'},
          ].map((x,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.16)',borderRadius:10,padding:'16px 18px',textAlign:'center'}}>
              <div className="mono" style={{fontSize:10,fontWeight:700,letterSpacing:'.07em',color:'rgba(255,255,255,.5)',marginBottom:6,textTransform:'uppercase'}}>{x.label}</div>
              <p style={{fontSize:13,color:'rgba(255,255,255,.75)',lineHeight:1.6}}>{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function CollabNode({icon,title,sub,items,side}){
  return (
    <div style={{background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.18)',borderRadius:14,padding:'24px 20px',display:'flex',flexDirection:'column',gap:12}}>
      <div style={{color:'white',opacity:.8}}>{icon}</div>
      <div style={{fontWeight:700,fontSize:15,color:'white'}}>{title}</div>
      <div style={{fontSize:12,color:'rgba(255,255,255,.6)',lineHeight:1.4}}>{sub}</div>
      <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:7,marginTop:4}}>
        {items.map((it,i)=>(
          <li key={i} style={{display:'flex',gap:7,alignItems:'flex-start'}}>
            <span style={{width:4,height:4,borderRadius:'50%',background:'rgba(255,255,255,.4)',display:'inline-block',flexShrink:0,marginTop:7}}/>
            <span style={{fontSize:12,color:'rgba(255,255,255,.65)',lineHeight:1.5}}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CollabArrow({label,flip}){
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'8px 0'}}>
      {!flip&&<svg width="24" height="32" viewBox="0 0 24 32" fill="none"><line x1="12" y1="2" x2="12" y2="24" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" strokeDasharray="3 2"/><path d="M6 20l6 8 6-8" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
      <span className="mono" style={{fontSize:9,color:'rgba(255,255,255,.35)',letterSpacing:'.05em',textTransform:'uppercase',textAlign:'center',maxWidth:80,lineHeight:1.3}}>{label}</span>
      {flip&&<svg width="24" height="32" viewBox="0 0 24 32" fill="none"><line x1="12" y1="8" x2="12" y2="30" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" strokeDasharray="3 2"/><path d="M6 12l6-8 6 8" stroke="rgba(255,255,255,.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
    </div>
  );
}

/* ─── Solution / How ─── */
function HowItWorks(){
  const steps = [
    {n:'01',title:'Select ceiling & floor slabs',desc:'Open the Structure Assistant side panel and use Rhino’s pick workflow to tag the ceiling slab and floor slab that bound the story you are studying. Span and height derive from those surfaces — no manual dimension entry.',mono:'SA_PickSlabs → Ceiling + Floor OK · 3200 mm story',icon:<IcoSelect/>},
    {n:'02',title:'Choose material & inputs',desc:'Select a structural material family (steel, glulam, CLT, concrete, etc.) and confirm load assumptions. Grasshopper maps those choices to lookup tables and rules of thumb — always framed as pre-consultation guidance.',mono:'Material: Glulam GL28h · Loads per IBC table lookup',icon:<IcoAnalyze/>},
    {n:'03',title:'Review layout + visualization',desc:'See suggested member layouts, product-level matches, and simple cost bands inside the panel while Rhino previews linework or hatching in the viewport. Export notes or bake helpers, then validate everything with your structural engineer.',mono:'Outputs → Panel + Rhino preview · CSV optional',icon:<IcoOutput/>},
  ];
  return (
    <section id="how" style={{padding:'88px 5vw',background:'var(--bg2)',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="03" title="How it works" sub="Three steps. No file exports. No context switching. Guidance in the environment where design actually happens."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:44}}>
          {steps.map((s,i)=>(
            <div key={i} className={`reveal d${i+1}`} style={{background:'white',border:'1px solid var(--rule)',borderRadius:14,padding:'28px 24px',boxShadow:'var(--shadow-sm)',display:'flex',flexDirection:'column',gap:0}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
                <div style={{width:42,height:42,borderRadius:10,background:`oklch(0.94 0.05 248/.5)`,border:`1px solid oklch(0.80 0.09 248)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:A}}>
                  {s.icon}
                </div>
                <span className="mono" style={{fontSize:11,color:'var(--t3)',letterSpacing:'.07em'}}>Step {s.n}</span>
              </div>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:12,letterSpacing:'-.01em',lineHeight:1.25}}>{s.title}</h3>
              <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.7,marginBottom:16,flex:1}}>{s.desc}</p>
              <div style={{background:'var(--bg2)',border:'1px solid var(--rule)',borderRadius:7,padding:'9px 12px',marginTop:'auto'}}>
                <span className="mono" style={{fontSize:10.5,color:A,letterSpacing:'.02em'}}>{s.mono}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Backend architecture ─── */
function BackendArchitecture(){
  const card = {
    background:'white',
    border:'1px solid var(--rule)',
    borderRadius:14,
    padding:'22px 20px',
    boxShadow:'var(--shadow-sm)',
  };
  const steps = [
    {t:'Web UI panel',d:'Hosted inside Rhino as a docked panel (Eto / WebView2 style). Presents steps, material selectors, and outputs without leaving the modeling context.',mono:'Panel ⇄ RhinoCommon host'},
    {t:'Rhino picking',d:'Users pick ceiling and floor slabs directly in the viewport. Events push stable IDs and surface metrics downstream to Grasshopper.',mono:'RhinoDoc.Objects + picks'},
    {t:'Grasshopper core',d:'Definitions normalize geometry, run span + load heuristics, and assemble product suggestions / budget bands from CSV or spreadsheet inputs.',mono:'.gh solver graph'},
    {t:'Visualization',d:'Preview curves, hatching, or metadata tags are written back to Rhino layers so teams can see structural intent alongside design geometry.',mono:'Viewport overlays'},
  ];
  return (
    <section id="architecture" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="04" title="Backend architecture" sub="How the Structure Assistant stack connects interactive UI, reliable geometry capture, Grasshopper logic, and readable outputs."/>
        <div className="sa-arch-grid reveal d1" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginTop:40}}>
          {steps.map((s,i)=>(
            <div key={i} style={{...card,display:'flex',flexDirection:'column',gap:10}}>
              <div className="mono" style={{fontSize:10,color:A,letterSpacing:'.08em'}}>0{i+1}</div>
              <div style={{fontWeight:700,fontSize:15,color:'var(--text)',letterSpacing:'-.01em'}}>{s.t}</div>
              <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.65,flex:1}}>{s.d}</p>
              <div style={{background:'var(--bg2)',border:'1px solid var(--rule)',borderRadius:8,padding:'8px 10px'}}>
                <span className="mono" style={{fontSize:10,color:'var(--t3)',letterSpacing:'.04em'}}>{s.mono}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="reveal d2" style={{marginTop:32,fontSize:14,color:'var(--t2)',lineHeight:1.75,maxWidth:760}}>
          The prototype keeps Grasshopper “headless” beside the panel: Rhino feeds live geometry, the UI collects intent, and the definition returns structured data for both the panel tables and optional preview geometry. Replace this paragraph with a diagram image if you prefer a single schematic asset.
        </p>
      </div>
    </section>
  );
}

/* ─── Demo ─── */
function Demo(){
  return (
    <section id="demo" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="05" title="See it in action" sub="Interactive mock of the docked Structure Assistant panel — identical markup to plugin-ui.html so styling stays faithful to the Rhino side panel."/>
        <div className="reveal d1" style={{marginTop:44,display:'flex',justifyContent:'center',padding:'0 8px'}}>
          <div className="rhino-panel-chrome" style={{width:'100%',maxWidth:692}}>
            <div className="rhino-panel-chrome__titlebar">
              <div className="rhino-panel-chrome__dots" aria-hidden>
                <span style={{background:'oklch(0.65 0.18 25)'}} />
                <span style={{background:'oklch(0.75 0.15 80)'}} />
                <span style={{background:'oklch(0.55 0.16 145)'}} />
              </div>
              <span className="mono" style={{fontSize:10,color:'var(--t3)',letterSpacing:'.06em',marginLeft:8}}>Rhino 8 · Structure Assistant (docked panel) · plugin-ui.html</span>
            </div>
            <div className="rhino-panel-chrome__iframe-wrap">
              <iframe
                src="plugin-ui.html"
                title="Structure Assistant Plugin UI"
                scrolling="no"
              />
            </div>
          </div>
        </div>
        <div className="reveal d2" style={{marginTop:24,display:'flex',justifyContent:'center'}}>
          <p style={{fontSize:13,color:'var(--t3)',textAlign:'center',maxWidth:520,lineHeight:1.7,fontStyle:'italic'}}>
            Interactive plugin preview. Pick slabs → select material → review section guidance, product matches and budget estimate. All output is pre-consultation support — verify structural decisions with your engineer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Credibility ─── */
function Credibility(){
  const pillars = [
    {n:'01',title:'User research',icon:<IcoResearch/>,detail:'Grounded in direct practice experience working in a small architecture office, and in research on how small firms actually engage with structural consultants throughout the design process.',items:['First-hand experience in a 2–3 person office','Research on SE workflow in small practice','Identification of the highest-friction coordination moments']},
    {n:'02',title:'Structural logic translation',icon:<IcoLogic/>,detail:'Every guidance output is rooted in established engineering principles and published span tables — translated into language that supports architectural decision-making, without overstating certainty or bypassing professional review.',items:['Based on published structural design standards','Section sizing from manufacturer span tables','Deflection estimates from established elastic formulae']},
    {n:'03',title:'Rhino / Grasshopper implementation',icon:<IcoRhino/>,detail:'The plugin is built as a native Rhino panel, with a Grasshopper component handling geometric processing. Design intent maps directly to structural parameters — no format conversion required.',items:['RhinoCommon API for direct geometry access','Headless Grasshopper for parametric processing','Python backend with structured output layer']},
  ];
  return (
    <section id="credibility" style={{padding:'88px 5vw',background:'var(--dark)',borderTop:'none'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="06" title="How it's built" light sub="The quality of the guidance matters. These are the foundations it rests on."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:44}}>
          {pillars.map((p,i)=>(
            <div key={i} className={`reveal d${i+1}`} style={{background:'rgba(255,255,255,.055)',border:'1px solid rgba(255,255,255,.10)',borderRadius:14,padding:'28px 24px'}}>
              <div style={{color:`oklch(0.70 0.11 248)`,marginBottom:16}}>{p.icon}</div>
              <div className="mono" style={{fontSize:10,color:'rgba(255,255,255,.35)',letterSpacing:'.08em',marginBottom:8}}>{p.n}</div>
              <h3 style={{fontSize:18,fontWeight:600,color:'white',marginBottom:12,letterSpacing:'-.01em'}}>{p.title}</h3>
              <p style={{fontSize:13.5,color:'rgba(255,255,255,.60)',lineHeight:1.7,marginBottom:18}}>{p.detail}</p>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:7,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.08)'}}>
                {p.items.map((it,j)=>(
                  <li key={j} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                    <span style={{width:4,height:4,borderRadius:'50%',background:`oklch(0.70 0.11 248)`,display:'inline-block',flexShrink:0,marginTop:7}}/>
                    <span style={{fontSize:12,color:'rgba(255,255,255,.45)',lineHeight:1.55}}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── System pipeline (Grasshopper backend) ─── */
function SystemPipeline(){
  const card = {
    background:'white',
    border:'1px solid var(--rule)',
    borderRadius:14,
    padding:'28px 24px',
    boxShadow:'var(--shadow-sm)',
    display:'flex',
    flexDirection:'column',
    gap:0,
    minHeight:0,
  };
  const steps = [
    {
      n:'01',
      label:'Step 1',
      title:'Structural logic generation',
      lines:['1.1 Detect slab span directions / length','1.2 Separate primary & secondary logic','1.3 Generate primary beam rows','1.4 Generate secondary beam rows'],
      mono:'Slab spans → primary / secondary beam grids',
      icon:<IcoSelect/>,
    },
    {
      n:'02',
      label:'Step 2',
      title:'Analysis & decision logic',
      lines:['2A Beam depth sizing','2B Matching the pre-fab product','2C Budget estimator'],
      mono:'Sizing · catalog match · cost estimate',
      icon:<IcoAnalyze/>,
    },
    {
      n:'03',
      label:'Step 3',
      title:'Output & feedback',
      lines:['3A 3D beam solids','3B Color coding','3C Karamba heatmap','3D Karamba results'],
      mono:'Solids, graphics, and structural readouts',
      icon:<IcoOutput/>,
    },
  ];
  const features = [
    ['End-to-end pipeline','From geometry input to real-time structural feedback.'],
    ['Real-time feedback','Instant updates'],
    ['Rule-based logic','Parametric & accurate'],
    ['Cost & performance','Informed decisions'],
    ['Design with confidence','Built-in intelligence'],
  ];
  return (
    <section id="pipeline" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)',background:'var(--bg2)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel
          n="07"
          title="System Pipeline: Grasshopper Backend Design Logic"
          sub="How slab geometry flows through parametric rules, analysis branches, structural outputs, and the docked Rhino UI — aligned with the capstone presentation slide."
        />
        <div className="sa-pipeline-steps-grid reveal" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginTop:44}}>
          {steps.map((s,i)=>(
            <div key={s.n} className={`reveal d${i+1}`} style={{...card}}>
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:20}}>
                <div style={{width:42,height:42,borderRadius:10,background:`oklch(0.94 0.05 248/.5)`,border:`1px solid oklch(0.80 0.09 248)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:A}}>
                  {s.icon}
                </div>
                <span className="mono" style={{fontSize:11,color:'var(--t3)',letterSpacing:'.07em'}}>{s.label}</span>
              </div>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:12,letterSpacing:'-.01em',lineHeight:1.25}}>{s.title}</h3>
              <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:16,flex:1}}>
                {s.lines.map((line)=>(
                  <li key={line} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                    <span style={{width:4,height:4,borderRadius:'50%',background:A,opacity:.65,marginTop:7,flexShrink:0}}/>
                    <span style={{fontSize:13,color:'var(--t2)',lineHeight:1.55}}>{line}</span>
                  </li>
                ))}
              </ul>
              <div style={{background:'var(--bg2)',border:'1px solid var(--rule)',borderRadius:7,padding:'9px 12px',marginTop:'auto'}}>
                <span className="mono" style={{fontSize:10.5,color:A,letterSpacing:'.02em'}}>{s.mono}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sa-pipeline-split reveal" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginTop:18,alignItems:'stretch'}}>
          <div className="reveal d1" style={{...card}}>
            <span className="mono" style={{fontSize:11,color:'var(--t3)',letterSpacing:'.07em',marginBottom:12}}>UI visualization</span>
            <h3 style={{fontSize:17,fontWeight:600,marginBottom:10,letterSpacing:'-.01em',lineHeight:1.25}}>Real-time results on interface</h3>
            <p style={{fontSize:13.5,color:'var(--t2)',lineHeight:1.7}}>
              Tables, guidance, and status in the docked Structure Assistant panel stay in sync with Grasshopper as slabs, materials, and loads change — the same interaction model as elsewhere on this page.
            </p>
          </div>
          <div className="reveal d2">
            <div className="mono" style={{fontSize:11,color:'var(--t3)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:10}}>Actual Grasshopper script recording</div>
            <div className="rhino-panel-chrome" style={{width:'100%',overflow:'hidden'}}>
              <div className="rhino-panel-chrome__titlebar">
                <div className="rhino-panel-chrome__dots" aria-hidden>
                  <span style={{background:'oklch(0.65 0.18 25)'}} />
                  <span style={{background:'oklch(0.75 0.15 80)'}} />
                  <span style={{background:'oklch(0.55 0.16 145)'}} />
                </div>
                <span className="mono" style={{fontSize:10,color:'var(--t3)',letterSpacing:'.06em',marginLeft:8}}>Grasshopper · definition capture</span>
              </div>
              <div style={{background:'#0a0c10',padding:10,lineHeight:0}}>
                <video controls poster="assets/grasshopper-video-poster.png" style={{width:'100%',height:'auto',display:'block',borderRadius:8}}>
                  <source src="assets/grasshopper-script-recording.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="sa-pipeline-features-grid reveal d3" style={{marginTop:18}}>
          {features.map(([title,body])=>(
            <div key={title} className="sa-pipeline-feature-bar__item">
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ecosystem ─── */
const MODS = [
  {name:'Structure Assistant',consultant:'Structural Engineer',status:'live'},
  {name:'Sustainability Assistant',consultant:'Sustainability Consultant',status:'soon'},
  {name:'Zoning Assistant',consultant:'Zoning / Planning',status:'soon'},
  {name:'Code Assistant',consultant:'Code Consultant',status:'soon'},
];
function Ecosystem(){
  return (
    <section style={{padding:'88px 5vw',background:'var(--bg2)',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="08" title="Part of a larger system" sub="Structure Assistant is the first module in the Small Architecture Office Assistant platform — alongside sustainability, zoning, and code assistants."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:14,marginTop:44,maxWidth:720,marginLeft:'auto',marginRight:'auto'}}>
          {MODS.map((m,i)=>(
            <div key={i} className={`reveal d${Math.min(i+1,4)}`} style={{background:m.status==='live'?'white':'oklch(0.975 0.005 248)',border:m.status==='live'?`1.5px solid ${A}`:'1px solid var(--rule)',borderRadius:12,padding:'22px 20px',boxShadow:m.status==='live'?`0 4px 20px ${A}18`:'var(--shadow-sm)',opacity:m.status==='live'?1:0.65,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontWeight:600,fontSize:14,color:m.status==='live'?A:'var(--text)',marginBottom:4,letterSpacing:'-.01em'}}>{m.name}</div>
                <div className="mono" style={{fontSize:10.5,color:'var(--t3)',letterSpacing:'.03em'}}>{m.consultant}</div>
              </div>
              {m.status==='live'?<span className="chip chip-live"><span style={{width:5,height:5,borderRadius:'50%',background:'oklch(0.45 0.18 145)',display:'inline-block'}}/>Live</span>:<span className="chip" style={{background:'oklch(0.93 0.01 250)',border:'1px solid oklch(0.86 0.02 250)',color:'var(--t3)'}}>Planned</span>}
            </div>
          ))}
        </div>
        <div className="reveal d4" style={{marginTop:20,textAlign:'center'}}>
          <a href="index.html" style={{fontSize:13,fontWeight:500,color:A,textDecoration:'none',transition:'opacity .2s'}}
             onMouseEnter={e=>e.target.style.opacity='.7'} onMouseLeave={e=>e.target.style.opacity='1'}>
            View the full SAOA platform →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Download ─── */
function Download(){
  return (
    <section id="download" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start'}}>
          <div>
            <SectionLabel n="09" title="Plugin installation"/>
            <p className="reveal" style={{fontSize:15,color:'var(--t2)',lineHeight:1.75,marginBottom:28,marginLeft:32}}>
              Download a single <span className="mono" style={{fontSize:13,color:A}}>.zip</span> that bundles the Rhino plug-in (<span className="mono" style={{fontSize:12.5,color:A}}>.rhp</span>) for the Structure Assistant panel, the <span className="mono" style={{fontSize:13,color:A}}>StructureAssistant.gh</span> Grasshopper definition, an optional sample Rhino model (<span className="mono" style={{fontSize:12.5,color:A}}>.3dm</span>), and a <span className="mono" style={{fontSize:12.5,color:A}}>README</span> install guide.
            </p>
            <div className="reveal d1" style={{display:'flex',flexDirection:'column',gap:10,marginLeft:32}}>
              <Btn href={SA_DOWNLOAD_ZIP} primary download>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Structure Assistant (ZIP)
              </Btn>
              <div style={{display:'flex',gap:10,marginTop:4,flexWrap:'wrap',alignItems:'center'}}>
                <a href={SA_SAMPLE_3DM} download style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 14px',border:'1px solid var(--rule)',borderRadius:8,background:'white',textDecoration:'none',fontSize:13,color:'var(--t2)',transition:'all .2s',boxShadow:'var(--shadow-sm)'}}
                   onMouseEnter={e=>{e.currentTarget.style.borderColor=A;e.currentTarget.style.color=A;}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--rule)';e.currentTarget.style.color='var(--t2)';}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Download Sample File
                </a>
                <a href={SA_GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'9px 14px',border:'1px solid var(--rule)',borderRadius:8,background:'white',textDecoration:'none',fontSize:13,color:'var(--t2)',transition:'all .2s',boxShadow:'var(--shadow-sm)'}}
                   onMouseEnter={e=>{e.currentTarget.style.borderColor=A;e.currentTarget.style.color=A;}} onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--rule)';e.currentTarget.style.color='var(--t2)';}}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C3.69 1 1 3.69 1 7c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.28v-1c-1.67.36-2.02-.8-2.02-.8-.27-.7-.67-.88-.67-.88-.55-.37.04-.36.04-.36.6.04.92.62.92.62.54.92 1.41.65 1.75.5.05-.39.21-.65.38-.8-1.33-.15-2.73-.67-2.73-2.96 0-.65.23-1.19.62-1.6-.06-.15-.27-.76.06-1.58 0 0 .5-.16 1.65.62A5.76 5.76 0 017 3.8c.51 0 1.02.07 1.5.2 1.14-.78 1.64-.62 1.64-.62.33.82.12 1.43.06 1.58.39.41.62.95.62 1.6 0 2.3-1.4 2.8-2.74 2.95.22.19.41.56.41 1.12v1.66c0 .16.1.34.41.28A6.002 6.002 0 0013 7c0-3.31-2.69-6-6-6z" fill="currentColor" stroke="none"/></svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
          {/* Setup instructions */}
          <div className="reveal d2">
            <div style={{background:'white',border:'1px solid var(--rule)',borderRadius:14,padding:'28px 26px',boxShadow:'var(--shadow-sm)'}}>
              <div className="mono" style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:20}}>Getting started</div>
              {(() => {
                const steps = [
                  {
                    n:'1',
                    title:'Install the Rhino plug-in first',
                    code:'Extract the ZIP and follow README.\nInstall the Structure Assistant .rhp (drag into Rhino or copy to the Rhino plug-ins folder).\nRestart Rhino if prompted — this loads the custom Structure Assistant side panel.',
                  },
                  {
                    n:'2',
                    title:'Open the Grasshopper file',
                    code:'Launch Rhino 7 or 8, then Grasshopper.\nFile → Open → StructureAssistant.gh',
                  },
                  {
                    n:'3',
                    title:'Keep Grasshopper running',
                    code:'The Rhino panel communicates with the Grasshopper definition.\nLeave Grasshopper open while you work.',
                  },
                  {
                    n:'4',
                    title:'Use the Rhino panel',
                    code:'Pick slab geometry in Rhino, set materials in the panel, and read layout, spacing, depth, and analysis feedback there.',
                  },
                ];
                return steps.map((step,i)=>(
                  <div key={i} style={{display:'flex',gap:14,marginBottom:i<steps.length-1?20:0,paddingBottom:i<steps.length-1?20:0,borderBottom:i<steps.length-1?'1px solid var(--rule)':'none'}}>
                    <div style={{width:24,height:24,borderRadius:6,background:A,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <span className="mono" style={{fontSize:11,fontWeight:700,color:'white'}}>{step.n}</span>
                    </div>
                    <div>
                      <div style={{fontWeight:600,fontSize:13.5,marginBottom:8,letterSpacing:'-.01em'}}>{step.title}</div>
                      <div style={{background:'var(--bg2)',border:'1px solid var(--rule)',borderRadius:7,padding:'10px 12px'}}>
                        <pre style={{fontFamily:'DM Mono,monospace',fontSize:11,color:A,lineHeight:1.7,margin:0,whiteSpace:'pre-wrap'}}>{step.code}</pre>
                      </div>
                    </div>
                  </div>
                ));
              })()}
              {/* Requirements */}
              <div style={{marginTop:20,padding:'12px 14px',background:`oklch(0.94 0.05 248/.4)`,border:`1px solid oklch(0.80 0.09 248)`,borderRadius:8}}>
                <div className="mono" style={{fontSize:10,color:A,fontWeight:700,letterSpacing:'.06em',marginBottom:6}}>REQUIRES</div>
                <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:10}}>
                  {[
                    'Rhino 7 or 8',
                    'Grasshopper',
                    'ZIP: .rhp + StructureAssistant.gh + README (± sample .3dm)',
                    'Windows recommended (compiled plug-in prototype)',
                  ].map(r=>(
                    <span key={r} className="mono" style={{fontSize:11,color:'var(--t2)'}}>{r}</span>
                  ))}
                </div>
                <div style={{paddingTop:10,borderTop:'1px solid oklch(0.80 0.09 248/.5)'}}>
                  <p style={{fontSize:11.5,color:'var(--t3)',lineHeight:1.65,fontStyle:'italic'}}>
                    Use the README inside the ZIP for exact file names, load paths, and troubleshooting. The Grasshopper graph powers the analysis; the plug-in hosts the docked UI that talks to it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer(){
  return (
    <footer style={{background:'oklch(0.09 0.03 252)',borderTop:'1px solid rgba(255,255,255,.05)',padding:'36px 5vw'}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:7}}>
            <LogoMark c={A} sz={18}/>
            <a href="index.html" style={{fontWeight:600,fontSize:14,color:'white',textDecoration:'none'}}>SAOA</a>
            <span style={{color:'rgba(255,255,255,.2)'}}>›</span>
            <span style={{fontSize:14,fontWeight:500,color:A}}>Structure Assistant</span>
          </div>
          <p style={{fontSize:11.5,color:'rgba(255,255,255,.28)',lineHeight:1.65}}>
            Module 01 of 04 · Columbia University GSAPP Capstone Project
          </p>
        </div>
        <div style={{display:'flex',gap:24}}>
          {[['Why','#problem'],['Workflow','#how'],['Architecture','#architecture'],['Demo','#demo'],['Install','#download']].map(([l,h])=>(
            <a key={l} href={h} style={{fontSize:13,color:'rgba(255,255,255,.35)',textDecoration:'none',fontWeight:500,transition:'color .2s'}}
               onMouseEnter={e=>e.target.style.color='white'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.35)'}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Icons ─── */
function IcoTime(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M13 8v5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 3.5L6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M18 3.5l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;}
function IcoLoop(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 13a8 8 0 0 1 8-8 8 8 0 0 1 7 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M21 13a8 8 0 0 1-8 8 8 8 0 0 1-7-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M18 5.5l3 3.5 2.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 20.5l-3-3.5-2.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function IcoBuilding(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="5" y="5" width="7" height="10" stroke="currentColor" strokeWidth="1.5" rx="1"/><rect x="14" y="9" width="7" height="12" stroke="currentColor" strokeWidth="1.5" rx="1"/><line x1="4" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="7.5" y="8" width="2" height="2.5" rx=".5" fill="currentColor" opacity=".5"/><rect x="16.5" y="12" width="2" height="2.5" rx=".5" fill="currentColor" opacity=".5"/></svg>;}
function IcoSelect(){return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2.5"/><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M11 3v2M11 17v2M3 11h2M17 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;}
function IcoAnalyze(){return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 16L8 10l4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="10" r="1.5" fill="currentColor" opacity=".5"/><circle cx="12" cy="14" r="1.5" fill="currentColor" opacity=".5"/><circle cx="18" cy="6" r="1.5" fill="currentColor" opacity=".5"/></svg>;}
function IcoOutput(){return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 11.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function IcoArchNode(){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5" y="14" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.4"/><path d="M9 14V9l3-3 3 3v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="6" x2="12" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;}
function IcoBuildingNode(){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M16 12.5l1.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="19" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/></svg>;}
function IcoResearch(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M16.5 16.5l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 11h6M11 8v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;}
function IcoLogic(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="8" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="14" y="5" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="14" y="14" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M12 11h2a2 2 0 0 1 2 2v0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M12 15h2a2 2 0 0 0 2-2v0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;}
function IcoRhino(){return <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="4" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M9 18V8l4 4 4-4v10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

/* ─── App ─── */
function App(){
  useReveal();
  return <>
    <Nav/>
    <Hero/>
    <Problem/>
    <Collaboration/>
    <HowItWorks/>
    <BackendArchitecture/>
    <Demo/>
    <Credibility/>
    <SystemPipeline/>
    <Ecosystem/>
    <Download/>
    <Footer/>
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);