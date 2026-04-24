const { useState, useRef } = React;

/* ── helpers ─────────────────────────────────────────────── */
const Icon = ({ d, size = 13, stroke = "currentColor", fill = "none", sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  layers:   "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  chevron:  "M6 9l6 6 6-6",
  check:    "M20 6L9 17l-5-5",
  upload:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  bake:     "M12 3C8 3 5 6.5 5 10c0 4 2.5 6.5 7 9 4.5-2.5 7-5 7-9 0-3.5-3-7-7-7z",
  csv:      "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  rhino:    "M3 12h4l3-9 4 18 3-9h4",
  wait:     "M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zM12 6v6l4 2",
  budget:   "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  db:       "M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zM12 10C6.48 10 2 7.98 2 5.5M22 12c0 2.48-4.48 4.5-10 4.5S2 14.48 2 12",
};

const MATERIALS = [
  { value: "", label: "Select material…" },
  { value: "steel_w", label: "Steel — Wide Flange (W-series)" },
  { value: "steel_hss", label: "Steel — HSS / Tube" },
  { value: "timber_glulam", label: "Mass Timber — Glulam" },
  { value: "timber_clt", label: "Mass Timber — CLT" },
  { value: "concrete_pt", label: "Concrete — Post-Tensioned" },
  { value: "concrete_rc", label: "Concrete — Reinforced" },
];

const PRODUCTS = [
  { id: 1, name: "LevelFab S-350 Wide Flange", mfr: "LevelFab Systems",   spec: "W350×179", cost: 42, score: 96 },
  { id: 2, name: "SteelCore WF-300 Series",    mfr: "SteelCore Prefab",   spec: "W300×129", cost: 37, score: 88 },
  { id: 3, name: "StructaBay WF-400",           mfr: "StructaBay Inc.",    spec: "W400×216", cost: 51, score: 79 },
];

/* ── status pill ──────────────────────────────────────────── */
const StatusPill = ({ state }) => {
  const map = {
    idle:    { dot: "dot-idle",   label: "Waiting",     color: "var(--muted)" },
    active:  { dot: "dot-active", label: "Picked",      color: "var(--amber)" },
    ok:      { dot: "dot-ok",     label: "Selected",    color: "var(--green)" },
  };
  const s = map[state] || map.idle;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, color: s.color, fontWeight:500, fontSize:11 }}>
      <span className={`dot ${s.dot}`}></span>{s.label}
    </span>
  );
};

/* ── score badge ──────────────────────────────────────────── */
const ScoreBadge = ({ score }) => {
  const color = score >= 90 ? "var(--green)" : score >= 75 ? "var(--accent)" : "var(--amber)";
  return (
    <span style={{
      fontFamily: "var(--font-mono,'DM Mono',monospace)",
      fontSize: 10, fontWeight: 600,
      color, background: score >= 90 ? "var(--green-lt)" : score >= 75 ? "var(--accent-lt)" : "var(--amber-lt)",
      borderRadius: 3, padding: "1px 5px",
    }}>{score}</span>
  );
};

