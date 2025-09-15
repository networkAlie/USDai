import React, { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";

// --- Mermaid init (v11 compatible)
mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose", flowchart: { htmlLabels: true } });

// Small helper: render Mermaid to SVG
function MermaidRenderer({ code, onRender }) {
  const ref = useRef(null);
  useEffect(() => {
    let active = true;
    const id = `mmd_${Math.random().toString(36).slice(2)}`;
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (!active) return;
        if (ref.current) ref.current.innerHTML = svg;
        onRender?.(svg);
      })
      .catch((err) => {
        if (ref.current) ref.current.innerHTML = `<pre class='text-red-600 whitespace-pre-wrap'>Mermaid error: ${String(
          err
        )}\n\nCode:\n${code.replace(/</g, "&lt;")}</pre>`;
      });
    return () => {
      active = false;
    };
  }, [code, onRender]);
  return <div ref={ref} className="w-full overflow-auto rounded-2xl bg-white p-4 shadow" />;
}

// Clipboard + SVG download
const copy = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
};
function download(name, svg) {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `${name}.svg`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

// Style helper for exception nodes
const CLASSDEF = "classDef ex fill:#fff3cd,stroke:#f0ad4e,color:#8a6d3b;\n";

// --- Diagrams (no parentheses, HTML <br/> for line breaks)
const diagrams = [
  {
    id: "GF1",
    group: "Marketing System",
    title: "Growth Funnel — activity with swimlanes",
    code: `flowchart LR\n  ${CLASSDEF}  subgraph CL[Client Team]\n    C0([Kickoff])\n    C1[Approve ICP and offer]\n    C2[Green light KOL shortlist]\n    C3[Publish site updates and CTA]\n    C4([Handoff and review])\n  end\n  subgraph AL[Alie Network]\n    A1[Run SAGA score]\n    A2[Build 30 day plan]\n    A3[Draft posts and thread and prompt]\n    A4[Brief KOLs <br/> unique links and codes]\n    A5[UTM and event setup]\n    A6[Weekly snapshot and report]\n  end\n  subgraph KO[KOL Creators]\n    K1[Accept brief]\n    K2[Post ad tagged content]\n    K3[Drive to CTA link]\n  end\n  subgraph CM[Community]\n    M1[See content]\n    M2[Click CTA]\n    M3[Join Discord]\n    M4[First action <br/> claim or swap or book]\n  end\n  C0-->A1-->A2-->C1-->A3-->C2-->A4-->K1-->K2-->M1-->M2-->A5-->M3-->M4-->A6-->C4\n  D1{CTR above target}\n  D2{Activation above target}\n  K2-->D1\n  D1-- Yes -->M1\n  D1-- No -->A3\n  M4-->D2\n  D2-- Yes -->A6\n  D2-- No -->A4\n  E1{{Creator delay}}:::ex\n  E2{{Tracking broken}}:::ex\n  E3{{Negative feedback spike}}:::ex\n  K1-->E1\n  A5-->E2\n  M1-->E3`,
  },
  {
    id: "MM2",
    group: "Marketing System",
    title: "Measurement Map — use case style",
    code: `flowchart LR\n  U([Visitor or User])\n  subgraph SYS[Growth Stack]\n    EV1((wallet_connect))\n    EV2((swap_token))\n    EV3((claim_ai_land))\n    EV4((book_call))\n    EV5((join_discord))\n    KP((Dashboard and UTM))\n  end\n  U --> EV1\n  U --> EV3\n  U --> EV4\n  EV1 --> EV2\n  EV3 --> KP\n  EV4 --> KP\n  EV5 --> KP`,
  },
  {
    id: "KC3",
    group: "Marketing System",
    title: "KOL Collaboration — sequence",
    code: `sequenceDiagram\n  autonumber\n  participant G as Growth Lead — Client\n  participant A as Alie Network\n  participant K as KOL Creator\n  participant T as Tracking\n  G->>A: Approve shortlist and budget\n  A-->>G: Briefs and talking points\n  A->>K: Outreach and ad policy\n  K-->>A: Accept and publish window\n  A->>T: Create UTM and unique codes\n  K->>G: Post goes live — ad tag\n  G-->>T: Traffic and events flow in\n  T-->>A: Weekly snapshot\n  A-->>G: Optimize creative and creator\n  alt Issues\n    K-->>A: Delay or reshoot\n    T-->>A: Broken link or mismatch\n  end`,
  },
  {
    id: "LP4",
    group: "Marketing System",
    title: "14 Day Launch Plan — swimlane summary",
    code: `flowchart LR\n  ${CLASSDEF}  subgraph Week1\n    W1a[Day1: Offer Matrix and SAGA page live]\n    W1b[Day2: KOL shortlist and briefs]\n    W1c[Day3: AI land promo push — two creatives]\n    W1d[Day4: AMA announcement]\n    W1e[Day5: KOL wave one live]\n    W1f[Day6 to 7: Iterate and community recap]\n  end\n  subgraph Week2\n    W2a[Day8: Agent launch demo clip]\n    W2b[Day9: KOL wave two and retarget copy]\n    W2c[Day10: Mini case study one]\n    W2d[Day11: Spaces or AMA live]\n    W2e[Day12: Update deck and metrics]\n    W2f[Day13 to 14: Growth report and next sprint]\n  end\n  W1a-->W1b-->W1c-->W1d-->W1e-->W1f-->W2a-->W2b-->W2c-->W2d-->W2e-->W2f\n  E1{{Budget shift}}:::ex\n  E2{{Creator drop}}:::ex\n  E3{{Platform policy flag}}:::ex\n  W1e-->E2\n  W1c-->E3\n  W2b-->E1`,
  },
];

function Sidebar({ items, currentId, onSelect }) {
  const groups = useMemo(() => {
    const m = new Map();
    items.forEach((d) => {
      if (!m.has(d.group)) m.set(d.group, []);
      m.get(d.group).push(d);
    });
    return Array.from(m.entries());
  }, [items]);
  return (
    <aside className="w-full md:w-80 shrink-0 space-y-4">
      {groups.map(([group, ds]) => (
        <div key={group} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">{group}</div>
          <ul className="space-y-1">
            {ds.map((d) => (
              <li key={d.id}>
                <button
                  onClick={() => onSelect(d)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    currentId === d.id ? "bg-gray-900 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {d.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default function App() {
  const [selected, setSelected] = useState(diagrams[0]);
  const [svg, setSvg] = useState("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold">USD AI — UML Preview</h1>
            <p className="text-sm text-gray-600">React + Mermaid live renderer • copy/export ready • Alie Network</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copy(selected.code)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
              title="Copy Mermaid code"
            >
              Copy Mermaid
            </button>
            <button
              onClick={() => download(selected.title.replaceAll(" ", "_"), svg)}
              className="rounded-xl bg-gray-900 px-3 py-2 text-sm text-white shadow-sm hover:bg-black"
              title="Export SVG"
            >
              Export SVG
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:flex-row">
        <Sidebar items={diagrams} currentId={selected.id} onSelect={(d) => setSelected(d)} />

        <section className="flex w-full flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Diagram</div>
            <div className="mb-2 text-lg font-bold">{selected.title}</div>
            <MermaidRenderer code={selected.code} onRender={setSvg} />
          </div>

          <details className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer text-sm font-semibold">Show Mermaid Source</summary>
            <pre className="mt-3 overflow-auto rounded-xl bg-gray-50 p-3 text-xs leading-relaxed">{selected.code}</pre>
          </details>
        </section>
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Alie Network • USD AI — UML Preview. Use ad tag and DYOR disclosures where applicable.
      </footer>
    </div>
  );
}
