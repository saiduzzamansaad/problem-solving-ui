import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ProblemCard from '../components/ProblemCard';
import SearchFilter from '../components/SearchFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import problems from '../data/problems';
import { 
  FaSearch, 
  FaFilter, 
  FaSadTear, 
  FaRandom, 
  FaChevronDown, 
  FaBookmark, 
  FaRegBookmark,
  FaFire,
  FaClock,
  FaStar,
  FaRegStar,
  FaLayerGroup,
  FaSort,
  FaTimes,
  FaRocket,
  FaLightbulb,
  FaGraduationCap
} from 'react-icons/fa';
import { RiLightbulbFlashLine, RiGridFill, RiListCheck, RiSparklingFill } from 'react-icons/ri';
import { IoStatsChart, IoSpeedometer } from 'react-icons/io5';
import { TbTargetArrow } from 'react-icons/tb';

// Helper functions
const filterProblems = (problems, searchTerm, filters) => {
  return problems.filter(problem => {
    const matchesSearch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = filters.difficulty === 'All' || problem.difficulty === filters.difficulty;
    const matchesTag = filters.tag === 'All' || problem.tags.includes(filters.tag);
    const matchesStatus = filters.status === 'All' || problem.status === filters.status;
    
    return matchesSearch && matchesDifficulty && matchesTag && matchesStatus;
  });
};

