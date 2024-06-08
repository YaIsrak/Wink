"use client";

import { useEffect, useState } from "react";
import CreatePostModal from "../modals/create-post-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreatePostModal />
    </>
  );
}
