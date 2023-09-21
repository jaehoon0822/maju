interface TopbarMenuProps {
  children: React.ReactNode;
  margin?: number;
  selectedIdx: number;
  onClickSelectedIdx: (idx: number) => void;
}
