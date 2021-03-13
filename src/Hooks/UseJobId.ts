import { useEffect } from "react";

const UseJobId = () => {
  const slug = localStorage.getItem("slug");

  let existing: Array<{ slug: string; jobId: string }> = JSON.parse(
    localStorage.getItem("jobIds")!
  );

  const existingJobId =
    existing?.find((info) => info.slug === slug)?.jobId ?? null;

  // setting jobIds to [], if null on reload
  useEffect(() => {
    if (localStorage.getItem("jobIds") === null) {
      localStorage.setItem("jobIds", "[]");
    }
  }, []);

  // persist data using local storage
  const persistor = (jobId: string) => {
    if (localStorage.getItem("jobIds") === null) {
      localStorage.setItem("jobIds", "[]");
    }
    existing?.push({ jobId, slug: slug! });
    localStorage.setItem("jobIds", JSON.stringify(existing));
  };

  return { existingJobId, persistor };
};

export default UseJobId;
