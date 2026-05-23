import React from 'react';

/**
 * Realistic botanical greenery — proper leaf shapes, natural branching.
 * Each component is a 100×120 viewBox SVG illustration.
 */

// Silver Dollar Eucalyptus — round paired leaves on arching stem
export function SilverDollarEucalyptus({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      {/* Main stem — gentle S-curve */}
      <path d="M50 118 C50 95 48 75 44 55 C40 35 42 18 50 8"
        stroke="#7a9a6a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Paired round leaves — bottom to top, alternating sides */}
      {[
        {y:95, lx:38, rx:62, r:12},
        {y:80, lx:36, rx:64, r:11},
        {y:65, lx:35, rx:65, r:10},
        {y:50, lx:36, rx:63, r:9},
        {y:36, lx:38, rx:61, r:8},
        {y:23, lx:40, rx:58, r:7},
        {y:12, lx:43, rx:55, r:6},
      ].map((l, i) => (
        <g key={i}>
          <circle cx={l.lx} cy={l.y} r={l.r}
            fill={i%2===0 ? '#a8c498' : '#98b888'} opacity="0.88"/>
          <circle cx={l.rx} cy={l.y} r={l.r}
            fill={i%2===0 ? '#98b888' : '#a8c498'} opacity="0.88"/>
          {/* Leaf center vein */}
          <line x1={l.lx} y1={l.y-l.r*0.6} x2={l.lx} y2={l.y+l.r*0.6}
            stroke="#6a8a58" strokeWidth="0.6" opacity="0.5"/>
          <line x1={l.rx} y1={l.y-l.r*0.6} x2={l.rx} y2={l.y+l.r*0.6}
            stroke="#6a8a58" strokeWidth="0.6" opacity="0.5"/>
        </g>
      ))}
    </svg>
  );
}

// Seeded Eucalyptus — elongated oval leaves with seed pods
export function SeededEucalyptus({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 90 46 65 42 40 C38 20 44 10 52 5"
        stroke="#7a9a6a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M50 118 C52 90 56 65 60 40 C64 20 58 10 52 5"
        stroke="#8aaa78" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7"/>
      {[
        {x:42,y:95,rx:7,ry:12,r:-20},{x:58,y:88,rx:7,ry:12,r:20},
        {x:40,y:72,rx:6,ry:11,r:-25},{x:60,y:65,rx:6,ry:11,r:25},
        {x:39,y:50,rx:6,ry:10,r:-28},{x:61,y:44,rx:6,ry:10,r:28},
        {x:40,y:30,rx:5,ry:9,r:-22},{x:60,y:24,rx:5,ry:9,r:22},
        {x:44,y:14,rx:4,ry:7,r:-15},{x:57,y:10,rx:4,ry:7,r:15},
      ].map((l,i) => (
        <g key={i}>
          <ellipse cx={l.x} cy={l.y} rx={l.rx} ry={l.ry}
            fill={i%3===0?'#8aaa78':i%3===1?'#9aba88':'#7a9a68'} opacity="0.85"
            transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
          {/* Seed pod */}
          {i%2===0 && <circle cx={l.x} cy={l.y-l.ry*0.5} r="2"
            fill="#b8c8a0" opacity="0.7"/>}
        </g>
      ))}
    </svg>
  );
}

