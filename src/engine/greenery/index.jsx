import React from 'react';

/**
 * Greenery components — 4 styles, SVG-drawn, transparent background.
 * Each renders a cluster of leaves/foliage for the bouquet base.
 */

export function LeafyGreenery({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none">
      {/* Main fern fronds */}
      <path d="M60 80 C55 60 40 45 30 30 C38 35 48 42 55 55 C50 40 42 25 38 12 C46 22 54 38 58 55 C56 38 52 22 55 10 C60 25 62 42 62 58 C64 42 66 25 65 10 C68 22 64 38 62 55 C66 42 72 25 82 12 C78 25 70 40 65 55 C72 42 82 35 90 30 C80 45 65 60 60 80Z" fill="#5a8a3a" opacity="0.9"/>
      {/* Small leaves */}
      <ellipse cx="45" cy="38" rx="8" ry="5" fill="#6a9a48" opacity="0.8" transform="rotate(-30 45 38)"/>
      <ellipse cx="75" cy="38" rx="8" ry="5" fill="#6a9a48" opacity="0.8" transform="rotate(30 75 38)"/>
      <ellipse cx="38" cy="55" rx="7" ry="4" fill="#5a8a3a" opacity="0.75" transform="rotate(-45 38 55)"/>
      <ellipse cx="82" cy="55" rx="7" ry="4" fill="#5a8a3a" opacity="0.75" transform="rotate(45 82 55)"/>
      {/* Baby's breath dots */}
      {[{x:50,y:25},{x:65,y:20},{x:72,y:32},{x:48,y:32},{x:60,y:15}].map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" opacity="0.85"/>
      ))}
    </svg>
  );
}

export function FernGreenery({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none">
      {/* Central stem */}
      <path d="M60 82 C60 60 58 40 55 20" stroke="#4a7a30" strokeWidth="2" fill="none"/>
      {/* Left leaflets */}
      {[70,58,46,34,24].map((y, i) => (
        <ellipse key={`l${i}`} cx={55 - (5-i)*2} cy={y} rx={8+i} ry="4"
          fill="#5a8a3a" opacity="0.85"
          transform={`rotate(${-30 - i*5} ${55 - (5-i)*2} ${y})`}/>
      ))}
      {/* Right leaflets */}
      {[65,53,41,31,22].map((y, i) => (
        <ellipse key={`r${i}`} cx={65 + (5-i)*2} cy={y} rx={7+i} ry="4"
          fill="#6a9a48" opacity="0.85"
          transform={`rotate(${30 + i*5} ${65 + (5-i)*2} ${y})`}/>
      ))}
      {/* Second frond left */}
      <path d="M45 78 C42 60 35 42 28 25" stroke="#4a7a30" strokeWidth="1.5" fill="none" opacity="0.7"/>
      {[65,52,40,30].map((y, i) => (
        <ellipse key={`ll${i}`} cx={40 - i*2} cy={y} rx={6+i} ry="3.5"
          fill="#5a8a3a" opacity="0.7"
          transform={`rotate(${-35 - i*4} ${40 - i*2} ${y})`}/>
      ))}
      {/* Second frond right */}
      <path d="M75 78 C78 60 85 42 92 25" stroke="#4a7a30" strokeWidth="1.5" fill="none" opacity="0.7"/>
      {[65,52,40,30].map((y, i) => (
        <ellipse key={`rr${i}`} cx={80 + i*2} cy={y} rx={6+i} ry="3.5"
          fill="#6a9a48" opacity="0.7"
          transform={`rotate(${35 + i*4} ${80 + i*2} ${y})`}/>
      ))}
    </svg>
  );
}

