import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import React from "react";
import RepoDashboardToolbar from "./RepoDashboardToolbar";
import RepoExplorerComponent from "./RepoExplorerComponent";
import { SettingsComponentDashboard } from "./SettingsComponentDashboard";

function TabsSelectorRepoDashboardComponent() {
  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );
  return (
    <div>
      {displayRepoMetaData && (
        <div className="w-full">
          <Tabs defaultValue="account">
            <div className="border bg-slate-100 rounded-lg w-full">
              <TabsList>
                <TabsTrigger value="account">Project Files</TabsTrigger>
                <TabsTrigger value="password">Project Board</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="Runners">Runners</TabsTrigger>

                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="account">
              <div className="mt-3">
                
                <RepoDashboardToolbar />
              </div>
              <div className="mt-3">
                {/* render based on path */}

                {/* if the selected path is file */}
                {/* when we fetch the file we well get to know wether its file or folder */}
                {/* if the fetchPath has tree in it then update the path */}

                {<RepoExplorerComponent />}
              </div>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="activity">
              Change your password here.
            </TabsContent>
            <TabsContent value="runners">
              Change your password here.
            </TabsContent>
            <TabsContent value="settings">
              <SettingsComponentDashboard />{" "}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!displayRepoMetaData && <h1 className="text-3xl">Loading...</h1>}
    </div>
  );
}

export default TabsSelectorRepoDashboardComponent;
