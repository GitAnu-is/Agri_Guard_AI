import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { supportedCrops } from '../../data/mockCrops';
import { useApp } from '../../contexts/AppContext';
import type { CropName, SoilType } from '../../types';

const soilTypes: SoilType[] = ['Red Yellow Podzolic', 'Reddish Brown Latosolic', 'Alluvial', 'Sandy Loam', 'Clay Loam'];

/** Two-step first-run setup so a new account has a farm to run predictions against. */
export function ProfileSetup() {
  const navigate = useNavigate();
  const { user, activeFarm, saveFarm } = useApp();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    farmName: '',
    landSize: '2.5',
    soilType: soilTypes[0] as SoilType,
    crop: 'Banana' as CropName,
    altitude: '45'
  });

  const finish = () => {
    saveFarm({
      ...activeFarm,
      id: `FARM-${Math.floor(Math.random() * 90 + 10)}`,
      name: form.farmName || 'My Farm',
      landSizeAcres: Number(form.landSize) || 1,
      soilType: form.soilType,
      currentCrop: form.crop,
      altitudeM: Number(form.altitude) || 0,
      location: user?.location ?? activeFarm.location,
      district: user?.district ?? activeFarm.district
    });
    navigate('/dashboard', { replace: true });
  };

  return (
    <div>
      <ol className="mb-6 flex items-center gap-2 text-[12px] font-semibold">
        {['Farm basics', 'Crop & land'].map((label, i) =>
        <li key={label} className="flex items-center gap-2">
            <span
            className={
            i + 1 <= step ?
            'flex h-5 w-5 items-center justify-center rounded-full bg-leaf-700 text-[10px] text-white' :
            'flex h-5 w-5 items-center justify-center rounded-full bg-earth-100 text-[10px] text-earth-500'
            }>
            
              {i + 1 < step ? <CheckIcon className="h-3 w-3" aria-hidden="true" /> : i + 1}
            </span>
            <span className={i + 1 <= step ? 'text-leaf-900' : 'text-earth-500'}>{label}</span>
            {i === 0 && <span className="text-earth-300">→</span>}
          </li>
        )}
      </ol>

      <h1 className="text-[26px] font-bold tracking-tight text-leaf-900">Set up your profile</h1>
      <p className="mt-1.5 text-sm leading-6 text-earth-600">
        Welcome{user ? `, ${user.fullName.split(' ')[0]}` : ''}. Add your farm so crop recommendation, harvest planning and risk predictions
        have data to work with.
      </p>

      <div className="mt-6 space-y-4">
        {step === 1 ?
        <>
            <Input
            label="Farm name"
            required
            placeholder="Meewitiya Estate — Plot B"
            value={form.farmName}
            onChange={(e) => setForm({ ...form, farmName: e.target.value })} />
          
            <Input
            label="Land size"
            type="number"
            step="0.1"
            unit="acres"
            required
            value={form.landSize}
            onChange={(e) => setForm({ ...form, landSize: e.target.value })} />
          
            <Button size="lg" fullWidth onClick={() => setStep(2)}>
              Continue
            </Button>
          </> :

        <>
            <Select
            label="Soil type"
            options={soilTypes.map((s) => ({ value: s, label: s }))}
            value={form.soilType}
            onChange={(e) => setForm({ ...form, soilType: e.target.value as SoilType })} />
          
            <Select
            label="Current crop"
            options={supportedCrops.map((c) => ({ value: c, label: c }))}
            value={form.crop}
            onChange={(e) => setForm({ ...form, crop: e.target.value as CropName })}
            hint="The research scope covers Pineapple, Banana and Black Pepper." />
          
            <Input
            label="Altitude"
            type="number"
            unit="m"
            value={form.altitude}
            onChange={(e) => setForm({ ...form, altitude: e.target.value })} />
          
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button size="lg" fullWidth onClick={finish}>
                Finish setup
              </Button>
            </div>
          </>
        }
      </div>
    </div>);

}