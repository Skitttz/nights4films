export const borderModal = `relative border-solid border-t-[42px] rounded-md`;
export const styleExit = `absolute block -top-8 right-5 content-exit opacity-50 hover:opacity-100`;

export function handleKeyDown(event: any, setModal: (value: boolean) => void, setIsActive: (value: boolean) => void, timerTransition: number) {
  if (event.key === 'Escape') {
    setIsActive(true);
    setTimeout(() => {
      setModal(false);
    }, timerTransition);
  }
}

export function handleOutSideClick(
  event: any,
  setModal: (value: boolean) => void,
  setIsActive: (value: boolean) => void,
  timerTransition: number,
) {
  if (event.target === event.currentTarget) {
    setIsActive(true);
    setTimeout(() => {
      setModal(false);
    }, timerTransition);
  }
}
