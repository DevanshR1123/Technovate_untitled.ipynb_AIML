import { Combobox } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";

export const CustomComboBox = ({
  data,
  selectedItem,
  setSelectedItem,
  disable,
  id,
}: {
  data: string[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  disable?: boolean;
  id: string;
}) => {
  const [query, setQuery] = useState("");

  const filteredData = query === "" ? data : data.filter((item) => item && item.toLowerCase().includes(query.toLowerCase()));

  return (
    <Combobox value={selectedItem} onChange={setSelectedItem} disabled={disable} as="div" className="relative grid">
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} id={id} className="rounded-md border bg-inherit px-4 py-2 text-base" autoComplete="off" />
      <Combobox.Options className="absolute left-0 right-0 top-[100%] z-[1] mt-2 rounded-md border bg-neutral-900 bg-opacity-100 px-4 py-2 text-sm">
        {filteredData.map((item) => (
          <Combobox.Option key={item} value={item}>
            {item}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};
