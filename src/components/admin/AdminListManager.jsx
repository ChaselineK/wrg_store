import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Phone, 
  Users, 
  ShieldCheck, 
  Star, 
  Clock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GlassButton } from '../ui/GlassButton';

export function AdminListManager() {
  const { 
    isAdminManagerOpen, 
    setIsAdminManagerOpen, 
    admins, 
    updateAdmin, 
    addAdmin, 
    deleteAdmin 
  } = useStore();

  const [editingAdminId, setEditingAdminId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    role: 'Verified Support Escrow',
    whatsapp: '+1555',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    specialty: 'High-Tier Gaming Accounts',
    rating: 4.95,
    reviewsCount: 150,
    responseTime: '< 2 mins',
    status: 'online',
    languages: 'English',
    bio: 'Escrow specialist.'
  });

  if (!isAdminManagerOpen) return null;

  const startEdit = (admin) => {
    setEditingAdminId(admin.id);
    setIsAddingNew(false);
    setEditForm({ ...admin });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingAdminId(null);
    setEditForm({
      name: 'Dave Vance',
      role: 'Support Representative',
      whatsapp: '+15551234567',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
      specialty: 'Riot Games & Steam Accounts',
      rating: 5.0,
      reviewsCount: 45,
      responseTime: '< 3 mins',
      status: 'online',
      languages: 'English',
      bio: 'Fast verified transfers.'
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.whatsapp.trim()) {
      alert('Please fill out name and WhatsApp phone number.');
      return;
    }

    if (isAddingNew) {
      addAdmin(editForm);
      setIsAddingNew(false);
    } else if (editingAdminId) {
      updateAdmin(editingAdminId, editForm);
      setEditingAdminId(null);
    }
  };

  const handleDelete = (id, name) => {
    if (admins.length <= 1) {
      alert('You must keep at least 1 Admin active for customer WhatsApp orders.');
      return;
    }
    if (window.confirm(`Remove admin "${name}" from WhatsApp representatives?`)) {
      deleteAdmin(id);
    }
  };

  return (
    <div className="glass-modal-backdrop" onClick={() => setIsAdminManagerOpen(false)}>
      <div 
        className="glass-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px' }}
      >
        
        {/* Header */}
        <div 
          style={{ 
            padding: '1rem 1.5rem', 
            borderBottom: '1px solid var(--glass-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            background: 'var(--glass-modal)',
            backdropFilter: 'blur(20px)',
            zIndex: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
            >
              <Users size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>WhatsApp Admin Representatives</h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Manage the team of representatives available at checkout
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {!isAddingNew && !editingAdminId && (
              <GlassButton
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={startAddNew}
              >
                Add Admin
              </GlassButton>
            )}

            <button
              onClick={() => setIsAdminManagerOpen(false)}
              className="glass-panel"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* Edit / Add Form View */}
          {(isAddingNew || editingAdminId) ? (
            <form onSubmit={handleSave} className="glass-panel" style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} color="var(--accent-primary)" />
                {isAddingNew ? 'Add WhatsApp Admin' : `Edit Admin: ${editForm.name}`}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="glass-input"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Role Title
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={editForm.role}
                    onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    className="glass-input"
                    placeholder="+15550192834"
                    value={editForm.whatsapp}
                    onChange={(e) => setEditForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    className="glass-input"
                    value={editForm.avatar}
                    onChange={(e) => setEditForm(prev => ({ ...prev, avatar: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Specialty Focus
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    value={editForm.specialty}
                    onChange={(e) => setEditForm(prev => ({ ...prev, specialty: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    Status
                  </label>
                  <select
                    className="glass-input"
                    value={editForm.status}
                    onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="online">Online</option>
                    <option value="busy">Busy</option>
                    <option value="away">Away</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <GlassButton
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingAdminId(null);
                  }}
                >
                  Cancel
                </GlassButton>

                <GlassButton
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Save}
                >
                  Save Admin
                </GlassButton>
              </div>
            </form>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              {admins.map((admin) => (
                <div 
                  key={admin.id}
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--glass-border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={admin.avatar}
                        alt={admin.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{admin.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--accent-primary)' }}>
                          {admin.role}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        onClick={() => startEdit(admin)}
                        className="glass-panel"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: 'var(--radius-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--text-primary)'
                        }}
                        title="Edit Admin"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => handleDelete(admin.id, admin.name)}
                        className="glass-panel"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: 'var(--radius-xs)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#ef4444'
                        }}
                        title="Delete Admin"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                    {admin.specialty}
                  </p>

                  <div style={{ background: 'var(--glass-bg)', padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-xs)', marginBottom: '0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500 }}>
                      <Phone size={12} color="var(--emerald-accent)" />
                      {admin.whatsapp}
                    </span>
                    <span className="glass-badge glass-badge-emerald" style={{ fontSize: '0.65rem' }}>
                      {admin.responseTime}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={11} fill="#F59E0B" color="#F59E0B" /> {admin.rating} rating
                    </span>
                    <span style={{ textTransform: 'capitalize' }}>
                      Status: {admin.status}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
