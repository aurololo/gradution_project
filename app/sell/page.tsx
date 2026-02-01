"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SkeuomorphicButton from "@/components/skeuomorphic-button";
import { Camera, Upload, X } from "lucide-react";

const categories = [
  "DENIM",
  "TOPS",
  "BOTTOMS",
  "OUTERWEAR",
  "FOOTWEAR",
  "ETHNIC",
  "ACCESSORIES",
];

const conditions = [
  { value: "new", label: "New" },
  { value: "like_new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export default function SellPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    condition: "good",
    size: "",
    brand: "",
    location: "",
    swapPreferred: false,
  });
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in to list a product");
      setLoading(false);
      router.push("/login");
      return;
    }

    const { error: insertError } = await supabase
      .from("products")
      .insert({
        seller_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        original_price: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        condition: formData.condition,
        size: formData.size || null,
        brand: formData.brand || null,
        location: formData.location || null,
        swap_preferred: formData.swapPreferred,
        images: images,
        status: "active",
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
    } else {
      router.push("/shop");
    }
  };

  return (
    <main className="min-h-screen bg-background pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
            LIST YOUR
            <br />
            <span className="text-primary">FIT</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Turn your closet into cash. List in seconds, reach thousands.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-destructive/10 border-2 border-destructive text-destructive text-sm font-mono">
              {error}
            </div>
          )}

          {/* Images */}
          <div className="border-2 border-steel bg-concrete p-6">
            <label className="text-sm font-mono uppercase tracking-wider text-foreground mb-4 block">
              Photos
            </label>
            <div className="grid grid-cols-4 gap-4 mb-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square border border-steel bg-background">
                  <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 p-1 bg-background/90 border border-destructive text-destructive hover:bg-destructive hover:text-foreground transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <label className="aspect-square border-2 border-dashed border-steel bg-background flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground font-mono">Add Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {images.length === 0 && (
              <p className="text-xs text-muted-foreground">Add at least one photo</p>
            )}
          </div>

          {/* Basic Info */}
          <div className="border-2 border-steel bg-concrete p-6 space-y-6">
            <div>
              <label htmlFor="title" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                placeholder="e.g., Vintage Levis 501"
              />
            </div>

            <div>
              <label htmlFor="description" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all resize-none"
                placeholder="Describe your item..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="condition" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Condition *
                </label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                >
                  {conditions.map((cond) => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="size" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Size
                </label>
                <input
                  id="size"
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="M, L, XL, etc."
                />
              </div>

              <div>
                <label htmlFor="brand" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Brand
                </label>
                <input
                  id="brand"
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="Brand name"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-2 border-steel bg-concrete p-6 space-y-6">
            <h3 className="text-xl font-black text-foreground">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Selling Price (₹) *
                </label>
                <input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="1499"
                />
              </div>

              <div>
                <label htmlFor="originalPrice" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                  Original Price (₹)
                </label>
                <input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                  placeholder="4999"
                />
              </div>
            </div>
          </div>

          {/* Location & Swap */}
          <div className="border-2 border-steel bg-concrete p-6 space-y-6">
            <div>
              <label htmlFor="location" className="text-sm font-mono uppercase tracking-wider text-foreground mb-2 block">
                Location (Bangalore)
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 bg-background border-2 border-steel text-foreground placeholder:text-muted-foreground font-mono focus:outline-none focus:border-primary focus:shadow-[0_0_10px_var(--neon)] transition-all"
                placeholder="Koramangala, Indiranagar, etc."
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="swapPreferred"
                type="checkbox"
                checked={formData.swapPreferred}
                onChange={(e) => setFormData({ ...formData, swapPreferred: e.target.checked })}
                className="w-5 h-5 border-2 border-steel bg-background text-primary focus:ring-primary"
              />
              <label htmlFor="swapPreferred" className="text-sm font-mono uppercase tracking-wider text-foreground cursor-pointer">
                Prefer Swap Over Sale
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SkeuomorphicButton
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              disabled={loading || images.length === 0}
            >
              {loading ? "Listing..." : "List Product"}
              <Upload className="ml-2 w-5 h-5" />
            </SkeuomorphicButton>
            <SkeuomorphicButton
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
            >
              Cancel
            </SkeuomorphicButton>
          </div>
        </form>
      </div>
    </main>
  );
}
