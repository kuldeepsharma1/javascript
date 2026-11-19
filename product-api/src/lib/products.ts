
import "server-only";

const API_URL = "https://dummyjson.com/products";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

function isRecord(
  value: unknown
): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseProduct(value: unknown): Product {
  if (!isRecord(value)) {
    throw new Error("Invalid product");
  }

  const {
    id,
    title,
    description,
    price,
    rating,
    stock,
    category,
    thumbnail,
  } = value;

  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    typeof rating !== "number" ||
    !Number.isFinite(rating) ||
    typeof stock !== "number" ||
    typeof category !== "string" ||
    typeof thumbnail !== "string"
  ) {
    throw new Error("Invalid product data");
  }

  const imageUrl = new URL(thumbnail);

  if (
    imageUrl.protocol !== "https:" ||
    !["cdn.dummyjson.com", "i.dummyjson.com"].includes(
      imageUrl.hostname
    )
  ) {
    throw new Error("Untrusted image URL");
  }

  return {
    id,
    title,
    description,
    price,
    rating,
    stock,
    category,
    thumbnail,
  };
}

export async function getProducts({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ProductResponse> {
  const skip = (page - 1) * limit;

  try {
    const url = new URL(API_URL);

    url.searchParams.set("limit", String(limit));
    url.searchParams.set("skip", String(skip));

    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 300,
        tags: ["products"],
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: unknown = await response.json();

    if (
      !isRecord(data) ||
      !Array.isArray(data.products) ||
      typeof data.total !== "number" ||
      typeof data.skip !== "number" ||
      typeof data.limit !== "number" ||
      !Number.isInteger(data.total) ||
      data.total < 0
    ) {
      throw new Error("Invalid API response");
    }

    return {
      products: data.products.map(parseProduct),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  } catch (error) {
    console.error("Product API failure:", error);

    throw new Error("Unable to load products.");
  }
}
