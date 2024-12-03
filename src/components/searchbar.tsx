import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Searchbar({ onSearch }: any) {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="w-full text-sm ml-2 mr-2 focus:outline-none">
      <Input
        className="p-3 outline-none bg-slate-100 rounded-full w-full border-none focus-visible:ring-0 "
        type="text"
        placeholder="Search Food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("searching for", query);
            onSearch(query);
          }
        }}
      />
    </div>
  );
}
