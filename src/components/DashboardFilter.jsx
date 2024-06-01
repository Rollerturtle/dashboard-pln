// const useFilterData = (data, defaultUnit, defaultYear, section) => {
//     const [unitFilter, setUnitFilter] = useState(defaultUnit);
//     const [yearFilter, setYearFilter] = useState(defaultYear);
  
//     // Fungsi untuk memfilter data
//     const filteredData = useMemo(() => {
//       return data.filter(item => 
//         (item.Bagian === section) &&
//         (unitFilter ? item.Unit === unitFilter : true) &&
//         (yearFilter ? item.Tahun === yearFilter : true)
//       );
//     }, [data, unitFilter, yearFilter, section]);
  
//     // Fungsi untuk memperoleh unit dan tahun unik dari data yang sudah difilter berdasarkan section
//     const unitOptions = useMemo(() => [...new Set(filteredData.map(item => item.Unit))], [filteredData]);
//     const yearOptions = useMemo(() => [...new Set(filteredData.map(item => item.Tahun))], [filteredData]);
  
//     return { 
//       unitFilter, setUnitFilter,
//       yearFilter, setYearFilter,
//       filteredData, 
//       unitOptions, 
//       yearOptions
//     };
//   };
  
//   export default useFilterData;
  