import { Save } from "lucide-react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";

const companyFields = ["Company Name", "Logo", "Phone Number", "WhatsApp Number", "Email"];
const websiteFields = ["Hero Section Text", "Homepage Banners", "Footer Content"];

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Settings</p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-navy dark:text-white">Website And Company Settings</h1>
      </div>

      <form className="grid gap-6">
        <AdminCard>
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Company Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {companyFields.map((field) => (
              <label key={field} className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                {field}
                <input className="premium-input" placeholder={field} type={field === "Logo" ? "file" : "text"} />
              </label>
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Website Settings</h2>
          <div className="mt-5 grid gap-4">
            {websiteFields.map((field) => (
              <label key={field} className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                {field}
                {field === "Homepage Banners" ? (
                  <input className="premium-input" type="file" multiple />
                ) : (
                  <textarea className="premium-input min-h-28 resize-y" placeholder={field} />
                )}
              </label>
            ))}
          </div>
        </AdminCard>

        <Button type="button" className="w-full md:w-fit"><Save size={18} /> Save Settings</Button>
      </form>
    </div>
  );
}
