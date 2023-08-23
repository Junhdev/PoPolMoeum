'use client'

import { FC } from 'react'
import {
  MdOutlineHome,
  MdSearch,
} from "react-icons/md"
import { BsFillBookmarkFill } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import styled from 'styled-components'
import tw from 'twin.macro'
import { useRouter } from 'next/router'
import Link from 'next/link'

const headerNavigationTabList = [
  { icon: <MdOutlineHome />, href: '/home', text: '홈' },
  { icon: <MdSearch />, href: '/study', text: '스터디 찾기' },
  { icon: <BsFillBookmarkFill />, href: '/mystudy', text: '내 스터디' },
  { icon: <AiOutlineUser />, href: '/mypage', text: '마이페이지' }
]

const HeaderNavigationTab: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()

  return (
    <div
      className={`${className} fixed bottom-0 z-[15] flex w-full bg-white sm:static sm:w-fit`}
    >
      {headerNavigationTabList.map((nav, idx) => (
        <Link href={nav.href} key={idx} passHref>
          <TabItem selected={nav.href === router.pathname}>
            {nav.icon}
            <span>{nav.text}</span>
          </TabItem>
        </Link>
      ))}
    </div>
  )
}

export default HeaderNavigationTab

const TabItem = styled.a<{ selected: boolean }>`
  ${tw`flex w-1/4 items-center flex-col text-xs p-2 md:w-24 rounded hover:bg-blue-50 cursor-pointer text-gray-500 font-bold`}
  & {
    svg {
      ${tw`h-6 w-6`}
    }
    span {
      ${tw`mt-1`}
    }
  }
  ${(props) => props.selected && tw`bg-blue-100 text-blue-800`}
  `