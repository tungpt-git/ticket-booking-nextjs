import { SheetsName } from "@/configs/google-sheets";
import { TSeat } from "@/core/seat/types";
import { googleServices } from "@/services/googleapis";
import { unstable_cache } from "next/cache";

export const GET_ALL_SEATS = "GET_ALL_SEATS";

export const getAll = unstable_cache(async () => {
  return await googleServices
    .get({
      range: `${SheetsName.seats}!A2:F144`,
    })
    .then((res) => {
      return (res.data.values ?? []).reduce((acc, seatRow) => {
        const [id, row, price, vip, seatIndex, booked] = seatRow as [
          string,
          string,
          string,
          string,
          string,
          string
        ];
        const idxs = seatIndex.split(",").map((idx) => +idx);

        const info = {
          price: +price,
          type:
            vip === "TRUE"
              ? ("vip" as const)
              : Array.isArray(idxs) && idxs.length > 1
              ? ("multiple" as const)
              : ("normal" as const),
          id: id,
          idx: idxs.length === 1 ? idxs[0] : idxs,
          name: id,
          rowName: row,
          booked: booked === "Yes",
        } as TSeat;

        return {
          ...acc,
          [id]: info,
        };
      }, {} as Record<string, TSeat>);
    });
}, [GET_ALL_SEATS]);
