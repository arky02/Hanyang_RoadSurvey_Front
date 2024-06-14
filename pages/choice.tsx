import Image from "next/image";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";

function ChoicePage() {
  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [randImgNumList, setRandImgNumList] = useState<number[]>([]);
  const [isImgRendered, setIsImgRendered] = useState(false);
  const [selectState, setSelectState] = useState(0);
  const [tempRoundResult, setTempRoundResult] = useState<number[]>([]);
  const [resultList, setResultList] = useState<string[]>([]);

  console.log(isImgRendered);
  console.log(resultList);

  let currRound = currImgIdx + 1;
  const btnList = [
    ["😡", "ff0000"],
    ["☹️", "ff8409"],
    ["😐", "ffeb0a"],
    ["🙂", "00ff04"],
    ["😇", "3010ff"],
  ];
  function handleClick() {
    console.log(
      `Round ${currRound} - Img Num: ` + String(randImgNumList[currImgIdx])
    );

    if (selectState >= 1) {
      setTempRoundResult([]);
      setSelectState(0);
      setIsImgRendered(false);
      setCurrImgIdx((prev) => prev + 1);

      setResultList((prev) => [
        ...prev,
        `${randImgNumList[currImgIdx]}:${tempRoundResult[0]},${tempRoundResult[1]}`,
      ]);

      return;
    }

    setSelectState((prev) => ++prev);
  }

  useEffect(() => {
    let tempRandImgNumList: number[] = [];
    while (tempRandImgNumList.length < 30) {
      const num = Math.floor(Math.random() * 48 + 2);
      if (!tempRandImgNumList.includes(num)) tempRandImgNumList.push(num);
    }
    setRandImgNumList(tempRandImgNumList);
  }, []);

  return (
    <main className="flex justify-center items-center h-[100vh] md:bg-[#0091ff4d] ">
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold text-center md:p-5 p-3 md:text-[20px] text-[15px]">
        성동구 보행 환경 인식에 대한 설문
      </div>

      {currImgIdx <= 28 ? (
        <section className="bg-white md:py-[60px] rounded-2xl md:mt-[70px] mt-[30px] md:relative md:h-[765px] h-fit">
          <div className="w-full md:h-[5px] h-[3px] absolute md:top-[0.2px] top-[44px] md:px-[8.5px] md:rounded-full left-[0px]">
            <div className="w-full h-full bg-[#e5e5e5] md:rounded-full relative"></div>
            <div
              className="w-full h-full bg-[#0091ff] md:rounded-full absolute z-9 top-0 ease-in-out duration-300"
              style={{ width: `${(currRound / 30) * 100 - 1}%` }}
            ></div>
          </div>
          <div
            className="flex flex-col md:gap-[17px] gap-[5px] items-center md:px-[20px] lg:px-[150px] px-[10px]"
            style={!isImgRendered ? { visibility: "hidden" } : {}}
          >
            <div className="flex items-center flex-col text-center">
              <h3 className="md:text-[25px] font-medium hidden md:block">
                <span className="font-bold ">
                  {!selectState
                    ? '1. "교통"의 측면에서'
                    : '2. "범죄"의 측면에서'}
                </span>{" "}
                해당 구역의 안전성을 평가해주세요
              </h3>
              <h3 className="md:hidden block text-[17px] font-bold">
                {!selectState ? "1. 교통" : "2. 범죄"}
              </h3>

              <h5 className="text-[#434343] md:mt-8 mt-2 md:text-[20px] text-[14px] w-[170px] md:w-full">
                {!selectState
                  ? '"이 곳에서 길을 걷거나 운전을 한다면 안전할까요?"'
                  : '"이 곳이 범죄로부터 얼마나 안전해 보이나요?"'}
              </h5>
            </div>

            <div className="hidden lg:flex absolute top-[53px] left-[55px] w-[120px] h-[50px] rounded-full shadow-md flex items-center justify-center font-bold text-[20px] text-[#FFFFFF] bg-[#0091ff]">
              Round {currImgIdx + 1}
            </div>
            <div className="lg:hidden block absolute top-[50px] left-[11px] w-[27px] h-[27px] rounded-full shadow-md flex items-center justify-center text-[12px] text-[#FFFFFF] bg-[#0091ff]">
              {currImgIdx + 1}R
            </div>
            <div className="flex relative flex-col md:w-[600px] w-[190px] items-center">
              {randImgNumList[currImgIdx] && (
                <Image
                  src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/${randImgNumList[currImgIdx]}.png`}
                  className="border-[5px] md:hover:border-[#0091ff85] border-[#ffffff] rounded-md w-[180px] h-fit md:w-[350px] md:h-[350px]"
                  alt="img"
                  width={350}
                  height={350}
                  onLoad={() => setIsImgRendered(true)}
                />
              )}
              <section className="md:w-[500px] w-[200px] md:mt-4 mt-3.5">
                <div className="flex justify-between ">
                  <h2 className="md:text-[18px] text-[14px] font-bold text-[#501919]">
                    위험해요
                  </h2>
                  <h2 className="md:text-[18px] text-[14px] font-bold text-[#252065]">
                    안전해요
                  </h2>
                </div>
                <div className="flex justify-between md:h-[90px] h-[40px] items-center">
                  {btnList.map((el, idx) => (
                    <button
                      key={idx}
                      style={{ backgroundColor: "#" + el[1] }}
                      className={`rounded-full md:text-[40px] text-[15px] hover:text-[20px] md:w-[62px] md:h-[62px] w-[25px] h-[25px] hover:shadow-xl md:hover:text-[50px] hover:text-[16px] md:hover:h-[77px] md:hover:w-[77px] hover:h-[33px] hover:w-[33px] ${
                        isImgRendered && "ease-in-out duration-150"
                      } ${
                        tempRoundResult[selectState] === idx
                          ? "md:h-[77px] md:w-[77px] h-[33px] w-[33px] md:border-[3px] border-[1px] border-[#2f2f2f] text-[20px] hover:text-[20px] md:text-[50px] md:hover:text-[50px]"
                          : ""
                      }`}
                      onClick={() =>
                        !selectState
                          ? setTempRoundResult([idx])
                          : setTempRoundResult((prev) => [...prev, idx])
                      }
                    >
                      {el[0]}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <button
              className="md:w-[800px] w-[150px] hover:bg-[#0091ff] hover:text-white border-[#0091ff] border-[1px] rounded-2xl text-black font-semibold text-[16px] md:text-[17px] md:py-3 py-1 shadow-md md:mt-0 mt-1"
              onClick={handleClick}
            >
              {!selectState ? "다음" : "다음 라운드로 이동하기"}
            </button>
          </div>
        </section>
      ) : (
        <div className="font-bold md:text-[40px] text-[20px] text-center">
          {" "}
          설문이 종료되었습니다.
          <br /> 감사합니다.
        </div>
      )}

      {/* {currRound <= 29 && !isImgRendered && (
        <>
          <div className="z-[100px] absolute top-[500px] hidden md:block">
            <MutatingDots
              color="#0091ff"
              secondaryColor="#60bfff"
              height={100}
              width={100}
              radius="16"
            />
          </div>
          <div className="z-[100px] absolute top-[300px] md:hidden">
            <MutatingDots
              color="#0091ff"
              secondaryColor="#60bfff"
              height={90}
              width={90}
              radius="13"
            />
          </div>
        </>
      )} */}
    </main>
  );
}

export default ChoicePage;
