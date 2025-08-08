import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaLockOpen, FaChevronRight } from 'react-icons/fa';

const ProblemCard = ({ problem, index }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.1)",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const difficultyColors = {
    Easy: { bg: 'bg-green-100', text: 'text-green-800', icon: 'text-green-500' },
    Medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'text-yellow-500' },
    Hard: { bg: 'bg-red-100', text: 'text-red-800', icon: 'text-red-500' }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="relative"
    >
      {index === 0 && (
        <motion.div 
          className="absolute -top-2 -right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10"
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
          <FaStar className="text-yellow-300" />
          <span>Featured</span>
        </motion.div>
      )}
      
      <Link 
        to={`/problems/${problem.id}`}
        className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {problem.title}
            </h3>
            <motion.span 
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                difficultyColors[problem.difficulty].bg
              } ${difficultyColors[problem.difficulty].text}`}
              whileHover={{ scale: 1.05 }}
            >
              <FaLockOpen className={difficultyColors[problem.difficulty].icon} />
              {problem.difficulty}
            </motion.span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-grow">
            {problem.description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {problem.tags.slice(0, 3).map(tag => (
              <motion.span 
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                whileHover={{ scale: 1.05 }}
              >
                {tag}
              </motion.span>
            ))}
            {problem.tags.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{problem.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">
                {problem.id}
              </div>
              <span className="text-xs text-gray-500">
                {problem.date}
              </span>
            </div>
            
            <motion.div
              className="text-pink-600"
              whileHover={{ x: 3 }}
            >
              <FaChevronRight />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProblemCard;