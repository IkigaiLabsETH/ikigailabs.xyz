"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

interface ModelSelectProps {
  model: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06";
  onSelect: (model: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06") => void;
}

export default function ModelSelect({ model, onSelect }: ModelSelectProps) {
  const handleSelect = (value: "o1-preview" | "o1-mini" | "gpt-4o-2024-08-06") => {
    onSelect(value);
  };

  return (
    <Select
      value={model}
      onValueChange={handleSelect}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="o1-mini">Basic Reasoning</SelectItem>
        <SelectItem value="o1-preview">Advanced Reasoning</SelectItem>
        <SelectItem value="gpt-4o-2024-08-06">Complex Tasks</SelectItem>
      </SelectContent>
    </Select>
  );
}
