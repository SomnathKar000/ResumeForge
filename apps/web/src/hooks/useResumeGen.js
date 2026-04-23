import { useState } from "react";
import { generateResume } from "../services/api";

const useResumeGen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (file, jobDescription) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await generateResume(file, jobDescription);
      setSuccess(true);
      return response;
    } catch (error) {
      setError(error || "Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = (blob, filename = "tailored-resume.pdf") => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    loading,
    success,
    error,
    handleGenerate,
    downloadPDF,
  };
};

export default useResumeGen;
