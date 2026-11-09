import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Clock, PartyPopper, Cake, Flame } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { calculateBirthdayCountdown, CountdownState } from '../utils/dateArithmetic';
import { SectionHeader } from '../components/ui/SectionHeader';

interface BirthdayCountdownProps {
  onTriggerCelebration: () => void;
}

export const BirthdayCountdown: React.FC<BirthdayCountdownProps> = ({ onTriggerCelebration }) => {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateBirthdayCountdown(loveStoryConfig.dates.birthdayDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const state = calculateBirthdayCountdown(loveStoryConfig.dates.birthdayDate);
      setCountdown(state);

      // Auto-trigger celebration if it just hit zero today and hasn't fired yet
      if (state.isToday) {
        const hasCelebrated = sessionStorage.getItem('birthday_celebration_triggered');
        if (!hasCelebrated) {
          sessionStorage.setItem('birthday_celebration_triggered', 'true');
          onTriggerCelebration();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onTriggerCelebration]);

  const countdownUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  return (
    <section id="countdown" className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-vintage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="The Main Event"
          title={`Counting Down To ${loveStoryConfig.names.herName}'s Birthday`}
          subtitle={`A special celebration in Asia/Kolkata timezone (${loveStoryConfig.dates.birthdayDisplay})`}
        />

        {countdown.isToday ? (
          // IT'S HER BIRTHDAY!
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-champagne shadow-2xl max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-burgundy text-champagne flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-champagne/40 animate-bounce">
              <Cake className="w-10 h-10" />
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-blush-100 text-burgundy font-serif italic text-sm mb-4">
              🎉 Today is the Grand Day!
            </span>

            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-burgundy">
              {loveStoryConfig.names.birthdayCelebrationTitle}
            </h3>

            <p className="font-handwriting text-2xl sm:text-3xl text-rose-deep mt-4 max-w-xl mx-auto">
              "The universe became so much brighter on this day. Happy Birthday, my love!"
            </p>

            <button
              onClick={onTriggerCelebration}
              className="mt-8 px-8 py-4 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <PartyPopper className="w-5 h-5 text-champagne" />
              <span>Launch Grand Birthday Fireworks Celebration!</span>
            </button>
          </motion.div>
        ) : (
          // COUNTDOWN IN PROGRESS
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {countdownUnits.map((u, i) => (
                <motion.div
                  key={u.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-blush-200 shadow-md relative overflow-hidden group hover:border-champagne transition-all"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-vintage via-champagne to-rose-vintage" />
                  <span className="font-serif text-4xl sm:text-6xl font-bold text-burgundy block">
                    {String(u.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-espresso-muted font-bold mt-2 block">
                    {u.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Test Celebration Button */}
            <div className="text-center mt-10">
              <button
                onClick={onTriggerCelebration}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-blush-50 text-burgundy border border-blush-200 text-xs font-serif italic shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-4 h-4 text-champagne" />
                <span>Preview Grand Birthday Fireworks & Photo Explosion</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
