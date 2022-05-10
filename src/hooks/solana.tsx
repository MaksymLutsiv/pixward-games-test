import {Cluster, clusterApiUrl, Connection, PublicKey} from '@solana/web3.js';
import {BlockchainNetworkType} from '../common/enum/network.enum';
import {useCallback, useState} from 'react';

export function useSolanaBlockchain() {
  const [connection, setConnection] = useState<Connection>();
  const [error, setError] = useState<string | null>();
  const [balance, setBalance] = useState<number | null>();

  const establishConnection = useCallback((networkType?: BlockchainNetworkType) => {
    const rpcApiUrl = clusterApiUrl(networkType as Cluster);
    setConnection(new Connection(rpcApiUrl));
  }, [setConnection]);

  const getBalance = useCallback((address: string) => {
    setBalance(null);
    setError(null);
    let newPublicKey: PublicKey;
    try {
      newPublicKey = new PublicKey(address);
      if (!PublicKey.isOnCurve(newPublicKey)) {
        throw 'Invalid wallet address';
      }
      connection?.getBalance(newPublicKey).then(res => {
        setBalance(res);
      })
    } catch (e: any) {
      setError('Invalid wallet address');
    }
  }, [connection, setBalance, setError]);


  return {
    establishConnection,
    getBalance,
    error,
    balance
  }
}
