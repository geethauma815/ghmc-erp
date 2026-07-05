import './style.css';
import { Chart, registerables } from 'chart.js';
import { AppState, User, Project, eOfficeFile, WorkOrder, Bill, AuditLog, Notification, FileNote, HeadOfAccount, ProjectDocument, WorkflowStep, TeamMember, ProjectTimelineEvent, eOfficeNote, eOfficeNoteVersion } from './types';

Chart.register(...registerables);

let selectedFileId: string | null = null;
let selectedWoId: string | null = null;

// ==========================================
// 1. SYSTEM USER DIRECTORY
// ==========================================
const USERS: Record<string, User> = {
  commissioner: {
    role: 'Commissioner',
    name: 'Sri M. Dana Kishore, IAS',
    username: 'commissioner',
    roleText: 'Commissioner (GHMC)',
    modules: ['dashboard', 'projects', 'users', 'settings']
  },
  additional_comm: {
    role: 'Additional Commissioner',
    name: 'Smt. S. Priyanka, IAS',
    username: 'additional_comm',
    roleText: 'Addl. Commissioner (ERP)',
    modules: ['dashboard', 'projects', 'settings']
  },
  joint_comm: {
    role: 'Joint Commissioner',
    name: 'Sri V. Anand, KAS',
    username: 'joint_comm',
    roleText: 'Joint Commissioner (Admn)',
    modules: ['dashboard', 'projects']
  },
  se: {
    role: 'Superintending Engineer',
    name: 'Er. B. Venkanna',
    username: 'se',
    roleText: 'Superintending Engineer (SE)',
    modules: ['dashboard', 'projects', 'settings']
  },
  engineer: {
    role: 'Executive Engineer',
    name: 'Er. R. Sharma',
    username: 'engineer',
    roleText: 'Executive Engineer (EE)',
    modules: ['dashboard', 'projects', 'settings']
  },
  dyee: {
    role: 'Deputy Executive Engineer',
    name: 'Er. K. Mahesh',
    username: 'dyee',
    roleText: 'Deputy Executive Engineer (Dy.EE)',
    modules: ['dashboard', 'projects']
  },
  ae: {
    role: 'Assistant Engineer',
    name: 'Er. A. Srinivas',
    username: 'ae',
    roleText: 'Assistant Engineer (AE)',
    modules: ['dashboard', 'projects']
  },
  assistant: {
    role: 'Senior Assistant',
    name: 'Sri V. Kumar',
    username: 'assistant',
    roleText: 'Senior Assistant (Engg)',
    modules: ['dashboard', 'projects']
  },
  finance_officer: {
    role: 'Finance Officer',
    name: 'Smt. K. Anitha Reddy',
    username: 'finance_officer',
    roleText: 'Chief Finance Officer (CFO)',
    modules: ['dashboard', 'projects']
  },
  vendor: {
    role: 'Vendor',
    name: 'Global Infrastructure Ltd. (Contractor)',
    username: 'vendor',
    roleText: 'Authorized Contractor / Vendor',
    modules: ['dashboard', 'projects']
  },
  admin: {
    role: 'Administrator',
    name: 'System Root Operator',
    username: 'admin',
    roleText: 'System Administrator',
    modules: ['dashboard', 'projects', 'users', 'settings']
  }
};

const FILE_MOVEMENT_PIPELINE = [
  'Senior Assistant',
  'Assistant Engineer',
  'Deputy Executive Engineer',
  'Executive Engineer',
  'Superintending Engineer',
  'Joint Commissioner',
  'Additional Commissioner',
  'Commissioner'
];

const WORK_ORDER_STAGES = [
  'Requirement',
  'Proposal',
  'Administrative Sanction',
  'Tendering',
  'Technical Bid',
  'Financial Bid',
  'Contract Award',
  'Work Order',
  'Vendor Execution',
  'Invoice',
  'Budget Allocation',
  'Finance Approval',
  'Payment Released'
];

const WORKFLOW_PIPELINE_STAGES = [
  'Requirement',
  'Proposal Created',
  'Technical Review',
  'Administrative Approval',
  'Financial Approval',
  'Work Order Issued',
  'Execution',
  'Invoice Submitted',
  'Budget Allocation',
  'Payment Released',
  'Project Completed'
];

// ==========================================
// 2. STATE OBJECT
// ==========================================
const state: AppState = {
  currentUser: null,
  activeView: 'login',
  activeProject: null,
  activeModule: 'dashboard',
  activeProjectModule: 'tracking',
  captchaCode: 0,
  notifications: [
    {
      id: 1,
      title: 'High Priority File Awaiting Clearance',
      text: 'eOffice File FILE-2026-ENG-402 forwarded to you by Additional Commissioner.',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      title: 'New Bill Uploaded by Contractor',
      text: 'Global Infrastructure Ltd. uploaded invoice for Girder work of Rs. 35.0 Lakhs.',
      time: '2 hours ago',
      read: true
    }
  ],
  auditLogs: [
    {
      id: 'AUD-3021',
      user: 'Additional Commissioner',
      action: 'Forwarded File FILE-2026-ENG-402 with remarks to Commissioner',
      date: '2026-07-03',
      time: '14:20',
      ip: '10.2.40.12',
      status: 'Success'
    },
    {
      id: 'AUD-3020',
      user: 'Finance Officer',
      action: 'Created Head of Account mapping for Zone-3 Bridges',
      date: '2026-07-03',
      time: '11:15',
      ip: '10.2.80.3',
      status: 'Success'
    }
  ],
  projects: [
    {
      id: 'PRJ-8012',
      name: 'Kondapur Flyover Construction & Widening',
      department: 'Engineering',
      zone: 'Zone-3 (Sherilingampally)',
      projectType: 'Flyover & Grade Separator',
      status: 'In Progress',
      startDate: '2025-04-12',
      endDate: '2026-12-15',
      officerInCharge: 'Er. R. Sharma',
      progress: 61,
      budget: 150000000,
      spent: 92000000,
      description: 'Construction of a 4-lane grade separator flyover to ease vehicular bottlenecks at the Kondapur traffic junction corridor.',
      lastUpdated: '2026-07-03 15:41'
    },
    {
      id: 'PRJ-3041',
      name: 'JNTU Junction Stormwater Drain Overhaul',
      department: 'Drainage & Sewerage',
      zone: 'Zone-2 (Kukatpally)',
      projectType: 'Box Drain & Pipe Network',
      status: 'Under Audit',
      startDate: '2025-06-01',
      endDate: '2026-05-30',
      officerInCharge: 'Er. P. Srinivas',
      progress: 90,
      budget: 42000000,
      spent: 38000000,
      description: 'Full concrete box-drain renovation and capacity enhancement of stormwater discharge channels running parallel to the JNTU arterial road.',
      lastUpdated: '2026-07-01 10:15'
    },
    {
      id: 'PRJ-5022',
      name: 'Serilingampally Smart Streetlights Phase-2',
      department: 'Electrical & Lighting',
      zone: 'Zone-4 (Secunderabad)',
      projectType: 'Smart Grid LED Network',
      status: 'Completed',
      startDate: '2025-09-15',
      endDate: '2026-02-28',
      officerInCharge: 'Er. M. Venkatesh',
      progress: 100,
      budget: 18000000,
      spent: 18000000,
      description: 'Supply, installation, and cloud-gateway commissioning of 1,200 smart light-emitting diode (LED) lamps across municipal layouts.',
      lastUpdated: '2026-06-30 09:00'
    },
    {
      id: 'PRJ-1090',
      name: 'Gachibowli Ring Road Resurfacing Project',
      department: 'Engineering',
      zone: 'Zone-3 (Sherilingampally)',
      projectType: 'Road Laying & Bituminous Overlay',
      status: 'Planning',
      startDate: '2026-08-01',
      endDate: '2027-04-15',
      officerInCharge: 'Er. K. Prasad',
      progress: 0,
      budget: 250000000,
      spent: 0,
      description: 'Major bituminous overlay resurfacing, structural asphalt correction, and hot-mix laying for the Gachibowli outer ring road bypass lanes.',
      lastUpdated: '2026-07-02 11:00'
    },
    {
      id: 'PRJ-7720',
      name: 'Kukatpally Integrated Public Park Development',
      department: 'Landscaping & Parks',
      zone: 'Zone-2 (Kukatpally)',
      projectType: 'Public Infrastructure Development',
      status: 'On Hold',
      startDate: '2025-02-10',
      endDate: '2026-08-30',
      officerInCharge: 'Er. S. Ramakrishna',
      progress: 20,
      budget: 75000000,
      spent: 15000000,
      description: 'Establishment of an eco-friendly public park featuring native tree forestry, walking walkways, and rainwater-harvesting reservoirs.',
      lastUpdated: '2026-06-15 14:00'
    },
    {
      id: 'PRJ-2026-IT-008',
      name: 'IVR Outbound Call Campaign – Property Tax Scheme',
      department: 'Information Technology',
      zone: 'Head Office',
      projectType: 'IVR Outreach & Public Campaign',
      status: 'Completed',
      startDate: '2026-04-18',
      endDate: '2026-06-04',
      officerInCharge: 'Er. G.N. Sai Ram',
      progress: 100,
      budget: 500000,
      spent: 500000,
      description: 'Publicity campaign for Early Bird Property Tax Scheme (5% rebate) for FY 2026-27 by executing automated IVR outbound calls targeting 6.5 Lakh citizens.',
      lastUpdated: '2026-06-04 17:00'
    }
  ],
  eOfficeFiles: [
    {
      id: 'FILE-2026-ENG-402',
      projectId: 'PRJ-8012',
      subject: 'Administrative Sanction for additional lane acquisition at Kondapur Junction',
      department: 'Engineering (Zone-3)',
      currentCustodian: 'Commissioner',
      priority: 'High',
      status: 'Pending Review',
      attachments: ['Land_Acquisition_Report_V2.pdf', 'Compensation_Matrix_Signed.pdf'],
      notes: [
        {
          writer: 'Senior Assistant (Sri V. Kumar)',
          text: 'Verified land survey numbers and area markings. Total area required: 1.2 acres. Proposal forwarded for technical clearance.',
          date: '2026-06-25 10:30'
        },
        {
          writer: 'Executive Engineer (Er. R. Sharma)',
          text: 'Recommended for execution. Technical drawing aligns with master structural blueprints. Standard compensation parameters mapped.',
          date: '2026-06-28 14:15'
        },
        {
          writer: 'Addl. Commissioner (Smt. S. Priyanka, IAS)',
          text: 'Acquisition estimates match public works regulations. File forwarded to Commissioner for final administrative and financial sanction.',
          date: '2026-07-03 14:20'
        }
      ],
      lastUpdated: '2026-07-03'
    },
    {
      id: 'FILE-2026-FIN-910',
      projectId: 'PRJ-8012',
      subject: 'Revised budget estimation sanction for steel girder foundations',
      department: 'Finance Division',
      currentCustodian: 'Finance Officer',
      priority: 'High',
      status: 'Under Verification',
      attachments: ['Revised_Girder_Estimate.pdf'],
      notes: [
        {
          writer: 'Executive Engineer (Er. R. Sharma)',
          text: 'Escalation of raw material prices warrants a 15% budget revision on standard girder structural concrete work. Proposal uploaded.',
          date: '2026-07-02 09:12'
        }
      ],
      lastUpdated: '2026-07-02'
    },
    {
      id: 'FILE-IT/COM/0008/2026',
      projectId: 'PRJ-2026-IT-008',
      subject: 'Providing of IVR Outbound Call Campaign – Early Bird Property Tax Scheme 2026-27 of GHMC – According administrative Sanction and Agency approval – Request – Reg.',
      department: 'Information Technology Division',
      currentCustodian: 'Approved / Closed',
      priority: 'High',
      status: 'Approved / Closed',
      attachments: ['ghmc.pdf', 'Invoice_TS-26-27-GHMC-0186.pdf', 'Costing_Proposal.pdf'],
      notes: [
        {
          writer: 'G. SATYANARAYANA (SR.ASST-1(IT)-HO)',
          text: 'It is submitted that the Commissioner, GHMC has instructed the IT Section to give wide publicity for the Early Bird Property Tax Scheme (5% rebate) by adopting various modes such as SMS, call campaigns, etc., to ensure maximum outreach before 30th April 2026. In this regard, the IT Section is already sending SMS on a daily basis and further proposes to undertake an IVR Outbound Call Campaign to create awareness among citizens who have not yet paid their Property Tax for the financial year 2026-27. Approach has been made to M/s. EMRI Green Health Services, present call center operator, who proposed to cover 6.5 lakh mobile numbers for a lump sum cost of Rs. 5,00,000/- (Excl GST). The expenditure may be met from the head of account "02A-0201-22012-01" (Communication Expenses). Submitted for approval.',
          date: '2026-04-20 09:13'
        },
        {
          writer: 'G.N. SAI RAM (AE-3(IT)HO)',
          text: 'Recommended for sanction. The agency EMRI GHS currently manages the civic helpline and has the necessary outbound calling setup.',
          date: '2026-04-21 12:23'
        },
        {
          writer: 'NARSING RAO KORMI (DY.EE-2(IT)-HO)',
          text: 'Entrusting work to existing call center agency is technically feasible and cost-effective. Forwarded for administrative approval.',
          date: '2026-04-21 12:27'
        },
        {
          writer: 'C RADHA (JC(IT)HO)',
          text: 'Supported. Early bird campaign is a time-bound revenue generation scheme. Proposal forwarded.',
          date: '2026-04-21 12:28'
        },
        {
          writer: 'MANDA MAKARANDU IAS (ADDL. COMMR(IT))',
          text: 'Recommended. Early bird tax collections require intensive calling push to maximize rebate outreach before April 30 deadline.',
          date: '2026-04-21 13:35'
        },
        {
          writer: 'R V KARNAN IAS (COMMISSIONER)',
          text: 'ok',
          date: '2026-04-21 15:42'
        },
        {
          writer: 'MANDA MAKARANDU IAS (ADDL. COMMR(IT))',
          text: 'Commissioner approved at para 10. Work Order draft DFA/125546 placed in drafts for signature.',
          date: '2026-04-23 17:22'
        },
        {
          writer: 'K. SARATH CHANDRA (FINANCIAL ADVISOR)',
          text: 'Budget entry has been provided vide BAS No. HO-26004560/2026-27. Mappable head of account "02A-0201-22012-01". Supporting proceedings placed in drafts.',
          date: '2026-05-20 16:32'
        },
        {
          writer: 'G. SATYANARAYANA (SR.ASST-1(IT)-HO)',
          text: 'Invoice TS/26-27/GHMC/0186 Dt: 05.05.2026 from EMRI GHS submitted for payment release of Rs. 5,00,000/- based on completion report. Call campaign reports attached (Total calls: 815,707, connected: 146,497). Draft proceedings DFA/127210 placed for signature.',
          date: '2026-06-04 16:13'
        }
      ],
      lastUpdated: '2026-06-04'
    }
  ],
  workOrders: [
    {
      id: 'WO-4012',
      projectId: 'PRJ-8012',
      title: 'Superstructure Girder Erection Work',
      vendor: 'Global Infrastructure Ltd.',
      amount: 35000000,
      currentStage: 'Vendor Execution',
      stageHistory: {
        'Requirement': '2025-05-10',
        'Proposal': '2025-05-20',
        'Administrative Sanction': '2025-06-05',
        'Tendering': '2025-07-11',
        'Technical Bid': '2025-08-01',
        'Financial Bid': '2025-08-15',
        'Contract Award': '2025-09-02',
        'Work Order': '2025-09-20',
        'Vendor Execution': '2025-10-01'
      },
      updates: [
        { date: '2026-01-15', text: 'Foundation concrete pile work completed.' },
        { date: '2026-05-20', text: 'Sub-structure concrete pillars fully cured.' }
      ]
    },
    {
      id: 'WO-4021',
      projectId: 'PRJ-8012',
      title: 'Service Road Blacktopping & Lane Marking',
      vendor: 'Aravind Constructions',
      amount: 8500000,
      currentStage: 'Invoice',
      stageHistory: {
        'Requirement': '2025-06-01',
        'Proposal': '2025-06-15',
        'Administrative Sanction': '2025-07-02',
        'Tendering': '2025-08-01',
        'Technical Bid': '2025-08-20',
        'Financial Bid': '2025-09-01',
        'Contract Award': '2025-09-15',
        'Work Order': '2025-10-05',
        'Vendor Execution': '2025-11-12',
        'Invoice': '2026-07-02'
      },
      updates: [
        { date: '2026-02-12', text: 'Grading and earth-leveling operations finished.' },
        { date: '2026-06-15', text: 'Bituminous layer blacktop asphalt poured.' }
      ]
    },
    {
      id: 'WO-401476',
      projectId: 'PRJ-2026-IT-008',
      title: 'IVR Outbound Call Campaign Services',
      vendor: 'M/s. EMRI Green Health Services',
      amount: 500000,
      currentStage: 'Payment Released',
      stageHistory: {
        'Requirement': '2026-04-18',
        'Proposal': '2026-04-20',
        'Administrative Sanction': '2026-04-21',
        'Work Order': '2026-04-24',
        'Vendor Execution': '2026-04-25',
        'Invoice': '2026-05-05',
        'Budget Allocation': '2026-05-20',
        'Finance Approval': '2026-06-03',
        'Payment Released': '2026-06-04'
      },
      updates: [
        { date: '2026-04-23', text: 'IVR campaign configuration & SIP lines setup.' },
        { date: '2026-04-30', text: 'IVR campaign completed. 8.15 Lakh calls triggered.' }
      ]
    }
  ],
  bills: [
    {
      id: 'BILL-901',
      projectId: 'PRJ-8012',
      woId: 'WO-4021',
      vendor: 'Aravind Constructions',
      amount: 4000000,
      headOfAccount: '',
      status: 'Pending Budget Allocation',
      date: '2026-07-02'
    },
    {
      id: 'BILL-TS/26-27/0186',
      projectId: 'PRJ-2026-IT-008',
      woId: 'WO-401476',
      vendor: 'M/s. EMRI Green Health Services',
      amount: 500000,
      headOfAccount: '02A-0201-22012-01',
      status: 'Paid',
      date: '2026-05-05'
    }
  ],
  headOfAccounts: [
    {
      code: '4120-ENG-CAP-Z3',
      description: 'Capital Outlay Zone-3 Flyovers & Grade Separators',
      allocation: 120000000,
      spent: 82000000,
      balance: 38000000
    },
    {
      code: '4120-ENG-REV-MNT',
      description: 'Revenue Outlay Road Maintenance and Asphalt works',
      allocation: 30000000,
      spent: 10000000,
      balance: 20000000
    },
    {
      code: '02A-0201-22012-01',
      description: 'IT Division Communication Expenses (IVR & SMS campaigns)',
      allocation: 5000000,
      spent: 500000,
      balance: 4500000
    }
  ],
  eOfficeNotes: [
    {
      id: 'NOTE-2026-ENG-042',
      fileNumber: 'FILE/ENG/2026/042',
      subject: 'Initiation of Smart Streetlighting Grid in Zone-4',
      projectName: 'Zone-4 Smart LED Streetlighting Phase-3',
      department: 'Electrical & Lighting',
      zone: 'Zone-4 (Secunderabad)',
      description: 'Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).',
      purpose: 'Energy efficiency and smart grid integration',
      background: 'Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.',
      estimatedBudget: 22000000,
      budgetHead: '4120-ENG-REV-MNT',
      justification: 'Reduces electricity consumption by 40% and provides automated failure reporting.',
      benefits: 'Improved citizen safety, lower maintenance expenditure.',
      priority: 'High',
      attachments: ['CCMS_Technical_Spec_v1.pdf', 'Smart_LED_Savings_Feasibility.pdf'],
      remarks: 'Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.',
      additionalConditions: 'Gateways must support 4G/5G dual band.',
      status: 'Pending',
      currentCustodian: 'Commissioner',
      creatorRole: 'Senior Assistant',
      creatorName: 'Sri V. Kumar',
      createdDate: '2026-07-01',
      createdTime: '10:00',
      versions: [
        {
          version: 'v1.0',
          modifiedBy: 'Sri V. Kumar',
          modifiedRole: 'Senior Assistant',
          modifiedDate: '2026-07-01',
          modifiedTime: '10:00',
          subject: 'Initiation of Smart Streetlighting Grid in Zone-4',
          projectName: 'Zone-4 Smart LED Streetlighting Phase-3',
          description: 'Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).',
          purpose: 'Energy efficiency and smart grid integration',
          background: 'Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.',
          estimatedBudget: 20000000,
          budgetHead: '4120-ENG-REV-MNT',
          justification: 'Reduces electricity consumption by 40% and provides automated failure reporting.',
          benefits: 'Improved citizen safety, lower maintenance expenditure.',
          priority: 'High',
          remarks: 'Note sheet created and initiated.',
          additionalConditions: ''
        },
        {
          version: 'v1.1',
          modifiedBy: 'Er. R. Sharma',
          modifiedRole: 'Executive Engineer',
          modifiedDate: '2026-07-02',
          modifiedTime: '11:15',
          subject: 'Initiation of Smart Streetlighting Grid in Zone-4',
          projectName: 'Zone-4 Smart LED Streetlighting Phase-3',
          description: 'Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).',
          purpose: 'Energy efficiency and smart grid integration',
          background: 'Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.',
          estimatedBudget: 22000000,
          budgetHead: '4120-ENG-REV-MNT',
          justification: 'Reduces electricity consumption by 40% and provides automated failure reporting.',
          benefits: 'Improved citizen safety, lower maintenance expenditure.',
          priority: 'High',
          remarks: 'Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.',
          additionalConditions: 'Gateways must support 4G/5G dual band.'
        }
      ],
      workflowStatus: {
        'Senior Assistant': 'Approved',
        'Assistant Engineer': 'Approved',
        'Deputy Executive Engineer': 'Approved',
        'Executive Engineer': 'Approved',
        'Superintending Engineer': 'Approved',
        'Joint Commissioner': 'Approved',
        'Additional Commissioner': 'Approved',
        'Commissioner': 'Pending'
      },
      approvalHistory: [
        {
          officerName: 'Sri V. Kumar',
          role: 'Senior Assistant',
          department: 'Engineering (Zone-3)',
          action: 'Initiated & Forwarded',
          remarks: 'Note sheet created for Secunderabad streetlight expansion project.',
          dateTime: '2026-07-01 10:05',
          status: 'Cleared',
          versionNumber: 'v1.0'
        },
        {
          officerName: 'Er. A. Srinivas',
          role: 'Assistant Engineer',
          department: 'Engineering (Zone-4)',
          action: 'Recommended & Forwarded',
          remarks: 'Wards verified. Recommended for further administrative clearance.',
          dateTime: '2026-07-01 14:22',
          status: 'Cleared',
          versionNumber: 'v1.0'
        },
        {
          officerName: 'Er. K. Mahesh',
          role: 'Deputy Executive Engineer',
          department: 'Engineering (Zone-4)',
          action: 'Recommended & Forwarded',
          remarks: 'Aligned with smart city objectives. Forwarded.',
          dateTime: '2026-07-02 09:12',
          status: 'Cleared',
          versionNumber: 'v1.0'
        },
        {
          officerName: 'Er. R. Sharma',
          role: 'Executive Engineer',
          department: 'Engineering (Zone-3)',
          action: 'Edited, Recommended & Forwarded',
          remarks: 'Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.',
          dateTime: '2026-07-02 11:15',
          status: 'Cleared',
          versionNumber: 'v1.1'
        },
        {
          officerName: 'Er. B. Venkanna',
          role: 'Superintending Engineer',
          department: 'Engineering',
          action: 'Recommended & Forwarded',
          remarks: 'Reviewed and forwarded for JC clearance.',
          dateTime: '2026-07-02 15:40',
          status: 'Cleared',
          versionNumber: 'v1.1'
        },
        {
          officerName: 'Sri V. Anand, KAS',
          role: 'Joint Commissioner',
          department: 'Administration Division',
          action: 'Recommended & Forwarded',
          remarks: 'Administrative feasibility verified.',
          dateTime: '2026-07-03 10:00',
          status: 'Cleared',
          versionNumber: 'v1.1'
        },
        {
          officerName: 'Smt. S. Priyanka, IAS',
          role: 'Additional Commissioner',
          department: 'ERP Operations Division',
          action: 'Recommended & Forwarded',
          remarks: 'Forwarded for final approval and sanction.',
          dateTime: '2026-07-03 16:30',
          status: 'Cleared',
          versionNumber: 'v1.1'
        }
      ],
      auditLogs: [
        {
          user: 'Sri V. Kumar',
          role: 'Senior Assistant',
          date: '2026-07-01',
          time: '10:00',
          ip: '10.2.14.8',
          action: 'Note Created',
          previousValue: '-',
          newValue: 'v1.0 Initial Draft'
        },
        {
          user: 'Er. R. Sharma',
          role: 'Executive Engineer',
          date: '2026-07-02',
          time: '11:15',
          ip: '10.2.5.91',
          action: 'Modify Budget',
          previousValue: 'Rs. 20,000,000',
          newValue: 'Rs. 22,000,000 (v1.1)'
        }
      ]
    },
    {
      id: 'NOTE-2026-ENG-043',
      fileNumber: 'FILE/ENG/2026/043',
      subject: 'CC Road construction at Gachibowli sector-2',
      projectName: 'Gachibowli CC Road Sector-2 Development',
      department: 'Engineering',
      zone: 'Zone-3 (Sherilingampally)',
      description: 'Laying of cement concrete (CC) road in inner lane segments of Gachibowli sector-2 ward.',
      purpose: 'Waterlogging prevention and road strengthening',
      background: 'Inner lane segments suffer from water stagnation during monsoons, damaging bituminous surfaces.',
      estimatedBudget: 8500000,
      budgetHead: '4120-ENG-REV-MNT',
      justification: 'CC road has a life of 20 years with zero maintenance in water stagnation-prone areas.',
      benefits: 'Citizens will have reliable all-weather access roads.',
      priority: 'Medium',
      attachments: [],
      remarks: '',
      additionalConditions: '',
      status: 'Pending',
      currentCustodian: 'Assistant Engineer',
      creatorRole: 'Senior Assistant',
      creatorName: 'Sri V. Kumar',
      createdDate: '2026-07-03',
      createdTime: '11:00',
      versions: [
        {
          version: 'v1.0',
          modifiedBy: 'Sri V. Kumar',
          modifiedRole: 'Senior Assistant',
          modifiedDate: '2026-07-03',
          modifiedTime: '11:00',
          subject: 'CC Road construction at Gachibowli sector-2',
          projectName: 'Gachibowli CC Road Sector-2 Development',
          description: 'Laying of cement concrete (CC) road in inner lane segments of Gachibowli sector-2 ward.',
          purpose: 'Waterlogging prevention and road strengthening',
          background: 'Inner lane segments suffer from water stagnation during monsoons, damaging bituminous surfaces.',
          estimatedBudget: 8500000,
          budgetHead: '4120-ENG-REV-MNT',
          justification: 'CC road has a life of 20 years with zero maintenance in water stagnation-prone areas.',
          benefits: 'Citizens will have reliable all-weather access roads.',
          priority: 'Medium',
          remarks: 'Initiated for review.',
          additionalConditions: ''
        }
      ],
      workflowStatus: {
        'Senior Assistant': 'Approved',
        'Assistant Engineer': 'Pending',
        'Deputy Executive Engineer': 'Waiting',
        'Executive Engineer': 'Waiting',
        'Superintending Engineer': 'Waiting',
        'Joint Commissioner': 'Waiting',
        'Additional Commissioner': 'Waiting',
        'Commissioner': 'Waiting'
      },
      approvalHistory: [
        {
          officerName: 'Sri V. Kumar',
          role: 'Senior Assistant',
          department: 'Engineering (Zone-3)',
          action: 'Initiated & Forwarded',
          remarks: 'CC road proposal for Gachibowli inner lanes.',
          dateTime: '2026-07-03 11:05',
          status: 'Cleared',
          versionNumber: 'v1.0'
        }
      ],
      auditLogs: [
        {
          user: 'Sri V. Kumar',
          role: 'Senior Assistant',
          date: '2026-07-03',
          time: '11:00',
          ip: '10.2.14.8',
          action: 'Note Created',
          previousValue: '-',
          newValue: 'v1.0 Initial Draft'
        }
      ]
    },
    {
      id: 'NOTE-2026-ENG-044',
      fileNumber: 'FILE/ENG/2026/044',
      subject: 'Sanitation Corridor Maintenance System',
      projectName: 'Sanitation Corridor IoT Tracking Pilot',
      department: 'Drainage & Sewerage',
      zone: 'Zone-2 (Kukatpally)',
      description: 'Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.',
      purpose: 'Proactive disaster drainage monitoring',
      background: 'Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.',
      estimatedBudget: 4500000,
      budgetHead: '4120-ENG-CAP-Z3',
      justification: 'Allows alerts to municipal workers before flooding occurs.',
      benefits: 'Drastically reduces sewer backups.',
      priority: 'Low',
      attachments: [],
      remarks: 'Re-initiated with corrected budget.',
      additionalConditions: '',
      status: 'Returned',
      currentCustodian: 'Senior Assistant',
      creatorRole: 'Senior Assistant',
      creatorName: 'Sri V. Kumar',
      createdDate: '2026-07-02',
      createdTime: '15:20',
      versions: [
        {
          version: 'v1.0',
          modifiedBy: 'Sri V. Kumar',
          modifiedRole: 'Senior Assistant',
          modifiedDate: '2026-07-02',
          modifiedTime: '15:20',
          subject: 'Sanitation Corridor Maintenance System',
          projectName: 'Sanitation Corridor IoT Tracking Pilot',
          description: 'Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.',
          purpose: 'Proactive disaster drainage monitoring',
          background: 'Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.',
          estimatedBudget: 6000000,
          budgetHead: '4120-ENG-CAP-Z3',
          justification: 'Allows alerts to municipal workers before flooding occurs.',
          benefits: 'Drastically reduces sewer backups.',
          priority: 'Low',
          remarks: 'Initial initiation.',
          additionalConditions: ''
        },
        {
          version: 'v1.1',
          modifiedBy: 'Sri V. Kumar',
          modifiedRole: 'Senior Assistant',
          modifiedDate: '2026-07-03',
          modifiedTime: '09:30',
          subject: 'Sanitation Corridor Maintenance System',
          projectName: 'Sanitation Corridor IoT Tracking Pilot',
          description: 'Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.',
          purpose: 'Proactive disaster drainage monitoring',
          background: 'Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.',
          estimatedBudget: 4500000,
          budgetHead: '4120-ENG-CAP-Z3',
          justification: 'Allows alerts to municipal workers before flooding occurs.',
          benefits: 'Drastically reduces sewer backups.',
          priority: 'Low',
          remarks: 'Budget reduced from Rs. 60 Lakhs to Rs. 45 Lakhs to adjust scope as requested by AE.',
          additionalConditions: ''
        }
      ],
      workflowStatus: {
        'Senior Assistant': 'Returned',
        'Assistant Engineer': 'Returned',
        'Deputy Executive Engineer': 'Waiting',
        'Executive Engineer': 'Waiting',
        'Superintending Engineer': 'Waiting',
        'Joint Commissioner': 'Waiting',
        'Additional Commissioner': 'Waiting',
        'Commissioner': 'Waiting'
      },
      approvalHistory: [
        {
          officerName: 'Sri V. Kumar',
          role: 'Senior Assistant',
          department: 'Engineering (Zone-3)',
          action: 'Initiated & Forwarded',
          remarks: 'Sanitation tracker proposal.',
          dateTime: '2026-07-02 15:22',
          status: 'Cleared',
          versionNumber: 'v1.0'
        },
        {
          officerName: 'Er. A. Srinivas',
          role: 'Assistant Engineer',
          department: 'Engineering (Zone-4)',
          action: 'Returned for Correction',
          remarks: 'Estimated cost is too high for a pilot project. Reduce budget to under Rs. 50 Lakhs.',
          dateTime: '2026-07-02 17:15',
          status: 'Returned',
          versionNumber: 'v1.0'
        }
      ],
      auditLogs: [
        {
          user: 'Sri V. Kumar',
          role: 'Senior Assistant',
          date: '2026-07-02',
          time: '15:20',
          ip: '10.2.14.8',
          action: 'Note Created',
          previousValue: '-',
          newValue: 'v1.0 Initial Draft'
        },
        {
          user: 'Er. A. Srinivas',
          role: 'Assistant Engineer',
          date: '2026-07-02',
          time: '17:15',
          ip: '10.2.5.91',
          action: 'Returned to creator',
          previousValue: 'Pending Review',
          newValue: 'Returned'
        },
        {
          user: 'Sri V. Kumar',
          role: 'Senior Assistant',
          date: '2026-07-03',
          time: '09:30',
          ip: '10.2.14.8',
          action: 'Resubmit Correction',
          previousValue: 'Rs. 6,000,000',
          newValue: 'Rs. 4,500,000 (v1.1)'
        }
      ]
    }
  ]
};

// ==========================================
// 3. PROJECT-SPECIFIC MOCK DATABASES
// ==========================================
const PROJECT_DOCUMENTS: Record<string, ProjectDocument[]> = {
  'PRJ-8012': [
    { id: 'DOC-801', name: 'Admin_Sanction_Order_PRJ8012.pdf', type: 'pdf', uploadedBy: 'Smt. S. Priyanka, IAS', uploadedDate: '2025-06-05', version: 'v1.0', status: 'Approved', size: '2.4 MB', category: 'Administrative Sanctions' },
    { id: 'DOC-802', name: 'Land_Acquisition_Sanction_GOP.pdf', type: 'pdf', uploadedBy: 'Sri M. Dana Kishore, IAS', uploadedDate: '2026-07-03', version: 'v2.1', status: 'Approved', size: '4.8 MB', category: 'Administrative Sanctions' },
    { id: 'DOC-803', name: 'Structural_Blueprint_Kondapur_V3.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-08-01', version: 'v3.2', status: 'Active', size: '15.6 MB', category: 'Drawings' },
    { id: 'DOC-804', name: 'Traffic_Diversion_Map_Zone3.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-09-10', version: 'v1.0', status: 'Active', size: '1.2 MB', category: 'Drawings' },
    { id: 'DOC-805', name: 'Civil_Foundation_Soil_Testing.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-07-15', version: 'v1.1', status: 'Archived', size: '6.1 MB', category: 'Estimates' },
    { id: 'DOC-806', name: 'Girder_Structural_Cost_Estimate.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-05-20', version: 'v1.0', status: 'Active', size: '3.3 MB', category: 'Estimates' },
    { id: 'DOC-807', name: 'Tender_Award_Notification_Flyover.pdf', type: 'pdf', uploadedBy: 'Sri V. Anand, KAS', uploadedDate: '2025-09-02', version: 'v1.0', status: 'Approved', size: '920 KB', category: 'Tender Documents' },
    { id: 'DOC-808', name: 'WO_Girder_Erection_WO4012.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-09-20', version: 'v1.0', status: 'Active', size: '1.8 MB', category: 'Work Orders' },
    { id: 'DOC-809', name: 'WO_Blacktopping_WO4021.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-10-05', version: 'v1.0', status: 'Active', size: '1.4 MB', category: 'Work Orders' },
    { id: 'DOC-810', name: 'EE_Technical_Clearance_Girder.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2025-08-10', version: 'v1.0', status: 'Approved', size: '540 KB', category: 'Approvals' },
    { id: 'DOC-811', name: 'Contractor_Progress_Bill_WO4021.pdf', type: 'pdf', uploadedBy: 'Global Infrastructure Ltd.', uploadedDate: '2026-07-02', version: 'v1.0', status: 'Pending Review', size: '4.2 MB', category: 'Bills' },
    { id: 'DOC-812', name: 'Invoice_Claim_Aravind_Road.pdf', type: 'pdf', uploadedBy: 'Aravind Constructions', uploadedDate: '2026-07-02', version: 'v1.0', status: 'Pending Payment', size: '1.9 MB', category: 'Invoices' },
    { id: 'DOC-813', name: 'Foundation_Concrete_Completion.pdf', type: 'pdf', uploadedBy: 'Er. R. Sharma', uploadedDate: '2026-01-15', version: 'v1.0', status: 'Approved', size: '2.8 MB', category: 'Completion Certificates' },
    { id: 'DOC-814', name: 'Environmental_NOC_PollutionBoard.pdf', type: 'pdf', uploadedBy: 'Sri V. Anand, KAS', uploadedDate: '2025-03-10', version: 'v1.0', status: 'Approved', size: '3.1 MB', category: 'Other Attachments' }
  ],
  'PRJ-3041': [
    { id: 'DOC-301', name: 'Stormwater_Admin_Sanction.pdf', type: 'pdf', uploadedBy: 'Smt. S. Priyanka, IAS', uploadedDate: '2025-07-02', version: 'v1.0', status: 'Approved', size: '2.1 MB', category: 'Administrative Sanctions' },
    { id: 'DOC-302', name: 'Box_Drain_Hydraulic_Drawings.pdf', type: 'pdf', uploadedBy: 'Er. P. Srinivas', uploadedDate: '2025-08-20', version: 'v1.2', status: 'Active', size: '8.9 MB', category: 'Drawings' }
  ],
  'PRJ-2026-IT-008': [
    { id: 'DOC-IT-801', name: 'ghmc.pdf', type: 'pdf', uploadedBy: 'Sri G. Satyanarayana', uploadedDate: '2026-04-20', version: 'v1.0', status: 'Approved', size: '25.8 KB', category: 'Administrative Sanctions' },
    { id: 'DOC-IT-802', name: 'Proposal_EMRI_GHS_OutboundCall.pdf', type: 'pdf', uploadedBy: 'EMRI Green Health Services', uploadedDate: '2026-04-20', version: 'v1.0', status: 'Approved', size: '1.2 MB', category: 'Tender Documents' },
    { id: 'DOC-IT-803', name: 'WO_IVR_OutboundCall_WO401476.pdf', type: 'pdf', uploadedBy: 'Er. G.N. Sai Ram', uploadedDate: '2026-04-24', version: 'v1.0', status: 'Active', size: '890 KB', category: 'Work Orders' },
    { id: 'DOC-IT-804', name: 'Invoice_TS-26-27-GHMC-0186.pdf', type: 'pdf', uploadedBy: 'EMRI Green Health Services', uploadedDate: '2026-05-05', version: 'v1.0', status: 'Pending Payment', size: '1.4 MB', category: 'Bills' },
    { id: 'DOC-IT-805', name: 'Connected_Calls_Summary_Report.pdf', type: 'pdf', uploadedBy: 'EMRI Green Health Services', uploadedDate: '2026-05-05', version: 'v1.0', status: 'Approved', size: '640 KB', category: 'Other Attachments' }
  ]
};

