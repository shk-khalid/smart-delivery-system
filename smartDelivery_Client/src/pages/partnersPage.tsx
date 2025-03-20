import React, { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { DeliveryPartner } from '../types/partner';
import { PartnerList } from '../components/partner/partnerList';
import { RegisterPartnerModal } from '../components/partner/registerPartnerModal';
import { EditPartnerModal } from '../components/partner/editPartnerModal';
import { MetricsPanel } from '../components/partner/metricsPanel';
import { ShiftModal } from '../components/partner/shiftModal';
import { AreasModal } from '../components/partner/areasModal';
import { DeleteConfirmationModal } from '../components/partner/deleteConfirmationModal';
import { PartnerFilters } from '../components/partner/partnerFilters';
import { LoadingPulse } from '../components/layout/pulseLoading';
import { partners as mockPartners } from '../data/partnerData'; 

interface PartnerFiltersState {
  search: string;
  area: string;
  statuses: ('active' | 'inactive')[];
  sortBy: 'name' | 'rating' | 'completedOrders';
  sortOrder: 'asc' | 'desc';
}

export const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState<DeliveryPartner | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isAreasModalOpen, setIsAreasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PartnerFiltersState>({
    search: '',
    area: '',
    statuses: [],
    sortBy: 'name',
    sortOrder: 'asc',
  });

  // Simulated fetch for partners with random delay
  const fetchPartners = async () => {
    setLoading(true);
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
      // Future API call:
      // const response = await partnerService.getPartners();
      // if (response.error) throw new Error(response.error);
      // setPartners(response.data);
      setPartners(mockPartners);
      setLoading(false);
    }, delay);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const metrics = useMemo(() => {
    const activePartners = partners.filter((p) => p.status === 'active');
    const totalRating = partners.reduce((sum, p) => sum + p.metrics.rating, 0);
    const allAreas = partners.flatMap((p) => p.areas);
    const areaCount = allAreas.reduce((acc, area) => {
      acc[area] = (acc[area] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topAreas = Object.entries(areaCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([area]) => area);

    return {
      totalActive: activePartners.length,
      avgRating: partners.length ? totalRating / partners.length : 0,
      topAreas,
    };
  }, [partners]);

  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(partners.flatMap((p) => p.areas))).sort();
  }, [partners]);

  const filteredPartners = useMemo(() => {
    return partners
      .filter((p) => {
        const matchesSearch =
          filters.search === '' ||
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.email.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.phone.includes(filters.search);
        const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(p.status);
        const matchesArea = filters.area === '' || p.areas.includes(filters.area);
        return matchesSearch && matchesStatus && matchesArea;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (filters.sortBy) {
          case 'rating':
            comparison = b.metrics.rating - a.metrics.rating;
            break;
          case 'completedOrders':
            comparison = b.metrics.completedOrders - a.metrics.completedOrders;
            break;
          default:
            comparison = a.name.localeCompare(b.name);
        }
        return filters.sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [partners, filters]);

  // Partner CRUD operations
  const handleRegisterPartner = async (partner: Omit<DeliveryPartner, '_id'>) => {
    try {
      // Future API call:
      // const response = await partnerService.createPartner(partner);
      // setPartners([...partners, response.data]);
      const newPartner: DeliveryPartner = {
        _id: 'dummy_id_' + Date.now(),
        ...partner,
        status: 'active',
        metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
        areas: [],
      };
      setPartners([...partners, newPartner]);
      toast.success('Partner registered successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to register partner');
    }
  };

  const handleEditPartner = async (updatedPartner: DeliveryPartner) => {
    try {
      // Future API call:
      // const response = await partnerService.updatePartner(updatedPartner._id, updatedPartner);
      // setPartners((prev) => prev.map((p) => (p._id === updatedPartner._id ? response.data : p)));
      setPartners((prev) =>
        prev.map((p) => (p._id === updatedPartner._id ? updatedPartner : p))
      );
      toast.success('Partner updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update partner');
    }
  };

  const handleEditShift = async (partnerId: string, shift: { start: string; end: string }) => {
    try {
      // Future API call:
      // const response = await partnerService.updatePartner(partnerId, { shift });
      // setPartners((prev) => prev.map((p) => (p._id === partnerId ? { ...p, shift } : p)));
      setPartners((prev) =>
        prev.map((p) => (p._id === partnerId ? { ...p, shift } : p))
      );
      toast.success('Shift updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update shift');
    }
  };

  const handleEditAreas = async (partnerId: string, areas: string[]) => {
    try {
      // Future API call:
      // const response = await partnerService.updatePartner(partnerId, { areas });
      // setPartners((prev) => prev.map((p) => (p._id === partnerId ? { ...p, areas } : p)));
      setPartners((prev) =>
        prev.map((p) => (p._id === partnerId ? { ...p, areas } : p))
      );
      toast.success('Areas updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update areas');
    }
  };

  const handleDeletePartner = async (partnerId: string) => {
    try {
      // Future API call:
      // const response = await partnerService.deletePartner(partnerId);
      // setPartners((prev) => prev.filter((p) => p._id !== partnerId));
      setPartners((prev) => prev.filter((p) => p._id !== partnerId));
      toast.success('Partner deleted successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete partner');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900">
      <header className="bg-gradient-to-r from-primary-700 to-primary-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Delivery Partners</h1>
            <p className="mt-1 text-sm text-dark-300">
              Manage your delivery partners and their assignments
            </p>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors px-4 py-2 text-sm font-semibold shadow-sm"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            Register Partner
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <MetricsPanel
          totalActive={metrics.totalActive}
          avgRating={metrics.avgRating}
          topAreas={metrics.topAreas}
        />
        <div className="mt-8">
          <PartnerFilters filters={filters} onFiltersChange={setFilters} areas={uniqueAreas} />
        </div>
        <PartnerList
          partners={filteredPartners}
          onEdit={(partner) => {
            setSelectedPartner(partner);
            setIsEditModalOpen(true);
          }}
          onEditShift={(partner) => {
            setSelectedPartner(partner);
            setIsShiftModalOpen(true);
          }}
          onEditAreas={(partner) => {
            setSelectedPartner(partner);
            setIsAreasModalOpen(true);
          }}
          onDelete={(partner) => {
            setSelectedPartner(partner);
            setIsDeleteModalOpen(true);
          }}
        />
        <RegisterPartnerModal
          isOpen={isRegisterModalOpen}
          onClose={() => {
            setIsRegisterModalOpen(false);
            setSelectedPartner(null);
          }}
          onSubmit={handleRegisterPartner}
        />
        {selectedPartner && isEditModalOpen && (
          <EditPartnerModal
            isOpen={isEditModalOpen}
            partner={selectedPartner}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPartner(null);
            }}
            onSubmit={handleEditPartner}
          />
        )}
        {selectedPartner && (
          <ShiftModal
            isOpen={isShiftModalOpen}
            onClose={() => {
              setIsShiftModalOpen(false);
              setSelectedPartner(null);
            }}
            partner={selectedPartner}
            onSave={handleEditShift}
          />
        )}
        {selectedPartner && (
          <AreasModal
            isOpen={isAreasModalOpen}
            onClose={() => {
              setIsAreasModalOpen(false);
              setSelectedPartner(null);
            }}
            partner={selectedPartner}
            onSave={handleEditAreas}
          />
        )}
        {selectedPartner && (
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedPartner(null);
            }}
            partner={selectedPartner}
            onConfirm={handleDeletePartner}
          />
        )}
      </main>
    </div>
  );
};