/* ── main app ─────────────────────────────────────────────── */
function App() {
  const [ceilState,   setCeilState]   = useState("idle");   // idle | active | ok
  const [floorState,  setFloorState]  = useState("idle");
  const [material,    setMaterial]    = useState("");
  const [dbFile,      setDbFile]      = useState(null);
  const [productQuery,setProductQuery]= useState("");
  const [computing,   setComputing]   = useState(false);
  const [results,     setResults]     = useState(null);
  const [products,    setProducts]    = useState(null);
  const [baked,       setBaked]       = useState(false);
  const fileRef = useRef();

  const slabsReady   = ceilState === "ok" && floorState === "ok";
  const allReady     = slabsReady && material;
  const prodReady    = allReady && products;

  /* simulate picking */
  const handlePick = (which) => {
    const set = which === "ceil" ? setCeilState : setFloorState;
    set("active");
    setTimeout(() => set("ok"), 900);
  };

  /* simulate compute */
  const handleCompute = () => {
    if (!allReady) return;
    setComputing(true); setResults(null); setProducts(null); setBaked(false);
    setTimeout(() => {
      setComputing(false);
      setResults({ span:"8.4 m", depth:"450 mm", spacing:"1200 mm", load:"6.5 kN/m²" });
      setProducts(PRODUCTS);
    }, 1800);
  };

  /* auto-trigger compute when material chosen & slabs ready */
  const handleMaterial = (v) => {
    setMaterial(v);
    if (slabsReady && v) {
      setTimeout(() => {
        setComputing(true); setResults(null); setProducts(null); setBaked(false);
        setTimeout(() => {
          setComputing(false);
          setResults({ span:"8.4 m", depth:"450 mm", spacing:"1200 mm", load:"6.5 kN/m²" });
          setProducts(PRODUCTS);
        }, 1800);
      }, 200);
    }
  };

  const handleBake = () => { if (prodReady) setBaked(true); };

  const totalBudget = products ? (products.reduce((s,p) => s + p.cost, 0) * 48).toFixed(0) : null;

  /* ── layout ─────────────────────────────────────────────── */
  return (
    <div style={{
      width: 690, height: 780,
      padding: "14px 14px 14px",
      display: "flex", flexDirection: "column", gap: 8,
    }}>

      {/* ── header ─────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:2 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "var(--accent)", display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 6px rgba(29,111,204,.4)"
          }}>
            <Icon d={ICONS.rhino} size={15} stroke="#fff" sw={2} />
          </div>
          <div>
            <div style={{ fontWeight:600, fontSize:14, letterSpacing:"-.01em", color:"var(--navy)" }}>Structure Assistant</div>
            <div style={{ fontSize:10, color:"var(--muted)", letterSpacing:".04em", fontFamily:"'DM Mono',monospace" }}>RHINO PLUGIN · v1.2.0</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          <button className="btn btn-ghost" style={{ fontSize:10, padding:"4px 8px" }}>Docs</button>
          <button className="btn btn-ghost" style={{ fontSize:10, padding:"4px 8px" }}>⚙</button>
        </div>
      </div>

      {/* ── description ────────────────────────────────────── */}
      <p style={{
        fontSize: 11.5,
        color: "var(--mid)",
        lineHeight: 1.55,
        maxWidth: 620,
        margin: "0 0 0 0",
        fontWeight: 400,
      }}>
        Early-stage framing spans and prefabricated options for small office projects. Pick slabs, set material, then review structural outputs and preliminary cost ranges.
      </p>

      {/* ── divider ────────────────────────────────────────── */}
      <div className="divider" />

      {/* ── ROW 1: Step 1  |  Output Card ───────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, flex:"0 0 auto" }}>

        {/* Step 1 */}
        <div className="card" style={{ padding:"10px 12px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <span className="step-tag">Step 01</span>
            <span style={{ fontSize:10, color:"var(--muted)" }}>Geometry Input</span>
          </div>
          <div style={{ fontWeight:600, fontSize:12, color:"var(--navy)", marginBottom:8 }}>Select Building Slabs</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {/* Ceiling */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
              <button
                className="btn btn-outline"
                style={{ flex:1, fontSize:11 }}
                onClick={() => handlePick("ceil")}
              >
                <Icon d="M2 3h20v6H2zM2 15h20v6H2z" size={12} />
                {ceilState === "active" ? "Picking…" : "Pick Ceiling Slab"}
              </button>
              <StatusPill state={ceilState} />
            </div>
            {/* Floor */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
              <button
                className="btn btn-outline"
                style={{ flex:1, fontSize:11 }}
                onClick={() => handlePick("floor")}
              >
                <Icon d="M2 7h20M2 17h20M5 3v18M19 3v18" size={12} />
                {floorState === "active" ? "Picking…" : "Pick Floor Slab"}
              </button>
              <StatusPill state={floorState} />
            </div>
          </div>
          {slabsReady && (
            <div className="fade-in" style={{
              marginTop:8, padding:"5px 9px", borderRadius:4,
              background:"var(--green-lt)", border:"1px solid #86efac",
              fontSize:10.5, color:"#15803d", display:"flex", alignItems:"center", gap:5,
            }}>
              <Icon d={ICONS.check} size={11} stroke="#16a34a" sw={2.5} />
              Floor height: <strong>3200 mm</strong>
            </div>
          )}
        </div>

        {/* Output Card */}
        <div className="card" style={{
          padding:"10px 12px",
          borderLeft: results ? "3px solid var(--accent)" : "3px solid var(--border)",
          transition: "border-color .3s",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <span className="step-tag" style={{ background: results ? "var(--accent-lt)" : "#f0f0f0", color: results ? "var(--accent)" : "var(--muted)" }}>Output</span>
            {computing && <span style={{ fontSize:10, color:"var(--accent)", fontFamily:"'DM Mono',monospace" }}>computing…</span>}
          </div>

          {!results && !computing && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, padding:"12px 0", color:"var(--muted)" }}>
              <Icon d={ICONS.wait} size={22} stroke="var(--muted)" sw={1.2} />
              <span style={{ fontSize:11, textAlign:"center", lineHeight:1.4 }}>
                {!allReady ? "Complete steps 1 & 2\nto generate results" : "Ready to compute"}
              </span>
              {allReady && (
                <button className="btn btn-primary" style={{ marginTop:2, fontSize:11 }} onClick={handleCompute}>
                  Compute
                </button>
              )}
            </div>
          )}

          {computing && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, padding:"8px 0" }}>
              <div style={{ height:3, background:"#e2eaf4", borderRadius:2, overflow:"hidden" }}>
                <div className="progress-bar-inner"></div>
              </div>
              <div style={{ fontSize:10.5, color:"var(--muted)", fontFamily:"'DM Mono',monospace" }}>Analysing structure…</div>
              {[60, 80, 45].map((w,i)=>(
                <div key={i} style={{ height:8, borderRadius:3, background:"#e2eaf4", width:`${w}%` }}></div>
              ))}
            </div>
          )}

          {results && !computing && (
            <div className="fade-in" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5px 10px" }}>
              {[
                ["Span",    results.span],
                ["Depth",   results.depth],
                ["Spacing", results.spacing],
                ["Load",    results.load],
              ].map(([k,v]) => (
                <div key={k} style={{ background:"var(--surface)", borderRadius:5, padding:"5px 8px", border:"1px solid var(--border)" }}>
                  <div style={{ fontSize:9.5, color:"var(--muted)", letterSpacing:".04em", textTransform:"uppercase", marginBottom:1 }}>{k}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:500, fontSize:12.5, color:"var(--navy)" }}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ROW 2: Step 2  |  Step 3 ────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, flex:"0 0 auto" }}>

        {/* Step 2 */}
        <div className="card" style={{ padding:"10px 12px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <span className="step-tag">Step 02</span>
          </div>
          <div style={{ fontWeight:600, fontSize:12, color:"var(--navy)", marginBottom:8 }}>Select Structure Material</div>
          <select className="sel" value={material} onChange={e => handleMaterial(e.target.value)}>
            {MATERIALS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          {material && (
            <div className="fade-in" style={{
              marginTop:7, padding:"4px 8px", borderRadius:4,
              background:"var(--accent-lt)", border:"1px solid #bfdbfe",
              fontSize:10, color:"var(--accent)", fontFamily:"'DM Mono',monospace",
            }}>
              {MATERIALS.find(m=>m.value===material)?.label}
            </div>
          )}
        </div>

        {/* Step 3 */}
        <div className="card" style={{ padding:"10px 12px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <span className="step-tag">Step 03</span>
          </div>
          <div style={{ fontWeight:600, fontSize:12, color:"var(--navy)", marginBottom:8 }}>Suggest Pre-Fab Products</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <button
              className="btn btn-outline"
              style={{ width:"100%", fontSize:11, justifyContent:"flex-start" }}
              onClick={() => fileRef.current.click()}
            >
              <Icon d={ICONS.db} size={12} />
              {dbFile ? dbFile : "Upload Product Database"}
              <input ref={fileRef} type="file" accept=".csv,.xlsx" style={{ display:"none" }}
                onChange={e => setDbFile(e.target.files[0]?.name || null)} />
            </button>
            <input
              className="inp"
              placeholder="Search or enter product name…"
              value={productQuery}
              onChange={e => setProductQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── ROW 3: Products & Budget ─────────────────────────── */}
      <div className="card" style={{ padding:"10px 14px", flex:"0 0 auto", minHeight: 170 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:12, height:"100%" }}>

          {/* Product list */}
          <div style={{ display:"flex", flexDirection:"column", gap:0, minHeight:0 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:7 }}>
              <div style={{ fontWeight:600, fontSize:12, color:"var(--navy)", display:"flex", alignItems:"center", gap:6 }}>
                <Icon d={ICONS.star} size={12} stroke="var(--accent)" sw={1.8} />
                Product Suggestions
              </div>
              {products && <span style={{ fontSize:10, color:"var(--muted)" }}>{products.length} results</span>}
            </div>

            {!products && (
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--muted)", fontSize:11, gap:6, flexDirection:"column" }}>
                <Icon d={ICONS.layers} size={20} stroke="var(--border)" sw={1.5} />
                <span>Complete analysis to see product matches</span>
              </div>
            )}

            {products && (
              <div className="product-list fade-in">
                {products.map((p, i) => (
                  <div key={p.id} className={`product-row${i===0?" best":""}`}>
                    <div style={{ width:16, textAlign:"center" }}>
                      {i===0
                        ? <Icon d={ICONS.star} size={12} fill="var(--accent)" stroke="var(--accent)" sw={1.5} />
                        : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"var(--muted)" }}>{i+1}</span>
                      }
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:11.5, color:"var(--navy)", display:"flex", alignItems:"center", gap:5 }}>
                        {i===0 && <span style={{ fontSize:9, background:"var(--accent)", color:"#fff", borderRadius:2, padding:"1px 4px", letterSpacing:".04em" }}>BEST</span>}
                        {p.name}
                      </div>
                      <div style={{ fontSize:10, color:"var(--muted)" }}>{p.mfr} · <span className="mono">{p.spec}</span></div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <ScoreBadge score={p.score} />
                      <div style={{ fontSize:10, color:"var(--mid)", marginTop:1 }}>${p.cost}/m</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget card */}
          <div style={{
            display:"flex", flexDirection:"column",
            background: products ? "linear-gradient(140deg,#0f2340 0%,#1e3a5f 100%)" : "var(--surface)",
            border: products ? "none" : "1px solid var(--border)",
            borderRadius: 7,
            padding:"12px 14px",
            color: products ? "#fff" : "var(--muted)",
            boxShadow: products ? "0 4px 14px rgba(15,35,64,.28)" : "none",
            transition:"background .4s, box-shadow .4s",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
              <Icon d={ICONS.budget} size={13} stroke={products ? "#93c5fd" : "var(--border)"} sw={1.6} />
              <span style={{ fontSize:11, fontWeight:600, letterSpacing:".02em", color: products ? "#93c5fd" : "var(--muted)" }}>Estimate Budget</span>
            </div>

            {!products && (
              <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>
                —
              </div>
            )}

            {products && (
              <div className="fade-in" style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  {products.map((p,i) => (
                    <div key={p.id} style={{
                      display:"flex", justifyContent:"space-between",
                      fontSize:10.5, marginBottom:5,
                      color: i===0 ? "#e0f2fe" : "rgba(255,255,255,.6)",
                    }}>
                      <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:110 }}>
                        {i===0 && "★ "}{p.name.split(" ").slice(0,2).join(" ")}
                      </span>
                      <span className="mono">${(p.cost*48).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="divider" style={{ background:"rgba(255,255,255,.15)", margin:"7px 0" }}></div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                    <span style={{ fontSize:10, color:"rgba(255,255,255,.55)", letterSpacing:".04em" }}>TOTAL EST.</span>
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:17, fontWeight:600, color:"#fff" }}>
                      ${Number(totalBudget).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize:9.5, color:"rgba(255,255,255,.4)", marginTop:2 }}>48 m² · best-choice product</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── ROW 4: Actions ──────────────────────────────────── */}
      <div className="divider" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:12, alignItems:"center" }}>
        <button
          className="btn btn-success"
          style={{ width:"100%" }}
          disabled={!prodReady}
          onClick={handleBake}
        >
          {baked
            ? <><Icon d={ICONS.check} size={14} sw={2.5} />Baked to Rhino</>
            : <><Icon d={ICONS.rhino} size={14} sw={2} />Bake to Rhino</>
          }
        </button>
        <button
          className="btn btn-export"
          style={{ width:"100%" }}
          disabled={!prodReady}
        >
          <Icon d={ICONS.csv} size={14} />
          Export CSV
        </button>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);