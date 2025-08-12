import { motion, useAnimation, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { FaCode, FaLightbulb, FaUsers, FaChartLine, FaHandsHelping, FaGraduationCap } from 'react-icons/fa';
import { FiTarget, FiAward, FiClock } from 'react-icons/fi';
import { RiBubbleChartFill } from 'react-icons/ri';

// Floating particles component
const FloatingParticles = ({ count = 30 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      color: `rgba(236, 72, 153, ${Math.random() * 0.4 + 0.1})`
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          }}
          animate={{
            y: [0, -100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient border component
const GradientBorder = ({ children }) => {
  const angle = useMotionValue(0);

  useEffect(() => {
    const animation = animate(angle, 360, {
      duration: 20,
      repeat: Infinity,
      ease: 'linear'
    });
    return animation.stop;
  }, [angle]);

  return (
    <motion.div
      style={{
        background: `conic-gradient(
          from ${angle}deg at 50% 50%,
          rgba(236, 72, 153, 0.8) 0deg,
          rgba(168, 85, 247, 0.8) 120deg,
          rgba(79, 70, 229, 0.8) 240deg,
          rgba(236, 72, 153, 0.8) 360deg
        )`
      }}
      className="p-0.5 rounded-3xl"
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const features = [
    {
      icon: <FaCode className="text-4xl" />,
      title: "Comprehensive Collection",
      description: "300+ curated problems covering all major topics from arrays to dynamic programming"
    },
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: "Optimal Solutions",
      description: "Multiple approaches with detailed time/space complexity analysis"
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Difficulty Levels",
      description: "Problems categorized by difficulty to match your skill progression"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Community Solutions",
      description: "See how others solved the same problem differently"
    },
    {
      icon: <FaHandsHelping className="text-4xl" />,
      title: "Interview Preparation",
      description: "Mock interviews and real interview questions from top companies"
    },
    {
      icon: <FaGraduationCap className="text-4xl" />,
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
    hidden: { y: 40, opacity: 0, rotateX: 15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.5
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
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

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 40px -10px rgba(236, 72, 153, 0.3)",
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden relative">
      {/* Background elements */}
      <FloatingParticles count={40} />
      
      {/* Hero Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="text-center mb-16 md:mb-24 relative z-10"
      >
        <GradientBorder>
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-2 text-sm font-semibold text-pink-700 bg-white rounded-full backdrop-blur-sm"
          >
            Master Problem Solving
          </motion.div>
        </GradientBorder>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight mt-8"
        >
          Elevate Your <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 inline-block"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          >
            Technical Interview
          </motion.span> Skills
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          ProblemSolver is the ultimate platform for developers preparing for technical interviews at FAANG and top tech companies.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <a
            href="/problems"
            className="inline-flex items-center px-8 py-4 border-2 border-pink-600 text-lg font-bold rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            Start Solving Now
          </a>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mb-16 md:mb-24 relative z-10"
      >
        <GradientBorder>
          <motion.div 
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-[calc(1.5rem-1px)]"
            whileHover={{ 
              boxShadow: "0 20px 40px -10px rgba(236, 72, 153, 0.3)",
              y: -5
            }}
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
        </GradientBorder>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mb-16 md:mb-24 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 text-center relative overflow-hidden"
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 30px -10px rgba(236, 72, 153, 0.2)"
              }}
            >
              <div className="absolute -right-6 -bottom-6 text-pink-100/30 text-8xl">
                {stat.icon}
              </div>
              <div className="text-5xl font-bold text-pink-600 mb-2 flex justify-center items-center gap-2 relative z-10">
                {stat.value}
              </div>
              <h3 className="text-lg font-medium text-gray-900 relative z-10">{stat.label}</h3>
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
        className="mb-16 md:mb-24 relative z-10"
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
              variants={featureCardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-pink-200 transition-all relative overflow-hidden"
            >
              <AnimatePresence>
                {hoveredFeature === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-50/30 to-purple-50/30 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
              
              <motion.div 
                className="mb-4 text-pink-600 relative z-10"
                animate={{
                  rotate: hoveredFeature === index ? [0, 15, -15, 0] : 0,
                  scale: hoveredFeature === index ? [1, 1.1, 1] : 1
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 relative z-10">{feature.description}</p>
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
        className="mb-16 md:mb-24 relative z-10"
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
            <GradientBorder key={index}>
              <motion.div
                variants={itemVariants}
                custom={index}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-[calc(1.5rem-1px)] h-full"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px -10px rgba(236, 72, 153, 0.2)"
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Example Problems:</h4>
                  <ul className="space-y-2">
                    {type.examples.map((example, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start"
                        whileHover={{ x: 5 }}
                      >
                        <RiBubbleChartFill className="text-pink-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{example}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </GradientBorder>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <FloatingParticles count={60} />
        </div>
        
        <motion.div
          variants={containerVariants}
          className="relative z-10 p-8 md:p-12 text-center text-white"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Coding Interviews?</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-pink-100">
              Join thousands of developers who improved their problem-solving skills with ProblemSolver.
            </p>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -5px rgba(255, 255, 255, 0.3)"
              }}
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
        </motion.div>
      </motion.section>
    </div>
  );
};

export default About;