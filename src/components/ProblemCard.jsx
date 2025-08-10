import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FaStar, FaLockOpen, FaChevronRight, FaFire, FaBolt, FaHeart } from 'react-icons/fa';
import { RiLightbulbFlashFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';

const ProblemCard = ({ problem, index }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    const card = document.querySelector(`#card-${problem.id}`);
    if (card) observer.observe(card);

    return () => {
      if (card) observer.unobserve(card);
    };
  }, [controls, problem.id]);

  // 2025 Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 15,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: index * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.5
      }
    },
    hover: {
      y: -8,
      rotateX: -2,
      boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.3)",
      transition: { 
        type: "spring", 
        stiffness: 400,
        damping: 15
      }
    }
  };

  const difficultyColors = {
    Easy: { 
      bg: 'bg-gradient-to-br from-green-100 to-emerald-50', 
      text: 'text-green-800', 
      icon: 'text-green-500',
      pulse: 'from-green-100/80 to-emerald-50/80'
    },
    Medium: { 
      bg: 'bg-gradient-to-br from-amber-100 to-yellow-50', 
      text: 'text-amber-800', 
      icon: 'text-amber-500',
      pulse: 'from-amber-100/80 to-yellow-50/80'
    },
    Hard: { 
      bg: 'bg-gradient-to-br from-rose-100 to-pink-50', 
      text: 'text-rose-800', 
      icon: 'text-rose-500',
      pulse: 'from-rose-100/80 to-pink-50/80'
    }
  };

  // Dynamic glow effect based on difficulty
  const difficultyGlow = {
    Easy: 'hover:shadow-green-200/30',
    Medium: 'hover:shadow-amber-200/30',
    Hard: 'hover:shadow-rose-200/30'
  };

  // Floating animation for featured badge
  const floatAnimation = {
    y: [0, -5, 0],
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
    scale: [1, 1.1, 1],
    transition: { duration: 0.3 }
  };

  // Pulse animation for difficulty badge
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    backgroundColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  };

  return (
    <motion.div
      id={`card-${problem.id}`}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      variants={cardVariants}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      {/* Featured badge with advanced animation */}
      {index === 0 && (
        <motion.div 
          className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 shadow-lg"
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
          className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 shadow-lg"
          animate={{
            y: [0, -3, 0],
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
      
      <Link 
        to={`/problems/${problem.id}`}
        className={`block rounded-xl overflow-hidden h-full border border-gray-100/50 ${difficultyGlow[problem.difficulty]} transition-all duration-300`}
      >
        <div className={`h-full flex flex-col ${difficultyColors[problem.difficulty].bg} relative overflow-hidden`}>
          {/* Animated background elements */}
          {isHovered && (
            <>
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-pink-300/20 blur-xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 0.5 }}
              />
            </>
          )}
          
          <div className="p-6 h-full flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                {problem.title}
              </h3>
              
              <motion.div className="relative">
                <motion.span 
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    difficultyColors[problem.difficulty].text
                  } relative z-10 border border-white/20`}
                  whileHover={{ scale: 1.05 }}
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
            
            <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">
              {problem.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {problem.tags.slice(0, 3).map(tag => (
                <motion.span 
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow-sm border border-gray-100"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 2px 8px rgba(236, 72, 153, 0.2)"
                  }}
                  whileTap={tagAnimation}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tag === "Dynamic" && <FaBolt className="mr-1 text-amber-500" />}
                  {tag === "Pattern" && <RiLightbulbFlashFill className="mr-1 text-indigo-500" />}
                  {tag === "Love" && <FaHeart className="mr-1 text-rose-500" />}
                  {tag}
                </motion.span>
              ))}
              {problem.tags.length > 3 && (
                <motion.span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-500 shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.05 }}
                >
                  +{problem.tags.length - 3}
                </motion.span>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-200/50">
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {problem.id}
                </motion.div>
                <span className="text-xs text-gray-500 font-medium">
                  {problem.date}
                </span>
              </div>
              
              <motion.div
                className="flex items-center gap-1 text-pink-600"
                animate={{
                  x: isHovered ? [0, 3, 0] : 0
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              >
                <span className="text-xs font-medium">Solve</span>
                <FaChevronRight />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProblemCard;