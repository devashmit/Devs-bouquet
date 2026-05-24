import React from 'react';

/**
 * 4 beautiful bouquet greenery styles.
 * Each includes foliage + small accent flowers for a complete bouquet base.
 * Rendered as detailed SVG, transparent background.
 */

// ── Style 1: Romantic — soft eucalyptus + baby's breath + small roses ──
export function RomanticGreenery({ size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main eucalyptus stems */}
      <path d="M200 380 C195 340 185 300 170 260 C155 220 140 180 130 140 C120 100 125 70 140 50" stroke="#7a9a6a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 380 C205 340 215 300 230 260 C245 220 260 180 270 140 C280 100 275 70 260 50" stroke="#8aaa78" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 380 C200 350 198 310 195 270 C192 230 190 190 192 150 C194 110 198 80 200 55" stroke="#6a8a58" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Left branch leaves */}
      {[{x:165,y:250,r:-15},{x:155,y:220,r:-20},{x:148,y:190,r:-25},{x:142,y:162,r:-28},{x:138,y:135,r:-30},{x:136,y:110,r:-25},{x:138,y:85,r:-20},{x:142,y:62,r:-15}].map((l,i)=>(
        <ellipse key={`ll${i}`} cx={l.x} cy={l.y} rx={14-i*0.5} ry={10-i*0.3}
          fill={i%2===0?'#a8c498':'#98b488'} opacity="0.88"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Right branch leaves */}
      {[{x:235,y:250,r:15},{x:245,y:220,r:20},{x:252,y:190,r:25},{x:258,y:162,r:28},{x:262,y:135,r:30},{x:264,y:110,r:25},{x:262,y:85,r:20},{x:258,y:62,r:15}].map((l,i)=>(
        <ellipse key={`rl${i}`} cx={l.x} cy={l.y} rx={14-i*0.5} ry={10-i*0.3}
          fill={i%2===0?'#98b488':'#a8c498'} opacity="0.88"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Center leaves */}
      {[{x:193,y:260,r:-5},{x:197,y:230,r:3},{x:194,y:200,r:-4},{x:196,y:170,r:5},{x:194,y:140,r:-3},{x:197,y:112,r:4},{x:195,y:85,r:-2},{x:198,y:62,r:3}].map((l,i)=>(
        <ellipse key={`cl${i}`} cx={l.x} cy={l.y} rx={12-i*0.4} ry={9-i*0.3}
          fill={i%2===0?'#b8c8a8':'#a8b898'} opacity="0.82"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Baby's breath clusters */}
      {[{x:120,y:160},{x:108,y:130},{x:115,y:100},{x:280,y:155},{x:292,y:125},{x:285,y:95},{x:175,y:75},{x:200,y:60},{x:225,y:72}].map((p,i)=>(
        <g key={`bb${i}`}>
          {[0,120,240].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <circle key={pi} cx={p.x+Math.cos(rad)*5} cy={p.y+Math.sin(rad)*5} r="2.5" fill="white" stroke="#e8d0d8" strokeWidth="0.5" opacity="0.9"/>;
          })}
          <circle cx={p.x} cy={p.y} r="1.5" fill="#f8e8e8" opacity="0.7"/>
        </g>
      ))}
      {/* Small accent roses */}
      {[{x:105,y:175,c:'#f4b8c8'},{x:295,y:170,c:'#f0a8b8'},{x:165,y:55,c:'#f8c8d8'},{x:235,y:52,c:'#f4b0c0'}].map((r,i)=>(
        <g key={`sr${i}`}>
          {[0,60,120,180,240,300].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <ellipse key={pi} cx={r.x+Math.cos(rad)*7} cy={r.y+Math.sin(rad)*7} rx="5" ry="7"
              fill={r.c} opacity="0.85"
              transform={`rotate(${a+90} ${r.x+Math.cos(rad)*7} ${r.y+Math.sin(rad)*7})`}/>;
          })}
          <circle cx={r.x} cy={r.y} r="4" fill={r.c} opacity="0.9"/>
          <circle cx={r.x-1} cy={r.y-1} r="2" fill="rgba(255,255,255,0.5)"/>
        </g>
      ))}
    </svg>
  );
}

// ── Style 2: Garden — lush mixed foliage + wax flowers + lavender ──
export function GardenGreenery({ size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fern fronds */}
      <path d="M200 385 C195 355 185 320 172 285 C159 250 145 215 135 180 C125 145 128 115 145 90" stroke="#5a7a48" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 385 C205 355 215 320 228 285 C241 250 255 215 265 180 C275 145 272 115 255 90" stroke="#6a8a58" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Fern pinnae left */}
      {[{y:280,x:168},{y:252,x:160},{y:224,x:152},{y:196,x:146},{y:168,x:142},{y:142,x:140},{y:118,x:142},{y:96,x:147}].map((p,i)=>(
        <g key={`fl${i}`}>
          <path d={`M${p.x} ${p.y} C${p.x-18} ${p.y-5} ${p.x-28} ${p.y+2} ${p.x-22} ${p.y+8}`}
            stroke="#5a7a48" strokeWidth="1.2" fill="none"/>
          <ellipse cx={p.x-16} cy={p.y+1} rx={10-i*0.5} ry={5-i*0.2}
            fill={i%2===0?'#6a8a58':'#7a9a68'} opacity="0.82"
            transform={`rotate(-20 ${p.x-16} ${p.y+1})`}/>
          <path d={`M${p.x} ${p.y} C${p.x+18} ${p.y-5} ${p.x+28} ${p.y+2} ${p.x+22} ${p.y+8}`}
            stroke="#5a7a48" strokeWidth="1.2" fill="none"/>
          <ellipse cx={p.x+16} cy={p.y+1} rx={10-i*0.5} ry={5-i*0.2}
            fill={i%2===0?'#7a9a68':'#6a8a58'} opacity="0.82"
            transform={`rotate(20 ${p.x+16} ${p.y+1})`}/>
        </g>
      ))}
      {/* Salal leaves */}
      {[{x:115,y:200,r:-40,rx:18,ry:13},{x:285,y:200,r:40,rx:18,ry:13},{x:108,y:155,r:-55,rx:16,ry:11},{x:292,y:155,r:55,rx:16,ry:11},{x:120,y:115,r:-35,rx:15,ry:10},{x:280,y:115,r:35,rx:15,ry:10}].map((l,i)=>(
        <g key={`sl${i}`}>
          <ellipse cx={l.x} cy={l.y} rx={l.rx} ry={l.ry} fill={i%2===0?'#5a7a48':'#6a8a58'} opacity="0.85" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
          <line x1={l.x-l.rx*0.7} y1={l.y} x2={l.x+l.rx*0.7} y2={l.y} stroke="#3a5a30" strokeWidth="0.8" opacity="0.4" transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
        </g>
      ))}
      {/* Wax flowers */}
      {[{x:100,y:230},{x:300,y:225},{x:155,y:78},{x:245,y:75},{x:200,y:65}].map((p,i)=>(
        <g key={`wf${i}`}>
          {[0,72,144,216,288].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <ellipse key={pi} cx={p.x+Math.cos(rad)*6} cy={p.y+Math.sin(rad)*6} rx="4" ry="6"
              fill={i%2===0?'#f0b8c8':'#e8a8b8'} opacity="0.88"
              transform={`rotate(${a+90} ${p.x+Math.cos(rad)*6} ${p.y+Math.sin(rad)*6})`}/>;
          })}
          <circle cx={p.x} cy={p.y} r="3" fill="#f8e060" opacity="0.85"/>
        </g>
      ))}
      {/* Lavender spikes */}
      {[{x:130,y:100},{x:270,y:98},{x:175,y:60},{x:225,y:58}].map((p,i)=>(
        <g key={`lv${i}`}>
          <line x1={p.x} y1={p.y+20} x2={p.x} y2={p.y-15} stroke="#8878a0" strokeWidth="1.5"/>
          {[-3,0,3,-3,0,3].map((dx,pi)=>(
            <ellipse key={pi} cx={p.x+dx} cy={p.y+pi*5-10} rx="2.5" ry="3.5"
              fill={pi%2===0?'#9888b8':'#a898c8'} opacity="0.85"
              transform={`rotate(${dx*5} ${p.x+dx} ${p.y+pi*5-10})`}/>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ── Style 3: Wildflower — olive branches + daisy fillers + misty blue ──
export function WildflowerGreenery({ size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Olive branches */}
      <path d="M200 385 C192 350 178 310 162 272 C146 234 132 196 128 158 C124 120 132 90 148 68" stroke="#8a9a70" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 385 C208 350 222 310 238 272 C254 234 268 196 272 158 C276 120 268 90 252 68" stroke="#9aaa80" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 385 C200 355 200 320 200 282 C200 244 200 206 200 168 C200 130 200 100 200 72" stroke="#7a8a60" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Olive leaves */}
      {[{x:158,y:265,r:-18},{x:168,y:238,r:-22},{x:152,y:210,r:-28},{x:144,y:182,r:-32},{x:140,y:155,r:-30},{x:142,y:128,r:-25},{x:148,y:102,r:-20},{x:152,y:78,r:-15}].map((l,i)=>(
        <ellipse key={`ol${i}`} cx={l.x} cy={l.y} rx={5} ry={11-i*0.3}
          fill={i%2===0?'#9aaa80':'#8a9a70'} opacity="0.85"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {[{x:242,y:265,r:18},{x:232,y:238,r:22},{x:248,y:210,r:28},{x:256,y:182,r:32},{x:260,y:155,r:30},{x:258,y:128,r:25},{x:252,y:102,r:20},{x:248,y:78,r:15}].map((l,i)=>(
        <ellipse key={`or${i}`} cx={l.x} cy={l.y} rx={5} ry={11-i*0.3}
          fill={i%2===0?'#8a9a70':'#9aaa80'} opacity="0.85"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* Olive berries */}
      {[{x:145,y:148},{x:262,y:145},{x:140,y:118},{x:260,y:115},{x:148,y:88},{x:252,y:85}].map((p,i)=>(
        <circle key={`ob${i}`} cx={p.x} cy={p.y} r="3" fill="#b8c890" opacity="0.7"/>
      ))}
      {/* Small daisy fillers */}
      {[{x:108,y:185},{x:292,y:180},{x:115,y:140},{x:285,y:138},{x:170,y:62},{x:230,y:60},{x:200,y:55}].map((p,i)=>(
        <g key={`df${i}`}>
          {Array.from({length:10},(_,pi)=>{
            const a=(pi*36*Math.PI)/180;
            return <ellipse key={pi} cx={p.x+Math.cos(a)*7} cy={p.y+Math.sin(a)*7} rx="3" ry="6"
              fill="white" stroke="#e8e0d0" strokeWidth="0.4" opacity="0.9"
              transform={`rotate(${pi*36+90} ${p.x+Math.cos(a)*7} ${p.y+Math.sin(a)*7})`}/>;
          })}
          <circle cx={p.x} cy={p.y} r="4" fill="#f0c030" opacity="0.9"/>
        </g>
      ))}
      {/* Misty blue clusters */}
      {[{x:125,y:220},{x:275,y:215},{x:160,y:80},{x:240,y:78}].map((p,i)=>(
        <g key={`mb${i}`}>
          {Array.from({length:8},(_,pi)=>{
            const a=(pi*45*Math.PI)/180;
            const r=4+pi%3*2;
            return <circle key={pi} cx={p.x+Math.cos(a)*r} cy={p.y+Math.sin(a)*r} r="2.2" fill="#a8a8c8" opacity="0.75"/>;
          })}
        </g>
      ))}
    </svg>
  );
}

// ── Style 4: Elegant — silver eucalyptus + ruscus + white wax flowers ──
export function ElegantGreenery({ size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Silver dollar eucalyptus stems */}
      <path d="M200 385 C196 355 190 320 182 285 C174 250 164 215 158 180 C152 145 155 115 165 88" stroke="#8aaa88" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 385 C204 355 210 320 218 285 C226 250 236 215 242 180 C248 145 245 115 235 88" stroke="#9aba98" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M200 385 C200 358 200 325 200 290 C200 255 200 220 200 185 C200 150 200 118 200 88" stroke="#7a9a78" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Silver dollar round leaves — left */}
      {[{y:275,x:175},{y:248,x:168},{y:222,x:162},{y:196,x:158},{y:170,x:156},{y:145,x:158},{y:122,x:162},{y:100,x:168}].map((p,i)=>(
        <g key={`sdl${i}`}>
          <circle cx={p.x-14} cy={p.y} r={12-i*0.5} fill={i%2===0?'#a8c4a0':'#98b490'} opacity="0.85"/>
          <line x1={p.x-14} y1={p.y-8} x2={p.x-14} y2={p.y+8} stroke="#6a8a68" strokeWidth="0.7" opacity="0.5"/>
        </g>
      ))}
      {/* Silver dollar round leaves — right */}
      {[{y:275,x:225},{y:248,x:232},{y:222,x:238},{y:196,x:242},{y:170,x:244},{y:145,x:242},{y:122,x:238},{y:100,x:232}].map((p,i)=>(
        <g key={`sdr${i}`}>
          <circle cx={p.x+14} cy={p.y} r={12-i*0.5} fill={i%2===0?'#98b490':'#a8c4a0'} opacity="0.85"/>
          <line x1={p.x+14} y1={p.y-8} x2={p.x+14} y2={p.y+8} stroke="#6a8a68" strokeWidth="0.7" opacity="0.5"/>
        </g>
      ))}
      {/* Ruscus pointed leaves */}
      {[{x:110,y:200,r:-40},{x:290,y:198,r:40},{x:105,y:158,r:-50},{x:295,y:156,r:50},{x:115,y:118,r:-38},{x:285,y:116,r:38}].map((l,i)=>(
        <ellipse key={`ru${i}`} cx={l.x} cy={l.y} rx="8" ry="13"
          fill={i%2===0?'#4a7a38':'#5a8a48'} opacity="0.88"
          transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
      ))}
      {/* White wax flowers */}
      {[{x:100,y:228},{x:300,y:224},{x:148,y:72},{x:252,y:70},{x:200,y:62},{x:168,y:88},{x:232,y:86}].map((p,i)=>(
        <g key={`ww${i}`}>
          {[0,72,144,216,288].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <ellipse key={pi} cx={p.x+Math.cos(rad)*6} cy={p.y+Math.sin(rad)*6} rx="4" ry="6"
              fill="white" stroke="#e0d8d0" strokeWidth="0.5" opacity="0.92"
              transform={`rotate(${a+90} ${p.x+Math.cos(rad)*6} ${p.y+Math.sin(rad)*6})`}/>;
          })}
          <circle cx={p.x} cy={p.y} r="3" fill="#f8e8a0" opacity="0.85"/>
        </g>
      ))}
      {/* Baby's breath accent */}
      {[{x:122,y:175},{x:278,y:172},{x:130,y:135},{x:270,y:132}].map((p,i)=>(
        <g key={`ba${i}`}>
          {[0,60,120,180,240,300].map((a,pi)=>{
            const rad=(a*Math.PI)/180;
            return <circle key={pi} cx={p.x+Math.cos(rad)*6} cy={p.y+Math.sin(rad)*6} r="2" fill="white" stroke="#e8d8d8" strokeWidth="0.4" opacity="0.88"/>;
          })}
        </g>
      ))}
    </svg>
  );
}

// ── Catalog ──────────────────────────────────────────────────────────────

export const GREENERY_CATALOG = {
  romantic: {
    name: 'Romantic',
    description: 'Soft eucalyptus with baby\'s breath & pink roses',
    component: RomanticGreenery,
  },
  garden: {
    name: 'Garden',
    description: 'Lush ferns with wax flowers & lavender',
    component: GardenGreenery,
  },
  wildflower: {
    name: 'Wildflower',
    description: 'Olive branches with daisies & misty blue',
    component: WildflowerGreenery,
  },
  elegant: {
    name: 'Elegant',
    description: 'Silver eucalyptus with white wax flowers',
    component: ElegantGreenery,
  },
};

export default GREENERY_CATALOG;
