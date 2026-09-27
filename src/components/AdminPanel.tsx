import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  FileSpreadsheet,
  Download,
  AlertCircle,
  CheckCircle,
  Eye,
  Phone,
  MessageCircle,
  MapPin,
  RefreshCw,
  Search,
  Check,
  X,
  Users,
  PhoneCall,
  UserCheck,
  DollarSign,
  Send,
  ArrowRight,
  UserPlus,
  Filter,
} from 'lucide-react';
import { Hostel, AreaItem, UniversityItem, AdminStats, LeadItem, LeadMetrics, LeadStatus } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AreaItem[];
  universities: UniversityItem[];
  onHostelsModified: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  areas,
  universities,
  onHostelsModified,
}) => {
  if (!isOpen) return null;

  const [token, setToken] = useState<string>(() => localStorage.getItem('lss_admin_token') || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hostels' | 'leads' | 'csv' | 'taxonomy'>('leads');
  
  // Dashboard data
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [hostelsList, setHostelsList] = useState<Hostel[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  // Leads Management State (Section 3, 4, 5)
  const [leadsList, setLeadsList] = useState<LeadItem[]>([]);
  const [leadMetrics, setLeadMetrics] = useState<LeadMetrics | null>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [leadGenderFilter, setLeadGenderFilter] = useState<string>('All');
  const [leadSearch, setLeadSearch] = useState<string>('');
  const [selectedLeadForAssign, setSelectedLeadForAssign] = useState<LeadItem | null>(null);
  const [assignWardenName, setAssignWardenName] = useState<string>('');
  const [assignWardenPhone, setAssignWardenPhone] = useState<string>('');
  const [assignLeadFee, setAssignLeadFee] = useState<number>(1500);
  const [assignFeeStatus, setAssignFeeStatus] = useState<'Pending' | 'Paid' | 'Waived'>('Pending');
  const [assignNotes, setAssignNotes] = useState<string>('');
  const [manualLeadModalOpen, setManualLeadModalOpen] = useState(false);
  const [manualLeadData, setManualLeadData] = useState({
    visitor_name: '',
    visitor_phone: '',
    hostel_id: '',
    hostel_name: '',
    gender: 'Boys' as 'Boys' | 'Girls',
    area: 'Johar Town',
    budget: 'PKR 12,000 – 18,000',
    room_type: 'Double',
    requirements: ['Wi-Fi', 'Mess'],
    notes: '',
  });

  // Editing state
  const [editingHostel, setEditingHostel] = useState<Hostel | null>(null);
  const [quickEditHostel, setQuickEditHostel] = useState<Hostel | null>(null);

  // CSV Import state
  const [csvContent, setCsvContent] = useState('');
  const [csvPreview, setCsvPreview] = useState<any[] | null>(null);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);

  // New Area / University form state
  const [newAreaName, setNewAreaName] = useState('');
  const [newUni, setNewUni] = useState({ name: '', short_name: '', area: '', address: '' });

  // Fetch admin stats & hostels list
  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const statsRes = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (statsRes.status === 401) {
        handleLogout();
        return;
      }
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      const hostelsRes = await fetch('/api/hostels?includeUnpublished=true', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const hostelsData = await hostelsRes.json();
      if (hostelsData.success) {
        setHostelsList(hostelsData.data);
      }

      // Fetch Leads
      const leadsRes = await fetch('/api/admin/leads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const leadsData = await leadsRes.json();
      if (leadsData.success) {
        setLeadsList(leadsData.data || []);
        setLeadMetrics(leadsData.metrics || null);
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lead Status Change Handler (Section 4: Do NOT automatically mark as Converted)
  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        triggerToast(`Lead ${leadId} status set to "${newStatus}"`);
        setLeadsList((prev) =>
          prev.map((l) => (l.lead_id === leadId ? { ...l, status: newStatus, updated_at: new Date().toISOString() } : l))
        );
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to update lead status');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open Warden Assignment Modal (Section 5)
  const handleOpenAssignModal = (lead: LeadItem) => {
    setSelectedLeadForAssign(lead);
    setAssignWardenName(lead.assigned_warden_name || '');
    setAssignWardenPhone(lead.assigned_warden_phone || '');
    setAssignLeadFee(lead.lead_fee || 1500);
    setAssignFeeStatus(lead.fee_status || 'Pending');
    setAssignNotes(lead.notes || '');
  };

  // Save Warden Assignment & update status to 'Assigned'
  const handleSaveWardenAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForAssign) return;

    try {
      const res = await fetch(`/api/admin/leads/${selectedLeadForAssign.lead_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 'Assigned',
          assigned_warden_name: assignWardenName,
          assigned_warden_phone: assignWardenPhone,
          assigned_warden_whatsapp: assignWardenPhone.replace(/[^0-9]/g, ''),
          lead_fee: assignLeadFee,
          fee_status: assignFeeStatus,
          notes: assignNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerToast(`Lead ${selectedLeadForAssign.lead_id} assigned to ${assignWardenName || 'Warden'}`);
        setSelectedLeadForAssign(null);
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to assign warden');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Dispatch Lead to Warden on WhatsApp
  const handleDispatchWardenWhatsApp = (lead: LeadItem) => {
    const waPhone = (lead.assigned_warden_phone || lead.assigned_warden_whatsapp || '').replace(/[^0-9]/g, '');
    const cleanWa = waPhone.startsWith('03') ? '92' + waPhone.substring(1) : waPhone;

    const message = encodeURIComponent(
      `Assalam-o-Alaikum,\n` +
      `*Assigned Student Lead from Lahore Student Stay:*\n\n` +
      `• Lead Ref: *${lead.lead_id}*\n` +
      `• Student: *${lead.visitor_name}*\n` +
      `• Contact: *${lead.visitor_phone}*\n` +
      `• Category: *${lead.gender} Hostel*\n` +
      `• Preferred Hostel: *${lead.hostel_name}*\n` +
      `• Preferred Area: *${lead.area}*\n` +
      `• Budget: *${lead.budget}*\n` +
      `• Room Type: *${lead.room_type}*\n` +
      `• Requirements: ${lead.requirements.join(', ')}\n` +
      (lead.notes ? `• Student Notes: ${lead.notes}\n` : '') +
      `\nPlease reach out to the student immediately and confirm room availability.`
    );

    if (cleanWa) {
      window.open(`https://wa.me/${cleanWa}?text=${message}`, '_blank', 'noopener,noreferrer');
    } else {
      window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer');
    }
  };

  // Delete Lead Handler
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm(`Permanently remove lead ${leadId}?`)) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        triggerToast(`Lead ${leadId} deleted`);
        setLeadsList((prev) => prev.filter((l) => l.lead_id !== leadId));
        fetchAdminData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export Leads as CSV
  const handleExportLeadsCsv = () => {
    const headers = [
      'lead_id',
      'visitor_name',
      'visitor_phone',
      'gender',
      'hostel_name',
      'area',
      'budget',
      'room_type',
      'requirements',
      'status',
      'assigned_warden_name',
      'assigned_warden_phone',
      'lead_fee',
      'fee_status',
      'created_at',
      'source',
    ];

    const rows = leadsList.map((l) => [
      l.lead_id,
      `"${l.visitor_name.replace(/"/g, '""')}"`,
      `"${l.visitor_phone}"`,
      l.gender,
      `"${(l.hostel_name || '').replace(/"/g, '""')}"`,
      `"${l.area}"`,
      `"${l.budget}"`,
      `"${l.room_type}"`,
      `"${l.requirements.join('; ')}"`,
      l.status,
      `"${l.assigned_warden_name || ''}"`,
      `"${l.assigned_warden_phone || ''}"`,
      l.lead_fee || 0,
      l.fee_status || 'Pending',
      l.created_at,
      `"${l.source}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lahore_student_stay_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    triggerToast('Leads CSV downloaded');
  };

  // Create Manual Lead Handler
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLeadData.visitor_name || !manualLeadData.visitor_phone) {
      alert('Student Name and Phone are required.');
      return;
    }

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(manualLeadData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerToast(`Lead ${data.lead_id} manually created`);
        setManualLeadModalOpen(false);
        setManualLeadData({
          visitor_name: '',
          visitor_phone: '',
          hostel_id: '',
          hostel_name: '',
          gender: 'Boys',
          area: 'Johar Town',
          budget: 'PKR 12,000 – 18,000',
          room_type: 'Double',
          requirements: ['Wi-Fi', 'Mess'],
          notes: '',
        });
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to create lead');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      setToken(data.token);
      localStorage.setItem('lss_admin_token', data.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken('');
    localStorage.removeItem('lss_admin_token');
  };

  const triggerToast = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3000);
  };

  // Quick Verification Toggle
  const handleToggleVerification = async (hostel: Hostel) => {
    const nextStatus =
      hostel.verification_status === 'Verified'
        ? 'Unverified'
        : hostel.verification_status === 'Pending Verification'
        ? 'Verified'
        : 'Pending Verification';

    try {
      const res = await fetch(`/api/admin/hostels/${hostel.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verification_status: nextStatus }),
      });
      if (res.ok) {
        triggerToast(`Updated verification to: ${nextStatus}`);
        fetchAdminData();
        onHostelsModified();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick Published Toggle
  const handleTogglePublished = async (hostel: Hostel) => {
    try {
      const res = await fetch(`/api/admin/hostels/${hostel.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !hostel.published }),
      });
      if (res.ok) {
        triggerToast(`${hostel.name} is now ${!hostel.published ? 'Published' : 'Unpublished'}`);
        fetchAdminData();
        onHostelsModified();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Quick Featured Toggle
  const handleToggleFeatured = async (hostel: Hostel) => {
    try {
      const res = await fetch(`/api/admin/hostels/${hostel.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ featured: !hostel.featured }),
      });
      if (res.ok) {
        triggerToast(`${hostel.name} featured state updated`);
        fetchAdminData();
        onHostelsModified();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Hostel
  const handleDeleteHostel = async (hostel: Hostel) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${hostel.name}"?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/hostels/${hostel.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        triggerToast(`Deleted ${hostel.name}`);
        fetchAdminData();
        onHostelsModified();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Quick Rent / Availability
  const handleSaveQuickEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEditHostel) return;

    try {
      const res = await fetch(`/api/admin/hostels/${quickEditHostel.id}/quick-update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          monthly_rent_min: quickEditHostel.monthly_rent_min,
          monthly_rent_max: quickEditHostel.monthly_rent_max,
          availability_status: quickEditHostel.availability_status,
          available_beds: quickEditHostel.available_beds,
          phone: quickEditHostel.phone,
          whatsapp: quickEditHostel.whatsapp,
        }),
      });
      if (res.ok) {
        triggerToast('Quick update saved successfully');
        setQuickEditHostel(null);
        fetchAdminData();
        onHostelsModified();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CSV Preview & Commit (Section 16)
  const handleCsvPreview = async () => {
    if (!csvContent.trim()) return;
    setImporting(true);
    setCsvErrors([]);
    try {
      const res = await fetch('/api/admin/import-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ csv_content: csvContent, action: 'preview' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCsvPreview(data.rows || []);
      setCsvErrors(data.errors || []);
    } catch (err: any) {
      setCsvErrors([err.message]);
    } finally {
      setImporting(false);
    }
  };

  const handleCsvCommit = async () => {
    if (!csvContent.trim()) return;
    setImporting(true);
    try {
      const res = await fetch('/api/admin/import-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ csv_content: csvContent, action: 'commit' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      triggerToast(data.message || 'Imported successfully!');
      setCsvContent('');
      setCsvPreview(null);
      fetchAdminData();
      onHostelsModified();
      setActiveTab('hostels');
    } catch (err: any) {
      setCsvErrors([err.message]);
    } finally {
      setImporting(false);
    }
  };

  // Export database
  const handleExport = (format: 'json' | 'csv') => {
    window.open(`/api/admin/export?format=${format}`, '_blank');
  };

  // Filter hostels list for admin view
  const filteredHostels = hostelsList.filter((h) => {
    if (genderFilter !== 'All' && h.gender !== genderFilter) return false;
    if (statusFilter !== 'All' && h.verification_status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        h.name.toLowerCase().includes(q) ||
        h.area.toLowerCase().includes(q) ||
        h.phone.includes(q)
      );
    }
    return true;
  });

  // Filter student leads list for admin view
  const filteredLeads = leadsList.filter((l) => {
    if (leadStatusFilter !== 'All' && l.status !== leadStatusFilter) return false;
    if (leadGenderFilter !== 'All' && l.gender !== leadGenderFilter) return false;
    if (leadSearch.trim()) {
      const q = leadSearch.toLowerCase().trim();
      return (
        l.lead_id.toLowerCase().includes(q) ||
        l.visitor_name.toLowerCase().includes(q) ||
        l.visitor_phone.toLowerCase().includes(q) ||
        (l.hostel_name || '').toLowerCase().includes(q) ||
        l.area.toLowerCase().includes(q) ||
        (l.assigned_warden_name || '').toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 border border-neutral-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-900 text-white shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Lahore Student Stay — Admin Database Console</h2>
          </div>
          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action success toast */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white text-xs px-6 py-2 flex items-center gap-2 font-medium shrink-0 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* If not logged in, show login form */}
        {!token ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-800">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-1">Administrative Authentication</h3>
            <p className="text-xs text-neutral-500 mb-6">
              Enter your master administrative key to manage real Lahore hostel records.
            </p>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs mb-4 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password (e.g. lahore2026admin)"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Access Admin Database
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Top Stats Strip (Section 17) */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 p-4 bg-neutral-50 border-b border-neutral-200 text-xs shrink-0">
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Total Hostels</span>
                  <span className="text-base font-extrabold text-neutral-900 tabular-nums">{stats.totalHostels}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Boys</span>
                  <span className="text-base font-extrabold text-neutral-900 tabular-nums">{stats.boysHostels}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-rose-700 block text-[10px] uppercase font-bold">Girls</span>
                  <span className="text-base font-extrabold text-neutral-900 tabular-nums">{stats.girlsHostels}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Verified</span>
                  <span className="text-base font-extrabold text-emerald-800 tabular-nums">{stats.verified}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-amber-700 block text-[10px] uppercase font-bold">Pending</span>
                  <span className="text-base font-extrabold text-amber-800 tabular-nums">{stats.pendingVerification}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-purple-700 block text-[10px] uppercase font-bold">Total Leads</span>
                  <span className="text-base font-extrabold text-purple-900 tabular-nums">{leadsList.length}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-amber-600 block text-[10px] uppercase font-bold">New Leads</span>
                  <span className="text-base font-extrabold text-amber-700 tabular-nums">
                    {leadsList.filter((l) => l.status === 'New').length}
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-neutral-200">
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">Converted</span>
                  <span className="text-base font-extrabold text-emerald-800 tabular-nums">
                    {leadsList.filter((l) => l.status === 'Converted').length}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between px-6 border-b border-neutral-200 bg-white shrink-0">
              <div className="flex gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'leads'
                      ? 'border-emerald-700 text-neutral-900 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Student Leads</span>
                  {leadsList.filter((l) => l.status === 'New').length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white leading-none">
                      {leadsList.filter((l) => l.status === 'New').length} New
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('hostels')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'hostels'
                      ? 'border-emerald-700 text-neutral-900 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Manage Hostels ({hostelsList.length})
                </button>
                <button
                  onClick={() => setActiveTab('csv')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'csv'
                      ? 'border-emerald-700 text-neutral-900 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>CSV Import</span>
                </button>
                <button
                  onClick={() => setActiveTab('taxonomy')}
                  className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'taxonomy'
                      ? 'border-emerald-700 text-neutral-900 font-bold'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Areas & Universities
                </button>
              </div>

              <div className="flex items-center gap-2">
                {activeTab === 'leads' ? (
                  <>
                    <button
                      onClick={() => setManualLeadModalOpen(true)}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Log New Lead</span>
                    </button>
                    <button
                      onClick={handleExportLeadsCsv}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                      title="Export leads as CSV"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export Leads</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleExport('csv')}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                    title="Export database as CSV"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export CSV</span>
                  </button>
                )}
                <button
                  onClick={fetchAdminData}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-md cursor-pointer"
                  title="Refresh data"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tab 0: Student Leads Management (Business Model & Lead Generation MVP) */}
            {activeTab === 'leads' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Lead Metrics KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Total Inquiries</span>
                    <span className="text-lg font-extrabold text-neutral-900 tabular-nums">
                      {leadMetrics?.totalLeads ?? leadsList.length}
                    </span>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-amber-800 block text-[10px] uppercase font-bold">New Leads</span>
                    <span className="text-lg font-extrabold text-amber-800 tabular-nums">
                      {leadMetrics?.newLeads ?? leadsList.filter((l) => l.status === 'New').length}
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                    <span className="text-indigo-800 block text-[10px] uppercase font-bold">Contacted</span>
                    <span className="text-lg font-extrabold text-indigo-800 tabular-nums">
                      {leadMetrics?.contacted ?? leadsList.filter((l) => l.status === 'Contacted').length}
                    </span>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                    <span className="text-purple-800 block text-[10px] uppercase font-bold">Assigned to Warden</span>
                    <span className="text-lg font-extrabold text-purple-800 tabular-nums">
                      {leadMetrics?.assigned ?? leadsList.filter((l) => l.status === 'Assigned').length}
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-emerald-800 block text-[10px] uppercase font-bold">Converted</span>
                    <span className="text-lg font-extrabold text-emerald-800 tabular-nums">
                      {leadMetrics?.converted ?? leadsList.filter((l) => l.status === 'Converted').length}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[10px] uppercase font-bold">Conversion Rate</span>
                    <span className="text-lg font-extrabold text-neutral-900 tabular-nums">
                      {leadMetrics?.conversionRate ?? 0}%
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-900 text-white rounded-xl">
                    <span className="text-emerald-300 block text-[10px] uppercase font-bold">Earned Lead Fees</span>
                    <span className="text-base font-extrabold tabular-nums">
                      PKR {leadMetrics?.totalFeesEarned?.toLocaleString() ?? 0}
                    </span>
                  </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="text"
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      placeholder="Search student name, phone, lead ID (e.g. LS-1047), or hostel..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <select
                      value={leadGenderFilter}
                      onChange={(e) => setLeadGenderFilter(e.target.value)}
                      className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg font-medium"
                    >
                      <option value="All">All Categories (Boys & Girls)</option>
                      <option value="Boys">Boys Hostels Only</option>
                      <option value="Girls">Girls Hostels Only</option>
                    </select>
                  </div>
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 border-b border-neutral-200 pb-2">
                  {(['All', 'New', 'Contacted', 'Assigned', 'Converted', 'Not Converted', 'Closed'] as const).map(
                    (st) => {
                      const count =
                        st === 'All' ? leadsList.length : leadsList.filter((l) => l.status === st).length;
                      const isActive = leadStatusFilter === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setLeadStatusFilter(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-neutral-900 text-white'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          <span>{st}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                              isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-600'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Leads List / Cards */}
                {filteredLeads.length === 0 ? (
                  <div className="p-12 text-center bg-neutral-50 rounded-xl border border-neutral-200">
                    <Users className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-neutral-800">No leads found</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      No customer leads match the selected filter criteria.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredLeads.map((lead) => {
                      const statusColor =
                        lead.status === 'New'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : lead.status === 'Contacted'
                          ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                          : lead.status === 'Assigned'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : lead.status === 'Converted'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : lead.status === 'Not Converted'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-300';

                      return (
                        <div
                          key={lead.lead_id}
                          className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm hover:border-neutral-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                        >
                          {/* Left Column: Lead Info */}
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Lead Reference ID */}
                              <span className="font-mono text-xs font-extrabold px-2.5 py-1 bg-neutral-900 text-white rounded-md tracking-wider">
                                {lead.lead_id}
                              </span>

                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                                  lead.gender === 'Girls' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {lead.gender} Hostel
                              </span>

                              <span className="text-xs text-neutral-400">·</span>
                              <span className="text-xs text-neutral-500">
                                {new Date(lead.created_at).toLocaleDateString('en-PK', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>

                              <span className="text-xs text-neutral-400">·</span>
                              <span className="text-[11px] text-neutral-500 font-medium">
                                Source: {lead.source}
                              </span>
                            </div>

                            {/* Student Details & Direct Contacts */}
                            <div className="flex flex-wrap items-baseline gap-3">
                              <h4 className="text-base font-bold text-neutral-900">
                                {lead.visitor_name}
                              </h4>

                              <div className="flex items-center gap-1.5 text-xs">
                                <a
                                  href={`tel:${lead.visitor_phone}`}
                                  className="font-mono font-semibold text-neutral-800 hover:text-emerald-800 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                                  title="Call Student"
                                >
                                  <PhoneCall className="w-3 h-3 text-emerald-700" />
                                  <span>{lead.visitor_phone}</span>
                                </a>

                                <button
                                  onClick={() => {
                                    const wa = lead.visitor_phone.replace(/[^0-9]/g, '');
                                    const cleanWa = wa.startsWith('03') ? '92' + wa.substring(1) : wa;
                                    const msg = encodeURIComponent(
                                      `Assalam-o-Alaikum ${lead.visitor_name}, regarding your student hostel inquiry (${lead.lead_id}) for ${lead.hostel_name} on Lahore Student Stay:`
                                    );
                                    window.open(`https://wa.me/${cleanWa}?text=${msg}`, '_blank', 'noopener,noreferrer');
                                  }}
                                  className="text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 font-semibold cursor-pointer"
                                  title="Message on WhatsApp"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-700" />
                                  <span>WhatsApp</span>
                                </button>
                              </div>
                            </div>

                            {/* Preferred Accommodation & Requirements */}
                            <div className="text-xs text-neutral-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                              <span>
                                Hostel: <strong className="text-neutral-900 font-semibold">{lead.hostel_name}</strong> ({lead.area})
                              </span>
                              <span className="text-neutral-300">·</span>
                              <span>
                                Budget: <strong className="text-neutral-800">{lead.budget}</strong>
                              </span>
                              <span className="text-neutral-300">·</span>
                              <span>
                                Room: <strong className="text-neutral-800">{lead.room_type}</strong>
                              </span>
                            </div>

                            {/* Requirements tags */}
                            {lead.requirements && lead.requirements.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {lead.requirements.map((r) => (
                                  <span
                                    key={r}
                                    className="px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-700 rounded"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </div>
                            )}

                            {lead.notes && (
                              <div className="text-xs text-neutral-500 italic bg-neutral-50 p-2 rounded border border-neutral-100">
                                &quot;{lead.notes}&quot;
                              </div>
                            )}

                            {/* Warden Assignment Box */}
                            {lead.assigned_warden_name ? (
                              <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-lg text-xs flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <span className="text-[10px] uppercase font-bold text-purple-800 block">
                                    Assigned Warden
                                  </span>
                                  <span className="font-bold text-neutral-900">
                                    {lead.assigned_warden_name}
                                  </span>
                                  {lead.assigned_warden_phone && (
                                    <span className="text-neutral-600 ml-1.5 font-mono text-[11px]">
                                      ({lead.assigned_warden_phone})
                                    </span>
                                  )}
                                  {lead.lead_fee ? (
                                    <span className="ml-2 text-emerald-800 font-semibold">
                                      · Fee: PKR {lead.lead_fee.toLocaleString()} ({lead.fee_status || 'Pending'})
                                    </span>
                                  ) : null}
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleDispatchWardenWhatsApp(lead)}
                                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Send Lead Details to Warden via WhatsApp"
                                  >
                                    <Send className="w-3 h-3" />
                                    <span>Dispatch to Warden</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenAssignModal(lead)}
                                    className="px-2 py-1 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded text-[11px] font-medium cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {/* Right Column: Status & Assignment Action */}
                          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 lg:w-56 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                            {/* Status Selector Dropdown */}
                            <div className="w-full">
                              <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                                Lead Status
                              </label>
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  handleUpdateLeadStatus(lead.lead_id, e.target.value as LeadStatus)
                                }
                                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-700 ${statusColor}`}
                              >
                                <option value="New">Status: New</option>
                                <option value="Contacted">Status: Contacted</option>
                                <option value="Assigned">Status: Assigned</option>
                                <option value="Converted">Status: Converted ★</option>
                                <option value="Not Converted">Status: Not Converted</option>
                                <option value="Closed">Status: Closed</option>
                              </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1.5 w-full justify-end">
                              {!lead.assigned_warden_name && (
                                <button
                                  onClick={() => handleOpenAssignModal(lead)}
                                  className="flex-1 py-1.5 px-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                                >
                                  <UserCheck className="w-3.5 h-3.5" />
                                  <span>Assign Warden</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteLead(lead.lead_id)}
                                className="p-1.5 text-neutral-400 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                title="Delete Lead Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Tab 1: Hostels Table */}
            {activeTab === 'hostels' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search by name, area, or phone..."
                      className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                  >
                    <option value="All">All Categories</option>
                    <option value="Boys">Boys Hostels</option>
                    <option value="Girls">Girls Hostels</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                  >
                    <option value="All">All Verification Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Hostel Name & Area</th>
                        <th className="p-3">Rent (PKR)</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Verification</th>
                        <th className="p-3">Published</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredHostels.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-neutral-400">
                            No hostels found matching the criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredHostels.map((h) => (
                          <tr key={h.id} className="hover:bg-neutral-50/70 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-neutral-900">{h.name}</div>
                              <div className="text-[11px] text-neutral-500">
                                <span className={h.gender === 'Girls' ? 'text-rose-800 font-semibold' : 'text-emerald-800 font-semibold'}>
                                  {h.gender}
                                </span>
                                {' · '}
                                {h.area} {h.sub_area ? `(${h.sub_area})` : ''}
                              </div>
                            </td>

                            <td className="p-3 tabular-nums font-semibold text-neutral-900">
                              PKR {h.monthly_rent_min.toLocaleString()}
                              {h.monthly_rent_max > h.monthly_rent_min ? `–${h.monthly_rent_max.toLocaleString()}` : ''}
                            </td>

                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  h.availability_status === 'Available'
                                    ? 'bg-emerald-100 text-emerald-900'
                                    : h.availability_status === 'Limited Availability'
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}
                              >
                                {h.availability_status}
                              </span>
                              <span className="block text-[10px] text-neutral-400 mt-0.5">
                                Checked: {h.last_checked || '—'}
                              </span>
                            </td>

                            <td className="p-3">
                              <button
                                onClick={() => handleToggleVerification(h)}
                                className={`px-2 py-1 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                                  h.verification_status === 'Verified'
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : h.verification_status === 'Pending Verification'
                                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                                title="Click to cycle verification status"
                              >
                                {h.verification_status}
                              </button>
                            </td>

                            <td className="p-3">
                              <button
                                onClick={() => handleTogglePublished(h)}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                                  h.published
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                                }`}
                              >
                                {h.published ? 'Live' : 'Hidden'}
                              </button>
                            </td>

                            <td className="p-3 text-[11px] text-neutral-600">
                              <div>{h.phone || 'No phone'}</div>
                              {h.whatsapp && <div className="text-emerald-700">WA: {h.whatsapp}</div>}
                            </td>

                            <td className="p-3 text-right space-x-1">
                              <button
                                onClick={() => setQuickEditHostel(h)}
                                className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-medium cursor-pointer"
                                title="Quick update rent, availability and contacts"
                              >
                                Quick Edit
                              </button>
                              <button
                                onClick={() => handleDeleteHostel(h)}
                                className="p-1 text-neutral-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                                title="Delete hostel"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: CSV Import (Section 16) */}
            {activeTab === 'csv' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                  <h3 className="font-bold text-neutral-900 text-sm mb-1">
                    Bulk CSV Import Tool
                  </h3>
                  <p className="text-xs text-neutral-600 mb-3">
                    Paste CSV records to preview and batch-import hostels into the database.
                  </p>
                  <div className="text-[11px] text-neutral-500 font-mono bg-white p-2.5 rounded border border-neutral-200 overflow-x-auto">
                    name,gender,area,sub_area,address,rent_min,rent_max,deposit,room_type,wifi,mess,ac,furnished,bathroom,cctv,parking,availability,phone,whatsapp,google_maps_url,latitude,longitude,verification_status,last_checked
                  </div>
                </div>

                {csvErrors.length > 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 space-y-1">
                    <strong className="block">Validation Issues:</strong>
                    {csvErrors.map((err, i) => (
                      <div key={i}>• {err}</div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Paste CSV Data:
                  </label>
                  <textarea
                    rows={8}
                    value={csvContent}
                    onChange={(e) => setCsvContent(e.target.value)}
                    placeholder={`name,gender,area,sub_area,address,rent_min,rent_max,deposit,room_type,wifi,mess,ac,furnished,bathroom,cctv,parking,availability,phone,whatsapp,google_maps_url,latitude,longitude,verification_status,last_checked\n"Johar Heights Girls Hostel","Girls","Johar Town","Phase 1","Block R Johar Town",18000,28000,8000,"Double",true,true,true,true,true,true,false,"Available","03001234567","923001234567","https://maps.google.com/?q=Johar+Town",31.45,74.29,"Pending Verification","2026-09-27"`}
                    className="w-full p-3 font-mono text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCsvPreview}
                    disabled={importing || !csvContent.trim()}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {importing ? 'Parsing...' : '1. Parse & Preview CSV'}
                  </button>

                  {csvPreview && (
                    <button
                      onClick={handleCsvCommit}
                      disabled={importing}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      2. Commit Bulk Import ({csvPreview.length} records)
                    </button>
                  )}
                </div>

                {csvPreview && (
                  <div className="border border-neutral-200 rounded-xl overflow-hidden">
                    <div className="p-3 bg-neutral-50 font-bold text-xs text-neutral-800 border-b border-neutral-200">
                      Previewing Parsed Records ({csvPreview.length} rows)
                    </div>
                    <div className="overflow-x-auto max-h-60 p-2 text-xs">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-neutral-500 font-semibold border-b">
                            <th className="p-1.5">Name</th>
                            <th className="p-1.5">Gender</th>
                            <th className="p-1.5">Area</th>
                            <th className="p-1.5">Rent Min</th>
                            <th className="p-1.5">Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csvPreview.map((row, idx) => (
                            <tr key={idx} className="border-b border-neutral-100">
                              <td className="p-1.5 font-medium">{row.name}</td>
                              <td className="p-1.5">{row.gender}</td>
                              <td className="p-1.5">{row.area}</td>
                              <td className="p-1.5 tabular-nums">PKR {row.rent_min}</td>
                              <td className="p-1.5">{row.phone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Areas & Universities */}
            {activeTab === 'taxonomy' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Areas management */}
                  <div className="border border-neutral-200 rounded-xl p-4 space-y-3">
                    <h3 className="font-bold text-sm text-neutral-900">Manage Lahore Areas</h3>
                    <p className="text-xs text-neutral-500">
                      Total active areas: {areas.length}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAreaName}
                        onChange={(e) => setNewAreaName(e.target.value)}
                        placeholder="Add new Lahore area..."
                        className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                      />
                      <button
                        onClick={async () => {
                          if (!newAreaName.trim()) return;
                          await fetch('/api/admin/areas', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ name: newAreaName, popular: false }),
                          });
                          setNewAreaName('');
                          triggerToast('Area added');
                          onHostelsModified();
                        }}
                        className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Add Area
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 text-xs">
                      {areas.map((a) => (
                        <div key={a.id} className="py-1.5 flex justify-between">
                          <span>{a.name}</span>
                          <span className="text-neutral-400 tabular-nums">{a.hostel_count || 0} hostels</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Universities management */}
                  <div className="border border-neutral-200 rounded-xl p-4 space-y-3">
                    <h3 className="font-bold text-sm text-neutral-900">Manage Universities</h3>
                    <p className="text-xs text-neutral-500">
                      Total registered universities: {universities.length}
                    </p>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newUni.name}
                        onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
                        placeholder="University Full Name (e.g. FAST-NUCES)"
                        className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newUni.short_name}
                          onChange={(e) => setNewUni({ ...newUni, short_name: e.target.value })}
                          placeholder="Short code (e.g. FAST)"
                          className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                        />
                        <input
                          type="text"
                          value={newUni.area}
                          onChange={(e) => setNewUni({ ...newUni, area: e.target.value })}
                          placeholder="Area (e.g. Faisal Town)"
                          className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-300 rounded-lg"
                        />
                      </div>
                      <button
                        onClick={async () => {
                          if (!newUni.name.trim() || !newUni.short_name.trim()) return;
                          await fetch('/api/admin/universities', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(newUni),
                          });
                          setNewUni({ name: '', short_name: '', area: '', address: '' });
                          triggerToast('University registered');
                          onHostelsModified();
                        }}
                        className="w-full py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Register University
                      </button>
                    </div>

                    <div className="max-h-52 overflow-y-auto divide-y divide-neutral-100 text-xs">
                      {universities.map((u) => (
                        <div key={u.id} className="py-1.5 flex justify-between">
                          <span className="font-medium">{u.name}</span>
                          <span className="text-neutral-500">{u.area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Edit Modal */}
        {quickEditHostel && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-5 border border-neutral-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-bold text-sm text-neutral-900">
                  Quick Update: {quickEditHostel.name}
                </h4>
                <button onClick={() => setQuickEditHostel(null)} className="p-1 text-neutral-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveQuickEdit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Min Rent (PKR)</label>
                    <input
                      type="number"
                      value={quickEditHostel.monthly_rent_min}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          monthly_rent_min: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Max Rent (PKR)</label>
                    <input
                      type="number"
                      value={quickEditHostel.monthly_rent_max}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          monthly_rent_max: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Availability</label>
                    <select
                      value={quickEditHostel.availability_status}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          availability_status: e.target.value as any,
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    >
                      <option value="Available">Available</option>
                      <option value="Limited Availability">Limited Availability</option>
                      <option value="Full">Full</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Available Beds</label>
                    <input
                      type="number"
                      value={quickEditHostel.available_beds || ''}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          available_beds: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">Phone</label>
                    <input
                      type="text"
                      value={quickEditHostel.phone}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          phone: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-600 font-semibold mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={quickEditHostel.whatsapp}
                      onChange={(e) =>
                        setQuickEditHostel({
                          ...quickEditHostel,
                          whatsapp: e.target.value,
                        })
                      }
                      className="w-full p-2 bg-neutral-50 border rounded"
                    />
                  </div>
                </div>

                <div className="p-2 bg-neutral-100 rounded text-[11px] text-neutral-500">
                  Saving will automatically update the <strong>Last Checked</strong> date to today.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuickEditHostel(null)}
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-neutral-900 text-white font-semibold rounded cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Assign Warden & Lead Fee Tracking (Section 5) */}
        {selectedLeadForAssign && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded">
                      {selectedLeadForAssign.lead_id}
                    </span>
                    <h3 className="font-extrabold text-sm text-neutral-900">
                      Assign Lead to Hostel Warden
                    </h3>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Student: {selectedLeadForAssign.visitor_name} ({selectedLeadForAssign.visitor_phone})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLeadForAssign(null)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveWardenAssignment} className="space-y-4 text-xs">
                {/* Pre-fill from Hostel dropdown */}
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Select Hostel Warden Profile
                  </label>
                  <select
                    onChange={(e) => {
                      const h = hostelsList.find((hostel) => hostel.id === e.target.value);
                      if (h) {
                        setAssignWardenName(h.contact_name || `Warden (${h.name})`);
                        setAssignWardenPhone(h.phone || h.whatsapp || '');
                      }
                    }}
                    className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 cursor-pointer"
                  >
                    <option value="">-- Choose from existing hostels --</option>
                    {hostelsList.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.area}) {h.contact_name ? `— ${h.contact_name}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Warden / Manager Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={assignWardenName}
                      onChange={(e) => setAssignWardenName(e.target.value)}
                      placeholder="e.g. Warden Malik Asif"
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Warden WhatsApp / Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={assignWardenPhone}
                      onChange={(e) => setAssignWardenPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Expected Lead Fee (PKR)
                    </label>
                    <input
                      type="number"
                      value={assignLeadFee}
                      onChange={(e) => setAssignLeadFee(Number(e.target.value))}
                      placeholder="1500"
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg font-mono"
                    />
                    <span className="text-[10px] text-neutral-400">Commission upon successful room booking</span>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Fee Payment Status
                    </label>
                    <select
                      value={assignFeeStatus}
                      onChange={(e) => setAssignFeeStatus(e.target.value as any)}
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg cursor-pointer"
                    >
                      <option value="Pending">Pending Confirmation</option>
                      <option value="Paid">Paid / Collected</option>
                      <option value="Waived">Waived / Direct</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Internal Follow-up / Dispatch Notes
                  </label>
                  <textarea
                    rows={2}
                    value={assignNotes}
                    onChange={(e) => setAssignNotes(e.target.value)}
                    placeholder="e.g. Student requested ground floor room. Warden notified on phone."
                    className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => {
                      handleDispatchWardenWhatsApp({
                        ...selectedLeadForAssign,
                        assigned_warden_name: assignWardenName,
                        assigned_warden_phone: assignWardenPhone,
                      });
                    }}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLeadForAssign(null)}
                      className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      Save & Assign
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Log Manual Student Lead */}
        {manualLeadModalOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
                <div>
                  <h3 className="font-extrabold text-sm text-neutral-900">
                    Log Customer Lead Manually
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    For walk-in students, phone calls, or referrals received by admin.
                  </p>
                </div>
                <button
                  onClick={() => setManualLeadModalOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateManualLead} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualLeadData.visitor_name}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, visitor_name: e.target.value })
                      }
                      placeholder="e.g. Danish Ali"
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={manualLeadData.visitor_phone}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, visitor_phone: e.target.value })
                      }
                      placeholder="0300-1234567"
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Category</label>
                    <select
                      value={manualLeadData.gender}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, gender: e.target.value as any })
                      }
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    >
                      <option value="Boys">Boys Hostel</option>
                      <option value="Girls">Girls Hostel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Preferred Area</label>
                    <select
                      value={manualLeadData.area}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, area: e.target.value })
                      }
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    >
                      {areas.map((a) => (
                        <option key={a.id} value={a.name}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Monthly Budget</label>
                    <select
                      value={manualLeadData.budget}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, budget: e.target.value })
                      }
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    >
                      <option value="Under PKR 12,000">Under PKR 12,000</option>
                      <option value="PKR 12,000 – 18,000">PKR 12,000 – 18,000</option>
                      <option value="PKR 18,000 – 25,000">PKR 18,000 – 25,000</option>
                      <option value="Above PKR 25,000">Above PKR 25,000</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Room Type</label>
                    <select
                      value={manualLeadData.room_type}
                      onChange={(e) =>
                        setManualLeadData({ ...manualLeadData, room_type: e.target.value })
                      }
                      className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                    >
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Triple">Triple</option>
                      <option value="Shared">Shared</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Preferred Hostel Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={manualLeadData.hostel_name}
                    onChange={(e) =>
                      setManualLeadData({ ...manualLeadData, hostel_name: e.target.value })
                    }
                    placeholder="e.g. Johar Heights Boys Hostel"
                    className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Notes / Call Details</label>
                  <textarea
                    rows={2}
                    value={manualLeadData.notes}
                    onChange={(e) =>
                      setManualLeadData({ ...manualLeadData, notes: e.target.value })
                    }
                    placeholder="Student called inquiring for room starting Oct 1st."
                    className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setManualLeadModalOpen(false)}
                    className="px-3.5 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
                  >
                    Create Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
