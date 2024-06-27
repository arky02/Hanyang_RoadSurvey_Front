import { getResults } from "@/utils/sendsql";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelImg from "@/public/assets/excel_img.png";

const headers = ["나이대", "성별", "이미지 이름", "교통점수", "범죄점수"];

export default function Result() {
  const [res, setRes] = useState();

  const convertToExcel = () => {
    const excelData = [
      headers,
      ...res?.map((el) => [
        el.age,
        el.sex,
        el.img_name,
        String(el.transport_score),
        String(el.crime_score),
      ]),
    ];

    console.log(excelData);

    if (XLSX.utils) {
      const ws = XLSX.utils.aoa_to_sheet(excelData!);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "설문결과.xlsx");
    } else {
      console.error(
        "XLSX.utils is undefined. Check if 'xlsx' is properly installed."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getResults();
        setRes(result?.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="w-[100vw] flex justify-center">
      <div className="p-[100px] w-fit flex flex-col items-end">
        <h1 className="text-center w-full font-bold text-[40px] mb-[40px]">
          설문조사 결과 조회
        </h1>
        <button
          className="font-bold text-[20px] border-[3px] border-[#26b94a] flex items-center rounded px-[10px] py-[5px] gap-[5px] shadow-lg bg-[#14cd422a] mb-[50px]"
          onClick={convertToExcel}
        >
          <Image src={ExcelImg} width={35} height={35} alt="excel img"></Image>
          엑셀로 결과 추출
        </button>
        <div>
          {makeTableRow({
            _id: "번호",
            age: "나이대",
            sex: "성별",
            img_name: "이미지 이름",
            transport_score: "교통점수",
            crime_score: "범죄점수",
            isHeader: true,
          })}
          {res?.map((el) => (
            <div key={el._id} className="flex">
              {makeTableRow(el)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const makeTableRow = ({
  _id,
  age,
  sex,
  img_name,
  transport_score,
  crime_score,
  isHeader,
}: {
  _id: number | string;
  age: string;
  sex: string;
  img_name: string;
  transport_score: number | string;
  crime_score: number | string;
  isHeader?: boolean;
}) => (
  <div key={_id} className={`flex ${isHeader && "bg-[#5bcff9]"}`}>
    <div className="w-[50px] border-[1px] border-[#000000] text-center font-bold">
      {_id}
    </div>
    <div
      className={`w-[100px] border-[1px] border-[#000000] text-center ${
        isHeader && "font-bold text-[18px]"
      }`}
    >
      {age}
    </div>
    <div
      className={`w-[100px] border-[1px] border-[#000000] text-center ${
        isHeader && "font-bold text-[18px]"
      }`}
    >
      {sex}
    </div>
    <div
      className={`w-[300px] border-[1px] border-[#000000] text-center ${
        isHeader && "font-bold text-[18px]"
      }`}
    >
      {img_name}
    </div>
    <div
      className={`w-[100px] border-[1px] border-[#000000] text-center ${
        isHeader && "font-bold text-[18px]"
      }`}
    >
      {transport_score}
    </div>
    <div
      className={`w-[100px] border-[1px] border-[#000000] text-center ${
        isHeader && "font-bold text-[18px]"
      }`}
    >
      {crime_score}
    </div>
  </div>
);
