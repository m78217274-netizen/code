"use client";

import Image from "next/image";
import {
  AlignLeft,
  Bold,
  Check,
  GripVertical,
  Heading2,
  ImagePlus,
  Italic,
  List,
  MapPin,
  Save,
  Send,
  Trash2
} from "lucide-react";
import { DragEvent, useMemo, useRef, useState } from "react";
import { Button } from "@/components/button";
import { AdminCard } from "@/components/admin/admin-card";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const amenities = [
  "Security",
  "Electricity",
  "Water",
  "Internet",
  "Garden",
  "Pool",
  "Gym",
  "Elevator",
  "Parking",
  "CCTV",
  "Backup Generator"
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type UploadPreview = {
  id: string;
  file: File;
  url: string;
};

export function PropertyEditor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<UploadPreview[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["Security", "Electricity", "Water", "Parking"]);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const coverImage = images[0];

  const imageCountText = useMemo(() => `${images.length}/20 images`, [images.length]);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    const nextFiles = Array.from(fileList)
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, Math.max(20 - images.length, 0))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        url: URL.createObjectURL(file)
      }));

    setImages((current) => [...current, ...nextFiles].slice(0, 20));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  function removeImage(id: string) {
    setImages((current) => current.filter((image) => image.id !== id));
  }

  function moveImage(id: string, direction: -1 | 1) {
    setImages((current) => {
      const index = current.findIndex((image) => image.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      const [item] = copy.splice(index, 1);
      copy.splice(nextIndex, 0, item);
      return copy;
    });
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  }

  function applyFormat(format: "bold" | "italic" | "bullet" | "heading") {
    const snippets = {
      bold: "<strong>Important detail</strong>",
      italic: "<em>Highlighted note</em>",
      bullet: "<ul><li>Premium feature</li><li>Verified documentation</li></ul>",
      heading: "<h2>Property Highlights</h2>"
    };
    setDescription((current) => `${current}${current ? "\n" : ""}${snippets[format]}`);
  }

  async function saveProperty(status: "Draft" | "For Sale") {
    setMessage("");

    try {
      const form = document.querySelector<HTMLFormElement>("#property-editor-form");
      const formData = new FormData(form ?? undefined);
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const uploadedUrls: string[] = [];
      for (const [index, image] of images.entries()) {
        const filePath = `${user?.id ?? "admin"}/${Date.now()}-${index}-${image.file.name}`;
        const { error } = await supabase.storage
          .from("property-images")
          .upload(filePath, image.file, { upsert: false });

        if (error) throw error;
        const { data } = supabase.storage.from("property-images").getPublicUrl(filePath);
        uploadedUrls.push(data.publicUrl);
      }

      const { data: property, error } = await supabase
        .from("properties")
        .insert({
          title: String(formData.get("title") ?? ""),
          slug: slugify(String(formData.get("title") ?? "")) || crypto.randomUUID(),
          property_type: String(formData.get("property_type") ?? ""),
          status,
          price: Number(formData.get("price") ?? 0),
          location: String(formData.get("location") ?? ""),
          city: String(formData.get("city") ?? ""),
          area: String(formData.get("area") ?? ""),
          bedrooms: Number(formData.get("bedrooms") ?? 0),
          bathrooms: Number(formData.get("bathrooms") ?? 0),
          kitchens: Number(formData.get("kitchens") ?? 0),
          floors: Number(formData.get("floors") ?? 0),
          parking_spaces: Number(formData.get("parking_spaces") ?? 0),
          description,
          amenities: selectedAmenities,
          address: String(formData.get("address") ?? ""),
          latitude: Number(formData.get("latitude") ?? 0),
          longitude: Number(formData.get("longitude") ?? 0),
          cover_image_url: uploadedUrls[0] ?? null,
          created_by: user?.id
        })
        .select("id")
        .single();

      if (error) throw error;

      if (property && uploadedUrls.length) {
        await supabase.from("property_images").insert(
          uploadedUrls.map((imageUrl, index) => ({
            property_id: property.id,
            image_url: imageUrl,
            sort_order: index
          }))
        );
      }

      setMessage(status === "Draft" ? "Draft saved successfully." : "Property published and available to the public site.");
    } catch {
      setMessage("Preview saved locally. Configure Supabase keys to enable database publishing.");
    }
  }

  return (
    <form id="property-editor-form" className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Basic Information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white md:col-span-2">
                Property Title
                <input name="title" className="premium-input" placeholder="Modern villa with private garden" required />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Property Type
                <select name="property_type" className="premium-select" defaultValue="Residential">
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Luxury Home</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Status
                <select name="status" className="premium-select" defaultValue="For Sale">
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Sold</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Price
                <input name="price" className="premium-input" placeholder="1250000" type="number" min={0} />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Location
                <input name="location" className="premium-input" placeholder="Downtown Waterfront" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                City
                <input name="city" className="premium-input" placeholder="City" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Area
                <input name="area" className="premium-input" placeholder="3,250 sq ft" />
              </label>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Property Details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ["Bedrooms", "bedrooms"],
                ["Bathrooms", "bathrooms"],
                ["Kitchens", "kitchens"],
                ["Floors", "floors"],
                ["Parking Spaces", "parking_spaces"]
              ].map(([label, name]) => (
                <label key={name} className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                  {label}
                  <input name={name} className="premium-input" type="number" min={0} defaultValue={0} />
                </label>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Description</h2>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => applyFormat("bold")} className="focus-ring rounded-lg border border-line p-2 dark:border-white/10" aria-label="Bold"><Bold size={17} /></button>
                <button type="button" onClick={() => applyFormat("italic")} className="focus-ring rounded-lg border border-line p-2 dark:border-white/10" aria-label="Italics"><Italic size={17} /></button>
                <button type="button" onClick={() => applyFormat("bullet")} className="focus-ring rounded-lg border border-line p-2 dark:border-white/10" aria-label="Bullet list"><List size={17} /></button>
                <button type="button" onClick={() => applyFormat("heading")} className="focus-ring rounded-lg border border-line p-2 dark:border-white/10" aria-label="Heading"><Heading2 size={17} /></button>
              </div>
            </div>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="premium-input mt-5 min-h-56 resize-y"
              placeholder="Write a polished property description with highlights, documentation notes, and buyer appeal."
            />
            <p className="mt-3 flex items-center gap-2 text-sm text-muted dark:text-slate-300">
              <AlignLeft size={16} /> Supports rich text markup for bold, italics, headings, and lists.
            </p>
          </AdminCard>

          <AdminCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Image Upload System</h2>
              <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white dark:bg-gold dark:text-navy">{imageCountText}</span>
            </div>
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              className="mt-5 grid min-h-52 place-items-center rounded-lg border-2 border-dashed border-line bg-paper p-6 text-center dark:border-white/15 dark:bg-navy"
            >
              <input ref={inputRef} onChange={(event) => addFiles(event.target.files)} type="file" accept="image/*" multiple className="hidden" />
              <div>
                <ImagePlus className="mx-auto mb-4 text-gold" size={42} />
                <p className="font-heading text-lg font-bold text-navy dark:text-white">Drag and drop property images</p>
                <p className="mt-2 text-sm text-muted dark:text-slate-300">Upload up to 20 images. The first image becomes the cover image.</p>
                <Button type="button" variant="outline" className="mt-5" onClick={() => inputRef.current?.click()}>
                  Choose Images
                </Button>
              </div>
            </div>
            {images.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image, index) => (
                  <div key={image.id} className="rounded-lg border border-line bg-white p-3 dark:border-white/10 dark:bg-white/5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src={image.url} alt={image.file.name} fill sizes="240px" className="object-cover" />
                      {index === 0 ? (
                        <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">Cover</span>
                      ) : null}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <button type="button" className="focus-ring rounded-lg p-2 text-muted" aria-label="Reorder image"><GripVertical size={17} /></button>
                      <div className="flex gap-1">
                        <button type="button" onClick={() => moveImage(image.id, -1)} className="rounded-lg px-2 py-1 text-xs font-bold text-muted hover:text-royal">Up</button>
                        <button type="button" onClick={() => moveImage(image.id, 1)} className="rounded-lg px-2 py-1 text-xs font-bold text-muted hover:text-royal">Down</button>
                      </div>
                      <button type="button" onClick={() => removeImage(image.id)} className="focus-ring rounded-lg p-2 text-red-600" aria-label="Delete image"><Trash2 size={17} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </AdminCard>

          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Map Integration</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white md:col-span-3">
                Address
                <input name="address" className="premium-input" placeholder="Enter full property address" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Latitude
                <input name="latitude" className="premium-input" placeholder="24.8607" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy dark:text-white">
                Longitude
                <input name="longitude" className="premium-input" placeholder="67.0011" />
              </label>
              <Button type="button" variant="outline" className="self-end"><MapPin size={17} /> Select on Map</Button>
            </div>
            <div className="mt-5 grid min-h-64 place-items-center rounded-lg border border-dashed border-line bg-paper text-center dark:border-white/15 dark:bg-navy">
              <div>
                <MapPin className="mx-auto mb-4 text-gold" size={36} />
                <p className="font-heading text-lg font-bold text-navy dark:text-white">Map preview placeholder</p>
                <p className="mt-2 text-sm text-muted dark:text-slate-300">Coordinates will be saved with the listing.</p>
              </div>
            </div>
          </AdminCard>
        </div>

        <aside className="grid h-fit gap-6 xl:sticky xl:top-28">
          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Publishing Controls</h2>
            <div className="mt-5 grid gap-3">
              <Button type="button" variant="outline" onClick={() => saveProperty("Draft")}><Save size={18} /> Save Draft</Button>
              <Button type="button" variant="secondary" className="border border-line dark:border-white/10">Preview</Button>
              <Button type="button" onClick={() => saveProperty("For Sale")}><Send size={18} /> Publish Property</Button>
            </div>
            {message ? (
              <p className="mt-5 rounded-lg bg-paper p-4 text-sm font-semibold text-muted dark:bg-navy dark:text-slate-300">{message}</p>
            ) : null}
          </AdminCard>

          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Amenities Selection</h2>
            <div className="mt-5 grid gap-3">
              {amenities.map((amenity) => {
                const active = selectedAmenities.includes(amenity);
                return (
                  <label key={amenity} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-line p-3 text-sm font-semibold text-navy dark:border-white/10 dark:text-white">
                    <span>{amenity}</span>
                    <input type="checkbox" checked={active} onChange={() => toggleAmenity(amenity)} className="sr-only" />
                    <span className={`grid h-6 w-6 place-items-center rounded-md border ${active ? "border-gold bg-gold text-navy" : "border-line dark:border-white/20"}`}>
                      {active ? <Check size={15} /> : null}
                    </span>
                  </label>
                );
              })}
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Live Preview</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-line dark:border-white/10">
              <div className="relative aspect-[4/3] bg-paper dark:bg-navy">
                {coverImage ? (
                  <Image src={coverImage.url} alt="Cover image preview" fill sizes="360px" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-center text-sm text-muted dark:text-slate-300">Cover image preview</div>
                )}
              </div>
              <div className="p-4">
                <p className="font-heading text-lg font-bold text-navy dark:text-white">Property card preview</p>
                <p className="mt-2 text-sm text-muted dark:text-slate-300">Published properties appear immediately on public listing pages.</p>
              </div>
            </div>
          </AdminCard>
        </aside>
      </div>
    </form>
  );
}
