import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { Separator } from "@/components/ui/separator";
// import { FetchRawFile } from "@/logic/FetchRawFile";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MDXProvider } from "@mdx-js/react";
import { FetchSpecificFile } from "@/logic/FetchSpecificFile";

function HeroFileViewerComponent() {
  const rootDisplayFilesPath = CurrentlySelectedRepositoryState(
    (state: any) => state.rootDisplayFilesPath
  );

  return (
    <div className="border p-2 bg-muted/20   rounded-md shadow-md  mt-3 w-full ">
      <Tabs defaultValue={rootDisplayFilesPath[0].name}>
        <TabsList>
          {rootDisplayFilesPath?.map((e: any) => {
            return (
              <>
                <TabsTrigger value={e.name}>{e.name}</TabsTrigger>
              </>
            );
          })}
        </TabsList>
        <Separator className="my-2" />
        {rootDisplayFilesPath?.map((e: any) => {
          return (
            <>
              <TabsContent value={e.name}>
                <ShowFileComponent data={e} />
              </TabsContent>
            </>
          );
        })}
      </Tabs>
    </div>
  );
}

const ShowFileComponent = ({ data }: any) => {
  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );

  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  const [fileData, setfileData]: any = useState(null);

  useEffect(() => {
    FetchSpecificFile({
      giteaUserName: userName,
      repoName: RepoName,
      filePath: data.path,
    }).then(res => {
      // console.log(res)
      setfileData(atob(res.data.content))
    })
  }, []);

  return (
    <div>
      {
        // fileData?.data
        fileData && (
          <MDXProvider>
            <div className="w-full">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, remarkGfm]}
                children={`${fileData}`}
                className={"prose min-w-full p-6"}
              />
            </div>
          </MDXProvider>
        )
      }
    </div>
  );
};

export default HeroFileViewerComponent;
