import {useCallback, useState} from "react";
import { BlobService } from "@/services/blob.service";

export const useImageUpload = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    setLoading(true);
    setError(false);

    try {
      const data = await BlobService.uploadFile(file, file.name);

      setUploadedImageUrl(data);
      setLoading(false);

      return data;
    } catch (error) {
      console.error(error);

      setError(true);
      setLoading(false);

      throw error;
    }
  }, []);

  return { uploadedImageUrl, loading, error, uploadImage };
};
