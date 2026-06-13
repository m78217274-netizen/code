import { ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { adminUsers } from "@/lib/admin-data";

export default function UsersPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Users</p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Administrator Access</h1>
        </div>
        <Button><UserPlus size={18} /> Invite User</Button>
      </div>

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-paper text-sm text-muted dark:bg-navy dark:text-slate-300">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Created At</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line dark:divide-white/10">
              {adminUsers.map((user) => (
                <tr key={user.email}>
                  <td className="px-5 py-4 font-heading font-bold text-navy dark:text-white">{user.name}</td>
                  <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
                      <ShieldCheck size={14} /> {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted dark:text-slate-300">{user.createdAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Button variant="outline" className="px-3">Edit</Button>
                      <Button variant="outline" className="px-3 text-red-600">Remove</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
