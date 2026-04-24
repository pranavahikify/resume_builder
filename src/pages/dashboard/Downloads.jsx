import React, { useState, useEffect } from 'react';
import { FileText, DownloadCloud, Trash2, LayoutTemplate, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDownloadHistory, getResumeDownloadUrl, deleteDownloadRecord } from '../../lib/supabase';
import './Downloads.css';

const Downloads = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchDownloads = async () => {
      try {
        const { data, error } = await getDownloadHistory(user.id);
        if (!error && data) {
          setDownloads(data);
        }
      } catch (err) {
        console.error("Failed to fetch downloads", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, [user]);

  const handleDelete = async (id) => {
    const { error } = await deleteDownloadRecord(id);
    if (!error) {
      setDownloads(downloads.filter(d => d.id !== id));
    } else {
      alert("Error deleting record.");
    }
  };

  const handleReDownload = async (entry) => {
    if (!entry.file_path) {
      // Legacy behavior if they don't have a file_path
      navigate(`/app/template-editor/${entry.template_id}?download=true`);
      return;
    }
    
    // Get signed URL for the PDF from Supabase storage
    const { url, error } = await getResumeDownloadUrl(entry.file_path);
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error("Error getting download url:", error);
      alert("Failed to get download link. The file might have been deleted.");
    }
  };

  const handleEdit = (entry) => {
    navigate(`/app/template-editor/${entry.template_id || 1}`, {
      state: { formData: entry.form_data }
    });
  };

  if (loading) {
    return (
      <div className="downloads-page" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={36} className="spin" style={{ color: 'var(--accent-color)' }} />
      </div>
    );
  }

  return (
    <div className="downloads-page">
      <div className="downloads-header">
        <h2 className="section-title">Your Downloads</h2>
        <p className="downloads-subtitle">All resumes you've downloaded are saved here. Click Edit to modify or Re-download to print again.</p>
      </div>

      {downloads.length === 0 ? (
        <div className="downloads-empty glass-card">
          <DownloadCloud size={56} className="empty-icon" />
          <h3>No Downloads Yet</h3>
          <p>Go to Templates, choose a design, edit it and download your resume — it'll appear here.</p>
          <button className="btn-primary" onClick={() => navigate('/app/templates')}>
            <LayoutTemplate size={16} /> Browse Templates
          </button>
        </div>
      ) : (
        <div className="downloads-list">
          {downloads.map((file, index) => (
            <div
              key={file.id}
              className="download-card glass-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="download-card-icon">
                <FileText size={28} />
              </div>

              <div className="download-card-info">
                <h4 className="download-card-name">{file.file_name || 'Resume.pdf'}</h4>
                <div className="download-card-meta">
                  <span className="meta-tag">
                    <LayoutTemplate size={13} /> {file.template_name || 'Template'}
                  </span>
                  <span className="meta-tag">
                    <Calendar size={13} /> {new Date(file.downloaded_at || file.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="download-card-actions">
                <button
                  className="btn-secondary action-btn"
                  onClick={() => handleEdit(file)}
                  title="Edit this resume"
                >
                  Edit
                </button>
                <button
                  className="btn-primary action-btn"
                  onClick={() => handleReDownload(file)}
                  title="Re-download this resume"
                >
                  <DownloadCloud size={14} /> Re-download
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(file.id)}
                  title="Remove from history"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
