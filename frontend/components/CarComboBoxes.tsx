"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { CustomListBox } from "./CustomListBox";
import { Combobox } from "@headlessui/react";

export const CarComboBoxes = ({
  selectedCar,
  setSelectedCar,
}: {
  selectedCar: string;
  setSelectedCar: (value: string) => void;
  // selectedMake: string;
  // setSelectedMake: (value: string) => void;
  // selectedModel: string;
  // setSelectedModel: (value: string) => void;
  // selectedFuelType: string;
  // setSelectedFuelType: (value: string) => void;
}) => {
  const supabase = createClientComponentClient();

  const [cars, setCars] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  const filteredData = query === "" ? cars : cars.filter(({ id, Make, Model, Fuel_Type }) => `${Make} ${Model} (${Fuel_Type})`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const getCars = async () => {
      const { data, error } = await supabase.from("cars").select("*");
      if (error) {
        console.log(error);
      } else {
        setCars(data);
      }
    };
    getCars();
  }, []);

  useEffect(() => {
    console.log(selectedCar);
  }, [selectedCar]);

  useEffect(() => {
    console.log(query);
  }, [query]);

  // const makes = Array.from(new Set(cars?.map((car) => car.Make))) as string[];
  // const models = Array.from(new Set(cars?.filter((car) => car.Make === selectedMake).map((car) => car.Model))) as string[];
  // const fuelType = Array.from(new Set(cars?.filter((car) => car.Model === selectedModel).map((car) => car.Fuel_Type))) as string[];
  return (
    <>
      {/* <CustomListBox label="Make" data={makes} selectedItem={selectedMake} setSelectedItem={setSelectedMake} />
      <CustomListBox label="Model" data={models} disable={!selectedMake} selectedItem={selectedModel} setSelectedItem={setSelectedModel} />
      <CustomListBox label="Fuel Type" data={fuelType} disable={!selectedModel} selectedItem={selectedFuelType} setSelectedItem={setSelectedFuelType} /> */}

      <Combobox value={selectedCar} onChange={setSelectedCar} as="div" className="grid-rows-label relative col-span-2 grid gap-2 text-sm">
        <Combobox.Label>Car</Combobox.Label>
        <Combobox.Input
          onChange={(event) => setQuery(event.target.value)}
          id="car"
          className="rounded-md border bg-inherit px-4 py-2 text-base"
          autoComplete="off"
          displayValue={({ id, Make, Model, Fuel_Type, Seating_Capacity }) => `${Make} ${Model} (${Fuel_Type}) - ${Seating_Capacity} Seater`}
        />
        <Combobox.Options className="absolute left-0 right-0 top-[100%] z-[1] mt-2 max-h-32 overflow-y-auto rounded-md border bg-neutral-900 bg-opacity-100 px-4 py-2 text-sm">
          {filteredData.map((item) => {
            const { id, Make, Model, Fuel_Type, Seating_Capacity } = item;
            return (
              <Combobox.Option key={id} value={item} className="cursor-pointer py-2">
                {Make} {Model} ({Fuel_Type}) - {Seating_Capacity} Seater
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </>
  );
};
