import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope,
  FaLink,
  FaCode,
  FaLaptopCode,
  FaUserTie,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeart,
  FaExternalLinkAlt,
  FaAward,
  FaMedal,
  FaTrophy,
  FaStar,
  FaCertificate
} from 'react-icons/fa';
import { SiLeetcode, SiHackerrank, SiCodechef } from 'react-icons/si';
import { IoMdSchool, IoMdRibbon } from 'react-icons/io';
import { HiSparkles, HiAcademicCap, HiBriefcase } from 'react-icons/hi';
import { BiCodeCurly, BiGitBranch } from 'react-icons/bi';
import saiduzzamansaad from '../assets/saiduzzamansaad.jpeg';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 13,
      mass: 0.5
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sample data - replace with your actual information
  const profileData = {
    name: "Saiduzzaman Saad",
    title: "Full Stack Developer & Competitive Programmer",
    location: "Dhaka, Bangladesh",
    email: "saad@example.com",
    website: "saaddev.tech",
    bio: "Passionate developer with expertise in React, Node.js, and cloud technologies. Love solving complex problems and building scalable applications. Active competitive programmer with strong problem-solving skills.",
    avatar: saiduzzamansaad,
    cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    social: {
      github: "https://github.com/saad",
      linkedin: "https://linkedin.com/in/saad",
      twitter: "https://twitter.com/saad",
      instagram: "https://instagram.com/saad",
      leetcode: "https://leetcode.com/saad",
      hackerrank: "https://hackerrank.com/saad",
      codechef: "https://codechef.com/users/saad"
    },
    skills: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "Python", level: 75, icon: "🐍" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "GraphQL", level: 75, icon: "📊" },
      { name: "Docker", level: 70, icon: "🐳" },
      { name: "Redis", level: 65, icon: "🔴" },
      { name: "Kubernetes", level: 60, icon: "⚓" }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "University of Dhaka",
        period: "2018-2022",
        description: "Specialized in Software Engineering and Algorithms",
        grade: "CGPA: 3.8/4.0"
      },
      {
        degree: "Higher Secondary Certificate",
        school: "Notre Dame College",
        period: "2015-2017",
        description: "Science Division",
        grade: "GPA: 5.0/5.0"
      }
    ],
    experience: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Inc.",
        period: "2022-Present",
        description: "Leading frontend development for enterprise applications. Built scalable microservices architecture.",
        achievements: ["Improved performance by 40%", "Led a team of 5 developers", "Implemented CI/CD pipeline"]
      },
      {
        position: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2020-2022",
        description: "Built scalable web applications using React and Node.js. Integrated third-party APIs and payment systems.",
        achievements: ["Reduced load time by 60%", "Increased user engagement by 35%"]
      }
    ],
    codingProfiles: {
      leetcode: {
        username: "saad",
        ranking: 1250,
        problemsSolved: 350,
        acceptanceRate: "85%",
        easy: 150,
        medium: 160,
        hard: 40,
        contests: 25,
        badge: "Knight"
      },
      hackerrank: {
        username: "saad",
        goldBadges: 12,
        silverBadges: 8,
        bronzeBadges: 5,
        stars: 4.5,
        skills: ["Python", "Problem Solving", "JavaScript"]
      },
      codechef: {
        username: "saad",
        rating: 1850,
        division: 2,
        stars: 4,
        globalRank: 2540,
        contests: 30
      }
    },
    achievements: [
      {
        title: "LeetCode Contest Top 100",
        issuer: "LeetCode",
        date: "2023",
        description: "Finished in top 100 in weekly contest"
      },
      {
        title: "Hackathon Winner",
        issuer: "DevFest",
        date: "2022",
        description: "Won first prize in national level hackathon"
      },
      {
        title: "CodeChef 4-star Coder",
        issuer: "CodeChef",
        date: "2022",
        description: "Achieved 4-star rating on competitive programming platform"
      }
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React and Node.js with payment integration and admin dashboard",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
        link: "https://github.com/saad/ecommerce",
        stars: 45,
        forks: 12
      },
      {
        name: "Task Management App",
        description: "Collaborative task management application with real-time updates and drag-drop interface",
        technologies: ["React", "Firebase", "Material UI", "Framer Motion"],
        link: "https://github.com/saad/taskmanager",
        stars: 32,
        forks: 8
      },
      {
        name: "Weather Dashboard",
        description: "Real-time weather forecasting application with interactive maps and notifications",
        technologies: ["React", "OpenWeather API", "Chart.js", "Leaflet"],
        link: "https://github.com/saad/weather",
        stars: 28,
        forks: 5
      }
    ],
    certifications: [
      {
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023",
        credential: "AWS-DEV-1234"
      },
      {
        title: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2022",
        credential: "GCP-4567"
      },
      {
        title: "React Developer Certification",
        issuer: "Meta",
        date: "2022",
        credential: "REACT-7890"
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-70"></div>
            <HiSparkles className="text-6xl text-white relative z-10" />
          </motion.div>
          <motion.p 
            className="text-gray-300 mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Preparing your profile...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-6 h-6 bg-indigo-500 rounded-full opacity-20"
        variants={floating}
        animate="animate"
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-10 h-10 bg-purple-500 rounded-full opacity-20"
        variants={floating}
        animate="animate"
        transition={{ delay: 1, duration: 6 }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-20 w-8 h-8 bg-pink-500 rounded-full opacity-20"
        variants={floating}
        animate="animate"
        transition={{ delay: 2, duration: 7 }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-12 h-12 bg-blue-400 rounded-full opacity-10"
        variants={pulse}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-16 w-16 h-16 bg-purple-400 rounded-full opacity-10"
        variants={pulse}
        animate="animate"
        transition={{ delay: 1 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover section with improved design */}
        <motion.div 
  className="relative rounded-3xl overflow-hidden shadow-2xl mt-8 mb-10 border border-white/10 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Background with gradient mesh */}
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>
    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
  </div>
  
  <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-600/70 via-purple-600/70 to-blue-600/70 relative overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-10"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    
    {/* Animated particles with different sizes */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute ${i % 3 === 0 ? 'w-1 h-1' : i % 3 === 1 ? 'w-2 h-2' : 'w-3 h-3'} bg-white rounded-full opacity-20`}
        initial={{ 
          x: Math.random() * 100 + '%', 
          y: Math.random() * 100 + '%',
          scale: 0
        }}
        animate={{ 
          y: [null, -30, 0],
          opacity: [0, 0.5, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 4 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 3,
          times: [0, 0.5, 1]
        }}
      />
    ))}
    
    {/* Geometric shapes - Hidden on mobile */}
    <motion.div 
      className="absolute top-10 right-10 w-10 h-10 border-2 border-white/20 rounded-lg hidden sm:block"
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
    <motion.div 
      className="absolute bottom-10 left-10 w-6 h-6 border-2 border-white/20 rounded-full hidden sm:block"
      animate={{ rotate: -360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    
    <div className="absolute bottom-6 left-6 text-white z-10 pr-4 md:pr-0">
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {profileData.name}
      </motion.h1>
      <motion.p 
        className="text-sm sm:text-base md:text-lg opacity-90 mt-1 font-light max-w-xs sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {profileData.title}
      </motion.p>
    </div>
  </div>
  
  {/* Enhanced Profile image with responsive positioning */}
  <motion.div
    className="absolute bottom-25 left-6 sm:left-8 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden z-20 shadow-2xl"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 13 }}
    whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
  >
    {/* Image container with gradient border */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 p-1 rounded-2xl">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <img 
          src={profileData.avatar} 
          alt={profileData.name}
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
    
    {/* Decorative elements - Hidden on mobile */}
    <div className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-500 rounded-full hidden sm:block"></div>
    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full hidden sm:block"></div>
  </motion.div>

  {/* Status indicator with responsive design */}
  <motion.div 
    className="absolute bottom-4 right-4 sm:right-6 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-white border border-white/10"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.4)" }}
  >
    <div className="relative">
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
    </div>
    <span className="font-medium hidden xs:inline">Available for opportunities</span>
    <span className="font-medium xs:hidden">Available</span>
  </motion.div>
  
  {/* Decorative corner elements - Hidden on mobile */}
  <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-white/10 rounded-tl-3xl hidden sm:block"></div>
  <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-r-2 border-white/10 rounded-tr-3xl hidden sm:block"></div>
  <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-l-2 border-white/10 rounded-bl-3xl hidden sm:block"></div>
  <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-white/10 rounded-br-3xl hidden sm:block"></div>
</motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-20">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              variants={item}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaUserTie className="text-indigo-400" />
                <span>Contact Information</span>
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <FaMapMarkerAlt className="text-indigo-400 mr-3" />
                  <span>{profileData.location}</span>
                </div>
                
                <div className="flex items-center text-slate-300">
                  <FaEnvelope className="text-indigo-400 mr-3" />
                  <a href={`mailto:${profileData.email}`} className="hover:text-indigo-400 transition-colors">
                    {profileData.email}
                  </a>
                </div>
                
                <div className="flex items-center text-slate-300">
                  <FaLink className="text-indigo-400 mr-3" />
                  <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                    {profileData.website}
                  </a>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">Connect with me</h3>
                <div className="flex flex-wrap gap-2">
                  <motion.a 
                    href={profileData.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors border border-gray-700"
                  >
                    <FaGithub />
                  </motion.a>
                  
                  <motion.a 
                    href={profileData.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-blue-800/70 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors border border-blue-700/50"
                  >
                    <FaLinkedin />
                  </motion.a>
                  
                  <motion.a 
                    href={profileData.social.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-amber-700/70 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors border border-amber-600/50"
                  >
                    <SiLeetcode />
                  </motion.a>

                  <motion.a 
                    href={profileData.social.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-green-800/70 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors border border-green-700/50"
                  >
                    <SiHackerrank />
                  </motion.a>
                  
                  <motion.a 
                    href={profileData.social.codechef}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-orange-800/70 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors border border-orange-700/50"
                  >
                    <SiCodechef />
                  </motion.a>
                  
                  <motion.a 
                    href={profileData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-blue-500/70 text-white rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors border border-blue-400/50"
                  >
                    <FaTwitter />
                  </motion.a>
                  
                  <motion.a 
                    href={profileData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="w-10 h-10 bg-pink-700/70 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors border border-pink-600/50"
                  >
                    <FaInstagram />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Coding Profiles Stats */}
            <motion.div 
              variants={item}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <BiCodeCurly className="text-indigo-400" />
                  <span>Coding Profiles</span>
                </h2>
                <FaCode className="text-indigo-400 text-lg" />
              </div>
              
              <div className="space-y-6">
                {/* LeetCode */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <SiLeetcode className="text-amber-500" />
                    <h3 className="font-medium text-white">LeetCode</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-400">Ranking</span>
                      <span className="text-white">#{profileData.codingProfiles.leetcode.ranking}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Solved</span>
                      <span className="text-white">{profileData.codingProfiles.leetcode.problemsSolved}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Acceptance</span>
                      <span className="text-white">{profileData.codingProfiles.leetcode.acceptanceRate}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-400">Badge</span>
                      <span className="text-amber-400">{profileData.codingProfiles.leetcode.badge}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-slate-700/50">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Easy</span>
                      <span>{profileData.codingProfiles.leetcode.easy}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${(profileData.codingProfiles.leetcode.easy / profileData.codingProfiles.leetcode.problemsSolved) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-slate-400 mb-1 mt-2">
                      <span>Medium</span>
                      <span>{profileData.codingProfiles.leetcode.medium}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-yellow-500 h-1.5 rounded-full" 
                        style={{ width: `${(profileData.codingProfiles.leetcode.medium / profileData.codingProfiles.leetcode.problemsSolved) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-slate-400 mb-1 mt-2">
                      <span>Hard</span>
                      <span>{profileData.codingProfiles.leetcode.hard}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div 
                        className="bg-red-500 h-1.5 rounded-full" 
                        style={{ width: `${(profileData.codingProfiles.leetcode.hard / profileData.codingProfiles.leetcode.problemsSolved) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <motion.a
                    href={profileData.social.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-3 w-full bg-amber-600/30 hover:bg-amber-600/40 text-amber-100 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border border-amber-500/30"
                  >
                    View Profile <FaExternalLinkAlt className="text-xs" />
                  </motion.a>
                </div>
                
                {/* HackerRank */}
                <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <SiHackerrank className="text-green-500" />
                    <h3 className="font-medium text-white">HackerRank</h3>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(profileData.codingProfiles.hackerrank.stars) ? 
                          "text-yellow-400" : "text-slate-600"
                        } 
                        size={14} 
                      />
                    ))}
                    <span className="text-white text-sm ml-2">{profileData.codingProfiles.hackerrank.stars}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex flex-col items-center">
                      <FaTrophy className="text-amber-400 mb-1" />
                      <span className="text-slate-400 text-xs">Gold</span>
                      <span className="text-white">{profileData.codingProfiles.hackerrank.goldBadges}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaTrophy className="text-gray-300 mb-1" />
                      <span className="text-slate-400 text-xs">Silver</span>
                      <span className="text-white">{profileData.codingProfiles.hackerrank.silverBadges}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaTrophy className="text-amber-700 mb-1" />
                      <span className="text-slate-400 text-xs">Bronze</span>
                      <span className="text-white">{profileData.codingProfiles.hackerrank.bronzeBadges}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {profileData.codingProfiles.hackerrank.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div 
              variants={item}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaCertificate className="text-indigo-400" />
                <span>Certifications</span>
              </h2>
              
              <div className="space-y-4">
                {profileData.certifications.map((cert, index) => (
                  <motion.div 
                    key={index}
                    className="pb-4 border-b border-slate-700/50 last:border-b-0 last:pb-0"
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="font-medium text-white text-sm">{cert.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-indigo-400 text-xs">{cert.issuer}</span>
                      <span className="text-xs text-slate-500">{cert.date}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1">{cert.credential}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio section */}
            <motion.div 
              variants={item}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <HiSparkles className="text-indigo-400" />
                <span>About Me</span>
              </h2>
              <p className="text-slate-300 leading-relaxed">{profileData.bio}</p>
            </motion.div>

            {/* Tabs navigation */}
            <motion.div 
              variants={item}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-slate-700/50 flex overflow-x-auto"
            >
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-max ${
                  activeTab === 'about' 
                    ? 'bg-indigo-600/30 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FaUserTie />
                <span>About</span>
              </button>
              
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-max ${
                  activeTab === 'skills' 
                    ? 'bg-indigo-600/30 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FaCode />
                <span>Skills</span>
              </button>
              
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-max ${
                  activeTab === 'projects' 
                    ? 'bg-indigo-600/30 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FaLaptopCode />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex-1 py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-max ${
                  activeTab === 'achievements' 
                    ? 'bg-indigo-600/30 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FaTrophy />
                <span>Achievements</span>
              </button>
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Education */}
                  <motion.div 
                    variants={item}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
                  >
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <HiAcademicCap className="text-indigo-400" />
                      Education
                    </h2>
                    
                    <div className="space-y-4">
                      {profileData.education.map((edu, index) => (
                        <motion.div 
                          key={index}
                          className="pb-4 border-b border-slate-700/50 last:border-b-0 last:pb-0"
                          whileHover={{ x: 5 }}
                        >
                          <h3 className="font-medium text-white">{edu.degree}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-indigo-400 text-sm">{edu.school}</span>
                            <span className="text-sm text-slate-500">{edu.period}</span>
                          </div>
                          <p className="text-slate-400 text-sm mt-2">{edu.description}</p>
                          <p className="text-slate-300 text-sm mt-1 font-medium">{edu.grade}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Experience */}
                  <motion.div 
                    variants={item}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
                  >
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <HiBriefcase className="text-indigo-400" />
                      Experience
                    </h2>
                    
                    <div className="space-y-4">
                      {profileData.experience.map((exp, index) => (
                        <motion.div 
                          key={index}
                          className="pb-4 border-b border-slate-700/50 last:border-b-0 last:pb-0"
                          whileHover={{ x: 5 }}
                        >
                          <h3 className="font-medium text-white">{exp.position}</h3>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-indigo-400 text-sm">{exp.company}</span>
                            <span className="text-sm text-slate-500">{exp.period}</span>
                          </div>
                          <p className="text-slate-400 text-sm mt-2">{exp.description}</p>
                          
                          <div className="mt-3">
                            <h4 className="text-slate-300 text-sm font-medium mb-1 flex items-center gap-1">
                              <IoMdRibbon className="text-amber-500" />
                              Key Achievements
                            </h4>
                            <ul className="text-slate-400 text-sm space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-indigo-400 mr-2">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    variants={item}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <FaCode className="text-indigo-400" />
                      Technical Skills
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData.skills.map((skill, index) => (
                        <motion.div 
                          key={index}
                          className="space-y-2 bg-slate-800/30 p-4 rounded-xl border border-slate-700/30"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{skill.icon}</span>
                              <span className="text-slate-200 font-medium">{skill.name}</span>
                            </div>
                            <span className="text-slate-400">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2.5">
                            <motion.div 
                              className="h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    variants={item}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <FaLaptopCode className="text-indigo-400" />
                      Featured Projects
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {profileData.projects.map((project, index) => (
                        <motion.div 
                          key={index}
                          className="border border-slate-700/50 rounded-2xl p-5 hover:border-indigo-500/30 transition-all bg-slate-800/30"
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg text-white">{project.name}</h3>
                            <div className="flex items-center gap-3 text-slate-400">
                              <div className="flex items-center gap-1 text-sm">
                                <FaStar className="text-yellow-400" />
                                <span>{project.stars}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <BiGitBranch className="text-indigo-400" />
                                <span>{project.forks}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-slate-400 mt-2 text-sm">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="px-3 py-1 bg-indigo-900/30 text-indigo-300 text-xs rounded-full border border-indigo-700/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300 gap-1 text-sm"
                          >
                            View Project <FaExternalLinkAlt className="text-xs" />
                          </motion.a>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    variants={item}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-700/50"
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                      <FaTrophy className="text-amber-400" />
                      Achievements
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileData.achievements.map((achievement, index) => (
                        <motion.div 
                          key={index}
                          className="border border-slate-700/50 rounded-2xl p-5 hover:border-amber-500/30 transition-all bg-slate-800/30"
                          whileHover={{ y: -3, rotate: 0.5 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-amber-500/10 p-2 rounded-full">
                              <FaAward className="text-amber-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-sm">{achievement.title}</h3>
                              <p className="text-slate-400 text-xs mt-1">{achievement.issuer} • {achievement.date}</p>
                              <p className="text-slate-300 text-xs mt-2">{achievement.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CodeChef Stats */}
                    <div className="mt-8 bg-slate-800/40 p-5 rounded-xl border border-slate-700/30">
                      <div className="flex items-center gap-2 mb-4">
                        <SiCodechef className="text-orange-500" />
                        <h3 className="font-medium text-white">CodeChef Stats</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-400 text-sm">Rating</span>
                          <span className="text-white font-semibold">{profileData.codingProfiles.codechef.rating}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-400 text-sm">Stars</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < profileData.codingProfiles.codechef.stars ? 
                                  "text-orange-400" : "text-slate-600"
                                } 
                                size={14} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-400 text-sm">Global Rank</span>
                          <span className="text-white font-semibold">#{profileData.codingProfiles.codechef.globalRank}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-400 text-sm">Contests</span>
                          <span className="text-white font-semibold">{profileData.codingProfiles.codechef.contests}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;