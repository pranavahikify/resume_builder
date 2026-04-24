import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Plus, Trash2, Download, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../../context/AuthContext';
import { uploadResumePdf, recordDownload } from '../../lib/supabase';
import './TemplateEditor.css';

// ─── Template definitions ─────────────────────────────────────────────────────
const TEMPLATES = {
  1: { name: 'Modern Blue',      themeClass: 'tpl-1' },
  2: { name: 'Minimalist Mono',  themeClass: 'tpl-2' },
  3: { name: 'Navy Banner',      themeClass: 'tpl-3' },
  4: { name: 'Dark Sidebar',     themeClass: 'tpl-4' },
  5: { name: 'Elegant Centered', themeClass: 'tpl-5' },
  6: { name: 'Forest Green',     themeClass: 'tpl-6' },
  7: { name: 'Corporate Red',    themeClass: 'tpl-7' },
  8: { name: 'Purple Gradient',  themeClass: 'tpl-8' },
  9: { name: 'Executive Gold',   themeClass: 'tpl-9' },
};

// ─── Default form data ────────────────────────────────────────────────────────
const defaultForm = {
  personalInfo: {
    fullName: 'Your Name',
    jobTitle: 'Professional Title',
    email: 'email@example.com',
    phone: '+1 234 567 890',
    address: 'City, Country',
    website: '',
    summary: 'A passionate professional with experience in delivering high-quality results. Dedicated to continuous learning and growth.',
  },
  experience: [
    {
      id: 1,
      role: 'Senior Developer',
      company: 'TechCorp Inc.',
      duration: '2020 – Present',
      description: '• Led a team of 5 engineers to ship new product features.\n• Improved app performance by 40%.\n• Architected scalable backend systems.',
    },
  ],
  education: [
    {
      id: 1,
      degree: 'B.S. Computer Science',
      school: 'University of Engineering',
      duration: '2016 – 2020',
    },
  ],
  skills: 'React, Node.js, TypeScript, Python, SQL, AWS, Figma',
};

