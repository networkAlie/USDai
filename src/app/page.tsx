'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Download, Share2, Code, Eye, EyeOff, 
  Github, Twitter, Globe 
} from 'lucide-react';
import MermaidRenderer from '../components/MermaidRenderer';
import Sidebar from '../components/Sidebar';
import { diagrams, DiagramItem } from '../lib/diagrams';

export default function Home() {
  const [selectedDiagram, setSelectedDiagram] = useState<DiagramItem>(diagrams[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSourceCode, setShowSourceCode] = useState(false);
  const [renderedSvg, setRenderedSvg] = useState('');

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = saved ? JSON.parse(saved) : systemPrefersDark;
    
    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  }, [darkMode]);

  const handleDiagramSelect = useCallback((diagram: DiagramItem) => {
    setSelectedDiagram(diagram);
    setShowSourceCode(false);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      // Handle copy error silently
    }
  }, []);

  const downloadSvg = useCallback(() => {
    if (!renderedSvg) return;
    
    const blob = new Blob([renderedSvg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDiagram.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [renderedSvg, selectedDiagram.title]);

  const shareUrl = useCallback(() => {
    const url = `${window.location.origin}?diagram=${selectedDiagram.id}`;
    copyToClipboard(url);
  }, [selectedDiagram.id, copyToClipboard]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gradient-dark' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-30 glass-effect border-b border-gray-200 dark:border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    USD AI — UML Preview
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Interactive Diagram Viewer • Alie Network
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Stats */}
              <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <span>{diagrams.length} Diagrams</span>
                <span>4 Categories</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedDiagram.code)}
                  className="p-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-600 
                           hover:bg-white dark:hover:bg-dark-700 transition-all-smooth group"
                  title="Copy Mermaid Code"
                >
                  <Code className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600" />
                </button>

                <button
                  onClick={downloadSvg}
                  className="p-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-600 
                           hover:bg-white dark:hover:bg-dark-700 transition-all-smooth group"
                  title="Download SVG"
                >
                  <Download className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600" />
                </button>

                <button
                  onClick={shareUrl}
                  className="p-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-600 
                           hover:bg-white dark:hover:bg-dark-700 transition-all-smooth group"
                  title="Share Diagram"
                >
                  <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600" />
                </button>

                <button
                  onClick={() => setShowSourceCode(!showSourceCode)}
                  className={`p-2 rounded-lg border transition-all-smooth group ${
                    showSourceCode 
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white/50 dark:bg-dark-800/50 border-gray-200 dark:border-dark-600 hover:bg-white dark:hover:bg-dark-700'
                  }`}
                  title="Toggle Source Code"
                >
                  {showSourceCode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600" />
                  )}
                </button>

                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-white/50 dark:bg-dark-800/50 border border-gray-200 dark:border-dark-600 
                           hover:bg-white dark:hover:bg-dark-700 transition-all-smooth group"
                  title="Toggle Theme"
                >
                  {darkMode ? (
                    <Sun className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-600 group-hover:text-purple-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="transition-all duration-300 lg:w-96"
          >
            <Sidebar
              items={diagrams}
              currentId={selectedDiagram.id}
              onSelect={handleDiagramSelect}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              {/* Diagram Header */}
              <motion.div
                key={selectedDiagram.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 
                                     text-xs font-semibold rounded-full">
                        {selectedDiagram.group}
                      </span>
                      {selectedDiagram.tags && (
                        <div className="flex gap-1">
                          {selectedDiagram.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 
                                       text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedDiagram.title}
                    </h2>
                    {selectedDiagram.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                        {selectedDiagram.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Diagram Viewer */}
              <motion.div
                key={selectedDiagram.id + 'viewer'}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 overflow-hidden"
              >
                <div className="relative" style={{ height: '85vh', minHeight: '600px' }}>
                  <MermaidRenderer
                    code={selectedDiagram.code}
                    title={selectedDiagram.title}
                    onRender={setRenderedSvg}
                    enableZoom={true}
                    showControls={true}
                    darkMode={darkMode}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Source Code Panel */}
              <AnimatePresence>
                {showSourceCode && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-dark-600 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Mermaid Source</h3>
                      <button
                        onClick={() => copyToClipboard(selectedDiagram.code)}
                        className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 
                                 dark:hover:text-primary-300 font-medium transition-colors"
                      >
                        Copy Code
                      </button>
                    </div>
                    <div className="p-4">
                      <pre className="text-sm bg-gray-50 dark:bg-dark-900 rounded-lg p-4 overflow-x-auto 
                                   text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
                        {selectedDiagram.code}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Alie Network • USD AI — UML Preview</p>
                <p className="opacity-75">Interactive diagram visualization platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/alie-network"
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 
                         text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all-smooth"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/alie_network"
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 
                         text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all-smooth"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}