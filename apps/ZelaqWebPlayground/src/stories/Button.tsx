import { Button } from '@zelaq/ui';

export interface WebButtonProps {
  label: string;
  onClick?: () => void;
}

export const WebButton = ({
  label,
  onClick
}: WebButtonProps) => {
  return (
    <Button
      onPress={onClick}
    >
      {label}
    </Button>
  );
};
