import type { Product, ProductCategory } from "@/types/product";

/**
 * Raw fixture-like dataset (from your message) converted into Product-shaped objects.
 * Important: price -> number, images -> [{url, alt}], slug, published flag, categorySlug.
 */

const RAW = [
  {
    pk: 1,
    name: "Qorii",
    price: "180.00",
    description:
      "Qorii is a traditional wooden container used for food storage and serving.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757544835/qori_poll60.png",
    category: "Home & Kitchen",
  },
  {
    pk: 2,
    name: "Madiba Shirt",
    price: "450.00",
    description:
      "A distinctive patterned shirt made popular by Nelson Mandela, symbolizing pride and unity.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757630241/Madiba_Shirt_xph6qn.jpg",
    category: "Clothing",
  },
  {
    pk: 3,
    name: "Ndebele Beaded Aprons",
    price: "60.00",
    description:
      "A vibrant apron decorated with intricate beadwork, part of Ndebele cultural attire.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757630565/Ndebele_Beaded_Aprons_2_vhqm0k.jpg",
    category: "Clothing",
  },
  {
    pk: 4,
    name: "Zulu Shield and Spear",
    price: "175.00",
    description:
      "A traditional Zulu shield and spear set, symbolizing strength, protection, and heritage.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897228/Zulu_shield_and_spear_kdoufo.jpg",
    category: "Cultural Artifact",
  },
  {
    pk: 5,
    name: "African Drum",
    price: "320.00",
    description:
      "A handcrafted African drum, perfect for music, rhythm practice, and cultural celebrations.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897514/African_drum_2_djnucc.jpg",
    category: "Musical Instrument",
  },
  {
    pk: 6,
    name: "Kente Cloth",
    price: "270.00",
    description:
      "A vibrant, multicolored hand-loomed fabric with symbolic meanings, worn by the Ashanti and Ewe people of Ghana.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897007/Kente_Cloth_Ghana_jegsjn.jpg",
    category: "Clothing",
  },
  {
    pk: 7,
    name: "Shuka (Kenya/Tanzania)",
    price: "260.00",
    description:
      "A brightly colored, checkered cloth worn by the Maasai. Often red, it is wrapped around the body.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897131/Shuka_KenyaTanzania_eswsgd.jpg",
    category: "Clothing",
  },
  {
    pk: 8,
    name: "Kanzu (Uganda/Tanzania)",
    price: "255.00",
    description:
      "A white or cream-colored robe traditionally worn by men, especially among Swahili-speaking communities.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896979/Kanzu_UgandaTanzania_p2l4wp.jpg",
    category: "Clothing",
  },
  {
    pk: 9,
    name: "Habesha Kemis (Ethiopia)",
    price: "300.00",
    description:
      "A hand-woven cotton dress with intricate embroidery, worn by Habesha women during cultural and religious events.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896771/Habesha_Kemis_Ethiopia_yi9q0h.jpg",
    category: "Clothing",
  },
  {
    pk: 10,
    name: "Gomesi (Uganda)",
    price: "280.00",
    description:
      "A brightly colored floor-length dress with pointed shoulders, traditionally worn by women in Uganda.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896753/Gomesi_Uganda_zmrj6b.jpg",
    category: "Clothing",
  },
  {
    pk: 11,
    name: "Agbada (Nigeria)",
    price: "350.00",
    description:
      "A large, flowing robe worn by Yoruba men for weddings, festivals, and special occasions.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896538/Agbada_Nigeria_bgrmhb.jpg",
    category: "Clothing",
  },
  {
    pk: 12,
    name: "Dashiki (West Africa)",
    price: "220.00",
    description:
      "A colorful, V-shaped embroidered tunic worn by both men and women across West Africa.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896623/Dashiki_West_Africa__2_yu4kbm.jpg",
    category: "Clothing",
  },
  {
    pk: 13,
    name: "Boubou (Senegal/Mali)",
    price: "230.00",
    description:
      "A flowing robe worn by both men and women across West Africa, symbolizing elegance and tradition.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896592/Boubou_SenegalMali__2_ckdphc.jpg",
    category: "Clothing",
  },
  {
    pk: 14,
    name: "Bògòlanfini (Mali)",
    price: "240.00",
    description:
      "Also known as mudcloth, this hand-woven cotton fabric is dyed with fermented mud to create symbolic designs.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896548/B%C3%B2g%C3%B2lanfini_Mali_tfocqk.jpg",
    category: "Clothing",
  },
  {
    pk: 15,
    name: "Liputa (DRC)",
    price: "260.00",
    description:
      "A vibrant four-piece ensemble of matching fabric, traditionally worn by Congolese women.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897077/Liputa_DRC_tbj1un.jpg",
    category: "Clothing",
  },
  {
    pk: 16,
    name: "Djellaba (Morocco)",
    price: "350.00",
    description:
      "A long, loose-fitting robe with a hood, commonly worn by both men and women in Morocco.",
    image_url:
      "https://res.cloudinary.com/dxmxjdval/image/upload/v1757896665/Djellaba_Morocco_fvpfz1.jpg",
    category: "Clothing",
  },
];

function makeSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Convert raw shape to the Product interface used by the UI */
export const mockProducts: Product[] = RAW.map((r) => ({
  id: String(r.pk),
  name: r.name,
  description: r.description,
  // convert price string to number (safe)
  price: Number.isFinite(Number(r.price)) ? Number(r.price) : 0,
  currency: "USD",
  stock: 10,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  // provide images array expected by UI
  images: [{ url: r.image_url, alt: r.name }],
  // keep legacy single-image key too (frontend may expect different fields)
  image_url: r.image_url,
  // slug for lookups
  slug: makeSlug(r.name),
  // category object and slug
  category: { id: makeSlug(r.category), name: r.category, slug: makeSlug(r.category) },
  categorySlug: makeSlug(r.category),
  // helpful flags
  published: true,
  // extra metadata
  metadata: { pk: r.pk },
}));

const uniqueCategories = [...new Set(RAW.map(item => item.category))];

export const mockCategories: ProductCategory[] = uniqueCategories.map((name, index) => ({
  id: String(index + 1),
  name,
  slug: makeSlug(name),
}));

export function getMockProducts(): Product[] {
  // return a shallow clone so callers can't mutate the canonical list
  return mockProducts.map((p: Product) => ({ ...p, images: p.images.slice() }));
}

export function getMockProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p: Product) => p.slug === slug || p.id === slug);
}
