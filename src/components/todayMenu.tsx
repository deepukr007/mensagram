import { useState, useEffect } from "react";
import { supabase, main_table_name } from "../database/supabase_client.tsx";
import Foodcard from "./Foodcard.js";

export default function TodayMenu({ onDataChange }: { onDataChange: any }) {
  const [results, setResults] = useState<any[] | null>(null);
  const dateObj = Date.now();
  const tdate = new Date(dateObj);
  const today = tdate.toISOString().slice(0, 10);

  useEffect(() => {
    getResults();
  }, []);

  async function getResults() {
    const { data } = await supabase
      .from(main_table_name)
      .select("*")
      .eq("menu_date", today);
    setResults(data);
    onDataChange(data);
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
