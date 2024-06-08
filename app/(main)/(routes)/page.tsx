"use client";

import PagePostForm from "./_components/pagePostForm";

export default function page() {
  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-4 min-h-screen border-x">
        <PagePostForm />
      </div>

      {/* Discution */}
      <div className="col-span-2">hehe</div>
    </div>
  );
}
