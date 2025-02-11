import Explore from "./components/explore.js";
import "./index.css";
import { useState } from "react";
import AddImageDialog from "./components/addImageDialog.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TodayMenu from "./components/todayMenu.js";
import Searchbar from "./components/searchbar.js";
// import PopupWithImage from "./components/popup.js";
//import EssenKarma from "./components/essenKarma.js";

function App() {
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tab, setTab] = useState<string>("Today");

  const handlemenucallback = (data: any[]) => {
    setResults(data);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    setTab("explore");
  };

  const onTabChange = (tab: string) => {
    setTab(tab);
    if (tab === "Today") {
      setSearchQuery("");
    }
  };

  return (
    <div className="font-poppins text-3xl text-center p-3">
      <header className="p-3">
        <div className="grid grid-cols-10 w-full">
          <div className="col-span-10 justify-self-center">
            <h1 className="mb-0 text-yellow-400 font-medium">Mensagram</h1>
            <p className="mb-2 text-yellow-300 text-xs text-center ml-20  ">
              Rempartstrasse
            </p>
          </div>
          {/* <div className="justify-self-end">
            <EssenKarma />
          </div> */}
        </div>
        <Searchbar onSearch={onSearch} />
      </header>
      {/* <PopupWithImage /> */}

      <Tabs value={tab} className="w-full" onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="Today">Today's Menu</TabsTrigger>
          <TabsTrigger value="explore">Explore</TabsTrigger>
        </TabsList>
        <TabsContent value="Today">
          <TodayMenu menucallback={handlemenucallback} />
        </TabsContent>
        <TabsContent value="explore">
          <Explore searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-0 pb-5 w-full flex justify-center ">
        <div>
          <AddImageDialog dishes={results} openDiologue={false} />
        </div>
      </div>
    </div>
  );
}

export default App;
