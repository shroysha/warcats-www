import axios from 'axios';
import { CosmWasmClient, makeSignDoc, SigningCosmWasmClient } from 'cosmwasm';
import React, { useEffect, useState } from 'react';
import { getWarCatTokenIds } from 'warcats-common';
import { ethers } from 'ethers';
import { makeADR36AminoSignDoc } from '@keplr-wallet/cosmos';

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
    account: any,
    signer: string,
    signed: string,
    signature: string,
    nfts: IWarcatMetadata[]
  ) {
    WalletInfo.instance = new WalletInfo(
      wallet,
      account,
      signer,
      signed,
      signature,
      nfts
    );
  }

  static getInstance() {
    return WalletInfo.instance;
  }

  constructor(
    readonly wallet: string,
    readonly account: any,
    readonly signer: string,
    readonly signed: string,
    readonly signature: string,
    readonly nfts: IWarcatMetadata[]
  ) {}
}

export const connectWallet = async () => {
  await (window as any).keplr.enable('stargaze-1');

  const offlineSigner = (window as any).getOfflineSigner('stargaze-1');
  const accounts = await offlineSigner.getAccounts();
  const signed = 'Login';

  const signDoc = makeADR36AminoSignDoc(accounts[0].address, 'Login');
  // const signDoc = makeSignDoc(
  //   [
  //     {
  //       type: 'warcats-login',
  //       value: 'Login'
  //     }
  //   ],
  //   {
  //     amount: [],
  //     // Note: this needs to be 0 gas to comply with ADR36, but Keplr current throws an error. See: https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-036-arbitrary-signature.md#decision
  //     gas: '0'
  //   },
  //   'stargaze-1',
  //   '',
  //   0,
  //   0
  // );
  // const signDoc = makeADR36AminoSignDoc();

  // const response = await (window as any).keplr.signArbitrary(
  //   'stargaze-1',
  //   accounts[0].address,
  //   signed
  // );

  const response = await (window as any).keplr.signAmino(
    'stargaze-1',
    accounts[0].address,
    signDoc
  );
  //const message = ethers.utils.hexlify('4c6f67696e');
  // const message = `{"data": "${ethers.utils.formatBytes32String('Login')}"}`;

  // const response = await (window as any).keplr.signEthereum(
  //   'stargaze-1',
  //   accounts[0].address,
  //   message,
  //   'transaction'
  // );

  // console.log('wallet sign response', response, accounts[0]);

  WalletInfo.createInstance(
    accounts[0].address,
    accounts[0],
    response.signature.pub_key,
    response.signed,
    response.signature.signature,
    await getWarCatNfts(accounts[0].address)
  );
  // WalletInfo.createInstance(
  //   accounts[0].address,
  //   accounts[0],
  //   response,
  //   message,
  //   response,
  //   await getWarCatNfts(accounts[0].address)
  // );
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
