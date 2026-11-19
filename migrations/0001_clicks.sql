-- /go/ clicks: CV downloads, email, LinkedIn and GitHub clicks, by page and source.
-- No personal data: no IP address, no user agent, no cookie. Kept 12 months (privacy page).
CREATE TABLE clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  target TEXT NOT NULL CHECK (target IN ('cv', 'email', 'linkedin', 'github')),
  page TEXT NOT NULL,
  referrer_host TEXT NOT NULL DEFAULT '',
  ai_source TEXT NOT NULL DEFAULT ''
);

CREATE INDEX clicks_created ON clicks (created_at);
