import { Link } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaLockOpen, 
  FaChevronRight, 
  FaFire, 
  FaBolt, 
  FaHeart, 
  FaCode,
  FaClock,
  FaUsers,
  FaCrown,
  FaGem
} from 'react-icons/fa';
import { RiLightbulbFlashFill, RiTimeFill } from 'react-icons/ri';
import { useEffect, useState, useRef } from 'react';

const ProblemCard = ({ problem, index }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [controls]);

  // 2025 Premium Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: 10,
      scale: 0.92,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: index * 0.1,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    },
    
  };

  const difficultyColors = {
    Easy: { 
      bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50', 
      text: 'text-green-700', 
      icon: 'text-green-500',
      pulse: 'from-green-100/80 to-emerald-50/80',
      accent: 'bg-gradient-to-r from-green-400 to-emerald-500',
      border: 'border-l-4 border-green-400',
      glow: 'rgba(72, 187, 120, 0.4)'
    },
    Medium: { 
      bg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50', 
      text: 'text-amber-700', 
      icon: 'text-amber-500',
      pulse: 'from-amber-100/80 to-yellow-50/80',
      accent: 'bg-gradient-to-r from-amber-400 to-orange-500',
      border: 'border-l-4 border-amber-400',
      glow: 'rgba(245, 158, 11, 0.4)'
    },
    Hard: { 
      bg: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50', 
      text: 'text-rose-700', 
      icon: 'text-rose-500',
      pulse: 'from-rose-100/80 to-pink-50/80',
      accent: 'bg-gradient-to-r from-rose-500 to-pink-600',
      border: 'border-l-4 border-rose-500',
      glow: 'rgba(244, 63, 94, 0.4)'
    }
  };

  // Floating animation for featured badge
  const floatAnimation = {
    y: [0, -8, 0],
    rotate: [0, 5, -3, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  // Micro-interaction for tags
  const tagAnimation = {
    scale: [1, 1.15, 1],
    transition: { duration: 0.3 }
  };

  // Pulse animation for difficulty badge
  const pulseAnimation = {
    scale: [1, 1.08, 1],
    backgroundColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  // Stats with icons
  const stats = [
    { icon: <FaUsers className="text-blue-400" />, value: problem.participants || 245, label: 'Solved' },
    { icon: <RiTimeFill className="text-purple-400" />, value: problem.avgTime || '15m', label: 'Avg Time' },
    { icon: <FaCode className="text-cyan-400" />, value: problem.solutions || 32, label: 'Solutions' }
  ];

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      variants={cardVariants}
      className="relative w-full h-full group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1200 }}
    >
      {/* Premium crown badge for top problems */}
      {problem.premium && (
        <motion.div 
          className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-900 p-2 rounded-full z-20 shadow-lg"
          animate={{
            rotate: [0, 15, -10, 5, 0],
            y: [0, -5, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              repeatDelay: 2
            }
          }}
        >
          <FaCrown className="text-lg" />
        </motion.div>
      )}
      
      {/* Featured badge with advanced animation */}
      {index === 0 && (
        <motion.div 
          className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 z-10 shadow-xl"
          animate={floatAnimation}
        >
          <motion.div
            animate={{
              rotate: [0, 20, 0],
              transition: { duration: 3, repeat: Infinity }
            }}
          >
            <FaStar className="text-yellow-300" />
          </motion.div>
          <span>Featured</span>
        </motion.div>
      )}
      
      {/* Popular badge for highly rated problems */}
      {problem.rating > 4.5 && (
        <motion.div 
          className="absolute -top-4 right-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 z-10 shadow-lg"
          animate={{
            y: [0, -4, 0],
            rotate: [0, -5, 3, 0],
            transition: {
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <FaFire className="text-orange-200" />
          <span>Hot</span>
        </motion.div>
      )}
      
      {/* Animated border container */}
      <div className="relative p-0.5 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 group-hover:animate-gradient-x">
        <div 
          className={`rounded-2xl overflow-hidden h-full border border-transparent transition-all duration-300 bg-white relative`}
        >
          {/* Animated border effect */}
          <motion.div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 -z-10"
            animate={{
              backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
            }}
            transition={{
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 200%',
              filter: 'blur(8px)'
            }}
          />
          
          <div className={`h-full flex flex-col ${difficultyColors[problem.difficulty].bg} relative overflow-hidden`}>
            {/* Animated background elements */}
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div 
                    className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-pink-300/20 blur-xl"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-blue-300/15 blur-xl"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  />
                </>
              )}
            </AnimatePresence>
            
            {/* Difficulty accent bar */}
            <motion.div 
              className={`h-1 w-full ${difficultyColors[problem.difficulty].accent}`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            />
            
            <div className="p-6 h-full flex flex-col relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                    <FaClock className="mr-1.5 text-gray-400" />
                    Posted {problem.date}
                  </p>
                </div>
                
                <motion.div className="relative flex-shrink-0 ml-4">
                  <motion.span 
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      difficultyColors[problem.difficulty].text
                    } relative z-10 border border-white/30 shadow-sm`}
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    <FaLockOpen className={difficultyColors[problem.difficulty].icon} />
                    {problem.difficulty}
                  </motion.span>
                  
                  {/* Difficulty pulse effect */}
                  <motion.span 
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${difficultyColors[problem.difficulty].pulse}`}
                    animate={pulseAnimation}
                    style={{ mixBlendMode: 'overlay' }}
                  />
                </motion.div>
              </div>
              
              <p className="mt-3 text-gray-600 line-clamp-3 flex-grow leading-relaxed">
                {problem.description}
              </p>
              
              <div className="mt-5 flex flex-wrap gap-2">
                {problem.tags.slice(0, 3).map(tag => (
                  <motion.span 
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-white/90 text-gray-800 shadow-sm border border-gray-100"
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: "0 4px 12px rgba(236, 72, 153, 0.25)"
                    }}
                    whileTap={tagAnimation}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tag === "Dynamic" && <FaBolt className="mr-1.5 text-amber-500" />}
                    {tag === "Pattern" && <RiLightbulbFlashFill className="mr-1.5 text-indigo-500" />}
                    {tag === "Love" && <FaHeart className="mr-1.5 text-rose-500" />}
                    {tag}
                  </motion.span>
                ))}
                {problem.tags.length > 3 && (
                  <motion.span 
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 text-gray-500 shadow-sm border border-gray-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    +{problem.tags.length - 3}
                  </motion.span>
                )}
              </div>
              
              {/* Stats section */}
              <div className="mt-5 grid grid-cols-3 gap-3 py-3 border-y border-gray-200/60">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-1.5">
                      {stat.icon}
                      <span className="text-sm font-semibold text-gray-800">{stat.value}</span>
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-md"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {problem.id}
                  </motion.div>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(problem.rating || 4.2) ? "text-amber-500" : "text-gray-300"}
                        size={12}
                      />
                    ))}
                  </div>
                </div>
                
                <Link 
                  to={`/problems/${problem.id}`}
                  className="relative overflow-hidden"
                >
                  <motion.div
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-md"
                    whileHover={{
                      scale: 1.05,
                      background: ["linear-gradient(45deg, #ec4899, #f43f5e)", "linear-gradient(45deg, #f43f5e, #ec4899)", "linear-gradient(45deg, #ec4899, #f43f5e)"],
                      transition: { duration: 1.5, repeat: Infinity }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Solve Challenge</span>
                    <motion.div
                      animate={{
                        x: isHovered ? [0, 4, 0] : 0
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 0.3
                      }}
                    >
                      <FaChevronRight size={12} />
                    </motion.div>
                  </motion.div>
                  
                  {/* Button shine effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "100%", opacity: 0.7 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-pink-400/40"
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 100 - 50 + '%',
                  y: Math.random() * 100 - 50 + '%'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.random() * 100 - 50 + '%',
                  y: Math.random() * 100 - 150 + '%'
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
                style={{
                  filter: 'blur(4px)'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProblemCard;