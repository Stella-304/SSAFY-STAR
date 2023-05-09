import { useState } from "react";

export default function useTabOpen(type: string) {
  const [generationTabOpen, setGenerationTabOpen] = useState<boolean>(false);
  const [campusTabOpen, setCampusTabOpen] = useState<boolean>(false);
  const [banTabOpen, setBanTabOpen] = useState<boolean>(false);
}
