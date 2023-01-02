import { Scene } from 'babylonjs';
import { BabylonScene } from '@/components';
import { WarCatGame } from '@/game';
import { useWarCatNft } from '@/hooks';
import { useEffect } from 'react';
import { WarCatTitleUi } from '@/game/ui/WarCatTitleUi';

const startWarCatGame = (scene: Scene) => {
  console.log('opened game');

  WarCatTitleUi.createInstance(scene);

  //WarCatGame.createInstance(scene);
};

export const WarCatClickGameComponent = () => {
  const { nfts } = useWarCatNft();

  useEffect(() => {
    console.log('do something');
  }, []);

  return <BabylonScene onSceneReady={startWarCatGame} />;
};
