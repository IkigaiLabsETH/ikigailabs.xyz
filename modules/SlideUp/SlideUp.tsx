import React, { FC, ReactNode, MouseEvent, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { hide, selectSlideUp } from './slideUp.slice'
import clsx from 'clsx'

interface SlideUpProps {
  slideUps: { [key: string]: (data: { [key: string]: any }) => ReactNode }
}

export const SlideUp: FC<SlideUpProps> = ({ slideUps }) => {
  const { data, open, slideUp } = useAppSelector(selectSlideUp)
  const dispatch = useAppDispatch()
  const [selectedSlideUp, setSelectedSlideUp] = useState<ReactNode>(null)

  useEffect(() => {
    slideUp && setSelectedSlideUp(slideUps[slideUp](data))

    return () => setSelectedSlideUp(null)
  }, [slideUp, data, slideUps])

  const closeSlideUp = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target ) {
      setSelectedSlideUp(null)
      dispatch(hide())
    }
  }

  return (
    <div
      className={clsx('w-full h-full fixed z-30 flex items-end overflow-hidden transform duration-500', open ? '-inset-y-0 backdrop-blur-sm' : 'inset-y-full backdrop-blur-none')}
      onClick={closeSlideUp}
    >
      <div className="w-full bg-white flex justify-center items-start border-t-4 border-t-black h-5/6">
        <div className=" text-black w-full max-w-screen-2xl px-5 flex flex-row items-start h-full relative">
          <div className='h-full md:p-5'>
            {selectedSlideUp && selectedSlideUp}
          </div>
          <button onClick={() => dispatch(hide())} className="text-3xl leading-none ml-3 p-1.5 text-gray-500 absolute right-5 md:right-10">
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}
