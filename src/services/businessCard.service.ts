import { z } from "zod";
import axios from "axios";

const BusinessCard = z.object({
  id: z.number(),
  phone: z.string(),
  parsed_name: z.object({
    given_name: z.string(),
    family_name: z.string(),
  }),
  email: z.string().optional(),
});

export type BusinessCard = z.infer<typeof BusinessCard>;

export const BusinessCardService = {
  parseByImage: async (imageUrl: string): Promise<BusinessCard> => {
    return axios
      .post("/api/parse", { imageUrl })
      .then((res) => res.data)
      .then(BusinessCard.parse)
      .catch(() => {
        throw new Error("Failed to parse image");
      });
  },
};
