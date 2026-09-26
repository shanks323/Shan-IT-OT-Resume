import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, RotateCcw, Check, Trash2, Camera, ExternalLink } from 'lucide-react';
import { ResumeData, initialResumeData } from '../data/resumeData';

interface Props {
  avatarUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newUrl: string) => void;
}

export const PhotoEditorModal: React.FC<Props> = ({ avatarUrl, isOpen, onClose, onSave }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(avatarUrl);
  const [urlInput, setUrlInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image file size should be less than 5MB.');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCurrentUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setCurrentUrl(urlInput.trim());
    setUrlInput('');
    setErrorMsg('');
  };

  const handleResetToDefault = () => {
    setCurrentUrl(initialResumeData.avatarUrl);
    setErrorMsg('');
  };

  const handleRemovePhoto = () => {
    setCurrentUrl('');
    setErrorMsg('');
  };

  const handleApply = () => {
    onSave(currentUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                Edit Self Portrait Photo
              </h2>
              <p className="text-xs text-slate-400">
                Upload your own photo or customize your professional portrait
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-200">
          {/* Live Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="relative group shrink-0">
              {currentUrl ? (
                <img
                  src={currentUrl}
                  alt="Portrait Preview"
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-blue-500/50 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 bg-slate-900">
                  <ImageIcon className="w-8 h-8 opacity-40 mb-1" />
                  <span className="text-[10px]">No Photo</span>
                </div>
              )}
              {currentUrl && (
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-rose-600 text-white hover:bg-rose-500 shadow transition-colors cursor-pointer"
                  title="Remove photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="font-semibold text-white text-sm">Portrait Preview</div>
              <p className="text-slate-400 text-xs">
                This image will appear on the resume header/sidebar when the photo toggle is turned on.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer flex items-center gap-1 text-xs"
                  title="Reset to generated default headshot"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Default Photo</span>
                </button>
              </div>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png, image/jpeg, image/webp, image/jpg"
            className="hidden"
          />

          {errorMsg && (
            <div className="p-2.5 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Paste Image URL */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">Or Paste Direct Image URL</label>
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/my-profile-headshot.jpg"
                className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer text-xs"
              >
                Load URL
              </button>
            </form>
          </div>

          {/* Pro Tips for Employer Headshots */}
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 text-slate-400 text-[11px] space-y-1">
            <span className="font-semibold text-slate-300">Recruiter Best Practices:</span>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Use a well-lit, front-facing professional headshot with a clean neutral background.</li>
              <li>Square or 1:1 aspect ratio images render with the cleanest crop.</li>
              <li>You can also toggle to <strong>"Text-Only"</strong> mode in the toolbar for conservative ATS platforms.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
