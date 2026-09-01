import React from 'react';
import { PhoneCallIcon, ShieldPlusIcon } from 'lucide-react';
import type { DiseaseResult } from '../../types';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { ActionList, RecommendationCard } from '../RecommendationCard';
import { Alert } from '../ui/Feedback';
import { LinkButton } from '../ui/Button';

const orderedActions = [
'Isolate affected plants',
'Inspect surrounding plants',
'Follow appropriate disease management',
'Monitor symptoms'];


export function TreatmentPanel({ result }: {result: DiseaseResult;}) {
  return (
    <Card>
      <CardHeader
        title="Disease treatment recommendation"
        description="Management guidance for the diagnosed disease. Indicative for demonstration — confirm chemical use and dosage with an agricultural officer."
        icon={<ShieldPlusIcon className="h-4 w-4 text-leaf-600" aria-hidden="true" />} />
      
      <CardBody className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-2">
          <RecommendationCard index={1} title="Immediate action" detail={result.treatment.immediate.join('. ') + '.'} tone="risk" />
          <RecommendationCard index={2} title="Recommended management" detail={result.treatment.management.join('. ') + '.'} tone="harvest" />
          <RecommendationCard index={3} title="Prevention" detail={result.treatment.prevention.join('. ') + '.'} tone="leaf" />
          <RecommendationCard index={4} title="Monitoring" detail={result.treatment.monitoring.join('. ') + '.'} tone="sky" />
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <ActionList title="Recommended actions" items={orderedActions} tone="risk" ordered />
          <div className="rounded-xl border border-earth-200 bg-white p-4 shadow-card">
            <h4 className="text-[13px] font-semibold uppercase tracking-wide text-leaf-700">Escalation</h4>
            <p className="mt-2 text-[13px] leading-6 text-earth-700">
              Severity is {result.severity.toLowerCase()} with {result.infectedPercentage}% of leaf area affected. Diagnoses at this level should
              be confirmed in the field before any chemical intervention.
            </p>
            <LinkButton to="/settings/support" variant="secondary" className="mt-3">
              <PhoneCallIcon className="h-4 w-4" aria-hidden="true" />
              Consult an agricultural officer
            </LinkButton>
          </div>
        </div>

        <Alert variant="warning" title="Not a substitute for field inspection">
          This platform is a research decision-support tool. Treatment guidance shown here is illustrative and must be validated against
          Department of Agriculture recommendations for your district.
        </Alert>
      </CardBody>
    </Card>);

}