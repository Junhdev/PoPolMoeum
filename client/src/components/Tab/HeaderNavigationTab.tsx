'use client'

import { FC } from 'react'
import {
  MdOutlineHome,
  MdSearch,
} from "react-icons/md"
import { BsFillBookmarkFill } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { useRouter } from 'next/router'
import Link from 'next/link'
import StyledTabItem from './style'

const headerNavigationTabList = [
  { icon: <MdOutlineHome />, href: '/home', text: '홈' },
  { icon: <MdSearch />, href: '/study', text: '스터디 찾기' },
  { icon: <BsFillBookmarkFill />, href: '/mystudy', text: '나의 스터디' },
  { icon: <AiOutlineUser />, href: '/mypage', text: '저장한 스터디' }
]

const HeaderNavigationTab: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()

  return (
    <div
      className={`${className} fixed bottom-0 z-[15] flex w-full bg-white sm:static sm:w-fit`}
    >
      {headerNavigationTabList.map((nav, idx) => (
        <Link href={nav.href} key={idx} passHref>
          <StyledTabItem selected={nav.href === router.pathname}>
            {nav.icon}
            <span>{nav.text}</span>
          </StyledTabItem>
        </Link>
      ))}
    </div>
  )
}

export default HeaderNavigationTab;