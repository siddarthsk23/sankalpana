import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef, useMemo, useEffect } from 'react';
import Contact from './Contact';

/* ─── tiny confetti-like particles for the success screen ─── */
function ConfettiParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 300 - 150,
        y: -(Math.random() * 400 + 100),
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 0.5,
        duration: Math.random() * 1.2 + 1,
        color: ['#6b2fa0', '#c2185b', '#b39ddb', '#ce93d8', '#e1bee7', '#f3e5f5'][
          Math.floor(Math.random() * 6)
        ],
        size: Math.random() * 8 + 4,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            scale: p.scale,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
          className="absolute left-1/2 top-1/2 rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}

/* ─── SVG checkmark with draw animation ─── */
function AnimatedCheckmark() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-24 h-24 mx-auto"
    >
      {/* circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />
      {/* tick */}
      <motion.path
        d="M30 52 L44 66 L72 36"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b2fa0" />
          <stop offset="50%" stopColor="#c2185b" />
          <stop offset="100%" stopColor="#b39ddb" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

/* ─── single floating input field ─── */
function FloatingField({ label, name, type = 'text', value, onChange, error, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
      }}
      custom={index}
    >
      <div className="floating-input-group">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`floating-input ${
            error ? '!border-red-400 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''
          }`}
          autoComplete="off"
        />
        <label className="floating-label">{label}</label>
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1"
          >
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── single floating select field ─── */
function FloatingSelect({ label, name, value, onChange, options, error, index }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        }),
      }}
      custom={index}
    >
      <div className="floating-input-group relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`floating-select ${
            error ? '!border-red-400 !shadow-[0_0_0_3px_rgba(239,68,68,0.08)]' : ''
          } ${value ? 'text-deep-purple-800' : 'text-deep-purple-800/40'}`}
        >
          <option value="" disabled hidden />
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <label
          className={`floating-label transition-all duration-300 ${
            value
              ? '!top-3 !text-[0.75rem] !text-brand-purple-500 !translate-y-0'
              : ''
          }`}
        >
          {label}
        </label>

        {/* custom chevron */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-deep-purple-800/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1"
          >
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTRATION SECTION
   ═══════════════════════════════════════════════════════════ */
const initialFormState = {
  fullName: '',
  clubName: '',
  zone: '',
  designation: '',
  phone: '',
  email: '',
  foodPreference: '',
  accommodation: '',
  slotType: '',
};

export default function Registration() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState(initialFormState);
  const [fileData, setFileData] = useState({ base64: '', mimeType: '', filename: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  /* ─── helpers ─── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileData({ base64: '', mimeType: '', filename: '' });
      return;
    }
    
    if (errors.paymentScreenshot) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.paymentScreenshot;
        return copy;
      });
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileData({
        base64: reader.result,
        mimeType: file.type,
        filename: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};

    // required fields
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.clubName.trim()) errs.clubName = 'Club name is required';
    if (!formData.zone.trim()) errs.zone = 'Zone is required';
    if (!formData.designation.trim()) errs.designation = 'Designation is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.foodPreference) errs.foodPreference = 'Please select a food preference';
    if (!formData.accommodation) errs.accommodation = 'Please select an option';
    if (!formData.slotType) errs.slotType = 'Please select a slot type';
    if (!fileData.base64) errs.paymentScreenshot = 'Please upload a payment confirmation screenshot';

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to the first error or the top of the form so the user knows why it didn't submit
      const formElement = document.getElementById('register');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setSubmitError('');

    const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!scriptURL || scriptURL === 'your_google_script_url_here') {
      // Fallback for development if URL is not set
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);
      return;
    }

    // Create a custom timestamp in DD/MM/YYYY format
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = now.getFullYear();
    const time = now.toLocaleTimeString('en-US', { hour12: false });
    const formattedTimestamp = `${dd}/${mm}/${yyyy} ${time}`;

    const payload = {
      ...formData,
      timestamp: formattedTimestamp,
      dateSubmitted: formattedTimestamp,
      paymentScreenshotBase64: fileData.base64,
      mimeType: fileData.mimeType,
      filename: fileData.filename,
    };

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });
      
      const result = await response.json();
      if (result.result === 'success') {
        setSubmitted(true);
      } else {
        console.error('Apps Script Error:', result.message);
        setSubmitError(`Failed to submit: ${result.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting form', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ─── stagger wrapper variants ─── */
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };

  return (
    <section
      id="register"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fafafa 0%, #f5f0fa 50%, #f3e5f5 100%)',
      }}
    >
      {/* ── ambient soft blobs ── */}
      <div
        className="soft-blob"
        style={{
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(107,47,160,0.08), transparent)',
        }}
      />
      <div
        className="soft-blob"
        style={{
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(194,24,91,0.06), transparent)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* ── heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4 leading-tight font-display">
            Register Now
          </h2>
          <p className="text-deep-purple-800/50 text-base md:text-lg max-w-md mx-auto">
            Secure your place at this landmark ceremony
          </p>
        </motion.div>

        {/* ── form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="clean-card-strong p-6 sm:p-10 md:p-12"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              /* ───────── FORM ───────── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* row 1 */}
                <FloatingField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  index={0}
                />
                <FloatingField
                  label="Club Name"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  error={errors.clubName}
                  index={1}
                />

                {/* row 2 */}
                <FloatingField
                  label="Zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  error={errors.zone}
                  index={2}
                />
                <FloatingField
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  error={errors.designation}
                  index={3}
                />

                {/* row 3 */}
                <FloatingField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  index={4}
                />
                <FloatingField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  index={5}
                />

                {/* row 4 – selects */}
                <FloatingSelect
                  label="Food Preference"
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleChange}
                  options={[
                    { value: 'veg', label: 'Veg' },
                  ]}
                  error={errors.foodPreference}
                  index={6}
                />
                <FloatingSelect
                  label="Accommodation Required"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  options={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ]}
                  error={errors.accommodation}
                  index={7}
                />

                <div className="md:col-span-2">
                  <FloatingSelect
                    label="Registration Slot"
                    name="slotType"
                    value={formData.slotType}
                    onChange={handleChange}
                    options={[
                      { value: 'Already registered in 3170 slot', label: 'Already registered in 3170 slot' },
                      { value: 'Final slot - ₹899', label: 'Final slot - ₹899' },
                    ]}
                    error={errors.slotType}
                    index={8}
                  />
                </div>

                <AnimatePresence>
                  {formData.slotType === 'Final slot - ₹899' && (
                    <motion.div 
                      className="md:col-span-2 mt-4 mb-2 overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="flex flex-col sm:flex-row gap-6 items-center relative z-10">
                        <div className="flex-shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-brand-lavender-100 flex items-center justify-center">
                          <img src="/images/qr_code1.png" alt="Payment QR Code" className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl" />
                        </div>
                        
                        <div className="flex-grow w-full space-y-4">
                          <div className="inline-block bg-white border border-brand-magenta-500/30 p-[3px] rounded-2xl shadow-sm sm:max-w-md w-full relative">
                            <div className="bg-brand-lavender-50/50 px-6 py-5 rounded-[13px] h-full flex flex-col items-center justify-center text-center gap-3">
                              <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2 text-brand-magenta-600 font-bold tracking-wider uppercase text-[11px] sm:text-xs">
                                  <span>⚡ Final Slot ⚡</span>
                                </div>
                                
                                <div className="flex items-baseline justify-center gap-2 flex-wrap leading-none mt-1">
                                  <span className="text-4xl md:text-5xl font-black text-brand-magenta-600 drop-shadow-sm">
                                    ₹899/-
                                  </span>
                                </div>
                                <span className="text-brand-purple-600 font-medium tracking-wide mt-2 text-sm sm:text-base">
                                  final slot
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-deep-purple-800/70 font-medium leading-relaxed text-left">
                            Scan the QR code to complete your payment of <strong>₹899</strong>. Please take a screenshot of your successful transaction to upload below.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div className="md:col-span-2">
                  <div className={`relative flex items-center justify-center w-full mt-2 border-2 border-dashed rounded-lg p-4 transition-colors ${errors.paymentScreenshot ? 'border-red-400 bg-red-50/50' : 'border-brand-lavender-300 hover:border-brand-purple-400 bg-brand-lavender-50/30'}`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center gap-1 text-center pointer-events-none">
                      <svg className="w-6 h-6 text-brand-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="text-sm font-medium text-deep-purple-800">
                        {fileData.filename ? fileData.filename : (formData.slotType === 'Already registered in 3170 slot' ? 'Upload 3170 Payment Screenshot' : 'Upload Payment Screenshot')}
                      </span>
                      {!fileData.filename && <span className="text-xs text-deep-purple-800/50">PNG, JPG up to 5MB</span>}
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    {errors.paymentScreenshot && (
                      <motion.p
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
                      >
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
                        </svg>
                        {errors.paymentScreenshot}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* submit – spans full width */}
                <motion.div
                  className="md:col-span-2 flex flex-col items-center pt-4"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.55, duration: 0.5 },
                    },
                  }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="primary-btn w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.04 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                  </motion.button>

                  <AnimatePresence>
                    {submitError && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-sm mt-4"
                      >
                        {submitError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.form>
            ) : (
              /* ───────── SUCCESS ───────── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative flex flex-col items-center justify-center py-16 text-center"
              >
                <ConfettiParticles />

                <AnimatedCheckmark />

                <motion.h3
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-gradient mt-8 font-display"
                >
                  Registration Successful!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-deep-purple-800/50 mt-3 max-w-sm"
                >
                  Thank you for registering. We&rsquo;ll send a confirmation to your email shortly.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(initialFormState);
                    setFileData({ base64: '', mimeType: '', filename: '' });
                  }}
                  className="mt-8 text-sm text-brand-purple-500 hover:text-brand-magenta-500 underline underline-offset-4 transition-colors"
                >
                  Submit another registration
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── trust strip ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center text-deep-purple-800/25 text-xs mt-6 flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Your information is secure and will not be shared
        </motion.p>
      </div>

      <div className="mt-16 md:mt-24 w-full">
        <Contact />
      </div>
    </section>
  );
}
