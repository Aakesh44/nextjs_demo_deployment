export default function UserProfile({params}: any) {
    return (
        <main>
            <h1 className=" text-cyan-500 text-3xl text-center mt-32">Profile page</h1>

            <h2 className=" text-2xl text-pink-300 text-center mt-28">User id: {params.id}</h2>
        </main>
    )
}