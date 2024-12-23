"use client";

import { FilePage } from "@/container";
import { getToken } from "@/util";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components";

export default function File() {
	const router = useRouter();
	const token = getToken();

	useEffect(() => {
		if (token === undefined) {
			router.push("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout>
			<FilePage />
		</Layout>
	);
}
