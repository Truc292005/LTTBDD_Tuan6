import { Phone, ColorKey } from "../types";

export const API_URL =
  "https://6ad1865faddc5b5cb14308f2.mockapi.io/api/phones";

const validColors: ColorKey[] = ["silver", "red", "black", "blue"];

function normalizePhone(item: any, index: number): Phone {
  const colorsFromApi = Array.isArray(item.colors)
    ? item.colors.filter((c: string) => validColors.includes(c as ColorKey))
    : [];

  const defaultColor = validColors.includes(item.defaultColor)
    ? item.defaultColor
    : "blue";

  return {
    id: String(item.id ?? index + 1),
    name: String(item.name ?? "Điện thoại"),
    price: Number(item.price ?? 0),
    oldPrice: Number(item.oldPrice ?? item.price ?? 0),
    rating: Math.max(0, Math.min(5, Number(item.rating ?? 0))),
    reviewCount: Number(item.reviewCount ?? 0),
    supplier: String(item.supplier ?? "Chưa cập nhật"),
    badge: String(item.badge ?? ""),
    colors: colorsFromApi.length > 0 ? colorsFromApi : validColors,
    defaultColor: defaultColor as ColorKey,
  };
}

export async function fetchPhones(): Promise<Phone[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Lỗi máy chủ: ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Dữ liệu API không đúng định dạng danh sách.");
  }

  return data.map((item, index) => normalizePhone(item, index));
}

export async function fetchPhone(id: string): Promise<Phone> {
  const phones = await fetchPhones();
  const phone = phones.find((item) => item.id === id);

  if (!phone) {
    throw new Error(`Không tìm thấy sản phẩm có mã ${id}`);
  }

  return phone;
}