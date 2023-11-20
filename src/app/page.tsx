"use client";
import { useEffect, useState } from "react";
import { exists, writeFile, writeTextFile } from "@tauri-apps/api/fs";
import { useRouter } from "next/navigation";
import { filePath } from "@/filepath";

export default function Home() {
  const router = useRouter();
  const fileCheck = async (): Promise<void> => {
    const bl: boolean = await exists(filePath);
    if (!bl) {
      await writeTextFile(filePath, "");
      return;
    } else {
      router.push("/memo")
    }
  };

  useEffect(() => {
    const fc = async () => {
      fileCheck();
    };
    fc();
  }, []);

  return (
    <main>
      <h1>ようこそメモアプリへ</h1>
      <button
        onClick={() => {
          router.push("/memo");
        }}
      >
        始める
      </button>
    </main>
  );
}
