import React from 'react';
import { createRng } from '../randomizer';

// Large detailed rose with spiral center and many layered petals
export default function Rose({ x = 0, y = 0, scale = 1, rotation = 0, seed = 1, styleMode = 'sketch' }) {
  const rng = createRng(seed);
  const j = (v, a) => v + (rng.random() - 0.5) * 2 * a;

  const isMono = styleMode === 'mono';
  const wfill  = isMono ? 'rgba(200,190,190,0.35)' : 'rgba(240,180,190,0.38)';
  const mfill  = isMono ? 'rgba(180,170,170,0.4)'  : 'rgba(220,150,165,0.42)';
  const ifill  = isMono ? 'rgba(160,150,150,0.5)'  : 'rgba(200,120,140,0.5)';
  const sk     = isMono ? '#3a3a3a' : '#5a3040';

  return (
    <g transform={`translate(${x},${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Outermost petals — wide, loose */}
      <path d={`M${j(0,2)},${j(6,2)} C${j(-38,3)},${j(4,3)} ${j(-48,3)},${j(-20,3)} ${j(-32,3)},${j(-42,3)} C${j(-20,3)},${j(-56,3)} ${j(-4,3)},${j(-58,3)} ${j(4,3)},${j(-48,3)} C${j(18,3)},${j(-30,3)} ${j(16,3)},${j(-8,3)} ${j(0,2)},${j(6,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.1" />
      <path d={`M${j(0,2)},${j(6,2)} C${j(30,3)},${j(8,3)} ${j(48,3)},${j(-8,3)} ${j(42,3)},${j(-30,3)} C${j(36,3)},${j(-48,3)} ${j(18,3)},${j(-56,3)} ${j(6,3)},${j(-46,3)} C${j(18,3)},${j(-28,3)} ${j(16,3)},${j(-10,3)} ${j(0,2)},${j(6,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.1" />
      <path d={`M${j(0,2)},${j(6,2)} C${j(-20,3)},${j(16,3)} ${j(-38,3)},${j(10,3)} ${j(-38,3)},${j(-8,3)} C${j(-38,3)},${j(-24,3)} ${j(-26,3)},${j(-36,3)} ${j(-12,3)},${j(-34,3)} C${j(-22,3)},${j(-20,3)} ${j(-18,3)},${j(-6,3)} ${j(0,2)},${j(6,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.1" />
      <path d={`M${j(0,2)},${j(6,2)} C${j(18,3)},${j(18,3)} ${j(36,3)},${j(12,3)} ${j(36,3)},${j(-4,3)} C${j(36,3)},${j(-20,3)} ${j(24,3)},${j(-32,3)} ${j(10,3)},${j(-30,3)} C${j(20,3)},${j(-16,3)} ${j(16,3)},${j(-4,3)} ${j(0,2)},${j(6,2)} Z`}
        fill={wfill} stroke={sk} strokeWidth="1.1" />

      {/* Mid petals */}
      <path d={`M${j(0,1)},${j(-4,2)} C${j(-26,2)},${j(-6,2)} ${j(-34,2)},${j(-24,2)} ${j(-22,2)},${j(-40,2)} C${j(-14,2)},${j(-50,2)} ${j(-2,2)},${j(-52,2)} ${j(4,2)},${j(-44,2)} C${j(14,2)},${j(-30,2)} ${j(12,2)},${j(-12,2)} ${j(0,1)},${j(-4,2)} Z`}
        fill={mfill} stroke={sk} strokeWidth="1" />
      <path d={`M${j(0,1)},${j(-4,2)} C${j(22,2)},${j(-4,2)} ${j(32,2)},${j(-20,2)} ${j(24,2)},${j(-36,2)} C${j(16,2)},${j(-48,2)} ${j(2,2)},${j(-50,2)} ${j(-2,2)},${j(-42,2)} C${j(8,2)},${j(-28,2)} ${j(8,2)},${j(-12,2)} ${j(0,1)},${j(-4,2)} Z`}
        fill={mfill} stroke={sk} strokeWidth="1" />
      <path d={`M${j(0,1)},${j(-4,2)} C${j(-14,2)},${j(4,2)} ${j(-26,2)},${j(-2,2)} ${j(-24,2)},${j(-16,2)} C${j(-22,2)},${j(-28,2)} ${j(-12,2)},${j(-36,2)} ${j(-2,2)},${j(-32,2)} C${j(-10,2)},${j(-20,2)} ${j(-8,2)},${j(-8,2)} ${j(0,1)},${j(-4,2)} Z`}
        fill={mfill} stroke={sk} strokeWidth="1" />

      {/* Inner petals */}
      <path d={`M${j(0,1)},${j(-14,1)} C${j(-14,1)},${j(-16,1)} ${j(-18,1)},${j(-28,1)} ${j(-10,1)},${j(-36,1)} C${j(-4,1)},${j(-42,1)} ${j(4,1)},${j(-40,1)} ${j(6,1)},${j(-34,1)} C${j(10,1)},${j(-24,1)} ${j(6,1)},${j(-16,1)} ${j(0,1)},${j(-14,1)} Z`}
        fill={ifill} stroke={sk} strokeWidth="0.9" />
      <path d={`M${j(0,1)},${j(-14,1)} C${j(12,1)},${j(-14,1)} ${j(16,1)},${j(-24,1)} ${j(10,1)},${j(-32,1)} C${j(4,1)},${j(-38,1)} ${j(-4,1)},${j(-38,1)} ${j(-4,1)},${j(-30,1)} C${j(2,1)},${j(-22,1)} ${j(2,1)},${j(-16,1)} ${j(0,1)},${j(-14,1)} Z`}
        fill={ifill} stroke={sk} strokeWidth="0.9" />

      {/* Spiral center — the key detail */}
      <path d={`M${j(0,1)},${j(-22,1)} C${j(8,1)},${j(-22,1)} ${j(10,1)},${j(-28,1)} ${j(6,1)},${j(-32,1)} C${j(2,1)},${j(-36,1)} ${j(-4,1)},${j(-34,1)} ${j(-4,1)},${j(-28,1)} C${j(-4,1)},${j(-24,1)} ${j(-2,1)},${j(-22,1)} ${j(0,1)},${j(-22,1)} Z`}
        fill={isMono ? 'rgba(140,130,130,0.6)' : 'rgba(180,90,110,0.55)'} stroke={sk} strokeWidth="0.9" />
      <path d={`M${j(0,1)},${j(-26,1)} C${j(4,1)},${j(-27,1)} ${j(5,1)},${j(-30,1)} ${j(2,1)},${j(-32,1)}`}
        fill="none" stroke={sk} strokeWidth="0.8" opacity="0.7" />
      <path d={`M${j(0,1)},${j(-26,1)} C${j(-3,1)},${j(-27,1)} ${j(-4,1)},${j(-30,1)} ${j(-2,1)},${j(-31,1)}`}
        fill="none" stroke={sk} strokeWidth="0.8" opacity="0.7" />

      {/* Ink detail lines on outer petals */}
      <path d={`M${j(-8,1)},${j(-6,1)} C${j(-18,1)},${j(-18,1)} ${j(-20,1)},${j(-34,1)} ${j(-14,1)},${j(-44,1)}`}
        fill="none" stroke={sk} strokeWidth="0.6" opacity="0.35" />
      <path d={`M${j(8,1)},${j(-6,1)} C${j(18,1)},${j(-18,1)} ${j(20,1)},${j(-34,1)} ${j(14,1)},${j(-44,1)}`}
        fill="none" stroke={sk} strokeWidth="0.6" opacity="0.35" />
    </g>
  );
}
