import Explore from "./components/explore.js";
import "./index.css";
import { useState } from "react";
import AddImageDialog from "./components/addImageDialog.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodayMenu from "./components/todayMenu.js";

function App() {
  const [results, setResults] = useState<any[] | null>(null);

  const handleDataChange = (data: any[]) => {
    setResults(data);
  };

  return (
    <div className="font-poppins text-3xl text-center p-3">
      <header className="p-3">
        <div>
          <h1 className="mb-3 text-yellow-500 font-medium">Mensagram</h1>
        </div>

        <div className="w-full text-sm">
          <input
            className="p-3 outline-none bg-slate-100 rounded-full w-3/4"
            type="text"
            placeholder="Search Food..."
          />
        </div>
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

      <div className="fixed bottom-0 p-5 w-32 flex justify-items-start -right-2 ">
        <div className="justify-self-start">
          <AddImageDialog dishes={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
