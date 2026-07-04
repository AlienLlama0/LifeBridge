/**
 * ডেমো অথেনটিকেশন স্টোর — localStorage ভিত্তিক।
 *
 * ব্যাকএন্ড রেডি হলে এই ফাইলের ফাংশনগুলো (registerUser, loginUser, ইত্যাদি)
 * real API কল দিয়ে replace করুন — বাকি UI (login/register পেজ, useAuth হুক)
 * অপরিবর্তিত থাকবে যদি রিটার্ন-টাইপ একই রাখা হয়।
 *
 * ⚠️ পাসওয়ার্ড এখানে প্লেইনটেক্সটে সংরক্ষিত হয় — শুধুমাত্র ডেমো/প্রোটোটাইপ
 * উদ্দেশ্যে। প্রোডাকশনে কখনোই ক্লায়েন্ট-সাইড স্টোরেজে পাসওয়ার্ড রাখবেন না;
 * সার্ভারে hashing (bcrypt/argon2) করে রাখতে হবে।
 */

export type UserRole = "patient" | "hospital" | "admin";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  hospitalName?: string;
  address?: string;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  hospitalName?: string;
  address?: string;
}

const USERS_KEY = "lifebridge_users";
const SESSION_KEY = "lifebridge_session";

export const ROLE_LABELS: Record<UserRole, string> = {
  patient: "সাধারণ মানুষ",
  hospital: "হাসপাতাল স্টাফ",
  admin: "অ্যাডমিন",
};

export const ROLE_DASHBOARD: Record<UserRole, string> = {
  patient: "/dashboard/patient",
  hospital: "/dashboard/hospital",
  admin: "/dashboard/admin",
};

// ডেমো অ্যাডমিন অ্যাকাউন্ট — বাস্তব অ্যাপে অ্যাডমিন self-register করতে পারবে না,
// এটি শুধু প্রথমবার সিড করার জন্য যাতে অ্যাডমিন লগইন টেস্ট করা যায়।
const SEED_ADMIN: StoredUser = {
  id: "seed-admin",
  name: "লাইফব্রিজ অ্যাডমিন",
  email: "admin@lifebridge.com",
  phone: "01700000000",
  password: "admin1234",
  role: "admin",
  createdAt: new Date(0).toISOString(),
};

function isBrowser() {
  return typeof window !== "undefined";
}

function readUsers(): StoredUser[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify([SEED_ADMIN]));
      return [SEED_ADMIN];
    }
    const parsed: StoredUser[] = JSON.parse(raw);
    if (!parsed.some((u) => u.role === "admin")) {
      parsed.push(SEED_ADMIN);
      window.localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return [SEED_ADMIN];
  }
}

function writeUsers(users: StoredUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toSession(u: StoredUser): SessionUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    hospitalName: u.hospitalName,
    address: u.address,
  };
}

export interface AuthResult {
  ok: boolean;
  error?: string;
  user?: SessionUser;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Exclude<UserRole, "admin">;
  hospitalName?: string;
  address?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^01[3-9]\d{8}$/;

export function registerUser(input: RegisterInput): AuthResult {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();

  if (!name) return { ok: false, error: "নাম লিখুন।" };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "সঠিক ইমেইল ঠিকানা দিন।" };
  if (!PHONE_RE.test(phone))
    return { ok: false, error: "সঠিক বাংলাদেশী মোবাইল নম্বর দিন (যেমন 017XXXXXXXX)।" };
  if (input.password.length < 6)
    return { ok: false, error: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।" };
  if (input.role === "hospital" && !input.hospitalName?.trim())
    return { ok: false, error: "হাসপাতালের নাম লিখুন।" };

  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { ok: false, error: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।" };
  }

  const newUser: StoredUser = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    phone,
    password: input.password,
    role: input.role,
    hospitalName: input.hospitalName?.trim() || undefined,
    address: input.address?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, newUser]);
  const session = toSession(newUser);
  if (isBrowser()) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

export function loginUser(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail || !password) {
    return { ok: false, error: "ইমেইল ও পাসওয়ার্ড দিন।" };
  }

  const users = readUsers();
  const found = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!found || found.password !== password) {
    return { ok: false, error: "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।" };
  }

  const session = toSession(found);
  if (isBrowser()) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true, user: session };
}

export function logoutUser() {
  if (isBrowser()) window.localStorage.removeItem(SESSION_KEY);
}

export function getSession(): SessionUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
