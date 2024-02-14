'use client'

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { APP_ROUTES } from "@/constants/app-routes";
import Error from '../../components/Error'

type PriveteRoutesProps = {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PriveteRoutesProps) => {
    const { push } = useRouter();

    const isUserAuthenticated = () => {
        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('access_token');
            return !!accessToken;
        }
        return false;
    };

    const isAuthenticated = isUserAuthenticated();
    
    useEffect(() => {
        if(!isAuthenticated) {
            push(APP_ROUTES.public.login);
        }
    }, [isAuthenticated, push]);

    return (
        <>
            {!isAuthenticated && <Error />}
            {isAuthenticated && children}
        </>
    );
}

export default PrivateRoute;