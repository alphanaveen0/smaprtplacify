import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { query } from "../config/db.js";
import { HttpError } from "../utils/http.js";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = credentialsSchema.extend({
  name: z.string().min(2),
  role: z.enum(["student", "company", "tpo"])
});

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export async function register(req, res) {
  const input = registerSchema.parse(req.body);
  const existing = await query("SELECT id FROM users WHERE email = :email", { email: input.email });

  if (existing.length) {
    throw new HttpError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const result = await query(
    "INSERT INTO users (name, email, password_hash, role) VALUES (:name, :email, :passwordHash, :role)",
    { name: input.name, email: input.email, passwordHash, role: input.role }
  );
  const user = { id: result.insertId, name: input.name, email: input.email, role: input.role };

  res.status(201).json({ user, token: signToken(user) });
}

export async function login(req, res) {
  const input = credentialsSchema.parse(req.body);
  const [user] = await query("SELECT * FROM users WHERE email = :email", { email: input.email });
  const isDevSeed = process.env.NODE_ENV !== "production" && user?.password_hash?.startsWith("dev:");
  const passwordMatches = isDevSeed
    ? user.password_hash === `dev:${input.password}`
    : user
      ? await bcrypt.compare(input.password, user.password_hash)
      : false;

  if (!user || !passwordMatches) {
    throw new HttpError(401, "Invalid email or password");
  }

  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  res.json({ user: safeUser, token: signToken(safeUser) });
}

export async function me(req, res) {
  res.json({ user: req.user });
}

export async function logout(_req, res) {
  res.json({ message: "Logged out successfully" });
}

export async function forgotPassword(_req, res) {
  res.json({ message: "If an account exists for this email, reset instructions will be sent." });
}
