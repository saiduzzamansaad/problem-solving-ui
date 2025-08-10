import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProblemCard from '../components/ProblemCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { filterProblems } from '../utils/helpers';
import problems from '../data/problems';
import { FaSearch, FaFilter, FaSadTear, FaRandom, FaChevronDown } from 'react-icons/fa';
import { RiLightbulbFlashLine } from 'react-icons/ri';

// Enhanced animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
      mass: 0.5
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const ProblemList = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ difficulty: 'All', tag: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const problemsPerPage = 6;

  // Simulate loading with more realistic delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProblems = filterProblems(problems, searchTerm, filters);
  
  // Get current problems
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const getRandomProblem = () => {
    if (filteredProblems.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    // In a real app, you would navigate to the problem detail page
    alert(`Random problem selected: ${filteredProblems[randomIndex].title}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 360 
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "linear",
            scale: {
              repeatType: "reverse",
              repeat: Infinity,
              duration: 1.5
            }
          }}
        >
          <LoadingSpinner size="lg" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen"
    >
      {/* Header Section */}
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4"
        variants={item}
      >
        <div>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Problem Explorer
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sharpen your skills with these challenges
          </motion.p>
        </div>
        
        <motion.button
          onClick={getRandomProblem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaRandom />
          <span>Random Problem</span>
        </motion.button>
      </motion.div>
      
      {/* Search and Filter Section */}
      <motion.div 
        variants={item}
        className="mb-8 bg-white rounded-xl shadow-sm p-4"
      >
        <div 
          className="flex items-center justify-between cursor-pointer md:cursor-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <RiLightbulbFlashLine className="text-indigo-500" />
            Find Your Challenge
          </h2>
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle filters"
          >
            <motion.div
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronDown />
            </motion.div>
          </button>
        </div>
        
        <AnimatePresence>
          {(isFilterOpen || window.innerWidth >= 768) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <SearchFilter 
                onSearch={handleSearch}
                onFilter={handleFilter}
                className="mt-4"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Results Count */}
      <motion.div 
        className="mb-6 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Showing {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''}
      </motion.div>
      
      {/* Problem Grid */}
      <AnimatePresence mode="wait">
        {currentProblems.length > 0 ? (
          <>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentProblems.map((problem, index) => (
                <motion.div 
                  key={problem.id} 
                  variants={item}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 15px 30px -10px rgba(99, 102, 241, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400,
                    damping: 15
                  }}
                  className="h-full"
                >
                  <ProblemCard 
                    problem={problem} 
                    index={index}
                    layoutId={`problem-${problem.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12"
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white rounded-xl shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="inline-block mb-6"
            >
              <FaSadTear className="text-5xl text-indigo-300" />
            </motion.div>
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any problems matching your criteria. Try adjusting your search or filters.
            </p>
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ difficulty: 'All', tag: 'All' });
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={getRandomProblem}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center gap-2 justify-center"
              >
                <FaRandom />
                Pick Random Problem
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProblemList;