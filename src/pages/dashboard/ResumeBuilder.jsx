import React, { useState } from 'react';
import { Plus, Trash2, Printer } from 'lucide-react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  
  // Global form state 
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: 'John Doe',
      jobTitle: 'Software Engineer',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: 'San Francisco, CA',
      summary: 'Passionate software engineer with 5+ years of experience building scalable web applications.'
    },
    experience: [
      { id: Date.now(), company: 'TechCorp', role: 'Senior Developer', duration: '2020 - Present', description: 'Led frontend team in building a new React architecture.' }
    ],
    education: [
      { id: Date.now() + 1, school: 'University of Engineering', degree: 'B.S. Computer Science', duration: '2016 - 2020' }
    ],
    skills: 'React, Node.js, JavaScript, HTML/CSS'
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleSkillsChange = (e) => {
    setFormData(prev => ({ ...prev, skills: e.target.value }));
  };

  // Dynamic Handlers
  const handleArrayChange = (type, id, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addArrayItem = (type) => {
    const newItem = type === 'experience' 
      ? { id: Date.now(), company: '', role: '', duration: '', description: '' }
      : { id: Date.now(), school: '', degree: '', duration: '' };
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

  const removeArrayItem = (type, id) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const renderTemplateMain = () => (
    <>
      <header className="resume-header">
        <h1 className="resume-name">{formData.personalInfo.fullName || 'Your Name'}</h1>
        <p className="resume-title">{formData.personalInfo.jobTitle || 'Job Title'}</p>
        <div className="resume-contact">
          {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
          {formData.personalInfo.phone && <span> • {formData.personalInfo.phone}</span>}
          {formData.personalInfo.address && <span> • {formData.personalInfo.address}</span>}
        </div>
      </header>
      
      <main className="resume-body">
        {formData.personalInfo.summary && (
          <section className="resume-section">
            <h3 className="resume-section-title">Summary</h3>
            <p className="resume-text">{formData.personalInfo.summary}</p>
          </section>
        )}

        {formData.experience.length > 0 && (
          <section className="resume-section">
            <h3 className="resume-section-title">Experience</h3>
            {formData.experience.map(exp => (
              <div key={exp.id} className="resume-item">
                <div className="resume-item-header">
                  <span className="bold">{exp.role || 'Role'}</span>
                  <span className="light">{exp.duration}</span>
                </div>
                <div className="company">{exp.company || 'Company'}</div>
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
                  <span className="bold">{edu.degree || 'Degree'}</span>
                  <span className="light">{edu.duration}</span>
                </div>
                <div className="company">{edu.school || 'School'}</div>
              </div>
            ))}
          </section>
        )}

        {formData.skills && (
          <section className="resume-section">
            <h3 className="resume-section-title">Skills</h3>
            <p className="resume-text">{formData.skills}</p>
          </section>
        )}
      </main>
    </>
  );

  return (
    <div className="builder-container">
      {/* Left side: Form */}
      <div className="builder-form-side glass-card">
        <div className="builder-header">
          <h2 className="section-title mb-0" style={{ fontSize: '1.5rem', marginBottom: 0 }}>Resume Content</h2>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <select 
              className="input-field" 
              style={{ width: 'auto', marginBottom: 0 }}
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="template-1">Modern (Default)</option>
              <option value="template-2">Minimalist Monochrome</option>
              <option value="template-3">Accent Header</option>
              <option value="template-5">Elegant Centered</option>
            </select>
            <button className="btn-primary" onClick={() => window.print()} style={{ padding: '0.5rem 1rem' }}>
              <Printer size={18} /> Download PDF
            </button>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Personal Details</h3>
          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input type="text" name="fullName" className="input-field" value={formData.personalInfo.fullName} onChange={handlePersonalInfoChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Job Title</label>
              <input type="text" name="jobTitle" className="input-field" value={formData.personalInfo.jobTitle} onChange={handlePersonalInfoChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" name="email" className="input-field" value={formData.personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input type="text" name="phone" className="input-field" value={formData.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
            <div className="input-group">
              <label className="input-label">City, Country</label>
              <input type="text" name="address" className="input-field" value={formData.personalInfo.address} onChange={handlePersonalInfoChange} />
            </div>
            <div className="input-group full-width">
              <label className="input-label">Professional Summary</label>
              <textarea name="summary" className="input-field" rows="4" value={formData.personalInfo.summary} onChange={handlePersonalInfoChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Experience</h3>
            <button className="btn-secondary" onClick={() => addArrayItem('experience')} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
          
          {formData.experience.map((exp, index) => (
            <div key={exp.id} className="dynamic-item form-grid">
              <button className="remove-btn" onClick={() => removeArrayItem('experience', exp.id)} title="Remove"><Trash2 size={18}/></button>
              <div className="input-group">
                <label className="input-label">Role</label>
                <input type="text" className="input-field" value={exp.role} onChange={(e) => handleArrayChange('experience', exp.id, 'role', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Company</label>
                <input type="text" className="input-field" value={exp.company} onChange={(e) => handleArrayChange('experience', exp.id, 'company', e.target.value)} />
              </div>
              <div className="input-group full-width">
                <label className="input-label">Duration (e.g. Jan 2020 - Present)</label>
                <input type="text" className="input-field" value={exp.duration} onChange={(e) => handleArrayChange('experience', exp.id, 'duration', e.target.value)} />
              </div>
              <div className="input-group full-width" style={{marginBottom: 0}}>
                <label className="input-label">Description (bullet points or text)</label>
                <textarea className="input-field" rows="3" value={exp.description} onChange={(e) => handleArrayChange('experience', exp.id, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Education</h3>
            <button className="btn-secondary" onClick={() => addArrayItem('education')} style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
              <Plus size={16} /> Add Education
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={edu.id} className="dynamic-item form-grid">
              <button className="remove-btn" onClick={() => removeArrayItem('education', edu.id)} title="Remove"><Trash2 size={18}/></button>
              <div className="input-group full-width">
                <label className="input-label">School / University</label>
                <input type="text" className="input-field" value={edu.school} onChange={(e) => handleArrayChange('education', edu.id, 'school', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Degree</label>
                <input type="text" className="input-field" value={edu.degree} onChange={(e) => handleArrayChange('education', edu.id, 'degree', e.target.value)} />
              </div>
              <div className="input-group">
                <label className="input-label">Duration / Graduation</label>
                <input type="text" className="input-field" value={edu.duration} onChange={(e) => handleArrayChange('education', edu.id, 'duration', e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h3>Skills</h3>
          <div className="input-group">
            <label className="input-label">Comma separated skills</label>
            <input type="text" className="input-field" value={formData.skills} onChange={handleSkillsChange} placeholder="e.g. React, Node.js, Leadership" />
          </div>
        </div>
      </div>

      {/* Right side: Real-time Preview */}
      <div className="builder-preview-side">
        <div className={`resume-paper ${selectedTemplate}`} id="resume-preview">
          {renderTemplateMain()}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
