import React from "react";
import { api } from "@/utils/api";
import { Loading } from "@/components/common/loading";
import { CharacterClient } from "@/components/page-component/character/client";

const Characters = () => {
  const { data, isLoading, isError, error } = api.character.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 md:p-8">
        <CharacterClient data={data.map(character => ({
          ...character,
          money: character.money ?? 0,
          gold: character.gold ?? 0,
          job: character.job ?? '',
          jobgrade: character.jobgrade ?? 0,
          joblabel: character.joblabel ?? '',
        }))} />
      </div>
    </div>
  );
};

export default Characters;
