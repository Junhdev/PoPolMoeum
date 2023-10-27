'use client'

import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
//import { User } from "../types";

export interface User {
    id: number;
    user_id: string;
    username: string;
    password: string;
    email: string;
    universityId: number;
    // 학년 및 휴학 및 졸업
    gradeId: number;
    majorId: number;
    careerId: number;
    profileImg: string;
    createdAt: string;
    updatedAt: string;
  }

interface State {
    authenticated: boolean;
    user: User | undefined;
    loading: boolean;
}

const StateContext = createContext<State>({
    // 초기값 설정
    authenticated: false,
    user: undefined,
    loading: true
});

// 업데이트시 이용
const DispatchContext = createContext<any>(null);

interface Action {
    type: string;
    payload: any;
}

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                authenticated: true,
                user: payload
            }
        case "LOGOUT":
            return {
                ...state,
                authenticated: false,
                user: null
            }
        case "STOP_LOADING":
            return {
                ...state,
                loading: false
            }
        default:
            throw new Error(`Unknown action type: ${type}`)
    }
}


export const AuthProvider = ({children}: { children: React.ReactNode }) => {

    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true
    })

    console.log('state', state);

    // 유저 정보 업데이트 시 이용
    const dispatch = (type: string, payload?: any) => {
        defaultDispatch({ type, payload });
    }

    // 로그인 후에 로그인 페이지나 회원가입 페이지 접근 시 다시 메인 페이지로 redirect하게 만들기
    useEffect(() => {
        async function loadUser() {
            try {
                const res = await axios.get("/auth/me");
                dispatch("LOGIN", res.data);
            } catch (error) {
                console.log(error)
            } finally {
                dispatch("STOP_LOADING");
            }
        }
        loadUser();
    }, [])


    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>        
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);