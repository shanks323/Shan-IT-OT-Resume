/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialResumeData, ResumeData } from './data/resumeData';
import { ResumeSettings, ThemeId, ColorAccent, SpacingDensity } from './types/resume';
import { TopNav } from './components/TopNav';
import { ThemeToolbar } from './components/ThemeToolbar';
import { ResumeSheet } from './components/ResumeSheet';
import { LabTopologyModal } from './components/LabTopologyModal';
import { AtsCheckerModal } from './components/AtsCheckerModal';
import { CoverLetterModal } from './components/CoverLetterModal';
import { EditorModal } from './components/EditorModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { ShareModal } from './components/ShareModal';
import { ReadOnlyBanner } from './components/ReadOnlyBanner';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Printer, 
  ShieldCheck,
  Share2
} from 'lucide-react';

const STORAGE_KEY_DATA = 'shanker_resume_data_v1';
const STORAGE_KEY_SETTINGS = 'shanker_resume_settings_v1';

export default function App() {
  // Read initial configuration from URL params if present (e.g. from shared read-only link)
  const getUrlParams = () => {
    if (typeof window === 'undefined') return { isReadOnly: false };
    const params = new URLSearchParams(window.location.search);
    const theme = params.get('theme') as ThemeId | null;
    const accent = params.get('accent') as ColorAccent | null;
    const density = params.get('density') as SpacingDensity | null;
    const photo = params.get('photo');
    const isReadOnly = params.get('mode') === 'readonly';

    return {
      theme: theme && ['modern', 'industrial', 'minimalist', 'creative'].includes(theme) ? theme : null,
      accent: accent && ['navy', 'slate', 'cyan', 'emerald', 'amber'].includes(accent) ? accent : null,
      density: density && ['compact', 'balanced', 'spacious'].includes(density) ? density : null,
      showAvatar: photo !== null ? photo === '1' : null,
      isReadOnly,
    };
  };

  const urlParams = getUrlParams();

  const [isReadOnly, setIsReadOnly] = useState<boolean>(urlParams.isReadOnly);

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading resume data from localStorage', e);
    }
    return initialResumeData;
  });

  const [settings, setSettings] = useState<ResumeSettings>(() => {
    let savedSettings: Partial<ResumeSettings> = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) savedSettings = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading settings from localStorage', e);
    }

    return {
      theme: urlParams.theme || savedSettings.theme || 'modern',
      accent: urlParams.accent || savedSettings.accent || 'navy',
      density: urlParams.density || savedSettings.density || 'compact',
      showAvatar: typeof urlParams.showAvatar === 'boolean' ? urlParams.showAvatar : (savedSettings.showAvatar ?? true),
      showTechSchematic: savedSettings.showTechSchematic ?? true,
      showCredentialsBadges: savedSettings.showCredentialsBadges ?? true,
    };
  });

  // Modals state
  const [topologyOpen, setTopologyOpen] = useState(false);
  const [atsOpen, setAtsOpen] = useState(false);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Persistence to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Error saving resume data', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings', e);
    }
  }, [settings]);

  // Keep URL in sync with currently active variation
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      params.set('theme', settings.theme);
      params.set('accent', settings.accent);
      params.set('density', settings.density);
      params.set('photo', settings.showAvatar ? '1' : '0');
      if (isReadOnly) {
        params.set('mode', 'readonly');
      } else {
        params.delete('mode');
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    } catch (e) {
      console.error('Error updating URL params', e);
    }
  }, [settings, isReadOnly]);

  const handleUpdateSettings = (newSettings: Partial<ResumeSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetData = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem(STORAGE_KEY_DATA);
  };

  const handleSavePhoto = (newAvatarUrl: string) => {
    setResumeData((prev) => ({
      ...prev,
      avatarUrl: newAvatarUrl,
    }));
  };

  const handleSelectVariation = (theme: ThemeId, accent: ColorAccent) => {
    setSettings((prev) => ({
      ...prev,
      theme,
      accent,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Read-Only Mode Banner vs Interactive Header */}
      {isReadOnly ? (
        <ReadOnlyBanner
          data={resumeData}
          settings={settings}
          onPrint={handlePrint}
          onOpenShare={() => setShareModalOpen(true)}
          onExitReadOnly={() => setIsReadOnly(false)}
          onOpenTopology={() => setTopologyOpen(true)}
        />
      ) : (
        <>
          {/* 3-Zone Top Navigation Contract */}
          <TopNav
            onOpenTopology={() => setTopologyOpen(true)}
            onOpenAts={() => setAtsOpen(true)}
            onOpenCoverLetter={() => setCoverLetterOpen(true)}
            onOpenEditor={() => setEditorOpen(true)}
            onOpenShare={() => setShareModalOpen(true)}
            onOpenPhotoModal={() => setPhotoModalOpen(true)}
            onPrint={handlePrint}
          />

          {/* Recruiter Banner & Quick Contact Links */}
          <div className="no-print bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 border-b border-slate-800/80 py-2 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Verified Credentials:
                </span>
                <span className="text-slate-300 font-medium">Google IT Support</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 font-medium">Siemens TIA Basic & Sitrain Level 1</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 font-medium">SKM Level 3</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Get Read-Only Links</span>
                </button>
                <span className="text-slate-700">|</span>
                <a
                  href={`https://wa.me/${resumeData.whatsapp?.replace(/[^0-9]/g, '') || '60129800657'}?text=Hi%20Shanker,%20I%20reviewed%20your%20IT/OT%20resume`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-slate-700">|</span>
                <a
                  href={`mailto:${resumeData.email}?subject=Job%20Opportunity%20-%20IT%20Support%20/%20IT/OT`}
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Theme & Style Toolbar */}
          <ThemeToolbar
            settings={settings}
            data={resumeData}
            onUpdateSettings={handleUpdateSettings}
            onOpenTopology={() => setTopologyOpen(true)}
            onOpenAts={() => setAtsOpen(true)}
            onOpenCoverLetter={() => setCoverLetterOpen(true)}
            onOpenEditor={() => setEditorOpen(true)}
            onOpenPhotoModal={() => setPhotoModalOpen(true)}
            onOpenShareModal={() => setShareModalOpen(true)}
            onPrint={handlePrint}
          />
        </>
      )}

      {/* Main Resume Canvas / Preview Sheet */}
      <main className="flex-1 flex flex-col items-center justify-start bg-slate-900/60 pb-16">
        <ResumeSheet
          data={resumeData}
          settings={settings}
          onOpenTopology={() => setTopologyOpen(true)}
          onOpenPhotoModal={isReadOnly ? undefined : () => setPhotoModalOpen(true)}
        />
      </main>

      {/* Sticky Bottom Quick-Bar for Recruiters (Desktop & Mobile) */}
      <div className="no-print fixed bottom-4 z-40 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 text-xs">
        <span className="hidden sm:inline font-medium text-slate-300">
          Shanker Dayallan · <span className="text-blue-400">Ready to Interview</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${resumeData.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden xs:inline">Call</span>
          </a>
          <a
            href={`https://wa.me/${resumeData.whatsapp?.replace(/[^0-9]/g, '') || '60129800657'}?text=Hello%20Shanker,%20we%20are%20interested%20in%20discussing%20an%20IT%20Support%20role`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <button
            onClick={() => setShareModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Share this variation"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Share Link</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <PhotoEditorModal
        avatarUrl={resumeData.avatarUrl}
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        onSave={handleSavePhoto}
      />

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        settings={settings}
        data={resumeData}
        onSelectVariation={handleSelectVariation}
      />

      <LabTopologyModal
        data={resumeData}
        isOpen={topologyOpen}
        onClose={() => setTopologyOpen(false)}
      />

      <AtsCheckerModal
        data={resumeData}
        isOpen={atsOpen}
        onClose={() => setAtsOpen(false)}
      />

      <CoverLetterModal
        data={resumeData}
        isOpen={coverLetterOpen}
        onClose={() => setCoverLetterOpen(false)}
      />

      <EditorModal
        data={resumeData}
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={(newData) => setResumeData(newData)}
        onReset={handleResetData}
      />
    </div>
  );
}
