// GHMC System - TypeScript Interface Definitions

export interface User {
  role: string;
  name: string;
  username: string;
  modules: string[];
  roleText: string;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  zone: string;
  projectType: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold' | 'Under Audit';
  startDate: string;
  endDate: string;
  officerInCharge: string;
  progress: number;
  budget: number; // Estimated Cost
  spent: number;  // Disbursed Spent
  description: string;
  lastUpdated: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string; // e.g. 'pdf', 'xlsx', 'docx'
  uploadedBy: string;
  uploadedDate: string;
  version: string;
  status: string;
  size: string;
  category: 'Administrative Sanctions' | 'Work Orders' | 'Estimates' | 'Tender Documents' | 'Drawings' | 'Approvals' | 'Bills' | 'Invoices' | 'Completion Certificates' | 'Other Attachments';
}

export interface WorkflowStep {
  stage: string;
  officer: string;
  department: string;
  dateTime: string;
  status: string;
  remarks: string;
  pendingWith: string;
}

export interface ProjectTimelineEvent {
  date: string;
  time: string;
  actor: string;
  activity: string;
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  avatarText: string;
}

export interface FileNote {
  writer: string;
  text: string;
  date: string;
}

export interface eOfficeFile {
  id: string;
  projectId: string;
  subject: string;
  department: string;
  currentCustodian: string;
  priority: 'High' | 'Medium' | 'Low';
  status: string;
  attachments: string[];
  notes: FileNote[];
  lastUpdated: string;
  noteNumber?: string;
  projectName?: string;
  zone?: string;
  description?: string;
  purpose?: string;
  background?: string;
  estimatedBudget?: number;
  budgetHead?: string;
  justification?: string;
  benefits?: string;
  additionalConditions?: string;
  creatorRole?: string;
  creatorName?: string;
  createdDate?: string;
  createdTime?: string;
  versions?: eOfficeNoteVersion[];
  workflowStatus?: {
    'Senior Assistant': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Assistant Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Deputy Executive Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Executive Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Superintending Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Joint Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Additional Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
  };
  approvalHistory?: Array<{
    officerName: string;
    role: string;
    department: string;
    action: string;
    remarks: string;
    dateTime: string;
    status: string;
    versionNumber: string;
  }>;
  auditLogs?: Array<{
    user: string;
    role: string;
    date: string;
    time: string;
    ip: string;
    action: string;
    previousValue: string;
    newValue: string;
  }>;
}

export interface WorkOrder {
  id: string;
  projectId: string;
  title: string;
  vendor: string;
  amount: number;
  currentStage: string;
  stageHistory: Record<string, string>;
  updates: Array<{ date: string; text: string }>;
}

export interface Bill {
  id: string;
  projectId: string;
  woId: string;
  vendor: string;
  amount: number;
  headOfAccount: string;
  status: string;
  date: string;
}

export interface HeadOfAccount {
  code: string;
  description: string;
  allocation: number;
  spent: number;
  balance: number;
}

export interface Notification {
  id: number;
  title: string;
  text: string;
  time: string;
  read: boolean;
}

export interface eOfficeNoteVersion {
  version: string;
  modifiedBy: string;
  modifiedRole: string;
  modifiedDate: string;
  modifiedTime: string;
  subject: string;
  projectName: string;
  description: string;
  purpose: string;
  background: string;
  estimatedBudget: number;
  budgetHead: string;
  justification: string;
  benefits: string;
  priority: 'High' | 'Medium' | 'Low';
  remarks: string;
  additionalConditions: string;
}

export interface eOfficeNote {
  id: string;
  fileNumber: string;
  subject: string;
  projectName: string;
  department: string;
  zone: string;
  description: string;
  purpose: string;
  background: string;
  estimatedBudget: number;
  budgetHead: string;
  justification: string;
  benefits: string;
  priority: 'High' | 'Medium' | 'Low';
  attachments: string[];
  remarks: string;
  additionalConditions: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Rejected' | 'Returned';
  currentCustodian: string;
  creatorRole: string;
  creatorName: string;
  createdDate: string;
  createdTime: string;
  versions: eOfficeNoteVersion[];
  workflowStatus: {
    'Senior Assistant': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Assistant Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Deputy Executive Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Executive Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Superintending Engineer': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Joint Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Additional Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
    'Commissioner': 'Approved' | 'Rejected' | 'Pending' | 'Waiting' | 'Returned';
  };
  approvalHistory: Array<{
    officerName: string;
    role: string;
    department: string;
    action: string;
    remarks: string;
    dateTime: string;
    status: string;
    versionNumber: string;
  }>;
  auditLogs: Array<{
    user: string;
    role: string;
    date: string;
    time: string;
    ip: string;
    action: string;
    previousValue: string;
    newValue: string;
  }>;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  date: string;
  time: string;
  ip: string;
  status: 'Success' | 'Failed';
}

export interface AppState {
  currentUser: User | null;
  activeView: 'login' | 'landing' | 'projects-list' | 'project-workspace' | 'tasks-view' | 'my-approvals-view' | 'reports-view' | 'notifications-view' | 'audit-logs-view' | 'eoffice-view' | 'status-view';
  activeProject: Project | null;
  activeModule: string; // 'dashboard' or 'projects' on portal side
  activeProjectModule: string; // Tab selection: summary, eoffice, workorders, workflow, documents, etc.
  captchaCode: number;
  notifications: Notification[];
  auditLogs: AuditLog[];
  projects: Project[];
  eOfficeFiles: eOfficeFile[];
  workOrders: WorkOrder[];
  bills: Bill[];
  headOfAccounts: HeadOfAccount[];
  eOfficeNotes: eOfficeNote[];
}
