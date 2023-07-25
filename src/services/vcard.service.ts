import axios from "axios";
import { BusinessCard } from "@/services/businessCard.service";

export const VCardService = {
  downloadVCard: (businessCard: BusinessCard): Promise<string> => {
    return axios.post<string>("/api/vcard", {
      email: businessCard.email,
      cellPhone: businessCard.phone,
      firstName: businessCard.parsed_name.given_name,
      lastName: businessCard.parsed_name.family_name,
    })
        .then((res) => res.data)
        .catch(() => {
          throw new Error("Failed to download vCard");
        });
  }
};
