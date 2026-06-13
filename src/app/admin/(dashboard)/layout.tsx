import { companyName } from "@/lib/data";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: `Admin Dashboard | ${companyName}`,
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
