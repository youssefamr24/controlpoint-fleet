"use client";

import React, { useState, useMemo } from "react";
import { FLEET_DATA, Van } from "@/app/data/vans";
import {
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  RefreshCw,
  Wrench
} from "lucide-react"; // Icons

export default function FleetDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); // All is allowing vans from every zone or status to be displayed without restriction.
  const [currentPage, setCurrentPage] = useState("");
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
      const matchesStatus =
        selectedStatus === "All" || van.status === selectedStatus;
      
      return matchesSearch && matchesZone && matchesStatus;

    });
  }, [searchQuery, selectedZone, selectedStatus]);










}