// Italian Ruscus — glossy pointed oval leaves on arching branches
export function ItalianRuscus({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      {/* Three arching branches */}
      <path d="M50 115 C48 90 38 65 22 40" stroke="#5a7a48" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M50 115 C50 88 50 62 50 30" stroke="#5a7a48" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M50 115 C52 90 62 65 78 40" stroke="#5a7a48" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {/* Left branch leaves */}
      {[{x:42,y:95},{x:36,y:78},{x:30,y:62},{x:26,y:48},{x:23,y:36}].map((p,i)=>(
        <ellipse key={`l${i}`} cx={p.x} cy={p.y} rx="7" ry="11"
          fill={i%2===0?'#5a8a48':'#6a9a58'} opacity="0.88"
          transform={`rotate(${-30-i*5} ${p.x} ${p.y})`}/>
      ))}
      {/* Center branch leaves */}
      {[{x:50,y:95},{x:50,y:78},{x:50,y:62},{x:50,y:46},{x:50,y:32}].map((p,i)=>(
        <ellipse key={`c${i}`} cx={p.x} cy={p.y} rx="7" ry="11"
          fill={i%2===0?'#4a7a38':'#5a8a48'} opacity="0.85"
          transform={`rotate(${i%2===0?-8:8} ${p.x} ${p.y})`}/>
      ))}
      {/* Right branch leaves */}
      {[{x:58,y:95},{x:64,y:78},{x:70,y:62},{x:74,y:48},{x:77,y:36}].map((p,i)=>(
        <ellipse key={`r${i}`} cx={p.x} cy={p.y} rx="7" ry="11"
          fill={i%2===0?'#5a8a48':'#6a9a58'} opacity="0.88"
          transform={`rotate(${30+i*5} ${p.x} ${p.y})`}/>
      ))}
    </svg>
  );
}

