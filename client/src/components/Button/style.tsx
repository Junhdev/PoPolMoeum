'use client'

import styled from "styled-components";
import tw from "twin.macro"
import { ButtonProps } from "./Button";

export const ButtonStyled = styled.button.attrs((props) => ({
    type: props.type || 'button',
  }))<ButtonProps>`
    ${tw`hover:shadow rounded text-sm text-white font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none`}
    ${(props) => props.color === 'red' && tw`bg-red-500 active:bg-red-600`}
    ${(props) => props.color === 'blue' && tw`bg-blue-500 active:bg-blue-600`}
    ${(props) => props.size === 'xsmall' && tw`p-2 px-3`}
    ${(props) => props.size === 'small' && tw`px-1 py-1`}
    ${(props) => props.size === 'medium' && tw`px-4 py-2`}
    ${(props) => props.size === 'large' && tw`px-8 py-4`}    
    ${(props) => props.disabled && tw`bg-gray-500`}
    `