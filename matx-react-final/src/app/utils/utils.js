import { differenceInSeconds, parseISO } from "date-fns";

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}
export const toYMD = (v) => {
  if (!v) return null;
  const d = typeof v === "string" ? parseISO(v) : new Date(v);
  // Lấy year-month-day theo LOCAL để tránh lệch UTC
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const yyyy = local.getFullYear();
  const mm = String(local.getMonth() + 1).padStart(2, "0");
  const dd = String(local.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // ví dụ: 2025-11-05
};
export const formatDateToDDMMYYYY = (isoString) => {
  if (!isoString) return ""; // trường hợp rỗng

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    throw new Error("Giá trị ngày không hợp lệ");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
export const formatCurrencyVND = (value) => {
  if (value == null || isNaN(value)) return "";
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
};