// Olive Branch — narrow elongated silver-green leaves
export function OliveBranch({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 95 46 72 40 48 C34 28 38 14 48 6"
        stroke="#8a9a70" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M50 118 C52 95 56 72 62 48 C68 28 62 14 52 6"
        stroke="#8a9a70" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7"/>
      {[
        {x:44,y:100,r:-15},{x:56,y:94,r:15},
        {x:42,y:82,r:-22},{x:58,y:76,r:22},
        {x:40,y:64,r:-28},{x:60,y:58,r:28},
        {x:39,y:46,r:-32},{x:61,y:40,r:32},
        {x:40,y:30,r:-25},{x:60,y:24,r:25},
        {x:43,y:16,r:-18},{x:57,y:11,r:18},
      ].map((l,i)=>(
        <ellipse key={i} cx={l.x} cy={l.y} rx="4" ry="10"
          fill={i%2===0?'#9aaa80':'#8a9a70'} opacity="0.85"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Small olive berries */}
      {[{x:42,y:55},{x:60,y:42},{x:44,y:28}].map((p,i)=>(
        <circle key={`b${i}`} cx={p.x} cy={p.y} r="2.5"
          fill="#b8c890" opacity="0.7"/>
      ))}
    </svg>
  );
}

// Baby's Breath — tiny white cloud-like clusters on thin stems
export function BabysBreath({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      {/* Branching stems */}
      <path d="M50 118 C50 100 48 85 45 70" stroke="#a8b898" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M45 70 C40 58 32 48 24 38" stroke="#a8b898" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M45 70 C44 58 44 46 44 34" stroke="#a8b898" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M45 70 C48 58 54 46 62 36" stroke="#a8b898" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M24 38 C20 30 16 22 14 14" stroke="#a8b898" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M44 34 C42 26 40 18 38 10" stroke="#a8b898" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M62 36 C66 28 70 20 72 12" stroke="#a8b898" strokeWidth="1" fill="none" strokeLinecap="round"/>
      {/* Tiny flower clusters */}
      {[
        {x:14,y:12},{x:16,y:8},{x:12,y:8},{x:18,y:10},
        {x:38,y:8},{x:40,y:5},{x:36,y:6},{x:42,y:8},
        {x:72,y:10},{x:74,y:7},{x:70,y:7},{x:76,y:11},
        {x:24,y:36},{x:44,y:32},{x:62,y:34},
        {x:22,y:32},{x:26,y:34},{x:42,y:28},{x:46,y:30},
      ].map((p,i)=>(
        <circle key={i} cx={p.x} cy={p.y} r={i<12?1.8:1.4}
          fill="white" stroke="#e8d8d8" strokeWidth="0.5" opacity="0.95"/>
      ))}
    </svg>
  );
}

// Wax Flower — small star-shaped pink flowers on woody stems
export function WaxFlower({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 98 48 80 44 62" stroke="#8a9a78" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M44 62 C38 50 28 40 18 28" stroke="#8a9a78" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M44 62 C44 50 44 38 44 24" stroke="#8a9a78" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M44 62 C50 50 58 40 68 28" stroke="#8a9a78" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      {/* Small leaves along stems */}
      {[{x:46,y:90,r:10},{x:42,y:75,r:-10},{x:30,y:50,r:-30},{x:44,y:45,r:5},{x:58,y:48,r:30}].map((l,i)=>(
        <ellipse key={`lf${i}`} cx={l.x} cy={l.y} rx="4" ry="7"
          fill="#9aaa80" opacity="0.75" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Star flowers */}
      {[{x:18,y:26},{x:22,y:20},{x:14,y:20},{x:44,y:22},{x:48,y:16},{x:40,y:16},{x:68,y:26},{x:72,y:20},{x:64,y:20}].map((p,i)=>(
        <g key={`f${i}`}>
          {[0,72,144,216,288].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <ellipse key={pi} cx={p.x+Math.cos(rad)*3.5} cy={p.y+Math.sin(rad)*3.5}
              rx="2.2" ry="3.5" fill={i%3===0?'#f0b8c8':i%3===1?'#e8a8b8':'#f8c8d8'} opacity="0.9"
              transform={`rotate(${a+90} ${p.x+Math.cos(rad)*3.5} ${p.y+Math.sin(rad)*3.5})`}/>;
          })}
          <circle cx={p.x} cy={p.y} r="1.8" fill="#f8e060" opacity="0.85"/>
        </g>
      ))}
    </svg>
  );
}

// Fern — classic pinnate frond with paired leaflets
export function FernAccent({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      {/* Central rachis */}
      <path d="M50 118 C50 95 50 70 50 20" stroke="#4a6a38" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Paired pinnae — bottom to top, getting smaller */}
      {[
        {y:105,lw:18,rw:18},{y:92,lw:16,rw:16},{y:79,lw:15,rw:15},
        {y:66,lw:13,rw:13},{y:54,lw:11,rw:11},{y:43,lw:9,rw:9},
        {y:33,lw:7,rw:7},{y:24,lw:5,rw:5},
      ].map((p,i)=>(
        <g key={i}>
          {/* Left pinna */}
          <path d={`M50 ${p.y} C${50-p.lw*0.4} ${p.y-4} ${50-p.lw} ${p.y-2} ${50-p.lw} ${p.y+3}`}
            stroke="#5a7a48" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <ellipse cx={50-p.lw*0.7} cy={p.y} rx={p.lw*0.35} ry={p.lw*0.22}
            fill={i%2===0?'#6a8a58':'#5a7a48'} opacity="0.85"
            transform={`rotate(-20 ${50-p.lw*0.7} ${p.y})`}/>
          {/* Right pinna */}
          <path d={`M50 ${p.y} C${50+p.rw*0.4} ${p.y-4} ${50+p.rw} ${p.y-2} ${50+p.rw} ${p.y+3}`}
            stroke="#5a7a48" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <ellipse cx={50+p.rw*0.7} cy={p.y} rx={p.rw*0.35} ry={p.rw*0.22}
            fill={i%2===0?'#5a7a48':'#6a8a58'} opacity="0.85"
            transform={`rotate(20 ${50+p.rw*0.7} ${p.y})`}/>
        </g>
      ))}
    </svg>
  );
}

// Dusty Miller — silvery lobed leaves
export function DustyMiller({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 98 50 78 50 55" stroke="#a0a890" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      {[
        {cx:50,cy:55,r:0},{cx:34,cy:62,r:-35},{cx:66,cy:62,r:35},
        {cx:28,cy:45,r:-55},{cx:72,cy:45,r:55},{cx:38,cy:32,r:-25},
        {cx:62,cy:32,r:25},{cx:50,cy:22,r:0},
      ].map((l,i)=>(
        <g key={i}>
          <path d={`M${l.cx} ${l.cy} C${l.cx-10} ${l.cy-8} ${l.cx-14} ${l.cy-16} ${l.cx-8} ${l.cy-20} C${l.cx-2} ${l.cy-24} ${l.cx+4} ${l.cy-20} ${l.cx+8} ${l.cy-14} C${l.cx+12} ${l.cy-8} ${l.cx+8} ${l.cy-2} ${l.cx} ${l.cy}Z`}
            fill={i%2===0?'#c8ccc0':'#b8bca8'} opacity="0.82"
            transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
        </g>
      ))}
    </svg>
  );
}

