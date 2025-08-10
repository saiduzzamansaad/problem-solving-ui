import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaUsers, FaChartLine, FaHandsHelping, FaGraduationCap } from 'react-icons/fa';
import { FiTarget, FiAward, FiClock } from 'react-icons/fi';

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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 0.6
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

const About = () => {
  const features = [
    {
      icon: <FaCode className="text-3xl text-pink-600" />,
      title: "Comprehensive Collection",
      description: "300+ curated problems covering all major topics from arrays to dynamic programming"
    },
    {
      icon: <FaLightbulb className="text-3xl text-pink-600" />,
      title: "Optimal Solutions",
      description: "Multiple approaches with detailed time/space complexity analysis"
    },
    {
      icon: <FaChartLine className="text-3xl text-pink-600" />,
      title: "Difficulty Levels",
      description: "Problems categorized by difficulty to match your skill progression"
    },
    {
      icon: <FaUsers className="text-3xl text-pink-600" />,
      title: "Community Solutions",
      description: "See how others solved the same problem differently"
    },
    {
      icon: <FaHandsHelping className="text-3xl text-pink-600" />,
      title: "Interview Preparation",
      description: "Mock interviews and real interview questions from top companies"
    },
    {
      icon: <FaGraduationCap className="text-3xl text-pink-600" />,
      title: "Learning Paths",
      description: "Structured roadmaps for different career tracks"
    }
  ];

  const stats = [
    { value: "300+", label: "Coding Problems", icon: <FiTarget /> },
    { value: "85%", label: "Success Rate", icon: <FiAward /> },
    { value: "40hrs", label: "Average Prep Time", icon: <FiClock /> }
  ];

  const problemTypes = [
    {
      title: "Algorithmic Problems",
      description: "Master sorting, searching, graph traversal, and optimization techniques",
      examples: ["Binary Search", "Dijkstra's Algorithm", "Dynamic Programming"]
    },
    {
      title: "Data Structure Challenges",
      description: "Deep dive into arrays, linked lists, trees, graphs, and hash tables",
      examples: ["LRU Cache", "Binary Tree Traversal", "Trie Implementation"]
    },
    {
      title: "System Design",
      description: "Learn to design scalable systems with tradeoff analysis",
      examples: ["Design Twitter", "TinyURL", "Rate Limiter"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="text-center mb-16 md:mb-24"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-pink-700 bg-pink-100 rounded-full">
            Master Problem Solving
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Elevate Your <span className="text-pink-600">Technical Interview</span> Skills
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          ProblemSolver is the ultimate platform for developers preparing for technical interviews at FAANG and top tech companies.
        </motion.p>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-pink-50 to-white p-8 md:p-12 rounded-2xl shadow-sm border border-pink-100"
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.1)" }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-6 text-lg">
                We're on a mission to democratize technical interview preparation. ProblemSolver was created by engineers who struggled with the interview process and wanted to build a better way to prepare.
              </p>
              <p className="text-gray-700 mb-6 text-lg">
                Our platform provides the structured practice and detailed explanations that most developers need but can't find in a single resource.
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-6 text-lg">
                We believe that understanding the thought process behind solving a problem is more valuable than memorizing solutions. That's why we focus on teaching problem-solving patterns rather than specific answers.
              </p>
              <p className="text-gray-700 text-lg">
                Whether you're a beginner or experienced engineer, we'll help you develop the skills and confidence to ace your interviews.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-bold text-pink-600 mb-2 flex justify-center items-center gap-2">
                {stat.icon}
                {stat.value}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{stat.label}</h3>
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
        className="mb-16 md:mb-24"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ProblemSolver?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is designed specifically for technical interview preparation with features you won't find elsewhere.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-pink-200 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Problem Types Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Master All Problem Types</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We cover the full spectrum of technical interview questions you'll encounter.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {problemTypes.map((type, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Example Problems:</h4>
                <ul className="space-y-2">
                  {type.examples.map((example, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-pink-600 mr-2">•</span>
                      <span className="text-gray-700">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="bg-gradient-to-r from-pink-600 to-pink-500 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Coding Interviews?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-pink-100">
            Join thousands of developers who improved their problem-solving skills with ProblemSolver.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/problems"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-bold rounded-md bg-white text-pink-600 hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl"
            >
              Start Solving Now
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;