import { getResults } from "@/utils/sendsql";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ExcelImg from "@/public/assets/excel_img.png";

const headers = ["나이대", "성별", "이미지 이름", "교통점수", "범죄점수"];

export default function Result() {
  const [res, setRes] = useState();
  const [pwd, setPwd] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    if (pwd !== process.env.NEXT_PUBLIC_ADMIN_PWD) {
      alert("비밀번호가 맞지 않습니다!");
      return;
    }
    console.log("admin login succeed!");
    alert("admin 페이지 로그인에 성공하였습니다!");
    setIsAuthenticated(true);
  };

  const convertToExcel = () => {
    const excelData = [
      headers,
      //@ts-ignore
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
        //@ts-ignore
        setRes(result?.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <main className="w-[100vw] flex justify-center md:overflow-y-scroll overflow-scroll">
      <div className="p-[100px] w-fit flex flex-col items-end">
        <h1 className="text-center w-full font-bold md:text-[40px] text-[25px] mb-[40px]">
          설문조사 결과 조회
        </h1>
        <button
          className="md:flex  hidden font-bold text-[20px] border-[3px] border-[#26b94a]  items-center rounded px-[10px] py-[5px] gap-[5px] shadow-lg bg-[#14cd422a] mb-[50px]"
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

          {
            //@ts-ignore
            res?.map((el) => (
              <div key={el._id} className="flex">
                {makeTableRow(el)}
              </div>
            ))
          }
        </div>
      </div>
    </main>
  ) : (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="md:w-[500px] md:h-[300px] w-[300px] h-[200px] bg-[#f1f1f1] rounded-xl flex flex-col justify-center items-center shadow-lg md:gap-[15px] gap-[10px]">
        <h2 className="text-[16px] md:text-[18px]">
          관리자 비밀번호를 입력해주세요
        </h2>
        <input
          className="rounded-full py-[8px] w-[200px] px-[15px]"
          placeholder="비밀번호 입력 "
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        ></input>
        <button
          className="bg-[#0091ff] rounded-full py-[5px] text-[#ffffff] w-[190px] mt-[20px]"
          onClick={handleLogin}
        >
          Enter
        </button>
      </div>
    </div>
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
    <div className="md:w-[60px] w-[30px] border-[1px] border-[#000000] text-center font-bold text-[11px] md:text-[16px]">
      {_id}
    </div>
    <div
      className={`md:w-[100px] w-[45px] border-[1px] border-[#000000] text-center text-[11px] md:text-[16px] ${
        isHeader && "font-bold text-[13px] md:text-[18px]"
      }`}
    >
      {age}
    </div>
    <div
      className={`md:w-[100px] w-[45px] border-[1px] border-[#000000] text-center text-[11px] md:text-[16px] ${
        isHeader && "font-bold text-[13px] md:text-[18px]"
      }`}
    >
      {sex}
    </div>
    <div
      className={`md:w-[300px] w-[200px] border-[1px] border-[#000000] text-center text-[11px] md:text-[16px] ${
        isHeader && "font-bold text-[13px] md:text-[18px]"
      }`}
    >
      {img_name}
    </div>
    <div
      className={`md:w-[100px] w-[45px] border-[1px] border-[#000000] text-center text-[11px] md:text-[16px] ${
        isHeader && "font-bold text-[13px] md:text-[18px]"
      }`}
    >
      {transport_score}
    </div>
    <div
      className={`md:w-[100px] w-[45px] border-[1px] border-[#000000] text-center text-[11px] md:text-[16px] ${
        isHeader && "font-bold text-[13px] md:text-[18px]"
      }`}
    >
      {crime_score}
    </div>
  </div>
);
