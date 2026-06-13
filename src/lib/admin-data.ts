import { properties } from "@/lib/data";

export const adminMetrics = [
  { label: "Total Properties", value: "286", trend: "+12 this month" },
  { label: "Active Listings", value: "174", trend: "+8.4%" },
  { label: "Sold Properties", value: "68", trend: "+5 closed" },
  { label: "Total Inquiries", value: "1,248", trend: "+18.2%" },
  { label: "Featured Listings", value: "24", trend: "6 scheduled" },
  { label: "Monthly Visitors", value: "42.8k", trend: "+11.6%" }
];

export const chartSeries = [
  { label: "Jan", views: 42, inquiries: 18, listings: 8 },
  { label: "Feb", views: 56, inquiries: 23, listings: 12 },
  { label: "Mar", views: 48, inquiries: 20, listings: 10 },
  { label: "Apr", views: 68, inquiries: 32, listings: 16 },
  { label: "May", views: 74, inquiries: 38, listings: 18 },
  { label: "Jun", views: 88, inquiries: 46, listings: 22 }
];

export const recentActivity = [
  "Palm Estate Villa was marked as featured.",
  "New inquiry received for Skyline Residence.",
  "Capital Business Tower was duplicated as draft.",
  "Golden Acre Plot status changed to Hot Offer.",
  "Homepage banner settings were updated."
];

export const adminProperties = properties.map((property, index) => ({
  ...property,
  id: `prop-${index + 1}`,
  dateAdded: `2026-06-${String(9 - index).padStart(2, "0")}`,
  featured: index < 3
}));

export const inquiries = [
  {
    id: "inq-1",
    customerName: "Client Name 1",
    phone: "+92 300 0000001",
    email: "client1@example.com",
    property: "Skyline Residence",
    message: "I would like to schedule a private viewing this week.",
    date: "2026-06-09",
    status: "Unread"
  },
  {
    id: "inq-2",
    customerName: "Client Name 2",
    phone: "+92 300 0000002",
    email: "client2@example.com",
    property: "Palm Estate Villa",
    message: "Please share documentation and payment details.",
    date: "2026-06-08",
    status: "Read"
  },
  {
    id: "inq-3",
    customerName: "Client Name 3",
    phone: "+92 300 0000003",
    email: "client3@example.com",
    property: "Capital Business Tower",
    message: "Interested in expected rental yield and lease demand.",
    date: "2026-06-07",
    status: "Archived"
  }
];

export const adminUsers = [
  { name: "Admin Placeholder", email: "admin@example.com", role: "Admin", createdAt: "2026-05-18" },
  { name: "Editor Placeholder", email: "editor@example.com", role: "Editor", createdAt: "2026-05-22" },
  { name: "Advisor Placeholder", email: "advisor@example.com", role: "Editor", createdAt: "2026-06-01" }
];

export const categoriesAdmin = [
  { name: "Residential", count: 148, description: "Family homes and townhouses" },
  { name: "Commercial", count: 64, description: "Offices, retail, and business spaces" },
  { name: "Apartments", count: 210, description: "Modern apartment inventory" },
  { name: "Villas", count: 42, description: "Private luxury homes" },
  { name: "Plots", count: 87, description: "Land and development parcels" }
];
