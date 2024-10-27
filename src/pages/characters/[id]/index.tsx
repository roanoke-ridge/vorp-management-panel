import { Loading } from "@/components/common/loading";
import {
  CardHeader,
  CardTitle,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

const Character = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <Loading />;
  }

  const { data, isLoading } = api.character.getById.useQuery(parseInt(id));

  if (isLoading || !data) {
    return <Loading />;
  }

  const skills: Record<string, { Level: number }> = data.skills ? JSON.parse(data.skills) as Record<string, { Level: number }> : {};

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        {/* <CharacterForm initialData={character} /> */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="Money" disabled>
              Money
            </TabsTrigger>
            <TabsTrigger value="logs" disabled>
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Character</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Name: {data.firstname} {data.lastname}</div>
                  <div className="text-lg font-bold">Steam ID: {data.identifier}</div>
                  <div className="text-lg font-bold">Job: {data.joblabel} ({data.job}:{data.jobgrade})</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Money
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">Cash: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.money ?? 0)}</div>
                  <div className="text-lg font-bold">Gold: {new Intl.NumberFormat('en-US').format(data.gold ?? 0)}</div>
                  <div className="text-lg font-bold">Rol: {new Intl.NumberFormat('en-US').format(data.rol ?? 0)}</div>
                </CardContent>
              </Card>

              {skills && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Object.keys(skills).map(function (key) {
                      // todo: it would be nice to display skills and all info from skills in separate cards
                      return <div key={key} className="text-lg font-bold">{key}: {skills[key]?.Level}</div>
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Character;
