"use client";

import { LoginPage } from "@/container";
import { getToken } from "@/util";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
		const router = useRouter();
	const token = getToken();

	useEffect(() => {
		if (token !== undefined) {
			router.push("/dashboard");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <LoginPage />;
}
