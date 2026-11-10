// Deterministic choreography, shared by the scene and its non-browser tests.
export const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
export const ease = n => { const x = clamp(n); return x*x*(3-2*x); };
export const blend = (a,b,t) => a+(b-a)*t;
export function phonePose(index, progress, compact) {
  const side=index-1;
  const open=ease((progress-(index===2?.1:.025))/.48);
  const settle=ease((progress-.58)/.36);
  const spread=compact?1.05:1.55;
  return {
    x:side*blend(.22,spread,open),
    y:index===1?blend(.08,-.03,open):blend(-.16,.12,open),
    z:index===1?.44:blend(-.62,-.08,open),
    rx:blend(.12,.015,open),
    ry:side*blend(-.54,-.12,open)*(1-settle*.75),
    rz:side*blend(-.04,-.13,open)*(1-settle*.35)
  };
}
export function cameraDistance(aspect, hero, compact) {
  const span=hero?4.7:(compact?4.2:5.5);
  const height=hero?4.4:4.85;
  return Math.max(height,span/Math.max(aspect,.2))/(2*Math.tan(20*Math.PI/180));
}
