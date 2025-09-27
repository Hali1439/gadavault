// lib/productUtils.ts
export type AnyProductLike = Record<string, any>;


export function resolveMainImage(obj?: AnyProductLike) {
const fallback = { url: "/placeholder.jpg", alt: "Product image" };
if (!obj) return fallback;


// 1) images array
const imgs = obj.images;
if (Array.isArray(imgs) && imgs.length > 0) {
const first = imgs[0];
if (first && (first.url || first.src)) {
return { url: first.url ?? first.src, alt: first.alt ?? obj.name ?? fallback.alt };
}
}


// 2) nested image object
if (obj.image && typeof obj.image === "object") {
if (obj.image.url || obj.image.src) {
return { url: obj.image.url ?? obj.image.src, alt: obj.image.alt ?? obj.name ?? fallback.alt };
}
}


// 3) common string fields
if (typeof obj.image_url === "string" && obj.image_url.trim()) {
return { url: obj.image_url, alt: obj.name ?? fallback.alt };
}
if (typeof obj.imageUrl === "string" && obj.imageUrl.trim()) {
return { url: obj.imageUrl, alt: obj.name ?? fallback.alt };
}
if (typeof obj.image === "string" && obj.image.trim()) {
return { url: obj.image, alt: obj.name ?? fallback.alt };
}


// 4) fallback
return fallback;
}


export function toNumber(v: unknown, fallback = 0): number {
if (typeof v === "number") return Number.isFinite(v) ? v : fallback;
if (typeof v === "string" && v.trim() !== "") {
const n = Number(v);
return Number.isFinite(n) ? n : fallback;
}
return fallback;
}


export function formatPrice(v: unknown, digits = 2): string {
return toNumber(v).toFixed(digits);
}