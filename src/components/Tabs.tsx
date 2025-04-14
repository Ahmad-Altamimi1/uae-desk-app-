import { JSX } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTranslations } from "next-intl/server";

interface TabItem {
  name: string;
  component: JSX.Element;
}

interface TabsProps {
  items: TabItem[];
}

const TabsComponent: React.FC<TabsProps> = async ({ items }) => {
  const t = await getTranslations();
  return (
    <Tabs defaultValue={items[0].name} className="w-full flex flex-col">
      <TabsList className="flex w-full">
        {items.map((item) => (
          <TabsTrigger
            className="w-full flex-1"
            key={item.name}
            value={item.name}
          >
            {t(item.name)}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.name} value={item.name} className="w-full">
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