const PROJECT_WORKFLOWS: Record<string, WorkflowStep[]> = {
  'PRJ-8012': [
    { stage: 'Requirement', officer: 'Sri V. Kumar', department: 'Senior Assistant (Engg)', dateTime: '2025-05-10 10:15', status: 'Completed', remarks: 'Identified chronic bottleneck at Kondapur junction. Traffic gridlocks exceed 25 mins during peak hours.', pendingWith: 'None' },
    { stage: 'Proposal Created', officer: 'Er. R. Sharma', department: 'Executive Engineer', dateTime: '2025-05-20 14:30', status: 'Completed', remarks: 'Designed a 4-lane grade separator layout proposal with service road expansion grids.', pendingWith: 'None' },
    { stage: 'Technical Review', officer: 'Er. R. Sharma', department: 'Executive Engineer', dateTime: '2025-05-28 11:00', status: 'Completed', remarks: 'Structural designs cleared by engineering panel. Soil load capacity parameters certified.', pendingWith: 'None' },
    { stage: 'Administrative Approval', officer: 'Smt. S. Priyanka, IAS', department: 'Addl. Commissioner', dateTime: '2025-06-05 16:45', status: 'Completed', remarks: 'Administrative sanction granted. Approved project budget: Rs. 15.0 Crores.', pendingWith: 'None' },
    { stage: 'Financial Approval', officer: 'Smt. K. Anitha Reddy', department: 'Chief Finance Officer', dateTime: '2025-06-12 12:20', status: 'Completed', remarks: 'Fund reserve allocated under Capital Outlay Code 4120-ENG-CAP-Z3.', pendingWith: 'None' },
    { stage: 'Work Order Issued', officer: 'Er. R. Sharma', department: 'Executive Engineer', dateTime: '2025-09-20 09:30', status: 'Completed', remarks: 'Work Order WO-4012 released to Global Infrastructure Ltd.', pendingWith: 'None' },
    { stage: 'Execution', officer: 'Global Infrastructure Ltd.', department: 'Contractor', dateTime: '2026-05-20 17:00', status: 'Completed', remarks: 'Pillar erection, concrete foundation, and support structures completed.', pendingWith: 'None' },
    { stage: 'Invoice Submitted', officer: 'Global Infrastructure Ltd.', department: 'Contractor', dateTime: '2026-07-02 11:30', status: 'Completed', remarks: 'Invoice submitted for foundation completion milestone. Claim: Rs. 3.5 Crores.', pendingWith: 'None' },
    { stage: 'Budget Allocation', officer: 'Smt. K. Anitha Reddy', department: 'Chief Finance Officer', dateTime: '2026-07-03 11:15', status: 'Completed', remarks: 'Linked budget account and mapped payment ledger codes.', pendingWith: 'None' },
    { stage: 'Payment Released', officer: 'Smt. K. Anitha Reddy', department: 'Chief Finance Officer', dateTime: '2026-07-03 15:40', status: 'In Progress', remarks: 'Treasury payment processing. Clearance scheduled within 24 hours.', pendingWith: 'Additional Commissioner' },
    { stage: 'Project Completed', officer: 'Er. R. Sharma', department: 'Executive Engineer', dateTime: 'Pending', status: 'Pending', remarks: 'Final paving and smart system commission operations to follow.', pendingWith: 'Contractor / EE' }
  ],
  'PRJ-2026-IT-008': [
    { stage: 'Requirement', officer: 'Sri G. Satyanarayana', department: 'Senior Assistant (IT)', dateTime: '2026-04-18 10:15', status: 'Completed', remarks: 'Commissioner instructed IT Section to launch call campaign targeting early bird property tax rebate outreach.', pendingWith: 'None' },
    { stage: 'Proposal Created', officer: 'EMRI Green Health Services', department: 'Call Center Agency', dateTime: '2026-04-20 14:30', status: 'Completed', remarks: 'Submitted costing proposal of Rs. 5.0 Lakhs to target 6.5 Lakh citizens.', pendingWith: 'None' },
    { stage: 'Technical Review', officer: 'Er. G.N. Sai Ram', department: 'Assistant Engineer', dateTime: '2026-04-21 11:00', status: 'Completed', remarks: 'Technical feasibility verified. Agency possesses existing infrastructure.', pendingWith: 'None' },
    { stage: 'Administrative Approval', officer: 'R V KARNAN IAS', department: 'Commissioner', dateTime: '2026-04-21 15:42', status: 'Completed', remarks: 'Administrative sanction granted for Rs. 5 Lakhs.', pendingWith: 'None' },
    { stage: 'Work Order Issued', officer: 'Er. G.N. Sai Ram', department: 'Assistant Engineer', dateTime: '2026-04-24 09:30', status: 'Completed', remarks: 'Work Order WO-401476 issued to EMRI GHS.', pendingWith: 'None' },
    { stage: 'Execution', officer: 'EMRI Green Health Services', department: 'Agency', dateTime: '2026-04-30 17:00', status: 'Completed', remarks: 'IVR Outbound Call campaign completed. Connected calls: 146,497. Not connected: 570,210.', pendingWith: 'None' },
    { stage: 'Invoice Submitted', officer: 'EMRI Green Health Services', department: 'Agency', dateTime: '2026-05-05 11:30', status: 'Completed', remarks: 'Invoice TS/26-27/GHMC/0186 submitted for Rs. 5,00,000/-', pendingWith: 'None' },
    { stage: 'Budget Allocation', officer: 'K. SARATH CHANDRA', department: 'Financial Advisor', dateTime: '2026-05-20 16:32', status: 'Completed', remarks: 'Budget entry provided vide BAS No. HO-26004560/2026-27.', pendingWith: 'None' },
    { stage: 'Payment Released', officer: 'K. SARATH CHANDRA', department: 'Financial Advisor', dateTime: '2026-06-04 15:40', status: 'Completed', remarks: 'Payment released in full. Transaction finalized.', pendingWith: 'None' },
    { stage: 'Project Completed', officer: 'Er. G.N. Sai Ram', department: 'Assistant Engineer', dateTime: '2026-06-04 17:00', status: 'Completed', remarks: 'Outreach campaign successfully executed and fully settled.', pendingWith: 'None' }
  ]
};

const PROJECT_TEAMS: Record<string, TeamMember[]> = {
  'PRJ-8012': [
    { name: 'Sri M. Dana Kishore, IAS', role: 'Commissioner', department: 'Executive wing', avatarText: 'DK' },
    { name: 'Smt. S. Priyanka, IAS', role: 'Additional Commissioner', department: 'ERP Operations Division', avatarText: 'SP' },
    { name: 'Sri V. Anand, KAS', role: 'Joint Commissioner', department: 'Administration Division', avatarText: 'VA' },
    { name: 'Er. R. Sharma', role: 'Executive Engineer', department: 'Engineering (Zone-3)', avatarText: 'RS' },
    { name: 'Sri V. Kumar', role: 'Senior Assistant', department: 'Engineering (Zone-3)', avatarText: 'VK' },
    { name: 'Smt. K. Anitha Reddy', role: 'Chief Finance Officer', department: 'Finance Division', avatarText: 'AR' },
    { name: 'Global Infrastructure Ltd.', role: 'Lead Contractor', department: 'External Partner', avatarText: 'GI' }
  ],
  'PRJ-3041': [
    { name: 'Er. P. Srinivas', role: 'Executive Engineer', department: 'Drainage & Sewerage', avatarText: 'PS' },
    { name: 'Sri V. Kumar', role: 'Senior Assistant', department: 'Drainage & Sewerage', avatarText: 'VK' },
    { name: 'Aravind Constructions', role: 'Contractor', department: 'External Partner', avatarText: 'AC' }
  ],
  'PRJ-2026-IT-008': [
    { name: 'R V KARNAN IAS', role: 'Commissioner', department: 'Executive wing', avatarText: 'RK' },
    { name: 'MANDA MAKARANDU IAS', role: 'Additional Commissioner', department: 'IT Division', avatarText: 'MM' },
    { name: 'C RADHA', role: 'Joint Commissioner', department: 'IT Division', avatarText: 'CR' },
    { name: 'Er. Narsing Rao Kormi', role: 'Deputy Executive Engineer', department: 'IT Division', avatarText: 'NK' },
    { name: 'Er. G.N. Sai Ram', role: 'Assistant Engineer', department: 'IT Division', avatarText: 'SR' },
    { name: 'Sri G. Satyanarayana', role: 'Senior Assistant', department: 'IT Division', avatarText: 'GS' },
    { name: 'M/s. EMRI Green Health Services', role: 'Agency Partner', department: 'Call Center Ops', avatarText: 'EM' }
  ]
};

const PROJECT_TIMELINES: Record<string, ProjectTimelineEvent[]> = {
  'PRJ-8012': [
    { date: '2026-07-03', time: '15:40', actor: 'Finance Officer', activity: 'Cleared bill payment release transaction for Bill BILL-901.' },
    { date: '2026-07-03', time: '14:20', actor: 'Addl. Commissioner', activity: 'Forwarded File FILE-2026-ENG-402 with remarks to Commissioner.' },
    { date: '2026-07-03', time: '11:15', actor: 'Finance Officer', activity: 'Linked budget head 4120-ENG-CAP-Z3 to Work Order WO-4021.' },
    { date: '2026-07-02', time: '11:30', actor: 'Global Infrastructure Ltd.', activity: 'Submitted invoice claim for girder foundation work.' },
    { date: '2026-06-28', time: '14:15', actor: 'Executive Engineer', activity: 'Approved structural drawings for steel girder spans.' }
  ],
  'PRJ-2026-IT-008': [
    { date: '2026-06-04', time: '15:40', actor: 'Financial Advisor', activity: 'Payment released in full for Invoice TS/26-27/GHMC/0186.' },
    { date: '2026-05-20', time: '16:32', actor: 'Financial Advisor', activity: 'Budget entry BAS No. HO-26004560/2026-27 approved.' },
    { date: '2026-05-05', time: '11:30', actor: 'EMRI Green Health Services', activity: 'Submitted Invoice claim of Rs. 5 Lakhs (Excl GST).' },
    { date: '2026-04-30', time: '17:00', actor: 'EMRI Green Health Services', activity: 'Completed call campaigns for 6.5 Lakh citizens.' },
    { date: '2026-04-24', time: '09:30', actor: 'Assistant Engineer', activity: 'Issued Work Order WO-401476.' },
    { date: '2026-04-21', time: '15:42', actor: 'Commissioner', activity: 'Administrative sanction granted.' }
  ]
};

// ==========================================
// 4. BOOTSTRAP / INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Restore session
  const storedUser = sessionStorage.getItem('ghmc_user');
  if (storedUser && USERS[storedUser]) {
    state.currentUser = USERS[storedUser];
    state.activeView = 'landing';
    document.getElementById('login-screen')?.classList.add('hidden');
    document.getElementById('app-wrapper')?.classList.remove('hidden');
    renderAppShell();
    switchToView('landing');
  } else {
    state.activeView = 'login';
    generateCaptcha();
  }

  bindLoginEvents();
  bindAppShellEvents();
  bindSearchEvents();
});

// ==========================================
// 5. CAPTCHA & LOGIN LOGIC
// ==========================================
function generateCaptcha() {
  const capLabel = document.getElementById('captcha-equation');
  const num1 = Math.floor(Math.random() * 9) + 1;
  const num2 = Math.floor(Math.random() * 9) + 1;
  state.captchaCode = num1 + num2;
  if (capLabel) {
    capLabel.textContent = `${num1} + ${num2} = `;
  }
  const capInput = document.getElementById('login-captcha') as HTMLInputElement;
  if (capInput) capInput.value = '';
}

function bindLoginEvents() {
  const form = document.getElementById('login-form');
  const refreshBtn = document.getElementById('refresh-captcha');
  const errorBox = document.getElementById('login-error');

  refreshBtn?.addEventListener('click', () => generateCaptcha());

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVal = (document.getElementById('login-username') as HTMLInputElement).value.trim().toLowerCase();
    const passVal = (document.getElementById('login-password') as HTMLInputElement).value;
    const captchaVal = parseInt((document.getElementById('login-captcha') as HTMLInputElement).value, 10);

    if (captchaVal !== state.captchaCode) {
      if (errorBox) {
        errorBox.textContent = 'Captcha validation failed. Please try again.';
        errorBox.classList.remove('hidden');
      }
      generateCaptcha();
      return;
    }

    const matchedUser = Object.values(USERS).find(u => u.username === userVal);
    if (matchedUser && passVal === 'password') {
      loginAs(matchedUser);
    } else {
      if (errorBox) {
        errorBox.textContent = 'Invalid credentials. Use "password" as standard mock password.';
        errorBox.classList.remove('hidden');
      }
      generateCaptcha();
    }
  });

  const demoButtons = document.querySelectorAll('.demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.getAttribute('data-role');
      const matchedUser = Object.values(USERS).find(u => u.role === targetRole);
      if (matchedUser) {
        loginAs(matchedUser);
      }
    });
  });
}

function loginAs(user: User) {
  state.currentUser = user;
  state.activeView = 'landing';
  state.activeProject = null;
  state.activeModule = 'dashboard';
  sessionStorage.setItem('ghmc_user', user.username);
  
  logAudit(user.roleText, 'User authenticated successfully', 'Success');
  
  const loginScr = document.getElementById('login-screen');
  const appScr = document.getElementById('app-wrapper');
  
  if (loginScr) loginScr.classList.add('hidden');
  if (appScr) appScr.classList.remove('hidden');

  const errorBox = document.getElementById('login-error');
  if (errorBox) errorBox.classList.add('hidden');
  
  renderAppShell();
  switchToView('landing');
  showToast(`Welcome back, ${user.name}`);
}

// ==========================================
// 6. GLOBAL APP SHELL (NAVIGATION & EVENTS)
// ==========================================
function renderAppShell() {
  const user = state.currentUser;
  if (!user) return;

  const avatar = document.getElementById('navbar-avatar-text');
  const username = document.getElementById('navbar-username');
  const role = document.getElementById('navbar-role');
  
  const mName = document.getElementById('dropdown-mobile-name');
  const mRole = document.getElementById('dropdown-mobile-role');

  if (avatar) avatar.textContent = user.name.split(' ').map(n => n[0]).filter(c => c && c.toUpperCase() === c).slice(0, 2).join('');
  if (username) username.textContent = user.name;
  if (role) role.textContent = user.roleText;
  
  if (mName) mName.textContent = user.name;
  if (mRole) mRole.textContent = user.roleText;

  renderNotificationsBadge();
}

function bindAppShellEvents() {
  const sidebarBtn = document.getElementById('sidebar-collapse-btn');
  const sidebar = document.getElementById('sidebar');
  sidebarBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('w-64');
    sidebar?.classList.toggle('w-16');
  });

  const profileMenu = document.getElementById('user-profile-menu');
  const profileDropdown = document.getElementById('profile-dropdown');
  profileMenu?.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown?.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    profileDropdown?.classList.add('hidden');
  });

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentUser) {
      logAudit(state.currentUser.roleText, 'User signed out', 'Success');
    }
    sessionStorage.removeItem('ghmc_user');
    state.currentUser = null;
    state.activeView = 'login';
    state.activeProject = null;
    
    document.getElementById('app-wrapper')?.classList.add('hidden');
    document.getElementById('login-screen')?.classList.remove('hidden');
    generateCaptcha();
  });

  const bell = document.getElementById('navbar-bell');
  const backdrop = document.getElementById('notification-backdrop');
  const drawer = document.getElementById('notification-drawer');
  
  bell?.addEventListener('click', () => {
    drawer?.classList.remove('translate-x-full');
    backdrop?.classList.remove('hidden');
    renderNotificationDrawer();
  });

  backdrop?.addEventListener('click', () => {
    drawer?.classList.add('translate-x-full');
    backdrop?.classList.add('hidden');
  });
}

// ==========================================
// 7. GLOBAL SEARCH ENGINE
// ==========================================
function bindSearchEvents() {
  const input = document.getElementById('global-search-input') as HTMLInputElement;
  const dropdown = document.getElementById('search-dropdown');

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      if (dropdown) dropdown.classList.add('hidden');
      return;
    }

    const results: Array<{ title: string; category: string; action: () => void }> = [];
    const seen = new Set<string>();

    const addResult = (title: string, category: string, action: () => void) => {
      const key = `${title.toLowerCase()}||${category.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({ title, category, action });
      }
    };

    // Projects search
    state.projects.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.department.toLowerCase().includes(q)) {
        addResult(`${p.id} - ${p.name}`, 'Projects Directory', () => {
          switchToProjectWorkspace(p);
        });
      }
    });

    // Files search
    state.eOfficeFiles.forEach(f => {
      if (f.id.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q)) {
        const p = state.projects.find(proj => proj.id === f.projectId);
        addResult(`${f.id} - ${f.subject}`, 'eOffice Files', () => {
          if (p) {
            state.activeProject = p;
            state.activeView = 'project-workspace';
            state.activeProjectModule = 'eoffice';
            selectedFileId = f.id;
            renderSidebar();
            renderMainContent();
          }
        });
      }
    });

    // Work Orders search
    state.workOrders.forEach(w => {
      if (w.id.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.vendor.toLowerCase().includes(q)) {
        const p = state.projects.find(proj => proj.id === w.projectId);
        addResult(`${w.id} - ${w.title} (${w.vendor})`, 'Work Orders (ERP)', () => {
          if (p) {
            state.activeProject = p;
            state.activeView = 'project-workspace';
            state.activeProjectModule = 'workorders';
            selectedWoId = w.id;
            renderSidebar();
            renderMainContent();
          }
        });
      }
    });

    // Employees & Vendors search from PROJECT_TEAMS
    Object.entries(PROJECT_TEAMS).forEach(([projId, members]) => {
      const p = state.projects.find(proj => proj.id === projId);
      members.forEach(m => {
        const isVendor = ['Lead Contractor', 'Contractor', 'Agency Partner'].includes(m.role) || m.department === 'External Partner';
        
        if (isVendor) {
          // Vendor search matching
          if (m.name.toLowerCase().includes(q) || (p && p.name.toLowerCase().includes(q))) {
            addResult(`${m.name} (${m.role})`, `Vendor Partner (Project: ${p ? p.name : projId})`, () => {
              if (p) {
                switchToProjectWorkspace(p);
                state.activeProjectModule = 'team';
                renderSidebar();
                renderMainContent();
              }
            });
          }
        } else {
          // Employee search matching
          if (m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)) {
            addResult(`${m.name} - ${m.role}`, `GHMC Employee (Dept: ${m.department})`, () => {
              if (p) {
                switchToProjectWorkspace(p);
                state.activeProjectModule = 'team';
                renderSidebar();
                renderMainContent();
              }
            });
          }
        }
      });
    });

    if (results.length === 0) {
      if (dropdown) {
        dropdown.innerHTML = '<div class="p-4 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">No matching registry found</div>';
        dropdown.classList.remove('hidden');
      }
      return;
    }

    if (dropdown) {
      dropdown.innerHTML = results.map((r, i) => `
        <div class="search-result-item px-4 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex items-center justify-between text-xs" data-index="${i}">
          <div>
            <div class="font-bold text-slate-800">${r.title}</div>
            <div class="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider mt-0.5">${r.category}</div>
          </div>
          <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      `).join('');
      dropdown.classList.remove('hidden');

      const items = dropdown.querySelectorAll('.search-result-item');
      items.forEach(el => {
        el.addEventListener('click', () => {
          const idx = parseInt(el.getAttribute('data-index') || '0', 10);
          results[idx].action();
          input.value = '';
          dropdown.classList.add('hidden');
        });
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target as Node) && e.target !== input) {
      dropdown.classList.add('hidden');
    }
  });
}

// ==========================================
// 8. NAVIGATION ROUTING & CONTEXT SWAPPING
// ==========================================
function switchToView(
  view: 'login' | 'landing' | 'projects-list' | 'project-workspace' | 'status-view' | 'reports-view' | 'notifications-view' | 'audit-logs-view' | 'eoffice-view', 
  projectObj: Project | null = null
) {
  state.activeView = view;
  
  if (view === 'project-workspace' && projectObj) {
    state.activeProject = projectObj;
    state.activeProjectModule = 'tracking';
    activeSummaryTab = 'overview';
    logAudit(state.currentUser?.roleText || 'Unknown', `Entered project workspace: ${projectObj.name}`, 'Success');
  } else if (view === 'projects-list') {
    state.activeProject = null;
    state.activeModule = 'projects';
  } else if (view === 'landing') {
    state.activeProject = null;
    state.activeModule = 'dashboard';
  } else if (view === 'status-view') {
    state.activeProject = null;
    state.activeModule = 'status';
  } else if (view === 'reports-view') {
    state.activeProject = null;
    state.activeModule = 'reports';
  } else if (view === 'notifications-view') {
    state.activeProject = null;
    state.activeModule = 'notifications';
  } else if (view === 'audit-logs-view') {
    state.activeProject = null;
    state.activeModule = 'audit';
  } else if (view === 'eoffice-view') {
    state.activeProject = null;
    state.activeModule = 'eoffice';
  }

  renderSidebar();
  renderMainContent();
  updateTopNavbarCounters();
}

function switchToProjectWorkspace(project: Project) {
  switchToView('project-workspace', project);
}

// Dynamic Sidebar Renderer
function renderSidebar() {
  const navContainer = document.getElementById('sidebar-nav');
  const projTag = document.getElementById('sidebar-project-info');
  const user = state.currentUser;

  if (!navContainer || !user) return;

  navContainer.innerHTML = '';

  // Always hide the context badge/header above navigation to keep sidebar identical
  projTag?.classList.add('hidden');

  // Global navigation tabs (always visible)
  const portalTabs = [
    { id: 'dashboard', name: 'Dashboard', svgPath: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>' },
    { id: 'eoffice', name: 'eOffice Notes', svgPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>' },
    { id: 'projects', name: 'Projects', svgPath: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>' },
    { id: 'status', name: 'Status', svgPath: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { id: 'reports', name: 'Reports', svgPath: '<path d="M18 20V10M12 20V4M6 20v-6"/>' },
    { id: 'notifications', name: 'Notifications', svgPath: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' },
    { id: 'audit', name: 'Audit Logs', svgPath: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>' }
  ];

  const filteredPortalTabs = portalTabs.filter(t => {
    if (user.role === 'Vendor') {
      return ['dashboard', 'projects', 'status'].includes(t.id);
    }
    return true;
  });

  filteredPortalTabs.forEach(t => {
    // A main tab is active if we are currently on its view
    // For project-workspace view, the main tab 'projects' is active
    const isMainTabActive = (state.activeView === 'project-workspace' && t.id === 'projects') || (state.activeModule === t.id && state.activeView !== 'project-workspace' && state.activeView !== 'login');

    // Projects sub-items are active instead of the main Projects tab when a sub-item is selected,
    // but if the user wants it to look like main navigation, we highlight whichever is currently active.
    // Let's highlight the main 'Projects' tab if we are in project workspace but NOT a sub-item,
    // or let's highlight the active sub-item itself and keep the main 'Projects' tab styled normally (non-active).
    // The user requested: "use the same width, colors, typography, icons, spacing, hover effects, and active item styling as the main navigation."
    // Let's highlight the main tab only when it is active itself (not inside a sub-workspace tab)
    // or keep the main 'Projects' tab active while we are inside any project tab.
    // Actually, highlighting the sub-item itself is much clearer so the user knows which sub-module they are in!
    // So: main 'Projects' tab is highlighted when we are on the projects-list view,
    // and the specific sub-item is highlighted when we are in a project workspace view.
    const shouldHighlightMainTab = (state.activeView === 'projects-list' && t.id === 'projects') || (state.activeModule === t.id && state.activeView !== 'project-workspace' && state.activeView !== 'login');

    const activeClass = shouldHighlightMainTab ? 'bg-[#2563EB] text-white font-semibold shadow-sm' : 'hover:bg-[#DBEAFE] text-[#4B5563] hover:text-[#2563EB]';
    const iconClass = shouldHighlightMainTab ? 'text-white' : 'text-[#2563EB]';

    const item = document.createElement('a');
    item.className = `flex items-center gap-3 px-3 py-2 text-xs rounded-md transition-all cursor-pointer ${activeClass}`;
    item.innerHTML = `
      <svg class="w-4 h-4 shrink-0 ${iconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${t.svgPath}
      </svg>
      <span class="sidebar-item-text truncate">${t.name}</span>
    `;
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (t.id === 'dashboard') {
        switchToView('landing');
      } else if (t.id === 'eoffice') {
        switchToView('eoffice-view');
      } else if (t.id === 'projects') {
        switchToView('projects-list');
      } else if (t.id === 'status') {
        switchToView('status-view');
      } else if (t.id === 'reports') {
        switchToView('reports-view');
      } else if (t.id === 'notifications') {
        switchToView('notifications-view');
      } else if (t.id === 'audit') {
        switchToView('audit-logs-view');
      }
    });
    navContainer.appendChild(item);

    // If this is the Projects tab and a project workspace is active, render the project submenu
    if (t.id === 'projects' && state.activeProject) {
      // Clean, minimal header for active project context
      const subHeader = document.createElement('div');
      subHeader.className = 'pl-8 pr-3 py-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest select-none truncate border-t border-slate-100/50 mt-1';
      subHeader.textContent = `${state.activeProject.id}`;
      navContainer.appendChild(subHeader);

      const workspaceTabs = [
        { id: 'tracking', name: 'Tracking', svgPath: '<polygon points="5 3 19 12 5 21 5 3"/>' },
        { id: 'notes', name: 'Notes', svgPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
        { id: 'summary', name: 'Summary', svgPath: '<path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/>' },
        { id: 'documents', name: 'Related Documents', svgPath: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>' },
        { id: 'aiassist', name: 'AI Assist', svgPath: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
        { id: 'approvals', name: 'Approvals', svgPath: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' }
      ];

      workspaceTabs.forEach(wt => {
        if (wt.id === 'approvals' && user.role === 'Vendor') return;

        // Sub tab is active if we are in project workspace and this sub-module is selected
        const isSubTabActive = state.activeView === 'project-workspace' && state.activeProjectModule === wt.id;
        const subActiveClass = isSubTabActive ? 'bg-[#2563EB] text-white font-semibold shadow-sm' : 'hover:bg-[#DBEAFE] text-[#4B5563] hover:text-[#2563EB]';
        const subIconClass = isSubTabActive ? 'text-white' : 'text-[#2563EB]';

        const subItem = document.createElement('a');
        subItem.className = `flex items-center gap-3 pl-8 pr-3 py-2 text-xs rounded-md transition-all cursor-pointer ${subActiveClass}`;
        subItem.innerHTML = `
          <svg class="w-4 h-4 shrink-0 ${subIconClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${wt.svgPath}
          </svg>
          <span class="sidebar-item-text truncate">${wt.name}</span>
        `;
        subItem.addEventListener('click', (e) => {
          e.preventDefault();
          switchToView('project-workspace', state.activeProject);
          state.activeProjectModule = wt.id;
          renderSidebar();
          renderMainContent();
        });
        navContainer.appendChild(subItem);
      });
    }
  });
}

// Global Breadcrumb Builder
function getBreadcrumbsHtml(): string {
  if (state.activeView === 'landing') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <span class="text-slate-850">Portal Home</span>
        <span>/</span>
        <span class="text-slate-400">Dashboard</span>
      </nav>
    `;
  }
  if (state.activeView === 'eoffice-view') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">eOffice Notes Workflow</span>
      </nav>
    `;
  }
  if (state.activeView === 'projects-list') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850">Projects Directory</span>
      </nav>
    `;
  }
  if (state.activeView === 'status-view') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850">Status</span>
      </nav>
    `;
  }
  if (state.activeView === 'reports-view') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">System Reports</span>
      </nav>
    `;
  }
  if (state.activeView === 'notifications-view') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">Notifications</span>
      </nav>
    `;
  }
  if (state.activeView === 'audit-logs-view') {
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">Audit Logs</span>
      </nav>
    `;
  }
  if (state.activeView === 'project-workspace' && state.activeProject) {
    const tabName = state.activeProjectModule.toUpperCase();
    return `
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('projects-list')">Projects Directory</a>
        <span>/</span>
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToProjectWorkspace(state.activeProject)">${state.activeProject.id}</a>
        <span>/</span>
        <span class="text-slate-850">${tabName}</span>
      </nav>
    `;
  }
  return '';
}

// Main Panel routing gateway
function renderMainContent() {
  const panel = document.getElementById('content-panel');
  if (!panel) return;
  panel.scrollTop = 0;

  // Insert breadcrumb trail above all dashboards
  const breadcrumbHtml = getBreadcrumbsHtml();

  if (state.activeView === 'landing') {
    panel.innerHTML = `${breadcrumbHtml}<div id="landing-dashboard-view"></div>`;
    renderLandingDashboard();
  } else if (state.activeView === 'projects-list') {
    panel.innerHTML = `${breadcrumbHtml}<div id="projects-list-view" class="animate-toast-slide-in"></div>`;
    renderProjectsListDirectory();
  } else if (state.activeView === 'project-workspace' && state.activeProject) {
    panel.innerHTML = `
      ${breadcrumbHtml}
      <!-- Workspace wrapper -->
      <div id="project-workspace-view" class="animate-toast-slide-in space-y-6"></div>
    `;
    renderProjectWorkspaceContainer();
  } else if (state.activeView === 'status-view') {
    panel.innerHTML = `${breadcrumbHtml}<div id="status-view-container" class="animate-toast-slide-in"></div>`;
    renderGlobalStatusView();
  } else if (state.activeView === 'reports-view') {
    panel.innerHTML = `${breadcrumbHtml}<div id="reports-view-container" class="animate-toast-slide-in"></div>`;
    renderGlobalReportsView();
  } else if (state.activeView === 'notifications-view') {
    panel.innerHTML = `${breadcrumbHtml}<div id="notifications-view-container" class="animate-toast-slide-in"></div>`;
    renderGlobalNotificationsView();
  } else if (state.activeView === 'audit-logs-view') {
    panel.innerHTML = `${breadcrumbHtml}<div id="audit-logs-container" class="animate-toast-slide-in"></div>`;
    renderGlobalAuditLogsView();
  } else if (state.activeView === 'eoffice-view') {
    panel.innerHTML = `${breadcrumbHtml}<div id="eoffice-view-container" class="animate-toast-slide-in"></div>`;
    renderEOfficeWorkflowView();
  }
}

// ==========================================
// eOFFICE NOTE APPROVAL WORKFLOW
// ==========================================
let activeNoteId: string | null = null;
let isCreatingNote = false;
let activeNoteTab: 'inbox' | 'outbox' | 'drafts' = 'inbox';
let activeStatusTab: 'pending' | 'approved' | 'rejected' = 'pending';
let selectedVersion1 = '';
let selectedVersion2 = '';
let isCompareMode = false;
let activeDetailVersion: string | null = null;

function renderEOfficeWorkflowView() {
  const container = document.getElementById('eoffice-view-container');
  if (!container) return;

  const user = state.currentUser;
  if (!user) return;

  if (activeNoteId) {
    renderNoteDetail(container, user);
  } else if (isCreatingNote) {
    renderInitiationForm(container, user);
  } else {
    renderNoteList(container, user);
  }
}