// ─── Resume Render (preview + print) ─────────────────────────────────────────
const ResumePreview = ({ formData, themeClass }) => {
  const p = formData.personalInfo;

  // Template 4 uses 2-column sidebar layout
  if (themeClass === 'tpl-4') {
    return (
      <div className={`resume-doc ${themeClass}`} id="resume-print-area">
        <div className="tpl4-sidebar">
          <div className="tpl4-avatar">{p.fullName?.[0] || 'Y'}</div>
          <h2 className="tpl4-name">{p.fullName || 'Your Name'}</h2>
          <p className="tpl4-title">{p.jobTitle || 'Title'}</p>
          <div className="tpl4-contacts">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.address && <span>{p.address}</span>}
            {p.website && <span>{p.website}</span>}
          </div>
          {formData.skills && (
            <>
              <h3 className="tpl4-section-label">Skills</h3>
              {formData.skills.split(',').map((s, i) => (
                <span key={i} className="tpl4-skill-chip">{s.trim()}</span>
              ))}
            </>
          )}
        </div>
        <div className="tpl4-main">
          {p.summary && (
            <section className="resume-section">
              <h3 className="resume-section-title">About Me</h3>
              <p className="resume-text">{p.summary}</p>
            </section>
          )}
          {formData.experience.length > 0 && (
            <section className="resume-section">
              <h3 className="resume-section-title">Experience</h3>
              {formData.experience.map(exp => (
                <div key={exp.id} className="resume-item">
                  <div className="resume-item-header">
                    <span className="r-bold">{exp.role || 'Role'}</span>
                    <span className="r-light">{exp.duration}</span>
                  </div>
                  <div className="r-company">{exp.company}</div>
                  <p className="resume-text">{exp.description}</p>
                </div>
              ))}
            </section>
          )}
          {formData.education.length > 0 && (
            <section className="resume-section">
              <h3 className="resume-section-title">Education</h3>
              {formData.education.map(edu => (
                <div key={edu.id} className="resume-item">
                  <div className="resume-item-header">
                    <span className="r-bold">{edu.degree}</span>
                    <span className="r-light">{edu.duration}</span>
                  </div>
                  <div className="r-company">{edu.school}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );
  }

  // Standard layout (all other templates)
  return (
    <div className={`resume-doc ${themeClass}`} id="resume-print-area">
      <header className="r-header">
        <h1 className="r-name">{p.fullName || 'Your Name'}</h1>
        <p className="r-title">{p.jobTitle || 'Professional Title'}</p>
        <div className="r-contacts">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.address && <span>{p.address}</span>}
          {p.website && <span>{p.website}</span>}
        </div>
      </header>

      {p.summary && (
        <section className="resume-section">
          <h3 className="resume-section-title">Summary</h3>
          <p className="resume-text">{p.summary}</p>
        </section>
      )}

      {formData.experience.length > 0 && (
        <section className="resume-section">
          <h3 className="resume-section-title">Experience</h3>
          {formData.experience.map(exp => (
            <div key={exp.id} className="resume-item">
              <div className="resume-item-header">
                <span className="r-bold">{exp.role || 'Role'}</span>
                <span className="r-light">{exp.duration}</span>
              </div>
              <div className="r-company">{exp.company}</div>
              <p className="resume-text">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {formData.education.length > 0 && (
        <section className="resume-section">
          <h3 className="resume-section-title">Education</h3>
          {formData.education.map(edu => (
            <div key={edu.id} className="resume-item">
              <div className="resume-item-header">
                <span className="r-bold">{edu.degree}</span>
                <span className="r-light">{edu.duration}</span>
              </div>
              <div className="r-company">{edu.school}</div>
            </div>
          ))}
        </section>
      )}

      {formData.skills && (
        <section className="resume-section">
          <h3 className="resume-section-title">Skills</h3>
          <div className="r-skills-chips">
            {formData.skills.split(',').map((s, i) => (
              <span key={i} className="r-chip">{s.trim()}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

// ─── Main TemplateEditor Component ────────────────────────────────────────────
const TemplateEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const id = parseInt(templateId, 10);
  const tpl = TEMPLATES[id] || TEMPLATES[1];
  const [formData, setFormData] = useState(location.state?.formData || defaultForm);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Auto download if ?download=true
  useEffect(() => {
    if (searchParams.get('download') === 'true') {
      setTimeout(() => handleDownload(), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleSkillsChange = (e) => {
    setFormData(prev => ({ ...prev, skills: e.target.value }));
  };

  const handleArrayChange = (type, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  };

  const addArrayItem = (type) => {
    const newItem = type === 'experience'
      ? { id: Date.now(), role: '', company: '', duration: '', description: '' }
      : { id: Date.now(), degree: '', school: '', duration: '' };
    setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  const removeArrayItem = (type, itemId) => {
    setFormData(prev => ({ ...prev, [type]: prev[type].filter(i => i.id !== itemId) }));
  };

  const handleDownload = async () => {
    if (!user) {
      alert("Please log in to download resumes.");
      return;
    }
    
    setDownloading(true);
    const fileName = `${formData.personalInfo.fullName.replace(/\s+/g, '_')}_${tpl.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    
    try {
      const element = document.getElementById('resume-print-area');
      const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // 1. Generate PDF as Blob
      const pdfBlob = await html2pdf().set(opt).from(element).output('blob');
      
      // 2. Upload to Supabase Storage
      const { data: uploadData, error: uploadError, filePath } = await uploadResumePdf(user.id, fileName, pdfBlob);
      
      if (uploadError) {
        console.error("Error uploading to storage:", uploadError);
        alert("Could not save your resume online. Downloading locally only.");
      } else {
        // 3. Insert record into database
        await recordDownload({
          userId: user.id,
          templateId: id,
          templateName: tpl.name,
          fileName: fileName,
          filePath: filePath,
          fileSizeBytes: pdfBlob.size,
          formData: formData
        });
      }

      // 4. Trigger browser download for the user
      html2pdf().set(opt).from(element).save();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("An error occurred while generating the PDF.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="editor-layout">
      {/* ── Top Bar ── */}
      <div className="editor-topbar glass-card">
        <button className="editor-back-btn" onClick={() => navigate('/app/templates')}>
          <ArrowLeft size={18} /> Templates
        </button>
        <div className="editor-topbar-center">
          <span className="editor-tpl-label">Editing:</span>
          <span className="editor-tpl-name">{tpl.name}</span>
        </div>
        <button
          className={`editor-download-btn ${downloaded ? 'downloaded' : ''}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? <><Loader2 size={16} className="spin" /> Generating...</> : 
           downloaded ? <><CheckCircle size={16}/> Saved!</> : 
           <><Download size={16}/> Download PDF</>}
        </button>
      </div>

      <div className="editor-body">
        {/* ── Left: Form ── */}
        <div className="editor-form glass-card">
          <div className="form-section">
            <h3 className="form-section-title">Personal Details</h3>
            <div className="form-grid">
              {[
                { label: 'Full Name',     name: 'fullName' },
                { label: 'Job Title',     name: 'jobTitle' },
                { label: 'Email',         name: 'email' },
                { label: 'Phone',         name: 'phone' },
                { label: 'City, Country', name: 'address' },
                { label: 'Website',       name: 'website' },
              ].map(({ label, name }) => (
                <div key={name} className="input-group">
                  <label className="input-label">{label}</label>
                  <input
                    type="text"
                    name={name}
                    className="input-field"
                    value={formData.personalInfo[name]}
                    onChange={handlePersonalChange}
                  />
                </div>
              ))}
              <div className="input-group full-width">
                <label className="input-label">Professional Summary</label>
                <textarea
                  name="summary"
                  className="input-field"
                  rows={4}
                  value={formData.personalInfo.summary}
                  onChange={handlePersonalChange}
                />
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="form-section">
            <div className="form-section-header">
              <h3 className="form-section-title">Experience</h3>
              <button className="btn-secondary add-btn" onClick={() => addArrayItem('experience')}>
                <Plus size={14} /> Add
              </button>
            </div>
            {formData.experience.map(exp => (
              <div key={exp.id} className="dynamic-item form-grid">
                <button className="remove-btn" onClick={() => removeArrayItem('experience', exp.id)}>
                  <Trash2 size={15} />
                </button>
                <div className="input-group">
                  <label className="input-label">Role</label>
                  <input type="text" className="input-field" value={exp.role} onChange={e => handleArrayChange('experience', exp.id, 'role', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Company</label>
                  <input type="text" className="input-field" value={exp.company} onChange={e => handleArrayChange('experience', exp.id, 'company', e.target.value)} />
                </div>
                <div className="input-group full-width">
                  <label className="input-label">Duration</label>
                  <input type="text" className="input-field" value={exp.duration} onChange={e => handleArrayChange('experience', exp.id, 'duration', e.target.value)} />
                </div>
                <div className="input-group full-width" style={{ marginBottom: 0 }}>
                  <label className="input-label">Description</label>
                  <textarea className="input-field" rows={3} value={exp.description} onChange={e => handleArrayChange('experience', exp.id, 'description', e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="form-section">
            <div className="form-section-header">
              <h3 className="form-section-title">Education</h3>
              <button className="btn-secondary add-btn" onClick={() => addArrayItem('education')}>
                <Plus size={14} /> Add
              </button>
            </div>
            {formData.education.map(edu => (
              <div key={edu.id} className="dynamic-item form-grid">
                <button className="remove-btn" onClick={() => removeArrayItem('education', edu.id)}>
                  <Trash2 size={15} />
                </button>
                <div className="input-group full-width">
                  <label className="input-label">School / University</label>
                  <input type="text" className="input-field" value={edu.school} onChange={e => handleArrayChange('education', edu.id, 'school', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Degree</label>
                  <input type="text" className="input-field" value={edu.degree} onChange={e => handleArrayChange('education', edu.id, 'degree', e.target.value)} />
                </div>
                <div className="input-group">
                  <label className="input-label">Duration</label>
                  <input type="text" className="input-field" value={edu.duration} onChange={e => handleArrayChange('education', edu.id, 'duration', e.target.value)} />
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="form-section">
            <h3 className="form-section-title">Skills</h3>
            <div className="input-group">
              <label className="input-label">Comma-separated skills</label>
              <input type="text" className="input-field" value={formData.skills} onChange={handleSkillsChange} placeholder="React, Python, SQL…" />
            </div>
          </div>
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="editor-preview-wrapper">
          <div className="editor-preview-label">Live Preview</div>
          <div className="editor-preview-scroll">
            <ResumePreview formData={formData} themeClass={tpl.themeClass} />
          </div>
        </div>
      </div>

      {/* Print styles injected */}
      <style>{`
        @media print {
          body > * { visibility: hidden !important; }
          #resume-print-area, #resume-print-area * { visibility: visible !important; }
          #resume-print-area {
            position: fixed !important;
            top: 0; left: 0;
            width: 100vw !important;
            min-height: 100vh !important;
            box-shadow: none !important;
            border: none !important;
            padding: 2cm !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TemplateEditor;
