import { RotatingLines } from "react-loader-spinner";

function PokeballLoading() {
  // return (
  //   <div className="w-full h-auto">
  //     <div className="full-circle relative  w-full aspect-1 rounded-full bg-blue-400 flex flex-col justify-center items-center z-10">
  //       <div className="  w-full h-1/2 bg-red-500 rounded-t-full border-black border-3p 2xs:border-4 flex justify-center items-end ">
  //       </div>
  //       <div className=" w-full h-1/2 bg-white rounded-b-full border-black border-3p 2xs:border-4 flex justify-center items-start "></div>

  //     <div className="absolute  w-1/4 aspect-1 bg-white rounded-full border-black border-3p 2xs:border-4 flex justify-center items-center">
  //       <div className="w-[60%] aspect-1 border-black border-2p 2xs:border-2 rounded-full"></div>
  //     </div>
  //     </div>

  //   </div>
  // );

  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="100%"
      visible={true}
    />
  )
}

export default PokeballLoading;
