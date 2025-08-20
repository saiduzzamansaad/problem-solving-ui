import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheck, 
  FaTimes, 
  FaCode, 
  FaLightbulb, 
  FaRocket, 
  FaCrown, 
  FaQuestionCircle, 
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaGraduationCap,
  FaHandshake,
  FaSync,
  FaMedal,
  FaTrophy,
  FaStar,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [annualBilling, setAnnualBilling] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const plans = {
    basic: {
      name: 'Starter',
      icon: <FaCode className="text-blue-500 text-xl" />,
      price: { monthly: 19, annual: 15 },
      description: 'Perfect for beginners starting their coding journey',
      features: [
        { text: '100 problems per month', included: true, tooltip: 'Access to our curated problem set' },
        { text: 'Basic solution explanations', included: true, tooltip: 'Text-based explanations for solutions' },
        { text: 'Community support', included: true, tooltip: 'Access to our community forums' },
        { text: 'Progress tracking', included: true, tooltip: 'Track your learning progress' },
        { text: '5 problem categories', included: true, tooltip: 'Access to 5 different problem categories' },
        { text: 'Video explanations', included: false, tooltip: 'Video walkthroughs for solutions' },
        { text: '1-on-1 mentor support', included: false, tooltip: 'Direct access to experienced mentors' },
        { text: 'Interview preparation', included: false, tooltip: 'Dedicated interview prep resources' },
        { text: 'Advanced challenges', included: false, tooltip: 'Complex problems for advanced users' },
        { text: 'Certificate of completion', included: false, tooltip: 'Earn certificates for completed tracks' }
      ],
      color: 'blue',
      bestFor: 'Students and hobbyists'
    },
    pro: {
      name: 'Professional',
      icon: <FaLightbulb className="text-purple-500 text-xl" />,
      price: { monthly: 49, annual: 39 },
      description: 'For serious learners building problem-solving skills',
      features: [
        { text: '500 problems per month', included: true, tooltip: 'Extended access to our problem library' },
        { text: 'Detailed solution explanations', included: true, tooltip: 'In-depth explanations with examples' },
        { text: 'Priority support', included: true, tooltip: 'Faster response times' },
        { text: 'Advanced progress analytics', included: true, tooltip: 'Detailed insights into your progress' },
        { text: 'All problem categories', included: true, tooltip: 'Access to all available categories' },
        { text: 'Video explanations', included: true, tooltip: 'Video walkthroughs for solutions' },
        { text: '2 monthly mentor sessions', included: true, tooltip: 'Two 30-minute sessions with mentors' },
        { text: 'Interview preparation', included: true, tooltip: 'Comprehensive interview prep resources' },
        { text: 'Advanced challenges', included: true, tooltip: 'Complex problems for advanced users' },
        { text: 'Certificate of completion', included: true, tooltip: 'Earn certificates for completed tracks' }
      ],
      color: 'purple',
      bestFor: 'Job seekers and career builders',
      popular: true
    },
    elite: {
      name: 'Elite',
      icon: <FaRocket className="text-orange-500 text-xl" />,
      price: { monthly: 99, annual: 79 },
      description: 'For professionals preparing for technical careers',
      features: [
        { text: 'Unlimited problems', included: true, tooltip: 'Complete access to all problems' },
        { text: 'Comprehensive explanations', included: true, tooltip: 'Detailed explanations with multiple approaches' },
        { text: '24/7 priority support', included: true, tooltip: 'Round-the-clock support' },
        { text: 'Advanced analytics & insights', included: true, tooltip: 'AI-powered insights and recommendations' },
        { text: 'All problem categories + premium', included: true, tooltip: 'Includes exclusive premium categories' },
        { text: 'HD video explanations', included: true, tooltip: 'High-quality video solutions' },
        { text: 'Weekly 1-on-1 mentor sessions', included: true, tooltip: 'Four 60-minute sessions per month' },
        { text: 'Comprehensive interview prep', included: true, tooltip: 'Mock interviews and personalized feedback' },
        { text: 'Real-world projects', included: true, tooltip: 'Work on actual industry problems' },
        { text: 'Professional certification', included: true, tooltip: 'Industry-recognized certification' }
      ],
      color: 'orange',
      bestFor: 'Professionals and career changers'
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        damping: 14
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const toggleVariants = {
    off: { x: 0, backgroundColor: '#e5e7eb' },
    on: { x: 24, backgroundColor: '#3b82f6' }
  };

  const featuresComparison = [
    { name: 'Problems per month', basic: '100', pro: '500', elite: 'Unlimited' },
    { name: 'Solution Explanations', basic: 'Basic', pro: 'Detailed', elite: 'Comprehensive' },
    { name: 'Support', basic: 'Community', pro: 'Priority', elite: '24/7 Priority' },
    { name: 'Video Explanations', basic: false, pro: true, elite: 'HD Videos' },
    { name: 'Mentor Sessions', basic: false, pro: '2 per month', elite: 'Weekly' },
    { name: 'Interview Preparation', basic: false, pro: true, elite: 'Comprehensive' },
    { name: 'Certification', basic: false, pro: 'Completion', elite: 'Professional' },
    { name: 'Real-world Projects', basic: false, pro: false, elite: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Problem-Solving <span className="text-blue-600">Mastery</span> Plans
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            Accelerate your coding journey with our structured problem-solving approach
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div className="flex justify-center items-center mb-12 bg-white p-4 rounded-xl shadow-md max-w-md mx-auto" variants={itemVariants}>
          <span className={`mr-4 font-medium ${!annualBilling ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <div 
            className="w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
            onClick={() => setAnnualBilling(!annualBilling)}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-md"
              animate={annualBilling ? "on" : "off"}
              variants={toggleVariants}
            />
          </div>
          <span className="ml-4 font-medium flex items-center">
            <span className={annualBilling ? 'text-gray-900' : 'text-gray-500'}>Annual</span>
            {annualBilling && (
              <span className="ml-2 px-2 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                20% OFF
              </span>
            )}
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
          {Object.entries(plans).map(([key, plan]) => (
            <motion.div
              key={key}
              className={`relative rounded-2xl shadow-xl overflow-hidden border-2 ${
                selectedPlan === key 
                  ? `border-${plan.color}-500 scale-105 z-10 shadow-2xl` 
                  : 'border-gray-200'
              } transition-all duration-300 bg-white flex flex-col h-full`}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPlan(key)}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-6 py-2 text-sm font-bold rounded-full shadow-lg flex items-center">
                  <FaStar className="mr-1" /> MOST POPULAR
                </div>
              )}
              
              <div className="p-6 flex-grow">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-${plan.color}-100`}>
                    {plan.icon}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{plan.bestFor}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${annualBilling ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="ml-1 text-lg font-medium text-gray-500">/month</span>
                  </div>
                  {annualBilling ? (
                    <p className="text-sm text-gray-500 mt-1">${plan.price.annual * 12} billed annually</p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
                  )}
                </div>

                <button
                  className={`mt-6 w-full py-3 px-4 rounded-lg bg-${plan.color}-500 hover:bg-${plan.color}-600 text-white font-medium transition-colors flex items-center justify-center`}
                >
                  Get Started
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6 pb-8 px-6">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-4">
                  What's included
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {feature.included ? (
                        <FaCheck className="text-green-500 flex-shrink-0 mt-1" />
                      ) : (
                        <FaTimes className="text-gray-300 flex-shrink-0 mt-1" />
                      )}
                      <span
                        className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}
                      >
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden" variants={itemVariants}>
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Plan Comparison</h2>
            <p className="text-gray-600 mt-1">See how our plans stack up against each other</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">Features</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-900">Starter</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-900">Professional</th>
                  <th className="py-4 px-6 text-center text-sm font-medium text-gray-900">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {featuresComparison.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 text-sm text-gray-900">{feature.name}</td>
                    <td className="py-4 px-6 text-center text-sm">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? <FaCheck className="text-green-500 inline" /> : <FaTimes className="text-gray-300 inline" />
                      ) : (
                        feature.basic
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-sm">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? <FaCheck className="text-green-500 inline" /> : <FaTimes className="text-gray-300 inline" />
                      ) : (
                        feature.pro
                      )}
                    </td>
                    <td className="py-4 px-6 text-center text-sm">
                      {typeof feature.elite === 'boolean' ? (
                        feature.elite ? <FaCheck className="text-green-500 inline" /> : <FaTimes className="text-gray-300 inline" />
                      ) : (
                        feature.elite
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div className="mt-20 max-w-4xl mx-auto" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, the new rate will be applied immediately. When downgrading, the change will take effect at the start of your next billing cycle."
              },
              {
                question: "Do you offer team discounts?",
                answer: "Yes, we offer special pricing for teams of 5 or more. Teams also get access to collaborative features, progress tracking for all members, and dedicated account management. Contact our sales team for more information."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 7-day free trial for all our plans. No credit card is required to start your trial. You'll get full access to all features of the selected plan during the trial period."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our encrypted payment system."
              },
              {
                question: "How often are new problems added?",
                answer: "We add new problems every week across all difficulty levels and categories. Our team of experts continuously creates new content based on current industry trends and interview patterns at top tech companies."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. After cancellation, you'll retain access until the end of your current billing period. We don't charge any cancellation fees."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  className="w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <FaQuestionCircle className="text-blue-500 mr-3" />
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4">Start Your Problem-Solving Journey Today</h2>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">Join thousands of developers who have improved their coding skills and landed their dream jobs</p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
          <p className="text-sm opacity-80 mt-4">7-day free trial • No credit card required</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingTable;