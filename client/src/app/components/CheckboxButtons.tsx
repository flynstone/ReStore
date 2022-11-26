import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    // Get index value
    const currentIndex = checkedItems.findIndex(item => item === value);
    // Store newly checked items in an array
    let newChecked: string[] = [];
    // If we get to this line, we know its a new item that we our going to add to the array of checked items.
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    // Uncheck if it was previously checked.
    else newChecked = checkedItems.filter(item => item !== value);
    // Set checked item, and on change event also.
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <FormGroup>
      {items.map(item => (
        <FormControlLabel
          control={<Checkbox
            checked={checkedItems.indexOf(item) !== -1}
            onClick={() => handleChecked(item)}
          />}
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  )
}