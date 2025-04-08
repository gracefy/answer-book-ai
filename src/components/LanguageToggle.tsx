"use client";

import { useState } from "react";

const LanguageToggle = () => {
  const [language, setLanguage] = useState<"en" | "zh">("zh");

  const toggleLanguage = (newLanguage: "en" | "zh") => {
    setLanguage(newLanguage);
    // TODO: Add this logic when needed
  };


  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <button
        className={`px-3 py-1 rounded ${language === "zh" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
        onClick={() => toggleLanguage("zh")}
      >
        中文
      </button>
      <button
        className={`px-3 py-1 rounded ${language === "en" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
        onClick={() => toggleLanguage("en")}
      >
        English
      </button>
    </div>
  )
}

export default LanguageToggle