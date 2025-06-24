import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, DollarSign, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

interface MaintenanceRecord {
  id: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  flatNumber: string;
  submittedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

interface MaintenanceHistoryProps {
  apartmentCode: string;
  isAdmin: boolean;
  userFlatNumber?: string;
}

const MaintenanceHistory = ({ apartmentCode, isAdmin, userFlatNumber }: MaintenanceHistoryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [newRequest, setNewRequest] = useState({
    description: '',
    amount: ''
  });
  const [maintenanceAmount, setMaintenanceAmount] = useState<number>(0);
  const [paymentRequests, setPaymentRequests] = useState<any[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [editAmount, setEditAmount] = useState<string>('');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [bankDetails, setBankDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch maintenance amount
        const amountRes = await axios.get(`http://localhost:5001/api/auth/maintenance/amount?apartmentCode=${apartmentCode}`);
        setMaintenanceAmount(amountRes.data.maintenanceAmount);
        // Fetch payment requests
        const paymentsRes = await axios.get(`http://localhost:5001/api/auth/maintenance/payments?apartmentCode=${apartmentCode}`);
        setPaymentRequests(paymentsRes.data.payments);
        // Fetch bank details
        const bankRes = await axios.get(`http://localhost:5001/api/auth/maintenance/bank-details?apartmentCode=${apartmentCode}`);
        setBankDetails(bankRes.data.bankDetails);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast({ title: 'Error', description: 'Failed to fetch maintenance data', variant: 'destructive' });
      }
    };
    fetchData();
  }, [apartmentCode]);

  const handleSubmitRequest = () => {
    if (!newRequest.description || !newRequest.amount) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const newRecord: MaintenanceRecord = {
      id: Date.now().toString(),
      description: newRequest.description,
      amount: parseFloat(newRequest.amount),
      status: 'pending',
      submittedBy: 'User',
      flatNumber: userFlatNumber || '',
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setPaymentRequests(prev => [newRecord, ...prev]);
    setNewRequest({ description: '', amount: '' });
    setShowSubmitDialog(false);

    toast({
      title: 'Success',
      description: 'Maintenance payment request submitted'
    });
  };

  const handleStatusChange = async (paymentId: string, newStatus: 'approved' | 'rejected') => {
    try {
      await axios.patch(`http://localhost:5001/api/auth/maintenance/payment/${paymentId}/status`, {
        status: newStatus,
      });
      toast({
        title: 'Success',
        description: `Request ${newStatus} successfully`
      });
      // Refetch payment requests to update the UI
      const paymentsRes = await axios.get(`http://localhost:5001/api/auth/maintenance/payments?apartmentCode=${apartmentCode}`);
      setPaymentRequests(paymentsRes.data.payments);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to update status: ${err.response?.data?.error || err.message}`,
        variant: 'destructive'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handlePaymentSubmit = async () => {
    if (!maintenanceAmount || !userFlatNumber || selectedMonths.length === 0 || !upiTransactionId) {
      toast({ title: 'Error', description: 'Please fill all fields and enter UPI Transaction ID', variant: 'destructive' });
      return;
    }
    try {
      await axios.post('http://localhost:5001/api/auth/maintenance/payment', {
        apartmentCode,
        flatNumber: userFlatNumber,
        transactionId: upiTransactionId
      });
      toast({ title: 'Success', description: 'Payment request submitted' });
      setSelectedMonths([]);
      setUpiTransactionId('');
      // Refresh payment requests
      const paymentsRes = await axios.get(`http://localhost:5001/api/auth/maintenance/payments?apartmentCode=${apartmentCode}`);
      setPaymentRequests(paymentsRes.data.payments);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to submit payment request', variant: 'destructive' });
    }
  };

  const handleAmountUpdate = async () => {
    if (!editAmount) return;
    try {
      const res = await axios.post('http://localhost:5001/api/auth/maintenance/amount', {
        apartmentCode,
        amount: parseFloat(editAmount)
      });
      setMaintenanceAmount(res.data.maintenanceAmount);
      setEditAmount('');
      toast({ title: 'Success', description: 'Maintenance amount updated' });
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to update amount', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold">Maintenance Payments</h2>
        </div>

        {!isAdmin && (
          <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit Payment Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Maintenance Payment Request</DialogTitle>
                <DialogDescription>
                  Submit a request for maintenance expenses you've paid for.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Amount (₹)</Label>
                  <Input value={maintenanceAmount * selectedMonths.length || ''} />
                </div>
                <div>
                  <Label>Flat Number</Label>
                  <Input value={userFlatNumber} readOnly />
                </div>
                <div>
                  <Label>Months</Label>
                  <select multiple className="w-full border rounded p-2" value={selectedMonths} onChange={e => setSelectedMonths(Array.from(e.target.selectedOptions, o => o.value))}>
                    {monthsList.map(month => <option key={month} value={month}>{month}</option>)}
                  </select>
                </div>
                <div>
                  <Label>UPI Transaction ID</Label>
                  <Input value={upiTransactionId} onChange={e => setUpiTransactionId(e.target.value)} placeholder="Enter UPI Transaction ID" />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handlePaymentSubmit} className="flex-1">Submit Payment</Button>
                  <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-4">
        {paymentRequests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No maintenance requests found.</p>
            </CardContent>
          </Card>
        ) : (
          paymentRequests.map((payment) => (
            <Card key={payment._id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    {getStatusIcon(payment.status)}
                    <span>₹{payment.amount.toFixed(2)}</span>
                  </CardTitle>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                  </span>
                  {isAdmin && (
                    <span>Flat {payment.flatNumber}</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Transaction ID: {payment.transactionId}</p>
                {payment.status !== 'pending' && (
                  <p className="text-sm text-gray-500">
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)} on {new Date(payment.updatedAt).toLocaleDateString()}
                  </p>
                )}
                {isAdmin && payment.status === 'pending' && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(payment._id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(payment._id, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {isAdmin && (
        <div className="space-y-6 mb-6">
          {/* Bank Details Management */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Apartment Bank Details</CardTitle>
            </CardHeader>
            <CardContent>
              {bankDetails ? (
                <div className="mb-4 space-y-1">
                  <div><b>Account Holder:</b> {bankDetails.accountHolder}</div>
                  <div><b>Account Number:</b> {bankDetails.accountNumber}</div>
                  <div><b>IFSC:</b> {bankDetails.ifscCode}</div>
                  <div><b>Bank Name:</b> {bankDetails.bankName}</div>
                  <div><b>Branch:</b> {bankDetails.branch}</div>
                  <div><b>UPI ID:</b> {bankDetails.upiId}</div>
                </div>
              ) : <div className="mb-4 text-gray-500">No bank details set yet.</div>}
              <form onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  await axios.post('http://localhost:5001/api/auth/maintenance/bank-details', {
                    apartmentCode,
                    ...bankDetails
                  });
                  toast({ title: 'Success', description: 'Bank details updated' });
                } catch (err) {
                  toast({ title: 'Error', description: 'Failed to update bank details', variant: 'destructive' });
                }
                setIsLoading(false);
              }} className="space-y-2">
                <Input name="accountHolder" placeholder="Account Holder" value={bankDetails?.accountHolder || ''} onChange={e => setBankDetails({ ...bankDetails, accountHolder: e.target.value })} required />
                <Input name="accountNumber" placeholder="Account Number" value={bankDetails?.accountNumber || ''} onChange={e => setBankDetails({ ...bankDetails, accountNumber: e.target.value })} required />
                <Input name="ifscCode" placeholder="IFSC Code" value={bankDetails?.ifscCode || ''} onChange={e => setBankDetails({ ...bankDetails, ifscCode: e.target.value })} required />
                <Input name="bankName" placeholder="Bank Name" value={bankDetails?.bankName || ''} onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })} required />
                <Input name="branch" placeholder="Branch" value={bankDetails?.branch || ''} onChange={e => setBankDetails({ ...bankDetails, branch: e.target.value })} required />
                <Input name="upiId" placeholder="UPI ID" value={bankDetails?.upiId || ''} onChange={e => setBankDetails({ ...bankDetails, upiId: e.target.value })} required />
                <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Bank Details'}</Button>
              </form>
            </CardContent>
          </Card>
          {/* Maintenance Amount Management */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Set Maintenance Amount</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Input type="number" placeholder="Enter amount" value={editAmount} onChange={e => setEditAmount(e.target.value)} className="w-32" />
              <Button onClick={handleAmountUpdate}>Update</Button>
              <span className="ml-4 text-gray-600">Current: <b>₹{maintenanceAmount}</b></span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MaintenanceHistory;