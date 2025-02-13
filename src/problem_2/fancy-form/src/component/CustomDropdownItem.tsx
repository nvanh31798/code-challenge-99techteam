import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
  selectClasses,
} from "@mui/base/Select";
import { SelectOption } from "@mui/base/useOption";
import { styled } from "@mui/system";
import { ReactNode } from "react";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import React from "react";
import { useField } from "formik";
import { FormControl, FormHelperText } from "@mui/material";

interface CustomDropdownItemProps {
  name: string;
  children: ReactNode;
  handleChange?: (value: number | null) => void;
}

export default function CustomDropdownItem({
  name,
  children,
  handleChange,
}: CustomDropdownItemProps) {
  const [, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value, error } = meta;

  const onSelectHandle = (value: number | null) => {
    handleChange?.(value);
    setValue(value);
  };

  return (
    <div className="flex flex-col">
      <FormControl error={!!(error)}>
        <Select
          name={name}
          value={value}
          onChange={(_, newValue) => onSelectHandle(newValue)}
          renderValue={(option: SelectOption<number> | null) => {
            if (option == null || option.value === 0) {
              return "Select an option…";
            }
            return <span className="font-bold">{option.label}</span>;
          }}
        >
          {children}
        </Select>
        {!!(error) ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </div>
  );
}

function Select(props: SelectProps<number, false>) {
  const slots: SelectProps<number, false>["slots"] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    height: 57px;
    width: 180px;
    padding: 8px 12px;
    border-radius: 8px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    position: relative;
    box-shadow: 0 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
    }
  
    & > svg {
      font-size: 1rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const Popup = styled("div")`
  z-index: 1;
`;
