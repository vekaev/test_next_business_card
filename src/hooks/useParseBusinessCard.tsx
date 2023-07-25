import { useEffect, useState, useCallback } from "react";
import {
  BusinessCard,
  BusinessCardService,
} from "@/services/businessCard.service";

export const useParseBusinessCard = (imageUrl: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [businessCard, setBusinessCard] = useState<BusinessCard | null>(null);

  const parseBusinessCard = useCallback(async (imageUrl: string): Promise<BusinessCard> => {
    setLoading(true);
    setError(false);

    try {
      const data = await BusinessCardService.parseByImage(imageUrl);

      setLoading(false);

      return data;
    } catch (error) {
      console.error(error);

      setError(true);
      setLoading(false);

      throw error;
    }
  }, []);

  useEffect(() => {
    if (imageUrl) parseBusinessCard(imageUrl).then(setBusinessCard).catch(() => {});
  }, [imageUrl, parseBusinessCard]);

  return { loading, error, businessCard, isSuccess: !!businessCard, parseBusinessCard };
};
