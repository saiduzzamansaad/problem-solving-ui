import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaExternalLinkAlt, 
  FaImage, 
  FaCopy, 
  FaChevronRight, 
  FaLightbulb,
  FaArrowLeft,
  FaClock,
  FaCode,
  FaLayerGroup,
  FaStar,
  FaBookmark,
  FaShare,
  FaRegBookmark,
  FaCheckCircle,
  FaUsers
} from 'react-icons/fa';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LoadingSpinner from '../components/LoadingSpinner';
import problems from '../data/problems';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: 0.3 }
  }
};

const pulse = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    const timer = setTimeout(() => {
      const foundProblem = problems.find(p => p.id === parseInt(id));
      setProblem(foundProblem);
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          >
            <LoadingSpinner size="lg" />
          </motion.div>
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading problem details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!problem) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <motion.h1 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Problem not found
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            The problem you're looking for doesn't exist or has been moved.
          </motion.p>
          <Link to="/problems">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              whileHover={{ y: -2, boxShadow: "0 6px 12px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft />
              <span>Back to Problems</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <motion.div variants={fadeIn} className="mb-8">
          <Link to="/problems">
            <motion.div
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span>Back to Problems</span>
            </motion.div>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          variants={fadeIn} 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-3xl opacity-50"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4 relative z-10">
            <div className="flex-1">
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {problem.title}
              </motion.h1>
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={staggerContainer}
              >
                <motion.span 
                  variants={fadeIn}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <FaLayerGroup />
                  {problem.difficulty}
                </motion.span>
                {problem.tags.map((tag, index) => (
                  <motion.span 
                    key={tag}
                    variants={fadeIn}
                    custom={index}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1.5"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <FaStar className="text-blue-500" />
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={toggleBookmark}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark problem"}
              >
                {isBookmarked ? <FaBookmark className="text-blue-500" /> : <FaRegBookmark />}
              </motion.button>
              <motion.button
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share problem"
              >
                <FaShare />
              </motion.button>
              <motion.a 
                href={problem.leetcodeLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                whileHover={{ y: -3, boxShadow: "0 6px 16px rgba(79, 70, 229, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <FaExternalLinkAlt /> 
                <span>Solve on UI</span>
              </motion.a>
            </div>
          </div>

          {/* Stats row */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              whileHover={{ y: -3, backgroundColor: darkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(249, 250, 251, 1)" }}
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaClock />
                <span className="text-sm font-medium">Avg Time</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{problem.avgTime || '15m'}</span>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              whileHover={{ y: -3, backgroundColor: darkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(249, 250, 251, 1)" }}
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaCode />
                <span className="text-sm font-medium">Solutions</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{problem.solutions || 32}</span>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              whileHover={{ y: -3, backgroundColor: darkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(249, 250, 251, 1)" }}
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaUsers />
                <span className="text-sm font-medium">Solved</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{problem.participants || 245}</span>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              whileHover={{ y: -3, backgroundColor: darkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(249, 250, 251, 1)" }}
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
                <FaStar className="text-amber-500" />
                <span className="text-sm font-medium">Rating</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{problem.rating || 4.2}/5</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          variants={fadeIn}
          className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto scrollbar-hide"
        >
          {['description', 'solution', 'explanation'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 font-medium text-sm flex items-center gap-2 relative ${
                activeTab === tab 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {tab === 'description' && <FaLightbulb className={activeTab === tab ? 'text-yellow-500' : ''} />}
              {tab === 'solution' && <FaCode className={activeTab === tab ? 'text-blue-500' : ''} />}
              {tab === 'explanation' && <FaStar className={activeTab === tab ? 'text-purple-500' : ''} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8"
          >
            {activeTab === 'description' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <FaLightbulb className="text-yellow-500" />
                  Problem Description
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6 leading-relaxed">
                  {problem.description}
                </div>
                {problem.image && (
                  <motion.div 
                    className="mt-6 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                      <FaImage className="text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Visual Representation</span>
                    </div>
                    <motion.img 
                      src={problem.image} 
                      alt={problem.title}
                      className="w-full h-auto object-contain p-6"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'solution' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaCode className="text-blue-500" />
                    Solution Code
                  </h2>
                  <motion.button
                    onClick={() => copyToClipboard(problem.solution)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg text-sm font-medium"
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-green-600 dark:text-green-400"
                      >
                        <FaCheckCircle />
                        Copied!
                      </motion.span>
                    ) : (
                      <>
                        <FaCopy />
                        Copy Code
                      </>
                    )}
                  </motion.button>
                </div>
                <div ref={codeRef} className="relative">
                  <SyntaxHighlighter
                    language="javascript"
                    style={darkMode ? atomOneDark : atomOneLight}
                    customStyle={{ 
                      borderRadius: '0',
                      padding: '1.5rem',
                      margin: '0',
                      fontSize: '0.95rem',
                      background: darkMode ? '#282c34' : '#fafafa'
                    }}
                    showLineNumbers
                    wrapLines
                    lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                  >
                    {problem.solution}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            )}

            {activeTab === 'explanation' && (
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <FaStar className="text-purple-500" />
                  Explanation
                </h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
                  {problem.explanation.split('\n').map((paragraph, i) => (
                    <motion.p 
                      key={i}
                      className="mb-5 leading-relaxed"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
                {problem.image && (
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-t-xl flex items-center gap-2">
                      <FaImage className="text-gray-600 dark:text-gray-300" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Solution Visualization</span>
                    </div>
                    <motion.img 
                      src={problem.image} 
                      alt={`${problem.title} solution`}
                      className="w-full h-auto border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Complexity Analysis */}
        {problem.complexity && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div 
              variants={scaleIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 rounded-full"></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <FaClock className="text-blue-500" />
                </div>
                Time Complexity
              </h3>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {problem.complexity.time}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {problem.complexity.timeExplanation}
              </p>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-500/10 rounded-full"></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <FaLayerGroup className="text-green-500" />
                </div>
                Space Complexity
              </h3>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                {problem.complexity.space}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {problem.complexity.spaceExplanation}
              </p>
            </motion.div>
            
            <motion.div 
              variants={scaleIn}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 group relative overflow-hidden"
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-500/10 rounded-full"></div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <FaLightbulb className="text-purple-500" />
                </div>
                Approach
              </h3>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {problem.complexity.approach}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {problem.complexity.approachExplanation}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Similar Problems */}
        {problem.similarProblems && problem.similarProblems.length > 0 && (
          <motion.div 
            className="mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaChevronRight className="text-blue-500" />
              Similar Problems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problem.similarProblems.map((similar, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group"
                  whileHover={{ x: 5, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/problems/${similar.id}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                          {similar.title}
                        </h3>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          similar.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          similar.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300'
                        }`}>
                          {similar.difficulty}
                        </span>
                      </div>
                      <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors mt-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProblemDetail;