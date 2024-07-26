import { useState } from "react";
import { useRouter } from "next/navigation";
import SmallBtn from "@/components/SmallBtn";
import axios from "axios";

export default function Home() {
  const [age, setAge] = useState<number | null>();
  const [sex, setSex] = useState<string | null>();

  const ageArr = [10, 20, 30, 40, 50];
  const sexArr = ["남성", "여성"];

  const router = useRouter();

  function handleNextClick() {
    if (!age || !sex) {
      alert("나이와 성별을 모두 선택해주세요.");
      return;
    }

    router.push(`/choice?age=${age}&sex=${sex}`);
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-[#0091ff2f]">
      <button
        className="absolute md:top-[18px] md:text-[16px] text-[12px] top-[10px] md:border-[1px] md:border-[#202020] w-fit z-10 rounded-md md:px-[10px] md:py-[5px] p-[5px] md:right-[20px] right-[7px] md:shadow-md md:text-[#171717] text-[#242e74] underline md:no-underline"
        onClick={() => router.push("/result")}
      >
        Admin
      </button>
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold text-center md:p-5 p-3 md:text-[20px] text-[15px]">
        성동구 보행 환경 인식에 대한 설문
      </div>
      <section className="rounded-2xl w-[700px] md:shadow-md py-[10px] flex items-center justify-center md:mt-[70px] md:bg-white">
        <div className="flex flex-col md:gap-[50px] gap-[30px] md:gap-[50px] w-fit items-center md:items-start">
          <section className="rounded-2xl bg-white flex flex-col justify-evenly md:px-10 md:w-[500px] items-center md:h-[500px] bg-[#0091ff20] shadow-md md:shadow-none md:gap-[10px] gap-[35px] px-[20px] py-[35px] mx-[10px]">
            <h3 className="md:text-[20px] text-[17px] text-[#2f2f2f] md:w-fit font-bold  ">
              1. 설문자의 연령대과 성별을 선택해주세요
            </h3>
            <div className="flex flex-col items-start gap-[10px] md:gap-[20px] w-full">
              <h3 className="md:text-[18px] text-[16px] font-medium">
                (1) 나이
              </h3>
              <div className="flex md:gap-3 gap-2 ">
                {ageArr.map((el) => (
                  <SmallBtn
                    key={el}
                    text={el === 50 ? "50대 이상" : `${el}대`}
                    onClick={() => setAge(el)}
                    isSelected={el === age}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-[10px] md:gap-[20px] w-full">
              <h3 className="md:text-[18px] text-[16px] font-medium md:mt-0 ">
                (2) 성별
              </h3>
              <div className="flex gap-3 ">
                {sexArr.map((el) => (
                  <SmallBtn
                    key={el}
                    text={`${el}`}
                    onClick={() => setSex(el)}
                    isSelected={el === sex}
                  />
                ))}
              </div>
            </div>
            <button
              className="md:w-[500px] w-[150px] hover:bg-[#0091ff] hover:text-white border-[#0091ff] border-[1px] rounded-2xl text-black font-semibold text-[16px] md:text-[17px] md:py-3 py-1 shadow-md md:mt-0 mt-1"
              onClick={handleNextClick}
            >
              다음
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}