// Lavender Sprig — purple flower spikes on grey-green stems
export function LavenderSprig({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      {[30,42,50,58,70].map((x,si)=>{
        const lean = (x-50)*0.3;
        return (
          <g key={si}>
            <path d={`M${x} 118 C${x+lean*0.3} 95 ${x+lean*0.6} 72 ${x+lean} 45`}
              stroke="#8878a0" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
            {/* Tiny leaf pairs */}
            {[100,85,70].map((y,li)=>(
              <g key={li}>
                <ellipse cx={x+lean*(y-118)/(-73)-5} cy={y} rx="4" ry="6"
                  fill="#9a9a80" opacity="0.7" transform={`rotate(-25 ${x-5} ${y})`}/>
                <ellipse cx={x+lean*(y-118)/(-73)+5} cy={y} rx="4" ry="6"
                  fill="#9a9a80" opacity="0.7" transform={`rotate(25 ${x+5} ${y})`}/>
              </g>
            ))}
            {/* Flower spike */}
            {[45,52,59,66,73,80].map((y,fi)=>(
              <g key={fi}>
                <ellipse cx={x+lean*(y-118)/(-73)-3} cy={y} rx="2.5" ry="3.5"
                  fill={fi<3?'#9888b8':'#b0a0d0'} opacity="0.88"
                  transform={`rotate(-15 ${x-3} ${y})`}/>
                <ellipse cx={x+lean*(y-118)/(-73)+3} cy={y} rx="2.5" ry="3.5"
                  fill={fi<3?'#a898c8':'#c0b0e0'} opacity="0.88"
                  transform={`rotate(15 ${x+3} ${y})`}/>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// Salal Leaves — large rounded glossy leaves
export function SalalLeaves({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 95 48 75 45 55" stroke="#5a7a48" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M45 55 C38 42 28 32 18 22" stroke="#5a7a48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M45 55 C46 42 48 30 50 18" stroke="#5a7a48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M45 55 C52 42 62 32 72 22" stroke="#5a7a48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {[
        {cx:18,cy:20,rx:14,ry:11,r:-20},{cx:50,cy:16,rx:13,ry:10,r:0},{cx:72,cy:20,rx:14,ry:11,r:20},
        {cx:28,cy:40,rx:12,ry:9,r:-30},{cx:62,cy:40,rx:12,ry:9,r:30},
        {cx:44,cy:72,rx:13,ry:10,r:-10},{cx:56,cy:85,rx:12,ry:9,r:10},
        {cx:50,cy:100,rx:14,ry:10,r:0},
      ].map((l,i)=>(
        <g key={i}>
          <ellipse cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
            fill={i%2===0?'#5a7a48':'#6a8a58'} opacity="0.85"
            transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
          <line x1={l.cx-l.rx*0.7} y1={l.cy} x2={l.cx+l.rx*0.7} y2={l.cy}
            stroke="#3a5a30" strokeWidth="0.8" opacity="0.4"
            transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
        </g>
      ))}
    </svg>
  );
}

// Ivy Accent — heart-shaped lobed leaves on trailing vine
export function IvyAccent({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C52 100 56 82 62 64 C68 46 72 30 68 16"
        stroke="#5a7a40" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M50 118 C48 100 44 82 38 64 C32 46 28 30 32 16"
        stroke="#5a7a40" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.7"/>
      {[
        {cx:62,cy:100,r:15},{cx:38,cy:95,r:-15},{cx:66,cy:78,r:25},
        {cx:34,cy:72,r:-25},{cx:68,cy:56,r:30},{cx:32,cy:50,r:-30},
        {cx:66,cy:36,r:20},{cx:34,cy:30,r:-20},{cx:64,cy:20,r:10},{cx:36,cy:18,r:-10},
      ].map((l,i)=>(
        <path key={i}
          d={`M${l.cx} ${l.cy+8} C${l.cx-10} ${l.cy+4} ${l.cx-12} ${l.cy-4} ${l.cx-6} ${l.cy-10} C${l.cx} ${l.cy-14} ${l.cx+6} ${l.cy-10} ${l.cx+12} ${l.cy-4} C${l.cx+14} ${l.cy+4} ${l.cx+8} ${l.cy+8} ${l.cx} ${l.cy+8}Z`}
          fill={i%2===0?'#5a7a40':'#6a8a50'} opacity="0.85"
          transform={`rotate(${l.r} ${l.cx} ${l.cy})`}/>
      ))}
    </svg>
  );
}

// Misty Blue Filler
export function MistyBlueFiller({ size = 100 }) {
  return (
    <svg width={size} height={size*1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 118 C50 98 48 78 44 58" stroke="#9898b0" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M44 58 C38 46 28 36 18 24" stroke="#9898b0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M44 58 C44 46 44 34 44 20" stroke="#9898b0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M44 58 C50 46 58 36 66 24" stroke="#9898b0" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {[
        {x:18,y:22},{x:14,y:18},{x:22,y:18},{x:18,y:14},
        {x:44,y:18},{x:40,y:14},{x:48,y:14},{x:44,y:10},
        {x:66,y:22},{x:62,y:18},{x:70,y:18},{x:66,y:14},
        {x:30,y:40},{x:44,y:38},{x:58,y:40},
      ].map((p,i)=>(
        <g key={i}>
          {[0,120,240].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <circle key={pi} cx={p.x+Math.cos(rad)*2.5} cy={p.y+Math.sin(rad)*2.5}
              r="2" fill="#a8a8c8" opacity="0.78"/>;
          })}
          <circle cx={p.x} cy={p.y} r="1.2" fill="#c8c8e0" opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

// ── Catalog ──────────────────────────────────────────────────────

export const GREENERY_CATALOG = {
  silver_dollar_eucalyptus: { name: 'Silver Dollar Eucalyptus', category: 'Structural', component: SilverDollarEucalyptus },
  seeded_eucalyptus:        { name: 'Seeded Eucalyptus',        category: 'Structural', component: SeededEucalyptus },
  italian_ruscus:           { name: 'Italian Ruscus',           category: 'Structural', component: ItalianRuscus },
  olive_branch:             { name: 'Olive Branch',             category: 'Structural', component: OliveBranch },
  salal_leaves:             { name: 'Salal Leaves',             category: 'Structural', component: SalalLeaves },
  babys_breath:             { name: "Baby's Breath",            category: 'Soft Filler', component: BabysBreath },
  wax_flower:               { name: 'Wax Flower',               category: 'Soft Filler', component: WaxFlower },
  misty_blue:               { name: 'Misty Blue',               category: 'Soft Filler', component: MistyBlueFiller },
  fern_accent:              { name: 'Fern Accent',              category: 'Texture',    component: FernAccent },
  dusty_miller:             { name: 'Dusty Miller',             category: 'Texture',    component: DustyMiller },
  lavender_sprig:           { name: 'Lavender Sprig',           category: 'Accent',     component: LavenderSprig },
  ivy_accent:               { name: 'Ivy Accent',               category: 'Accent',     component: IvyAccent },
};

export default GREENERY_CATALOG;
