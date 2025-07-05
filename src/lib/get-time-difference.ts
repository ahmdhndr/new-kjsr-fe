export function getTimeDifference(futureDate: Date): string {
  const today = new Date();

  // Hapus informasi waktu untuk perbandingan hanya berdasarkan tanggal
  today.setHours(0, 0, 0, 0);
  futureDate.setHours(0, 0, 0, 0);

  // Jika tanggal sama persis
  if (today.getTime() === futureDate.getTime()) {
    return "Sedang berlangsung";
  }

  // Jika tanggal sudah lewat
  if (today > futureDate) {
    return "Selesai";
  }

  // Hitung selisih bulan
  let monthsDiff = (futureDate.getFullYear() - today.getFullYear()) * 12;
  monthsDiff += futureDate.getMonth() - today.getMonth();

  // Jika bulan sudah tiba, hitung selisih hari saja
  if (monthsDiff === 0) {
    const daysDiff = Math.ceil(
      (futureDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${daysDiff} hari lagi`;
  }

  // Hitung sisa hari setelah bulan
  const tempDate = new Date(today);
  tempDate.setMonth(today.getMonth() + monthsDiff);
  const daysDiff = Math.ceil(
    (futureDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Pastikan daysDiff tidak negatif
  return `${monthsDiff} bulan ${Math.max(0, daysDiff)} hari lagi`;
}
