import { useState, useEffect } from "react";
import { supabase, main_table_name } from "../database/supabase_client.tsx";
import Foodcard from "./Foodcard.js";

export default function Explore({ searchQuery }: any) {
  const [results, setResults] = useState<any[] | null>(null);
  const [isSearch, setisSearch] = useState(false);

  useEffect(() => {
    getResults();
  }, [searchQuery]);

  async function getResults() {
    console.log("searchQuery", searchQuery);
    if (searchQuery == "") {
      const { data } = await supabase.from(main_table_name).select("*");
      setResults(data);
      setisSearch(false);
    } else {
      const { data } = await supabase
        .from(main_table_name)
        .select("*")
        .ilike("title", `%${searchQuery}%`);
      setResults(data);
      setisSearch(true);
    }
  }

  return (
    <>
      {isSearch && (
        <div className="grid grid-cols-2">
          <div className="text-left text-xs ml-7 pt-2 mb-1 text-slate-700 align-middle">
            <span className="text-xs text-yellow-500">Search results </span>
          </div>
          <div className="text-right text-xs content-center pt-2 mb-2 mr-5  text-slate-700 ">
            {results?.length} results found
          </div>
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-center">
        {results &&
          results.map((result) => (
            <Foodcard
              key={result.id}
              id={result.id}
              title={result.title}
              likes={result.likes}
              url={`${result.url}`}
            />
          ))}
      </div>
    </>
  );
}
