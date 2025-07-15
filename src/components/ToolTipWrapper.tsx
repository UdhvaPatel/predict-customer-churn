import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: string;
}

export default function TooltipWrapper({ children, content }: TooltipWrapperProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-black text-white text-xs rounded px-2 py-1 shadow-md" sideOffset={5}>
            {content}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
