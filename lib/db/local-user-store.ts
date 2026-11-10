import fs from "fs";
import path from "path";

export interface LocalUserRecord {
  id: string;
  username: string;
  email: string;
  display_name: string;
  avatar_url?: string | null;
  password_hash: string;
  role: string;
  auth_provider: string;
  groups: string[];
  created_at?: string;
  last_login_at?: string;
  updated_at?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "local_users.json");

function ensureStoreExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Error creating local users store:", err);
  }
}

export function getLocalUsers(): LocalUserRecord[] {
  ensureStoreExists();
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("Could not read local users file:", err);
    return [];
  }
}

export function findLocalUserByEmail(email: string): LocalUserRecord | null {
  const users = getLocalUsers();
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export function saveLocalUser(user: LocalUserRecord): void {
  ensureStoreExists();
  const users = getLocalUsers();
  const normalizedEmail = user.email.trim().toLowerCase();
  const index = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

  if (index >= 0) {
    users[index] = { ...users[index], ...user, updated_at: new Date().toISOString() };
  } else {
    users.push(user);
  }

  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write to local users file:", err);
  }
}
