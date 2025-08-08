import { motion } from 'framer-motion';

const LoadingSpinner = ({ variant = 'default' }) => {
  // Animation variants
  const spinnerVariants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    bounce: {
      y: [0, -20, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -15, 0],
      x: [0, 5, -5, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    fly: {
      y: [0, -30, 0],
      x: [0, 20, -20, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderSpinner = () => {
    switch(variant) {
      case 'pulse':
        return (
          <motion.div
            animate="pulse"
            variants={spinnerVariants}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"></div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        );
      case 'bounce':
        return (
          <motion.div
            animate="bounce"
            variants={spinnerVariants}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 rounded-full bg-pink-500 shadow-lg flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 border-4 border-white border-t-transparent rounded-full"
              ></motion.div>
            </div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        );
      case 'dots':
        return (
          <div className="flex flex-col items-center">
            <div className="flex space-x-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-4 w-4 bg-pink-500 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </div>
        );
      case 'float':
        return (
          <motion.div
            animate="float"
            variants={spinnerVariants}
            className="flex flex-col items-center"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="h-10 w-10 border-4 border-white border-t-transparent rounded-full"
              ></motion.div>
            </div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              Almost there...
            </motion.p>
          </motion.div>
        );
      case 'fly':
        return (
          <motion.div
            animate="fly"
            variants={spinnerVariants}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="h-16 w-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 shadow-xl flex items-center justify-center"
            >
              <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
            </motion.div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity 
              }}
            >
              Taking off...
            </motion.p>
          </motion.div>
        );
      case 'orbital':
        return (
          <div className="flex flex-col items-center">
            <div className="relative h-24 w-24">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="h-full w-full rounded-full border-2 border-gray-200 border-opacity-30"
              >
                <motion.div 
                  className="absolute top-0 left-1/2 h-4 w-4 bg-pink-500 rounded-full -mt-2 -ml-2 shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 left-1/2 h-3 w-3 bg-blue-500 rounded-full -mb-1.5 -ml-1.5 shadow-lg"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.8, 
                    repeat: Infinity,
                    delay: 0.3
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 right-0 h-2.5 w-2.5 bg-purple-500 rounded-full -mt-1.25 -mr-1.25 shadow-lg"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 0.6
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-1/2 h-6 w-6 bg-gradient-to-br from-amber-400 to-pink-500 rounded-full -mt-3 -ml-3 shadow-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <motion.p 
              className="mt-6 text-gray-600 font-medium"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                y: [0, -3, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              Orbiting...
            </motion.p>
          </div>
        );
      default:
        return (
          <motion.div
            animate="spin"
            variants={spinnerVariants}
            className="flex flex-col items-center"
          >
            <motion.div 
              className="h-16 w-16 rounded-full border-4 border-pink-100 border-t-pink-500 border-r-pink-500 shadow-lg relative"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="absolute top-0 left-1/2 h-2 w-2 bg-pink-500 rounded-full -mt-1 -ml-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-0 left-1/2 h-2 w-2 bg-pink-300 rounded-full -mb-1 -ml-1"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
            <motion.p 
              className="mt-4 text-gray-600 font-medium"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                letterSpacing: ["0px", "2px", "0px"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center py-12 min-h-[200px]">
      {renderSpinner()}
    </div>
  );
};

export default LoadingSpinner;