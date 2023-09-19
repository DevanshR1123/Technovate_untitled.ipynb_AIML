"use client";

import { CarComboBoxes } from "@/components/CarComboBoxes";
import { CustomListBox } from "@/components/CustomListBox";
import { useAuth } from "@/components/contexts/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileFill = () => {
  const { updateProfile, user } = useAuth();

  const router = useRouter();

  const [userData, setUserData] = useState<any>({
    plate_no: "",
    car: { Make: "", Model: "", Fuel_Type: "" },
    personality: "Any",
    music: "Any",
    food: "Any",
    hobby: "Any",
    color: "",
  });

  useEffect(() => {
    if (user) setUserData(user.user_metadata);
  }, [user]);

  const personalityPreferences = ["Introverted", "Extroverted", "Ambivert", "Any"];
  const musicPreferences = ["Rock", "Pop", "Classical", "Jazz", "Any"];
  const foodPreferences = ["Vegetarian", "Non-Vegetarian", "Vegan", "Any"];
  const hobbyPreferences = ["Sports", "Reading", "Traveling", "Gaming", "Any"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    updateProfile(userData);
  };

  const InputField = ({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) => (
    <label className="grid-rows-label grid gap-2 text-sm" htmlFor={name}>
      {label}
      <input className="w-full rounded-md border bg-inherit px-4 py-2 text-base" placeholder={placeholder} type={type} name={name} id={name} onChange={handleChange} value={userData[name]} />
    </label>
  );

  return (
    <div className="m-auto grid place-self-center p-4 md:px-16">
      <h1 className="mb-4 text-center text-3xl font-bold">Complete Your Profile</h1>
      <form className="md:grid-cols-2 grid gap-6 text-foreground md:w-[48rem]" onSubmit={handleSubmit}>
        <fieldset className="grid-cols-2 grid gap-6 rounded-lg border-2 border-white p-6 pt-4 text-foreground">
          <legend className="px-2 font-bold">Car Details</legend>
          <CarComboBoxes selectedCar={userData.car} setSelectedCar={(value) => setUserData({ ...userData, car: value })} />
          {/* <InputField label="License Plate No." placeholder="MH-02-AB-1234" name="plate_no" />
          <InputField label="Color" placeholder="Red, Orange, etc." name="color" /> */}

          <label className="grid-rows-label grid gap-2 text-sm" htmlFor="plate_no">
            License Plate No.
            <input
              className="w-full rounded-md border bg-inherit px-4 py-2 text-base"
              placeholder="MH-02-AB-1234"
              type="text"
              name="plate_no"
              id="plate_no"
              onChange={handleChange}
              value={userData.plate_no}
            />
          </label>
          <label className="grid-rows-label grid gap-2 text-sm" htmlFor="color">
            Color
            <input
              className="w-full rounded-md border bg-inherit px-4 py-2 text-base"
              placeholder="Red, Orange, etc."
              type="text"
              name="color"
              id="color"
              onChange={handleChange}
              value={userData.color}
            />
          </label>
        </fieldset>
        <fieldset className="grid-cols-2 grid gap-6 rounded-lg border-2 border-white p-6 pt-4 text-foreground">
          <legend className="px-2 font-bold">Personal Preferences</legend>
          <CustomListBox label="Personality" data={personalityPreferences} selectedItem={userData.personality} setSelectedItem={(value) => setUserData({ ...userData, personality: value })} />
          <CustomListBox label="Music" data={musicPreferences} selectedItem={userData.music} setSelectedItem={(value) => setUserData({ ...userData, music: value })} />
          <CustomListBox label="Food" data={foodPreferences} selectedItem={userData.food} setSelectedItem={(value) => setUserData({ ...userData, food: value })} />
          <CustomListBox label="Hobby" data={hobbyPreferences} selectedItem={userData.hobby} setSelectedItem={(value) => setUserData({ ...userData, hobby: value })} />
        </fieldset>

        <button className="col-start-1 col-end-[-1] w-96 justify-self-center rounded bg-green-700 px-4 py-2 font-bold text-white hover:bg-green-600 disabled:bg-green-800/80" disabled={false}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileFill;
