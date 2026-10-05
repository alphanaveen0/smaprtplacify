export type UserRole = "student" | "company" | "tpo" | "admin";

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  match: number;
  deadline: string;
  eligibility: string;
};

export type Stat = {
  label: string;
  value: string;
  tone: "purple" | "blue" | "cyan" | "success" | "warning";
};

export type Activity = {
  id: string;
  title: string;
  subtitle: string;
  tone: "success" | "warning" | "cyan" | "purple";
};
