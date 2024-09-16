import { useState, useEffect } from "react";
import { supabase, main_table_name } from "../database/supabase_client.tsx";
import Foodcard from "./Foodcard.js";

export default function Explore() {
  const [results, setResults] = useState<any[] | null>(null);

  useEffect(() => {
    getResults();
  }, []);

  async function getResults() {
    const { data } = await supabase.from(main_table_name).select("*");
    setResults(data);
  }

  return (
    <>
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
