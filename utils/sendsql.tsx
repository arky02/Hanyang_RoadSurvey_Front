import axios from "axios";

interface SqlProps {
  age: string;
  sex: string;
  img_name: string;
  transport_score: number;
  crime_score: number;
}

const SendSQLQuery = async ({
  age,
  sex,
  img_name,
  transport_score,
  crime_score,
}: SqlProps) => {
  let response = "";
  try {
    response = await axios.post(`https://roadvs.shop/api/results/save`, {
      age: age,
      sex: sex,
      img_name: img_name,
      transport_score: transport_score,
      crime_score: crime_score,
    });
  } catch {
    alert("서버 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.");
    return;
  }
  return response;
};

export default SendSQLQuery;
