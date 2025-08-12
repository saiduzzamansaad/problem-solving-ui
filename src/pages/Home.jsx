import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowRight, FaCode, FaChartLine, FaLightbulb, 
  FaUsers, FaStar, FaTrophy, FaSearch, FaClock, 
  FaLayerGroup, FaMobileAlt, FaShieldAlt, FaRegLightbulb,
  FaCheckCircle, FaFire, FaBolt, FaChevronRight
} from 'react-icons/fa';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 8
    }
  }
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
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
    duration: 2.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut"
  }
};

const Home = () => {
  const featuredProblems = problems.slice(0, 3);
  const popularProblems = problems.slice(3, 6);
  const advancedProblems = problems.slice(6, 9);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Problem Solving Skills";

  const features = [
    {
      icon: <FaCode className="text-2xl text-blue-500" />,
      title: "Comprehensive Problem Sets",
      description: "500+ problems covering all major topics from arrays to dynamic programming with multiple solutions"
    },
    {
      icon: <FaChartLine className="text-2xl text-blue-500" />,
      title: "Personalized Learning Path",
      description: "AI-powered recommendations based on your skill level and progress"
    },
    {
      icon: <FaLightbulb className="text-2xl text-blue-500" />,
      title: "Optimal Solutions",
      description: "Multiple approaches with detailed time/space complexity analysis"
    },
    {
      icon: <FaUsers className="text-2xl text-blue-500" />,
      title: "Community Solutions",
      description: "Compare your solutions with thousands of others"
    },
    {
      icon: <FaClock className="text-2xl text-blue-500" />,
      title: "Time Tracking",
      description: "Track your problem-solving speed and efficiency"
    },
    {
      icon: <FaSearch className="text-2xl text-blue-500" />,
      title: "Pattern Recognition",
      description: "Learn to identify common problem patterns and techniques"
    },
    {
      icon: <FaLayerGroup className="text-2xl text-blue-500" />,
      title: "Difficulty Levels",
      description: "Problems categorized from Easy to Hard with gradual progression"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-500" />,
      title: "Interview Preparation",
      description: "Curated lists for top tech company interview questions"
    }
  ];

  const stats = [
    { value: "1000+", label: "Coding Problems", icon: <FaCode className="text-blue-400" /> },
    { value: "50+", label: "Problem Categories", icon: <FaLayerGroup className="text-blue-400" /> },
    { value: "10K+", label: "Community Solutions", icon: <FaUsers className="text-blue-400" /> },
    { value: "95%", label: "Success Rate", icon: <FaCheckCircle className="text-blue-400" /> }
  ];

  const problemCategories = [
    { name: "Arrays & Strings", count: 78, icon: "[]", difficulty: "Easy-Medium" },
    { name: "Linked Lists", count: 45, icon: "->", difficulty: "Medium" },
    { name: "Trees & Graphs", count: 92, icon: "🌲", difficulty: "Medium-Hard" },
    { name: "Dynamic Programming", count: 65, icon: "⚡", difficulty: "Hard" },
    { name: "Sorting & Searching", count: 58, icon: "🔍", difficulty: "Easy-Medium" },
    { name: "Recursion", count: 42, icon: "∞", difficulty: "Medium" }
  ];

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
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FaBolt className="mr-2 text-yellow-500" />
            Master Technical Interviews
          </span>
        </motion.div>
        
        <div className="relative inline-block">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Sharpen Your <span className="text-blue-600 relative">
              {displayText}
              <motion.span
                variants={cursorVariants}
                animate="blinking"
                className="absolute -right-3 w-1 h-10 bg-blue-600 inline-block"
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
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Browse Problems <FaArrowRight className="ml-3" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-lg shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute -top-10 -left-10 text-yellow-400 opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <FaStar className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-5 -right-5 text-blue-400 opacity-20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <FaStar className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute top-1/4 right-10 text-blue-300 opacity-30"
          animate={pulseAnimation}
        >
          <SiLeetcode className="text-6xl" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-8 text-blue-300 opacity-30"
          animate={pulseAnimation}
        >
          <SiCodeforces className="text-5xl" />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
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
                className="text-3xl font-bold text-blue-600 mb-2"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 4, repeat: Infinity }
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Problems */}
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
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-md"
          >
            <FaTrophy className="text-yellow-300" />
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
                boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {index === 0 && (
                <motion.div 
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center"
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
        className="mb-16 md:mb-24 bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100 shadow-sm"
      >
        {/* Floating background elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-10"
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
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-200 transition-all group"
            >
              <motion.div 
                className="mb-4 flex items-center justify-center w-14 h-14 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors"
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
                backgroundColor: "rgba(59, 130, 246, 0.03)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
              className="border rounded-xl p-6 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600">{category.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mb-3">
                    {category.difficulty}
                  </span>
                </div>
                <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                  <FaChevronRight />
                </div>
              </div>
              <p className="text-sm text-gray-500">{category.count} problems</p>
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
        className="mb-16 md:mb-24 bg-gray-50 rounded-2xl p-8 md:p-12"
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Problems</h2>
              <p className="text-gray-600">Most attempted problems by our community</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-lg shadow-md"
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
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
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
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 rounded-lg shadow-md"
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
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)"
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
        className="mb-16 md:mb-24 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 overflow-hidden"
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
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <FaMobileAlt className="text-xl" />
              </div>
              <span className="font-semibold text-blue-600">MOBILE FRIENDLY</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solve Problems On The Go</h2>
            <p className="text-gray-600 mb-6">
              Our fully responsive design means you can practice coding problems anytime, anywhere. 
              Perfect for making use of those small pockets of time throughout your day.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">
                  <FaCheckCircle />
                </span>
                <span className="text-gray-700">Fully responsive interface</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">
                  <FaCheckCircle />
                </span>
                <span className="text-gray-700">Mobile-optimized code editor</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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
              <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-2 -z-10"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-xl border border-gray-200">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <div className="h-10 bg-gray-800 flex items-center px-4">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-gray-400">main.py</div>
                  </div>
                  <div className="p-4 text-gray-300 font-mono text-sm">
                    <div className="text-green-400"># Problem: Two Sum</div>
                    <div className="text-green-400"># Difficulty: Easy</div>
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
        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl"
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
            className="text-xl mb-8 max-w-3xl mx-auto text-blue-100"
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
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
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
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-lg text-white hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
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