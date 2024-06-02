import Image from "next/image";
import { useState } from "react";

function ChoicePage() {
  const [currImgNum, setCurrImgNum] = useState<number>(0);

  const randImgNum: number[] = [];

  while (randImgNum.length != 30) {
    const num = Math.floor(Math.random() * 6945 + 1);
    if (!randImgNum.includes(num)) {
      randImgNum.push(num);
    }
  }

  function handleClick() {
    setCurrImgNum((prev) => prev + 2);
  }

  return (
    <main className="flex justify-center items-center h-[100vh]">
      <div className="top-0 absolute bg-[#f8f9fa] w-full text-black font-bold text-center p-5 text-[20px]">
        성동구 보행 환경 인식에 대한 설문
      </div>
      <section className="flex gap-[60px]">
        <section>
          <Image
            src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/roadimg${randImgNum[currImgNum]}.png`}
            alt="img"
            width={650}
            height={300}
          ></Image>
        </section>
        <section>
          <Image
            src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/roadimg${
              randImgNum[currImgNum + 1]
            }.png`}
            alt="img"
            width={650}
            height={300}
          ></Image>
        </section>
      </section>
      <button onClick={handleClick}>next</button>
    </main>
  );
}

export default ChoicePage;
