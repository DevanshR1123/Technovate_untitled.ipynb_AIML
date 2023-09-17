import { Listbox } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

export const CustomListBox = ({
  data,
  selectedItem,
  setSelectedItem,
  disable,
  label,
}: {
  data: string[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  disable?: boolean;
  label: string;
}) => {
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem} as="div" className="grid-rows-label relative grid gap-2 text-sm" disabled={disable}>
      <Listbox.Label>{label}</Listbox.Label>
      <Listbox.Button className="h-10 rounded-md border bg-inherit px-4 py-2 text-left text-base" id={label}>
        {selectedItem}
      </Listbox.Button>
      <Listbox.Options className="absolute left-0 right-0 top-[110%] z-[1] grid max-h-48 overflow-y-auto rounded-md border bg-neutral-900 px-4 py-2 text-sm">
        {data.map((item) => (
          <Listbox.Option key={item} value={item} className="cursor-pointer p-2 hover:bg-white/20">
            {item}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
