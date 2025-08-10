import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import  useDebounce  from '../hooks/useDebounce';
import { FaSearch, FaFilter, FaChevronDown, FaTimes } from 'react-icons/fa';
import { RiBubbleChartLine } from 'react-icons/ri';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    difficulty: 'All', 
    tag: 'All',
    sort: 'Newest'
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const constraintsRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  
  // Animated values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Particle system state
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
    createParticles(20);
  };

  const resetFilters = () => {
    setSearchTerm('');
    const newFilters = { difficulty: 'All', tag: 'All', sort: 'Newest' };
    setFilters(newFilters);
    onFilter(newFilters);
    createParticles(30);
  };

  // Create interactive particles
  const createParticles = (count) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 3,
        color: `hsl(${Math.random() * 60 + 200}, 80%, 60%)`,
        life: 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    setParticles(newParticles);
  };

  // Update particles animation
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          }))
          .filter(p => p.life > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [particles]);

  // Liquid morphing animation variants
  const containerVariants = {
    collapsed: { 
      height: 80,
      transition: { 
        type: 'spring', 
        damping: 25,
        stiffness: 120
      }
    },
    expanded: { 
      height: 'auto',
      transition: { 
        type: 'spring', 
        damping: 25,
        stiffness: 100
      }
    }
  };

  const filterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="relative overflow-hidden"
      ref={constraintsRef}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life / 100
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 500,
              damping: 15
            }}
          />
        ))}
      </div>

      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
        variants={containerVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000
        }}
        whileHover={{ scale: 1.005 }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onPointerLeave={() => {
          animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
          animate(y, 0, { type: 'spring', stiffness: 300, damping: 20 });
        }}
      >
        <div className="p-4 md:p-6">
          {/* Main search row */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative flex-grow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                animate={{
                  rotate: searchTerm ? 10 : 0,
                  scale: searchTerm ? 1.1 : 1
                }}
                transition={{ type: 'spring' }}
              >
                <FaSearch />
              </motion.div>
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full pl-10 pr-4 py-3 bg-white/70 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400/30 focus:border-pink-400/50 shadow-sm text-gray-800 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (e.target.value) createParticles(5);
                }}
              />
              {searchTerm && (
                <motion.button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </motion.div>

            <motion.button
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter />
              <span className="hidden sm:inline">Filters</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                <FaChevronDown />
              </motion.span>
            </motion.button>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, height: 0 },
                  visible: { 
                    opacity: 1, 
                    height: 'auto',
                    transition: {
                      staggerChildren: 0.1,
                      when: "beforeChildren"
                    }
                  }
                }}
              >
                {/* Difficulty Filter */}
                <motion.div variants={filterVariants}>
                  <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">
                    Difficulty
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                      <motion.button
                        key={level}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filters.difficulty === level 
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => handleFilterChange('difficulty', level)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tag Filter */}
                <motion.div variants={filterVariants}>
                  <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">
                    Category
                  </label>
                  <div className="relative">
                    <motion.select
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-400/30 focus:border-pink-400/50 shadow-sm text-gray-700 pr-8"
                      value={filters.tag}
                      onChange={(e) => handleFilterChange('tag', e.target.value)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <option value="All">All Categories</option>
                      <option value="Array">Array</option>
                      <option value="String">String</option>
                      <option value="Tree">Tree</option>
                      <option value="Graph">Graph</option>
                      <option value="DP">Dynamic Programming</option>
                    </motion.select>
                    <motion.div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <RiBubbleChartLine />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Sort Filter */}
                <motion.div variants={filterVariants}>
                  <label className="block text-sm font-medium text-gray-500 mb-2 ml-1">
                    Sort By
                  </label>
                  <div className="relative">
                    <motion.select
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-pink-400/30 focus:border-pink-400/50 shadow-sm text-gray-700 pr-8"
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <option value="Newest">Newest First</option>
                      <option value="Oldest">Oldest First</option>
                      <option value="Easiest">Easiest First</option>
                      <option value="Hardest">Hardest First</option>
                    </motion.select>
                    <motion.div 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Reset Button */}
                <motion.div 
                  className="md:col-span-3 flex justify-end"
                  variants={filterVariants}
                >
                  <motion.button
                    className="px-4 py-2 text-sm text-pink-600 hover:text-pink-800 flex items-center gap-2"
                    onClick={resetFilters}
                    whileHover={{ 
                      x: [0, 2, -2, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <FaTimes />
                    Reset All Filters
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Liquid morphing border effect */}
        <motion.div 
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.3,
            background: `conic-gradient(
              from ${useMotionValue(0)}deg at 50% 50%,
              rgba(236, 72, 153, 0.3) 0deg,
              rgba(168, 85, 247, 0.3) 120deg,
              rgba(79, 70, 229, 0.3) 240deg,
              rgba(236, 72, 153, 0.3) 360deg
            )`
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default SearchFilter;