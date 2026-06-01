import { useState } from "react";
import { sendContactInfo } from "../services/api";

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      await sendContactInfo(formData);
      setSuccess(true);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to send message. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return { loading, success, error, handleSubmit, reset };
};

export default useContact;
