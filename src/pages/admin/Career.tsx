import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Briefcase, MapPin, Clock, Trash, Plus } from "lucide-react";

interface JobOpening {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department: string;
}

const AdminCareer = () => {
  const [data, setData] = useState({
    heroTitle: "Join Our Global Team",
    heroSubtitle: "Build your career with a leading logistics company that operates across Asia Pacific. We're always looking for talented individuals to join our growing family.",
    jobOpenings: [] as JobOpening[]
  });

  // Dialog State
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    location: "Dubai, UAE",
    type: "Full-time",
    department: "Logistics",
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_careers");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleSaveGeneral = () => {
    localStorage.setItem("admin_careers", JSON.stringify(data));
    toast.success("Career page headers updated successfully!");
  };

  const handleReset = () => {
    if (confirm("Reset Careers section to defaults?")) {
      const defaults = {
        heroTitle: "Join Our Global Team",
        heroSubtitle: "Build your career with a leading logistics company that operates across Asia Pacific. We're always looking for talented individuals to join our growing family.",
        jobOpenings: []
      };
      setData(defaults);
      localStorage.setItem("admin_careers", JSON.stringify(defaults));
      toast.success("Reset to default career data.");
    }
  };

  const handleOpenAdd = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      description: "",
      location: "Dubai, UAE",
      type: "Full-time",
      department: "Logistics",
    });
    setShowJobModal(true);
  };

  const handleOpenEdit = (job: JobOpening) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      description: job.description,
      location: job.location,
      type: job.type,
      department: job.department,
    });
    setShowJobModal(true);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description) {
      toast.error("Please fill in the job title and description");
      return;
    }

    let updatedJobs = [...data.jobOpenings];
    if (editingJob) {
      updatedJobs = data.jobOpenings.map(j => 
        j.id === editingJob.id ? { ...j, ...jobForm } : j
      );
      toast.success("Job opening updated successfully!");
    } else {
      const newJob: JobOpening = {
        id: String(Date.now()),
        ...jobForm
      };
      updatedJobs = [newJob, ...data.jobOpenings];
      toast.success("Job opening created successfully!");
    }

    const updatedData = { ...data, jobOpenings: updatedJobs };
    setData(updatedData);
    localStorage.setItem("admin_careers", JSON.stringify(updatedData));
    setShowJobModal(false);
  };

  const handleDeleteJob = (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    const updatedJobs = data.jobOpenings.filter(j => j.id !== id);
    const updatedData = { ...data, jobOpenings: updatedJobs };
    setData(updatedData);
    localStorage.setItem("admin_careers", JSON.stringify(updatedData));
    toast.success("Job opening removed!");
  };

  return (
    <div className="space-y-6 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">Career Opportunities</h1>
          <p className="text-slate-500 text-xs mt-1">Configure layout heading subtitles and manage dynamic career position openings</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleReset} 
            className="border-slate-250 hover:bg-slate-50 hover:text-slate-900 text-slate-700 text-xs font-semibold px-4 h-9"
          >
            Reset Defaults
          </Button>
          <Button 
            onClick={handleSaveGeneral} 
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 h-9 shadow-sm"
          >
            Save Page Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Hero Section Config */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Hero Headers</CardTitle>
            <CardDescription className="text-slate-500 text-xs">Configure the text displayed at the top of the careers view</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Title</Label>
              <Input 
                id="heroTitle" 
                value={data.heroTitle}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 h-10 px-3 text-sm font-semibold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroSubtitle" className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Hero Subtitle</Label>
              <Textarea 
                id="heroSubtitle" 
                rows={3}
                value={data.heroSubtitle}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                className="bg-slate-50/40 border-slate-200 focus:border-red-500/40 focus:ring-red-500/30 text-slate-800 p-3 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Listings Manager */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div>
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">Active Job Openings</CardTitle>
              <CardDescription className="text-slate-500 text-xs">Post new job openings or modify current ones</CardDescription>
            </div>
            <Button 
              onClick={handleOpenAdd} 
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Position
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              {data.jobOpenings.map((job) => (
                <div key={job.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">{job.title}</h4>
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full font-mono uppercase">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 pr-6 leading-relaxed">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 self-stretch md:self-auto justify-end md:justify-start border-t md:border-0 pt-3 md:pt-0">
                    <Button 
                      variant="outline" 
                      onClick={() => handleOpenEdit(job)}
                      className="text-xs h-8 border-slate-200"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-100 h-8 w-8 p-0"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {data.jobOpenings.length === 0 && (
                <div className="py-12 text-center border border-dashed rounded-xl flex flex-col items-center justify-center text-slate-400">
                  <Briefcase className="w-10 h-10 mb-2 text-slate-350" />
                  <span className="text-xs">No active positions posted. Click "Add Position" above.</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Job Modal Overlay */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border border-slate-200 shadow-xl">
            <CardHeader className="border-b pb-3.5">
              <CardTitle className="text-sm font-semibold tracking-wider text-slate-700 uppercase font-mono">
                {editingJob ? "Edit Position Details" : "Create New Job Opening"}
              </CardTitle>
            </CardHeader>
            <form onSubmit={handleJobSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Job Title</Label>
                  <Input 
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-xs h-9 font-semibold"
                    placeholder="e.g. Senior Logistics Coordinator"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Department</Label>
                    <Select 
                      value={jobForm.department} 
                      onValueChange={(val) => setJobForm({ ...jobForm, department: val })}
                    >
                      <SelectTrigger className="bg-slate-50/40 border-slate-200 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="IT & Tech">IT & Tech</SelectItem>
                        <SelectItem value="HR & Admin">HR & Admin</SelectItem>
                        <SelectItem value="Sales & Marketing">Sales & Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Job Type</Label>
                    <Select 
                      value={jobForm.type} 
                      onValueChange={(val) => setJobForm({ ...jobForm, type: val })}
                    >
                      <SelectTrigger className="bg-slate-50/40 border-slate-200 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Location</Label>
                  <Input 
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-xs h-9"
                    placeholder="e.g. Dubai, UAE"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">Job Description</Label>
                  <Textarea 
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="bg-slate-50/40 border-slate-200 text-xs p-2.5"
                    rows={4}
                    placeholder="Provide a detailed description of roles, responsibilities, and requirements..."
                    required
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-2 p-4 border-t bg-slate-50 rounded-b-lg">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowJobModal(false)}
                  className="text-xs h-8"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-8"
                >
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminCareer;
