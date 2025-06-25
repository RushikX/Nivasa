import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import API_BASE_URL from '@/config/api';


interface TechnicianFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (technician: {
        id: string;
        name: string;
        email: string;
        phone: string;
        specialty: string;
        status: 'available' | 'busy' | 'offline';
    }) => void;
}

const TechnicianForm = ({ open, onClose, onSubmit }: TechnicianFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: '',
        status: 'available' as 'available' | 'busy' | 'offline'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.name || !formData.email || !formData.phone || !formData.specialty || !formData.status) {
            toast({
                title: 'Missing required fields',
                description: 'Please fill out all required fields',
                variant: 'destructive'
            });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast({
                title: 'Invalid email',
                description: 'Please enter a valid email address',
                variant: 'destructive'
            });
            return;
        }

        // Basic phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast({
                title: 'Invalid phone number',
                description: 'Please enter a valid 10-digit phone number',
                variant: 'destructive'
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/add-technicians`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                    }
                }
            );

            const data = response.data;

            toast({
                title: 'Technician added successfully!',
                description: `Technician ${data.name} has been added to the system.`,
                variant: 'default'
            });

            onSubmit({
                id: data._id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                specialty: data.specialty,
                status: data.status
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                specialty: '',
                status: 'available'
            });

            onClose();
        } catch (error: any) {
            console.error('Error adding technician:', error);
            toast({
                title: 'Error',
                description: error.response?.data?.error || error.message || 'Failed to add technician',
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const specialties = [
        'Plumbing',
        'Electrical',
        'HVAC',
        'General Maintenance',
        'Carpentry'
    ];

    const statuses = [
        { value: 'available', label: 'Available' },
        { value: 'busy', label: 'Busy' },
        { value: 'offline', label: 'Offline' }
    ];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Technician</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Enter technician name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="Enter email address"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="Enter 10-digit phone number"
                            required
                            pattern="\d{10}"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specialty">Specialty *</Label>
                        <Select
                            value={formData.specialty}
                            onValueChange={(value) => handleChange('specialty', value)}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select specialty" />
                            </SelectTrigger>
                            <SelectContent>
                                {specialties.map((specialty) => (
                                    <SelectItem key={specialty} value={specialty}>
                                        {specialty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status *</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => handleChange('status', value)}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Adding...
                                </>
                            ) : 'Add Technician'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TechnicianForm;