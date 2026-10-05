import { JobCard } from "@/components/student/JobCard";
import { Header } from "@/components/ui/Header";
import { Screen } from "@/components/ui/Screen";
import { studentJobs } from "@/mock/dashboard";

export default function StudentJobs() {
  return (
    <Screen>
      <Header title="Eligible jobs" subtitle="Deterministic eligibility appears before AI ranking in later phases." />
      {studentJobs.map((job) => <JobCard key={job.id} job={job} />)}
    </Screen>
  );
}
