import { useEffect, useRef, useState } from "react";
import { Trophy, Globe2, Plane, Boxes, Building2, MapPinned, Package } from "lucide-react";

/* ---------- tiny count-up (no libs) ---------- */
function useCountUp(end: number, ms = 1200) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStart(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(end * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, ms, start]);

  const text = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return { ref, text };
}

/* ---------- types & palette ---------- */
type Item = {
  title: string;               // e.g., "Countries & Regions"
  value: number;               // e.g., 200
  caption: string;             // helper line under the number
  Icon: React.ElementType;     // badge icon
  tone: "blue" | "red" | "gold";
};

const palette = {
  blue: { badge: "bg-kargon-blue", ribbon: "from-kargon-blue to-kargon-blue/90", number: "text-kargon-blue" },
  red:  { badge: "bg-kargon-red",  ribbon: "from-kargon-red to-kargon-red/90",   number: "text-kargon-red"  },
  gold: { badge: "bg-gc-gold",     ribbon: "from-gc-gold to-gc-gold",            number: "text-amber-600"   },
};

/* ---------- YOUR EXACT DATA ---------- */
const ITEMS: Item[] = [
  { title: "NO. 1", value: 1, caption: "Domestic LCL Market • Undisputed Leader", Icon: Trophy,    tone: "gold" },
  { title: "Countries & Regions", value: 200, caption: "Global coverage",         Icon: Globe2,    tone: "blue" },
  { title: "Weekly Direct Service", value: 1000, caption: "High-frequency schedules", Icon: Plane, tone: "blue" },
  { title: "Cubic Meters • Global Export LCL Freight", value: 3_000_000, caption: "Proven consolidation capacity", Icon: Boxes, tone: "red" },
  { title: "Branches & Offices", value: 84, caption: "On-ground expertise",      Icon: Building2, tone: "blue" },
  { title: "Destinations", value: 20_000, caption: "Door-to-door reach",         Icon: MapPinned, tone: "gold" },
  { title: "Shipments / Year", value: 555_000, caption: "Trusted by shippers worldwide", Icon: Package, tone: "red" },
];

/* ---------- card ---------- */
function PillCard({ item }: { item: Item }) {
  const { ref, text } = useCountUp(item.value);
  const Icon = item.Icon;
  const c = palette[item.tone];

  return (
    <div className="relative overflow-visible bg-white rounded-[28px] pt-14 pb-12 px-7 shadow-[0_8px_24px_rgba(16,24,40,0.08)] hover:shadow-[0_12px_28px_rgba(16,24,40,0.12)] transition-shadow text-center">
      {/* top circular badge with ring */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2">
        <div className={`h-20 w-20 ${c.badge} rounded-full grid place-items-center shadow-[0_8px_18px_rgba(0,0,0,0.15)] ring-8 ring-white`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* title */}
      <p className="text-[11px] md:text-xs uppercase tracking-wide text-slate-500 mb-2">{item.title}</p>

      {/* number */}
      <div ref={ref as any} className="mb-3">
        <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${c.number}`}>
          {text}
        </span>
      </div>

      {/* caption */}
      <p className="text-[15px] leading-6 md:text-base md:leading-7 text-slate-700">
        {item.caption}
      </p>

      {/* ribbon tail */}
      <div
        className={`absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-32 bg-gradient-to-b ${c.ribbon} shadow-[0_8px_18px_rgba(0,0,0,0.12)]`}
        style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 50% 74%, 0 100%)", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}
      />
    </div>
  );
}

/* ---------- section ---------- */
export default function ExactPillStatsLogistics() {
  return (
    <section className="py-12 md:py-16 bg-[radial-gradient(ellipse_at_top,_#f4f6f8,_#ffffff)]">
      <div className="container mx-auto px-4 md:px-6">
        {/* grid (wraps nicely for 7 items) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => <PillCard key={i} item={it} />)}
        </div>

        {/* legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-kargon-blue" /> Core Network
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-kargon-red" /> Capacity
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-gc-gold" /> Reach
          </span>
        </div>
      </div>
    </section>
  );
}
