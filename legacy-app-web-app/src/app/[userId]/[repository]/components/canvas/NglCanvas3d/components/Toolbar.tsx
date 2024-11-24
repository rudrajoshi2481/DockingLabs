import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorldComponent from "./WorldComponent";
function Toolbar() {
  return (
    <div className="max-w-[450px] min-w-[400px] max-h-[90vh] relative  px-3 bg-gray-50 border-l-2">
      <Tabs defaultValue="password" className="mt-3">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">World</TabsTrigger>
          <TabsTrigger value="account">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">styles</TabsContent>
        <TabsContent value="password">
          <WorldComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Toolbar;

