"use client";

import { DashboardPage } from "@/container";
import { getToken } from "@/util";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
        const router = useRouter();
    const token = getToken();

    useEffect(() => {
        if (token === undefined) {
            router.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <DashboardPage />;
}
