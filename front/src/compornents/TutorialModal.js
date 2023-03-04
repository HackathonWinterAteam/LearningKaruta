import React from 'react'

export default function TutorialModal({modalClose}) {
  return (
    <>
      <section
        className="fixed z-10 top-0 left-0 w-full h-full"
        onClick={modalClose}
      >
        <div className="w-full h-full bg-transparent-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-lg py-[50px] px-[50px] bg-white">
            <p>1.カルタの絵札と読み札が表示されます</p>
            <br />
            <p>2.読み札に合った絵札をCPUより早く取りましょう！</p>
            <br />
            <p>3.間違えたらCPUが取ってしまいます...</p>
            <br />
            <p>4.最終的なスコアで勝敗が決まる！</p>
        </div>
      </section>
    </>
  )
}
