import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import imageCompression from "browser-image-compression";

import { useToast } from "@/hooks/use-toast";

import FoodSelectUpload from "./FoodSelectUpload";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase, main_table_name } from "@/database/supabase_client";

export default function AddImageDialog({
  dishes,
  openDiologue,
  onCloseCallback,
}: {
  dishes: any[];
  openDiologue: boolean;
  onCloseCallback?: any;
}) {
  const [open, setOpen] = useState(openDiologue);
  const [selectedDishID, setselectedDishID] = useState<string>(
    dishes && dishes.length > 0 ? dishes[0].id : ""
  );
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  async function handleFileChange(e: any) {
    const imageFile = e.target.files[0];
    if (imageFile) {
      console.log("originalFile instanceof Blob", file instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        setFile(imageFile);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleOpen = (value: boolean) => {
    setOpen(value);
    onCloseCallback(value);
  };

  const onSelect = (value: any) => {
    setselectedDishID(value);
  };

  async function handleSubmit() {
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
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger>
        <button className="text-sm text-slate-800 bg-yellow-500 font-medium rounded-full p-3 w-[150px]">
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
