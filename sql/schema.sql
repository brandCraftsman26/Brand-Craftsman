-- =============================================================================
-- Brand Craftsman: PostgreSQL Database DDL
-- Powered by PostgreSQL & Authelia Authentication
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles & Accounts (Authelia & Credentials)
CREATE TABLE IF NOT EXISTS user_profiles (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(120),
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    display_name VARCHAR(255),
    avatar_url TEXT,
    password_hash TEXT,
    auth_provider VARCHAR(50) NOT NULL DEFAULT 'authelia',
    groups TEXT[] DEFAULT ARRAY[]::TEXT[],
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_provider ON user_profiles(auth_provider);

-- 2. CMS Blogs
CREATE TABLE IF NOT EXISTS cms_blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author VARCHAR(120) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) DEFAULT '5 min read',
    published_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    image TEXT NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_blogs_slug ON cms_blogs(slug);
CREATE INDEX IF NOT EXISTS idx_cms_blogs_featured ON cms_blogs(featured);

-- 3. CMS Portfolios
CREATE TABLE IF NOT EXISTS cms_portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    client VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    results JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_portfolios_slug ON cms_portfolios(slug);

-- 4. Builder Dynamic Pages
CREATE TABLE IF NOT EXISTS builder_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    meta_description TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    components JSONB DEFAULT '[]'::jsonb,
    metadata_json JSONB,
    created_by_id VARCHAR(255) REFERENCES user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_builder_pages_slug ON builder_pages(slug);
CREATE INDEX IF NOT EXISTS idx_builder_pages_published ON builder_pages(is_published);

-- 5. Page Blocks
CREATE TABLE IF NOT EXISTS page_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    block_type VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    content_json JSONB NOT NULL,
    style_config TEXT,
    page_id UUID NOT NULL REFERENCES builder_pages(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_blocks_page ON page_blocks(page_id, order_index);

-- 6. Leads / Contact Requests
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new',
    page_id UUID REFERENCES builder_pages(id) ON DELETE SET NULL,
    user_id VARCHAR(255) REFERENCES user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- 7. Security & Auth Audit Logs
CREATE TABLE IF NOT EXISTS auth_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    user_id VARCHAR(255),
    ip_address VARCHAR(100),
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_event ON auth_audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON auth_audit_logs(user_id);
