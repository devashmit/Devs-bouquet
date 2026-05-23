import React from 'react';

/**
 * Premium botanical greenery library.
 * 4 categories, 16 options total.
 * All SVG-drawn in soft watercolor botanical style.
 */

// ── Structural Greenery ──────────────────────────────────────────

export function SilverDollarEucalyptus({ size = 120 }) {
  const leaves = [
    {x:60,y:72,r:0},{x:52,y:58,r:-12},{x:68,y:58,r:12},
    {x:46,y:44,r:-20},{x:74,y:44,r:20},{x:42,y:30,r:-28},
    {x:78,y:30,r:28},{x:60,y:18,r:0},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 100 C60 80 60 60 60 20" stroke="#8aaa88" strokeWidth="1.8" fill="none" opacity="0.7"/>
      {leaves.map((l,i) => (
        <ellipse key={i} cx={l.x} cy={l.y} rx="11" ry="9"
          fill={i%2===0?"#a8c4a0":"#98b890"} opacity="0.82"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {leaves.map((l,i) => (
        <line key={`v${i}`} x1={l.x-6} y1={l.y} x2={l.x+6} y2={l.y}
          stroke="#6a8a68" strokeWidth="0.6" opacity="0.4"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
    </svg>
  );
}

export function SeededEucalyptus({ size = 120 }) {
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 100 C58 78 54 55 48 28" stroke="#7a9a78" strokeWidth="1.8" fill="none" opacity="0.7"/>
      <path d="M60 100 C62 78 66 55 72 28" stroke="#7a9a78" strokeWidth="1.8" fill="none" opacity="0.7"/>
      {[{x:52,y:72},{x:48,y:56},{x:46,y:40},{x:44,y:26}].map((p,i)=>(
        <g key={i}>
          <ellipse cx={p.x} cy={p.y} rx="9" ry="7" fill="#9ab898" opacity="0.8"
            transform={`rotate(${-15-i*5} ${p.x} ${p.y})`}/>
          <circle cx={p.x-4} cy={p.y-3} r="2" fill="#c8d8b8" opacity="0.6"/>
        </g>
      ))}
      {[{x:68,y:72},{x:72,y:56},{x:74,y:40},{x:76,y:26}].map((p,i)=>(
        <g key={i}>
          <ellipse cx={p.x} cy={p.y} rx="9" ry="7" fill="#8aaa88" opacity="0.8"
            transform={`rotate(${15+i*5} ${p.x} ${p.y})`}/>
          <circle cx={p.x+4} cy={p.y-3} r="2" fill="#c8d8b8" opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

export function ItalianRuscus({ size = 120 }) {
  const branches = [
    {sx:60,sy:95,ex:35,ey:20,side:-1},
    {sx:60,sy:95,ex:60,ey:15,side:0},
    {sx:60,sy:95,ex:85,ey:20,side:1},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      {branches.map((b,bi)=>{
        const pts = Array.from({length:5},(_,i)=>{
          const t=(i+1)/6;
          const x=b.sx+(b.ex-b.sx)*t;
          const y=b.sy+(b.ey-b.sy)*t;
          return {x,y};
        });
        return (
          <g key={bi}>
            <path d={`M${b.sx} ${b.sy} Q${(b.sx+b.ex)/2+b.side*10} ${(b.sy+b.ey)/2} ${b.ex} ${b.ey}`}
              stroke="#6a8a58" strokeWidth="1.5" fill="none" opacity="0.7"/>
            {pts.map((p,i)=>(
              <ellipse key={i} cx={p.x} cy={p.y} rx="8" ry="5"
                fill="#7a9a68" opacity="0.78"
                transform={`rotate(${b.side*20+i*5} ${p.x} ${p.y})`}/>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function OliveBranch({ size = 120 }) {
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 98 C55 75 45 52 30 25" stroke="#8a9a70" strokeWidth="1.8" fill="none" opacity="0.7"/>
      <path d="M60 98 C65 75 75 52 90 25" stroke="#8a9a70" strokeWidth="1.8" fill="none" opacity="0.7"/>
      {[{x:48,y:75},{x:40,y:58},{x:34,y:42},{x:30,y:28}].map((p,i)=>(
        <ellipse key={i} cx={p.x} cy={p.y} rx="10" ry="5"
          fill="#9aaa78" opacity="0.8" transform={`rotate(${-30-i*8} ${p.x} ${p.y})`}/>
      ))}
      {[{x:72,y:75},{x:80,y:58},{x:86,y:42},{x:90,y:28}].map((p,i)=>(
        <ellipse key={i} cx={p.x} cy={p.y} rx="10" ry="5"
          fill="#8a9a68" opacity="0.8" transform={`rotate(${30+i*8} ${p.x} ${p.y})`}/>
      ))}
      {[{x:42,y:50},{x:78,y:50},{x:36,y:35},{x:84,y:35}].map((p,i)=>(
        <circle key={`berry${i}`} cx={p.x} cy={p.y} r="2.5"
          fill="#b8c890" opacity="0.65"/>
      ))}
    </svg>
  );
}

// ── Soft Fillers ─────────────────────────────────────────────────

export function BabysBreath({ size = 120 }) {
  const dots = Array.from({length:28},(_,i)=>{
    const a=(i*137.5*Math.PI)/180;
    const r=8+((i*17)%32);
    return {x:60+Math.cos(a)*r, y:50+Math.sin(a)*r*0.7};
  });
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 100 C60 80 58 65 55 45" stroke="#a8b898" strokeWidth="1.4" fill="none" opacity="0.5"/>
      <path d="M60 100 C62 80 64 65 68 45" stroke="#a8b898" strokeWidth="1.4" fill="none" opacity="0.5"/>
      {dots.map((d,i)=>(
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={1.2+(i%3)*0.4} fill="white" opacity="0.9"
            stroke="#d8c8c8" strokeWidth="0.4"/>
          {i%4===0 && <circle cx={d.x} cy={d.y} r="0.6" fill="#f8e8e8" opacity="0.7"/>}
        </g>
      ))}
    </svg>
  );
}

export function WaxFlower({ size = 120 }) {
  const florets = [
    {x:45,y:30},{x:60,y:22},{x:75,y:30},{x:38,y:48},{x:55,y:42},
    {x:70,y:42},{x:82,y:52},{x:42,y:62},{x:65,y:58},{x:78,y:65},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 98 C58 78 52 58 45 35" stroke="#9aaa88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M60 98 C62 78 68 58 75 35" stroke="#9aaa88" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {florets.map((f,i)=>(
        <g key={i}>
          {[0,72,144,216,288].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <ellipse key={pi} cx={f.x+Math.cos(rad)*4} cy={f.y+Math.sin(rad)*4}
              rx="3" ry="4" fill={i%2===0?"#f0c8d8":"#e8b8c8"} opacity="0.85"
              transform={`rotate(${a+90} ${f.x+Math.cos(rad)*4} ${f.y+Math.sin(rad)*4})`}/>;
          })}
          <circle cx={f.x} cy={f.y} r="2" fill="#f8e060" opacity="0.8"/>
        </g>
      ))}
    </svg>
  );
}

export function MistyBlueFiller({ size = 120 }) {
  const clusters = Array.from({length:20},(_,i)=>{
    const a=(i*137.5*Math.PI)/180;
    const r=5+((i*13)%28);
    return {x:60+Math.cos(a)*r, y:48+Math.sin(a)*r*0.75};
  });
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 98 C60 75 58 55 55 30" stroke="#9898b8" strokeWidth="1.4" fill="none" opacity="0.5"/>
      {clusters.map((c,i)=>(
        <g key={i}>
          {[0,120,240].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <circle key={pi} cx={c.x+Math.cos(rad)*3} cy={c.y+Math.sin(rad)*3}
              r="2.2" fill="#b0b0d0" opacity="0.75"/>;
          })}
        </g>
      ))}
    </svg>
  );
}

// ── Texture Elements ─────────────────────────────────────────────

export function FernAccent({ size = 120 }) {
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 100 C60 78 58 55 55 22" stroke="#5a7a48" strokeWidth="1.8" fill="none" opacity="0.7"/>
      {Array.from({length:8},(_,i)=>{
        const y=88-i*9; const x=55-i*0.5;
        return (
          <g key={i}>
            <ellipse cx={x-10} cy={y} rx={7+i*0.3} ry="3.5"
              fill="#6a8a58" opacity="0.8" transform={`rotate(-25 ${x-10} ${y})`}/>
            <ellipse cx={x+10} cy={y} rx={7+i*0.3} ry="3.5"
              fill="#7a9a68" opacity="0.8" transform={`rotate(25 ${x+10} ${y})`}/>
          </g>
        );
      })}
    </svg>
  );
}

export function DustyMiller({ size = 120 }) {
  const leaves = [
    {x:60,y:75,r:0,rx:16,ry:10},{x:42,y:60,r:-35,rx:14,ry:8},
    {x:78,y:60,r:35,rx:14,ry:8},{x:35,y:42,r:-50,rx:12,ry:7},
    {x:85,y:42,r:50,rx:12,ry:7},{x:50,y:28,r:-20,rx:13,ry:8},
    {x:70,y:28,r:20,rx:13,ry:8},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      {leaves.map((l,i)=>(
        <g key={i}>
          <ellipse cx={l.x} cy={l.y} rx={l.rx} ry={l.ry}
            fill="#c8ccc0" opacity="0.75" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
          <ellipse cx={l.x} cy={l.y} rx={l.rx*0.6} ry={l.ry*0.6}
            fill="#d8dcd0" opacity="0.5" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
        </g>
      ))}
    </svg>
  );
}

// ── Editorial Accent Elements ────────────────────────────────────

export function LavenderSprig({ size = 120 }) {
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      {[48,56,64,72,80].map((x,si)=>(
        <g key={si}>
          <path d={`M${x} 98 C${x} 75 ${x+(si-2)*3} 50 ${x+(si-2)*5} 18`}
            stroke="#8878a8" strokeWidth="1.4" fill="none" opacity="0.65"/>
          {Array.from({length:6},(_,i)=>{
            const y=85-i*11; const bx=x+(si-2)*5*(i/6);
            return (
              <g key={i}>
                <ellipse cx={bx-3} cy={y} rx="3" ry="4"
                  fill="#9888b8" opacity="0.8" transform={`rotate(-15 ${bx-3} ${y})`}/>
                <ellipse cx={bx+3} cy={y} rx="3" ry="4"
                  fill="#a898c8" opacity="0.8" transform={`rotate(15 ${bx+3} ${y})`}/>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export function IvyAccent({ size = 120 }) {
  const leaves = [
    {x:55,y:80,r:0},{x:40,y:65,r:-30},{x:70,y:65,r:30},
    {x:32,y:48,r:-50},{x:78,y:48,r:50},{x:45,y:32,r:-20},{x:72,y:32,r:20},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      <path d="M60 100 C58 80 50 60 40 35" stroke="#5a7a48" strokeWidth="1.5" fill="none" opacity="0.6"/>
      <path d="M60 100 C62 80 70 60 80 35" stroke="#5a7a48" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {leaves.map((l,i)=>(
        <g key={i}>
          <path d={`M${l.x} ${l.y} C${l.x-8} ${l.y-12} ${l.x+8} ${l.y-12} ${l.x} ${l.y}Z`}
            fill="#6a8a58" opacity="0.78" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
          <line x1={l.x} y1={l.y} x2={l.x} y2={l.y-10}
            stroke="#4a6a38" strokeWidth="0.7" opacity="0.5"
            transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
        </g>
      ))}
    </svg>
  );
}

export function SalalLeaves({ size = 120 }) {
  const leaves = [
    {x:60,y:78,rx:14,ry:10,r:0},{x:42,y:62,rx:13,ry:9,r:-25},
    {x:78,y:62,rx:13,ry:9,r:25},{x:35,y:44,rx:12,ry:8,r:-40},
    {x:85,y:44,rx:12,ry:8,r:40},{x:50,y:28,rx:13,ry:9,r:-15},
    {x:72,y:28,rx:13,ry:9,r:15},
  ];
  return (
    <svg width={size} height={size*0.85} viewBox="0 0 120 102" fill="none">
      {leaves.map((l,i)=>(
        <g key={i}>
          <ellipse cx={l.x} cy={l.y} rx={l.rx} ry={l.ry}
            fill={i%2===0?"#5a7a48":"#6a8a58"} opacity="0.82"
            transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
          <line x1={l.x-l.rx*0.7} y1={l.y} x2={l.x+l.rx*0.7} y2={l.y}
            stroke="#3a5a30" strokeWidth="0.7" opacity="0.4"
            transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
        </g>
      ))}
    </svg>
  );
}

// ── Catalog export ───────────────────────────────────────────────

export const GREENERY_CATALOG = {
  // Structural
  silver_dollar_eucalyptus: {
    name: 'Silver Dollar Eucalyptus',
    category: 'Structural',
    component: SilverDollarEucalyptus,
  },
  seeded_eucalyptus: {
    name: 'Seeded Eucalyptus',
    category: 'Structural',
    component: SeededEucalyptus,
  },
  italian_ruscus: {
    name: 'Italian Ruscus',
    category: 'Structural',
    component: ItalianRuscus,
  },
  olive_branch: {
    name: 'Olive Branch',
    category: 'Structural',
    component: OliveBranch,
  },
  salal_leaves: {
    name: 'Salal Leaves',
    category: 'Structural',
    component: SalalLeaves,
  },
  // Soft Fillers
  babys_breath: {
    name: "Baby's Breath",
    category: 'Soft Filler',
    component: BabysBreath,
  },
  wax_flower: {
    name: 'Wax Flower',
    category: 'Soft Filler',
    component: WaxFlower,
  },
  misty_blue: {
    name: 'Misty Blue',
    category: 'Soft Filler',
    component: MistyBlueFiller,
  },
  // Texture
  fern_accent: {
    name: 'Fern Accent',
    category: 'Texture',
    component: FernAccent,
  },
  dusty_miller: {
    name: 'Dusty Miller',
    category: 'Texture',
    component: DustyMiller,
  },
  // Editorial Accents
  lavender_sprig: {
    name: 'Lavender Sprig',
    category: 'Accent',
    component: LavenderSprig,
  },
  ivy_accent: {
    name: 'Ivy Accent',
    category: 'Accent',
    component: IvyAccent,
  },
};

export default GREENERY_CATALOG;
