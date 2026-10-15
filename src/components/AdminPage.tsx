import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowLeft, Download, Shield, Upload, Lock, MoveUp, MoveDown, Layout, Palette, Image as ImageIcon, X } from 'lucide-react';
import { HappeningItem, getHappeningItems, saveHappeningItems, CustomSection, getCustomSections, saveCustomSections } from './HappeningNowGrid';

interface AdminPageProps {
  onBackToHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [happeningItems, setHappeningItems] = useState<HappeningItem[]>([]);
  const [customSections, setCustomSections] = useState<CustomSection[]>([]);
  const [signups, setSignups] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'happening' | 'sections' | 'signups'>('happening');

  // Happening Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Campaign 05');
  const [imagePreview, setImagePreview] = useState<string>('');

  // Section Layout Editor Form state
  const [secTitle, setSecTitle] = useState('');
  const [secContent, setSecContent] = useState('');
  const [secBgColor, setSecBgColor] = useState('bg-white');
  const [secLayout, setSecLayout] = useState<'split' | 'centered' | 'banner'>('centered');
  const [secImagePreview, setSecImagePreview] = useState('');
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [targetImageField, setTargetImageField] = useState<'happening' | 'section'>('happening');

  useEffect(() => {
    setHappeningItems(getHappeningItems());
    setCustomSections(getCustomSections());
    const loadedSignups = JSON.parse(localStorage.getItem('ecoclub_signups') || '[]');
    setSignups(loadedSignups);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        if (targetImageField === 'happening') {
          setImagePreview(event.target.result);
        } else {
          setSecImagePreview(event.target.result);
        }
        setShowImagePickerModal(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newItem: HappeningItem = {
      id: Date.now().toString(),
      title,
      description,
      tag: tag || 'Campaign',
      image: imagePreview || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
    };

    const updated = [newItem, ...happeningItems];
    setHappeningItems(updated);
    saveHappeningItems(updated);
    window.dispatchEvent(new Event('happening_updated'));

    setTitle('');
    setDescription('');
    setImagePreview('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = happeningItems.filter((item) => item.id !== id);
    setHappeningItems(updated);
    saveHappeningItems(updated);
    window.dispatchEvent(new Event('happening_updated'));
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secTitle || !secContent) return;

    const newSec: CustomSection = {
      id: Date.now().toString(),
      title: secTitle,
      content: secContent,
      bgColor: secBgColor,
      layout: secLayout,
      imageUrl: secImagePreview || undefined
    };

    const updated = [...customSections, newSec];
    setCustomSections(updated);
    saveCustomSections(updated);
    window.dispatchEvent(new Event('sections_updated'));

    setSecTitle('');
    setSecContent('');
    setSecBgColor('bg-white');
    setSecLayout('centered');
    setSecImagePreview('');
  };

  const handleDeleteSection = (id: string) => {
    const updated = customSections.filter((s) => s.id !== id);
    setCustomSections(updated);
    saveCustomSections(updated);
    window.dispatchEvent(new Event('sections_updated'));
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...customSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    setCustomSections(newSections);
    saveCustomSections(newSections);
    window.dispatchEvent(new Event('sections_updated'));
  };

  const downloadCSV = () => {
    if (signups.length === 0) return;
    let csv = 'Full Name,Email,Role/Year,Timestamp\n';
    signups.forEach((item: any) => {
      csv += `"${item.fullName}","${item.email}","${item.studyYear}","${item.timestamp}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'eco_club_signups.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] text-stone-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-stone-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-stone-900">Admin Portal Login</h1>
            <p className="text-xs text-stone-500">Please enter the admin password to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                maxLength={10}
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-stone-300 focus:outline-emerald-800 bg-white text-center tracking-widest font-mono"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 text-center">
                Incorrect password. Hint: try 1234
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              Access Admin Portal
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                ← Back to Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-stone-900 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">Eco Club Admin Portal</h1>
              <p className="text-xs text-stone-500">Manage site sections, layouts, happening cards & signups</p>
            </div>
          </div>
          <button
            onClick={onBackToHome}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('happening')}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'happening'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Happening Now Cards ({happeningItems.length})
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            Layout Editor & Sections ({customSections.length})
          </button>
          <button
            onClick={() => setActiveTab('signups')}
            className={`px-5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'signups'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            View Sign-ups ({signups.length})
          </button>
        </div>

        {/* Tab 1: Happening Now Manager */}
        {activeTab === 'happening' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-800" /> Add Happening Card
              </h3>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Composting Launch"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Tag / Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Campaign 05"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Card Image
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetImageField('happening');
                      setShowImagePickerModal(true);
                    }}
                    className="w-full py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-emerald-800" />
                    <span>Choose Image / Take Photo</span>
                  </button>
                  {imagePreview && (
                    <div className="mt-3 relative w-full aspect-video rounded-lg overflow-hidden border border-stone-200">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setImagePreview('')}
                        className="absolute top-2 right-2 px-2 py-1 bg-stone-900/80 text-white text-[10px] rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Add Card
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-stone-900 mb-2">Current Cards ({happeningItems.length})</h3>
              {happeningItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 border border-stone-200 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">{item.tag}</span>
                      <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                      <p className="text-xs text-stone-600 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Layout Editor & Sections */}
        {activeTab === 'sections' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
              <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4 text-emerald-800" /> Create Custom Website Section
              </h3>
              <form onSubmit={handleAddSection} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Our Weekly Canteen Goals"
                    value={secTitle}
                    onChange={(e) => setSecTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Text Content
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your custom text or message here..."
                    value={secContent}
                    onChange={(e) => setSecContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Background Colour
                    </label>
                    <select
                      value={secBgColor}
                      onChange={(e) => setSecBgColor(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-900"
                    >
                      <option value="bg-white">Clean White</option>
                      <option value="bg-[#F4F4EE]">Soft Sand / Stone</option>
                      <option value="bg-emerald-50">Light Green</option>
                      <option value="bg-stone-900 text-white">Dark Charcoal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Layout Style
                    </label>
                    <select
                      value={secLayout}
                      onChange={(e) => setSecLayout(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-900"
                    >
                      <option value="centered">Centered Text & Image</option>
                      <option value="split">Split Two Columns</option>
                      <option value="banner">Highlighted Banner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Section Image (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTargetImageField('section');
                      setShowImagePickerModal(true);
                    }}
                    className="w-full py-2.5 px-4 bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-emerald-800" />
                    <span>Choose Image / Take Photo</span>
                  </button>
                  {secImagePreview && (
                    <div className="mt-3 relative w-full aspect-video rounded-lg overflow-hidden border border-stone-200">
                      <img src={secImagePreview} alt="Section Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setSecImagePreview('')}
                        className="absolute top-2 right-2 px-2 py-1 bg-stone-900/80 text-white text-[10px] rounded"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Publish Custom Section to Website
                </button>
              </form>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-base font-bold text-stone-900 mb-2">Active Custom Sections ({customSections.length})</h3>
              {customSections.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-xs text-stone-500 border border-stone-200">
                  No custom sections added yet. Use the form to build your layout.
                </div>
              ) : (
                customSections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="bg-white rounded-xl p-4 border border-stone-200 flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                          {sec.layout} layout
                        </span>
                        <span className="text-[10px] font-mono text-stone-500">{sec.bgColor}</span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900">{sec.title}</h4>
                      <p className="text-xs text-stone-600 line-clamp-1">{sec.content}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleMoveSection(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveSection(idx, 'down')}
                          disabled={idx === customSections.length - 1}
                          className="p-1 text-stone-500 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteSection(sec.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Signups Table */}
        {activeTab === 'signups' && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Club Sign-ups ({signups.length})</h3>
                <p className="text-xs text-stone-500">Students and teachers who signed up via the website.</p>
              </div>
              {signups.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" /> Download CSV Spreadsheet
                </button>
              )}
            </div>

            {signups.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-500">
                No sign-ups recorded yet. Test the sign-up form on the homepage!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-900 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Full Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role / Year</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {signups.map((s, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4 font-semibold text-stone-900">{s.fullName}</td>
                        <td className="py-3 px-4">{s.email}</td>
                        <td className="py-3 px-4">
                          <span className="bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded text-[11px]">
                            {s.studyYear}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">{s.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Picker Modal */}
      {showImagePickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h4 className="text-base font-bold text-stone-900">Select Image Source</h4>
              <button
                onClick={() => setShowImagePickerModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="w-full py-3 px-4 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold text-stone-800 cursor-pointer flex items-center gap-3 transition-colors">
                <Upload className="w-4 h-4 text-emerald-800" />
                <div>
                  <div>Choose from Files or Google Drive</div>
                  <div className="text-[10px] text-stone-500 font-normal">Select image files from device storage</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                    setShowImagePickerModal(false);
                  }}
                  className="hidden"
                />
              </label>

              <label className="w-full py-3 px-4 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold text-stone-800 cursor-pointer flex items-center gap-3 transition-colors">
                <ImageIcon className="w-4 h-4 text-emerald-800" />
                <div>
                  <div>Photos & Videos Album</div>
                  <div className="text-[10px] text-stone-500 font-normal">Pick from your gallery album</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileChange(e);
                    setShowImagePickerModal(false);
                  }}
                  className="hidden"
                />
              </label>

              <label className="w-full py-3 px-4 bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold text-stone-800 cursor-pointer flex items-center gap-3 transition-colors">
                <ImageIcon className="w-4 h-4 text-emerald-800" />
                <div>
                  <div>Take Photo</div>
                  <div className="text-[10px] text-stone-500 font-normal">Use your device camera instantly</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    handleFileChange(e);
                    setShowImagePickerModal(false);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowImagePickerModal(false)}
                className="text-xs font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
