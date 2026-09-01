import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BotIcon, SendIcon, SparklesIcon, XIcon } from 'lucide-react';
import { assistantAnswers, assistantSuggestions } from '../data/mockResearch';

interface Message {
  id: number;
  from: 'user' | 'assistant';
  text: string;
}

const INTRO =
'I am AgriAI, an AI advisory assistant for this research platform. I can explain the demo predictions on your dashboard. I am not a replacement for professional agricultural advice — confirm any field action with an agricultural officer.';

/** Floating advisory assistant. Answers are drawn from the mock knowledge base. */
export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: 'assistant', text: INTRO }]);
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, open]);

  const send = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const answer =
    assistantAnswers[question] ??
    'That question is outside the demo knowledge base. Try one of the suggested questions, or open the relevant module from the sidebar to see its full demo output.';
    setMessages((prev) => [
    ...prev,
    { id: Date.now(), from: 'user', text: question },
    { id: Date.now() + 1, from: 'assistant', text: answer }]
    );
    setDraft('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-xai-600 px-4 py-3 text-sm font-semibold text-white shadow-lift transition-[background-color,transform] duration-150 ease-out hover:bg-xai-700 active:translate-y-px lg:bottom-6"
        aria-label="Open the AgriAI advisory assistant">
        
        <SparklesIcon className="h-4 w-4" aria-hidden="true" />
        Ask AgriAI
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          role="dialog"
          aria-label="AgriAI advisory assistant"
          className="fixed bottom-4 right-4 z-50 flex max-h-[78vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-lift"
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-start justify-between gap-3 border-b border-earth-200 bg-xai-50 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-xai-600 text-white">
                  <BotIcon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-leaf-900">AgriAI</p>
                  <p className="text-[11px] text-xai-800/80">AI advisory assistant · demo</p>
                </div>
              </div>
              <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded-lg p-1.5 text-earth-500 transition-colors duration-150 ease-out hover:bg-white hover:text-leaf-900">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-thin">
              {messages.map((m) =>
            <div
              key={m.id}
              className={
              m.from === 'user' ?
              'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-leaf-700 px-3.5 py-2.5 text-[13px] leading-5 text-white' :
              'max-w-[92%] rounded-2xl rounded-bl-sm bg-earth-50 px-3.5 py-2.5 text-[13px] leading-5 text-earth-800'
              }>
              
                  {m.text}
                </div>
            )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-earth-200 px-4 py-3">
              <div className="mb-2.5 flex flex-wrap gap-1.5">
                {assistantSuggestions.map((s) =>
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-earth-200 px-2.5 py-1 text-[11px] font-medium text-earth-700 transition-colors duration-150 ease-out hover:border-xai-300 hover:bg-xai-50 hover:text-xai-800">
                
                    {s}
                  </button>
              )}
              </div>
              <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}>
              
                <label htmlFor="agriai-input" className="sr-only">
                  Ask AgriAI a question
                </label>
                <input
                id="agriai-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about your crops…"
                className="h-9 flex-1 rounded-lg border border-earth-200 px-3 text-[13px] text-leaf-900 placeholder:text-earth-400 focus:border-leaf-500" />
              
                <button
                type="submit"
                aria-label="Send question"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-xai-600 text-white transition-colors duration-150 ease-out hover:bg-xai-700">
                
                  <SendIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}