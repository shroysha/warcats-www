import { HomeTemplate } from '@/components';
import { WarCatNftProvider } from '@/hooks';

export const HomePage = () => {
  return (
    <WarCatNftProvider>
      <HomeTemplate />
    </WarCatNftProvider>
  );
};
