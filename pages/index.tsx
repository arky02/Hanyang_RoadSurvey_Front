import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="flex justify-center items-center h-[100vh] bg-[#0091ff4d]">
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold  text-center p-5 text-[20px]">
        성동구 보행 환경 인식에 대한 설문
      </div>
      <section className="mt-[70px] bg-white rounded-2xl w-[750px] shadow-md h-[800px] py-[100px] flex items-center justify-center">
        <div className="flex flex-col gap-[60px]  w-fit">
          <h3 className="text-[20px] text-[#2f2f2f] w-fit font-medium">
            1. 설문자의 연령대과 성별을 선택해주세요
          </h3>

          <section className="rounded-2xl bg-white flex flex-col justify-evenly px-10 w-[500px] h-[180px] bg-[#0091ff20] shadow-md">
            <h3 className="text-[18px] font-medium">(1) 나이</h3>
            <div className="flex gap-3 -mt-4">
              {ageArr.map((el) => (
                <SmallBtn
                  key={el}
                  text={el === 50 ? "50대 이상" : `${el}대`}
                  onClick={() => setAge(el)}
                  isSelected={el === age}
                />
              ))}
            </div>
          </section>
          <section className="rounded-2xl bg-white flex justify-evenly flex-col px-10 w-[500px] h-[180px] bg-[#0091ff20] shadow-md">
            <h3 className="text-[18px] font-medium">(2) 성별</h3>
            <div className="flex gap-3 -mt-4">
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
            className="bg-[#0091ff] rounded-2xl text-white font-semibold text-[16px] py-2.5 shadow-md"
            onClick={handleNextClick}
          >
            다음으로
          </button>
        </div>
      </section>
    </main>
  );
}

function SmallBtn({
  text,
  onClick,
  isSelected,
}: {
  text: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <button
      className={`hover:bg-[#0091ff49] hover:text-black  hover:shadow-xl hover:font-semibold rounded-2xl px-4 py-[5px] font-semibold text-[#505050] shadow-md border-[1px] border-[#0091ff] ${
        isSelected && "bg-[#0091ff] text-white hover:text-black"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
