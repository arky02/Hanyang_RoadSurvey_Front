import { SendSQLQuery } from "@/utils/sendsql";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";

function ChoicePage() {
  const [currImgIdx, setCurrImgIdx] = useState<number>(0);
  const [randImgNumList, setRandImgNumList] = useState<number[]>([]);
  const [isImgRendered, setIsImgRendered] = useState(false);
  const [tempRoundResult, setTempRoundResult] = useState<number[]>([-1, -1]); // 라운드 별 결과 저장
  const [resultList, setResultList] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({ age: "", sex: "" });

  const params = useSearchParams();
  const age = params.get("age");
  const sex = params.get("sex");

  useEffect(() => {
    if (age && sex) {
      setUserInfo({ age: age, sex: sex });
    }
  }, [age, sex]);

  let currRound = currImgIdx + 1;
  const btnList = ["ff0000", "ff8409", "ffeb0a", "36f339", "4d95fb"];
  function handleClick() {
    if ((tempRoundResult[0] || tempRoundResult[1]) === -1) {
      alert("답변을 선택 해 주세요.");
      return;
    }
    console.log(
      `Round ${currRound} - Img Num: ` + String(randImgNumList[currImgIdx])
    );

    userInfo &&
      SendSQLQuery({
        age: age!,
        sex: sex!,
        img_name: String(randImgNumList[currImgIdx]),
        transport_score: tempRoundResult[0],
        crime_score: tempRoundResult[0],
      });
    console.log("=== SQL Query 전송 ===");
    console.log({
      age: age!,
      sex: sex!,
      img_name: String(randImgNumList[currImgIdx]),
      transport_score: tempRoundResult[0],
      crime_score: tempRoundResult[0],
    });

    // resultList : 전체 결과 리스트
    setResultList((prev) => [
      ...prev,
      `${randImgNumList[currImgIdx]}:${tempRoundResult[0]},${tempRoundResult[1]}`,
    ]);

    setTempRoundResult([-1, -1]);

    // 다음 라운드로 이동
    setCurrImgIdx((prev) => prev + 1);
    setIsImgRendered(false);
  }

  useEffect(() => {
    let tempRandImgNumList: number[] = [];
    while (tempRandImgNumList.length < 30) {
      const num = Math.floor(Math.random() * 596) + 1; // 1~596
      if (!tempRandImgNumList.includes(num)) tempRandImgNumList.push(num);
    }
    setRandImgNumList(tempRandImgNumList);
  }, []);

  return (
    <main className="flex justify-center items-center md:h-[100vh] md:bg-[#0091ff4d] w-full">
      <div className="top-0 absolute bg-[#0091ff] w-full text-white font-semibold text-center md:p-5 p-3 md:text-[20px] text-[15px] ">
        성동구 보행 환경 인식에 대한 설문
      </div>
      {currImgIdx <= 29 ? (
        <section className="bg-white md:py-[55px] rounded-2xl mt-[73px] md:relative md:h-[745px] h-fit">
          <div className="w-full  h-[3px] absolute md:top-[0.2px] top-[44px] md:px-[8.5px] md:rounded-full left-[0px]">
            <div className="w-full h-full bg-[#ebebeb] md:rounded-full relative"></div>
            <div
              className="w-full h-full bg-[#0091ff] md:rounded-full absolute z-9 top-0 ease-in-out duration-300"
              style={{ width: `${(currRound / 30) * 100 - 1}%` }}
            ></div>
          </div>
          <div
            className="flex flex-col gap-[23px] items-center md:px-[20px] lg:px-[150px] px-[2px]"
            style={!isImgRendered ? { visibility: "hidden" } : {}}
          >
            <div className="flex items-center flex-col text-center">
              <h3 className="md:text-[25px] font-medium  md:block">
                교통/범죄 안전점수를 평가해주세요
              </h3>
            </div>

            <div className="hidden lg:flex absolute top-[50px] left-[55px] w-[120px] h-[48px] rounded-full shadow-md flex items-center justify-center font-bold text-[20px] text-[#FFFFFF] bg-[#0091ff]">
              Round {currImgIdx + 1}
            </div>
            <div className="lg:hidden block absolute top-[63px] md:top-[55px] md:left-[45px] left-[20px] w-[40px] h-[40px] rounded-full shadow-md flex items-center justify-center text-[15px] text-[#FFFFFF] bg-[#0091ff] font-bold">
              {currImgIdx + 1}R
            </div>
            <div className="flex relative flex-col md:w-full w-full items-center ">
              {randImgNumList[currImgIdx] && (
                <Image
                  src={`https://raw.githubusercontent.com/arky02/roadvsimgs/master/roadimgs/img${randImgNumList[currImgIdx]}.png`}
                  className="border-[5px] md:hover:border-[#0091ff85] border-[#ffffff] rounded-md w-[450px] h-fit md:w-fit md:h-[300px]"
                  alt="img"
                  width={400}
                  height={350}
                  onLoad={() => setIsImgRendered(true)}
                />
              )}
              <section className="flex flex-col md:w-[500px] w-[310px] md:mt-4  mt-3 gap-[12px]">
                <div className="flex flex-col">
                  <div className="text-[16px] md:text-[18px]">
                    <span className="font-bold text-[17px] md:text-[20px]  mr-[7px]">
                      교통점수
                    </span>
                    이 곳을 걷는다면 얼마나 안전할까?
                  </div>
                  <div className="flex justify-between md:h-[70px] h-[55px] items-center">
                    {btnList.map((el, idx) => (
                      <button
                        key={idx}
                        style={{ backgroundColor: "#" + el }}
                        className={`rounded-full shadow md:text-[25px] text-[20px] hover:text-[20px] md:w-[48px] md:h-[48px] w-[43px] h-[43px] hover:shadow-xl md:hover:text-[35px] hover:text-[25px] md:hover:h-[58px] md:hover:w-[58px] hover:h-[48px] hover:w-[48px] ${
                          isImgRendered && "ease-in-out duration-150"
                        } ${
                          tempRoundResult[0] === idx
                            ? "md:h-[59px] md:w-[59px] w-[48px] h-[48px] md:border-[1px] border-[1px] border-[#2f2f2f] text-[20px] hover:text-[25px] md:text-[35px] md:hover:text-[35px]"
                            : ""
                        }`}
                        onClick={() => setTempRoundResult(() => [idx])}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[16px] md:text-[18px]">
                    <span className="font-bold text-[17px] md:text-[20px] mr-[7px]">
                      교통점수
                    </span>
                    이 곳을 걷는다면 얼마나 안전할까?
                  </div>
                  <div className="flex justify-between md:h-[70px] h-[55px] items-center">
                    {btnList.map((el, idx) => (
                      <button
                        key={idx}
                        style={{ backgroundColor: "#" + el }}
                        className={`rounded-full md:text-[25px] text-[20px] hover:text-[20px] md:w-[48px] md:h-[48px] w-[43px] h-[43px] shadow hover:shadow-xl md:hover:text-[35px] hover:text-[25px] md:hover:h-[58px] md:hover:w-[58px] hover:h-[48px] hover:w-[48px] ${
                          isImgRendered && "ease-in-out duration-150"
                        } ${
                          tempRoundResult[1] === idx
                            ? "md:h-[59px] md:w-[59px] w-[48px] h-[48px] md:border-[1px] border-[1px] border-[#2f2f2f] text-[25px] hover:text-[25px] md:text-[35px] md:hover:text-[35px]"
                            : ""
                        }`}
                        onClick={() =>
                          setTempRoundResult((prev) => [prev[0], idx])
                        }
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <button
              className="md:w-[800px] w-[300px] hover:bg-[#0091ff] hover:text-white border-[#0091ff] border-[1px] rounded-2xl text-black font-semibold text-[16px] md:text-[17px] md:py-3 py-1.5 shadow-md md:mt-0 mt-1"
              onClick={handleClick}
            >
              {"다음"}
            </button>
          </div>
        </section>
      ) : (
        <div className="font-bold md:text-[25px] text-[20px] text-center h-[100vh] flex items-center">
          {" "}
          설문이 종료되었습니다.
          <br /> 감사합니다.
        </div>
      )}

      {currRound <= 29 && !isImgRendered && (
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
          {/* <div className="z-[100px] absolute top-[300px] md:hidden">
            <MutatingDots
              color="#0091ff"
              secondaryColor="#60bfff"
              height={90}
              width={90}
              radius="13"
            />
          </div> */}
        </>
      )}
    </main>
  );
}

export default ChoicePage;
