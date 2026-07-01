import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Eye, Edit, Trash2, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: string;
  amount: number;
  status: string;
  payment_method: string;
  customer: string;
  invoice_number: string;
  created_at: string;
}

const mockPayments: Payment[] = [
  {
    id: "1",
    amount: 2500.00,
    status: "Paid",
    payment_method: "Credit Card",
    customer: "ABC Corp",
    invoice_number: "INV-001234",
    created_at: "2024-01-15"
  },
  {
    id: "2",
    amount: 1800.00,
    status: "Pending",
    payment_method: "Bank Transfer",
    customer: "XYZ Ltd",
    invoice_number: "INV-001235",
    created_at: "2024-01-14"
  },
  {
    id: "3",
    amount: 3200.00,
    status: "Overdue",
    payment_method: "Check",
    customer: "Global Trade Co",
    invoice_number: "INV-001236",
    created_at: "2024-01-10"
  },
];

const PaymentsManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [form, setForm] = useState({
    invoice_number: "",
    customer: "",
    amount: 0,
    payment_method: "Credit Card",
    status: "Pending"
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_payments");
    if (saved) {
      setPayments(JSON.parse(saved));
    } else {
      setPayments(mockPayments);
      localStorage.setItem("admin_payments", JSON.stringify(mockPayments));
    }
  }, []);

  const saveToStorage = (updatedList: Payment[]) => {
    setPayments(updatedList);
    localStorage.setItem("admin_payments", JSON.stringify(updatedList));
  };

  const handleOpenAdd = () => {
    setForm({
      invoice_number: `INV-00${Math.floor(1000 + Math.random() * 9000)}`,
      customer: "",
      amount: 0,
      payment_method: "Credit Card",
      status: "Pending"
    });
    setIsAddOpen(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer || form.amount <= 0) {
      toast.error("Please enter a valid customer and amount.");
      return;
    }
    const newPayment: Payment = {
      id: String(Date.now()),
      ...form,
      created_at: new Date().toISOString().split("T")[0]
    };
    const updated = [newPayment, ...payments];
    saveToStorage(updated);
    setIsAddOpen(false);
    toast.success("Payment log created successfully!");
  };

  const handleOpenEdit = (payment: Payment) => {
    setSelectedPayment(payment);
    setForm({
      invoice_number: payment.invoice_number,
      customer: payment.customer,
      amount: payment.amount,
      payment_method: payment.payment_method,
      status: payment.status
    });
    setIsEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) return;
    const updated = payments.map(p => 
      p.id === selectedPayment.id ? { ...p, ...form } : p
    );
    saveToStorage(updated);
    setIsEditOpen(false);
    toast.success("Payment status updated successfully!");
  };

  const handleOpenView = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this payment log?")) {
      const updated = payments.filter(p => p.id !== id);
      saveToStorage(updated);
      toast.success("Payment log deleted successfully!");
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
          <p className="text-gray-600">Track invoices, billing receipts, and status logs</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Payment
        </Button>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Billed Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Invoices</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search invoice number, client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-700">
                  <th className="text-left p-3 font-medium text-sm">Invoice Number</th>
                  <th className="text-left p-3 font-medium text-sm">Customer</th>
                  <th className="text-left p-3 font-medium text-sm">Amount</th>
                  <th className="text-left p-3 font-medium text-sm">Payment Method</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-sm">Date Created</th>
                  <th className="text-left p-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">{payment.invoice_number}</td>
                      <td className="p-3 text-slate-700 text-sm">{payment.customer}</td>
                      <td className="p-3 font-bold text-slate-900 text-sm">${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="p-3 text-slate-600 text-sm">{payment.payment_method}</td>
                      <td className="p-3">
                        <Badge className={`${getStatusColor(payment.status)} border px-2 py-0.5`}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate-500 text-sm">{payment.created_at}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenView(payment)} title="View details">
                            <Eye className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenEdit(payment)} title="Edit status">
                            <Edit className="w-4 h-4 text-red-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(payment.id)} className="hover:bg-red-50 hover:border-red-200" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                      No invoices found matching the query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Invoice Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="invoice_number">Invoice Number</Label>
              <Input 
                id="invoice_number" 
                value={form.invoice_number} 
                onChange={(e) => setForm({ ...form, invoice_number: e.target.value })}
                required 
              />
            </div>
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input 
                id="customer" 
                placeholder="XYZ Import Export"
                value={form.customer} 
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                required 
              />
            </div>
            <div>
              <Label htmlFor="amount">Billing Amount ($)</Label>
              <Input 
                id="amount" 
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.amount || ""} 
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select 
                  value={form.payment_method} 
                  onValueChange={(val) => setForm({ ...form, payment_method: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Invoice Status</Label>
                <Select 
                  value={form.status} 
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Log Invoice
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice Status</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="edit_invoice">Invoice Number</Label>
              <Input id="edit_invoice" value={form.invoice_number} disabled />
            </div>
            <div>
              <Label htmlFor="edit_customer">Customer Name</Label>
              <Input 
                id="edit_customer" 
                value={form.customer} 
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                required 
              />
            </div>
            <div>
              <Label htmlFor="edit_amount">Billing Amount ($)</Label>
              <Input 
                id="edit_amount" 
                type="number"
                step="0.01"
                value={form.amount} 
                onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_method">Payment Method</Label>
                <Select 
                  value={form.payment_method} 
                  onValueChange={(val) => setForm({ ...form, payment_method: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_status">Invoice Status</Label>
                <Select 
                  value={form.status} 
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Save Invoice
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Payment Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4 pt-3 text-sm">
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Invoice Number:</span>
                <span className="col-span-2 font-mono text-slate-900 font-bold">{selectedPayment.invoice_number}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Customer:</span>
                <span className="col-span-2 text-slate-900">{selectedPayment.customer}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Billed Amount:</span>
                <span className="col-span-2 text-slate-900 font-bold">${selectedPayment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Payment Method:</span>
                <span className="col-span-2 text-slate-900">{selectedPayment.payment_method}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Payment Status:</span>
                <span className="col-span-2">
                  <Badge className={`${getStatusColor(selectedPayment.status)} border px-2 py-0.5`}>
                    {selectedPayment.status}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 pb-2">
                <span className="font-semibold text-slate-500">Billing Date:</span>
                <span className="col-span-2 text-slate-900">{selectedPayment.created_at}</span>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button type="button" onClick={() => setIsViewOpen(false)}>
                  Close Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsManagement;
