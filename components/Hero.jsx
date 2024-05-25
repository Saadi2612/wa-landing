"use client";

import React, { useEffect, useState } from "react";

import Header from "./Header";
import { hankenGrotesk } from "@/utils";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@nextui-org/react";

import { BsDashLg } from "react-icons/bs";
import {
  FaAngleRight,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa6";
import { SparklesCore } from "./ui/sparkles";

import { AnimatePresence, motion } from "framer-motion";
import LeftLines from "./ui/leftLines";
import RightLines from "./ui/rightLines";
import HeroGrid from "./ui/heroGrid";
import { IoIosClose } from "react-icons/io";
import { BACKEND_URL, countryCodes } from "@/constants";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPhoneNumberEmpty, setIsPhoneNumberEmpty] = useState(false);
  const [isUserTypeEmpty, setIsUserTypeEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleOpen = () => {
    onOpen();
  };

  const handleWaitList = async () => {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phoneNumber.trim() === "" ||
      userType.trim() === ""
    ) {
      if (userType.trim() === "") setIsUserTypeEmpty(true);
      if (name.trim() === "") setIsNameEmpty(true);
      if (email.trim() === "") setIsEmailEmpty(true);
      if (phoneNumber.trim() === "") setIsPhoneNumberEmpty(true);
      return;
    }

    setIsLoading(true);
    try {
      const body = {
        email: email,
        fullname: name,
        phone: phoneNumber,
        usrType: userType,
      };
      console.log(body);

      const response = await fetch(`${BACKEND_URL}pre-launch/waiting-list/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      console.log(data);

      onClose();
      setResponseMessage(data.message);
      setIsFormSuccess(true);
      setIsLoading(false);

      // toast({
      //   title: "Joined Waiting List.",
      //   description: "You've been added to the waiting list",
      //   status: "success",
      //   duration: 9000,
      //   isClosable: true,
      // });
    } catch (e) {
      console.log("Error:", e);
      setResponseMessage(e);
      setIsFormSuccess(true);
      setIsLoading(false);
      // toast({
      //   title: "Error",
      //   description: "You've been added to the waiting list",
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      // });
    }
  };

  const handleNameInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }
    setName(value);
  };

  // Regex pattern for email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
    }
    setEmail(value);
    validateEmail(value);
  };

  const validateEmail = (value) => {
    const isEmailValid = emailPattern.test(value);
    setIsEmailValid(isEmailValid);
  };
  // Regex pattern for phone number validation
  const phoneNumberPattern = /^\+?(\d{1,3})?[-.\s]?((\d{3})[-.\s]?){2}\d{4}$/;

  const handlePhoneInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setIsPhoneNumberEmpty(true);
    } else {
      setIsPhoneNumberEmpty(false);
    }
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const validatePhoneNumber = (value) => {
    const isPhoneNumberValid = phoneNumberPattern.test(value);
    setIsPhoneNumberValid(isPhoneNumberValid);
  };

  // useEffect(() => {
  //   if (!email.trim() === "") {
  //     const emailTimeout = setTimeout(() => {
  //       validateEmail(email);
  //     }, 2000);

  //     return () => {
  //       clearTimeout(emailTimeout);
  //     };
  //   }
  // }, [email]);

  // useEffect(() => {
  //   if (!phoneNumber.trim() === "") {
  //     const phoneNumberTimeout = setTimeout(() => {
  //       validatePhoneNumber(phoneNumber);
  //     }, 2000);

  //     return () => {
  //       clearTimeout(phoneNumberTimeout);
  //     };
  //   }
  // }, [phoneNumber]);

  return (
    <section className="flex flex-col w-full h-dvh overflow-y-auto overflow-x-hidden relative bg-gray-50">
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0">
        <Image src="/assets/grid-1.png" />
      </div> */}
      <Header />
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#A94A9C]/20 to-[#5FC4C7] mix-blend-soft-light z-0" /> */}
      {/* <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 opacity-40">
        <HeroGrid />
      </div> */}
      <div className="flex flex-col justify-start items-center w-full h-full gap-2 md:gap-4 mb-6 relative">
        {/* Side Lines */}
        <div className="md:block hidden h-[90%] absolute top-1/2 -translate-y-1/2 -left-2 z-0">
          <LeftLines />
        </div>
        <div className="md:block hidden h-[90%] absolute top-1/2 -translate-y-1/2 -right-2 z-0">
          <RightLines />
        </div>
        <div className="w-full max-w-6xl text-center h-auto flex flex-col justify-start items-center pt-10 px-5 md:px-16 z-[1]">
          <div className="flex flex-col relative">
            <div className="w-fit px-4 py-2 md:my-2 rounded-full border-1 border-primary/50 bg-primary/15 backdrop-blur-sm shadow-[0_0_40px_rgba(169,74,156,0.3)] z-[1]">
              <span
                className={`${hankenGrotesk.className} w-full flex items-center gap-1 md:gap-2 text-sm md:text-base text-primary`}
              >
                Stay Tuned <BsDashLg /> We are Launching Soon
              </span>
              {/* <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>{" "} */}
            </div>
            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
              particleColor="#A94A9C"
            />
          </div>

          <h1
            className={`${hankenGrotesk.className} text-4xl md:text-6xl font-bold text-secondary pt-4 pb-2 md:pb-4 mt-2`}
          >
            Empowering{" "}
            <span
              className={`${hankenGrotesk.className} text-primary font-extralight`}
            >
              your
            </span>{" "}
            Ambitions,{" "}
          </h1>
          <h2
            className={`${hankenGrotesk.className} text-primary text-3xl md:text-5xl font-bold`}
          >
            One Project at a Time
          </h2>
          <span className="w-full max-w-3xl">
            <p
              className={`${hankenGrotesk.className} pt-10 pb-4 text-gray-600 text-base md:text-lg font-light text-center`}
            >
              Dive into a world where your ambitions shape the future. Work
              Ambitions is more than a marketplace; it's a springboard for your
              freelance career or business growth. With a focus on quality,
              innovation, and seamless collaboration, we're setting new
              standards in the digital service sphere.
            </p>
          </span>
        </div>

        <div className="flex flex-col items-center text-center w-full max-w-3xl px-4 py-2 my-0 md:my-6 z-[1]">
          <h3
            className={`${hankenGrotesk.className} text-2xl md:text-3xl font-medium text-primary`}
          >
            Craft Your Success Story with Work Ambitions
          </h3>

          <p className="text-gray-500 text-sm md:text-base pt-6 pb-3">
            We are almost there, if you want to get notified when our website
            goes live, join our waiting list.
          </p>

          <div className="flex p-1 md:p-1.5 rounded-2x bg-white border border-secondary rounded-xl">
            <Button
              onClick={handleOpen}
              className="md:px-8 px-4 md:py-7 py-3 rounded-lg bg-primary text-white text-base md:text-xl group"
            >
              Join out waiting list
              <span className="group-hover:translate-x-1 duration-150">
                <FaAngleRight />
              </span>
            </Button>
          </div>
        </div>

        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onClose={onClose}
          isDismissable={false}
          className="overflow-y-auto"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3
                    className={`${hankenGrotesk.className} text-xl text-primary font-bold`}
                  >
                    Waiting List
                  </h3>
                </ModalHeader>
                <ModalBody>
                  <Input
                    onChange={handleNameInputChange}
                    autoFocus
                    endContent={
                      <FaUser className="text-2xl text-primary pointer-events-none flex-shrink-0" />
                    }
                    isRequired
                    isInvalid={isNameEmpty}
                    errorMessage={isNameEmpty && "Please enter your name"}
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter your name"
                    variant="bordered"
                    color="primary"
                    className="py-2"
                  />
                  <Input
                    onChange={handleEmailInputChange}
                    endContent={
                      <FaEnvelope className="text-2xl text-primary pointer-events-none flex-shrink-0" />
                    }
                    isRequired
                    isInvalid={!isEmailValid || isEmailEmpty}
                    errorMessage={
                      isEmailEmpty
                        ? "Please enter your email"
                        : !isEmailValid && "Invalid email"
                    }
                    label="Email"
                    labelPlacement="outside"
                    placeholder="Enter your email"
                    variant="bordered"
                    color={isEmailValid ? "primary" : "danger"}
                    className="py-2"
                  />
                  <div className="flex flex-col justify-start items-start w-full">
                    <label className="text-primary text-sm">
                      Phone number <span className="text-red-600">*</span>
                    </label>
                    <PhoneInput
                      value={phoneNumber}
                      onChange={(phone) => setPhoneNumber(phone)}
                      containerClass="w-full p-1 border-2 border-gray-200 hover:border-gray-400 focus-within:border-primary focus-within:hover:border-primary rounded-xl duration-150"
                      buttonStyle={{
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "12px",
                      }}
                      inputStyle={{
                        borderRadius: "12px",
                        border: "none",
                        outline: "none",
                      }}
                      dropdownStyle={{ border: "none", outline: "none" }}
                    />
                    {/* <Input
                      onChange={handlePhoneInputChange}
                      endContent={
                        <FaPhone className="text-2xl text-primary pointer-events-none flex-shrink-0" />
                      }
                      isRequired
                      isInvalid={!isPhoneNumberValid || isPhoneNumberEmpty}
                      errorMessage={
                        isPhoneNumberEmpty
                          ? "Please enter your phone number"
                          : !isPhoneNumberValid && "Invalid phone number"
                      }
                      label="Phone"
                      placeholder="Enter your phone number"
                      variant="bordered"
                      color={"primary"}
                    /> */}
                  </div>

                  <RadioGroup
                    isRequired
                    errorMessage={
                      isUserTypeEmpty ? "Please select your user type" : ""
                    }
                    color="primary"
                    label="Profile type"
                    value={userType}
                    onValueChange={setUserType}
                  >
                    <Radio value="client">Client</Radio>
                    <Radio value="freelancer">Freelancer</Radio>
                  </RadioGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    variant="solid"
                    className="w-full"
                    onPress={handleWaitList}
                    isLoading={isLoading}
                  >
                    Join
                  </Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <AnimatePresence>
          {isFormSuccess && (
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 20 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 left-0 w-full flex justify-center gap-2 px-4 py-2 z-50"
            >
              <div className="w-fit flex flex-col items-center bg-secondary/40 backdrop-blur-md p-2 shadow-xl text-gray-800 rounded-xl relative">
                <div className="w-full flex justify-end">
                  <span
                    className="bg-red-600/0 hover:bg-red-600/20 text-red-600 grid place-content-center rounded-full transition-background duration-150 cursor-pointer"
                    onClick={() => setIsFormSuccess(false)}
                  >
                    <IoIosClose size={24} />
                  </span>
                </div>
                <div className="px-5 py-2">
                  <p className="text-sm">{responseMessage}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
