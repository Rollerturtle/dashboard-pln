import { useMemo } from 'react';
import { NewMockData } from "../../../data/NewMockData";

export const useOrderData = () => {
  const data = useMemo(() => {
    return NewMockData.filter(item => item.Bagian === "Penjualan");
  }, []);

  const years = useMemo(() => {
    return [...new Set(data.map(item => item.Tahun))].sort();
  }, [data]);

  const monthlyAverages = useMemo(() => {
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return months.map(month => {
      const monthData = data.filter(item => item.Bulan === month);
      const average = monthData.reduce((acc, curr) => acc + curr.Realisasi, 0) / monthData.length || 0;
      return { month, average };
    });
  }, [data]);

  const janValue = monthlyAverages[0].average;
  const decValue = monthlyAverages[11].average;
  const diffValue = decValue - janValue;
  const diffPercentage = ((diffValue / janValue) * 100).toFixed(2);

  return {
    firstYear: years[0],
    lastYear: years[years.length - 1],
    monthlyAverages,
    janValue,
    decValue,
    diffValue: diffValue.toFixed(2),
    diffPercentage
  };
};

