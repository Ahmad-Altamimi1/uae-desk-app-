
import React from "react";
import { useTranslations } from "next-intl";
// import CreateButton from "@/components/table/createButton";
import Image from "next/image";
// import { Modal } from "../modal/modal";
import CreateButton from "./createButton";
import { Button } from "../ui/button";
import { Modal } from "../modal/modal";

interface ToolBarModalProps {
    title: string;
    description: string;
    image: string;
    addButton: {
        title: string;
    };
    children: React.ReactNode

}



const ToolBarModal = ({ title, description, image, addButton, children }: ToolBarModalProps) => {
    const { title: buttonTitle } = addButton;
    const t = useTranslations();

    return (
        <div className="flex justify-between items-center mt-6 mb-4 px-6 lg:px-18">
            <div className="flex items-center gap-4">
                <Image
                    src={image}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <h2 className="text-[25px] font-bold text-gray-800">
                        {t(title)}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t(description)}
                    </p>
                </div>
            </div>
            <Modal title={'dashboard.permissions.title'} description={"dashboard.permissions.description"}

                triggerButton={<>
                    <Button className="bg-[#00713B] px-6 py-3 text-base flex items-center gap-2">


                        <Image src="/plus.png" alt="Logo" width={24} height={24} />
                        <span className="hidden lg:inline">{t(title)}</span>
                    </Button>
                </>}>


                {children}

            </Modal>
        </div>
    );
};

export default ToolBarModal;
