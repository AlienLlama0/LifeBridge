export type OwnerType = "সরকারি" | "বেসরকারি";

export interface Department {
  name: string;
  doctorsOnDuty: number;
}

export interface BloodStock {
  type: string;
  units: number;
}

export interface Hospital {
  id: string;
  name: string;
  namebn: string;
  ownerType: OwnerType;
  address: string;
  distanceKm: number;
  phone: string;
  rating: number;
  reviewCount: number;
  totalBeds: number;
  availableBeds: number;
  icuTotal: number;
  icuAvailable: number;
  ventilatorTotal: number;
  ventilatorAvailable: number;
  oxygenTotal: number;
  oxygenAvailable: number;
  emergencyOpen: boolean;
  lastUpdatedMinutesAgo: number;
  isVerifiedLive: boolean;
  favorite?: boolean;
  departments: Department[];
  bloodBank: BloodStock[];
  announcement?: string;
  visitingHours: string;
}

export function occupancyLevel(available: number, total: number): "high" | "low" | "critical" {
  if (total === 0) return "critical";
  const ratio = available / total;
  if (ratio >= 0.3) return "high";
  if (ratio > 0) return "low";
  return "critical";
}