function renderNoteList(container: HTMLElement, user: User) {
  // Inbox notes: notes pending review at the current role, or returned to creator
  const inboxNotes = state.eOfficeNotes.filter(n => 
    n.status !== 'Draft' && 
    (
      (n.status === 'Pending' && n.currentCustodian === user.role) ||
      (n.status === 'Returned' && user.role === 'Senior Assistant' && n.currentCustodian === 'Senior Assistant')
    )
  );

  // Outbox notes: notes where current custodian is NOT the current user, but the user role has already acted on it
  const outboxNotes = state.eOfficeNotes.filter(n => 
    n.currentCustodian !== user.role && 
    n.approvalHistory.some(h => h.role === user.role)
  );

  // Draft notes: status Draft, created by the user
  const draftNotes = state.eOfficeNotes.filter(n => 
    n.status === 'Draft' && 
    n.creatorName === user.name
  );

  let currentNotes = inboxNotes;
  if (activeNoteTab === 'outbox') currentNotes = outboxNotes;
  if (activeNoteTab === 'drafts') currentNotes = draftNotes;

  const isSA = user.role === 'Senior Assistant';

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">eOffice project initiation notes</h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold">Every project must go through note approval before active execution.</p>
        </div>
        ${isSA ? `
          <button id="btn-initiate-note" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded cursor-pointer transition-colors flex items-center gap-2">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Initiate Project Note
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Tabs Header -->
    <div class="flex border-b border-slate-200 mb-6 bg-white rounded-t-md px-4 pt-3">
      <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeNoteTab === 'inbox' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}" id="tab-note-inbox">
        Inbox (${inboxNotes.length})
      </button>
      <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeNoteTab === 'outbox' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}" id="tab-note-outbox">
        Outbox (${outboxNotes.length})
      </button>
      ${isSA ? `
        <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeNoteTab === 'drafts' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}" id="tab-note-drafts">
          Drafts (${draftNotes.length})
        </button>
      ` : ''}
    </div>

    <!-- List table -->
    <div class="bg-white border border-slate-200 rounded-md overflow-hidden">
      ${currentNotes.length === 0 ? `
        <div class="p-12 text-center">
          <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">No Project Notes in this folder</p>
        </div>
      ` : `
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-450 border-b border-slate-200 text-[9px] font-bold uppercase tracking-widest">
                <th class="p-4">File No & ID</th>
                <th class="p-4">Subject & Project</th>
                <th class="p-4">Budget (Estimated)</th>
                <th class="p-4">Priority</th>
                <th class="p-4">Current Custodian</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              ${currentNotes.map(n => {
                let priorityClass = 'bg-slate-50 text-slate-600 border-slate-100';
                if (n.priority === 'High') priorityClass = 'bg-rose-50 text-rose-700 border-rose-100';
                else if (n.priority === 'Medium') priorityClass = 'bg-amber-50 text-amber-700 border-amber-100';

                let statusClass = 'bg-slate-50 text-slate-600';
                if (n.status === 'Approved') statusClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
                else if (n.status === 'Pending') statusClass = 'bg-blue-50 text-blue-700 border border-blue-100';
                else if (n.status === 'Returned') statusClass = 'bg-orange-50 text-orange-700 border border-orange-100';
                else if (n.status === 'Rejected') statusClass = 'bg-rose-50 text-rose-700 border border-rose-100';

                return `
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="p-4 font-mono font-semibold text-[10px] text-slate-500">
                      <div>${n.fileNumber}</div>
                      <div class="text-[9px] text-slate-400 mt-0.5">${n.id}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-slate-800">${n.subject}</div>
                      <div class="text-[10px] text-[#2563EB] font-semibold mt-0.5">${n.projectName}</div>
                    </td>
                    <td class="p-4 font-bold text-slate-800">
                      Rs. ${(n.estimatedBudget / 100000).toFixed(1)} Lakhs
                    </td>
                    <td class="p-4">
                      <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${priorityClass}">${n.priority}</span>
                    </td>
                    <td class="p-4 text-slate-600 font-semibold">
                      ${n.currentCustodian}
                    </td>
                    <td class="p-4">
                      <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${statusClass}">${n.status}</span>
                    </td>
                    <td class="p-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        ${n.status === 'Draft' ? `
                          <button class="btn-edit-draft bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors" data-id="${n.id}">
                            Edit
                          </button>
                          <button class="btn-delete-draft bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors" data-id="${n.id}">
                            Delete
                          </button>
                        ` : `
                          <button class="btn-view-note bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors" data-id="${n.id}">
                            Open Note
                          </button>
                        `}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;

  // Bind tab switches
  document.getElementById('tab-note-inbox')?.addEventListener('click', () => {
    activeNoteTab = 'inbox';
    renderEOfficeWorkflowView();
  });
  document.getElementById('tab-note-outbox')?.addEventListener('click', () => {
    activeNoteTab = 'outbox';
    renderEOfficeWorkflowView();
  });
  document.getElementById('tab-note-drafts')?.addEventListener('click', () => {
    activeNoteTab = 'drafts';
    renderEOfficeWorkflowView();
  });

  // Bind new note action
  document.getElementById('btn-initiate-note')?.addEventListener('click', () => {
    isCreatingNote = true;
    activeNoteId = null;
    renderEOfficeWorkflowView();
  });

  // Bind buttons in table
  container.querySelectorAll('.btn-view-note').forEach(b => {
    b.addEventListener('click', () => {
      activeNoteId = b.getAttribute('data-id');
      activeDetailVersion = null; // reset to show latest
      isCompareMode = false;
      renderEOfficeWorkflowView();
    });
  });

  container.querySelectorAll('.btn-edit-draft').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      isCreatingNote = true;
      activeNoteId = id;
      renderEOfficeWorkflowView();
    });
  });

  container.querySelectorAll('.btn-delete-draft').forEach(b => {
    b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this draft note?')) {
        state.eOfficeNotes = state.eOfficeNotes.filter(n => n.id !== id);
        logAudit(user.roleText, `Deleted draft note: ${id}`, 'Success');
        showToast('Draft deleted successfully');
        renderEOfficeWorkflowView();
      }
    });
  });
}

function renderInitiationForm(container: HTMLElement, user: User) {
  let editNote: eOfficeNote | undefined = undefined;
  if (activeNoteId) {
    editNote = state.eOfficeNotes.find(n => n.id === activeNoteId);
  }

  // Generate a file number if new
  const generatedFileNum = editNote ? editNote.fileNumber : `FILE/ENG/2026/${Math.floor(100 + Math.random() * 900)}`;

  const heads = state.headOfAccounts;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex items-center gap-3">
        <button id="btn-form-back" class="text-slate-500 hover:text-slate-700 cursor-pointer p-1 rounded hover:bg-slate-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">
            ${editNote ? (editNote.status === 'Returned' ? 'Edit & Resubmit Project Note' : 'Edit Draft Project Note') : 'Initiate New Project Note'}
          </h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold">${generatedFileNum}</p>
        </div>
      </div>
    </div>

    <form id="note-initiation-form" class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
      <!-- Subject & Project Title -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Subject / Proposal Heading *</label>
          <input type="text" id="form-subject" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. Laying of CC road at Gachibowli sector-2" required value="${editNote ? editNote.subject : ''}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Project Name *</label>
          <input type="text" id="form-project-name" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. Gachibowli CC Road Sector-2 Development" required value="${editNote ? editNote.projectName : ''}">
        </div>
      </div>

      <!-- Dept, Zone & Priority -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Department *</label>
          <select id="form-dept" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="Engineering" ${editNote && editNote.department === 'Engineering' ? 'selected' : ''}>Engineering</option>
            <option value="Drainage & Sewerage" ${editNote && editNote.department === 'Drainage & Sewerage' ? 'selected' : ''}>Drainage & Sewerage</option>
            <option value="Electrical & Lighting" ${editNote && editNote.department === 'Electrical & Lighting' ? 'selected' : ''}>Electrical & Lighting</option>
            <option value="Landscaping & Parks" ${editNote && editNote.department === 'Landscaping & Parks' ? 'selected' : ''}>Landscaping & Parks</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Zone *</label>
          <select id="form-zone" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="Zone-1 (Khairetabad)" ${editNote && editNote.zone === 'Zone-1 (Khairetabad)' ? 'selected' : ''}>Zone-1 (Khairetabad)</option>
            <option value="Zone-2 (Kukatpally)" ${editNote && editNote.zone === 'Zone-2 (Kukatpally)' ? 'selected' : ''}>Zone-2 (Kukatpally)</option>
            <option value="Zone-3 (Sherilingampally)" ${editNote && editNote.zone === 'Zone-3 (Sherilingampally)' ? 'selected' : ''}>Zone-3 (Sherilingampally)</option>
            <option value="Zone-4 (Secunderabad)" ${editNote && editNote.zone === 'Zone-4 (Secunderabad)' ? 'selected' : ''}>Zone-4 (Secunderabad)</option>
            <option value="Head Office" ${editNote && editNote.zone === 'Head Office' ? 'selected' : ''}>Head Office</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Priority *</label>
          <select id="form-priority" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="High" ${editNote && editNote.priority === 'High' ? 'selected' : ''}>High Priority</option>
            <option value="Medium" ${editNote && editNote.priority === 'Medium' ? 'selected' : ''}>Medium Priority</option>
            <option value="Low" ${editNote && editNote.priority === 'Low' ? 'selected' : ''}>Low Priority</option>
          </select>
        </div>
      </div>

      <!-- Description & Purpose -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Detailed Description *</label>
          <textarea id="form-desc" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Provide a detailed layout of the proposal..." required>${editNote ? editNote.description : ''}</textarea>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Project Purpose / Objective *</label>
          <textarea id="form-purpose" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Why is this project required?" required>${editNote ? editNote.purpose : ''}</textarea>
        </div>
      </div>

      <!-- Background & Justification -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Background Context</label>
          <textarea id="form-background" rows="3" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Previous history, survey details, or complaints if any...">${editNote ? editNote.background : ''}</textarea>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Justification & Benefits *</label>
          <textarea id="form-justification" rows="3" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="What are the specific justifications and civic benefits?" required>${editNote ? editNote.justification : ''}</textarea>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Estimated Budget (Rs.) *</label>
          <input type="number" id="form-budget" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. 8500000" required value="${editNote ? editNote.estimatedBudget : ''}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Mappable Budget Head of Account *</label>
          <select id="form-budget-head" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            ${heads.map(h => `<option value="${h.code}" ${editNote && editNote.budgetHead === h.code ? 'selected' : ''}>${h.code} - ${h.description} (Bal: Rs. ${(h.balance / 100000).toFixed(1)}L)</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Attachments & Initial Remarks -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Upload Drawings / Survey Estimates</label>
          <input type="text" id="form-attachments" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Enter comma-separated filenames, e.g. layout_drawing.pdf, estimation.xlsx" value="${editNote && editNote.attachments ? editNote.attachments.join(', ') : ''}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Initiator's remarks (Signature note sheet) *</label>
          <textarea id="form-remarks" rows="2" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Write initial note remarks to be placed on the green sheet..." required>${editNote ? editNote.remarks : ''}</textarea>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between border-t border-slate-100 pt-6">
        <button type="button" id="btn-form-cancel" class="px-4 py-2 text-xs font-bold text-slate-550 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors uppercase tracking-wider">
          Cancel
        </button>
        <div class="flex items-center gap-3">
          <button type="button" id="btn-form-save-draft" class="px-4 py-2 text-xs font-bold text-[#2563EB] border border-[#2563EB] rounded-md hover:bg-blue-50/50 cursor-pointer transition-colors uppercase tracking-wider">
            Save Draft
          </button>
          <button type="submit" id="btn-form-submit" class="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md cursor-pointer transition-all shadow-sm flex items-center gap-2 uppercase tracking-wider">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Sign & Forward to AE
          </button>
        </div>
      </div>
    </form>
  `;

  // Bind Form Cancel
  document.getElementById('btn-form-back')?.addEventListener('click', () => {
    isCreatingNote = false;
    activeNoteId = null;
    renderEOfficeWorkflowView();
  });
  document.getElementById('btn-form-cancel')?.addEventListener('click', () => {
    isCreatingNote = false;
    activeNoteId = null;
    renderEOfficeWorkflowView();
  });

  // Bind Save Draft
  document.getElementById('btn-form-save-draft')?.addEventListener('click', () => {
    saveFormData(true);
  });

  // Bind Sign & Forward
  const form = document.getElementById('note-initiation-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveFormData(false);
  });

  function saveFormData(isDraft: boolean) {
    const subject = (document.getElementById('form-subject') as HTMLInputElement).value.trim();
    const projectName = (document.getElementById('form-project-name') as HTMLInputElement).value.trim();
    const department = (document.getElementById('form-dept') as HTMLSelectElement).value;
    const zone = (document.getElementById('form-zone') as HTMLSelectElement).value;
    const priority = (document.getElementById('form-priority') as HTMLSelectElement).value as 'High' | 'Medium' | 'Low';
    const description = (document.getElementById('form-desc') as HTMLTextAreaElement).value.trim();
    const purpose = (document.getElementById('form-purpose') as HTMLTextAreaElement).value.trim();
    const background = (document.getElementById('form-background') as HTMLTextAreaElement).value.trim();
    const justification = (document.getElementById('form-justification') as HTMLTextAreaElement).value.trim();
    const estimatedBudget = parseInt((document.getElementById('form-budget') as HTMLInputElement).value, 10);
    const budgetHead = (document.getElementById('form-budget-head') as HTMLSelectElement).value;
    const remarks = (document.getElementById('form-remarks') as HTMLTextAreaElement).value.trim();
    const attachRaw = (document.getElementById('form-attachments') as HTMLInputElement).value;
    const attachments = attachRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (!subject || !projectName || !description || !purpose || !justification || !estimatedBudget || !remarks) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].substring(0, 5);

    // If editing a draft or resubmitting
    if (editNote) {
      const prevVal = `Budget: Rs. ${editNote.estimatedBudget}`;
      
      // Update fields
      editNote.subject = subject;
      editNote.projectName = projectName;
      editNote.department = department;
      editNote.zone = zone;
      editNote.priority = priority;
      editNote.description = description;
      editNote.purpose = purpose;
      editNote.background = background;
      editNote.justification = justification;
      editNote.estimatedBudget = estimatedBudget;
      editNote.budgetHead = budgetHead;
      editNote.remarks = remarks;
      editNote.attachments = attachments;

      if (isDraft) {
        editNote.status = 'Draft';
        editNote.currentCustodian = 'Senior Assistant';
        showToast('Draft updated successfully');
      } else {
        // Sign & Forward (resubmit)
        editNote.status = 'Pending';
        editNote.currentCustodian = 'Assistant Engineer';
        editNote.workflowStatus['Senior Assistant'] = 'Approved';
        editNote.workflowStatus['Assistant Engineer'] = 'Pending';
        
        // Add new version (v1.2 etc)
        const nextVer = `v1.${editNote.versions.length}`;
        const newVer: eOfficeNoteVersion = {
          version: nextVer,
          modifiedBy: user.name,
          modifiedRole: user.role,
          modifiedDate: today,
          modifiedTime: time,
          subject,
          projectName,
          description,
          purpose,
          background,
          estimatedBudget,
          budgetHead,
          justification,
          benefits: justification,
          priority,
          remarks,
          additionalConditions: ''
        };
        editNote.versions.push(newVer);

        // Add history entry
        editNote.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: user.roleText,
          action: 'Resubmitted & Forwarded',
          remarks: remarks,
          dateTime: `${today} ${time}`,
          status: 'Cleared',
          versionNumber: nextVer
        });

        // Audit log
        editNote.auditLogs.push({
          user: user.name,
          role: user.role,
          date: today,
          time: time,
          ip: '10.2.14.8',
          action: 'Resubmit Note',
          previousValue: prevVal,
          newValue: `Budget: Rs. ${estimatedBudget} (${nextVer})`
        });

        logAudit(user.roleText, `Signed and forwarded note ${editNote.id} to AE`, 'Success');
        showToast('Signed and Forwarded to Assistant Engineer successfully!');
      }
    } else {
      // Create new Note
      const newId = `NOTE-2026-ENG-${Math.floor(100 + Math.random() * 900)}`;
      const newNote: eOfficeNote = {
        id: newId,
        fileNumber: generatedFileNum,
        subject,
        projectName,
        department,
        zone,
        description,
        purpose,
        background,
        estimatedBudget,
        budgetHead,
        justification,
        benefits: justification,
        priority,
        attachments,
        remarks,
        additionalConditions: '',
        status: isDraft ? 'Draft' : 'Pending',
        currentCustodian: isDraft ? 'Senior Assistant' : 'Assistant Engineer',
        creatorRole: user.role,
        creatorName: user.name,
        createdDate: today,
        createdTime: time,
        versions: [
          {
            version: 'v1.0',
            modifiedBy: user.name,
            modifiedRole: user.role,
            modifiedDate: today,
            modifiedTime: time,
            subject,
            projectName,
            description,
            purpose,
            background,
            estimatedBudget,
            budgetHead,
            justification,
            benefits: justification,
            priority,
            remarks,
            additionalConditions: ''
          }
        ],
        workflowStatus: {
          'Senior Assistant': isDraft ? 'Pending' : 'Approved',
          'Assistant Engineer': isDraft ? 'Waiting' : 'Pending',
          'Deputy Executive Engineer': 'Waiting',
          'Executive Engineer': 'Waiting',
          'Superintending Engineer': 'Waiting',
          'Joint Commissioner': 'Waiting',
          'Additional Commissioner': 'Waiting',
          'Commissioner': 'Waiting'
        },
        approvalHistory: isDraft ? [] : [
          {
            officerName: user.name,
            role: user.role,
            department: user.roleText,
            action: 'Initiated & Forwarded',
            remarks: remarks,
            dateTime: `${today} ${time}`,
            status: 'Cleared',
            versionNumber: 'v1.0'
          }
        ],
        auditLogs: [
          {
            user: user.name,
            role: user.role,
            date: today,
            time: time,
            ip: '10.2.14.8',
            action: 'Note Created',
            previousValue: '-',
            newValue: 'v1.0 Initial Draft'
          }
        ]
      };

      state.eOfficeNotes.push(newNote);

      if (isDraft) {
        showToast('Draft note saved successfully.');
      } else {
        logAudit(user.roleText, `Signed and forwarded note ${newId} to AE`, 'Success');
        showToast('Signed and Forwarded to Assistant Engineer successfully!');
      }
    }

    isCreatingNote = false;
    activeNoteId = null;
    renderEOfficeWorkflowView();
  }
}

function renderNoteDetail(container: HTMLElement, user: User) {
  const note = state.eOfficeNotes.find(n => n.id === activeNoteId);
  if (!note) {
    container.innerHTML = `<div class="p-6 text-red-500 font-bold">Error: Note not found.</div>`;
    return;
  }

  // Determine active version for rendering
  const activeVerObj = activeDetailVersion 
    ? (note.versions.find(v => v.version === activeDetailVersion) || note.versions[note.versions.length - 1])
    : note.versions[note.versions.length - 1];

  const isCurrentCustodian = note.currentCustodian === user.role && note.status !== 'Approved' && note.status !== 'Rejected';

  // Render Workflow progress stages
  const workflowRoles = [
    'Senior Assistant',
    'Assistant Engineer',
    'Deputy Executive Engineer',
    'Executive Engineer',
    'Superintending Engineer',
    'Joint Commissioner',
    'Additional Commissioner',
    'Commissioner'
  ];

  const bannerHtml = `
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 shadow-sm">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">Workflow Tracker</span>
          <span class="text-xs text-slate-800 font-semibold">${note.fileNumber}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs">
          <span class="font-bold text-slate-500">Status:</span>
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
            note.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
            note.status === 'Pending' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
            note.status === 'Returned' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
            'bg-rose-50 text-rose-700 border border-rose-100'
          }">${note.status}</span>
        </div>
      </div>

      <!-- Pipeline Steps -->
      <div class="mt-6 flex items-center justify-between overflow-x-auto pb-2 relative">
        <div class="absolute h-0.5 left-8 right-8 top-4 bg-slate-100 -z-1"></div>
        ${workflowRoles.map((role, idx) => {
          let stepStatus = 'Waiting'; // Waiting, Active, Approved, Returned
          if (note.status === 'Approved') {
            stepStatus = 'Approved';
          } else if (note.status === 'Rejected' && note.currentCustodian === role) {
            stepStatus = 'Returned';
          } else if (note.currentCustodian === role) {
            stepStatus = note.status === 'Returned' ? 'Returned' : 'Active';
          } else {
            // Check if role is in approval history before the current custodian
            const currentCustodianIdx = workflowRoles.indexOf(note.currentCustodian);
            if (idx < currentCustodianIdx) {
              stepStatus = 'Approved';
            }
          }

          let circleColor = 'bg-slate-200 border-slate-300 text-slate-500';
          let textColor = 'text-slate-400 font-medium';
          let icon = `<span class="text-[10px] font-bold">${idx + 1}</span>`;

          if (stepStatus === 'Approved') {
            circleColor = 'bg-emerald-500 border-emerald-600 text-white';
            textColor = 'text-emerald-700 font-bold';
            icon = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
          } else if (stepStatus === 'Active') {
            circleColor = 'bg-blue-600 border-blue-700 text-white ring-4 ring-blue-100 animate-pulse';
            textColor = 'text-blue-700 font-extrabold';
          } else if (stepStatus === 'Returned') {
            circleColor = 'bg-amber-500 border-amber-600 text-white';
            textColor = 'text-amber-700 font-extrabold';
            icon = `<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
          }

          return `
            <div class="flex flex-col items-center text-center px-4 min-w-[90px] relative z-10">
              <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center ${circleColor} transition-all">
                ${icon}
              </div>
              <span class="text-[9px] uppercase tracking-wider mt-2 whitespace-nowrap ${textColor}">${role.split(' ').map(w => w === 'Assistant' ? 'Asst' : (w === 'Superintending' ? 'SE' : (w === 'Executive' ? 'EE' : (w === 'Deputy' ? 'Dy.EE' : w)))).join(' ')}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Format budget for display
  const dispBudget = `Rs. ${(activeVerObj.estimatedBudget / 100000).toFixed(1)} Lakhs (Budget Head: ${activeVerObj.budgetHead})`;

  container.innerHTML = `
    <!-- Top toolbar -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button id="btn-detail-back" class="text-slate-500 hover:text-slate-700 cursor-pointer p-1 rounded hover:bg-slate-100 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Note Sheet Workspace</h3>
            <p class="text-[10px] text-slate-500 mt-1 font-semibold">${note.fileNumber} | Created by ${note.creatorName} (${note.creatorRole})</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${isCompareMode ? `
            <button id="btn-exit-compare" class="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors border border-rose-100 uppercase tracking-wider">
              Exit Comparison
            </button>
          ` : `
            <button id="btn-toggle-compare" class="bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors border border-blue-100 uppercase tracking-wider">
              Compare Versions
            </button>
          `}
        </div>
      </div>
    </div>

    ${bannerHtml}

    ${isCompareMode ? `
      <!-- Comparison Screen -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Version 1 Column -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h4 class="text-xs font-bold text-slate-900 uppercase">Version A</h4>
            <select id="select-ver-a" class="text-xs p-1 border border-slate-200 rounded bg-white outline-none">
              ${note.versions.map(v => `<option value="${v.version}" ${v.version === selectedVersion1 ? 'selected' : ''}>${v.version} - ${v.modifiedRole}</option>`).join('')}
            </select>
          </div>
          <div id="compare-column-a"></div>
        </div>

        <!-- Version 2 Column -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h4 class="text-xs font-bold text-slate-900 uppercase">Version B</h4>
            <select id="select-ver-b" class="text-xs p-1 border border-slate-200 rounded bg-white outline-none">
              ${note.versions.map(v => `<option value="${v.version}" ${v.version === selectedVersion2 ? 'selected' : ''}>${v.version} - ${v.modifiedRole}</option>`).join('')}
            </select>
          </div>
          <div id="compare-column-b"></div>
        </div>
      </div>
    ` : `
      <!-- Standard Detail Screen -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Left: Traditional Green Note Sheet (2 cols wide) -->
        <div class="xl:col-span-2 space-y-6">
          <div class="green-note-sheet bg-[#F4FAF4] border-l-4 border-l-[#10B981] border-y border-r border-[#D1E7DD] rounded-md shadow-sm p-8 min-h-[500px]">
            <!-- Government Emblem Banner -->
            <div class="text-center border-b border-slate-200 pb-6 mb-6">
              <h1 class="text-xs font-bold text-slate-700 tracking-widest uppercase">Greater Hyderabad Municipal Corporation</h1>
              <h2 class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">e-Office Note Approval Sheet</h2>
              <div class="w-16 h-0.5 bg-[#10B981] mx-auto mt-2"></div>
            </div>

            <!-- Subject Header -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">File No:</span>
                <span class="text-xs font-mono font-bold text-slate-800">${note.fileNumber}</span>
              </div>
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject:</span>
                <span class="text-xs font-bold text-slate-800">${activeVerObj.subject}</span>
              </div>
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Project:</span>
                <span class="text-xs font-bold text-[#2563EB]">${activeVerObj.projectName}</span>
              </div>
              <div class="grid grid-cols-2 gap-4 border-y border-slate-200/60 py-3 text-[11px]">
                <div><span class="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Department:</span> <span class="font-semibold text-slate-700">${note.department}</span></div>
                <div><span class="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Zone:</span> <span class="font-semibold text-slate-700">${note.zone}</span></div>
              </div>
            </div>

            <!-- Core Note Paragraphs -->
            <div class="space-y-5 text-xs text-slate-800 leading-relaxed font-serif">
              <p><strong>1. PROPOSAL DESCRIPTION:</strong><br>${activeVerObj.description}</p>
              <p><strong>2. OBJECTIVE & PURPOSE:</strong><br>${activeVerObj.purpose}</p>
              ${activeVerObj.background ? `<p><strong>3. BACKGROUND CONTEXT:</strong><br>${activeVerObj.background}</p>` : ''}
              <p><strong>4. JUSTIFICATION & CIVIC BENEFITS:</strong><br>${activeVerObj.justification}</p>
              <div class="bg-white/80 p-3 rounded border border-emerald-100 font-sans my-4">
                <div class="text-[9px] uppercase tracking-wider font-bold text-slate-500">Proposed Budget Allocation</div>
                <div class="text-xs font-bold text-slate-800 mt-1">${dispBudget}</div>
              </div>
              ${activeVerObj.additionalConditions ? `<p><strong>5. CONDITIONAL PROVISIONS / RIDER:</strong><br>${activeVerObj.additionalConditions}</p>` : ''}
              ${note.attachments && note.attachments.length > 0 ? `
                <div class="mt-4 border-t border-slate-200/60 pt-3 font-sans">
                  <span class="text-[9px] uppercase tracking-wider font-bold text-slate-500">Uploaded Attachments:</span>
                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                    ${note.attachments.map(att => `
                      <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white text-slate-700 text-[10px] border border-slate-200">
                        <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                        ${att}
                      </span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Chronological Remarks / Note Sheets Signatures -->
            <div class="mt-8 border-t-2 border-dashed border-[#A7F3D0] pt-6 space-y-6">
              <h3 class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-4">Official Remarks & Digital Signatures</h3>
              ${note.approvalHistory.map((hist, index) => {
                return `
                  <div class="p-4 rounded-md bg-white border border-[#D1E7DD] relative space-y-2 font-serif text-slate-800 text-[11px] shadow-sm">
                    <p class="leading-relaxed"><strong>Para ${index + 1}:</strong> ${hist.remarks || 'Recommended and forwarded.'}</p>
                    <div class="flex justify-between items-end border-t border-slate-100 pt-3 mt-3 font-sans text-[10px] text-slate-500">
                      <div>
                        <span class="font-bold text-slate-700">${hist.officerName}</span>
                        <div class="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider">${hist.role}</div>
                      </div>
                      <div class="text-right">
                        <span class="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                          <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          Digitally Signed
                        </span>
                        <div class="text-[9px] text-slate-450 mt-1 font-semibold">${hist.dateTime}</div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Actions, Versions & Audit Log -->
        <div class="space-y-6">
          <!-- Actions panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Action Panel</h4>
            ${isCurrentCustodian ? `
              <!-- Input Remarks -->
              <div class="space-y-2 mb-4">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enter Note sheet Remarks *</label>
                <textarea id="officer-remarks" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Type your official remarks here..." required></textarea>
              </div>

              <!-- Budget overriding for Dy.EE / Addl. Commissioner -->
              ${user.role === 'Deputy Executive Engineer' || user.role === 'Additional Commissioner' ? `
                <div class="space-y-2 mb-4 p-3 bg-slate-50 border border-slate-250 rounded">
                  <label class="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Verify/Modify Estimated Budget (Rs.)</label>
                  <input type="number" id="officer-modify-budget" class="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-[#2563EB]" value="${activeVerObj.estimatedBudget}">
                  <span class="text-[9px] text-slate-400 font-semibold block mt-1">If budget is modified, a new version of the note will be created automatically.</span>
                </div>
              ` : ''}

              <!-- Custodian Action Buttons -->
              <div class="space-y-2.5 pt-2">
                <button id="btn-officer-approve" class="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${user.role === 'Commissioner' ? 'Grant Administrative Sanction' : 'Approve & Forward'}
                </button>
                
                ${user.role !== 'Senior Assistant' ? `
                  <button id="btn-officer-return" class="w-full py-2.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded border border-amber-250 cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                    Return to Previous Officer
                  </button>
                ` : ''}

                ${user.role === 'Commissioner' ? `
                  <button id="btn-officer-reject" class="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Reject Proposal
                  </button>
                ` : ''}
              </div>
            ` : `
              <!-- Custodian is someone else -->
              <div class="p-4 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <svg class="w-6 h-6 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Awaiting clearance from<br><span class="text-[#2563EB] font-bold block mt-1">${note.currentCustodian}</span>
              </div>
              ${note.status === 'Returned' && user.role === 'Senior Assistant' ? `
                <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 space-y-2">
                  <p class="font-bold">Proposal Returned for Correction</p>
                  <p class="text-[10px] leading-relaxed">Open the initiation form to adjust values and resubmit.</p>
                  <button id="btn-sa-edit-returned" class="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded cursor-pointer transition-colors uppercase tracking-wider text-[10px]">
                    Edit & Resubmit Note
                  </button>
                </div>
              ` : ''}
            `}
          </div>

          <!-- Version History panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Version Snapshots</h4>
            <div class="space-y-3">
              ${note.versions.map(v => {
                const isActive = activeDetailVersion ? v.version === activeDetailVersion : v.version === note.versions[note.versions.length - 1].version;
                return `
                  <div class="version-select-card p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    isActive ? 'border-[#2563EB] bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-350'
                  }" data-ver="${v.version}">
                    <div>
                      <div class="font-bold text-slate-800">${v.version} - ${v.modifiedRole}</div>
                      <div class="text-[9px] text-slate-450 mt-0.5">${v.modifiedBy} | ${v.modifiedDate} ${v.modifiedTime}</div>
                    </div>
                    <svg class="w-4 h-4 text-[#2563EB] ${isActive ? '' : 'hidden'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Immutable Audit Logs panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Immutable Audit Trail</h4>
            <div class="space-y-3 text-[10px] max-h-52 overflow-y-auto pr-2">
              ${note.auditLogs.map(l => `
                <div class="p-2.5 rounded bg-slate-50 border border-slate-150 space-y-1">
                  <div class="flex justify-between font-bold text-slate-700">
                    <span>${l.action}</span>
                    <span class="text-[9px] text-slate-400 font-semibold">${l.date} ${l.time}</span>
                  </div>
                  <div class="text-slate-500 font-medium">By: ${l.user} (${l.role})</div>
                  <div class="grid grid-cols-2 gap-1 text-[8px] border-t border-slate-100 pt-1.5 mt-1.5 font-mono text-slate-450">
                    <div class="truncate">Old: ${l.previousValue}</div>
                    <div class="truncate">New: ${l.newValue}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `}
  `;

  // Bind Back button
  document.getElementById('btn-detail-back')?.addEventListener('click', () => {
    activeNoteId = null;
    activeDetailVersion = null;
    isCompareMode = false;
    renderEOfficeWorkflowView();
  });

  // Bind compare toggle
  document.getElementById('btn-toggle-compare')?.addEventListener('click', () => {
    isCompareMode = true;
    selectedVersion1 = note.versions[0].version;
    selectedVersion2 = note.versions[note.versions.length - 1].version;
    renderEOfficeWorkflowView();
  });
  document.getElementById('btn-exit-compare')?.addEventListener('click', () => {
    isCompareMode = false;
    renderEOfficeWorkflowView();
  });

  // Bind version selection card clicks
  container.querySelectorAll('.version-select-card').forEach(el => {
    el.addEventListener('click', () => {
      activeDetailVersion = el.getAttribute('data-ver');
      renderEOfficeWorkflowView();
    });
  });

  // Bind SA edit returned action
  document.getElementById('btn-sa-edit-returned')?.addEventListener('click', () => {
    isCreatingNote = true;
    renderEOfficeWorkflowView();
  });

  // Bind comparison controls if in compare mode
  if (isCompareMode) {
    const selA = document.getElementById('select-ver-a') as HTMLSelectElement;
    const selB = document.getElementById('select-ver-b') as HTMLSelectElement;
    
    selA?.addEventListener('change', () => {
      selectedVersion1 = selA.value;
      renderCompareColumns(note);
    });
    selB?.addEventListener('change', () => {
      selectedVersion2 = selB.value;
      renderCompareColumns(note);
    });

    renderCompareColumns(note);
  }

  // Bind officer actions if current custodian
  if (isCurrentCustodian) {
    const remarksInput = document.getElementById('officer-remarks') as HTMLTextAreaElement;
    const budgetInput = document.getElementById('officer-modify-budget') as HTMLInputElement;

    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].substring(0, 5);

    // APPROVE ACTION
    document.getElementById('btn-officer-approve')?.addEventListener('click', () => {
      const remarks = remarksInput.value.trim();
      if (!remarks) {
        showToast('Error: Remarks are mandatory before signing.');
        remarksInput.focus();
        remarksInput.classList.add('border-rose-350');
        return;
      }

      // Check budget modification
      let finalBudget = activeVerObj.estimatedBudget;
      let isBudgetModified = false;
      if (budgetInput) {
        const val = parseInt(budgetInput.value, 10);
        if (val !== activeVerObj.estimatedBudget) {
          finalBudget = val;
          isBudgetModified = true;
        }
      }

      // Simulate secure signing window
      const btn = document.getElementById('btn-officer-approve') as HTMLButtonElement;
      btn.disabled = true;
      btn.innerHTML = `<span class="animate-pulse">Signing note sheet electronically...</span>`;

      setTimeout(() => {
        let nextVersion = activeVerObj.version;
        if (isBudgetModified) {
          // Create new version
          const verNum = note.versions.length;
          nextVersion = `v1.${verNum}`;
          note.versions.push({
            ...activeVerObj,
            version: nextVersion,
            modifiedBy: user.name,
            modifiedRole: user.role,
            modifiedDate: today,
            modifiedTime: time,
            estimatedBudget: finalBudget,
            remarks: remarks
          });
          
          note.auditLogs.push({
            user: user.name,
            role: user.role,
            date: today,
            time: time,
            ip: '10.2.20.15',
            action: 'Modify Budget',
            previousValue: `Rs. ${activeVerObj.estimatedBudget}`,
            newValue: `Rs. ${finalBudget} (${nextVersion})`
          });
        }

        // Advance Custodian
        const currentIdx = workflowRoles.indexOf(user.role);
        const nextRole = workflowRoles[currentIdx + 1];

        // Update workflow approvals status
        note.workflowStatus[user.role as keyof typeof note.workflowStatus] = 'Approved';
        
        // Add to history
        note.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: user.roleText,
          action: user.role === 'Commissioner' ? 'Granted Administrative Sanction' : 'Approved & Forwarded',
          remarks: remarks,
          dateTime: `${today} ${time}`,
          status: 'Cleared',
          versionNumber: nextVersion
        });

        if (user.role === 'Commissioner') {
          // Final Sanction
          note.status = 'Approved';
          note.currentCustodian = 'Approved / Closed';
          
          // Dynamically instantiate the project
          createProjectFromNote(note);
          showToast('Project Note Approved! Administrative sanction order generated.');
        } else {
          // Forward to next custodian
          note.currentCustodian = nextRole;
          note.workflowStatus[nextRole as keyof typeof note.workflowStatus] = 'Pending';
          
          // Log audit
          note.auditLogs.push({
            user: user.name,
            role: user.role,
            date: today,
            time: time,
            ip: '10.2.20.15',
            action: 'Approved & Forwarded',
            previousValue: `Custodian: ${user.role}`,
            newValue: `Custodian: ${nextRole}`
          });

          logAudit(user.roleText, `Approved note ${note.id} and forwarded to ${nextRole}`, 'Success');
          showToast(`Successfully signed and forwarded to ${nextRole}`);
        }

        activeNoteId = null;
        renderEOfficeWorkflowView();
      }, 1500);
    });

    // RETURN ACTION
    document.getElementById('btn-officer-return')?.addEventListener('click', () => {
      const remarks = remarksInput.value.trim();
      if (!remarks) {
        showToast('Error: Remarks are mandatory before returning file.');
        remarksInput.focus();
        remarksInput.classList.add('border-rose-350');
        return;
      }

      const currentIdx = workflowRoles.indexOf(user.role);
      const prevRole = workflowRoles[currentIdx - 1];

      // Update statuses
      note.status = prevRole === 'Senior Assistant' ? 'Returned' : 'Pending';
      note.currentCustodian = prevRole;
      note.workflowStatus[user.role as keyof typeof note.workflowStatus] = 'Returned';
      note.workflowStatus[prevRole as keyof typeof note.workflowStatus] = prevRole === 'Senior Assistant' ? 'Returned' : 'Pending';

      note.approvalHistory.push({
        officerName: user.name,
        role: user.role,
        department: user.roleText,
        action: 'Returned to ' + prevRole,
        remarks: remarks,
        dateTime: `${today} ${time}`,
        status: 'Returned',
        versionNumber: activeVerObj.version
      });

      note.auditLogs.push({
        user: user.name,
        role: user.role,
        date: today,
        time: time,
        ip: '10.2.20.15',
        action: 'Returned File',
        previousValue: `Custodian: ${user.role}`,
        newValue: `Custodian: ${prevRole} (Returned)`
      });

      logAudit(user.roleText, `Returned note ${note.id} to ${prevRole}`, 'Success');
      showToast(`Note returned to ${prevRole}`);
      
      activeNoteId = null;
      renderEOfficeWorkflowView();
    });

    // REJECT ACTION
    document.getElementById('btn-officer-reject')?.addEventListener('click', () => {
      const remarks = remarksInput.value.trim();
      if (!remarks) {
        showToast('Error: Remarks are mandatory before rejecting proposal.');
        remarksInput.focus();
        remarksInput.classList.add('border-rose-350');
        return;
      }

      if (confirm('WARNING: Are you sure you want to REJECT this project proposal? This action is permanent.')) {
        note.status = 'Rejected';
        note.currentCustodian = 'None';
        note.workflowStatus['Commissioner'] = 'Rejected';

        note.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: user.roleText,
          action: 'Rejected Proposal',
          remarks: remarks,
          dateTime: `${today} ${time}`,
          status: 'Rejected',
          versionNumber: activeVerObj.version
        });

        note.auditLogs.push({
          user: user.name,
          role: user.role,
          date: today,
          time: time,
          ip: '10.2.20.15',
          action: 'Rejected Proposal',
          previousValue: 'Pending Commissioner Approval',
          newValue: 'Rejected & Closed'
        });

        logAudit(user.roleText, `Rejected note ${note.id} completely`, 'Success');
        showToast(`Proposal note rejected and closed.`);
        
        activeNoteId = null;
        renderEOfficeWorkflowView();
      }
    });
  }
}

function renderCompareColumns(note: eOfficeNote) {
  const colA = document.getElementById('compare-column-a');
  const colB = document.getElementById('compare-column-b');
  if (!colA || !colB) return;

  const vA = note.versions.find(v => v.version === selectedVersion1) || note.versions[0];
  const vB = note.versions.find(v => v.version === selectedVersion2) || note.versions[note.versions.length - 1];

  const compareField = (label: string, valA: string | number, valB: string | number, isCurrency = false) => {
    const isDifferent = valA !== valB;
    const format = (v: string | number) => isCurrency ? `Rs. ${(Number(v) / 100000).toFixed(1)} Lakhs` : String(v);

    return `
      <div class="space-y-1 py-3 border-b border-slate-50 last:border-0">
        <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400">${label}</span>
        <div class="text-xs ${isDifferent ? 'p-2 rounded bg-amber-50/50 border border-amber-100' : ''}">
          ${isDifferent ? `
            <div class="text-slate-500 font-semibold">
              <span class="text-[9px] uppercase font-bold text-rose-600 block mb-0.5">Value A:</span>
              ${format(valA)}
            </div>
            <div class="text-slate-900 font-bold mt-2">
              <span class="text-[9px] uppercase font-bold text-emerald-600 block mb-0.5">Value B:</span>
              ${format(valB)}
            </div>
          ` : `
            <span class="text-slate-800 font-bold">${format(valA)}</span>
          `}
        </div>
      </div>
    `;
  };

  const getColHtml = (v: eOfficeNoteVersion) => `
    <div class="space-y-2">
      <div class="text-[10px] text-slate-450 font-semibold mb-4 bg-slate-50 p-2.5 rounded border border-slate-150">
        Snapshot version: ${v.version}<br>
        Modified by: ${v.modifiedBy} (${v.modifiedRole})<br>
        Date: ${v.modifiedDate} ${v.modifiedTime}
      </div>
      <div class="space-y-1">
        ${compareField('Project Name', vA.projectName, vB.projectName)}
        ${compareField('Subject', vA.subject, vB.subject)}
        ${compareField('Estimated Budget', vA.estimatedBudget, vB.estimatedBudget, true)}
        ${compareField('Budget Head', vA.budgetHead, vB.budgetHead)}
        ${compareField('Priority', vA.priority, vB.priority)}
        ${compareField('Description', vA.description, vB.description)}
        ${compareField('Purpose', vA.purpose, vB.purpose)}
        ${compareField('Justification', vA.justification, vB.justification)}
        ${compareField('Remarks', vA.remarks, vB.remarks)}
      </div>
    </div>
  `;

  colA.innerHTML = getColHtml(vA);
  colB.innerHTML = getColHtml(vB);
}

function createProjectFromNote(note: eOfficeNote) {
  const newProjId = 'PRJ-2026-ENG-' + Math.floor(100 + Math.random() * 900);
  const newProject: Project = {
    id: newProjId,
    name: note.projectName,
    department: note.department,
    zone: note.zone,
    projectType: note.subject.length > 30 ? note.subject.substring(0, 30) + '...' : note.subject,
    status: 'Planning',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    officerInCharge: 'Er. R. Sharma',
    progress: 0,
    budget: note.estimatedBudget,
    spent: 0,
    description: note.description,
    lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
  };

  // Add project to main directory
  state.projects.unshift(newProject);

  // Generate Administrative Sanction Order document
  if (!PROJECT_DOCUMENTS[newProjId]) {
    PROJECT_DOCUMENTS[newProjId] = [];
  }
  PROJECT_DOCUMENTS[newProjId].push({
    id: 'DOC-SAN-' + Math.floor(1000 + Math.random() * 9000),
    name: `Administrative_Sanction_Order_${newProjId}.pdf`,
    type: 'pdf',
    uploadedBy: 'Sri M. Dana Kishore, IAS',
    uploadedDate: new Date().toISOString().split('T')[0],
    version: 'v1.0',
    status: 'Approved',
    size: '1.5 MB',
    category: 'Administrative Sanctions'
  });

  // Generate Work Order request
  state.workOrders.push({
    id: 'WO-' + Math.floor(10000 + Math.random() * 90000),
    projectId: newProjId,
    title: `Work Order Proposal for ${note.projectName}`,
    vendor: 'Pending Bid Winner',
    amount: note.estimatedBudget,
    currentStage: 'Administrative Sanction',
    stageHistory: {
      'Requirement': note.createdDate,
      'Proposal': note.createdDate,
      'Administrative Sanction': new Date().toISOString().split('T')[0]
    },
    updates: [
      { date: new Date().toISOString().split('T')[0], text: 'Administrative Sanction received. Work order initialized in ERP.' }
    ]
  });

  // Generate notification
  state.notifications.unshift({
    id: state.notifications.length + 1,
    title: 'Project Approved & Initiated',
    text: `Proposal note ${note.id} approved by Commissioner. Project ${newProjId} created with Administrative Sanction.`,
    time: 'Just now',
    read: false
  });

  // Add audit log globally
  state.auditLogs.unshift({
    id: 'AUD-' + Math.floor(1000 + Math.random() * 9000),
    user: 'Commissioner',
    action: `Approved Note ${note.fileNumber} and instantiated project ${newProjId}`,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    ip: '10.2.3.1',
    status: 'Success'
  });
}

let filterDept = 'All';
let filterStatus = 'All';
let searchQuery = '';
let sortBy = 'recently-updated';
let activeSummaryTab = 'overview';

function renderProjectsListDirectory() {
  const container = document.getElementById('projects-list-view');
  if (!container) return;

  const user = state.currentUser;
  if (!user) return;

  // Apply filters
  let filtered = state.projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || p.id.toLowerCase().includes(searchQuery);
    const matchesDept = filterDept === 'All' || p.department === filterDept;
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Apply sort
  if (sortBy === 'recently-updated') {
    filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  } else if (sortBy === 'budget-high') {
    filtered.sort((a, b) => b.budget - a.budget);
  } else if (sortBy === 'budget-low') {
    filtered.sort((a, b) => a.budget - b.budget);
  } else if (sortBy === 'progress-high') {
    filtered.sort((a, b) => b.progress - a.progress);
  } else if (sortBy === 'progress-low') {
    filtered.sort((a, b) => a.progress - b.progress);
  }

  // Departments List
  const departments = ['All', 'Engineering', 'Drainage & Sewerage', 'Electrical & Lighting', 'Landscaping & Parks'];
  const statuses = ['All', 'Planning', 'In Progress', 'Completed', 'On Hold', 'Under Audit'];

  // Role-specific action items
  const myPendingFiles = state.eOfficeFiles.filter(f => f.currentCustodian === user.role && f.status !== 'Approved / Closed' && f.status !== 'Rejected');
  const myPendingBills = (user.role === 'Finance Officer') 
    ? state.bills.filter(b => b.status !== 'Paid')
    : [];

  const totalMyActions = myPendingFiles.length + myPendingBills.length;

  // KPI Calculations
  const totalProjects = state.projects.length;
  const inProgressProjects = state.projects.filter(p => p.status === 'In Progress').length;
  const totalBudgetCr = (state.projects.reduce((acc, p) => acc + p.budget, 0) / 10000000).toFixed(1);
  const totalSpentCr = (state.projects.reduce((acc, p) => acc + p.spent, 0) / 10000000).toFixed(1);

  // Build My Action Items HTML
  let actionItemsHtml = '';
  if (totalMyActions > 0) {
    actionItemsHtml = `
      <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">My Active Tasks & Actions (${totalMyActions})</h4>
          <span class="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[9px] font-bold uppercase tracking-wider animate-pulse">Attention Required</span>
        </div>
        <div class="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-2">
          ${myPendingFiles.map(f => {
            const projObj = state.projects.find(p => p.id === f.projectId);
            const priorityBadge = f.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-100 text-slate-655 border-slate-200';
            return `
              <div class="py-3 flex items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-mono font-bold text-slate-450 uppercase">${f.id}</span>
                    <span class="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider border ${priorityBadge}">${f.priority}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${projObj ? projObj.name : ''}</span>
                  </div>
                  <p class="text-xs font-bold text-slate-800">${f.subject}</p>
                </div>
                <button onclick="goToProjectTab('${f.projectId}', 'approvals')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors shrink-0">
                  Resolve Task
                </button>
              </div>
            `;
          }).join('')}

          ${myPendingBills.map(b => {
            const projObj = state.projects.find(p => p.id === b.projectId);
            return `
              <div class="py-3 flex items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-mono font-bold text-slate-450 uppercase">${b.id}</span>
                    <span class="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">${b.status}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${projObj ? projObj.name : ''}</span>
                  </div>
                  <p class="text-xs font-bold text-slate-800">Invoice Claim for ${b.woId} - Rs. ${(b.amount / 100000).toFixed(1)} Lakhs</p>
                </div>
                <button onclick="goToProjectTab('${b.projectId}', 'approvals')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors shrink-0">
                  Resolve Payment
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  } else {
    actionItemsHtml = `
      <div class="bg-white border border-slate-200 rounded-md p-6 mb-6 flex items-center justify-between">
        <div>
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">My Active Tasks & Actions</h4>
          <p class="text-[10px] text-slate-450 mt-1 font-semibold">You have no pending files or work approvals waiting for action.</p>
        </div>
        <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">✓ All Cleared</span>
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Filter Header -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Projects Registry</h3>
          <p class="text-[10px] text-slate-500 mt-1">Select a project to enter its specialized workspace</p>
        </div>
        
        <!-- Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Search -->
          <div class="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-60">
            <span class="text-slate-400 mr-2">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input type="text" id="project-directory-search" class="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none" placeholder="Search by Project Name / ID..." value="${searchQuery}">
          </div>

          <!-- Dept Filter -->
          <select id="project-directory-dept" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            ${departments.map(d => `<option value="${d}" ${d === filterDept ? 'selected' : ''}>Dept: ${d}</option>`).join('')}
          </select>

          <!-- Status Filter -->
          <select id="project-directory-status" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            ${statuses.map(s => `<option value="${s}" ${s === filterStatus ? 'selected' : ''}>Status: ${s}</option>`).join('')}
          </select>

          <!-- Sort Options -->
          <select id="project-directory-sort" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            <option value="recently-updated" ${sortBy === 'recently-updated' ? 'selected' : ''}>Sort: Recently Updated</option>
            <option value="budget-high" ${sortBy === 'budget-high' ? 'selected' : ''}>Sort: Budget (High to Low)</option>
            <option value="budget-low" ${sortBy === 'budget-low' ? 'selected' : ''}>Sort: Budget (Low to High)</option>
            <option value="progress-high" ${sortBy === 'progress-high' ? 'selected' : ''}>Sort: Progress (High to Low)</option>
            <option value="progress-low" ${sortBy === 'progress-low' ? 'selected' : ''}>Sort: Progress (Low to High)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${filtered.map(p => {
        let statusBadge = 'bg-slate-100 text-slate-655';
        if (p.status === 'Completed') statusBadge = 'bg-emerald-50 text-emerald-700';
        else if (p.status === 'In Progress') statusBadge = 'bg-indigo-50 text-indigo-700';
        else if (p.status === 'Planning') statusBadge = 'bg-slate-100 text-slate-600';
        else if (p.status === 'On Hold') statusBadge = 'bg-rose-50 text-rose-700';
        else if (p.status === 'Under Audit') statusBadge = 'bg-amber-50 text-amber-700';

        return `
          <div class="project-directory-card bg-white border border-slate-200 hover:border-slate-350 rounded-md p-6 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between" data-id="${p.id}">
            <div class="space-y-4">
              <!-- Top Row -->
              <div class="flex justify-between items-center">
                <span class="text-[9px] font-mono font-bold text-slate-400 tracking-wider">${p.id}</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${statusBadge}">${p.status}</span>
              </div>

              <!-- Title -->
              <div>
                <h4 class="text-xs font-bold text-slate-900 leading-snug hover:text-[#2563EB] transition-colors">${p.name}</h4>
                <p class="text-[10px] text-slate-450 mt-1 font-semibold">${p.projectType}</p>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    
    ${filtered.length === 0 ? '<div class="bg-white border border-slate-200 p-12 text-center text-xs text-slate-450 font-medium rounded-md">No projects matching the selected search parameters.</div>' : ''}
  `;

  // Bind window helper for quick routing
  (window as any).goToProjectTab = (projectId: string, tabId: string) => {
    const projObj = state.projects.find(p => p.id === projectId);
    if (projObj) {
      state.activeProject = projObj;
      state.activeProjectModule = tabId;
      state.activeView = 'project-workspace';
      renderSidebar();
      renderMainContent();
    }
  };

  // Bind filter events
  const searchInput = document.getElementById('project-directory-search') as HTMLInputElement;
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderProjectsListDirectory();
  });

  document.getElementById('project-directory-dept')?.addEventListener('change', (e) => {
    filterDept = (e.target as HTMLSelectElement).value;
    renderProjectsListDirectory();
  });

  document.getElementById('project-directory-status')?.addEventListener('change', (e) => {
    filterStatus = (e.target as HTMLSelectElement).value;
    renderProjectsListDirectory();
  });

  document.getElementById('project-directory-sort')?.addEventListener('change', (e) => {
    sortBy = (e.target as HTMLSelectElement).value;
    renderProjectsListDirectory();
  });

  // Card click routing
  const cards = container.querySelectorAll('.project-directory-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-id');
      const projObj = state.projects.find(p => p.id === pId);
      if (projObj) {
        switchToProjectWorkspace(projObj);
      }
    });
  });
}

// ==========================================
// 10. VIEW: PROJECT WORKSPACE ROUTER
// ==========================================
function renderProjectWorkspaceContainer() {
  const container = document.getElementById('project-workspace-view');
  const proj = state.activeProject;
  if (!container || !proj) return;

  container.innerHTML = '';

  // Render workspace content based on the selected project module (tab)
  switch (state.activeProjectModule) {
    case 'summary':
      renderProjectWorkspaceSummary(container, proj);
      break;
    case 'tracking':
      renderProjectWorkflowTracking(container, proj);
      break;
    case 'notes':
      renderProjectNotesWorkspace(container, proj);
      break;
    case 'documents':
      renderProjectRelatedDocuments(container, proj);
      break;
    case 'aiassist':
      renderProjectAIAssist(container, proj);
      break;
    case 'approvals':
      renderProjectApprovals(container, proj);
      break;
    default:
      renderProjectWorkflowTracking(container, proj);
  }
}

// ------------------------------------------
// 10A. TAB: SUMMARY
// ------------------------------------------
function renderProjectWorkspaceSummary(container: HTMLElement, proj: Project) {
  const team = PROJECT_TEAMS[proj.id] || [];
  const timeline = PROJECT_TIMELINES[proj.id] || [];
  const docs = PROJECT_DOCUMENTS[proj.id] || [];

  container.innerHTML = `
    <!-- Top Header & Export Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4 mb-4">
      <div>
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider">${proj.id} : ${proj.name}</h2>
        <p class="text-xs text-slate-500 mt-1 font-semibold">${proj.projectType} • ${proj.zone}</p>
      </div>
      
      <!-- Export Options Dropdown -->
      <div class="relative inline-block text-left">
        <button id="project-export-btn" class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:text-slate-955 transition-colors shadow-xs cursor-pointer">
          <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <span>Export Options</span>
          <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="project-export-dropdown" class="hidden absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-55">
          <div class="px-3 py-1.5 border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available Formats</div>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('PDF')">
            <svg class="w-3.5 h-3.5 text-red-650" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10c5.3 0 9.7-4.3 9.7-9.8S17 2 12 2zm-1.8 13.8h-1.5v-6h1.5v6zm4.5 0h-2.3v-6h2.3v6zm-2.3-2.3h1.5v-1.5h-1.5v1.5z"/></svg>
            <span>Export as PDF (.pdf)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('Word')">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm2 13h-4v-1h4v1zm0-2.5h-4v-1h4v1zm0-2.5h-4V7h4v1z"/></svg>
            <span>Export as Word (.docx)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('Excel')">
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm1 13h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
            <span>Export as Excel (.xlsx)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('CSV')">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm1 13h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
            <span>Export as CSV (.csv)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="window.print()">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2m-2-4H8v8h8v-8z"/></svg>
            <span>Print Summary</span>
          </a>
          <div class="border-t border-slate-100 my-1"></div>
          <a class="dropdown-item px-4 py-2 text-xs text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer transition-colors font-bold" onclick="generateProjectReport()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
            <span>Generate Project Report</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Secondary horizontal tab bar -->
    <div class="flex border-b border-slate-200 mb-6 gap-2">
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeSummaryTab === 'overview' ? 'text-[#2563EB] border-[#2563EB]' : 'text-slate-500 border-transparent hover:text-slate-700'}" data-tab="overview">Overview</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeSummaryTab === 'financial' ? 'text-[#2563EB] border-[#2563EB]' : 'text-slate-500 border-transparent hover:text-slate-700'}" data-tab="financial">Financial Status</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeSummaryTab === 'milestones' ? 'text-[#2563EB] border-[#2563EB]' : 'text-slate-500 border-transparent hover:text-slate-700'}" data-tab="milestones">Milestones</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeSummaryTab === 'activity' ? 'text-[#2563EB] border-[#2563EB]' : 'text-slate-500 border-transparent hover:text-slate-700'}" data-tab="activity">Recent Activity</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${activeSummaryTab === 'documents' ? 'text-[#2563EB] border-[#2563EB]' : 'text-slate-500 border-transparent hover:text-slate-700'}" data-tab="documents">Documents</button>
    </div>

    <!-- Tab Contents -->
    <div id="project-summary-tabs-container">
      <!-- 1. OVERVIEW -->
      <div id="tab-content-overview" class="${activeSummaryTab === 'overview' ? '' : 'hidden'} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Project Overview</h3>
            <p class="text-xs text-slate-600 leading-relaxed font-semibold">${proj.description}</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100">
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Department / Node</span>
              <span class="text-slate-900 block font-bold">${proj.department}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Zone Area</span>
              <span class="text-slate-900 block font-bold">${proj.zone}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Project Type</span>
              <span class="text-slate-900 block font-bold">${proj.projectType}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Project Manager</span>
              <span class="text-slate-900 block font-bold">${proj.officerInCharge}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Start Date</span>
              <span class="text-slate-900 block font-bold">${proj.startDate}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Target Completion</span>
              <span class="text-slate-900 block font-bold">${proj.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. FINANCIAL STATUS -->
      <div id="tab-content-financial" class="${activeSummaryTab === 'financial' ? '' : 'hidden'} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Financial Status</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Estimated Cost (Sanction)</span>
                <span class="text-slate-900 font-bold">Rs. ${(proj.budget / 10000000).toFixed(2)} Cr</span>
              </div>
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Budget Allocated</span>
                <span class="text-slate-900 font-bold">Rs. ${(proj.budget / 10000000).toFixed(2)} Cr</span>
              </div>
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Budget Utilized (Expenditure)</span>
                <span class="text-slate-900 font-bold">Rs. ${(proj.spent / 10000000).toFixed(2)} Cr</span>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-655">Work Construction Progress</span>
                <span class="text-[#2563EB] font-bold">${proj.progress}%</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#2563EB] rounded-full" style="width: ${proj.progress}%"></div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Financial Summary</h3>
            <p class="text-xs text-slate-600 leading-relaxed font-semibold">
              Out of the total budget limit of Rs. ${(proj.budget / 10000000).toFixed(2)} Cr, Rs. ${(proj.spent / 10000000).toFixed(2)} Cr has been utilized. The construction works are at ${proj.progress}% of physical progress completion.
            </p>
          </div>
        </div>
      </div>

      <!-- 3. MILESTONES -->
      <div id="tab-content-milestones" class="${activeSummaryTab === 'milestones' ? '' : 'hidden'} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Key Project Milestones</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span class="font-bold text-slate-800">Milestone 1: Structural Soil Clearances</span>
              </div>
              <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Completed (2025-07-15)</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span class="font-bold text-slate-800">Milestone 2: Sub-structure Concrete Pillars</span>
              </div>
              <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Completed (2026-01-15)</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span class="font-bold text-slate-800">Milestone 3: Steel Girder Erection (Superstructure)</span>
              </div>
              <span class="text-[9px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full">In Progress</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                <span class="font-bold text-slate-400">Milestone 4: Asphalt Road Blacktopping</span>
              </div>
              <span class="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Planned (Oct 2026)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. RECENT ACTIVITY -->
      <div id="tab-content-activity" class="${activeSummaryTab === 'activity' ? '' : 'hidden'} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Activity Timeline & Updates</h3>
          <div class="space-y-4 max-h-96 overflow-y-auto pr-1 text-xs">
            ${timeline.map(event => `
              <div class="border-l border-slate-200 pl-3.5 relative space-y-1 py-1 font-semibold">
                <span class="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${event.date} ${event.time} | ${event.actor}</div>
                <p class="text-slate-650 font-semibold leading-relaxed">${event.activity}</p>
              </div>
            `).join('')}
            ${timeline.length === 0 ? '<div class="text-center text-xs text-slate-400 p-4">No recent activity logs.</div>' : ''}
          </div>
        </div>
      </div>

      <!-- 5. DOCUMENTS -->
      <div id="tab-content-documents" class="${activeSummaryTab === 'documents' ? '' : 'hidden'} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Documents & Repository</h3>
              <p class="text-[10px] text-slate-500 mt-1">Audit-ready PDF file archives. Click Preview to view version logs and details</p>
            </div>
            <span class="px-2.5 py-1 rounded bg-[#EEF4FF] text-[#2563EB] text-[9px] font-bold uppercase tracking-wider">
              ${docs.length} Documents Attached
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="py-3 px-4">Document Name</th>
                  <th class="py-3 px-4">Category</th>
                  <th class="py-3 px-4">Version</th>
                  <th class="py-3 px-4">Uploaded By</th>
                  <th class="py-3 px-4">Uploaded Date</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-semibold text-slate-700">
                ${docs.map(doc => {
                  let statusClass = 'bg-slate-100 text-slate-600 border border-slate-200';
                  if (doc.status === 'Approved') statusClass = 'bg-emerald-50 text-emerald-700 border border-emerald-200';
                  else if (doc.status === 'Active') statusClass = 'bg-indigo-50 text-indigo-700 border border-indigo-200';
                  else if (doc.status === 'Pending Payment' || doc.status === 'Pending Review') statusClass = 'bg-amber-50 text-amber-700 border border-amber-200';
                  
                  return `
                    <tr class="hover:bg-slate-50/50">
                      <td class="py-3.5 px-4 text-slate-900 font-bold flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#2563EB] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span>${doc.name}</span>
                      </td>
                      <td class="py-3.5 px-4 text-slate-500 font-medium">${doc.category}</td>
                      <td class="py-3.5 px-4 text-slate-500 font-mono text-[10px]">${doc.version}</td>
                      <td class="py-3.5 px-4 text-slate-655 font-medium">${doc.uploadedBy}</td>
                      <td class="py-3.5 px-4 text-slate-500 font-mono text-[10px]">${doc.uploadedDate}</td>
                      <td class="py-3.5 px-4">
                        <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${statusClass}">${doc.status}</span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button onclick="previewDocumentById('${doc.id}')" class="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 cursor-pointer transition-colors">Preview</button>
                          <button onclick="downloadDocumentByName('${doc.name}')" class="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors">Download</button>
                          <button onclick="viewDocumentVersionHistory('${doc.id}')" class="bg-white hover:bg-slate-50 text-indigo-755 text-[10px] font-bold px-2 py-1 rounded border border-indigo-150 cursor-pointer transition-colors">History</button>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind tab click events
  const tabActive = "px-4 py-2 text-xs font-bold border-b-2 text-[#2563EB] border-[#2563EB] cursor-pointer transition-all";
  const tabInactive = "px-4 py-2 text-xs font-bold border-b-2 text-slate-500 border-transparent hover:text-slate-700 cursor-pointer transition-all";
  const tabIds = ['overview', 'financial', 'milestones', 'activity', 'documents'];
  
  const tabButtons = container.querySelectorAll('.project-summary-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (!tabId) return;

      activeSummaryTab = tabId;

      // Update button styles
      tabButtons.forEach(b => {
        if (b.getAttribute('data-tab') === tabId) {
          b.className = `project-summary-tab-btn ${tabActive}`;
        } else {
          b.className = `project-summary-tab-btn ${tabInactive}`;
        }
      });

      // Update visibility of content sections
      tabIds.forEach(t => {
        const el = document.getElementById(`tab-content-${t}`);
        if (el) {
          if (t === tabId) {
            el.classList.remove('hidden');
          } else {
            el.classList.add('hidden');
          }
        }
      });
    });
  });

  // Bind Export dropdown event listener
  const exportBtn = document.getElementById('project-export-btn');
  const exportDropdown = document.getElementById('project-export-dropdown');
  if (exportBtn && exportDropdown) {
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      exportDropdown.classList.add('hidden');
    });
  }

  // Register all document helper methods globally
  (window as any).previewDocumentById = (docId: string) => {
    const doc = docs.find(d => d.id === docId);
    if (doc) {
      showDocumentPreviewModal(doc);
    }
  };

  (window as any).downloadDocumentByName = (name: string) => {
    showToast(`Downloading file: ${name}`);
  };

  (window as any).viewDocumentVersionHistory = (docId: string) => {
    const modal = document.getElementById('document-preview-modal');
    const doc = docs.find(d => d.id === docId);
    if (modal && doc) {
      modal.classList.remove('hidden');
      modal.innerHTML = `
        <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-md w-full p-6 space-y-4 animate-toast-slide-in">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Version History</h4>
              <p class="text-[10px] text-slate-450 mt-1 uppercase font-mono">${doc.name}</p>
            </div>
            <button onclick="document.getElementById('document-preview-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          <div class="divide-y divide-slate-100 space-y-2">
            <div class="py-2.5 flex justify-between text-xs items-center">
              <div>
                <span class="font-bold text-slate-800">${doc.version} (Active)</span>
                <span class="text-[9px] text-slate-400 block">Uploaded by ${doc.uploadedBy}</span>
              </div>
              <span class="text-[10px] font-mono text-slate-450 font-bold">${doc.uploadedDate}</span>
            </div>
            <div class="py-2.5 flex justify-between text-xs items-center">
              <div>
                <span class="font-medium text-slate-500">v0.9 (Draft)</span>
                <span class="text-[9px] text-slate-400 block">Uploaded by Sri V. Kumar</span>
              </div>
              <span class="text-[10px] font-mono text-slate-450 font-bold">2025-05-15</span>
            </div>
          </div>
          <button onclick="document.getElementById('document-preview-modal').classList.add('hidden')" class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
            Close Version History
          </button>
        </div>
      `;
    }
  };

  (window as any).triggerExport = (format: string) => {
    showToast(`Successfully exported Project Data as ${format} format!`);
  };

  (window as any).generateProjectReport = () => {
    const modal = document.getElementById('project-report-modal');
    if (!modal) return;

    const team = PROJECT_TEAMS[proj.id] || [];
    const timeline = PROJECT_TIMELINES[proj.id] || [];
    const workflow = PROJECT_WORKFLOWS[proj.id] || [];
    const docs = PROJECT_DOCUMENTS[proj.id] || [];
    
    modal.classList.remove('hidden');
    modal.innerHTML = `
      <div class="bg-white border border-slate-300 rounded-md shadow-2xl max-w-4xl w-full p-8 space-y-6 my-8 print:p-0 print:border-none print:shadow-none max-h-[90vh] overflow-y-auto animate-toast-slide-in">
        <!-- Print Actions -->
        <div class="flex justify-between items-center pb-4 border-b border-slate-200 print:hidden">
          <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Official Project Report Preview</span>
          <div class="flex gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
              Print Report
            </button>
            <button onclick="document.getElementById('project-report-modal').classList.add('hidden')" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>

        <!-- Report Sheet Container -->
        <div class="space-y-6 text-slate-800 font-serif">
          <!-- Letterhead Header -->
          <div class="text-center space-y-2 border-b-2 border-slate-900 pb-4">
            <div class="font-bold text-lg text-slate-900 tracking-wide uppercase">Greater Hyderabad Municipal Corporation</div>
            <div class="text-xs text-slate-700 font-semibold tracking-wider">OFFICE OF THE COMMISSIONER, HEAD OFFICE, TANK BUND ROAD, HYDERABAD</div>
            <div class="text-[10px] text-slate-500 font-mono">Date: ${new Date().toISOString().split('T')[0]} | Ref No: GHMC/IT-ERP/REPORT/${proj.id}/${new Date().getFullYear()}</div>
          </div>

          <div class="text-center font-bold text-sm text-slate-900 underline uppercase py-2">
            DETAILED PROJECT STATUS REPORT
          </div>

          <!-- Section 1: Project Information -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">1. Project Information</h4>
            <table class="w-full text-xs border border-slate-200 border-collapse">
              <tbody>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold w-1/4">Project ID:</td>
                  <td class="p-2 border border-slate-200 font-mono">${proj.id}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold w-1/4">Current Status:</td>
                  <td class="p-2 border border-slate-200 font-bold text-indigo-700">${proj.status}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Project Name:</td>
                  <td class="p-2 border border-slate-200" colspan="3">${proj.name}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Department / Division:</td>
                  <td class="p-2 border border-slate-200">${proj.department}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Zone / Area:</td>
                  <td class="p-2 border border-slate-200">${proj.zone}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Project Manager:</td>
                  <td class="p-2 border border-slate-200">${proj.officerInCharge}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Outlay Timeline:</td>
                  <td class="p-2 border border-slate-200">${proj.startDate} to ${proj.endDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 2: Financial Summary -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">2. Financial Status Summary</h4>
            <table class="w-full text-xs border border-slate-200 border-collapse">
              <thead>
                <tr class="bg-slate-50">
                  <th class="p-2 border border-slate-200 text-left font-bold">Sanction Budget Outlay</th>
                  <th class="p-2 border border-slate-200 text-left font-bold">Disbursed Expenditure</th>
                  <th class="p-2 border border-slate-200 text-left font-bold">Utilization Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2 border border-slate-200 font-bold">Rs. ${(proj.budget / 10000000).toFixed(2)} Crores</td>
                  <td class="p-2 border border-slate-200 font-bold">Rs. ${(proj.spent / 10000000).toFixed(2)} Crores</td>
                  <td class="p-2 border border-slate-200 font-bold text-emerald-700">${((proj.spent / proj.budget) * 100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 3: Key Milestones -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">3. Project Milestones & Progress</h4>
            <div class="text-xs space-y-1 font-sans">
              <div class="flex justify-between font-bold text-slate-700 mb-1">
                <span>Overall Physical Completion Progress:</span>
                <span>${proj.progress}%</span>
              </div>
              <div class="w-full h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden mb-3">
                <div class="h-full bg-slate-900" style="width: ${proj.progress}%"></div>
              </div>
              <div class="border border-slate-200 rounded p-2 bg-slate-50/20">
                <ul class="list-disc pl-5 space-y-1 text-slate-700 font-semibold">
                  <li>Milestone 1: Structural Soil Clearances — <span class="text-emerald-700">Completed (2025-07-15)</span></li>
                  <li>Milestone 2: Sub-structure Concrete Pillars — <span class="text-emerald-700">Completed (2026-01-15)</span></li>
                  <li>Milestone 3: Steel Girder Erection (Superstructure) — <span class="text-indigo-700 font-bold">In Progress (${proj.progress}%)</span></li>
                  <li>Milestone 4: Asphalt Road Blacktopping — <span class="text-slate-500">Planned (Oct 2026)</span></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 4: Workflow Tracking & Approvals -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">4. File Movement & Workflow History</h4>
            <table class="w-full text-[10px] border border-slate-200 border-collapse">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-bold">
                  <th class="p-2 border border-slate-200 text-left">Stage</th>
                  <th class="p-2 border border-slate-200 text-left">Officer Name</th>
                  <th class="p-2 border border-slate-200 text-left">Action Date / Time</th>
                  <th class="p-2 border border-slate-200 text-left">Status</th>
                  <th class="p-2 border border-slate-200 text-left">Remarks Given</th>
                </tr>
              </thead>
              <tbody>
                ${workflow.map(w => `
                  <tr>
                    <td class="p-2 border border-slate-200 font-bold">${w.stage}</td>
                    <td class="p-2 border border-slate-200">${w.officer} (${w.department})</td>
                    <td class="p-2 border border-slate-200 font-mono">${w.dateTime}</td>
                    <td class="p-2 border border-slate-200 font-bold">${w.status}</td>
                    <td class="p-2 border border-slate-200 italic">"${w.remarks || 'N/A'}"</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Section 5: Attached Auditable Certificates -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">5. Attached Files & Certificates</h4>
            <ul class="list-decimal pl-5 text-xs text-slate-700 font-semibold space-y-1">
              ${docs.map(d => `
                <li>${d.name} (Version: ${d.version}, Uploaded by: ${d.uploadedBy} on ${d.uploadedDate}, Status: ${d.status})</li>
              `).join('')}
            </ul>
          </div>

          <!-- Section 6: Officer Signatures & Seal -->
          <div class="pt-8">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans mb-8">6. Authorization & Attestations</h4>
            <div class="grid grid-cols-3 gap-8 text-center text-xs font-sans mt-4">
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Sri M. Dana Kishore, IAS</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Commissioner, GHMC</div>
              </div>
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Smt. K. Anitha Reddy</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Chief Finance Officer</div>
              </div>
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Er. R. Sharma</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Executive Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };
}

// ------------------------------------------
// 10B. TAB: DOCUMENTS / PDF REPOSITORY
// ------------------------------------------
let activeDocumentModal: ProjectDocument | null = null;

function renderProjectDocumentsRepository(container: HTMLElement, proj: Project) {
  const docs = PROJECT_DOCUMENTS[proj.id] || [];
  
  const categories: Array<ProjectDocument['category']> = [
    'Administrative Sanctions',
    'Work Orders',
    'Estimates',
    'Tender Documents',
    'Drawings',
    'Approvals',
    'Bills',
    'Invoices',
    'Completion Certificates',
    'Other Attachments'
  ];

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Documents Repository</h3>
          <p class="text-[10px] text-slate-500 mt-1">Audit-ready PDF file archives. Click Preview to view version logs and details</p>
        </div>
      </div>

      <!-- Categories Container -->
      <div class="space-y-8">
        ${categories.map(cat => {
          const catDocs = docs.filter(d => d.category === cat);
          if (catDocs.length === 0) return ''; // Hide empty categories

          return `
            <div class="space-y-3">
              <h4 class="text-[10px] font-bold text-slate-450 uppercase tracking-widest border-b border-slate-50 pb-2">${cat}</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${catDocs.map(doc => `
                  <div class="p-4 border border-slate-100 hover:border-slate-250 bg-slate-50/20 rounded-md flex items-center justify-between gap-4 transition-all hover:bg-slate-50/50">
                    <div class="flex items-center gap-3 truncate min-w-0">
                      <!-- Icon -->
                      <div class="w-8 h-8 bg-indigo-50 text-indigo-600 rounded flex items-center justify-center shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <div class="truncate">
                        <span class="text-xs font-bold text-slate-800 block truncate" title="${doc.name}">${doc.name}</span>
                        <div class="flex items-center gap-2 text-[9px] text-slate-450 font-bold uppercase tracking-wider mt-1">
                          <span>${doc.size}</span>
                          <span>•</span>
                          <span>Ver: ${doc.version}</span>
                          <span>•</span>
                          <span>By: ${doc.uploadedBy.split(' ')[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="flex items-center gap-2 shrink-0">
                      <button class="doc-preview-btn bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 transition-colors cursor-pointer" data-id="${doc.id}">
                        Preview
                      </button>
                      <button class="doc-download-btn bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer" data-name="${doc.name}">
                        Download
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Preview Modal Container -->
    <div id="document-preview-modal" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-55 flex items-center justify-center p-4"></div>
  `;

  // Bind preview clicks
  container.querySelectorAll('.doc-preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const docId = btn.getAttribute('data-id');
      const doc = docs.find(d => d.id === docId);
      if (doc) {
        showDocumentPreviewModal(doc);
      }
    });
  });

  // Bind download clicks
  container.querySelectorAll('.doc-download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const docName = btn.getAttribute('data-name');
      showToast(`Downloading file: ${docName}`);
    });
  });
}

function showDocumentPreviewModal(doc: ProjectDocument) {
  const modal = document.getElementById('document-preview-modal');
  if (!modal) return;

  let leftPanelContent = '';
  if (doc.name === 'ghmc.pdf') {
    leftPanelContent = `
      <div class="flex-1 bg-emerald-50/10 p-6 overflow-y-auto border-r border-slate-200 font-mono text-[10px] text-emerald-950 leading-relaxed max-h-full">
        <!-- GHMC Note sheet Header -->
        <div class="text-center border-b border-emerald-900/20 pb-4 mb-4">
          <div class="font-bold text-xs text-emerald-900">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
          <div class="text-[9px] text-emerald-800/80 uppercase font-semibold">O/o SENIOR ASSISTANT-1 INFORMATION TECHNOLOGY, HEAD OFFICE</div>
          <div class="text-[9px] text-emerald-800/60 font-mono mt-1">Computer File No. 401476 | File Ref: IT/COM/0008/2026/SR.ASST-1 (IT)-HO</div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-emerald-900 uppercase mb-1">Subject:</div>
          <p class="font-medium text-emerald-955 bg-white p-2 border border-emerald-900/10 rounded">
            Providing of IVR Outbound Call Campaign – Early Bird Property Tax Scheme 2026-27 of GHMC – According administrative Sanction and Agency approval – Request – Reg.
          </p>
        </div>

        <div class="space-y-4">
          <div class="border-l-2 border-emerald-800/30 pl-3">
            <span class="font-bold text-emerald-900 text-[9px] block">Note #1 (Submitted to AC(IT), GHMC)</span>
            <p class="mt-1">
              It is submitted that the Commissioner, GHMC has instructed the IT Section to give wide publicity for the Early Bird Property Tax Scheme (5% rebate) by adopting various modes such as SMS, call campaigns, etc., to ensure maximum outreach before 30th April 2026.
            </p>
            <p class="mt-2">
              In this regard, the IT Section proposes to undertake an IVR Outbound Call Campaign to create awareness among citizens who have not yet paid their Property Tax for the financial year 2026-27 and to encourage them to avail the Early Bird Scheme.
            </p>
            <p class="mt-2">
              Accordingly, this office has approached M/s. EMRI Green Health Services, the agency presently maintaining the GHMC Call Center (040-21111111) to provide services for conducting the IVR Outbound Call Campaign.
            </p>
            
            <div class="mt-3 bg-white border border-emerald-900/15 rounded p-2">
              <div class="font-bold text-emerald-900 mb-1">Cost Details (Excl GST):</div>
              <div class="flex justify-between border-b border-emerald-900/10 py-1 font-semibold">
                <span>Providing IVR campaign execution (Lump sum)</span>
                <span>Rs. 5,00,000</span>
              </div>
              <div class="flex justify-between pt-1 font-bold">
                <span>Total amount (Rupees Five Lakh Only)</span>
                <span>Rs. 5,00,000</span>
              </div>
            </div>
            
            <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
              Signed: G. SATYANARAYANA (SR.ASST-1(IT)-HO) — 20/04/2026
            </div>
          </div>

          <div class="border-t border-dashed border-emerald-900/10 pt-3">
            <div class="border-l-2 border-emerald-800/30 pl-3">
              <span class="font-bold text-emerald-900 text-[9px] block">Note #2 & #3 (AE / Dy.EE Recommendation)</span>
              <p class="mt-1">Recommended. EMRI GHS currently manages the civic helpline and has the necessary outbound calling setup. Entrusting work to existing call center agency is technically feasible and cost-effective.</p>
              <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
                G.N. SAI RAM (AE-3) / NARSING RAO KORMI (DY.EE) — 21/04/2026
              </div>
            </div>
          </div>

          <div class="border-t border-dashed border-emerald-900/10 pt-3">
            <div class="border-l-2 border-emerald-800/30 pl-3">
              <span class="font-bold text-emerald-900 text-[9px] block">Note #6 (Administrative Sanction)</span>
              <p class="mt-1 font-bold text-emerald-950 font-mono">"ok"</p>
              <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
                R V KARNAN IAS (COMMISSIONER) — 21/04/2026
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    leftPanelContent = `
      <div class="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 border-r border-slate-200">
        <svg class="w-12 h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        <span class="text-xs font-bold text-slate-800 text-center">${doc.name}</span>
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Mock PDF View Interface</span>
        <button class="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-semibold transition-all cursor-pointer" onclick="alert('Viewing full document via PDF.js viewer is disabled in prototype.')">
          Open in Native PDF Viewer
        </button>
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-4xl w-full overflow-hidden flex flex-col h-[600px]">
      <!-- Header -->
      <div class="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">${doc.id} - ${doc.name}</h4>
          <p class="text-[10px] text-slate-450 font-semibold mt-1 uppercase tracking-wider">${doc.category}</p>
        </div>
        <button id="close-doc-modal-btn" class="text-slate-450 hover:text-slate-750 text-base font-bold cursor-pointer">✕</button>
      </div>

      <!-- Body split -->
      <div class="flex-1 flex overflow-hidden">
        <!-- PDF Preview Panel -->
        ${leftPanelContent}

        <!-- Details & Version History -->
        <div class="w-80 p-5 overflow-y-auto space-y-6 text-xs border-l border-slate-100 bg-slate-50/20">
          <!-- Attributes -->
          <div class="space-y-3">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Specs</div>
            <div class="space-y-2 font-semibold text-slate-655">
              <div class="flex justify-between"><span>Ver:</span> <span class="text-slate-900 font-bold">${doc.version}</span></div>
              <div class="flex justify-between"><span>Size:</span> <span class="text-slate-900 font-bold">${doc.size}</span></div>
              <div class="flex justify-between"><span>Status:</span> <span class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">${doc.status}</span></div>
              <div class="flex justify-between"><span>Uploaded:</span> <span class="text-slate-900 font-mono text-[10px]">${doc.uploadedDate}</span></div>
              <div class="flex justify-between"><span>By:</span> <span class="text-slate-900 font-bold">${doc.uploadedBy}</span></div>
            </div>
          </div>

          <!-- Version history list -->
          <div class="space-y-3">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version History</div>
            <div class="space-y-3">
              <div class="border-l-2 border-slate-950 pl-3 py-0.5">
                <div class="font-bold text-slate-900">v1.0 (Signed PDF)</div>
                <div class="text-[9px] text-slate-450 font-medium">Uploaded by ${doc.uploadedBy} on ${doc.uploadedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  document.getElementById('close-doc-modal-btn')?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

// ------------------------------------------
// 10C. TAB: WORKFLOW TRACKING (11 STAGES)
// ------------------------------------------
let activeTrackingCycle: 'note' | 'workorder' | 'fileforward' = 'note';

function renderProjectWorkflowTracking(container: HTMLElement, proj: Project) {
  const steps = PROJECT_WORKFLOWS[proj.id] || [];
  const files = state.eOfficeFiles.filter(f => f.projectId === proj.id);
  const events = PROJECT_TIMELINES[proj.id] || [];

  // 3 Workflow Cycles
  const CYCLE_NOTE_FILE = [
    'Senior Assistant (Note Writer)',
    'AE-3 (IT)',
    'Dy. EE (IT)',
    'JC (IT)',
    'Additional Commissioner (IT)',
    'Commissioner'
  ];

  const CYCLE_WORK_ORDER = [
    'Senior Assistant (Note Writer)',
    'AE-3 (IT)',
    'Dy. EE (IT)',
    'JC (IT)',
    'Additional Commissioner (IT)'
  ];

  const CYCLE_FILE_FORWARD = [
    'Senior Assistant (Note Writer)',
    'AE-3 (IT)',
    'Dy. EE (IT)',
    'JC (IT)',
    'CFA',
    'Superintendent (FA)',
    'Junior Assistant (FA)',
    'Superintendent (FA)',
    'Financial Adviser'
  ];

  const cycleMap: Record<string, { label: string; pipeline: string[]; returnPipeline: string[] }> = {
    note: {
      label: 'Cycle 1 – Note File',
      pipeline: CYCLE_NOTE_FILE,
      returnPipeline: ['Additional Commissioner (IT)', 'JC (IT)', 'Dy. EE (IT)', 'AE-3 (IT)', 'Senior Assistant (Note Writer)']
    },
    workorder: {
      label: 'Cycle 2 – Work Order Approval',
      pipeline: CYCLE_WORK_ORDER,
      returnPipeline: ['JC (IT)', 'Dy. EE (IT)', 'AE-3 (IT)', 'Senior Assistant (Note Writer)']
    },
    fileforward: {
      label: 'Cycle 3 – File Forward',
      pipeline: CYCLE_FILE_FORWARD,
      returnPipeline: ['JC (IT)', 'Dy. EE (IT)', 'AE-3 (IT)', 'Senior Assistant (Note Writer)']
    }
  };

  const cycle = cycleMap[activeTrackingCycle];

  // Auto-detect current stage from eOffice files for this project
  const activeFile = files.find(f => f.status !== 'Approved / Closed' && f.status !== 'Rejected');
  const currentCustodian = activeFile?.currentCustodian || '';
  const isReturned = activeFile?.status === 'Returned';

  // Determine stage status for each role in the pipeline
  function getStageStatus(role: string, pipelineIdx: number): 'completed' | 'active' | 'pending' | 'returned' {
    if (!activeFile) return pipelineIdx === 0 ? 'active' : 'pending';
    
    // Check approval history
    const approved = activeFile.approvalHistory?.some(h => 
      h.role === role && (h.action.includes('Approved') || h.action.includes('Forwarded'))
    );
    if (approved && currentCustodian !== role) return 'completed';
    
    if (currentCustodian === role) {
      if (isReturned) return 'returned';
      return 'active';
    }
    
    const returned = activeFile.approvalHistory?.some(h =>
      h.role === role && h.action.includes('Returned')
    );
    if (returned) return 'returned';
    
    return 'pending';
  }

  // Find active step for existing workflow data
  const activeStep = steps.find(s => s.status === 'In Progress') || steps[steps.length - 1];

  container.innerHTML = `
    <!-- Top current status banner -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Active Project Stage</span>
          <h3 class="text-sm font-bold text-slate-900">${activeStep ? activeStep.stage : currentCustodian || 'Initiation'}</h3>
        </div>
        <div class="border-l border-slate-100 pl-6">
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Custodian Officer</span>
          <span class="text-xs font-bold text-slate-800">${activeStep ? activeStep.officer : currentCustodian || 'Unassigned'}</span>
          <span class="text-[10px] text-slate-400 block">${activeStep ? activeStep.department : activeFile?.department || ''}</span>
        </div>
        <div class="border-l border-slate-100 pl-6">
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Pending Action With</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border border-amber-100 mt-1 inline-block">${currentCustodian || (activeStep && activeStep.pendingWith !== 'None' ? activeStep.pendingWith : 'No pending action')}</span>
        </div>
      </div>
    </div>

    <!-- Workflow Cycle Selector Tabs -->
    <div class="flex border-b border-slate-200 bg-white rounded-t-md mb-0 gap-1 select-none px-2 pt-2">
      <button onclick="changeTrackingCycle('note')" class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTrackingCycle === 'note' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}">
        Cycle 1 – Note File
      </button>
      <button onclick="changeTrackingCycle('workorder')" class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTrackingCycle === 'workorder' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}">
        Cycle 2 – Work Order
      </button>
      <button onclick="changeTrackingCycle('fileforward')" class="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeTrackingCycle === 'fileforward' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-500 hover:text-slate-700'}">
        Cycle 3 – File Forward
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Left side: workflow timeline -->
      <div class="xl:col-span-2 space-y-6">
        
        <!-- Forward Flow -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">${cycle.label} – Forward Flow</h4>
          <p class="text-[9px] text-slate-450 uppercase font-mono mb-6">Approval pipeline stages for this workflow cycle</p>
          <div class="relative pl-6 space-y-5">
            <!-- Line Connector -->
            <div class="absolute left-[34px] top-4 bottom-4 w-0.5 bg-slate-150"></div>

            ${cycle.pipeline.map((role, idx) => {
              const stageStatus = getStageStatus(role, idx);
              let bulletColor = 'border-slate-200 bg-white text-slate-350';
              let borderOutline = 'border-slate-250 bg-white';
              let statusText = 'Pending';
              let statusBadge = 'bg-slate-100 text-slate-450';

              if (stageStatus === 'completed') {
                bulletColor = 'border-emerald-500 bg-emerald-500 text-white';
                borderOutline = 'border-emerald-250 bg-emerald-50/10';
                statusText = 'Cleared';
                statusBadge = 'bg-emerald-50 text-emerald-700';
              } else if (stageStatus === 'active') {
                bulletColor = 'border-[#2563EB] bg-[#2563EB] text-white ring-4 ring-[#EEF4FF]';
                borderOutline = 'border-[#2563EB] bg-[#EEF4FF]/10 ring-2 ring-[#EEF4FF]/20';
                statusText = 'Active';
                statusBadge = 'bg-[#2563EB]/10 text-[#2563EB]';
              } else if (stageStatus === 'returned') {
                bulletColor = 'border-amber-500 bg-amber-500 text-white';
                borderOutline = 'border-amber-250 bg-amber-50/10';
                statusText = 'Returned';
                statusBadge = 'bg-amber-50 text-amber-700';
              }

              return `
                <div class="flex gap-6 items-start relative z-10 animate-toast-slide-in">
                  <div class="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${bulletColor}">
                    ${stageStatus === 'completed' ? '✓' : idx + 1}
                  </div>
                  <div class="flex-1 border p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${borderOutline}">
                    <div class="space-y-1">
                      <div class="flex items-center gap-3">
                        <h4 class="text-xs font-bold text-slate-800 leading-none">${role}</h4>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${statusBadge}">${statusText}</span>
                      </div>
                      <p class="text-[10px] text-slate-450 font-semibold">${stageStatus === 'active' ? 'Currently awaiting action at this desk' : stageStatus === 'completed' ? 'Approved and forwarded to next desk' : stageStatus === 'returned' ? 'Returned for correction' : 'Pending activation'}</p>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Return Flow -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">${cycle.label} – Return Flow</h4>
          <p class="text-[9px] text-slate-450 uppercase font-mono mb-6">Return path when corrections are required</p>
          <div class="relative pl-6 space-y-4">
            <div class="absolute left-[34px] top-4 bottom-4 w-0.5 bg-rose-100"></div>
            ${cycle.returnPipeline.map((role, idx) => {
              const wasReturned = activeFile?.approvalHistory?.some(h => h.role === role && h.action.includes('Returned'));
              const bulletColor = wasReturned ? 'border-rose-400 bg-rose-400 text-white' : 'border-slate-200 bg-white text-slate-350';
              const borderOutline = wasReturned ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200 bg-white';
              return `
                <div class="flex gap-6 items-start relative z-10">
                  <div class="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold shrink-0 ${bulletColor}">
                    ${wasReturned ? '↩' : idx + 1}
                  </div>
                  <div class="flex-1 border p-3 rounded-md ${borderOutline}">
                    <div class="flex items-center gap-3">
                      <h4 class="text-[11px] font-bold text-slate-700 leading-none">${role}</h4>
                      <span class="px-1.5 py-0.5 rounded text-[7px] font-bold uppercase tracking-wider ${wasReturned ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-400'}">${wasReturned ? 'Returned' : 'Standby'}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- File Movement History -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">eOffice File Movement History</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                  <th class="py-2.5 px-1">File Ref</th>
                  <th class="py-2.5 px-1">Subject</th>
                  <th class="py-2.5 px-1">Current Custodian</th>
                  <th class="py-2.5 px-1">Status</th>
                  <th class="py-2.5 px-1">Last Update</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${files.map(f => `
                  <tr>
                    <td class="py-3 px-1 font-mono font-bold text-[#2563EB]">${f.id}</td>
                    <td class="py-3 px-1 font-medium truncate max-w-xs text-slate-900" title="${f.subject}">${f.subject}</td>
                    <td class="py-3 px-1 font-semibold text-slate-700">${f.currentCustodian}</td>
                    <td class="py-3 px-1">
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${f.status === 'Approved / Closed' ? 'bg-emerald-50 text-emerald-700' : f.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : f.status === 'Returned' ? 'bg-amber-50 text-amber-700' : 'bg-amber-50 text-amber-700'}">${f.status}</span>
                    </td>
                    <td class="py-3 px-1 font-mono text-[10px] text-slate-500">${f.lastUpdated}</td>
                  </tr>
                `).join('')}
                ${files.length === 0 ? '<tr><td colspan="5" class="py-6 text-center text-slate-450 italic">No active files found.</td></tr>' : ''}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right side: activity log -->
      <div class="space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Project Activity Log</h4>
          <div class="relative pl-6 space-y-6">
            <!-- Line -->
            <div class="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-150"></div>

            ${events.map(event => `
              <div class="flex gap-4 items-start relative z-10 animate-toast-slide-in">
                <!-- Bullet -->
                <div class="w-5.5 h-5.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                </div>
                
                <div class="space-y-1">
                  <div class="text-[9px] font-bold text-slate-450 uppercase tracking-wider">${event.date} ${event.time}</div>
                  <p class="text-xs text-slate-800 font-semibold">${event.activity}</p>
                  <div class="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Actor: ${event.actor}</div>
                </div>
              </div>
            `).join('')}

            ${events.length === 0 ? '<div class="text-center text-xs text-slate-400 py-4 italic">No activities logged.</div>' : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  (window as any).changeTrackingCycle = (cycle: 'note' | 'workorder' | 'fileforward') => {
    activeTrackingCycle = cycle;
    renderProjectWorkspaceContainer();
  };
}

// ------------------------------------------
// 10D. TAB: EOFFICE FILES (PROJECT-SPECIFIC)
// ------------------------------------------
function renderProjectFilesWorkspace(container: HTMLElement, proj: Project) {
  renderEOfficeModule(container);
}

// ------------------------------------------
// 10E. TAB: NOTES & CORRESPONDENCE
// ------------------------------------------
function renderProjectNotesWorkspace(container: HTMLElement, proj: Project) {
  const files = state.eOfficeFiles.filter(f => f.projectId === proj.id);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Notes sheet logs (Span 2) -->
      <div class="bg-white border border-slate-200 rounded-md p-6 lg:col-span-2 space-y-4">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Official Note Sheets Ledger</h3>
        
        ${files.length === 0 ? '<div class="text-center text-xs text-slate-400 p-8 border border-dashed rounded">No note sheets mapped to this project</div>' : ''}
        
        ${files.map(f => `
          <div class="space-y-3">
            <div class="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono">Note Sheet for File Reference: ${f.id}</div>
            <div class="green-note-sheet rounded-md p-6 border text-[11px] text-emerald-950 space-y-4">
              ${f.notes.map((n, idx) => `
                <div class="pl-8 relative">
                  <span class="absolute left-0 top-0 text-[10px] font-bold text-emerald-900/30">#${idx + 1}</span>
                  <p class="font-mono text-emerald-900 leading-relaxed">${n.text}</p>
                  <div class="text-right mt-2 text-[9px] font-bold uppercase tracking-wider text-emerald-800/60 font-mono">
                    Signed: ${n.writer} | ${n.date}
                  </div>
                </div>
                <div class="border-b border-dashed border-emerald-900/10 my-3 last:hidden"></div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Correspondence letters pane -->
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Inward Correspondence (Letters)</h3>
        
        <div class="space-y-4">
          <div class="p-3 border border-slate-100 hover:border-slate-250 bg-slate-50/20 rounded-md text-xs space-y-2">
            <div class="flex justify-between items-center text-[9px] font-bold text-indigo-750 uppercase tracking-wider">
              <span>Ltr Ref: GHMC-ENG-2026-921</span>
              <span>2026-06-25</span>
            </div>
            <h4 class="font-bold text-slate-800 leading-tight">Demand Letter for land survey clearances</h4>
            <p class="text-slate-500 text-[10px] leading-relaxed">Request for immediate mapping survey at Kondapur junction land acquisition sectors.</p>
            <div class="text-right"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Inward clearance: Sri V. Kumar</span></div>
          </div>

          <div class="p-3 border border-slate-100 hover:border-slate-250 bg-slate-50/20 rounded-md text-xs space-y-2">
            <div class="flex justify-between items-center text-[9px] font-bold text-indigo-750 uppercase tracking-wider">
              <span>Ltr Ref: TRANSCO-CIV-441</span>
              <span>2026-06-12</span>
            </div>
            <h4 class="font-bold text-slate-800 leading-tight">NOC Clearance Letter for electric grid relocation</h4>
            <p class="text-slate-500 text-[10px] leading-relaxed">No Objection Certificate issued by TSNPDCL for shifting electric lighting cables near Flyover site.</p>
            <div class="text-right"><span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Inward clearance: Er. R. Sharma</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ------------------------------------------
// 10E-2. TAB: RELATED DOCUMENTS
// ------------------------------------------
function renderProjectRelatedDocuments(container: HTMLElement, proj: Project) {
  const docs = PROJECT_DOCUMENTS[proj.id] || [];
  const files = state.eOfficeFiles.filter(f => f.projectId === proj.id);
  const workOrders = state.workOrders.filter(w => w.projectId === proj.id);
  const bills = state.bills.filter(b => b.projectId === proj.id);

  const allItems: Array<{ cat: string; name: string; type: string; date: string; status: string; ref: string }> = [];

  files.forEach(f => allItems.push({ cat: 'Note Files (eOffice)', name: f.subject, type: 'eOffice Note', date: f.lastUpdated, status: f.status, ref: f.id }));
  workOrders.forEach(w => allItems.push({ cat: 'Work Orders', name: w.title, type: 'Work Order', date: w.stageHistory['Requirement'] || 'N/A', status: w.currentStage, ref: w.id }));
  bills.forEach(b => allItems.push({ cat: 'Invoices & Bill Claims', name: `Invoice from ${b.vendor} (Rs. ${(b.amount / 100000).toFixed(1)} Lakhs)`, type: 'Invoice', date: b.date, status: b.status, ref: b.id }));
  docs.forEach(d => allItems.push({ cat: d.category, name: d.name, type: d.type.toUpperCase(), date: d.uploadedDate, status: d.status, ref: d.id }));

  const catNames = [...new Set(allItems.map(i => i.cat))];

  let categoriesHtml = '';
  catNames.forEach(catName => {
    const items = allItems.filter(i => i.cat === catName);
    categoriesHtml += `
      <div class="space-y-3">
        <h4 class="text-[10px] font-bold text-slate-450 uppercase tracking-widest border-b border-slate-50 pb-2">${catName} (${items.length})</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                <th class="py-2 px-2">Reference</th>
                <th class="py-2 px-2">Document Name</th>
                <th class="py-2 px-2">Type</th>
                <th class="py-2 px-2">Date</th>
                <th class="py-2 px-2">Status</th>
                <th class="py-2 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${items.map(item => {
                const statusClass = (item.status === 'Approved' || item.status === 'Approved / Closed' || item.status === 'Paid') ? 'bg-emerald-50 text-emerald-700' : item.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700';
                return `
                  <tr class="hover:bg-slate-50/50">
                    <td class="py-2.5 px-2 font-mono font-bold text-[#2563EB] text-[10px]">${item.ref}</td>
                    <td class="py-2.5 px-2 font-semibold text-slate-800 truncate max-w-xs" title="${item.name}">${item.name}</td>
                    <td class="py-2.5 px-2"><span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">${item.type}</span></td>
                    <td class="py-2.5 px-2 font-mono text-[10px] text-slate-500">${item.date}</td>
                    <td class="py-2.5 px-2"><span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${statusClass}">${item.status}</span></td>
                    <td class="py-2.5 px-2 text-right">
                      <button onclick="showToast('Opening document: ${item.ref}')" class="text-[#2563EB] hover:text-[#1D4ED8] text-[10px] font-bold uppercase tracking-wider cursor-pointer">View</button>
                      <span class="mx-1 text-slate-300">|</span>
                      <button onclick="showToast('Downloading: ${item.ref}')" class="text-slate-500 hover:text-slate-700 text-[10px] font-bold uppercase tracking-wider cursor-pointer">Download</button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 space-y-8">
      <div class="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Related Documents & Files</h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold">All documents, note files, work orders, and attachments for ${proj.name}</p>
        </div>
        <span class="px-2.5 py-1 bg-slate-100 text-slate-700 text-[9px] font-bold uppercase tracking-wider rounded">${allItems.length} Documents</span>
      </div>
      ${allItems.length === 0 ? '<div class="text-center text-xs text-slate-400 py-8 italic">No documents found for this project.</div>' : ''}
      ${categoriesHtml}
    </div>
  `;
}

// ------------------------------------------
// 10E-3. TAB: AI ASSIST
// ------------------------------------------
let aiAssistMessages: Array<{ role: 'user' | 'assistant'; text: string }> = [];
let currentAiProjectId = '';

function renderProjectAIAssist(container: HTMLElement, proj: Project) {
  if (currentAiProjectId !== proj.id) {
    currentAiProjectId = proj.id;
    aiAssistMessages = [];
  }

  const messagesHtml = aiAssistMessages.map(msg => {
    if (msg.role === 'user') {
      return `<div class="flex justify-end"><div class="bg-[#2563EB] text-white px-4 py-2.5 rounded-lg rounded-br-sm max-w-[75%] text-xs font-semibold leading-relaxed">${msg.text}</div></div>`;
    } else {
      return `<div class="flex justify-start"><div class="bg-slate-100 text-slate-800 px-4 py-2.5 rounded-lg rounded-bl-sm max-w-[75%] text-xs font-semibold leading-relaxed whitespace-pre-wrap">${msg.text}</div></div>`;
    }
  }).join('');

  const suggestBtns = [
    'What is the current approval stage?',
    'Show the latest note.',
    'Summarize this project.',
    'List all pending approvals.',
    'Show related documents.',
    'Who is handling this project?'
  ].map(q => `<button onclick="askAiQuestion('${q}')" class="px-3 py-1.5 bg-[#EEF4FF] hover:bg-[#DBEAFE] text-[#2563EB] text-[10px] font-bold rounded-full cursor-pointer transition-all border border-[#DBEAFE]">${q}</button>`).join('');

  const emptyState = `
    <div class="text-center py-12 space-y-4">
      <div class="w-14 h-14 bg-[#EEF4FF] rounded-full flex items-center justify-center mx-auto">
        <svg class="w-7 h-7 text-[#2563EB]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div>
        <h4 class="text-sm font-bold text-slate-800">Project Intelligence Assistant</h4>
        <p class="text-[10px] text-slate-500 mt-1 font-semibold max-w-md mx-auto">I can answer questions about this project's workflow status, notes, documents, approvals, and more.</p>
      </div>
      <div class="flex flex-wrap justify-center gap-2 mt-4">${suggestBtns}</div>
    </div>
  `;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col" style="height: 75vh;">
      <div class="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">AI Project Assistant</h3>
          <p class="text-[10px] text-slate-500 mt-0.5 font-semibold">Ask questions about ${proj.name} — notes, documents, workflow, and status</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span class="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Online</span>
        </div>
      </div>
      <div id="ai-messages-container" class="flex-1 overflow-y-auto p-6 space-y-4">
        ${aiAssistMessages.length === 0 ? emptyState : messagesHtml}
      </div>
      <div class="border-t border-slate-200 p-4 flex gap-3">
        <input type="text" id="ai-query-input" class="flex-1 bg-slate-50 border border-slate-200 rounded-md px-4 py-2.5 text-xs outline-none focus:border-[#2563EB] transition-colors font-semibold" placeholder="Ask about this project..." onkeydown="if(event.key==='Enter') submitAiQuery()">
        <button onclick="submitAiQuery()" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer transition-all">Send</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const mc = document.getElementById('ai-messages-container');
    if (mc) mc.scrollTop = mc.scrollHeight;
  }, 50);

  (window as any).askAiQuestion = (question: string) => {
    const input = document.getElementById('ai-query-input') as HTMLInputElement;
    if (input) input.value = question;
    submitAiQueryInternal(question, proj);
  };

  (window as any).submitAiQuery = () => {
    const input = document.getElementById('ai-query-input') as HTMLInputElement;
    const query = input?.value.trim();
    if (!query) return;
    input.value = '';
    submitAiQueryInternal(query, proj);
  };
}

function submitAiQueryInternal(query: string, proj: Project) {
  aiAssistMessages.push({ role: 'user', text: query });
  const response = generateAiResponse(query, proj);
  const container = document.getElementById('project-workspace-view');
  if (container) {
    renderProjectAIAssist(container, proj);
    setTimeout(() => {
      aiAssistMessages.push({ role: 'assistant', text: response });
      renderProjectAIAssist(container, proj);
    }, 800);
  }
}

function generateAiResponse(query: string, proj: Project): string {
  const q = query.toLowerCase();
  const files = state.eOfficeFiles.filter(f => f.projectId === proj.id);
  const workOrders = state.workOrders.filter(w => w.projectId === proj.id);
  const docs = PROJECT_DOCUMENTS[proj.id] || [];
  const bills = state.bills.filter(b => b.projectId === proj.id);
  const activeFile = files.find(f => f.status !== 'Approved / Closed' && f.status !== 'Rejected');

  if (q.includes('approval stage') || q.includes('current stage') || q.includes('workflow status')) {
    if (activeFile) {
      return `📋 Current Approval Stage for ${proj.name}:\n\n• File Reference: ${activeFile.id}\n• Current Custodian: ${activeFile.currentCustodian}\n• File Status: ${activeFile.status}\n• Last Updated: ${activeFile.lastUpdated}\n\nThe file is currently awaiting action at the ${activeFile.currentCustodian}'s desk.`;
    }
    const closedFile = files.find(f => f.status === 'Approved / Closed');
    if (closedFile) {
      return `✅ The project "${proj.name}" has been fully approved.\n\n• File Ref: ${closedFile.id}\n• Final Status: Approved / Closed\n• All workflow stages have been completed.`;
    }
    return `ℹ️ No active eOffice files found for project "${proj.name}". The project may be in the initiation phase.`;
  }

  if (q.includes('latest note') || q.includes('show note') || q.includes('note sheet')) {
    if (files.length > 0) {
      const latestFile = files[0];
      const latestNote = latestFile.notes[latestFile.notes.length - 1];
      if (latestNote) {
        return `📝 Latest Note for ${proj.name}:\n\n• File: ${latestFile.id}\n• Author: ${latestNote.writer}\n• Date: ${latestNote.date}\n• Content: "${latestNote.text}"`;
      }
    }
    return `ℹ️ No note sheets found for project "${proj.name}".`;
  }

  if (q.includes('summarize') || q.includes('summary') || q.includes('overview')) {
    return `📊 Project Summary: ${proj.name}\n\n• Project ID: ${proj.id}\n• Department: ${proj.department}\n• Zone: ${proj.zone}\n• Type: ${proj.projectType}\n• Status: ${proj.status}\n• Progress: ${proj.progress}%\n• Budget: Rs. ${(proj.budget / 10000000).toFixed(2)} Cr\n• Spent: Rs. ${(proj.spent / 10000000).toFixed(2)} Cr\n• Start Date: ${proj.startDate}\n• End Date: ${proj.endDate}\n• Officer in Charge: ${proj.officerInCharge}\n\n${proj.description}`;
  }

  if (q.includes('pending approval') || q.includes('pending')) {
    const pending = files.filter(f => f.status !== 'Approved / Closed' && f.status !== 'Rejected');
    if (pending.length > 0) {
      const list = pending.map(f => `• ${f.id}: "${f.subject}" — Pending with ${f.currentCustodian}`).join('\n');
      return `⏳ Pending Approvals for ${proj.name}:\n\n${list}`;
    }
    return `✅ No pending approvals for project "${proj.name}". All files are either approved or not yet initiated.`;
  }

  if (q.includes('document') || q.includes('related doc') || q.includes('attachment') || q.includes('file')) {
    const allDocs: string[] = [];
    docs.forEach(d => allDocs.push(`• [${d.category}] ${d.name} (v${d.version}, ${d.size})`));
    files.forEach(f => allDocs.push(`• [eOffice Note] ${f.subject} (${f.id})`));
    workOrders.forEach(w => allDocs.push(`• [Work Order] ${w.title} (${w.id})`));
    bills.forEach(b => allDocs.push(`• [Invoice] ${b.vendor} - Rs. ${(b.amount / 100000).toFixed(1)}L (${b.id})`));
    if (allDocs.length > 0) {
      return `📁 Related Documents for ${proj.name}:\n\n${allDocs.join('\n')}\n\nTotal: ${allDocs.length} documents found.`;
    }
    return `ℹ️ No documents found for project "${proj.name}".`;
  }

  if (q.includes('who') || q.includes('handling') || q.includes('officer') || q.includes('assigned')) {
    let resp = `👤 Project Personnel for ${proj.name}:\n\n• Officer in Charge: ${proj.officerInCharge}\n• Department: ${proj.department}\n• Zone: ${proj.zone}`;
    if (activeFile) {
      resp += `\n• Current File Custodian: ${activeFile.currentCustodian}`;
    }
    const team = PROJECT_TEAMS[proj.id] || [];
    if (team.length > 0) {
      resp += `\n\nTeam Members:\n` + team.map(t => `• ${t.name} (${t.role}) - ${t.department}`).join('\n');
    }
    return resp;
  }

  if (q.includes('budget') || q.includes('financial') || q.includes('cost') || q.includes('spent')) {
    const utilization = proj.budget > 0 ? ((proj.spent / proj.budget) * 100).toFixed(1) : '0';
    return `💰 Financial Summary for ${proj.name}:\n\n• Total Budget: Rs. ${(proj.budget / 10000000).toFixed(2)} Cr\n• Amount Spent: Rs. ${(proj.spent / 10000000).toFixed(2)} Cr\n• Remaining: Rs. ${((proj.budget - proj.spent) / 10000000).toFixed(2)} Cr\n• Utilization: ${utilization}%`;
  }

  return `I can help you with information about the project "${proj.name}". Try asking about:\n\n• Current approval stage\n• Latest notes\n• Project summary\n• Pending approvals\n• Related documents\n• Who is handling this project\n• Budget and financial status`;
}
// ------------------------------------------
// 10F. TAB: INVOICES & BILLS (PROJECT-SPECIFIC)
// ------------------------------------------
function renderProjectInvoicesAndBills(container: HTMLElement, proj: Project) {
  const invoices = state.bills.filter(b => b.projectId === proj.id);
  const user = state.currentUser;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Invoice Claims Ledger</h3>
          <p class="text-[10px] text-slate-500 mt-1">Review bill submittals and release disbursements</p>
        </div>
        ${user?.role === 'Vendor' ? `
          <button onclick="state.activeProjectModule='vendor'; renderMainContent();" class="bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-semibold transition-all cursor-pointer">
            Create Bill Claim
          </button>
        ` : ''}
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
              <th class="py-3 px-1">Bill Ref</th>
              <th class="py-3 px-1">Work Order</th>
              <th class="py-3 px-1">Vendor Contractor</th>
              <th class="py-3 px-1">Sanction Value</th>
              <th class="py-3 px-1">Budget Code</th>
              <th class="py-3 px-1">Status</th>
              <th class="py-3 px-1 text-right">Clearance Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${invoices.map(bill => {
              let btnHtml = '—';
              if (bill.status === 'Pending Budget Allocation' && user?.role === 'Finance Officer') {
                btnHtml = `<button onclick="allocateBudget('${bill.id}')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer">Map Account</button>`;
              } else if (bill.status === 'Pending Approval' && user?.role === 'Finance Officer') {
                btnHtml = `<button onclick="clearBillPayment('${bill.id}')" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer">Pay Bill</button>`;
              }

              const statusBadge = bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : bill.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700';

              return `
                <tr>
                  <td class="py-3.5 px-1 font-mono font-bold text-slate-900">${bill.id}</td>
                  <td class="py-3.5 px-1 text-slate-500">${bill.woId}</td>
                  <td class="py-3.5 px-1 font-medium">${bill.vendor}</td>
                  <td class="py-3.5 px-1 font-bold">Rs. ${(bill.amount / 100000).toFixed(1)} L</td>
                  <td class="py-3.5 px-1 font-mono text-[10px] text-slate-500">${bill.headOfAccount || '<span class="text-rose-500 font-bold uppercase text-[9px]">Not Mapped</span>'}</td>
                  <td class="py-3.5 px-1">
                    <span class="px-2 py-0.5 rounded-full text-[9px] font-semibold ${statusBadge}">${bill.status}</span>
                  </td>
                  <td class="py-3.5 px-1 text-right">${btnHtml}</td>
                </tr>
              `;
            }).join('')}
            ${invoices.length === 0 ? '<tr><td colspan="7" class="py-6 text-center text-slate-450 font-medium italic">No invoice claims submitted for this project.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ------------------------------------------
// 10G. TAB: APPROVALS
let selectedApprovalFileId = '';

function renderProjectApprovals(container: HTMLElement, proj: Project) {
  const user = state.currentUser;
  if (!user) return;

  const projectFiles = state.eOfficeFiles.filter(f => f.projectId === proj.id);
  
  // Calculate statistics
  const totalApprovals = projectFiles.length;
  const approvedApprovals = projectFiles.filter(f => f.status === 'Approved / Closed').length;
  const rejectedApprovals = projectFiles.filter(f => f.status === 'Rejected').length;
  const returnedApprovals = projectFiles.filter(f => f.status === 'Returned').length;
  const pendingApprovals = projectFiles.filter(f => f.status !== 'Approved / Closed' && f.status !== 'Rejected' && f.status !== 'Returned').length;

  // Filter pending approvals that are with the current user's role
  const files = projectFiles.filter(f => f.currentCustodian === user.role && f.status !== 'Approved / Closed' && f.status !== 'Rejected');

  // Finance Officer bills
  const pendingBills = (user.role === 'Finance Officer') 
    ? state.bills.filter(b => b.projectId === proj.id && b.status !== 'Paid')
    : [];

  // Default selection if empty
  if (!selectedApprovalFileId && projectFiles.length > 0) {
    selectedApprovalFileId = projectFiles[0].id;
  }

  const selectedFileObj = projectFiles.find(f => f.id === selectedApprovalFileId);

  container.innerHTML = `
    <!-- Top Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Files</span>
        <span class="text-lg font-extrabold text-slate-900 mt-2 font-mono">${totalApprovals}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Approved / Signed</span>
        <span class="text-lg font-extrabold text-emerald-600 mt-2 font-mono">${approvedApprovals}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Rejected</span>
        <span class="text-lg font-extrabold text-rose-600 mt-2 font-mono">${rejectedApprovals}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pending Sanction</span>
        <span class="text-lg font-extrabold text-amber-600 mt-2 font-mono">${pendingApprovals}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Returned for Correction</span>
        <span class="text-lg font-extrabold text-[#2563EB] mt-2 font-mono">${returnedApprovals}</span>
      </div>
    </div>

    <!-- Active Custodian Note -->
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 flex justify-between items-center">
      <div>
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Logged In Role Permission</span>
        <p class="text-xs text-slate-800 font-bold mt-0.5">${user.name} (<span class="text-[#2563EB]">${user.roleText}</span>)</p>
      </div>
      <span class="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100 text-[9px] font-bold uppercase tracking-wider">
        Operational Node Access
      </span>
    </div>

    <!-- Grid split layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Actionable approvals + Files list (Col 2) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Actionable items -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Pending My Approvals (${files.length + pendingBills.length})</h4>
          
          ${files.length === 0 && pendingBills.length === 0 ? `
            <div class="p-8 text-center text-xs text-slate-450 bg-slate-50/50 border border-dashed border-slate-200 rounded-md font-semibold">
              No files currently pending for ${user.roleText} signature.
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${files.map(f => {
                const priorityBadge = f.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-100 text-slate-650 border-slate-200';
                return `
                  <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all cursor-pointer ${selectedApprovalFileId === f.id ? 'ring-2 ring-[#2563EB]' : ''}" onclick="selectApprovalFile('${f.id}')">
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-[9px] font-mono font-bold text-slate-400">File No: ${f.id}</span>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${priorityBadge}">${f.priority}</span>
                      </div>
                      <h5 class="text-xs font-bold text-slate-900 truncate" title="${f.subject}">${f.subject}</h5>
                      <p class="text-[10px] text-slate-500 line-clamp-2 italic">"${f.notes[f.notes.length - 1]?.text || 'No remarks.'}"</p>
                    </div>
                    <div class="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
                      <button onclick="event.stopPropagation(); viewApprovalFile('${f.id}')" class="bg-white hover:bg-slate-50 text-slate-700 text-[9px] font-bold uppercase px-2 py-1 rounded border border-slate-200 cursor-pointer">Note Sheet</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${f.id}', 'Approve')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Approve</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${f.id}', 'Reject')" class="bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Reject</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${f.id}', 'Return')" class="bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Return</button>
                    </div>
                  </div>
                `;
              }).join('')}

              ${pendingBills.map(b => {
                const actionBtn = b.status === 'Pending Budget Allocation'
                  ? `<select onchange="allocateBudgetApproval('${b.id}', this.value)" class="text-[9px] font-bold border border-slate-200 bg-white p-1 rounded outline-none cursor-pointer">
                       <option value="">Map Head...</option>
                       ${state.headOfAccounts.map(ac => `<option value="${ac.code}">${ac.code}</option>`).join('')}
                     </select>`
                  : `<button onclick="clearBillPaymentApproval('${b.id}')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold px-2.5 py-1 rounded transition-colors cursor-pointer uppercase tracking-wider">Pay / Clear</button>`;

                return `
                  <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all">
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-[9px] font-mono font-bold text-slate-400">Bill ID: ${b.id}</span>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-100 text-slate-650 border border-slate-200">${b.status}</span>
                      </div>
                      <h5 class="text-xs font-bold text-slate-900">Claim for Work Order: ${b.woId}</h5>
                      <div class="text-[10px] text-slate-500 font-semibold space-y-0.5">
                        <div class="flex justify-between"><span>Vendor:</span> <span class="text-slate-800">${b.vendor}</span></div>
                        <div class="flex justify-between"><span>Claim Value:</span> <span class="text-slate-950 font-bold">Rs. ${(b.amount / 100000).toFixed(1)} L</span></div>
                        <div class="flex justify-between"><span>Head Code:</span> <span class="font-mono">${b.headOfAccount || '<span class="text-rose-500">Unmapped</span>'}</span></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                      <span class="text-[9px] font-bold text-slate-400 uppercase">Settlement</span>
                      ${actionBtn}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <!-- All Project Files Directory -->
        <div class="bg-white border border-slate-200 rounded-md p-5 space-y-4">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">All Project Approval Files (${projectFiles.length})</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="py-2.5 px-3">File ID</th>
                  <th class="py-2.5 px-3">Subject / Document Type</th>
                  <th class="py-2.5 px-3">Current Custodian</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-semibold text-slate-700">
                ${projectFiles.map(f => {
                  let badgeColor = 'bg-slate-150 text-slate-700';
                  if (f.status === 'Approved / Closed') badgeColor = 'bg-emerald-50 text-emerald-700';
                  else if (f.status === 'Rejected') badgeColor = 'bg-rose-50 text-rose-700';
                  else if (f.status === 'Returned') badgeColor = 'bg-amber-50 text-amber-700';
                  else if (f.status === 'Approved & Forwarded') badgeColor = 'bg-blue-50 text-blue-700';

                  return `
                    <tr class="hover:bg-slate-50/50 cursor-pointer ${selectedApprovalFileId === f.id ? 'bg-[#EEF4FF]/30' : ''}" onclick="selectApprovalFile('${f.id}')">
                      <td class="py-3 px-3 font-mono font-bold text-slate-900">${f.id}</td>
                      <td class="py-3 px-3 truncate max-w-xs font-medium text-slate-800" title="${f.subject}">${f.subject}</td>
                      <td class="py-3 px-3 text-slate-655">${f.currentCustodian}</td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${badgeColor}">${f.status}</span>
                      </td>
                      <td class="py-3 px-3 text-right">
                        <button onclick="event.stopPropagation(); viewApprovalFile('${f.id}')" class="text-[#2563EB] hover:text-[#1D4ED8] text-[10px] font-bold cursor-pointer">View Details</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Selected File Approval History (Col 1) -->
      <div class="space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-5 space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Approval History</h4>
            <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">${selectedFileObj ? selectedFileObj.id : 'No file selected'}</p>
          </div>

          ${!selectedFileObj ? `
            <div class="text-center text-xs text-slate-400 py-8">Select an approval file card to view its timeline history.</div>
          ` : `
            <div class="space-y-4">
              <!-- Header Details -->
              <div class="bg-slate-50 p-3 rounded text-[10px] font-semibold text-slate-600 space-y-1 border border-slate-100">
                <div class="flex justify-between"><span>Initiated By:</span> <span class="text-slate-900 font-bold">Sri V. Kumar</span></div>
                <div class="flex justify-between"><span>Current Custodian:</span> <span class="text-slate-900 font-bold">${selectedFileObj.currentCustodian}</span></div>
                <div class="flex justify-between"><span>Priority Status:</span> <span class="text-slate-900 font-bold">${selectedFileObj.priority}</span></div>
                <div class="flex justify-between"><span>Category Type:</span> <span class="text-slate-900 font-bold">eOffice Note Sheet</span></div>
              </div>

              <!-- Timeline stepper -->
              <div class="relative pl-5 space-y-4 pt-2">
                <!-- Vertical Line -->
                <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-150"></div>

                ${selectedFileObj.notes.map((n, idx) => `
                  <div class="relative pl-3 text-xs space-y-1">
                    <span class="absolute -left-[15px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
                    <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">${n.date}</div>
                    <div class="font-bold text-slate-800">${n.writer}</div>
                    <p class="text-slate-500 font-medium italic">"${n.text}"</p>
                  </div>
                `).join('')}
                
                ${selectedFileObj.status !== 'Approved / Closed' && selectedFileObj.status !== 'Rejected' ? `
                  <div class="relative pl-3 text-xs space-y-1">
                    <span class="absolute -left-[15px] top-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-4 ring-amber-50"></span>
                    <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">Pending</div>
                    <div class="font-bold text-slate-800">Awaiting Signature</div>
                    <p class="text-slate-500 font-medium italic">Pending with ${selectedFileObj.currentCustodian}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          `}
        </div>
      </div>
    </div>

    <!-- Quick Action Modal -->
    <div id="approval-action-modal" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-55 flex items-center justify-center p-4">
      <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-md w-full overflow-hidden animate-toast-slide-in">
        <div class="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider" id="action-modal-title">Sign Note Sheet</h4>
          <button onclick="closeActionModal()" class="text-slate-400 hover:text-slate-650 text-sm font-bold cursor-pointer">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-wider block" id="action-remarks-label">Signature Remarks</label>
            <textarea id="action-remarks-textarea" class="w-full min-h-[90px] p-3 text-xs border border-slate-250 rounded font-mono text-slate-800 focus:outline-none focus:border-[#2563EB]" placeholder="Type official signature remarks here..."></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button onclick="closeActionModal()" class="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded border border-slate-200 cursor-pointer">Cancel</button>
            <button id="submit-action-btn" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer">Submit Signature</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Register selectApprovalFile globally
  (window as any).selectApprovalFile = (fileId: string) => {
    selectedApprovalFileId = fileId;
    renderProjectApprovals(container, proj);
  };

  // Define window methods for actions
  (window as any).viewApprovalFile = (fileId: string) => {
    const file = state.eOfficeFiles.find(f => f.id === fileId);
    if (file) {
      showDocumentPreviewModal({
        id: file.id,
        name: file.id + '_Notes.pdf',
        type: 'pdf',
        uploadedBy: file.notes[0]?.writer || 'Draft',
        uploadedDate: file.notes[0]?.date || file.lastUpdated,
        version: 'v1.0',
        status: file.status,
        size: '1.2 MB',
        category: 'Administrative Sanctions'
      });
      // Customize the preview modal left pane to show the green note sheet
      const previewModal = document.getElementById('document-preview-modal');
      if (previewModal) {
        const leftPanel = previewModal.querySelector('.flex-1');
        if (leftPanel) {
          leftPanel.innerHTML = `
            <div class="flex-1 bg-emerald-50/15 p-6 overflow-y-auto border-r border-slate-200 font-mono text-[11px] text-emerald-950 leading-relaxed max-h-full">
              <div class="text-center border-b border-emerald-900/20 pb-4 mb-4">
                <div class="font-bold text-xs text-emerald-900">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
                <div class="text-[9px] text-emerald-800/80 uppercase font-semibold">eOffice green Note Sheet Ledger</div>
                <div class="text-[9px] text-emerald-800/60 font-mono mt-1">File Ref: ${file.id} | Department: ${file.department}</div>
              </div>
              <div class="space-y-4">
                ${file.notes.map((n, idx) => `
                  <div class="pl-8 relative border-l border-emerald-900/10">
                    <span class="absolute left-0 top-0 text-[10px] font-bold text-emerald-900/30">#${idx + 1}</span>
                    <p class="font-mono text-emerald-900 leading-relaxed">${n.text}</p>
                    <div class="text-right mt-2 text-[9px] font-bold uppercase tracking-wider text-emerald-800/60 font-mono">
                      Signed: ${n.writer} | ${n.date}
                    </div>
                  </div>
                `).join('<div class="border-b border-dashed border-emerald-900/10 my-3"></div>')}
              </div>
            </div>
          `;
        }
      }
    }
  };

  let pendingActionFileId = '';
  let pendingActionType: 'Approve' | 'Reject' | 'Return' = 'Approve';

  (window as any).actionApprovalFile = (fileId: string, type: 'Approve' | 'Reject' | 'Return') => {
    pendingActionFileId = fileId;
    pendingActionType = type;
    
    const modal = document.getElementById('approval-action-modal');
    const title = document.getElementById('action-modal-title');
    const remarksLabel = document.getElementById('action-remarks-label');
    const textarea = document.getElementById('action-remarks-textarea') as HTMLTextAreaElement;
    const submitBtn = document.getElementById('submit-action-btn');

    if (modal && title && remarksLabel && textarea && submitBtn) {
      textarea.value = '';
      if (type === 'Approve') {
        title.textContent = 'Sign & Approve File';
        remarksLabel.textContent = 'Approval Remarks (Optional)';
        textarea.placeholder = 'e.g. Recommended for administrative sanction. Approved.';
        submitBtn.className = 'bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer';
      } else if (type === 'Reject') {
        title.textContent = 'Reject File';
        remarksLabel.textContent = 'Reason for Rejection (Required)';
        textarea.placeholder = 'Please state clearly the reason for rejecting this file...';
        submitBtn.className = 'bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer';
      } else {
        title.textContent = 'Return File with Remarks';
        remarksLabel.textContent = 'Remarks for Return (Required)';
        textarea.placeholder = 'Please explain what clarifications are needed...';
        submitBtn.className = 'bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer';
      }
      modal.classList.remove('hidden');
    }
  };

  (window as any).closeActionModal = () => {
    const modal = document.getElementById('approval-action-modal');
    if (modal) modal.classList.add('hidden');
  };

  (window as any).allocateBudgetApproval = (billId: string, headCode: string) => {
    if (!headCode) return;
    (window as any).allocateBudget(billId, headCode);
    renderProjectApprovals(container, proj);
  };

  (window as any).clearBillPaymentApproval = (billId: string) => {
    (window as any).clearBillPayment(billId);
    renderProjectApprovals(container, proj);
  };

  const submitBtn = document.getElementById('submit-action-btn');
  submitBtn?.replaceWith(submitBtn.cloneNode(true)); // remove previous listeners
  const newSubmitBtn = document.getElementById('submit-action-btn');
  newSubmitBtn?.addEventListener('click', () => {
    const textarea = document.getElementById('action-remarks-textarea') as HTMLTextAreaElement;
    const remarks = textarea.value.trim();

    if ((pendingActionType === 'Reject' || pendingActionType === 'Return') && !remarks) {
      showToast('Please enter remarks/reasons before submitting.');
      return;
    }

    const file = state.eOfficeFiles.find(f => f.id === pendingActionFileId);
    if (file && user) {
      const now = new Date();
      const dateStr = now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 5);
      
      const noteWriter = `${user.role} (${user.name})`;
      
      if (pendingActionType === 'Approve') {
        const idx = FILE_MOVEMENT_PIPELINE.indexOf(file.currentCustodian);
        const nextCustodian = idx < FILE_MOVEMENT_PIPELINE.length - 1 ? FILE_MOVEMENT_PIPELINE[idx + 1] : 'Approved / Closed';
        
        file.notes.push({
          writer: noteWriter,
          text: remarks || 'Approved & Forwarded.',
          date: dateStr
        });

        file.currentCustodian = nextCustodian;
        if (nextCustodian === 'Approved / Closed') {
          file.status = 'Approved / Closed';
          
          if (proj.status === 'Planning') {
            proj.status = 'In Progress';
          }
        } else {
          file.status = 'Approved & Forwarded';
        }
        
        logAudit(user.name, `Approved & Forwarded File ${file.id} to ${nextCustodian}`, 'Success');
        showToast(`File successfully approved and forwarded to ${nextCustodian}.`);
      } else if (pendingActionType === 'Reject') {
        file.notes.push({
          writer: noteWriter,
          text: 'REJECTED: ' + remarks,
          date: dateStr
        });
        file.status = 'Rejected';
        file.currentCustodian = 'Approved / Closed';
        
        logAudit(user.name, `Rejected File ${file.id}`, 'Success');
        showToast(`File ${file.id} has been marked as Rejected.`);
      } else {
        // Return
        const idx = FILE_MOVEMENT_PIPELINE.indexOf(file.currentCustodian);
        const prevCustodian = idx > 0 ? FILE_MOVEMENT_PIPELINE[idx - 1] : 'Senior Assistant';
        
        file.notes.push({
          writer: noteWriter,
          text: 'RETURNED WITH REMARKS: ' + remarks,
          date: dateStr
        });
        
        file.currentCustodian = prevCustodian;
        file.status = 'Returned';

        logAudit(user.name, `Returned File ${file.id} to ${prevCustodian}`, 'Success');
        showToast(`File returned to ${prevCustodian}.`);
      }

      file.lastUpdated = now.toISOString().substring(0, 10);
      (window as any).closeActionModal();
      renderSidebar();
      renderMainContent();
    }
  });
}

// ------------------------------------------
// 10H. TAB: TIMELINE / ACTIVITY
// ------------------------------------------
function renderProjectTimeline(container: HTMLElement, proj: Project) {
  const events = PROJECT_TIMELINES[proj.id] || [];

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 max-w-3xl">
      <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Activity Timeline</h3>
      
      <div class="relative pl-6 space-y-6">
        <!-- Line -->
        <div class="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-150"></div>

        ${events.map(event => `
          <div class="flex gap-4 items-start relative z-10 animate-toast-slide-in">
            <!-- Bullet -->
            <div class="w-5.5 h-5.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            </div>
            
            <div class="space-y-1">
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">${event.date} ${event.time}</div>
              <p class="text-xs text-slate-800 font-semibold">${event.activity}</p>
              <div class="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Actor: ${event.actor}</div>
            </div>
          </div>
        `).join('')}

        ${events.length === 0 ? '<div class="text-center text-xs text-slate-450 font-semibold p-8">No activities logged in registry.</div>' : ''}
      </div>
    </div>
  `;
}

// ------------------------------------------
// 10I. TAB: TEAM MEMBERS
// ------------------------------------------
function renderProjectTeamMembers(container: HTMLElement, proj: Project) {
  const members = PROJECT_TEAMS[proj.id] || [];

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6">
      <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Project Workspace Team Directory</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        ${members.map(m => `
          <div class="p-4 border border-slate-100 bg-slate-50/20 hover:bg-slate-50/50 rounded-md flex items-center gap-3 transition-colors">
            <!-- Avatar -->
            <div class="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
              ${m.avatarText}
            </div>
            <div class="truncate">
              <span class="text-xs font-bold text-slate-900 block truncate">${m.name}</span>
              <span class="text-[9px] font-bold text-slate-450 uppercase tracking-wider block mt-0.5 truncate">${m.role}</span>
              <span class="text-[9px] text-slate-400 font-medium block truncate">${m.department}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ==========================================
// 11. SECURITY AUDITING & NOTIFICATION UTILS
// ==========================================
function logAudit(user: string, action: string, status: 'Success' | 'Failed') {
  const ipAddresses = ['10.2.40.12', '10.2.80.3', '10.2.5.91', '10.2.14.8'];
  const randomIp = ipAddresses[Math.floor(Math.random() * ipAddresses.length)];
  
  const now = new Date();
  const dateStr = now.toISOString().substring(0, 10);
  const timeStr = now.toTimeString().substring(0, 5);

  state.auditLogs.unshift({
    id: `AUD-${Math.floor(Math.random() * 9000) + 1000}`,
    user,
    action,
    date: dateStr,
    time: timeStr,
    ip: randomIp,
    status
  });
}

function showToast(text: string) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 border border-slate-850 text-white text-xs px-4 py-3 rounded-md shadow-lg animate-toast-slide-in flex items-center justify-between gap-4 max-w-sm';
  toast.innerHTML = `
    <span>${text}</span>
    <button class="text-slate-400 hover:text-white font-bold cursor-pointer" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4500);
}

function renderNotificationsBadge() {
  const badge = document.getElementById('navbar-bell-badge');
  if (!badge) return;

  const unreadCount = state.notifications.filter(n => !n.read).length;
  if (unreadCount > 0) {
    badge.textContent = String(unreadCount);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function renderNotificationDrawer() {
  const body = document.getElementById('notification-drawer-body');
  if (!body) return;

  if (state.notifications.length === 0) {
    body.innerHTML = '<div class="p-6 text-center text-xs text-slate-400">No notifications</div>';
    return;
  }

  body.innerHTML = state.notifications.map((n, idx) => `
    <div class="py-3 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors ${n.read ? 'opacity-60' : ''}" data-index="${idx}">
      <div class="flex justify-between items-center text-[10px] font-bold text-slate-900">
        <span>${n.title}</span>
        <span class="text-slate-400 font-medium">${n.time}</span>
      </div>
      <div class="text-[11px] text-slate-500 leading-normal">${n.text}</div>
    </div>
  `).join('');

  const items = body.querySelectorAll('[data-index]');
  items.forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index') || '0', 10);
      state.notifications[idx].read = true;
      renderNotificationsBadge();
      renderNotificationDrawer();
    });
  });
}

// ==========================================
// 12. GLOBAL PORTAL DASHBOARDS & CORE MODULES
// ==========================================

function renderLandingDashboard() {
  const container = document.getElementById('landing-dashboard-view');
  if (!container) return;

  const user = state.currentUser;
  if (!user) return;

  const totalProjects = state.projects.length;
  const activeProjects = state.projects.filter(p => p.status === 'In Progress').length;
  const pendingFilesCount = state.eOfficeFiles.filter(f => f.currentCustodian === user.role).length;
  
  const totalAllocated = state.projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = state.projects.reduce((acc, p) => acc + p.spent, 0);
  const totalAllocatedCr = (totalAllocated / 10000000).toFixed(2);
  const totalSpentCr = (totalSpent / 10000000).toFixed(2);

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Welcome back, ${user.name}</h3>
      <p class="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">${user.roleText} — GHMC Unified Administration Portal</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Monitored Projects</span>
        <span class="text-2xl font-bold text-slate-900">${totalProjects}</span>
        <span class="text-[9px] text-emerald-600 font-bold block mt-1">● ${activeProjects} In Progress</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">eOffice Files In Basket</span>
        <span class="text-2xl font-bold text-slate-900">${pendingFilesCount}</span>
        <span class="text-[9px] text-amber-600 font-bold block mt-1">Requires immediate sign-off</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Budget Sanctions</span>
        <span class="text-2xl font-bold text-slate-900">Rs. ${totalAllocatedCr} Cr</span>
        <span class="text-[9px] text-slate-500 font-semibold block mt-1">Across all zones</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Disbursed Expenditures</span>
        <span class="text-2xl font-bold text-slate-900">Rs. ${totalSpentCr} Cr</span>
        <span class="text-[9px] text-slate-500 font-semibold block mt-1">Capped at ${(totalSpent / totalAllocated * 100).toFixed(0)}% utilization</span>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6 xl:col-span-2 space-y-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Pending eOffice Inbox</h4>
          <a class="text-[10px] font-bold text-indigo-650 hover:underline cursor-pointer" onclick="switchToView('projects-list');">View Full eOffice Desk</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                <th class="py-2 px-1">File Ref</th>
                <th class="py-2 px-1">Subject</th>
                <th class="py-2 px-1">Priority</th>
                <th class="py-2 px-1">Last Action Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${state.eOfficeFiles
                .filter(f => f.currentCustodian === user.role)
                .map(f => {
                  const priorityClass = f.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-650';
                  return `
                    <tr class="hover:bg-slate-50/50 cursor-pointer" onclick="openGlobalFile('${f.id}')">
                      <td class="py-3 px-1 font-mono font-bold text-slate-900">${f.id}</td>
                      <td class="py-3 px-1 font-medium truncate max-w-xs" title="${f.subject}">${f.subject}</td>
                      <td class="py-3 px-1">
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${priorityClass}">${f.priority}</span>
                      </td>
                      <td class="py-3 px-1 font-mono text-[10px] text-slate-550">${f.lastUpdated}</td>
                    </tr>
                  `;
                }).join('')}
              ${state.eOfficeFiles.filter(f => f.currentCustodian === user.role).length === 0 ? '<tr><td colspan="4" class="py-6 text-center text-slate-400 italic font-semibold">No files pending your attention.</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between">
        <div>
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Capital Outlay Chart</h4>
          <div class="w-full h-48 relative flex items-center justify-center">
            <canvas id="dashboard-budget-canvas"></canvas>
          </div>
        </div>
        <div class="text-[10px] text-slate-400 font-semibold mt-4 text-center">
          Chart shows distributed budget allocation vs spent across active projects.
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const ctx = document.getElementById('dashboard-budget-canvas') as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: state.projects.map(p => p.id),
        datasets: [{
          data: state.projects.map(p => p.budget),
          backgroundColor: [
            '#0f172a',
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }, 100);
}

(window as any).openGlobalFile = (fileId: string) => {
  const file = state.eOfficeFiles.find(f => f.id === fileId);
  if (!file) return;
  const proj = state.projects.find(p => p.id === file.projectId);
  if (proj) {
    switchToProjectWorkspace(proj);
    state.activeProjectModule = 'eoffice';
    selectedFileId = fileId;
    renderSidebar();
    renderMainContent();
  }
};

function renderEOfficeModule(container: HTMLElement) {
  const isWorkspace = state.activeView === 'project-workspace' && state.activeProject;
  const projectFilterText = isWorkspace ? `for Project: ${state.activeProject!.id}` : 'Global Desk';
  
  const files = isWorkspace 
    ? state.eOfficeFiles.filter(f => f.projectId === state.activeProject!.id)
    : state.eOfficeFiles;

  if (selectedFileId && !files.find(f => f.id === selectedFileId)) {
    selectedFileId = null;
  }
  if (!selectedFileId && files.length > 0) {
    selectedFileId = files[0].id;
  }

  const selectedFile = files.find(f => f.id === selectedFileId);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">eOffice Inbox</h3>
          <p class="text-[9px] text-slate-550 mt-0.5 uppercase tracking-wider font-semibold">${projectFilterText}</p>
        </div>

        <div class="space-y-3">
          ${files.map(f => {
            const activeClass = selectedFileId === f.id ? 'border-slate-800 bg-slate-50/50' : 'border-slate-100 bg-slate-50/10 hover:border-slate-250';
            const priorityClass = f.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-650';
            return `
              <div onclick="selectFile('${f.id}')" class="p-4 border rounded-md cursor-pointer transition-all ${activeClass}">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-[9px] font-mono font-bold text-slate-800">${f.id}</span>
                  <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${priorityClass}">${f.priority}</span>
                </div>
                <h4 class="text-[11px] font-bold text-slate-900 leading-snug truncate" title="${f.subject}">${f.subject}</h4>
                <div class="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                  <span>Custodian: ${f.currentCustodian.split(' ')[0]}</span>
                  <span>${f.lastUpdated}</span>
                </div>
              </div>
            `;
          }).join('')}
          ${files.length === 0 ? '<div class="text-center text-xs text-slate-400 italic p-6 font-semibold">No files in this folder.</div>' : ''}
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        ${selectedFile ? `
          <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
            <div class="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">${selectedFile.id}</span>
                <h3 class="text-xs font-bold text-slate-900 leading-snug mt-1">${selectedFile.subject}</h3>
                <p class="text-[9px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Division: ${selectedFile.department}</p>
              </div>
              <div class="text-right">
                <span class="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Custodian</span>
                <span class="bg-slate-105 text-slate-900 px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border border-slate-200">${selectedFile.currentCustodian}</span>
              </div>
            </div>

            <div>
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Green Note Sheet Ledger</div>
              <div class="green-note-sheet rounded-md p-6 border text-[11px] text-emerald-950 space-y-6">
                ${selectedFile.notes.map((n, idx) => `
                  <div class="pl-8 relative">
                    <span class="absolute left-0 top-0 text-[10px] font-bold text-emerald-900/30">#${idx + 1}</span>
                    <p class="font-mono text-emerald-900 leading-relaxed">${n.text}</p>
                    <div class="text-right mt-2 text-[9px] font-bold uppercase tracking-wider text-emerald-800/60 font-mono">
                      Signed: ${n.writer} | ${n.date}
                    </div>
                  </div>
                  <div class="border-b border-dashed border-emerald-900/10 my-4 last:hidden"></div>
                `).join('')}

                ${selectedFile.currentCustodian === state.currentUser?.role ? `
                  <div class="border-t border-dashed border-emerald-900/20 pt-4 space-y-3">
                    <div class="text-[10px] font-bold text-emerald-900 uppercase tracking-widest">Append Signature Remark</div>
                    <textarea id="note-remark-textarea" class="w-full min-h-[70px] p-3 text-xs bg-emerald-50/20 border border-emerald-900/20 rounded font-mono text-emerald-900 placeholder-emerald-900/40 focus:outline-none focus:border-emerald-900/40" placeholder="Type official note sheet remarks here..."></textarea>
                    
                    <div class="flex justify-end gap-2 pt-2">
                      <button onclick="approveAndForwardFile()" class="bg-emerald-850 hover:bg-emerald-900 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer">
                        Sign & Forward
                      </button>
                    </div>
                  </div>
                ` : `
                  <div class="text-center text-[10px] text-emerald-800/50 font-bold uppercase tracking-widest border-t border-dashed border-emerald-900/20 pt-4">
                    Locked — You are not the current custodian of this file
                  </div>
                `}
              </div>
            </div>

            <div class="space-y-3">
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Attachments (${selectedFile.attachments.length})</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${selectedFile.attachments.map(att => `
                  <div class="p-3 border border-slate-100 hover:border-slate-200 bg-slate-50/30 rounded flex items-center justify-between text-xs transition-all">
                    <span class="font-bold text-slate-700 truncate" title="${att}">${att}</span>
                    <button onclick="showToast('Downloading file: ${att}')" class="text-indigo-650 hover:text-indigo-855 font-bold uppercase text-[9px] tracking-wider cursor-pointer">
                      Download
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        ` : `
          <div class="bg-white border border-slate-200 rounded-md p-12 text-center text-xs text-slate-400 font-semibold">
            Select a file reference from the list to view notes and action history.
          </div>
        `}
      </div>
    </div>
  `;

  (window as any).selectFile = (fileId: string) => {
    selectedFileId = fileId;
    renderEOfficeModule(container);
  };

  (window as any).approveAndForwardFile = () => {
    const textarea = document.getElementById('note-remark-textarea') as HTMLTextAreaElement;
    if (!textarea || !textarea.value.trim()) {
      showToast('Please type a signature remark first.');
      return;
    }

    if (selectedFile) {
      const idx = FILE_MOVEMENT_PIPELINE.indexOf(selectedFile.currentCustodian);
      const nextCustodian = idx < FILE_MOVEMENT_PIPELINE.length - 1 ? FILE_MOVEMENT_PIPELINE[idx + 1] : 'Approved / Closed';
      
      const now = new Date();
      const dateStr = now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 5);

      selectedFile.notes.push({
        writer: `${state.currentUser!.role} (${state.currentUser!.name})`,
        text: textarea.value.trim(),
        date: dateStr
      });

      selectedFile.currentCustodian = nextCustodian;
      if (nextCustodian === 'Approved / Closed') {
        selectedFile.status = 'Approved / Closed';
      } else {
        selectedFile.status = 'Forwarded';
      }
      
      logAudit(state.currentUser!.name, `Forwarded File ${selectedFile.id} to ${nextCustodian}`, 'Success');
      showToast(`File forwarded successfully to: ${nextCustodian}`);
      
      selectedFileId = selectedFile.id;
      renderSidebar();
      renderMainContent();
    }
  };
}

function renderWorkOrdersModule(container: HTMLElement) {
  const isWorkspace = state.activeView === 'project-workspace' && state.activeProject;
  const projectFilterText = isWorkspace ? `for Project: ${state.activeProject!.id}` : 'Global Registry';

  const workorders = isWorkspace
    ? state.workOrders.filter(w => w.projectId === state.activeProject!.id)
    : state.workOrders;

  if (selectedWoId && !workorders.find(w => w.id === selectedWoId)) {
    selectedWoId = null;
  }
  if (!selectedWoId && workorders.length > 0) {
    selectedWoId = workorders[0].id;
  }

  const selectedWo = workorders.find(w => w.id === selectedWoId);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Work Orders</h3>
          <p class="text-[9px] text-slate-550 mt-0.5 uppercase tracking-wider font-semibold">${projectFilterText}</p>
        </div>

        <div class="space-y-3">
          ${workorders.map(w => {
            const activeClass = selectedWoId === w.id ? 'border-slate-800 bg-slate-50/50' : 'border-slate-100 bg-slate-50/10 hover:border-slate-250';
            return `
              <div onclick="selectWorkOrder('${w.id}')" class="p-4 border rounded-md cursor-pointer transition-all ${activeClass}">
                <span class="text-[9px] font-mono font-bold text-slate-800 block mb-1">${w.id}</span>
                <h4 class="text-[11px] font-bold text-slate-900 leading-snug truncate" title="${w.title}">${w.title}</h4>
                <div class="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                  <span class="truncate max-w-[100px]">${w.vendor}</span>
                  <span>Rs. ${(w.amount / 100000).toFixed(1)} L</span>
                </div>
              </div>
            `;
          }).join('')}
          ${workorders.length === 0 ? '<div class="text-center text-xs text-slate-400 italic p-6 font-semibold">No work orders cataloged.</div>' : ''}
        </div>
      </div>

      <div class="lg:col-span-2">
        ${selectedWo ? `
          <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
            <div class="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">${selectedWo.id}</span>
                <h3 class="text-xs font-bold text-slate-900 leading-snug mt-1">${selectedWo.title}</h3>
                <p class="text-[9px] text-slate-505 font-semibold uppercase tracking-wider mt-1">Vendor: ${selectedWo.vendor}</p>
              </div>
              <div class="text-right">
                <span class="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Value</span>
                <span class="text-slate-900 font-bold text-sm">Rs. ${(selectedWo.amount / 10000000).toFixed(2)} Cr</span>
              </div>
            </div>

            <div>
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Milestone Pipeline</div>
              <div class="flex items-center justify-between gap-2 overflow-x-auto pb-4">
                ${WORK_ORDER_STAGES.map((stage, idx) => {
                  const date = selectedWo.stageHistory[stage];
                  const isCurrent = selectedWo.currentStage === stage;
                  const isCleared = !!date;

                  let bulletStyle = 'border-slate-200 text-slate-350 bg-white';
                  if (isCurrent) {
                    bulletStyle = 'border-slate-900 text-white bg-slate-900 font-bold';
                  } else if (isCleared) {
                    bulletStyle = 'border-slate-900 text-slate-900 bg-white font-bold';
                  }

                  return `
                    <div class="flex flex-col items-center min-w-[70px] text-center space-y-1">
                      <div class="w-6 h-6 rounded-full border flex items-center justify-center text-[9px] ${bulletStyle}">
                        ${isCleared ? '✓' : idx + 1}
                      </div>
                      <span class="text-[8px] font-bold text-slate-800 block truncate max-w-[80px]">${stage}</span>
                      <span class="text-[8px] font-mono text-slate-405 block">${date ? date.substring(5) : '—'}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="space-y-3">
              <div class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Execution Logs</div>
              <div class="space-y-2 max-h-32 overflow-y-auto pr-1">
                ${selectedWo.updates.map(up => `
                  <div class="p-3 border border-slate-100 bg-slate-50/10 rounded-md text-[11px] flex justify-between gap-4 font-semibold text-slate-705">
                    <span>${up.text}</span>
                    <span class="font-mono text-[9px] text-slate-400 shrink-0">${up.date}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            ${state.currentUser?.role === 'Vendor' && selectedWo.currentStage === 'Vendor Execution' ? `
              <div class="border-t border-slate-100 pt-4 space-y-3">
                <div class="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Submit Invoice Payment Claim</div>
                <div class="flex gap-4">
                  <div class="flex-1">
                    <label class="text-[9px] font-bold text-slate-450 uppercase tracking-wider block mb-1">Claim Amount (Rs. Lakhs)</label>
                    <input type="number" id="claim-amount-input" class="w-full p-2 border border-slate-200 rounded text-xs" placeholder="e.g. 35.0">
                  </div>
                  <div class="flex-1 self-end">
                    <button onclick="submitClaim('${selectedWo.id}')" class="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-2 rounded font-semibold transition-all cursor-pointer">
                      Submit Claim
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
        ` : `
          <div class="bg-white border border-slate-200 rounded-md p-12 text-center text-xs text-slate-400 font-semibold">
            Select a work order from the list to view timeline details.
          </div>
        `}
      </div>
    </div>
  `;

  (window as any).selectWorkOrder = (woId: string) => {
    selectedWoId = woId;
    renderWorkOrdersModule(container);
  };

  (window as any).submitClaim = (woId: string) => {
    const amountInput = document.getElementById('claim-amount-input') as HTMLInputElement;
    if (!amountInput || !amountInput.value) {
      showToast('Please type in a valid claim amount.');
      return;
    }

    const valueLakhs = parseFloat(amountInput.value);
    if (isNaN(valueLakhs) || valueLakhs <= 0) {
      showToast('Please enter a valid positive number.');
      return;
    }

    const targetWo = state.workOrders.find(w => w.id === woId);
    if (targetWo) {
      const now = new Date();
      const dateStr = now.toISOString().substring(0, 10);
      
      const newBill: Bill = {
        id: `BILL-${Math.floor(Math.random() * 900) + 100}`,
        projectId: targetWo.projectId,
        woId: targetWo.id,
        vendor: targetWo.vendor,
        amount: valueLakhs * 100000,
        headOfAccount: '',
        status: 'Pending Budget Allocation',
        date: dateStr
      };

      state.bills.push(newBill);
      targetWo.currentStage = 'Invoice';
      targetWo.stageHistory['Invoice'] = dateStr;
      targetWo.updates.push({
        date: dateStr,
        text: `Submitted invoice claim of Rs. ${valueLakhs.toFixed(1)} Lakhs`
      });

      logAudit(state.currentUser!.name, `Submitted Invoice Claim for Work Order: ${targetWo.id}`, 'Success');
      showToast(`Invoice claim ${newBill.id} submitted for verification.`);
      
      renderSidebar();
      renderMainContent();
    }
  };
}

function renderFinanceModule(container: HTMLElement) {
  const user = state.currentUser;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Budget Head of Accounts Allocation</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                <th class="py-2.5 px-1">Account Head Code</th>
                <th class="py-2.5 px-1">Description</th>
                <th class="py-2.5 px-1">Sanction Allocation</th>
                <th class="py-2.5 px-1">Utilized Expenditure</th>
                <th class="py-2.5 px-1 text-right">Balance Available</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${state.headOfAccounts.map(ac => `
                <tr>
                  <td class="py-3.5 px-1 font-mono font-bold text-slate-900">${ac.code}</td>
                  <td class="py-3.5 px-1 font-medium">${ac.description}</td>
                  <td class="py-3.5 px-1 font-bold">Rs. ${(ac.allocation / 10000000).toFixed(2)} Cr</td>
                  <td class="py-3.5 px-1 text-slate-500">Rs. ${(ac.spent / 10000000).toFixed(2)} Cr</td>
                  <td class="py-3.5 px-1 font-bold text-right text-indigo-755">Rs. ${(ac.balance / 10000000).toFixed(2)} Cr</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">ERP Billing Claims & Inward Invoices</h3>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                <th class="py-2.5 px-1">Bill Reference</th>
                <th class="py-2.5 px-1">Work Reference</th>
                <th class="py-2.5 px-1">Contractor Vendor</th>
                <th class="py-2.5 px-1">Claim Value</th>
                <th class="py-2.5 px-1">Head of Account</th>
                <th class="py-2.5 px-1">Status</th>
                <th class="py-2.5 px-1 text-right">Clearance Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${state.bills.map(b => {
                let actionBtn = '—';
                const statusBadge = b.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : b.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700';

                if (b.status === 'Pending Budget Allocation' && user?.role === 'Finance Officer') {
                  actionBtn = `
                    <select onchange="allocateBudget('${b.id}', this.value)" class="text-[10px] font-bold border border-slate-200 bg-white p-1 rounded outline-none cursor-pointer">
                      <option value="">Map Head...</option>
                      ${state.headOfAccounts.map(ac => `<option value="${ac.code}">${ac.code}</option>`).join('')}
                    </select>
                  `;
                } else if (b.status === 'Pending Approval' && user?.role === 'Finance Officer') {
                  actionBtn = `
                    <button onclick="clearBillPayment('${b.id}')" class="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded transition-colors cursor-pointer">
                      Pay / Clear
                    </button>
                  `;
                }

                return `
                  <tr>
                    <td class="py-3.5 px-1 font-mono font-bold text-slate-900">${b.id}</td>
                    <td class="py-3.5 px-1 font-semibold text-slate-500">${b.woId}</td>
                    <td class="py-3.5 px-1 font-medium">${b.vendor}</td>
                    <td class="py-3.5 px-1 font-bold">Rs. ${(b.amount / 100000).toFixed(1)} L</td>
                    <td class="py-3.5 px-1 font-mono text-[10px] text-slate-600">${b.headOfAccount || '<span class="text-rose-500 font-bold uppercase text-[9px]">Unmapped</span>'}</td>
                    <td class="py-3.5 px-1">
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${statusBadge}">${b.status}</span>
                    </td>
                    <td class="py-3.5 px-1 text-right">${actionBtn}</td>
                  </tr>
                `;
              }).join('')}
              ${state.bills.length === 0 ? '<tr><td colspan="7" class="py-6 text-center text-slate-400 italic font-semibold">No bill claims logged.</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  (window as any).allocateBudget = (billId: string, headCode: string) => {
    if (!headCode) return;
    const targetBill = state.bills.find(b => b.id === billId);
    const targetAccount = state.headOfAccounts.find(ac => ac.code === headCode);
    
    if (targetBill && targetAccount) {
      if (targetAccount.balance < targetBill.amount) {
        showToast('Insufficient balance under this Head of Account.');
        return;
      }

      targetBill.headOfAccount = headCode;
      targetBill.status = 'Pending Approval';
      
      logAudit(state.currentUser!.name, `Mapped Head of Account ${headCode} to Bill Claim ${billId}`, 'Success');
      showToast(`Bill ${billId} successfully mapped to Head: ${headCode}`);
      
      renderMainContent();
    }
  };

  (window as any).clearBillPayment = (billId: string) => {
    const targetBill = state.bills.find(b => b.id === billId);
    if (targetBill) {
      const targetAccount = state.headOfAccounts.find(ac => ac.code === targetBill.headOfAccount);
      if (targetAccount) {
        targetAccount.spent += targetBill.amount;
        targetAccount.balance -= targetBill.amount;
      }

      targetBill.status = 'Paid';

      const targetWo = state.workOrders.find(w => w.id === targetBill.woId);
      if (targetWo) {
        const now = new Date();
        const dateStr = now.toISOString().substring(0, 10);
        targetWo.currentStage = 'Payment Released';
        targetWo.stageHistory['Payment Released'] = dateStr;
        targetWo.updates.push({
          date: dateStr,
          text: `Payment cleared of Rs. ${(targetBill.amount / 100000).toFixed(1)} Lakhs`
        });
      }

      logAudit(state.currentUser!.name, `Cleared payment release for Bill Claim ${billId}`, 'Success');
      showToast(`Payment successfully released to contractor for Claim: ${billId}`);
      
      renderSidebar();
      renderMainContent();
    }
  };
}

function renderAuditLogsModule(container: HTMLElement) {
  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Security Auditing Ledger</h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">Real-time immutable administrative trail and access signature registers</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
              <th class="py-2.5 px-1">Log ID</th>
              <th class="py-2.5 px-1">Officer User</th>
              <th class="py-2.5 px-1">Action Description</th>
              <th class="py-2.5 px-1">IP Address</th>
              <th class="py-2.5 px-1">Date Time stamp</th>
              <th class="py-2.5 px-1 text-right">Transaction Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${state.auditLogs.map(log => {
              const statusClass = log.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700';
              return `
                <tr>
                  <td class="py-3.5 px-1 font-mono font-bold text-slate-900">${log.id}</td>
                  <td class="py-3.5 px-1 font-semibold">${log.user}</td>
                  <td class="py-3.5 px-1 font-medium text-slate-655">${log.action}</td>
                  <td class="py-3.5 px-1 font-mono text-[10px] text-slate-500">${log.ip}</td>
                  <td class="py-3.5 px-1 font-mono text-[10px] text-slate-500">${log.date} ${log.time}</td>
                  <td class="py-3.5 px-1 text-right">
                    <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${statusClass}">${log.status}</span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderReportsModule(container: HTMLElement) {
  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Capital vs Utilization Allocation</h4>
        <div class="h-64 relative flex items-center justify-center">
          <canvas id="reports-budget-bar-canvas"></canvas>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Project Construction Progress</h4>
        <div class="h-64 relative flex items-center justify-center">
          <canvas id="reports-progress-line-canvas"></canvas>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const barCtx = document.getElementById('reports-budget-bar-canvas') as HTMLCanvasElement;
    const lineCtx = document.getElementById('reports-progress-line-canvas') as HTMLCanvasElement;

    if (barCtx) {
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: state.projects.map(p => p.id),
          datasets: [
            {
              label: 'Budget Sanction (Rs. Cr)',
              data: state.projects.map(p => p.budget / 10000000),
              backgroundColor: '#0f172a'
            },
            {
              label: 'Expenditure Disbursed (Rs. Cr)',
              data: state.projects.map(p => p.spent / 10000000),
              backgroundColor: '#3b82f6'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                boxWidth: 12,
                font: { size: 10, family: 'Inter' }
              }
            }
          },
          scales: {
            y: {
              ticks: { font: { size: 9, family: 'Inter' } }
            },
            x: {
              ticks: { font: { size: 9, family: 'Inter' } }
            }
          }
        }
      });
    }

    if (lineCtx) {
      new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: state.projects.map(p => p.id),
          datasets: [{
            label: 'Completion Progress %',
            data: state.projects.map(p => p.progress),
            borderColor: '#10b981',
            backgroundColor: '#10b98122',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                boxWidth: 12,
                font: { size: 10, family: 'Inter' }
              }
            }
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { font: { size: 9, family: 'Inter' } }
            },
            x: {
              ticks: { font: { size: 9, family: 'Inter' } }
            }
          }
        }
      });
    }
  }, 100);
}

// ==========================================
// 13. GLOBAL MODULES VIEW IMPLEMENTATIONS
// ==========================================

let globalTasksSearchQuery = '';

function renderGlobalTasksView() {
  // Merged into Status module
}

let selectedGlobalApprovalFileId = '';
let isEditingApprovalNote = false;
let selectedApprovalVersion = 'latest';
let compareApprovalVersion1 = '';
let compareApprovalVersion2 = '';
let isComparingApprovalVersions = false;

function ensureFileWorkflowFields(file: eOfficeFile) {
  if (!file.noteNumber) {
    file.noteNumber = `NOTE-2026-${file.id.split('-').pop()}`;
  }
  const proj = state.projects.find(p => p.id === file.projectId);
  if (!file.projectName) {
    file.projectName = proj ? proj.name : 'Zone-3 Infrastructure Works';
  }
  if (!file.zone) {
    file.zone = proj ? proj.zone : 'Zone-3 (Secunderabad)';
  }
  if (!file.creatorRole) {
    file.creatorRole = 'Senior Assistant';
  }
  if (!file.creatorName) {
    file.creatorName = 'Sri V. Kumar';
  }
  if (!file.createdDate) {
    file.createdDate = '2026-06-25';
  }
  if (!file.createdTime) {
    file.createdTime = '10:30';
  }
  if (!file.estimatedBudget) {
    file.estimatedBudget = proj ? proj.budget : 12000000;
  }
  if (!file.budgetHead) {
    file.budgetHead = '4120-ENG-CAP-Z3';
  }
  if (!file.description) {
    file.description = file.notes[0]?.text || file.subject;
  }
  if (!file.purpose) {
    file.purpose = 'Administrative approval and financial sanction for public infrastructure enhancements.';
  }
  if (!file.background) {
    file.background = 'This proposal has been initiated to address urgent utility and roadway demands based on local ward representations.';
  }
  if (!file.justification) {
    file.justification = 'Required to prevent seasonal overflow, traffic blockages, and ensure regulatory alignment.';
  }
  if (!file.benefits) {
    file.benefits = 'Will benefit over 2.5 Lakh daily commuters and local residents.';
  }
  if (!file.additionalConditions) {
    file.additionalConditions = 'Standard quality standards must be followed during execution.';
  }

  // Initialize versions
  if (!file.versions || file.versions.length === 0) {
    file.versions = [
      {
        version: 'v1.0',
        modifiedBy: file.creatorName,
        modifiedRole: file.creatorRole,
        modifiedDate: file.createdDate,
        modifiedTime: file.createdTime,
        subject: file.subject,
        projectName: file.projectName,
        description: file.description,
        purpose: file.purpose,
        background: file.background,
        estimatedBudget: file.estimatedBudget,
        budgetHead: file.budgetHead,
        justification: file.justification,
        benefits: file.benefits,
        priority: file.priority,
        remarks: file.notes[0]?.text || '',
        additionalConditions: file.additionalConditions
      }
    ];
  }

  // Initialize workflowStatus
  if (!file.workflowStatus) {
    const workflowStatus: any = {
      'Senior Assistant': 'Approved',
      'Assistant Engineer': 'Waiting',
      'Deputy Executive Engineer': 'Waiting',
      'Executive Engineer': 'Waiting',
      'Superintending Engineer': 'Waiting',
      'Joint Commissioner': 'Waiting',
      'Additional Commissioner': 'Waiting',
      'Commissioner': 'Waiting'
    };

    if (file.status === 'Approved / Closed') {
      Object.keys(workflowStatus).forEach(k => {
        workflowStatus[k] = 'Approved';
      });
    } else if (file.status === 'Rejected') {
      Object.keys(workflowStatus).forEach(k => {
        workflowStatus[k] = 'Rejected';
      });
    } else {
      const currentIdx = FILE_MOVEMENT_PIPELINE.indexOf(file.currentCustodian);
      if (currentIdx !== -1) {
        for (let i = 0; i < currentIdx; i++) {
          workflowStatus[FILE_MOVEMENT_PIPELINE[i]] = 'Approved';
        }
        workflowStatus[file.currentCustodian] = file.status === 'Returned' ? 'Returned' : 'Pending';
      }
    }
    file.workflowStatus = workflowStatus;
  }

  // Initialize approvalHistory
  if (!file.approvalHistory || file.approvalHistory.length === 0) {
    file.approvalHistory = file.notes.map((note, idx) => {
      let role = 'Officer';
      let name = note.writer;
      if (note.writer.includes('(')) {
        const parts = note.writer.split(' (');
        role = parts[0];
        name = parts[1].replace(')', '');
      } else if (note.writer.includes(' JC') || note.writer.includes('COMMISSIONER') || note.writer.includes('ADDL. COMMR')) {
        if (note.writer.includes('COMMISSIONER')) {
          role = 'Commissioner';
          name = 'Sri R V Karnan, IAS';
        } else if (note.writer.includes('ADDL. COMMR')) {
          role = 'Additional Commissioner';
          name = 'Sri Manda Makarandu, IAS';
        } else {
          role = 'Joint Commissioner';
          name = 'C Radha';
        }
      }
      return {
        officerName: name,
        role: role,
        department: file.department,
        action: idx === 0 ? 'Created Initial Note' : 'Approved & Forwarded',
        remarks: note.text,
        dateTime: note.date,
        status: 'Approved',
        versionNumber: 'v1.0'
      };
    });
  }

  // Initialize auditLogs
  if (!file.auditLogs || file.auditLogs.length === 0) {
    file.auditLogs = file.approvalHistory.map((hist, idx) => ({
      user: hist.officerName,
      role: hist.role,
      date: hist.dateTime.split(' ')[0],
      time: hist.dateTime.split(' ')[1] || '12:00',
      ip: `10.2.14.${50 + idx}`,
      action: hist.action,
      previousValue: idx === 0 ? 'N/A' : 'Pending Review',
      newValue: 'Approved'
    }));
  }
}

function syncFileWithEOfficeNote(file: eOfficeFile) {
  const note = state.eOfficeNotes.find(n => 
    n.fileNumber === file.id || 
    n.id === file.id ||
    n.id.replace('NOTE', 'FILE') === file.id || 
    file.id.replace('FILE', 'NOTE') === n.id
  );
  if (note) {
    note.status = file.status as any;
    note.currentCustodian = file.currentCustodian;
    note.subject = file.subject;
    note.projectName = file.projectName || note.projectName;
    note.description = file.description || note.description;
    note.purpose = file.purpose || note.purpose;
    note.background = file.background || note.background;
    note.estimatedBudget = file.estimatedBudget || note.estimatedBudget;
    note.budgetHead = file.budgetHead || note.budgetHead;
    note.justification = file.justification || note.justification;
    note.benefits = file.benefits || note.benefits;
    note.additionalConditions = file.additionalConditions || note.additionalConditions;
    note.versions = file.versions || note.versions;
    note.approvalHistory = file.approvalHistory || note.approvalHistory;
    note.auditLogs = file.auditLogs || note.auditLogs;
    note.workflowStatus = file.workflowStatus || note.workflowStatus;
    note.attachments = file.attachments || note.attachments;
  }
}

function getNextVersionNumber(current: string, role: string): string {
  const currentNum = parseFloat(current.replace('v', ''));
  if (role === 'Joint Commissioner' || role === 'Additional Commissioner') {
    return `v${Math.floor(currentNum + 1)}.0`;
  } else {
    return `v${(currentNum + 0.1).toFixed(1)}`;
  }
}

function getNextCustodianInPipeline(current: string): string {
  const idx = FILE_MOVEMENT_PIPELINE.indexOf(current);
  if (idx === -1) return 'Approved / Closed';
  return idx < FILE_MOVEMENT_PIPELINE.length - 1 ? FILE_MOVEMENT_PIPELINE[idx + 1] : 'Approved / Closed';
}

function getPrevCustodianInPipeline(current: string): string {
  const idx = FILE_MOVEMENT_PIPELINE.indexOf(current);
  if (idx <= 0) return 'Senior Assistant';
  return FILE_MOVEMENT_PIPELINE[idx - 1];
}

function renderGlobalStatusView() {
  const container = document.getElementById('status-view-container');
  const user = state.currentUser;
  if (!container || !user) return;

  const projectFiles = state.eOfficeFiles;

  // Enrich all files dynamically so they have Note sheet properties
  projectFiles.forEach(f => {
    ensureFileWorkflowFields(f);
    syncFileWithEOfficeNote(f);
  });

  // Filter files based on active status tab
  let filteredFiles: eOfficeFile[] = [];
  if (activeStatusTab === 'pending') {
    filteredFiles = projectFiles.filter(f => 
      f.currentCustodian === user.role && 
      f.status !== 'Approved / Closed' && 
      f.status !== 'Rejected'
    );
  } else if (activeStatusTab === 'approved') {
    filteredFiles = projectFiles.filter(f => 
      f.approvalHistory && 
      f.approvalHistory.some(hist => 
        hist.role === user.role && 
        (hist.action.includes('Approved') || hist.action.includes('Forwarded'))
      )
    );
  } else if (activeStatusTab === 'rejected') {
    filteredFiles = projectFiles.filter(f => 
      f.approvalHistory && 
      f.approvalHistory.some(hist => 
        hist.role === user.role && 
        hist.action.includes('Rejected')
      )
    );
  }

  // Finance Officer bills - only pending bills shown in pending tab
  const pendingBills = (activeStatusTab === 'pending' && (user.role === 'Finance Officer' || user.role === 'Commissioner' || user.role === 'Administrator')) 
    ? state.bills.filter(b => b.status === 'Pending Budget Allocation' || b.status === 'Pending Approval')
    : [];

  // Default selection if empty or not in filtered files
  if (filteredFiles.length > 0) {
    if (!selectedGlobalApprovalFileId || !filteredFiles.some(f => f.id === selectedGlobalApprovalFileId)) {
      selectedGlobalApprovalFileId = filteredFiles[0].id;
    }
  } else {
    selectedGlobalApprovalFileId = '';
  }

  const selectedFileObj = projectFiles.find(f => f.id === selectedGlobalApprovalFileId);

  let rightPanelHtml = '';
  if (selectedFileObj) {
    let displayVerObj = selectedFileObj.versions?.[selectedFileObj.versions.length - 1];
    if (selectedApprovalVersion !== 'latest') {
      displayVerObj = selectedFileObj.versions?.find(v => v.version === selectedApprovalVersion) || displayVerObj;
    }

    const versionOptions = selectedFileObj.versions?.map(v => 
      `<option value="${v.version}" ${selectedApprovalVersion === v.version ? 'selected' : ''}>Version ${v.version.replace('v', '')} - ${v.modifiedRole}</option>`
    ).join('') || '';

    const stepperHtml = `
      <div class="border border-slate-200 rounded p-4 bg-slate-50/50 space-y-3 font-semibold text-[11px] select-none">
        <div class="text-[9px] font-bold uppercase text-slate-450 tracking-wider">Approval Stage Tracker</div>
        <div class="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          ${FILE_MOVEMENT_PIPELINE.map(role => {
            const stepStatus = (selectedFileObj.workflowStatus as any)?.[role] || 'Waiting';
            let badgeClass = 'bg-slate-105 text-slate-400 border-slate-205';
            let text = 'Waiting';
            if (stepStatus === 'Approved') {
              badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              text = 'Approved';
            } else if (stepStatus === 'Rejected') {
              badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
              text = 'Rejected';
            } else if (stepStatus === 'Returned') {
              badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
              text = 'Returned';
            } else if (stepStatus === 'Pending') {
              badgeClass = 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse';
              text = 'Pending';
            }
            return `
              <div class="flex flex-col items-center justify-center p-2 rounded bg-white border border-slate-200 text-center space-y-1">
                <span class="font-bold text-[9px] text-slate-700 truncate w-full" title="${role}">${role.replace(' Engineer', '').replace(' Assistant', '')}</span>
                <span class="px-1 py-0.5 rounded text-[7px] font-extrabold uppercase border ${badgeClass}">${text}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const remarksHistoryHtml = selectedFileObj.approvalHistory?.map((hist, idx) => `
      <div class="border-l-2 border-emerald-900/15 pl-4 py-1 relative">
        <span class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white"></span>
        <div class="flex justify-between text-[9px] font-mono text-emerald-800/60 uppercase font-bold">
          <span>${hist.officerName} (${hist.role})</span>
          <span class="text-slate-400 font-semibold">${hist.dateTime}</span>
        </div>
        <p class="text-xs text-slate-800 italic mt-1 leading-normal font-sans font-semibold">"${hist.remarks || 'No remarks.'}"</p>
        <div class="mt-1 flex justify-between items-center text-[9px] text-emerald-800/50 font-mono font-bold">
          <span>Action: ${hist.action}</span>
          <span class="bg-emerald-50 px-1 rounded border border-emerald-100">Ver: ${hist.versionNumber}</span>
        </div>
      </div>
    `).join('<div class="border-b border-dashed border-emerald-900/5 my-2"></div>') || '';

    let comparisonHtml = '';
    if (isComparingApprovalVersions) {
      const verA = selectedFileObj.versions?.find(v => v.version === compareApprovalVersion1);
      const verB = selectedFileObj.versions?.find(v => v.version === compareApprovalVersion2);
      if (verA && verB) {
        comparisonHtml = `
          <div class="grid grid-cols-2 gap-4 border border-dashed border-slate-300 p-3 bg-slate-50/50 rounded mt-2">
            <div class="space-y-2 border-r border-slate-200 pr-2">
              <div class="text-[10px] font-bold text-slate-450 uppercase font-mono">Version ${verA.version.replace('v','')} (${verA.modifiedRole})</div>
              <div class="text-[10px] text-slate-800"><strong>Subject:</strong> ${verA.subject}</div>
              <div class="text-[10px] text-slate-800 font-mono"><strong>Budget:</strong> Rs. ${(verA.estimatedBudget / 100000).toFixed(1)}L</div>
              <div class="text-[10px] text-slate-655 italic line-clamp-4"><strong>Description:</strong> ${verA.description}</div>
            </div>
            <div class="space-y-2">
              <div class="text-[10px] font-bold text-slate-455 uppercase font-mono">Version ${verB.version.replace('v','')} (${verB.modifiedRole})</div>
              <div class="text-[10px] text-slate-800"><strong>Subject:</strong> ${verA.subject !== verB.subject ? `<span class="bg-emerald-100 text-emerald-900">${verB.subject}</span>` : verB.subject}</div>
              <div class="text-[10px] text-slate-800 font-mono"><strong>Budget:</strong> ${verA.estimatedBudget !== verB.estimatedBudget ? `<span class="bg-emerald-100 text-emerald-900 font-bold">Rs. ${(verB.estimatedBudget / 100000).toFixed(1)}L</span>` : `Rs. ${(verB.estimatedBudget / 100000).toFixed(1)}L`}</div>
              <div class="text-[10px] text-slate-655 italic line-clamp-4"><strong>Description:</strong> ${verA.description !== verB.description ? `<span class="bg-emerald-100 text-emerald-900">${verB.description}</span>` : verB.description}</div>
            </div>
          </div>
        `;
      }
    }

    rightPanelHtml = `
      <div class="xl:col-span-1 bg-white border border-slate-200 rounded-md p-6 space-y-6 overflow-y-auto max-h-[85vh] shadow-xs">
        
        <!-- Header Details -->
        <div class="border-b border-slate-150 pb-4 space-y-3">
          <div class="flex justify-between items-start gap-2">
            <div>
              <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">eOffice File Reference</span>
              <h4 class="text-xs font-bold text-slate-900 font-mono">${selectedFileObj.id}</h4>
            </div>
            <span class="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${selectedFileObj.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-655 border-slate-200'}">${selectedFileObj.priority}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-700">
            <div><strong class="text-slate-450 uppercase text-[8px]">Note Number:</strong> <span class="font-mono text-slate-900 font-bold">${selectedFileObj.noteNumber}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Status:</strong> <span class="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${selectedFileObj.status === 'Approved / Closed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : selectedFileObj.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-100' : selectedFileObj.status === 'Returned' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}">${selectedFileObj.status}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Created By:</strong> <span class="font-semibold text-slate-800">${selectedFileObj.creatorName}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Created On:</strong> <span class="font-mono text-slate-800">${selectedFileObj.createdDate}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Department:</strong> <span class="font-semibold text-slate-800 truncate block">${selectedFileObj.department}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Custodian:</strong> <span class="font-semibold text-slate-800 truncate block">${selectedFileObj.currentCustodian}</span></div>
          </div>
        </div>

        <!-- Stage Stepper Timeline -->
        ${stepperHtml}

        <!-- Version Selection -->
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2 font-semibold">
            <span class="text-[9px] font-bold text-slate-455 uppercase tracking-wider">Note Sheet Version:</span>
            <select onchange="changeApprovalVersion(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 font-bold cursor-pointer outline-none font-semibold">
              <option value="latest" ${selectedApprovalVersion === 'latest' ? 'selected' : ''}>Latest Version</option>
              ${versionOptions}
            </select>
          </div>
          
          ${selectedFileObj.versions && selectedFileObj.versions.length > 1 ? `
            <button onclick="toggleCompareApprovalVersions()" class="text-[#2563EB] hover:text-[#1D4ED8] text-[9px] font-extrabold uppercase tracking-wider cursor-pointer font-bold">
              ${isComparingApprovalVersions ? 'Close Compare' : 'Compare Versions'}
            </button>
          ` : ''}
        </div>

        ${isComparingApprovalVersions ? `
          <div class="flex gap-2 items-center bg-slate-50 border border-slate-200 p-2 rounded">
            <span class="text-[9px] font-bold text-slate-450 uppercase font-mono">Compare</span>
            <select onchange="changeCompareVer1(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 outline-none cursor-pointer">
              ${selectedFileObj.versions?.map(v => `<option value="${v.version}" ${compareApprovalVersion1 === v.version ? 'selected' : ''}>Version ${v.version.replace('v','')}</option>`).join('')}
            </select>
            <span class="text-[9px] font-bold text-slate-450 uppercase font-mono">with</span>
            <select onchange="changeCompareVer2(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 outline-none cursor-pointer">
              ${selectedFileObj.versions?.map(v => `<option value="${v.version}" ${compareApprovalVersion2 === v.version ? 'selected' : ''}>Version ${v.version.replace('v','')}</option>`).join('')}
            </select>
          </div>
          ${comparisonHtml}
        ` : ''}

        <!-- Main Workspace Body (View or Edit) -->
        ${isEditingApprovalNote ? `
          <!-- Editable Note Editor -->
          <div class="bg-slate-50 border border-slate-200 rounded p-6 space-y-4 font-semibold text-xs text-slate-800">
            <div class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-250 pb-2">Edit Note Sheet (New Version Draft)</div>
            
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Subject</label>
              <input type="text" id="edit-approval-subject" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none" value="${selectedFileObj.subject}">
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Project Name</label>
              <input type="text" id="edit-approval-projname" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none" value="${selectedFileObj.projectName || ''}">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-455 uppercase">Estimated Budget (Rs.)</label>
                <input type="number" id="edit-approval-budget" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none font-bold" value="${selectedFileObj.estimatedBudget || 0}">
              </div>
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-455 uppercase">Budget Head</label>
                <select id="edit-approval-budgethead" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none cursor-pointer">
                  ${state.headOfAccounts.map(h => `<option value="${h.code}" ${selectedFileObj.budgetHead === h.code ? 'selected' : ''}>${h.code} (Rs. ${(h.balance / 100000).toFixed(1)}L bal)</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-455 uppercase">1. Description & Context</label>
              <textarea id="edit-approval-description" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-24 whitespace-pre-wrap">${selectedFileObj.description || ''}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-455 uppercase">2. Purpose & Need</label>
              <textarea id="edit-approval-purpose" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${selectedFileObj.purpose || ''}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-455 uppercase">3. Background context</label>
              <textarea id="edit-approval-background" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${selectedFileObj.background || ''}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-455 uppercase">4. Justification & Benefits</label>
              <textarea id="edit-approval-justification" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${selectedFileObj.justification || ''}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-455 uppercase">5. Special Conditions/Remarks</label>
              <textarea id="edit-approval-conditions" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${selectedFileObj.additionalConditions || ''}</textarea>
            </div>

            <div class="space-y-2 border-t border-slate-200 pt-3">
              <label class="block text-[10px] text-slate-455 uppercase">Attached Supporting Documents</label>
              <div class="space-y-1.5">
                ${selectedFileObj.attachments.map(att => `
                  <div class="flex justify-between items-center bg-white border border-slate-200 px-2 py-1 rounded font-bold">
                    <span class="font-mono text-[10px]">${att}</span>
                    <button onclick="removeApprovalAttachment('${att}')" class="text-rose-650 hover:text-rose-800 text-[10px] font-bold cursor-pointer">Delete</button>
                  </div>
                `).join('')}
              </div>
              <div class="flex gap-2 mt-2">
                <input type="text" id="add-approval-attachment-name" class="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs outline-none" placeholder="Enter file name (e.g. Design_Draft_V2.pdf)">
                <button onclick="addApprovalAttachment()" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3 py-1 rounded text-[10px] font-bold cursor-pointer">Attach</button>
              </div>
            </div>

            <div class="flex justify-end gap-2 border-t border-slate-200 pt-4 font-bold">
              <button onclick="cancelApprovalEditNote()" class="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase font-bold rounded cursor-pointer">Cancel</button>
              <button onclick="saveApprovalEditNote()" class="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] uppercase font-bold rounded cursor-pointer">Save Draft</button>
            </div>
          </div>
        ` : `
          <!-- Green ledger note sheet -->
          ${displayVerObj ? `
            <div class="green-note-sheet p-6 rounded-md border border-emerald-200 bg-[#F4FAF4]/45 font-serif leading-relaxed text-emerald-950 text-xs">
              <div class="text-center border-b border-emerald-900/20 pb-4 mb-4 font-sans">
                <div class="font-bold text-sm text-emerald-900 tracking-wider">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
                <div class="text-[10px] text-emerald-800/80 uppercase font-bold tracking-wider">eOffice Green Note Sheet Ledger</div>
                <div class="text-[9px] text-emerald-855 font-mono mt-1">File Ref: ${selectedFileObj.id} | Note ID: ${selectedFileObj.noteNumber}</div>
              </div>

              <div class="space-y-4">
                <div><strong>Subject Matter:</strong> ${displayVerObj.subject}</div>
                <div><strong>Project Name:</strong> ${displayVerObj.projectName}</div>
                <div class="grid grid-cols-2 gap-4">
                  <div><strong>Estimated Budget:</strong> Rs. ${(displayVerObj.estimatedBudget / 100000).toFixed(1)} Lakhs</div>
                  <div><strong>Budget Head:</strong> ${displayVerObj.budgetHead}</div>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>1. Description & Context:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${displayVerObj.description}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>2. Purpose & Need:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${displayVerObj.purpose}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>3. Background context:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${displayVerObj.background}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>4. Justification & Benefits:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${displayVerObj.justification}</p>
                </div>
                ${displayVerObj.additionalConditions ? `
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>5. Special Conditions/Remarks:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${displayVerObj.additionalConditions}</p>
                </div>
                ` : ''}
              </div>

              <!-- Signed Remarks Timeline -->
              <div class="border-t border-emerald-900/25 mt-6 pt-4 font-sans space-y-4">
                <div class="text-[10px] font-bold text-emerald-900 uppercase tracking-wider mb-2">Chronological Official Remarks & Signature Stamps</div>
                ${remarksHistoryHtml}
              </div>
            </div>
          ` : ''}
        `}

        <!-- Attached Documents -->
        ${!isEditingApprovalNote ? `
          <div class="border border-slate-200 rounded p-4 bg-white space-y-3 font-semibold text-xs">
            <div class="text-[9px] font-bold uppercase text-slate-455 tracking-wider">Attached Correspondence & Reference Files</div>
            <div class="space-y-2 font-bold">
              ${selectedFileObj.attachments.map(att => `
                <div class="flex justify-between items-center border border-slate-150 p-2 rounded hover:bg-slate-50/55 cursor-pointer" onclick="viewAttachedDocument('${att}')">
                  <div class="flex items-center gap-2">
                    <span class="text-rose-650 text-[10px] font-extrabold font-mono">PDF</span>
                    <span class="text-slate-800 truncate max-w-[150px] font-sans text-[11px] font-semibold">${att}</span>
                  </div>
                  <span class="text-[9px] text-[#2563EB] uppercase hover:underline">View</span>
                </div>
              `).join('')}
              ${selectedFileObj.attachments.length === 0 ? '<div class="text-[11px] text-slate-400 italic font-semibold">No attachments uploaded.</div>' : ''}
            </div>
          </div>
        ` : ''}

        <!-- Actions Panel -->
        ${activeStatusTab === 'pending' && selectedFileObj.currentCustodian === user.role && selectedFileObj.status !== 'Approved / Closed' && selectedFileObj.status !== 'Rejected' ? `
          <div class="border border-slate-200 rounded p-6 bg-slate-50/50 space-y-4 font-semibold text-xs">
            <div class="text-[10px] font-bold text-slate-455 uppercase tracking-wider font-semibold">Mandatory Action Remarks</div>
            
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Official Remarks <span class="text-rose-600">*</span></label>
              <textarea id="workspace-remarks-textarea" class="w-full bg-white border border-slate-200 rounded p-2 text-xs outline-none h-20" placeholder="Please enter your official decision remarks here..."></textarea>
            </div>

            <div class="flex flex-wrap gap-2 border-t border-slate-200 pt-4 font-bold">
              ${user.role !== 'Commissioner' && user.role !== 'Vendor' && !isEditingApprovalNote ? `
                <button onclick="editApprovalNoteSheet()" class="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-teal-200">Edit Note</button>
              ` : ''}

              <button onclick="actionApprovalWorkspace('Keep Pending')" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-amber-200 font-bold">Keep Pending</button>

              ${user.role !== 'Senior Assistant' && user.role !== 'Vendor' ? `
                <button onclick="actionApprovalWorkspace('Return')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-blue-200 font-bold">Return for Correction</button>
              ` : ''}

              ${['Assistant Engineer', 'Executive Engineer', 'Additional Commissioner', 'Commissioner'].includes(user.role) ? `
                <button onclick="actionApprovalWorkspace('Reject')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-rose-200 font-bold">Reject</button>
              ` : ''}

              <button onclick="actionApprovalWorkspace('Forward')" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-indigo-200 font-bold">Forward to Next</button>

              ${user.role === 'Commissioner' ? `
                <button onclick="actionApprovalWorkspace('Approve')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all shadow-sm font-bold">Grant Sanction</button>
              ` : `
                <button onclick="actionApprovalWorkspace('Approve')" class="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all shadow-sm font-bold">Approve & Forward</button>
              `}
            </div>
          </div>
        ` : `
          <div class="border border-slate-100 rounded p-4 bg-slate-50/50 text-center text-[10px] text-slate-400 uppercase font-mono font-bold">
            ${selectedFileObj.status === 'Approved / Closed' ? '✔ Approved & Closed (Administrative Sanction Granted)' : selectedFileObj.status === 'Rejected' ? '✖ Rejected & Closed' : `✔ Currently Awaiting clearance at ${selectedFileObj.currentCustodian}'s desk`}
          </div>
        `}

      </div>
    `;
  } else {
    rightPanelHtml = `
      <div class="xl:col-span-1 bg-white border border-slate-200 rounded-md p-12 text-center text-xs text-slate-400 italic font-semibold">
        Select an active eOffice file to inspect its Status Workspace.
      </div>
    `;
  }

  container.innerHTML = `
    <!-- Main Workspace Split Pane -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start font-semibold">
      
      <!-- Left 2 Cols: Actionable Items list & Selection -->
      <div class="xl:col-span-2 space-y-6">
        
        <!-- Status Tabs -->
        <div class="flex border-b border-slate-200 bg-white rounded-md p-1 shadow-xs gap-2 select-none">
          <button onclick="changeStatusTab('pending')" class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeStatusTab === 'pending' ? 'border-[#2563EB] text-[#2563EB] border-b-2' : 'border-transparent text-slate-500 hover:text-slate-700'}">
            Pending at You
          </button>
          <button onclick="changeStatusTab('approved')" class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeStatusTab === 'approved' ? 'border-[#2563EB] text-[#2563EB] border-b-2' : 'border-transparent text-slate-500 hover:text-slate-700'}">
            Approved by You
          </button>
          <button onclick="changeStatusTab('rejected')" class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${activeStatusTab === 'rejected' ? 'border-[#2563EB] text-[#2563EB] border-b-2' : 'border-transparent text-slate-500 hover:text-slate-700'}">
            Rejected by You
          </button>
        </div>

        <!-- Files list -->
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider font-bold">
              ${activeStatusTab === 'pending' ? 'Awaiting My Signature' : activeStatusTab === 'approved' ? 'Approved by You' : 'Rejected by You'} (${filteredFiles.length})
            </h4>
            <p class="text-[9px] text-slate-455 mt-1 uppercase font-mono font-semibold">
              ${activeStatusTab === 'pending' ? 'eOffice official note sheets currently assigned to your desk' : activeStatusTab === 'approved' ? 'eOffice files approved or forwarded by you' : 'eOffice files rejected by you'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
            ${filteredFiles.map(f => {
              const priorityBadge = f.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-slate-100 text-slate-650 border-slate-200';
              const proj = state.projects.find(p => p.id === f.projectId);
              return `
                <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all cursor-pointer ${selectedGlobalApprovalFileId === f.id ? 'ring-2 ring-[#2563EB]' : ''}" onclick="selectGlobalApprovalFile('${f.id}')">
                  <div class="space-y-1">
                    <div class="flex justify-between items-start gap-2">
                      <span class="font-mono text-[10px] font-bold text-slate-900">${f.id}</span>
                      <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${priorityBadge}">${f.priority}</span>
                    </div>
                    <h5 class="text-xs font-bold text-slate-800 truncate">${f.subject}</h5>
                    <p class="text-[10px] text-slate-450 font-semibold truncate">${proj ? proj.name : 'Unknown Project'}</p>
                    <p class="text-[9px] text-slate-400 font-mono mt-2 font-medium">Forwarded: ${f.notes[f.notes.length - 1]?.date || f.lastUpdated}</p>
                  </div>

                  <div class="flex justify-end gap-1.5 mt-4 border-t border-slate-50 pt-3 font-bold">
                    <button onclick="event.stopPropagation(); selectGlobalApprovalFile('${f.id}')" class="px-2.5 py-1 bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-[9px] font-bold uppercase tracking-wider rounded cursor-pointer transition-all font-bold">Open Workspace</button>
                  </div>
                </div>
              `;
            }).join('')}
            ${filteredFiles.length === 0 ? `
              <div class="col-span-2 py-8 text-center text-xs text-slate-400 italic font-semibold">
                No eOffice file approvals in this category.
              </div>
            ` : ''}
          </div>
        </div>

        <!-- ERP Claims / Bills awaiting action -->
        ${activeStatusTab === 'pending' && (user.role === 'Finance Officer' || user.role === 'Commissioner' || user.role === 'Administrator') ? `
          <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4 font-bold">
            <div class="border-b border-slate-100 pb-3">
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">ERP Invoices & Bill Claims Awaiting Clearance</h4>
              <p class="text-[9px] text-slate-450 mt-1 uppercase font-mono">ERP financial payment vouchers and head mapping clearances</p>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-xs text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <th class="py-2 px-3">Bill ID</th>
                    <th class="py-2 px-3">Vendor / Contractor</th>
                    <th class="py-2 px-3">Amount</th>
                    <th class="py-2 px-3">Head mapping</th>
                    <th class="py-2 px-3">Status</th>
                    <th class="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-semibold font-bold">
                  ${pendingBills.map(bill => {
                    const statusBadge = bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : bill.status === 'Pending Approval' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700';
                    return `
                      <tr class="hover:bg-slate-50/50">
                        <td class="py-3 px-3 font-mono font-bold text-slate-800">${bill.id}</td>
                        <td class="py-3 px-3 text-slate-700 font-bold">${bill.vendor}</td>
                        <td class="py-3 px-3 font-mono text-slate-900">Rs. ${(bill.amount / 100000).toFixed(1)} Lakhs</td>
                        <td class="py-3 px-3 font-bold">
                          ${bill.status === 'Pending Budget Allocation' ? `
                            <select onchange="allocateBudgetApproval('${bill.id}', this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 cursor-pointer outline-none font-bold">
                              <option value="">-- Link Head --</option>
                              ${state.headOfAccounts.map(h => `<option value="${h.code}">${h.code} (${h.balance / 100000}L bal)</option>`).join('')}
                            </select>
                          ` : `<span class="font-mono text-slate-550 font-bold">${bill.headOfAccount || 'N/A'}</span>`}
                        </td>
                        <td class="py-3 px-3">
                          <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${statusBadge}">${bill.status}</span>
                        </td>
                        <td class="py-3 px-3 text-right font-bold">
                          ${bill.status === 'Pending Approval' ? `
                            <button onclick="clearBillPaymentApproval('${bill.id}')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded cursor-pointer font-bold">
                              Release Payment
                            </button>
                          ` : `<span class="text-[10px] text-slate-400 font-semibold">Awaiting Head Mapping</span>`}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                  ${pendingBills.length === 0 ? '<tr><td colspan="6" class="py-4 text-center text-slate-400 italic">No payment claims currently pending.</td></tr>' : ''}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Right 1 Col: Status Workspace -->
      ${rightPanelHtml}

    </div>
  `;

  // Register all global methods for window
  (window as any).selectGlobalApprovalFile = (fileId: string) => {
    selectedGlobalApprovalFileId = fileId;
    isEditingApprovalNote = false;
    isComparingApprovalVersions = false;
    selectedApprovalVersion = 'latest';
    renderGlobalStatusView();
  };

  (window as any).changeStatusTab = (tab: 'pending' | 'approved' | 'rejected') => {
    activeStatusTab = tab;
    selectedGlobalApprovalFileId = '';
    isEditingApprovalNote = false;
    isComparingApprovalVersions = false;
    selectedApprovalVersion = 'latest';
    renderGlobalStatusView();
  };

  (window as any).editApprovalNoteSheet = () => {
    isEditingApprovalNote = true;
    renderGlobalStatusView();
  };

  (window as any).cancelApprovalEditNote = () => {
    isEditingApprovalNote = false;
    renderGlobalStatusView();
  };

  (window as any).changeApprovalVersion = (ver: string) => {
    selectedApprovalVersion = ver;
    renderGlobalStatusView();
  };

  (window as any).toggleCompareApprovalVersions = () => {
    isComparingApprovalVersions = !isComparingApprovalVersions;
    if (isComparingApprovalVersions && selectedFileObj && selectedFileObj.versions) {
      compareApprovalVersion1 = selectedFileObj.versions[0]?.version || '';
      compareApprovalVersion2 = selectedFileObj.versions[selectedFileObj.versions.length - 1]?.version || '';
    }
    renderGlobalStatusView();
  };

  (window as any).changeCompareVer1 = (ver: string) => {
    compareApprovalVersion1 = ver;
    renderGlobalStatusView();
  };

  (window as any).changeCompareVer2 = (ver: string) => {
    compareApprovalVersion2 = ver;
    renderGlobalStatusView();
  };

  (window as any).viewAttachedDocument = (name: string) => {
    showToast(`Opening attached reference document: ${name}`);
  };

  (window as any).removeApprovalAttachment = (name: string) => {
    if (selectedFileObj) {
      selectedFileObj.attachments = selectedFileObj.attachments.filter(a => a !== name);
      renderGlobalStatusView();
    }
  };

  (window as any).addApprovalAttachment = () => {
    const input = document.getElementById('add-approval-attachment-name') as HTMLInputElement;
    const name = input?.value.trim();
    if (name && selectedFileObj) {
      if (!selectedFileObj.attachments.includes(name)) {
        selectedFileObj.attachments.push(name);
      }
      input.value = '';
      renderGlobalStatusView();
    }
  };

  (window as any).allocateBudgetApproval = (billId: string, headCode: string) => {
    if (!headCode) return;
    (window as any).allocateBudget(billId, headCode);
    renderGlobalStatusView();
  };

  (window as any).clearBillPaymentApproval = (billId: string) => {
    (window as any).clearBillPayment(billId);
    renderGlobalStatusView();
  };

  (window as any).saveApprovalEditNote = () => {
    if (!selectedFileObj) return;
    
    const subject = (document.getElementById('edit-approval-subject') as HTMLInputElement).value.trim();
    const projName = (document.getElementById('edit-approval-projname') as HTMLInputElement).value.trim();
    const budget = parseFloat((document.getElementById('edit-approval-budget') as HTMLInputElement).value);
    const budgetHead = (document.getElementById('edit-approval-budgethead') as HTMLSelectElement).value;
    const desc = (document.getElementById('edit-approval-description') as HTMLTextAreaElement).value.trim();
    const purpose = (document.getElementById('edit-approval-purpose') as HTMLTextAreaElement).value.trim();
    const background = (document.getElementById('edit-approval-background') as HTMLTextAreaElement).value.trim();
    const justification = (document.getElementById('edit-approval-justification') as HTMLTextAreaElement).value.trim();
    const benefits = (document.getElementById('edit-approval-benefits') as HTMLTextAreaElement).value.trim();
    const conditions = (document.getElementById('edit-approval-conditions') as HTMLTextAreaElement).value.trim();

    if (!subject || !projName || isNaN(budget) || !desc) {
      showToast('Subject, Project Name, Budget and Description are mandatory.');
      return;
    }

    const currentVerStr = selectedFileObj.versions?.[selectedFileObj.versions.length - 1]?.version || 'v1.0';
    const newVerStr = getNextVersionNumber(currentVerStr, user.role);

    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);
    const timeStr = now.toTimeString().substring(0, 5);

    const newVerObj: eOfficeNoteVersion = {
      version: newVerStr,
      modifiedBy: user.name,
      modifiedRole: user.role,
      modifiedDate: dateStr,
      modifiedTime: timeStr,
      subject: subject,
      projectName: projName,
      description: desc,
      purpose: purpose,
      background: background,
      estimatedBudget: budget,
      budgetHead: budgetHead,
      justification: justification,
      benefits: benefits,
      priority: selectedFileObj.priority,
      remarks: `Edited note details, created version ${newVerStr}.`,
      additionalConditions: conditions
    };

    if (!selectedFileObj.versions) selectedFileObj.versions = [];
    selectedFileObj.versions.push(newVerObj);

    selectedFileObj.subject = subject;
    selectedFileObj.projectName = projName;
    selectedFileObj.estimatedBudget = budget;
    selectedFileObj.budgetHead = budgetHead;
    selectedFileObj.description = desc;
    selectedFileObj.purpose = purpose;
    selectedFileObj.background = background;
    selectedFileObj.justification = justification;
    selectedFileObj.benefits = benefits;
    selectedFileObj.additionalConditions = conditions;

    if (!selectedFileObj.auditLogs) selectedFileObj.auditLogs = [];
    selectedFileObj.auditLogs.push({
      user: user.name,
      role: user.role,
      date: dateStr,
      time: timeStr,
      ip: '10.2.14.99',
      action: `Created new version ${newVerStr}`,
      previousValue: currentVerStr,
      newValue: newVerStr
    });

    logAudit(user.name, `Edited Note Sheet for File ${selectedFileObj.id} (Version ${newVerStr})`, 'Success');

    isEditingApprovalNote = false;
    selectedApprovalVersion = 'latest';
    showToast(`Note details saved successfully as Version ${newVerStr.replace('v', '')}`);
    
    syncFileWithEOfficeNote(selectedFileObj);
    renderGlobalStatusView();
  };

  (window as any).actionApprovalWorkspace = (type: 'Approve' | 'Reject' | 'Return' | 'Keep Pending' | 'Forward') => {
    if (!selectedFileObj) return;

    const textarea = document.getElementById('workspace-remarks-textarea') as HTMLTextAreaElement;
    const remarks = textarea?.value.trim() || '';

    if (type !== 'Keep Pending' && !remarks) {
      showToast('Official remarks are mandatory for this action.');
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);
    const timeStr = now.toTimeString().substring(0, 5);
    const dateTimeStr = `${dateStr} ${timeStr}`;

    const currentVerStr = selectedFileObj.versions?.[selectedFileObj.versions.length - 1]?.version || 'v1.0';

    if (type === 'Keep Pending') {
      selectedFileObj.status = 'Pending with Current Officer';
      if (selectedFileObj.workflowStatus) {
        (selectedFileObj.workflowStatus as any)[user.role] = 'Pending';
      }
      if (!selectedFileObj.approvalHistory) selectedFileObj.approvalHistory = [];
      selectedFileObj.approvalHistory.push({
        officerName: user.name,
        role: user.role,
        department: selectedFileObj.department,
        action: 'Keep Pending',
        remarks: remarks || 'Review in progress. Kept pending.',
        dateTime: dateTimeStr,
        status: 'Pending',
        versionNumber: currentVerStr
      });

      if (!selectedFileObj.auditLogs) selectedFileObj.auditLogs = [];
      selectedFileObj.auditLogs.push({
        user: user.name,
        role: user.role,
        date: dateStr,
        time: timeStr,
        ip: '10.2.14.99',
        action: 'Review Kept Pending',
        previousValue: selectedFileObj.status,
        newValue: 'Pending with Current Officer'
      });

      logAudit(user.name, `Kept review pending for File ${selectedFileObj.id}`, 'Success');
      showToast('File status marked as Pending. You can continue reviewing later.');
      syncFileWithEOfficeNote(selectedFileObj);
      renderGlobalStatusView();
      return;
    }

    // Loader simulation for approvals/signatures
    const originalContent = container.innerHTML;
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs font-bold text-slate-800 uppercase tracking-widest animate-pulse">Verifying e-Sign Credentials & Cryptographic Ledger...</p>
      </div>
    `;

    setTimeout(() => {
      if (type === 'Approve' || type === 'Forward') {
        const nextCustodian = getNextCustodianInPipeline(selectedFileObj.currentCustodian);
        
        if (selectedFileObj.workflowStatus) {
          (selectedFileObj.workflowStatus as any)[user.role] = 'Approved';
          if (nextCustodian !== 'Approved / Closed') {
            (selectedFileObj.workflowStatus as any)[nextCustodian] = 'Pending';
          }
        }

        if (!selectedFileObj.approvalHistory) selectedFileObj.approvalHistory = [];
        selectedFileObj.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: selectedFileObj.department,
          action: type === 'Approve' ? 'Approved & Signed' : 'Forwarded without edits',
          remarks: remarks,
          dateTime: dateTimeStr,
          status: 'Approved',
          versionNumber: currentVerStr
        });

        selectedFileObj.notes.push({
          writer: `${user.role} (${user.name})`,
          text: remarks,
          date: dateTimeStr
        });

        selectedFileObj.currentCustodian = nextCustodian;
        if (nextCustodian === 'Approved / Closed') {
          selectedFileObj.status = 'Approved / Closed';
          
          const newProjId = `PRJ-2026-${selectedFileObj.id.split('-').pop()}`;
          const newProj: Project = {
            id: newProjId,
            name: selectedFileObj.projectName || selectedFileObj.subject,
            department: selectedFileObj.department,
            zone: selectedFileObj.zone || 'Zone-3 (Secunderabad)',
            projectType: 'General Infrastructure Work',
            status: 'Planning',
            startDate: dateStr,
            endDate: '2027-12-31',
            officerInCharge: 'Er. R. Sharma',
            progress: 0,
            budget: selectedFileObj.estimatedBudget || 12000000,
            spent: 0,
            description: selectedFileObj.description || selectedFileObj.subject,
            lastUpdated: `${dateStr} 10:00`
          };
          
          state.projects.unshift(newProj);

          if (!PROJECT_DOCUMENTS[newProjId]) {
            PROJECT_DOCUMENTS[newProjId] = [];
          }
          PROJECT_DOCUMENTS[newProjId].unshift({
            id: `DOC-SAN-${selectedFileObj.id.split('-').pop()}`,
            name: `Administrative_Sanction_Order_${selectedFileObj.id.replace(/-/g, '_')}.pdf`,
            type: 'pdf',
            uploadedBy: 'Sri M. Dana Kishore, IAS',
            uploadedDate: dateStr,
            version: 'v1.0',
            status: 'Approved',
            size: '1.8 MB',
            category: 'Administrative Sanctions'
          });

          state.workOrders.unshift({
            id: `WO-${selectedFileObj.id.split('-').pop()}`,
            projectId: newProjId,
            title: `Work Order for ${selectedFileObj.projectName}`,
            vendor: 'Pending Bid Selection',
            amount: selectedFileObj.estimatedBudget || 12000000,
            currentStage: 'Tendering',
            stageHistory: {
              'Requirement': dateStr
            },
            updates: []
          });

          state.notifications.unshift({
            id: Date.now(),
            title: `Project Sanctioned: ${selectedFileObj.projectName}`,
            text: `Administrative sanction order issued for File ${selectedFileObj.id} with budget Rs. ${(selectedFileObj.estimatedBudget || 0).toLocaleString('en-IN')}`,
            time: 'Just now',
            read: false
          });

          state.auditLogs.unshift({
            id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
            user: user.name,
            action: `Granted Administrative Sanction for File ${selectedFileObj.id} and created Project ${newProjId}`,
            date: dateStr,
            time: timeStr,
            ip: '10.2.14.99',
            status: 'Success'
          });

          showToast(`Sanction Granted! Project created and registered under active directory.`);
        } else {
          selectedFileObj.status = 'Approved & Forwarded';
          showToast(`File successfully approved and routed to ${nextCustodian}.`);
        }

        if (!selectedFileObj.auditLogs) selectedFileObj.auditLogs = [];
        selectedFileObj.auditLogs.push({
          user: user.name,
          role: user.role,
          date: dateStr,
          time: timeStr,
          ip: '10.2.14.99',
          action: 'Approved & Forwarded',
          previousValue: selectedFileObj.currentCustodian,
          newValue: nextCustodian
        });

        logAudit(user.name, `Approved & Forwarded File ${selectedFileObj.id} to ${nextCustodian}`, 'Success');
      } else if (type === 'Reject') {
        if (selectedFileObj.workflowStatus) {
          (selectedFileObj.workflowStatus as any)[user.role] = 'Rejected';
        }

        if (!selectedFileObj.approvalHistory) selectedFileObj.approvalHistory = [];
        selectedFileObj.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: selectedFileObj.department,
          action: 'Rejected proposal',
          remarks: remarks,
          dateTime: dateTimeStr,
          status: 'Rejected',
          versionNumber: currentVerStr
        });

        selectedFileObj.notes.push({
          writer: `${user.role} (${user.name})`,
          text: `REJECTED: ${remarks}`,
          date: dateTimeStr
        });

        selectedFileObj.status = 'Rejected';
        selectedFileObj.currentCustodian = selectedFileObj.creatorRole || 'Senior Assistant';

        if (!selectedFileObj.auditLogs) selectedFileObj.auditLogs = [];
        selectedFileObj.auditLogs.push({
          user: user.name,
          role: user.role,
          date: dateStr,
          time: timeStr,
          ip: '10.2.14.99',
          action: 'Rejected File',
          previousValue: 'Pending Review',
          newValue: 'Rejected'
        });

        logAudit(user.name, `Rejected File ${selectedFileObj.id}`, 'Success');
        showToast(`File ${selectedFileObj.id} has been marked as Rejected.`);
      } else if (type === 'Return') {
        const prevCustodian = getPrevCustodianInPipeline(selectedFileObj.currentCustodian);

        if (selectedFileObj.workflowStatus) {
          (selectedFileObj.workflowStatus as any)[user.role] = 'Returned';
          (selectedFileObj.workflowStatus as any)[prevCustodian] = 'Pending';
        }

        if (!selectedFileObj.approvalHistory) selectedFileObj.approvalHistory = [];
        selectedFileObj.approvalHistory.push({
          officerName: user.name,
          role: user.role,
          department: selectedFileObj.department,
          action: 'Returned for Correction',
          remarks: remarks,
          dateTime: dateTimeStr,
          status: 'Returned',
          versionNumber: currentVerStr
        });

        selectedFileObj.notes.push({
          writer: `${user.role} (${user.name})`,
          text: `RETURNED WITH REMARKS: ${remarks}`,
          date: dateTimeStr
        });

        selectedFileObj.status = 'Returned';
        selectedFileObj.currentCustodian = prevCustodian;

        if (!selectedFileObj.auditLogs) selectedFileObj.auditLogs = [];
        selectedFileObj.auditLogs.push({
          user: user.name,
          role: user.role,
          date: dateStr,
          time: timeStr,
          ip: '10.2.14.99',
          action: 'Returned File',
          previousValue: selectedFileObj.currentCustodian,
          newValue: prevCustodian
        });

        logAudit(user.name, `Returned File ${selectedFileObj.id} to ${prevCustodian}`, 'Success');
        showToast(`File returned for correction to ${prevCustodian}.`);
      }

      selectedFileObj.lastUpdated = dateStr;
      syncFileWithEOfficeNote(selectedFileObj);
      renderSidebar();
      renderGlobalStatusView();
    }, 1500);
  };
}

function renderGlobalReportsView() {
  const container = document.getElementById('reports-view-container');
  if (!container) return;

  container.innerHTML = `
    <!-- Top Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Sanctioned Outlay</span>
        <span class="text-lg font-extrabold text-slate-900 mt-2 font-mono">Rs. 33.15 Cr</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Released Expenditure</span>
        <span class="text-lg font-extrabold text-[#2563EB] mt-2 font-mono">Rs. 16.35 Cr</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Average Project Progress</span>
        <span class="text-lg font-extrabold text-emerald-600 mt-2 font-mono">61.8%</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Clearances Cleared</span>
        <span class="text-lg font-extrabold text-indigo-700 mt-2 font-mono">92%</span>
      </div>
    </div>

    <!-- Reports engine controls -->
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
      <div>
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">GHMC MIS Reporting Engine</h4>
        <p class="text-[9px] text-slate-450 mt-1 uppercase font-semibold">Generate and download official PDF/Excel audit outlays</p>
      </div>
      <div class="flex gap-2 font-bold">
        <button onclick="alert('Downloading Department Summary Outlay PDF...')" class="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-slate-200 cursor-pointer">
          Download PDF Summary
        </button>
        <button onclick="alert('Exporting Budget Performance Excel...')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer">
          Export Excel Report
        </button>
      </div>
    </div>

    <div id="reports-charts-wrapper" class="space-y-6"></div>
  `;

  const chartsWrapper = document.getElementById('reports-charts-wrapper');
  if (chartsWrapper) {
    renderReportsModule(chartsWrapper);
  }
}

function renderGlobalNotificationsView() {
  const container = document.getElementById('notifications-view-container');
  if (!container) return;

  const notifications = state.notifications;

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 max-w-4xl space-y-6">
      <div class="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Alert & System Notifications</h3>
          <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">Real-time eOffice and ERP transaction ledger events</p>
        </div>
        <button onclick="markAllNotificationsRead()" class="text-[#2563EB] hover:text-[#1D4ED8] text-[10px] font-bold cursor-pointer uppercase tracking-wider">
          Mark All As Read
        </button>
      </div>

      <div class="divide-y divide-slate-100 font-semibold">
        ${notifications.map(n => `
          <div class="py-4 flex justify-between items-start gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full ${n.read ? 'bg-slate-300' : 'bg-[#2563EB] animate-pulse'}"></span>
                <h4 class="text-xs font-bold text-slate-800">${n.title}</h4>
                ${!n.read ? '<span class="bg-blue-50 text-[#2563EB] text-[8px] font-bold px-1 rounded uppercase tracking-wider border border-blue-100">New</span>' : ''}
              </div>
              <p class="text-xs text-slate-500 font-semibold pl-3.5 leading-relaxed">${n.text}</p>
              <span class="text-[9px] text-slate-400 font-mono block pl-3.5">${n.time}</span>
            </div>
            <div class="flex gap-2 font-bold">
              ${!n.read ? `<button onclick="markNotificationRead(${n.id})" class="text-xs text-slate-400 hover:text-slate-700 font-bold cursor-pointer" title="Mark as read">✓</button>` : ''}
              <button onclick="deleteNotification(${n.id})" class="text-xs text-rose-450 hover:text-rose-600 font-bold cursor-pointer" title="Delete notification">✕</button>
            </div>
          </div>
        `).join('')}
        ${notifications.length === 0 ? '<div class="text-center text-xs text-slate-450 py-8 italic">No notifications present.</div>' : ''}
      </div>
    </div>
  `;
}

let auditSearchQuery = '';

function renderGlobalAuditLogsView() {
  const container = document.getElementById('audit-logs-container');
  if (!container) return;

  const logs = state.auditLogs.filter(l => 
    l.user.toLowerCase().includes(auditSearchQuery) || 
    l.action.toLowerCase().includes(auditSearchQuery) ||
    l.id.toLowerCase().includes(auditSearchQuery)
  );

  container.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Security Auditing Ledger</h3>
          <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">Immutable cryptographic transaction logs and IP nodes</p>
        </div>
        
        <div class="w-64 border border-slate-200 rounded-md flex items-center bg-slate-50/50 px-2.5 py-1">
          <input type="text" id="audit-search-input" class="w-full text-xs text-slate-800 bg-transparent outline-none font-medium" placeholder="Filter by User or Action..." value="${auditSearchQuery}">
        </div>
      </div>

      <div class="overflow-x-auto font-semibold">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <th class="py-2.5 px-3">Log ID</th>
              <th class="py-2.5 px-3">Operator / Role</th>
              <th class="py-2.5 px-3">Transaction Details</th>
              <th class="py-2.5 px-3">Timestamp</th>
              <th class="py-2.5 px-3">Node IP</th>
              <th class="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${logs.map(l => `
              <tr class="hover:bg-slate-50/50">
                <td class="py-3 px-3 font-mono font-bold text-slate-400">${l.id}</td>
                <td class="py-3 px-3 text-slate-850 font-bold">${l.user}</td>
                <td class="py-3 px-3 text-slate-600 font-semibold">${l.action}</td>
                <td class="py-3 px-3 font-mono text-[10px] text-slate-500">${l.date} ${l.time}</td>
                <td class="py-3 px-3 font-mono text-[10px] text-slate-500">${l.ip}</td>
                <td class="py-3 px-3 text-right">
                  <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                    ${l.status}
                  </span>
                </td>
              </tr>
            `).join('')}
            ${logs.length === 0 ? '<tr><td colspan="6" class="py-6 text-center text-slate-450 italic">No audit records found matching query.</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const input = document.getElementById('audit-search-input') as HTMLInputElement;
  input?.addEventListener('input', () => {
    auditSearchQuery = input.value.trim().toLowerCase();
    renderGlobalAuditLogsView();
  });
}

function updateTopNavbarCounters() {
  const approvalsText = document.getElementById('navbar-pending-approvals-text');
  const user = state.currentUser;
  if (approvalsText && user) {
    const filesCount = state.eOfficeFiles.filter(f => f.currentCustodian === user.role && f.status !== 'Approved / Closed' && f.status !== 'Rejected').length;
    const billsCount = (user.role === 'Finance Officer') 
      ? state.bills.filter(b => b.status !== 'Paid').length
      : 0;
    const totalCount = filesCount + billsCount;
    approvalsText.textContent = `${totalCount} Pending`;
  }
  renderNotificationsBadge();
}

// ==========================================
// 14. QUICK ACTIONS & USER GUIDE INTERACTIVE HANDLERS
// ==========================================

function closeQuickActionModal() {
  const modal = document.getElementById('quick-action-modal');
  if (modal) modal.classList.add('hidden');
}
(window as any).closeQuickActionModal = closeQuickActionModal;

(window as any).openQuickActionModal = (actionType: 'file' | 'note' | 'workorder' | 'document') => {
  const modal = document.getElementById('quick-action-modal');
  if (!modal) return;

  let formHtml = '';

  if (actionType === 'file') {
    formHtml = `
      <form id="quick-file-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Link</label>
          <select id="quick-file-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${state.projects.map(p => `<option value="${p.id}">${p.id} - ${p.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject Matter / File Name</label>
          <input type="text" id="quick-file-subject" required placeholder="Enter administrative sanction subject..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department Division</label>
          <input type="text" id="quick-file-dept" required placeholder="e.g. Information Technology Division" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none" value="${state.currentUser?.role === 'Vendor' ? 'External Partner' : 'Engineering Wing'}">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Priority</label>
            <select id="quick-file-priority" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Normal">Normal Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Send to Desk</label>
            <select id="quick-file-custodian" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              ${FILE_MOVEMENT_PIPELINE.map(cust => `<option value="${cust}">${cust}</option>`).join('')}
            </select>
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Note Sheet Remark</label>
          <textarea id="quick-file-remark" required placeholder="Write initial proposal/findings note sheet details here..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 h-20 outline-none"></textarea>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Dispatch File</button>
        </div>
      </form>
    `;
  } else if (actionType === 'note') {
    formHtml = `
      <form id="quick-note-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Target eOffice File</label>
          <select id="quick-note-file" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${state.eOfficeFiles.map(f => `<option value="${f.id}">${f.id} - ${f.subject}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Note Sheet Remark Description</label>
          <textarea id="quick-note-text" required placeholder="Write official note remark to sign and attach to file..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 h-32 outline-none"></textarea>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Sign & Append</button>
        </div>
      </form>
    `;
  } else if (actionType === 'workorder') {
    formHtml = `
      <form id="quick-wo-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Link</label>
          <select id="quick-wo-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${state.projects.map(p => `<option value="${p.id}">${p.id} - ${p.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Contract Title</label>
          <input type="text" id="quick-wo-title" required placeholder="e.g. Pile foundation works for metro spans" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vendor Partner Organization</label>
          <input type="text" id="quick-wo-vendor" required placeholder="e.g. Aaditya Construction Group" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contract Amount (INR)</label>
            <input type="number" id="quick-wo-amount" required placeholder="e.g. 5000000" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Stage</label>
            <select id="quick-wo-stage" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Work Order">Work Order Issued</option>
              <option value="Vendor Execution">Vendor Execution</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Disburse Contract</button>
        </div>
      </form>
    `;
  } else {
    // Document upload
    formHtml = `
      <form id="quick-doc-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Context</label>
          <select id="quick-doc-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${state.projects.map(p => `<option value="${p.id}">${p.id} - ${p.name}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Document Title / Name</label>
          <input type="text" id="quick-doc-name" required placeholder="e.g. Soil load capacity certification report.pdf" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category Classification</label>
            <select id="quick-doc-category" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Administrative Sanctions">Administrative Sanction</option>
              <option value="Technical Estimates">Technical Estimate</option>
              <option value="Structural Drawings">Structural Drawing</option>
              <option value="Audit Clearance">Audit Clearance</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Version</label>
            <input type="text" id="quick-doc-version" required value="v1.0" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">File Attachment (Mock Drag-Drop)</label>
          <div class="border-2 border-dashed border-slate-200 rounded-md p-4 text-center hover:bg-slate-50 transition-all cursor-pointer">
            <span class="text-xs text-slate-450 font-semibold block">Drag PDF/Excel attachment files here</span>
            <span class="text-[9px] text-slate-400 mt-1 uppercase font-mono block">Max size: 25MB</span>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Upload & Index</button>
        </div>
      </form>
    `;
  }

  modal.innerHTML = `
    <div class="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4 animate-toast-slide-in relative">
      <button onclick="closeQuickActionModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-650 text-sm font-bold cursor-pointer">✕</button>
      <div>
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Action Interface</h3>
        <p class="text-[9px] text-slate-400 mt-0.5 uppercase font-mono">Create, link, and disburse records securely</p>
      </div>
      <div class="border-t border-slate-100 pt-4">
        ${formHtml}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  // Bind submit handlers
  const fileForm = document.getElementById('quick-file-form');
  fileForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const projId = (document.getElementById('quick-file-project') as HTMLSelectElement).value;
    const subject = (document.getElementById('quick-file-subject') as HTMLInputElement).value;
    const dept = (document.getElementById('quick-file-dept') as HTMLInputElement).value;
    const priority = (document.getElementById('quick-file-priority') as HTMLSelectElement).value;
    const custodian = (document.getElementById('quick-file-custodian') as HTMLSelectElement).value;
    const remark = (document.getElementById('quick-file-remark') as HTMLTextAreaElement).value;

    const fileId = `FILE-2026-${projId.split('-')[1]}-${Math.floor(Math.random() * 900) + 100}`;
    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 5);

    state.eOfficeFiles.unshift({
      id: fileId,
      projectId: projId,
      subject,
      department: dept,
      currentCustodian: custodian,
      priority: priority as 'High' | 'Medium' | 'Low',
      status: 'Pending Approval',
      attachments: [],
      notes: [{
        writer: `${state.currentUser?.role} (${state.currentUser?.name})`,
        text: remark,
        date: dateStr
      }],
      lastUpdated: now.toISOString().substring(0, 10)
    });

    logAudit(state.currentUser?.name || 'Unknown', `Created eOffice File ${fileId} link under ${projId}`, 'Success');
    showToast(`eOffice File ${fileId} successfully created.`);
    closeQuickActionModal();
    renderMainContent();
    updateTopNavbarCounters();
  });

  const noteForm = document.getElementById('quick-note-form');
  noteForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileId = (document.getElementById('quick-note-file') as HTMLSelectElement).value;
    const text = (document.getElementById('quick-note-text') as HTMLTextAreaElement).value;

    const file = state.eOfficeFiles.find(f => f.id === fileId);
    if (file) {
      const now = new Date();
      const dateStr = now.toISOString().substring(0, 10) + ' ' + now.toTimeString().substring(0, 5);
      file.notes.push({
        writer: `${state.currentUser?.role} (${state.currentUser?.name})`,
        text,
        date: dateStr
      });
      file.lastUpdated = now.toISOString().substring(0, 10);
      logAudit(state.currentUser?.name || 'Unknown', `Appended note to File ${fileId}`, 'Success');
      showToast('Note appended successfully.');
    }
    closeQuickActionModal();
    renderMainContent();
  });

  const woForm = document.getElementById('quick-wo-form');
  woForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const projId = (document.getElementById('quick-wo-project') as HTMLSelectElement).value;
    const title = (document.getElementById('quick-wo-title') as HTMLInputElement).value;
    const vendor = (document.getElementById('quick-wo-vendor') as HTMLInputElement).value;
    const amount = parseFloat((document.getElementById('quick-wo-amount') as HTMLInputElement).value);
    const stage = (document.getElementById('quick-wo-stage') as HTMLSelectElement).value;

    const woId = `WO-${Math.floor(Math.random() * 90000) + 10000}`;
    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);

    state.workOrders.unshift({
      id: woId,
      projectId: projId,
      title,
      vendor,
      amount,
      currentStage: stage,
      stageHistory: { Requirement: dateStr, 'Work Order': dateStr },
      updates: [{ date: dateStr, text: 'Work Order contract initiated.' }]
    });

    logAudit(state.currentUser?.name || 'Unknown', `Created Work Order ${woId} for ${vendor}`, 'Success');
    showToast(`Work Order ${woId} successfully created.`);
    closeQuickActionModal();
    renderMainContent();
  });

  const docForm = document.getElementById('quick-doc-form');
  docForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const projId = (document.getElementById('quick-doc-project') as HTMLSelectElement).value;
    const name = (document.getElementById('quick-doc-name') as HTMLInputElement).value;
    const category = (document.getElementById('quick-doc-category') as HTMLSelectElement).value;
    const version = (document.getElementById('quick-doc-version') as HTMLInputElement).value;

    const now = new Date();
    const dateStr = now.toISOString().substring(0, 10);

    logAudit(state.currentUser?.name || 'Unknown', `Uploaded Document "${name}" under project ${projId}`, 'Success');
    showToast(`Document attachment "${name}" uploaded successfully.`);
    closeQuickActionModal();
    renderMainContent();
  });
};


(window as any).openHelpGuide = () => {
  const modal = document.getElementById('quick-action-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-2xl p-6 space-y-6 animate-toast-slide-in relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeQuickActionModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">✕</button>
      
      <div class="border-b border-slate-100 pb-3">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">GHMC Unified Digital Portal User Guide</h3>
        <p class="text-[9px] text-slate-450 mt-0.5 uppercase font-mono">Standard Operating Procedures & Role Permission Matrices</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start font-semibold">
        <!-- left menu tabs -->
        <div class="space-y-1 md:col-span-1">
          <button id="guide-tab-roles" onclick="switchGuideTab('roles')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-700 bg-slate-100 border-l-2 border-[#2563EB]">Role Permissions</button>
          <button id="guide-tab-flow" onclick="switchGuideTab('flow')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500">eOffice File Flow</button>
          <button id="guide-tab-erp" onclick="switchGuideTab('erp')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500">ERP & Finance Integration</button>
        </div>

        <!-- right pane content -->
        <div id="guide-pane-content" class="md:col-span-2 text-xs text-slate-600 space-y-4 leading-relaxed font-semibold">
          <!-- Roles tab default -->
          <div class="space-y-3">
            <h4 class="font-bold text-slate-800">System Role Permission Matrix</h4>
            <ul class="list-disc pl-4 space-y-1.5 text-slate-550">
              <li><strong class="text-slate-700">Commissioner:</strong> Full administrative clearance authority, final note sheet approval, transaction audit access, and global MIS reports download.</li>
              <li><strong class="text-slate-700">Additional Commissioner:</strong> General workspace review, file forwarding/clearance authority, and technical log auditing.</li>
              <li><strong class="text-slate-700">Executive Engineer:</strong> Technical proposal creation, structural drawings upload, milestone execution certification, and technical note submissions.</li>
              <li><strong class="text-slate-700">Finance Officer:</strong> Head of Account ledger mapping, payment voucher release, budget performance monitoring, and financial statement audit.</li>
              <li><strong class="text-slate-700">Vendor Partner:</strong> Workspace timeline overview, payment status verification, invoice submission, and progress remark logs.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-end border-t border-slate-100 pt-4 font-bold">
        <button onclick="closeQuickActionModal()" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Close Guide</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  (window as any).switchGuideTab = (tabId: 'roles' | 'flow' | 'erp') => {
    const rolesBtn = document.getElementById('guide-tab-roles');
    const flowBtn = document.getElementById('guide-tab-flow');
    const erpBtn = document.getElementById('guide-tab-erp');
    const pane = document.getElementById('guide-pane-content');

    if (!pane) return;

    [rolesBtn, flowBtn, erpBtn].forEach(btn => {
      if (btn) {
        btn.className = 'w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500';
      }
    });

    const activeBtn = document.getElementById(`guide-tab-${tabId}`);
    if (activeBtn) {
      activeBtn.className = 'w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-700 bg-slate-100 border-l-2 border-[#2563EB]';
    }

    if (tabId === 'roles') {
      pane.innerHTML = `
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">System Role Permission Matrix</h4>
          <ul class="list-disc pl-4 space-y-1.5 text-slate-550">
            <li><strong class="text-slate-700">Commissioner:</strong> Full administrative clearance authority, final note sheet approval, transaction audit access, and global MIS reports download.</li>
            <li><strong class="text-slate-700">Additional Commissioner:</strong> General workspace review, file forwarding/clearance authority, and technical log auditing.</li>
            <li><strong class="text-slate-700">Executive Engineer:</strong> Technical proposal creation, structural drawings upload, milestone execution certification, and technical note submissions.</li>
            <li><strong class="text-slate-700">Finance Officer:</strong> Head of Account ledger mapping, payment voucher release, budget performance monitoring, and financial statement audit.</li>
            <li><strong class="text-slate-700">Vendor Partner:</strong> Workspace timeline overview, payment status verification, invoice submission, and progress remark logs.</li>
          </ul>
        </div>
      `;
    } else if (tabId === 'flow') {
      pane.innerHTML = `
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">eOffice Note Sheet Flow Standard</h4>
          <p class="text-slate-500">Every administrative file follows a rigid hierarchy to guarantee accountability and digital audit logs:</p>
          <div class="flex flex-col gap-2 border-l border-slate-200 pl-4 mt-2">
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 1: Senior Assistant</span>
              <span class="font-semibold text-slate-705">Initiates file proposal note mapping required land survey numbers or cost estimation details.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 2: Executive Engineer</span>
              <span class="font-semibold text-slate-705">Reviews technical specifications and attaches loadcapacity calculations.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 3: Joint/Addl. Commissioner</span>
              <span class="font-semibold text-slate-705">Verifies project alignment with public work directives and forwards to desk of Commissioner.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 4: Commissioner</span>
              <span class="font-semibold text-slate-705">Grants final administrative signature, officially approving proposal for execution.</span>
            </div>
          </div>
        </div>
      `;
    } else {
      pane.innerHTML = `
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">ERP & Financial Release Protocol</h4>
          <p class="text-slate-500">Payments to contractors are linked directly to milestone progress verified by the Executive Engineer:</p>
          <ol class="list-decimal pl-4 space-y-1.5 text-slate-550">
            <li><strong class="text-slate-700">Milestone Completed:</strong> Vendor uploads work invoice under work order panel.</li>
            <li><strong class="text-slate-700">Technical Audit:</strong> Executive Engineer checks and signs the completion report.</li>
            <li><strong class="text-slate-700">Budget Head Mapping:</strong> CFO maps the bill to the corresponding Head of Account (ensuring sufficient balance outlay).</li>
            <li><strong class="text-slate-700">Payment Released:</strong> CFO releases treasury fund disbursement. Payment status changes to "Paid".</li>
          </ol>
        </div>
      `;
    }
  };
};

(window as any).markNotificationRead = (id: number) => {
  const note = state.notifications.find(n => n.id === id);
  if (note) {
    note.read = true;
    logAudit(state.currentUser?.name || 'Unknown', `Marked notification "${note.title}" as read`, 'Success');
    showToast('Notification marked as read.');
    updateTopNavbarCounters();
    renderNotificationDrawer();
    if (state.activeView === 'notifications-view') {
      renderGlobalNotificationsView();
    }
  }
};

(window as any).markAllNotificationsRead = () => {
  state.notifications.forEach(n => n.read = true);
  logAudit(state.currentUser?.name || 'Unknown', 'Marked all notifications as read', 'Success');
  showToast('All notifications marked as read.');
  updateTopNavbarCounters();
  renderNotificationDrawer();
  if (state.activeView === 'notifications-view') {
    renderGlobalNotificationsView();
  }
};

(window as any).deleteNotification = (id: number) => {
  const index = state.notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    const title = state.notifications[index].title;
    state.notifications.splice(index, 1);
    logAudit(state.currentUser?.name || 'Unknown', `Deleted notification "${title}"`, 'Success');
    showToast('Notification deleted.');
    updateTopNavbarCounters();
    renderNotificationDrawer();
    if (state.activeView === 'notifications-view') {
      renderGlobalNotificationsView();
    }
  }
};

