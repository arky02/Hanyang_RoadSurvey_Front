import { useState } from "react";
import { useRouter } from "next/navigation";
import SmallBtn from "@/components/SmallBtn";

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

    router.push("/choice");
  }

  return (
    <main className="flex justify-center items-center h-[100vh] md:bg-[#0091ff4d]">
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold text-center md:p-5 p-3 md:text-[20px] text-[15px]">
        성동구 보행 환경 인식에 대한 설문
      </div>
      <section className="mt-[70px] bg-white rounded-2xl w-[750px] md:shadow-md h-[800px] py-[10px] flex items-center justify-center md:mt-[70px] ">
        <div className="flex flex-col md:gap-[60px] gap-[30px] w-fit items-center md:items-start">
          <h3 className="md:text-[20px] text-[16px] text-[#2f2f2f] md:w-fit font-bold  ">
            1. 설문자의 연령대과 성별을 선택해주세요
          </h3>
          <section className="rounded-2xl bg-white flex flex-col justify-evenly md:px-10 md:w-[500px]  md:h-[400px] bg-[#0091ff20] shadow-md md:gap-[10px] gap-[5px] px-[20px] py-[35px] mx-[10px]">
            <h3 className="md:text-[18px] text-[16px] font-medium">(1) 나이</h3>
            <div className="flex md:gap-3 gap-2 md:-mt-4">
              {ageArr.map((el) => (
                <SmallBtn
                  key={el}
                  text={el === 50 ? "50대 이상" : `${el}대`}
                  onClick={() => setAge(el)}
                  isSelected={el === age}
                />
              ))}
            </div>

            <h3 className="md:text-[18px] text-[16px] font-medium md:mt-0 mt-[60px]">
              (2) 성별
            </h3>
            <div className="flex gap-3 md:-mt-4">
              {sexArr.map((el) => (
                <SmallBtn
                  key={el}
                  text={`${el}`}
                  onClick={() => setSex(el)}
                  isSelected={el === sex}
                />
              ))}
            </div>
          </section>
          <button
            className="md:w-[500px] w-[150px] hover:bg-[#0091ff] hover:text-white border-[#0091ff] border-[1px] rounded-2xl text-black font-semibold text-[16px] md:text-[17px] md:py-3 py-1 shadow-md md:mt-0 mt-1"
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      </section>
    </main>
  );
}
