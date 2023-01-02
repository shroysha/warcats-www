import axios from 'axios';
import { CosmWasmClient } from 'cosmwasm';
import React, { useEffect, useState } from 'react';
import { getWarCatTokenIds } from 'warcats-common';

type Nft = {};

export const getWarCatNfts = async (walletAddress: string) => {
  const nfts = await getWarCatTokenIds(walletAddress);
  console.log(nfts);

  const nftMetadatas = await Promise.all(
    nfts.map(async (tokenId) => {
      return await getWarCatMetadata(tokenId);
    })
  );
  console.log('Metadata', nftMetadatas);

  return nftMetadatas;
};

export const getWarCatMetadata = async (tokenId: number) => {
  const response = await axios.get(`/assets/jsons/${tokenId}`);
  console.log('response', response.data);
  return response.data;
};

export interface IWarcatMetadata {
  name: string;
}

export class WalletInfo {
  static instance: WalletInfo | undefined;

  static createInstance(
    wallet: string,
    signed: string,
    signature: string,
    nfts: IWarcatMetadata[]
  ) {
    WalletInfo.instance = new WalletInfo(wallet, signed, signature, nfts);
  }

  static getInstance() {
    return WalletInfo.instance;
  }

  constructor(
    readonly wallet: string,
    readonly signed: string,
    readonly signature: string,
    readonly nfts: IWarcatMetadata[]
  ) {}
}

export const connectWallet = async () => {
  await (window as any).keplr.enable('stargaze-1');

  const offlineSigner = (window as any).getOfflineSigner('stargaze-1');
  const accounts = await offlineSigner.getAccounts();

  const { signed, signature } = await (window as any).keplr.signArbitrary(
    'stargaze-1',
    accounts[0].address,
    'Login'
  );

  WalletInfo.createInstance(
    accounts[0].address,
    signed,
    signature,
    await getWarCatNfts(accounts[0].address)
  );
};

export const WarCatNftContext = React.createContext<{
  nfts: Nft[] | null;
}>({
  nfts: null
});

export const WarCatNftProvider = (props: any) => {
  const [nfts, setNfts] = useState<Nft[] | null>(null);
  useEffect(() => {
    // async function func() {
    //   setNfts(await getWarCatNfts());
    // }
    // func();
  }, []);

  return (
    <WarCatNftContext.Provider value={{ nfts }}>
      {props.children}
    </WarCatNftContext.Provider>
  );
};

export const useWarCatNft = () => {
  const { nfts } = React.useContext(WarCatNftContext);
  return { nfts };
};
