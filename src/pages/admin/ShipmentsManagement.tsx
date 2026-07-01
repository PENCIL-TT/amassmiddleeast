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
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Shipment {
  id: string;
  tracking_number: string;
  status: string;
  origin: string;
  destination: string;
  customer: string;
  created_at: string;
}

const mockShipments: Shipment[] = [
  {
    id: "1",
    tracking_number: "GC001234",
    status: "In Transit",
    origin: "Singapore",
    destination: "Malaysia",
    customer: "ABC Corp",
    created_at: "2024-01-15"
  },
  {
    id: "2",
    tracking_number: "GC001235",
    status: "Delivered",
    origin: "India",
    destination: "Singapore",
    customer: "XYZ Ltd",
    created_at: "2024-01-14"
  },
  {
    id: "3",
    tracking_number: "GC001236",
    status: "Processing",
    origin: "Thailand",
    destination: "Indonesia",
    customer: "Global Trade Co",
    created_at: "2024-01-16"
  },
];

const ShipmentsManagement = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  const [form, setForm] = useState({
    tracking_number: "",
    status: "Processing",
    origin: "",
    destination: "",
    customer: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_shipments");
    if (saved) {
      setShipments(JSON.parse(saved));
    } else {
      setShipments(mockShipments);
      localStorage.setItem("admin_shipments", JSON.stringify(mockShipments));
    }
  }, []);

  const saveToStorage = (updatedList: Shipment[]) => {
    setShipments(updatedList);
    localStorage.setItem("admin_shipments", JSON.stringify(updatedList));
  };

  const handleOpenAdd = () => {
    setForm({
      tracking_number: `GC00${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Processing",
      origin: "",
      destination: "",
      customer: ""
    });
    setIsAddOpen(true);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.origin || !form.destination || !form.customer) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newShipment: Shipment = {
      id: String(Date.now()),
      ...form,
      created_at: new Date().toISOString().split("T")[0]
    };
    const updated = [newShipment, ...shipments];
    saveToStorage(updated);
    setIsAddOpen(false);
    toast.success("Shipment added successfully!");
  };

  const handleOpenEdit = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setForm({
      tracking_number: shipment.tracking_number,
      status: shipment.status,
      origin: shipment.origin,
      destination: shipment.destination,
      customer: shipment.customer
    });
    setIsEditOpen(true);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;
    const updated = shipments.map(s => 
      s.id === selectedShipment.id ? { ...s, ...form } : s
    );
    saveToStorage(updated);
    setIsEditOpen(false);
    toast.success("Shipment updated successfully!");
  };

  const handleOpenView = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this shipment?")) {
      const updated = shipments.filter(s => s.id !== id);
      saveToStorage(updated);
      toast.success("Shipment deleted successfully!");
    }
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shipments Management</h1>
          <p className="text-gray-600">Track and manage client shipping logs in localStorage</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-red-600 hover:bg-red-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Shipment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>All Shipments</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tracking, customer, port..."
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
                  <th className="text-left p-3 font-medium text-sm">Tracking Number</th>
                  <th className="text-left p-3 font-medium text-sm">Customer</th>
                  <th className="text-left p-3 font-medium text-sm">Origin</th>
                  <th className="text-left p-3 font-medium text-sm">Destination</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-sm">Date Created</th>
                  <th className="text-left p-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredShipments.length > 0 ? (
                  filteredShipments.map((shipment) => (
                    <tr key={shipment.id} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">{shipment.tracking_number}</td>
                      <td className="p-3 text-slate-700 text-sm">{shipment.customer}</td>
                      <td className="p-3 text-slate-700 text-sm">{shipment.origin}</td>
                      <td className="p-3 text-slate-700 text-sm">{shipment.destination}</td>
                      <td className="p-3">
                        <Badge className={`${getStatusColor(shipment.status)} border px-2 py-0.5`}>
                          {shipment.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate-500 text-sm">{shipment.created_at}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleOpenView(shipment)} title="View details">
                            <Eye className="w-4 h-4 text-slate-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleOpenEdit(shipment)} title="Edit shipment">
                            <Edit className="w-4 h-4 text-red-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(shipment.id)} className="hover:bg-red-50 hover:border-red-200" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-sm">
                      No shipments found matching the query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Shipment Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Shipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="tracking_number">Tracking Number</Label>
              <Input 
                id="tracking_number" 
                value={form.tracking_number} 
                onChange={(e) => setForm({ ...form, tracking_number: e.target.value })}
                required 
              />
            </div>
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input 
                id="customer" 
                placeholder="ABC Logistics"
                value={form.customer} 
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="origin">Origin Port / City</Label>
                <Input 
                  id="origin" 
                  placeholder="Shanghai, CN"
                  value={form.origin} 
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="destination">Destination Port / City</Label>
                <Input 
                  id="destination" 
                  placeholder="Dubai, AE"
                  value={form.destination} 
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  required 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                value={form.status} 
                onValueChange={(val) => setForm({ ...form, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Create Shipment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Shipment Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shipment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="edit_tracking">Tracking Number</Label>
              <Input 
                id="edit_tracking" 
                value={form.tracking_number} 
                disabled 
              />
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_origin">Origin Port / City</Label>
                <Input 
                  id="edit_origin" 
                  value={form.origin} 
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  required 
                />
              </div>
              <div>
                <Label htmlFor="edit_destination">Destination Port / City</Label>
                <Input 
                  id="edit_destination" 
                  value={form.destination} 
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  required 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit_status">Status</Label>
              <Select 
                value={form.status} 
                onValueChange={(val) => setForm({ ...form, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Shipment Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Shipment Log Details</DialogTitle>
          </DialogHeader>
          {selectedShipment && (
            <div className="space-y-4 pt-3 text-sm">
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Tracking Number:</span>
                <span className="col-span-2 font-mono text-slate-900 font-bold">{selectedShipment.tracking_number}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Customer:</span>
                <span className="col-span-2 text-slate-900">{selectedShipment.customer}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Origin Port:</span>
                <span className="col-span-2 text-slate-900">{selectedShipment.origin}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Destination:</span>
                <span className="col-span-2 text-slate-900">{selectedShipment.destination}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-semibold text-slate-500">Current Status:</span>
                <span className="col-span-2">
                  <Badge className={`${getStatusColor(selectedShipment.status)} border px-2 py-0.5`}>
                    {selectedShipment.status}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-3 pb-2">
                <span className="font-semibold text-slate-500">Date Logged:</span>
                <span className="col-span-2 text-slate-900">{selectedShipment.created_at}</span>
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

export default ShipmentsManagement;
