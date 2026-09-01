import React, { useCallback, useRef, useState } from 'react';
import { CameraIcon, ImageIcon, RefreshCwIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from './ui/Button';

/**
 * Combined upload / drag-and-drop / camera capture surface.
 * `capture="environment"` opens the rear camera directly on mobile devices.
 */
export function ImageUploader({
  value,
  onChange,
  onAnalyze,
  analyzing = false,
  label = 'Upload or capture a leaf image',
  hint = 'JPG or PNG, up to 10 MB. A clear, well-lit close-up of a single leaf gives the most reliable demo result.',
  analyzeLabel = 'Analyze Image',
  sampleUrl,
  sampleLabel = 'Use sample image'










}: {value: string | null;onChange: (dataUrl: string | null) => void;onAnalyze: () => void;analyzing?: boolean;label?: string;hint?: string;analyzeLabel?: string;sampleUrl?: string;sampleLabel?: string;}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const readFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('That file is not an image. Upload a JPG or PNG.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('That image is larger than 10 MB. Please upload a smaller file.');
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result));
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  if (value) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-earth-200 bg-earth-900">
          <img src={value} alt="Selected crop image ready for analysis" className="mx-auto max-h-[360px] w-full object-contain" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ai" onClick={onAnalyze} loading={analyzing}>
            {analyzeLabel}
          </Button>
          <Button variant="secondary" onClick={() => cameraRef.current?.click()} disabled={analyzing}>
            <RefreshCwIcon className="h-4 w-4" aria-hidden="true" />
            Retake
          </Button>
          <Button variant="ghost" onClick={() => onChange(null)} disabled={analyzing}>
            <Trash2Icon className="h-4 w-4" aria-hidden="true" />
            Remove
          </Button>
        </div>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) readFile(file);
          }} />
        
      </div>);

  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) readFile(file);
        }}
        className={cn(
          'rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-150 ease-out',
          dragging ? 'border-leaf-500 bg-leaf-50' : 'border-earth-300 bg-earth-50/60'
        )}>
        
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-earth-200 bg-white text-leaf-700">
          <UploadCloudIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-[15px] font-semibold text-leaf-900">{label}</p>
        <p className="mx-auto mt-1 max-w-md text-[13px] leading-5 text-earth-600">{hint}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button variant="primary" onClick={() => fileRef.current?.click()}>
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Choose image
          </Button>
          <Button variant="secondary" onClick={() => cameraRef.current?.click()}>
            <CameraIcon className="h-4 w-4" aria-hidden="true" />
            Use camera
          </Button>
          {sampleUrl &&
          <Button variant="ghost" onClick={() => onChange(sampleUrl)}>
              {sampleLabel}
            </Button>
          }
        </div>
      </div>

      {error &&
      <p role="alert" className="text-[13px] font-medium text-risk-700">
          {error}
        </p>
      }

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
        }} />
      
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) readFile(file);
        }} />
      
    </div>);

}