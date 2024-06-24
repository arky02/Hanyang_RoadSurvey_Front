import { getResults } from "@/utils/sendsql";
import { useEffect, useState } from "react";

export default function Result() {
  const [results, setResults] = useState<string>();

  const saveResultRes = async () => {
    const resultRes = await getResults();
    resultRes && setResults(resultRes);
  };
  useEffect(() => {
    saveResultRes();
  }, []);
  return <div>{results ?? ""}</div>;
}
