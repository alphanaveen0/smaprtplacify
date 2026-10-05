import { Activity, Job, Stat } from "@/types";

export const studentJobs: Job[] = [
  {
    id: "google-sde",
    company: "Google",
    title: "SDE Intern",
    location: "Bengaluru",
    match: 94,
    deadline: "12 Oct",
    eligibility: "Eligible"
  },
  {
    id: "microsoft-cloud",
    company: "Microsoft",
    title: "Cloud Engineer Intern",
    location: "Hyderabad",
    match: 89,
    deadline: "15 Oct",
    eligibility: "Eligible"
  }
];

export const studentStats: Stat[] = [
  { label: "Profile", value: "92%", tone: "purple" },
  { label: "Eligible Jobs", value: "18", tone: "cyan" },
  { label: "Applications", value: "07", tone: "blue" },
  { label: "ATS Score", value: "87", tone: "success" }
];

export const tpoStats: Stat[] = [
  { label: "Total Students", value: "1,248", tone: "purple" },
  { label: "Eligible", value: "894", tone: "cyan" },
  { label: "Applications", value: "3.8k", tone: "blue" },
  { label: "Companies", value: "76", tone: "warning" },
  { label: "Placed", value: "412", tone: "success" }
];

export const companyStats: Stat[] = [
  { label: "Active Jobs", value: "12", tone: "purple" },
  { label: "Applications", value: "642", tone: "blue" },
  { label: "Shortlisted", value: "84", tone: "cyan" },
  { label: "Interviews", value: "31", tone: "warning" },
  { label: "Selected", value: "18", tone: "success" }
];

export const placementActivities: Activity[] = [
  { id: "drive", title: "Infosys drive is live", subtitle: "312 eligible students", tone: "cyan" },
  { id: "shortlist", title: "Google shortlist uploaded", subtitle: "28 students selected for interview", tone: "success" },
  { id: "deadline", title: "TCS deadline tonight", subtitle: "148 pending applications", tone: "warning" }
];

export const topSkills = ["React Native", "Java", "Python", "SQL", "AWS", "Docker"];
