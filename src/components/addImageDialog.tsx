import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";

import FoodSelectUpload from "./FoodSelectUpload";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase, main_table_name } from "@/database/supabase_client";

/**
 * Renders a dialog component for adding an image.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.dishes - The array of dishes.
 * @returns {JSX.Element} The rendered AddImageDialog component.
 */
export default function AddImageDialog({ dishes }: { dishes: any[] | null }) {
  const [open, setOpen] = useState(false);
  const [selectedDishID, setselectedDishID] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSelect = (value: any) => {
    setselectedDishID(value);
  };

  async function handleSubmit() {
    console.log("Submitted");

    if (!file || !selectedDishID) {
      alert("Please select a file and Dish name");
      return;
    } else {
      const { data, error } = await supabase.storage
        .from("mensa_images")
        .upload(
          `food_images/${selectedDishID}.${file.type.split("/")[1]}`,
          file,
          {
            cacheControl: "3600",
            upsert: true,
          }
        );

      if (data) {
        const image_path = data.fullPath;
        const { error } = await supabase
          .from(main_table_name)
          .update({ url: image_path })
          .eq("id", selectedDishID);
        setOpen(false);

        if (!error) {
          window.location.reload();
          toast({ description: "Image uploaded successfully" });
        }
      }
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="text-lg bg-yellow-500 rounded-full p-3 w-[200px]">
          Upload Photo
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a photo of the meal</DialogTitle>
          <DialogDescription className="text-left">
            - Upload a clear, high-quality image of your dish
            <br />
            - Ensure the food is the main focus of the image
            <br />
            - Good lighting is key – natural light works best!
            <br />
            - Include the entire dish in the frame <br />
            - Acceptable formats: JPEG, PNG <br />
            - Maximum file size: 10MB <br />
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Dish Name
            </Label>
            <FoodSelectUpload dishes={dishes} selectCallback={onSelect} />
          </div>
          <div className="grid items-center gap-4 justify-items-end w-[300px]">
            <Input
              id="file"
              className="w-[300px] "
              type="file"
              accept=".jpg , .jpeg , .png"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className=" bg-yellow-500 text-black"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
