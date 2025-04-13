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
