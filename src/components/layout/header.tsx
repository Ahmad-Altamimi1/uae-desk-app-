import { SidebarTrigger } from "../ui/sidebar";
import { FiBell, FiSettings } from "react-icons/fi";

const Header = () => {
  return (
    <div className=" w-full flex items-center justify-center  fixed   top-5 z-[100000]">
      <header className=" bg-white w-[90%] rounded-xl border py-6 shadow-sm  ">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">

            <img src="/group 8.png" alt="Logo" width={200} height={50} />

            <div className="bg-[#00713a1e] p-2 py-5 w-[50px] h-[80px] rounded-xl ">
              <SidebarTrigger />
            </div>

          </div>


          <nav className="flex items-center space-x-4">

            <div className="flex items-center space-x-3">
              <img src="/user.png" className="rounded-4xl" alt="Logo" width={70} height={70} />
              <div className="flex flex-col items-start">
                <span className="text-gray-400 text-[20px] font-semibold">Hello ,</span>
                <span className="text-black-500 text-[16px] font-semibold">Khaled Mohsen</span>
              </div>
            </div>


            <div className="bg-[#F1F1F1] p-2 py-2 w-[50px] h-[50px] rounded-4xl">
              <img src="/flag.png" className="rounded-xl w-[50px] h-[30px]" alt="Logo" />
            </div>


            <div className="relative bg-[#F1F1F1] p-3 py-3 w-[50px] h-[50px] rounded-4xl">
              <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-semibold w-[14px] h-[14px] rounded-full flex items-center justify-center">
                
              </div>
              <FiBell className="text-gray-600" size={24} />
            </div>


            <div className="bg-[#00713B0D] p-3 py-3 w-[50px] h-[50px] rounded-4xl ">
              <FiSettings className="text-[#00713B]" size={24} />

            </div>

          </nav>
        </div>
      </header>
    </div>
  )
};

export default Header;
