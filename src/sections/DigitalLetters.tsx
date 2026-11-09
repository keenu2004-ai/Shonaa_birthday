import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Feather, ChevronRight, Shuffle } from 'lucide-react';
import { loveStoryConfig } from '../config/loveStory';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Envelope } from '../components/ui/Envelope';
import { triggerHeartBurst, triggerGoldenShimmer } from '../utils/confettiUtils';

export const DigitalLetters: React.FC = () => {
  const { reasonsILoveYou, openWhen, finalLetter } = loveStoryConfig;
  const [currentReasonIndex, setCurrentReasonIndex] = useState<number>(0);
  const [isFinalLetterOpen, setIsFinalLetterOpen] = useState<boolean>(false);

  const nextReason = () => {
    triggerGoldenShimmer();
    setCurrentReasonIndex((prev) => (prev + 1) % reasonsILoveYou.length);
  };

  const handleOpenFinalLetter = () => {
    triggerHeartBurst(0.5, 0.5);
    setIsFinalLetterOpen(true);
  };

  return (
    <section id="letters" className="py-20 sm:py-28 bg-[#FAF6ED] relative paper-texture border-b border-blush-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ========================================================
            PART 1: REASONS I LOVE YOU (INTERACTIVE REVELATION)
            ======================================================== */}
        <div className="mb-24">
          <SectionHeader
            badge="Interactive Love Notes"
            title="Reasons Why I Love You"
            subtitle="Click the button to reveal another little reason why you own my heart."
          />

          <div className="max-w-xl mx-auto">
            <motion.div
              key={currentReasonIndex}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DCC9] shadow-[0_12px_35px_-8px_rgba(42,30,34,0.1)] text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-blush-100 text-burgundy flex items-center justify-center mx-auto mb-4 border border-rose-vintage/40">
                <Heart className="w-6 h-6 fill-rose-vintage text-rose-vintage" />
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-rose-vintage font-bold block mb-2">
                Reason #{reasonsILoveYou[currentReasonIndex].id} of {reasonsILoveYou.length}
              </span>

              <p className="font-handwriting text-2xl sm:text-3xl text-burgundy leading-relaxed min-h-[90px] flex items-center justify-center">
                "{reasonsILoveYou[currentReasonIndex].reason}"
              </p>

              <div className="mt-8 pt-6 border-t border-blush-100 flex items-center justify-center">
                <button
                  onClick={nextReason}
                  className="px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Reveal Another Reason</span>
                  <Shuffle className="w-4 h-4 text-champagne group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================
            PART 2: OPEN WHEN... ENVELOPES
            ======================================================== */}
        <div className="mb-24">
          <SectionHeader
            badge="Digital Envelopes"
            title="Open When..."
            subtitle="Personal handwritten notes for whenever you need a gentle reminder."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {openWhen.map((ow) => (
              <Envelope
                key={ow.id}
                triggerText={ow.trigger}
                subtitle={ow.tagline}
                title={ow.title}
                letterContent={ow.letter}
                signature={ow.signature}
                photo={ow.photo}
              />
            ))}
          </div>
        </div>

        {/* ========================================================
            PART 3: THE FINAL LETTER & CLOSING SEAL
            ======================================================== */}
        <div className="max-w-3xl mx-auto text-center pt-8">
          <SectionHeader
            badge="The Grand Birthday Message"
            title="A Personal Letter For Your Birthday"
            subtitle="Written from the quietest corner of my heart."
          />

          {/* Grand Envelope */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={handleOpenFinalLetter}
            className="cursor-pointer bg-white rounded-3xl p-8 sm:p-12 border-2 border-champagne shadow-2xl relative overflow-hidden group"
          >
            <div className="w-20 h-20 rounded-full bg-burgundy text-champagne flex items-center justify-center mx-auto mb-6 shadow-md border-2 border-champagne/40 group-hover:scale-110 transition-transform duration-300">
              <Feather className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-rose-vintage font-bold block mb-2">
              Sealed With Love • {finalLetter.date}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
              {finalLetter.title}
            </h3>

            <p className="font-serif italic text-sm text-espresso-muted mt-2">
              {finalLetter.subtitle}
            </p>

            <button
              className="mt-6 px-8 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-light text-ivory-100 font-serif font-bold text-sm shadow-md flex items-center gap-2 mx-auto"
            >
              <Mail className="w-4 h-4 text-champagne" />
              <span>{finalLetter.envelopePrompt}</span>
            </button>
          </motion.div>

          {/* Unfolded Modal for Final Letter */}
          <AnimatePresence>
            {isFinalLetterOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsFinalLetterOpen(false)}
                  className="fixed inset-0 bg-espresso/70 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 20 }}
                  className="relative z-10 w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-champagne max-h-[88vh] overflow-y-auto paper-texture text-left"
                >
                  <div className="border-b border-blush-200 pb-5 mb-6 text-center">
                    <Feather className="w-8 h-8 text-burgundy mx-auto mb-2" />
                    <h3 className="font-serif text-3xl font-bold text-burgundy">
                      {finalLetter.title}
                    </h3>
                    <span className="text-xs font-serif italic text-rose-vintage">
                      {finalLetter.date}
                    </span>
                  </div>

                  <div className="font-cormorant text-xl sm:text-2xl text-espresso-soft leading-relaxed space-y-4 whitespace-pre-line px-2 sm:px-4">
                    {finalLetter.content}
                  </div>

                  {/* Closing Quote */}
                  <div className="mt-8 pt-6 border-t border-blush-200 bg-blush-50/60 p-5 rounded-2xl">
                    <p className="font-handwriting text-2xl sm:text-3xl text-burgundy text-center">
                      "{finalLetter.closingQuote}"
                    </p>
                  </div>

                  <div className="mt-6 text-right px-4">
                    <p className="font-handwriting text-3xl text-burgundy">
                      {finalLetter.signature}
                    </p>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setIsFinalLetterOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-blush-100 hover:bg-blush-200 text-burgundy font-serif font-bold text-xs"
                    >
                      Fold & Close Letter
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

