import { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./InputField";
import { Grid, Button, Box } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CustomDropdownItem from "./CustomDropdownItem";
import { SelectionOptionItem } from "./SelectionOptionItem";
import { ICryptoForm } from "../interfaces/ICryptoForm";
import { toast } from "react-toastify";
import { mockSwapApi } from "../mock/mockApi";

interface CryptoInfo {
  currency?: string;
  date?: string;
  price?: number;
}

const API_URL = "https://interview.switcheo.com/prices.json";
const TOAST_POSITION = "bottom-right";
const DEFAULT_FORM_VALUES: ICryptoForm = {
  inputValue: 0,
  inputCurrency: 0,
  outputValue: 0,
  outputCurrency: 0,
};

const MESSAGES = {
  error: "An unexpected error occurred.",
  fetchError: "Failed to load crypto prices.",
  swapFailed: "Swap failed, please try again.",
  positiveNumber: "Must be a positive number",
  selectCurrency: "Required",
  currencyDifferent: "Input and output currencies must be different",
};

const BUTTON_TEXT = {
  swapping: "Swapping...",
  swap: "SWAP",
};

export const CryptoSwappingForm = () => {
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);

  const handleDisplayToast = useCallback(
    (type: "error" | "success", message: string) => {
      toast[type](message, { position: TOAST_POSITION });
    },
    []
  );

  const validationSchema = Yup.object({
    inputValue: Yup.number()
      .positive(MESSAGES.positiveNumber)
      .required(MESSAGES.positiveNumber),
    inputCurrency: Yup.number()
      .moreThan(0, MESSAGES.selectCurrency)
      .required(MESSAGES.selectCurrency),
    outputValue: Yup.number()
      .positive(MESSAGES.positiveNumber)
      .required(MESSAGES.positiveNumber),
    outputCurrency: Yup.number()
      .moreThan(0, MESSAGES.selectCurrency)
      .required(MESSAGES.selectCurrency)
      .notOneOf([Yup.ref("inputCurrency")], MESSAGES.currencyDifferent),
  });

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCryptoList(data);
      } catch (error) {
        toast.error(MESSAGES.fetchError, { position: TOAST_POSITION });
      }
    };
    fetchCryptoList();
  }, []);

  return (
    <div className="w-full h-full m-auto justify-items-center">
      <h1 className="text-3xl font-bold mb-10">SWAP</h1>
      <Formik
        initialValues={DEFAULT_FORM_VALUES}
        validateOnBlur
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          try {
            const response = await mockSwapApi(values);
            handleDisplayToast(
              response.success ? "success" : "error",
              response.message || MESSAGES.swapFailed
            );
          } catch {
            handleDisplayToast("error", MESSAGES.error);
          } finally {
            actions.setSubmitting(false);
            actions.resetForm();
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setValues,
          isSubmitting,
        }) => (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Grid className="justify-center items-center gap-4" container>
              <Grid item>
                <div className="flex">
                  <InputField
                    required={true}
                    name={"inputValue"}
                    value={values["inputValue"]}
                    handleChange={(e) => {
                      handleChange(e);
                      if (
                        !values["outputCurrency"] ||
                        !values["inputCurrency"] ||
                        typeof e === "string"
                      ) {
                        return;
                      }
                      const newValue = e?.target?.value;
                      const rate =
                        values["inputCurrency"] / values["outputCurrency"];
                      setValues(
                        {
                          ...values,
                          ["inputValue"]: newValue,
                          ["outputValue"]: rate * newValue,
                        },
                        true
                      );
                    }}
                    handleBlur={handleBlur}
                  />
                  <CustomDropdownItem
                    handleChange={(newValue) => {
                      if (
                        !values["inputValue"] ||
                        !values["inputCurrency"] ||
                        !values["outputCurrency"] ||
                        !newValue
                      ) {
                        return;
                      }
                      const rate = newValue / values["outputCurrency"];
                      setValues(
                        {
                          ...values,
                          ["outputValue"]: rate * values["inputValue"],
                          ["inputCurrency"]: newValue,
                        },
                        true
                      );
                    }}
                    name={"inputCurrency"}
                  >
                    {cryptoList.map((crypto, index) => {
                      return (
                        <SelectionOptionItem
                          key={`${crypto.currency}_${crypto.date}_${index}`}
                          className="flex items-center"
                          value={crypto.price}
                          label={crypto.currency}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: 20,
                              height: 20,
                            }}
                          >
                            <img
                              loading="lazy"
                              width={20}
                              height={14}
                              src={`./tokens/${crypto?.currency}.svg`}
                              alt=""
                            />
                          </Box>
                          <div className="ml-2 text-sm font-bold">
                            {crypto.currency}
                          </div>
                        </SelectionOptionItem>
                      );
                    })}
                  </CustomDropdownItem>
                </div>
              </Grid>

              <SwapHorizIcon fontSize="large" />

              <Grid item>
                <div className="flex">
                  <InputField
                    required={true}
                    name={"outputValue"}
                    value={values["outputValue"]}
                    handleChange={(e) => {
                      handleChange(e);
                      if (
                        !values["outputCurrency"] ||
                        !values["inputCurrency"] ||
                        typeof e === "string"
                      ) {
                        return;
                      }
                      const newValue = e?.target?.value;
                      const rate =
                        values["outputCurrency"] / values["inputCurrency"];
                      setValues(
                        {
                          ...values,
                          ["inputValue"]: rate * newValue,
                          ["outputValue"]: newValue,
                        },
                        true
                      );
                    }}
                    handleBlur={handleBlur}
                  />
                  <CustomDropdownItem
                    handleChange={(newValue) => {
                      if (
                        !values["inputValue"] ||
                        !values["inputCurrency"] ||
                        !newValue
                      ) {
                        return;
                      }
                      const rate = values["inputCurrency"] / newValue;
                      setValues(
                        {
                          ...values,
                          ["outputValue"]: rate * values["inputValue"],
                          ["outputCurrency"]: newValue,
                        },
                        true
                      );
                    }}
                    name={"outputCurrency"}
                  >
                    {cryptoList.map((crypto, index) => {
                      return (
                        <SelectionOptionItem
                          key={`${crypto.currency}_${crypto.date}_${index}`}
                          className="flex items-center"
                          value={crypto.price}
                          label={crypto.currency}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: 20,
                              height: 20,
                            }}
                          >
                            <img
                              loading="lazy"
                              width={20}
                              height={14}
                              src={`./tokens/${crypto?.currency}.svg`}
                              alt=""
                            />
                          </Box>
                          <div className="ml-2 text-sm font-bold">
                            {crypto.currency}
                          </div>
                        </SelectionOptionItem>
                      );
                    })}
                  </CustomDropdownItem>
                </div>
              </Grid>
            </Grid>
            <Button className="self-end" type="submit" variant="text">
              {isSubmitting ? BUTTON_TEXT.swapping : BUTTON_TEXT.swap}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
