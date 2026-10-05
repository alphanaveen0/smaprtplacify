import { useEffect, useMemo, useState } from "react";
import { DataTable } from "./components/DataTable.jsx";
import { Layout } from "./components/Layout.jsx";
import { ModalForm } from "./components/ModalForm.jsx";
import { StatCard } from "./components/StatCard.jsx";
import { Topbar } from "./components/Topbar.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { api } from "./services/api.js";

const resourceColumns = {
  Students: [
    { key: "full_name", label: "Name" },
    { key: "branch", label: "Branch" },
    { key: "cgpa", label: "CGPA" },
    { key: "backlogs", label: "Backlogs" },
    { key: "placement_status", label: "Status" }
  ],
  Companies: [
    { key: "name", label: "Company" },
    { key: "industry", label: "Industry" },
    { key: "location", label: "Location" },
    { key: "verified", label: "Verified", render: (row) => (row.verified ? "Yes" : "No") }
  ],
  Jobs: [
    { key: "title", label: "Job" },
    { key: "location", label: "Location" },
    { key: "minimum_cgpa", label: "CGPA" },
    { key: "eligible_branches", label: "Branches" },
    { key: "status", label: "Status" }
  ],
  Applications: [
    { key: "student_name", label: "Student" },
    { key: "job_title", label: "Job" },
    { key: "company_name", label: "Company" },
    { key: "status", label: "Status" },
    { key: "eligibility_score", label: "Score" }
  ],
  Interviews: [
    { key: "student_id", label: "Student ID" },
    { key: "job_id", label: "Job ID" },
    { key: "interview_date", label: "Date" },
    { key: "mode", label: "Mode" },
    { key: "status", label: "Status" }
  ]
};

const formFields = {
  Students: [
    { name: "full_name", label: "Full name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone" },
    { name: "college", label: "College" },
    { name: "course", label: "Course" },
    { name: "branch", label: "Branch" },
    { name: "graduation_year", label: "Graduation year", type: "number" },
    { name: "cgpa", label: "CGPA", type: "number" },
    { name: "backlogs", label: "Backlogs", type: "number" },
    { name: "projects", label: "Projects", type: "textarea" }
  ],
  Companies: [
    { name: "name", label: "Company name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone" },
    { name: "website", label: "Website" },
    { name: "industry", label: "Industry" },
    { name: "location", label: "Location" },
    { name: "description", label: "Description", type: "textarea" }
  ],
  Jobs: [
    { name: "company_id", label: "Company ID", type: "number", required: true },
    { name: "title", label: "Job title", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "location", label: "Location" },
    { name: "job_type", label: "Job type" },
    { name: "salary_package", label: "Salary/package" },
    { name: "minimum_cgpa", label: "Minimum CGPA", type: "number" },
    { name: "maximum_backlogs", label: "Maximum backlogs", type: "number" },
    { name: "eligible_branches", label: "Eligible branches" },
    { name: "graduation_year", label: "Graduation year", type: "number" },
    { name: "application_deadline", label: "Deadline", type: "date" },
    { name: "openings", label: "Openings", type: "number" }
  ],
  Interviews: [
    { name: "application_id", label: "Application ID", type: "number", required: true },
    { name: "student_id", label: "Student ID", type: "number", required: true },
    { name: "company_id", label: "Company ID", type: "number", required: true },
    { name: "job_id", label: "Job ID", type: "number", required: true },
    { name: "interview_date", label: "Interview date", type: "date", required: true },
    { name: "interview_time", label: "Interview time", type: "time", required: true },
    { name: "mode", label: "Mode", required: true },
    { name: "location_or_link", label: "Location/link" },
    { name: "round_name", label: "Round" },
    { name: "notes", label: "Notes", type: "textarea" }
  ]
};

const endpoints = {
  Students: "/students",
  Companies: "/companies",
  Jobs: "/jobs",
  Interviews: "/interviews"
};

function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "admin@test.com", password: "password123", name: "Admin", role: "tpo" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="brand-mark">S</span>
        <h1>{mode === "login" ? "Welcome back" : "Create SmartPlacify account"}</h1>
        <p>Use the seeded accounts or register a role-based user.</p>
        {mode === "register" ? <input placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /> : null}
        <input placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {mode === "register" ? (
          <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
            <option value="student">Student</option>
            <option value="company">Company</option>
            <option value="tpo">TPO/Admin</option>
          </select>
        ) : null}
        {error ? <div className="toast error">{error}</div> : null}
        <button className="primary-action">{mode === "login" ? "Login" : "Register"}</button>
        <button className="link-button" type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Create account" : "Already have an account?"}
        </button>
        <small>Test password: <strong>password123</strong></small>
      </form>
    </main>
  );
}

