const TRUCKS = ["🚛", "🚚", "🚜", "🚐"];
const COUNT = 18;

/* Deterministic pseudo-random layout so server and client markup match. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/* Rounded so tiny float differences between engines can't cause a hydration mismatch. */
const fixed = (n: number) => n.toFixed(2);

const DROPS = Array.from({ length: COUNT }, (_, i) => ({
  emoji: TRUCKS[i % TRUCKS.length],
  left: `${fixed(rand(i) * 100)}%`,
  fontSize: `${fixed(1.5 + rand(i + 100) * 1.5)}rem`,
  animationDuration: `${fixed(4 + rand(i + 200) * 5)}s`,
  animationDelay: `${fixed(rand(i + 300) * 6)}s`,
}));

/* Falling trucks for the zero-day view. Styles live in globals.css (.truck-rain). */
export default function TruckRain() {
  return (
    <div className="truck-rain" aria-hidden="true">
      {DROPS.map(({ emoji, ...style }, i) => (
        <span key={i} style={{ top: 0, ...style }}>
          {emoji}
        </span>
      ))}
    </div>
  );
}
