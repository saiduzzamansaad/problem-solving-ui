import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';

const Footer = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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

  const waveVariants = {
    animate: {
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-pink-100 dark:border-gray-700 mt-12 relative overflow-hidden"
    >
      {/* Gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-pink-200 dark:bg-pink-900 opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            transition: {
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
        />
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-200 dark:bg-indigo-900 opacity-10"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="md:flex md:items-center md:justify-between">
          {/* Social links with floating animation */}
          <motion.div 
            variants={containerVariants}
            className="flex justify-center md:order-2 space-x-8"
          >
            <motion.a 
              href="https://github.com" 
              className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                className="absolute -inset-1 bg-pink-100 dark:bg-pink-900 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"
              />
              <motion.div
                variants={floatVariants}
                animate="animate"
              >
                <FaGithub className="h-6 w-6" />
              </motion.div>
            </motion.a>

            <motion.a 
              href="https://linkedin.com" 
              className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                className="absolute -inset-1 bg-pink-100 dark:bg-pink-900 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"
              />
              <motion.div
                variants={floatVariants}
                animate="animate"
                style={{ transitionDelay: "0.2s" }}
              >
                <FaLinkedin className="h-6 w-6" />
              </motion.div>
            </motion.a>

            <motion.a 
              href="https://twitter.com" 
              className="text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 relative"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                className="absolute -inset-1 bg-pink-100 dark:bg-pink-900 rounded-full opacity-0 hover:opacity-30 transition-opacity duration-300"
              />
              <motion.div
                variants={floatVariants}
                animate="animate"
                style={{ transitionDelay: "0.4s" }}
              >
                <FaTwitter className="h-6 w-6" />
              </motion.div>
            </motion.a>
          </motion.div>

          {/* Copyright text with wave animation */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 md:mt-0 md:order-1"
          >
            <motion.p 
              className="text-center text-base text-gray-500 dark:text-gray-400 flex items-center justify-center"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              &copy; {new Date().getFullYear()} 
              <motion.span 
                className="mx-1 text-pink-600 dark:text-pink-400 font-semibold inline-block"
                variants={waveVariants}
                animate="animate"
              >
                ProblemSolver
              </motion.span>
              . All rights reserved.
            </motion.p>
            
            {/* Made with love */}
            <motion.div
              className="flex items-center justify-center mt-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.8 }
              }}
            >
              Made with 
              <motion.span 
                className="mx-1 text-pink-600 dark:text-pink-400"
                variants={pulseVariants}
                animate="animate"
              >
                <FaHeart className="inline" />
              </motion.span> 
              by developers Md.Saiduzzaman Saad
            </motion.div>
          </motion.div>
        </div>

        {/* Additional links with staggered animation */}
        <motion.div 
          variants={containerVariants}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          <motion.a 
            href="/privacy" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="/terms" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="/contact" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            Contact Us
          </motion.a>
          <motion.a 
            href="/faq" 
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            FAQ
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;