import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaArrowRight, FaCode, FaChartLine, FaLightbulb, 
  FaUsers, FaStar, FaTrophy, FaSearch, FaClock, 
  FaLayerGroup, FaMobileAlt, FaShieldAlt, FaRegLightbulb,
  FaCheckCircle, FaFire, FaBolt, FaChevronRight, FaChevronDown,
  FaTerminal, FaHeart, FaRegHeart, FaBookOpen, FaExternalLinkAlt
} from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiHackerrank } from 'react-icons/si';
import ProblemCard from '../components/ProblemCard';
import problems from '../data/problems';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      mass: 0.5
    }
  }
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1]
    }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

const scrollTextVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Home = () => {
  const featuredProblems = problems.slice(0, 3);
  const popularProblems = problems.slice(3, 6);
  const advancedProblems = problems.slice(6, 9);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const fullText = "Problem Solving Skills";
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Scroll animation trigger
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Comprehensive Problem Sets",
      description: "500+ problems covering all major topics from arrays to dynamic programming with multiple solutions",
      color: "text-indigo-500"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Personalized Learning Path",
      description: "AI-powered recommendations based on your skill level and progress",
      color: "text-teal-500"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Optimal Solutions",
      description: "Multiple approaches with detailed time/space complexity analysis",
      color: "text-amber-500"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Community Solutions",
      description: "Compare your solutions with thousands of others",
      color: "text-rose-500"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Time Tracking",
      description: "Track your problem-solving speed and efficiency",
      color: "text-emerald-500"
    },
    {
      icon: <FaSearch className="text-2xl" />,
      title: "Pattern Recognition",
      description: "Learn to identify common problem patterns and techniques",
      color: "text-violet-500"
    },
    {
      icon: <FaLayerGroup className="text-2xl" />,
      title: "Difficulty Levels",
      description: "Problems categorized from Easy to Hard with gradual progression",
      color: "text-sky-500"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Interview Preparation",
      description: "Curated lists for top tech company interview questions",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { value: "1000+", label: "Coding Problems", icon: <FaCode />, color: "bg-indigo-100 text-indigo-600" },
    { value: "50+", label: "Problem Categories", icon: <FaLayerGroup />, color: "bg-teal-100 text-teal-600" },
    { value: "10K+", label: "Community Solutions", icon: <FaUsers />, color: "bg-rose-100 text-rose-600" },
    { value: "95%", label: "Success Rate", icon: <FaCheckCircle />, color: "bg-emerald-100 text-emerald-600" }
  ];

  const problemCategories = [
    { 
      name: "Arrays & Strings", 
      count: 78, 
      icon: "[]", 
      difficulty: "Easy-Medium",
      subcategories: ["Two Pointers", "Sliding Window", "Prefix Sum"]
    },
    { 
      name: "Linked Lists", 
      count: 45, 
      icon: "->", 
      difficulty: "Medium",
      subcategories: ["Reversal", "Fast/Slow Pointer", "Merge Lists"]
    },
    { 
      name: "Trees & Graphs", 
      count: 92, 
      icon: "🌲", 
      difficulty: "Medium-Hard",
      subcategories: ["DFS", "BFS", "Topological Sort", "Union Find"]
    },
    { 
      name: "Dynamic Programming", 
      count: 65, 
      icon: "⚡", 
      difficulty: "Hard",
      subcategories: ["Memoization", "Tabulation", "State Machine"]
    },
    { 
      name: "Sorting & Searching", 
      count: 58, 
      icon: "🔍", 
      difficulty: "Easy-Medium",
      subcategories: ["Binary Search", "Quickselect", "Heaps"]
    },
    { 
      name: "Recursion", 
      count: 42, 
      icon: "∞", 
      difficulty: "Medium",
      subcategories: ["Backtracking", "Divide & Conquer", "Memoization"]
    }
  ];

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-16 md:mb-24 relative"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBolt className="mr-2 text-amber-500" />
            Master Technical Interviews
          </motion.span>
        </motion.div>
        
        <div className="relative inline-block">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Sharpen Your <span className="text-indigo-600 relative">
              {displayText}
              <motion.span
                variants={cursorVariants}
                animate="blinking"
                className="absolute -right-3 w-1 h-10 bg-indigo-600 inline-block"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              />
            </span>
          </motion.h1>
        </div>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          A comprehensive platform with 1000+ coding problems, detailed solutions, and interactive learning tools to help you ace your technical interviews.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/problems"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Browse Problems <FaArrowRight className="ml-3" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 border border-indigo-600 text-base font-medium rounded-xl shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute -top-10 -left-10 text-amber-400 opacity-20"
          animate={floatingAnimation}
        >
          <FaStar className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-5 -right-5 text-indigo-400 opacity-20"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }}
        >
          <FaStar className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute top-1/4 right-10 text-indigo-300 opacity-30"
          animate={pulseAnimation}
        >
          <SiLeetcode className="text-6xl" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-8 text-indigo-300 opacity-30"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 0.5 }
          }}
        >
          <SiCodeforces className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute top-1/3 left-1/4 text-teal-300 opacity-30"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 0.8 }
          }}
        >
          <SiHackerrank className="text-4xl" />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 ${stat.color}`}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                scale: 1.03
              }}
            >
              <div className="flex justify-center mb-3">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {stat.icon}
                </motion.div>
              </div>
              <motion.p 
                className="text-3xl font-bold mb-2"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 4, repeat: Infinity }
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-current opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-16 md:mb-24 relative"
      >
        <motion.div 
          variants={itemVariants} 
          className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Problems</h2>
            <p className="text-gray-600">Hand-picked problems to get you started</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-md"
          >
            <FaTrophy className="text-amber-300" />
            <span className="font-medium">Editor's Picks</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProblems.map((problem, index) => (
            <motion.div 
              key={problem.id} 
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 30px -5px rgba(79, 70, 229, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {index === 0 && (
                <motion.div 
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <FaFire className="mr-1" /> HOT
                </motion.div>
              )}
              <ProblemCard problem={problem} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24 bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden border border-gray-100 shadow-sm"
      >
        {/* Floating background elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-100 opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 15, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div variants={itemVariants} className="text-center mb-12 relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CodeMaster?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform provides everything you need to master technical interviews and become a better problem solver.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
              }}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all group"
            >
              <motion.div 
                className={`mb-4 flex items-center justify-center w-14 h-14 rounded-lg ${feature.color.replace('text', 'bg')} bg-opacity-20 group-hover:bg-opacity-30 transition-colors`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Problem Categories */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Problem Categories</h2>
          <p className="text-gray-600">Explore problems by category and difficulty</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problemCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                backgroundColor: "rgba(79, 70, 229, 0.03)",
                borderColor: "rgba(79, 70, 229, 0.3)"
              }}
              className="border rounded-xl p-6 transition-all cursor-pointer group"
              onClick={() => toggleCategory(index)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-indigo-600">{category.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-indigo-100 text-indigo-800 mb-3">
                    {category.difficulty}
                  </span>
                </div>
                <div className="text-gray-400 group-hover:text-indigo-500 transition-colors">
                  {expandedCategory === index ? <FaChevronDown /> : <FaChevronRight />}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{category.count} problems</p>
              
              <AnimatePresence>
                {expandedCategory === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Subcategories:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((sub, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Popular Problems */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24 bg-gradient-to-br from-amber-50 to-white rounded-3xl p-8 md:p-12"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Problems</h2>
              <p className="text-gray-600">Most attempted problems by our community</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 py-3 rounded-xl shadow-md"
            >
              <FaFire className="text-yellow-300" />
              <span className="font-medium">Trending Now</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {popularProblems.map((problem, index) => (
            <motion.div 
              key={problem.id} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <ProblemCard problem={problem} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Advanced Problems */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Problems</h2>
              <p className="text-gray-600">Challenge yourself with these expert-level problems</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 rounded-xl shadow-md"
            >
              <FaRegLightbulb className="text-yellow-300" />
              <span className="font-medium">For Experts</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {advancedProblems.map((problem, index) => (
            <motion.div 
              key={problem.id} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <ProblemCard problem={problem} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Mobile Experience Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24 bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 md:p-12 overflow-hidden"
      >
        <motion.div 
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-600">
                <FaMobileAlt className="text-xl" />
              </div>
              <span className="font-semibold text-indigo-600">MOBILE FRIENDLY</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solve Problems On The Go</h2>
            <p className="text-gray-600 mb-6">
              Our fully responsive design means you can practice coding problems anytime, anywhere. 
              Perfect for making use of those small pockets of time throughout your day.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">
                  <FaCheckCircle />
                </span>
                <span className="text-gray-700">Fully responsive interface</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">
                  <FaCheckCircle />
                </span>
                <span className="text-gray-700">Mobile-optimized code editor</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-3 mt-1">
                  <FaCheckCircle />
                </span>
                <span className="text-gray-700">Offline mode for practice anywhere</span>
              </li>
            </ul>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/mobile"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
              >
                Learn about mobile features <FaArrowRight className="ml-3" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="md:w-1/2 relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative max-w-xs mx-auto">
              <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-2 -z-10"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-xl border border-gray-200">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <div className="h-10 bg-gray-800 flex items-center px-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-gray-400">main.py</div>
                  </div>
                  <div className="p-4 text-gray-300 font-mono text-sm">
                    <div className="text-emerald-400"># Problem: Two Sum</div>
                    <div className="text-emerald-400"># Difficulty: Easy</div>
                    <div className="my-2"></div>
                    <div className="text-purple-400">def</div> <div className="text-yellow-300">two_sum</div>(<div className="text-blue-300">nums</div>, <div className="text-blue-300">target</div>):<br />
                    <div className="ml-4"><div className="text-purple-400">hash_map</div> = {}</div>
                    <div className="ml-4"><div className="text-purple-400">for</div> i, num <div className="text-purple-400">in</div> <div className="text-blue-300">enumerate</div>(nums):</div>
                    <div className="ml-8"><div className="text-purple-400">complement</div> = target - num</div>
                    <div className="ml-8"><div className="text-purple-400">if</div> complement <div className="text-purple-400">in</div> hash_map:</div>
                    <div className="ml-12"><div className="text-purple-400">return</div> [hash_map[complement], i]</div>
                    <div className="ml-8">hash_map[num] = i</div>
                    <div className="ml-4"><div className="text-purple-400">return</div> []</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl"
      >
        {/* Floating elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
          animate={{
            backgroundPosition: ['0 0', '30px 30px']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        <motion.div variants={itemVariants} className="relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            whileInView={{
              scale: [1, 1.02, 1],
              transition: { duration: 1 }
            }}
          >
            Ready to Master Coding Interviews?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto text-indigo-100"
          >
            Join thousands of developers who improved their problem-solving skills with CodeMaster.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/problems"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-xl text-white hover:bg-indigo-800 transition-all shadow-lg hover:shadow-xl"
              >
                Browse Problems <FaArrowRight className="ml-3" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;