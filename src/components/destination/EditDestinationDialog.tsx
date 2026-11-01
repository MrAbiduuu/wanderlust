"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PackageCheck, Trash2, Loader2, CircleAlert } from "lucide-react";
import { FiEdit } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Destination } from "@/app/Types/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const EditDestinationDialog = ({
  destination,
}: {
  destination: Destination;
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    ...destination,
    // <input type="date"> needs "yyyy-mm-dd", DB stores a full ISO string
    departureDate: destination.departureDate?.split("T")[0] || "",
  });

  const update = (field: keyof typeof form, value: string | string[]) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSaving) return;

    try {
      setIsSaving(true);
      setError(null);

      const { _id, ...updateData } = form;
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }

      router.push("/destinations");
      router.refresh();
    } catch {
      setError("Something went wrong while saving. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-gray-600 hover:bg-cyan-400/10">
            <FiEdit className="h-4 w-4" />
            Edit
          </Button>
        }
      >
        Edit Destination
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the package details below and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="rounded-sm border border-border bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5">
            {/* Destination Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                required
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) => update("price", event.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) => update("duration", event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="grid gap-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  update("departureDate", event.target.value)
                }
                required
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                className="min-h-36"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              <CircleAlert className="size-4 shrink-0" />
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  <Trash2 />
                  Cancel
                </Button>
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={isSaving}
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <PackageCheck />
              )}
              {isSaving ? "Saving..." : "Edit Travel Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
