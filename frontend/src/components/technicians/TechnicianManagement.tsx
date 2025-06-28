import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, Search, UserPlus, Wrench, Trash2 } from 'lucide-react';
import TechnicianForm from './TechnicianForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import API_BASE_URL from '@/config/api';

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  status: 'available' | 'busy' | 'offline';
}

interface TechnicianManagementProps {
  apartmentCode: string;
}

const TechnicianManagement = ({ apartmentCode }: TechnicianManagementProps) => {
  console.log('🔍 TechnicianManagement component rendered with apartmentCode:', apartmentCode);
  console.log('🔗 API_BASE_URL:', API_BASE_URL);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('🔄 Component state - loading:', loading, 'technicians count:', technicians.length);

  // Fetch all technicians on mount
  useEffect(() => {
    console.log('🚀 useEffect triggered with apartmentCode:', apartmentCode);
    const fetchTechnicians = async () => {
      try {
        console.log('🔍 Fetching technicians for apartmentCode:', apartmentCode);
        console.log('🔗 Full API URL:', `${API_BASE_URL}/api/all-technicians?apartmentCode=${apartmentCode}`);
        
        // Test if the API is reachable first
        try {
          const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
          console.log('🏥 Health check status:', healthResponse.status);
          if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('🏥 Health check data:', healthData);
          }
        } catch (healthError) {
          console.error('❌ Health check failed:', healthError);
        }
        
        const response = await fetch(`${API_BASE_URL}/api/all-technicians?apartmentCode=${apartmentCode}`);
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Response not ok:', response.status, errorText);
          throw new Error(`Failed to fetch technicians: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('📦 Received data:', data);
        console.log('📦 Data type:', typeof data);
        console.log('📦 Data length:', Array.isArray(data) ? data.length : 'Not an array');
        
        // Map _id to id for consistency with frontend interface
        const mappedTechnicians = data.map((tech: any) => ({
          id: tech._id,
          name: tech.name,
          email: tech.email,
          phone: tech.phone,
          specialty: tech.specialty,
          status: tech.status
        }));
        
        console.log('✅ Mapped technicians:', mappedTechnicians);
        setTechnicians(mappedTechnicians);
      } catch (error) {
        console.error('❌ Error fetching technicians:', error);
        console.error('❌ Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        toast({
          title: "Error",
          description: `Failed to load technicians: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, [apartmentCode]);

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'busy': return 'destructive';
      case 'offline': return 'secondary';
      default: return 'outline';
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    return <Wrench className="h-4 w-4" />;
  };

  const capitalizeStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleAddTechnician = async (technicianData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    specialty: string;
    status: 'available' | 'busy' | 'offline';
  }) => {
    try {
      const token = localStorage.getItem('authToken');
      // Make actual API call to add technician
      const response = await fetch(`${API_BASE_URL}/api/add-technicians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ ...technicianData, apartmentCode })
      });

      if (!response.ok) throw new Error('Failed to add technician');
      
      const newTechnician = await response.json();
      
      // Add the new technician to the local state with the correct id
      setTechnicians([...technicians, {
        ...technicianData,
        id: newTechnician._id
      }]);
      setFormOpen(false);
      toast({
        title: "Technician Added",
        description: `${technicianData.name} has been added successfully.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add technician.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTechnician = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const techToDelete = technicians.find(tech => tech.id === id);
      const response = await fetch(`${API_BASE_URL}/api/technicians/${id}?apartmentCode=${apartmentCode}`, {
        method: 'DELETE',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      if (!response.ok) throw new Error('Failed to delete technician');
      setTechnicians(technicians.filter(tech => tech.id !== id));
      toast({
        title: "Technician Deleted",
        description: `${techToDelete?.name} has been removed.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete technician.",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'available' | 'busy' | 'offline') => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/technicians/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ status: newStatus, apartmentCode })
      });

      if (!response.ok) throw new Error('Failed to update status');
      setTechnicians(technicians.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive"
      });
    }
  };

  const totalTechnicians = technicians.length;
  const availableTechnicians = technicians.filter(t => t.status === 'available').length;

  if (loading) {
    console.log('🔄 TechnicianManagement is in loading state');
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Wrench className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Technician Management</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading technicians for apartment: {apartmentCode}</p>
          <p className="text-sm text-gray-500">Component is rendering...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Technician Management</h2>
        <Button onClick={() => setFormOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Technician
        </Button>
      </div>
      <TechnicianForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleAddTechnician}
        apartmentCode={apartmentCode}
      />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Technicians</CardDescription>
            <CardTitle className="text-3xl">{totalTechnicians}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Registered contractors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Available Now</CardDescription>
            <CardTitle className="text-3xl">{availableTechnicians}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Ready for assignments</p>
          </CardContent>
        </Card>
      </div>
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Directory</CardTitle>
          <CardDescription>Manage contractor information and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, specialty, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          {/* Technicians List */}
          <div className="space-y-4">
            {filteredTechnicians.map((technician) => (
              <Card key={technician.id} className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {technician.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{technician.name}</h3>
                          <p className="text-gray-500 flex items-center">
                            {getSpecialtyIcon(technician.specialty)}
                            <span className="ml-1">{technician.specialty}</span>
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{technician.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{technician.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={getStatusColor(technician.status) as any}>
                            {capitalizeStatus(technician.status)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleStatusChange(technician.id, 'available')}>
                            Available
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(technician.id, 'busy')}>
                            Busy
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(technician.id, 'offline')}>
                            Offline
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteTechnician(technician.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredTechnicians.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No technicians found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianManagement;