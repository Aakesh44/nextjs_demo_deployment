import Link from "next/link"

export default function NotFound() {
    return (
        <main className=" w-screen h-screen bg-white flex flex-col items-center justify-start pt-[5%] gap-2 text-cyan-600 font-semibold">
            <h2 className=" text-5xl">Not Found</h2>
            <p className=" text-xl">Could not find requested resource</p>
            <Link href="/" className="hover:underline underline-offset-2">Return Home 🏡</Link>
        </main>
    )
}