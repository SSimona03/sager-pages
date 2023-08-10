import Link from "next/link";


export default function Home() {


  return (

    <div className=" w-screen h-screen m-0 p-0 flex flex-col  md:flex-row" >
      <Link href="/search" className="search bg-search bg-center bg-cover bg-no-repeat cursor-pointer grow h-screen  transition-transform transform-gpu hover:scale-105">
        <div ></div>
      </Link>
      <Link href="/graph" className=" graph bg-graph  bg-center bg-cover bg-no-repeat cursor-pointer grow h-screen ransition-transform transform-gpu hover:scale-105">
        <div ></div>
      </Link>
    </div >


  );
}
