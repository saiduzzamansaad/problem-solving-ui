import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowRight, FaCode, FaChartLine, FaLightbulb, 
  FaUsers, FaStar, FaTrophy, FaSearch, FaClock, 
  FaLayerGroup, FaMobileAlt, FaShieldAlt, FaRegLightbulb
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
      staggerChildren: 0.2,
      delayChildren: 0.3
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
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 }
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
    duration: 2,
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
      icon: <FaCode className="text-3xl text-indigo-600" />,
      title: "Comprehensive Problem Sets",
      description: "500+ problems covering all major topics from arrays to dynamic programming with multiple solutions"
    },
    {
      icon: <FaChartLine className="text-3xl text-indigo-600" />,
      title: "Personalized Learning Path",
      description: "AI-powered recommendations based on your skill level and progress"
    },
    {
      icon: <FaLightbulb className="text-3xl text-indigo-600" />,
      title: "Optimal Solutions",
      description: "Multiple approaches with detailed time/space complexity analysis"
    },
    {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "Community Solutions",
      description: "Compare your solutions with thousands of others"
    },
    {
      icon: <FaClock className="text-3xl text-indigo-600" />,
      title: "Time Tracking",
      description: "Track your problem-solving speed and efficiency"
    },
    {
      icon: <FaSearch className="text-3xl text-indigo-600" />,
      title: "Pattern Recognition",
      description: "Learn to identify common problem patterns and techniques"
    },
    {
      icon: <FaLayerGroup className="text-3xl text-indigo-600" />,
      title: "Difficulty Levels",
      description: "Problems categorized from Easy to Hard with gradual progression"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-indigo-600" />,
      title: "Interview Preparation",
      description: "Curated lists for top tech company interview questions"
    }
  ];

  const stats = [
    { value: "1000+", label: "Coding Problems" },
    { value: "50+", label: "Problem Categories" },
    { value: "10K+", label: "Community Solutions" },
    { value: "95%", label: "Success Rate" }
  ];

  const problemCategories = [
    { name: "Arrays & Strings", count: 78, icon: "[]" },
    { name: "Linked Lists", count: 45, icon: "->" },
    { name: "Trees & Graphs", count: 92, icon: "🌲" },
    { name: "Dynamic Programming", count: 65, icon: "⚡" },
    { name: "Sorting & Searching", count: 58, icon: "🔍" },
    { name: "Recursion", count: 42, icon: "∞" }
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
          <span className="inline-block px-3 py-1 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full">
            Master Technical Interviews
          </span>
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
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Browse Problems <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Floating animated elements */}
        <motion.div 
          className="absolute -top-10 -left-10 text-yellow-400 opacity-30"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <FaStar className="text-4xl" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-5 -right-5 text-yellow-400 opacity-30"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <FaStar className="text-4xl" />
        </motion.div>
        <motion.div 
          className="absolute top-1/4 right-10 text-indigo-300 opacity-40"
          animate={pulseAnimation}
        >
          <SiLeetcode className="text-5xl" />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/3 left-8 text-indigo-300 opacity-40"
          animate={pulseAnimation}
        >
          <SiCodeforces className="text-4xl" />
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-indigo-50 p-6 rounded-xl"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
            >
              <motion.p 
                className="text-3xl font-bold text-indigo-600 mb-2"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { duration: 3, repeat: Infinity }
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
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Problems</h2>
            <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="hidden md:flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full"
          >
            <FaTrophy className="text-yellow-500" />
            <span className="font-medium">Editor's Picks</span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProblems.map((problem, index) => (
            <motion.div 
              key={problem.id} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {index === 0 && (
                <motion.div 
                  className="absolute -top-3 -right-3 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-bold z-10"
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
                  HOT
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
        className="mb-16 md:mb-24 bg-gradient-to-r from-indigo-50 to-white p-8 rounded-2xl relative overflow-hidden"
      >
        {/* Floating background elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-200 opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-indigo-200 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -10, 0],
            y: [0, 10, 0]
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
        >
          {features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all backdrop-blur-sm"
            >
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: 10 }}
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
          <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {problemCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                backgroundColor: "rgba(79, 70, 229, 0.05)",
                borderColor: "rgba(79, 70, 229, 0.2)"
              }}
              className="border rounded-lg p-4 text-center transition-all cursor-pointer"
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} problems</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Advanced Problems</h2>
              <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full"
            >
              <FaRegLightbulb className="text-yellow-300" />
              <span className="font-medium">For Experts</span>
            </motion.div>
          </div>
          <p className="text-gray-600 mt-2">Challenge yourself with these hard problems</p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {advancedProblems.map((problem, index) => (
            <motion.div 
              key={problem.id} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)"
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
        className="mb-16 md:mb-24 bg-indigo-50 rounded-2xl p-8 md:p-12"
      >
        <motion.div 
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="md:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaMobileAlt className="text-2xl text-indigo-600" />
              <span className="font-semibold text-indigo-600">MOBILE FRIENDLY</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Solve Problems On The Go</h2>
            <p className="text-gray-600 mb-6">
              Our fully responsive design means you can practice coding problems anytime, anywhere. 
              Perfect for making use of those small pockets of time throughout your day.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                <span>Fully responsive interface</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                <span>Mobile-optimized code editor</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-2">✓</span>
                <span>Offline mode for practice anywhere</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="md:w-1/2 relative"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative max-w-xs mx-auto">
              <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white p-2 rounded-3xl shadow-lg">
                <div className="bg-gray-800 rounded-2xl overflow-hidden">
                  <div className="h-8 bg-gray-900 flex items-center px-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4 text-white font-mono text-sm">
                    <div className="text-green-400">// Problem: Two Sum</div>
                    <div className="text-green-400">// Difficulty: Easy</div>
                    <div className="my-2"></div>
                    <div className="text-purple-400">function</div> <div className="text-yellow-300">twoSum</div>(<div className="text-blue-300">nums</div>, <div className="text-blue-300">target</div>) {`{`}
                    <div className="ml-4"><div className="text-purple-400">const</div> map = <div className="text-purple-400">new</div> <div className="text-blue-300">Map</div>();</div>
                    <div className="ml-4"><div className="text-purple-400">for</div> (<div className="text-purple-400">let</div> i = 0; i {'<'} nums.length; i++) {`{`}</div>
                    <div className="ml-8"><div className="text-purple-400">const</div> complement = target - nums[i];</div>
                    <div className="ml-8"><div className="text-purple-400">if</div> (map.has(complement)) {`{`}</div>
                    <div className="ml-12"><div className="text-purple-400">return</div> [map.get(complement), i];</div>
                    <div className="ml-8">{`}`}</div>
                    <div className="ml-8">map.set(nums[i], i);</div>
                    <div className="ml-4">{`}`}</div>
                    <div className="ml-4"><div className="text-purple-400">return</div> [];</div>
                    <div>{`}`}</div>
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
        className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden"
      >
        {/* Floating elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }}
          animate={{
            backgroundPosition: ['0 0', '20px 20px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
        
        <motion.div variants={itemVariants} className="relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            whileInView={{
              scale: [1, 1.02, 1],
              transition: { duration: 1 }
            }}
          >
            Ready to Master Coding Interviews?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-indigo-100"
            whileInView={{
              opacity: [0.8, 1, 0.8],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            Join thousands of developers who improved their problem-solving skills with CodeMaster.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-md bg-white text-indigo-600 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              to="/problems"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-md text-white hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Problems <FaArrowRight className="ml-3" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;