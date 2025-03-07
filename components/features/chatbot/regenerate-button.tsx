import { Button } from "../../ui/button";

interface RegenerateButtonProps {
  onRegenerate: (e: React.MouseEvent) => void;
  disabled: boolean;
}

export const RegenerateButton = ({
  onRegenerate,
  disabled,
}: RegenerateButtonProps) => (
  <Button
    onClick={onRegenerate}
    disabled={disabled}
    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
  >
    Regenerate Response
  </Button>
);
