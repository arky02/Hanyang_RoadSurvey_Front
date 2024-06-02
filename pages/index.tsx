export default function Home() {
  return (
    <main className="flex justify-center items-center h-[100vh]">
      <div className="top-0 absolute bg-[#f8f9fa] w-full text-black font-bold text-center p-5 text-[20px]">
        성동구 보행 환경 인식에 대한 설문
      </div>
      <section className="mt-[70px]">
        <h3 className="text-[24px] font-bold text-center mb-[20px]">
          당신의 연령과 성별을 선택하세요
        </h3>
        <div>
          <section className="rounded-xl bg-[#00b2d4] flex flex-col justify-evenly items-center px-10 mb-[20px] h-[150px]">
            <h3 className="text-[20px] font-bold text-center">나이</h3>
            <div className="flex gap-3">
              <SmallBtn text="10대" />
              <SmallBtn text="20대" />
              <SmallBtn text="30대" />
              <SmallBtn text="40대" />
              <SmallBtn text="50대 이상" />
            </div>
          </section>
          <section className="rounded-xl bg-[#00b2d4] flex justify-evenly items-center flex-col px-10 h-[150px]">
            <h3 className="text-[20px] font-bold text-center">성별</h3>
            <div className="flex gap-3">
              <SmallBtn text="남성" />
              <SmallBtn text="여성" />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function SmallBtn({ text }: { text: string }) {
  return (
    <button className="bg-white rounded-lg px-3 py-1 font-semibold text-[#505050]">
      {text}
    </button>
  );
}
