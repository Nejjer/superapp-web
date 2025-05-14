import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Card as ChakraCard } from '@chakra-ui/react';

interface Card {
  children?: ReactNode;
  radius?: '44px' | '9999px' | '0px' | '24px' | '12px';
  className?: string;
  header?: ReactNode;
}

export const Card: FC<Card> = ({ children, radius, className, header }) => {
  return (
    <ChakraCard.Root
      style={{ borderRadius: radius }}
      className={clsx(className)}
    >
      {header && <ChakraCard.Header>{header}</ChakraCard.Header>}
      <ChakraCard.Body>
        {children}
      </ChakraCard.Body>
    </ChakraCard.Root>
  );
};
