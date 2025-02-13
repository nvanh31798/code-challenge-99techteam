import React, { ReactNode, forwardRef } from "react";
import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
  selectClasses,
} from "@mui/base/Select";
import { SelectOption } from "@mui/base/useOption";
import { styled } from "@mui/system";
import { useField } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

interface CustomDropdownItemProps {
  name: string;
  children: ReactNode;
  handleChange?: (value: number | null) => void;
}

const COLORS = {
  blue: {
    light: "#DAECFF",
    medium: "#3399FF",
    dark: "#0059B2",
  },
  grey: {
    light: "#F3F6F9",
    medium: "#B0B8C4",
    dark: "#1C2025",
  },
};

const CustomDropdownItem: React.FC<CustomDropdownItemProps> = ({ name, children, handleChange }) => {
  const [, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value, error, touched } = meta;

  const onSelectHandle = (selectedValue: number | null) => {
    handleChange?.(selectedValue);
    setValue(selectedValue);
  };

  return (
    <FormControl error={!!(touched && error)} className="flex flex-col">
      <StyledSelect
        name={name}
        value={value}
        onChange={(_, newValue) => onSelectHandle(newValue)}
        renderValue={(option: SelectOption<number> | null) =>
          option == null || option.value === 0 ? "Select an option…" : <span className="font-bold">{option.label}</span>
        }
      >
        {children}
      </StyledSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

// Styled Select Component
const StyledSelect = (props: SelectProps<number, false>) => {
  const slots: SelectProps<number, false>["slots"] = {
    root: StyledButton,
    listbox: StyledListbox,
    popup: StyledPopup,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
};

const StyledButton = forwardRef<HTMLButtonElement, SelectRootSlotProps<number, false>>(
  ({ ownerState, ...props }, ref) => (
    <StyledButtonWrapper type="button" {...props} ref={ref}>
      {props.children}
      <UnfoldMoreRoundedIcon />
    </StyledButtonWrapper>
  )
);

StyledButton.displayName = "StyledButton";

const StyledButtonWrapper = styled("button")(({ theme }) => ({
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "0.875rem",
  boxSizing: "border-box",
  height: "57px",
  width: "180px",
  padding: "8px 12px",
  borderRadius: "8px",
  textAlign: "left",
  lineHeight: "1.5",
  background: theme.palette.mode === "dark" ? COLORS.grey.dark : "#fff",
  border: `1px solid ${theme.palette.mode === "dark" ? COLORS.grey.medium : COLORS.grey.light}`,
  color: theme.palette.mode === "dark" ? COLORS.grey.light : COLORS.grey.dark,
  position: "relative",
  boxShadow: `0 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"}`,
  transition: "all 120ms cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: theme.palette.mode === "dark" ? COLORS.grey.medium : COLORS.grey.light,
    borderColor: theme.palette.mode === "dark" ? COLORS.grey.medium : COLORS.grey.dark,
  },

  [`&.${selectClasses.focusVisible}`]: {
    outline: 0,
    borderColor: COLORS.blue.medium,
    boxShadow: `0 0 0 3px ${theme.palette.mode === "dark" ? COLORS.blue.dark : COLORS.blue.light}`,
  },

  "& > svg": {
    fontSize: "1rem",
    position: "absolute",
    height: "100%",
    top: 0,
    right: "10px",
  },
}));

const StyledListbox = styled("ul")(({ theme }) => ({
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "0.875rem",
  boxSizing: "border-box",
  padding: "6px",
  margin: "12px 0",
  minWidth: "320px",
  borderRadius: "12px",
  overflow: "auto",
  outline: 0,
  background: theme.palette.mode === "dark" ? COLORS.grey.dark : "#fff",
  border: `1px solid ${theme.palette.mode === "dark" ? COLORS.grey.medium : COLORS.grey.light}`,
  color: theme.palette.mode === "dark" ? COLORS.grey.light : COLORS.grey.dark,
  boxShadow: `0 2px 4px ${theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"}`,
}));

const StyledPopup = styled("div")`
  z-index: 1;
`;

export default CustomDropdownItem;
