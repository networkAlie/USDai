'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, FileText, Search } from 'lucide-react';

interface DiagramItem {
  id: string;
  group: string;
  title: string;
  code: string;
  description?: string;
  tags?: string[];
}

interface SidebarProps {
  items: DiagramItem[];
  currentId: string;
  onSelect: (diagram: DiagramItem) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  currentId,
  onSelect,
  searchTerm,
  onSearchChange,
  className = ''
}) => {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());

  // Filter and group diagrams
  const filteredGroups = useMemo(() => {
    // Filter items based on search term only
    const filteredItems = items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.group.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    // Group filtered items
    const groupsMap = new Map<string, DiagramItem[]>();
    filteredItems.forEach(item => {
      if (!groupsMap.has(item.group)) {
        groupsMap.set(item.group, []);
      }
      groupsMap.get(item.group)!.push(item);
    });

    return Array.from(groupsMap.entries());
  }, [items, searchTerm]);

  // Auto-expand groups when searching
  React.useEffect(() => {
    if (searchTerm) {
      setExpandedGroups(new Set(filteredGroups.map(([group]) => group)));
    }
  }, [searchTerm, filteredGroups]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };


  return (
    <aside className={`w-full md:w-80 lg:w-96 shrink-0 ${className}`}>
      <div className="sticky top-20 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search diagrams..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-600 
                     bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     placeholder-gray-400 dark:placeholder-gray-500 transition-all-smooth"
          />
        </div>


        {/* Diagram Groups */}
        <div className="space-y-3">
          {filteredGroups.map(([groupName, diagrams]) => (
            <motion.div
              key={groupName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-600 overflow-hidden"
            >
              <button
                onClick={() => toggleGroup(groupName)}
                className="w-full px-4 py-3 flex items-center justify-between 
                         bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 
                         transition-all-smooth"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {groupName}
                  </span>
                  <span className="bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-400 
                                 text-xs px-2 py-0.5 rounded-full">
                    {diagrams.length}
                  </span>
                </div>
                {expandedGroups.has(groupName) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {expandedGroups.has(groupName) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-2">
                      {diagrams.map(diagram => (
                        <motion.button
                          key={diagram.id}
                          onClick={() => onSelect(diagram)}
                          className={`w-full p-3 rounded-lg text-left transition-all-smooth group ${
                            currentId === diagram.id
                              ? 'bg-primary-500 text-white shadow-lg'
                              : 'hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${
                              currentId === diagram.id
                                ? 'text-white'
                                : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            }`} />
                            <div className="min-w-0 flex-1">
                              <div className={`font-medium text-sm leading-5 ${
                                currentId === diagram.id ? 'text-white' : ''
                              }`}>
                                {diagram.title}
                              </div>
                              {diagram.description && (
                                <div className={`text-xs mt-1 opacity-75 ${
                                  currentId === diagram.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {diagram.description}
                                </div>
                              )}
                              {diagram.tags && diagram.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {diagram.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`text-xs px-1.5 py-0.5 rounded ${
                                        currentId === diagram.id
                                          ? 'bg-white/20 text-white'
                                          : 'bg-gray-200 dark:bg-dark-600 text-gray-600 dark:text-gray-400'
                                      }`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No diagrams found</p>
            <p className="text-xs opacity-75 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;