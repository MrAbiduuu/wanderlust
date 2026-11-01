"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteDestinationDialog = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDeleteDestination = async () => {
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete destination");
      }

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full">
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="outline"
              className="h-10 w-full flex-1 gap-2 rounded-xl border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:text-red-700 active:scale-[0.98]"
            >
              <RiDeleteBin5Line className="size-4" />
              Delete
            </Button>
          }
        >
          Delete Destination
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-white p-0 text-gray-900 shadow-2xl shadow-gray-200/60">
          {/* Top Accent */}
          <div className="h-1 w-full bg-linear-to-r from-red-400 to-rose-500" />

          <div className="p-6 sm:p-7">
            <AlertDialogHeader className="items-center text-center">
              {/* Icon */}
              <div className="mb-2 flex size-16 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
                <RiDeleteBin5Line className="size-8 text-red-500" />
              </div>

              <AlertDialogTitle className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Delete destination?
              </AlertDialogTitle>

              <AlertDialogDescription className="max-w-sm text-sm leading-6 text-gray-500">
                Are you sure you want to delete this destination? This action
                cannot be undone, and the destination will be permanently
                removed.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Warning */}
            <div className="mt-5 flex gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-3.5">
              <RiDeleteBin5Line className="mt-0.5 size-4 shrink-0 text-amber-600" />

              <p className="text-xs leading-5 text-gray-600">
                <span className="font-semibold text-amber-700">
                  Please note:
                </span>{" "}
                Make sure you have selected the correct destination before
                proceeding.
              </p>
            </div>

            {/* Actions */}
            <AlertDialogFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row sm:gap-3">
              <AlertDialogCancel className="mt-0 h-11 flex-1 rounded-xl border border-gray-200 bg-white font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDeleteDestination}
                className="h-11 flex-1 gap-2 rounded-xl bg-red-500 font-semibold text-white shadow-md shadow-red-100 transition-all hover:bg-red-600 active:scale-[0.98]"
              >
                <RiDeleteBin5Line className="size-4" />
                Delete permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestinationDialog;
