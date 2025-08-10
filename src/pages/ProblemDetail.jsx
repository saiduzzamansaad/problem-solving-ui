import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaImage, FaCopy, FaChevronRight, FaLightbulb } from 'react-icons/fa';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LoadingSpinner from '../components/LoadingSpinner';
import problems from '../data/problems';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  exit: { opacity: 0, x: 30 }
};

const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse"
  }
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProblem = problems.find(p => p.id === parseInt(id));
      setProblem(foundProblem);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <LoadingSpinner />
        </motion.div>
      </div>
    );
  }

  if (!problem) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">Problem not found</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header Section */}
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-gray-900"
              whileHover={{ x: 5 }}
            >
              {problem.title}
            </motion.h1>
            <motion.div 
              className="flex flex-wrap gap-2 mt-2"
              variants={staggerContainer}
            >
              <motion.span 
                variants={fadeIn}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {problem.difficulty}
              </motion.span>
              {problem.tags.map((tag, index) => (
                <motion.span 
                  key={tag}
                  variants={fadeIn}
                  custom={index}
                  className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
          <motion.a 
            href={problem.leetcodeLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ y: -2, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <FaExternalLinkAlt /> 
            <span>View on UI </span>
          </motion.a>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        variants={fadeIn}
        className="flex border-b border-gray-200 mb-6 overflow-x-auto"
      >
        {['description', 'solution', 'explanation'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${
              activeTab === tab 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab && (
              <motion.span
                layoutId="tabIndicator"
                className="w-2 h-2 bg-blue-600 rounded-full"
              />
            )}
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
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                Problem Description
              </h2>
              <div className="text-gray-700 whitespace-pre-line mb-6">
                {problem.description}
              </div>
              {problem.image && (
                <motion.div 
                  className="mt-6 border rounded-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-3 bg-gray-100 flex items-center gap-2">
                    <FaImage className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Visual Representation</span>
                  </div>
                  <motion.img 
                    src={problem.image} 
                    alt={problem.title}
                    className="w-full h-auto object-contain p-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'solution' && (
            <motion.div 
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Solution Code</h2>
                <motion.button
                  onClick={() => copyToClipboard(problem.solution)}
                  className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCopy />
                  {copied ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Copied!
                    </motion.span>
                  ) : 'Copy Code'}
                </motion.button>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={atomOneDark}
                customStyle={{ 
                  borderRadius: '0',
                  padding: '1rem',
                  margin: '0',
                  fontSize: '0.9rem'
                }}
                showLineNumbers
              >
                {problem.solution}
              </SyntaxHighlighter>
            </motion.div>
          )}

          {activeTab === 'explanation' && (
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaLightbulb className="text-blue-500" />
                Explanation
              </h2>
              <div className="text-gray-700 whitespace-pre-line mb-6">
                {problem.explanation.split('\n').map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className="mb-4"
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
                  viewport={{ once: true }}
                >
                  <div className="p-3 bg-gray-100 rounded-t-lg flex items-center gap-2">
                    <FaImage className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">Solution Visualization</span>
                  </div>
                  <motion.img 
                    src={problem.image} 
                    alt={`${problem.title} solution`}
                    className="w-full h-auto border border-gray-200 rounded-b-lg"
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
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            whileHover={{ y: -5 }}
          >
            <h3 className="font-medium text-gray-900 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-blue-600">
              {problem.complexity.time}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {problem.complexity.timeExplanation}
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            whileHover={{ y: -5 }}
          >
            <h3 className="font-medium text-gray-900 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">
              {problem.complexity.space}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {problem.complexity.spaceExplanation}
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            whileHover={{ y: -5 }}
          >
            <h3 className="font-medium text-gray-900 mb-2">Approach</h3>
            <div className="text-2xl font-bold text-purple-600">
              {problem.complexity.approach}
            </div>
            <p className="text-sm text-gray-600 mt-2">
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
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Problems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problem.similarProblems.map((similar, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{similar.title}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      similar.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      similar.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {similar.difficulty}
                    </span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProblemDetail;