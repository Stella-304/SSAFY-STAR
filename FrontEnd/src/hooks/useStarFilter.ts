import { StarFilterType } from "@/types/StarFilterType";
import { useEffect, useState } from "react";

export default function useStarFilter(type: string, item: string) {
  const [filter, setFilter] = useState<StarFilterType>({
    ban: [],
    bojTier: [],
    campus: [],
    company: [],
    generation: [],
    major: [],
    role: [],
    swTier: [],
    track: [],
    groupFlag: "campus",
  });

  useEffect(() => {
    switch (type) {
      case "generation":
        filter.generation.includes(item)
          ? setFilter((state) => ({
              ...state,
              generation: filter.generation.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              generation: [...state.generation, item],
            }));
        break;
      case "campus":
        filter.campus.includes(item)
          ? setFilter((state) => ({
              ...state,
              campus: filter.campus.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              campus: [...state.campus, item],
            }));
        break;
      case "ban":
        filter.ban.includes(item)
          ? setFilter((state) => ({
              ...state,
              ban: filter.ban.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              ban: [...state.ban, item],
            }));
        break;
    }
  }, [type, item]);

  return { filter };
}
