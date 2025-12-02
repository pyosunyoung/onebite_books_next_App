'use client';

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0, //스크롤 위치 최상단에 위치
      })
    }
  })

  return createPortal(<dialog
  onClose={()=> router.back()} //esc 누르면 뒤로가기
    onClick={(e) => {
      //모달의 배경이 클릭이된거면 -> 뒤로가기
      if ((e.target as any).nodeName === 'DIALOG') {
        router.back()
      }
    }} className={style.modal}
    ref={dialogRef}>
    {children}
  </dialog>,
    document.getElementById("modal-root") as HTMLElement)
}