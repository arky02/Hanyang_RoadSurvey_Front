import Image from "next/image";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";

function ChoicePage() {
  const [currImgNum, setCurrImgNum] = useState<number>(0);
  const [winList, setWinList] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<number>();
  const [randImgNumList, setRandImgNumList] = useState<number[]>([]);
  const [imgRenderState, setImgRenderState] = useState(0);

  console.log(imgRenderState);

  let round = currImgNum / 2 + 1;

  function handleWinImgSelect() {
    setWinList((prev) => [
      ...prev,
      `${round} : ` + String(randImgNumList[currImgNum]),
    ]);
    console.log(winList);
    console.log(`${round} : ` + String(randImgNumList[currImgNum]));

    setCurrImgNum((prev) => prev + 2);
    setSelectedImg(-1);
    setImgRenderState(0);
  }

  useEffect(() => {
    let tempRandImgNumList: number[] = [];
    while (tempRandImgNumList.length < 30) {
      const num = Math.floor(Math.random() * 6945 + 1);
      if (!tempRandImgNumList.includes(num)) tempRandImgNumList.push(num);
    }
    setRandImgNumList(tempRandImgNumList);
  }, []);

  return (
    <main className="flex justify-center items-center h-[100vh] bg-[#0091ff4d] ">
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold text-center p-5 text-[20px]">
        성동구 보행 환경 인식에 대한 설문
      </div>

      <section className="flex flex-col gap-[60px] bg-white p-[55px] rounded-2xl items-center mt-[70px] relative h-[750px]">
        <div className="w-full h-[5px]  absolute top-[0.2px] px-[8.5px] rounded-full">
          <div className="w-full h-full bg-[#e5e5e5] rounded-full relative"></div>
          <div
            className="w-full h-full bg-[#0091ff] rounded-full absolute z-9 top-0 ease-in-out duration-300"
            style={{ width: `${(round / 15) * 100 - 1}%` }}
          ></div>
        </div>
        <h1 className="text-[40px] font-bold text-[#0091ff] -mb-[23px]">
          ROUND {round}
        </h1>
        <h3 className="text-[24px] font-medium">
          두 사진 중 어느 곳이 더 안전해보이나요?
        </h3>

        <div
          className="flex gap-[60px]"
          style={imgRenderState < 2 ? { visibility: "hidden" } : {}}
        >
          <div
            className={`${
              selectedImg === 0 && "border-[#0091ff] border-[10px]"
            } w-fit h-fit border-[5px] hover:border-[#0091ff85] border-[#ffffff] rounded-md relative`}
            style={selectedImg === 0 ? { borderColor: "#0091ff" } : {}}
            onClick={(e) => {
              setSelectedImg(0);
              e.preventDefault();
            }}
          >
            <Image
              src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/roadimg${randImgNumList[currImgNum]}.png`}
              alt="img"
              width={650}
              height={300}
              onLoad={() => setImgRenderState((prev) => ++prev)}
            />
            <div className="absolute top-3 left-2.5 w-[50px] h-[50px] rounded-full bg-white shadow-md flex items-center justify-center font-bold text-[20px] text-[#2f2f2f]">
              {currImgNum + 1}
            </div>
          </div>
          <div
            className={`${
              selectedImg === 1 && "border-[#0091ff] border-[10px]"
            } w-fit h-fit border-[5px] hover:border-[#0091ff85] border-[#ffffff] rounded-md relative`}
            style={selectedImg === 1 ? { borderColor: "#0091ff" } : {}}
            onClick={(e) => {
              setSelectedImg(1);
              e.preventDefault();
            }}
          >
            <Image
              src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/roadimg${
                randImgNumList[currImgNum + 1]
              }.png`}
              alt="img"
              width={650}
              height={300}
              onLoad={() => setImgRenderState((prev) => ++prev)}
            ></Image>
            <div className="absolute top-3 left-2.5 w-[50px] h-[50px] rounded-full bg-white shadow-md flex items-center justify-center font-bold text-[20px] text-[#2f2f2f]">
              {currImgNum + 2}
            </div>
          </div>
        </div>

        <button
          className="w-[800px] hover:bg-[#0091ff] hover:text-white border-[#0091ff] border-[1px] rounded-2xl text-black font-semibold text-[17px] py-3 shadow-md"
          onClick={handleWinImgSelect}
        >
          해당 사진 선택하기
        </button>
      </section>

      {imgRenderState < 2 && (
        <div className="z-[100px] absolute top-[500px]">
          <MutatingDots
            color="#0091ff"
            secondaryColor="#60bfff"
            height={100}
            width={100}
            radius="16"
          />
        </div>
      )}
    </main>
  );
}

export default ChoicePage;
