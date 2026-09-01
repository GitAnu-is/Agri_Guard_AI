import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BrainCircuitIcon } from 'lucide-react';
import type { FeatureContribution } from '../types';
import { SHAPChart } from './SHAPChart';
import { DemoDataNotice } from './ui/Feedback';

/**
 * Standard explanation block used after every prediction: a plain-language
 * rationale, the SHAP contributions behind it, and a link to the XAI centre.
 */
export function XAIExplanation({
  question,
  explanation,
  features,
  modelUsed,
  positiveLabel,
  negativeLabel,
  detailLink = '/xai'








}: {question: string;explanation: string;features: FeatureContribution[];modelUsed: string;positiveLabel?: string;negativeLabel?: string;detailLink?: string;}) {
  return (
    <section className="rounded-xl border border-xai-200 bg-white shadow-card" aria-labelledby="xai-heading">
      <div className="flex items-start gap-3 border-b border-xai-100 bg-xai-50/70 px-5 py-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-xai-600 text-white">
          <BrainCircuitIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-xai-700">Explainable AI</p>
          <h3 id="xai-heading" className="text-[15px] font-semibold text-leaf-900">
            {question}
          </h3>
        </div>
      </div>

      <div className="grid gap-6 px-5 py-5 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">Feature importance</h4>
          <div className="mt-3">
            <SHAPChart features={features} positiveLabel={positiveLabel} negativeLabel={negativeLabel} />
          </div>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[13px] font-semibold uppercase tracking-wide text-earth-500">SHAP explanation</h4>
          <p className="mt-3 text-sm leading-6 text-earth-700">{explanation}</p>
          <dl className="mt-4 space-y-2 rounded-lg border border-earth-200 bg-earth-50 px-4 py-3 text-[13px]">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-earth-600">Model</dt>
              <dd className="text-right font-medium text-leaf-900">{modelUsed}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-earth-600">Explainer</dt>
              <dd className="text-right font-medium text-leaf-900">SHAP feature attribution</dd>
            </div>
          </dl>
          <Link
            to={detailLink}
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold text-xai-700 transition-colors duration-150 ease-out hover:text-xai-900">
            
            View detailed explanation
            <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <DemoDataNotice className="mt-4">
            Contribution values are illustrative SHAP-style attributions produced by the mock service, not attributions from a trained model.
          </DemoDataNotice>
        </div>
      </div>
    </section>);

}