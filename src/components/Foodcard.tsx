//import image1 from '../images/food1.jpg'
import {
  supabase,
  main_table_name,
  supabaseUrl,
} from "@/database/supabase_client";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import default_img from "@/images/default.jpg";
import AddImageDialog from "./addImageDialog";

function Foodcard({
  id,
  title,
  url,
  likes,
  meal_type,
}: {
  id: number;
  title: string;
  url: string;
  likes: number;
  meal_type?: string;
}) {
  const [fav, setFav] = useState(false);
  const [likeCount, setlikeCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (likes !== null) {
      setlikeCount(likes);
    }
  }, []);

  const mensa_images_URL = `${supabaseUrl}/storage/v1/object/public/`;
  const imageURL = `${mensa_images_URL}/${url}`;

  function uploadPhoto() {
    console.log("Upload photo");
    setIsDialogOpen(true);
  }

  async function handleLikes(): Promise<any> {
    setFav(!fav);

    if (!fav) {
      let { data: likeCount } = await supabase
        .from(main_table_name)
        .select("likes")
        .eq("id", id);
      if (likeCount !== null) {
        likeCount[0]["likes"] = likeCount[0]["likes"] + 1;
        setlikeCount(likeCount[0]["likes"]);
      }

      await supabase
        .from(main_table_name)
        .update({ likes: likeCount !== null ? likeCount[0]["likes"] : 0 })
        .eq("id", id)
        .select();
    }

    if (fav) {
      let { data: likeCount } = await supabase
        .from(main_table_name)
        .select("likes")
        .eq("id", id);
      // Decrement the like count
      if (likeCount !== null) {
        likeCount[0]["likes"] = likeCount[0]["likes"] - 1;
        setlikeCount(likeCount[0]["likes"]);
      }

      await supabase
        .from(main_table_name)
        .update({ likes: likeCount !== null ? likeCount[0]["likes"] : 0 })
        .eq("id", id)
        .select();
    }
  }

  return (
    <div className="w-96 mb-5 rounded-md overflow-hidden m-2 p-0 shadow-xl">
      <div className="rounded-md overflow-hidden">
        {url != "null" ? (
          <div className="realtive">
            <img width="100%" src={imageURL} />
            <p className="absolute text-xs p-1 m-2 bottom-10 right-10 bg-yellow-400 text-gray-600 rounded-xl">
              {meal_type}
            </p>
          </div>
        ) : (
          <div className="relative" onClick={uploadPhoto}>
            <img width="100%" className="p-5 m-1" src={default_img} />
            <p className="absolute text-xs p-2 m-1 top-10 bg-slate-300 text-gray-600 rounded-xl">
              Click to upload Photo
            </p>
          </div>
        )}
      </div>
      <div className="grid">
        <div>
          <div className="text-sm p-2  text-left ">
            <p>{title} </p>
          </div>
        </div>

        <div className="grid grid-cols-10 pb-2">
          <div className="col-span-8 ">
            <p className=" text-left text-xs font-medium p-2">
              {likeCount} likes
            </p>
          </div>
          <div className="text-center align-middle">
            <button onClick={handleLikes}>
              {fav ? <FaHeart color="red" /> : <CiHeart />}
            </button>
          </div>
        </div>
      </div>
      {isDialogOpen && (
        <AddImageDialog
          dishes={[{ id: id, title: title }]}
          openDiologue={true}
          onCloseCallback={setIsDialogOpen}
          hideTrigger={true}
        />
      )}
    </div>
  );
}

export default Foodcard;
