"use client";

import React, { useState, useMemo } from "react";
import { FLEET_DATA, Van } from "@/app/data/vans";
import {
  LayoutDashboard,
  Wrench,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  Zap
} from "lucide-react"; // Icons

export default function FleetDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); // All is allowing vans from every zone or status to be displayed without restriction.
  const [selectedBattery, setSelectedBattery] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Miller's Law (7 ± 2)


  // Filtered dataset
  // useMemo usage is to perform search and filter logic across Fleet_Data
  const filteredVans = useMemo(() => {
    return FLEET_DATA.filter((van) => {
      // Checks if the search text appears in the van's ID or driver name
      const matchesSearch = 
        van.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        van.driver.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
        van.model.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
        (van.issueNote && van.issueNote.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesZone = selectedZone === "All" || van.zone === selectedZone;
      const matchesStatus = selectedStatus === "All" || van.status === selectedStatus;
      
      let matchesBattery = true;
      if (selectedBattery === "< 20%") matchesBattery = van.battery < 20;
      else if (selectedBattery === "20 - 50%")
        matchesBattery = van.battery >= 20 && van.battery <= 50;
      else if (selectedBattery === "> 50%") matchesBattery = van.battery > 50;


      return matchesSearch && matchesZone && matchesStatus && matchesBattery;

    });
  }, [searchQuery, selectedZone, selectedStatus, selectedBattery]);

  // Pagination
  const totalPages = Math.ceil(filteredVans.length / itemsPerPage) || 1;
  const paginatedVans = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVans.slice(start, start + itemsPerPage);
  }, [filteredVans, currentPage]);

  // Key Statistics
  const totalVans = FLEET_DATA.length;
  const brokenDownCount = FLEET_DATA.filter((v) => v.status === "Broken Down").length;
  const lowBatteryCount = FLEET_DATA.filter((v) => v.battery < 20).length;
  const needsServiceCount = FLEET_DATA.filter((v) => v.status === "Needs Service").length;
  const operationalCount = FLEET_DATA.filter((v) => v.status === "Operational").length;
  const avgBattery = Math.round(
    FLEET_DATA.reduce((acc, v) => acc +v.battery, 0) / totalVans
  );


  return (
    <div className="flex h-screen bg-[#0B0F19] text-slate-200 font-sans antialiased overflow-hidden">
      {/* 1. Left Sidebar Navigation*/}
      <aside className="w-16 bg-[#0e1322] border-r border-slate-800/80 flex flex-col justify-between items-center py-5 z-20">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 font-bold">
            <Zap className="w-5 h-5"/>
          </div>
          <nav className="flex flex-col gap-3">
            <button className="p-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <LayoutDashboard className="w-5 h-5"/>
            </button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition">
              <Wrench className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition">
              <Users className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition">
              <BarChart3 className="w-5 h-5" />
            </button>
          </nav>
        </div>
        <div className="flex flex-col gap-3">
          <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 transition">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/*2. Top Header Bar */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0E1322]/50 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Fleet Dashboard</h1>
            <p className="text-xs text-slate-400">Tuesday, 21 July 2026</p>          
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SYSTEM LIVE • SYNCED 10s AGO
            </div>
            <div className="hidden md:flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 px-3 py-1.5 rounded-full text-xs text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Morning Dispatch Shift
            </div>
          </div>
            {/* notification button   */}
            <button className="relative p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-700/60 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                YK
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-white leading-tight">Yusuf K.</p>
                <p className="text-[10px] text-slate-400">Operator</p>
              </div>
            </div>

        </header>

        <main className="p-8 space-y-6 max-w-[1600px] mx-auto w-full">
          {/* 3. Top Metric Cards  */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Vans */}
            <div className="bg-[#121827] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vans</p>
              <p className="text-4xl font-extrabold text-white mt-2">{totalVans}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Active fleet</p> 
            </div>
            {/* Broken Down */}
            <div className="bg-[#121827] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Broken Down</p>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <p className="text-4xl font-extrabold text-red-500 mt-2">{brokenDownCount}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Require immediate attention</p>
            </div>
            {/* Low Battery */}
            <div className="bg-[#121827] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Low Battery ⚡</p>
              <p className="text-4xl font-extrabold text-amber-500 mt-2">{lowBatteryCount}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">Under 20% charge</p>
            </div>

            {/* Avg Battery */}
            <div className="bg-[#121827] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Battery</p>
              <p className="text-4xl font-extrabold text-emerald-400 mt-2">{avgBattery}%</p>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${avgBattery}%` }} />
              </div>
            </div>  
          </section>

          {/* 4. Middle Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Needs Attention Alert Box */}
            <div className="lg:col-span-2 bg-[#121827] border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Needs Attention <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] ml-1">3</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* VAN-07 */}
                <div className="bg-[#182032] border border-red-900/50 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-extrabold text-red-400">VAN-07</p>
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-1">🔴 Broken Down</p>
                    <p className="text-xs text-slate-400 mt-0.5">Khaled Wael</p>
                    <p className="text-[11px] text-slate-500 mt-2">📍 South Zone</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-bold text-red-400">12%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "12%" }} />
                    </div>
                  </div>
                </div>

                {/* VAN-28 */}
                <div className="bg-[#182032] border border-red-900/50 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-extrabold text-red-400">VAN-28</p>
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </div>
                    <p className="text-xs font-semibold text-slate-200 mt-1">🔴 Broken Down</p>
                    <p className="text-xs text-slate-400 mt-0.5">Sherif Nabil</p>
                    <p className="text-[11px] text-slate-500 mt-2">📍 South Zone</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-bold text-red-400">8%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "8%" }} />
                    </div>
                  </div>
                </div>

                {/* VAN-40 */}
                <div className="bg-[#182032] border border-amber-900/50 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-extrabold text-amber-400">VAN-40</p>
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="text-xs font-semibold text-amber-400 mt-1">⚡ Critical Battery — 9%</p>
                    <p className="text-xs text-slate-400 mt-0.5">Hazem Fekry</p>
                    <p className="text-[11px] text-slate-500 mt-2">📍 West Zone</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-bold text-amber-400">9%</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "9%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Status Visualization */}
            <div className="bg-[#121827] border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fleet Status</p>

              <div className="flex items-center justify-center my-4">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Operational (Green) */}
                    <path
                      className="text-emerald-500"
                      strokeDasharray="67.5, 100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    {/* Needs Service (Amber) */}
                    <path
                      className="text-amber-500"
                      strokeDasharray="22.5, 100"
                      strokeDashoffset="-67.5"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Broken Down (Red) */}
                    <path
                      className="text-red-500"
                      strokeDasharray="10, 100"
                      strokeDashoffset="-90"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    </svg>

                    <div className="absolute text-center">
                      <p className="text-2xl font-black text-white leading-none">40</p>
                      <p className="text-[10px] font-bold text-slate-400 tracking-wider">VANS</p>
                    </div>

                </div>

              </div>

              {/* Counter of the status in the Donut Chart */}
              <div className="space-y-2 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Operational
                  </span>
                  <span className="font-bold text-white">{operationalCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Service
                  </span>
                  <span className="font-bold text-white">{needsServiceCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Broken Down
                  </span>
                  <span className="font-bold text-white">{brokenDownCount}</span>
                </div>
              </div>
            
            </div>
          </section>

          {/* 5. Filter Toolbar */}
          <section className="bg-[#121827] border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search van ID or driver..."
                value={searchQuery}
                onChange= {(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#182032] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Status filter group  [ Operational , Broke Down , .....]*/}
              <div className="bg-[#182032] p-1 rounded-xl flex items-center gap-1 border border-slate-800">
                {["All", "Operational", "Needs Service", "Broken Down"].map((status) =>(
                  <button
                  key ={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setCurrentPage(1);
                  }}

                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                      selectedStatus === status
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {status}

                  </button>
                ))}
              </div>


            {/* Battery Filter Group */}
            <div className="bg-[#182032] p-1 rounded-xl flex items-center gap-1 border border-slate-800">
              {["All Battery", "< 20%", "20 - 50%", "> 50%"].map((batt) => {
                const key = batt === "All Battery" ? "All" :batt;
                return (
                  <button
                  key={batt}
                      onClick={() => {
                        setSelectedBattery(key);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition ${
                        selectedBattery === key
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    {batt}

                  </button>
                );
              })}
            </div>

            {/* Zone Dropdown */}
            <div className="relative">
              <select
                value={selectedZone}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-[#182032] border border-slate-800 text-slate-300 text-xs font-medium px-3 py-2 pr-8 rounded-xl appearance-none focus:outline-none cursor-pointer"
              >
                <option value="All">📍 All Zones</option>
                  <option value="North">North Zone</option>
                  <option value="Central">Central Zone</option>
                  <option value="South">South Zone</option>
                  <option value="East">East Zone</option>
                  <option value="West">West Zone</option>
                </select> 
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>
            </div>
          </section>

          {/* 6. Main Data Table */}
          <section className="bg-[#121827] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 text-xs">
                  <span className="font-bold text-white">{filteredVans.length} vans</span>
                  <span className="bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded-md font-bold">
                    🔴 {brokenDownCount} broken
                  </span>
                  <span className="bg-amber-950 text-amber-400 border border-amber-800 px-2 py-0.5 rounded-md font-bold">
                    ⚡ {lowBatteryCount} low battery
                  </span>
              </div>

              <div className="overflow-x-auto">
                {/* Header of the  Vans table */}
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0E1322] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                    <th className="p-4">Van ID</th>
                    <th className="p-4">Driver</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Battery</th>
                    <th className="p-4">Zone</th>
                    <th className="p-4">Last Checked</th>
                    </tr>
                  </thead>

                  {/* Content of the Vans table */}
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {paginatedVans.map((van) => (
                      <tr key={van.id} className="hover:bg-slate-800/30 transition" >
                        <td className="p-4 font-extrabold text-white">{van.id}</td>
                        <td className="p-4 text-slate-300">{van.driver}</td>
                        <td className="p-4">

                          {van.status === "Broken Down" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-950/80 text-red-400 border border-red-900/60">
                            🔴 ✖ Broken Down
                            </span>
                          )}

                          {van.status === "Needs Service" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-400 border border-amber-900/60">
                            ⚠️ Needs Service
                          </span>
                        )}

                          {van.status === "Operational" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-900/60">
                            🟢 Operational
                          </span>
                        )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-bold ${
                              van.battery < 20
                                ? "text-red-400"
                                : van.battery <= 50
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                            >
                              {van.battery}
                            </span>
                            <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full ${
                                  van.battery < 20
                                    ? "bg-red-500"
                                    : van.battery <= 50
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                                style={{ width: `${van.battery}%` }}
                              />
                              </div>

                              {/* Critical Badge */}
                              {van.battery < 10 && (
                                <span className="bg-red-900 text-red-200 border border-red-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                  ⚡ CRITICAL
                                </span>
                              )}
                              {van.battery >= 10 && van.battery < 20 && (
                                <span className="bg-amber-900 text-amber-200 border border-amber-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                                  ⚡ LOW
                                </span>
                              )}

                            </div>
                        </td>

                        <td className="p-4 text-slate-300">{van.zone}</td>
                        <td className="p-4 text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {van.lastChecked.split(" ")[1] || van.lastChecked}
                      </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="bg-[#0E1322] px-6 py-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <p>
                  Showing <span className="font-bold text-white">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredVans.length)} </span> of{" "}
                  <span className="font-bold text-white">{filteredVans.length}</span> vans
                </p>

                <div className="flex items-center gap-1" >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled= {currentPage === 1}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-semibold"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  {Array.from({ length: totalPages}, (_, i) => i + 1).map((page) =>(
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-lg font-bold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800/60 text-slate-400 hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                  ))}

                  <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-semibold"
                  >
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
                </div>
              </div>
          </section>
        </main>
      </div>
    </div>
    
  );
}