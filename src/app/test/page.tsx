'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Simple test diagram
const testDiagram = `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> A`;

export default function TestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render('test-diagram', testDiagram);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          containerRef.current.innerHTML = `<div>Error: ${error}</div>`;
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">UML Diagram Test</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div ref={containerRef} className="text-center">
          Loading diagram...
        </div>
      </div>
    </div>
  );
}