import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_VERSION = "v1";
const API_PREFIX = `${BASE_URL}/api/${API_VERSION}`;

async function generateResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await axios.post(
      `${API_PREFIX}/generate-resume`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error generating resume:", error);
    return null;
  }
}

export { generateResume };
