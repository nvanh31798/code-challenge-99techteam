import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./InputField";
import { Grid, Button, Box } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CustomDropdownItem from "./CustomDropdownItem";
import { SelectionOptionItem } from "./SelectionOptionItem";
import { ICryptoForm } from "../interfaces/ICryptoForm";
import { toast } from "react-toastify";

interface CryptoInfo {
  currency?: string;
  date?: string;
  price?: number;
}

export const CryptoSwappingForm = () => {
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);

  const displayToast = (
    type: "error" | "success" | "warning",
    message: string
  ) => {
    switch (type) {
      case "error":
        toast.error(message, {
          position: "bottom-right",
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "bottom-right",
        });
        break;
      default:
        toast.success(message, {
          position: "bottom-right",
        });
        break;
    }
  };

  const validationSchema = Yup.object().shape({
    inputValue: Yup.number()
      .positive("Input value must be a positive number")
      .required("Input value is required"),
    inputCurrency: Yup.number()
      .moreThan(0, "Please select an input currency")
      .required("Input currency is required"),
    outputValue: Yup.number()
      .positive("Output value must be a positive number")
      .required("Output value is required"),
    outputCurrency: Yup.number()
      .moreThan(0, "Please select an output currency")
      .required("Output currency is required")
      .notOneOf(
        [Yup.ref("inputCurrency")],
        "Input and output currencies must be different"
      ),
  });
  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json", { method: "GET" }).then(
      async (res) => {
        const data = await res.json();
        setCryptoList(data);
      }
    );
  }, []);

  return (
    <div className="w-full h-full m-auto justify-items-center">
      <h1 className="text-3xl font-bold mb-10">SWAP</h1>
      <Formik
        initialValues={
          {
            inputValue: 0,
            inputCurrency: 0,
            outputValue: 0,
            outputCurrency: 0,
          } as ICryptoForm
        }
        validateOnBlur
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(_values, actions) => {
          setTimeout(() => {
            const successMessage = `Tranfer successfully!`;
            displayToast("success", successMessage);
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, setValues }) => (
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
                      // const rate = newValue / values["inputCurrency"];
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
              Swap
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