function Dashboard({ user }) {
  const [data, setData] = useState(null);
  const endpoint = user.role === "student" ? "/dashboard/student" : user.role === "company" ? "/dashboard/company" : "/dashboard/tpo";

  useEffect(() => {
    api(endpoint).then(setData).catch(() => setData({ error: "Unable to load dashboard" }));
  }, [endpoint]);

  if (!data) return <section className="panel">Loading dashboard...</section>;
  if (data.error) return <section className="panel empty-state">{data.error}</section>;

  if (user.role === "student") {
    return (
      <>
        <Hero />
        <section className="kpi-grid">
          <StatCard label="Eligible Jobs" value={data.eligible_jobs} icon="◇" tone="purple" />
          <StatCard label="Applied Jobs" value={data.applied_jobs} icon="▤" tone="blue" />
          <StatCard label="Shortlisted" value={data.shortlisted_jobs} icon="✓" tone="green" />
          <StatCard label="Interviews" value={data.interviews} icon="◎" tone="orange" />
          <StatCard label="Placement Status" value={data.placement_status} icon="🏆" tone="violet" />
        </section>
      </>
    );
  }

  if (user.role === "company") {
    return (
      <>
        <Hero />
        <section className="kpi-grid">
          <StatCard label="Total Jobs" value={data.total_jobs} icon="◇" />
          <StatCard label="Active Jobs" value={data.active_jobs} icon="✓" tone="green" />
          <StatCard label="Applications" value={data.applications} icon="▤" tone="blue" />
          <StatCard label="Shortlisted" value={data.shortlisted} icon="♙" tone="violet" />
          <StatCard label="Selected" value={data.selected} icon="🏆" tone="orange" />
        </section>
      </>
    );
  }

  return (
    <>
      <Hero />
      <section className="kpi-grid">
        <StatCard label="Total Students" value={data.total_students} icon="👥" />
        <StatCard label="Eligible Students" value={data.eligible_students} icon="♙" tone="green" />
        <StatCard label="Applications" value={data.applications} icon="✈" tone="violet" />
        <StatCard label="Companies" value={data.companies} icon="▥" tone="blue" />
        <StatCard label="Selected Students" value={data.selected_students} icon="🏆" tone="orange" />
      </section>
      <section className="content-grid">
        <article className="panel wide">
          <div className="panel-head"><h2>Placement Overview</h2><span>{data.placement_percentage}% placed</span></div>
          <div className="line-chart">{(data.monthly?.length ? data.monthly : [{ applications: 1 }]).map((item, index) => <span key={index} style={{ height: `${Math.max(18, Number(item.applications) * 18)}%` }} />)}</div>
        </article>
        <article className="panel skills-panel">
          <h2>Top Skills in Demand</h2>
          {(data.skill_demand || []).map((skill) => <div className="skill-row" key={skill.name}><span>{skill.name}</span><b style={{ width: `${Math.min(100, skill.demand * 25)}%` }} /><em>{skill.demand}</em></div>)}
        </article>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-panel">
      <div>
        <h1>Good Morning, Dr. Anjali Sharma 👋</h1>
        <p>Here’s what’s happening with your placement drive today.</p>
      </div>
      <div className="season-card">
        <span>▣</span>
        <strong>Placement Season 2026 - 27</strong>
        <small>Gurugram University</small>
      </div>
    </section>
  );
}

