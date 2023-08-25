import styled from 'styled-components'
import tw from 'twin.macro'

const StyledTabItem = styled.a<{ selected: boolean }>`
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

  export default StyledTabItem;