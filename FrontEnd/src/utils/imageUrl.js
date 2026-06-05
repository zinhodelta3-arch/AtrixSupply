export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/$/, "");

export const FALLBACK_IMAGE = "/logo.png";
export const FALLBACK_PROFILE_IMAGE = "/core.png";

function isExternalUrl(valor) {
  return /^(https?:)?\/\//i.test(valor) || /^(data:image|blob:)/i.test(valor);
}

function encodePath(path) {
  return path
    .split("/")
    .filter(Boolean)
    .map((parte) => encodeURIComponent(parte))
    .join("/");
}

function normalizeUploadPath(valor) {
  const normalizado = String(valor || "")
    .trim()
    .replaceAll("\\", "/");

  if (!normalizado) return "";

  const semApi = normalizado.startsWith(API_URL)
    ? normalizado.slice(API_URL.length)
    : normalizado;

  const partes = semApi
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean);

  const uploadsIndex = partes.lastIndexOf("uploads");
  if (uploadsIndex >= 0) {
    const depoisUploads = partes.slice(uploadsIndex + 1);
    return ["uploads", ...depoisUploads].join("/");
  }

  const imagensIndex = partes.lastIndexOf("imagens");
  if (imagensIndex >= 0) {
    const depoisImagens = partes.slice(imagensIndex + 1);
    return ["uploads", "imagens", ...depoisImagens].join("/");
  }

  const nomeArquivo = partes.at(-1);
  return nomeArquivo ? `uploads/imagens/${nomeArquivo}` : "";
}

export function resolveImageUrl(imagem, fallback = FALLBACK_IMAGE) {
  const valorOriginal = String(imagem || "").trim().replaceAll("\\", "/");

  if (!valorOriginal) return fallback;
  if (isExternalUrl(valorOriginal)) return valorOriginal;

  if (
    valorOriginal.startsWith("/") &&
    !valorOriginal.startsWith("/uploads") &&
    !valorOriginal.startsWith("/imagens")
  ) {
    return valorOriginal;
  }

  const uploadPath = normalizeUploadPath(valorOriginal);

  if (!uploadPath) return fallback;

  return `${API_URL}/${encodePath(uploadPath)}`;
}

export function getEntityImage(entity, fallback = FALLBACK_IMAGE) {
  const imagem =
    entity?.imagem ||
    entity?.imagem_produto ||
    entity?.url_imagem ||
    entity?.imagem_url ||
    entity?.foto ||
    entity?.img ||
    entity?.image ||
    "";

  return resolveImageUrl(imagem, fallback);
}

export function useImageFallback(event, fallback = FALLBACK_IMAGE) {
  const img = event.currentTarget;

  if (img.dataset.fallbackApplied === "true") return;

  img.dataset.fallbackApplied = "true";
  img.src = fallback;
}
