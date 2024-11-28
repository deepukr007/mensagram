import Explore from "./components/explore.js";
import "./index.css";
import { useEffect, useState } from "react";
import AddImageDialog from "./components/addImageDialog.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodayMenu from "./components/todayMenu.js";
import Searchbar from "./components/searchbar.js";

function App() {
  const [results, setResults] = useState<any[] | null>(null);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);

  const handleDataChange = (data: any[]) => {
    setResults(data);
  };

  useEffect(() => {}, [results]);

  const onSearch = (query: string) => {
    console.log("results", results);

    const filteredResults =
      results?.filter((result) =>
        result.title.toLowerCase().includes(query.toLowerCase())
      ) || [];
    setSearchResults(filteredResults);
    console.log("results", searchResults);
  };

  return (
    <div className="font-poppins text-3xl text-center p-3">
      <header className="p-3">
        <div>
          <h1 className="mb-3 text-yellow-500 font-medium">Mensagram</h1>
        </div>
        <Searchbar onSearch={onSearch} />
      </header>

      <Tabs defaultValue="Today" className="w-full">
        <TabsList>
          <TabsTrigger value="Today">Today's Menu</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        <TabsContent value="Today">
          <TodayMenu onDataChange={handleDataChange} />
        </TabsContent>
        <TabsContent value="explore">
          <Explore />
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-0 pb-5 w-full flex justify-center ">
        <div>
          <AddImageDialog dishes={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