export function EucalyptusGreenery({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none">
      {/* Stems */}
      <path d="M60 82 C58 65 52 48 44 30" stroke="#6a8a60" strokeWidth="1.8" fill="none"/>
      <path d="M60 82 C62 65 68 48 76 30" stroke="#6a8a60" strokeWidth="1.8" fill="none"/>
      <path d="M60 82 C60 62 60 44 60 22" stroke="#6a8a60" strokeWidth="1.8" fill="none"/>
      {/* Round eucalyptus leaves — left stem */}
      {[{x:50,y:68},{x:46,y:54},{x:42,y:40},{x:40,y:28}].map((p,i) => (
        <ellipse key={`le${i}`} cx={p.x} cy={p.y} rx="9" ry="7"
          fill="#8aaa78" opacity="0.85"
          transform={`rotate(${-20-i*8} ${p.x} ${p.y})`}/>
      ))}
      {/* Right stem */}
      {[{x:70,y:68},{x:74,y:54},{x:78,y:40},{x:80,y:28}].map((p,i) => (
        <ellipse key={`re${i}`} cx={p.x} cy={p.y} rx="9" ry="7"
          fill="#7a9a68" opacity="0.85"
          transform={`rotate(${20+i*8} ${p.x} ${p.y})`}/>
      ))}
      {/* Center stem */}
      {[{x:60,y:65},{x:60,y:50},{x:60,y:36},{x:60,y:24}].map((p,i) => (
        <ellipse key={`ce${i}`} cx={p.x} cy={p.y} rx="8" ry="6"
          fill="#9aba88" opacity="0.82"
          transform={`rotate(${i*10} ${p.x} ${p.y})`}/>
      ))}
      {/* Leaf veins */}
      {[{x:50,y:68,a:-20},{x:70,y:68,a:20},{x:60,y:50,a:0}].map((p,i) => (
        <line key={`v${i}`} x1={p.x-5} y1={p.y} x2={p.x+5} y2={p.y}
          stroke="#5a7a50" strokeWidth="0.6" opacity="0.5"
          transform={`rotate(${p.a} ${p.x} ${p.y})`}/>
      ))}
    </svg>
  );
}

export function WillowGreenery({ size = 120 }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 120 84" fill="none">
      {/* Drooping willow branches */}
      {[
        {sx:60,sy:20,ex:30,ey:78},
        {sx:60,sy:18,ex:45,ey:80},
        {sx:60,sy:16,ex:60,ey:82},
        {sx:60,sy:18,ex:75,ey:80},
        {sx:60,sy:20,ex:90,ey:78},
        {sx:60,sy:22,ex:20,ey:70},
        {sx:60,sy:22,ex:100,ey:70},
      ].map((b, i) => (
        <path key={i}
          d={`M${b.sx} ${b.sy} C${b.sx + (b.ex-b.sx)*0.3} ${b.sy+10} ${b.ex + (b.sx-b.ex)*0.2} ${b.ey-20} ${b.ex} ${b.ey}`}
          stroke="#6a9a50" strokeWidth="1.4" fill="none" opacity="0.8"/>
      ))}
      {/* Small leaves along branches */}
      {[
        {x:48,y:45},{x:38,y:60},{x:32,y:72},
        {x:53,y:50},{x:50,y:65},{x:46,y:76},
        {x:60,y:48},{x:60,y:62},{x:60,y:76},
        {x:67,y:50},{x:70,y:65},{x:74,y:76},
        {x:72,y:45},{x:82,y:60},{x:88,y:72},
      ].map((p, i) => (
        <ellipse key={i} cx={p.x} cy={p.y} rx="5" ry="3"
          fill="#7aaa60" opacity="0.8"
          transform={`rotate(${-30 + (i%5)*15} ${p.x} ${p.y})`}/>
      ))}
      {/* Base */}
      <ellipse cx="60" cy="22" rx="8" ry="5" fill="#5a8a40" opacity="0.6"/>
    </svg>
  );
}

export const GREENERY_TYPES = {
  leafy: { name: 'Leafy', component: LeafyGreenery, description: 'Lush mixed foliage' },
  fern: { name: 'Fern', component: FernGreenery, description: 'Delicate fern fronds' },
  eucalyptus: { name: 'Eucalyptus', component: EucalyptusGreenery, description: 'Silver-green rounds' },
  willow: { name: 'Willow', component: WillowGreenery, description: 'Soft drooping sprigs' },
};

export default GREENERY_TYPES;
