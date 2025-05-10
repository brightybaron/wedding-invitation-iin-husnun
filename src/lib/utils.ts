export const fullDateFormatter = (dateStr: string) => {
  const date = new Date(dateStr);

  const formatter = new Intl.DateTimeFormat("id-ID", {
    weekday: "long", // Menambahkan nama hari lengkap
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};

export const dayDateFormatter = (date: Date) => {
  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  // Mendapatkan indeks hari (0-6)
  const dayIndex = date.getDay();

  // Mengembalikan nama hari
  return daysOfWeek[dayIndex];
};

export const dateNumberFormatter = (date: Date) => {
  return date.getDate();
};

export const monthDateFormatter = (date: Date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Mendapatkan indeks bulan (0-11)
  const monthIndex = date.getMonth();

  // Mengembalikan nama bulan
  return months[monthIndex];
};

export const yearDateFormatter = (date: Date) => {
  return date.getFullYear();
};

export interface Base64EncodeOptions {
  encodeEachLineSeparately?: boolean;
  splitInto76CharChunks?: boolean;
  urlSafeEncoding?: boolean;
}

export function encodeToBase64(data: string, options: Base64EncodeOptions = {}): string {
  const {
    encodeEachLineSeparately = false,
    splitInto76CharChunks = false,
    urlSafeEncoding = false,
  } = options;

  let result: string;

  if (encodeEachLineSeparately) {
    const lines = data.split(/\r?\n/);
    result = lines.map(line => btoa(line)).join('\n');
  } else {
    result = btoa(data);
  }

  if (splitInto76CharChunks) {
    const chunks = [];
    for (let i = 0; i < result.length; i += 76) {
      chunks.push(result.substring(i, i + 76));
    }
    result = chunks.join('\n');
  }

  if (urlSafeEncoding) {
    result = result.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  return result;
}


export interface Base64DecodeOptions {
  decodeEachLineSeparately?: boolean;
  urlSafeEncoding?: boolean;
}

export function decodeFromBase64(encoded: string, options: Base64DecodeOptions = {}): string {
  const {
    decodeEachLineSeparately = false,
    urlSafeEncoding = false,
  } = options;

  let normalized = encoded;

  if (urlSafeEncoding) {
    normalized = normalized
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Pad with '=' to ensure it's a valid Base64 string
    const padding = normalized.length % 4;
    if (padding > 0) {
      normalized += '='.repeat(4 - padding);
    }
  }

  let result: string;

  if (decodeEachLineSeparately) {
    const lines = normalized.split(/\r?\n/);
    result = lines.map(line => atob(line)).join('\n');
  } else {
    result = atob(normalized);
  }

  return result;
}