const getRandomItem = (array) => {
  if (array.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const formatTime = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} months ago`;
};

// Premium animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 15,
      mass: 0.7
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Glow effect for cards
const glowVariant = {
  hidden: { boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1)" },
  hover: { 
    boxShadow: [
      "0 4px 20px -2px rgba(99, 102, 241, 0.2)",
      "0 10px 40px -5px rgba(99, 102, 241, 0.4)",
      "0 4px 20px -2px rgba(99, 102, 241, 0.2)"
    ],
    transition: {
      boxShadow: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};

const ProblemList = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    difficulty: 'All', 
    tag: 'All',
    status: 'All',
    sort: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarkedProblems, setBookmarkedProblems] = useState(new Set());
  const [ratedProblems, setRatedProblems] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const problemsPerPage = viewMode === 'grid' ? 9 : 6;

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const scrollTopOpacity = useTransform(scrollY, [300, 500], [0, 1]);

  useEffect(() => {
    return scrollTopOpacity.onChange((value) => {
      setShowScrollTop(value > 0.5);
    });
  }, [scrollTopOpacity]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    
    const savedBookmarks = localStorage.getItem('problemBookmarks');
    const savedRatings = localStorage.getItem('problemRatings');
    const savedRecent = localStorage.getItem('recentlyViewed');
    
    if (savedBookmarks) setBookmarkedProblems(new Set(JSON.parse(savedBookmarks)));
    if (savedRatings) setRatedProblems(JSON.parse(savedRatings));
    if (savedRecent) setRecentlyViewed(JSON.parse(savedRecent));
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('problemBookmarks', JSON.stringify([...bookmarkedProblems]));
  }, [bookmarkedProblems]);
  
  useEffect(() => {
    localStorage.setItem('problemRatings', JSON.stringify(ratedProblems));
  }, [ratedProblems]);
  
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const filteredProblems = filterProblems(problems, searchTerm, filters);
  
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    switch(filters.sort) {
      case 'difficulty-asc':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'difficulty-desc':
        const difficultyOrderDesc = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrderDesc[b.difficulty] - difficultyOrderDesc[a.difficulty];
      case 'popularity':
        return (b.attempts || 0) - (a.attempts || 0);
      case 'rating':
        return (ratedProblems[b.id] || 0) - (ratedProblems[a.id] || 0);
      case 'newest':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });
  
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = sortedProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(sortedProblems.length / problemsPerPage);

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
      top: containerRef.current.offsetTop - 20, 
      behavior: 'smooth' 
    });
  };

  const toggleBookmark = (problemId) => {
    const newBookmarks = new Set(bookmarkedProblems);
    if (newBookmarks.has(problemId)) {
      newBookmarks.delete(problemId);
    } else {
      newBookmarks.add(problemId);
    }
    setBookmarkedProblems(newBookmarks);
  };

  const rateProblem = (problemId, rating) => {
    setRatedProblems(prev => ({ ...prev, [problemId]: rating }));
  };

  const viewProblemDetails = (problem) => {
    const newRecentlyViewed = recentlyViewed.filter(p => p.id !== problem.id);
    newRecentlyViewed.unshift(problem);
    if (newRecentlyViewed.length > 5) newRecentlyViewed.pop();
    setRecentlyViewed(newRecentlyViewed);
    console.log(`Viewing problem: ${problem.title}`);
  };

  const getRandomProblem = () => {
    if (sortedProblems.length === 0) return;
    const randomProblem = getRandomItem(sortedProblems);
    viewProblemDetails(randomProblem);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', name: 'All Problems', icon: <FaLayerGroup />, count: problems.length },
    { id: 'easy', name: 'Easy', icon: <RiSparklingFill />, count: problems.filter(p => p.difficulty === 'Easy').length },
    { id: 'medium', name: 'Medium', icon: <IoSpeedometer />, count: problems.filter(p => p.difficulty === 'Medium').length },
    { id: 'hard', name: 'Hard', icon: <TbTargetArrow />, count: problems.filter(p => p.difficulty === 'Hard').length },
    { id: 'bookmarked', name: 'Bookmarked', icon: <FaBookmark />, count: bookmarkedProblems.size },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply opacity-70 filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply opacity-50 filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ 
            duration: 0.8,
          }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <RiSparklingFill className="text-6xl text-indigo-500 mb-4" />
          </motion.div>
          <LoadingSpinner size="xl" />
          <motion.p 
            className="mt-4 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Preparing your coding challenges...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-40 left-10 w-6 h-6 bg-indigo-300 rounded-full opacity-20"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-80 right-20 w-10 h-10 bg-purple-300 rounded-full opacity-30"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
        ref={containerRef}
      >
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6"
          variants={item}
        >
          <div className="flex-1">
            <motion.h1 
              className="text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              Code Challenges
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Level up your skills with curated programming challenges
            </motion.p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={getRandomProblem}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)"
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FaRandom className="text-lg" />
              <span>Random Challenge</span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Category selector */}
        <motion.div 
          className="flex overflow-x-auto pb-2 mb-8 gap-2 scrollbar-hide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === category.id 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === category.id 
                  ? 'bg-white text-indigo-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Total Problems</h3>
              <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                <FaLayerGroup className="text-indigo-600 text-xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">{problems.length}</p>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Bookmarked</h3>
              <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <FaBookmark className="text-amber-600 text-xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">{bookmarkedProblems.size}</p>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Completed</h3>
              <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                <RiListCheck className="text-green-600 text-xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">
              {problems.filter(p => p.status === 'completed').length}
            </p>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 font-medium">Hot Problems</h3>
              <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                <FaFire className="text-red-600 text-xl" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">
              {problems.filter(p => p.isHot).length}
            </p>
          </motion.div>
        </motion.div>
        
        {/* Search and Filter Section */}
        <motion.div 
          variants={item}
          className="mb-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
          whileHover={{ boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)" }}
        >
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <RiLightbulbFlashLine className="text-indigo-600 text-2xl" />
              Find Your Challenge
            </h2>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                >
                  <RiGridFill />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'}`}
                >
                  <RiListCheck />
                </button>
              </div>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
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
          </div>
          
          <AnimatePresence>
            {(isFilterOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <SearchFilter 
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  currentFilters={filters}
                  className="mt-6"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Results Header */}
        <motion.div 
          className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-gray-600">
            <span className="font-medium">{sortedProblems.length}</span> problem{sortedProblems.length !== 1 ? 's' : ''} found
            {searchTerm && (
              <span> for "<span className="font-medium">{searchTerm}</span>"</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select 
              value={filters.sort}
              onChange={(e) => handleFilter({ ...filters, sort: e.target.value })}
              className="bg-white border border-gray-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="newest">Newest</option>
              <option value="difficulty-asc">Difficulty (Easy first)</option>
              <option value="difficulty-desc">Difficulty (Hard first)</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </motion.div>
        
        {/* Problem Grid/List */}
        <AnimatePresence mode="wait">
          {currentProblems.length > 0 ? (
            <>
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "grid grid-cols-1 gap-4"
                }
              >
                {currentProblems.map((problem, index) => (
                  <motion.div 
                    key={problem.id} 
                    variants={item}
                    whileHover={{ 
                      y: -5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400,
                      damping: 17
                    }}
                    className="h-full"
                  >
                    <ProblemCard 
                      problem={problem} 
                      index={index}
                      layoutId={`problem-${problem.id}`}
                      viewMode={viewMode}
                      isBookmarked={bookmarkedProblems.has(problem.id)}
                      onToggleBookmark={() => toggleBookmark(problem.id)}
                      rating={ratedProblems[problem.id] || null}
                      onRate={(rating) => rateProblem(problem.id, rating)}
                      onView={() => viewProblemDetails(problem)}
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
              className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <FaSadTear className="text-6xl text-indigo-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No problems found</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find any problems matching your criteria. Try adjusting your search or filters.
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ difficulty: 'All', tag: 'All', status: 'All', sort: 'newest' });
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                >
                  Reset Filters
                </button>
                <button
                  onClick={getRandomProblem}
                  className="px-5 py-2.5 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <FaRandom />
                  Pick Random Problem
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors z-50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronDown className="rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProblemList;