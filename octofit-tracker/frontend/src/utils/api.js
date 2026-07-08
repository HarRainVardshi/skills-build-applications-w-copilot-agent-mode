export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    const codespacesPattern = /^(?<prefix>.+)-(?<port>\d+)\.app\.github\.dev$/i;
    const match = hostname.match(codespacesPattern);

    if (match?.groups?.prefix) {
      return `${protocol}//${match.groups.prefix}-8000.app.github.dev`;
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return 'http://localhost:8000';
    }

    const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
    if (envBaseUrl) {
      return envBaseUrl;
    }
  }

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}
