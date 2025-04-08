import Image from "next/image";
import { SidebarMenuButton, SidebarTrigger } from "../ui/sidebar";
import { FiBell, FiSettings } from "react-icons/fi";
import ResetPassword from "@/app/[locale]/(dashboard)/dashboard/(profile)/resetPassword";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IconDotsVertical, IconUserCircle, IconCreditCard, IconNotification, IconLogout } from "@tabler/icons-react";
import { get } from "http";
import { getTranslations, getLocale } from "next-intl/server";
import { FiMail, FiLock } from "react-icons/fi";


const Header = async () => {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
  const locale = getLocale()
  const t = await getTranslations({ locale: locale, namespace: 'dashboard.header' });
  return (
    <div className=" w-full flex items-center justify-center  fixed  top-5 z-[100000]">
      <header className=" bg-white w-[90%] rounded-xl border py-6 shadow-sm  ">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">

            <Image src="/group 8.png" alt="Logo" width={136} height={58} />

            <div className="bg-[#00713a1e] p-1 py-5 w-[35px] h-[60px] rounded-xl ">
              <SidebarTrigger />
            </div>

          </div>


          <nav className="flex items-center space-x-4">

            <div className="flex items-center space-x-3">
              <Image src="/user.png" className="rounded-4xl" alt="Logo" width={48} height={48} />
              <div className="flex flex-col items-start">
                <span className="text-gray-400 text-[16px] font-semibold">Hello ,</span>
                <span className="text-black-500 text-[16px] font-semibold">Khaled Mohsen</span>
              </div>
            </div>


            <div className="bg-[#F1F1F1] p-2 w-[40px] h-[40px] rounded-4xl">
              <Image src="/flag.png" width={27} height={26} className="rounded-xl w-[27px] h-[26px]" alt="Logo" />
            </div>


            <div className="relative bg-[#F1F1F1] p-2 py-2 w-[40px] h-[40px] rounded-4xl">
              <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-semibold w-[14px] h-[14px] rounded-full flex items-center justify-center">

              </div>
              <FiBell className="text-gray-600" size={23} />
            </div>



            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="bg-[#00713B0D] p-2 py-2 w-[40px] h-[40px] rounded-4xl">
                    <FiSettings className="text-[#00713B]" size={23} aria-label={t('Settings')} />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="bg-white border rounded-xl shadow-md w-50"
                side="top"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center px-4 py-3 text-left text-sm bg-gray-100 rounded-t-xl">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarFallback className="rounded-lg">
                        <Image src="/crown.png" alt="Logo" width={20} height={20} />
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm ml-3">
                      <span className="truncate font-medium text-gray-800">{user.name}</span>
                      <span className=" truncate text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuGroup>
                  <DropdownMenuItem>

                    <ResetPassword />
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem>
                  <div className="flex items-center gap-2 text-left text-sm leading-tight text-red-500 ml-5">
                    <IconLogout />
                    <span className="truncate text-red-500 text-sm font-bold">Log out</span>
                    </div>

                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


          </nav>
        </div>
      </header>
    </div>
  )
};

export default Header;
