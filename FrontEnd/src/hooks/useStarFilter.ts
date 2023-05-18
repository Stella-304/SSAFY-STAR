import { StarFilterType } from "@/types/StarFilterType";
import { useEffect, useState } from "react";

export default function useStarFilter(
  type: string,
  item: string,
  filterChange: boolean,
) {
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
    if (!filterChange) return;
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
      case "company":
        filter.company.includes(item)
          ? setFilter((state) => ({
              ...state,
              company: filter.company.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              company: [...state.company, item],
            }));
        break;
      case "major":
        filter.major.includes(item)
          ? setFilter((state) => ({
              ...state,
              major: filter.major.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              major: [...state.major, item],
            }));
        break;
      case "role":
        filter.role.includes(item)
          ? setFilter((state) => ({
              ...state,
              role: filter.role.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              role: [...state.role, item],
            }));
        break;
      case "track":
        filter.track.includes(item)
          ? setFilter((state) => ({
              ...state,
              track: filter.track.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              track: [...state.track, item],
            }));
        break;
      case "swTier":
        filter.swTier.includes(item)
          ? setFilter((state) => ({
              ...state,
              swTier: filter.swTier.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              swTier: [...state.swTier, item],
            }));
        break;
      case "bojTier":
        filter.bojTier.includes(item)
          ? setFilter((state) => ({
              ...state,
              bojTier: filter.bojTier.filter((e: string) => e !== item),
            }))
          : setFilter((state) => ({
              ...state,
              bojTier: [...state.bojTier, item],
            }));
        break;
      case "groupFlag":
        setFilter((state) => ({ ...state, groupFlag: item }));
    }
  }, [filterChange]);

  return { filter };
}
