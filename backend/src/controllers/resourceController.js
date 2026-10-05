import { query } from "../config/db.js";
import { HttpError } from "../utils/http.js";

const tableConfig = {
  students: {
    table: "students",
    searchable: ["full_name", "email", "branch", "college"],
    writable: ["full_name", "email", "phone", "date_of_birth", "gender", "college", "course", "branch", "graduation_year", "cgpa", "percentage", "backlogs", "certifications", "projects", "experience_years"]
  },
  companies: {
    table: "companies",
    searchable: ["name", "email", "industry", "location"],
    writable: ["name", "email", "phone", "website", "industry", "location", "description", "logo_url", "verified"]
  },
  jobs: {
    table: "jobs",
    searchable: ["title", "description", "location", "job_type", "eligible_branches", "status"],
    writable: ["company_id", "title", "description", "location", "job_type", "salary_package", "experience_required", "minimum_cgpa", "maximum_backlogs", "eligible_branches", "graduation_year", "application_deadline", "openings", "status"]
  },
  interviews: {
    table: "interviews",
    searchable: ["mode", "round_name", "status", "location_or_link"],
    writable: ["application_id", "student_id", "company_id", "job_id", "interview_date", "interview_time", "mode", "location_or_link", "round_name", "notes", "status"]
  }
};

function whereSearch(config, search) {
  if (!search) {
    return { clause: "", params: {} };
  }
  const params = { search: `%${search}%` };
  const clause = `WHERE ${config.searchable.map((field) => `${field} LIKE :search`).join(" OR ")}`;
  return { clause, params };
}

function pick(body, fields) {
  return Object.fromEntries(Object.entries(body).filter(([key]) => fields.includes(key)));
}

export function listResource(resource) {
  return async (req, res) => {
    const config = tableConfig[resource];
    const { clause, params } = whereSearch(config, req.query.search);
    const rows = await query(`SELECT * FROM ${config.table} ${clause} ORDER BY id DESC`, params);
    res.json(rows);
  };
}

export function getResource(resource) {
  return async (req, res) => {
    const config = tableConfig[resource];
    const rows = await query(`SELECT * FROM ${config.table} WHERE id = :id`, { id: req.params.id });
    if (!rows.length) {
      throw new HttpError(404, `${resource} record not found`);
    }
    res.json(rows[0]);
  };
}

export function createResource(resource) {
  return async (req, res) => {
    const config = tableConfig[resource];
    const data = pick(req.body, config.writable);
    const fields = Object.keys(data);

    if (!fields.length) {
      throw new HttpError(400, "No valid fields supplied");
    }

    const sql = `INSERT INTO ${config.table} (${fields.join(", ")}) VALUES (${fields.map((field) => `:${field}`).join(", ")})`;
    const result = await query(sql, data);
    const [created] = await query(`SELECT * FROM ${config.table} WHERE id = :id`, { id: result.insertId });
    res.status(201).json(created);
  };
}

export function updateResource(resource) {
  return async (req, res) => {
    const config = tableConfig[resource];
    const data = pick(req.body, config.writable);
    const fields = Object.keys(data);

    if (!fields.length) {
      throw new HttpError(400, "No valid fields supplied");
    }

    await query(`UPDATE ${config.table} SET ${fields.map((field) => `${field} = :${field}`).join(", ")} WHERE id = :id`, {
      ...data,
      id: req.params.id
    });
    const [updated] = await query(`SELECT * FROM ${config.table} WHERE id = :id`, { id: req.params.id });
    res.json(updated);
  };
}

export function deleteResource(resource) {
  return async (req, res) => {
    const config = tableConfig[resource];
    await query(`DELETE FROM ${config.table} WHERE id = :id`, { id: req.params.id });
    res.json({ message: `${resource} record deleted` });
  };
}
