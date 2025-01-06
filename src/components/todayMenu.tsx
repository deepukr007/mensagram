import { useState, useEffect } from "react";
import { supabase, main_table_name } from "../database/supabase_client.tsx";
import Foodcard from "./Foodcard.js";

export default function TodayMenu({ menucallback }: { menucallback: any }) {
  const [results, setResults] = useState<any[] | null>(null);
  const tdate = new Date();
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
    menucallback(data);
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center">
        {results && results.length !== 0 ? (
          results.map((result) => (
            <Foodcard
              key={result.id}
              id={result.id}
              title={result.title}
              likes={result.likes}
              url={`${result.url}`}
              meal_type={result.meal_type}
            />
          ))
        ) : (
          <div className="text-center w-full justify-center flex flex-col">
            <p className="mt-36 text-sm">No menu today—mensa’s on a diet.</p>
          </div>
        )}
      </div>
    </>
  );
}
