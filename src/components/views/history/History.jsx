import React, { useState } from "react";
import SideBar from "../../utils/sidebar/SideBar";
import { Download, Search } from "lucide-react";
import Header from '../../utils/Header';

const dummyData = Array.from({ length: 14 }, (_, i) => ({
  no: i + 1,
  waktu: "30/05/2025 16:10:50",
  idAlat: `xxxxx-${i + 1}`,
  unit: `Plat-${(i % 5) + 1}`,
  nama: ["Pak AA", "Pak BB", "Pak CC", "Pak DD", "Pak EE"][i % 5],
  operatorId: "XX",
  jabatan: "XXXXXX",
}));

const filterOptions = ["Semua", "Hari Ini", "Minggu Ini", "Bulan Ini"];

export default function History() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [dateRange, setDateRange] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#232428] flex flex-col">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 flex flex-col py-10 px-6 bg-[#232428]">
          <h1 className="text-2xl font-bold text-white mb-6">History Data</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  className={`px-6 py-2 rounded-lg font-semibold border transition text-sm ${
                    activeFilter === opt
                      ? "bg-[#74CD25] text-white border-[#74CD25]"
                      : "bg-[#232428] text-white border-[#343538] hover:bg-[#343538]"
                  }`}
                  onClick={() => setActiveFilter(opt)}
                >
                  {opt}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-white text-sm">Minggu Ini:</span>
                <input
                  type="text"
                  placeholder="xx/xx/2xxx - xx/xx/2xxx"
                  className="rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#343538] focus:outline-none focus:ring-2 focus:ring-[#74CD25] text-sm w-44"
                  value={dateRange}
                  onChange={e => setDateRange(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#74CD25] text-white font-semibold hover:bg-[#5fa01c] transition text-sm shadow">
                <Download className="w-4 h-4" /> Download
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-lg px-3 py-2 bg-[#232428] text-white border border-[#343538] focus:outline-none focus:ring-2 focus:ring-[#74CD25] text-sm pl-10"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#74CD25] text-white">
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Waktu</th>
                  <th className="px-4 py-3 text-left">ID Alat</th>
                  <th className="px-4 py-3 text-left">Unit Kendaraan</th>
                  <th className="px-4 py-3 text-left">Nama</th>
                  <th className="px-4 py-3 text-left">Operator ID</th>
                  <th className="px-4 py-3 text-left">Jabatan</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((row) => (
                  <tr key={row.no} className="even:bg-[#2d2e32] odd:bg-[#232428] border-b border-[#343538]">
                    <td className="px-4 py-2 text-white">{row.no}</td>
                    <td className="px-4 py-2 text-white">{row.waktu}</td>
                    <td className="px-4 py-2 text-white">{row.idAlat}</td>
                    <td className="px-4 py-2 text-white">{row.unit}</td>
                    <td className="px-4 py-2 text-white">{row.nama}</td>
                    <td className="px-4 py-2 text-white">{row.operatorId}</td>
                    <td className="px-4 py-2 text-white">{row.jabatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