function ResourceView({ name, search }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState({});
  const endpoint = endpoints[name];

  async function load() {
    setLoading(true);
    setError("");
    try {
      setRows(await api(`${endpoint}?search=${encodeURIComponent(search)}`));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [endpoint, search]);

  async function save(event) {
    event.preventDefault();
    await api(editing?.id ? `${endpoint}/${editing.id}` : endpoint, {
      method: editing?.id ? "PUT" : "POST",
      body: values
    });
    setEditing(null);
    setValues({});
    await load();
  }

  async function remove(row) {
    if (!confirm(`Delete ${name.slice(0, -1)} #${row.id}?`)) return;
    await api(`${endpoint}/${row.id}`, { method: "DELETE" });
    await load();
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{name}</h2>
        {formFields[name] ? <button onClick={() => { setEditing({}); setValues({}); }}>Create</button> : null}
      </div>
      {loading ? <div className="empty-state">Loading {name.toLowerCase()}...</div> : null}
      {error ? <div className="toast error">{error}</div> : null}
      {!loading ? (
        <DataTable
          rows={rows}
          columns={resourceColumns[name]}
          actions={formFields[name] ? (row) => (
            <>
              <button onClick={() => { setEditing(row); setValues(row); }}>Edit</button>
              <button onClick={() => remove(row)}>Delete</button>
            </>
          ) : undefined}
        />
      ) : null}
      {editing ? <ModalForm title={`${editing.id ? "Edit" : "Create"} ${name.slice(0, -1)}`} fields={formFields[name]} values={values} setValues={setValues} onSubmit={save} onClose={() => setEditing(null)} /> : null}
    </section>
  );
}

function JobsView({ search }) {
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [eligibility, setEligibility] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api(`/jobs?search=${encodeURIComponent(search)}`).then(setJobs);
    api("/students").then((rows) => {
      setStudents(rows);
      setStudentId(rows[0]?.id || "");
    });
  }, [search]);

  async function check(job) {
    const result = await api(`/jobs/${job.id}/eligibility/${studentId}`);
    setEligibility(result);
  }

  async function apply(job) {
    setMessage("");
    try {
      await api("/applications", { method: "POST", body: { student_id: Number(studentId), job_id: job.id } });
      setMessage("Application submitted successfully");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Jobs</h2>
        <select value={studentId} onChange={(event) => setStudentId(event.target.value)}>
          {students.map((student) => <option key={student.id} value={student.id}>{student.full_name}</option>)}
        </select>
      </div>
      {message ? <div className="toast">{message}</div> : null}
      <DataTable
        rows={jobs}
        columns={resourceColumns.Jobs}
        actions={(job) => (
          <>
            <button onClick={() => check(job)}>Eligibility</button>
            <button onClick={() => apply(job)}>Apply</button>
          </>
        )}
      />
      {eligibility ? (
        <div className={`eligibility-box ${eligibility.eligible ? "ok" : "bad"}`}>
          <strong>{eligibility.eligible ? "ELIGIBLE" : "NOT ELIGIBLE"} · {eligibility.score}%</strong>
          {eligibility.checks.map((check) => <p key={check.label}>{check.passed ? "✓" : "✕"} {check.message}</p>)}
        </div>
      ) : null}
    </section>
  );
}

function ApplicationsView() {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");

  async function load() {
    setRows(await api("/applications"));
  }

  useEffect(() => {
    load();
  }, []);

  async function action(row, path) {
    await api(`/applications/${row.id}/${path}`, { method: "PUT", body: path === "result" ? { result: "SELECTED", package_offered: "8 LPA" } : {} });
    setMessage("Application updated successfully");
    await load();
  }

  return (
    <section className="panel">
      <div className="panel-head"><h2>Applications</h2></div>
      {message ? <div className="toast">{message}</div> : null}
      <DataTable rows={rows} columns={resourceColumns.Applications} actions={(row) => (
        <>
          <button onClick={() => action(row, "shortlist")}>Shortlist</button>
          <button onClick={() => action(row, "reject")}>Reject</button>
          <button onClick={() => action(row, "result")}>Select</button>
        </>
      )} />
    </section>
  );
}

function NotificationsView() {
  const [rows, setRows] = useState([]);

  async function load() {
    setRows(await api("/notifications"));
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(row) {
    await api(`/notifications/${row.id}/read`, { method: "PUT" });
    await load();
  }

  return (
    <section className="panel">
      <div className="panel-head"><h2>Notifications</h2></div>
      <div className="activity-list">
        {rows.map((row) => <li key={row.id}><span className="green-dot">✓</span><p>{row.title}<small>{row.message}</small></p><button onClick={() => markRead(row)}>{row.is_read ? "Read" : "Mark read"}</button></li>)}
      </div>
    </section>
  );
}

function ProfileView({ role }) {
  return role === "student" ? <ResourceView name="Students" search="" /> : role === "company" ? <ResourceView name="Companies" search="" /> : <ResourceView name="Students" search="" />;
}

function App() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const view = useMemo(() => {
    if (!user) return null;
    if (activeView === "Dashboard") return <Dashboard user={user} />;
    if (activeView === "Profile") return <ProfileView role={user.role} />;
    if (activeView === "Jobs") return user.role === "student" ? <JobsView search={search} /> : <ResourceView name="Jobs" search={search} />;
    if (activeView === "Applications") return <ApplicationsView />;
    if (activeView === "Interviews") return <ResourceView name="Interviews" search={search} />;
    if (activeView === "Notifications") return <NotificationsView />;
    if (activeView === "Reports") return <Dashboard user={user} />;
    if (activeView === "Students") return <ResourceView name="Students" search={search} />;
    if (activeView === "Companies") return <ResourceView name="Companies" search={search} />;
    return <Dashboard user={user} />;
  }, [activeView, search, user]);

  if (!user) return <AuthScreen />;

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      <Topbar search={search} setSearch={setSearch} />
      {view}
    </Layout>
  );
}

export default App;
