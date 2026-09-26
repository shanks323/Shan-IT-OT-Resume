import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { ResumeData, initialResumeData } from '../data/resumeData';

interface Props {
  data: ResumeData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: ResumeData) => void;
  onReset: () => void;
}

export const EditorModal: React.FC<Props> = ({ data, isOpen, onClose, onSave, onReset }) => {
  const [formData, setFormData] = useState<ResumeData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'project' | 'skills'>('profile');

  if (!isOpen) return null;

  const handleChange = (field: keyof ResumeData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleResetToDefault = () => {
    if (confirm('Reset all resume contents back to original?')) {
      setFormData(initialResumeData);
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div>
            <h2 className="text-base font-bold text-white font-display">
              Live Resume Content Editor
            </h2>
            <p className="text-xs text-slate-400">
              Customize contact details, summary, and bullet points in real-time
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'profile' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Contact & Profile
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'experience' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Experience (REDFEM)
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'project' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            IT/OT Lab Project
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-2.5 px-3 border-b-2 font-semibold transition-colors ${
              activeTab === 'skills' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Skills & Education
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-200 text-xs">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Photo Upload & Preview Bar */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar"
                      className="w-14 h-14 rounded-xl object-cover object-top border border-slate-700"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl border border-dashed border-slate-700 flex items-center justify-center text-slate-500 bg-slate-900">
                      No Photo
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white text-xs">Self Portrait Photo</div>
                    <div className="text-[11px] text-slate-400">
                      Upload custom photo or paste image URL
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium cursor-pointer transition-colors text-xs flex items-center gap-1.5">
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (typeof event.target?.result === 'string') {
                              handleChange('avatarUrl', event.target.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {formData.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => handleChange('avatarUrl', '')}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Target Titles</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 mb-1 font-medium">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Professional Profile Statement</label>
                <textarea
                  rows={4}
                  value={formData.professionalProfile}
                  onChange={(e) => handleChange('professionalProfile', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-4">
              {formData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Job Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].role = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].company = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].location = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].period = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Key Responsibilities / Achievements (1 per line)</label>
                    <textarea
                      rows={5}
                      value={exp.bullets.join('\n')}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[expIdx].bullets = e.target.value.split('\n').filter(b => b.trim().length > 0);
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-white font-sans leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'project' && (
            <div className="space-y-4">
              {formData.projects.map((proj, projIdx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].title = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={proj.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].subtitle = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Lab Accomplishments & Verifications (1 per line)</label>
                    <textarea
                      rows={4}
                      value={proj.bullets.join('\n')}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[projIdx].bullets = e.target.value.split('\n').filter(b => b.trim().length > 0);
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-700 text-white font-sans leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Architecture Summary Line</label>
                    <input
                      type="text"
                      value={proj.architectureSummary || ''}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[projIdx].architectureSummary = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Technologies Used (comma separated)</label>
                    <input
                      type="text"
                      value={proj.techStack.join(', ')}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[projIdx].techStack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700">
                <label className="block text-slate-300 font-semibold mb-1">Relevant Technical Training Text</label>
                <textarea
                  rows={2}
                  value={formData.technicalTraining}
                  onChange={(e) => handleChange('technicalTraining', e.target.value)}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="space-y-3">
                <div className="text-slate-300 font-semibold">Skill Categories</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.skillCategories.map((cat, idx) => (
                    <div key={cat.id} className="p-3 rounded-lg bg-slate-800/60 border border-slate-700 space-y-1.5">
                      <div className="font-semibold text-white">{cat.name}</div>
                      <input
                        type="text"
                        value={cat.skills.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.skillCategories];
                          updated[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, skillCategories: updated });
                        }}
                        className="w-full p-2 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original Resume</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
