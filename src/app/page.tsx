"use client";

import { useEffect, useCallback } from "react";
import { Button, Typography, Upload, message } from "antd";
import { UploadOutlined, ContactsOutlined } from "@ant-design/icons";

import { downloadFile } from "@/utils/downloadFile";
import { VCardService } from "@/services/vcard.service";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useParseBusinessCard } from "@/hooks/useParseBusinessCard";

export default function Home() {
  const {
    uploadImage,
    uploadedImageUrl,
    loading: isImageUploadLoading
  } = useImageUpload();
  const {
    businessCard,
    error: isParseError,
    loading: isParseLoading,
    isSuccess: isParseSuccess,
  } = useParseBusinessCard(uploadedImageUrl);

  const handleUpload = useCallback(({
    file,
    onError,
    onSuccess,
  }: {
    file: File;
    onError: () => void;
    onSuccess: () => void;
  }) => {
    uploadImage(file, new Date().toISOString())
      .then(() => onSuccess())
      .catch(() => {
        message.error("Upload failed.");
        onError();
      });
  }, [uploadImage]);

  const handleDownloadVCard = useCallback(async () => {
    if (!businessCard) return;

    try {
      // TODO: move key to constants
      message.loading({ content: "Loading contact card...", key: "download" });
      const result  = await VCardService.downloadVCard(businessCard)
      downloadFile(new Blob([result]), "contact.vcf");
    } catch (error) {
      message.error("Download failed.");
    } finally {
      message.destroy("download");
    }
  }, [businessCard]);

  useEffect(() => {
    if (isParseLoading)
      message.loading({ content: "Parsing business card...", key: "parse" });
    else if (isParseSuccess) {
      message.success({ content: "Parse success.", key: "parse" });
    } else if (isParseError) {
      message.error({ content: "Parse failed.", key: "parse" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isParseLoading]);

  return (
    <main style={{
      display: "flex",
      textAlign: "center",
      flexDirection: "column"
    }}>
      <Typography.Title>Business Card Photo - Phone Contact</Typography.Title>
      <Upload
        maxCount={1}
        accept='image/*'
        listType='picture'
        // TODO: Fix type
        customRequest={handleUpload as () => void}
        disabled={isImageUploadLoading}
      >
        <Button
          size='large'
          loading={isImageUploadLoading}
          disabled={isImageUploadLoading}
        >
          Upload image <UploadOutlined />
        </Button>
      </Upload>
      <Button
        size='large'
        loading={isParseLoading}
        disabled={isParseLoading || !isParseSuccess}
        style={{ marginTop: 10 }}
        onClick={handleDownloadVCard}
      >
        Save to contacts
        <ContactsOutlined />
      </Button>
    </main>
  );
}
