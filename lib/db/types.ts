/**
 * Brand Craftsman Database Models for PostgreSQL & Authelia
 */

export interface UserProfile {
  id: string;
  username?: string | null;
  email: string;
  role: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  authProvider: string;
  groups?: string[];
  lastLoginAt?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BuilderPage {
  id: string;
  title: string;
  slug: string;
  metaDescription?: string | null;
  isPublished?: boolean;
  components?: Array<{
    type: string;
    props: Record<string, unknown>;
  }>;
  metadataJson?: Record<string, unknown> | null;
  createdById?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PageBlock {
  id: string;
  blockType: string;
  orderIndex: number;
  contentJson: Record<string, unknown> | string;
  styleConfig?: string | null;
  pageId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  service?: string | null;
  status?: string | null;
  pageId?: string | null;
  userId?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface AuthAuditLog {
  id?: string;
  eventType: string;
  userId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  details?: Record<string, unknown> | null;
  createdAt?: Date | string;
}
