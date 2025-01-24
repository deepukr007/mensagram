import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { supabase, main_table_name } from "@/database/supabase_client";
import Foodcard from "./Foodcard";

const PopupWithImage = () => {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function getfoodoftheweek(id: number) {
    const res = await supabase.from(main_table_name).select("").eq("id", id);
    console.log(res);
    if (res.data) {
      setResult(res.data[0]);
    }
  }

  useEffect(() => {
    // Open the popup when the app loads
    getfoodoftheweek(394);
    console.log(result);
    setOpen(true);
  }, []);

  return (
    result && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="hidden" />{" "}
        {/* Hidden trigger since we open it programmatically */}
        <DialogContent className="max-w-md mx-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Image of the last week 📸
            </DialogTitle>
            <DialogDescription>
              <Foodcard
                key={result.id}
                id={result.id}
                title={result.title}
                likes={result.likes}
                url={`${result.url}`}
                meal_type={result.meal_type}
                image_approved={true}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
};

export default PopupWithImage;
