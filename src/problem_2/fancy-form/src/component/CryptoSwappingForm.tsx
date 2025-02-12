import { useEffect, useState } from "react";
import { Formik } from "formik";
import { InputField } from "./InputField";
import { Grid, Button, Box } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CustomDropdownItem from "./CustomDropdownItem";
import { SelectionOptionItem } from "./SelectionOptionItem";

interface CryptoInfo {
  currency?: string;
  date?: string;
  price?: number;
}

export const CryptoSwappingForm = () => {
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json", { method: "GET" }).then(
      async (res) => {
        const data = await res.json();
        setCryptoList(data);
      }
    );
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">SWAP</h1>
      <Formik
        initialValues={{
          ["inputValue"]: 0,
          ["inputCurrency"]: 0,
          ["outputValue"]: 0,
          ["outputCurrency"]: 0,
        }}
        validateOnBlur
        enableReinitialize
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, setValues }) => (
          <form onSubmit={handleSubmit}>
            <Grid className="items-center gap-4" container>
              <Grid item>
                <div className="flex">
                  <InputField
                    required={true}
                    label={"To"}
                    name={"inputValue"}
                    value={values["inputValue"]}
                    handleChange={(e) => {
                      handleChange(e);
                      const newValue = e?.target?.value;
                      if (
                        !values["outputCurrency"] ||
                        !values["inputCurrency"]
                      ) {
                        return;
                      }
                      const rate =
                        values["outputCurrency"] / values["inputCurrency"];
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
                      const rate = values["outputCurrency"] / newValue;
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
                    label={"To"}
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
                        values["inputCurrency"] / values["outputCurrency"];
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
                      const rate = newValue / values["inputCurrency"];
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

              <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button variant="text">Swap</Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};
