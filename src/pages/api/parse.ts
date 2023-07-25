import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { BusinessCard } from "@/services/businessCard.service";

const headers = {
  AUTHORIZATION: `apikey ${process.env.NEXT_PUBLIC_VERIFY_USERNAME}:${process.env.NEXT_PUBLIC_VERIFY_API_KEY}`,
  "CLIENT-ID": process.env.NEXT_PUBLIC_VERIFY_CLIENT_ID,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await axios.post<BusinessCard>(
    "https://api.veryfi.com/api/v7/partner/business-cards",
    {
      file_url: req.body.imageUrl,
      auto_delete: true,
    },
    { headers }
  );

  return res.status(200).json(data);
}
