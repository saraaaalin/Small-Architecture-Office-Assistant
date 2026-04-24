const {useState,useEffect,useRef} = React;
const A = '#286ea4';

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
function Btn({href,primary,children,style={}}){
  const [hov,setHov]=useState(false);
  return <a href={href||'#'} style={{display:'inline-flex',alignItems:'center',gap:7,padding:'13px 26px',borderRadius:8,fontSize:14,fontWeight:500,textDecoration:'none',letterSpacing:'.01em',transition:'all .2s',background:primary?(hov?`${A}dd`:A):'white',color:primary?'white':(hov?A:'var(--t2)'),border:primary?'none':'1px solid var(--rule)',boxShadow:primary?`0 4px 18px ${A}33`:'var(--shadow-sm)',transform:hov?'translateY(-1px)':'none',...style}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>{children}</a>;
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
        <Btn href="#download" primary style={{padding:'7px 16px',fontSize:13}}>Download Plugin</Btn>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero(){
  return (
    <section style={{position:'relative',minHeight:'96vh',display:'flex',alignItems:'center',padding:'80px 5vw',paddingTop:'calc(80px + 58px)',overflow:'hidden'}}>
      <GridBg/>
      <div className="sa-hero-two-col" style={{position:'relative',zIndex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center',maxWidth:1200,width:'100%',margin:'0 auto'}}>
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
              Download Plugin
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
        {/* Hero plugin preview */}
        <div className="reveal d3">
          <HeroPluginPreview/>
        </div>
      </div>
    </section>
  );
}

function HeroPluginPreview(){
  return (
    <div style={{position:'relative'}}>
      {/* Rhino viewport mockup */}
      <div style={{background:'oklch(0.17 0.03 250)',borderRadius:14,overflow:'hidden',boxShadow:`0 20px 60px oklch(0.17 0.04 250/0.22)`,border:'1px solid oklch(0.25 0.03 250)'}}>
        {/* Viewport toolbar */}
        <div style={{background:'oklch(0.20 0.03 250)',padding:'8px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid oklch(0.25 0.03 250)'}}>
          <div style={{display:'flex',gap:6}}>
            {['oklch(0.65 0.18 25)','oklch(0.75 0.15 80)','oklch(0.55 0.16 145)'].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}
          </div>
          <span className="mono" style={{fontSize:10,color:'oklch(0.55 0.03 250)',letterSpacing:'.04em'}}>Rhino 8 · Perspective</span>
          <div style={{display:'flex',gap:12}}>
            {['Top','Front','Right','Persp'].map(v=><span key={v} className="mono" style={{fontSize:9,color:'oklch(0.45 0.03 250)'}}>{v}</span>)}
          </div>
        </div>
        {/* 3D viewport */}
        <div style={{position:'relative',height:200,background:'oklch(0.15 0.02 250)',padding:'10px'}}>
          <svg width="100%" height="100%" viewBox="0 0 560 180" preserveAspectRatio="xMidYMid meet" fill="none">
            {/* Grid floor */}
            {[0,1,2,3,4,5,6].map(i=><line key={i} x1={40+i*80} y1="40" x2={0+i*70} y2="160" stroke="oklch(0.28 0.03 250)" strokeWidth=".5"/>)}
            {[0,1,2,3].map(i=><line key={i} x1="40" y1={40+i*40} x2="480" y2={40+i*40} stroke="oklch(0.28 0.03 250)" strokeWidth=".5" opacity={1-i*.2}/>)}
            {/* Structure */}
            <line x1="120" y1="50" x2="120" y2="145" stroke={A} strokeWidth="2.5" opacity=".8"/>
            <line x1="280" y1="50" x2="280" y2="145" stroke={A} strokeWidth="2.5" opacity=".8"/>
            <line x1="440" y1="50" x2="440" y2="145" stroke={A} strokeWidth="2.5" opacity=".8"/>
            <rect x="115" y="47" width="10" height="5" rx="1" fill={A} opacity=".5"/>
            <rect x="275" y="47" width="10" height="5" rx="1" fill={A} opacity=".5"/>
            <rect x="435" y="47" width="10" height="5" rx="1" fill={A} opacity=".5"/>
            <rect x="115" y="142" width="10" height="5" rx="1" fill={A} opacity=".4"/>
            <rect x="275" y="142" width="10" height="5" rx="1" fill={A} opacity=".4"/>
            <rect x="435" y="142" width="10" height="5" rx="1" fill={A} opacity=".4"/>
            <rect x="116" y="47" width="328" height="7" rx="2" fill={A} opacity=".6"/>
            <rect x="116" y="98" width="328" height="5" rx="1.5" fill={A} opacity=".3"/>
            {/* Selected beam highlight */}
            <rect x="116" y="47" width="164" height="7" rx="2" fill="oklch(0.75 0.15 200)" opacity=".8"/>
            <circle cx="120" cy="50" r="5" fill="oklch(0.75 0.15 200)" opacity=".9"/>
            <circle cx="280" cy="50" r="5" fill="oklch(0.75 0.15 200)" opacity=".9"/>
            {/* Span annotation */}
            <line x1="120" y1="168" x2="280" y2="168" stroke="oklch(0.75 0.15 200)" strokeWidth=".8" opacity=".6"/>
            <line x1="120" y1="163" x2="120" y2="173" stroke="oklch(0.75 0.15 200)" strokeWidth="1" opacity=".7"/>
            <line x1="280" y1="163" x2="280" y2="173" stroke="oklch(0.75 0.15 200)" strokeWidth="1" opacity=".7"/>
            <text x="200" y="178" textAnchor="middle" fontSize="9" fill="oklch(0.75 0.15 200)" fontFamily="DM Mono,monospace" opacity=".8">8 400 mm · selected</text>
            {/* Nodes */}
            {[[120,50],[280,50],[440,50],[120,147],[280,147],[440,147]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3.5" fill={A} opacity=".65"/>)}
          </svg>
          {/* Layer panel ghost */}
          <div style={{position:'absolute',top:8,right:8,background:'oklch(0.20 0.03 250/0.9)',border:'1px solid oklch(0.28 0.03 250)',borderRadius:7,padding:'8px 10px',minWidth:130}}>
            {['Default','Structural_Frame','Walls','Slabs'].map((l,i)=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:6,padding:'2px 0'}}>
                <div style={{width:8,height:8,borderRadius:1,background:i===1?A:'oklch(0.38 0.02 250)',opacity:i===1?1:.5}}/>
                <span className="mono" style={{fontSize:9,color:i===1?'oklch(0.75 0.10 248)':'oklch(0.45 0.03 250)'}}>{l}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Command line */}
        <div style={{background:'oklch(0.18 0.03 250)',borderTop:'1px solid oklch(0.25 0.03 250)',padding:'6px 14px',display:'flex',alignItems:'center',gap:8}}>
          <span className="mono" style={{fontSize:10,color:'oklch(0.45 0.03 250)'}}>Command:</span>
          <span className="mono" style={{fontSize:10,color:'oklch(0.70 0.10 248)'}}>SA_Analyze<span style={{opacity:.5,animation:'blink 1s infinite'}}>_</span></span>
        </div>
      </div>
      {/* Floating plugin panel */}
      <div style={{position:'absolute',right:-20,bottom:-28,width:240,background:'white',border:`1.5px solid ${A}`,borderRadius:12,boxShadow:`0 8px 36px ${A}22`,overflow:'hidden'}}>
        <div style={{background:A,padding:'8px 14px',display:'flex',alignItems:'center',gap:7}}>
          <LogoMark c="rgba(255,255,255,.8)" sz={16}/>
          <span className="mono" style={{fontSize:10,color:'white',letterSpacing:'.05em'}}>Structure Assistant</span>
        </div>
        <div style={{padding:'12px 14px'}}>
          <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:8}}>Guidance ready</div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid oklch(0.94 0.01 250)'}}>
            <span className="mono" style={{fontSize:10,color:'var(--t3)'}}>Span</span>
            <span className="mono" style={{fontSize:10,color:'var(--text)',fontWeight:500}}>8 400 mm</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid oklch(0.94 0.01 250)'}}>
            <span className="mono" style={{fontSize:10,color:'var(--t3)'}}>Section</span>
            <span className="mono" style={{fontSize:10,color:A,fontWeight:600}}>215×495 GL28h</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'5px 0'}}>
            <span className="mono" style={{fontSize:10,color:'var(--t3)'}}>Deflection</span>
            <span className="mono" style={{fontSize:10,color:'var(--text)'}}>≈ 22 mm</span>
          </div>
          <div style={{marginTop:10,padding:'8px 10px',background:`oklch(0.94 0.05 248/.5)`,border:`1px solid oklch(0.80 0.09 248)`,borderRadius:6}}>
            <p style={{fontSize:10.5,color:'var(--text)',lineHeight:1.55}}>Pre-consultation guidance. Verify with your structural engineer.</p>
          </div>
        </div>
      </div>
    </div>
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

/* ─── Features ─── */
function Features(){
  const caps = [
    {title:'Span & member sizing support',desc:'Early-stage guidance on beam depth, width, and section grade across timber, steel, and concrete — to support design decisions before SE review.',tag:'Full'},
    {title:'Load classification',desc:'Residential, commercial, and roof load categories with appropriate guidance for each.',tag:'Full'},
    {title:'Material comparison',desc:'Side-by-side section options across glulam, structural steel, and reinforced concrete.',tag:'Full'},
    {title:'Column sizing support',desc:'Axial load estimation and section guidance for timber and steel columns — to support layout and structural system decisions in early design phases.',tag:'Full'},
    {title:'Deflection estimates',desc:'Mid-span deflection estimates for serviceability checks — clearly presented with L/300 reference.',tag:'Full'},
    {title:'Floor system comparison',desc:'Guidance on beam-and-slab, flat slab, and timber joist systems for given spans and loads.',tag:'Full'},
    {title:'Cantilever guidance',desc:'Basic cantilever span guidance for spans up to 4m, with deflection and vibration notes.',tag:'Partial'},
    {title:'Roof structure',desc:'Pitched and flat roof member guidance including wind uplift and snow load notes.',tag:'Partial'},
    {title:'Consultation-ready framing',desc:'All output is labelled as pre-consultation support and structured to help architects collaborate more effectively with their structural engineer.',tag:'Full'},
  ];
  const tagColors = {Full:{bg:`oklch(0.93 0.07 145/.6)`,bd:`oklch(0.78 0.10 145)`,col:`oklch(0.30 0.12 145)`},Partial:{bg:`oklch(0.93 0.07 60/.5)`,bd:`oklch(0.78 0.10 55)`,col:`oklch(0.40 0.12 55)`}};
  return (
    <section id="features" style={{padding:'88px 5vw',background:'var(--bg2)',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="06" title="Key capabilities" sub="What Structure Assistant supports in version 1.0. All guidance is designed to inform design decisions — final structural validation belongs to your engineer."/>
        <div className="sa-features-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginTop:44}}>
          {caps.map((c,i)=>(
            <div key={i} className={`reveal d${Math.min(i%3+1,3)}`} style={{background:'white',border:'1px solid var(--rule)',borderRadius:12,padding:'22px 20px',boxShadow:'var(--shadow-sm)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <h3 style={{fontSize:14,fontWeight:600,letterSpacing:'-.01em',lineHeight:1.3,maxWidth:'70%'}}>{c.title}</h3>
                <span style={{fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20,background:tagColors[c.tag].bg,border:`1px solid ${tagColors[c.tag].bd}`,color:tagColors[c.tag].col,letterSpacing:'.04em',flexShrink:0}}>{c.tag}</span>
              </div>
              <p style={{fontSize:12.5,color:'var(--t2)',lineHeight:1.65}}>{c.desc}</p>
            </div>
          ))}
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
        <SectionLabel n="07" title="How it's built" light sub="The quality of the guidance matters. These are the foundations it rests on."/>
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

/* ─── Target users ─── */
function TargetUsers(){
  const users = [
    {title:'Architects at small firms',sub:'2–10 person offices',desc:'The primary audience. Working without in-house structural expertise, relying on a single external SE across multiple projects. The tool supports better preparation for those consultations — so each meeting is more focused and productive.',match:'High'},
    {title:'Sole practitioners',sub:'Single-architect practice',desc:'Highly dependent on external consultants for structural input. Structure Assistant helps sole practitioners develop designs with more structural awareness — so questions are better formed before they reach the SE.',match:'High'},
    {title:'Architecture students',sub:'Advanced studio / thesis work',desc:'Working through structural implications of a design proposal before faculty or engineer review. Useful for building structural intuition alongside design development.',match:'High'},
    {title:'Design-build teams',sub:'Architect-led construction',desc:'When the architect is also managing construction, faster structural feedback during design reduces the risk of costly field changes later in the process.',match:'Medium'},
  ];
  const matchC = {High:{col:`oklch(0.35 0.12 145)`,bg:`oklch(0.93 0.07 145/.5)`,bd:`oklch(0.78 0.10 145)`},Medium:{col:`oklch(0.45 0.12 55)`,bg:`oklch(0.93 0.07 60/.4)`,bd:`oklch(0.78 0.10 55)`}};
  return (
    <section id="users" style={{padding:'88px 5vw',borderTop:'1px solid var(--rule)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <SectionLabel n="08" title="Who this is for" sub="Structure Assistant supports architects who work alongside structural consultants — bridging the gap between design intent and consultant collaboration."/>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:18,marginTop:44}}>
          {users.map((u,i)=>(
            <div key={i} className={`reveal d${i%2+1}`} style={{background:'white',border:'1px solid var(--rule)',borderRadius:14,padding:'26px 24px',boxShadow:'var(--shadow-sm)',display:'flex',gap:18,alignItems:'flex-start'}}>
              <div style={{width:44,height:44,borderRadius:10,background:`oklch(0.94 0.05 248/.5)`,border:`1px solid oklch(0.80 0.09 248)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke={A} strokeWidth="1.4"/><path d="M4.5 19c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke={A} strokeWidth="1.4" strokeLinecap="round"/></svg>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:4}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:15,letterSpacing:'-.01em',marginBottom:2}}>{u.title}</div>
                    <div className="mono" style={{fontSize:10.5,color:'var(--t3)',letterSpacing:'.04em'}}>{u.sub}</div>
                  </div>
                  <span style={{fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:20,background:matchC[u.match].bg,border:`1px solid ${matchC[u.match].bd}`,color:matchC[u.match].col,letterSpacing:'.04em',flexShrink:0,marginLeft:10}}>Match: {u.match}</span>
                </div>
                <p style={{fontSize:13,color:'var(--t2)',lineHeight:1.65,marginTop:10}}>{u.desc}</p>
              </div>
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
        <SectionLabel n="09" title="Part of a larger system" sub="Structure Assistant is the first module in the Small Architecture Office Assistant platform — alongside sustainability, zoning, and code assistants."/>
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
            <SectionLabel n="10" title="Plugin installation"/>
            <p className="reveal" style={{fontSize:15,color:'var(--t2)',lineHeight:1.75,marginBottom:28,marginLeft:32}}>
              Structure Assistant is currently distributed as a Grasshopper definition. Download the <span className="mono" style={{fontSize:13,color:A}}>.gh</span> file, open it in Grasshopper, and keep the definition running while using the Rhino interface.
            </p>
            <div className="reveal d1" style={{display:'flex',flexDirection:'column',gap:10,marginLeft:32}}>
              {/* DOWNLOAD: replace href "#" with direct link to your .gh file (e.g. GitHub Releases raw URL) */}
              <Btn href="#" primary>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Structure Assistant (.gh)
              </Btn>
              <div style={{display:'flex',gap:10,marginTop:4}}>
                {/* PUBLISH: set href to your public GitHub repository */}
                <a href="#" style={{display:'flex',alignItems:'center',gap:6,padding:'9px 14px',border:'1px solid var(--rule)',borderRadius:8,background:'white',textDecoration:'none',fontSize:13,color:'var(--t2)',transition:'all .2s',boxShadow:'var(--shadow-sm)'}}
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
              {[
                {
                  n:'1',
                  title:'Download the tool package',
                  code:'Download Structure Assistant.gh\nOptional: download the sample Rhino file'
                },
                {
                  n:'2',
                  title:'Open Rhino + Grasshopper',
                  code:'Open Rhino 7 or 8\nLaunch Grasshopper\nFile → Open → Structure Assistant.gh'
                },
                {
                  n:'3',
                  title:'Keep the definition running',
                  code:'Do not close Grasshopper\nSelect slab geometry in Rhino\nReview outputs in the panel / definition'
                },
              ].map((step,i)=>(
                <div key={i} style={{display:'flex',gap:14,marginBottom:i<2?20:0,paddingBottom:i<2?20:0,borderBottom:i<2?'1px solid var(--rule)':'none'}}>
                  <div style={{width:24,height:24,borderRadius:6,background:A,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <span className="mono" style={{fontSize:11,fontWeight:700,color:'white'}}>{step.n}</span>
                  </div>
                  <div>
                    <div style={{fontWeight:600,fontSize:13.5,marginBottom:8,letterSpacing:'-.01em'}}>{step.title}</div>
                    <div style={{background:'var(--bg2)',border:'1px solid var(--rule)',borderRadius:7,padding:'10px 12px'}}>
                      <pre style={{fontFamily:'DM Mono,monospace',fontSize:11,color:A,lineHeight:1.7,margin:0,whiteSpace:'pre'}}>{step.code}</pre>
                    </div>
                  </div>
                </div>
              ))}
              {/* Requirements */}
              <div style={{marginTop:20,padding:'12px 14px',background:`oklch(0.94 0.05 248/.4)`,border:`1px solid oklch(0.80 0.09 248)`,borderRadius:8}}>
                <div className="mono" style={{fontSize:10,color:A,fontWeight:700,letterSpacing:'.06em',marginBottom:6}}>REQUIRES</div>
                <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:10}}>
                  {['Rhino 7 or 8','Grasshopper','Windows or macOS','Structure Assistant.gh file'].map(r=>(
                    <span key={r} className="mono" style={{fontSize:11,color:'var(--t2)'}}>{r}</span>
                  ))}
                </div>
                <div style={{paddingTop:10,borderTop:'1px solid oklch(0.80 0.09 248/.5)'}}>
                  <p style={{fontSize:11.5,color:'var(--t3)',lineHeight:1.65,fontStyle:'italic'}}>
                    Note: This research prototype is a Grasshopper tool, not a one-click Yak plugin yet. A compiled <span className="mono" style={{fontSize:10.5}}>.gha</span> / <span className="mono" style={{fontSize:10.5}}>.yak</span> release may be added in a future version.
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
    <Features/>
    <Credibility/>
    <TargetUsers/>
    <Ecosystem/>
    <Download/>
    <Footer/>
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);