import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProblemCard from '../components/ProblemCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { filterProblems } from '../utils/helpers';
import problems from '../data/problems';
import { FaSearch, FaFilter, FaSadTear } from 'react-icons/fa';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const ProblemList = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ difficulty: 'All', tag: 'All' });
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 6;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <LoadingSpinner />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.h1 
        className="text-3xl font-bold text-gray-900 mb-8"
        variants={item}
      >
        Problem List
      </motion.h1>
      
      <motion.div variants={item}>
        <SearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
      </motion.div>
      
      <AnimatePresence mode="wait">
        {currentProblems.length > 0 ? (
          <>
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentProblems.map((problem, index) => (
                <motion.div 
                  key={problem.id} 
                  variants={item}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ProblemCard problem={problem} index={index} />
                </motion.div>
              ))}
            </motion.div>
            
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
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
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mb-4"
            >
              <FaSadTear className="text-4xl text-gray-400" />
            </motion.div>
            <h3 className="text-lg font-medium text-gray-900">No problems found</h3>
            <p className="mt-2 text-gray-600 flex items-center justify-center gap-2">
              <FaSearch className="text-gray-400" />
              Try adjusting your search or filter criteria
              <FaFilter className="text-gray-400" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProblemList;